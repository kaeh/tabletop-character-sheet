export interface BasePersistedCharacter {
	id: string;
	gameId: string;

	general: {
		firstName: string;
		lastName: string;
		avatar?: string;
	};
}

export const DefaultCharacter: BasePersistedCharacter = {
	id: "",
	gameId: "",

	general: {
		firstName: "",
		lastName: "",
		avatar: "",
	},
};
