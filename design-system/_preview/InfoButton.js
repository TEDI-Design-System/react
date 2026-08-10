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

  // .design-sync/.cache/previews/InfoButton.tsx
  var InfoButton_exports = {};
  __export(InfoButton_exports, {
    Default: () => Default2,
    Inverted: () => Inverted2,
    States: () => States2,
    UsageWithTooltipAndPopover: () => UsageWithTooltipAndPopover2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/buttons/info-button/info-button.stories.tsx
  var info_button_stories_exports = {};
  __export(info_button_stories_exports, {
    Default: () => Default,
    Inverted: () => Inverted,
    States: () => States,
    UsageWithTooltipAndPopover: () => UsageWithTooltipAndPopover,
    default: () => info_button_stories_default
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

  // ds-shim:ds:Label
  var ds_Label_exports = {};
  __export(ds_Label_exports, {
    default: () => ds_Label_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Label_exports, __toESM(require_ds_raw()));
  var g2 = window.Tedi;
  var ds_Label_default = g2["Label"] !== void 0 ? g2["Label"] : g2;

  // ds-shim:ds:TextGroup
  var ds_TextGroup_exports = {};
  __export(ds_TextGroup_exports, {
    default: () => ds_TextGroup_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_TextGroup_exports, __toESM(require_ds_raw()));
  var g3 = window.Tedi;
  var ds_TextGroup_default = g3["TextGroup"] !== void 0 ? g3["TextGroup"] : g3;

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
  var g4 = window.Tedi;
  var ds_Row_default = g4["Row"] !== void 0 ? g4["Row"] : g4;

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
  var g5 = window.Tedi;
  var ds_Col_default = g5["Col"] !== void 0 ? g5["Col"] : g5;

  // src/tedi/components/layout/grid/index.ts
  __reExport(grid_exports, ds_Col_exports);

  // ds-shim:ds:HideAt
  var ds_HideAt_exports = {};
  __export(ds_HideAt_exports, {
    default: () => ds_HideAt_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_HideAt_exports, __toESM(require_ds_raw()));
  var g6 = window.Tedi;
  var ds_HideAt_default = g6["HideAt"] !== void 0 ? g6["HideAt"] : g6;

  // ds-shim:ds:ShowAt
  var ds_ShowAt_exports = {};
  __export(ds_ShowAt_exports, {
    default: () => ds_ShowAt_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_ShowAt_exports, __toESM(require_ds_raw()));
  var g7 = window.Tedi;
  var ds_ShowAt_default = g7["ShowAt"] !== void 0 ? g7["ShowAt"] : g7;

  // ds-shim:ds:VerticalSpacing
  var ds_VerticalSpacing_exports = {};
  __export(ds_VerticalSpacing_exports, {
    default: () => ds_VerticalSpacing_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_VerticalSpacing_exports, __toESM(require_ds_raw()));
  var g8 = window.Tedi;
  var ds_VerticalSpacing_default = g8["VerticalSpacing"] !== void 0 ? g8["VerticalSpacing"] : g8;

  // ds-shim:ds:Separator
  var ds_Separator_exports = {};
  __export(ds_Separator_exports, {
    default: () => ds_Separator_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Separator_exports, __toESM(require_ds_raw()));
  var g9 = window.Tedi;
  var ds_Separator_default = g9["Separator"] !== void 0 ? g9["Separator"] : g9;

  // ds-shim:ds:Link
  var ds_Link_exports = {};
  __export(ds_Link_exports, {
    default: () => ds_Link_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Link_exports, __toESM(require_ds_raw()));
  var g10 = window.Tedi;
  var ds_Link_default = g10["Link"] !== void 0 ? g10["Link"] : g10;

  // ds-shim:ds:Popover
  var ds_Popover_exports = {};
  __export(ds_Popover_exports, {
    default: () => ds_Popover_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Popover_exports, __toESM(require_ds_raw()));
  var g11 = window.Tedi;
  var ds_Popover_default = g11["Popover"] !== void 0 ? g11["Popover"] : g11;

  // ds-shim:ds:Tooltip
  var ds_Tooltip_exports = {};
  __export(ds_Tooltip_exports, {
    default: () => ds_Tooltip_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Tooltip_exports, __toESM(require_ds_raw()));
  var g12 = window.Tedi;
  var ds_Tooltip_default = g12["Tooltip"] !== void 0 ? g12["Tooltip"] : g12;

  // ds-shim:ds:InfoButton
  var ds_InfoButton_exports = {};
  __export(ds_InfoButton_exports, {
    default: () => ds_InfoButton_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_InfoButton_exports, __toESM(require_ds_raw()));
  var g13 = window.Tedi;
  var ds_InfoButton_default = g13["InfoButton"] !== void 0 ? g13["InfoButton"] : g13;

  // src/tedi/components/buttons/info-button/info-button.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    component: ds_InfoButton_default,
    title: "Tedi-Ready/Components/Buttons/InfoButton",
    parameters: {
      design: {
        type: "figma",
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4514-72997&m=dev"
      },
      controls: { include: ["isSmall", "color", "aria-label"] }
    },
    args: {
      "aria-label": "Rohkem infot"
    }
  };
  var info_button_stories_default = meta;
  var buttonStateArray = ["Default", "Hover", "Active", "Focus"];
  var TemplateColumn = (args) => {
    const { array, color = "default", ...buttonProps } = args;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_VerticalSpacing_exports.VerticalSpacing, { children: array.map((state, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 4, md: 1, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", color: color === "inverted" ? "white" : "primary", children: state }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 2, md: 1, className: "text-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InfoButton_default, { color, ...buttonProps, "aria-label": `Info button ${state}`, id: state }) })
    ] }, index)) });
  };
  var Default = {};
  var States = {
    render: TemplateColumn,
    args: {
      array: buttonStateArray
    },
    parameters: {
      pseudo: {
        hover: "#Hover",
        active: "#Active",
        focusVisible: "#Focus"
      }
    }
  };
  var Inverted = {
    render: TemplateColumn,
    args: {
      array: buttonStateArray,
      color: "inverted"
    },
    parameters: {
      pseudo: {
        hover: "#Hover",
        active: "#Active",
        focusVisible: "#Focus"
      }
    },
    globals: { backgrounds: { value: "brand" } }
  };
  var labelStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--layout-grid-gutters-04)"
  };
  var UsageWithTooltipAndPopover = {
    name: "Usage with tooltip and popover",
    parameters: { controls: { disable: true } },
    render: () => {
      const bloodGroup = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_TextGroup_exports.TextGroup,
        {
          type: "vertical",
          label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: labelStyle, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Label_exports.Label, { children: "Veregrupp" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Tooltip_default, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tooltip_default.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InfoButton_default, { "aria-label": "Rohkem infot veregrupi kohta" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tooltip_default.Content, { children: "Veregrupp määratakse vereanalüüsiga ning see ei muutu elu jooksul." })
            ] })
          ] }),
          value: "AB-"
        }
      );
      const dentalBenefit = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_TextGroup_exports.TextGroup,
        {
          type: "vertical",
          label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: labelStyle, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Label_exports.Label, { children: "Hambaravihüvitise jääk" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InfoButton_default, { "aria-label": "Rohkem infot hüvitise kohta" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Content, { width: "medium", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0.5, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Hambaravihüvitist saab kasutada jooksva kalendriaasta jooksul. Kasutamata jääk järgmisesse aastasse ei kandu." }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { textAlign: "right" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", underline: false, iconRight: "arrow_forward", children: "Loe rohkem" }) })
              ] }) })
            ] })
          ] }),
          value: "24€"
        }
      );
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ShowAt_exports.ShowAt, { md: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: "1.5rem" }, children: [
          bloodGroup,
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_default, { axis: "vertical", isStretched: true }),
          dentalBenefit
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HideAt_exports.HideAt, { md: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1, children: [
          bloodGroup,
          dentalBenefit
        ] }) })
      ] });
    }
  };

  // .design-sync/.cache/previews/InfoButton.tsx
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
    compose(info_button_stories_exports, "Default")
  );
  var States2 = (
    /* States */
    compose(info_button_stories_exports, "States")
  );
  var Inverted2 = (
    /* Inverted */
    compose(info_button_stories_exports, "Inverted")
  );
  var UsageWithTooltipAndPopover2 = (
    /* Usage with tooltip and popover */
    compose(info_button_stories_exports, "UsageWithTooltipAndPopover")
  );
  return __toCommonJS(InfoButton_exports);
})();
