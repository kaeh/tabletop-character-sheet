import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle as faCircleRegular, faSquare as faSquareRegular } from '@fortawesome/free-regular-svg-icons';
import { IconDefinition, faCircle as faCircleSolid, faSquare as faSquareSolid } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-variable-characteristic',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './variable-characteristic.component.html',
  styleUrls: ['./variable-characteristic.component.scss'],
})
export class VariableCharacteristicComponent {
  @Input({ required: true }) set icon(value: 'circle' | 'square') {
    this.faFilledIcon = value === 'circle' ? faCircleSolid : faSquareSolid;
    this.faEmptyIcon = value === 'circle' ? faCircleRegular : faSquareRegular;
  }

  @Input({ required: true }) actual!: number;

  @Input({ required: true }) set max(value: number) {
    this.iterator = [...Array(value).keys()];
  }

  protected iterator: number[] = [];
  protected faFilledIcon!: IconDefinition;
  protected faEmptyIcon!: IconDefinition
}
