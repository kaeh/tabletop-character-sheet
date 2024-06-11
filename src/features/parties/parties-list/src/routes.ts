import type { Route } from "@angular/router";
import { RoutesConstants } from "@constants";
import { PartyTitleResolver } from "@features/parties/party-page";
import { partyExists } from "@guards";

const baseTitle = "Liste des parties";

export const partiesListRoutes: Route[] = [
	{
		path: "",
		loadComponent: () => import("./parties-list.component").then((m) => m.PartiesListComponent),
		title: `${baseTitle}`,
	},
	{
		path: `:${RoutesConstants.partiesList.routeParams.partyId}`,
		loadComponent: () => import("@features/parties/party-page").then((m) => m.PartyPageComponent),
		title: PartyTitleResolver,
		canActivate: [partyExists],
	},
];
