import { DocumentReference } from "@angular/fire/firestore";
import { BasePersistedCharacter } from "./base-persisted-character.interface";
import { PersistedUser } from "./persisted-user.interface";

export interface Player<TCharacter = BasePersistedCharacter> {
	ref: DocumentReference<PersistedUser>;
	character?: DocumentReference<TCharacter>;
}
