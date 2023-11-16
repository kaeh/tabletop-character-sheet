import { CommonModule } from "@angular/common";
import { Component, Signal, computed, inject, signal } from "@angular/core";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { Firestore, addDoc, collection } from "@angular/fire/firestore";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";
import { RoutesConstants } from "@constants";
import { injectUserId } from "@utils";
import { tap } from "rxjs";
import { gameId } from "../../constants/game-id";
import { gameLabels } from "../../constants/game-labels";
import { gameRules } from "../../constants/game-rules";
import { PersistedCharacter } from "../../models";
import { characterForm } from "../../utils/character-form.injector";
import { CharacterFormComponent } from "../character-form/character-form.component";

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
export class CharacterCreationComponent {
	public characterCreationPending$$ = signal(false);

	protected readonly Labels = gameLabels;
	protected readonly characterForm = characterForm();
	protected readonly creationDisabled$$ = (() => {
		const creationGroupStatus$$ = toSignal(this.characterForm.statusChanges);
		const characterFormIsInvalid$$ = computed(() => creationGroupStatus$$() !== "VALID");

		return computed(() => this.characterCreationPending$$() || characterFormIsInvalid$$());
	})();
	protected readonly remainingAttributePoints$$ = (() => {
		const attributes$$ = toSignal(this.characterForm.controls.attributes.valueChanges, { initialValue: this.characterForm.getRawValue().attributes }) as Signal<
			PersistedCharacter["attributes"]
		>;
		const age$$ = toSignal(this.characterForm.controls.general.controls.age.valueChanges, { initialValue: this.characterForm.getRawValue().general.age });

		return computed(() => gameRules.computeRemainingAttributePoints(attributes$$(), age$$()));
	})();
	protected readonly remainingSkillPoints$$ = (() => {
		const skills$$ = toSignal(this.characterForm.controls.skills.valueChanges, { initialValue: this.characterForm.getRawValue().skills }) as Signal<PersistedCharacter["skills"]>;

		return computed(() => gameRules.computeRemainingSkillPoints(skills$$()));
	})();

	private readonly uid = injectUserId();
	private readonly firestore = inject(Firestore);
	private readonly router = inject(Router);

	constructor() {
		this.characterForm.controls.general.controls.luck.disable();

		this.characterForm.controls.general.controls.age.valueChanges
			.pipe(
				tap((age) => this.characterForm.controls.general.controls.luck.setValue(gameRules.computeLuck(age))),
				takeUntilDestroyed(),
			)
			.subscribe();
	}

	protected async createCharacter() {
		if (this.creationDisabled$$()) {
			return;
		}

		this.characterCreationPending$$.set(true);
		this.characterForm.disable();

		const characterToPersist: Partial<PersistedCharacter> = this.characterForm.getRawValue() as PersistedCharacter;
		characterToPersist.gameId = gameId;

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
