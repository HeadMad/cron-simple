import parseExpression from "./getValues.js";

export default function(input, date) {
  let incHour = 0;
  const current = date.getMinutes();
  
  if (input.includes('*')) {
    let nextMinute = current + incHour;
    incHour += nextMinute === 60;
    date.setMinutes(nextMinute%60);
    return incHour;
  }

  const mins = parseExpression(0, 59, input);

  let next = mins.findIndex(m => current < m);

  if (next === undefined)
    incHour = true;

  date.setMinutes(next ?? mins[0]);

  return incHour;
}