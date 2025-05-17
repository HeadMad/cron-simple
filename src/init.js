
import createPoint from './createPoint.js';

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

  const Point = createPoint(actualDate);
  const minPoint     = Point('Minutes').minmax(0, 59);
  const hourPoint    = Point('Hours').minmax(0, 23);
  const dayPoint     = Point('Date').minmax(1, 31);
  const monthPoint   = Point('Month').alt(MONTHS).minmax(0, 11);
  const weekdayPoint = Point('Day').alt(WEEKDAYS).minmax(0, 6);
  const yearPoint    = Point('FullYear').minmax(startDate.getFullYear(), isInfinity ? Infinity : finishDate.getFullYear());

  
  const self = {
    next() {
      // TODO
      // if parent in more then curerent parent param, pass increment
      const incMin = minPoint.inc(1).parse(min).incParent;
      const incHour = hourPoint.inc(incMin).parse(hour).incParent;
      const incDay =  dayPoint.inc(incHour).parse(day).incParent;
      const incMonth = monthPoint.inc(incDay).parse(month).incParent;
      const incWeekday = weekdayPoint.inc(incHour).parse(weekday).incParent;
      const incYear = yearPoint.inc(incMonth).parse(year).incParent;

      return new Date(actualDate.getTime());
    },

    take(num) {
      let cron = init(expr, options);
      return Array.from({ length: num }, () => cron.next());
    }
  }


  
  return self;
}