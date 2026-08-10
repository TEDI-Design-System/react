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

  // .design-sync/.cache/previews/Tabs.tsx
  var Tabs_exports = {};
  __export(Tabs_exports, {
    Controlled: () => Controlled2,
    Default: () => Default2,
    OverflowBehavior: () => OverflowBehavior2,
    States: () => States2,
    WithDisabledTab: () => WithDisabledTab2,
    WithIcons: () => WithIcons2,
    WithStatusBadge: () => WithStatusBadge2,
    WithSubTabs: () => WithSubTabs2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/navigation/tabs/tabs.stories.tsx
  var tabs_stories_exports = {};
  __export(tabs_stories_exports, {
    Controlled: () => Controlled,
    Default: () => Default,
    OverflowBehavior: () => OverflowBehavior,
    States: () => States,
    WithDisabledTab: () => WithDisabledTab,
    WithIcons: () => WithIcons,
    WithStatusBadge: () => WithStatusBadge,
    WithSubTabs: () => WithSubTabs,
    default: () => tabs_stories_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  var import_react = __toESM(require_react_shim());

  // ds-shim:ds:Heading
  var ds_Heading_exports = {};
  __export(ds_Heading_exports, {
    default: () => ds_Heading_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Heading_exports, __toESM(require_ds_raw()));
  var g = window.Tedi;
  var ds_Heading_default = g["Heading"] !== void 0 ? g["Heading"] : g;

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

  // ds-shim:ds:ButtonGroup
  var ds_ButtonGroup_exports = {};
  __export(ds_ButtonGroup_exports, {
    default: () => ds_ButtonGroup_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_ButtonGroup_exports, __toESM(require_ds_raw()));
  var g4 = window.Tedi;
  var ds_ButtonGroup_default = g4["ButtonGroup"] !== void 0 ? g4["ButtonGroup"] : g4;

  // ds-shim:ds:CardContent
  var ds_CardContent_exports = {};
  __export(ds_CardContent_exports, {
    default: () => ds_CardContent_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_CardContent_exports, __toESM(require_ds_raw()));
  var g5 = window.Tedi;
  var ds_CardContent_default = g5["CardContent"] !== void 0 ? g5["CardContent"] : g5;

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
  var g6 = window.Tedi;
  var ds_Row_default = g6["Row"] !== void 0 ? g6["Row"] : g6;

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
  var g7 = window.Tedi;
  var ds_Col_default = g7["Col"] !== void 0 ? g7["Col"] : g7;

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
  var g8 = window.Tedi;
  var ds_VerticalSpacing_default = g8["VerticalSpacing"] !== void 0 ? g8["VerticalSpacing"] : g8;

  // ds-shim:ds:Ellipsis
  var ds_Ellipsis_exports = {};
  __export(ds_Ellipsis_exports, {
    default: () => ds_Ellipsis_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Ellipsis_exports, __toESM(require_ds_raw()));
  var g9 = window.Tedi;
  var ds_Ellipsis_default = g9["Ellipsis"] !== void 0 ? g9["Ellipsis"] : g9;

  // ds-shim:ds:StatusBadge
  var ds_StatusBadge_exports = {};
  __export(ds_StatusBadge_exports, {
    default: () => ds_StatusBadge_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_StatusBadge_exports, __toESM(require_ds_raw()));
  var g10 = window.Tedi;
  var ds_StatusBadge_default = g10["StatusBadge"] !== void 0 ? g10["StatusBadge"] : g10;

  // ds-shim:ds:StatusIndicator
  var ds_StatusIndicator_exports = {};
  __export(ds_StatusIndicator_exports, {
    default: () => ds_StatusIndicator_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_StatusIndicator_exports, __toESM(require_ds_raw()));
  var g11 = window.Tedi;
  var ds_StatusIndicator_default = g11["StatusIndicator"] !== void 0 ? g11["StatusIndicator"] : g11;

  // ds-shim:ds:Tabs
  var ds_Tabs_exports = {};
  __export(ds_Tabs_exports, {
    default: () => ds_Tabs_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Tabs_exports, __toESM(require_ds_raw()));
  var g12 = window.Tedi;
  var ds_Tabs_default = g12["Tabs"] !== void 0 ? g12["Tabs"] : g12;

  // ds-shim:ds:TabsContext
  var ds_TabsContext_exports = {};
  __export(ds_TabsContext_exports, {
    default: () => ds_TabsContext_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_TabsContext_exports, __toESM(require_ds_raw()));
  var g13 = window.Tedi;
  var ds_TabsContext_default = g13["TabsContext"] !== void 0 ? g13["TabsContext"] : g13;

  // ds-shim:ds:TabsTrigger
  var ds_TabsTrigger_exports = {};
  __export(ds_TabsTrigger_exports, {
    default: () => ds_TabsTrigger_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_TabsTrigger_exports, __toESM(require_ds_raw()));
  var g14 = window.Tedi;
  var ds_TabsTrigger_default = g14["TabsTrigger"] !== void 0 ? g14["TabsTrigger"] : g14;

  // src/tedi/components/navigation/tabs/tabs.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    component: ds_Tabs_exports.Tabs,
    title: "TEDI-Ready/Components/Navigation/Tabs",
    subcomponents: {
      "Tabs.List": ds_Tabs_exports.Tabs.List,
      "Tabs.Trigger": ds_Tabs_exports.Tabs.Trigger,
      "Tabs.Content": ds_Tabs_exports.Tabs.Content
    },
    parameters: {
      design: {
        type: "figma",
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.38.59?node-id=3419-38773&m=dev"
      }
    }
  };
  var tabs_stories_default = meta;
  var content = {
    healthTimeline: "Kronoloogiline ülevaade teie tervisesündmustest – visiidid, analüüsid ja diagnoosid on koondatud ühele ajateljele.",
    diseaseCourse: "Diagnoositud haiguste ülevaade ja nende areng ajas koos ravi- ning jälgimismärkmetega.",
    medication: "Teile välja kirjutatud ja väljastatud ravimite loetelu koos annuste ja manustamisperioodidega.",
    table: "Andmed on kuvatud tabelina – sobib täpseks võrdluseks ja veergude kaupa sorteerimiseks.",
    grid: "Andmed on kuvatud ruudustikuna – sobib visuaalseks sirvimiseks ja kiireks ülevaateks.",
    unreadMessages: "Teil on uusi lugemata teateid tervishoiuteenuse osutajatelt. Avage teade üksikasjade nägemiseks.",
    declarations: "Teie tahteavaldused, näiteks elundidoonorluse ja ravisoovide kohta.",
    proceduresInProgress: "Hetkel töös olevad menetlused ja nende seis.",
    proceduresInPlanning: "Menetlused, mis on planeeritud, kuid pole veel alanud.",
    calendar: "Kalendrivaade teie eelseisvatest visiitidest ja tähtaegadest."
  };
  var stateArray = ["Default", "Hover", "Active", "Focus", "Selected"];
  var noop = () => null;
  var TemplateColumnWithStates = (args) => {
    const { array } = args;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "state-example", children: array.map((state, index) => {
      const triggerId = state === "Selected" ? "state-tab" : `${state}-tab`;
      const currentTab = state === "Selected" ? "state-tab" : "";
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { className: "padding-14-16", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: 2, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: state }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TabsContext_exports.TabsContext.Provider, { value: { currentTab, setCurrentTab: noop }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { role: "tablist", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TabsTrigger_exports.TabsTrigger, { id: triggerId, children: "Terviseteekond" }) }) }) })
      ] }, index);
    }) });
  };
  var Default = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Tabs_exports.Tabs, { defaultValue: "tab-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Tabs_exports.Tabs.List, { "aria-label": "Tervise sakid", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Trigger, { id: "tab-1", children: "Terviseteekond" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Trigger, { id: "tab-2", children: "Haiguste kulg" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Trigger, { id: "tab-3", children: "Ravimite ajalugu" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Content, { id: "tab-1", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_CardContent_exports.CardContent, { padding: { vertical: 1.5, horizontal: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: content.healthTimeline }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Content, { id: "tab-2", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_CardContent_exports.CardContent, { padding: { vertical: 1.5, horizontal: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: content.diseaseCourse }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Content, { id: "tab-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_CardContent_exports.CardContent, { padding: { vertical: 1.5, horizontal: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: content.medication }) }) })
    ] })
  };
  var WithIcons = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Tabs_exports.Tabs, { defaultValue: "tab-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Tabs_exports.Tabs.List, { "aria-label": "Ikoonidega sakid", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Trigger, { id: "tab-1", icon: "table_chart", children: "Tabel" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Trigger, { id: "tab-2", icon: "grid_on", children: "Ruudustik" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Content, { id: "tab-1", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_CardContent_exports.CardContent, { padding: { vertical: 1.5, horizontal: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: content.table }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Content, { id: "tab-2", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_CardContent_exports.CardContent, { padding: { vertical: 1.5, horizontal: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: content.grid }) }) })
    ] })
  };
  var WithStatusBadge = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Tabs_exports.Tabs, { defaultValue: "tab-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Tabs_exports.Tabs.List, { "aria-label": "Olekumärgisega sakid", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Tabs_exports.Tabs.Trigger, { id: "tab-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Ellipsis_exports.Ellipsis, { lineClamp: 1, popover: true, children: "Terviseteekond" }),
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { color: "brand", children: "Esitatud" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Trigger, { id: "tab-2", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { position: "relative" }, children: [
          "Lugemata teated ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusIndicator_exports.StatusIndicator, { type: "danger", position: "top-right" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Trigger, { id: "tab-3", children: "Ravimite ajalugu" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Content, { id: "tab-1", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_CardContent_exports.CardContent, { padding: { vertical: 1.5, horizontal: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: content.healthTimeline }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Content, { id: "tab-2", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_CardContent_exports.CardContent, { padding: { vertical: 1.5, horizontal: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: content.unreadMessages }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Content, { id: "tab-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_CardContent_exports.CardContent, { padding: { vertical: 1.5, horizontal: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: content.medication }) }) })
    ] })
  };
  var States = {
    render: TemplateColumnWithStates,
    args: {
      array: stateArray
    },
    parameters: {
      pseudo: {
        hover: "#Hover-tab",
        active: "#Active-tab",
        focusVisible: "#Focus-tab"
      }
    }
  };
  var Controlled = {
    render: () => {
      const [currentTab, setCurrentTab] = (0, import_react.useState)("tab-1");
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
          "Current tab: ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: currentTab })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Tabs_exports.Tabs, { value: currentTab, onChange: setCurrentTab, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Tabs_exports.Tabs.List, { "aria-label": "Juhitavad sakid", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Trigger, { id: "tab-1", children: "Terviseteekond" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Trigger, { id: "tab-2", children: "Haiguste kulg" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Trigger, { id: "tab-3", children: "Ravimite ajalugu" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Content, { id: "tab-1", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: content.healthTimeline }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Content, { id: "tab-2", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: content.diseaseCourse }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Content, { id: "tab-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: content.medication }) })
        ] })
      ] });
    }
  };
  var WithDisabledTab = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Tabs_exports.Tabs, { defaultValue: "tab-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Tabs_exports.Tabs.List, { "aria-label": "Keelatud sakiga sakid", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Trigger, { id: "tab-1", children: "Terviseteekond" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Trigger, { id: "tab-2", children: "Haiguste kulg" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Trigger, { id: "tab-3", disabled: true, children: "Ravimite ajalugu" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Content, { id: "tab-1", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_CardContent_exports.CardContent, { padding: { vertical: 1.5, horizontal: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: content.healthTimeline }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Content, { id: "tab-2", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_CardContent_exports.CardContent, { padding: { vertical: 1.5, horizontal: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: content.diseaseCourse }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Content, { id: "tab-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_CardContent_exports.CardContent, { padding: { vertical: 1.5, horizontal: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: content.medication }) }) })
    ] })
  };
  var OverflowBehavior = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 2, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Dropdown (default)" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { maxWidth: 400 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Tabs_exports.Tabs, { defaultValue: "more-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Tabs_exports.Tabs.List, { "aria-label": "Ületäituvad sakid rippmenüüga", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Trigger, { id: "more-1", children: "Terviseteekond" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Trigger, { id: "more-2", children: "Haiguste kulg" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Trigger, { id: "more-3", children: "Ravimite ajalugu" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Trigger, { id: "more-4", children: "Tahteavaldused" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Content, { id: "more-1", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_CardContent_exports.CardContent, { padding: { vertical: 1.5, horizontal: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: content.healthTimeline }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Content, { id: "more-2", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_CardContent_exports.CardContent, { padding: { vertical: 1.5, horizontal: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: content.diseaseCourse }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Content, { id: "more-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_CardContent_exports.CardContent, { padding: { vertical: 1.5, horizontal: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: content.medication }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Content, { id: "more-4", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_CardContent_exports.CardContent, { padding: { vertical: 1.5, horizontal: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: content.declarations }) }) })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Horizontal scroll" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { maxWidth: 400 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Tabs_exports.Tabs, { defaultValue: "scroll-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Tabs_exports.Tabs.List, { "aria-label": "Ületäituvad sakid kerimisega", overflowMode: "scroll", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Trigger, { id: "scroll-1", children: "Terviseteekond" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Trigger, { id: "scroll-2", children: "Haiguste kulg" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Trigger, { id: "scroll-3", children: "Ravimite ajalugu" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Trigger, { id: "scroll-4", children: "Tahteavaldused" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Content, { id: "scroll-1", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_CardContent_exports.CardContent, { padding: { vertical: 1.5, horizontal: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: content.healthTimeline }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Content, { id: "scroll-2", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_CardContent_exports.CardContent, { padding: { vertical: 1.5, horizontal: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: content.diseaseCourse }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Content, { id: "scroll-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_CardContent_exports.CardContent, { padding: { vertical: 1.5, horizontal: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: content.medication }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Content, { id: "scroll-4", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_CardContent_exports.CardContent, { padding: { vertical: 1.5, horizontal: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: content.declarations }) }) })
      ] }) })
    ] })
  };
  var WithSubTabs = {
    render: () => {
      const [activeSubTab, setActiveSubTab] = (0, import_react.useState)("work-accidents");
      const subTabLabels = {
        "work-accidents": "Tööõnnetused",
        "occupational-diseases": "Kutsehaigused",
        "work-related-illnesses": "Tööga seotud haigused"
      };
      const subTabContent = {
        "work-accidents": "Tööõnnetuste juhtumid ja nende menetluse seis.",
        "occupational-diseases": "Kutsehaiguste kirjed ja diagnoosid.",
        "work-related-illnesses": "Tööga seotud haiguste teated ja tulemused."
      };
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Tabs_exports.Tabs, { defaultValue: "tab-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Tabs_exports.Tabs.List, { "aria-label": "Töötervishoiu ja -ohutuse sakid", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Trigger, { id: "tab-1", children: "Käimasolevad menetlused" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Trigger, { id: "tab-2", children: "Planeeritavad menetlused" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Trigger, { id: "tab-3", children: "Õnnetused ja haigused" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Trigger, { id: "tab-4", children: "Kalender" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Content, { id: "tab-1", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_CardContent_exports.CardContent, { padding: { vertical: 1.5, horizontal: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: content.proceduresInProgress }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Content, { id: "tab-2", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_CardContent_exports.CardContent, { padding: { vertical: 1.5, horizontal: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: content.proceduresInPlanning }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Content, { id: "tab-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_CardContent_exports.CardContent, { padding: { vertical: 1.5, horizontal: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1.5, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            ds_ButtonGroup_exports.ButtonGroup,
            {
              type: "secondary",
              ariaLabel: "Õnnetuste ja haiguste alamnavigatsioon",
              enableMobileDropdown: true,
              onSelectionChange: setActiveSubTab,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { id: "work-accidents", isActive: activeSubTab === "work-accidents", children: "Tööõnnetused" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { id: "occupational-diseases", isActive: activeSubTab === "occupational-diseases", children: "Kutsehaigused" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { id: "work-related-illnesses", isActive: activeSubTab === "work-related-illnesses", children: "Tööga seotud haigused" })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Heading_exports.Heading, { element: "h2", children: subTabLabels[activeSubTab] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: subTabContent[activeSubTab] })
        ] }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tabs_exports.Tabs.Content, { id: "tab-4", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_CardContent_exports.CardContent, { padding: { vertical: 1.5, horizontal: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: content.calendar }) }) })
      ] });
    }
  };

  // .design-sync/.cache/previews/Tabs.tsx
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
    compose(tabs_stories_exports, "Default")
  );
  var WithIcons2 = (
    /* With Icons */
    compose(tabs_stories_exports, "WithIcons")
  );
  var WithStatusBadge2 = (
    /* With Status Badge */
    compose(tabs_stories_exports, "WithStatusBadge")
  );
  var States2 = (
    /* States */
    compose(tabs_stories_exports, "States")
  );
  var Controlled2 = (
    /* Controlled */
    compose(tabs_stories_exports, "Controlled")
  );
  var WithDisabledTab2 = (
    /* With Disabled Tab */
    compose(tabs_stories_exports, "WithDisabledTab")
  );
  var OverflowBehavior2 = (
    /* Overflow Behavior */
    compose(tabs_stories_exports, "OverflowBehavior")
  );
  var WithSubTabs2 = (
    /* With Sub Tabs */
    compose(tabs_stories_exports, "WithSubTabs")
  );
  return __toCommonJS(Tabs_exports);
})();
