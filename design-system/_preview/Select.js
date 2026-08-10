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
      function jsx5(t, p, k) {
        var c = p && p.children;
        return c === void 0 ? R.createElement(t, np(p, k)) : R.createElement(t, np(p, k), c);
      }
      function jsxs4(t, p, k) {
        return R.createElement.apply(R, [t, np(p, k)].concat(p.children));
      }
      module.exports = R;
      module.exports.jsx = jsx5;
      module.exports.jsxs = jsxs4;
      module.exports.jsxDEV = function(t, p, k, s) {
        return (s ? jsxs4 : jsx5)(t, p, k);
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

  // .design-sync/.cache/previews/Select.tsx
  var Select_exports = {};
  __export(Select_exports, {
    AsyncSelect: () => AsyncSelect2,
    Default: () => Default2,
    DeferKeyboardOnTouch: () => DeferKeyboardOnTouch2,
    EditableSelect: () => EditableSelect2,
    EllipsisTags: () => EllipsisTags2,
    Examples: () => Examples2,
    MultipleHandled: () => MultipleHandled2,
    Sizes: () => Sizes2,
    States: () => States2,
    Type: () => Type2,
    ValueType: () => ValueType2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React4 = __toESM(require_react_shim(), 1);

  // src/tedi/components/form/select/select.stories.tsx
  var select_stories_exports = {};
  __export(select_stories_exports, {
    AsyncSelect: () => AsyncSelect,
    Default: () => Default,
    DeferKeyboardOnTouch: () => DeferKeyboardOnTouch,
    EditableSelect: () => EditableSelect,
    EllipsisTags: () => EllipsisTags,
    Examples: () => Examples,
    MultipleHandled: () => MultipleHandled,
    Sizes: () => Sizes,
    States: () => States,
    Type: () => Type,
    ValueType: () => ValueType,
    default: () => select_stories_default
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

  // ds-shim:ds:Checkbox
  var ds_Checkbox_exports = {};
  __export(ds_Checkbox_exports, {
    default: () => ds_Checkbox_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Checkbox_exports, __toESM(require_ds_raw()));
  var g6 = window.Tedi;
  var ds_Checkbox_default = g6["Checkbox"] !== void 0 ? g6["Checkbox"] : g6;

  // src/tedi/components/form/select/examples/async.tsx
  init_define_import_meta_env();
  init_define_process_env();
  var import_react = __toESM(require_react_shim());

  // ds-shim:ds:Select
  var ds_Select_exports = {};
  __export(ds_Select_exports, {
    default: () => ds_Select_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Select_exports, __toESM(require_ds_raw()));
  var g7 = window.Tedi;
  var ds_Select_default = g7["Select"] !== void 0 ? g7["Select"] : g7;

  // src/tedi/components/form/select/examples/async.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var colourOptions = [
    { value: "ocean", label: "Ocean" },
    { value: "blue", label: "Blue", isDisabled: true },
    { value: "purple", label: "Purple" },
    { value: "red", label: "Red" },
    { value: "orange", label: "Orange" },
    { value: "yellow", label: "Yellow" },
    { value: "green", label: "Green" },
    { value: "forest", label: "Forest" },
    { value: "slate", label: "Slate" },
    { value: "silver", label: "Silver" }
  ];
  var filterColors = (inputValue) => {
    return colourOptions.filter((i) => {
      if (typeof i.label === "string") {
        return i.label.toLowerCase().includes(inputValue.toLowerCase());
      }
      return;
    });
  };
  var loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      console.log(inputValue);
      callback(filterColors(inputValue));
    }, 1e3);
  };
  var AsyncSelectTemplate = (args) => {
    const [inputValue, setInputValue] = import_react.default.useState("");
    const handleInputChange = (newValue) => {
      const newInputValue = newValue.replace(/\W/g, "");
      setInputValue(newInputValue);
      return newInputValue;
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
        "value: ",
        inputValue
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Select_default, { ...args, onInputChange: handleInputChange, loadOptions })
    ] });
  };

  // src/tedi/components/form/select/examples/editable.tsx
  init_define_import_meta_env();
  init_define_process_env();
  var import_react2 = __toESM(require_react_shim());
  var import_jsx_runtime2 = __toESM(require_react_shim());
  var colourOptions2 = [
    { value: "ocean", label: "Ocean" },
    { value: "blue", label: "Blue", isDisabled: true },
    { value: "purple", label: "Purple" },
    { value: "red", label: "Red" },
    { value: "orange", label: "Orange" },
    { value: "yellow", label: "Yellow" },
    { value: "green", label: "Green" },
    { value: "forest", label: "Forest" },
    { value: "slate", label: "Slate" },
    { value: "silver", label: "Silver" }
  ];
  var EditableSelectTemplate = (args) => {
    const [inputValue, setInputValue] = import_react2.default.useState("");
    const [value, setValue] = import_react2.default.useState(null);
    const handleInputChange = (newValue, { action }) => {
      if (action === "input-change") setInputValue(newValue);
      return newValue;
    };
    const handleOnChange = (value2) => {
      setValue(value2);
      setInputValue(value2 ? value2.label : "");
    };
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { children: [
        "value: ",
        inputValue
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        ds_Select_default,
        {
          ...args,
          value,
          inputValue,
          onInputChange: handleInputChange,
          onChange: handleOnChange,
          inputIsHidden: false,
          options: colourOptions2
        }
      )
    ] });
  };

  // src/tedi/components/form/select/examples/multiple-handled.tsx
  init_define_import_meta_env();
  init_define_process_env();
  var import_react3 = __toESM(require_react_shim());
  var import_jsx_runtime3 = __toESM(require_react_shim());
  var colourOptions3 = [
    { value: "ocean", label: "Ocean" },
    { value: "blue", label: "Blue", isDisabled: true },
    { value: "purple", label: "Purple" },
    { value: "red", label: "Red" },
    { value: "orange", label: "Orange" },
    { value: "yellow", label: "Yellow" },
    { value: "green", label: "Green" },
    { value: "forest", label: "Forest" },
    { value: "slate", label: "Slate" },
    { value: "silver", label: "Silver" }
  ];
  var defaultOptions = [colourOptions3[0], colourOptions3[2]];
  var MultipleHandledTemplate = (args) => {
    const [inputValue, setInputValue] = import_react3.default.useState(args.defaultValue ?? defaultOptions);
    const handleInputChange = (newValue) => {
      setInputValue(newValue);
      return inputValue;
    };
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(grid_exports.Col, { lg: 4, sm: 12, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      ds_Select_default,
      {
        tagsDirection: "stack",
        options: colourOptions3,
        onChange: (value) => handleInputChange(value),
        value: inputValue,
        ...args
      }
    ) }) });
  };

  // src/tedi/components/form/select/select.stories.tsx
  var import_jsx_runtime4 = __toESM(require_react_shim());
  var meta = {
    component: ds_Select_default,
    title: "TEDI-Ready/Components/Form/Select"
  };
  var select_stories_default = meta;
  var options = [
    { value: "tallinn", label: "Tallinn" },
    { value: "narva", label: "Narva" },
    { value: "tartu", label: "Tartu", isDisabled: true },
    { value: "elva", label: "Elva" },
    { value: "rakvere", label: "Rakvere" },
    { value: "haapsalu", label: "Haapsalu" }
  ];
  var TemplateSizes = (args) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(grid_exports.Col, { lg: 12, xs: 12, className: "example-list", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(grid_exports.Row, { className: "border-bottom padding-14-16", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { lg: 2, xs: 12, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Default" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { lg: 10, xs: 12, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Select_default, { ...args, id: "select-size-default" }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(grid_exports.Row, { className: "padding-14-16", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { lg: 2, xs: 12, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Small" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { lg: 10, xs: 12, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Select_default, { ...args, size: "small", id: "select-size-small" }) })
    ] })
  ] }) });
  var Default = {
    args: {
      id: "example-1",
      label: "Label",
      defaultValue: options[1],
      options
    }
  };
  var Sizes = {
    render: TemplateSizes,
    args: {
      label: "Label",
      options
    }
  };
  var Type = {
    args: {
      options,
      label: "Label"
    },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Select_default, { ...args, id: "type-default", label: "Default" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        ds_Select_default,
        {
          ...args,
          id: "type-hint",
          label: "With hint",
          helper: { text: "Hint text", type: "hint", position: "left" }
        }
      )
    ] })
  };
  var States = {
    args: {
      options,
      label: "Label"
    },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { lg: 2, xs: 12, className: "flex align-items-center gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Default" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Select_default, { ...args, id: "example-default" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { lg: 2, xs: 12, className: "flex align-items-center gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Hover" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          ds_Select_default,
          {
            ...args,
            id: "example-hover",
            classNames: {
              control: "pseudo-hover"
            }
          }
        ) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { lg: 2, xs: 12, className: "flex align-items-center gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Focus" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          ds_Select_default,
          {
            ...args,
            id: "example-focus",
            classNames: {
              control: "pseudo-focus"
            }
          }
        ) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { lg: 2, xs: 12, className: "flex align-items-center gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Active" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          ds_Select_default,
          {
            ...args,
            id: "example-active",
            classNames: {
              control: "pseudo-active"
            }
          }
        ) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { lg: 2, xs: 12, className: "flex align-items-center gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Error" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Select_default, { ...args, helper: { text: "Error text", type: "error" }, id: "example-error" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { lg: 2, xs: 12, className: "flex align-items-center gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Success" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Select_default, { ...args, helper: { text: "Valid text", type: "valid" }, id: "example-valid" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { lg: 2, xs: 12, className: "flex align-items-center gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Disabled" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Select_default, { ...args, disabled: true, id: "example-disabled" }) })
      ] })
    ] })
  };
  var longTagOptions = [
    { value: "longer-text", label: "Longer text" },
    { value: "longer-text-on-one-row", label: "Longer text on one row" },
    { value: "third-option", label: "Third option" },
    { value: "fourth-option", label: "Fourth option" },
    { value: "fifth-option", label: "Fifth option" }
  ];
  var multiTagOptions = Array.from({ length: 10 }, (_, i) => ({
    value: `tag-${i + 1}`,
    label: `Tag ${i + 1}`
  }));
  var colorPickerOptions = [
    { name: "Transparent", color: "transparent" },
    { name: "White", color: "#ffffff" },
    { name: "Red", color: "#f42a25" },
    { name: "Magenta", color: "#e81e63" },
    { name: "Purple", color: "#b21f7e" },
    { name: "Violet", color: "#673ab7" },
    { name: "Indigo", color: "#3f51b5" },
    { name: "Blue", color: "#3f88c5" },
    { name: "Light blue", color: "#03a9f3" },
    { name: "Cyan", color: "#00bcd3" },
    { name: "Teal", color: "#009688" },
    { name: "Green", color: "#4caf50" },
    { name: "Light green", color: "#8bc24a" },
    { name: "Lime", color: "#ccdb39" },
    { name: "Yellow", color: "#f2d611" },
    { name: "Amber", color: "#ffc107" },
    { name: "Orange", color: "#ff9800" },
    { name: "Deep orange", color: "#ff5722" },
    { name: "Grey", color: "#9e9e9e" },
    { name: "Blue grey", color: "#607d8b" },
    { name: "Brown", color: "#795548" },
    { name: "Black", color: "#0d0d0d" }
  ].map((c, i) => ({ value: String(i + 1), label: c.name, customData: c }));
  var colorSwatchStyle = (data) => ({
    width: "100%",
    height: "100%",
    borderRadius: 4,
    background: data.color === "transparent" ? "linear-gradient(to top right, #fff calc(50% - 1px), #e53935 calc(50% - 1px), #e53935 calc(50% + 1px), #fff calc(50% + 1px))" : data.color,
    border: data.color === "transparent" || data.color === "#ffffff" ? "1px solid var(--form-input-border-default)" : "none"
  });
  var triggerSwatchStyle = (data) => ({
    ...colorSwatchStyle(data),
    width: 24,
    height: 24
  });
  var iconPickerOptions = [
    { name: "Desktop", icon: "computer" },
    { name: "Phone", icon: "smartphone" },
    { name: "Tablet", icon: "tablet_mac" },
    { name: "Watch", icon: "watch" },
    { name: "TV", icon: "tv" }
  ].map((d, i) => ({ value: String(i + 1), label: d.name, customData: d }));
  var ValueType = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Select_default, { id: "value-no-value", label: "No value", options, isClearable: false }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Select_default, { id: "value-default", label: "Default", options, defaultValue: options[0], isClearable: true }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        ds_Select_default,
        {
          id: "value-placeholder",
          label: "Placeholder",
          options,
          placeholder: "Text value",
          isClearable: false
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        ds_Select_default,
        {
          id: "value-multiselect",
          label: "Multiselect",
          options: multiTagOptions,
          defaultValue: multiTagOptions,
          multiple: true,
          tagsDirection: "stack",
          isTagRemovable: true,
          isClearable: true
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        ds_Select_default,
        {
          id: "value-multiselect-one-row",
          label: "Multiselect one row",
          options: longTagOptions,
          defaultValue: longTagOptions,
          multiple: true,
          tagsDirection: "row",
          isTagRemovable: true,
          isClearable: true
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { style: { width: 100 }, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        ds_Select_default,
        {
          id: "value-color",
          label: "Color",
          options: colorPickerOptions,
          defaultValue: colorPickerOptions[0],
          dropdownType: "grid",
          isClearable: false,
          isSearchable: false,
          renderValue: (option) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "div",
            {
              role: "img",
              "aria-label": option.customData.name,
              style: triggerSwatchStyle(option.customData)
            }
          ),
          renderOption: (optionProps) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "div",
            {
              role: "img",
              "aria-label": optionProps.data.customData.name,
              style: colorSwatchStyle(optionProps.data.customData)
            }
          )
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { style: { width: 100 }, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        ds_Select_default,
        {
          id: "value-icon",
          label: "Icon",
          options: iconPickerOptions,
          defaultValue: iconPickerOptions[0],
          dropdownType: "grid",
          isClearable: false,
          isSearchable: false,
          renderValue: (option) => {
            const data = option.customData;
            return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Icon_exports.Icon, { name: data.icon, size: 24, "aria-label": data.name });
          },
          renderOption: (optionProps) => {
            const data = optionProps.data.customData;
            return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Icon_exports.Icon, { name: data.icon, size: 18, "aria-label": data.name });
          }
        }
      ) })
    ] })
  };
  var EllipsisTags = {
    render: () => {
      const longOptions = [
        { value: "a", label: "A fairly long option label that does not fit" },
        { value: "b", label: "Another rather long option label" },
        { value: "c", label: "2026-06-25 quarterly financial report" }
      ];
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { style: { maxWidth: "20rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          ds_Select_default,
          {
            id: "ellipsis-tags-end",
            label: "Truncate the end",
            options: longOptions,
            defaultValue: longOptions,
            multiple: true,
            tagsEllipsis: "end",
            isTagRemovable: true,
            isClearable: true
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          ds_Select_default,
          {
            id: "ellipsis-tags-start",
            label: "Truncate the start",
            options: longOptions,
            defaultValue: longOptions,
            multiple: true,
            tagsEllipsis: "start",
            isTagRemovable: true,
            isClearable: true
          }
        )
      ] }) });
    }
  };
  var departmentOptions = [
    "Emergency department",
    "Internal medicine",
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Radiology",
    "Surgery",
    "Urology",
    "Dermatology",
    "Oncology",
    "Gastroenterology",
    "Pulmonology",
    "Nephrology",
    "Endocrinology",
    "Rheumatology",
    "Infectious diseases",
    "Hematology",
    "Allergy and immunology",
    "Geriatrics",
    "Neonatology",
    "Palliative care",
    "Physical medicine",
    "Anesthesiology",
    "Pathology",
    "Nuclear medicine",
    "Ophthalmology",
    "Otolaryngology",
    "Plastic surgery"
  ].map((label) => ({ value: label.toLowerCase().replace(/\s+/g, "-"), label }));
  var groupedDepartments = [
    {
      label: "Emergency",
      options: [
        { value: "emergency-department", label: "Emergency department" },
        { value: "urgent-care", label: "Urgent care" }
      ]
    },
    {
      label: "Internal",
      options: [
        { value: "internal-medicine", label: "Internal medicine" },
        { value: "cardiology", label: "Cardiology" },
        { value: "neurology", label: "Neurology" }
      ]
    },
    {
      label: "Surgery",
      options: [
        { value: "general-surgery", label: "General surgery" },
        { value: "orthopedic-surgery", label: "Orthopedic surgery" },
        { value: "neurosurgery", label: "Neurosurgery" }
      ]
    }
  ];
  var accessOptions = [
    {
      value: "1",
      label: "Access to health data",
      customData: { title: "Access to health data", description: "Doctors will be able to see your health data" }
    },
    {
      value: "2",
      label: "Access to medications and health data",
      customData: {
        title: "Access to medications and health data",
        description: "Doctors will be able to see your medications and health data"
      }
    },
    {
      value: "3",
      label: "Access to all",
      customData: { title: "Access to all", description: "Doctors will be able to see all your information" }
    }
  ];
  var permissionOptions = [
    {
      value: "1",
      label: "Read permissions",
      customData: { title: "Read permissions", description: "Can view documents and files" }
    },
    {
      value: "2",
      label: "Write permissions",
      customData: { title: "Write permissions", description: "Can create and edit documents" }
    },
    {
      value: "3",
      label: "Admin permissions",
      customData: { title: "Admin permissions", description: "Full access to all features" }
    }
  ];
  var locationMetaOptions = [
    { value: "1", label: "Tallinn", customData: { name: "Tallinn", slots: 3 } },
    { value: "2", label: "Tartu", customData: { name: "Tartu", slots: 4 } },
    { value: "3", label: "Elva", customData: { name: "Elva", slots: 7 } },
    { value: "4", label: "Pärnu", customData: { name: "Pärnu", slots: 2 } },
    { value: "5", label: "Narva", customData: { name: "Narva", slots: 5 } }
  ];
  var renderDescriptionOption = (props) => {
    const { title, description } = props.data.customData;
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Row, { gutterY: 2, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(grid_exports.Col, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Text_exports.Text, { children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Text_exports.Text, { color: "secondary", modifiers: "small", children: description })
    ] }) });
  };
  var renderDescriptionOptionWithCheckbox = (props) => {
    const { title, description } = props.data.customData;
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(grid_exports.Row, { gutterY: 2, gutterX: 1, alignItems: "start", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        ds_Checkbox_exports.Checkbox,
        {
          id: props.data.value,
          label: "",
          "aria-hidden": true,
          value: props.data.value,
          name: props.data.value,
          checked: props.isSelected,
          onChange: () => null,
          disabled: props.isDisabled
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(grid_exports.Col, { width: "auto", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "sr-only", children: props.label }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Text_exports.Text, { children: title }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Text_exports.Text, { color: "secondary", modifiers: "small", children: description })
      ] })
    ] });
  };
  var renderHorizontalMetaOption = (props) => {
    const { name, slots } = props.data.customData;
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(grid_exports.Row, { justifyContent: "between", gutterY: 0, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Text_exports.Text, { children: name }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ds_Text_exports.Text, { color: "secondary", modifiers: "small", children: [
        slots,
        " timeslots available"
      ] }) })
    ] });
  };
  var selectAllOptions = [
    { value: "1", label: "Locations" },
    { value: "2", label: "Doctors" },
    { value: "3", label: "Hospitals" }
  ];
  var Examples = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        ds_Select_default,
        {
          id: "examples-select-all",
          label: "Multiselect with Select All",
          placeholder: "Select options...",
          options: selectAllOptions,
          multiple: true,
          showSelectAll: true,
          isClearable: false
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        ds_Select_default,
        {
          id: "examples-scrollable",
          label: "Scrollable list",
          placeholder: "Select department...",
          options: departmentOptions,
          isClearable: false,
          isSearchable: false
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        ds_Select_default,
        {
          id: "examples-searchable",
          label: "Searchable select",
          placeholder: "Search departments...",
          options: departmentOptions,
          isSearchable: true,
          isClearable: true
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        ds_Select_default,
        {
          id: "examples-searchable-multi",
          label: "Searchable multiselect",
          placeholder: "Search and select departments...",
          options: departmentOptions,
          isSearchable: true,
          multiple: true,
          isClearable: true,
          isTagRemovable: true
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        ds_Select_default,
        {
          id: "examples-grouped-single",
          label: "Grouped single select",
          placeholder: "Select department...",
          options: groupedDepartments,
          isClearable: false
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        ds_Select_default,
        {
          id: "examples-with-description",
          label: "Options with descriptions",
          placeholder: "Select access level...",
          options: accessOptions,
          renderOption: renderDescriptionOption,
          isClearable: false
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        ds_Select_default,
        {
          id: "examples-grouped-multi",
          label: "Grouped multiselect",
          placeholder: "Select departments...",
          options: groupedDepartments,
          multiple: true,
          isClearable: true,
          isTagRemovable: true
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        ds_Select_default,
        {
          id: "examples-grouped-selectable",
          label: "Grouped multiselect with selectable groups",
          placeholder: "Select departments...",
          options: groupedDepartments,
          multiple: true,
          selectableGroups: true,
          isClearable: true,
          isTagRemovable: true
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        ds_Select_default,
        {
          id: "examples-grouped-select-all",
          label: "Grouped multiselect with Select All",
          placeholder: "Select departments...",
          options: groupedDepartments,
          multiple: true,
          showSelectAll: true,
          selectableGroups: true,
          isClearable: true,
          isTagRemovable: true
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        ds_Select_default,
        {
          id: "examples-horizontal-meta",
          label: "Options with horizontal meta",
          placeholder: "Select location...",
          options: locationMetaOptions,
          renderOption: renderHorizontalMetaOption,
          isClearable: false
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        ds_Select_default,
        {
          id: "examples-radio",
          label: "Single select with radio buttons",
          placeholder: "Select access level...",
          options: accessOptions,
          showRadioButtons: true,
          isClearable: false
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        ds_Select_default,
        {
          id: "examples-multi-custom",
          label: "Multiselect with custom templates",
          placeholder: "Select permissions...",
          options: permissionOptions,
          renderOption: renderDescriptionOptionWithCheckbox,
          multiple: true,
          isClearable: true,
          isTagRemovable: true
        }
      )
    ] })
  };
  var MultipleHandled = {
    render: MultipleHandledTemplate,
    args: {
      id: "multiple-handled-example",
      label: "Multiple Select",
      multiple: true,
      isTagRemovable: true
    }
  };
  var AsyncSelect = {
    render: AsyncSelectTemplate,
    args: {
      id: "async-example",
      label: "Async label",
      async: true
    }
  };
  var EditableSelect = {
    render: EditableSelectTemplate,
    args: {
      id: "editable-example",
      label: "Editable label"
    }
  };
  var DeferKeyboardOnTouch = {
    args: {
      id: "defer-keyboard-example",
      label: "Address",
      placeholder: "Vali...",
      options,
      openKeyboardOnTouch: false,
      isSearchable: true
    }
  };

  // .design-sync/.cache/previews/Select.tsx
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
      if (C) render = () => React4.createElement(C, args);
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
    return () => React4.createElement("div", { style: { background: bg } }, composed());
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
    compose(select_stories_exports, "Default")
  );
  var Sizes2 = (
    /* Sizes */
    compose(select_stories_exports, "Sizes")
  );
  var Type2 = (
    /* Type */
    compose(select_stories_exports, "Type")
  );
  var States2 = (
    /* States */
    compose(select_stories_exports, "States")
  );
  var ValueType2 = (
    /* Value Type */
    compose(select_stories_exports, "ValueType")
  );
  var EllipsisTags2 = (
    /* Ellipsis Tags */
    compose(select_stories_exports, "EllipsisTags")
  );
  var Examples2 = (
    /* Examples */
    compose(select_stories_exports, "Examples")
  );
  var MultipleHandled2 = (
    /* Multiple Handled */
    compose(select_stories_exports, "MultipleHandled")
  );
  var AsyncSelect2 = (
    /* Async Select */
    compose(select_stories_exports, "AsyncSelect")
  );
  var EditableSelect2 = (
    /* Editable Select */
    compose(select_stories_exports, "EditableSelect")
  );
  var DeferKeyboardOnTouch2 = (
    /* Defer Keyboard On Touch */
    compose(select_stories_exports, "DeferKeyboardOnTouch")
  );
  return __toCommonJS(Select_exports);
})();
