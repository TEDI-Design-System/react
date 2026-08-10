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

  // .design-sync/.cache/previews/Popover.tsx
  var Popover_exports = {};
  __export(Popover_exports, {
    AccessibilityBaseline: () => AccessibilityBaseline2,
    ArrowPosition: () => ArrowPosition2,
    ClosingButton: () => ClosingButton2,
    ContentExamples: () => ContentExamples2,
    Default: () => Default2,
    FocusLocked: () => FocusLocked2,
    Heading: () => Heading2,
    NoTitleAccessibleName: () => NoTitleAccessibleName2,
    NotDismissible: () => NotDismissible2,
    ReadAllStressTest: () => ReadAllStressTest2,
    ScrollLocked: () => ScrollLocked2,
    Size: () => Size2,
    Trigger: () => Trigger2,
    WithProminentBorder: () => WithProminentBorder2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/overlays/popover/popover.stories.tsx
  var popover_stories_exports = {};
  __export(popover_stories_exports, {
    AccessibilityBaseline: () => AccessibilityBaseline,
    ArrowPosition: () => ArrowPosition,
    ClosingButton: () => ClosingButton,
    ContentExamples: () => ContentExamples,
    Default: () => Default,
    FocusLocked: () => FocusLocked,
    Heading: () => Heading,
    NoTitleAccessibleName: () => NoTitleAccessibleName,
    NotDismissible: () => NotDismissible,
    ReadAllStressTest: () => ReadAllStressTest,
    ScrollLocked: () => ScrollLocked,
    Size: () => Size,
    Trigger: () => Trigger,
    WithProminentBorder: () => WithProminentBorder,
    default: () => popover_stories_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  var import_react = __toESM(require_react_shim());

  // .storybook/subcomponent-controls.ts
  init_define_import_meta_env();
  init_define_process_env();
  var SEP = "__";
  var ALWAYS_EXCLUDE = ["style", "ref", "key", "defaultServerBreakpoint", "xs", "sm", "md", "lg", "xl", "xxl"];
  var stripQuotes = (value) => value.replace(/^['"]|['"]$/g, "");
  var isNumericLiteral = (value) => /^-?\d+(?:\.\d+)?$/.test(value);
  var inferControl = (type) => {
    switch (type?.name) {
      case "boolean":
        return { control: "boolean" };
      case "number":
        return { control: "number" };
      case "string":
        return { control: "text" };
      case "enum": {
        const literals = (type.value ?? []).map((entry) => stripQuotes(entry.value)).filter((value) => value !== "undefined" && value !== "null");
        if (literals.length === 0) return { control: "text" };
        if (literals.every((value) => value === "true" || value === "false")) return { control: "boolean" };
        if (literals.every(isNumericLiteral)) return { control: "select", options: literals.map(Number) };
        return { control: "select", options: literals };
      }
      default:
        return { control: "object" };
    }
  };
  var subcomponentArgTypes = (component, options) => {
    const { category, prefix, include, exclude = [] } = options;
    const docgen = component;
    const props = docgen.__docgenInfo?.props;
    if (!props) {
      console.warn(
        `[subcomponentArgTypes] No __docgenInfo for "${docgen.displayName ?? category}". Controls will not be generated. Check the react-docgen-typescript config in .storybook/main.ts.`
      );
      return {};
    }
    const skip = /* @__PURE__ */ new Set([...ALWAYS_EXCLUDE, ...exclude]);
    const argTypes = {};
    for (const [name, prop] of Object.entries(props)) {
      if (include && !include.includes(name)) continue;
      if (skip.has(name)) continue;
      const { control, options: controlOptions } = inferControl(prop.type);
      const defaultValue = prop.defaultValue?.value;
      argTypes[`${prefix}${SEP}${name}`] = {
        name,
        description: prop.description || void 0,
        control,
        options: controlOptions,
        table: {
          category,
          type: prop.type ? { summary: prop.type.raw ?? prop.type.name } : void 0,
          defaultValue: defaultValue !== void 0 && defaultValue !== null ? { summary: String(defaultValue) } : void 0
        }
      };
    }
    return argTypes;
  };
  var getSubcomponentProps = (args, prefix) => {
    const head = `${prefix}${SEP}`;
    const props = {};
    for (const [key, value] of Object.entries(args)) {
      if (key.startsWith(head) && value !== void 0 && value !== "") {
        props[key.slice(head.length)] = value;
      }
    }
    return props;
  };
  var getPrimaryComponentProps = (args) => {
    const props = {};
    for (const [key, value] of Object.entries(args)) {
      if (!key.includes(SEP)) props[key] = value;
    }
    return props;
  };

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

  // ds-shim:ds:Text
  var ds_Text_exports = {};
  __export(ds_Text_exports, {
    default: () => ds_Text_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Text_exports, __toESM(require_ds_raw()));
  var g2 = window.Tedi;
  var ds_Text_default = g2["Text"] !== void 0 ? g2["Text"] : g2;

  // ds-shim:ds:Button
  var ds_Button_exports = {};
  __export(ds_Button_exports, {
    default: () => ds_Button_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Button_exports, __toESM(require_ds_raw()));
  var g3 = window.Tedi;
  var ds_Button_default = g3["Button"] !== void 0 ? g3["Button"] : g3;

  // ds-shim:ds:InfoButton
  var ds_InfoButton_exports = {};
  __export(ds_InfoButton_exports, {
    default: () => ds_InfoButton_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_InfoButton_exports, __toESM(require_ds_raw()));
  var g4 = window.Tedi;
  var ds_InfoButton_default = g4["InfoButton"] !== void 0 ? g4["InfoButton"] : g4;

  // ds-shim:ds:EmptyState
  var ds_EmptyState_exports = {};
  __export(ds_EmptyState_exports, {
    default: () => ds_EmptyState_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_EmptyState_exports, __toESM(require_ds_raw()));
  var g5 = window.Tedi;
  var ds_EmptyState_default = g5["EmptyState"] !== void 0 ? g5["EmptyState"] : g5;

  // ds-shim:ds:Search
  var ds_Search_exports = {};
  __export(ds_Search_exports, {
    default: () => ds_Search_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Search_exports, __toESM(require_ds_raw()));
  var g6 = window.Tedi;
  var ds_Search_default = g6["Search"] !== void 0 ? g6["Search"] : g6;

  // ds-shim:ds:Toggle
  var ds_Toggle_exports = {};
  __export(ds_Toggle_exports, {
    default: () => ds_Toggle_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Toggle_exports, __toESM(require_ds_raw()));
  var g7 = window.Tedi;
  var ds_Toggle_default = g7["Toggle"] !== void 0 ? g7["Toggle"] : g7;

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
  var g8 = window.Tedi;
  var ds_Row_default = g8["Row"] !== void 0 ? g8["Row"] : g8;

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
  var g9 = window.Tedi;
  var ds_Col_default = g9["Col"] !== void 0 ? g9["Col"] : g9;

  // src/tedi/components/layout/grid/index.ts
  __reExport(grid_exports, ds_Col_exports);

  // ds-shim:ds:OptionContent
  var ds_OptionContent_exports = {};
  __export(ds_OptionContent_exports, {
    default: () => ds_OptionContent_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_OptionContent_exports, __toESM(require_ds_raw()));
  var g10 = window.Tedi;
  var ds_OptionContent_default = g10["OptionContent"] !== void 0 ? g10["OptionContent"] : g10;

  // ds-shim:ds:Separator
  var ds_Separator_exports = {};
  __export(ds_Separator_exports, {
    default: () => ds_Separator_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Separator_exports, __toESM(require_ds_raw()));
  var g11 = window.Tedi;
  var ds_Separator_default = g11["Separator"] !== void 0 ? g11["Separator"] : g11;

  // ds-shim:ds:Link
  var ds_Link_exports = {};
  __export(ds_Link_exports, {
    default: () => ds_Link_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Link_exports, __toESM(require_ds_raw()));
  var g12 = window.Tedi;
  var ds_Link_default = g12["Link"] !== void 0 ? g12["Link"] : g12;

  // ds-shim:ds:Popover
  var ds_Popover_exports = {};
  __export(ds_Popover_exports, {
    default: () => ds_Popover_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Popover_exports, __toESM(require_ds_raw()));
  var g13 = window.Tedi;
  var ds_Popover_default = g13["Popover"] !== void 0 ? g13["Popover"] : g13;

  // src/tedi/components/overlays/popover/popover.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    component: ds_Popover_default,
    subcomponents: {
      "Popover.Trigger": ds_Popover_default.Trigger,
      "Popover.Content": ds_Popover_default.Content
    },
    title: "TEDI-Ready/Components/Overlay/Popover",
    parameters: {
      docs: {
        source: {
          transform: (code) => {
            return code.replaceAll("PopoverTrigger", "Popover.Trigger").replaceAll("PopoverContent", "Popover.Content");
          }
        }
      },
      design: {
        type: "figma",
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=5797-117364&m=dev"
      }
    }
  };
  var popover_stories_default = meta;
  var POLAR_BEAR_TEXT = "Jääkaru (Ursus maritimus) on suur karu, kes elab Arktikas ja selle lähialadel.";
  var ContentExamplesTemplate = (args) => {
    const [firstOpen, setFirstOpen] = (0, import_react.useState)(false);
    const [secondOpen, setSecondOpen] = (0, import_react.useState)(false);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { gutterY: 3, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 6, xxl: 3, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, open: firstOpen, onToggle: setFirstOpen, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { children: "Buttons & heading" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default.Content, { title: "Pealkiri", close: true, children: [
          POLAR_BEAR_TEXT,
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex gap-2", style: { marginTop: "var(--layout-grid-gutters-08)" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", onClick: () => setFirstOpen(false), children: "Tühista" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              ds_Button_default,
              {
                onClick: () => {
                  alert("This is alert message!");
                  setFirstOpen(false);
                },
                children: "Esita"
              }
            )
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 6, xxl: 3, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, open: secondOpen, onToggle: setSecondOpen, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { children: "Buttons" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default.Content, { children: [
          POLAR_BEAR_TEXT,
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex gap-2", style: { marginTop: "var(--layout-grid-gutters-08)" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", onClick: () => setSecondOpen(false), children: "Tühista" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              ds_Button_default,
              {
                onClick: () => {
                  alert("This is alert message!");
                  setSecondOpen(false);
                },
                children: "Esita"
              }
            )
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 6, xxl: 3, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { children: "Link" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default.Content, { children: [
          POLAR_BEAR_TEXT,
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_default, { href: "#", underline: false, iconRight: "north_east", className: "align-self-end", children: "Loe rohkem" })
        ] })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 6, xxl: 3, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { children: "Text" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Content, { children: POLAR_BEAR_TEXT })
      ] }) })
    ] });
  };
  var HeadingTemplate = (args) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { gutterY: 3, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 6, xxl: 3, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "Heading & close" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default.Content, { width: "medium", title: "Pealkiri", close: true, children: [
          "This popover is with title and close button.",
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex justify-content-end gap-2", style: { marginTop: "var(--layout-grid-gutters-08)" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "Tühista" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { children: "Esita" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 6, xxl: 3, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "Heading" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default.Content, { width: "medium", title: "Pealkiri", children: [
          "This popover is with title.",
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex justify-content-end gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "Tühista" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { children: "Esita" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 6, xxl: 3, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "Custom heading & close" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Popover_default.Content,
          {
            width: "medium",
            title: "This popover is with smaller title and close button.",
            titleProps: { element: "p" },
            close: true,
            closeProps: { size: "small" },
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex justify-content-end gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "Tühista" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { children: "Esita" })
            ] })
          }
        )
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 6, xxl: 3, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "Only content" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default.Content, { width: "medium", children: [
          "This popover does not have title and close button.",
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex justify-content-end gap-2", style: { marginTop: "var(--layout-grid-gutters-08)" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "Tühista" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { children: "Esita" })
          ] })
        ] })
      ] }) })
    ] });
  };
  var TriggerTemplate = (args) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { gutterY: 3, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 4, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "Button Trigger" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Content, { children: "This popover is triggered by button." })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 4, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InfoButton_default, { children: "Info Button Trigger" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Content, { children: "This popover is triggered by info button." })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 4, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: "Text Trigger" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Content, { children: "This popover is triggered by text. By default text has dashed underline." })
      ] }) })
    ] });
  };
  var ArrowPositionTemplate = (args) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { gutterY: 3, justifyContent: "center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 4, className: "flex justify-content-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, placement: "top-start", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: "Top start" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Content, { children: POLAR_BEAR_TEXT })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 4, className: "flex justify-content-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, placement: "top", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: "Top center" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Content, { children: POLAR_BEAR_TEXT })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 4, className: "flex justify-content-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, placement: "top-end", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: "Top end" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Content, { children: POLAR_BEAR_TEXT })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 4, className: "flex justify-content-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, placement: "bottom-start", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: "Bottom start" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Content, { children: POLAR_BEAR_TEXT })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 4, className: "flex justify-content-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, placement: "bottom", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: "Bottom center" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Content, { children: POLAR_BEAR_TEXT })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 4, className: "flex justify-content-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, placement: "bottom-end", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: "Bottom end" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Content, { children: POLAR_BEAR_TEXT })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 4, className: "flex justify-content-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, placement: "left-start", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: "Left start" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Content, { children: POLAR_BEAR_TEXT })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 4, className: "flex justify-content-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, placement: "left", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: "Left center" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Content, { children: POLAR_BEAR_TEXT })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 4, className: "flex justify-content-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, placement: "left-end", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: "Left end" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Content, { children: POLAR_BEAR_TEXT })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 4, className: "flex justify-content-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, placement: "right-start", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: "Right start" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Content, { children: POLAR_BEAR_TEXT })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 4, className: "flex justify-content-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, placement: "right", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: "Right center" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Content, { children: POLAR_BEAR_TEXT })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 4, className: "flex justify-content-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, placement: "right-end", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: "Right end" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Content, { children: POLAR_BEAR_TEXT })
      ] }) })
    ] });
  };
  var SizeTemplate = (args) => {
    const sizes = ["none", "small", "medium", "large"];
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { gutterY: 3, children: sizes.map((size) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 3, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: size.charAt(0).toUpperCase() + size.slice(1) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Content, { width: size, children: POLAR_BEAR_TEXT })
    ] }) }, size)) });
  };
  var ClosingButtonTemplate = (args) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { gutterY: 3, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: "Default Button" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Content, { title: "Pealkiri", close: true, children: POLAR_BEAR_TEXT })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: "Custom Button" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Content, { title: "Pealkiri", close: true, closeProps: { size: "small", iconSize: 18 }, children: POLAR_BEAR_TEXT })
      ] }) })
    ] });
  };
  var NotDismissibleTemplate = (args) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: "This is not dismissible" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Content, { title: "Not dismissible", close: true, children: "This popover can not be closed by clicking outside or Escape button. Make sure you show the close button, otherwise it can not be closed." })
    ] });
  };
  var HeaderPopoverItem = ({
    name,
    code,
    icon = "supervised_user_circle",
    selected = false
  }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "button",
    {
      type: "button",
      className: "flex align-items-center gap-2 w-100",
      style: {
        padding: "var(--card-padding-xs)",
        borderRadius: "var(--card-radius-rounded)",
        border: 0,
        cursor: "pointer",
        textAlign: "left",
        background: selected ? "var(--header-popover-item-selected)" : "transparent"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: icon, size: 24, color: selected ? "white" : "secondary" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex flex-column", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: selected ? "white" : "secondary", modifiers: "normal", children: name }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "small", color: selected ? "white" : "secondary", children: code })
        ] })
      ]
    }
  );
  var menuItemBaseStyle = {
    width: "100%",
    padding: "var(--dropdown-item-padding-y) var(--dropdown-item-padding-x)"
  };
  var menuItemStyle = {
    ...menuItemBaseStyle,
    borderBottom: "1px solid var(--general-border-primary)"
  };
  var WithProminentBorderTemplate = (args) => {
    const [darkMode, setDarkMode] = (0, import_react.useState)(false);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
          .story-popover-content--no-padding {
            padding: 0;
          }
          .story-popover-content--menu {
            padding: var(--card-padding-xxs) 0;
          }
        ` }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { gutterY: 3, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 6, xxl: 4, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, withBorder: true, placement: "bottom", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: "Profile menu" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Content, { width: "small", className: "story-popover-content--menu", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-column", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: menuItemStyle, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Label, { children: "Minu profiil" }) }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: menuItemStyle, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Label, { children: "Esindatavad" }) }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: menuItemStyle, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Label, { children: "Kontaktid" }) }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: menuItemStyle, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              ds_Toggle_default,
              {
                id: "header-popover-dark-mode",
                label: "Tume režiim",
                checked: darkMode,
                onChange: () => setDarkMode((prev) => !prev)
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: menuItemBaseStyle, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent, { icon: "logout", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Label, { children: "Logi välja" }) }) })
          ] }) })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 6, xxl: 4, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, withBorder: true, placement: "bottom", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: "Links menu" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Content, { width: "small", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-column gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_default, { href: "#", underline: false, fullWidth: true, style: { justifyContent: "flex-start" }, children: "Minu andmed" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_default, { href: "#", underline: false, fullWidth: true, style: { justifyContent: "flex-start" }, children: "Esindatavad" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_default, { href: "#", underline: false, fullWidth: true, style: { justifyContent: "flex-start" }, children: "Kontaktid" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_default, { axis: "horizontal" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_default, { href: "#", underline: false, fullWidth: true, style: { justifyContent: "flex-start" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex gap-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "notifications", size: 16 }),
              "Riiklikud teated"
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_default, { axis: "horizontal" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_default, { href: "#", underline: false, fullWidth: true, style: { justifyContent: "flex-start" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex gap-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "logout", size: 16 }),
              "Logi välja"
            ] }) })
          ] }) })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 6, xxl: 4, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, withBorder: true, placement: "bottom", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: "Representatives" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Content, { width: "small", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-column gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Search_exports.Search, { id: "header-popover-search", label: "Otsi isikut", onSearch: () => void 0 }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_default, { axis: "horizontal" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderPopoverItem, { name: "Juulia Sarapuu", code: "62004122984", icon: "person", selected: true }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_default, { axis: "horizontal" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderPopoverItem, { name: "Marta Sarapuu", code: "62004122984" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_default, { axis: "horizontal" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderPopoverItem, { name: "Helgi Sarapuu", code: "62004122984" })
          ] }) })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 6, xxl: 4, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, withBorder: true, placement: "bottom", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: "Empty state" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Content, { width: "small", className: "story-popover-content--no-padding", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_EmptyState_exports.EmptyState, { type: "inside", icon: "heart_check", size: "small", children: "Sul puuduvad esindatavad" }) })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 6, xxl: 4, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, withBorder: true, placement: "right", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: "Right center" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Content, { width: "small", title: "Pealkiri", close: true, children: POLAR_BEAR_TEXT })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 6, xxl: 4, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, withBorder: true, placement: "top", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: "Top center" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Content, { width: "small", title: "Pealkiri", close: true, children: POLAR_BEAR_TEXT })
        ] }) })
      ] })
    ] });
  };
  var ScrollLockedTemplate = (args) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...args, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: "Popover with locked scrolling" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Content, { children: "This popover locks scroll on rest of the page. Use this when you want to focus user attention to this content." })
    ] });
  };
  var Default = {
    argTypes: {
      ...subcomponentArgTypes(ds_Popover_default.Content, {
        category: "Popover.Content",
        prefix: "content",
        exclude: ["children", "labelledBy", "describedBy", "titleProps", "closeProps"]
      })
    },
    args: {
      content__title: "Pealkiri",
      content__close: true,
      content__width: "medium"
    },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { ...getPrimaryComponentProps(args), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { children: "Popover Trigger" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Content, { ...getSubcomponentProps(args, "content"), children: POLAR_BEAR_TEXT })
    ] })
  };
  var ContentExamples = {
    render: ContentExamplesTemplate,
    args: {}
  };
  var Heading = {
    render: HeadingTemplate,
    args: {}
  };
  var Trigger = {
    render: TriggerTemplate,
    args: {}
  };
  var ArrowPosition = {
    render: ArrowPositionTemplate,
    args: {}
  };
  var WithProminentBorder = {
    render: WithProminentBorderTemplate,
    args: {}
  };
  var Size = {
    render: SizeTemplate,
    args: {}
  };
  var ClosingButton = {
    render: ClosingButtonTemplate,
    args: {}
  };
  var NotDismissible = {
    render: NotDismissibleTemplate,
    args: {
      dismissible: false
    },
    parameters: {
      docs: {
        description: {
          story: `
          Accessibility warning

          When \`dismissible=false\`:
          - A visible close button MUST be present
          - Keyboard users must have a clear exit path
          - This pattern should only be used when content does not obscure critical information
          `
        }
      }
    }
  };
  var ScrollLocked = {
    render: ScrollLockedTemplate,
    args: {
      scrollLock: true
    }
  };
  var FocusLocked = {
    render: (args) => {
      const [open, setOpen] = (0, import_react.useState)(false);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        ds_Popover_default,
        {
          ...args,
          open,
          onToggle: setOpen,
          focusManager: {
            modal: true,
            initialFocus: 0
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { children: "Modal Popover" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default.Content, { title: "Pealkiri", width: "medium", close: true, children: [
              POLAR_BEAR_TEXT,
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex justify-content-end gap-2", style: { marginTop: "var(--layout-grid-gutters-08)" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", onClick: () => setOpen(false), id: "cancelButton", children: "Tühista" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  ds_Button_default,
                  {
                    onClick: () => {
                      alert("Submitted!");
                      setOpen(false);
                    },
                    id: "submitButton",
                    children: "Esita"
                  }
                )
              ] })
            ] })
          ]
        }
      );
    },
    parameters: {
      docs: {
        description: {
          story: `
          This story demonstrates a Popover with a “locked” focus behavior, where keyboard navigation (Tab) is confined
          to the Popover content until the user clicks an action like "Cancel" or "Submit".

          Key points:
          - Keyboard focus is restricted inside the Popover until it is closed.
          - \`focusManager.modal\` ensures focus stays within the Popover content.
          - \`initialFocus\` sets the first element to receive focus when opening.
          - This setup covers mostly edge cases; the default focus trap is false.
        `
        }
      }
    }
  };
  var AccessibilityBaseline = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { children: "Open popover" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default.Content, { title: "Pealkiri", close: true, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { id: "popover-description", children: "This popover contains text, a link, and buttons. Screen readers should announce roles correctly." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_default, { href: "#", children: "Loe rohkem" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex gap-2", style: { marginTop: "var(--layout-grid-gutters-08)" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "Tühista" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { children: "Kinnita" })
        ] })
      ] })
    ] }),
    parameters: {
      docs: {
        description: {
          story: `
          Accessibility baseline test

          Use this story to verify:
          - Dialog role is announced
          - Title is used as the accessible name
          - Buttons and links announce their roles
          - Focus moves into the popover on open
          - Escape closes the popover
          - Close button is reachable via keyboard
          `
        }
      }
    }
  };
  var NoTitleAccessibleName = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { children: "Open popover" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default.Content, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This popover has no title. The accessible name will fall back to the trigger label." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { style: { marginTop: "var(--layout-grid-gutters-08)" }, children: "Action" })
      ] })
    ] }),
    parameters: {
      docs: {
        description: {
          story: `
          No-title popover

          Expected behavior:
          - Dialog is announced
          - Accessible name is inherited from trigger
          - Roles of buttons are still announced
          `
        }
      }
    }
  };
  var ReadAllStressTest = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_default.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { children: "Read all test" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_default.Content, { title: "Read all test", close: true, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
          "Paragraph one with ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "inline formatting" }),
          "."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
          "Paragraph two with a ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_default, { href: "#", children: "link" }),
          "."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { style: { marginTop: "var(--layout-grid-gutters-08)" }, children: "Primary action" })
      ] })
    ] }),
    parameters: {
      docs: {
        description: {
          story: `
          Use VoiceOver "Read All" inside the popover.

          Verify:
          - Content is not flattened
          - Buttons are announced as buttons
          - Links are announced as links
          - Content is not duplicated
          `
        }
      }
    }
  };

  // .design-sync/.cache/previews/Popover.tsx
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
    compose(popover_stories_exports, "Default")
  );
  var ContentExamples2 = (
    /* Content Examples */
    compose(popover_stories_exports, "ContentExamples")
  );
  var Heading2 = (
    /* Heading */
    compose(popover_stories_exports, "Heading")
  );
  var Trigger2 = (
    /* Trigger */
    compose(popover_stories_exports, "Trigger")
  );
  var ArrowPosition2 = (
    /* Arrow Position */
    compose(popover_stories_exports, "ArrowPosition")
  );
  var WithProminentBorder2 = (
    /* With Prominent Border */
    compose(popover_stories_exports, "WithProminentBorder")
  );
  var Size2 = (
    /* Size */
    compose(popover_stories_exports, "Size")
  );
  var ClosingButton2 = (
    /* Closing Button */
    compose(popover_stories_exports, "ClosingButton")
  );
  var NotDismissible2 = (
    /* Not Dismissible */
    compose(popover_stories_exports, "NotDismissible")
  );
  var ScrollLocked2 = (
    /* Scroll Locked */
    compose(popover_stories_exports, "ScrollLocked")
  );
  var FocusLocked2 = (
    /* Focus Locked */
    compose(popover_stories_exports, "FocusLocked")
  );
  var AccessibilityBaseline2 = (
    /* Accessibility Baseline */
    compose(popover_stories_exports, "AccessibilityBaseline")
  );
  var NoTitleAccessibleName2 = (
    /* No Title Accessible Name */
    compose(popover_stories_exports, "NoTitleAccessibleName")
  );
  var ReadAllStressTest2 = (
    /* Read All Stress Test */
    compose(popover_stories_exports, "ReadAllStressTest")
  );
  return __toCommonJS(Popover_exports);
})();
