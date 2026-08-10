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

  // .design-sync/.cache/previews/OptionContent.tsx
  var OptionContent_exports = {};
  __export(OptionContent_exports, {
    Default: () => Default2,
    InsideDropdown: () => InsideDropdown2,
    InsidePopover: () => InsidePopover2,
    InsideSearch: () => InsideSearch2,
    InsideSelect: () => InsideSelect2,
    Items: () => Items2,
    States: () => States2,
    WithCheckbox: () => WithCheckbox2,
    WithDescription: () => WithDescription2,
    WithIcon: () => WithIcon2,
    WithRadio: () => WithRadio2,
    WithTree: () => WithTree2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/misc/option-content/option-content.stories.tsx
  var option_content_stories_exports = {};
  __export(option_content_stories_exports, {
    Default: () => Default,
    InsideDropdown: () => InsideDropdown,
    InsidePopover: () => InsidePopover,
    InsideSearch: () => InsideSearch,
    InsideSelect: () => InsideSelect,
    Items: () => Items,
    States: () => States,
    WithCheckbox: () => WithCheckbox,
    WithDescription: () => WithDescription,
    WithIcon: () => WithIcon,
    WithRadio: () => WithRadio,
    WithTree: () => WithTree,
    default: () => option_content_stories_default
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

  // ds-shim:ds:Search
  var ds_Search_exports = {};
  __export(ds_Search_exports, {
    default: () => ds_Search_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Search_exports, __toESM(require_ds_raw()));
  var g3 = window.Tedi;
  var ds_Search_default = g3["Search"] !== void 0 ? g3["Search"] : g3;

  // ds-shim:ds:Select
  var ds_Select_exports = {};
  __export(ds_Select_exports, {
    default: () => ds_Select_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Select_exports, __toESM(require_ds_raw()));
  var g4 = window.Tedi;
  var ds_Select_default = g4["Select"] !== void 0 ? g4["Select"] : g4;

  // ds-shim:ds:Toggle
  var ds_Toggle_exports = {};
  __export(ds_Toggle_exports, {
    default: () => ds_Toggle_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Toggle_exports, __toESM(require_ds_raw()));
  var g5 = window.Tedi;
  var ds_Toggle_default = g5["Toggle"] !== void 0 ? g5["Toggle"] : g5;

  // ds-shim:ds:Dropdown
  var ds_Dropdown_exports = {};
  __export(ds_Dropdown_exports, {
    default: () => ds_Dropdown_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Dropdown_exports, __toESM(require_ds_raw()));
  var g6 = window.Tedi;
  var ds_Dropdown_default = g6["Dropdown"] !== void 0 ? g6["Dropdown"] : g6;

  // ds-shim:ds:DropdownContext
  var ds_DropdownContext_exports = {};
  __export(ds_DropdownContext_exports, {
    default: () => ds_DropdownContext_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_DropdownContext_exports, __toESM(require_ds_raw()));
  var g7 = window.Tedi;
  var ds_DropdownContext_default = g7["DropdownContext"] !== void 0 ? g7["DropdownContext"] : g7;

  // ds-shim:ds:DropdownItem
  var ds_DropdownItem_exports = {};
  __export(ds_DropdownItem_exports, {
    default: () => ds_DropdownItem_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_DropdownItem_exports, __toESM(require_ds_raw()));
  var g8 = window.Tedi;
  var ds_DropdownItem_default = g8["DropdownItem"] !== void 0 ? g8["DropdownItem"] : g8;

  // ds-shim:ds:Popover
  var ds_Popover_exports = {};
  __export(ds_Popover_exports, {
    default: () => ds_Popover_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Popover_exports, __toESM(require_ds_raw()));
  var g9 = window.Tedi;
  var ds_Popover_default = g9["Popover"] !== void 0 ? g9["Popover"] : g9;

  // ds-shim:ds:Separator
  var ds_Separator_exports = {};
  __export(ds_Separator_exports, {
    default: () => ds_Separator_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Separator_exports, __toESM(require_ds_raw()));
  var g10 = window.Tedi;
  var ds_Separator_default = g10["Separator"] !== void 0 ? g10["Separator"] : g10;

  // ds-shim:ds:OptionContent
  var ds_OptionContent_exports = {};
  __export(ds_OptionContent_exports, {
    default: () => ds_OptionContent_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_OptionContent_exports, __toESM(require_ds_raw()));
  var g11 = window.Tedi;
  var ds_OptionContent_default = g11["OptionContent"] !== void 0 ? g11["OptionContent"] : g11;

  // src/tedi/components/misc/option-content/option-content.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    component: ds_OptionContent_exports.OptionContent,
    title: "TEDI-Ready/Components/Helpers/OptionContent",
    subcomponents: {
      "OptionContent.Label": ds_OptionContent_exports.OptionContent.Label,
      "OptionContent.Meta": ds_OptionContent_exports.OptionContent.Meta
    },
    parameters: {
      status: {
        type: [{ name: "devComponent" }]
      },
      design: {
        type: "figma",
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.56.78?node-id=9542-70948&m=dev"
      }
    }
  };
  var option_content_stories_default = meta;
  var showcaseContext = (variant) => ({
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
    divided: false,
    variant
  });
  var Menu = ({
    children,
    variant = "default",
    width = 280
  }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_DropdownContext_exports.DropdownContext.Provider, { value: showcaseContext(variant), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      role: "menu",
      style: {
        display: "flex",
        flexDirection: "column",
        width,
        background: "var(--general-surface-primary)",
        border: "1px solid var(--card-border-primary)",
        borderRadius: "var(--card-radius-rounded)"
      },
      children
    }
  ) });
  var Row = ({ children, gap = 16 }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", gap, flexWrap: "wrap", alignItems: "flex-start" }, children });
  var noop = () => void 0;
  var Default = {
    args: {
      type: "default",
      layout: "horizontal",
      selected: false,
      disabled: false
    },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: 280 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent, { ...args, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Label, { children: "Option 1" }) }) })
  };
  var Items = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { children: ["Access to health data", "Declaration of intent", "Contacts"].map((text, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_DropdownItem_exports.DropdownItem, { index: i, onClick: noop, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Label, { children: text }) }) }, text)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { children: [
        { text: "1st level" },
        { text: "2nd level", indent: 1 },
        { text: "3rd level", indent: 2 },
        { text: "3rd level", indent: 2 },
        { text: "4th level", indent: 3 }
      ].map((level, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_DropdownItem_exports.DropdownItem, { index: i, indent: level.indent, onClick: noop, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Label, { children: level.text }) }) }, i)) })
    ] })
  };
  var WithCheckbox = {
    render: function WithCheckboxExample() {
      const [checked, setChecked] = (0, import_react.useState)(["Tartu", "Locations"]);
      const toggle = (key) => setChecked((current) => current.includes(key) ? current.filter((k) => k !== key) : [...current, key]);
      const item = (text, indent, indeterminate) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_DropdownItem_exports.DropdownItem,
        {
          role: "menuitemcheckbox",
          "aria-checked": checked.includes(text),
          closeOnSelect: false,
          indent,
          onClick: () => toggle(text),
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent, { type: "checkbox", selected: checked.includes(text), indeterminate, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Label, { children: text }) })
        }
      );
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Menu, { children: [
          item("Locations", void 0, !checked.includes("Tallinn")),
          item("Tallinn", 1),
          item("Tartu", 1),
          item("Doctors"),
          item("Mari Allikas", 1),
          item("Tõnu Liblikas", 1)
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Menu, { children: [
          item("Hospitals"),
          item("Pharmacies"),
          item("Laboratories")
        ] })
      ] });
    }
  };
  var WithRadio = {
    render: function WithRadioExample() {
      const [selected, setSelected] = (0, import_react.useState)("Tallinn");
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { children: ["Tallinn", "Tartu", "Elva", "Rakvere"].map((city, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_DropdownItem_exports.DropdownItem,
        {
          index: i,
          role: "menuitemradio",
          "aria-checked": selected === city,
          closeOnSelect: false,
          onClick: () => setSelected(city),
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent, { type: "radio", selected: selected === city, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Label, { children: city }) })
        },
        city
      )) });
    }
  };
  var WithIcon = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { children: ["Access to health data", "Declaration of intent", "Contacts"].map((text, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_DropdownItem_exports.DropdownItem, { index: i, onClick: noop, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_OptionContent_exports.OptionContent, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Label, { children: text }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Meta, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "arrow_forward", size: 18 }) })
      ] }) }, text)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { children: [
        ["Download", "download"],
        ["Add", "add"],
        ["Delete", "delete"]
      ].map(([text, icon], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_DropdownItem_exports.DropdownItem, { index: i, onClick: noop, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent, { icon, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Label, { children: text }) }) }, text)) })
    ] })
  };
  var WithDescription = {
    render: function WithDescriptionExample() {
      const [active, setActive] = (0, import_react.useState)("Access to health data");
      const access = [
        ["Access to health data", "Doctors will be able to see your health data"],
        ["Access to medications and health data", "Doctors will be able to see your medications and health data"],
        ["Access to all", "Doctors will be able to see all your information"]
      ];
      const cities = [
        ["Tallinn", "3 timeslots available"],
        ["Tartu", "4 timeslots available"],
        ["Elva", "7 timeslots available"],
        ["Rakvere", "3 timeslots available"]
      ];
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { width: 320, children: access.map(([title, desc], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_DropdownItem_exports.DropdownItem,
          {
            index: i,
            active: active === title,
            closeOnSelect: false,
            onClick: () => setActive(title),
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_OptionContent_exports.OptionContent, { layout: "vertical", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Label, { children: title }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Meta, { children: desc })
            ] })
          },
          title
        )) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { width: 320, children: cities.map(([city, meta2], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_DropdownItem_exports.DropdownItem, { index: i, onClick: noop, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_OptionContent_exports.OptionContent, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Label, { children: city }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Meta, { children: meta2 })
        ] }) }, city)) })
      ] });
    }
  };
  var WithTree = {
    render: () => {
      const children = (start) => ["Child 1", "Child 2", "Child 3"].map((text, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_DropdownItem_exports.DropdownItem, { index: start + i, indent: 1, onClick: noop, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Label, { children: text }) }) }, text));
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Menu, { variant: "tree", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_DropdownItem_exports.DropdownItem, { index: 0, onClick: noop, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Label, { children: "Parent" }) }) }),
          children(1)
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Menu, { variant: "tree", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_DropdownItem_exports.DropdownItem, { index: 0, indent: 1, isParent: true, onClick: noop, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Label, { children: "Parent" }) }) }),
          children(1)
        ] })
      ] });
    }
  };
  var States = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Menu, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_DropdownItem_exports.DropdownItem, { index: 0, onClick: noop, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Label, { children: "Default (hover me)" }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_DropdownItem_exports.DropdownItem, { index: 1, active: true, onClick: noop, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Label, { children: "Active" }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_DropdownItem_exports.DropdownItem, { index: 2, disabled: true, onClick: noop, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent, { disabled: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Label, { children: "Disabled" }) }) })
    ] })
  };
  var CITIES = [
    { id: "tln", name: "Tallinn", county: "Harjumaa" },
    { id: "trt", name: "Tartu", county: "Tartumaa" },
    { id: "prn", name: "Pärnu", county: "Pärnumaa" },
    { id: "nrv", name: "Narva", county: "Ida-Virumaa" }
  ];
  var InsideSelect = {
    name: "Inside select (renderOption)",
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_Select_exports.Select,
      {
        id: "city-select",
        label: "Linn",
        placeholder: "Vali linn",
        options: CITIES.map((city) => ({ value: city.id, label: city.name, customData: city })),
        renderOption: (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_OptionContent_exports.OptionContent, { icon: "location_on", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Label, { children: props.data.label }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Meta, { children: props.data.customData.county })
        ] })
      }
    )
  };
  var InsideDropdown = {
    name: "Inside a dropdown",
    render: function InsideDropdownExample() {
      const [checked, setChecked] = (0, import_react.useState)(["Hospitals"]);
      const toggle = (key) => setChecked((current) => current.includes(key) ? current.filter((k) => k !== key) : [...current, key]);
      const options = ["Hospitals", "Pharmacies", "Laboratories", "Family doctors"];
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown, { width: 260, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { visualType: "secondary", iconRight: "keyboard_arrow_down", children: "Filter providers" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Content, { children: options.map((option, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Dropdown_exports.Dropdown.Item,
          {
            index: i,
            role: "menuitemcheckbox",
            "aria-checked": checked.includes(option),
            closeOnSelect: false,
            onClick: () => toggle(option),
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent, { type: "checkbox", selected: checked.includes(option), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Label, { children: option }) })
          },
          option
        )) })
      ] });
    }
  };
  var InsideSearch = {
    name: "Inside search (in a dropdown)",
    render: function InsideSearchExample() {
      const [value, setValue] = (0, import_react.useState)("Ta");
      const [open, setOpen] = (0, import_react.useState)(true);
      const matches = CITIES.filter((city) => city.name.toLowerCase().includes(value.toLowerCase()));
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown, { open: open && matches.length > 0, onOpenChange: setOpen, width: "trigger", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Search_exports.Search, { id: "option-content-search", label: "Otsi linna", value, onChange: setValue }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Content, { children: matches.map((city, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: i, onClick: () => setValue(city.name), children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_OptionContent_exports.OptionContent, { icon: "location_on", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Label, { children: city.name }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Meta, { children: city.county })
        ] }) }, city.id)) })
      ] });
    }
  };
  var InsidePopover = {
    name: "Inside a popover",
    render: function InsidePopoverExample() {
      const [darkMode, setDarkMode] = (0, import_react.useState)(false);
      const navItems = ["Minu profiil", "Esindatavad", "Kontaktid"];
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_exports.Popover, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_exports.Popover.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { visualType: "secondary", iconRight: "keyboard_arrow_down", children: "Minu profiil" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_exports.Popover.Content, { width: "none", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_DropdownContext_exports.DropdownContext.Provider, { value: showcaseContext("default"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { role: "menu", style: { display: "flex", flexDirection: "column", minWidth: 220 }, children: [
          navItems.map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_DropdownItem_exports.DropdownItem, { index, role: "menuitem", onClick: noop, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Label, { children: label }) }) }, label)),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_default, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { padding: "var(--dropdown-item-padding-y) var(--dropdown-item-padding-x)" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Toggle_exports.Toggle, { id: "option-content-dark-mode", label: "Tume režiim", checked: darkMode, onChange: setDarkMode }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_default, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_DropdownItem_exports.DropdownItem, { index: navItems.length, role: "menuitem", onClick: noop, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent, { icon: { name: "logout", size: 16 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent.Label, { children: "Logi välja" }) }) })
        ] }) }) })
      ] });
    }
  };

  // .design-sync/.cache/previews/OptionContent.tsx
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
    compose(option_content_stories_exports, "Default")
  );
  var Items2 = (
    /* Items */
    compose(option_content_stories_exports, "Items")
  );
  var WithCheckbox2 = (
    /* With Checkbox */
    compose(option_content_stories_exports, "WithCheckbox")
  );
  var WithRadio2 = (
    /* With Radio */
    compose(option_content_stories_exports, "WithRadio")
  );
  var WithIcon2 = (
    /* With Icon */
    compose(option_content_stories_exports, "WithIcon")
  );
  var WithDescription2 = (
    /* With Description */
    compose(option_content_stories_exports, "WithDescription")
  );
  var WithTree2 = (
    /* With Tree */
    compose(option_content_stories_exports, "WithTree")
  );
  var States2 = (
    /* States */
    compose(option_content_stories_exports, "States")
  );
  var InsideSelect2 = (
    /* Inside select (renderOption) */
    compose(option_content_stories_exports, "InsideSelect")
  );
  var InsideDropdown2 = (
    /* Inside a dropdown */
    compose(option_content_stories_exports, "InsideDropdown")
  );
  var InsideSearch2 = (
    /* Inside search (in a dropdown) */
    compose(option_content_stories_exports, "InsideSearch")
  );
  var InsidePopover2 = (
    /* Inside a popover */
    compose(option_content_stories_exports, "InsidePopover")
  );
  return __toCommonJS(OptionContent_exports);
})();
