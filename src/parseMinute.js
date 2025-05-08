export default function(min, date) {
  
  if (min.includes('*'))
   return date.setMinutes(date.getMinutes() + 1) && date;

  const mins = min.split(',').map((min) => {

    if (/^\d+$/.test(min))
      return Number(min);

    if (/^\d+\/\d+/.test(min)) {
      const [start, offset] = min.split('/').map(n => Number(n));

      const len = Math.floor((59-start)/offset) + 1;

      return Array.from({length: len}, (_, i) => (start + i*offset));
    }


  }).flat().sort();

return mins;

  return date;
}