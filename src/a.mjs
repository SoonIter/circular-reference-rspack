// a.mjs
import * as b from './b.mjs';

let a = '原始值-a模块内变量';
console.log('a模块引用b模块：', b);
a = '修改值-a模块内变量';

export { a };
