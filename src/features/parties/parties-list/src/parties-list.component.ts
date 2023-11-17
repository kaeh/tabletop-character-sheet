import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterLink } from "@angular/router";
import { RoutesConstants } from "@constants";
import { UsersService } from "@stores";
import { CreateCardComponent } from "@ui/components/create-card";
import { GameIdToTitlePipe, PartyImageFallbackPipe, RefToDocPipe, ToPersistedUserPipe, UserAvatarFallbackPipe } from "@ui/pipes";

@Component({
	selector: "app-parties-list",
	standalone: true,
	templateUrl: "./parties-list.component.html",
	imports: [
		// Angular
		CommonModule,
		RouterLink,
		// Material
		MatCardModule,
		MatTooltipModule,
		// Internal
		CreateCardComponent,
		RefToDocPipe,
		ToPersistedUserPipe,
		UserAvatarFallbackPipe,
		GameIdToTitlePipe,
		PartyImageFallbackPipe,
	],
})
export class PartiesListComponent {
	protected readonly partiesList$ = inject(UsersService).currentUserParties$;

	protected readonly RoutesConstants = RoutesConstants;
}
