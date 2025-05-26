import Point from './Point.js';

class PointWeekday extends Point {
  constructor(date) {
    super(date);
    this.min = 0;
    this.max = 6;
    this.currentValue = date.getDay();
    this.currentParentValue = date.getMonth();
  }

  setParam(value) {
    this.date.setDate(this.date.getDate() + (7+(value - this.currentValue))%7);
  }

  getValues(input) {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    input = days.reduce((acc, day, i) => acc.replaceAll(day, i), input.toUpperCase());
    return super.getValues(input);
  }
}

export default PointWeekday;