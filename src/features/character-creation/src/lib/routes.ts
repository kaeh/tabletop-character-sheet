import { Route } from "@angular/router";
import { RoutesConstants } from "@constants";
import { CharacterCreationRouteData } from "./character-creation-route-data.interface";

const baseTitle = "Création de personnage";

export const characterCreationRoutes: Route[] = [
	{
		path: "",
		loadComponent: () => import("./character-creation.component").then((m) => m.CharacterCreationComponent),
		title: `${baseTitle}`,
	},
	// {
	// 	path: RoutesConstants.brigandine,
	// 	loadComponent: () =>
	// 		import("@kaeh/features/brigandine").then(
	// 			(m) => m.BrigandineCharacterCreationComponent,
	// 		),
	// 	title: `${baseTitle} - Brigandine`,
	// 	data: {
	// 		card: {
	// 			title: "Brigandine",
	// 			image: "assets/brigandine/brigandine.jpg",
	// 		},
	// 	} as CharacterCreationRouteData,
	// },
	{
		path: RoutesConstants.talesFromTheLoop,
		loadComponent: () => import("@features/tales-from-the-loop").then((m) => m.TalesFromTheLoopCharacterCreationComponent),
		title: `${baseTitle} - Tales from the Loop`,
		data: {
			card: {
				title: "Tales from the Loop",
				image: "assets/tales-from-the-loop/tales-from-the-loop.jpg",
			},
		} as CharacterCreationRouteData,
	},
];
