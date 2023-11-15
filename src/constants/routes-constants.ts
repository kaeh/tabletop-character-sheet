export const RoutesConstants = {
	// Auth
	authentication: "authentication",

	// Settings
	myProfile: "my-profile",

	// Games
	gamesList: "games-list",
	brigandine: "brigandine",
	talesFromTheLoop: "tales-from-the-loop",

	// Characters
	characterCreation: "character-creation",
	charactersList: {
		path: "characters",
		routeParams: {
			characterId: "characterId",
		},
	},

	// Parties
	partiesList: {
		path: "parties",
		routeParams: {
			characterId: "partyId",
		},
	},
};
