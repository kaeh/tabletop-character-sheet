import type { DocumentReference } from "@angular/fire/firestore";
import type { BasePersistedCharacter } from "./base-persisted-character.interface";
import type { UserDocRef } from "./persisted-user.interface";

export interface Player<TCharacter = BasePersistedCharacter> {
	ref: UserDocRef;
	character?: DocumentReference<TCharacter>;
}
