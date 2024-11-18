import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
  standalone: true
})
export class FormatDatePipe implements PipeTransform {
  private datePipe = new DatePipe('en-US');

  transform(value: number | Date): string {
    const date = new Date(value);
    const today = new Date();
    
    // Check if the date is from today
    const isToday = date.getDate() === today.getDate() && 
                    date.getMonth() === today.getMonth() &&
                    date.getFullYear() === today.getFullYear();
    
    if (isToday) {
      return this.datePipe.transform(date, 'h:mm a') || '';
    }
    
    return this.datePipe.transform(date, 'MMM d, y') || '';
  }

}
