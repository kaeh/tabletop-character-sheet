import { inject } from "@angular/core";
import { Auth, user } from "@angular/fire/auth";
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { Routes } from "@angular/router";
import { RoutesConstants } from "@constants";
import { map, tap } from "rxjs";

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
		resolve: {
			uid: () =>
				user(inject(Auth)).pipe(
					tap(console.log),
					map((user) => user?.uid),
				),
		},
	},
	{
		path: "**",
		redirectTo: RoutesConstants.characterCreation,
		pathMatch: "full",
	},
];
