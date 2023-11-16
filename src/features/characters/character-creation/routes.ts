import { Route } from "@angular/router";
import { RoutesConstants } from "@constants";
import { gameLabels as TalesFromTheLoopLabels } from "@features/games/tales-from-the-loop/src/constants/game-labels";
import { GameSelectionRouteData } from "@ui/components/game-selection";

const baseTitle = "Création de personnage";

export const characterCreationRoutes: Route[] = [
	{
		path: "",
		loadComponent: () => import("@ui/components/game-selection").then((m) => m.GameSelectionComponent),
		title: `${baseTitle}`,
		data: {
			subtitle: "De quel jeu sera issue le personnage ?",
		} as GameSelectionRouteData,
	},
	{
		path: RoutesConstants.talesFromTheLoop,
		loadComponent: () => import("@features/games/tales-from-the-loop").then((m) => m.CharacterCreationComponent),
		title: `${baseTitle} - ${TalesFromTheLoopLabels.title}`,
	},
];
