import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { DocumentReference, Firestore, doc, docData, updateDoc } from "@angular/fire/firestore";
import { ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RoutesConstants } from "@constants";
import { injectUserId } from "@utils";
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from "rxjs";
import { gameLabels } from "../../constants/game-labels";
import { PersistedCharacter } from "../../models";
import { buildCharacterForm } from "../../utils/character-form.injector";
import { CharacterFormComponent } from "../character-form/character-form.component";

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
export class CharacterSheetComponent {
	protected readonly Labels = gameLabels;
	protected readonly characterForm = buildCharacterForm();

	private _characterDoc!: DocumentReference<PersistedCharacter>;
	private readonly uid = injectUserId();
	private readonly characterOwner = inject(Router).getCurrentNavigation()?.extras.state?.[RoutesConstants.charactersList.routeState.ownerId] ?? this.uid;
	private readonly firestore = inject(Firestore);

	constructor() {
		inject(ActivatedRoute)
			.paramMap.pipe(
				map((paramMap) => paramMap.get(RoutesConstants.charactersList.routeParams.characterId) as string),
				map((characterId) => doc(this.firestore, "users", this.characterOwner, "characters", characterId)),
				switchMap((characterDoc) => docData(characterDoc)),
				filter((character): character is PersistedCharacter => !!character),
				tap((character) => this.characterForm.patchValue(character, { emitEvent: false })),
				tap((character) => this.characterForm.controls.general.controls.age.setValue(character.general.age, { emitEvent: false })),
				tap(() => {
					if (this.characterOwner !== this.uid) {
						this.characterForm.disable();
					}
				}),
				takeUntilDestroyed(),
			)
			.subscribe();

		this.characterForm.valueChanges
			.pipe(
				filter(() => this.characterForm.valid),
				distinctUntilChanged(),
				debounceTime(500),
				tap((value) => updateDoc(this._characterDoc, value)),
				takeUntilDestroyed(),
			)
			.subscribe();
	}
}
