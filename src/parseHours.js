import parseExpression from "./parseExpression.js";

export default function(input, date) {
  
  if (input.includes('*'))
   return date.setMinutes(date.getMinutes() + 1) && date;

  const mins = parseExpression(0, 59, input);

  date.setMinutes(mins.find(m => date.getMinutes() < m) ?? mins[0]);

  return date;
}