import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { DocumentReference, Firestore, doc, docData, updateDoc } from "@angular/fire/firestore";
import { ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { RoutesConstants } from "@constants";
import { injectUserId } from "@utils";
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from "rxjs";
import { CharacterFormComponent } from "../character-form/character-form.component";
import { gameLabels } from "../constants/game-labels";
import { PersistedCharacter } from "../models";
import { characterForm } from "../utils/character-form.injector";

@Component({
	selector: "app-character-sheet",
	standalone: true,
	imports: [
		// Angular
		CommonModule,
		ReactiveFormsModule,
		// Internal
		CharacterFormComponent,
	],
	templateUrl: "./character-sheet.component.html",
})
export class TalesFromTheLoopCharacterSheetComponent {
	protected readonly Labels = gameLabels;
	protected readonly characterForm = characterForm();

	private _characterDoc!: DocumentReference<PersistedCharacter>;
	private readonly uid = injectUserId();
	private readonly firestore = inject(Firestore);

	constructor() {
		inject(ActivatedRoute)
			.paramMap.pipe(
				map((paramMap) => paramMap.get(RoutesConstants.charactersList.routeParams.characterId) as string),
				map((characterId) => {
					this._characterDoc = doc(this.firestore, "users", this.uid, "characters", characterId) as DocumentReference<PersistedCharacter>;
					return this._characterDoc;
				}),
				switchMap((characterDoc) => docData(characterDoc)),
				filter((character): character is PersistedCharacter => !!character),
				tap((character) => this.characterForm.patchValue(character, { emitEvent: false })),
				tap((character) => this.characterForm.controls.general.controls.age.setValue(character.general.age, { emitEvent: false })),
				takeUntilDestroyed(),
			)
			.subscribe();

		this.characterForm.valueChanges
			.pipe(
				distinctUntilChanged(),
				debounceTime(500),
				tap(console.log),
				tap((value) => updateDoc(this._characterDoc, value)),
				takeUntilDestroyed(),
			)
			.subscribe();
	}
}
