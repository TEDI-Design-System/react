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

  // .design-sync/.cache/previews/Dropdown.tsx
  var Dropdown_exports = {};
  __export(Dropdown_exports, {
    CustomContent: () => CustomContent2,
    CustomWidth: () => CustomWidth2,
    Default: () => Default2,
    Divided: () => Divided2,
    Tree: () => Tree2,
    WithAction: () => WithAction2,
    WithActiveItem: () => WithActiveItem2,
    WithCheckbox: () => WithCheckbox2,
    WithDescription: () => WithDescription2,
    WithIcon: () => WithIcon2,
    WithIndentedItems: () => WithIndentedItems2,
    WithRadio: () => WithRadio2,
    WithSeparatorAndOpensRight: () => WithSeparatorAndOpensRight2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React2 = __toESM(require_react_shim(), 1);

  // src/tedi/components/overlays/dropdown/dropdown.stories.tsx
  var dropdown_stories_exports = {};
  __export(dropdown_stories_exports, {
    CustomContent: () => CustomContent,
    CustomWidth: () => CustomWidth,
    Default: () => Default,
    Divided: () => Divided,
    Tree: () => Tree,
    WithAction: () => WithAction,
    WithActiveItem: () => WithActiveItem,
    WithCheckbox: () => WithCheckbox,
    WithDescription: () => WithDescription,
    WithIcon: () => WithIcon,
    WithIndentedItems: () => WithIndentedItems,
    WithRadio: () => WithRadio,
    WithSeparatorAndOpensRight: () => WithSeparatorAndOpensRight,
    default: () => dropdown_stories_default
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

  // ds-shim:ds:Checkbox
  var ds_Checkbox_exports = {};
  __export(ds_Checkbox_exports, {
    default: () => ds_Checkbox_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Checkbox_exports, __toESM(require_ds_raw()));
  var g4 = window.Tedi;
  var ds_Checkbox_default = g4["Checkbox"] !== void 0 ? g4["Checkbox"] : g4;

  // ds-shim:ds:Radio
  var ds_Radio_exports = {};
  __export(ds_Radio_exports, {
    default: () => ds_Radio_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Radio_exports, __toESM(require_ds_raw()));
  var g5 = window.Tedi;
  var ds_Radio_default = g5["Radio"] !== void 0 ? g5["Radio"] : g5;

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
  var g7 = window.Tedi;
  var ds_Row_default = g7["Row"] !== void 0 ? g7["Row"] : g7;

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
  var g8 = window.Tedi;
  var ds_Col_default = g8["Col"] !== void 0 ? g8["Col"] : g8;

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
  var g9 = window.Tedi;
  var ds_OptionContent_default = g9["OptionContent"] !== void 0 ? g9["OptionContent"] : g9;

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

  // ds-shim:ds:Dropdown
  var ds_Dropdown_exports = {};
  __export(ds_Dropdown_exports, {
    default: () => ds_Dropdown_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Dropdown_exports, __toESM(require_ds_raw()));
  var g11 = window.Tedi;
  var ds_Dropdown_default = g11["Dropdown"] !== void 0 ? g11["Dropdown"] : g11;

  // src/tedi/components/overlays/dropdown/dropdown.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var dropdown_stories_default = {
    title: "TEDI-Ready/Components/Overlay/Dropdown",
    component: ds_Dropdown_exports.Dropdown,
    subcomponents: {
      "Dropdown.Trigger": ds_Dropdown_exports.Dropdown.Trigger,
      "Dropdown.Content": ds_Dropdown_exports.Dropdown.Content,
      "Dropdown.Item": ds_Dropdown_exports.Dropdown.Item,
      "Dropdown.Separator": ds_Dropdown_exports.Dropdown.Separator
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
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.35.54?node-id=12185-156201&t=xqukY4r7lJRpWTby-4"
      }
    }
  };
  var Default = {
    argTypes: {
      ...subcomponentArgTypes(ds_Dropdown_exports.Dropdown.Item, {
        category: "Dropdown.Item",
        prefix: "item",
        exclude: ["children", "onClick", "index"]
      })
    },
    args: {
      item__active: true
    },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown, { ...getPrimaryComponentProps(args), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { visualType: "secondary", iconRight: "keyboard_arrow_down", children: "Create" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown.Content, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 0, onClick: () => console.log("Lisa pöördumine"), children: "Access to health data" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 1, ...getSubcomponentProps(args, "item"), onClick: () => console.log("Lisa toetus"), children: "Declaration of intent" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 2, children: "Contacts" })
      ] })
    ] })
  };
  var WithActiveItem = {
    render: () => {
      const [lang, setLang] = import_react.default.useState("ENG");
      const [filter, setFilter] = import_react.default.useState("Newest first");
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: 2, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { visualType: "link", iconRight: "expand_more", children: lang }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Content, { children: ["EST", "ENG", "RUS"].map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: i, active: lang === l, onClick: () => setLang(l), children: l }, l)) })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: 3, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown, { width: 200, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Button_exports.Button, { visualType: "link", iconRight: "expand_more", children: [
            "Sort: ",
            filter
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Content, { children: ["Newest first", "Oldest first", "Application name A–Z", "Application name Z–A"].map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: i, active: filter === f, onClick: () => setFilter(f), children: f }, f)) })
        ] }) })
      ] });
    }
  };
  var WithAction = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { visualType: "secondary", icon: "add", children: "Add" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown.Content, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 0, onClick: () => console.log("Lisa pöördumine"), children: "Create contact" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 1, onClick: () => console.log("Lisa toetus"), children: "Create application" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 2, children: "Create invoice" })
      ] })
    ] })
  };
  var WithIcon = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { visualType: "secondary", iconLeft: "more_vert", children: "More" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown.Content, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 0, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Text_exports.Text, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "download", color: "inherit", display: "inline" }),
          " Download"
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 1, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Text_exports.Text, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "add", color: "inherit", display: "inline" }),
          " Add"
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 2, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Text_exports.Text, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "delete", color: "inherit", display: "inline" }),
          " Delete"
        ] }) })
      ] })
    ] })
  };
  var WithCheckbox = {
    render: () => {
      const [cities, setCities] = import_react.default.useState([]);
      const toggle = (value) => (_value, checked) => {
        setCities((prev) => checked ? [...prev.filter((v) => v !== value), value] : prev.filter((v) => v !== value));
      };
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Button_exports.Button, { visualType: "primary", iconRight: "keyboard_arrow_down", children: [
          "Locations (",
          cities.length,
          ")"
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown.Content, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 0, asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Checkbox_default,
            {
              id: "parnu",
              label: "Pärnu",
              value: "parnu",
              checked: cities.includes("parnu"),
              onChange: toggle("parnu"),
              name: ""
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 1, asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Checkbox_default,
            {
              id: "tartu",
              label: "Tartu",
              value: "tartu",
              checked: cities.includes("tartu"),
              onChange: toggle("tartu"),
              name: ""
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 2, asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Checkbox_default,
            {
              id: "tallinn",
              label: "Tallinn",
              value: "tallinn",
              checked: cities.includes("tallinn"),
              onChange: toggle("tallinn"),
              name: ""
            }
          ) })
        ] })
      ] });
    }
  };
  var allCities = ["tallinn", "tartu", "parnu"];
  var WithIndentedItems = {
    render: () => {
      const [selected, setSelected] = import_react.default.useState([]);
      const allChecked = selected.length === allCities.length;
      const noneChecked = selected.length === 0;
      const indeterminate = !allChecked && !noneChecked;
      const toggleAll = (_, checked) => {
        setSelected(checked ? allCities : []);
      };
      const toggleOne = (value) => (_, checked) => {
        setSelected((prev) => checked ? [...prev.filter((v) => v !== value), value] : prev.filter((v) => v !== value));
      };
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Button_exports.Button, { visualType: "secondary", iconRight: "keyboard_arrow_down", children: [
          "Locations (",
          selected.length,
          ")"
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown.Content, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 0, asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Checkbox_default,
            {
              id: "all",
              label: "All locations",
              checked: allChecked,
              indeterminate,
              onChange: toggleAll,
              name: "",
              value: ""
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 1, asChild: true, indent: 1, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Checkbox_default,
            {
              id: "tallinn",
              label: "Tallinn",
              value: "tallinn",
              checked: selected.includes("tallinn"),
              onChange: toggleOne("tallinn"),
              name: ""
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 2, asChild: true, indent: 1, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Checkbox_default,
            {
              id: "tartu",
              label: "Tartu",
              value: "tartu",
              checked: selected.includes("tartu"),
              onChange: toggleOne("tartu"),
              name: ""
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 3, asChild: true, indent: 1, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Checkbox_default,
            {
              id: "parnu",
              label: "Pärnu",
              value: "parnu",
              checked: selected.includes("parnu"),
              onChange: toggleOne("parnu"),
              name: ""
            }
          ) })
        ] })
      ] });
    }
  };
  var WithRadio = {
    render: () => {
      const [city, setCity] = import_react.default.useState("tallinn");
      const cities = {
        tallinn: "Tallinn",
        tartu: "Tartu",
        parnu: "Pärnu"
      };
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Button_exports.Button, { visualType: "link", iconRight: "keyboard_arrow_down", children: [
          "City: ",
          cities[city]
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown.Content, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 0, asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Radio_default,
            {
              id: "city-tallinn",
              name: "city",
              value: "tallinn",
              label: "Tallinn",
              checked: city === "tallinn",
              onChange: (value) => setCity(value)
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 1, asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Radio_default,
            {
              id: "city-tartu",
              name: "city",
              value: "tartu",
              label: "Tartu",
              checked: city === "tartu",
              onChange: (value) => setCity(value)
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 2, asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Radio_default,
            {
              id: "city-parnu",
              name: "city",
              value: "parnu",
              label: "Pärnu",
              checked: city === "parnu",
              onChange: (value) => setCity(value)
            }
          ) })
        ] })
      ] });
    }
  };
  var CustomWidth = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown, { width: 300, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { visualType: "secondary", iconRight: "keyboard_arrow_down", children: "Actions" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown.Content, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 0, active: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex align-items-center justify-content-between", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Access to health data" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "arrow_forward", color: "inherit", size: 16 })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 1, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex align-items-center justify-content-between", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Declaration of intent" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "arrow_forward", color: "inherit", size: 16 })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 2, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex align-items-center justify-content-between", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Contacts" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "arrow_forward", color: "inherit", size: 16 })
        ] }) })
      ] })
    ] }) }) })
  };
  var WithDescription = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown, { width: 400, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { visualType: "secondary", iconLeft: "share", iconRight: "keyboard_arrow_down", children: "Share access" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown.Content, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 0, active: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-column", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Access to health data" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: "tertiary", modifiers: "small", children: "Doctors will be able to see your health data" })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 1, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-column", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Access to medications and health data" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: "tertiary", modifiers: "small", children: "Doctors will be able to see your medications and health data" })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 2, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-column", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Access to all" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: "tertiary", modifiers: "small", children: "Doctors will be able to see all your information, including declaration of health and other medical info" })
          ] }) })
        ] })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown, { width: 300, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { visualType: "secondary", iconRight: "keyboard_arrow_down", children: "Choose location" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown.Content, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 0, active: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex align-items-center justify-content-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Tallinn" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: "tertiary", modifiers: "small", children: "3 timeslots available" })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 1, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex align-items-center justify-content-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Tartu" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: "tertiary", modifiers: "small", children: "4 timeslots available" })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 2, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex align-items-center justify-content-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Elva" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: "tertiary", modifiers: "small", children: "7 timeslots available" })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 3, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex align-items-center justify-content-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Rakvere" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: "tertiary", modifiers: "small", children: "3 timeslots available" })
          ] }) })
        ] })
      ] }) })
    ] })
  };
  var Divided = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown, { divided: true, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { visualType: "secondary", iconLeft: "account_circle", iconRight: "keyboard_arrow_down", children: "Account" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown.Content, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 0, children: "Profile" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 1, children: "Security" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 2, children: "Billing" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 3, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Text_exports.Text, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "logout", color: "inherit", display: "inline" }),
          " Log out"
        ] }) })
      ] })
    ] })
  };
  var WithSeparatorAndOpensRight = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown, { placement: "right-start", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { visualType: "secondary", iconRight: "keyboard_arrow_down", children: "More actions" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown.Content, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 0, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Text_exports.Text, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "edit", display: "inline", color: "inherit" }),
          " Edit"
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 1, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Text_exports.Text, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "content_copy", display: "inline", color: "inherit" }),
          " Duplicate"
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Separator, {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 2, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Text_exports.Text, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "archive", display: "inline", color: "inherit" }),
          " Archive"
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 3, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Text_exports.Text, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "delete", display: "inline", color: "inherit" }),
          " Delete"
        ] }) })
      ] })
    ] })
  };
  var CustomContent = {
    render: () => {
      const [query, setQuery] = import_react.default.useState("");
      const representatives = [
        { name: "Lauri Lepp", code: "49504080254" },
        { name: "Mart Mardivere", code: "39504080254" },
        { name: "Madis Mets", code: "39504080254" },
        { name: "Kalle Kaasik", code: "39504080254" },
        { name: "Pille Porgand", code: "49504080254" },
        { name: "Kert Kasemets", code: "39504080254" }
      ];
      const filtered = query.trim() === "" ? representatives : representatives.filter(
        (rep) => rep.name.toLowerCase().includes(query.toLowerCase()) || rep.code.includes(query)
      );
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown, { width: 300, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { visualType: "link", iconRight: "keyboard_arrow_down", children: "Choose representative" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown.Content, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 0, closeOnSelect: false, asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Search_exports.Search, { id: "dropdown-search", label: "Otsi", value: query, onChange: (value) => setQuery(value) }) }),
          filtered.map((rep, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: i + 1, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_OptionContent_exports.OptionContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_OptionContent_exports.OptionContent.Label, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "span", modifiers: "bold", children: rep.name }),
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
            rep.code
          ] }) }) }, rep.name))
        ] })
      ] });
    }
  };
  var Tree = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown, { variant: "tree", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { iconRight: "keyboard_arrow_down", children: "Open Tree Dropdown" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown.Content, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { asChild: true, children: "Parent" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { indent: 1, children: "Child 1" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { indent: 1, children: "Child 2" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { indent: 1, children: "Child 3" })
        ] })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown, { variant: "tree", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { iconRight: "keyboard_arrow_down", children: "Open Tree Dropdown" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown.Content, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { asChild: true, indent: 1, isParent: true, children: "Parent" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { indent: 1, children: "Child 1" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { indent: 1, children: "Child 2" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { indent: 1, children: "Child 3" })
        ] })
      ] }) })
    ] })
  };

  // .design-sync/.cache/previews/Dropdown.tsx
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
      if (C) render = () => React2.createElement(C, args);
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
    return () => React2.createElement("div", { style: { background: bg } }, composed());
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
    compose(dropdown_stories_exports, "Default")
  );
  var WithActiveItem2 = (
    /* With Active Item */
    compose(dropdown_stories_exports, "WithActiveItem")
  );
  var WithAction2 = (
    /* With Action */
    compose(dropdown_stories_exports, "WithAction")
  );
  var WithIcon2 = (
    /* With Icon */
    compose(dropdown_stories_exports, "WithIcon")
  );
  var WithCheckbox2 = (
    /* With Checkbox */
    compose(dropdown_stories_exports, "WithCheckbox")
  );
  var WithIndentedItems2 = (
    /* With Indented Items */
    compose(dropdown_stories_exports, "WithIndentedItems")
  );
  var WithRadio2 = (
    /* With Radio */
    compose(dropdown_stories_exports, "WithRadio")
  );
  var CustomWidth2 = (
    /* Custom Width */
    compose(dropdown_stories_exports, "CustomWidth")
  );
  var WithDescription2 = (
    /* With Description */
    compose(dropdown_stories_exports, "WithDescription")
  );
  var Divided2 = (
    /* Divided */
    compose(dropdown_stories_exports, "Divided")
  );
  var WithSeparatorAndOpensRight2 = (
    /* With Separator And Opens Right */
    compose(dropdown_stories_exports, "WithSeparatorAndOpensRight")
  );
  var CustomContent2 = (
    /* Custom Content */
    compose(dropdown_stories_exports, "CustomContent")
  );
  var Tree2 = (
    /* Tree */
    compose(dropdown_stories_exports, "Tree")
  );
  return __toCommonJS(Dropdown_exports);
})();
