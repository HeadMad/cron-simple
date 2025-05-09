import parseExpression from "./parseExpression.js";

export default function(input, date, incHour = 0) {
  let incDay = 0;

  const current = date.getHours();
  
  if (input.includes('*')) {
    let nextHour = current + incHour;
    incDay += nextHour === 24;
    date.setHourse(nextHour%24);
    return incDay;
  }

  const hours = parseExpression(0, 23, input);

  let hoursIndex = hours.findIndex(h => current < h);

  if (hoursIndex === -1)
    incDay = 1;

  hoursIndex += incHour;

  if (hoursIndex === hours.length) {
    incDay = 1;
    hoursIndex = 0;
  }

  date.setHours(hours[hoursIndex]);

  return incDay;
}