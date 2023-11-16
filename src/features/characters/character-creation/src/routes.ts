import { Route } from "@angular/router";
import { RoutesConstants } from "@constants";
import { gameLabels as TalesFromTheLoopLabels } from "@features/games/tales-from-the-loop/src/constants/game-labels";

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
		title: `${baseTitle} - ${TalesFromTheLoopLabels.title}`,
	},
];
