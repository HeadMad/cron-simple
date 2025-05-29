import PointHours from './PointHours.js';
import PointMinutes from './PointMinutes.js';
import PointDay from './PointDay.js';
import PointWeekday from './PointWeekday.js';
import PointMonth from './PointMonth.js';
import PointYear from './PointYear.js';

export default function(currentDate) {
  return {
    minutes(input, parent) {
      return new PointMinutes(currentDate, parent).setParam(input);
    },
    hours(input, parent) {
      return new PointHours(currentDate, parent).setParam(input);
    },
    day(input, parent) {
      return new PointDay(currentDate, parent).setParam(input);
    },
    weekday(input, parent) {
      return new PointWeekday(currentDate, parent).setParam(input);
    },
    month(input, parent) {
      return new PointMonth(currentDate, parent).setParam(input);
    },
    year(input) {
      return new PointYear(currentDate).setParam(input);
    },
  };
}