import { CommonModule } from "@angular/common";
import { Component, Signal, computed, inject, signal } from "@angular/core";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { Firestore, addDoc, collection } from "@angular/fire/firestore";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";
import { RoutesConstants } from "@constants";
import { buildAsyncFormStatusSignal, injectUserId } from "@utils";
import { tap } from "rxjs";
import { gameId } from "../../constants/game-id";
import { gameLabels } from "../../constants/game-labels";
import { gameRules } from "../../constants/game-rules";
import { PersistedCharacter } from "../../models";
import { buildCharacterForm } from "../../utils/character-form.injector";
import { CharacterFormComponent } from "../character-form/character-form.component";

type AttributesSignal = Signal<PersistedCharacter["attributes"]>;
type SkillsSignal = Signal<PersistedCharacter["skills"]>;

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
	protected readonly creationDisabled$$: Signal<boolean>;
	protected readonly remainingAttributePoints$$: Signal<number>;
	protected readonly remainingSkillPoints$$: Signal<number>;

	protected readonly title = gameLabels.title;
	protected readonly characterForm = buildCharacterForm();

	private readonly _characterCreationPending$$ = signal(false);
	private readonly _uid = injectUserId();
	private readonly _firestore = inject(Firestore);
	private readonly _router = inject(Router);

	constructor() {
		const { attributes, general, skills } = this.characterForm.getRawValue();
		const age$$ = toSignal(this.characterForm.controls.general.controls.age.valueChanges, { initialValue: general.age });
		const attributes$$ = toSignal(this.characterForm.controls.attributes.valueChanges, { initialValue: attributes }) as AttributesSignal;
		const skills$$ = toSignal(this.characterForm.controls.skills.valueChanges, { initialValue: skills }) as SkillsSignal;

		this.creationDisabled$$ = buildAsyncFormStatusSignal(this.characterForm, this._characterCreationPending$$);
		this.remainingAttributePoints$$ = computed(() => gameRules.computeRemainingAttributePoints(attributes$$(), age$$()));
		this.remainingSkillPoints$$ = computed(() => gameRules.computeRemainingSkillPoints(skills$$()));

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

		this._characterCreationPending$$.set(true);
		this.characterForm.disable();

		const characterToPersist: Partial<PersistedCharacter> = this.characterForm.getRawValue() as PersistedCharacter;
		characterToPersist.gameId = gameId;

		try {
			const userCharactersCollection = collection(this._firestore, "users", this._uid, "characters");
			await addDoc(userCharactersCollection, characterToPersist);
			this._router.navigate(["/", RoutesConstants.charactersList.path]);
		} catch (error) {
			console.error(error);
		} finally {
			this._characterCreationPending$$.set(false);
			this.characterForm.enable();
		}
	}
}
