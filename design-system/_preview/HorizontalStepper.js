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

  // .design-sync/.cache/previews/HorizontalStepper.tsx
  var HorizontalStepper_exports = {};
  __export(HorizontalStepper_exports, {
    ClickToNavigate: () => ClickToNavigate2,
    Compact: () => Compact2,
    CompactStates: () => CompactStates2,
    Default: () => Default2,
    ExternalNavigation: () => ExternalNavigation2,
    SecondStep: () => SecondStep2,
    States: () => States2,
    ThirdStep: () => ThirdStep2,
    TransparentBackground: () => TransparentBackground2,
    WithDescriptions: () => WithDescriptions2,
    WithErrors: () => WithErrors2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/navigation/horizontal-stepper/horizontal-stepper.stories.tsx
  var horizontal_stepper_stories_exports = {};
  __export(horizontal_stepper_stories_exports, {
    ClickToNavigate: () => ClickToNavigate,
    Compact: () => Compact,
    CompactStates: () => CompactStates,
    Default: () => Default,
    ExternalNavigation: () => ExternalNavigation,
    SecondStep: () => SecondStep,
    States: () => States,
    ThirdStep: () => ThirdStep,
    TransparentBackground: () => TransparentBackground,
    WithDescriptions: () => WithDescriptions,
    WithErrors: () => WithErrors,
    default: () => horizontal_stepper_stories_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  var import_react2 = __toESM(require_react_shim());

  // .storybook/subcomponent-controls.ts
  init_define_import_meta_env();
  init_define_process_env();
  var SEP = "__";
  var ALWAYS_EXCLUDE = ["style", "ref", "key", "defaultServerBreakpoint", "xs", "sm", "md", "lg", "xl", "xxl"];
  var stripQuotes = (value) => value.replace(/^['"]|['"]$/g, "");
  var isNumericLiteral = (value) => /^-?\d+(?:\.\d+)?$/.test(value);
  var inferControl = (type) => {
    switch (type?.name) {
      case "boolean":
        return { control: "boolean" };
      case "number":
        return { control: "number" };
      case "string":
        return { control: "text" };
      case "enum": {
        const literals = (type.value ?? []).map((entry) => stripQuotes(entry.value)).filter((value) => value !== "undefined" && value !== "null");
        if (literals.length === 0) return { control: "text" };
        if (literals.every((value) => value === "true" || value === "false")) return { control: "boolean" };
        if (literals.every(isNumericLiteral)) return { control: "select", options: literals.map(Number) };
        return { control: "select", options: literals };
      }
      default:
        return { control: "object" };
    }
  };
  var subcomponentArgTypes = (component, options) => {
    const { category, prefix, include, exclude = [] } = options;
    const docgen = component;
    const props = docgen.__docgenInfo?.props;
    if (!props) {
      console.warn(
        `[subcomponentArgTypes] No __docgenInfo for "${docgen.displayName ?? category}". Controls will not be generated. Check the react-docgen-typescript config in .storybook/main.ts.`
      );
      return {};
    }
    const skip = /* @__PURE__ */ new Set([...ALWAYS_EXCLUDE, ...exclude]);
    const argTypes = {};
    for (const [name, prop] of Object.entries(props)) {
      if (include && !include.includes(name)) continue;
      if (skip.has(name)) continue;
      const { control, options: controlOptions } = inferControl(prop.type);
      const defaultValue = prop.defaultValue?.value;
      argTypes[`${prefix}${SEP}${name}`] = {
        name,
        description: prop.description || void 0,
        control,
        options: controlOptions,
        table: {
          category,
          type: prop.type ? { summary: prop.type.raw ?? prop.type.name } : void 0,
          defaultValue: defaultValue !== void 0 && defaultValue !== null ? { summary: String(defaultValue) } : void 0
        }
      };
    }
    return argTypes;
  };
  var getSubcomponentProps = (args, prefix) => {
    const head = `${prefix}${SEP}`;
    const props = {};
    for (const [key, value] of Object.entries(args)) {
      if (key.startsWith(head) && value !== void 0 && value !== "") {
        props[key.slice(head.length)] = value;
      }
    }
    return props;
  };
  var getPrimaryComponentProps = (args) => {
    const props = {};
    for (const [key, value] of Object.entries(args)) {
      if (!key.includes(SEP)) props[key] = value;
    }
    return props;
  };

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

  // ds-shim:ds:Button
  var ds_Button_exports = {};
  __export(ds_Button_exports, {
    default: () => ds_Button_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Button_exports, __toESM(require_ds_raw()));
  var g2 = window.Tedi;
  var ds_Button_default = g2["Button"] !== void 0 ? g2["Button"] : g2;

  // ds-shim:ds:VerticalSpacing
  var ds_VerticalSpacing_exports = {};
  __export(ds_VerticalSpacing_exports, {
    default: () => ds_VerticalSpacing_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_VerticalSpacing_exports, __toESM(require_ds_raw()));
  var g3 = window.Tedi;
  var ds_VerticalSpacing_default = g3["VerticalSpacing"] !== void 0 ? g3["VerticalSpacing"] : g3;

  // ds-shim:ds:HorizontalStepper
  var ds_HorizontalStepper_exports = {};
  __export(ds_HorizontalStepper_exports, {
    default: () => ds_HorizontalStepper_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_HorizontalStepper_exports, __toESM(require_ds_raw()));
  var g4 = window.Tedi;
  var ds_HorizontalStepper_default = g4["HorizontalStepper"] !== void 0 ? g4["HorizontalStepper"] : g4;

  // ds-shim:ds:HorizontalStepperItem
  var ds_HorizontalStepperItem_exports = {};
  __export(ds_HorizontalStepperItem_exports, {
    default: () => ds_HorizontalStepperItem_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_HorizontalStepperItem_exports, __toESM(require_ds_raw()));
  var g5 = window.Tedi;
  var ds_HorizontalStepperItem_default = g5["HorizontalStepperItem"] !== void 0 ? g5["HorizontalStepperItem"] : g5;

  // src/tedi/components/navigation/horizontal-stepper/horizontal-stepper.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var STEPS = ["Kutse", "Tahteavaldus", "Geenianalüüs", "Vastus"];
  var meta = {
    component: ds_HorizontalStepper_exports.HorizontalStepper,
    subcomponents: {
      "HorizontalStepper.Item": ds_HorizontalStepperItem_exports.HorizontalStepperItem
    },
    title: "TEDI-Ready/Components/Navigation/HorizontalStepper",
    parameters: {
      design: {
        type: "figma",
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.51.75?node-id=11201-120696&m=dev"
      }
    }
  };
  var horizontal_stepper_stories_default = meta;
  var Default = {
    argTypes: {
      ...subcomponentArgTypes(ds_HorizontalStepper_exports.HorizontalStepper.Item, {
        category: "HorizontalStepper.Item",
        prefix: "item",
        exclude: ["label", "onSelect"]
      })
    },
    args: {
      "aria-label": "Form progress",
      background: "default",
      compact: "sm",
      item__selected: true
    },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_HorizontalStepper_exports.HorizontalStepper, { ...getPrimaryComponentProps(args), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { ...getSubcomponentProps(args, "item"), label: "Kutse" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Tahteavaldus" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Geenianalüüs" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Vastus" })
    ] })
  };
  var STATE_ROWS = [
    { key: "default", label: "Default" },
    { key: "hover", label: "Hover" },
    { key: "active", label: "Active" },
    { key: "focus", label: "Focus" }
  ];
  var TYPE_COLS = [
    { key: "completed", label: "Completed", props: { completed: true }, rows: ["default", "hover", "active", "focus"] },
    { key: "error", label: "Has error", props: { error: true }, rows: ["default", "hover", "active", "focus"] },
    { key: "default", label: "Default", props: {}, rows: ["default", "hover", "active"] },
    { key: "selected", label: "Selected", props: { selected: true }, rows: ["default"] }
  ];
  var StatesMatrix = ({ compact }) => {
    const breakpoint = useBreakpoint();
    const isMobile = isBreakpointBelow(breakpoint, "md");
    if (isMobile) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1.5, children: TYPE_COLS.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: col.label }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }, children: STATE_ROWS.filter((row) => col.rows.includes(row.key)).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "div",
          {
            "data-stepper-state": row.key,
            style: { display: "flex", alignItems: "center", gap: "1rem" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { minWidth: "4rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "small", color: "secondary", element: "span", children: row.label }) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: "fit-content", maxWidth: "100%" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                ds_HorizontalStepper_exports.HorizontalStepper,
                {
                  "aria-label": `${col.label} – ${row.label}`,
                  background: "transparent",
                  compact,
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Step", ...col.props })
                }
              ) })
            ]
          },
          row.key
        )) })
      ] }, col.key)) });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "auto repeat(4, max-content)",
          gap: "1rem 2rem",
          alignItems: "center",
          justifyContent: "start"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
          TYPE_COLS.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: col.label }, col.key)),
          STATE_ROWS.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react2.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: row.label }),
            TYPE_COLS.map(
              (col) => col.rows.includes(row.key) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "data-stepper-state": row.key, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                ds_HorizontalStepper_exports.HorizontalStepper,
                {
                  "aria-label": `${col.label} – ${row.label}`,
                  background: "transparent",
                  compact,
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Step", ...col.props })
                }
              ) }, col.key) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}, col.key)
            )
          ] }, row.key))
        ]
      }
    );
  };
  var statesPseudo = {
    pseudo: {
      hover: '[data-stepper-state="hover"] button',
      active: '[data-stepper-state="active"] button',
      focusVisible: '[data-stepper-state="focus"] button'
    }
  };
  var SecondStep = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_HorizontalStepper_exports.HorizontalStepper, { "aria-label": "Form progress", compact: "lg", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Kutse", completed: true }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Tahteavaldus", selected: true }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Geenianalüüs" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Vastus" })
    ] })
  };
  var ThirdStep = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_HorizontalStepper_exports.HorizontalStepper, { "aria-label": "Form progress", compact: "lg", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Kutse", completed: true }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Tahteavaldus", completed: true }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Geenianalüüs", selected: true }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Vastus" })
    ] })
  };
  var WithErrors = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_HorizontalStepper_exports.HorizontalStepper, { "aria-label": "Form with errors", compact: "lg", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Kutse", error: true }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Tahteavaldus", selected: true }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Geenianalüüs" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Vastus" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_HorizontalStepper_exports.HorizontalStepper, { "aria-label": "Form with error description", compact: "lg", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Kutse", completed: true }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Tahteavaldus", error: true, description: "Sammus esinevad vead" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Geenianalüüs", selected: true }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Vastus" })
      ] })
    ] })
  };
  var WithDescriptions = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_HorizontalStepper_exports.HorizontalStepper, { "aria-label": "Steps with descriptions", compact: "lg", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Kutse", selected: true }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Tahteavaldus" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Geenianalüüs", description: "Ametnik täidab" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Vastus", description: "Ametnik täidab" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_HorizontalStepper_exports.HorizontalStepper, { "aria-label": "Steps with descriptions", compact: "lg", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Kutse", completed: true }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Tahteavaldus", selected: true }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Geenianalüüs", description: "Ametnik täidab" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Vastus", description: "Ametnik täidab" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_HorizontalStepper_exports.HorizontalStepper, { "aria-label": "Steps with descriptions", compact: "lg", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Kutse", completed: true }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Tahteavaldus", completed: true }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Geenianalüüs", selected: true, description: "Ametnik täidab" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Vastus", description: "Ametnik täidab" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_HorizontalStepper_exports.HorizontalStepper, { "aria-label": "Steps with descriptions", compact: "lg", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Kutse", completed: true }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Tahteavaldus", completed: true }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Geenianalüüs", completed: true, description: "Ametnik täidab" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Vastus", selected: true, description: "Ametnik täidab" })
      ] })
    ] })
  };
  var TransparentBackground = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_HorizontalStepper_exports.HorizontalStepper, { "aria-label": "Form progress", background: "transparent", compact: "lg", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Kutse", completed: true }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Tahteavaldus", selected: true }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Geenianalüüs" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper.Item, { label: "Vastus" })
    ] })
  };
  var Compact = {
    render: () => {
      const Demo = () => {
        const [current, setCurrent] = (0, import_react2.useState)(1);
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { maxWidth: 480 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper, { "aria-label": "Form progress", compact: true, children: STEPS.map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_HorizontalStepper_exports.HorizontalStepper.Item,
          {
            label,
            description: "Ametnik täidab",
            completed: index < current,
            selected: index === current,
            onSelect: () => setCurrent(index)
          },
          label
        )) }) });
      };
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Demo, {});
    }
  };
  var ClickToNavigate = {
    render: () => {
      const Demo = () => {
        const [current, setCurrent] = (0, import_react2.useState)(1);
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper, { "aria-label": "Form progress", compact: "lg", children: STEPS.map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_HorizontalStepper_exports.HorizontalStepper.Item,
          {
            label,
            completed: index < current,
            selected: index === current,
            onSelect: () => setCurrent(index)
          },
          label
        )) });
      };
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Demo, {});
    }
  };
  var ExternalNavigation = {
    render: () => {
      const Demo = () => {
        const [current, setCurrent] = (0, import_react2.useState)(0);
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1.5, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HorizontalStepper_exports.HorizontalStepper, { "aria-label": "Form progress", compact: "lg", children: STEPS.map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_HorizontalStepper_exports.HorizontalStepper.Item,
            {
              label,
              completed: index < current,
              selected: index === current,
              disabled: index > current,
              onSelect: () => setCurrent(index)
            },
            label
          )) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "0.5rem" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              ds_Button_exports.Button,
              {
                visualType: "secondary",
                disabled: current === 0,
                onClick: () => setCurrent((step) => Math.max(0, step - 1)),
                children: "Tagasi"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              ds_Button_exports.Button,
              {
                disabled: current === STEPS.length - 1,
                onClick: () => setCurrent((step) => Math.min(STEPS.length - 1, step + 1)),
                children: "Edasi"
              }
            )
          ] })
        ] });
      };
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Demo, {});
    }
  };
  var States = {
    parameters: statesPseudo,
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatesMatrix, { compact: false })
  };
  var CompactStates = {
    parameters: statesPseudo,
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatesMatrix, { compact: true })
  };

  // .design-sync/.cache/previews/HorizontalStepper.tsx
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
    compose(horizontal_stepper_stories_exports, "Default")
  );
  var SecondStep2 = (
    /* Second Step */
    compose(horizontal_stepper_stories_exports, "SecondStep")
  );
  var ThirdStep2 = (
    /* Third Step */
    compose(horizontal_stepper_stories_exports, "ThirdStep")
  );
  var WithErrors2 = (
    /* With Errors */
    compose(horizontal_stepper_stories_exports, "WithErrors")
  );
  var WithDescriptions2 = (
    /* With Descriptions */
    compose(horizontal_stepper_stories_exports, "WithDescriptions")
  );
  var TransparentBackground2 = (
    /* Transparent Background */
    compose(horizontal_stepper_stories_exports, "TransparentBackground")
  );
  var Compact2 = (
    /* Compact */
    compose(horizontal_stepper_stories_exports, "Compact")
  );
  var ClickToNavigate2 = (
    /* Click To Navigate */
    compose(horizontal_stepper_stories_exports, "ClickToNavigate")
  );
  var ExternalNavigation2 = (
    /* External Navigation */
    compose(horizontal_stepper_stories_exports, "ExternalNavigation")
  );
  var States2 = (
    /* States */
    compose(horizontal_stepper_stories_exports, "States")
  );
  var CompactStates2 = (
    /* Compact States */
    compose(horizontal_stepper_stories_exports, "CompactStates")
  );
  return __toCommonJS(HorizontalStepper_exports);
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
