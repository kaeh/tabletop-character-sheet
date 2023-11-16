import { CommonModule } from "@angular/common";
import { Component, Signal, inject, signal } from "@angular/core";
import { DocumentReference, Firestore, addDoc, arrayUnion, collection, collectionData, doc, updateDoc } from "@angular/fire/firestore";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { Router } from "@angular/router";
import { RoutesConstants } from "@constants";
import { BasePersistedParty, PersistedUser } from "@models";
import { SnackbarService } from "@services";
import { buildAsyncFormStatusSignal, injectUserId } from "@utils";
import { map } from "rxjs";
import { gameId } from "../../constants/game-id";
import { gameLabels } from "../../constants/game-labels";

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

	protected readonly title = gameLabels.title;
	protected readonly users$ = collectionData(collection(inject(Firestore), "users"), { idField: "id" }).pipe(
		map((users) => (users as UserWithId[]).filter(({ id }) => id !== this._uid).map(({ id, displayName }) => ({ id, displayName }))),
	);
	protected readonly form = inject(FormBuilder).nonNullable.group({
		name: ["", []],
		// TODO
		// image: ["", []],
		players: inject(FormBuilder).nonNullable.control<UserWithId["id"][]>([]),
	});

	private readonly _characterCreationPending$$ = signal(false);
	private readonly _uid = injectUserId();
	private readonly _firestore = inject(Firestore);
  private readonly _snackBarService = inject(SnackbarService);
  private readonly _router = inject(Router);

	constructor() {
		this.creationDisabled$$ = buildAsyncFormStatusSignal(this.form, this._characterCreationPending$$);
	}

	protected async createParty() {
		if (this.creationDisabled$$()) {
			return;
		}

		this._characterCreationPending$$.set(true);
		this.form.disable();

		try {
			const partyToPersist: BasePersistedParty = {
				id: "",
				// TODO : Faire un truc plus générique avec le composant (genre dans la route, avec des data)
				gameId,
				gameMaster: doc(this._firestore, "users", this._uid) as DocumentReference<PersistedUser>,
				name: this.form.getRawValue().name,
				players: this.form
					.getRawValue()
					.players.map((uid) => ({ ref: doc(this._firestore, "users", uid) as DocumentReference<PersistedUser> }) as BasePersistedParty["players"][number]),
			};

			// Save in parties collection
			const partiesCollection = collection(this._firestore, "parties");
			const persistedParty = await addDoc(partiesCollection, partyToPersist) as DocumentReference<BasePersistedParty>;

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
			console.log(error);
		} finally {
			this._characterCreationPending$$.set(false);
			this.form.enable();
		}
  }

  private async _savePlayerParty(uid: string, partyRef: DocumentReference<BasePersistedParty>) {
    const userPartiesDoc = doc(this._firestore, "users", uid);
    await updateDoc(userPartiesDoc, { parties: arrayUnion(partyRef) });
  }
}
