import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Firestore, doc, docData } from "@angular/fire/firestore";
import { ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { RoutesConstants } from "@constants";
import { injectUserId } from "@utils";
import { filter, map, switchMap, tap } from "rxjs";
import { CharacterFormComponent } from "../character-form/character-form.component";
import { gameLabels } from "../constants";
import { PersistedCharacter } from "../models";
import { characterForm } from "../utils/character-form.injector";
import { buildLuck } from "../utils/luck.injector";

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
	protected readonly characterForm = characterForm;
	protected readonly luck$$ = buildLuck(this.characterForm.controls.general.controls.age);

	private readonly uid = injectUserId();
	private readonly firestore = inject(Firestore);

	constructor() {
		inject(ActivatedRoute)
			.paramMap.pipe(
				map((paramMap) => paramMap.get(RoutesConstants.charactersList.routeParams.characterId) as string),
				map((characterId) => doc(this.firestore, "users", this.uid, "characters", characterId)),
				switchMap((characterDoc) => docData(characterDoc)),
				filter((character): character is PersistedCharacter => !!character),
				tap((character) => this.characterForm.patchValue(character)),
				takeUntilDestroyed(),
			)
			.subscribe();
	}

	truc(attributeKey: string) {
		this.characterForm.controls.attributes.get(attributeKey)?.enable();
	}
}
