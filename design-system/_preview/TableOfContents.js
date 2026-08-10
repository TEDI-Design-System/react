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
    "shim:react-shim"(exports, module) {
      init_define_import_meta_env();
      init_define_process_env();
      var R = window.React;
      function np(p, k) {
        var o = {};
        for (var x in p) if (x !== "children") o[x] = p[x];
        if (k !== void 0) o.key = k;
        return o;
      }
      function jsx2(t, p, k) {
        var c = p && p.children;
        return c === void 0 ? R.createElement(t, np(p, k)) : R.createElement(t, np(p, k), c);
      }
      function jsxs2(t, p, k) {
        return R.createElement.apply(R, [t, np(p, k)].concat(p.children));
      }
      module.exports = R;
      module.exports.jsx = jsx2;
      module.exports.jsxs = jsxs2;
      module.exports.jsxDEV = function(t, p, k, s) {
        return (s ? jsxs2 : jsx2)(t, p, k);
      };
      module.exports.Fragment = R.Fragment;
    }
  });

  // ds-raw:__ds_raw__
  var require_ds_raw = __commonJS({
    "ds-raw:__ds_raw__"(exports, module) {
      init_define_import_meta_env();
      init_define_process_env();
      module.exports = window.Tedi;
    }
  });

  // .design-sync/.cache/previews/TableOfContents.tsx
  var TableOfContents_exports = {};
  __export(TableOfContents_exports, {
    Collapsible: () => Collapsible2,
    Default: () => Default2,
    Headless: () => Headless2,
    ItemStates: () => ItemStates2,
    Nested: () => Nested2,
    Numbered: () => Numbered2,
    StickyInLayout: () => StickyInLayout3,
    Transparent: () => Transparent2,
    WithIcon: () => WithIcon2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/navigation/table-of-contents/table-of-contents.stories.tsx
  var table_of_contents_stories_exports = {};
  __export(table_of_contents_stories_exports, {
    Collapsible: () => Collapsible,
    Default: () => Default,
    Headless: () => Headless,
    ItemStates: () => ItemStates,
    Nested: () => Nested,
    Numbered: () => Numbered,
    StickyInLayout: () => StickyInLayout,
    Transparent: () => Transparent,
    WithIcon: () => WithIcon,
    default: () => table_of_contents_stories_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  var import_react2 = __toESM(require_react_shim());

  // src/tedi/helpers/hooks/use-breakpoint.ts
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
  var FUNC_ERROR_TEXT = "Expected a function";
  var nativeMax = Math.max;
  var nativeMin = Math.min;
  function debounce(func, wait, options) {
    var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
    if (typeof func != "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    wait = toNumber_default(wait) || 0;
    if (isObject_default(options)) {
      leading = !!options.leading;
      maxing = "maxWait" in options;
      maxWait = maxing ? nativeMax(toNumber_default(options.maxWait) || 0, wait) : maxWait;
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

  // src/tedi/helpers/hooks/use-breakpoint.ts
  var import_react = __toESM(require_react_shim());
  var breakpoints = ["xs", "sm", "md", "lg", "xl", "xxl"];
  var BREAKPOINT_WIDTHS = {
    xs: "0",
    sm: "36rem",
    md: "48rem",
    lg: "62rem",
    xl: "75rem",
    xxl: "87.5rem"
  };
  var useBreakpoint = (defaultServerBreakpoint = "xs") => {
    const [breakpoint, setBreakpoint] = (0, import_react.useState)(defaultServerBreakpoint);
    (0, import_react.useLayoutEffect)(() => {
      const getBreakpoint = () => {
        if (window.matchMedia(`(min-width: ${BREAKPOINT_WIDTHS.xxl})`).matches) {
          return "xxl";
        } else if (window.matchMedia(`(min-width: ${BREAKPOINT_WIDTHS.xl})`).matches) {
          return "xl";
        } else if (window.matchMedia(`(min-width: ${BREAKPOINT_WIDTHS.lg})`).matches) {
          return "lg";
        } else if (window.matchMedia(`(min-width: ${BREAKPOINT_WIDTHS.md})`).matches) {
          return "md";
        } else if (window.matchMedia(`(min-width: ${BREAKPOINT_WIDTHS.sm})`).matches) {
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
  var isBreakpointBelow = (current, target) => {
    if (!current) return false;
    return breakpoints.indexOf(current) < breakpoints.indexOf(target);
  };

  // ds-shim:ds:Heading
  var ds_Heading_exports = {};
  __export(ds_Heading_exports, {
    default: () => ds_Heading_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Heading_exports, __toESM(require_ds_raw()));
  var g = window.Tedi;
  var ds_Heading_default = g["Heading"] !== void 0 ? g["Heading"] : g;

  // ds-shim:ds:Text
  var ds_Text_exports = {};
  __export(ds_Text_exports, {
    default: () => ds_Text_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Text_exports, __toESM(require_ds_raw()));
  var g2 = window.Tedi;
  var ds_Text_default = g2["Text"] !== void 0 ? g2["Text"] : g2;

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
  var g3 = window.Tedi;
  var ds_Row_default = g3["Row"] !== void 0 ? g3["Row"] : g3;

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
  var g4 = window.Tedi;
  var ds_Col_default = g4["Col"] !== void 0 ? g4["Col"] : g4;

  // src/tedi/components/layout/grid/index.ts
  __reExport(grid_exports, ds_Col_exports);

  // ds-shim:ds:HideAt
  var ds_HideAt_exports = {};
  __export(ds_HideAt_exports, {
    default: () => ds_HideAt_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_HideAt_exports, __toESM(require_ds_raw()));
  var g5 = window.Tedi;
  var ds_HideAt_default = g5["HideAt"] !== void 0 ? g5["HideAt"] : g5;

  // ds-shim:ds:ShowAt
  var ds_ShowAt_exports = {};
  __export(ds_ShowAt_exports, {
    default: () => ds_ShowAt_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_ShowAt_exports, __toESM(require_ds_raw()));
  var g6 = window.Tedi;
  var ds_ShowAt_default = g6["ShowAt"] !== void 0 ? g6["ShowAt"] : g6;

  // ds-shim:ds:VerticalSpacing
  var ds_VerticalSpacing_exports = {};
  __export(ds_VerticalSpacing_exports, {
    default: () => ds_VerticalSpacing_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_VerticalSpacing_exports, __toESM(require_ds_raw()));
  var g7 = window.Tedi;
  var ds_VerticalSpacing_default = g7["VerticalSpacing"] !== void 0 ? g7["VerticalSpacing"] : g7;

  // ds-shim:ds:Link
  var ds_Link_exports = {};
  __export(ds_Link_exports, {
    default: () => ds_Link_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Link_exports, __toESM(require_ds_raw()));
  var g8 = window.Tedi;
  var ds_Link_default = g8["Link"] !== void 0 ? g8["Link"] : g8;

  // ds-shim:ds:TableOfContents
  var ds_TableOfContents_exports = {};
  __export(ds_TableOfContents_exports, {
    default: () => ds_TableOfContents_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_TableOfContents_exports, __toESM(require_ds_raw()));
  var g9 = window.Tedi;
  var ds_TableOfContents_default = g9["TableOfContents"] !== void 0 ? g9["TableOfContents"] : g9;

  // src/tedi/components/navigation/table-of-contents/table-of-contents.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    component: ds_TableOfContents_exports.TableOfContents,
    subcomponents: {
      "TableOfContents.Item": ds_TableOfContents_exports.TableOfContents.Item,
      "TableOfContents.Collapsible": ds_TableOfContents_exports.TableOfContents.Collapsible
    },
    title: "TEDI-Ready/Components/Navigation/TableOfContents",
    parameters: {
      layout: "padded",
      design: {
        type: "figma",
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.60.78?node-id=8469-72329&m=dev"
      }
    },
    decorators: [
      (Story, context) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { maxWidth: context.parameters.fullWidth ? void 0 : 320 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {}) })
    ]
  };
  var table_of_contents_stories_default = meta;
  var sections = ["Sissejuhatus", "Taust", "Meetodid", "Tulemused", "Arutelu", "Kokkuvõte"];
  var sectionItems = () => sections.map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TableOfContents_exports.TableOfContents.Item, { id: `section-${index + 1}`, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: `#section-${index + 1}`, underline: false, children: label }) }, label));
  var Default = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TableOfContents_exports.TableOfContents, { heading: "Sisukord", sticky: false, activeId: "section-3", children: sectionItems() })
  };
  var Transparent = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TableOfContents_exports.TableOfContents, { heading: "Sisukord", variant: "transparent", sticky: false, activeId: "section-3", children: sectionItems() })
  };
  var Headless = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TableOfContents_exports.TableOfContents, { heading: null, sticky: false, numbered: true, activeId: "section-3", children: sectionItems() })
  };
  var WithIcon = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_TableOfContents_exports.TableOfContents, { heading: "Sisukord", sticky: false, activeId: "section-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TableOfContents_exports.TableOfContents.Item, { id: "section-1", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#section-1", underline: false, children: "Sissejuhatus" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TableOfContents_exports.TableOfContents.Item, { id: "section-2", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#section-2", underline: false, children: "Taust" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TableOfContents_exports.TableOfContents.Item, { id: "section-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#section-3", underline: false, children: "Meetodid" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TableOfContents_exports.TableOfContents.Item, { id: "section-6", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#section-6", underline: false, iconLeft: "description", children: "Kokkuvõte" }) })
    ] })
  };
  var Nested = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_TableOfContents_exports.TableOfContents, { heading: "Sisukord", sticky: false, activeId: "methods-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TableOfContents_exports.TableOfContents.Item, { id: "intro", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#intro", underline: false, children: "Sissejuhatus" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_TableOfContents_exports.TableOfContents.Item, { id: "methods", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#methods", underline: false, children: "Meetodid" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TableOfContents_exports.TableOfContents.Item, { id: "methods-1", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#methods-1", underline: false, children: "Andmete kogumine" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TableOfContents_exports.TableOfContents.Item, { id: "methods-2", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#methods-2", underline: false, children: "Analüüs" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_TableOfContents_exports.TableOfContents.Item, { id: "results", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#results", underline: false, children: "Tulemused" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TableOfContents_exports.TableOfContents.Item, { id: "results-1", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#results-1", underline: false, children: "Joonised" }) })
      ] })
    ] })
  };
  var Numbered = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_TableOfContents_exports.TableOfContents, { heading: "Sisukord", sticky: false, numbered: true, activeId: "methods", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TableOfContents_exports.TableOfContents.Item, { id: "intro", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#intro", underline: false, children: "Sissejuhatus" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_TableOfContents_exports.TableOfContents.Item, { id: "methods", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#methods", underline: false, children: "Meetodid" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TableOfContents_exports.TableOfContents.Item, { id: "methods-1", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#methods-1", underline: false, children: "Andmete kogumine" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TableOfContents_exports.TableOfContents.Item, { id: "methods-2", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#methods-2", underline: false, children: "Analüüs" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TableOfContents_exports.TableOfContents.Item, { id: "results", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#results", underline: false, children: "Tulemused" }) })
    ] })
  };
  var ItemStates = {
    parameters: { fullWidth: true },
    render: () => {
      const states = [
        { label: "Default", linkProps: {}, active: false },
        { label: "Hover", linkProps: { isHovered: true }, active: false },
        { label: "Selected", linkProps: {}, active: true }
      ];
      const rowStyle = (active) => ({
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--layout-grid-gutters-04)",
        borderLeft: `var(--table-of-contents-active-item-border-width) solid ${active ? "var(--general-border-brand)" : "transparent"}`,
        paddingLeft: "calc(var(--table-of-contents-padding-level-1) - var(--table-of-contents-active-item-border-width))",
        ...active ? { "--link-primary-default": "var(--link-primary-active)" } : {}
      });
      const numberStyle = (active) => ({
        minWidth: "1.5rem",
        textAlign: "right",
        color: active ? "var(--link-primary-active)" : "var(--link-primary-default)"
      });
      const link = (linkProps, iconLeft) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", underline: false, iconLeft, ...linkProps, children: "Pealkiri" });
      const columns = [
        { header: "Default", render: (s) => link(s.linkProps) },
        {
          header: "With number",
          render: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true", style: numberStyle(s.active), children: "1." }),
            link(s.linkProps)
          ] })
        },
        {
          header: "With icon",
          render: (s) => link(s.linkProps, "mail")
        }
      ];
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { gutterY: 3, children: columns.map((column) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, sm: 6, lg: 4, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: column.header }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0.5, children: states.map((state) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "1rem" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { minWidth: "5rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "span", color: "secondary", children: state.label }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: rowStyle(state.active), children: column.render(state) })
        ] }, state.label)) })
      ] }) }, column.header)) });
    }
  };
  var LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.";
  var StickyInLayout = {
    parameters: { fullWidth: true },
    render: function StickyInLayout2() {
      const scrollRef = (0, import_react2.useRef)(null);
      const [activeId, setActiveId] = (0, import_react2.useState)("sec-1");
      const isMobile = isBreakpointBelow(useBreakpoint(), "md");
      (0, import_react2.useEffect)(() => {
        const container = scrollRef.current;
        if (typeof IntersectionObserver === "undefined") return void 0;
        if (!isMobile && !container) return void 0;
        const observerRoot = isMobile ? null : container;
        const ids = sections.map((_, index) => `sec-${index + 1}`);
        const visibility = /* @__PURE__ */ new Map();
        const atBottom = () => isMobile ? window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2 : !!container && container.scrollTop + container.clientHeight >= container.scrollHeight - 2;
        const pickActive = () => {
          if (atBottom()) {
            setActiveId(ids[ids.length - 1]);
            return;
          }
          const active = ids.find((id) => visibility.get(id));
          if (active) setActiveId(active);
        };
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => visibility.set(entry.target.id, entry.isIntersecting));
            pickActive();
          },
          { root: observerRoot, rootMargin: "0px 0px -55% 0px" }
        );
        ids.forEach((id) => {
          const el = document.getElementById(id);
          if (el) observer.observe(el);
        });
        const scroller = isMobile ? window : container;
        scroller.addEventListener("scroll", pickActive, { passive: true });
        return () => {
          observer.disconnect();
          scroller.removeEventListener("scroll", pickActive);
        };
      }, [isMobile]);
      const selectSection = (id) => (event) => {
        event.preventDefault();
        const target = document.getElementById(id);
        if (!target) return;
        if (isMobile) {
          target.scrollIntoView({ block: "start" });
        } else {
          const root2 = scrollRef.current;
          if (!root2) return;
          const paddingTop = parseFloat(getComputedStyle(root2).paddingTop) || 0;
          root2.scrollTo({
            top: root2.scrollTop + target.getBoundingClientRect().top - root2.getBoundingClientRect().top - paddingTop
          });
        }
        setActiveId(id);
      };
      const items = sections.map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TableOfContents_exports.TableOfContents.Item, { id: `sec-${index + 1}`, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: `#sec-${index + 1}`, underline: false, onClick: selectSection(`sec-${index + 1}`), children: label }) }, label));
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { alignItems: "start", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, md: 8, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              ref: scrollRef,
              style: isMobile ? { paddingBottom: "5rem" } : { maxHeight: "24rem", overflowY: "auto" },
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1.5, children: sections.map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { id: `sec-${index + 1}`, tabIndex: -1, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0.5, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Heading_exports.Heading, { element: "h2", modifiers: "h3", children: label }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: LOREM }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: LOREM })
              ] }) }, label)) })
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ShowAt_exports.ShowAt, { md: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: 4, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TableOfContents_exports.TableOfContents, { heading: "Sisukord", sticky: false, activeId, children: items }) }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HideAt_exports.HideAt, { md: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TableOfContents_exports.TableOfContents.Collapsible, { heading: "Sisukord", activeId, children: items }) })
      ] });
    }
  };
  var Collapsible = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_TableOfContents_exports.TableOfContents.Collapsible, { heading: "Sisukord", activeId: "methods", sticky: false, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TableOfContents_exports.TableOfContents.Item, { id: "intro", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#intro", underline: false, children: "Sissejuhatus" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_TableOfContents_exports.TableOfContents.Item, { id: "methods", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#methods", underline: false, children: "Meetodid" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TableOfContents_exports.TableOfContents.Item, { id: "methods-1", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#methods-1", underline: false, children: "Andmete kogumine" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TableOfContents_exports.TableOfContents.Item, { id: "methods-2", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#methods-2", underline: false, children: "Analüüs" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TableOfContents_exports.TableOfContents.Item, { id: "results", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#results", underline: false, children: "Tulemused" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TableOfContents_exports.TableOfContents.Item, { id: "discussion", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#discussion", underline: false, children: "Arutelu" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TableOfContents_exports.TableOfContents.Item, { id: "summary", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#summary", underline: false, children: "Kokkuvõte" }) })
    ] })
  };

  // .design-sync/.cache/previews/TableOfContents.tsx
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
      if (C) render = () => React.createElement(C, args);
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
    return () => React.createElement("div", { style: { background: bg } }, composed());
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
    compose(table_of_contents_stories_exports, "Default")
  );
  var Transparent2 = (
    /* Transparent */
    compose(table_of_contents_stories_exports, "Transparent")
  );
  var Headless2 = (
    /* Headless */
    compose(table_of_contents_stories_exports, "Headless")
  );
  var WithIcon2 = (
    /* With Icon */
    compose(table_of_contents_stories_exports, "WithIcon")
  );
  var Nested2 = (
    /* Nested */
    compose(table_of_contents_stories_exports, "Nested")
  );
  var Numbered2 = (
    /* Numbered */
    compose(table_of_contents_stories_exports, "Numbered")
  );
  var ItemStates2 = (
    /* Item States */
    compose(table_of_contents_stories_exports, "ItemStates")
  );
  var StickyInLayout3 = (
    /* Sticky In Layout */
    compose(table_of_contents_stories_exports, "StickyInLayout")
  );
  var Collapsible2 = (
    /* Collapsible */
    compose(table_of_contents_stories_exports, "Collapsible")
  );
  return __toCommonJS(TableOfContents_exports);
})();
/*! Bundled license information:

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
