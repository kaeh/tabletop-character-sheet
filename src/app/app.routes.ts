import { Routes } from "@angular/router";
import { RoutesConstants } from "@constants";

export const routes: Routes = [
	{
		path: RoutesConstants.characterCreation,
		loadChildren: () => import("@features/character-creation").then((m) => m.characterCreationRoutes),
	},
	{
		path: "**",
		redirectTo: RoutesConstants.characterCreation,
		pathMatch: "full",
	},
];
