import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { GameCardComponent } from "../game-card";
import { registeredGameCard } from "../game-card/registered-games-cards";
import type { GameSelectionRouteData } from "./game-selection-route-data.interface";

@Component({
	selector: "app-game-selection",
	standalone: true,
	imports: [
		// Angular
		CommonModule,
		RouterLink,
		// Internal
		GameCardComponent,
	],
	templateUrl: "./game-selection.component.html",
})
export class GameSelectionComponent {
	protected readonly activatedRoute = inject(ActivatedRoute);
	protected readonly title = this.activatedRoute.snapshot.title;
	protected readonly subtitle = (this.activatedRoute.snapshot.data as GameSelectionRouteData).subtitle;
	protected readonly gamesCards = registeredGameCard;
}
