import { PersistedCharacter } from "../models";

const computeSumOfPropertiesValues = <T extends Record<string, number>>(object: T) => Object.values(object).reduce((sum, value) => sum + value, 0);

export const gameRules = {
	ageRange: { min: 10, max: 15 },
	attributeRange: { min: 0, max: 5 },
	skillRange: { min: 0, max: 5 },
	computeLuck: (age: number) => gameRules.ageRange.max - (age || gameRules.ageRange.min),
	computeRemainingAttributePoints: (attributes: PersistedCharacter["attributes"], age: number) => age - computeSumOfPropertiesValues(attributes),
	computeRemainingSkillPoints: (skills: PersistedCharacter["skills"]) => 10 - computeSumOfPropertiesValues(skills),
};
