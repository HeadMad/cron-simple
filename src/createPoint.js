import PointHours from './PointHours.js';
import PointMinutes from './PointMinutes.js';
import PointDay from './PointDay.js';
import PointWeekday from './PointWeekday.js';
import PointMonth from './PointMonth.js';
import PointYear from './PointYear.js';

export default function(currentDate) {
  return {
    get minutes() {
      return new PointMinutes(currentDate);
    },
    get hours() {
      return new PointHours(currentDate);
    },
    get day() {
      return new PointDay(currentDate);
    },
    get weekday() {
      return new PointWeekday(currentDate);
    },
    get month() {
      return new PointMonth(currentDate);
    },
    get year() {
      return new PointYear(currentDate);
    },
  };
}