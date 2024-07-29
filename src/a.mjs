// a.mjs
import * as b from './b.mjs';

let a = 'original-a';
console.log('b in a module', b);
a = 'modified-a';

export { a };
