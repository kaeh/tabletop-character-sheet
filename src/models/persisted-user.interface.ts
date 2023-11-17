import { DocumentReference } from "@angular/fire/firestore";
import { BasePersistedParty } from "./base-persisted-party.interface";

export interface PersistedUser {
	id?: string;
	displayName: string;
	avatar: string;
	parties: DocumentReference<BasePersistedParty>[];
}

export const DefaultUser: PersistedUser = {
	avatar: "",
	displayName: "",
	parties: [],
};
