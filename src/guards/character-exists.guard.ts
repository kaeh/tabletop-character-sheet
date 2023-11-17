import { inject } from "@angular/core";
import { Firestore, doc, docData } from "@angular/fire/firestore";
import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";
import { RoutesConstants } from "@constants";
import { map } from "rxjs";
import { injectUserId } from "../utils/user-id.injector";

export const characterExists: CanActivateFn = (route: ActivatedRouteSnapshot) => {
	const router = inject(Router);

	const characterOwner = router.getCurrentNavigation()?.extras.state?.[RoutesConstants.charactersList.routeState.ownerId] ?? injectUserId();

	return docData(doc(inject(Firestore), "users", characterOwner, "characters", route.paramMap.get(RoutesConstants.charactersList.routeParams.characterId) ?? "")).pipe(
		map((character) => (character ? true : router.createUrlTree(["/", RoutesConstants.charactersList.path]))),
	);
};