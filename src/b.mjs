// b.mjs
import * as a from './a.mjs';

let b = 'original-b';
console.log('a in b module', a);
b = 'modified-b';

export { b };
