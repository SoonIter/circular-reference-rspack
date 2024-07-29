# Circular reference

## Summary

`output.environment.const = false`

This configuration will hide some potential runtime errors in the case of circular references.

We should try our best to use `output.environment.const = true` and repair circular references at compile time, `output.environment.const = false` can be used in an emergency.

```sh
# dep graph
index.mjs -> a.mjs <-> b.mjs
```

https://github.com/web-infra-dev/rsbuild/issues/2862

```javascript
// rspack.config.js
module.exports = {
  output: {
    environment: {
      const: false,
    },
  },
};
```

## test

### Node.js

```sh
❯ npm run run:esm

> circular-esm@ run:esm /Users/demos/circular-esm
> node ./src/index.mjs

file:///Users/demos/circular-esm/src/b.mjs:5
console.log('a in b module', a);
                             ^

ReferenceError: Cannot access 'a' before initialization
    at file:///Users/demos/circular-esm/src/b.mjs:5:30
    at ModuleJob.run (node:internal/modules/esm/module_job:193:25)
    at async Promise.all (index 0)
    at async ESMLoader.import (node:internal/modules/esm/loader:530:24)
    at async loadESM (node:internal/process/esm_loader:91:5)
    at async handleMainPromise (node:internal/modules/run_main:65:12)
```

### Rspack/webpack

#### `output.environment.const = false`

```sh
❯ npm run run

> circular-esm@ run /Users/demos/circular-esm
> rspack && node ./dist/main.js

Rspack compiled successfully in 66 ms
a in b module undefined
b in a module modified-b
a in index.mjs undefined
```

#### `output.environment.const = true`

```sh
❯ npm run run
> circular-esm@ run /Users/demos/circular-esm
> rspack && node ./dist/main.js

Rspack compiled successfully in 11 ms
/Users/demos/circular-esm/dist/main.js:6
  Z: function() { return __WEBPACK_DEFAULT_EXPORT__; }
                  ^

ReferenceError: Cannot access '__WEBPACK_DEFAULT_EXPORT__' before initialization
    at Object.Z (/Users/demos/circular-esm/dist/main.js:6:19)
    at Object../src/b.mjs (/Users/demos/circular-esm/dist/main.js:29:83)
    at __webpack_require__ (/Users/demos/circular-esm/dist/main.js:55:30)
    at Object../src/a.mjs (/Users/demos/circular-esm/dist/main.js:8:63)
    at __webpack_require__ (/Users/demos/circular-esm/dist/main.js:55:30)
    at /Users/demos/circular-esm/dist/main.js:94:63
    at Object.<anonymous> (/Users/demos/circular-esm/dist/main.js:100:3)
    at Module._compile (node:internal/modules/cjs/loader:1165:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1219:10)
    at Module.load (node:internal/modules/cjs/loader:1043:32)
```
