var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/helpers.ts
var startPipe = (req, params, fns, currentFnIndex) => __async(void 0, null, function* () {
  const next = (pipeParams) => __async(void 0, null, function* () {
    const nextPipeFunction = fns[currentFnIndex + 1];
    if (!nextPipeFunction)
      return;
    return yield startPipe(
      req,
      __spreadProps(__spreadValues({}, params), { pipeParams }),
      fns,
      currentFnIndex + 1
    );
  });
  return yield fns[currentFnIndex](req, params, next);
});

// src/index.ts
var pipe = (...fns) => __async(void 0, null, function* () {
  return (req, params) => __async(void 0, null, function* () {
    return yield startPipe(req, params, fns, 0);
  });
});
var pipeWithErrorInterceptor = (...fns) => __async(void 0, null, function* () {
  const errorInterceptor = fns[fns.length - 1];
  try {
    return pipe(...fns.slice(0, fns.length - 1));
  } catch (e) {
    errorInterceptor(e);
  }
});
export {
  pipe,
  pipeWithErrorInterceptor
};
//# sourceMappingURL=index.mjs.map