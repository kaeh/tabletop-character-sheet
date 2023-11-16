import { DocumentReference } from "@angular/fire/firestore";
import { BasePersistedParty } from "./base-persisted-party.interface";

export interface PersistedUser {
  displayName: string;
  avatar: string;
  parties: DocumentReference<BasePersistedParty>[];
}
