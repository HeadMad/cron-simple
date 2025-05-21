import dateParams from './dateParams.js';

class Point {
  constructor(date, paramIndex) {
    this.date = date;
    this.param = dateParams[paramIndex];
    this.currentValue = date['get' + this.param]();
    const parentParam = dateParams[(paramIndex + 1) % 6];
    this.currentParentValue = date['get' + parentParam]();
    this.selfIncrement = 0;
    this.parentIncrement = 0;
    this.min = 0;
    this.max = Infinity;
  }

  minmax(mn, mx) {
    this.min = mn;
    this.max = mx;
    return this;
  }

  increment() {
    this.selfIncrement += 1;
    return this;
  }


  getValues(input) {
    const result = input.split(',').map((expr) => {

      if (/^\d+$/.test(expr))
        return Number(expr);

      if (/^\d+\/\d+$/.test(expr)) {
        const [start, offset] = expr.split('/').map(Number);
        if (offset < 1)
          throw new Error(`The divisor in expression "${expr}" must be greater than zero.`)

        const length = Math.floor((this.max - start) / offset) + 1;

        return Array.from({ length }, (_, i) => start + i * offset);
      }

      if (/^\d+-\d+$/.test(expr)) {
        const [start, end] = expr.split('-').map(Number);
        const length = end - start + 1;

        return Array.from({ length }, (_, i) => i + start);
      }
    }).flat().sort().filter(num => num >= this.min && num <= this.max);

    return [...new Set(result)];
  }

  parse(input) {
    if (input.includes('?'))
      return self;

    if (input.includes('*')) {
      let nextValue = this.currentValue + this.selfIncrement;
      const maxPlus = this.max + 1;
      this.parentIncrement += Number(nextValue === maxPlus);
      setParam(nextValue%maxPlus);
      return self;
    }

    const values = getValues(input);


    let valuesIndex = values.findIndex(value => value > this.currentValue);
    console.log(this.param, ': ', values, ' ', this.currentValue, ' ', valuesIndex, ' ', this.selfIncrement)

    if (valuesIndex === -1) {
      this.parentIncrement = 1;
      valuesIndex = 0;
    }

    valuesIndex += this.selfIncrement;

    if (valuesIndex === values.length) {
      this.parentIncrement = 1;
      valuesIndex = 0;
    }

    setParam(value);

    return this;

  }

  setParam(value) {
    this.date['set' + this.param](value);
  }

};



export default Point;