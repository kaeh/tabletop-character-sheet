import { Skill } from "./skill.interface";
import { VariableCharacteristic } from "./variable-characteristic.interface";

export interface Character {
    // General
    name: string;
    careers: string[];
    temper: string;
    archetype: string;
    motivation: string;
    vices: string;
    virtues: string;
    money: number;
    standardOfLiving: string;

    // Characteristics
    coldBlood: VariableCharacteristic;
    vitality: VariableCharacteristic;
    destinyPoints: VariableCharacteristic;
    experience: number;
    initiative: number;
    armor: number;
    advantages: string[];

    meleeWeapons: string[];
    rangedWeapons: string[];
    equipment: string[];

    // Skills
    skills: {
        combat: Skill;
        knowledge: Skill;
        stealth: Skill;
        endurance: Skill;
        strength: Skill;
        dexterity: Skill;
        magic: Skill;
        movement: Skill;
        perception: Skill;
        social: Skill;
        survival: Skill;
        shooting: Skill;
        willpower: Skill;
    };
}

export const Character = {
    computeMaxVitality: (strength: number, endurance: number, willpower: number): number => Math.floor(((strength + endurance) / 5) + (willpower / 10))
};