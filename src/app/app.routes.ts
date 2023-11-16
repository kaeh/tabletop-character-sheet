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
		loadComponent: () => import("@features/users/authentication").then((m) => m.AuthenticationComponent),
		...canActivate(redirectLoggedInToBase),
	},
	{
		path: "",
		loadComponent: () => import("@ui/components/main-layout").then((m) => m.MainLayoutComponent),
		...canActivate(redirectUnauthorizedToLogin),
		resolve: {
			uid: resolveUserId,
		},
		children: [
			{
				path: RoutesConstants.characterCreation,
				loadChildren: () => import("@features/characters/character-creation").then((m) => m.characterCreationRoutes),
			},
			{
				path: RoutesConstants.charactersList.path,
				loadChildren: () => import("@features/characters/characters-list").then((m) => m.charactersListRoutes),
			},
			{
				path: RoutesConstants.myProfile,
				loadComponent: () => import("@features/users/user-profile").then((m) => m.UserProfileComponent),
			},
			{ path: "", redirectTo: RoutesConstants.charactersList.path, pathMatch: "full" },
		],
	},
	{
		path: "**",
		redirectTo: RoutesConstants.charactersList.path,
		pathMatch: "full",
	},
];
