// b.mjs
import * as a from './a.mjs';

let b = '原始值-b模块内变量';
console.log('b模块引用a模块：', a);
b = '修改值-b模块内变量';

export { b };
