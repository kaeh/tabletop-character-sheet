import { Skill } from "../interfaces/skill.interface";

export const Rules = {
    character: {
        computeMaxVitality: (strength: number, endurance: number, willpower: number): number => Math.floor(((strength + endurance) / 5) + (willpower / 10)),

        skills: {
            progressionFactor: 5,
            computeSkillLevel: ({ base, progression }: Skill): number => base + (progression.current * Rules.character.skills.progressionFactor)
        }
    }
}