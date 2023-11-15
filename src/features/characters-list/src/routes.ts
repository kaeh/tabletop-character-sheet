import { Route } from "@angular/router";

const baseTitle = "Liste des personnages";

export const charactersListRoutes: Route[] = [
	{
		path: "",
		loadComponent: () => import("./characters-list.component").then((m) => m.CharactersListComponent),
		title: `${baseTitle}`,
	},
];
