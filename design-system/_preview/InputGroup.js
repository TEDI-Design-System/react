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

  // .design-sync/.cache/previews/InputGroup.tsx
  var InputGroup_exports = {};
  __export(InputGroup_exports, {
    EndDynamic: () => EndDynamic2,
    EndStatic: () => EndStatic2,
    StartDynamic: () => StartDynamic2,
    StartStatic: () => StartStatic2,
    States: () => States2,
    WithButtonAddons: () => WithButtonAddons2,
    WithFeedbackText: () => WithFeedbackText2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/form/input-group/input-group.stories.tsx
  var input_group_stories_exports = {};
  __export(input_group_stories_exports, {
    EndDynamic: () => EndDynamic,
    EndStatic: () => EndStatic,
    StartDynamic: () => StartDynamic,
    StartStatic: () => StartStatic,
    States: () => States,
    WithButtonAddons: () => WithButtonAddons,
    WithFeedbackText: () => WithFeedbackText,
    default: () => input_group_stories_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  var import_react = __toESM(require_react_shim());

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

  // ds-shim:ds:VerticalSpacing
  var ds_VerticalSpacing_exports = {};
  __export(ds_VerticalSpacing_exports, {
    default: () => ds_VerticalSpacing_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_VerticalSpacing_exports, __toESM(require_ds_raw()));
  var g6 = window.Tedi;
  var ds_VerticalSpacing_default = g6["VerticalSpacing"] !== void 0 ? g6["VerticalSpacing"] : g6;

  // ds-shim:ds:Dropdown
  var ds_Dropdown_exports = {};
  __export(ds_Dropdown_exports, {
    default: () => ds_Dropdown_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Dropdown_exports, __toESM(require_ds_raw()));
  var g7 = window.Tedi;
  var ds_Dropdown_default = g7["Dropdown"] !== void 0 ? g7["Dropdown"] : g7;

  // ds-shim:ds:Field
  var ds_Field_exports = {};
  __export(ds_Field_exports, {
    default: () => ds_Field_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Field_exports, __toESM(require_ds_raw()));
  var g8 = window.Tedi;
  var ds_Field_default = g8["Field"] !== void 0 ? g8["Field"] : g8;

  // ds-shim:ds:FileUpload
  var ds_FileUpload_exports = {};
  __export(ds_FileUpload_exports, {
    default: () => ds_FileUpload_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_FileUpload_exports, __toESM(require_ds_raw()));
  var g9 = window.Tedi;
  var ds_FileUpload_default = g9["FileUpload"] !== void 0 ? g9["FileUpload"] : g9;

  // ds-shim:ds:Search
  var ds_Search_exports = {};
  __export(ds_Search_exports, {
    default: () => ds_Search_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Search_exports, __toESM(require_ds_raw()));
  var g10 = window.Tedi;
  var ds_Search_default = g10["Search"] !== void 0 ? g10["Search"] : g10;

  // ds-shim:ds:Select
  var ds_Select_exports = {};
  __export(ds_Select_exports, {
    default: () => ds_Select_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Select_exports, __toESM(require_ds_raw()));
  var g11 = window.Tedi;
  var ds_Select_default = g11["Select"] !== void 0 ? g11["Select"] : g11;

  // ds-shim:ds:InputGroup
  var ds_InputGroup_exports = {};
  __export(ds_InputGroup_exports, {
    default: () => ds_InputGroup_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_InputGroup_exports, __toESM(require_ds_raw()));
  var g12 = window.Tedi;
  var ds_InputGroup_default = g12["InputGroup"] !== void 0 ? g12["InputGroup"] : g12;

  // src/tedi/components/form/input-group/input-group.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    title: "TEDI-Ready/Components/Form/InputGroup",
    component: ds_InputGroup_default,
    subcomponents: {
      "InputGroup.Prefix": ds_InputGroup_default.Prefix,
      "InputGroup.Input": ds_InputGroup_default.Input,
      "InputGroup.Suffix": ds_InputGroup_default.Suffix
    },
    parameters: {
      a11y: {
        config: {
          rules: [{ id: "color-contrast", enabled: false }]
        }
      }
    }
  };
  var input_group_stories_default = meta;
  var StartStatic = {
    args: {
      label: "Address"
    },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_InputGroup_default, { ...args, id: "start-static", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Prefix, { children: "Street" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Input, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Field_exports.Field, {}) })
    ] })
  };
  var COUNTRIES = [
    { code: "EE", name: "Estonia", dial: "372" },
    { code: "LV", name: "Latvia", dial: "371" },
    { code: "LT", name: "Lithuania", dial: "370" },
    { code: "FI", name: "Finland", dial: "358" }
  ];
  var CURRENCIES = [
    { code: "EUR", name: "Euro" },
    { code: "USD", name: "US Dollar" },
    { code: "GBP", name: "British Pound" },
    { code: "SEK", name: "Swedish Krona" }
  ];
  var ACCOUNTS = [
    { label: "Checking · EE38 2200 2210 2014 5685", value: "checking" },
    { label: "Savings · EE96 2200 2210 2014 7283", value: "savings" },
    { label: "Investment · EE27 2200 2210 2014 8120", value: "investment" }
  ];
  var FILE_FORMATS = ["PDF", "XLSX", "DOCX", "CSV", "TXT"];
  var SEARCH_CATEGORIES = ["All", "Articles", "People", "Files", "Projects"];
  var PhonePrefixRow = () => {
    const [country, setCountry] = (0, import_react.useState)(COUNTRIES[0]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 4, md: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_InputGroup_default, { label: "Phone number", id: "start-phone", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Prefix, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Button_exports.Button, { noStyle: true, className: "flex align-items-center", children: [
          "+",
          country.dial,
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "arrow_drop_down", color: "inherit" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Content, { children: COUNTRIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown.Item, { active: c.code === country.code, onClick: () => setCountry(c), children: [
          c.name,
          " (+",
          c.dial,
          ")"
        ] }, c.code)) })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Input, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Field_exports.Field, { type: "tel" }) })
    ] }) }) });
  };
  var CurrencyPrefixSelectRow = () => {
    const [currency, setCurrency] = (0, import_react.useState)(CURRENCIES[0]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 4, md: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_InputGroup_default, { label: "Transfer from", id: "start-transfer-from", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Prefix, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Button_exports.Button, { noStyle: true, className: "flex align-items-center", children: [
          currency.code,
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "arrow_drop_down", color: "inherit" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Content, { children: CURRENCIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown.Item, { active: c.code === currency.code, onClick: () => setCurrency(c), children: [
          c.name,
          " (",
          c.code,
          ")"
        ] }, c.code)) })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Input, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Select_default, { isClearIndicatorVisible: true, options: ACCOUNTS }) })
    ] }) }) });
  };
  var FileFormatPrefixRow = () => {
    const [format, setFormat] = (0, import_react.useState)(FILE_FORMATS[0]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_InputGroup_default, { label: "Report", id: "start-file-format", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Prefix, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Button_exports.Button, { noStyle: true, className: "flex align-items-center", children: [
          format,
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "arrow_drop_down", color: "inherit" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Content, { children: FILE_FORMATS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { active: f === format, onClick: () => setFormat(f), children: f }, f)) })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Input, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_FileUpload_exports.FileUpload, { name: "start-file-upload" }) })
    ] }) }) });
  };
  var SearchCategoryPrefixRow = () => {
    const [category, setCategory] = (0, import_react.useState)(SEARCH_CATEGORIES[0]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_InputGroup_default, { label: "Search", id: "start-search-category", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Prefix, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Button_exports.Button, { noStyle: true, className: "flex align-items-center", children: [
          category,
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "arrow_drop_down", color: "inherit" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Content, { children: SEARCH_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { active: c === category, onClick: () => setCategory(c), children: c }, c)) })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Input, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Search_exports.Search, { name: "start-search" }) })
    ] }) }) });
  };
  var StartDynamic = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhonePrefixRow, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrencyPrefixSelectRow, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileFormatPrefixRow, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchCategoryPrefixRow, {})
    ] })
  };
  var EndStatic = {
    args: {
      label: "Cost"
    },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_InputGroup_default, { ...args, id: "end-static", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Input, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Field_exports.Field, {}) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Suffix, { children: "EUR" })
    ] })
  };
  var TIMEZONES = [
    { code: "UTC", label: "UTC" },
    { code: "EET", label: "EET (UTC+2)" },
    { code: "CET", label: "CET (UTC+1)" },
    { code: "EST", label: "EST (UTC−5)" }
  ];
  var MEETINGS = [
    { label: "Weekly sync · Mon 09:00", value: "weekly-sync" },
    { label: "Product review · Wed 14:00", value: "product-review" },
    { label: "All-hands · Fri 11:00", value: "all-hands" }
  ];
  var CostUnitSuffixRow = () => {
    const [currency, setCurrency] = (0, import_react.useState)(CURRENCIES[0]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 4, md: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_InputGroup_default, { label: "Cost", id: "end-cost-currency", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Input, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Field_exports.Field, { type: "tel" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Suffix, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Button_exports.Button, { noStyle: true, className: "flex align-items-center", children: [
          currency.code,
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "arrow_drop_down", color: "inherit" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Content, { children: CURRENCIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown.Item, { active: c.code === currency.code, onClick: () => setCurrency(c), children: [
          c.name,
          " (",
          c.code,
          ")"
        ] }, c.code)) })
      ] }) })
    ] }) }) });
  };
  var TimezoneSuffixSelectRow = () => {
    const [timezone, setTimezone] = (0, import_react.useState)(TIMEZONES[0]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 4, md: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_InputGroup_default, { label: "Schedule", id: "end-schedule-timezone", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Input, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Select_default, { isClearIndicatorVisible: true, options: MEETINGS }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Suffix, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Button_exports.Button, { noStyle: true, className: "flex align-items-center", children: [
          timezone.code,
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "arrow_drop_down", color: "inherit" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Content, { children: TIMEZONES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { active: t.code === timezone.code, onClick: () => setTimezone(t), children: t.label }, t.code)) })
      ] }) })
    ] }) }) });
  };
  var FileFormatSuffixRow = () => {
    const [format, setFormat] = (0, import_react.useState)(FILE_FORMATS[0]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_InputGroup_default, { label: "Report", id: "end-file-format", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Input, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_FileUpload_exports.FileUpload, { name: "end-file-upload" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Suffix, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Button_exports.Button, { noStyle: true, className: "flex align-items-center", children: [
          format,
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "arrow_drop_down", color: "inherit" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Content, { children: FILE_FORMATS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { active: f === format, onClick: () => setFormat(f), children: f }, f)) })
      ] }) })
    ] }) }) });
  };
  var SearchCategorySuffixRow = () => {
    const [category, setCategory] = (0, import_react.useState)(SEARCH_CATEGORIES[0]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_InputGroup_default, { label: "Search", id: "end-search-category", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Input, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Search_exports.Search, { name: "end-search" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Suffix, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Button_exports.Button, { noStyle: true, className: "flex align-items-center", children: [
          category,
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "arrow_drop_down", color: "inherit" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Content, { children: SEARCH_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { active: c === category, onClick: () => setCategory(c), children: c }, c)) })
      ] }) })
    ] }) }) });
  };
  var EndDynamic = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CostUnitSuffixRow, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimezoneSuffixSelectRow, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileFormatSuffixRow, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchCategorySuffixRow, {})
    ] })
  };
  var stateArray = ["Default", "Hover", "Focus", "Active", "Disabled"];
  var TemplateColumnWithStates = (args) => {
    const { array } = args;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
      array.map((state, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { gutterY: 2, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 2, xs: 12, className: "flex align-items-center gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: state }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 5, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_InputGroup_default, { label: "Label", id: `state-${state}-prefix`, disabled: state === "Disabled", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Prefix, { children: "Street" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Input, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Field_exports.Field, {}) })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 5, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_InputGroup_default, { label: "Label", id: `state-${state}-suffix`, disabled: state === "Disabled", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Input, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Field_exports.Field, {}) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Suffix, { children: "EUR" })
        ] }) })
      ] }, index)),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { gutterY: 2, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 2, xs: 12, className: "flex align-items-center gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Error" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 5, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_InputGroup_default, { label: "Label", id: "state-error-prefix", invalid: true, helper: { text: "Feedback text", type: "error" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Prefix, { children: "Street" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Input, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Field_exports.Field, {}) })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, lg: 5, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_InputGroup_default, { label: "Label", id: "state-error-suffix", invalid: true, helper: { text: "Feedback text", type: "error" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Input, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Field_exports.Field, {}) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Suffix, { children: "EUR" })
        ] }) })
      ] })
    ] });
  };
  var States = {
    render: TemplateColumnWithStates,
    args: {
      array: stateArray
    },
    parameters: {
      pseudo: {
        hover: ["#state-Hover-prefix", "#state-Hover-suffix"],
        focus: ["#state-Focus-prefix", "#state-Focus-suffix"],
        active: ["#state-Active-prefix", "#state-Active-suffix"]
      }
    }
  };
  var WithButtonAddons = {
    args: {
      label: "Promo code",
      addons: false
    },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_InputGroup_default, { ...args, id: "input-group-button", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Input, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Field_exports.Field, { placeholder: "Enter promo code" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Suffix, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { children: "Apply" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_InputGroup_default, { ...args, disabled: true, id: "input-group-button-disabled", label: "Promo code (disabled)", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Input, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Field_exports.Field, { placeholder: "Enter promo code" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Suffix, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { children: "Apply" }) })
      ] })
    ] })
  };
  var WithFeedbackText = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_InputGroup_default, { label: "Amount", id: "feedback-hint", helper: { text: "Enter the amount in euros", type: "hint" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Input, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Field_exports.Field, { placeholder: "0.00" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Suffix, { children: "EUR" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_InputGroup_default, { label: "Amount", id: "feedback-error", invalid: true, helper: { text: "This field is required", type: "error" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Input, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Field_exports.Field, { placeholder: "0.00" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InputGroup_default.Suffix, { children: "EUR" })
      ] })
    ] })
  };

  // .design-sync/.cache/previews/InputGroup.tsx
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
  var StartStatic2 = (
    /* Start Static */
    compose(input_group_stories_exports, "StartStatic")
  );
  var StartDynamic2 = (
    /* Start Dynamic */
    compose(input_group_stories_exports, "StartDynamic")
  );
  var EndStatic2 = (
    /* End Static */
    compose(input_group_stories_exports, "EndStatic")
  );
  var EndDynamic2 = (
    /* End Dynamic */
    compose(input_group_stories_exports, "EndDynamic")
  );
  var States2 = (
    /* States */
    compose(input_group_stories_exports, "States")
  );
  var WithButtonAddons2 = (
    /* With Button Addons */
    compose(input_group_stories_exports, "WithButtonAddons")
  );
  var WithFeedbackText2 = (
    /* With Feedback Text */
    compose(input_group_stories_exports, "WithFeedbackText")
  );
  return __toCommonJS(InputGroup_exports);
})();
