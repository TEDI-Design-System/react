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

  // .design-sync/.cache/previews/Col.tsx
  var Col_exports = {};
  __export(Col_exports, {
    Default: () => Default2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/layout/grid/col.stories.tsx
  var col_stories_exports = {};
  __export(col_stories_exports, {
    Default: () => Default,
    default: () => col_stories_default
  });
  init_define_import_meta_env();
  init_define_process_env();

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

  // ds-shim:ds:VerticalSpacing
  var ds_VerticalSpacing_exports = {};
  __export(ds_VerticalSpacing_exports, {
    default: () => ds_VerticalSpacing_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_VerticalSpacing_exports, __toESM(require_ds_raw()));
  var g2 = window.Tedi;
  var ds_VerticalSpacing_default = g2["VerticalSpacing"] !== void 0 ? g2["VerticalSpacing"] : g2;

  // ds-shim:ds:Col
  var ds_Col_exports = {};
  __export(ds_Col_exports, {
    default: () => ds_Col_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Col_exports, __toESM(require_ds_raw()));
  var g3 = window.Tedi;
  var ds_Col_default = g3["Col"] !== void 0 ? g3["Col"] : g3;

  // ds-shim:ds:Row
  var ds_Row_exports = {};
  __export(ds_Row_exports, {
    default: () => ds_Row_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Row_exports, __toESM(require_ds_raw()));
  var g4 = window.Tedi;
  var ds_Row_default = g4["Row"] !== void 0 ? g4["Row"] : g4;

  // src/tedi/components/layout/grid/col.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    title: "Tedi-Ready/Layout/Grid/Col",
    component: ds_Col_exports.Col,
    subcomponents: { Row: ds_Row_exports.Row },
    parameters: {
      status: { type: "devComponent" }
    }
  };
  var col_stories_default = meta;
  var Default = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 2, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0.5, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Heading_exports.Heading, { element: "h4", children: "Label/Value pairs" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Row_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Col_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Row_exports.Row, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Col_exports.Col, { element: "dt", width: 2, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Label" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Col_exports.Col, { element: "dd", children: "Value" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Row_exports.Row, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Col_exports.Col, { element: "dt", width: 2, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Label" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Col_exports.Col, { element: "dd", children: "Value" })
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0.5, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Heading_exports.Heading, { element: "h4", children: "Lists" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Row_exports.Row, { element: "ul", direction: "column", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Col_exports.Col, { children: "Item 1" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Col_exports.Col, { children: "Item 2" })
      ] })
    ] })
  ] });

  // .design-sync/.cache/previews/Col.tsx
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
    compose(col_stories_exports, "Default")
  );
  return __toCommonJS(Col_exports);
})();
