import { CommonModule } from "@angular/common";
import { Component, Signal, inject, signal } from "@angular/core";
import { DocumentReference, Firestore, addDoc, arrayUnion, collection, doc, updateDoc } from "@angular/fire/firestore";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { ActivatedRoute, Router } from "@angular/router";
import { RoutesConstants } from "@constants";
import { BasePersistedParty, PersistedUser } from "@models";
import { SnackbarService } from "@services";
import { buildAsyncFormStatusSignal, injectUserId } from "@utils";
import { injectUsers } from "src/utils/users.injector";
import { PartyCreationRouteData } from "./party-creation-route-data.interface";

type UserWithId = PersistedUser & { id: string };

@Component({
	selector: "app-party-creation",
	standalone: true,
	imports: [
		// Angular
		CommonModule,
		ReactiveFormsModule,
		// Material
		MatButtonModule,
		MatInputModule,
		MatSelectModule,
	],
	templateUrl: "./party-creation.component.html",
})
export class PartyCreationComponent {
	protected readonly creationDisabled$$: Signal<boolean>;

	protected readonly title = inject(ActivatedRoute).snapshot.title;
	protected readonly gameId = (inject(ActivatedRoute).snapshot.data as PartyCreationRouteData).gameId;
	protected readonly users$ = injectUsers();
	protected readonly form = inject(FormBuilder).nonNullable.group({
		name: inject(FormBuilder).nonNullable.control(""),
		description: inject(FormBuilder).nonNullable.control(""),
		// TODO
		// image: ["", []],
		players: inject(FormBuilder).nonNullable.control<UserWithId["id"][]>([]),
	});

	private readonly _partyCreationPending$$ = signal(false);
	private readonly _uid = injectUserId();
	private readonly _firestore = inject(Firestore);
	private readonly _snackBarService = inject(SnackbarService);
	private readonly _router = inject(Router);

	constructor() {
		if (!this.gameId) {
			throw new Error("Missing gameId in route data");
		}

		this.creationDisabled$$ = buildAsyncFormStatusSignal(this.form, this._partyCreationPending$$);
	}

	protected async createParty() {
		if (this.creationDisabled$$()) {
			return;
		}

		this._partyCreationPending$$.set(true);
		this.form.disable();

		try {
			const formValue = this.form.getRawValue();

			const partyToPersist: Omit<BasePersistedParty, "id"> = {
				gameId: this.gameId,
				gameMaster: doc(this._firestore, "users", this._uid) as DocumentReference<PersistedUser>,
				name: formValue.name,
				description: formValue.description,
				players: this.form
					.getRawValue()
					.players.map((uid) => ({ ref: doc(this._firestore, "users", uid) as DocumentReference<PersistedUser> }) as BasePersistedParty["players"][number]),
			};

			// Save in parties collection
			const partiesCollection = collection(this._firestore, "parties");
			const persistedParty = (await addDoc(partiesCollection, partyToPersist)) as DocumentReference<BasePersistedParty>;

			// Save in current user's parties
			await this._savePlayerParty(this._uid, persistedParty);

			// Save in players' parties
			for (const player of this.form.getRawValue().players) {
				await this._savePlayerParty(player, persistedParty);
			}

			this._snackBarService.showSuccess("Partie créée");

			await this._router.navigate(["/", RoutesConstants.partiesList.path]);
		} catch (error) {
			this._snackBarService.showFailure("Erreur lors de la création de la partie");
		} finally {
			this._partyCreationPending$$.set(false);
			this.form.enable();
		}
	}

	private async _savePlayerParty(uid: string, partyRef: DocumentReference<BasePersistedParty>) {
		const userPartiesDoc = doc(this._firestore, "users", uid);
		await updateDoc(userPartiesDoc, { parties: arrayUnion(partyRef) });
	}
}
