import { Route } from "@angular/router";
import { GameSelectionRouteData } from "@ui/components/game-selection";

const baseTitle = "Création de partie";

export const characterCreationRoutes: Route[] = [
	{
		path: "",
		loadComponent: () => import("@ui/components/game-selection").then((m) => m.GameSelectionComponent),
		title: `${baseTitle}`,
		data: {
			subtitle: "Dans quel jeu se déroulera la partie ?",
		} as GameSelectionRouteData,
	},
	// {
	// 	path: RoutesConstants.talesFromTheLoop,
	// 	loadComponent: () => import("@features/games/tales-from-the-loop").then((m) => m.TalesFromTheLoopCharacterCreationComponent),
	// 	title: `${baseTitle} - ${TalesFromTheLoopLabels.title}`,
	// },
];
