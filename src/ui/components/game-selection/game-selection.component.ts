import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { RouterLink } from "@angular/router";
import { GameCardComponent } from "../game-card";
import { registeredGameCard } from "../game-card/registered-games-cards";

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
	@Input({ required: true }) public title!: string;
	@Input({ required: true }) public subTitle!: string;

	@Output() public readonly cardClicked = new EventEmitter<string>();

	protected readonly gamesCards = registeredGameCard;
}
