import { Pipe, PipeTransform } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCircle as faCircleRegular } from '@fortawesome/free-regular-svg-icons';
import { faCircle as faCircleSolid } from '@fortawesome/free-solid-svg-icons';

@Pipe({
  name: 'toSkillDotIcon',
  standalone: true,
})
export class ToSkillDotIconPipe implements PipeTransform {
  private readonly faFilledIcon = faCircleSolid;
  private readonly faEmptyIcon = faCircleRegular;

  transform(index: number, currentProgression: number, maxProgression: number): IconProp {
    if (index < currentProgression) {
      return this.faFilledIcon;
    }

    if (index < maxProgression) {
      return this.faEmptyIcon;
    }

    return this.faEmptyIcon;
  }
}
