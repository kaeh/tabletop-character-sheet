import { inject } from "@angular/core";
import { Auth, user } from "@angular/fire/auth";
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { Routes } from "@angular/router";
import { RoutesConstants } from "@constants";
import { map } from "rxjs";

const redirectLoggedInToBase = () => redirectLoggedInTo(["/"]);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["/", RoutesConstants.authentication]);
const resolveUserId = () => user(inject(Auth)).pipe(map((user) => user?.uid));

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
			uid: resolveUserId,
		},
	},
	{
		path: RoutesConstants.charactersList.path,
		loadChildren: () => import("@features/characters-list").then((m) => m.charactersListRoutes),
		...canActivate(redirectUnauthorizedToLogin),
		resolve: {
			uid: resolveUserId,
		},
	},
	{
		path: "**",
		redirectTo: RoutesConstants.charactersList.path,
		pathMatch: "full",
	},
];
