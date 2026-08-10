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

  // .design-sync/.cache/previews/ProgressBar.tsx
  var ProgressBar_exports = {};
  __export(ProgressBar_exports, {
    Animated: () => Animated2,
    Default: () => Default2,
    Position: () => Position2,
    Regular: () => Regular2,
    Responsive: () => Responsive2,
    Sizes: () => Sizes2,
    ValueHidden: () => ValueHidden2,
    WithError: () => WithError2,
    WithHint: () => WithHint2,
    WithLabel: () => WithLabel2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/loaders/progress-bar/progress-bar.stories.tsx
  var progress_bar_stories_exports = {};
  __export(progress_bar_stories_exports, {
    Animated: () => Animated,
    Default: () => Default,
    Position: () => Position,
    Regular: () => Regular,
    Responsive: () => Responsive,
    Sizes: () => Sizes,
    ValueHidden: () => ValueHidden,
    WithError: () => WithError,
    WithHint: () => WithHint,
    WithLabel: () => WithLabel,
    default: () => progress_bar_stories_default
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

  // ds-shim:ds:Text
  var ds_Text_exports = {};
  __export(ds_Text_exports, {
    default: () => ds_Text_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Text_exports, __toESM(require_ds_raw()));
  var g = window.Tedi;
  var ds_Text_default = g["Text"] !== void 0 ? g["Text"] : g;

  // ds-shim:ds:ProgressBar
  var ds_ProgressBar_exports = {};
  __export(ds_ProgressBar_exports, {
    default: () => ds_ProgressBar_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_ProgressBar_exports, __toESM(require_ds_raw()));
  var g2 = window.Tedi;
  var ds_ProgressBar_default = g2["ProgressBar"] !== void 0 ? g2["ProgressBar"] : g2;

  // src/tedi/components/loaders/progress-bar/progress-bar.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var HINT = { text: "Üleslaadimine", type: "hint" };
  var meta = {
    component: ds_ProgressBar_exports.ProgressBar,
    title: "TEDI-Ready/Components/Loader/ProgressBar",
    parameters: {
      design: {
        type: "figma",
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.49.74?node-id=25616-189000&m=dev"
      },
      status: {
        type: [{ name: "breakpointSupport", url: "?path=/docs/helpers-usebreakpointprops--usebreakpointprops" }]
      },
      controls: {
        exclude: ["sm", "md", "lg", "xl", "xxl"]
      }
    },
    argTypes: {
      value: { control: { type: "range", min: 0, max: 100, step: 1 } }
    }
  };
  var progress_bar_stories_default = meta;
  var MatrixTable = ({ rows }) => {
    const breakpoint = useBreakpoint();
    const isMobile = isBreakpointBelow(breakpoint, "md");
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "example-list", children: rows.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: `${index === rows.length - 1 ? "" : "border-bottom"} padding-14-16`,
        style: {
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          flexWrap: "wrap",
          gap: "8px 24px",
          alignItems: isMobile ? "stretch" : "center"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { flex: isMobile ? "0 0 auto" : "1 1 140px", margin: 0 }, children: row.lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "small", children: line }, line)) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { flex: isMobile ? "0 0 auto" : "3 1 260px", minWidth: 0 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ProgressBar_exports.ProgressBar, { ...row.props }) })
        ]
      },
      row.lines.join("|")
    )) });
  };
  var Default = {
    args: { value: 60, ariaLabel: "Edenemisriba pealkiri" }
  };
  var sizeRows = [
    { lines: ["Default"], props: { value: 20, ariaLabel: "Edenemisriba pealkiri", helper: HINT } },
    { lines: ["Small"], props: { value: 20, small: true, ariaLabel: "Edenemisriba pealkiri", helper: HINT } }
  ];
  var Sizes = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatrixTable, { rows: sizeRows }),
    parameters: {
      docs: {
        source: {
          code: `<ProgressBar value={20} ariaLabel="Edenemisriba pealkiri" helper={{ text: 'Üleslaadimine', type: 'hint' }} />
<ProgressBar value={20} small ariaLabel="Edenemisriba pealkiri" helper={{ text: 'Üleslaadimine', type: 'hint' }} />`
        }
      }
    }
  };
  var positionRows = [
    {
      lines: ["Top title", "Horizontal value", "Bottom hint"],
      props: {
        value: 20,
        label: "Edenemisriba pealkiri",
        required: true,
        labelPosition: "top",
        valuePosition: "horizontal",
        helper: HINT
      }
    },
    {
      lines: ["Top title", "Bottom value", "Bottom hint"],
      props: {
        value: 20,
        label: "Edenemisriba pealkiri",
        required: true,
        labelPosition: "top",
        valuePosition: "bottom",
        helper: HINT
      }
    },
    {
      lines: ["Horizontal title", "Horizontal value", "Bottom hint"],
      props: {
        value: 20,
        label: "Edenemisriba pealkiri",
        required: true,
        labelPosition: "top",
        valuePosition: "horizontal",
        helper: HINT,
        md: { labelPosition: "horizontal" }
      }
    },
    {
      lines: ["Horizontal title", "Bottom value", "Bottom hint"],
      props: {
        value: 20,
        label: "Edenemisriba pealkiri",
        required: true,
        labelPosition: "top",
        valuePosition: "bottom",
        helper: HINT,
        md: { labelPosition: "horizontal" }
      }
    }
  ];
  var Position = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatrixTable, { rows: positionRows }),
    parameters: {
      docs: {
        source: {
          code: `<ProgressBar value={20} label="Edenemisriba pealkiri" required labelPosition="top" valuePosition="horizontal" helper={{ text: 'Üleslaadimine', type: 'hint' }} />
<ProgressBar value={20} label="Edenemisriba pealkiri" required labelPosition="top" valuePosition="bottom" helper={{ text: 'Üleslaadimine', type: 'hint' }} />
<ProgressBar value={20} label="Edenemisriba pealkiri" required labelPosition="top" valuePosition="horizontal" helper={{ text: 'Üleslaadimine', type: 'hint' }} md={{ labelPosition: 'horizontal' }} />
<ProgressBar value={20} label="Edenemisriba pealkiri" required labelPosition="top" valuePosition="bottom" helper={{ text: 'Üleslaadimine', type: 'hint' }} md={{ labelPosition: 'horizontal' }} />`
        }
      }
    }
  };
  var WithLabel = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: "24px", maxWidth: "720px" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_ProgressBar_exports.ProgressBar,
        {
          value: 40,
          label: "Progress",
          required: true,
          valuePosition: "bottom",
          helper: { text: "Üleslaadimine", type: "hint" }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_ProgressBar_exports.ProgressBar,
        {
          value: 40,
          label: "Küsitluses osalenutest olid vanuses 15-18",
          labelPosition: "top",
          md: { labelPosition: "horizontal" }
        }
      )
    ] }),
    parameters: {
      docs: {
        source: {
          code: `<ProgressBar value={40} label="Progress" required valuePosition="bottom" helper={{ text: 'Üleslaadimine', type: 'hint' }} />
<ProgressBar value={40} label="Küsitluses osalenutest olid vanuses 15-18" labelPosition="top" lg={{ labelPosition: 'top' }} />`
        }
      }
    }
  };
  var Regular = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: "24px", maxWidth: "720px" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ProgressBar_exports.ProgressBar, { value: 40, ariaLabel: "Edenemisriba pealkiri" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ProgressBar_exports.ProgressBar, { value: 40, ariaLabel: "Edenemisriba pealkiri", valueLabel: "1 / 5" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ProgressBar_exports.ProgressBar, { value: 40, ariaLabel: "Edenemisriba pealkiri", valuePosition: "bottom" })
    ] }),
    parameters: {
      docs: {
        source: {
          code: `<ProgressBar value={40} ariaLabel="Edenemisriba pealkiri" />
<ProgressBar value={40} ariaLabel="Edenemisriba pealkiri" valueLabel="1 / 5" />
<ProgressBar value={40} ariaLabel="Edenemisriba pealkiri" valuePosition="bottom" />`
        }
      }
    }
  };
  var WithHint = {
    args: {
      value: 40,
      ariaLabel: "Edenemisriba pealkiri",
      helper: HINT
    }
  };
  var WithError = {
    args: {
      value: 40,
      ariaLabel: "Edenemisriba pealkiri",
      helper: { text: "Üleslaadimine ebaõnnestus, fail on liiga suur", type: "error" }
    }
  };
  var ValueHidden = {
    args: {
      value: 60,
      ariaLabel: "Edenemisriba pealkiri",
      showValue: false
    }
  };
  var Responsive = {
    args: {
      value: 40,
      label: "Edenemisriba pealkiri",
      labelPosition: "top",
      valuePosition: "bottom",
      helper: HINT,
      md: { labelPosition: "horizontal", valuePosition: "horizontal" }
    }
  };
  var Animated = {
    render: function AnimatedStory() {
      const [value, setValue] = (0, import_react2.useState)(0);
      (0, import_react2.useEffect)(() => {
        const id = window.setInterval(() => {
          setValue((v) => v >= 100 ? 0 : v + 5);
        }, 300);
        return () => window.clearInterval(id);
      }, []);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ProgressBar_exports.ProgressBar, { value, label: "Üleslaadimine..." });
    }
  };

  // .design-sync/.cache/previews/ProgressBar.tsx
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
    compose(progress_bar_stories_exports, "Default")
  );
  var Sizes2 = (
    /* Sizes */
    compose(progress_bar_stories_exports, "Sizes")
  );
  var Position2 = (
    /* Position */
    compose(progress_bar_stories_exports, "Position")
  );
  var WithLabel2 = (
    /* With Label */
    compose(progress_bar_stories_exports, "WithLabel")
  );
  var Regular2 = (
    /* Regular */
    compose(progress_bar_stories_exports, "Regular")
  );
  var WithHint2 = (
    /* With Hint */
    compose(progress_bar_stories_exports, "WithHint")
  );
  var WithError2 = (
    /* With Error */
    compose(progress_bar_stories_exports, "WithError")
  );
  var ValueHidden2 = (
    /* Value Hidden */
    compose(progress_bar_stories_exports, "ValueHidden")
  );
  var Responsive2 = (
    /* Responsive */
    compose(progress_bar_stories_exports, "Responsive")
  );
  var Animated2 = (
    /* Animated */
    compose(progress_bar_stories_exports, "Animated")
  );
  return __toCommonJS(ProgressBar_exports);
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
