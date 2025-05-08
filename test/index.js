import {init} from '../index.js';

const expr = process.argv.slice(2).join(' ');

console.log('Cron expression: ', init(expr));