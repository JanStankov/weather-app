import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'formatDatePipe'
})
export class FormatDatePipe implements PipeTransform {
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  transform(value: any, locale: string = 'en'): any {
    const date = new Date(value.split(' ')[0]);

    if (date) {
      return this.days[date.getDay()];
    }

    return formatDate(date, 'medium', locale);
  }
}