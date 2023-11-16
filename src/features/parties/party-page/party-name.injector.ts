import { map } from "rxjs";
import { injectParty } from "./party.injector";

export const injectPartyName = (partyId: string) => injectParty(partyId).pipe(map((party) => party?.name));
