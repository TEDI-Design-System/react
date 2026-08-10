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

  // .design-sync/.cache/previews/Spinner.tsx
  var Spinner_exports = {};
  __export(Spinner_exports, {
    Color: () => Color2,
    Default: () => Default2,
    Size: () => Size2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/loaders/spinner/spinner.stories.tsx
  var spinner_stories_exports = {};
  __export(spinner_stories_exports, {
    Color: () => Color,
    Default: () => Default,
    Size: () => Size,
    default: () => spinner_stories_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  var import_react = __toESM(require_react_shim());

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

  // ds-shim:ds:Spinner
  var ds_Spinner_exports = {};
  __export(ds_Spinner_exports, {
    default: () => ds_Spinner_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Spinner_exports, __toESM(require_ds_raw()));
  var g3 = window.Tedi;
  var ds_Spinner_default = g3["Spinner"] !== void 0 ? g3["Spinner"] : g3;

  // src/tedi/components/loaders/spinner/spinner.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var withConditionalCanvasBackground = (Story, context) => {
    const { color } = context.args;
    (0, import_react.useEffect)(() => {
      const bg = color === "secondary" ? "var(--color-bg-inverted)" : "var(--color-bg-default)";
      const elements = document.querySelectorAll(".sb-show-main, .docs-story > div, .sbdocs-preview");
      elements.forEach((el) => {
        const element = el;
        element.style.backgroundColor = bg;
        element.style.color = "var(--color-text-inverted)";
        element.style.transition = "background-color 0.2s ease";
      });
      return () => {
        elements.forEach((el) => {
          const element = el;
          element.style.backgroundColor = "";
        });
      };
    }, [color]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {});
  };
  var meta = {
    component: ds_Spinner_exports.Spinner,
    title: "Tedi-Ready/Components/Loader/Spinner",
    parameters: {
      status: {
        type: [{ name: "breakpointSupport", url: "?path=/docs/helpers-usebreakpointprops--usebreakpointprops" }]
      },
      controls: {
        exclude: ["sm", "md", "lg", "xl", "xxl"]
      },
      design: {
        type: "figma",
        url: "https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2768-42334&mode=dev"
      }
    }
  };
  var spinner_stories_default = meta;
  var sizeArray = [8, 10, 12, 16, 18, 24, 36, 48];
  var TemplateColumn = (args) => {
    const { array, property, ...spinnerProps } = args;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "example-list w-50", children: array.map((value, key) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { className: `${key === array.length - 1 ? "" : "border-bottom"} padding-14-16`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: value?.toString() }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { className: "d-flex", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Spinner_exports.Spinner, { ...spinnerProps, ...{ [property]: value } }) })
    ] }, key)) });
  };
  var TemplateColors = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { alignItems: "center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Spinner_exports.Spinner, { color: "primary", label: "Loading...", size: 48 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg bg-primary", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Spinner_exports.Spinner, { color: "secondary", label: "Loading...", size: 48 }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg bg-danger", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Spinner_exports.Spinner, { color: "secondary", label: "Loading...", size: 48 }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg bg-success", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Spinner_exports.Spinner, { color: "secondary", label: "Loading...", size: 48 }) }) })
    ] });
  };
  var Template = (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Spinner_exports.Spinner, { ...args });
  var Default = {
    render: Template,
    args: {
      size: 16,
      color: "primary",
      label: "Loading..."
    },
    decorators: [withConditionalCanvasBackground]
  };
  var Size = {
    render: TemplateColumn,
    args: {
      property: "size",
      color: "primary",
      array: sizeArray,
      label: "Loading..."
    }
  };
  var Color = {
    render: TemplateColors
  };

  // .design-sync/.cache/previews/Spinner.tsx
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
    compose(spinner_stories_exports, "Default")
  );
  var Size2 = (
    /* Size */
    compose(spinner_stories_exports, "Size")
  );
  var Color2 = (
    /* Color */
    compose(spinner_stories_exports, "Color")
  );
  return __toCommonJS(Spinner_exports);
})();
