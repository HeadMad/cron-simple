export default (date) => function (input, param) {
  let incParent = 0;
  let incSelf = 0;
  let min = 0;
  let max = Infinity;


  const self = {
    minmax(mn, mx) {
      min = mn;
      max = mx;
      return self;
    },

    inc(value) {
      incSelf = value;
      return self;
    },

    get incParent() {
      return incParent;
    },

    get date() {
      return date;
    },

    parse() {
      const currentValue = date['get' + param]();

      if (input.includes('*')) {
        let nextValue = currentValue + incSelf;
        const maxPlus = max + 1;
        incParent += Number(nextValue === maxPlus);
        date['set' + param](nextValue % maxPlus);
        return self;
      }

      const values = getValues(min, max, input);

      let valuesIndex = values.findIndex(value => currentValue < value);

      if (valuesIndex === -1)
        incParent = 1;

      valuesIndex += incSelf;

      if (valuesIndex === values.length) {
        incParent = 1;
        valuesIndex = 0;
      }

      date['set' + param](values[valuesIndex]);

      return self;
    }
  };

  return self;
}

function getValues(min, max, input) {
  const result = input.split(',').map((expr) => {

    if (/^\d+$/.test(expr))
      return Number(expr);

    if (/^\d+\/\d+$/.test(expr)) {
      const [start, offset] = expr.split('/').map(Number);
      if (offset < 1)
        throw new Error(`The divisor in expression "${expr}" must be greater than zero.`)

      const length = Math.floor((max - start) / offset) + 1;

      return Array.from({ length }, (_, i) => start + i * offset);
    }

    if (/^\d+-\d+$/.test(expr)) {
      const [start, end] = expr.split('-').map(Number);
      const length = end - start + 1;

      return Array.from({ length }, (_, i) => i + start);
    }
  }).flat().sort().filter(num => num >= min && num <= max);

  return [...new Set(result)];
}