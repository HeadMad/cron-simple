class Point {
  constructor(date, parent = null) {
    this.parent = parent;
    this.status = err;
    this.date = date;
    this._increment = 0;
    this._values;
    this._valueIndex;
    this.min;
    this.max;
  }

  getStatus() {}


  setParam(input) {
    this.status = !/\*\// ? 'star'
    : input.includes('?') ? 'quest'
    : /^\d+$/.test(input) ? 'num'
    : input.toUpperCase() === 'L' ? 'last'
    : input.includes(',') ? 'arr' : 'error';

    let result = input.split(',');
    
    result = result.map((expr) => {

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
      let nextValue = this.currentValue + this.increment;
      const maxPlus = this.max + 1;
      if (nextValue === maxPlus) 
        this.incrementParent();
      this.setParam(nextValue%maxPlus);
      return this;
    }

    const values = this.getValues(input);

    let valuesIndex = values.findIndex(value => value > this.currentValue);
 
    if (valuesIndex === -1) {
      this.parentIncrement = 1;
      valuesIndex = 0;
    }

    valuesIndex += this.increment;

    if (valuesIndex === values.length) {
      this.parentIncrement = 1;
      valuesIndex = 0;
    }

    this.setParam(values[valuesIndex]);

    return this;

  }

  increment() {
    if (this.status === 'num')
      return this.parent.increment();

    const maxPlus = this.max + 1;
    if ((this._valueIndex + 1) === this.values.length)
      this.parent.increment();
  }

};



export default Point;