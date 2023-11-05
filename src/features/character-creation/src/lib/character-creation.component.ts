import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CharacterCreationRouteData } from "./character-creation-route-data.interface";
import { characterCreationRoutes } from "./routes";

@Component({
	selector: "kaeh-character-creation",
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: "./character-creation.component.html",
	styleUrls: ["./character-creation.component.scss"],
})
export class CharacterCreationComponent {
	protected readonly activatedRoute = inject(ActivatedRoute);

	protected readonly gamesCards = characterCreationRoutes
		.filter((r) => r.data)
		.map((r) => ({
			...(r.data as CharacterCreationRouteData).card,
			route: r.path,
		}));
}
