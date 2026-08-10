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

  // node_modules/classnames/index.js
  var require_classnames = __commonJS({
    "node_modules/classnames/index.js"(exports, module) {
      init_define_import_meta_env();
      init_define_process_env();
      (function() {
        "use strict";
        var hasOwn = {}.hasOwnProperty;
        function classNames2() {
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
            return classNames2.apply(null, arg);
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
        if (typeof module !== "undefined" && module.exports) {
          classNames2.default = classNames2;
          module.exports = classNames2;
        } else if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
          define("classnames", [], function() {
            return classNames2;
          });
        } else {
          window.classNames = classNames2;
        }
      })();
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

  // .design-sync/.cache/previews/Icon.tsx
  var Icon_exports = {};
  __export(Icon_exports, {
    Backgrounds: () => Backgrounds2,
    Colors: () => Colors2,
    Default: () => Default2,
    Sizes: () => Sizes2,
    SizesWithBackground: () => SizesWithBackground2,
    UsedInsideText: () => UsedInsideText2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/base/icon/icon.stories.tsx
  var icon_stories_exports = {};
  __export(icon_stories_exports, {
    Backgrounds: () => Backgrounds,
    Colors: () => Colors,
    Default: () => Default,
    Sizes: () => Sizes,
    SizesWithBackground: () => SizesWithBackground,
    UsedInsideText: () => UsedInsideText,
    default: () => icon_stories_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  var import_classnames = __toESM(require_classnames());

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
  var g = window.Tedi;
  var ds_Row_default = g["Row"] !== void 0 ? g["Row"] : g;

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
  var g2 = window.Tedi;
  var ds_Col_default = g2["Col"] !== void 0 ? g2["Col"] : g2;

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
  var g3 = window.Tedi;
  var ds_VerticalSpacing_default = g3["VerticalSpacing"] !== void 0 ? g3["VerticalSpacing"] : g3;

  // ds-shim:ds:Heading
  var ds_Heading_exports = {};
  __export(ds_Heading_exports, {
    default: () => ds_Heading_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Heading_exports, __toESM(require_ds_raw()));
  var g4 = window.Tedi;
  var ds_Heading_default = g4["Heading"] !== void 0 ? g4["Heading"] : g4;

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

  // src/tedi/components/base/icon/icon.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    title: "Tedi-Ready/Base/Icon",
    component: ds_Icon_exports.Icon,
    parameters: {
      design: {
        type: "figma",
        url: "https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=45-30752&mode=dev"
      }
    }
  };
  var icon_stories_default = meta;
  var sizeArray = [8, 12, 16, 18, 24, 36, 48];
  var colorArray = [
    "primary",
    "secondary",
    "tertiary",
    "brand",
    "brand-dark",
    "success",
    "warning",
    "warning-dark",
    "danger",
    "white"
  ];
  var TemplateRow = (args) => {
    const { array, property, ...iconProps } = args;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: "Outlined" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { alignItems: "center", children: array.map((value, key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: (0, import_classnames.default)({ "bg bg-primary": value === "white" }), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { ...iconProps, ...{ [property]: value } }) }) }, key)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: "Filled" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { alignItems: "center", children: array.map((value, key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: (0, import_classnames.default)({ "bg bg-primary": value === "white" }), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { ...iconProps, ...{ [property]: value }, filled: true }) }) }, key)) })
    ] });
  };
  var TemplateColumn = (args) => {
    const { array, property, ...iconProps } = args;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "example-list w-50", children: array.map((value, key) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { className: `${key === array.length - 1 ? "" : "border-bottom"} padding-14-16`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { className: "w-50 flex", children: [
        value?.toString(),
        " ",
        value === 24 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { className: "example-text--secondary", children: "default" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { className: "flex", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { ...iconProps, ...{ [property]: value } }),
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { ...iconProps, ...{ [property]: value }, filled: true })
      ] })
    ] }, key)) });
  };
  var TemplateColumnWithMultipleVariants = (args) => {
    const { items } = args;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "example-list w-50", children: items.map((item, key) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      grid_exports.Row,
      {
        justifyContent: "start",
        className: `${key === items.length - 1 ? "" : "border-bottom"} padding-14-16`,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { className: "w-50 flex", children: [
            item.size?.toString(),
            " ",
            item.size === 24 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { className: "example-text--secondary", children: "default" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { className: "flex", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { ...{ size: item.size, background: item.background, name: item.name, color: item.color } }),
            " ",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              ds_Icon_exports.Icon,
              {
                ...{ size: item.size, background: item.background, name: item.name, color: item.color },
                filled: true
              }
            )
          ] })
        ]
      },
      key
    )) });
  };
  var TemplateColumnWithBackgroundCircleVarians = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { alignItems: "center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { alignItems: "center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "Vaccines", background: "brand-primary", color: "white" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "Info", background: "brand-primary", color: "white", size: 16 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "Vaccines", background: "brand-secondary", color: "brand" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "Info", background: "brand-secondary", color: "brand", size: 16 }) })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { alignItems: "center", className: "bg bg-primary", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "Vaccines", background: "primary", color: "brand" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "Info", background: "primary", color: "brand", size: 16 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "Vaccines", background: "secondary", color: "white" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "Info", background: "secondary", color: "white", size: 16 }) })
      ] }) })
    ] });
  };
  var Template = (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { ...args });
  var Default = {
    render: Template,
    args: {
      name: "account_circle"
    }
  };
  var Sizes = {
    name: "Icon Size",
    render: TemplateColumn,
    args: {
      name: "account_circle",
      property: "size",
      color: "primary",
      array: sizeArray
    }
  };
  var SizesWithBackground = {
    name: "Icon size inside background",
    render: TemplateColumnWithMultipleVariants,
    args: {
      items: [
        {
          name: "info",
          property: "size",
          color: "brand",
          background: "brand-secondary",
          size: 16
        },
        {
          name: "vaccines",
          property: "size",
          color: "brand",
          background: "brand-secondary",
          size: 24
        }
      ]
    }
  };
  var Colors = {
    render: TemplateRow,
    name: "Icon colors",
    args: {
      name: "account_circle",
      property: "color",
      array: colorArray,
      size: 48
    }
  };
  var Backgrounds = {
    render: TemplateColumnWithBackgroundCircleVarians,
    name: "Icon background colors"
  };
  var UsedInsideText = {
    render: (args) => {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0.25, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Heading_exports.Heading, { element: "h1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: args.name, display: "inline" }),
          "This is level 1 heading with inline ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { color: "brand", name: args.name, display: "inline" }),
          " icon"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Heading_exports.Heading, { element: "h2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: args.name, display: "inline" }),
          "This is level 2 heading with inline ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { color: "brand", name: args.name, display: "inline" }),
          " icon"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Heading_exports.Heading, { element: "h3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: args.name, display: "inline" }),
          "This is level 3 heading with inline ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { color: "brand", name: args.name, display: "inline" }),
          " icon"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Heading_exports.Heading, { element: "h4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: args.name, display: "inline" }),
          "This is level 4 heading with inline ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { color: "brand", name: args.name, display: "inline" }),
          " icon"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Heading_exports.Heading, { element: "h5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: args.name, display: "inline" }),
          "This is level 5 heading with inline ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { color: "brand", name: args.name, display: "inline" }),
          " icon"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Heading_exports.Heading, { element: "h6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: args.name, display: "inline" }),
          "This is level 6 heading with inline ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { color: "brand", name: args.name, display: "inline" }),
          " icon"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: args.name, display: "inline" }),
          "This is paragraph text with inline ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { color: "brand", name: args.name, display: "inline" }),
          " icon"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: args.name, display: "inline" }),
          "This is small text with inline ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { color: "brand", name: args.name, display: "inline" }),
          " icon"
        ] })
      ] });
    },
    args: {
      name: "account_circle"
    }
  };

  // .design-sync/.cache/previews/Icon.tsx
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
    compose(icon_stories_exports, "Default")
  );
  var Sizes2 = (
    /* Icon Size */
    compose(icon_stories_exports, "Sizes")
  );
  var SizesWithBackground2 = (
    /* Icon size inside background */
    compose(icon_stories_exports, "SizesWithBackground")
  );
  var Colors2 = (
    /* Icon colors */
    compose(icon_stories_exports, "Colors")
  );
  var Backgrounds2 = (
    /* Icon background colors */
    compose(icon_stories_exports, "Backgrounds")
  );
  var UsedInsideText2 = (
    /* Used Inside Text */
    compose(icon_stories_exports, "UsedInsideText")
  );
  return __toCommonJS(Icon_exports);
})();
/*! Bundled license information:

classnames/index.js:
  (*!
  	Copyright (c) 2018 Jed Watson.
  	Licensed under the MIT License (MIT), see
  	http://jedwatson.github.io/classnames
  *)
*/
