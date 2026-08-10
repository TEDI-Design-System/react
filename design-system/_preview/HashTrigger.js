"use strict";
var __dsPreview = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // <define:import.meta.env>
  var init_define_import_meta_env = __esm({
    "<define:import.meta.env>"() {
    }
  });

  // <define:process.env>
  var init_define_process_env = __esm({
    "<define:process.env>"() {
    }
  });

  // shim:react-shim
  var require_react_shim = __commonJS({
    "shim:react-shim"(exports2, module2) {
      init_define_import_meta_env();
      init_define_process_env();
      var R = window.React;
      function np(p, k) {
        var o = {};
        for (var x in p) if (x !== "children") o[x] = p[x];
        if (k !== void 0) o.key = k;
        return o;
      }
      function jsx9(t, p, k) {
        var c = p && p.children;
        return c === void 0 ? R.createElement(t, np(p, k)) : R.createElement(t, np(p, k), c);
      }
      function jsxs5(t, p, k) {
        return R.createElement.apply(R, [t, np(p, k)].concat(p.children));
      }
      module2.exports = R;
      module2.exports.jsx = jsx9;
      module2.exports.jsxs = jsxs5;
      module2.exports.jsxDEV = function(t, p, k, s) {
        return (s ? jsxs5 : jsx9)(t, p, k);
      };
      module2.exports.Fragment = R.Fragment;
    }
  });

  // node_modules/classnames/index.js
  var require_classnames = __commonJS({
    "node_modules/classnames/index.js"(exports2, module2) {
      init_define_import_meta_env();
      init_define_process_env();
      (function() {
        "use strict";
        var hasOwn = {}.hasOwnProperty;
        function classNames() {
          var classes = "";
          for (var i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            if (arg) {
              classes = appendClass(classes, parseValue(arg));
            }
          }
          return classes;
        }
        function parseValue(arg) {
          if (typeof arg === "string" || typeof arg === "number") {
            return arg;
          }
          if (typeof arg !== "object") {
            return "";
          }
          if (Array.isArray(arg)) {
            return classNames.apply(null, arg);
          }
          if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
            return arg.toString();
          }
          var classes = "";
          for (var key in arg) {
            if (hasOwn.call(arg, key) && arg[key]) {
              classes = appendClass(classes, key);
            }
          }
          return classes;
        }
        function appendClass(value, newClass) {
          if (!newClass) {
            return value;
          }
          if (value) {
            return value + " " + newClass;
          }
          return value + newClass;
        }
        if (typeof module2 !== "undefined" && module2.exports) {
          classNames.default = classNames;
          module2.exports = classNames;
        } else if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
          define("classnames", [], function() {
            return classNames;
          });
        } else {
          window.classNames = classNames;
        }
      })();
    }
  });

  // ds-raw:__ds_raw__
  var require_ds_raw = __commonJS({
    "ds-raw:__ds_raw__"(exports2, module2) {
      init_define_import_meta_env();
      init_define_process_env();
      module2.exports = window.Tedi;
    }
  });

  // src/community/helpers/background-colors/background-colors.module.scss
  var require_background_colors_module = __commonJS({
    "src/community/helpers/background-colors/background-colors.module.scss"() {
      init_define_import_meta_env();
      init_define_process_env();
    }
  });

  // src/community/components/card/card.module.scss
  var require_card_module = __commonJS({
    "src/community/components/card/card.module.scss"() {
      init_define_import_meta_env();
      init_define_process_env();
    }
  });

  // src/community/components/tabs/tabs-nav/tabs-nav.module.scss
  var require_tabs_nav_module = __commonJS({
    "src/community/components/tabs/tabs-nav/tabs-nav.module.scss"() {
      init_define_import_meta_env();
      init_define_process_env();
    }
  });

  // src/community/components/button-content/button-content.module.scss
  var require_button_content_module = __commonJS({
    "src/community/components/button-content/button-content.module.scss"() {
      init_define_import_meta_env();
      init_define_process_env();
    }
  });

  // src/community/components/tabs/tabs/tabs.module.scss
  var require_tabs_module = __commonJS({
    "src/community/components/tabs/tabs/tabs.module.scss"() {
      init_define_import_meta_env();
      init_define_process_env();
    }
  });

  // .design-sync/.cache/previews/HashTrigger.tsx
  var HashTrigger_exports = {};
  __export(HashTrigger_exports, {
    Default: () => Default2,
    TabsWithHashTrigger: () => TabsWithHashTrigger2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React11 = __toESM(require_react_shim(), 1);

  // src/tedi/components/navigation/hash-trigger/hash-trigger.stories.tsx
  var hash_trigger_stories_exports = {};
  __export(hash_trigger_stories_exports, {
    Default: () => Default,
    TabsWithHashTrigger: () => TabsWithHashTrigger,
    default: () => hash_trigger_stories_default
  });
  init_define_import_meta_env();
  init_define_process_env();

  // src/community/components/tabs/tabs/tabs.tsx
  init_define_import_meta_env();
  init_define_process_env();
  var import_classnames7 = __toESM(require_classnames());
  var import_react12 = __toESM(require_react_shim());

  // ds-shim:ds:Print
  var ds_Print_exports = {};
  __export(ds_Print_exports, {
    default: () => ds_Print_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Print_exports, __toESM(require_ds_raw()));
  var g = window.Tedi;
  var ds_Print_default = g["Print"] !== void 0 ? g["Print"] : g;

  // ds-shim:ds:PrintingProvider
  var ds_PrintingProvider_exports = {};
  __export(ds_PrintingProvider_exports, {
    default: () => ds_PrintingProvider_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_PrintingProvider_exports, __toESM(require_ds_raw()));
  var g2 = window.Tedi;
  var ds_PrintingProvider_default = g2["PrintingProvider"] !== void 0 ? g2["PrintingProvider"] : g2;

  // src/community/components/tabs/tabs-context.tsx
  init_define_import_meta_env();
  init_define_process_env();
  var import_react = __toESM(require_react_shim());
  var TabsContext = import_react.default.createContext({
    currentTab: "",
    setCurrentTab: () => null
  });

  // src/community/components/tabs/tabs-item/tabs-item.tsx
  init_define_import_meta_env();
  init_define_process_env();
  var import_react7 = __toESM(require_react_shim());

  // src/community/helpers/hooks/use-breakpoint.ts
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/lodash.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/isSymbol.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_baseGetTag.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_Symbol.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_root.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_freeGlobal.js
  init_define_import_meta_env();
  init_define_process_env();
  var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
  var freeGlobal_default = freeGlobal;

  // node_modules/lodash-es/_root.js
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal_default || freeSelf || Function("return this")();
  var root_default = root;

  // node_modules/lodash-es/_Symbol.js
  var Symbol2 = root_default.Symbol;
  var Symbol_default = Symbol2;

  // node_modules/lodash-es/_getRawTag.js
  init_define_import_meta_env();
  init_define_process_env();
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var nativeObjectToString = objectProto.toString;
  var symToStringTag = Symbol_default ? Symbol_default.toStringTag : void 0;
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
    try {
      value[symToStringTag] = void 0;
      var unmasked = true;
    } catch (e) {
    }
    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }
  var getRawTag_default = getRawTag;

  // node_modules/lodash-es/_objectToString.js
  init_define_import_meta_env();
  init_define_process_env();
  var objectProto2 = Object.prototype;
  var nativeObjectToString2 = objectProto2.toString;
  function objectToString(value) {
    return nativeObjectToString2.call(value);
  }
  var objectToString_default = objectToString;

  // node_modules/lodash-es/_baseGetTag.js
  var nullTag = "[object Null]";
  var undefinedTag = "[object Undefined]";
  var symToStringTag2 = Symbol_default ? Symbol_default.toStringTag : void 0;
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag2 && symToStringTag2 in Object(value) ? getRawTag_default(value) : objectToString_default(value);
  }
  var baseGetTag_default = baseGetTag;

  // node_modules/lodash-es/isObjectLike.js
  init_define_import_meta_env();
  init_define_process_env();
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  var isObjectLike_default = isObjectLike;

  // node_modules/lodash-es/isSymbol.js
  var symbolTag = "[object Symbol]";
  function isSymbol(value) {
    return typeof value == "symbol" || isObjectLike_default(value) && baseGetTag_default(value) == symbolTag;
  }
  var isSymbol_default = isSymbol;

  // node_modules/lodash-es/_baseToString.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_arrayMap.js
  init_define_import_meta_env();
  init_define_process_env();
  function arrayMap(array, iteratee) {
    var index = -1, length = array == null ? 0 : array.length, result = Array(length);
    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }
  var arrayMap_default = arrayMap;

  // node_modules/lodash-es/isArray.js
  init_define_import_meta_env();
  init_define_process_env();
  var isArray = Array.isArray;
  var isArray_default = isArray;

  // node_modules/lodash-es/_baseToString.js
  var INFINITY = 1 / 0;
  var symbolProto = Symbol_default ? Symbol_default.prototype : void 0;
  var symbolToString = symbolProto ? symbolProto.toString : void 0;
  function baseToString(value) {
    if (typeof value == "string") {
      return value;
    }
    if (isArray_default(value)) {
      return arrayMap_default(value, baseToString) + "";
    }
    if (isSymbol_default(value)) {
      return symbolToString ? symbolToString.call(value) : "";
    }
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY ? "-0" : result;
  }
  var baseToString_default = baseToString;

  // node_modules/lodash-es/toNumber.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_baseTrim.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_trimmedEndIndex.js
  init_define_import_meta_env();
  init_define_process_env();
  var reWhitespace = /\s/;
  function trimmedEndIndex(string) {
    var index = string.length;
    while (index-- && reWhitespace.test(string.charAt(index))) {
    }
    return index;
  }
  var trimmedEndIndex_default = trimmedEndIndex;

  // node_modules/lodash-es/_baseTrim.js
  var reTrimStart = /^\s+/;
  function baseTrim(string) {
    return string ? string.slice(0, trimmedEndIndex_default(string) + 1).replace(reTrimStart, "") : string;
  }
  var baseTrim_default = baseTrim;

  // node_modules/lodash-es/isObject.js
  init_define_import_meta_env();
  init_define_process_env();
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  var isObject_default = isObject;

  // node_modules/lodash-es/toNumber.js
  var NAN = 0 / 0;
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
  var reIsBinary = /^0b[01]+$/i;
  var reIsOctal = /^0o[0-7]+$/i;
  var freeParseInt = parseInt;
  function toNumber(value) {
    if (typeof value == "number") {
      return value;
    }
    if (isSymbol_default(value)) {
      return NAN;
    }
    if (isObject_default(value)) {
      var other = typeof value.valueOf == "function" ? value.valueOf() : value;
      value = isObject_default(other) ? other + "" : other;
    }
    if (typeof value != "string") {
      return value === 0 ? value : +value;
    }
    value = baseTrim_default(value);
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
  }
  var toNumber_default = toNumber;

  // node_modules/lodash-es/identity.js
  init_define_import_meta_env();
  init_define_process_env();
  function identity(value) {
    return value;
  }
  var identity_default = identity;

  // node_modules/lodash-es/_WeakMap.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_getNative.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_baseIsNative.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/isFunction.js
  init_define_import_meta_env();
  init_define_process_env();
  var asyncTag = "[object AsyncFunction]";
  var funcTag = "[object Function]";
  var genTag = "[object GeneratorFunction]";
  var proxyTag = "[object Proxy]";
  function isFunction(value) {
    if (!isObject_default(value)) {
      return false;
    }
    var tag = baseGetTag_default(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }
  var isFunction_default = isFunction;

  // node_modules/lodash-es/_isMasked.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_coreJsData.js
  init_define_import_meta_env();
  init_define_process_env();
  var coreJsData = root_default["__core-js_shared__"];
  var coreJsData_default = coreJsData;

  // node_modules/lodash-es/_isMasked.js
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(coreJsData_default && coreJsData_default.keys && coreJsData_default.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  })();
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  var isMasked_default = isMasked;

  // node_modules/lodash-es/_toSource.js
  init_define_import_meta_env();
  init_define_process_env();
  var funcProto = Function.prototype;
  var funcToString = funcProto.toString;
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {
      }
      try {
        return func + "";
      } catch (e) {
      }
    }
    return "";
  }
  var toSource_default = toSource;

  // node_modules/lodash-es/_baseIsNative.js
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var funcProto2 = Function.prototype;
  var objectProto3 = Object.prototype;
  var funcToString2 = funcProto2.toString;
  var hasOwnProperty2 = objectProto3.hasOwnProperty;
  var reIsNative = RegExp(
    "^" + funcToString2.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function baseIsNative(value) {
    if (!isObject_default(value) || isMasked_default(value)) {
      return false;
    }
    var pattern = isFunction_default(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource_default(value));
  }
  var baseIsNative_default = baseIsNative;

  // node_modules/lodash-es/_getValue.js
  init_define_import_meta_env();
  init_define_process_env();
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  var getValue_default = getValue;

  // node_modules/lodash-es/_getNative.js
  function getNative(object, key) {
    var value = getValue_default(object, key);
    return baseIsNative_default(value) ? value : void 0;
  }
  var getNative_default = getNative;

  // node_modules/lodash-es/_WeakMap.js
  var WeakMap = getNative_default(root_default, "WeakMap");
  var WeakMap_default = WeakMap;

  // node_modules/lodash-es/_baseCreate.js
  init_define_import_meta_env();
  init_define_process_env();
  var objectCreate = Object.create;
  var baseCreate = /* @__PURE__ */ (function() {
    function object() {
    }
    return function(proto) {
      if (!isObject_default(proto)) {
        return {};
      }
      if (objectCreate) {
        return objectCreate(proto);
      }
      object.prototype = proto;
      var result = new object();
      object.prototype = void 0;
      return result;
    };
  })();
  var baseCreate_default = baseCreate;

  // node_modules/lodash-es/_apply.js
  init_define_import_meta_env();
  init_define_process_env();
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0:
        return func.call(thisArg);
      case 1:
        return func.call(thisArg, args[0]);
      case 2:
        return func.call(thisArg, args[0], args[1]);
      case 3:
        return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }
  var apply_default = apply;

  // node_modules/lodash-es/_copyArray.js
  init_define_import_meta_env();
  init_define_process_env();
  function copyArray(source, array) {
    var index = -1, length = source.length;
    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }
  var copyArray_default = copyArray;

  // node_modules/lodash-es/_shortOut.js
  init_define_import_meta_env();
  init_define_process_env();
  var HOT_COUNT = 800;
  var HOT_SPAN = 16;
  var nativeNow = Date.now;
  function shortOut(func) {
    var count = 0, lastCalled = 0;
    return function() {
      var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }
      return func.apply(void 0, arguments);
    };
  }
  var shortOut_default = shortOut;

  // node_modules/lodash-es/_setToString.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_baseSetToString.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/constant.js
  init_define_import_meta_env();
  init_define_process_env();
  function constant(value) {
    return function() {
      return value;
    };
  }
  var constant_default = constant;

  // node_modules/lodash-es/_defineProperty.js
  init_define_import_meta_env();
  init_define_process_env();
  var defineProperty = (function() {
    try {
      var func = getNative_default(Object, "defineProperty");
      func({}, "", {});
      return func;
    } catch (e) {
    }
  })();
  var defineProperty_default = defineProperty;

  // node_modules/lodash-es/_baseSetToString.js
  var baseSetToString = !defineProperty_default ? identity_default : function(func, string) {
    return defineProperty_default(func, "toString", {
      "configurable": true,
      "enumerable": false,
      "value": constant_default(string),
      "writable": true
    });
  };
  var baseSetToString_default = baseSetToString;

  // node_modules/lodash-es/_setToString.js
  var setToString = shortOut_default(baseSetToString_default);
  var setToString_default = setToString;

  // node_modules/lodash-es/_arrayEach.js
  init_define_import_meta_env();
  init_define_process_env();
  function arrayEach(array, iteratee) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }
  var arrayEach_default = arrayEach;

  // node_modules/lodash-es/_isIndex.js
  init_define_import_meta_env();
  init_define_process_env();
  var MAX_SAFE_INTEGER = 9007199254740991;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  var isIndex_default = isIndex;

  // node_modules/lodash-es/_assignValue.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_baseAssignValue.js
  init_define_import_meta_env();
  init_define_process_env();
  function baseAssignValue(object, key, value) {
    if (key == "__proto__" && defineProperty_default) {
      defineProperty_default(object, key, {
        "configurable": true,
        "enumerable": true,
        "value": value,
        "writable": true
      });
    } else {
      object[key] = value;
    }
  }
  var baseAssignValue_default = baseAssignValue;

  // node_modules/lodash-es/eq.js
  init_define_import_meta_env();
  init_define_process_env();
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  var eq_default = eq;

  // node_modules/lodash-es/_assignValue.js
  var objectProto4 = Object.prototype;
  var hasOwnProperty3 = objectProto4.hasOwnProperty;
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty3.call(object, key) && eq_default(objValue, value)) || value === void 0 && !(key in object)) {
      baseAssignValue_default(object, key, value);
    }
  }
  var assignValue_default = assignValue;

  // node_modules/lodash-es/_copyObject.js
  init_define_import_meta_env();
  init_define_process_env();
  function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});
    var index = -1, length = props.length;
    while (++index < length) {
      var key = props[index];
      var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
      if (newValue === void 0) {
        newValue = source[key];
      }
      if (isNew) {
        baseAssignValue_default(object, key, newValue);
      } else {
        assignValue_default(object, key, newValue);
      }
    }
    return object;
  }
  var copyObject_default = copyObject;

  // node_modules/lodash-es/_overRest.js
  init_define_import_meta_env();
  init_define_process_env();
  var nativeMax = Math.max;
  function overRest(func, start, transform) {
    start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
    return function() {
      var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
      while (++index < length) {
        array[index] = args[start + index];
      }
      index = -1;
      var otherArgs = Array(start + 1);
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = transform(array);
      return apply_default(func, this, otherArgs);
    };
  }
  var overRest_default = overRest;

  // node_modules/lodash-es/isArrayLike.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/isLength.js
  init_define_import_meta_env();
  init_define_process_env();
  var MAX_SAFE_INTEGER2 = 9007199254740991;
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
  }
  var isLength_default = isLength;

  // node_modules/lodash-es/isArrayLike.js
  function isArrayLike(value) {
    return value != null && isLength_default(value.length) && !isFunction_default(value);
  }
  var isArrayLike_default = isArrayLike;

  // node_modules/lodash-es/_isPrototype.js
  init_define_import_meta_env();
  init_define_process_env();
  var objectProto5 = Object.prototype;
  function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto5;
    return value === proto;
  }
  var isPrototype_default = isPrototype;

  // node_modules/lodash-es/keys.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_arrayLikeKeys.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_baseTimes.js
  init_define_import_meta_env();
  init_define_process_env();
  function baseTimes(n, iteratee) {
    var index = -1, result = Array(n);
    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }
  var baseTimes_default = baseTimes;

  // node_modules/lodash-es/isArguments.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_baseIsArguments.js
  init_define_import_meta_env();
  init_define_process_env();
  var argsTag = "[object Arguments]";
  function baseIsArguments(value) {
    return isObjectLike_default(value) && baseGetTag_default(value) == argsTag;
  }
  var baseIsArguments_default = baseIsArguments;

  // node_modules/lodash-es/isArguments.js
  var objectProto6 = Object.prototype;
  var hasOwnProperty4 = objectProto6.hasOwnProperty;
  var propertyIsEnumerable = objectProto6.propertyIsEnumerable;
  var isArguments = baseIsArguments_default(/* @__PURE__ */ (function() {
    return arguments;
  })()) ? baseIsArguments_default : function(value) {
    return isObjectLike_default(value) && hasOwnProperty4.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
  };
  var isArguments_default = isArguments;

  // node_modules/lodash-es/isBuffer.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/stubFalse.js
  init_define_import_meta_env();
  init_define_process_env();
  function stubFalse() {
    return false;
  }
  var stubFalse_default = stubFalse;

  // node_modules/lodash-es/isBuffer.js
  var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer2 = moduleExports ? root_default.Buffer : void 0;
  var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
  var isBuffer = nativeIsBuffer || stubFalse_default;
  var isBuffer_default = isBuffer;

  // node_modules/lodash-es/isTypedArray.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_baseIsTypedArray.js
  init_define_import_meta_env();
  init_define_process_env();
  var argsTag2 = "[object Arguments]";
  var arrayTag = "[object Array]";
  var boolTag = "[object Boolean]";
  var dateTag = "[object Date]";
  var errorTag = "[object Error]";
  var funcTag2 = "[object Function]";
  var mapTag = "[object Map]";
  var numberTag = "[object Number]";
  var objectTag = "[object Object]";
  var regexpTag = "[object RegExp]";
  var setTag = "[object Set]";
  var stringTag = "[object String]";
  var weakMapTag = "[object WeakMap]";
  var arrayBufferTag = "[object ArrayBuffer]";
  var dataViewTag = "[object DataView]";
  var float32Tag = "[object Float32Array]";
  var float64Tag = "[object Float64Array]";
  var int8Tag = "[object Int8Array]";
  var int16Tag = "[object Int16Array]";
  var int32Tag = "[object Int32Array]";
  var uint8Tag = "[object Uint8Array]";
  var uint8ClampedTag = "[object Uint8ClampedArray]";
  var uint16Tag = "[object Uint16Array]";
  var uint32Tag = "[object Uint32Array]";
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag2] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag2] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
  function baseIsTypedArray(value) {
    return isObjectLike_default(value) && isLength_default(value.length) && !!typedArrayTags[baseGetTag_default(value)];
  }
  var baseIsTypedArray_default = baseIsTypedArray;

  // node_modules/lodash-es/_baseUnary.js
  init_define_import_meta_env();
  init_define_process_env();
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }
  var baseUnary_default = baseUnary;

  // node_modules/lodash-es/_nodeUtil.js
  init_define_import_meta_env();
  init_define_process_env();
  var freeExports2 = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule2 = freeExports2 && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports2 = freeModule2 && freeModule2.exports === freeExports2;
  var freeProcess = moduleExports2 && freeGlobal_default.process;
  var nodeUtil = (function() {
    try {
      var types = freeModule2 && freeModule2.require && freeModule2.require("util").types;
      if (types) {
        return types;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e) {
    }
  })();
  var nodeUtil_default = nodeUtil;

  // node_modules/lodash-es/isTypedArray.js
  var nodeIsTypedArray = nodeUtil_default && nodeUtil_default.isTypedArray;
  var isTypedArray = nodeIsTypedArray ? baseUnary_default(nodeIsTypedArray) : baseIsTypedArray_default;
  var isTypedArray_default = isTypedArray;

  // node_modules/lodash-es/_arrayLikeKeys.js
  var objectProto7 = Object.prototype;
  var hasOwnProperty5 = objectProto7.hasOwnProperty;
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray_default(value), isArg = !isArr && isArguments_default(value), isBuff = !isArr && !isArg && isBuffer_default(value), isType = !isArr && !isArg && !isBuff && isTypedArray_default(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes_default(value.length, String) : [], length = result.length;
    for (var key in value) {
      if ((inherited || hasOwnProperty5.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
      (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
      isIndex_default(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }
  var arrayLikeKeys_default = arrayLikeKeys;

  // node_modules/lodash-es/_baseKeys.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_nativeKeys.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_overArg.js
  init_define_import_meta_env();
  init_define_process_env();
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  var overArg_default = overArg;

  // node_modules/lodash-es/_nativeKeys.js
  var nativeKeys = overArg_default(Object.keys, Object);
  var nativeKeys_default = nativeKeys;

  // node_modules/lodash-es/_baseKeys.js
  var objectProto8 = Object.prototype;
  var hasOwnProperty6 = objectProto8.hasOwnProperty;
  function baseKeys(object) {
    if (!isPrototype_default(object)) {
      return nativeKeys_default(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty6.call(object, key) && key != "constructor") {
        result.push(key);
      }
    }
    return result;
  }
  var baseKeys_default = baseKeys;

  // node_modules/lodash-es/keys.js
  function keys(object) {
    return isArrayLike_default(object) ? arrayLikeKeys_default(object) : baseKeys_default(object);
  }
  var keys_default = keys;

  // node_modules/lodash-es/keysIn.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_baseKeysIn.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_nativeKeysIn.js
  init_define_import_meta_env();
  init_define_process_env();
  function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }
  var nativeKeysIn_default = nativeKeysIn;

  // node_modules/lodash-es/_baseKeysIn.js
  var objectProto9 = Object.prototype;
  var hasOwnProperty7 = objectProto9.hasOwnProperty;
  function baseKeysIn(object) {
    if (!isObject_default(object)) {
      return nativeKeysIn_default(object);
    }
    var isProto = isPrototype_default(object), result = [];
    for (var key in object) {
      if (!(key == "constructor" && (isProto || !hasOwnProperty7.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }
  var baseKeysIn_default = baseKeysIn;

  // node_modules/lodash-es/keysIn.js
  function keysIn(object) {
    return isArrayLike_default(object) ? arrayLikeKeys_default(object, true) : baseKeysIn_default(object);
  }
  var keysIn_default = keysIn;

  // node_modules/lodash-es/get.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_baseGet.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_castPath.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_isKey.js
  init_define_import_meta_env();
  init_define_process_env();
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
  var reIsPlainProp = /^\w*$/;
  function isKey(value, object) {
    if (isArray_default(value)) {
      return false;
    }
    var type = typeof value;
    if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol_default(value)) {
      return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
  }
  var isKey_default = isKey;

  // node_modules/lodash-es/_stringToPath.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_memoizeCapped.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/memoize.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_MapCache.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_mapCacheClear.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_Hash.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_hashClear.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_nativeCreate.js
  init_define_import_meta_env();
  init_define_process_env();
  var nativeCreate = getNative_default(Object, "create");
  var nativeCreate_default = nativeCreate;

  // node_modules/lodash-es/_hashClear.js
  function hashClear() {
    this.__data__ = nativeCreate_default ? nativeCreate_default(null) : {};
    this.size = 0;
  }
  var hashClear_default = hashClear;

  // node_modules/lodash-es/_hashDelete.js
  init_define_import_meta_env();
  init_define_process_env();
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }
  var hashDelete_default = hashDelete;

  // node_modules/lodash-es/_hashGet.js
  init_define_import_meta_env();
  init_define_process_env();
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  var objectProto10 = Object.prototype;
  var hasOwnProperty8 = objectProto10.hasOwnProperty;
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate_default) {
      var result = data[key];
      return result === HASH_UNDEFINED ? void 0 : result;
    }
    return hasOwnProperty8.call(data, key) ? data[key] : void 0;
  }
  var hashGet_default = hashGet;

  // node_modules/lodash-es/_hashHas.js
  init_define_import_meta_env();
  init_define_process_env();
  var objectProto11 = Object.prototype;
  var hasOwnProperty9 = objectProto11.hasOwnProperty;
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate_default ? data[key] !== void 0 : hasOwnProperty9.call(data, key);
  }
  var hashHas_default = hashHas;

  // node_modules/lodash-es/_hashSet.js
  init_define_import_meta_env();
  init_define_process_env();
  var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate_default && value === void 0 ? HASH_UNDEFINED2 : value;
    return this;
  }
  var hashSet_default = hashSet;

  // node_modules/lodash-es/_Hash.js
  function Hash(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  Hash.prototype.clear = hashClear_default;
  Hash.prototype["delete"] = hashDelete_default;
  Hash.prototype.get = hashGet_default;
  Hash.prototype.has = hashHas_default;
  Hash.prototype.set = hashSet_default;
  var Hash_default = Hash;

  // node_modules/lodash-es/_ListCache.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_listCacheClear.js
  init_define_import_meta_env();
  init_define_process_env();
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }
  var listCacheClear_default = listCacheClear;

  // node_modules/lodash-es/_listCacheDelete.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_assocIndexOf.js
  init_define_import_meta_env();
  init_define_process_env();
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq_default(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  var assocIndexOf_default = assocIndexOf;

  // node_modules/lodash-es/_listCacheDelete.js
  var arrayProto = Array.prototype;
  var splice = arrayProto.splice;
  function listCacheDelete(key) {
    var data = this.__data__, index = assocIndexOf_default(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }
  var listCacheDelete_default = listCacheDelete;

  // node_modules/lodash-es/_listCacheGet.js
  init_define_import_meta_env();
  init_define_process_env();
  function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf_default(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  var listCacheGet_default = listCacheGet;

  // node_modules/lodash-es/_listCacheHas.js
  init_define_import_meta_env();
  init_define_process_env();
  function listCacheHas(key) {
    return assocIndexOf_default(this.__data__, key) > -1;
  }
  var listCacheHas_default = listCacheHas;

  // node_modules/lodash-es/_listCacheSet.js
  init_define_import_meta_env();
  init_define_process_env();
  function listCacheSet(key, value) {
    var data = this.__data__, index = assocIndexOf_default(data, key);
    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
  var listCacheSet_default = listCacheSet;

  // node_modules/lodash-es/_ListCache.js
  function ListCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  ListCache.prototype.clear = listCacheClear_default;
  ListCache.prototype["delete"] = listCacheDelete_default;
  ListCache.prototype.get = listCacheGet_default;
  ListCache.prototype.has = listCacheHas_default;
  ListCache.prototype.set = listCacheSet_default;
  var ListCache_default = ListCache;

  // node_modules/lodash-es/_Map.js
  init_define_import_meta_env();
  init_define_process_env();
  var Map = getNative_default(root_default, "Map");
  var Map_default = Map;

  // node_modules/lodash-es/_mapCacheClear.js
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      "hash": new Hash_default(),
      "map": new (Map_default || ListCache_default)(),
      "string": new Hash_default()
    };
  }
  var mapCacheClear_default = mapCacheClear;

  // node_modules/lodash-es/_mapCacheDelete.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_getMapData.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_isKeyable.js
  init_define_import_meta_env();
  init_define_process_env();
  function isKeyable(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
  }
  var isKeyable_default = isKeyable;

  // node_modules/lodash-es/_getMapData.js
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable_default(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  var getMapData_default = getMapData;

  // node_modules/lodash-es/_mapCacheDelete.js
  function mapCacheDelete(key) {
    var result = getMapData_default(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
  }
  var mapCacheDelete_default = mapCacheDelete;

  // node_modules/lodash-es/_mapCacheGet.js
  init_define_import_meta_env();
  init_define_process_env();
  function mapCacheGet(key) {
    return getMapData_default(this, key).get(key);
  }
  var mapCacheGet_default = mapCacheGet;

  // node_modules/lodash-es/_mapCacheHas.js
  init_define_import_meta_env();
  init_define_process_env();
  function mapCacheHas(key) {
    return getMapData_default(this, key).has(key);
  }
  var mapCacheHas_default = mapCacheHas;

  // node_modules/lodash-es/_mapCacheSet.js
  init_define_import_meta_env();
  init_define_process_env();
  function mapCacheSet(key, value) {
    var data = getMapData_default(this, key), size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }
  var mapCacheSet_default = mapCacheSet;

  // node_modules/lodash-es/_MapCache.js
  function MapCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  MapCache.prototype.clear = mapCacheClear_default;
  MapCache.prototype["delete"] = mapCacheDelete_default;
  MapCache.prototype.get = mapCacheGet_default;
  MapCache.prototype.has = mapCacheHas_default;
  MapCache.prototype.set = mapCacheSet_default;
  var MapCache_default = MapCache;

  // node_modules/lodash-es/memoize.js
  var FUNC_ERROR_TEXT = "Expected a function";
  function memoize(func, resolver) {
    if (typeof func != "function" || resolver != null && typeof resolver != "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function() {
      var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };
    memoized.cache = new (memoize.Cache || MapCache_default)();
    return memoized;
  }
  memoize.Cache = MapCache_default;
  var memoize_default = memoize;

  // node_modules/lodash-es/_memoizeCapped.js
  var MAX_MEMOIZE_SIZE = 500;
  function memoizeCapped(func) {
    var result = memoize_default(func, function(key) {
      if (cache.size === MAX_MEMOIZE_SIZE) {
        cache.clear();
      }
      return key;
    });
    var cache = result.cache;
    return result;
  }
  var memoizeCapped_default = memoizeCapped;

  // node_modules/lodash-es/_stringToPath.js
  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
  var reEscapeChar = /\\(\\)?/g;
  var stringToPath = memoizeCapped_default(function(string) {
    var result = [];
    if (string.charCodeAt(0) === 46) {
      result.push("");
    }
    string.replace(rePropName, function(match, number, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
    });
    return result;
  });
  var stringToPath_default = stringToPath;

  // node_modules/lodash-es/toString.js
  init_define_import_meta_env();
  init_define_process_env();
  function toString(value) {
    return value == null ? "" : baseToString_default(value);
  }
  var toString_default = toString;

  // node_modules/lodash-es/_castPath.js
  function castPath(value, object) {
    if (isArray_default(value)) {
      return value;
    }
    return isKey_default(value, object) ? [value] : stringToPath_default(toString_default(value));
  }
  var castPath_default = castPath;

  // node_modules/lodash-es/_toKey.js
  init_define_import_meta_env();
  init_define_process_env();
  var INFINITY2 = 1 / 0;
  function toKey(value) {
    if (typeof value == "string" || isSymbol_default(value)) {
      return value;
    }
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY2 ? "-0" : result;
  }
  var toKey_default = toKey;

  // node_modules/lodash-es/_baseGet.js
  function baseGet(object, path) {
    path = castPath_default(path, object);
    var index = 0, length = path.length;
    while (object != null && index < length) {
      object = object[toKey_default(path[index++])];
    }
    return index && index == length ? object : void 0;
  }
  var baseGet_default = baseGet;

  // node_modules/lodash-es/get.js
  function get(object, path, defaultValue) {
    var result = object == null ? void 0 : baseGet_default(object, path);
    return result === void 0 ? defaultValue : result;
  }
  var get_default = get;

  // node_modules/lodash-es/_flatRest.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/flatten.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_baseFlatten.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_arrayPush.js
  init_define_import_meta_env();
  init_define_process_env();
  function arrayPush(array, values) {
    var index = -1, length = values.length, offset = array.length;
    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }
  var arrayPush_default = arrayPush;

  // node_modules/lodash-es/_isFlattenable.js
  init_define_import_meta_env();
  init_define_process_env();
  var spreadableSymbol = Symbol_default ? Symbol_default.isConcatSpreadable : void 0;
  function isFlattenable(value) {
    return isArray_default(value) || isArguments_default(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
  }
  var isFlattenable_default = isFlattenable;

  // node_modules/lodash-es/_baseFlatten.js
  function baseFlatten(array, depth, predicate, isStrict, result) {
    var index = -1, length = array.length;
    predicate || (predicate = isFlattenable_default);
    result || (result = []);
    while (++index < length) {
      var value = array[index];
      if (depth > 0 && predicate(value)) {
        if (depth > 1) {
          baseFlatten(value, depth - 1, predicate, isStrict, result);
        } else {
          arrayPush_default(result, value);
        }
      } else if (!isStrict) {
        result[result.length] = value;
      }
    }
    return result;
  }
  var baseFlatten_default = baseFlatten;

  // node_modules/lodash-es/flatten.js
  function flatten(array) {
    var length = array == null ? 0 : array.length;
    return length ? baseFlatten_default(array, 1) : [];
  }
  var flatten_default = flatten;

  // node_modules/lodash-es/_flatRest.js
  function flatRest(func) {
    return setToString_default(overRest_default(func, void 0, flatten_default), func + "");
  }
  var flatRest_default = flatRest;

  // node_modules/lodash-es/isPlainObject.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_getPrototype.js
  init_define_import_meta_env();
  init_define_process_env();
  var getPrototype = overArg_default(Object.getPrototypeOf, Object);
  var getPrototype_default = getPrototype;

  // node_modules/lodash-es/isPlainObject.js
  var objectTag2 = "[object Object]";
  var funcProto3 = Function.prototype;
  var objectProto12 = Object.prototype;
  var funcToString3 = funcProto3.toString;
  var hasOwnProperty10 = objectProto12.hasOwnProperty;
  var objectCtorString = funcToString3.call(Object);
  function isPlainObject(value) {
    if (!isObjectLike_default(value) || baseGetTag_default(value) != objectTag2) {
      return false;
    }
    var proto = getPrototype_default(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty10.call(proto, "constructor") && proto.constructor;
    return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString3.call(Ctor) == objectCtorString;
  }
  var isPlainObject_default = isPlainObject;

  // node_modules/lodash-es/_baseSlice.js
  init_define_import_meta_env();
  init_define_process_env();
  function baseSlice(array, start, end) {
    var index = -1, length = array.length;
    if (start < 0) {
      start = -start > length ? 0 : length + start;
    }
    end = end > length ? length : end;
    if (end < 0) {
      end += length;
    }
    length = start > end ? 0 : end - start >>> 0;
    start >>>= 0;
    var result = Array(length);
    while (++index < length) {
      result[index] = array[index + start];
    }
    return result;
  }
  var baseSlice_default = baseSlice;

  // node_modules/lodash-es/_baseClone.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_Stack.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_stackClear.js
  init_define_import_meta_env();
  init_define_process_env();
  function stackClear() {
    this.__data__ = new ListCache_default();
    this.size = 0;
  }
  var stackClear_default = stackClear;

  // node_modules/lodash-es/_stackDelete.js
  init_define_import_meta_env();
  init_define_process_env();
  function stackDelete(key) {
    var data = this.__data__, result = data["delete"](key);
    this.size = data.size;
    return result;
  }
  var stackDelete_default = stackDelete;

  // node_modules/lodash-es/_stackGet.js
  init_define_import_meta_env();
  init_define_process_env();
  function stackGet(key) {
    return this.__data__.get(key);
  }
  var stackGet_default = stackGet;

  // node_modules/lodash-es/_stackHas.js
  init_define_import_meta_env();
  init_define_process_env();
  function stackHas(key) {
    return this.__data__.has(key);
  }
  var stackHas_default = stackHas;

  // node_modules/lodash-es/_stackSet.js
  init_define_import_meta_env();
  init_define_process_env();
  var LARGE_ARRAY_SIZE = 200;
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache_default) {
      var pairs = data.__data__;
      if (!Map_default || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache_default(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }
  var stackSet_default = stackSet;

  // node_modules/lodash-es/_Stack.js
  function Stack(entries) {
    var data = this.__data__ = new ListCache_default(entries);
    this.size = data.size;
  }
  Stack.prototype.clear = stackClear_default;
  Stack.prototype["delete"] = stackDelete_default;
  Stack.prototype.get = stackGet_default;
  Stack.prototype.has = stackHas_default;
  Stack.prototype.set = stackSet_default;
  var Stack_default = Stack;

  // node_modules/lodash-es/_baseAssign.js
  init_define_import_meta_env();
  init_define_process_env();
  function baseAssign(object, source) {
    return object && copyObject_default(source, keys_default(source), object);
  }
  var baseAssign_default = baseAssign;

  // node_modules/lodash-es/_baseAssignIn.js
  init_define_import_meta_env();
  init_define_process_env();
  function baseAssignIn(object, source) {
    return object && copyObject_default(source, keysIn_default(source), object);
  }
  var baseAssignIn_default = baseAssignIn;

  // node_modules/lodash-es/_cloneBuffer.js
  init_define_import_meta_env();
  init_define_process_env();
  var freeExports3 = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule3 = freeExports3 && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports3 = freeModule3 && freeModule3.exports === freeExports3;
  var Buffer3 = moduleExports3 ? root_default.Buffer : void 0;
  var allocUnsafe = Buffer3 ? Buffer3.allocUnsafe : void 0;
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
    buffer.copy(result);
    return result;
  }
  var cloneBuffer_default = cloneBuffer;

  // node_modules/lodash-es/_copySymbols.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_getSymbols.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_arrayFilter.js
  init_define_import_meta_env();
  init_define_process_env();
  function arrayFilter(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }
  var arrayFilter_default = arrayFilter;

  // node_modules/lodash-es/stubArray.js
  init_define_import_meta_env();
  init_define_process_env();
  function stubArray() {
    return [];
  }
  var stubArray_default = stubArray;

  // node_modules/lodash-es/_getSymbols.js
  var objectProto13 = Object.prototype;
  var propertyIsEnumerable2 = objectProto13.propertyIsEnumerable;
  var nativeGetSymbols = Object.getOwnPropertySymbols;
  var getSymbols = !nativeGetSymbols ? stubArray_default : function(object) {
    if (object == null) {
      return [];
    }
    object = Object(object);
    return arrayFilter_default(nativeGetSymbols(object), function(symbol) {
      return propertyIsEnumerable2.call(object, symbol);
    });
  };
  var getSymbols_default = getSymbols;

  // node_modules/lodash-es/_copySymbols.js
  function copySymbols(source, object) {
    return copyObject_default(source, getSymbols_default(source), object);
  }
  var copySymbols_default = copySymbols;

  // node_modules/lodash-es/_copySymbolsIn.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_getSymbolsIn.js
  init_define_import_meta_env();
  init_define_process_env();
  var nativeGetSymbols2 = Object.getOwnPropertySymbols;
  var getSymbolsIn = !nativeGetSymbols2 ? stubArray_default : function(object) {
    var result = [];
    while (object) {
      arrayPush_default(result, getSymbols_default(object));
      object = getPrototype_default(object);
    }
    return result;
  };
  var getSymbolsIn_default = getSymbolsIn;

  // node_modules/lodash-es/_copySymbolsIn.js
  function copySymbolsIn(source, object) {
    return copyObject_default(source, getSymbolsIn_default(source), object);
  }
  var copySymbolsIn_default = copySymbolsIn;

  // node_modules/lodash-es/_getAllKeys.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_baseGetAllKeys.js
  init_define_import_meta_env();
  init_define_process_env();
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray_default(object) ? result : arrayPush_default(result, symbolsFunc(object));
  }
  var baseGetAllKeys_default = baseGetAllKeys;

  // node_modules/lodash-es/_getAllKeys.js
  function getAllKeys(object) {
    return baseGetAllKeys_default(object, keys_default, getSymbols_default);
  }
  var getAllKeys_default = getAllKeys;

  // node_modules/lodash-es/_getAllKeysIn.js
  init_define_import_meta_env();
  init_define_process_env();
  function getAllKeysIn(object) {
    return baseGetAllKeys_default(object, keysIn_default, getSymbolsIn_default);
  }
  var getAllKeysIn_default = getAllKeysIn;

  // node_modules/lodash-es/_getTag.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_DataView.js
  init_define_import_meta_env();
  init_define_process_env();
  var DataView = getNative_default(root_default, "DataView");
  var DataView_default = DataView;

  // node_modules/lodash-es/_Promise.js
  init_define_import_meta_env();
  init_define_process_env();
  var Promise2 = getNative_default(root_default, "Promise");
  var Promise_default = Promise2;

  // node_modules/lodash-es/_Set.js
  init_define_import_meta_env();
  init_define_process_env();
  var Set = getNative_default(root_default, "Set");
  var Set_default = Set;

  // node_modules/lodash-es/_getTag.js
  var mapTag2 = "[object Map]";
  var objectTag3 = "[object Object]";
  var promiseTag = "[object Promise]";
  var setTag2 = "[object Set]";
  var weakMapTag2 = "[object WeakMap]";
  var dataViewTag2 = "[object DataView]";
  var dataViewCtorString = toSource_default(DataView_default);
  var mapCtorString = toSource_default(Map_default);
  var promiseCtorString = toSource_default(Promise_default);
  var setCtorString = toSource_default(Set_default);
  var weakMapCtorString = toSource_default(WeakMap_default);
  var getTag = baseGetTag_default;
  if (DataView_default && getTag(new DataView_default(new ArrayBuffer(1))) != dataViewTag2 || Map_default && getTag(new Map_default()) != mapTag2 || Promise_default && getTag(Promise_default.resolve()) != promiseTag || Set_default && getTag(new Set_default()) != setTag2 || WeakMap_default && getTag(new WeakMap_default()) != weakMapTag2) {
    getTag = function(value) {
      var result = baseGetTag_default(value), Ctor = result == objectTag3 ? value.constructor : void 0, ctorString = Ctor ? toSource_default(Ctor) : "";
      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag2;
          case mapCtorString:
            return mapTag2;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag2;
          case weakMapCtorString:
            return weakMapTag2;
        }
      }
      return result;
    };
  }
  var getTag_default = getTag;

  // node_modules/lodash-es/_initCloneArray.js
  init_define_import_meta_env();
  init_define_process_env();
  var objectProto14 = Object.prototype;
  var hasOwnProperty11 = objectProto14.hasOwnProperty;
  function initCloneArray(array) {
    var length = array.length, result = new array.constructor(length);
    if (length && typeof array[0] == "string" && hasOwnProperty11.call(array, "index")) {
      result.index = array.index;
      result.input = array.input;
    }
    return result;
  }
  var initCloneArray_default = initCloneArray;

  // node_modules/lodash-es/_initCloneByTag.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_cloneArrayBuffer.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_Uint8Array.js
  init_define_import_meta_env();
  init_define_process_env();
  var Uint8Array2 = root_default.Uint8Array;
  var Uint8Array_default = Uint8Array2;

  // node_modules/lodash-es/_cloneArrayBuffer.js
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array_default(result).set(new Uint8Array_default(arrayBuffer));
    return result;
  }
  var cloneArrayBuffer_default = cloneArrayBuffer;

  // node_modules/lodash-es/_cloneDataView.js
  init_define_import_meta_env();
  init_define_process_env();
  function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer_default(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }
  var cloneDataView_default = cloneDataView;

  // node_modules/lodash-es/_cloneRegExp.js
  init_define_import_meta_env();
  init_define_process_env();
  var reFlags = /\w*$/;
  function cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
  }
  var cloneRegExp_default = cloneRegExp;

  // node_modules/lodash-es/_cloneSymbol.js
  init_define_import_meta_env();
  init_define_process_env();
  var symbolProto2 = Symbol_default ? Symbol_default.prototype : void 0;
  var symbolValueOf = symbolProto2 ? symbolProto2.valueOf : void 0;
  function cloneSymbol(symbol) {
    return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
  }
  var cloneSymbol_default = cloneSymbol;

  // node_modules/lodash-es/_cloneTypedArray.js
  init_define_import_meta_env();
  init_define_process_env();
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer_default(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }
  var cloneTypedArray_default = cloneTypedArray;

  // node_modules/lodash-es/_initCloneByTag.js
  var boolTag2 = "[object Boolean]";
  var dateTag2 = "[object Date]";
  var mapTag3 = "[object Map]";
  var numberTag2 = "[object Number]";
  var regexpTag2 = "[object RegExp]";
  var setTag3 = "[object Set]";
  var stringTag2 = "[object String]";
  var symbolTag2 = "[object Symbol]";
  var arrayBufferTag2 = "[object ArrayBuffer]";
  var dataViewTag3 = "[object DataView]";
  var float32Tag2 = "[object Float32Array]";
  var float64Tag2 = "[object Float64Array]";
  var int8Tag2 = "[object Int8Array]";
  var int16Tag2 = "[object Int16Array]";
  var int32Tag2 = "[object Int32Array]";
  var uint8Tag2 = "[object Uint8Array]";
  var uint8ClampedTag2 = "[object Uint8ClampedArray]";
  var uint16Tag2 = "[object Uint16Array]";
  var uint32Tag2 = "[object Uint32Array]";
  function initCloneByTag(object, tag, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
      case arrayBufferTag2:
        return cloneArrayBuffer_default(object);
      case boolTag2:
      case dateTag2:
        return new Ctor(+object);
      case dataViewTag3:
        return cloneDataView_default(object, isDeep);
      case float32Tag2:
      case float64Tag2:
      case int8Tag2:
      case int16Tag2:
      case int32Tag2:
      case uint8Tag2:
      case uint8ClampedTag2:
      case uint16Tag2:
      case uint32Tag2:
        return cloneTypedArray_default(object, isDeep);
      case mapTag3:
        return new Ctor();
      case numberTag2:
      case stringTag2:
        return new Ctor(object);
      case regexpTag2:
        return cloneRegExp_default(object);
      case setTag3:
        return new Ctor();
      case symbolTag2:
        return cloneSymbol_default(object);
    }
  }
  var initCloneByTag_default = initCloneByTag;

  // node_modules/lodash-es/_initCloneObject.js
  init_define_import_meta_env();
  init_define_process_env();
  function initCloneObject(object) {
    return typeof object.constructor == "function" && !isPrototype_default(object) ? baseCreate_default(getPrototype_default(object)) : {};
  }
  var initCloneObject_default = initCloneObject;

  // node_modules/lodash-es/isMap.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_baseIsMap.js
  init_define_import_meta_env();
  init_define_process_env();
  var mapTag4 = "[object Map]";
  function baseIsMap(value) {
    return isObjectLike_default(value) && getTag_default(value) == mapTag4;
  }
  var baseIsMap_default = baseIsMap;

  // node_modules/lodash-es/isMap.js
  var nodeIsMap = nodeUtil_default && nodeUtil_default.isMap;
  var isMap = nodeIsMap ? baseUnary_default(nodeIsMap) : baseIsMap_default;
  var isMap_default = isMap;

  // node_modules/lodash-es/isSet.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_baseIsSet.js
  init_define_import_meta_env();
  init_define_process_env();
  var setTag4 = "[object Set]";
  function baseIsSet(value) {
    return isObjectLike_default(value) && getTag_default(value) == setTag4;
  }
  var baseIsSet_default = baseIsSet;

  // node_modules/lodash-es/isSet.js
  var nodeIsSet = nodeUtil_default && nodeUtil_default.isSet;
  var isSet = nodeIsSet ? baseUnary_default(nodeIsSet) : baseIsSet_default;
  var isSet_default = isSet;

  // node_modules/lodash-es/_baseClone.js
  var CLONE_DEEP_FLAG = 1;
  var CLONE_FLAT_FLAG = 2;
  var CLONE_SYMBOLS_FLAG = 4;
  var argsTag3 = "[object Arguments]";
  var arrayTag2 = "[object Array]";
  var boolTag3 = "[object Boolean]";
  var dateTag3 = "[object Date]";
  var errorTag2 = "[object Error]";
  var funcTag3 = "[object Function]";
  var genTag2 = "[object GeneratorFunction]";
  var mapTag5 = "[object Map]";
  var numberTag3 = "[object Number]";
  var objectTag4 = "[object Object]";
  var regexpTag3 = "[object RegExp]";
  var setTag5 = "[object Set]";
  var stringTag3 = "[object String]";
  var symbolTag3 = "[object Symbol]";
  var weakMapTag3 = "[object WeakMap]";
  var arrayBufferTag3 = "[object ArrayBuffer]";
  var dataViewTag4 = "[object DataView]";
  var float32Tag3 = "[object Float32Array]";
  var float64Tag3 = "[object Float64Array]";
  var int8Tag3 = "[object Int8Array]";
  var int16Tag3 = "[object Int16Array]";
  var int32Tag3 = "[object Int32Array]";
  var uint8Tag3 = "[object Uint8Array]";
  var uint8ClampedTag3 = "[object Uint8ClampedArray]";
  var uint16Tag3 = "[object Uint16Array]";
  var uint32Tag3 = "[object Uint32Array]";
  var cloneableTags = {};
  cloneableTags[argsTag3] = cloneableTags[arrayTag2] = cloneableTags[arrayBufferTag3] = cloneableTags[dataViewTag4] = cloneableTags[boolTag3] = cloneableTags[dateTag3] = cloneableTags[float32Tag3] = cloneableTags[float64Tag3] = cloneableTags[int8Tag3] = cloneableTags[int16Tag3] = cloneableTags[int32Tag3] = cloneableTags[mapTag5] = cloneableTags[numberTag3] = cloneableTags[objectTag4] = cloneableTags[regexpTag3] = cloneableTags[setTag5] = cloneableTags[stringTag3] = cloneableTags[symbolTag3] = cloneableTags[uint8Tag3] = cloneableTags[uint8ClampedTag3] = cloneableTags[uint16Tag3] = cloneableTags[uint32Tag3] = true;
  cloneableTags[errorTag2] = cloneableTags[funcTag3] = cloneableTags[weakMapTag3] = false;
  function baseClone(value, bitmask, customizer, key, object, stack) {
    var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
    if (customizer) {
      result = object ? customizer(value, key, object, stack) : customizer(value);
    }
    if (result !== void 0) {
      return result;
    }
    if (!isObject_default(value)) {
      return value;
    }
    var isArr = isArray_default(value);
    if (isArr) {
      result = initCloneArray_default(value);
      if (!isDeep) {
        return copyArray_default(value, result);
      }
    } else {
      var tag = getTag_default(value), isFunc = tag == funcTag3 || tag == genTag2;
      if (isBuffer_default(value)) {
        return cloneBuffer_default(value, isDeep);
      }
      if (tag == objectTag4 || tag == argsTag3 || isFunc && !object) {
        result = isFlat || isFunc ? {} : initCloneObject_default(value);
        if (!isDeep) {
          return isFlat ? copySymbolsIn_default(value, baseAssignIn_default(result, value)) : copySymbols_default(value, baseAssign_default(result, value));
        }
      } else {
        if (!cloneableTags[tag]) {
          return object ? value : {};
        }
        result = initCloneByTag_default(value, tag, isDeep);
      }
    }
    stack || (stack = new Stack_default());
    var stacked = stack.get(value);
    if (stacked) {
      return stacked;
    }
    stack.set(value, result);
    if (isSet_default(value)) {
      value.forEach(function(subValue) {
        result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
      });
    } else if (isMap_default(value)) {
      value.forEach(function(subValue, key2) {
        result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
      });
    }
    var keysFunc = isFull ? isFlat ? getAllKeysIn_default : getAllKeys_default : isFlat ? keysIn_default : keys_default;
    var props = isArr ? void 0 : keysFunc(value);
    arrayEach_default(props || value, function(subValue, key2) {
      if (props) {
        key2 = subValue;
        subValue = value[key2];
      }
      assignValue_default(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
    });
    return result;
  }
  var baseClone_default = baseClone;

  // node_modules/lodash-es/_baseIteratee.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_baseMatches.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_baseIsMatch.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_baseIsEqual.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_baseIsEqualDeep.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_equalArrays.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_SetCache.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_setCacheAdd.js
  init_define_import_meta_env();
  init_define_process_env();
  var HASH_UNDEFINED3 = "__lodash_hash_undefined__";
  function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED3);
    return this;
  }
  var setCacheAdd_default = setCacheAdd;

  // node_modules/lodash-es/_setCacheHas.js
  init_define_import_meta_env();
  init_define_process_env();
  function setCacheHas(value) {
    return this.__data__.has(value);
  }
  var setCacheHas_default = setCacheHas;

  // node_modules/lodash-es/_SetCache.js
  function SetCache(values) {
    var index = -1, length = values == null ? 0 : values.length;
    this.__data__ = new MapCache_default();
    while (++index < length) {
      this.add(values[index]);
    }
  }
  SetCache.prototype.add = SetCache.prototype.push = setCacheAdd_default;
  SetCache.prototype.has = setCacheHas_default;
  var SetCache_default = SetCache;

  // node_modules/lodash-es/_arraySome.js
  init_define_import_meta_env();
  init_define_process_env();
  function arraySome(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }
  var arraySome_default = arraySome;

  // node_modules/lodash-es/_cacheHas.js
  init_define_import_meta_env();
  init_define_process_env();
  function cacheHas(cache, key) {
    return cache.has(key);
  }
  var cacheHas_default = cacheHas;

  // node_modules/lodash-es/_equalArrays.js
  var COMPARE_PARTIAL_FLAG = 1;
  var COMPARE_UNORDERED_FLAG = 2;
  function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    }
    var arrStacked = stack.get(array);
    var othStacked = stack.get(other);
    if (arrStacked && othStacked) {
      return arrStacked == other && othStacked == array;
    }
    var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache_default() : void 0;
    stack.set(array, other);
    stack.set(other, array);
    while (++index < arrLength) {
      var arrValue = array[index], othValue = other[index];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
      }
      if (compared !== void 0) {
        if (compared) {
          continue;
        }
        result = false;
        break;
      }
      if (seen) {
        if (!arraySome_default(other, function(othValue2, othIndex) {
          if (!cacheHas_default(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
            return seen.push(othIndex);
          }
        })) {
          result = false;
          break;
        }
      } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
        result = false;
        break;
      }
    }
    stack["delete"](array);
    stack["delete"](other);
    return result;
  }
  var equalArrays_default = equalArrays;

  // node_modules/lodash-es/_equalByTag.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_mapToArray.js
  init_define_import_meta_env();
  init_define_process_env();
  function mapToArray(map) {
    var index = -1, result = Array(map.size);
    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }
  var mapToArray_default = mapToArray;

  // node_modules/lodash-es/_setToArray.js
  init_define_import_meta_env();
  init_define_process_env();
  function setToArray(set) {
    var index = -1, result = Array(set.size);
    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }
  var setToArray_default = setToArray;

  // node_modules/lodash-es/_equalByTag.js
  var COMPARE_PARTIAL_FLAG2 = 1;
  var COMPARE_UNORDERED_FLAG2 = 2;
  var boolTag4 = "[object Boolean]";
  var dateTag4 = "[object Date]";
  var errorTag3 = "[object Error]";
  var mapTag6 = "[object Map]";
  var numberTag4 = "[object Number]";
  var regexpTag4 = "[object RegExp]";
  var setTag6 = "[object Set]";
  var stringTag4 = "[object String]";
  var symbolTag4 = "[object Symbol]";
  var arrayBufferTag4 = "[object ArrayBuffer]";
  var dataViewTag5 = "[object DataView]";
  var symbolProto3 = Symbol_default ? Symbol_default.prototype : void 0;
  var symbolValueOf2 = symbolProto3 ? symbolProto3.valueOf : void 0;
  function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
      case dataViewTag5:
        if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
          return false;
        }
        object = object.buffer;
        other = other.buffer;
      case arrayBufferTag4:
        if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array_default(object), new Uint8Array_default(other))) {
          return false;
        }
        return true;
      case boolTag4:
      case dateTag4:
      case numberTag4:
        return eq_default(+object, +other);
      case errorTag3:
        return object.name == other.name && object.message == other.message;
      case regexpTag4:
      case stringTag4:
        return object == other + "";
      case mapTag6:
        var convert = mapToArray_default;
      case setTag6:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG2;
        convert || (convert = setToArray_default);
        if (object.size != other.size && !isPartial) {
          return false;
        }
        var stacked = stack.get(object);
        if (stacked) {
          return stacked == other;
        }
        bitmask |= COMPARE_UNORDERED_FLAG2;
        stack.set(object, other);
        var result = equalArrays_default(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
        stack["delete"](object);
        return result;
      case symbolTag4:
        if (symbolValueOf2) {
          return symbolValueOf2.call(object) == symbolValueOf2.call(other);
        }
    }
    return false;
  }
  var equalByTag_default = equalByTag;

  // node_modules/lodash-es/_equalObjects.js
  init_define_import_meta_env();
  init_define_process_env();
  var COMPARE_PARTIAL_FLAG3 = 1;
  var objectProto15 = Object.prototype;
  var hasOwnProperty12 = objectProto15.hasOwnProperty;
  function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG3, objProps = getAllKeys_default(object), objLength = objProps.length, othProps = getAllKeys_default(other), othLength = othProps.length;
    if (objLength != othLength && !isPartial) {
      return false;
    }
    var index = objLength;
    while (index--) {
      var key = objProps[index];
      if (!(isPartial ? key in other : hasOwnProperty12.call(other, key))) {
        return false;
      }
    }
    var objStacked = stack.get(object);
    var othStacked = stack.get(other);
    if (objStacked && othStacked) {
      return objStacked == other && othStacked == object;
    }
    var result = true;
    stack.set(object, other);
    stack.set(other, object);
    var skipCtor = isPartial;
    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key], othValue = other[key];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
      }
      if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
        result = false;
        break;
      }
      skipCtor || (skipCtor = key == "constructor");
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor, othCtor = other.constructor;
      if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
        result = false;
      }
    }
    stack["delete"](object);
    stack["delete"](other);
    return result;
  }
  var equalObjects_default = equalObjects;

  // node_modules/lodash-es/_baseIsEqualDeep.js
  var COMPARE_PARTIAL_FLAG4 = 1;
  var argsTag4 = "[object Arguments]";
  var arrayTag3 = "[object Array]";
  var objectTag5 = "[object Object]";
  var objectProto16 = Object.prototype;
  var hasOwnProperty13 = objectProto16.hasOwnProperty;
  function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray_default(object), othIsArr = isArray_default(other), objTag = objIsArr ? arrayTag3 : getTag_default(object), othTag = othIsArr ? arrayTag3 : getTag_default(other);
    objTag = objTag == argsTag4 ? objectTag5 : objTag;
    othTag = othTag == argsTag4 ? objectTag5 : othTag;
    var objIsObj = objTag == objectTag5, othIsObj = othTag == objectTag5, isSameTag = objTag == othTag;
    if (isSameTag && isBuffer_default(object)) {
      if (!isBuffer_default(other)) {
        return false;
      }
      objIsArr = true;
      objIsObj = false;
    }
    if (isSameTag && !objIsObj) {
      stack || (stack = new Stack_default());
      return objIsArr || isTypedArray_default(object) ? equalArrays_default(object, other, bitmask, customizer, equalFunc, stack) : equalByTag_default(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG4)) {
      var objIsWrapped = objIsObj && hasOwnProperty13.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty13.call(other, "__wrapped__");
      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
        stack || (stack = new Stack_default());
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }
    if (!isSameTag) {
      return false;
    }
    stack || (stack = new Stack_default());
    return equalObjects_default(object, other, bitmask, customizer, equalFunc, stack);
  }
  var baseIsEqualDeep_default = baseIsEqualDeep;

  // node_modules/lodash-es/_baseIsEqual.js
  function baseIsEqual(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || !isObjectLike_default(value) && !isObjectLike_default(other)) {
      return value !== value && other !== other;
    }
    return baseIsEqualDeep_default(value, other, bitmask, customizer, baseIsEqual, stack);
  }
  var baseIsEqual_default = baseIsEqual;

  // node_modules/lodash-es/_baseIsMatch.js
  var COMPARE_PARTIAL_FLAG5 = 1;
  var COMPARE_UNORDERED_FLAG3 = 2;
  function baseIsMatch(object, source, matchData, customizer) {
    var index = matchData.length, length = index, noCustomizer = !customizer;
    if (object == null) {
      return !length;
    }
    object = Object(object);
    while (index--) {
      var data = matchData[index];
      if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
        return false;
      }
    }
    while (++index < length) {
      data = matchData[index];
      var key = data[0], objValue = object[key], srcValue = data[1];
      if (noCustomizer && data[2]) {
        if (objValue === void 0 && !(key in object)) {
          return false;
        }
      } else {
        var stack = new Stack_default();
        if (customizer) {
          var result = customizer(objValue, srcValue, key, object, source, stack);
        }
        if (!(result === void 0 ? baseIsEqual_default(srcValue, objValue, COMPARE_PARTIAL_FLAG5 | COMPARE_UNORDERED_FLAG3, customizer, stack) : result)) {
          return false;
        }
      }
    }
    return true;
  }
  var baseIsMatch_default = baseIsMatch;

  // node_modules/lodash-es/_getMatchData.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_isStrictComparable.js
  init_define_import_meta_env();
  init_define_process_env();
  function isStrictComparable(value) {
    return value === value && !isObject_default(value);
  }
  var isStrictComparable_default = isStrictComparable;

  // node_modules/lodash-es/_getMatchData.js
  function getMatchData(object) {
    var result = keys_default(object), length = result.length;
    while (length--) {
      var key = result[length], value = object[key];
      result[length] = [key, value, isStrictComparable_default(value)];
    }
    return result;
  }
  var getMatchData_default = getMatchData;

  // node_modules/lodash-es/_matchesStrictComparable.js
  init_define_import_meta_env();
  init_define_process_env();
  function matchesStrictComparable(key, srcValue) {
    return function(object) {
      if (object == null) {
        return false;
      }
      return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
    };
  }
  var matchesStrictComparable_default = matchesStrictComparable;

  // node_modules/lodash-es/_baseMatches.js
  function baseMatches(source) {
    var matchData = getMatchData_default(source);
    if (matchData.length == 1 && matchData[0][2]) {
      return matchesStrictComparable_default(matchData[0][0], matchData[0][1]);
    }
    return function(object) {
      return object === source || baseIsMatch_default(object, source, matchData);
    };
  }
  var baseMatches_default = baseMatches;

  // node_modules/lodash-es/_baseMatchesProperty.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/hasIn.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_baseHasIn.js
  init_define_import_meta_env();
  init_define_process_env();
  function baseHasIn(object, key) {
    return object != null && key in Object(object);
  }
  var baseHasIn_default = baseHasIn;

  // node_modules/lodash-es/_hasPath.js
  init_define_import_meta_env();
  init_define_process_env();
  function hasPath(object, path, hasFunc) {
    path = castPath_default(path, object);
    var index = -1, length = path.length, result = false;
    while (++index < length) {
      var key = toKey_default(path[index]);
      if (!(result = object != null && hasFunc(object, key))) {
        break;
      }
      object = object[key];
    }
    if (result || ++index != length) {
      return result;
    }
    length = object == null ? 0 : object.length;
    return !!length && isLength_default(length) && isIndex_default(key, length) && (isArray_default(object) || isArguments_default(object));
  }
  var hasPath_default = hasPath;

  // node_modules/lodash-es/hasIn.js
  function hasIn(object, path) {
    return object != null && hasPath_default(object, path, baseHasIn_default);
  }
  var hasIn_default = hasIn;

  // node_modules/lodash-es/_baseMatchesProperty.js
  var COMPARE_PARTIAL_FLAG6 = 1;
  var COMPARE_UNORDERED_FLAG4 = 2;
  function baseMatchesProperty(path, srcValue) {
    if (isKey_default(path) && isStrictComparable_default(srcValue)) {
      return matchesStrictComparable_default(toKey_default(path), srcValue);
    }
    return function(object) {
      var objValue = get_default(object, path);
      return objValue === void 0 && objValue === srcValue ? hasIn_default(object, path) : baseIsEqual_default(srcValue, objValue, COMPARE_PARTIAL_FLAG6 | COMPARE_UNORDERED_FLAG4);
    };
  }
  var baseMatchesProperty_default = baseMatchesProperty;

  // node_modules/lodash-es/property.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_baseProperty.js
  init_define_import_meta_env();
  init_define_process_env();
  function baseProperty(key) {
    return function(object) {
      return object == null ? void 0 : object[key];
    };
  }
  var baseProperty_default = baseProperty;

  // node_modules/lodash-es/_basePropertyDeep.js
  init_define_import_meta_env();
  init_define_process_env();
  function basePropertyDeep(path) {
    return function(object) {
      return baseGet_default(object, path);
    };
  }
  var basePropertyDeep_default = basePropertyDeep;

  // node_modules/lodash-es/property.js
  function property(path) {
    return isKey_default(path) ? baseProperty_default(toKey_default(path)) : basePropertyDeep_default(path);
  }
  var property_default = property;

  // node_modules/lodash-es/_baseIteratee.js
  function baseIteratee(value) {
    if (typeof value == "function") {
      return value;
    }
    if (value == null) {
      return identity_default;
    }
    if (typeof value == "object") {
      return isArray_default(value) ? baseMatchesProperty_default(value[0], value[1]) : baseMatches_default(value);
    }
    return property_default(value);
  }
  var baseIteratee_default = baseIteratee;

  // node_modules/lodash-es/debounce.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/now.js
  init_define_import_meta_env();
  init_define_process_env();
  var now = function() {
    return root_default.Date.now();
  };
  var now_default = now;

  // node_modules/lodash-es/debounce.js
  var FUNC_ERROR_TEXT2 = "Expected a function";
  var nativeMax2 = Math.max;
  var nativeMin = Math.min;
  function debounce(func, wait, options) {
    var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
    if (typeof func != "function") {
      throw new TypeError(FUNC_ERROR_TEXT2);
    }
    wait = toNumber_default(wait) || 0;
    if (isObject_default(options)) {
      leading = !!options.leading;
      maxing = "maxWait" in options;
      maxWait = maxing ? nativeMax2(toNumber_default(options.maxWait) || 0, wait) : maxWait;
      trailing = "trailing" in options ? !!options.trailing : trailing;
    }
    function invokeFunc(time) {
      var args = lastArgs, thisArg = lastThis;
      lastArgs = lastThis = void 0;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }
    function leadingEdge(time) {
      lastInvokeTime = time;
      timerId = setTimeout(timerExpired, wait);
      return leading ? invokeFunc(time) : result;
    }
    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
      return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
    }
    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
      return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    }
    function timerExpired() {
      var time = now_default();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      timerId = setTimeout(timerExpired, remainingWait(time));
    }
    function trailingEdge(time) {
      timerId = void 0;
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = void 0;
      return result;
    }
    function cancel() {
      if (timerId !== void 0) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = void 0;
    }
    function flush() {
      return timerId === void 0 ? result : trailingEdge(now_default());
    }
    function debounced() {
      var time = now_default(), isInvoking = shouldInvoke(time);
      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;
      if (isInvoking) {
        if (timerId === void 0) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          clearTimeout(timerId);
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === void 0) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }
  var debounce_default = debounce;

  // node_modules/lodash-es/last.js
  init_define_import_meta_env();
  init_define_process_env();
  function last(array) {
    var length = array == null ? 0 : array.length;
    return length ? array[length - 1] : void 0;
  }
  var last_default = last;

  // node_modules/lodash-es/_parent.js
  init_define_import_meta_env();
  init_define_process_env();
  function parent(object, path) {
    return path.length < 2 ? object : baseGet_default(object, baseSlice_default(path, 0, -1));
  }
  var parent_default = parent;

  // node_modules/lodash-es/omit.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_baseUnset.js
  init_define_import_meta_env();
  init_define_process_env();
  var objectProto17 = Object.prototype;
  var hasOwnProperty14 = objectProto17.hasOwnProperty;
  function baseUnset(object, path) {
    path = castPath_default(path, object);
    var index = -1, length = path.length;
    if (!length) {
      return true;
    }
    while (++index < length) {
      var key = toKey_default(path[index]);
      if (key === "__proto__" && !hasOwnProperty14.call(object, "__proto__")) {
        return false;
      }
      if ((key === "constructor" || key === "prototype") && index < length - 1) {
        return false;
      }
    }
    var obj = parent_default(object, path);
    return obj == null || delete obj[toKey_default(last_default(path))];
  }
  var baseUnset_default = baseUnset;

  // node_modules/lodash-es/_customOmitClone.js
  init_define_import_meta_env();
  init_define_process_env();
  function customOmitClone(value) {
    return isPlainObject_default(value) ? void 0 : value;
  }
  var customOmitClone_default = customOmitClone;

  // node_modules/lodash-es/omit.js
  var CLONE_DEEP_FLAG2 = 1;
  var CLONE_FLAT_FLAG2 = 2;
  var CLONE_SYMBOLS_FLAG2 = 4;
  var omit = flatRest_default(function(object, paths) {
    var result = {};
    if (object == null) {
      return result;
    }
    var isDeep = false;
    paths = arrayMap_default(paths, function(path) {
      path = castPath_default(path, object);
      isDeep || (isDeep = path.length > 1);
      return path;
    });
    copyObject_default(object, getAllKeysIn_default(object), result);
    if (isDeep) {
      result = baseClone_default(result, CLONE_DEEP_FLAG2 | CLONE_FLAT_FLAG2 | CLONE_SYMBOLS_FLAG2, customOmitClone_default);
    }
    var length = paths.length;
    while (length--) {
      baseUnset_default(result, paths[length]);
    }
    return result;
  });
  var omit_default = omit;

  // node_modules/lodash-es/pickBy.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_basePickBy.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_baseSet.js
  init_define_import_meta_env();
  init_define_process_env();
  function baseSet(object, path, value, customizer) {
    if (!isObject_default(object)) {
      return object;
    }
    path = castPath_default(path, object);
    var index = -1, length = path.length, lastIndex = length - 1, nested = object;
    while (nested != null && ++index < length) {
      var key = toKey_default(path[index]), newValue = value;
      if (key === "__proto__" || key === "constructor" || key === "prototype") {
        return object;
      }
      if (index != lastIndex) {
        var objValue = nested[key];
        newValue = customizer ? customizer(objValue, key, nested) : void 0;
        if (newValue === void 0) {
          newValue = isObject_default(objValue) ? objValue : isIndex_default(path[index + 1]) ? [] : {};
        }
      }
      assignValue_default(nested, key, newValue);
      nested = nested[key];
    }
    return object;
  }
  var baseSet_default = baseSet;

  // node_modules/lodash-es/_basePickBy.js
  function basePickBy(object, paths, predicate) {
    var index = -1, length = paths.length, result = {};
    while (++index < length) {
      var path = paths[index], value = baseGet_default(object, path);
      if (predicate(value, path)) {
        baseSet_default(result, castPath_default(path, object), value);
      }
    }
    return result;
  }
  var basePickBy_default = basePickBy;

  // node_modules/lodash-es/pickBy.js
  function pickBy(object, predicate) {
    if (object == null) {
      return {};
    }
    var props = arrayMap_default(getAllKeysIn_default(object), function(prop) {
      return [prop];
    });
    predicate = baseIteratee_default(predicate);
    return basePickBy_default(object, props, function(value, path) {
      return predicate(value, path[0]);
    });
  }
  var pickBy_default = pickBy;

  // src/community/helpers/hooks/use-breakpoint.ts
  var import_react2 = __toESM(require_react_shim());
  var breakpoints = ["xs", "sm", "md", "lg", "xl", "xxl"];
  var useBreakpoint = (defaultServerBreakpoint = "xs") => {
    const [breakpoint, setBreakpoint] = (0, import_react2.useState)(defaultServerBreakpoint);
    (0, import_react2.useLayoutEffect)(() => {
      const getBreakpoint = () => {
        if (window.matchMedia("(min-width: 1400px)").matches) {
          return "xxl";
        } else if (window.matchMedia("(min-width: 1200px)").matches) {
          return "xl";
        } else if (window.matchMedia("(min-width: 992px)").matches) {
          return "lg";
        } else if (window.matchMedia("(min-width: 768px)").matches) {
          return "md";
        } else if (window.matchMedia("(min-width: 576px)").matches) {
          return "sm";
        } else {
          return "xs";
        }
      };
      const resizeEvent = debounce_default(() => {
        setBreakpoint(getBreakpoint());
      }, 20);
      setBreakpoint(getBreakpoint());
      window.addEventListener("resize", resizeEvent);
      return () => {
        resizeEvent.cancel();
        window.removeEventListener("resize", resizeEvent);
      };
    }, []);
    return breakpoint;
  };
  var use_breakpoint_default = useBreakpoint;

  // src/community/helpers/hooks/use-breakpoint-props.ts
  init_define_import_meta_env();
  init_define_process_env();
  var import_react3 = __toESM(require_react_shim());
  var useBreakpointProps = (defaultServerBreakpoint = "xs") => {
    const currentBreakpoint = use_breakpoint_default(defaultServerBreakpoint);
    const activeBreakpoints = import_react3.default.useMemo(
      () => currentBreakpoint ? breakpoints.slice(0, breakpoints.indexOf(currentBreakpoint) + 1) : [],
      [currentBreakpoint]
    );
    const getCurrentBreakpointProps = import_react3.default.useCallback(
      (props, defaultValues = {}) => {
        const { sm, md, lg, xl, xxl, ...xs } = props;
        const propArray = [
          ...activeBreakpoints.map((bp) => pickBy_default(bp === "xs" ? xs : props[bp], (value) => value !== void 0))
          // filter out props that have undefined as value, so they don't override lower breakpoint values or default values
        ].filter(Boolean);
        return Object.assign(omit_default(defaultValues, "defaultServerBreakpoint"), ...propArray);
      },
      [activeBreakpoints]
    );
    return { getCurrentBreakpointProps };
  };

  // src/community/helpers/background-colors/background-colors.tsx
  init_define_import_meta_env();
  init_define_process_env();
  var import_background_colors_module = __toESM(require_background_colors_module());
  var getBackgroundColorClass = (type) => {
    if (type) {
      return import_background_colors_module.default[type];
    }
    return "";
  };

  // src/community/components/card/card.tsx
  init_define_import_meta_env();
  init_define_process_env();
  var import_classnames = __toESM(require_classnames());
  var import_react5 = __toESM(require_react_shim());
  var import_card_module = __toESM(require_card_module());

  // src/community/components/card/card-context.ts
  init_define_import_meta_env();
  init_define_process_env();
  var import_react4 = __toESM(require_react_shim());
  var CardContext = import_react4.default.createContext({});

  // src/community/components/card/utility.ts
  init_define_import_meta_env();
  init_define_process_env();
  var getCardBorderPlacementColor = (border) => {
    const borderColor = border?.replace(/(top-)|(left-)/s, "");
    const borderPlacement = border?.replace(new RegExp(`(${borderColor})|-`, "g"), "");
    return [borderPlacement, borderColor];
  };
  var getPaddingCssVariables = (padding) => {
    const isDirectionObject = (padding2) => {
      return typeof padding2 === "object" && "vertical" in padding2 && "horizontal" in padding2;
    };
    const topPadding = typeof padding === "number" ? padding : isDirectionObject(padding) ? padding.vertical : padding?.top;
    const rightPadding = typeof padding === "number" ? padding : isDirectionObject(padding) ? padding.horizontal : padding?.right;
    const bottomPadding = typeof padding === "number" ? padding : isDirectionObject(padding) ? padding.vertical : padding?.bottom;
    const leftPadding = typeof padding === "number" ? padding : isDirectionObject(padding) ? padding.horizontal : padding?.left;
    return {
      "--card-content-padding-top": `${topPadding}rem`,
      "--card-content-padding-right": `${rightPadding}rem`,
      "--card-content-padding-bottom": `${bottomPadding}rem`,
      "--card-content-padding-left": `${leftPadding}rem`
    };
  };

  // src/community/components/card/card.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var Card = (0, import_react5.forwardRef)((props, ref) => {
    const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
    const {
      children,
      className,
      padding,
      background = "bg-default",
      borderRadius,
      borderless,
      border = "border-default",
      ...rest
    } = getCurrentBreakpointProps(props, {
      padding: 1
    });
    const [borderPlacement, borderColor] = getCardBorderPlacementColor(border);
    const BEM = (0, import_classnames.default)(import_card_module.default["card"], className, {
      [import_card_module.default[`card--border-${borderPlacement}`]]: borderPlacement,
      [import_card_module.default["card--borderless"]]: borderless,
      [import_card_module.default["card--no-border-radius-top"]]: borderRadius === false || borderRadius?.top === false,
      [import_card_module.default["card--no-border-radius-right"]]: borderRadius === false || borderRadius?.right === false,
      [import_card_module.default["card--no-border-radius-bottom"]]: borderRadius === false || borderRadius?.bottom === false,
      [import_card_module.default["card--no-border-radius-left"]]: borderRadius === false || borderRadius?.left === false
    });
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContext.Provider, { value: { padding, background }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-name": "card",
        ...rest,
        className: BEM,
        ref,
        style: borderColor ? { "--card-border-color": `var(--color-${borderColor})` } : void 0,
        children
      }
    ) });
  });
  Card.displayName = "Card";

  // src/community/components/card/card-content/card-content.tsx
  init_define_import_meta_env();
  init_define_process_env();
  var import_classnames2 = __toESM(require_classnames());
  var import_react6 = __toESM(require_react_shim());
  var import_card_module2 = __toESM(require_card_module());
  var import_jsx_runtime2 = __toESM(require_react_shim());
  var CardContent = (props) => {
    const { padding: rootPadding, background: rootBackground } = import_react6.default.useContext(CardContext);
    const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
    const { children, className, padding, background, ...rest } = getCurrentBreakpointProps(props, {
      padding: rootPadding,
      background: rootBackground
    });
    const CardContentBEM = (0, import_classnames2.default)(import_card_module2.default["card__content"], { [getBackgroundColorClass(background)]: background }, className);
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "div",
      {
        "data-name": "card-content",
        "data-padding": typeof padding === "number" ? `${padding}rem` : void 0,
        style: getPaddingCssVariables(padding),
        ...rest,
        className: CardContentBEM,
        children
      }
    );
  };
  CardContent.displayName = "CardContent";

  // src/community/components/tabs/tabs-item/tabs-item.tsx
  var import_jsx_runtime3 = __toESM(require_react_shim());
  var TabsItem = (props) => {
    const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
    const { className, padding, background, id, children } = getCurrentBreakpointProps(props, {
      padding: { top: 1.5, right: 2, bottom: 2, left: 2 },
      background: "white"
    });
    const { currentTab } = import_react7.default.useContext(TabsContext);
    const isCurrent = id === currentTab;
    if (!isCurrent) {
      return null;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "div",
      {
        "data-name": "tabs-item",
        className,
        id: `${id}-panel`,
        tabIndex: 0,
        role: "tabpanel",
        "aria-labelledby": id,
        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Card, { padding, background, borderRadius: { top: false, right: false }, borderless: true, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(CardContent, { children }) })
      }
    );
  };
  var tabs_item_default = TabsItem;

  // src/community/components/tabs/tabs-nav/tabs-nav.tsx
  init_define_import_meta_env();
  init_define_process_env();
  var import_classnames6 = __toESM(require_classnames());
  var import_tabs_nav_module2 = __toESM(require_tabs_nav_module());

  // src/community/components/tabs/tabs-nav/tabs-nav-item.tsx
  init_define_import_meta_env();
  init_define_process_env();
  var import_classnames5 = __toESM(require_classnames());
  var import_react10 = __toESM(require_react_shim());

  // ds-shim:ds:HashTrigger
  var ds_HashTrigger_exports = {};
  __export(ds_HashTrigger_exports, {
    default: () => ds_HashTrigger_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_HashTrigger_exports, __toESM(require_ds_raw()));
  var g3 = window.Tedi;
  var ds_HashTrigger_default = g3["HashTrigger"] !== void 0 ? g3["HashTrigger"] : g3;

  // src/community/components/anchor/anchor.tsx
  init_define_import_meta_env();
  init_define_process_env();
  var import_classnames4 = __toESM(require_classnames());
  var import_react9 = __toESM(require_react_shim());

  // ds-shim:ds:LabelProvider
  var ds_LabelProvider_exports = {};
  __export(ds_LabelProvider_exports, {
    default: () => ds_LabelProvider_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_LabelProvider_exports, __toESM(require_ds_raw()));
  var g4 = window.Tedi;
  var ds_LabelProvider_default = g4["LabelProvider"] !== void 0 ? g4["LabelProvider"] : g4;

  // src/community/components/button-content/button-content.tsx
  init_define_import_meta_env();
  init_define_process_env();
  var import_classnames3 = __toESM(require_classnames());
  var import_react8 = __toESM(require_react_shim());

  // ds-shim:ds:Icon
  var ds_Icon_exports = {};
  __export(ds_Icon_exports, {
    default: () => ds_Icon_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Icon_exports, __toESM(require_ds_raw()));
  var g5 = window.Tedi;
  var ds_Icon_default = g5["Icon"] !== void 0 ? g5["Icon"] : g5;

  // ds-shim:ds:Spinner
  var ds_Spinner_exports = {};
  __export(ds_Spinner_exports, {
    default: () => ds_Spinner_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Spinner_exports, __toESM(require_ds_raw()));
  var g6 = window.Tedi;
  var ds_Spinner_default = g6["Spinner"] !== void 0 ? g6["Spinner"] : g6;

  // src/community/components/button-content/button-content.tsx
  var import_button_content_module = __toESM(require_button_content_module());
  var import_jsx_runtime4 = __toESM(require_react_shim());
  var InternalButtonContent = (0, import_react8.forwardRef)(
    ({
      children,
      as,
      text,
      className,
      visualType = "primary",
      color = "default",
      size,
      icon,
      iconLeft,
      iconRight,
      underline = false,
      isHovered,
      isActive,
      isLoading = false,
      noStyle,
      renderWrapperElement,
      fullWidth,
      onClick,
      ...rest
    }, ref) => {
      const Component = as || "button";
      const hasIcon = icon || iconLeft || iconRight;
      const BEM = !noStyle ? (0, import_classnames3.default)(
        import_button_content_module.default["btn"],
        import_button_content_module.default[`btn--${visualType}`],
        import_button_content_module.default[`btn--${color}`],
        className,
        { [import_button_content_module.default[`btn--${size}`]]: size },
        { [import_button_content_module.default["btn--underline"]]: underline },
        { [import_button_content_module.default["btn--is-hovered"]]: isHovered },
        { [import_button_content_module.default["btn--is-active"]]: isActive },
        { [import_button_content_module.default["btn--is-loading"]]: isLoading },
        { [import_button_content_module.default["btn--icon-only"]]: icon },
        { [import_button_content_module.default["btn--icon"]]: hasIcon },
        { [import_button_content_module.default["btn--full-width"]]: fullWidth }
      ) : (0, import_classnames3.default)(import_button_content_module.default["btn--no-style"], className, { [import_button_content_module.default["btn--full-width"]]: fullWidth });
      const getIcon = (location, icon2) => {
        const iconBEM = (0, import_classnames3.default)(import_button_content_module.default["btn__icon"], import_button_content_module.default[`btn__icon--${location}`], {
          [import_button_content_module.default["btn__spinner"]]: isLoading
        });
        const defaultIconProps = { size: 16, className: iconBEM };
        const iconProps = typeof icon2 === "string" ? { ...defaultIconProps, name: icon2, color: "inherit" } : {
          ...defaultIconProps,
          ...icon2,
          color: "inherit",
          background: void 0,
          className: (0, import_classnames3.default)(defaultIconProps.className, icon2?.className)
        };
        return isLoading ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Spinner_exports.Spinner, { className: iconProps.className }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Icon_exports.Icon, { ...iconProps });
      };
      const renderContent = () => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: import_button_content_module.default["btn__inner"], children: [
        icon && getIcon("centre", icon),
        iconLeft && getIcon("left", iconLeft),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: import_button_content_module.default["btn__text"], children }),
        isLoading && !hasIcon && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Spinner_exports.Spinner, { position: "absolute", className: import_button_content_module.default["btn__spinner"] }),
        iconRight && getIcon("right", iconRight)
      ] });
      const onClickHandler = (event) => {
        if (onClick && !isLoading) onClick(event);
      };
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Print_default, { visibility: "hide", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        Component,
        {
          "data-name": "button-content",
          ...rest,
          "aria-disabled": isLoading || rest["aria-disabled"],
          onClick: onClickHandler,
          ref,
          className: BEM,
          children: !noStyle ? renderContent() : children
        }
      ) });
    }
  );
  InternalButtonContent.displayName = "ButtonContent";
  var ButtonContent = InternalButtonContent;
  var button_content_default = ButtonContent;

  // src/community/components/anchor/anchor.tsx
  var import_button_content_module2 = __toESM(require_button_content_module());
  var import_jsx_runtime5 = __toESM(require_react_shim());
  var InternalAnchor = (0, import_react9.forwardRef)(
    (props, ref) => {
      const { getLabel } = (0, ds_LabelProvider_exports.useLabels)();
      const { visualType = "link", as, iconStandalone = false, children, ...rest } = props;
      const ComponentAs = as || "a";
      return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
        button_content_default,
        {
          "data-name": "anchor",
          ...rest,
          ref,
          as: ComponentAs,
          visualType,
          className: (0, import_classnames4.default)(rest.className, { [import_button_content_module2.default["btn__icon-standalone--link"]]: iconStandalone }),
          children: [
            children,
            rest.target === "_blank" && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "sr-only", children: [
              "(",
              getLabel("anchor.new-tab"),
              ")"
            ] })
          ]
        }
      );
    }
  );
  InternalAnchor.displayName = "Anchor";
  var Anchor = InternalAnchor;
  var anchor_default = Anchor;

  // src/community/components/tabs/tabs-nav/tabs-nav-item.tsx
  var import_tabs_nav_module = __toESM(require_tabs_nav_module());
  var import_jsx_runtime6 = __toESM(require_react_shim());
  var TabsNavItem = (props) => {
    const { isActive, children, id, ...rest } = props;
    const TabsNavItemBEM = (0, import_classnames5.default)(import_tabs_nav_module.default["tabs__nav-item"], { [import_tabs_nav_module.default["tabs__nav-item--current"]]: isActive });
    const { setCurrentTab } = import_react10.default.useContext(TabsContext);
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("li", { "data-name": "tabs-nav-item", className: TabsNavItemBEM, role: "presentation", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ds_HashTrigger_exports.HashTrigger, { id, onMatch: (id2) => setCurrentTab(id2), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ds_Print_default, { visibility: "show", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(anchor_default, { ...rest, id, className: (0, import_classnames5.default)(import_tabs_nav_module.default["tabs__nav-link"]), children }) }) }) });
  };
  var tabs_nav_item_default = TabsNavItem;

  // src/community/components/tabs/tabs-nav/tabs-nav.tsx
  var import_jsx_runtime7 = __toESM(require_react_shim());
  var import_react11 = __toESM(require_react_shim());
  var TabsNav = (props) => {
    const { items, className, "aria-labelledby": ariaLabelledBy } = props;
    const BEM = (0, import_classnames6.default)(import_tabs_nav_module2.default["tabs__nav"], className);
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("ul", { "data-name": "tabs-nav", className: BEM, role: "tablist", "aria-labelledby": ariaLabelledBy, children: items.map((item, index) => /* @__PURE__ */ (0, import_react11.createElement)(tabs_nav_item_default, { ...item, key: index })) });
  };
  var tabs_nav_default = TabsNav;

  // src/community/components/tabs/tabs/tabs.tsx
  var import_tabs_module = __toESM(require_tabs_module());
  var import_jsx_runtime8 = __toESM(require_react_shim());
  var Tabs = (props) => {
    const isPrinting = (0, ds_PrintingProvider_exports.usePrint)();
    const { defaultCurrentTab, onTabChange, className, children, hideNavOnPrint = "show" } = props;
    const [innerCurrentTab, setInnerCurrentTab] = import_react12.default.useState(defaultCurrentTab || "");
    const isCurrentTabControlled = (tab = props.currentTab) => {
      return !!props.onTabChange && typeof tab !== "undefined";
    };
    const currentTab = isCurrentTabControlled(props.currentTab) ? props.currentTab : innerCurrentTab;
    const setCurrentTab = (id) => {
      if (currentTab !== id) {
        if (!isCurrentTabControlled()) {
          setInnerCurrentTab(id);
        }
        onTabChange?.(id);
      }
    };
    const navItems = import_react12.default.Children.toArray(props.children).filter((child) => {
      return import_react12.default.isValidElement(child) && child.type === tabs_item_default;
    }).map((item) => item.props);
    const handleNavItemKeyDown = (e) => {
      const activeItemIndex = navItems.findIndex((item) => item.id === e.currentTarget?.id);
      const currentIndex = activeItemIndex !== -1 ? activeItemIndex : 0;
      let newIndex = -1;
      switch (e.key) {
        case " ":
          e.preventDefault();
          setCurrentTab(e.currentTarget?.id);
          break;
        case "ArrowLeft":
          if (currentIndex === 0) {
            newIndex = navItems.length - 1;
          } else {
            newIndex = currentIndex - 1;
          }
          break;
        case "ArrowRight":
          if (currentIndex === navItems.length - 1) {
            newIndex = 0;
          } else {
            newIndex = currentIndex + 1;
          }
          break;
        case "Home":
          newIndex = 0;
          break;
        case "End":
          newIndex = navItems.length - 1;
          break;
      }
      if (newIndex !== -1) {
        e.preventDefault();
        document.getElementById(navItems[newIndex].id)?.focus();
      }
    };
    const navItemAnchors = navItems.map((item, index) => {
      const { children: children2, label, id, ...rest } = item;
      return {
        ...rest,
        id,
        isActive: currentTab === id,
        onClick: (event) => {
          event.preventDefault();
          setCurrentTab(id);
        },
        onKeyDown: handleNavItemKeyDown,
        children: label,
        href: `#${id}`,
        role: "tab",
        tabIndex: !currentTab && index === 0 || currentTab === id ? void 0 : -1,
        "aria-controls": `${id}-panel`,
        "aria-label": label,
        "aria-selected": currentTab === id
      };
    });
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      TabsContext.Provider,
      {
        value: {
          currentTab,
          setCurrentTab
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
          "div",
          {
            "data-name": "tabs",
            className: isPrinting && hideNavOnPrint === "hide" ? className : (0, import_classnames7.default)(import_tabs_module.default["tabs"], className),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(ds_Print_default, { visibility: hideNavOnPrint, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(tabs_nav_default, { items: navItemAnchors, "aria-labelledby": props["aria-labelledby"] }) }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: import_tabs_module.default["tabs__content"], children })
            ]
          }
        )
      }
    );
  };

  // ds-shim:ds:Heading
  var ds_Heading_exports = {};
  __export(ds_Heading_exports, {
    default: () => ds_Heading_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Heading_exports, __toESM(require_ds_raw()));
  var g7 = window.Tedi;
  var ds_Heading_default = g7["Heading"] !== void 0 ? g7["Heading"] : g7;

  // src/tedi/components/layout/grid/index.ts
  var grid_exports = {};
  init_define_import_meta_env();
  init_define_process_env();

  // ds-shim:ds:Row
  var ds_Row_exports = {};
  __export(ds_Row_exports, {
    default: () => ds_Row_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Row_exports, __toESM(require_ds_raw()));
  var g8 = window.Tedi;
  var ds_Row_default = g8["Row"] !== void 0 ? g8["Row"] : g8;

  // src/tedi/components/layout/grid/index.ts
  __reExport(grid_exports, ds_Row_exports);

  // ds-shim:ds:Col
  var ds_Col_exports = {};
  __export(ds_Col_exports, {
    default: () => ds_Col_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Col_exports, __toESM(require_ds_raw()));
  var g9 = window.Tedi;
  var ds_Col_default = g9["Col"] !== void 0 ? g9["Col"] : g9;

  // src/tedi/components/layout/grid/index.ts
  __reExport(grid_exports, ds_Col_exports);

  // ds-shim:ds:VerticalSpacing
  var ds_VerticalSpacing_exports = {};
  __export(ds_VerticalSpacing_exports, {
    default: () => ds_VerticalSpacing_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_VerticalSpacing_exports, __toESM(require_ds_raw()));
  var g10 = window.Tedi;
  var ds_VerticalSpacing_default = g10["VerticalSpacing"] !== void 0 ? g10["VerticalSpacing"] : g10;

  // ds-shim:ds:Link
  var ds_Link_exports = {};
  __export(ds_Link_exports, {
    default: () => ds_Link_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Link_exports, __toESM(require_ds_raw()));
  var g11 = window.Tedi;
  var ds_Link_default = g11["Link"] !== void 0 ? g11["Link"] : g11;

  // src/tedi/components/navigation/hash-trigger/hash-trigger.stories.tsx
  var import_jsx_runtime9 = __toESM(require_react_shim());
  var meta = {
    component: ds_HashTrigger_exports.HashTrigger,
    title: "TEDI-Ready/Components/Helpers/HashTrigger",
    parameters: {
      status: {
        type: ["devComponent"]
      }
    }
  };
  var hash_trigger_stories_default = meta;
  var Template = (args) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_jsx_runtime9.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(grid_exports.Row, { gutter: 5, children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(grid_exports.Col, { width: 12, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(ds_Link_default, { href: `#${args.id}`, children: [
      "Click here to add #",
      args.id,
      " hash"
    ] }) }),
    Array.from(Array(7).keys()).map((i) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(grid_exports.Col, { width: 12, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at gravida mi, id convallis augue. Donec hendrerit sit amet quam a vehicula. Vestibulum ligula turpis, tempor non lacus et, vestibulum congue massa. Maecenas a sollicitudin dui. Mauris dictum fringilla nibh, sit amet egestas lectus feugiat id. Cras ac felis porttitor, blandit lorem id, gravida felis. Vivamus in tortor vitae neque viverra sodales. Phasellus suscipit, leo et aliquam aliquet, arcu justo pulvinar neque, sit amet vehicula sapien arcu eget lorem. Sed in sem velit. Nam scelerisque massa vitae ullamcorper congue. Nam accumsan tellus sit amet commodo tempor. Maecenas dapibus sagittis purus quis luctus. Duis sodales imperdiet ex, et congue lectus pulvinar in. Morbi urna ante, mattis eu turpis et, sagittis efficitur felis." }) }, i)),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(grid_exports.Col, { width: 12, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(ds_HashTrigger_exports.HashTrigger, { id: args.id, children: [
      "Should scroll here with #",
      args.id
    ] }) })
  ] }) });
  var Default = {
    render: Template,
    args: {
      id: "test-1",
      scrollOnMatch: true
    }
  };
  var TabsTemplate = () => /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 2, children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ds_Heading_exports.Heading, { id: "tabs-heading", className: "visually-hidden", children: "Tabs title" }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ds_Link_default, { href: "#tab-1", children: "Tab 1" }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ds_Link_default, { href: "#tab-2", children: "Tab 2" }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("br", {}),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ds_Link_default, { href: "#tab-3", children: "Tab 3" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1, children: Array.from(Array(7).keys()).map((i) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at gravida mi, id convallis augue. Donec hendrerit sit amet quam a vehicula. Vestibulum ligula turpis, tempor non lacus et, vestibulum congue massa. Maecenas a sollicitudin dui. Mauris dictum fringilla nibh, sit amet egestas lectus feugiat id. Cras ac felis porttitor, blandit lorem id, gravida felis. Vivamus in tortor vitae neque viverra sodales. Phasellus suscipit, leo et aliquam aliquet, arcu justo pulvinar neque, sit amet vehicula sapien arcu eget lorem. Sed in sem velit. Nam scelerisque massa vitae ullamcorper congue. Nam accumsan tellus sit amet commodo tempor. Maecenas dapibus sagittis purus quis luctus. Duis sodales imperdiet ex, et congue lectus pulvinar in. Morbi urna ante, mattis eu turpis et, sagittis efficitur felis." }, i)) }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(Tabs, { defaultCurrentTab: "tab-1", "aria-labelledby": "tabs-heading", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(TabsItem, { id: "tab-1", label: "Tab 1", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ds_Heading_exports.Heading, { element: "h2", children: "Tab 1" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: "Content 1" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(TabsItem, { id: "tab-2", label: "Tab 2", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ds_Heading_exports.Heading, { element: "h2", children: "Tab 2" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: "Content 2" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: "Content 2" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: "Content 2" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: "Content 2" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: "Content 2" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(TabsItem, { id: "tab-3", label: "Tab 3", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ds_Heading_exports.Heading, { element: "h2", children: "Tab 3" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: "Content 3" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: "Content 3" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: "Content 3" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: "Content 3" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: "Content 3" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: "Content 3" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: "Content 3" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: "Content 3" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: "Content 3" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { children: "Content 3" })
      ] }) })
    ] })
  ] });
  var TabsWithHashTrigger = {
    render: TabsTemplate,
    args: {
      id: "tab",
      scrollOnMatch: true
    }
  };

  // .design-sync/.cache/previews/HashTrigger.tsx
  function compose(S, key) {
    const meta2 = S.default ?? {};
    const st = S[key];
    const args = { ...meta2.args ?? {}, ...st && st.args ? st.args : {} };
    const at = { ...meta2.argTypes ?? {}, ...st && st.argTypes ? st.argTypes : {} };
    for (const k of Object.keys(args)) {
      const m = at[k] && at[k].mapping;
      if (m && typeof m === "object" && args[k] in m) args[k] = m[args[k]];
    }
    const title = typeof meta2.title === "string" ? meta2.title : "";
    const ctx = {
      args,
      name: key,
      title,
      kind: title,
      id: "",
      componentId: "",
      globals: { ...GLOBAL_DEFAULTS, ...meta2.globals ?? {}, ...(st && st.globals) ?? {} },
      viewMode: "story",
      parameters: (st && st.parameters) ?? meta2.parameters ?? {}
    };
    let render = null;
    if (st && typeof st.render === "function") render = () => st.render(args, ctx);
    else if (typeof st === "function") render = () => st(args, ctx);
    else if (typeof meta2.render === "function") render = () => meta2.render(args, ctx);
    else {
      const C = st && st.component || meta2.component;
      if (C) render = () => React11.createElement(C, args);
    }
    if (!render) return () => null;
    const decorators = [].concat((st && st.decorators) ?? []).concat(meta2.decorators ?? []);
    const composed = decorators.reduce((inner, dec) => () => {
      const out = dec(inner, ctx);
      return out === void 0 ? inner() : out;
    }, render);
    const bgName = ctx.globals.backgrounds && ctx.globals.backgrounds.value;
    const bg = bgName ? BACKGROUNDS[bgName] : void 0;
    if (!bg) return composed;
    return () => React11.createElement("div", { style: { background: bg } }, composed());
  }
  var GLOBAL_DEFAULTS = { theme: "default" };
  var BACKGROUNDS = {
    default: "var(--color-bg-default)",
    muted: "var(--color-bg-muted)",
    subtle: "var(--color-bg-subtle)",
    disabled: "var(--color-bg-disabled)",
    black: "var(--color-black)",
    inverted: "var(--color-bg-inverted)",
    "inverted-contrast": "var(--color-bg-inverted-contrast)",
    brand: "var(--tedi-primary-600)"
  };
  var Default2 = (
    /* Default */
    compose(hash_trigger_stories_exports, "Default")
  );
  var TabsWithHashTrigger2 = (
    /* Tabs With Hash Trigger */
    compose(hash_trigger_stories_exports, "TabsWithHashTrigger")
  );
  return __toCommonJS(HashTrigger_exports);
})();
/*! Bundled license information:

classnames/index.js:
  (*!
  	Copyright (c) 2018 Jed Watson.
  	Licensed under the MIT License (MIT), see
  	http://jedwatson.github.io/classnames
  *)

lodash-es/lodash.js:
  (**
   * @license
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="es" --repo lodash/lodash#4.18.1 -o ./`
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
