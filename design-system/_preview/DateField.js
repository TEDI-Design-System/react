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

  // .design-sync/.cache/previews/DateField.tsx
  var DateField_exports = {};
  __export(DateField_exports, {
    AvailableDays: () => AvailableDays2,
    Default: () => Default2,
    DisabledWeekends: () => DisabledWeekends2,
    FieldOptions: () => FieldOptions2,
    GridPickerFirst: () => GridPickerFirst2,
    ModalPicker: () => ModalPicker2,
    ModalPickers: () => ModalPickers2,
    MonthYearOnly: () => MonthYearOnly2,
    MultipleMonths: () => MultipleMonths2,
    MultipleTagLayout: () => MultipleTagLayout2,
    MultipleValues: () => MultipleValues2,
    NativePicker: () => NativePicker2,
    OnClickType: () => OnClickType2,
    Range: () => Range2,
    ResponsiveModalPicker: () => ResponsiveModalPicker2,
    ShowWeekCount: () => ShowWeekCount2,
    Size: () => Size2,
    States: () => States2,
    ValueType: () => ValueType2,
    WithFooter: () => WithFooter2,
    YearGrid: () => YearGrid2,
    YearOnly: () => YearOnly2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/form/date-field/date-field.stories.tsx
  var date_field_stories_exports = {};
  __export(date_field_stories_exports, {
    AvailableDays: () => AvailableDays,
    Default: () => Default,
    DisabledWeekends: () => DisabledWeekends,
    FieldOptions: () => FieldOptions,
    GridPickerFirst: () => GridPickerFirst,
    ModalPicker: () => ModalPicker,
    ModalPickers: () => ModalPickers,
    MonthYearOnly: () => MonthYearOnly,
    MultipleMonths: () => MultipleMonths,
    MultipleTagLayout: () => MultipleTagLayout,
    MultipleValues: () => MultipleValues,
    NativePicker: () => NativePicker,
    OnClickType: () => OnClickType,
    Range: () => Range,
    ResponsiveModalPicker: () => ResponsiveModalPicker,
    ShowWeekCount: () => ShowWeekCount,
    Size: () => Size,
    States: () => States,
    ValueType: () => ValueType,
    WithFooter: () => WithFooter,
    YearGrid: () => YearGrid,
    YearOnly: () => YearOnly,
    default: () => date_field_stories_default
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

  // ds-shim:ds:DateField
  var ds_DateField_exports = {};
  __export(ds_DateField_exports, {
    default: () => ds_DateField_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_DateField_exports, __toESM(require_ds_raw()));
  var g6 = window.Tedi;
  var ds_DateField_default = g6["DateField"] !== void 0 ? g6["DateField"] : g6;

  // src/tedi/components/form/date-field/date-field.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var date_field_stories_default = {
    title: "Tedi-Ready/Components/Form/DateField",
    component: ds_DateField_exports.DateField,
    parameters: {
      status: {
        type: [{ name: "breakpointSupport", url: "?path=/docs/helpers-usebreakpointprops--usebreakpointprops" }]
      },
      controls: {
        exclude: ["sm", "md", "lg", "xl", "xxl"]
      },
      design: {
        type: "figma",
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.37.57?node-id=4620-82915&m=dev"
      }
    }
  };
  var Template = (args) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_DateField_exports.DateField, { ...args });
  };
  var sizeArray = ["default", "small"];
  var TemplateColumn = (args) => {
    const { array, property, ...textFieldProps } = args;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "example-list", children: array.map((value, key) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { className: `${key === array.length - 1 ? "" : "border-bottom"} padding-14-16`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 2, xs: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: value ? value.charAt(0).toUpperCase() + value.slice(1) : "" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 10, xs: 12, className: "d-flex", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_DateField_exports.DateField,
        {
          label: "Kuupäev",
          id: `${textFieldProps.id}-${key}-1`,
          inputProps: {
            [property]: value
          }
        }
      ) })
    ] }, key)) });
  };
  var Default = {
    render: Template,
    args: {
      mode: "single",
      label: "Kuupäev",
      placeholder: "pp.kk.aaaa",
      required: true
    }
  };
  var Size = {
    render: TemplateColumn,
    args: {
      property: "size",
      array: sizeArray
    }
  };
  var stateArray = ["Default", "Hover", "Focus", "Active", "Disabled"];
  var States = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
      stateArray.map((state) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 2, xs: 12, className: "flex align-items-center gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: state }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_DateField_exports.DateField, { id: state, mode: "single", label: "Kuupäev", inputProps: { disabled: state === "Disabled" } }) })
      ] }, state)),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 2, xs: 12, className: "flex align-items-center gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Success" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_DateField_exports.DateField,
          {
            id: "success-datefield",
            mode: "single",
            label: "Kuupäev",
            inputProps: { helper: { text: "Tagasiside tekst", type: "valid" } }
          }
        ) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 2, xs: 12, className: "flex align-items-center gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Error" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_DateField_exports.DateField,
          {
            id: "error-datefield",
            mode: "single",
            label: "Kuupäev",
            inputProps: { helper: { text: "Tagasiside tekst", type: "error" } }
          }
        ) })
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
    const [shortcutValue, setShortcutValue] = (0, import_react.useState)(void 0);
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = /* @__PURE__ */ new Date();
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 6, xs: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex gap-4 flex-column", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { marginBottom: "8px", display: "block" }, children: "Default date field" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_DateField_exports.DateField, { id: "date-default", label: "Kuupäev", placeholder: "pp.kk.aaaa", mode: "single" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { marginBottom: "8px", display: "block" }, children: "Date field with helper text" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_DateField_exports.DateField,
          {
            id: "date-with-hint",
            label: "Kuupäev",
            placeholder: "pp.kk.aaaa",
            mode: "single",
            inputProps: { helper: { text: "pp.kk.aaaa" } }
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { marginBottom: "8px", display: "block" }, children: "Date field with quick-select shortcuts" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_DateField_exports.DateField,
          {
            id: "date-with-shortcuts",
            label: "Kuupäev",
            placeholder: "pp.kk.aaaa",
            mode: "single",
            selected: shortcutValue,
            parseDate: (val) => {
              const parts = val.split(".");
              if (parts.length !== 3) return void 0;
              const [day, month, year] = parts.map(Number);
              const d = new Date(year, month - 1, day);
              return isNaN(d.getTime()) ? void 0 : d;
            },
            onSelect: (d) => setShortcutValue(d instanceof Date ? d : void 0)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex gap-3", style: { marginTop: "8px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "link", size: "small", onClick: () => setShortcutValue(today), children: "Täna" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "link", size: "small", onClick: () => setShortcutValue(tomorrow), children: "Homme" })
        ] })
      ] })
    ] }) }) });
  };
  var ValueType = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 6, xs: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex gap-3 flex-column", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_DateField_exports.DateField, { id: "date-default", label: "Kuupäev" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_DateField_exports.DateField, { id: "date-with-placeholder", label: "Kuupäev", placeholder: "pp.kk.aaaa" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_DateField_exports.DateField,
        {
          id: "date-with-placeholder-and-default-value",
          label: "Kuupäev",
          placeholder: "pp.kk.aaaa",
          defaultValue: /* @__PURE__ */ new Date()
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_DateField_exports.DateField,
        {
          id: "date-with-multiple-dates",
          label: "Kuupäev",
          placeholder: "pp.kk.aaaa",
          defaultValue: [new Date(2026, 2, 24), new Date(2026, 2, 26)],
          mode: "multiple"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_DateField_exports.DateField,
        {
          id: "date-with-range",
          label: "Kuupäev",
          placeholder: "pp.kk.aaaa – pp.kk.aaaa",
          mode: "range",
          defaultValue: {
            from: new Date(2026, 2, 24),
            to: new Date(2026, 2, 27)
          }
        }
      )
    ] }) }) });
  };
  var OnClickType = {
    render: () => {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { gutterY: 2, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { lg: 6, xs: 12, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { marginBottom: "16px", display: "block" }, children: "Calendar button is clickable" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_DateField_exports.DateField, { label: "Kuupäev", placeholder: "pp.kk.aaaa", id: "calendar-button-trigger", calendarTrigger: "button" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { lg: 6, xs: 12, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { marginBottom: "16px", display: "block" }, children: "Input is clickable" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_DateField_exports.DateField, { label: "Kuupäev", placeholder: "pp.kk.aaaa", id: "calendar-input-trigger", calendarTrigger: "input" })
        ] })
      ] });
    },
    parameters: {
      docs: {
        description: {
          story: "calendarTrigger prop allows you to open calendar either on input click or calendar icon"
        }
      }
    }
  };
  var MultipleValues = {
    render: (args) => {
      const [value, setValue] = (0, import_react.useState)([]);
      const formatDate = (date) => {
        if (!date) return "";
        const fmt = new Intl.DateTimeFormat("et-EE", { day: "2-digit", month: "2-digit", year: "numeric" });
        if (date instanceof Date) {
          return fmt.format(date);
        }
        if (Array.isArray(date)) {
          return date.map((d) => fmt.format(d)).join(", ");
        }
        if ("from" in date && date.from) {
          const from = fmt.format(date.from);
          return date.to ? `${from} – ${fmt.format(date.to)}` : from;
        }
        return "";
      };
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_DateField_exports.DateField,
        {
          ...args,
          selected: value,
          onSelect: (selected) => {
            if (Array.isArray(selected)) {
              setValue(selected);
            } else if (selected instanceof Date) {
              setValue([selected]);
            } else {
              setValue([]);
            }
          },
          formatDate
        }
      );
    },
    args: {
      mode: "multiple",
      label: "Kuupäevad",
      placeholder: "pp.kk.aaaa"
    }
  };
  var MultipleTagLayout = {
    parameters: { controls: { disable: true } },
    render: () => {
      const preset = Array.from({ length: 8 }, (_, i) => new Date(2025, 0, i + 1));
      const [rowValue, setRowValue] = (0, import_react.useState)(preset);
      const [stackValue, setStackValue] = (0, import_react.useState)(preset);
      const formatDate = (date) => {
        const fmt = new Intl.DateTimeFormat("et-EE", { day: "2-digit", month: "2-digit", year: "numeric" });
        if (!date) return "";
        if (date instanceof Date) return fmt.format(date);
        if (Array.isArray(date)) return date.map((d) => fmt.format(d)).join(", ");
        if ("from" in date && date.from) {
          return date.to ? `${fmt.format(date.from)} – ${fmt.format(date.to)}` : fmt.format(date.from);
        }
        return "";
      };
      const toDates = (selected) => Array.isArray(selected) ? selected : selected instanceof Date ? [selected] : [];
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { gutterY: 3, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { xs: 12, md: 6, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { marginBottom: "8px", display: "block" }, children: "Single row — overflow collapses into a +N counter" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_DateField_exports.DateField,
            {
              mode: "multiple",
              label: "Kuupäevad",
              placeholder: "pp.kk.aaaa",
              tagsDirection: "row",
              selected: rowValue,
              onSelect: (selected) => setRowValue(toDates(selected)),
              formatDate
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { xs: 12, md: 6, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { marginBottom: "8px", display: "block" }, children: "Multiple rows (default) — the field grows in height" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_DateField_exports.DateField,
            {
              mode: "multiple",
              label: "Kuupäevad",
              placeholder: "pp.kk.aaaa",
              tagsDirection: "stack",
              selected: stackValue,
              onSelect: (selected) => setStackValue(toDates(selected)),
              formatDate
            }
          )
        ] })
      ] });
    }
  };
  var Range = {
    render: () => {
      const [defaultRange, setDefaultRange] = (0, import_react.useState)();
      const [rangeWithLimits, setRangeWithLimits] = (0, import_react.useState)();
      const [startOnly, setStartOnly] = (0, import_react.useState)({ from: /* @__PURE__ */ new Date(), to: void 0 });
      const [disablePastRange, setDisablePastRange] = (0, import_react.useState)();
      const twoMonthsAgo = /* @__PURE__ */ new Date();
      twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
      const maxDate = /* @__PURE__ */ new Date();
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { gutterY: 3, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { lg: 6, xs: 12, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { marginBottom: "8px", display: "block" }, children: "Default range" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_DateField_exports.DateField,
            {
              mode: "range",
              label: "Vahemik",
              placeholder: "pp.kk.aaaa – pp.kk.aaaa",
              selected: defaultRange,
              onSelect: (range) => setDefaultRange(range),
              id: "range-default"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { lg: 6, xs: 12, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { marginBottom: "8px", display: "block" }, children: "Future dates disabled (min/max)" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_DateField_exports.DateField,
            {
              mode: "range",
              label: "Vahemik",
              placeholder: "pp.kk.aaaa – pp.kk.aaaa",
              selected: rangeWithLimits,
              onSelect: (range) => setRangeWithLimits(range),
              minDate: twoMonthsAgo,
              maxDate,
              id: "range-with-limits"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { lg: 6, xs: 12, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { marginBottom: "8px", display: "block" }, children: "Start date only (no end selected)" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_DateField_exports.DateField,
            {
              mode: "range",
              label: "Vahemik",
              placeholder: "pp.kk.aaaa – pp.kk.aaaa",
              selected: startOnly,
              onSelect: (range) => setStartOnly(range),
              id: "range-with-start-only"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { lg: 6, xs: 12, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { marginBottom: "8px", display: "block" }, children: "Past dates disabled" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_DateField_exports.DateField,
            {
              mode: "range",
              label: "Vahemik",
              placeholder: "pp.kk.aaaa – pp.kk.aaaa",
              selected: disablePastRange,
              onSelect: (range) => setDisablePastRange(range),
              disablePast: true,
              id: "range-with-disabled-past"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { width: 12, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { marginBottom: "8px", display: "block" }, children: "Two months shown" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_DateField_exports.DateField,
            {
              mode: "range",
              label: "Vahemik",
              placeholder: "pp.kk.aaaa – pp.kk.aaaa",
              selected: defaultRange,
              onSelect: (range) => setDefaultRange(range),
              id: "range-with-multiple-months",
              numberOfMonths: 2
            }
          )
        ] })
      ] });
    }
  };
  var DisabledWeekends = {
    render: Template,
    args: {
      mode: "single",
      disabled: { dayOfWeek: [0, 6] },
      label: "Kuupäev",
      placeholder: "pp.kk.aaaa"
    }
  };
  var ShowWeekCount = {
    render: Template,
    args: {
      mode: "single",
      label: "Kuupäev",
      placeholder: "pp.kk.aaaa",
      showWeekNumber: true
    }
  };
  var MultipleMonths = {
    render: () => {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_DateField_exports.DateField, { label: "Kuupäev", placeholder: "pp.kk.aaaa", numberOfMonths: 2, mode: "single", id: "multiple-shown-single" });
    }
  };
  var YearGrid = {
    render: () => {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_DateField_exports.DateField,
        {
          label: "Kuupäev",
          placeholder: "pp.kk.aaaa",
          monthYearSelectType: "grid",
          id: "month-year-grid",
          selectionLevel: "years"
        }
      );
    }
  };
  var GridPickerFirst = {
    render: () => {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { lg: 6, xs: 12, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { marginBottom: "8px", display: "block" }, children: "Year → month → day" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_DateField_exports.DateField,
            {
              id: "date-grid-year-first",
              mode: "single",
              label: "Kuupäev",
              placeholder: "pp.kk.aaaa",
              initialView: "years",
              monthYearSelectType: "grid"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { lg: 6, xs: 12, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { marginBottom: "8px", display: "block" }, children: "Day → month → year" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_DateField_exports.DateField,
            {
              id: "date-grid-day-first",
              mode: "single",
              label: "Kuupäev",
              placeholder: "pp.kk.aaaa",
              monthYearSelectType: "grid"
            }
          )
        ] })
      ] });
    }
  };
  var MonthYearOnly = {
    render: () => {
      const [selected, setSelected] = (0, import_react.useState)();
      const formatMonthYear = (date) => {
        if (!date || !(date instanceof Date)) return "";
        const month = String(date.getMonth() + 1).padStart(2, "0");
        return `${month}.${date.getFullYear()}`;
      };
      const parseMonthYear = (input) => {
        const match = input.trim().match(/^(\d{1,2})\.(\d{4})$/);
        if (!match) return void 0;
        const month = Number(match[1]);
        const year = Number(match[2]);
        if (month < 1 || month > 12) return void 0;
        const d = new Date(year, month - 1, 1);
        return isNaN(d.getTime()) ? void 0 : d;
      };
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_DateField_exports.DateField,
        {
          id: "date-month-year-only",
          mode: "single",
          label: "Kuu ja aasta",
          placeholder: "kk.aaaa",
          selectionLevel: "months",
          monthYearSelectType: "grid",
          selected,
          onSelect: (d) => setSelected(d),
          formatDate: formatMonthYear,
          parseDate: parseMonthYear
        }
      );
    }
  };
  var YearOnly = {
    render: () => {
      const [selected, setSelected] = (0, import_react.useState)();
      const formatYear = (date) => date instanceof Date ? String(date.getFullYear()) : "";
      const parseYear = (input) => {
        const match = input.trim().match(/^(\d{4})$/);
        if (!match) return void 0;
        const d = new Date(Number(match[1]), 0, 1);
        return isNaN(d.getTime()) ? void 0 : d;
      };
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_DateField_exports.DateField,
        {
          id: "date-year-only",
          mode: "single",
          label: "Aasta",
          placeholder: "aaaa",
          selectionLevel: "years",
          monthYearSelectType: "grid",
          selected,
          onSelect: (d) => setSelected(d),
          formatDate: formatYear,
          parseDate: parseYear
        }
      );
    }
  };
  var WithFooter = {
    render: () => {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { gutterY: 3, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 6, xs: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_DateField_exports.DateField,
          {
            label: "Kuupäev",
            placeholder: "pp.kk.aaaa",
            id: "calendar-with-footer",
            footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: 12, className: "text-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "link", size: "small", iconRight: "schedule", children: "Vali kellaaeg" }) }) })
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 6, xs: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_DateField_exports.DateField,
          {
            label: "Kuupäev",
            placeholder: "pp.kk.aaaa",
            id: "calendar-with-footer-2",
            footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", fullWidth: true, size: "small", children: "Tühista" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "primary", fullWidth: true, size: "small", children: "Salvesta" })
            ] }) }) })
          }
        ) })
      ] });
    }
  };
  var AvailableDays = {
    render: () => {
      const availableDays = [
        new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() - 1)),
        new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() + 4)),
        new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() + 5)),
        new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() + 6))
      ];
      const [selected, setSelected] = (0, import_react.useState)();
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_DateField_exports.DateField,
        {
          mode: "single",
          label: "Kuupäev",
          placeholder: "pp.kk.aaaa",
          selected,
          onSelect: (date) => setSelected(date),
          availableDays,
          id: "available-days-shown"
        }
      );
    }
  };
  var NativePicker = {
    render: () => {
      const [selected, setSelected] = (0, import_react.useState)();
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_DateField_exports.DateField,
        {
          id: "date-field-native-picker",
          mode: "single",
          label: "Kuupäev",
          placeholder: "pp.kk.aaaa",
          useNativePicker: true,
          selected,
          onSelect: (date) => setSelected(date)
        }
      );
    }
  };
  var ModalPicker = {
    render: () => {
      const [selected, setSelected] = (0, import_react.useState)();
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_DateField_exports.DateField,
        {
          id: "date-field-modal",
          mode: "single",
          label: "Kuupäev",
          modal: true,
          calendarTrigger: "input",
          modalProps: { fullscreen: "edge", md: { fullscreen: false } },
          selected,
          onSelect: (date) => setSelected(date)
        }
      );
    }
  };
  var ResponsiveModalPicker = {
    render: () => {
      const [selected, setSelected] = (0, import_react.useState)();
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_DateField_exports.DateField,
        {
          id: "date-field-modal-responsive",
          mode: "single",
          label: "Kuupäev",
          modal: "md",
          calendarTrigger: "input",
          modalProps: { fullscreen: "edge" },
          selected,
          onSelect: (date) => setSelected(date)
        }
      );
    }
  };
  var ModalPickers = {
    render: () => {
      const [month, setMonth] = (0, import_react.useState)();
      const [year, setYear] = (0, import_react.useState)();
      const [range, setRange] = (0, import_react.useState)();
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { gutterY: 2, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 4, xs: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_DateField_exports.DateField,
          {
            id: "date-field-modal-month",
            mode: "single",
            label: "Kuu",
            modal: true,
            calendarTrigger: "input",
            selectionLevel: "months",
            monthYearSelectType: "grid",
            modalTitle: "Vali kuu",
            modalProps: { fullscreen: "edge", md: { fullscreen: false } },
            selected: month,
            onSelect: (date) => setMonth(date)
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 4, xs: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_DateField_exports.DateField,
          {
            id: "date-field-modal-year",
            mode: "single",
            label: "Aasta",
            modal: true,
            calendarTrigger: "input",
            selectionLevel: "years",
            monthYearSelectType: "grid",
            modalTitle: "Vali aasta",
            modalProps: { fullscreen: "edge", md: { fullscreen: false } },
            selected: year,
            onSelect: (date) => setYear(date)
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 4, xs: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_DateField_exports.DateField,
          {
            id: "date-field-modal-range",
            mode: "range",
            label: "Vahemik",
            modal: true,
            calendarTrigger: "input",
            numberOfMonths: 2,
            monthYearSelectType: "grid",
            modalTitle: "Vali vahemik",
            showNavigation: false,
            modalProps: { fullscreen: "edge", md: { fullscreen: false } },
            selected: range,
            onSelect: (date) => setRange(date)
          }
        ) })
      ] });
    }
  };

  // .design-sync/.cache/previews/DateField.tsx
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
    compose(date_field_stories_exports, "Default")
  );
  var Size2 = (
    /* Size */
    compose(date_field_stories_exports, "Size")
  );
  var States2 = (
    /* States */
    compose(date_field_stories_exports, "States")
  );
  var FieldOptions2 = (
    /* Field Options */
    compose(date_field_stories_exports, "FieldOptions")
  );
  var ValueType2 = (
    /* Value Type */
    compose(date_field_stories_exports, "ValueType")
  );
  var OnClickType2 = (
    /* On Click Type */
    compose(date_field_stories_exports, "OnClickType")
  );
  var MultipleValues2 = (
    /* Multiple Values */
    compose(date_field_stories_exports, "MultipleValues")
  );
  var MultipleTagLayout2 = (
    /* Multiple Tag Layout */
    compose(date_field_stories_exports, "MultipleTagLayout")
  );
  var Range2 = (
    /* Range */
    compose(date_field_stories_exports, "Range")
  );
  var DisabledWeekends2 = (
    /* Disabled Weekends */
    compose(date_field_stories_exports, "DisabledWeekends")
  );
  var ShowWeekCount2 = (
    /* Show Week Count */
    compose(date_field_stories_exports, "ShowWeekCount")
  );
  var MultipleMonths2 = (
    /* Multiple Months */
    compose(date_field_stories_exports, "MultipleMonths")
  );
  var YearGrid2 = (
    /* Year Grid */
    compose(date_field_stories_exports, "YearGrid")
  );
  var GridPickerFirst2 = (
    /* Grid Picker First */
    compose(date_field_stories_exports, "GridPickerFirst")
  );
  var MonthYearOnly2 = (
    /* Month Year Only */
    compose(date_field_stories_exports, "MonthYearOnly")
  );
  var YearOnly2 = (
    /* Year Only */
    compose(date_field_stories_exports, "YearOnly")
  );
  var WithFooter2 = (
    /* With Footer */
    compose(date_field_stories_exports, "WithFooter")
  );
  var AvailableDays2 = (
    /* Available Days */
    compose(date_field_stories_exports, "AvailableDays")
  );
  var NativePicker2 = (
    /* Native Picker */
    compose(date_field_stories_exports, "NativePicker")
  );
  var ModalPicker2 = (
    /* Modal Picker */
    compose(date_field_stories_exports, "ModalPicker")
  );
  var ResponsiveModalPicker2 = (
    /* Responsive Modal Picker */
    compose(date_field_stories_exports, "ResponsiveModalPicker")
  );
  var ModalPickers2 = (
    /* Modal Pickers */
    compose(date_field_stories_exports, "ModalPickers")
  );
  return __toCommonJS(DateField_exports);
})();
