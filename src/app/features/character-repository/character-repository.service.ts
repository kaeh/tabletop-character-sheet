import { Injectable } from "@angular/core";
import { Character } from "src/app/interfaces/character.interface";
import { Skill } from "src/app/interfaces/skill.interface";
import { Rules } from "../rules";

@Injectable({
    providedIn: 'root'
})
export class CharacterRepository {
    public get character(): Character {
        return this._character;
    }

    private _character: Character = {} as Character;

    public initCharacter(character: Character): void {
        this._character = character;

        // Init Skills levels
        // this.updateCharacterSkills();
        Object.entries(this.character.skills).forEach(([skillName, skill]) => {
            this.updateCharacterSkillLevel(skill, false)
            // TODO : Compute the real value
            switch (skillName) {
                case 'strength':
                    skill.progression.max = 6;
                    break;
                case 'endurance':
                    skill.progression.max = 5;
                    break;
                case 'willpower':
                    skill.progression.max = 3;
                    break;
                default:
                    skill.progression.max = 6;
                    break;
            }
        });

        // Init Max Vitality
        this.updateCharacterVitality();
    }

    public updateSkillProgressionLevel(skillName: keyof Character['skills'], newProgression: number): void {
        const skill: Skill = (this.character.skills as any)[skillName];
        skill.progression.current = newProgression;

        this.updateCharacterSkillLevel(skill);
    }

    private updateCharacterVitality(): void {
        this.character.vitality.max = Rules.character.computeMaxVitality(this.character.skills.strength.level, this.character.skills.endurance.level, this.character.skills.willpower.level);
    }

    private updateCharacterSkillLevel(skill: Skill, doComputation = true): void {
        skill.level = Rules.character.skills.computeSkillLevel(skill);

        if (doComputation) {
            this.updateCharacterVitality();
        }
    }
}