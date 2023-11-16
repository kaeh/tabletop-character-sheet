import { Route } from "@angular/router";

const baseTitle = "Liste des parties";

export const partiesListRoutes: Route[] = [
	{
		path: "",
		loadComponent: () => import("./parties-list.component").then((m) => m.PartiesListComponent),
		title: `${baseTitle}`,
	},
];
