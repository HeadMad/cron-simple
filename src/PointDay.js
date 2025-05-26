import Point from './Point.js';

class PointDay extends Point {
  constructor(date) {
    super(date);
    this.min = 1;
    this.max = 31;
    this.currentValue = date.getDate();
    this.currentParentValue = date.getMonth();
  }

  setParam(value) {
    this.date.setDate(value);
  }
}

export default PointDay;