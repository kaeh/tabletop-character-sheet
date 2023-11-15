import { Route } from "@angular/router";
import { RoutesConstants } from "@constants";
import { TalesFromTheLoopConstants } from "@features/games/tales-from-the-loop";
import { CharacterCreationRouteData } from "./character-creation-route-data.interface";

const baseTitle = "Création de personnage";

export const characterCreationRoutes: Route[] = [
	{
		path: "",
		loadComponent: () => import("./character-creation.component").then((m) => m.CharacterCreationComponent),
		title: `${baseTitle}`,
	},
	{
		path: RoutesConstants.talesFromTheLoop,
		loadComponent: () => import("@features/games/tales-from-the-loop").then((m) => m.TalesFromTheLoopCharacterCreationComponent),
		title: `${baseTitle} - ${TalesFromTheLoopConstants.labels.title}`,
		data: {
			card: {
				id: RoutesConstants.talesFromTheLoop,
				title: TalesFromTheLoopConstants.labels.title,
				image: "/assets/tales-from-the-loop/card-background2.jpg",
				description: "",
			},
		} as CharacterCreationRouteData,
	},
];
