import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Character } from 'src/app/interfaces/character.interface';
import { character } from './character';
import { VariableCharacteristicComponent } from './variable-characteristic/variable-characteristic.component';

@Component({
  selector: 'app-character-sheet',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatIconModule, VariableCharacteristicComponent],
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterSheetComponent implements OnInit {
  // Generate a warrior character
  character: Character = character;

  ngOnInit(): void {
    this.character.vitality.max = Character.computeMaxVitality(this.character.skills.strength.actual, this.character.skills.endurance.actual, this.character.skills.willpower.actual);

    console.log(this.character.vitality.max);
  }

  // Vitality
  // For/5 + End/5 + Vol/10
  // protected readonly vitalityState: number[] = [...Array(this.character.vitality.max).keys()];
  // protected readonly currentVitality$$ = signal(this.character.vitality.actual);
  // protected readonly vitalityState$$ = computed(() => this.vitalityState.map((index) => index < this.currentVitality$$()));

  // protected addVitality(): void {
  //   this.currentVitality$$.update((value) => value < this.vitalityState.length ? value + 1 : value);
  // }

  // protected removeVitality(): void {
  //   this.currentVitality$$.update((value) => value > 0 ? value - 1 : value);
  // }
}
