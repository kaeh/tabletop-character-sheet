import { inject } from "@angular/core";
import { type ActivatedRouteSnapshot, type CanActivateFn, Router } from "@angular/router";
import { RoutesConstants } from "@constants";
import { UsersService } from "@stores";
import { map } from "rxjs";

export const characterExists: CanActivateFn = (route: ActivatedRouteSnapshot) => {
	const router = inject(Router);

	const characterOwner = router.getCurrentNavigation()?.extras.state?.[RoutesConstants.charactersList.routeState.ownerId] ?? inject(UsersService).currentUserId;
	const characterId = route.paramMap.get(RoutesConstants.charactersList.routeParams.characterId) ?? "ERROR_CHARACTER_ID_NOT_FOUND";

	return inject(UsersService)
		.getUserCharacter(characterOwner, characterId)
		.pipe(map((character) => (character ? true : router.createUrlTree(["/", RoutesConstants.charactersList.path]))));
};
