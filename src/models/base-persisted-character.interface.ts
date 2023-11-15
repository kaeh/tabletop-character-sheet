export interface BasePersistedCharacter {
	id: string;
	gameId: string;

	general: {
		firstName: string;
		lastName: string;
		avatar?: string;
	};
}
