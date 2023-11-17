import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { RouterLink } from "@angular/router";
import { RoutesConstants } from "@constants";
import { UsersService } from "@stores";
import { CreateCardComponent } from "@ui/components/create-card";
import { CharacterAvatarFallbackPipe, GameIdToTitlePipe } from "@ui/pipes";

@Component({
	selector: "app-characters-list",
	standalone: true,
	imports: [
		// Angular
		CommonModule,
		RouterLink,
		// Material
		MatCardModule,
		// Internal
		GameIdToTitlePipe,
		CreateCardComponent,
		CharacterAvatarFallbackPipe,
	],
	templateUrl: "./characters-list.component.html",
})
export class CharactersListComponent {
	protected readonly charactersList$ = inject(UsersService).currentUserAllCharacters$;

	protected readonly RoutesConstants = RoutesConstants;
}
