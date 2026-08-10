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

  // .design-sync/.cache/previews/Separator.tsx
  var Separator_exports = {};
  __export(Separator_exports, {
    Default: () => Default2,
    DotFilled: () => DotFilled2,
    DotOutlined: () => DotOutlined2,
    DottedLineHorizontal: () => DottedLineHorizontal2,
    DottedLineVertical: () => DottedLineVertical2,
    DottedSizes: () => DottedSizes2,
    HorizontalSpacings: () => HorizontalSpacings2,
    HorizontalThickness: () => HorizontalThickness2,
    InlineSeparatorUsage: () => InlineSeparatorUsage2,
    Position: () => Position2,
    Sizes: () => Sizes2,
    SpacingTopDefault: () => SpacingTopDefault2,
    SpacingTopSmall: () => SpacingTopSmall2,
    Vertical: () => Vertical2,
    VerticalDottedCardExample: () => VerticalDottedCardExample2,
    VerticalDottedSmallCardExample: () => VerticalDottedSmallCardExample2,
    VerticalSpacings: () => VerticalSpacings2,
    VerticalThickness: () => VerticalThickness2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/misc/separator/separator.stories.tsx
  var separator_stories_exports = {};
  __export(separator_stories_exports, {
    Default: () => Default,
    DotFilled: () => DotFilled,
    DotOutlined: () => DotOutlined,
    DottedLineHorizontal: () => DottedLineHorizontal,
    DottedLineVertical: () => DottedLineVertical,
    DottedSizes: () => DottedSizes,
    HorizontalSpacings: () => HorizontalSpacings,
    HorizontalThickness: () => HorizontalThickness,
    InlineSeparatorUsage: () => InlineSeparatorUsage,
    Position: () => Position,
    Sizes: () => Sizes,
    SpacingTopDefault: () => SpacingTopDefault,
    SpacingTopSmall: () => SpacingTopSmall,
    Vertical: () => Vertical,
    VerticalDottedCardExample: () => VerticalDottedCardExample,
    VerticalDottedSmallCardExample: () => VerticalDottedSmallCardExample,
    VerticalSpacings: () => VerticalSpacings,
    VerticalThickness: () => VerticalThickness,
    default: () => separator_stories_default
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

  // ds-shim:ds:Card
  var ds_Card_exports = {};
  __export(ds_Card_exports, {
    default: () => ds_Card_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Card_exports, __toESM(require_ds_raw()));
  var g2 = window.Tedi;
  var ds_Card_default = g2["Card"] !== void 0 ? g2["Card"] : g2;

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

  // ds-shim:ds:Separator
  var ds_Separator_exports = {};
  __export(ds_Separator_exports, {
    default: () => ds_Separator_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Separator_exports, __toESM(require_ds_raw()));
  var g6 = window.Tedi;
  var ds_Separator_default = g6["Separator"] !== void 0 ? g6["Separator"] : g6;

  // src/tedi/components/misc/separator/separator.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    component: ds_Separator_default,
    title: "TEDI-Ready/Components/Helpers/Separator",
    parameters: {
      status: {
        type: [{ name: "breakpointSupport", url: "?path=/docs/helpers-usebreakpointprops--usebreakpointprops" }]
      },
      controls: {
        exclude: ["sm", "md", "lg", "xl", "xxl"]
      },
      design: {
        type: "figma",
        url: "https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=3518-32729&m=dev"
      }
    }
  };
  var separator_stories_default = meta;
  var spacingArray = [0, 0.5, 1, 1.5, 2, 2.5];
  var sizeArray = ["large", "medium"];
  var Template = (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_default, { ...args });
  var SizesTemplate = (args) => {
    const { array } = args;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "example-list", children: array.map((value, key) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { className: `${key === array.length - 1 ? "" : "border-bottom"} padding-14-16`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: 2, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: value === "large" ? "Large" : "Medium" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { className: "d-flex", width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Separator_default,
        {
          variant: "dotted",
          axis: "vertical",
          color: "accent",
          dotPosition: "center",
          dotSize: value,
          dotStyle: void 0
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { className: "d-flex", align: "center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Separator_default,
        {
          variant: "dotted",
          axis: "horizontal",
          color: "accent",
          dotPosition: "center",
          dotSize: value
        }
      ) })
    ] }, key)) });
  };
  var ColorsAndThickness = (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_default, { spacing: 1, thickness: 1, ...args }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_default, { spacing: 1, thickness: 2, ...args })
  ] }) });
  var SpacingHorizontal = (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: spacingArray.map((spacing, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_default, { spacing, ...args }, index)) }) });
  var SpacingVertical = (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: spacingArray.map((spacing, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_default, { spacing, ...args }) }, index)) });
  var Default = {
    render: Template,
    args: { spacing: 1 }
  };
  var HorizontalSpacings = {
    render: SpacingHorizontal,
    args: {
      axis: "horizontal"
    }
  };
  var HorizontalThickness = {
    render: ColorsAndThickness
  };
  var Vertical = {
    render: Template,
    args: { axis: "vertical", height: 3 }
  };
  var VerticalSpacings = {
    render: SpacingVertical,
    args: {
      axis: "vertical",
      height: 3,
      display: "inline-block"
    }
  };
  var VerticalThickness = {
    render: ColorsAndThickness,
    args: { axis: "vertical", height: 3, display: "inline" }
  };
  var DottedLineHorizontal = {
    render: Template,
    args: { axis: "horizontal", variant: "dotted", color: "accent", dotPosition: "center" }
  };
  var DottedLineVertical = {
    render: Template,
    args: { axis: "vertical", variant: "dotted", color: "accent", height: 5, dotPosition: "center" }
  };
  var Sizes = {
    render: SizesTemplate,
    args: {
      property: "dotSize",
      array: sizeArray
    }
  };
  var SpacingTopDefault = {
    render: () => {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_default, { axis: "vertical", variant: "dotted", height: 2, dotPosition: "center", color: "accent", dotSize: "large" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_default, { axis: "vertical", variant: "dotted", height: 2, dotPosition: "center", color: "accent", dotSize: "medium" }) })
      ] });
    }
  };
  var SpacingTopSmall = {
    render: () => {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_default, { axis: "vertical", variant: "dotted", height: 2, dotPosition: 0.5, color: "accent", dotSize: "large" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_default, { axis: "vertical", variant: "dotted", height: 2, dotPosition: 0.75, color: "accent", dotSize: "medium" }) })
      ] });
    }
  };
  var Position = {
    render: () => {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Start" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { className: "text-center", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              ds_Separator_default,
              {
                axis: "vertical",
                variant: "dotted",
                height: 2,
                dotPosition: "start",
                color: "accent",
                dotSize: "large"
              }
            ) }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              ds_Separator_default,
              {
                axis: "vertical",
                variant: "dotted",
                height: 2,
                dotPosition: "start",
                color: "accent",
                dotSize: "medium"
              }
            ) })
          ] })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Center" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { className: "text-center", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              ds_Separator_default,
              {
                axis: "vertical",
                variant: "dotted",
                height: 1,
                dotPosition: "center",
                color: "accent",
                dotSize: "large"
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              ds_Separator_default,
              {
                axis: "vertical",
                variant: "dotted",
                height: 1,
                dotPosition: "center",
                color: "accent",
                dotSize: "medium"
              }
            ) })
          ] })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "End" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { className: "text-center", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              ds_Separator_default,
              {
                axis: "vertical",
                variant: "dotted",
                height: 1,
                dotPosition: "end",
                color: "accent",
                dotSize: "large"
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              ds_Separator_default,
              {
                axis: "vertical",
                variant: "dotted",
                height: 1,
                dotPosition: "end",
                color: "accent",
                dotSize: "medium"
              }
            ) })
          ] })
        ] }) })
      ] }) });
    }
  };
  var TemplateVertical = (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Card_exports.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Card_exports.CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: "auto", md: 2, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-right", children: "12.12.2012" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: 12, lg: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_default, { ...args }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h6", children: "Card content title" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem rem nisi quae? Rem, amet! Veritatis laboriosam consectetur ipsum quae. Amet voluptatibus quod eaque at nostrum id provident? Cum, maiores libero!" })
    ] })
  ] }) }) });
  var DotFilled = {
    render: () => {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_default, { axis: "horizontal", variant: "dot-only", dotSize: "large", dotStyle: "filled", color: "secondary" }) });
    }
  };
  var DotOutlined = {
    render: () => {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_default, { axis: "horizontal", variant: "dot-only", dotSize: "large", dotStyle: "outlined", color: "secondary" }) });
    }
  };
  var dotSizeToPxMap = {
    xs: "2px",
    sm: "4px",
    md: "8px",
    lg: "15px"
  };
  var DottedSizesTemplate = (args) => {
    const { array } = args;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "example-list", children: array.map((value, key) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { className: `${key === array.length - 1 ? "" : "border-bottom"} padding-14-16`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: 2, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: value !== void 0 ? dotSizeToPxMap[value] || value : "—" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { className: "d-flex", width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Separator_default,
        {
          dotSize: value,
          variant: "dot-only",
          axis: "horizontal",
          color: "secondary",
          dotStyle: "filled"
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { className: "d-flex", align: "center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Separator_default,
        {
          dotSize: value,
          variant: "dot-only",
          axis: "horizontal",
          color: "secondary",
          dotStyle: "outlined"
        }
      ) })
    ] }, key)) });
  };
  var DottedSizes = {
    render: DottedSizesTemplate,
    args: {
      property: "dotSize",
      array: ["extra-small", "small", "medium", "large"]
    }
  };
  var InlineSeparatorTemplate = (args) => {
    const { dotPosition, ...safeArgs } = args;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Text_exports.Text, { children: [
        "Lorem ipsum dolor sit, amet",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_default, { ...safeArgs, element: "span", color: "primary", spacing: 0.5 }),
        "consectetur adipisicing elit."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Text_exports.Text, { children: [
        "Lorem ipsum dolor sit, amet",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_default, { ...safeArgs, element: "span", color: "secondary", spacing: 1 }),
        "consectetur adipisicing elit."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Text_exports.Text, { children: [
        "Lorem ipsum dolor sit, amet",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_default, { ...safeArgs, element: "span", color: "accent", spacing: 1.5 }),
        "consectetur adipisicing elit."
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Text_exports.Text, { children: [
        "Lorem ipsum dolor sit, amet",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_default, { ...safeArgs, element: "span", color: "secondary", spacing: 0.5, variant: "dot-only", dotSize: "small" }),
        "consectetur adipisicing elit."
      ] })
    ] });
  };
  var InlineSeparatorUsage = {
    render: InlineSeparatorTemplate,
    args: { axis: "vertical", display: "inline" }
  };
  var VerticalDottedCardExample = {
    render: TemplateVertical,
    args: {
      axis: "horizontal",
      variant: "dotted",
      color: "accent",
      spacing: 1,
      isStretched: true,
      dotPosition: 1.25,
      md: { axis: "vertical" }
    }
  };
  var VerticalDottedSmallCardExample = {
    render: TemplateVertical,
    args: {
      axis: "horizontal",
      spacing: 1,
      variant: "dotted",
      dotSize: "medium",
      color: "accent",
      isStretched: true,
      dotPosition: 1.25,
      md: { axis: "vertical" }
    }
  };

  // .design-sync/.cache/previews/Separator.tsx
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
    compose(separator_stories_exports, "Default")
  );
  var HorizontalSpacings2 = (
    /* Horizontal Spacings */
    compose(separator_stories_exports, "HorizontalSpacings")
  );
  var HorizontalThickness2 = (
    /* Horizontal Thickness */
    compose(separator_stories_exports, "HorizontalThickness")
  );
  var Vertical2 = (
    /* Vertical */
    compose(separator_stories_exports, "Vertical")
  );
  var VerticalSpacings2 = (
    /* Vertical Spacings */
    compose(separator_stories_exports, "VerticalSpacings")
  );
  var VerticalThickness2 = (
    /* Vertical Thickness */
    compose(separator_stories_exports, "VerticalThickness")
  );
  var DottedLineHorizontal2 = (
    /* Dotted Line Horizontal */
    compose(separator_stories_exports, "DottedLineHorizontal")
  );
  var DottedLineVertical2 = (
    /* Dotted Line Vertical */
    compose(separator_stories_exports, "DottedLineVertical")
  );
  var Sizes2 = (
    /* Sizes */
    compose(separator_stories_exports, "Sizes")
  );
  var SpacingTopDefault2 = (
    /* Spacing Top Default */
    compose(separator_stories_exports, "SpacingTopDefault")
  );
  var SpacingTopSmall2 = (
    /* Spacing Top Small */
    compose(separator_stories_exports, "SpacingTopSmall")
  );
  var Position2 = (
    /* Position */
    compose(separator_stories_exports, "Position")
  );
  var DotFilled2 = (
    /* Dot Filled */
    compose(separator_stories_exports, "DotFilled")
  );
  var DotOutlined2 = (
    /* Dot Outlined */
    compose(separator_stories_exports, "DotOutlined")
  );
  var DottedSizes2 = (
    /* Dotted Sizes */
    compose(separator_stories_exports, "DottedSizes")
  );
  var InlineSeparatorUsage2 = (
    /* Inline Separator Usage */
    compose(separator_stories_exports, "InlineSeparatorUsage")
  );
  var VerticalDottedCardExample2 = (
    /* Vertical Dotted Card Example */
    compose(separator_stories_exports, "VerticalDottedCardExample")
  );
  var VerticalDottedSmallCardExample2 = (
    /* Vertical Dotted Small Card Example */
    compose(separator_stories_exports, "VerticalDottedSmallCardExample")
  );
  return __toCommonJS(Separator_exports);
})();
