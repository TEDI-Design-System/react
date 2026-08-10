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

  // .design-sync/.cache/previews/Search.tsx
  var Search_exports = {};
  __export(Search_exports, {
    AccessibilityFocused: () => AccessibilityFocused2,
    AsyncSuggestions: () => AsyncSuggestions2,
    Clearable: () => Clearable2,
    ClearableWithButton: () => ClearableWithButton2,
    Default: () => Default2,
    Placeholder: () => Placeholder2,
    Sizes: () => Sizes2,
    States: () => States2,
    Typeahead: () => Typeahead2,
    WithHint: () => WithHint2,
    WithResultAndActions: () => WithResultAndActions2,
    WithSuggestions: () => WithSuggestions2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/form/search/search.stories.tsx
  var search_stories_exports = {};
  __export(search_stories_exports, {
    AccessibilityFocused: () => AccessibilityFocused,
    AsyncSuggestions: () => AsyncSuggestions,
    Clearable: () => Clearable,
    ClearableWithButton: () => ClearableWithButton,
    Default: () => Default,
    Placeholder: () => Placeholder,
    Sizes: () => Sizes,
    States: () => States,
    Typeahead: () => Typeahead,
    WithHint: () => WithHint,
    WithResultAndActions: () => WithResultAndActions,
    WithSuggestions: () => WithSuggestions,
    default: () => search_stories_default
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

  // ds-shim:ds:Spinner
  var ds_Spinner_exports = {};
  __export(ds_Spinner_exports, {
    default: () => ds_Spinner_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Spinner_exports, __toESM(require_ds_raw()));
  var g6 = window.Tedi;
  var ds_Spinner_default = g6["Spinner"] !== void 0 ? g6["Spinner"] : g6;

  // ds-shim:ds:OptionContent
  var ds_OptionContent_exports = {};
  __export(ds_OptionContent_exports, {
    default: () => ds_OptionContent_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_OptionContent_exports, __toESM(require_ds_raw()));
  var g7 = window.Tedi;
  var ds_OptionContent_default = g7["OptionContent"] !== void 0 ? g7["OptionContent"] : g7;

  // ds-shim:ds:Separator
  var ds_Separator_exports = {};
  __export(ds_Separator_exports, {
    default: () => ds_Separator_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Separator_exports, __toESM(require_ds_raw()));
  var g8 = window.Tedi;
  var ds_Separator_default = g8["Separator"] !== void 0 ? g8["Separator"] : g8;

  // ds-shim:ds:Dropdown
  var ds_Dropdown_exports = {};
  __export(ds_Dropdown_exports, {
    default: () => ds_Dropdown_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Dropdown_exports, __toESM(require_ds_raw()));
  var g9 = window.Tedi;
  var ds_Dropdown_default = g9["Dropdown"] !== void 0 ? g9["Dropdown"] : g9;

  // ds-shim:ds:DropdownContext
  var ds_DropdownContext_exports = {};
  __export(ds_DropdownContext_exports, {
    default: () => ds_DropdownContext_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_DropdownContext_exports, __toESM(require_ds_raw()));
  var g10 = window.Tedi;
  var ds_DropdownContext_default = g10["DropdownContext"] !== void 0 ? g10["DropdownContext"] : g10;

  // ds-shim:ds:DropdownItem
  var ds_DropdownItem_exports = {};
  __export(ds_DropdownItem_exports, {
    default: () => ds_DropdownItem_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_DropdownItem_exports, __toESM(require_ds_raw()));
  var g11 = window.Tedi;
  var ds_DropdownItem_default = g11["DropdownItem"] !== void 0 ? g11["DropdownItem"] : g11;

  // ds-shim:ds:Search
  var ds_Search_exports = {};
  __export(ds_Search_exports, {
    default: () => ds_Search_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Search_exports, __toESM(require_ds_raw()));
  var g12 = window.Tedi;
  var ds_Search_default = g12["Search"] !== void 0 ? g12["Search"] : g12;

  // src/tedi/components/form/search/search.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    component: ds_Search_exports.Search,
    title: "TEDI-Ready/Components/Form/Search",
    parameters: {
      status: {
        type: [{ name: "breakpointSupport", url: "?path=/docs/helpers-usebreakpointprops--usebreakpointprops" }]
      },
      controls: {
        exclude: ["sm", "md", "lg", "xl", "xxl"]
      },
      design: {
        type: "figma",
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4620-82860&m=dev"
      }
    }
  };
  var search_stories_default = meta;
  var stateArray = ["Default", "Hover", "Focus", "Active", "Disabled"];
  var sizeArray = ["small", "default", "large"];
  var TemplateColumn = (args) => {
    const { array, property, id = "search", ...textFieldProps } = args;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "example-list", children: array.map((value, key) => {
      const baseId = `${id}-${property}-${value}`;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { className: `${key === array.length - 1 ? "" : "border-bottom"} padding-14-16`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: 12, sm: 2, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: value ? value.charAt(0).toUpperCase() + value.slice(1) : "" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: 12, sm: 10, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Search_exports.Search, { ...textFieldProps, ...{ [property]: value }, id: `${baseId}-plain` }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Search_exports.Search,
            {
              ...textFieldProps,
              ...{ [property]: value },
              id: `${baseId}-icon`,
              button: { icon: "search", size: value, "aria-label": "Otsi" }
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Search_exports.Search,
            {
              ...textFieldProps,
              ...{ [property]: value },
              id: `${baseId}-button`,
              button: { iconLeft: "search", children: "Otsi", size: value }
            }
          )
        ] }) })
      ] }, key);
    }) });
  };
  var TemplateColumnWithStates = (args) => {
    const { array, id = "search", ...textFieldProps } = args;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
      array.map((state, index) => {
        const stateId = `${id}-${state.toLowerCase()}`;
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 2, xs: 12, className: "flex align-items-center gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: state }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Search_exports.Search, { ...textFieldProps, id: stateId, disabled: state === "Disabled" }) })
        ] }, index);
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 2, xs: 12, className: "flex align-items-center gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Success" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Search_exports.Search, { ...textFieldProps, id: `${id}-success`, helper: { text: "Tagasiside tekst", type: "valid" } }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 2, xs: 12, className: "flex align-items-center gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Error" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Search_exports.Search, { ...textFieldProps, id: `${id}-error`, helper: { text: "Tagasiside tekst", type: "error" } }) })
      ] })
    ] });
  };
  var Default = {
    args: {
      id: "search-default",
      label: "Otsing",
      placeholder: "Otsi nime või märksõna järgi"
    }
  };
  var Sizes = {
    render: TemplateColumn,
    args: {
      id: "search-sizes",
      label: "Otsing",
      property: "size",
      array: sizeArray
    }
  };
  var States = {
    render: TemplateColumnWithStates,
    args: {
      array: stateArray,
      label: "Otsing",
      id: "search-states"
    },
    parameters: {
      pseudo: {
        hover: "#search-states-hover",
        focus: "#search-states-focus",
        active: "#search-states-active"
      }
    }
  };
  var Placeholder = {
    args: {
      id: "search-placeholder",
      label: "Otsing",
      placeholder: "Trüki midagi…"
    }
  };
  var Clearable = {
    args: {
      id: "search-clearable",
      label: "Otsing",
      isClearable: true,
      defaultValue: "Lorem ipsum"
    }
  };
  var ClearableWithButton = {
    name: "Clearable with button",
    args: {
      id: "search-clearable-button",
      label: "Otsing",
      isClearable: true,
      defaultValue: "Lorem ipsum",
      button: { iconLeft: "search", children: "Otsi" }
    }
  };
  var WithHint = {
    args: {
      id: "search-with-hint",
      label: "Otsing",
      helper: { text: "Vihjetekst" }
    }
  };
  var WithSuggestions = {
    name: "With suggestions",
    render: function WithSuggestionsExample() {
      const [value, setValue] = (0, import_react.useState)("Mar");
      const [open, setOpen] = (0, import_react.useState)(false);
      const names = ["Mari Maasikas", "Marelle Mets", "Marjanne Meri", "Mart Mesi", "Martin Saar"];
      const matches = names.filter((name) => name.toLowerCase().includes(value.toLowerCase()));
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown, { open: open && matches.length > 0, onOpenChange: setOpen, width: "trigger", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Search_exports.Search, { id: "search-suggestions", label: "Otsi", value, onChange: setValue }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Content, { children: matches.map((name, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: i, onClick: () => setValue(name), children: name }, name)) })
      ] });
    }
  };
  var WithResultAndActions = {
    name: "With result and actions",
    render: function WithResultAndActionsExample() {
      const [value, setValue] = (0, import_react.useState)("4954080254");
      const [open, setOpen] = (0, import_react.useState)(false);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown, { open, onOpenChange: setOpen, width: "trigger", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Search_exports.Search, { id: "search-result-actions", label: "Otsi", value, onChange: setValue }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown.Content, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 0, closeOnSelect: false, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_OptionContent_exports.OptionContent.Label, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "span", modifiers: "bold", children: "Laura Kassisaba" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              ds_Separator_default,
              {
                axis: "vertical",
                color: "secondary",
                display: "inline",
                dotSize: "small",
                element: "span",
                spacing: 0.5,
                variant: "dot-only"
              }
            ),
            "49504080254"
          ] }) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_default, { color: "secondary" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { padding: "var(--dropdown-item-padding-y) var(--dropdown-item-padding-x)" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0.75, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { gutter: 2, justifyContent: "center", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { visualType: "secondary", size: "small", children: "Isik teadmata" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { visualType: "secondary", size: "small", children: "Puudub Eesti isikukood" }) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: "tertiary", modifiers: ["small", "center"], element: "p", children: "Rahvastikuregistri andmete päringuks sisesta isikukood täismahus" })
          ] }) })
        ] })
      ] });
    }
  };
  var LiveResults = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ds_DropdownContext_exports.DropdownContext.Provider,
    {
      value: {
        open: true,
        setOpen: () => void 0,
        refs: {},
        getReferenceProps: () => ({}),
        getFloatingProps: () => ({}),
        getItemProps: (props) => props ?? {},
        listItemsRef: { current: [] },
        activeIndex: null,
        setActiveIndex: () => void 0,
        content: null,
        setContent: () => void 0,
        variant: "default"
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            background: "var(--dropdown-item-default-background)",
            border: "1px solid var(--card-border-primary)",
            borderRadius: "var(--form-select-area-radius)",
            boxShadow: "0 1px 5px 0 var(--tedi-alpha-20)"
          },
          children
        }
      )
    }
  );
  var StatusRow = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      style: {
        display: "flex",
        gap: "var(--dropdown-item-inner-spacing)",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--dropdown-item-padding-y) var(--dropdown-item-padding-x)"
      },
      children
    }
  );
  var Highlight = ({ text, query }) => {
    const index = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1;
    if (index === -1) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: text });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      text.slice(0, index),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "span", modifiers: "bold", children: text.slice(index, index + query.length) }),
      text.slice(index + query.length)
    ] });
  };
  var PEOPLE = [
    "Mari Maasikas",
    "Marelle Mets",
    "Marjanne Meri",
    "Mart Mesi",
    "Martin Saar",
    "Kalle Kask",
    "Kati Kuusk",
    "Tõnu Tamm",
    "Liisa Lepp",
    "Jaan Järv"
  ];
  var Typeahead = {
    name: "Typeahead (live filtering)",
    render: function TypeaheadExample() {
      const [value, setValue] = (0, import_react.useState)("");
      const [open, setOpen] = (0, import_react.useState)(false);
      const query = value.trim();
      const matches = query ? PEOPLE.filter((name) => name.toLowerCase().includes(query.toLowerCase())) : [];
      const select = (name) => {
        setValue(name);
        setOpen(false);
      };
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0.25, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Search_exports.Search,
          {
            id: "search-typeahead",
            label: "Otsi",
            placeholder: "Hakka nime trükkima…",
            value,
            onChange: (next) => {
              setValue(next);
              setOpen(true);
            }
          }
        ),
        open && query.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveResults, { children: matches.length > 0 ? matches.map((name, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_DropdownItem_exports.DropdownItem, { index: i, closeOnSelect: false, onClick: () => select(name), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Label, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, { text: name, query }) }) }) }, name)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: "tertiary", children: "Tulemusi ei leitud" }) }) })
      ] });
    }
  };
  var AsyncSuggestions = {
    name: "Async suggestions (loading)",
    render: function AsyncSuggestionsExample() {
      const [value, setValue] = (0, import_react.useState)("");
      const [open, setOpen] = (0, import_react.useState)(false);
      const [loading, setLoading] = (0, import_react.useState)(false);
      const [results, setResults] = (0, import_react.useState)([]);
      const timer = (0, import_react.useRef)();
      (0, import_react.useEffect)(() => () => clearTimeout(timer.current), []);
      const handleChange = (next) => {
        setValue(next);
        setOpen(true);
        clearTimeout(timer.current);
        if (!next.trim()) {
          setLoading(false);
          setResults([]);
          return;
        }
        setLoading(true);
        timer.current = setTimeout(() => {
          setResults(PEOPLE.filter((name) => name.toLowerCase().includes(next.trim().toLowerCase())));
          setLoading(false);
        }, 600);
      };
      const select = (name) => {
        clearTimeout(timer.current);
        setValue(name);
        setLoading(false);
        setOpen(false);
      };
      const query = value.trim();
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0.25, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Search_exports.Search,
          {
            id: "search-async",
            label: "Otsi",
            placeholder: "Hakka nime trükkima…",
            value,
            onChange: handleChange
          }
        ),
        open && query.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveResults, { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StatusRow, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Spinner_exports.Spinner, { size: 16 }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: "tertiary", children: "Otsin…" })
        ] }) : results.length > 0 ? results.map((name, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_DropdownItem_exports.DropdownItem, { index: i, closeOnSelect: false, onClick: () => select(name), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Label, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Highlight, { text: name, query }) }) }) }, name)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: "tertiary", children: "Tulemusi ei leitud" }) }) })
      ] });
    }
  };
  var AccessibilityFocused = {
    name: "Accessibility: No Visible Label",
    args: {
      id: "search-accessible",
      placeholder: "Otsi tooteid või teenuseid...",
      ariaLabel: "Otsi tooteid või teenuseid"
    },
    parameters: {
      docs: {
        description: {
          story: `
Always prefer a native \`<label>\` element for form controls.
If the label must not be visible in the UI, hide it visually using an \`sr-only\` (or equivalent) class rather than removing it. This preserves correct semantics and provides the most reliable experience for screen reader users.
Use \`ariaLabel\` only as a fallback when a real \`<label>\` cannot be rendered. This follows WCAG 2.1 and EN 301 549 9.2.5.3.
          `
        }
      }
    }
  };

  // .design-sync/.cache/previews/Search.tsx
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
    compose(search_stories_exports, "Default")
  );
  var Sizes2 = (
    /* Sizes */
    compose(search_stories_exports, "Sizes")
  );
  var States2 = (
    /* States */
    compose(search_stories_exports, "States")
  );
  var Placeholder2 = (
    /* Placeholder */
    compose(search_stories_exports, "Placeholder")
  );
  var Clearable2 = (
    /* Clearable */
    compose(search_stories_exports, "Clearable")
  );
  var ClearableWithButton2 = (
    /* Clearable with button */
    compose(search_stories_exports, "ClearableWithButton")
  );
  var WithHint2 = (
    /* With Hint */
    compose(search_stories_exports, "WithHint")
  );
  var WithSuggestions2 = (
    /* With suggestions */
    compose(search_stories_exports, "WithSuggestions")
  );
  var WithResultAndActions2 = (
    /* With result and actions */
    compose(search_stories_exports, "WithResultAndActions")
  );
  var Typeahead2 = (
    /* Typeahead (live filtering) */
    compose(search_stories_exports, "Typeahead")
  );
  var AsyncSuggestions2 = (
    /* Async suggestions (loading) */
    compose(search_stories_exports, "AsyncSuggestions")
  );
  var AccessibilityFocused2 = (
    /* Accessibility: No Visible Label */
    compose(search_stories_exports, "AccessibilityFocused")
  );
  return __toCommonJS(Search_exports);
})();
