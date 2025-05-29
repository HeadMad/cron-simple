
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

  const Point = createPoint(actualDate);

  const yearPoint = Point.year(year);
  const monthPoint = Point.month(month, yearPoint);
  const weekdayPoint = Point.weekday(weekday, monthPoint);
  const dayPoint = Point.day(day, monthPoint);
  const hourPoint = Point.hoursparse(hour, dayPoint);
  const minPoint = Point.minutes(min, hourPoint);


  const self = {
    next() {
      // TODO
      // if parent in more then curerent parent param, pass increment

      // TODO
      // Find start and end date from expression


      yearPoint.parse();
      monthPoint.parse();
      weekdayPoint.parse();
      dayPoint.parse();
      hourPoint.parse();
      minPoint.parse();

      return new Date(actualDate.getTime());
    },

    take(num) {
      let cron = init(expr, options);
      return Array.from({ length: num }, () => cron.next());
    }
  }



  return self;
}