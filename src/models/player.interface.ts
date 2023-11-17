import { DocumentReference } from "@angular/fire/firestore";
import { BasePersistedCharacter } from "./base-persisted-character.interface";
import { UserDocRef } from "./persisted-user.interface";

export interface Player<TCharacter = BasePersistedCharacter> {
	ref: UserDocRef;
	character?: DocumentReference<TCharacter>;
}
