import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToIteratorPipe } from '../../to-iterator.pipe';
import { ToSkillDotIconPipe } from './to-skill-dot-icon.pipe';

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ToIteratorPipe, ToSkillDotIconPipe],
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
})
export class SkillComponent {
  @Input({ required: true }) current!: number;
  @Input({ required: true }) base!: number;
  @Input({ required: true }) currentProgression!: number;
  @Input({ required: true }) maxProgression!: number;

  @Output() public readonly update = new EventEmitter<number>();

  protected readonly dotsNumber = 6;

  protected onProgressionDotClick(value: number): void {
    const newValue = value === this.currentProgression ? value - 1 : value;
    this.update.emit(newValue);
  }
}
