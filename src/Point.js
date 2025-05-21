import dateParams from './dateParams.js';

class Point {
  constructor(date, paramIndex) {
    this.date = date;
    this.param = dateParams[paramIndex];
    this.currentValue = date['get' + this.param]();
    const parentParam = dateParams[(paramIndex + 1)%6]; 
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

  inc(value) {
    this.selfIncrement = value;
    return this;
  }

  get parentIncrement() {
    return this.parentIncrement;
  }

  getValues() {

  }

};



export default Point;