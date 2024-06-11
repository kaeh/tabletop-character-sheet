import { inject } from "@angular/core";
import { Firestore, doc, docData } from "@angular/fire/firestore";
import type { BasePersistedParty } from "@models";
import type { Observable } from "rxjs";

export const injectParty = (partyId: string) => docData(doc(inject(Firestore), "parties", partyId), { idField: "id" }) as Observable<BasePersistedParty | undefined>;
