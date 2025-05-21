
import createPoint from './createPoint.js';
import Point from './Point.js';
impoirt Point from './Point.js';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export default init;

function init(expr, options = {}) {

  let {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone,
    currentDate = new Date(),
    startDate = currentDate,
    finishDate = currentDate,
  } = options;

  const actualDate = new Date(currentDate.getTime());

  const splitted = expr.split(/\s+/);

  const [min, hour, day, month, weekday, year = String(currentDate.getFullYear())] = splitted;
  let isInfinity = false;

  if (year === '*')
    isInfinity = true;

  // const Point = createPoint(actualDate);
  // const minPoint     = Point(0).minmax(0, 59);
  // const hourPoint    = Point(1).minmax(0, 23);
  // const dayPoint     = Point(2).minmax(1, 31);
  // const monthPoint   = Point(3).alt(MONTHS).minmax(0, 11);
  // const weekdayPoint = Point(4).alt(WEEKDAYS).minmax(0, 6);
  // const yearPoint    = Point(5).minmax(startDate.getFullYear(), isInfinity ? Infinity : finishDate.getFullYear());

  
  const self = {
    next() {
      // TODO
      // if parent in more then curerent parent param, pass increment
      // const incMin = minPoint.parse(min).incParent;
      // const incHour = hourPoint.inc(incMin).parse(hour).incParent;
      // const incDay =  dayPoint.inc(incHour).parse(day).incParent;
      // const incMonth = monthPoint.inc(incDay).parse(month).incParent;
      // const incWeekday = weekdayPoint.inc(incHour).parse(weekday).incParent;
      // const incYear = yearPoint.inc(incMonth).parse(year).incParent;

      const minPoint = new Point(actualDate, 0).minmax(0, 59).parse(min);
      const hourPoint = new Point(actualDate, 1).minmax(0, 23).parse(hour);
      const dayPoint = new Point(actualDate, 2).minmax(1, 31).parse(day);
      const monthPoint = new Point(actualDate, 3).alt(MONTHS).minmax(0, 11).parse(month);
      const weekdayPoint = new Point(actualDate, 4).alt(WEEKDAYS).minmax(0, 6).parse(weekday);
      const yearPoint = new Point(actualDate, 5).minmax(startDate.getFullYear(), isInfinity ? Infinity : finishDate.getFullYear()).parse(year);

      return new Date(actualDate.getTime());
    },

    take(num) {
      let cron = init(expr, options);
      return Array.from({ length: num }, () => cron.next());
    }
  }


  
  return self;
}