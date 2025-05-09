
import createSetPointDate from './setPointDate.js';

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

      const setPointDate = createSetPointDate(actualDate);

      const incHour = setPointDate({max: 59, input: min, param: 'Minutes'});
      const incDay = setPointDate({max: 23, input: hour, inc: incHour, param: 'Hours'});
      const incMonth = setPointDate({min: 1, max: 31, input: day, inc: incDay, param: 'Date'});
      const incYear = setPointDate({min: 1, max: 12, input: month, inc: incMonth, param: 'Month'});
      setPointDate({input: year, inc: incYear, param: 'Year'});

      return new Date(actualDate.getTime());
    },

    take(num) {
      
    }
  }


  
  return self;
}