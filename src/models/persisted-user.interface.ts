import { CollectionReference, DocumentReference } from "@angular/fire/firestore";
import { PartyDocRef } from "./base-persisted-party.interface";

export interface PersistedUser {
	id: string;
	displayName: string;
	avatar: string;
	parties: PartyDocRef[];
}

export type UserDocRef = DocumentReference<PersistedUser>;
export type UsersCollectionRef = CollectionReference<PersistedUser>;

export const DefaultUser: PersistedUser = {
	id: "",
	avatar: "",
	displayName: "",
	parties: [],
};

export const toMinimalUser = ({ id, displayName }: PersistedUser): Pick<PersistedUser, "id" | "displayName"> => ({ id, displayName });

export const outCurrentUser =
	(currentUserId: string) =>
	({ id }: PersistedUser) =>
		currentUserId !== id;
