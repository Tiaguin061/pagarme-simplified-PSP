import { Duration, add, differenceInDays } from 'date-fns';

import { DateProvider } from '../models/date-provider';

export class DateFnsProvider implements DateProvider {
  add(date: number | Date, duration: Duration): Date {
    return add(date, duration);
  }

  differenceInDays(dateLeft: number | Date, dateRight: number | Date): number {
    return differenceInDays(dateLeft, dateRight);
  }
}