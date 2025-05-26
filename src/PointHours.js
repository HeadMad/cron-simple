import Point from './Point.js';

class PointHours extends Point {
  constructor(date) {
    super(date);
    this.min = 0;
    this.max = 23;
    this.currentValue = date.getHours();
    this.currentParentValue = date.getDate();
  }

  setParam(value) {
    this.date.setHours(value);
  }
}

export default PointHours;