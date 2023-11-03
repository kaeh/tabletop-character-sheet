import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toIterator',
  standalone: true,
})
export class ToIteratorPipe implements PipeTransform {
  transform(value: number): number[] {
    return [...Array(value).keys()];
  }
}
