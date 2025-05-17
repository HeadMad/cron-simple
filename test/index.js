import {init} from '../index.js';

const args = process.argv.slice(2);

if (args[0] === 'next') {
  console.log(init(args[1]).next().toString());

} else if (args[0] === 'take') {
  console.log(init(args[2]).take(args[1]).map(date => date.toString()));
}

