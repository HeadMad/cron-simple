export default function(min, date) {
  if (min === '*')
    date.setMinute(date.getMinute() + 1);

  return date
}