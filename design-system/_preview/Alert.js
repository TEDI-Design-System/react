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

  // .design-sync/.cache/previews/Alert.tsx
  var Alert_exports = {};
  __export(Alert_exports, {
    AlertTypes: () => AlertTypes2,
    Default: () => Default2,
    Global: () => Global2,
    Headless: () => Headless2,
    Sizes: () => Sizes2,
    WithActionButton: () => WithActionButton2,
    WithCloseButton: () => WithCloseButton2,
    WithIcon: () => WithIcon2,
    WithTitleLongTextAndClosingButton: () => WithTitleLongTextAndClosingButton2,
    WithoutSideBorders: () => WithoutSideBorders2,
    WithoutTitleLongText: () => WithoutTitleLongText2,
    WithoutTitleLongTextAndClosingButton: () => WithoutTitleLongTextAndClosingButton2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/notifications/alert/alert.stories.tsx
  var alert_stories_exports = {};
  __export(alert_stories_exports, {
    AlertTypes: () => AlertTypes,
    Default: () => Default,
    Global: () => Global,
    Headless: () => Headless,
    Sizes: () => Sizes,
    WithActionButton: () => WithActionButton,
    WithCloseButton: () => WithCloseButton,
    WithIcon: () => WithIcon,
    WithTitleLongTextAndClosingButton: () => WithTitleLongTextAndClosingButton,
    WithoutSideBorders: () => WithoutSideBorders,
    WithoutTitleLongText: () => WithoutTitleLongText,
    WithoutTitleLongTextAndClosingButton: () => WithoutTitleLongTextAndClosingButton,
    default: () => alert_stories_default
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
  var g3 = window.Tedi;
  var ds_Row_default = g3["Row"] !== void 0 ? g3["Row"] : g3;

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
  var g4 = window.Tedi;
  var ds_Col_default = g4["Col"] !== void 0 ? g4["Col"] : g4;

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
  var g5 = window.Tedi;
  var ds_VerticalSpacing_default = g5["VerticalSpacing"] !== void 0 ? g5["VerticalSpacing"] : g5;

  // ds-shim:ds:Link
  var ds_Link_exports = {};
  __export(ds_Link_exports, {
    default: () => ds_Link_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Link_exports, __toESM(require_ds_raw()));
  var g6 = window.Tedi;
  var ds_Link_default = g6["Link"] !== void 0 ? g6["Link"] : g6;

  // ds-shim:ds:Alert
  var ds_Alert_exports = {};
  __export(ds_Alert_exports, {
    default: () => ds_Alert_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Alert_exports, __toESM(require_ds_raw()));
  var g7 = window.Tedi;
  var ds_Alert_default = g7["Alert"] !== void 0 ? g7["Alert"] : g7;

  // src/tedi/components/notifications/alert/alert.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    component: ds_Alert_default,
    title: "TEDI-Ready/Components/Notifications/Alert",
    parameters: {
      status: {
        type: [{ name: "breakpointSupport", url: "?path=/docs/helpers-usebreakpointprops--usebreakpointprops" }]
      },
      controls: {
        exclude: ["sm", "md", "lg", "xl", "xxl"]
      },
      design: {
        type: "figma",
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4263-61880&m=dev"
      }
    }
  };
  var alert_stories_default = meta;
  var alertTypes = [
    { type: "info", icon: "info" },
    { type: "success", icon: "check_circle" },
    { type: "warning", icon: "warning" },
    { type: "danger", icon: "error" }
  ];
  var sizeArray = ["default", "small"];
  var TypesTemplate = (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1, children: alertTypes.map(({ type, icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Alert_default, { type, icon, ...args, children: [
    "This is a ",
    type,
    " alert."
  ] }, type)) });
  var TemplateColumn = (args) => {
    const { array, ...alertProps } = args;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "example-list", children: array.map((value, key) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { className: `${key === array.length - 1 ? "" : "border-bottom"} padding-14-16`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: 2, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: value ? value.charAt(0).toUpperCase() + value.slice(1) : "" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { className: "d-flex", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Alert_default, { ...alertProps, size: array[key], children: "Content description" }, alertProps.type) })
    ] }, key)) });
  };
  var Template = (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Alert_default, { ...args });
  var Default = {
    args: {
      title: "Title",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        "Content description. ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_default, { href: "#", children: "Inline link example" })
      ] })
    }
  };
  var WithAndWithoutHeading = (args) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Alert_default, { title: "Title", ...args, children: args.children }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Alert_default, { ...args, children: args.children })
    ] });
  };
  var Sizes = {
    render: TemplateColumn,
    args: {
      array: sizeArray,
      type: "info",
      children: "Content description",
      onClose: () => null
    }
  };
  var Headless = {
    render: Template,
    args: {
      children: "Content description"
    }
  };
  var Global = {
    render: WithAndWithoutHeading,
    args: {
      children: "Content description",
      isGlobal: true
    }
  };
  var WithoutSideBorders = {
    render: WithAndWithoutHeading,
    args: {
      children: "Content description",
      noSideBorders: true
    }
  };
  var WithIcon = {
    render: WithAndWithoutHeading,
    args: {
      children: "Content description",
      icon: "check_circle"
    }
  };
  var WithCloseButton = {
    render: WithAndWithoutHeading,
    args: {
      children: "Content description",
      onClose: () => null
    }
  };
  var AlertTypes = {
    render: TypesTemplate,
    args: {
      children: "Content description",
      onClose: () => null
    }
  };
  var WithoutTitleLongText = {
    args: {
      children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque facilisis nisi purus, quis bibendum lectus finibus in. Sed sed tellus eu augue finibus efficitur sit amet a velit. Donec vitae ex et ligula commodo luctus. Phasellus accumsan ligula quis nibh hendrerit, ac rutrum velit dictum. Curabitur ut vulputate justo. Proin eu sapien tellus. Morbi quis dapibus felis. Quisque commodo tempus vulputate.",
      type: "warning",
      icon: "warning"
    },
    render: (args) => {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Alert_default, { ...args });
    }
  };
  var WithoutTitleLongTextAndClosingButton = {
    args: {
      children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque facilisis nisi purus, quis bibendum lectus finibus in. Sed sed tellus eu augue finibus efficitur sit amet a velit. Donec vitae ex et ligula commodo luctus. Phasellus accumsan ligula quis nibh hendrerit, ac rutrum velit dictum. Curabitur ut vulputate justo. Proin eu sapien tellus. Morbi quis dapibus felis. Quisque commodo tempus vulputate.",
      type: "info",
      icon: "info",
      onClose: () => null
    },
    render: (args) => {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Alert_default, { ...args });
    }
  };
  var WithTitleLongTextAndClosingButton = {
    args: {
      children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque facilisis nisi purus, quis bibendum lectus finibus in. Sed sed tellus eu augue finibus efficitur sit amet a velit. Donec vitae ex et ligula commodo luctus. Phasellus accumsan ligula quis nibh hendrerit, ac rutrum velit dictum. Curabitur ut vulputate justo. Proin eu sapien tellus. Morbi quis dapibus felis. Quisque commodo tempus vulputate.",
      type: "danger",
      title: "Title",
      icon: "error",
      onClose: () => null
    },
    render: (args) => {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Alert_default, { ...args });
    }
  };
  var WithActionButton = {
    args: {
      type: "warning",
      icon: "warning",
      children: "Your account is missing a profile photo — add one so colleagues can recognise you in shared documents.",
      action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", iconRight: "arrow_forward", children: "Open profile" })
    }
  };

  // .design-sync/.cache/previews/Alert.tsx
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
    compose(alert_stories_exports, "Default")
  );
  var Sizes2 = (
    /* Sizes */
    compose(alert_stories_exports, "Sizes")
  );
  var Headless2 = (
    /* Headless */
    compose(alert_stories_exports, "Headless")
  );
  var Global2 = (
    /* Global */
    compose(alert_stories_exports, "Global")
  );
  var WithoutSideBorders2 = (
    /* Without Side Borders */
    compose(alert_stories_exports, "WithoutSideBorders")
  );
  var WithIcon2 = (
    /* With Icon */
    compose(alert_stories_exports, "WithIcon")
  );
  var WithCloseButton2 = (
    /* With Close Button */
    compose(alert_stories_exports, "WithCloseButton")
  );
  var AlertTypes2 = (
    /* Alert Types */
    compose(alert_stories_exports, "AlertTypes")
  );
  var WithoutTitleLongText2 = (
    /* Without Title Long Text */
    compose(alert_stories_exports, "WithoutTitleLongText")
  );
  var WithoutTitleLongTextAndClosingButton2 = (
    /* Without Title Long Text And Closing Button */
    compose(alert_stories_exports, "WithoutTitleLongTextAndClosingButton")
  );
  var WithTitleLongTextAndClosingButton2 = (
    /* With Title Long Text And Closing Button */
    compose(alert_stories_exports, "WithTitleLongTextAndClosingButton")
  );
  var WithActionButton2 = (
    /* With Action Button */
    compose(alert_stories_exports, "WithActionButton")
  );
  return __toCommonJS(Alert_exports);
})();
