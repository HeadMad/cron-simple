import parseExpression from "./parseExpression.js";

export default function(input, date) {
  let incHour = false;
  const current = date.getMinutes();
  
  if (input.includes('*'))
   return date.setMinutes(current + 1) && date;

  const mins = parseExpression(0, 59, input);

  let next = mins.find(m => current < m);

  if (next === undefined)
    incHour = true;

  date.setMinutes(next ?? mins[0]);

  return incHour;
}