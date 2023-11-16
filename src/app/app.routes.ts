import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { Routes } from "@angular/router";
import { RoutesConstants } from "@constants";

const redirectLoggedInToBase = () => redirectLoggedInTo(["/"]);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["/", RoutesConstants.authentication]);

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
				path: RoutesConstants.partyCreation,
				loadChildren: () => import("@features/parties/party-creation").then((m) => m.characterCreationRoutes),
			},
			{
				path: RoutesConstants.partiesList.path,
				loadChildren: () => import("@features/parties/parties-list").then((m) => m.partiesListRoutes),
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
