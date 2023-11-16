import { Route } from "@angular/router";
import { RoutesConstants } from "@constants";
import { gameLabels as TalesFromTheLoopLabels } from "@features/games/tales-from-the-loop/src/constants/game-labels";
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
	{
		path: RoutesConstants.talesFromTheLoop,
		loadComponent: () => import("@features/games/tales-from-the-loop").then((m) => m.PartyCreationComponent),
		title: `${baseTitle} - ${TalesFromTheLoopLabels.title}`,
	},
];
