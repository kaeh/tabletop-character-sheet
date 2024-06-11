import type { DocumentReference } from "@angular/fire/firestore";
import type { BasePersistedCharacter } from "./base-persisted-character.interface";
import type { UserDocRef } from "./persisted-user.interface";
import type { Player } from "./player.interface";

export interface BasePersistedParty<TCharacter = BasePersistedCharacter> {
	id: string;
	gameId: string;
	name: string;
	description: string;
	image?: string;

	gameMaster: UserDocRef;
	players: Player<TCharacter>[];
}

export type PartyDocRef = DocumentReference<BasePersistedParty>;
