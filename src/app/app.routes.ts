import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { Routes } from "@angular/router";
import { RoutesConstants } from "@constants";

const redirectLoggedInToBase = () => redirectLoggedInTo(["/"]);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["/", RoutesConstants.authentication]);

export const routes: Routes = [
	{
		path: RoutesConstants.authentication,
		loadComponent: () => import("@features/authentication").then((m) => m.AuthenticationComponent),
		...canActivate(redirectLoggedInToBase),
	},
	{
		path: RoutesConstants.characterCreation,
		loadChildren: () => import("@features/character-creation").then((m) => m.characterCreationRoutes),
		...canActivate(redirectUnauthorizedToLogin),
	},
	{
		path: "**",
		redirectTo: RoutesConstants.characterCreation,
		pathMatch: "full",
	},
];
