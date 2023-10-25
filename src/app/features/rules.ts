
export const Rules = {
    character: {
        computeMaxVitality: (strength: number, endurance: number, willpower: number): number => Math.floor(((strength + endurance) / 5) + willpower),
        computeMaxColdBlood: (willpower: number, knowledge: number, combat: number): number => Math.floor(((willpower + knowledge) / 5) + combat),
        computeInitiative: (combat: number, movement: number, perception: number): number => combat + movement + perception,

        skills: {
            progressionFactor: 5,
            computeSkillLevel: (base: number, currentProgression: number): number => base + (currentProgression * Rules.character.skills.progressionFactor)
        }
    }
}