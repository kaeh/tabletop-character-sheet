import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircle as faCircleRegular,
  faSquare as faSquareRegular,
} from '@fortawesome/free-regular-svg-icons';
import {
  IconDefinition,
  faCircle as faCircleSolid,
  faSquare as faSquareSolid,
} from '@fortawesome/free-solid-svg-icons';
import { ToIteratorPipe } from '@kaeh/ui';

@Component({
  selector: 'kaeh-variable-characteristic',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ToIteratorPipe],
  templateUrl: './variable-characteristic.component.html',
  styleUrls: ['./variable-characteristic.component.scss'],
})
export class VariableCharacteristicComponent {
  @Input({ required: true }) set icon(value: 'circle' | 'square') {
    this.faFilledIcon = value === 'circle' ? faCircleSolid : faSquareSolid;
    this.faEmptyIcon = value === 'circle' ? faCircleRegular : faSquareRegular;
  }

  @Input({ required: true }) current!: number;

  @Input({ required: true }) max!: number;

  @Output() public readonly update = new EventEmitter<number>();

  protected faFilledIcon!: IconDefinition;
  protected faEmptyIcon!: IconDefinition;

  protected onClick(value: number): void {
    const newValue = value === this.current ? value - 1 : value;
    this.update.emit(newValue);
  }
}
