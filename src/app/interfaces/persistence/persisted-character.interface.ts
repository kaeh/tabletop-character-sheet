import { PersistedSkill } from "./persisted-skill.interface";

export interface PersistedCharacter {
    strength: PersistedSkill;
    endurance: PersistedSkill;
    willpower: PersistedSkill;
    knowledge: PersistedSkill;
    combat: PersistedSkill;
    movement: PersistedSkill;
    perception: PersistedSkill;

    vitality: number;
    coldBlood: number;
}

export type PersistedCharacterList = { character: PersistedCharacter, uniqKey: string }[];