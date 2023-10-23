import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Character } from 'src/app/interfaces/character.interface';

@Component({
  selector: 'app-character-sheet',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatIconModule],
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterSheetComponent {
  // Generate a warrior character
  character: Character = {
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
      actual: 5,
      max: 5,
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
        actual: 5,
        base: 5,
        progression: {
          actual: 0,
          max: 6
        }
      },
      knowledge: {
        actual: 5,
        base: 5,
        progression: {
          actual: 0,
          max: 6
        }
      },
      stealth: {
        actual: 5,
        base: 5,
        progression: {
          actual: 0,
          max: 6
        }
      },
      endurance: {
        actual: 5,
        base: 5,
        progression: {
          actual: 0,
          max: 6
        }
      },
      strength: {
        actual: 5,
        base: 5,
        progression: {
          actual: 0,
          max: 6
        }
      },
      dexterity: {
        actual: 5,
        base: 5,
        progression: {
          actual: 0,
          max: 6
        }
      },
      magic: {
        actual: 5,
        base: 5,
        progression: {
          actual: 0,
          max: 6
        }
      },
      movement: {
        actual: 5,
        base: 5,
        progression: {
          actual: 0,
          max: 6
        }
      },
      perception: {
        actual: 5,
        base: 5,
        progression: {
          actual: 0,
          max: 6
        }
      },
      social: {
        actual: 5,
        base: 5,
        progression: {
          actual: 0,
          max: 6
        }
      },
      survival: {
        actual: 5,
        base: 5,
        progression: {
          actual: 0,
          max: 6
        }
      },
      shooting: {
        actual: 5,
        base: 5,
        progression: {
          actual: 0,
          max: 6
        }
      },
      willpower: {
        actual: 5,
        base: 5,
        progression: {
          actual: 0,
          max: 6
        }
      },
    },
  };

  // Cold blood
  protected readonly coldBloodState: number[] = [...Array(this.character.coldBlood.max).keys()];
  protected readonly currentColdBlood$$ = signal(this.character.coldBlood.actual);
  protected readonly coldBloodState$$ = computed(() => this.coldBloodState.map((index) => index < this.currentColdBlood$$()));

  protected addColdBlood(): void {
    this.currentColdBlood$$.update((value) => value < this.coldBloodState.length ? value + 1 : value);
  }
  protected removeColdBlood(): void {
    this.currentColdBlood$$.update((value) => value > 0 ? value - 1 : value);
  }
}
