import { Route } from "@angular/router";
import { RoutesConstants } from "@constants";

const baseTitle = "Liste des personnages";

export const charactersListRoutes: Route[] = [
	{
		path: "",
		loadComponent: () => import("./characters-list.component").then((m) => m.CharactersListComponent),
		title: `${baseTitle}`,
	},
	{
		path: `${RoutesConstants.talesFromTheLoop}/:${RoutesConstants.charactersList.routeParams.characterId}`,
		loadComponent: () => import("@features/tales-from-the-loop").then((m) => m.TalesFromTheLoopCharacterSheetComponent),
	},
];
