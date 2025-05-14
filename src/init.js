
import createPoint from './createPoint.js';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export default function (expr, options = {}) {

  let {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone,
    currentDate = new Date(),
    startDate = currentDate,
    finishDate = new Date(),
  } = options;

  const actualDate = new Date(currentDate.getTime());

  const splitted = expr.split(/\s+/);

  const [min, hour, day, month, weekday, year = currentDate.getFullYear()] = splitted;
  let isInfinity = false;

  if (year === '*')
    isInfinity = true;

  
  const self = {
    next() {

      const Point = createPoint(actualDate);

      const minPoint = Point(min, 'Minutes').minmax(0, 59).parse();
      const hourPoint = Point(hour, 'Hours').minmax(0, 23).inc(minPoint.incParent).parse();
      const dayPoint =  Point(day, 'Date').minmax(1, 31).inc(hourPoint.incParent).parse();
      const monthPoint = Point(month, 'Month').alt(MONTHS).minmax(0, 11).inc(dayPoint.incParent).parse();
      const weekdayPoint = Point(weekday, 'Day').alt(WEEKDAYS).minmax(0, 6).inc(hourPoint.incParent).parse();
      const yearPoint = Point(year, 'FullYear').inc(monthPoint.incParent).parse();

      return new Date(actualDate.getTime());
    },

    take(num) {
      
    }
  }


  
  return self;
}