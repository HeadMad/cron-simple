class Point {
  constructor(date) {
    this.date = date;
    this.selfIncrement = 0;
    this.parentIncrement = 0;
  }

  increment(value) {
    console.log(value)
    this.selfIncrement += value;
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

    if (input.includes('*')) {
      let nextValue = this.currentValue + this.selfIncrement;
      const maxPlus = this.max + 1;
      this.parentIncrement = Number(nextValue === maxPlus);
      this.setParam(nextValue%maxPlus);
      return this;
    }

    const values = this.getValues(input);

    let valuesIndex = values.findIndex(value => value > this.currentValue);
 
    if (valuesIndex === -1) {
      this.parentIncrement = 1;
      valuesIndex = 0;
    }

    valuesIndex += this.selfIncrement;

    if (valuesIndex === values.length) {
      this.parentIncrement = 1;
      valuesIndex = 0;
    }

    this.setParam(values[valuesIndex]);

    return this;

  }

};



export default Point;