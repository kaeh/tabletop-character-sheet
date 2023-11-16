export interface BasePersistedParty {
	id: string;
	gameId: string;
	campaignLabel: string;
	image?: string;

	players: {
		id: string;
		character: string;
	}[];
}
