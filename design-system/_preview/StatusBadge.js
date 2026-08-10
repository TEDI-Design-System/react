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

  // .design-sync/.cache/previews/StatusBadge.tsx
  var StatusBadge_exports = {};
  __export(StatusBadge_exports, {
    Colors: () => Colors2,
    Default: () => Default2,
    Sizes: () => Sizes2,
    StatusIndicator: () => StatusIndicator2,
    WithTooltip: () => WithTooltip2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/tags/status-badge/status-badge.stories.tsx
  var status_badge_stories_exports = {};
  __export(status_badge_stories_exports, {
    Colors: () => Colors,
    Default: () => Default,
    Sizes: () => Sizes,
    StatusIndicator: () => StatusIndicator,
    WithTooltip: () => WithTooltip,
    default: () => status_badge_stories_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  var import_jsx_runtime = __toESM(require_react_shim());

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

  // ds-shim:ds:VerticalSpacing
  var ds_VerticalSpacing_exports = {};
  __export(ds_VerticalSpacing_exports, {
    default: () => ds_VerticalSpacing_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_VerticalSpacing_exports, __toESM(require_ds_raw()));
  var g4 = window.Tedi;
  var ds_VerticalSpacing_default = g4["VerticalSpacing"] !== void 0 ? g4["VerticalSpacing"] : g4;

  // ds-shim:ds:Tooltip
  var ds_Tooltip_exports = {};
  __export(ds_Tooltip_exports, {
    default: () => ds_Tooltip_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Tooltip_exports, __toESM(require_ds_raw()));
  var g5 = window.Tedi;
  var ds_Tooltip_default = g5["Tooltip"] !== void 0 ? g5["Tooltip"] : g5;

  // ds-shim:ds:StatusBadge
  var ds_StatusBadge_exports = {};
  __export(ds_StatusBadge_exports, {
    default: () => ds_StatusBadge_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_StatusBadge_exports, __toESM(require_ds_raw()));
  var g6 = window.Tedi;
  var ds_StatusBadge_default = g6["StatusBadge"] !== void 0 ? g6["StatusBadge"] : g6;

  // src/tedi/components/tags/status-badge/status-badge.stories.tsx
  var import_jsx_runtime2 = __toESM(require_react_shim());
  var meta = {
    component: ds_StatusBadge_exports.StatusBadge,
    title: "Tedi-Ready/Components/Tag/StatusBadge",
    parameters: {
      status: {
        type: [{ name: "breakpointSupport", url: "?path=/docs/helpers-usebreakpointprops--usebreakpointprops" }]
      },
      controls: {
        exclude: ["sm", "md", "lg", "xl", "xxl"]
      },
      design: {
        type: "figma",
        url: "https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2385-24154&m=dev"
      }
    }
  };
  var status_badge_stories_default = meta;
  var colors = ["neutral", "brand", "accent", "warning", "danger", "success"];
  var variants = ["filled", "filled-bordered", "bordered"];
  var statuses = ["inactive", "success", "warning", "danger"];
  var sizeArray = ["default", "large"];
  var colorToIconMap = {
    neutral: "edit",
    brand: "send",
    accent: "sync",
    success: "check",
    danger: "error",
    warning: "warning",
    transparent: "edit"
  };
  var statusToIconMap = {
    inactive: "edit",
    success: "send",
    warning: "sync",
    danger: "error"
  };
  var Template = (args) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_StatusBadge_exports.StatusBadge, { ...args });
  var Default = {
    render: Template,
    args: {
      color: "neutral",
      variant: "filled",
      children: "Text"
    }
  };
  var TemplateAllCombos = (args) => {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "badge-grid", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1, children: colors.map((color) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Row, { className: "mb-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { md: 2, className: "d-flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: color.charAt(0).toUpperCase() + color.slice(1) }) }),
      variants.map((variant) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_StatusBadge_exports.StatusBadge, { ...args, color, variant, children: "Text" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_StatusBadge_exports.StatusBadge, { ...args, color, variant, icon: colorToIconMap[color], children: "Text" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_StatusBadge_exports.StatusBadge, { ...args, color, variant, icon: colorToIconMap[color] }) })
      ] }, variant))
    ] }, color)) }) });
  };
  var TemplateStatusGrid = (args) => {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "badge-grid", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1, children: statuses.map((status) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Row, { className: "mb-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { md: 2, className: "d-flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: status?.charAt(0).toUpperCase() + status.slice(1) }) }),
      variants.map((variant) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_StatusBadge_exports.StatusBadge, { ...args, color: "neutral", variant, status, children: "Text" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          ds_StatusBadge_exports.StatusBadge,
          {
            ...args,
            color: "neutral",
            variant,
            icon: statusToIconMap[status],
            status,
            children: "Text"
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          ds_StatusBadge_exports.StatusBadge,
          {
            ...args,
            color: "neutral",
            variant,
            icon: statusToIconMap[status],
            status
          }
        ) })
      ] }, variant))
    ] }, status)) }) });
  };
  var TemplateColumn = (args) => {
    const { array } = args;
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "example-list", children: array.map((value, key) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Row, { className: `${key === array.length - 1 ? "" : "border-bottom"} padding-14-16`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { width: 6, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: value ? value.charAt(0).toUpperCase() + value.slice(1) : "" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Col, { className: "flex gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_StatusBadge_exports.StatusBadge, { ...args, color: "neutral", size: array[key] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_StatusBadge_exports.StatusBadge, { ...args, color: "neutral", size: array[key], status: "success" })
      ] })
    ] }, key)) });
  };
  var Sizes = {
    render: TemplateColumn,
    args: {
      array: sizeArray,
      children: "Draft",
      color: "neutral"
    }
  };
  var Colors = {
    render: TemplateAllCombos
  };
  var StatusIndicator = {
    render: TemplateStatusGrid,
    args: {
      color: "neutral"
    }
  };
  var WithTooltip = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(ds_Tooltip_exports.Tooltip, { placement: "top", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Tooltip_exports.Tooltip.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_StatusBadge_exports.StatusBadge, { color: "warning", icon: "warning" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Tooltip_exports.Tooltip.Content, { children: "Icon-only badges should always have a tooltip to provide context and ensure accessibility." })
    ] });
  };

  // .design-sync/.cache/previews/StatusBadge.tsx
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
    compose(status_badge_stories_exports, "Default")
  );
  var Sizes2 = (
    /* Sizes */
    compose(status_badge_stories_exports, "Sizes")
  );
  var Colors2 = (
    /* Colors */
    compose(status_badge_stories_exports, "Colors")
  );
  var StatusIndicator2 = (
    /* Status Indicator */
    compose(status_badge_stories_exports, "StatusIndicator")
  );
  var WithTooltip2 = (
    /* With Tooltip */
    compose(status_badge_stories_exports, "WithTooltip")
  );
  return __toCommonJS(StatusBadge_exports);
})();
