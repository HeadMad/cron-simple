import Point from './Point.js';

class PointYear extends Point {
  constructor(date) {
    super(date);
    this.min = 0;
    this.max = Infinity;
    this.currentValue = date.getFullYear();
    this.currentParentValue = date.getYear();
    this._lastDate = new Date();
  }

  setParam(value) {
    this.date.getFullYear(value);
  }

  parse() {
    super.parse();
    this._lastDate = new Date(this.date.getTime());
  }

  increment() {
    if (this.status === 'star')
      return this.date.setFullYear(this.date.getFullYear() + 1);

    if (this.status === 'arr')
      return this.date.setFullYear(this.values[(this._valueIndex + 1) % this.values.length]);

    throw 'Last date is: ' + this._lastDate;
  }
}

export default PointYear;