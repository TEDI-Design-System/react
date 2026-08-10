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
      function jsxs(t, p, k) {
        return R.createElement.apply(R, [t, np(p, k)].concat(p.children));
      }
      module.exports = R;
      module.exports.jsx = jsx2;
      module.exports.jsxs = jsxs;
      module.exports.jsxDEV = function(t, p, k, s) {
        return (s ? jsxs : jsx2)(t, p, k);
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

  // .design-sync/.cache/previews/Label.tsx
  var Label_exports = {};
  __export(Label_exports, {
    Default: () => Default2,
    DefaultBold: () => DefaultBold2,
    DefaultSmall: () => DefaultSmall2,
    DefaultSmallBold: () => DefaultSmallBold2,
    InfoButtonStory: () => InfoButtonStory2,
    Required: () => Required2,
    RequiredBold: () => RequiredBold2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/content/label/label.stories.tsx
  var label_stories_exports = {};
  __export(label_stories_exports, {
    Default: () => Default,
    DefaultBold: () => DefaultBold,
    DefaultSmall: () => DefaultSmall,
    DefaultSmallBold: () => DefaultSmallBold,
    InfoButtonStory: () => InfoButtonStory,
    Required: () => Required,
    RequiredBold: () => RequiredBold,
    default: () => label_stories_default
  });
  init_define_import_meta_env();
  init_define_process_env();

  // ds-shim:ds:Label
  var ds_Label_exports = {};
  __export(ds_Label_exports, {
    default: () => ds_Label_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Label_exports, __toESM(require_ds_raw()));
  var g = window.Tedi;
  var ds_Label_default = g["Label"] !== void 0 ? g["Label"] : g;

  // src/tedi/components/content/label/label.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    component: ds_Label_exports.Label,
    title: "TEDI-Ready/Content/Label",
    parameters: {
      status: {
        type: [{ name: "breakpointSupport", url: "?path=/docs/helpers-usebreakpointprops--usebreakpointprops" }]
      },
      controls: {
        exclude: ["sm", "md", "lg", "xl", "xxl"]
      },
      design: {
        type: "figma",
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=2137-19322&m=dev"
      }
    }
  };
  var label_stories_default = meta;
  var Template = (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Label_exports.Label, { ...args });
  var Default = {
    render: Template,
    args: {
      children: "Toimeaine"
    }
  };
  var Required = {
    render: Template,
    name: "Required field",
    args: {
      children: "Toimeaine",
      required: true
    }
  };
  var DefaultBold = {
    render: Template,
    name: "Bold",
    args: {
      children: "Toimeaine",
      isBold: true
    }
  };
  var RequiredBold = {
    render: Template,
    name: "Bold Required field",
    args: {
      children: "Toimeaine",
      required: true,
      isBold: true
    }
  };
  var InfoButtonStory = {
    render: Template,
    args: {
      children: "Toimeaine",
      required: true,
      tooltip: "Lisainfo"
    }
  };
  var DefaultSmall = {
    render: Template,
    args: {
      children: "Toimeaine",
      isSmall: true
    }
  };
  var DefaultSmallBold = {
    render: Template,
    args: {
      children: "Toimeaine",
      isBold: true,
      isSmall: true
    }
  };

  // .design-sync/.cache/previews/Label.tsx
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
    compose(label_stories_exports, "Default")
  );
  var Required2 = (
    /* Required field */
    compose(label_stories_exports, "Required")
  );
  var DefaultBold2 = (
    /* Bold */
    compose(label_stories_exports, "DefaultBold")
  );
  var RequiredBold2 = (
    /* Bold Required field */
    compose(label_stories_exports, "RequiredBold")
  );
  var InfoButtonStory2 = (
    /* Info Button Story */
    compose(label_stories_exports, "InfoButtonStory")
  );
  var DefaultSmall2 = (
    /* Default Small */
    compose(label_stories_exports, "DefaultSmall")
  );
  var DefaultSmallBold2 = (
    /* Default Small Bold */
    compose(label_stories_exports, "DefaultSmallBold")
  );
  return __toCommonJS(Label_exports);
})();
