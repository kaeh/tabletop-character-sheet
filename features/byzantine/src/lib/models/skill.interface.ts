import { computed, signal } from '@angular/core';
import { Byzantine } from '../rules';
import { VariableCharacteristic } from './variable-characteristic.interface';

interface SkillConstructorData {
  base?: number;
  currentProgression?: number;
}

export class Skill {
  readonly progression = new VariableCharacteristic();
  readonly base = signal(0);
  readonly level = computed(() =>
    Byzantine.character.skills.computeSkillLevel(
      this.base(),
      this.progression.current()
    )
  );

  constructor(skill: SkillConstructorData = {}) {
    if (skill.base) {
      this.base.set(skill.base);
    }

    if (skill.currentProgression) {
      this.progression.updateCurrent(skill.currentProgression);
    }
  }
}
