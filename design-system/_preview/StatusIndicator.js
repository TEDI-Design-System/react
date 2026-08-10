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

  // .design-sync/.cache/previews/StatusIndicator.tsx
  var StatusIndicator_exports = {};
  __export(StatusIndicator_exports, {
    AllVariants: () => AllVariants2,
    Default: () => Default2,
    Examples: () => Examples2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/tags/status-indicator/status-indicator.stories.tsx
  var status_indicator_stories_exports = {};
  __export(status_indicator_stories_exports, {
    AllVariants: () => AllVariants,
    Default: () => Default,
    Examples: () => Examples,
    default: () => status_indicator_stories_default
  });
  init_define_import_meta_env();
  init_define_process_env();

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
  var g2 = window.Tedi;
  var ds_Row_default = g2["Row"] !== void 0 ? g2["Row"] : g2;

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
  var g3 = window.Tedi;
  var ds_Col_default = g3["Col"] !== void 0 ? g3["Col"] : g3;

  // src/tedi/components/layout/grid/index.ts
  __reExport(grid_exports, ds_Col_exports);

  // ds-shim:ds:StatusIndicator
  var ds_StatusIndicator_exports = {};
  __export(ds_StatusIndicator_exports, {
    default: () => ds_StatusIndicator_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_StatusIndicator_exports, __toESM(require_ds_raw()));
  var g4 = window.Tedi;
  var ds_StatusIndicator_default = g4["StatusIndicator"] !== void 0 ? g4["StatusIndicator"] : g4;

  // src/tedi/components/tags/status-indicator/status-indicator.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    component: ds_StatusIndicator_exports.StatusIndicator,
    title: "TEDI-Ready/Components/Helpers/StatusIndicator",
    parameters: {
      design: {
        type: "figma",
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.38.59?node-id=2405-53326&m=dev"
      }
    }
  };
  var status_indicator_stories_default = meta;
  var Default = {
    args: {
      type: "success",
      size: "sm",
      hasBorder: false
    }
  };
  var types = ["success", "danger", "warning", "inactive"];
  var sizes = ["sm", "lg"];
  var AllVariants = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
      sizes.map((size) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { className: "padding-14-16", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: 2, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: size === "sm" ? "Small" : "Large" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { className: "flex align-items-center gap-3", children: types.map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusIndicator_exports.StatusIndicator, { type, size }, type)) })
      ] }, size)),
      sizes.map((size) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { className: "padding-14-16", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: 2, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: size === "sm" ? "Small bordered" : "Large bordered" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { className: "flex align-items-center gap-3", children: types.map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusIndicator_exports.StatusIndicator, { type, size, hasBorder: true }, type)) })
      ] }, `${size}-bordered`))
    ] })
  };
  var Examples = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { position: "relative" }, children: [
      "Lugemata teated ",
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusIndicator_exports.StatusIndicator, { type: "danger", position: "top-right" })
    ] })
  };

  // .design-sync/.cache/previews/StatusIndicator.tsx
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
    compose(status_indicator_stories_exports, "Default")
  );
  var AllVariants2 = (
    /* All Variants */
    compose(status_indicator_stories_exports, "AllVariants")
  );
  var Examples2 = (
    /* Examples */
    compose(status_indicator_stories_exports, "Examples")
  );
  return __toCommonJS(StatusIndicator_exports);
})();
