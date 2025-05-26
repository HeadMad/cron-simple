import Point from './Point.js';

class PointMinutes extends Point {
  constructor(date) {
    super(date);
    this.min = 0;
    this.max = 59;
    this.currentValue = date.getMinutes();
    this.currentParentValue = date.getHours();
  }

  setParam(value) {
    this.date.setMinutes(value);
  }
}

export default PointMinutes;