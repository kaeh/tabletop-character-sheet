import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { RoutesConstants } from "@constants";
import { Observable, map } from "rxjs";
import { injectPartyName } from "./party-name.injector";

export const PartyTitleResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot): Observable<string> =>
	injectPartyName(route.paramMap.get(RoutesConstants.partiesList.routeParams.partyId) ?? "ERROR_NO_PARTY_ID").pipe(map((partyName) => partyName ?? ""));
