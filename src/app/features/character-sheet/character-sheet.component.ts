import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Character } from 'src/app/interfaces/character.interface';
import { CharacterRepository } from '../character-repository/character-repository.service';
import { SkillComponent } from './skill/skill.component';
import { VariableCharacteristicComponent } from './variable-characteristic/variable-characteristic.component';

@Component({
  selector: 'app-character-sheet',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatIconModule, VariableCharacteristicComponent, SkillComponent],
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterSheetComponent {
  // Generate a warrior character
  character: Character = inject(CharacterRepository).character;

  private readonly characterRepository: CharacterRepository = inject(CharacterRepository);

  public updateSkillProgressionLevel(skillName: keyof Character['skills'], newProgression: number): void {
    this.characterRepository.updateSkillProgressionLevel(skillName, newProgression);
  }
}
