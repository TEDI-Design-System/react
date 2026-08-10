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

  // .design-sync/.cache/previews/Slider.tsx
  var Slider_exports = {};
  __export(Slider_exports, {
    CustomValue: () => CustomValue2,
    Default: () => Default2,
    MinAndMaxValues: () => MinAndMaxValues2,
    States: () => States2,
    WithCurrentValue: () => WithCurrentValue2,
    WithHelper: () => WithHelper2,
    WithInputGroup: () => WithInputGroup2,
    WithoutTooltip: () => WithoutTooltip2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/form/slider/slider.stories.tsx
  var slider_stories_exports = {};
  __export(slider_stories_exports, {
    CustomValue: () => CustomValue,
    Default: () => Default,
    MinAndMaxValues: () => MinAndMaxValues,
    States: () => States,
    WithCurrentValue: () => WithCurrentValue,
    WithHelper: () => WithHelper,
    WithInputGroup: () => WithInputGroup,
    WithoutTooltip: () => WithoutTooltip,
    default: () => slider_stories_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  var import_react = __toESM(require_react_shim());

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

  // ds-shim:ds:Field
  var ds_Field_exports = {};
  __export(ds_Field_exports, {
    default: () => ds_Field_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Field_exports, __toESM(require_ds_raw()));
  var g5 = window.Tedi;
  var ds_Field_default = g5["Field"] !== void 0 ? g5["Field"] : g5;

  // ds-shim:ds:InputGroup
  var ds_InputGroup_exports = {};
  __export(ds_InputGroup_exports, {
    default: () => ds_InputGroup_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_InputGroup_exports, __toESM(require_ds_raw()));
  var g6 = window.Tedi;
  var ds_InputGroup_default = g6["InputGroup"] !== void 0 ? g6["InputGroup"] : g6;

  // ds-shim:ds:NumberField
  var ds_NumberField_exports = {};
  __export(ds_NumberField_exports, {
    default: () => ds_NumberField_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_NumberField_exports, __toESM(require_ds_raw()));
  var g7 = window.Tedi;
  var ds_NumberField_default = g7["NumberField"] !== void 0 ? g7["NumberField"] : g7;

  // ds-shim:ds:Slider
  var ds_Slider_exports = {};
  __export(ds_Slider_exports, {
    default: () => ds_Slider_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Slider_exports, __toESM(require_ds_raw()));
  var g8 = window.Tedi;
  var ds_Slider_default = g8["Slider"] !== void 0 ? g8["Slider"] : g8;

  // src/tedi/components/form/slider/slider.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    component: ds_Slider_exports.Slider,
    title: "TEDI-Ready/Components/Form/Slider",
    argTypes: {
      addonRight: { control: false }
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
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.70?node-id=19071-105925&m=dev"
      }
    }
  };
  var slider_stories_default = meta;
  var wrapInCol = (Story) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 6, xs: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {}) }) });
  var Default = {
    decorators: [wrapInCol],
    args: {
      id: "slider-default",
      label: "Väärtus",
      min: 0,
      max: 100,
      step: 1,
      defaultValue: 50,
      minLabel: "0%",
      maxLabel: "100%"
    }
  };
  var InputGroupTemplate = (args) => {
    const [value, setValue] = (0, import_react.useState)(20);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 6, xs: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_Slider_exports.Slider,
      {
        ...args,
        value,
        onChange: setValue,
        addonRight: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: "100px" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_InputGroup_default, { id: "slider-input-group-field", label: "Väärtus", hideLabel: true, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Input, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Field_exports.Field,
            {
              type: "number",
              value: String(value),
              onChange: (next) => {
                const parsed = Number(next);
                if (!Number.isNaN(parsed)) setValue(parsed);
              }
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Suffix, { children: "%" })
        ] }) })
      }
    ) }) });
  };
  var WithInputGroup = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupTemplate, { ...args }),
    args: {
      id: "slider-input-group",
      label: "Väärtus",
      min: 0,
      max: 100,
      step: 1,
      minLabel: "0%",
      maxLabel: "100%"
    }
  };
  var MinAndMaxValues = {
    decorators: [wrapInCol],
    args: {
      id: "slider-min-max",
      min: 0,
      max: 100,
      step: 1,
      defaultValue: 50,
      minLabel: "0%",
      maxLabel: "100%",
      "aria-label": "Väärtus"
    }
  };
  var WithCurrentValue = {
    decorators: [wrapInCol],
    args: {
      id: "slider-current-value",
      min: 0,
      max: 100,
      step: 1,
      defaultValue: 50,
      showCurrentValue: true,
      valueFormatter: (value) => `${value}%`,
      "aria-label": "Silt"
    }
  };
  var CustomValueTemplate = (args) => {
    const [numberValue, setNumberValue] = (0, import_react.useState)(4);
    const [inputValue, setInputValue] = (0, import_react.useState)(50);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 2, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 6, xs: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Slider_exports.Slider,
        {
          id: "slider-custom-value-basic",
          label: "Väärtus",
          hideLabel: true,
          min: 0,
          max: 100,
          defaultValue: 50,
          minLabel: "0%",
          maxLabel: "100%"
        }
      ) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 6, xs: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Slider_exports.Slider,
        {
          min: 0,
          max: 100,
          minLabel: "0%",
          maxLabel: "100%",
          defaultValue: 50,
          value: inputValue,
          onChange: setInputValue,
          label: "Väärtus",
          addonRight: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: "100px" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_InputGroup_default, { id: "slider-custom-value-input-group", label: "Väärtus", hideLabel: true, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Input, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              ds_Field_exports.Field,
              {
                type: "number",
                value: String(inputValue),
                onChange: (next) => {
                  const parsed = Number(next);
                  if (!Number.isNaN(parsed)) setInputValue(parsed);
                }
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Suffix, { children: "%" })
          ] }) })
        }
      ) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 6, xs: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Slider_exports.Slider,
        {
          ...args,
          value: numberValue,
          onChange: setNumberValue,
          addonRight: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_NumberField_exports.NumberField,
            {
              id: "slider-custom-value-number",
              label: "Väärtus",
              hideLabel: true,
              min: args.min,
              max: args.max,
              step: args.step,
              value: numberValue,
              onChange: setNumberValue
            }
          )
        }
      ) }) })
    ] });
  };
  var CustomValue = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomValueTemplate, { ...args }),
    args: {
      id: "slider-custom-value",
      label: "Väärtus",
      min: 1,
      max: 10,
      step: 1,
      minLabel: "1",
      maxLabel: "10"
    }
  };
  var States = {
    render: () => {
      const sharedArgs = {
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 50,
        minLabel: "0%",
        maxLabel: "100%",
        valueFormatter: (value) => `${value}%`
      };
      const thumbArgs = {
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 50,
        tooltip: false,
        "aria-label": "Nupp"
      };
      const thumbColStyle = { width: "1.5rem" };
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 2, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { gutterY: 2, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 2, xs: 12, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Default" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 1, xs: 2, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: thumbColStyle, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Slider_exports.Slider, { ...thumbArgs, id: "Default-thumb" }) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 6, xs: 10, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Slider_exports.Slider, { ...sharedArgs, id: "Default" }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 2, xs: 12, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Hover" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 1, xs: 2, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: thumbColStyle, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Slider_exports.Slider, { ...thumbArgs, id: "Hover-thumb", className: "slider-state-hover" }) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 6, xs: 10, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Slider_exports.Slider, { ...sharedArgs, id: "Hover", className: "slider-state-hover" }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 2, xs: 12, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Active" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 1, xs: 2, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: thumbColStyle, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Slider_exports.Slider, { ...thumbArgs, id: "Active-thumb", className: "slider-state-active" }) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 6, xs: 10, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Slider_exports.Slider, { ...sharedArgs, id: "Active", className: "slider-state-active" }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 2, xs: 12, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Disabled" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 1, xs: 2, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: thumbColStyle, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Slider_exports.Slider, { ...thumbArgs, id: "Disabled-thumb", disabled: true }) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 6, xs: 10, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Slider_exports.Slider, { ...sharedArgs, id: "slider-states-disabled", disabled: true }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 2, xs: 12, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Focus" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 1, xs: 2, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: thumbColStyle, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Slider_exports.Slider, { ...thumbArgs, id: "Focus-thumb", className: "slider-state-focus" }) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 6, xs: 10, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Slider_exports.Slider, { ...sharedArgs, id: "Focus", className: "slider-state-focus" }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 2, xs: 12, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Error" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 1, xs: 2, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: thumbColStyle, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Slider_exports.Slider, { ...thumbArgs, id: "Error-thumb", invalid: true }) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 6, xs: 10, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Slider_exports.Slider,
            {
              ...sharedArgs,
              id: "slider-states-error",
              invalid: true,
              helper: { id: "slider-states-error-helper", text: "See väli on kohustuslik", type: "error" }
            }
          ) })
        ] })
      ] });
    },
    parameters: {
      pseudo: {
        hover: ["#Hover", "#Hover-thumb", ".slider-state-hover"],
        focusVisible: ["#Focus", "#Focus-thumb", ".slider-state-focus"],
        active: ["#Active", "#Active-thumb", ".slider-state-active"]
      }
    }
  };
  var WithoutTooltip = {
    decorators: [wrapInCol],
    args: {
      id: "slider-no-tooltip",
      label: "Väärtus",
      min: 0,
      max: 100,
      defaultValue: 40,
      minLabel: "0%",
      maxLabel: "100%",
      tooltip: false
    }
  };
  var WithHelper = {
    decorators: [wrapInCol],
    args: {
      id: "slider-helper",
      label: "Väärtus",
      min: 0,
      max: 100,
      defaultValue: 40,
      minLabel: "0%",
      maxLabel: "100%",
      helper: { id: "slider-helper-text", text: "Liiguta nuppu, et väärtust muuta", type: "hint" }
    }
  };

  // .design-sync/.cache/previews/Slider.tsx
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
    compose(slider_stories_exports, "Default")
  );
  var WithInputGroup2 = (
    /* With Input Group */
    compose(slider_stories_exports, "WithInputGroup")
  );
  var MinAndMaxValues2 = (
    /* Min And Max Values */
    compose(slider_stories_exports, "MinAndMaxValues")
  );
  var WithCurrentValue2 = (
    /* With Current Value */
    compose(slider_stories_exports, "WithCurrentValue")
  );
  var CustomValue2 = (
    /* Custom Value */
    compose(slider_stories_exports, "CustomValue")
  );
  var States2 = (
    /* States */
    compose(slider_stories_exports, "States")
  );
  var WithoutTooltip2 = (
    /* Without Tooltip */
    compose(slider_stories_exports, "WithoutTooltip")
  );
  var WithHelper2 = (
    /* With Helper */
    compose(slider_stories_exports, "WithHelper")
  );
  return __toCommonJS(Slider_exports);
})();
