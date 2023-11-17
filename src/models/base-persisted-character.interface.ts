import { CollectionReference, DocumentReference } from "@angular/fire/firestore";

export interface BasePersistedCharacter {
	id: string;
	gameId: string;

	general: {
		firstName: string;
		lastName: string;
		avatar?: string;
	};
}

export type CharacterDocRef = DocumentReference<BasePersistedCharacter>;
export type CharactersCollectionRef = CollectionReference<BasePersistedCharacter>;

export const DefaultCharacter: BasePersistedCharacter = {
	id: "",
	gameId: "",

	general: {
		firstName: "",
		lastName: "",
		avatar: "",
	},
};
