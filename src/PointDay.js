import Point from './Point.js';

class PointDay extends Point {
  constructor(date, paramIndex) {
    super(date, paramIndex);

    this.param = 'Day';
    this.currentValue = date.getDay();
    this.currentParentValue = date.getMonth();
  }

  setParam(value) {
    this.date.setDate(this.date.getDate() + (7+(value - this.currentValue))%7);
  } 
}