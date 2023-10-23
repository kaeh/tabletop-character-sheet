import { Character } from "src/app/interfaces/character.interface";

export const character: Character = {
    name: 'Warrior',
    careers: ['Warrior'],
    temper: 'Choleric',
    archetype: 'Warrior',
    motivation: 'To become the best warrior in the world',
    vices: 'Drinking',
    virtues: 'Honesty',
    money: 100,
    standardOfLiving: 'Average',

    // Characteristics
    coldBlood: {
        actual: 5,
        max: 5,
    },
    vitality: {
        actual: 12,
        max: -1,
    },
    destinyPoints: {
        actual: 5,
        max: 5,
    },
    experience: 0,
    initiative: 5,
    armor: 0,
    advantages: [],

    meleeWeapons: ['Sword', 'Dagger'],
    rangedWeapons: ['Bow'],
    equipment: ['Backpack', 'Torch'],

    // Skills
    skills: {
        combat: {
            actual: 25,
            base: 25,
            progression: {
                actual: 0,
                max: 6
            }
        },
        knowledge: {
            actual: 25,
            base: 25,
            progression: {
                actual: 0,
                max: 6
            }
        },
        stealth: {
            actual: 25,
            base: 25,
            progression: {
                actual: 0,
                max: 6
            }
        },
        endurance: {
            actual: 25,
            base: 25,
            progression: {
                actual: 0,
                max: 6
            }
        },
        strength: {
            actual: 25,
            base: 25,
            progression: {
                actual: 0,
                max: 6
            }
        },
        dexterity: {
            actual: 25,
            base: 25,
            progression: {
                actual: 0,
                max: 6
            }
        },
        magic: {
            actual: 25,
            base: 25,
            progression: {
                actual: 0,
                max: 6
            }
        },
        movement: {
            actual: 25,
            base: 25,
            progression: {
                actual: 0,
                max: 6
            }
        },
        perception: {
            actual: 25,
            base: 25,
            progression: {
                actual: 0,
                max: 6
            }
        },
        social: {
            actual: 25,
            base: 25,
            progression: {
                actual: 0,
                max: 6
            }
        },
        survival: {
            actual: 25,
            base: 25,
            progression: {
                actual: 0,
                max: 6
            }
        },
        shooting: {
            actual: 25,
            base: 25,
            progression: {
                actual: 0,
                max: 6
            }
        },
        willpower: {
            actual: 25,
            base: 25,
            progression: {
                actual: 0,
                max: 6
            }
        },
    },
};