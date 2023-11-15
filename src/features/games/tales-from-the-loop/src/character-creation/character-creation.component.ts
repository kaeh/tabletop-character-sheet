import { CommonModule } from "@angular/common";
import { Component, computed, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Firestore, addDoc, collection } from "@angular/fire/firestore";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";
import { RoutesConstants } from "@constants";
import { injectUserId } from "@utils";
import { CharacterFormComponent } from "../character-form/character-form.component";
import { gameId, gameLabels } from "../constants";
import { PersistedCharacter } from "../models";
import { characterForm } from "../utils/character-form.injector";
import { buildLuck } from "../utils/luck.injector";

@Component({
	standalone: true,
	imports: [
		// Angular
		CommonModule,
		ReactiveFormsModule,
		// Material
		MatButtonModule,
		// Internal
		CharacterFormComponent,
	],
	templateUrl: "./character-creation.component.html",
})
export class TalesFromTheLoopCharacterCreationComponent {
	public characterCreationPending$$ = signal(false);

	protected readonly Labels = gameLabels;
	protected readonly characterForm = characterForm;
	protected readonly luck$$ = buildLuck(this.characterForm.controls.general.controls.age);
	protected readonly creationDisabled$$ = (() => {
		const creationGroupStatus$$ = toSignal(this.characterForm.statusChanges);
		const characterFormIsInvalid$$ = computed(() => creationGroupStatus$$() !== "VALID");

		return computed(() => this.characterCreationPending$$() || characterFormIsInvalid$$());
	})();

	private readonly uid = injectUserId();
	private readonly firestore = inject(Firestore);
	private readonly router = inject(Router);

	protected async createCharacter() {
		if (this.creationDisabled$$()) {
			return;
		}

		this.characterCreationPending$$.set(true);
		this.characterForm.disable();

		const characterToPersist: Partial<PersistedCharacter> = this.characterForm.value as PersistedCharacter;
		characterToPersist.gameId = gameId;
		if (characterToPersist.general) {
			characterToPersist.general.luck = this.luck$$();
		}

		try {
			const userCharactersCollection = collection(this.firestore, "users", this.uid, "characters");
			await addDoc(userCharactersCollection, characterToPersist);
			this.router.navigate(["/", RoutesConstants.charactersList.path]);
		} catch (error) {
			console.error(error);
		} finally {
			this.characterCreationPending$$.set(false);
			this.characterForm.enable();
		}
	}
}
