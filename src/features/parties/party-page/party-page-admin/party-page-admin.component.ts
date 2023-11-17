import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges, Signal, SimpleChanges, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { DocumentReference, Firestore, arrayRemove, arrayUnion, deleteDoc, doc, docData, updateDoc } from "@angular/fire/firestore";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { Router } from "@angular/router";
import { RoutesConstants } from "@constants";
import { BasePersistedParty, PersistedUser } from "@models";
import { SnackbarService } from "@services";
import { IrreversibleChangeDialog } from "@ui/components/irreversible-change-dialog";
import { buildAsyncFormStatusSignal } from "@utils";
import { firstValueFrom, map, switchMap, zip } from "rxjs";
import { injectUsers } from "src/utils/users.injector";

@Component({
	selector: "app-party-page-admin",
	standalone: true,
	imports: [
		// Angular
		CommonModule,
		ReactiveFormsModule,
		// Material
		MatInputModule,
		MatSelectModule,
		MatButtonModule,
		MatDialogModule,
	],
	templateUrl: "./party-page-admin.component.html",
	styleUrl: "./party-page-admin.component.scss",
})
export class PartyPageAdminComponent implements OnChanges {
	@Input({ required: true }) party!: BasePersistedParty;

	protected readonly updateDisabled$$: Signal<boolean>;

	protected readonly users$$ = toSignal(injectUsers(), { initialValue: [] });
	protected readonly gameMasterControl = inject(FormBuilder).nonNullable.control("");
	protected readonly form = inject(FormBuilder).nonNullable.group({
		name: inject(FormBuilder).nonNullable.control(""),
		description: inject(FormBuilder).nonNullable.control(""),
		image: inject(FormBuilder).nonNullable.control(""),
		players: inject(FormBuilder).nonNullable.control<string[]>([]),
	});
	protected playersInformations$$ = toSignal(
		this.form.controls.players.valueChanges.pipe(
			map((playersIds: string[]) => playersIds.map((playerId) => doc(this._firestore, "users", playerId) as DocumentReference<PersistedUser>)),
			map((playersDocs) => playersDocs.map((playerDocs) => docData(playerDocs, { idField: "id" }))),
			switchMap((playersData) => zip(playersData)),
			map((players) => players.filter((player): player is PersistedUser => !!player).map(({ id, displayName }) => ({ id, displayName }))),
		),
		{ initialValue: [] },
	);

	private readonly _partyUpdatePending$$ = signal(false);
	private readonly _firestore = inject(Firestore);
	private readonly _snackBarService = inject(SnackbarService);
	private readonly _dialog = inject(MatDialog);
	private readonly _router = inject(Router);

	constructor() {
		this.updateDisabled$$ = buildAsyncFormStatusSignal(this.form, this._partyUpdatePending$$);
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes["party"]) {
			const currentValue: BasePersistedParty = changes["party"].currentValue;
			const players = currentValue.players.map((player) => player.ref.id);

			this.form.patchValue({
				...changes["party"].currentValue,
				players,
			});
		}
	}

	protected async updateParty() {
		if (this.updateDisabled$$()) {
			return;
		}

		this._partyUpdatePending$$.set(true);
		this.form.disable();

		try {
			const formValue = this.form.getRawValue();
			const addedPlayersIds = formValue.players.filter((player) => !this.party.players.map((player) => player.ref.id).includes(player));
			const removedPlayersIds = this.party.players.map((player) => player.ref.id).filter((player) => !formValue.players.includes(player));

			const updatedPlayers = this.party.players.filter((player) => !removedPlayersIds.includes(player.ref.id));
			updatedPlayers.push(...addedPlayersIds.map((player) => ({ ref: doc(this._firestore, "users", player) as DocumentReference<PersistedUser> })));

			const partyChanges: Partial<BasePersistedParty> = {
				name: formValue.name,
				description: formValue.description,
				image: formValue.image,
				players: updatedPlayers,
			};

			const partyDoc = doc(this._firestore, "parties", this.party.id);
			const partyUpdatePromise = updateDoc(partyDoc, partyChanges);

			// Remove party from removed players
			const removePartyFromPlayersPromise = this._buildPlayersPartyRemovalPromises(removedPlayersIds, partyDoc);

			// Add party to added players
			const addPartyToPlayersPromise = addedPlayersIds.map((playerId) => {
				const userDoc = doc(this._firestore, "users", playerId);
				return updateDoc(userDoc, { parties: arrayUnion(partyDoc) });
			});

			await Promise.all([partyUpdatePromise, ...removePartyFromPlayersPromise, ...addPartyToPlayersPromise]);

			this._snackBarService.showSuccess("Partie mise à jour");
		} catch (error) {
			this._snackBarService.showFailure("Erreur lors de la mise à jour de la partie");
			console.error(error);
		} finally {
			this._partyUpdatePending$$.set(false);
			this.form.enable();
		}
	}

	protected async deleteParty() {
		const confirmed: boolean = await firstValueFrom(this._dialog.open(IrreversibleChangeDialog).afterClosed());

		// If confirmed then remove party from every players
		if (confirmed) {
			const partyDoc = doc(this._firestore, "parties", this.party.id);
			const playersIds = this.party.players.map((player) => player.ref.id);
			playersIds.push(this.party.gameMaster.id);
			const playersPartyRemovalPromises = this._buildPlayersPartyRemovalPromises(playersIds, partyDoc);

			Promise.all([...playersPartyRemovalPromises]);
			await deleteDoc(partyDoc);

			await this._router.navigate(["/", RoutesConstants.partiesList.path]);
		}
	}

	protected async updateGameMaster(newGameMasterId: string) {
		const confirm = await firstValueFrom(this._dialog.open(IrreversibleChangeDialog).afterClosed());

		if (confirm) {
			const partyDoc = doc(this._firestore, "parties", this.party.id);
			const partyPlayersData = (((await firstValueFrom(docData(partyDoc))) as BasePersistedParty).players ?? []) as BasePersistedParty["players"];
			const newGameMasterDoc = doc(this._firestore, "users", newGameMasterId);
			const oldGameMasterDoc = doc(this._firestore, "users", this.party.gameMaster.id);

			// Switch new game master with old game master in party players
			const updatedPlayers = partyPlayersData.map((player) => {
				if (player.ref.id === newGameMasterDoc.id) {
					return { ref: oldGameMasterDoc };
				}

				return player;
			});

			await updateDoc(partyDoc, { gameMaster: newGameMasterDoc, players: updatedPlayers });
		} else {
			this.gameMasterControl.setValue(this.party.gameMaster.id);
		}
	}

	private _buildPlayersPartyRemovalPromises(playersIds: string[], partyDoc: DocumentReference): Promise<void>[] {
		return playersIds.map((playerId) => {
			const userDoc = doc(this._firestore, "users", playerId);
			return updateDoc(userDoc, { parties: arrayRemove(partyDoc) });
		});
	}
}
