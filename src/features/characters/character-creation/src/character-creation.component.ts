import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { GameSelectionComponent } from "@ui/components/game-selection";
import { GameCardComponent } from "./game-card/game-card.component";

@Component({
	selector: "app-character-creation",
	standalone: true,
	imports: [
		// Angular
		CommonModule,
		RouterLink,
		// Internal
		GameCardComponent,
		GameSelectionComponent,
	],
	templateUrl: "./character-creation.component.html",
	styleUrls: ["./character-creation.component.scss"],
})
export class CharacterCreationComponent {
	protected readonly title = inject(ActivatedRoute).snapshot.title;

	private readonly router = inject(Router);
	private readonly activatedRoute = inject(ActivatedRoute);

	protected onGameCardClicked(gameId: string): void {
		this.router.navigate([gameId], { relativeTo: this.activatedRoute });
	}
}
