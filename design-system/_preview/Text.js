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

  // .design-sync/.cache/previews/Text.tsx
  var Text_exports = {};
  __export(Text_exports, {
    BodyText: () => BodyText2,
    Default: () => Default2,
    GeneralText: () => GeneralText2,
    StatusText: () => StatusText2,
    Subtitles: () => Subtitles2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/base/typography/text/text.stories.tsx
  var text_stories_exports = {};
  __export(text_stories_exports, {
    BodyText: () => BodyText,
    Default: () => Default,
    GeneralText: () => GeneralText,
    StatusText: () => StatusText,
    Subtitles: () => Subtitles,
    default: () => text_stories_default
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

  // ds-shim:ds:Text
  var ds_Text_exports = {};
  __export(ds_Text_exports, {
    default: () => ds_Text_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Text_exports, __toESM(require_ds_raw()));
  var g4 = window.Tedi;
  var ds_Text_default = g4["Text"] !== void 0 ? g4["Text"] : g4;

  // src/tedi/components/base/typography/text/text.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    component: ds_Text_exports.Text,
    title: "Tedi-Ready/Base/Typography/Text",
    parameters: {
      design: {
        type: "figma",
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?node-id=115-11630&m=dev"
      },
      status: {
        type: "mobileViewDifference"
      }
    }
  };
  var text_stories_default = meta;
  var TemplateSubtitles = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "example-list w-100", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { className: "border-bottom padding-14-16", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: "primary", modifiers: "subtitle", children: "Subtitle" }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { className: "border-bottom padding-14-16", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: "primary", modifiers: ["subtitle", "small"], children: "Subtitle Small" }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { className: "border-bottom padding-14-16", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: "secondary", element: "label", children: "Label" }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { className: "padding-14-16", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "label", modifiers: "bold", children: "Label bold" }) }) })
  ] });
  var TemplateBodyText = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "example-list w-100", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { className: "border-bottom padding-14-16", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Body Regular" }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { className: "border-bottom padding-14-16", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Body bold" }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { className: "border-bottom padding-14-16", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "italic", children: "Body italic" }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { className: "border-bottom padding-14-16", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "small", children: "Small" }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { className: "border-bottom padding-14-16", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: ["small", "bold"], children: "Small bold" }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { className: "border-bottom padding-14-16", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: ["small", "italic"], children: "Small italic" }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { className: "border-bottom padding-14-16", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: ["extra-small"], children: "Extra small" }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { className: "padding-14-16", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: ["extra-small", "bold"], children: "Small bold" }) }) })
  ] });
  var TemplateGeneralText = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: "primary", children: "Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid." }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: "secondary", children: "Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid." }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: "tertiary", children: "Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid." }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: "brand", children: "Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid." }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { className: "bg bg-primary", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: "white", children: "Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid." }) }) })
  ] });
  var TemplateStatusText = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: "success", children: "Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid." }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: "warning", children: "Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid." }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: "danger", children: "Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid." }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: "info", children: "Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid." }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: "neutral", children: "Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid." }) }) })
  ] });
  var Default = {
    args: {
      children: "Text"
    }
  };
  var BodyText = {
    render: TemplateBodyText,
    name: "Body"
  };
  var Subtitles = {
    render: TemplateSubtitles
  };
  var GeneralText = {
    render: TemplateGeneralText,
    name: "General text colors"
  };
  var StatusText = {
    render: TemplateStatusText,
    name: "Status text colors"
  };

  // .design-sync/.cache/previews/Text.tsx
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
    compose(text_stories_exports, "Default")
  );
  var BodyText2 = (
    /* Body */
    compose(text_stories_exports, "BodyText")
  );
  var Subtitles2 = (
    /* Subtitles */
    compose(text_stories_exports, "Subtitles")
  );
  var GeneralText2 = (
    /* General text colors */
    compose(text_stories_exports, "GeneralText")
  );
  var StatusText2 = (
    /* Status text colors */
    compose(text_stories_exports, "StatusText")
  );
  return __toCommonJS(Text_exports);
})();
