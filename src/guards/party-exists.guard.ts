import { inject } from "@angular/core";
import { Firestore, doc, docData } from "@angular/fire/firestore";
import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";
import { RoutesConstants } from "@constants";
import { PersistedUser } from "@models";
import { map } from "rxjs";
import { injectUserId } from "../utils/user-id.injector";

export const partyExists: CanActivateFn = (route: ActivatedRouteSnapshot) => {
	const router = inject(Router);

	return docData(doc(inject(Firestore), "users", injectUserId())).pipe(
		map((user) => (user as PersistedUser).parties?.find((party) => party.id === route.paramMap.get(RoutesConstants.partiesList.routeParams.partyId))),
		map((character) => (character ? true : router.createUrlTree(["/", RoutesConstants.partiesList.path]))),
	);
};
