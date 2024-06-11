import { inject } from "@angular/core";
import { type ActivatedRouteSnapshot, type CanActivateFn, Router } from "@angular/router";
import { RoutesConstants } from "@constants";
import { UsersService } from "@stores";
import { map } from "rxjs";

export const partyExists: CanActivateFn = (route: ActivatedRouteSnapshot) => {
	const router = inject(Router);

	const partyId = route.paramMap.get(RoutesConstants.partiesList.routeParams.partyId) ?? "ERROR_PARTY_ID_NOT_FOUND";

	return inject(UsersService)
		.currentUserHasAccessToParty(partyId)
		.pipe(map((hasAccess) => hasAccess || router.createUrlTree(["/", RoutesConstants.partiesList.path])));
};
