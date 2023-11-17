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
		routeState: {
			ownerId: "ownerId",
		},
	},

	// Parties
	partyCreation: "party-creation",
	partiesList: {
		path: "parties",
		routeParams: {
			partyId: "partyId",
		},
	},
};
