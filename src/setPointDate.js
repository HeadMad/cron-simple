import getValues from "./getValues.js";

export default date => function({input, inc = 0, min = 0, max = Infinity, param}) {
  let incParent = 0;

  const current = date['get' + param]();
  
  if (input.includes('*')) {
    let nextHour = current + inc;
    incParent += nextHour === 24;
    date['set' + param](nextHour%24);
    return incParent;
  }

  const values = getValues(min, max, input);

  let valuesIndex = values.findIndex(h => current < h);

  if (valuesIndex === -1)
    incParent = 1;

  valuesIndex += inc;

  if (valuesIndex === values.length) {
    incParent = 1;
    valuesIndex = 0;
  }

  date['set' + param](values[valuesIndex]);

  return incParent;
}