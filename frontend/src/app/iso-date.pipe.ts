import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isoDate'
})
export class IsoDatePipe implements PipeTransform {
  transform(value: Date | string): string {
    if (!value) {
      return '';
    }
    const date = new Date(value);
    return date.toISOString().substring(0, 10);
  }
}