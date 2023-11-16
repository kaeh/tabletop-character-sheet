import { DocumentReference } from "@angular/fire/firestore";
import { BasePersistedCharacter } from "./base-persisted-character.interface";
import { PersistedUser } from "./persisted-user.interface";

export interface BasePersistedParty<TCharacter = BasePersistedCharacter> {
	id: string;
	gameId: string;
	name: string;
	description: string;
	image?: string;

	gameMaster: DocumentReference<PersistedUser>;
	players: {
		ref: DocumentReference<PersistedUser>;
		character?: DocumentReference<TCharacter>;
	}[];
}
