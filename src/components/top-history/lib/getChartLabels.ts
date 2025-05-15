import { eachDayOfInterval, format } from 'date-fns';

export const getChartLabels = (start: Date, end: Date) => {
  return eachDayOfInterval({ start, end }).map(date =>
    format(date, 'dd MMMM yyyy')
  );
}