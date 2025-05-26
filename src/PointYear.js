import Point from './Point.js';

class PointYear extends Point {
  constructor(date) {
    super(date);
    this.min = 0;
    this.max = Infinity;
    this.currentValue = date.getFullYear();
    this.currentParentValue = date.getYear();
  }

  setParam(value) {
    this.date.getFullYear(value);
  }
}

export default PointYear;