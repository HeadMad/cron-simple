
import createPoint from './createPoint.js';


export default init;

function init(expr, options = {}) {

  let {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone,
    currentDate = new Date()
  } = options;

  const actualDate = new Date(currentDate.getTime());

  const splitted = expr.split(/\s+/);

  const [min, hour, day, month, weekday, year = String(currentDate.getFullYear())] = splitted;
  let isInfinity = false;

  if (year.includes('*'))
    isInfinity = true;
  
  
  const self = {
    next() {
      // TODO
      // if parent in more then curerent parent param, pass increment
  
  
      const Point = createPoint(actualDate);
      const minPoint = Point.minutes.parse(min);
      const hourPoint = Point.hours.increment(minPoint.parentIncrement).parse(hour);
      const dayPoint = Point.day.increment(hourPoint.parentIncrement).parse(day);
      const monthPoint = Point.month.increment(dayPoint.parentIncrement).parse(month);
      const weekdayPoint = Point.weekday.increment(dayPoint.parentIncrement).parse(weekday);
      const yearPoint = Point.year.increment(monthPoint.parentIncrement).parse(year);

      return new Date(actualDate.getTime());
    },

    take(num) {
      let cron = init(expr, options);
      return Array.from({ length: num }, () => cron.next());
    }
  }


  
  return self;
}