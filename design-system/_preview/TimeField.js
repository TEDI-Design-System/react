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

  // .design-sync/.cache/previews/TimeField.tsx
  var TimeField_exports = {};
  __export(TimeField_exports, {
    CustomStep: () => CustomStep2,
    Default: () => Default2,
    Dropdown: () => Dropdown2,
    FieldOptions: () => FieldOptions2,
    FieldWithoutPicker: () => FieldWithoutPicker2,
    ManualTyping: () => ManualTyping2,
    ModalPicker: () => ModalPicker2,
    NativePicker: () => NativePicker2,
    OnClickType: () => OnClickType2,
    PredefinedTimeSlots: () => PredefinedTimeSlots2,
    ResponsiveModalPicker: () => ResponsiveModalPicker2,
    Sizes: () => Sizes2,
    States: () => States2,
    ValueType: () => ValueType2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/form/time-field/time-field.stories.tsx
  var time_field_stories_exports = {};
  __export(time_field_stories_exports, {
    CustomStep: () => CustomStep,
    Default: () => Default,
    Dropdown: () => Dropdown,
    FieldOptions: () => FieldOptions,
    FieldWithoutPicker: () => FieldWithoutPicker,
    ManualTyping: () => ManualTyping,
    ModalPicker: () => ModalPicker,
    NativePicker: () => NativePicker,
    OnClickType: () => OnClickType,
    PredefinedTimeSlots: () => PredefinedTimeSlots,
    ResponsiveModalPicker: () => ResponsiveModalPicker,
    Sizes: () => Sizes,
    States: () => States,
    ValueType: () => ValueType,
    default: () => time_field_stories_default
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

  // ds-shim:ds:TimeField
  var ds_TimeField_exports = {};
  __export(ds_TimeField_exports, {
    default: () => ds_TimeField_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_TimeField_exports, __toESM(require_ds_raw()));
  var g5 = window.Tedi;
  var ds_TimeField_default = g5["TimeField"] !== void 0 ? g5["TimeField"] : g5;

  // src/tedi/components/form/time-field/time-field.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var time_field_stories_default = {
    title: "Tedi-Ready/Components/Form/TimeField",
    component: ds_TimeField_exports.TimeField,
    parameters: {
      status: {
        type: [{ name: "breakpointSupport", url: "?path=/docs/helpers-usebreakpointprops--usebreakpointprops" }]
      },
      controls: {
        exclude: ["sm", "md", "lg", "xl", "xxl"]
      },
      design: {
        type: "figma",
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.38.59?node-id=4662-91741&m=dev"
      }
    }
  };
  var Template = (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 3, md: 6, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TimeField_exports.TimeField, { ...args }) }) });
  var sizeArray = ["default", "small"];
  var sizeLabels = { default: "Default", small: "Small" };
  var TemplateColumn = (args) => {
    const { array, property } = args;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "example-list", children: array.map((value, key) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { className: `${key === array.length - 1 ? "" : "border-bottom"} padding-14-16`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: 2, sm: 6, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: value ? sizeLabels[value] ?? value : "" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 3, md: 6, className: "d-flex", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TimeField_exports.TimeField, { label: "Aeg", id: `time-field-size--${value}`, inputProps: { [property]: value } }) })
    ] }, key)) });
  };
  var Default = {
    render: Template,
    args: {
      label: "Aeg",
      required: true,
      stepMinutes: 1
    }
  };
  var Sizes = {
    render: TemplateColumn,
    args: {
      array: sizeArray,
      property: "size"
    }
  };
  var stateArray = ["Default", "Hover", "Focus", "Active", "Disabled"];
  var States = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "state-example", children: [
      stateArray.map((state) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { className: "padding-14-16", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: 2, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: state }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: 4, xs: 12, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TimeField_exports.TimeField, { id: state, label: "Aeg", inputProps: { disabled: state === "Disabled" } }) })
      ] }, state)),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { className: "padding-14-16", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: 2, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Success" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: 4, xs: 12, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_TimeField_exports.TimeField,
          {
            id: "success-timefield",
            label: "Aeg",
            inputProps: { helper: { text: "Vihjetekst", type: "valid" } }
          }
        ) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { className: "padding-14-16", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: 2, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Error" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: 4, xs: 12, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TimeField_exports.TimeField, { id: "error-timefield", label: "Aeg", inputProps: { helper: { text: "Vihjetekst", type: "error" } } }) })
      ] })
    ] }),
    parameters: {
      pseudo: {
        hover: "#Hover",
        focus: "#Focus",
        active: "#Active"
      }
    }
  };
  var FieldOptions = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 3, md: 6, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex gap-4 flex-column", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TimeField_exports.TimeField, { id: "time-field-default", label: "Aeg" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TimeField_exports.TimeField, { id: "time-field-with-hint", label: "Aeg", inputProps: { helper: { text: "Vihjetekst" } } })
    ] }) }) });
  };
  var ValueType = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 3, md: 6, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex gap-3 flex-column", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TimeField_exports.TimeField, { id: "time-default", label: "Aeg" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TimeField_exports.TimeField, { id: "time-with-placeholder", label: "Aeg", placeholder: "tt:mm" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TimeField_exports.TimeField, { id: "time-with-default-value", label: "Aeg", defaultValue: "13:00" })
    ] }) }) });
  };
  var OnClickType = {
    render: () => {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { lg: 3, md: 6, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "small", children: "Clock button is clickable" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TimeField_exports.TimeField, { label: "Aeg", id: "calendar-button-trigger", timePickerTrigger: "button" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { lg: 3, md: 6, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "small", children: "Input is clickable" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TimeField_exports.TimeField, { label: "Aeg", id: "calendar-button-trigger", timePickerTrigger: "input" })
        ] }) })
      ] });
    },
    parameters: {
      docs: {
        description: {
          story: "timePickerTrigger prop allows you to open time picker either on input click or clock icon"
        }
      }
    }
  };
  var PredefinedTimeSlots = {
    render: () => {
      const [times, setTimes] = (0, import_react.useState)({
        input: "11:30",
        radio: "11:30",
        button: "11:30"
      });
      const availableTimes = ["09:30", "10:00", "11:30", "15:30", "18:30", "20:30"];
      const handleChange = (key) => (newTime) => {
        setTimes((prev) => ({ ...prev, [key]: newTime }));
      };
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { lg: 4, md: 6, xs: 12, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: ["small"], children: "Input trigger (recommended)" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_TimeField_exports.TimeField,
            {
              id: "slots-input",
              label: "Aeg",
              value: times.input,
              onChange: handleChange("input"),
              placeholder: "Vali aeg",
              availableTimes,
              timePickerTrigger: "input"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { lg: 4, md: 6, xs: 12, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: ["small"], children: "Radio buttons" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_TimeField_exports.TimeField,
            {
              id: "slots-radio",
              label: "Aeg",
              value: times.radio,
              onChange: handleChange("radio"),
              placeholder: "Vali aeg",
              availableTimes,
              availableTimesVariant: "grid-radio",
              timePickerTrigger: "input"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { lg: 4, md: 6, xs: 12, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: ["small"], children: "Button trigger" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_TimeField_exports.TimeField,
            {
              id: "slots-button",
              label: "Aeg",
              value: times.button,
              onChange: handleChange("button"),
              placeholder: "Vali aeg",
              availableTimes,
              timePickerTrigger: "button"
            }
          )
        ] })
      ] });
    }
  };
  var Dropdown = {
    render: () => {
      const [times, setTimes] = (0, import_react.useState)({
        empty: void 0,
        preselected: "13:30"
      });
      const availableTimes = ["12:30", "13:00", "13:30", "14:00", "14:30"];
      const handleChange = (key) => (newTime) => {
        setTimes((prev) => ({ ...prev, [key]: newTime }));
      };
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { lg: 6, md: 12, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: ["small"], children: "Button trigger" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_TimeField_exports.TimeField,
            {
              id: "dropdown-empty",
              label: "Aeg",
              value: times.empty,
              onChange: handleChange("empty"),
              placeholder: "Vali aeg",
              availableTimes,
              availableTimesVariant: "dropdown",
              timePickerTrigger: "button"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { lg: 6, md: 12, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: ["small"], children: "Input trigger" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_TimeField_exports.TimeField,
            {
              id: "dropdown-preselected",
              label: "Aeg",
              value: times.preselected,
              onChange: handleChange("preselected"),
              placeholder: "Vali aeg",
              availableTimes,
              availableTimesVariant: "dropdown",
              timePickerTrigger: "input"
            }
          )
        ] })
      ] });
    }
  };
  var FieldWithoutPicker = {
    render: Template,
    args: {
      label: "Aeg",
      placeholder: "tt:mm",
      showPicker: false
    },
    parameters: {
      docs: {
        description: {
          story: "You can set showPicker=false if you only need to use the input and not the picker"
        }
      }
    }
  };
  var CustomStep = {
    render: Template,
    args: {
      label: "Aeg 15-minutiliste sammudega",
      stepMinutes: 15,
      placeholder: "tt:mm",
      defaultValue: "12:30"
    }
  };
  var ManualTyping = (args) => {
    const [time, setTime] = (0, import_react.useState)("08:00");
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 3, md: 6, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TimeField_exports.TimeField, { ...args, value: time, onChange: (val) => setTime(val), label: "Aeg", placeholder: "tt:mm" }) }) });
  };
  var ModalPicker = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Template, { ...args }),
    args: {
      id: "time-modal",
      label: "Aeg",
      placeholder: "tt:mm",
      modal: true,
      timePickerTrigger: "input"
    }
  };
  var ResponsiveModalPicker = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Template, { ...args }),
    args: {
      id: "time-modal-responsive",
      label: "Aeg",
      placeholder: "tt:mm",
      modal: "md",
      timePickerTrigger: "input"
    }
  };
  var NativePicker = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { lg: 6, md: 12, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: ["small"], children: "Always native (useNativePicker=true)" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TimeField_exports.TimeField, { id: "native-always", label: "Aeg", defaultValue: "09:30", useNativePicker: true })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { lg: 6, md: 12, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: ["small"], children: "Responsive" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_TimeField_exports.TimeField,
          {
            id: "native-responsive",
            label: "Aeg",
            defaultValue: "09:30",
            useNativePicker: true,
            md: { useNativePicker: false }
          }
        )
      ] })
    ] }),
    parameters: {
      docs: {
        description: {
          story: 'Native time picker uses the browser’s built-in input[type="time"] UI instead of the custom TimePicker. Prefer this on mobile devices for better native UX, improved accessibility, and reduced UI complexity. It is also useful when you want to minimize bundle/UI overhead or align with platform conventions. Note: when enabled, availableTimes is ignored because native inputs do not support restricting selectable values.'
        }
      }
    }
  };

  // .design-sync/.cache/previews/TimeField.tsx
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
    compose(time_field_stories_exports, "Default")
  );
  var Sizes2 = (
    /* Sizes */
    compose(time_field_stories_exports, "Sizes")
  );
  var States2 = (
    /* States */
    compose(time_field_stories_exports, "States")
  );
  var FieldOptions2 = (
    /* Field Options */
    compose(time_field_stories_exports, "FieldOptions")
  );
  var ValueType2 = (
    /* Value Type */
    compose(time_field_stories_exports, "ValueType")
  );
  var OnClickType2 = (
    /* On Click Type */
    compose(time_field_stories_exports, "OnClickType")
  );
  var PredefinedTimeSlots2 = (
    /* Predefined Time Slots */
    compose(time_field_stories_exports, "PredefinedTimeSlots")
  );
  var Dropdown2 = (
    /* Dropdown */
    compose(time_field_stories_exports, "Dropdown")
  );
  var FieldWithoutPicker2 = (
    /* Field Without Picker */
    compose(time_field_stories_exports, "FieldWithoutPicker")
  );
  var CustomStep2 = (
    /* Custom Step */
    compose(time_field_stories_exports, "CustomStep")
  );
  var ManualTyping2 = (
    /* Manual Typing */
    compose(time_field_stories_exports, "ManualTyping")
  );
  var ModalPicker2 = (
    /* Modal Picker */
    compose(time_field_stories_exports, "ModalPicker")
  );
  var ResponsiveModalPicker2 = (
    /* Responsive Modal Picker */
    compose(time_field_stories_exports, "ResponsiveModalPicker")
  );
  var NativePicker2 = (
    /* Native Picker */
    compose(time_field_stories_exports, "NativePicker")
  );
  return __toCommonJS(TimeField_exports);
})();
