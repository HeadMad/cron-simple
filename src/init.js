export default function (expr, options = {}) {

  let {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone,
    currentDate = new Date(),
    startDate = currentDate,
    finishDate = new Date(),
  } = options;

  const splitted = expr.split(/\s+/);

  const [min, hour, day, month, weekday, year = currentDate.getFullYear()] = splitted;



  
  return startDate.getMinutes();
}