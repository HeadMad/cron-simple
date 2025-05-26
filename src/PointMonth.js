import Point from './Point.js';

class PointMonth extends Point {
  constructor(date) {
    super(date);
    this.min = 0;
    this.max = 11;
    this.currentValue = date.getMonth();
    this.currentParentValue = date.getYear();
  }

  setParam(value) {
    this.date.setMonth(value);
  }

  getValues(input) {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    input = months.reduce((acc, month, i) => acc.replaceAll(month, i), input.toUpperCase());
    return super.getValues(input);
  }
}

export default PointMonth;