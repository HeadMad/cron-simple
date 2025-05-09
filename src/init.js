import parseMinutes from './parseMinutes.js';
import parseHours from './parseHours.js';

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

      const incHour = parseMinutes(min, actualDate);
      const incDay = parseHours(hour, actualDate, incHour);

      return new Date(actualDate.getTime());
    },

    take(num) {
      
    }
  }


  
  return self;
}