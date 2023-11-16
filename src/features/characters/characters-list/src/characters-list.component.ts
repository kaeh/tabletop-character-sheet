import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Firestore, collection, collectionData } from "@angular/fire/firestore";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { RoutesConstants } from "@constants";
import { BasePersistedCharacter } from "@models";
import { GameIdToLabelPipe } from "@ui/pipes";
import { injectUserId } from "@utils";
import { Observable } from "rxjs";

type CharactersList = BasePersistedCharacter[];
type AsyncCharactersList = Observable<CharactersList>;

@Component({
	selector: "app-characters-list",
	standalone: true,
	imports: [
		// Angular
		CommonModule,
		NgOptimizedImage,
		RouterLink,
		// Material
		MatCardModule,
		MatIconModule,
		MatButtonModule,
		// Internal
		GameIdToLabelPipe,
	],
	templateUrl: "./characters-list.component.html",
	styleUrl: "./characters-list.component.scss",
})
export class CharactersListComponent {
	protected readonly charactersList$ = collectionData(collection(inject(Firestore), "users", injectUserId(), "characters"), { idField: "id" }) as AsyncCharactersList;

	protected readonly RoutesConstants = RoutesConstants;
}
