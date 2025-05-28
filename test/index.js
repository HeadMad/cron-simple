import {init} from '../index.js';

const args = process.argv.slice(2);

if (args[0] === 'next') {
  console.log(init(args[1]).next().toString());

} else if (args[0] === 'take') {
  take(args[1], args[2]);

} else if (args[0] === undefined) {
  next('42 3 27 5 * 2025-2026');

} 


function take(num, expr) {
  console.log('Take ' +num + ': ' + expr);
  console.log(init(expr).take(num).map(date => date.toString()));
}

function next(expr) {
  console.log('Next: ' + expr);
  console.log(init(expr).next().toString());
}



