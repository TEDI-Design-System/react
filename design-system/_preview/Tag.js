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

  // .design-sync/.cache/previews/Tag.tsx
  var Tag_exports = {};
  __export(Tag_exports, {
    Danger: () => Danger2,
    Default: () => Default2,
    Ellipsis: () => Ellipsis2,
    Primary: () => Primary2,
    Secondary: () => Secondary2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/tags/tag/tag.stories.tsx
  var tag_stories_exports = {};
  __export(tag_stories_exports, {
    Danger: () => Danger,
    Default: () => Default,
    Ellipsis: () => Ellipsis,
    Primary: () => Primary,
    Secondary: () => Secondary,
    default: () => tag_stories_default
  });
  init_define_import_meta_env();
  init_define_process_env();

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

  // ds-shim:ds:Tag
  var ds_Tag_exports = {};
  __export(ds_Tag_exports, {
    default: () => ds_Tag_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Tag_exports, __toESM(require_ds_raw()));
  var g3 = window.Tedi;
  var ds_Tag_default = g3["Tag"] !== void 0 ? g3["Tag"] : g3;

  // src/tedi/components/tags/tag/tag.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var tag_stories_default = {
    title: "Tedi-Ready/Components/Tag/Tag",
    component: ds_Tag_exports.Tag,
    parameters: {
      status: {
        type: [{ name: "breakpointSupport", url: "?path=/docs/helpers-usebreakpointprops--usebreakpointprops" }]
      },
      controls: {
        exclude: ["sm", "md", "lg", "xl", "xxl"]
      },
      design: {
        type: "figma",
        url: "https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2405-49832&m=dev"
      }
    }
  };
  var Template = (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tag_exports.Tag, { ...args });
  var ColorTemplate = (args) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { justifyContent: "start", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tag_exports.Tag, { color: args.color, children: args.children }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tag_exports.Tag, { color: args.color, onClose: args.onClose, children: args.children }) }),
      args.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tag_exports.Tag, { color: args.color, isLoading: args.isLoading, children: args.children }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: 2, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tag_exports.Tag, { isLoading: true, color: args.color, children: "Tag with a very long text but little room" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: 2, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tag_exports.Tag, { color: args.color, onClose: args.onClose, children: "Tag with a very long text but little room" }) })
    ] });
  };
  var Default = {
    render: Template,
    args: {
      color: "primary",
      children: "Tag"
    }
  };
  var Primary = {
    render: ColorTemplate,
    args: {
      onClose: (e) => console.log("Close button clicked", e),
      isLoading: true,
      color: "primary",
      children: "Tag"
    }
  };
  var Secondary = {
    render: ColorTemplate,
    args: {
      onClose: (e) => console.log("Close button clicked", e),
      isLoading: true,
      color: "secondary",
      children: "Tag"
    }
  };
  var Danger = {
    render: ColorTemplate,
    args: {
      onClose: (e) => console.log("Close button clicked", e),
      color: "danger",
      children: "Tag"
    }
  };
  var Ellipsis = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: "0.5rem", width: "7rem" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tag_exports.Tag, { onClose: (e) => console.log("Close button clicked", e), children: "A fairly long tag label that wraps" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tag_exports.Tag, { onClose: (e) => console.log("Close button clicked", e), ellipsis: "end", children: "A fairly long tag label, end" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tag_exports.Tag, { onClose: (e) => console.log("Close button clicked", e), ellipsis: "start", children: "start, a fairly long tag label" })
    ] })
  };

  // .design-sync/.cache/previews/Tag.tsx
  function compose(S, key) {
    const meta = S.default ?? {};
    const st = S[key];
    const args = { ...meta.args ?? {}, ...st && st.args ? st.args : {} };
    const at = { ...meta.argTypes ?? {}, ...st && st.argTypes ? st.argTypes : {} };
    for (const k of Object.keys(args)) {
      const m = at[k] && at[k].mapping;
      if (m && typeof m === "object" && args[k] in m) args[k] = m[args[k]];
    }
    const title = typeof meta.title === "string" ? meta.title : "";
    const ctx = {
      args,
      name: key,
      title,
      kind: title,
      id: "",
      componentId: "",
      globals: { ...GLOBAL_DEFAULTS, ...meta.globals ?? {}, ...(st && st.globals) ?? {} },
      viewMode: "story",
      parameters: (st && st.parameters) ?? meta.parameters ?? {}
    };
    let render = null;
    if (st && typeof st.render === "function") render = () => st.render(args, ctx);
    else if (typeof st === "function") render = () => st(args, ctx);
    else if (typeof meta.render === "function") render = () => meta.render(args, ctx);
    else {
      const C = st && st.component || meta.component;
      if (C) render = () => React.createElement(C, args);
    }
    if (!render) return () => null;
    const decorators = [].concat((st && st.decorators) ?? []).concat(meta.decorators ?? []);
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
    compose(tag_stories_exports, "Default")
  );
  var Primary2 = (
    /* Primary */
    compose(tag_stories_exports, "Primary")
  );
  var Secondary2 = (
    /* Secondary */
    compose(tag_stories_exports, "Secondary")
  );
  var Danger2 = (
    /* Danger */
    compose(tag_stories_exports, "Danger")
  );
  var Ellipsis2 = (
    /* Ellipsis */
    compose(tag_stories_exports, "Ellipsis")
  );
  return __toCommonJS(Tag_exports);
})();
