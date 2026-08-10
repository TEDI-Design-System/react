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

  // .design-sync/.cache/previews/Breadcrumbs.tsx
  var Breadcrumbs_exports = {};
  __export(Breadcrumbs_exports, {
    Condensed: () => Condensed2,
    CustomAriaLabel: () => CustomAriaLabel2,
    CustomSeparator: () => CustomSeparator2,
    Default: () => Default2,
    Long: () => Long2,
    ResponsiveVariant: () => ResponsiveVariant2,
    Short: () => Short2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/navigation/breadcrumbs/breadcrumbs.stories.tsx
  var breadcrumbs_stories_exports = {};
  __export(breadcrumbs_stories_exports, {
    Condensed: () => Condensed,
    CustomAriaLabel: () => CustomAriaLabel,
    CustomSeparator: () => CustomSeparator,
    Default: () => Default,
    Long: () => Long,
    ResponsiveVariant: () => ResponsiveVariant,
    Short: () => Short,
    default: () => breadcrumbs_stories_default
  });
  init_define_import_meta_env();
  init_define_process_env();

  // ds-shim:ds:Icon
  var ds_Icon_exports = {};
  __export(ds_Icon_exports, {
    default: () => ds_Icon_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Icon_exports, __toESM(require_ds_raw()));
  var g = window.Tedi;
  var ds_Icon_default = g["Icon"] !== void 0 ? g["Icon"] : g;

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

  // ds-shim:ds:Link
  var ds_Link_exports = {};
  __export(ds_Link_exports, {
    default: () => ds_Link_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Link_exports, __toESM(require_ds_raw()));
  var g3 = window.Tedi;
  var ds_Link_default = g3["Link"] !== void 0 ? g3["Link"] : g3;

  // ds-shim:ds:Breadcrumbs
  var ds_Breadcrumbs_exports = {};
  __export(ds_Breadcrumbs_exports, {
    default: () => ds_Breadcrumbs_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Breadcrumbs_exports, __toESM(require_ds_raw()));
  var g4 = window.Tedi;
  var ds_Breadcrumbs_default = g4["Breadcrumbs"] !== void 0 ? g4["Breadcrumbs"] : g4;

  // src/tedi/components/navigation/breadcrumbs/breadcrumbs.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var separatorOptions = {
    Chevron: void 0,
    Slash: "/",
    Arrow: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "arrow_forward", color: "inherit", size: 16, "aria-hidden": true }),
    Dash: "—",
    Dot: "·"
  };
  var breadcrumbs_stories_default = {
    title: "TEDI-Ready/Components/Navigation/Breadcrumbs",
    component: ds_Breadcrumbs_default,
    argTypes: {
      separator: {
        description: "Node rendered between crumbs. Pass a string for text separators (e.g. `/` or `›`) or any React node for custom markup. Hidden from assistive technology — screen readers announce only the crumbs themselves.",
        control: { type: "select" },
        options: Object.keys(separatorOptions),
        mapping: separatorOptions,
        table: {
          type: { summary: "ReactNode" },
          defaultValue: { summary: '<Icon name="chevron_right" size={16} color="brand" />' }
        }
      }
    },
    parameters: {
      status: {
        type: [{ name: "breakpointSupport", url: "?path=/docs/helpers-usebreakpointprops--usebreakpointprops" }]
      },
      controls: {
        exclude: ["sm", "md", "lg", "xl", "xxl"]
      },
      design: {
        type: "figma",
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.70?node-id=2409-21799&m=dev"
      }
    }
  };
  var Template = (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Breadcrumbs_default, { ...args });
  var Default = {
    render: Template,
    args: {
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", children: "Dashboard" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", children: "Applications" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-current": "page", children: "Application nr 506" })
      ] })
    }
  };
  var Long = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Breadcrumbs_default, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", children: "Dashboard" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", children: "Applications" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-current": "page", children: "Application nr 506" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Breadcrumbs_default, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", children: "Dashboard" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", children: "Documents" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", children: "My documents" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", children: "Application nr 506" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-current": "page", children: "Restrictions" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Breadcrumbs_default, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", children: "Medications" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-current": "page", children: "Ibuprofen" })
      ] })
    ] })
  };
  var Short = {
    render: Template,
    args: {
      variant: "short",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", children: "Dashboard" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-current": "page", children: "Current page" })
      ] })
    }
  };
  var CustomAriaLabel = {
    render: Template,
    args: {
      ariaLabel: "Site path",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", children: "Dashboard" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", children: "Documents" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-current": "page", children: "Restrictions" })
      ] })
    }
  };
  var Condensed = {
    render: Template,
    args: {
      maxItems: 4,
      itemsBeforeCollapse: 1,
      itemsAfterCollapse: 2,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", children: "Dashboard" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", children: "Patients" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", children: "Anna Tamm" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", children: "Visits" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", children: "2024-05-12" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-current": "page", children: "Restrictions" })
      ] })
    }
  };
  var ResponsiveVariant = {
    render: Template,
    args: {
      variant: "short",
      md: { variant: "long" },
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", children: "Dashboard" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", children: "Documents" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", children: "My documents" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", children: "Application nr 506" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-current": "page", children: "Restrictions" })
      ] })
    }
  };
  var CustomSeparator = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Breadcrumbs_default, { separator: "/", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", children: "Dashboard" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", children: "Documents" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-current": "page", children: "Restrictions" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Breadcrumbs_default, { separator: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "arrow_forward", color: "inherit", size: 16, "aria-hidden": true }), children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", children: "Dashboard" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", children: "Documents" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-current": "page", children: "Restrictions" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Breadcrumbs_default, { separator: "—", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", children: "Dashboard" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", children: "Documents" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-current": "page", children: "Restrictions" })
      ] })
    ] })
  };

  // .design-sync/.cache/previews/Breadcrumbs.tsx
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
    compose(breadcrumbs_stories_exports, "Default")
  );
  var Long2 = (
    /* Long */
    compose(breadcrumbs_stories_exports, "Long")
  );
  var Short2 = (
    /* Short */
    compose(breadcrumbs_stories_exports, "Short")
  );
  var CustomAriaLabel2 = (
    /* Custom Aria Label */
    compose(breadcrumbs_stories_exports, "CustomAriaLabel")
  );
  var Condensed2 = (
    /* Condensed */
    compose(breadcrumbs_stories_exports, "Condensed")
  );
  var ResponsiveVariant2 = (
    /* Responsive Variant */
    compose(breadcrumbs_stories_exports, "ResponsiveVariant")
  );
  var CustomSeparator2 = (
    /* Custom Separator */
    compose(breadcrumbs_stories_exports, "CustomSeparator")
  );
  return __toCommonJS(Breadcrumbs_exports);
})();
