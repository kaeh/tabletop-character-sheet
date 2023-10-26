import { Injectable, computed, inject } from "@angular/core";
import { PersistedCharacter } from "src/app/interfaces/persistence/persisted-character.interface";
import { PersistedSkill } from "src/app/interfaces/persistence/persisted-skill.interface";
import { Skill } from "src/app/interfaces/skill.interface";
import { CharacterPersisterService } from "../character-persister/character-persister.service";
import { Rules } from "../rules";

const extractTensDigit = (value: number): number => Math.floor(value / 10);



@Injectable({
    providedIn: 'root'
})
export class CharacterRepository {
    // TODO : Generate a unique key for each character
    private readonly characterUniqueKey = 'character';
    private readonly characterPersisterService = inject(CharacterPersisterService);

    public readonly skills = {
        strength: new Skill(),
        endurance: new Skill(),
        willpower: new Skill(),
        knowledge: new Skill(),
        combat: new Skill(),
        movement: new Skill(),
        perception: new Skill(),
    }

    public readonly vitality = {
        current: 0,
        max: computed(() => Rules.character.computeMaxVitality(this.skills.strength.level(), this.skills.endurance.level(), this.skills.willpower.level()))
    };
    public readonly coldBlood = {
        current: 0,
        max: computed(() => Rules.character.computeMaxColdBlood(this.skills.willpower.level(), this.skills.knowledge.level(), this.skills.combat.level()))
    };
    public readonly initiative = computed(() => Rules.character.computeInitiative(extractTensDigit(this.skills.combat.level()), extractTensDigit(this.skills.movement.level()), extractTensDigit(this.skills.perception.level())));

    constructor() {
        const persistedCharacter = this.characterPersisterService.get(this.characterUniqueKey);

        this.initSkills(persistedCharacter);

        this.vitality.current = persistedCharacter.vitality;
        this.coldBlood.current = persistedCharacter.coldBlood;
    }

    private initSkills(persistedCharacter: PersistedCharacter): void {
        Object.keys(this.skills).forEach((skillKey: string) => {
            const persistedSkill: PersistedSkill = (persistedCharacter as any)[skillKey];

            if (persistedSkill === null || persistedSkill === undefined) {
                return;
            }

            const { base, currentProgression } = persistedSkill;
            const skill = (this.skills as any)[skillKey];
            skill.base.set(base);
            skill.progression.current.set(currentProgression);
        });
    }
}