import { CommonModule } from "@angular/common";
import { Component, Signal, inject, signal } from "@angular/core";
import { Firestore, addDoc, collection } from "@angular/fire/firestore";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { ActivatedRoute, Router } from "@angular/router";
import { RoutesConstants } from "@constants";
import { BasePersistedParty, PartyDocRef, outCurrentUser } from "@models";
import { SnackbarService } from "@services";
import { UsersService } from "@stores";
import { buildAsyncFormStatusSignal } from "@utils";
import { map } from "rxjs";
import { PartyCreationRouteData } from "./party-creation-route-data.interface";

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
	protected readonly players$ = inject(UsersService).allUsers$.pipe(map((users) => users.filter(outCurrentUser(this._usersService.currentUserId))));
	protected readonly form = inject(FormBuilder).nonNullable.group({
		name: inject(FormBuilder).nonNullable.control(""),
		description: inject(FormBuilder).nonNullable.control(""),
		// TODO
		// image: ["", []],
		players: inject(FormBuilder).nonNullable.control<string[]>([]),
	});

	private readonly _partyCreationPending$$ = signal(false);
	private readonly _uid = inject(UsersService).currentUserId;
	private readonly _firestore = inject(Firestore);
	private readonly _snackBarService = inject(SnackbarService);
	private readonly _router = inject(Router);
	private readonly _usersService = inject(UsersService);

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
				gameMaster: this._usersService.currentUserDocRef,
				name: formValue.name,
				description: formValue.description,
				players: this.form.getRawValue().players.map((uid) => ({ ref: this._usersService.buildUserDocRef(uid) })),
			};

			// Save in parties collection
			const partiesCollection = collection(this._firestore, "parties");
			const persistedParty = (await addDoc(partiesCollection, partyToPersist)) as PartyDocRef;

			// Save in current user's parties
			await this._usersService.addPartyToUser(this._uid, persistedParty);

			// Save in players' parties
			for (const playerId of this.form.getRawValue().players) {
				await this._usersService.addPartyToUser(playerId, persistedParty);
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
}
