import { Route } from "@angular/router";
import { GamesLabels, RoutesConstants } from "@constants";
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
	// 	loadComponent: () => import("@features/brigandine").then((m) => m.BrigandineCharacterCreationComponent),
	// 	title: `${baseTitle} - Brigandine`,
	// 	data: {
	// 		card: {
	// 			title: "Brigandine",
	// 			image: "/assets/brigandine/brigandine.jpg",
	// 			description: "",
	// 		},
	// 	} as CharacterCreationRouteData,
	// },
	{
		path: RoutesConstants.talesFromTheLoop,
		loadComponent: () => import("@features/tales-from-the-loop").then((m) => m.TalesFromTheLoopCharacterCreationComponent),
		title: `${baseTitle} - ${GamesLabels.talesFromTheLoop}`,
		data: {
			card: {
				id: RoutesConstants.talesFromTheLoop,
				title: GamesLabels.talesFromTheLoop.title,
				image: "/assets/tales-from-the-loop/card-background2.jpg",
				description: "",
			},
		} as CharacterCreationRouteData,
	},
];
