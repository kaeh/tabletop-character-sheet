import type { Route } from "@angular/router";
import { RoutesConstants } from "@constants";
import { gameId } from "@features/games/tales-from-the-loop/src/constants/game-id";
import { gameLabels as TalesFromTheLoopLabels } from "@features/games/tales-from-the-loop/src/constants/game-labels";
import type { GameSelectionRouteData } from "@ui/components/game-selection";
import type { PartyCreationRouteData } from "./party-creation-route-data.interface";

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
		loadComponent: () => import("./party-creation.component").then((m) => m.PartyCreationComponent),
		title: `${baseTitle} - ${TalesFromTheLoopLabels.title}`,
		data: {
			gameId: gameId,
		} as PartyCreationRouteData,
	},
];
