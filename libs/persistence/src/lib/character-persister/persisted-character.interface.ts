import { PersistedSkill } from './persisted-skill.interface';

export interface PersistedCharacter {
  name: string;

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

export type PersistedCharacterList = Map<string, PersistedCharacter>;
export type PersistedCharacterPropertyKey = keyof PersistedCharacter;
