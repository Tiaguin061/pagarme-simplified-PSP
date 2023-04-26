type Duration = {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export interface DateProvider {
  add(date: number | Date, duration: Duration): Date;
  differenceInDays(dateLeft: Date | number, dateRight: Date | number): number
}