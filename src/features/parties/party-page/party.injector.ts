import { inject } from "@angular/core";
import { Firestore, doc, docData } from "@angular/fire/firestore";
import { BasePersistedParty } from "@models";
import { Observable } from "rxjs";

export const injectParty = (partyId: string) => docData(doc(inject(Firestore), "parties", partyId), { idField: "id" }) as Observable<BasePersistedParty | undefined>;
