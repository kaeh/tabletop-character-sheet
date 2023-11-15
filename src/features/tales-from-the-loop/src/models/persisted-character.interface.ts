import { BasePersistedCharacter } from "@models";

export interface PersistedCharacter extends BasePersistedCharacter {
	general: {
		firstName: string;
		lastName: string;
		age: number;
		luck: number;
		archetype: string;
		fetish: string;
		favoriteSong: string;
		problem: string;
		drive: string;
	};
	attributes: {
		body: number;
		tech: number;
		heart: number;
		mind: number;
	};
	skills: {
		agility: number;
		strength: number;
		sneak: number;
		analyze: number;
		tinker: number;
		program: number;
		charisma: number;
		charm: number;
		contact: number;
		comprehend: number;
		discover: number;
		empathize: number;
	};
}
