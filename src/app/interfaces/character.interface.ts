import { Skill } from "./skill.interface";
import { VariableCharacteristic } from "./variable-characteristic.interface";

export interface Character {
    // General
    name: string;
    sex: 'M' | 'F';
    age: number;
    height: number;
    weight: number;
    description: string;
    image: string;

    archetype: string;
    career: string;
    standardOfLiving: string;
    vice: string;
    virtue: string;
    motivation: string;

    vitality: VariableCharacteristic;
    composure: VariableCharacteristic;
    destinyPoints: VariableCharacteristic;
    protection: number;
    experience: number;
    money: number;

    // Attributes

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
        survival: Skill;
        shooting: Skill;
        willpower: Skill;
    }
}