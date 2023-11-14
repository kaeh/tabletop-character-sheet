import { CommonModule } from "@angular/common";
import { Component, computed, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Firestore } from "@angular/fire/firestore";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { ActivatedRoute } from "@angular/router";
import { GamesLabels } from "@constants";
import { ControlsToKeyLabelPipe } from "@ui/pipes";

// TODO Persist character on each change to let user come back to pending character creation later
@Component({
	selector: "kaeh-tales-from-the-loop-character-creation",
	standalone: true,
	imports: [
		// Angular
		CommonModule,
		ReactiveFormsModule,
		// Material
		MatButtonModule,
		MatInputModule,
		// Internal
		ControlsToKeyLabelPipe,
	],
	templateUrl: "./tales-from-the-loop-character-creation.component.html",
	styleUrls: ["./tales-from-the-loop-character-creation.component.scss"],
})
export class TalesFromTheLoopCharacterCreationComponent {
	protected readonly Labels = GamesLabels.talesFromTheLoop;
	protected readonly ageRange = { min: 10, max: 15 };
	protected readonly attributeRange = { min: 0, max: 5 };
	protected readonly skillRange = { min: 0, max: 5 };
	protected readonly creationGroup = inject(FormBuilder).nonNullable.group({
		general: inject(FormBuilder).nonNullable.group({
			firstName: inject(FormBuilder).nonNullable.control(""),
			lastName: inject(FormBuilder).nonNullable.control(""),
			age: inject(FormBuilder).nonNullable.control(10, [Validators.min(this.ageRange.min), Validators.max(this.ageRange.max)]),
			archetype: inject(FormBuilder).nonNullable.control(""),
			fetish: inject(FormBuilder).nonNullable.control(""),
			favoriteSong: inject(FormBuilder).nonNullable.control(""),
			problem: inject(FormBuilder).nonNullable.control(""),
			drive: inject(FormBuilder).nonNullable.control(""),
		}),
		// TODO : Add validation to ensure that the sum of attributes is equal to age
		attributes: inject(FormBuilder).nonNullable.group({
			body: inject(FormBuilder).nonNullable.control(0, [Validators.min(this.attributeRange.min), Validators.max(this.attributeRange.max)]),
			tech: inject(FormBuilder).nonNullable.control(0, [Validators.min(this.attributeRange.min), Validators.max(this.attributeRange.max)]),
			heart: inject(FormBuilder).nonNullable.control(0, [Validators.min(this.attributeRange.min), Validators.max(this.attributeRange.max)]),
			mind: inject(FormBuilder).nonNullable.control(0, [Validators.min(this.attributeRange.min), Validators.max(this.attributeRange.max)]),
		}),
		// TODO : Add validation to ensure that the sum of skills is equal to 10
		skills: inject(FormBuilder).nonNullable.group({
			agility: inject(FormBuilder).nonNullable.control(0, [Validators.min(this.skillRange.min), Validators.max(this.skillRange.max)]),
			strength: inject(FormBuilder).nonNullable.control(0, [Validators.min(this.skillRange.min), Validators.max(this.skillRange.max)]),
			sneak: inject(FormBuilder).nonNullable.control(0, [Validators.min(this.skillRange.min), Validators.max(this.skillRange.max)]),
			analyze: inject(FormBuilder).nonNullable.control(0, [Validators.min(this.skillRange.min), Validators.max(this.skillRange.max)]),
			tinker: inject(FormBuilder).nonNullable.control(0, [Validators.min(this.skillRange.min), Validators.max(this.skillRange.max)]),
			program: inject(FormBuilder).nonNullable.control(0, [Validators.min(this.skillRange.min), Validators.max(this.skillRange.max)]),
			charisma: inject(FormBuilder).nonNullable.control(0, [Validators.min(this.skillRange.min), Validators.max(this.skillRange.max)]),
			charm: inject(FormBuilder).nonNullable.control(0, [Validators.min(this.skillRange.min), Validators.max(this.skillRange.max)]),
			contact: inject(FormBuilder).nonNullable.control(0, [Validators.min(this.skillRange.min), Validators.max(this.skillRange.max)]),
			comprehend: inject(FormBuilder).nonNullable.control(0, [Validators.min(this.skillRange.min), Validators.max(this.skillRange.max)]),
			discover: inject(FormBuilder).nonNullable.control(0, [Validators.min(this.skillRange.min), Validators.max(this.skillRange.max)]),
			empathize: inject(FormBuilder).nonNullable.control(0, [Validators.min(this.skillRange.min), Validators.max(this.skillRange.max)]),
		}),
	});
	protected readonly luck$$ = (() => {
		const age$$ = toSignal(this.creationGroup.controls.general.controls.age.valueChanges);
		return computed(() => 15 - (age$$() ?? 10));
	})();

	private readonly uid: string = inject(ActivatedRoute).snapshot.data["uid"];
	private readonly firestore = inject(Firestore);

	protected async createCharacter() {
		if (this.creationGroup.invalid) {
			return;
		}

		const character: any = this.creationGroup.value;
		character.general.luck = this.luck$$();
		character.proprietary = this.uid;

		try {
			// TODO : Push reference in user characters array
			// const charactersCollection = collection(this.firestore, "characters");
			// const persistedCharacter = await addDoc(charactersCollection, character);
			// const currentUserDoc = doc(this.firestore, "users", this.uid);
			// runTransaction(this.firestore, async (transaction) => {
			// 	const currentUser = await transaction.get(currentUserDoc);
			// 	const characters = currentUser.get("characters") ?? [];
			// 	characters.push(`/characters/${persistedCharacter.id}`);
			// 	transaction.update(currentUserDoc, { characters });
			// });
		} catch (error) {
			console.error(error);
		} finally {
			// TODO
		}
	}
}
