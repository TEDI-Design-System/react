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
      function jsx4(t, p, k) {
        var c = p && p.children;
        return c === void 0 ? R.createElement(t, np(p, k)) : R.createElement(t, np(p, k), c);
      }
      function jsxs4(t, p, k) {
        return R.createElement.apply(R, [t, np(p, k)].concat(p.children));
      }
      module.exports = R;
      module.exports.jsx = jsx4;
      module.exports.jsxs = jsxs4;
      module.exports.jsxDEV = function(t, p, k, s) {
        return (s ? jsxs4 : jsx4)(t, p, k);
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

  // .design-sync/.cache/previews/Card.tsx
  var Card_exports = {};
  __export(Card_exports, {
    AlternativeCards: () => AlternativeCards2,
    Backgrounds: () => Backgrounds2,
    BorderRadius: () => BorderRadius2,
    Borderless: () => Borderless2,
    BreakpointProps: () => BreakpointProps2,
    CardInfo: () => CardInfo2,
    Default: () => Default2,
    DefaultCard: () => DefaultCard2,
    EqualHeight: () => EqualHeight2,
    HeaderTypes: () => HeaderTypes2,
    MultipleContent: () => MultipleContent2,
    Spacing: () => Spacing2,
    SplitCardBody: () => SplitCardBody2,
    TimelineCard: () => TimelineCard2,
    TwoTonedCard: () => TwoTonedCard2,
    WithNotification: () => WithNotification2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/content/card/card.stories.tsx
  var card_stories_exports = {};
  __export(card_stories_exports, {
    AlternativeCards: () => AlternativeCards,
    Backgrounds: () => Backgrounds,
    BorderRadius: () => BorderRadius,
    Borderless: () => Borderless,
    BreakpointProps: () => BreakpointProps,
    CardInfo: () => CardInfo,
    Default: () => Default,
    DefaultCard: () => DefaultCard,
    EqualHeight: () => EqualHeight,
    HeaderTypes: () => HeaderTypes,
    MultipleContent: () => MultipleContent,
    Spacing: () => Spacing,
    SplitCardBody: () => SplitCardBody,
    TimelineCard: () => TimelineCard,
    TwoTonedCard: () => TwoTonedCard,
    WithNotification: () => WithNotification,
    default: () => card_stories_default
  });
  init_define_import_meta_env();
  init_define_process_env();

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

  // ds-shim:ds:Heading
  var ds_Heading_exports = {};
  __export(ds_Heading_exports, {
    default: () => ds_Heading_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Heading_exports, __toESM(require_ds_raw()));
  var g2 = window.Tedi;
  var ds_Heading_default = g2["Heading"] !== void 0 ? g2["Heading"] : g2;

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

  // ds-shim:ds:Separator
  var ds_Separator_exports = {};
  __export(ds_Separator_exports, {
    default: () => ds_Separator_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Separator_exports, __toESM(require_ds_raw()));
  var g5 = window.Tedi;
  var ds_Separator_default = g5["Separator"] !== void 0 ? g5["Separator"] : g5;

  // ds-shim:ds:StretchContent
  var ds_StretchContent_exports = {};
  __export(ds_StretchContent_exports, {
    default: () => ds_StretchContent_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_StretchContent_exports, __toESM(require_ds_raw()));
  var g6 = window.Tedi;
  var ds_StretchContent_default = g6["StretchContent"] !== void 0 ? g6["StretchContent"] : g6;

  // src/tedi/components/misc/stretch-content/stretch-content.stories.tsx
  init_define_import_meta_env();
  init_define_process_env();

  // ds-shim:ds:Button
  var ds_Button_exports = {};
  __export(ds_Button_exports, {
    default: () => ds_Button_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Button_exports, __toESM(require_ds_raw()));
  var g7 = window.Tedi;
  var ds_Button_default = g7["Button"] !== void 0 ? g7["Button"] : g7;

  // ds-shim:ds:Card
  var ds_Card_exports = {};
  __export(ds_Card_exports, {
    default: () => ds_Card_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Card_exports, __toESM(require_ds_raw()));
  var g8 = window.Tedi;
  var ds_Card_default = g8["Card"] !== void 0 ? g8["Card"] : g8;

  // ds-shim:ds:VerticalSpacing
  var ds_VerticalSpacing_exports = {};
  __export(ds_VerticalSpacing_exports, {
    default: () => ds_VerticalSpacing_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_VerticalSpacing_exports, __toESM(require_ds_raw()));
  var g9 = window.Tedi;
  var ds_VerticalSpacing_default = g9["VerticalSpacing"] !== void 0 ? g9["VerticalSpacing"] : g9;

  // src/tedi/components/misc/stretch-content/stretch-content.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var CardsExample = {
    render: (_args) => {
      const lorem = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad expedita iste itaque laborum magnam non nulla tempora ullam! A consequuntur dicta et incidunt nisi pariatur sapiente, temporibus unde voluptatem?" });
      const card = (title, content) => {
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Card_exports.Card, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Card_exports.CardHeader, { background: "brand-primary", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Heading_exports.Heading, { element: "h2", children: title }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Card_exports.CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StretchContent_default, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { direction: "column", gap: 4, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_VerticalSpacing_exports.VerticalSpacing, { children: content }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { children: "Click me" }) })
          ] }) }) })
        ] });
      };
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StretchContent_default, { children: card(
          "Card with longer content",
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
            lorem,
            lorem
          ] })
        ) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: card("Card that is not stretched", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: lorem })) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StretchContent_default, { children: card("Card where content is also stretched", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: lorem })) }) })
      ] });
    }
  };

  // src/tedi/components/content/card/card-stories-templates.tsx
  init_define_import_meta_env();
  init_define_process_env();

  // ds-shim:ds:Text
  var ds_Text_exports = {};
  __export(ds_Text_exports, {
    default: () => ds_Text_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Text_exports, __toESM(require_ds_raw()));
  var g10 = window.Tedi;
  var ds_Text_default = g10["Text"] !== void 0 ? g10["Text"] : g10;

  // ds-shim:ds:HeadingWithIcon
  var ds_HeadingWithIcon_exports = {};
  __export(ds_HeadingWithIcon_exports, {
    default: () => ds_HeadingWithIcon_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_HeadingWithIcon_exports, __toESM(require_ds_raw()));
  var g11 = window.Tedi;
  var ds_HeadingWithIcon_default = g11["HeadingWithIcon"] !== void 0 ? g11["HeadingWithIcon"] : g11;

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

  // ds-shim:ds:StatusBadge
  var ds_StatusBadge_exports = {};
  __export(ds_StatusBadge_exports, {
    default: () => ds_StatusBadge_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_StatusBadge_exports, __toESM(require_ds_raw()));
  var g13 = window.Tedi;
  var ds_StatusBadge_default = g13["StatusBadge"] !== void 0 ? g13["StatusBadge"] : g13;

  // src/tedi/components/content/card/card-stories-templates.tsx
  var import_jsx_runtime2 = __toESM(require_react_shim());
  var HeaderTypesTemplate = (_args) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card.Header, { background: "primary", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Heading_exports.Heading, { element: "h3", children: "Pealkiri" }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(ds_Card_exports.Card.Header, { background: "primary", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Heading_exports.Heading, { element: "h3", children: "Pealkiri" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { color: "secondary", children: "Kirjeldus" })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(ds_Card_exports.Card.Header, { background: "primary", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Heading_exports.Heading, { element: "h3", children: "Pealkiri" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Button_exports.Button, { children: "Loo" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { color: "secondary", children: "Kirjeldus" }) }) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(ds_Card_exports.Card.Header, { background: "primary", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Heading_exports.Heading, { element: "h3", children: "Pealkiri" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Col, { width: "auto", style: { display: "flex", gap: 10 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Button_exports.Button, { visualType: "secondary", iconLeft: { name: "share" }, children: "Jaga" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Button_exports.Button, { visualType: "secondary", iconLeft: { name: "print" }, children: "Prindi" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { color: "secondary", children: "Kirjeldus" }) }) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(ds_Card_exports.Card.Header, { background: "primary", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Heading_exports.Heading, { element: "h3", children: "Pealkiri" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Link_exports.Link, { id: "card-link", iconRight: { name: "arrow_right_alt" }, href: "#", children: "Vaata tulemust" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { color: "secondary", children: "Kirjeldus" }) }) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(ds_Card_exports.Card.Header, { background: "primary", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Heading_exports.Heading, { element: "h3", children: "Pealkiri" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_StatusBadge_exports.StatusBadge, { color: "brand", children: "Kinnitatud" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { color: "secondary", children: "Kirjeldus" }) }) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(ds_Card_exports.Card.Header, { background: "secondary", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Heading_exports.Heading, { element: "h3", children: "Pealkiri" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Button_exports.Button, { children: "Loo" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { color: "secondary", children: "Kirjeldus" }) }) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(ds_Card_exports.Card.Header, { background: "tertiary", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Heading_exports.Heading, { element: "h3", children: "Pealkiri" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Button_exports.Button, { children: "Loo" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { color: "secondary", children: "Kirjeldus" }) }) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(ds_Card_exports.Card.Header, { background: "brand-primary", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Heading_exports.Heading, { element: "h3", children: "Pealkiri" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Button_exports.Button, { visualType: "secondary", children: "Loo" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { children: "Kirjeldus" }) }) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(ds_Card_exports.Card.Header, { background: "brand-secondary", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Heading_exports.Heading, { element: "h3", children: "Pealkiri" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Button_exports.Button, { visualType: "secondary", children: "Loo" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { children: "Kirjeldus" }) }) })
    ] }) })
  ] });
  var DefaultCardTemplates = (_args) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { color: "secondary", children: "Kirjeldus" }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(ds_Card_exports.Card.Content, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { color: "secondary", children: "Kirjeldus" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_StatusBadge_exports.StatusBadge, { color: "brand", children: "Kinnitatud" })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(ds_Card_exports.Card.Content, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Pealkiri" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { color: "secondary", children: "Kirjeldus" })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(ds_Card_exports.Card.Content, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Pealkiri" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { color: "secondary", children: "Kirjeldus" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_StatusBadge_exports.StatusBadge, { color: "brand", children: "Kinnitatud" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Col, { className: "flex align-items-center gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Icon_exports.Icon, { name: "monitor_heart" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { color: "secondary", children: "Kirjeldus" })
    ] }) }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Col, { className: "flex align-items-center gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Icon_exports.Icon, { name: "monitor_heart" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Pealkiri" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { color: "secondary", children: "Kirjeldus" })
      ] })
    ] }) }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Row, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Col, { className: "flex align-items-center gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Icon_exports.Icon, { name: "monitor_heart" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Pealkiri" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { color: "secondary", children: "Kirjeldus" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { width: "auto", className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Button_exports.Button, { children: "Loo" }) })
    ] }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { lg: 6, sm: 12, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Col, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Pealkiri" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { color: "secondary", children: "Kirjeldus" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Separator_exports.Separator, { spacing: 1.5 }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Row, { justifyContent: "center", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Button_exports.Button, { children: "Loo" }) }) })
    ] }) }) }) }) }) })
  ] });
  var CardInfoTemplate = (_args) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card.Content, { background: "brand-tertiary", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Col, { width: "auto", className: "flex align-items-center gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Icon_exports.Icon, { background: "primary", name: "assignment_late" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Pealkiri" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { color: "secondary", children: "Kirjeldus" })
      ] })
    ] }) }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      ds_Card_exports.Card.Content,
      {
        background: "brand-tertiary",
        backgroundImage: "card-background-example.svg",
        backgroundSize: "75px",
        backgroundPosition: "right center",
        backgroundRepeat: "no-repeat",
        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Col, { width: "auto", className: "flex align-items-center gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Icon_exports.Icon, { background: "primary", name: "assignment_late" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Pealkiri" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { color: "secondary", children: "Kirjeldus" })
          ] })
        ] }) })
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card, { border: "accent", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card.Content, { background: "accent", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Col, { width: "auto", className: "flex align-items-center gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Icon_exports.Icon, { background: "primary", name: "assignment_late" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Pealkiri" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { color: "secondary", children: "Kirjeldus" })
      ] })
    ] }) }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card, { border: "neutral-primary", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card.Content, { background: "neutral-primary", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Col, { width: "auto", className: "flex align-items-center gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Icon_exports.Icon, { background: "primary", name: "calendar_today", filled: true }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(ds_Text_exports.Text, { color: "secondary", children: [
        "Haigusleht: ",
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: "118." }),
        " päev"
      ] })
    ] }) }) }) })
  ] });
  var AlternativeCardsTemplate = (_args) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Row, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { lg: 6, sm: 12, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(ds_Card_exports.Card, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card.Header, { background: "primary", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_HeadingWithIcon_exports.HeadingWithIcon, { name: "assignment_ind", headingColor: "brand", iconColor: "brand", children: "Minu tahteavaldus" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card.Content, { padding: { top: 0, right: 1, bottom: 1, left: 1 }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Col, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { color: "secondary", children: "Näiteks elundidoonorlus ja vereülekanne" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Separator_exports.Separator, { spacing: 1.5 }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Button_exports.Button, { visualType: "secondary", children: "Vaata tahteavaldusi" })
        ] }) }) })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { lg: 6, sm: 12, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Col, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Pealkiri" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { color: "secondary", children: "Näiteks elundidoonorlus ja vereülekanne" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Separator_exports.Separator, { spacing: 1.5 }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Button_exports.Button, { visualType: "secondary", children: "Vaata tahteavaldusi" })
      ] }) }) }) }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Row, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { lg: 6, sm: 12, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(ds_Card_exports.Card, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card.Header, { background: "brand-primary", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Heading_exports.Heading, { element: "h3", color: "white", children: "Lühike pealkiri" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { color: "secondary", children: "Näiteks elundidoonorlus ja vereülekanne" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Button_exports.Button, { visualType: "secondary", children: "Vaata tahteavaldusi" })
        ] }) }) }) })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { lg: 6, sm: 12, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { color: "secondary", children: "Näiteks elundidoonorlus ja vereülekanne" }) }) }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card, { border: "left-danger-secondary", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { children: "Oluline kaart" }) }) }) }) })
  ] });
  var SpacingTemplate = (_args) => {
    const paddings = [
      { top: 0.5, left: 0.5, right: 0.5, bottom: 0.5 },
      { top: 1, left: 1, right: 1, bottom: 1 },
      { top: 1.5, left: 1.5, right: 1.5, bottom: 1.5 }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Row, { children: paddings.map((padding, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { lg: 4, sm: 12, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card.Content, { padding, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { children: "Cabbage, comprising several cultivars of Brassica oleracea, is a leafy green, red (purple), or white (pale green) biennial plant grown as an annual vegetable crop for its dense-leaved heads." }) }) }) }, index)) });
  };
  var BackgroundColorsTemplate = (_args) => {
    const backgroundColors = [
      "primary",
      "secondary",
      "tertiary",
      "brand-primary",
      "brand-secondary",
      "brand-tertiary",
      "brand-quaternary",
      "success-primary",
      "accent"
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Row, { children: backgroundColors.map((color, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { lg: 4, sm: 12, style: { marginBottom: "1.5rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card, { background: color, borderless: color !== "primary" ? true : false, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Card_exports.Card.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { children: "Cabbage, comprising several cultivars of Brassica oleracea, is a leafy green, red (purple), or white (pale green) biennial plant grown as an annual vegetable crop for its dense-leaved heads." }) }) }) }, index)) });
  };

  // src/tedi/components/content/card/card.stories.tsx
  var import_jsx_runtime3 = __toESM(require_react_shim());
  var card_stories_default = {
    title: "TEDI-Ready/Content/Card",
    component: ds_Card_exports.Card,
    subcomponents: {
      "Card.Content": ds_Card_exports.Card.Content,
      "Card.Header": ds_Card_exports.Card.Header,
      "Card.Notification": ds_Card_exports.Card.Notification
    },
    parameters: {
      status: {
        type: [{ name: "breakpointSupport", url: "?path=/docs/helpers-usebreakpointprops--usebreakpointprops" }]
      },
      controls: {
        exclude: ["sm", "md", "lg", "xl", "xxl"]
      },
      docs: {
        source: {
          transform: (code) => {
            return code.replaceAll("CardContent", "Card.Content").replaceAll("CardHeader", "Card.Header").replaceAll("CardNotification", "Card.Notification");
          }
        }
      },
      design: {
        type: "figma",
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=163-19532&m=dev"
      }
    }
  };
  var GeneralTemplate = (args) => {
    const getSplitContent = () => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card.Content, { padding: 0, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(grid_exports.Row, { gutter: 0, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card, { borderless: true, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(ds_Card_exports.Card.Content, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: "Left" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis mollis augue, vitae aliquet elit congue a. Donec vitae sagittis odio, et maximus nulla. Quisque metus augue, euismod non auctor sed, consequat in ligula. Pellentesque consectetur, justo in luctus sagittis, metus justo ultricies leo, et mollis enim ipsum id erat. Pellentesque congue ante metus, ut tempor tortor lobortis non. Proin in ligula sed ante accumsan viverra. Ut et tempor neque." })
      ] }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_StretchContent_exports.StretchContent, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card, { borderless: true, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card.Content, { background: "secondary", children: "Right" }) }) }) })
    ] }) });
    const getDefaultContent = (cardContent) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card.Content, { ...cardContent, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: "Kirjeldus" }) });
    const getNotification = (notification) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card.Notification, { ...notification, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: "Kaardi teavitus" }) });
    const getContent2 = (content) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card.Content, { ...content });
    const getCardHeader = (header) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card.Header, { ...header, children: header.children });
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(ds_Card_exports.Card, { ...args.card, children: [
      args.cardHeader && getCardHeader(typeof args.cardHeader === "boolean" ? {} : args.cardHeader),
      args.cardNotification && getNotification(typeof args.cardNotification === "boolean" ? {} : args.cardNotification),
      args.splitContent ? getSplitContent() : args.cardContent === false ? null : getDefaultContent(typeof args.cardContent === "boolean" ? {} : args.cardContent),
      args.cardContent2 && getContent2(typeof args.cardContent2 === "boolean" ? {} : args.cardContent2)
    ] });
  };
  var Default = {
    argTypes: {
      ...subcomponentArgTypes(ds_Card_exports.Card.Header, { category: "Card.Header", prefix: "header", exclude: ["children"] }),
      ...subcomponentArgTypes(ds_Card_exports.Card.Content, { category: "Card.Content", prefix: "content", exclude: ["children"] })
    },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(ds_Card_exports.Card, { ...getPrimaryComponentProps(args), children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card.Header, { ...getSubcomponentProps(args, "header"), children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Heading_exports.Heading, { element: "h3", children: "Kaardi pealkiri" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card.Content, { ...getSubcomponentProps(args, "content"), children: "Kirjeldus" })
    ] })
  };
  var HeaderTypes = {
    render: HeaderTypesTemplate
  };
  var DefaultCard = {
    render: DefaultCardTemplates
  };
  var CardInfo = {
    render: CardInfoTemplate
  };
  var AlternativeCards = {
    render: AlternativeCardsTemplate
  };
  var Spacing = {
    render: SpacingTemplate
  };
  var Backgrounds = {
    render: BackgroundColorsTemplate
  };
  var MultipleContent = {
    render: GeneralTemplate,
    args: {
      ...Default.args,
      cardContent: {
        hasSeparator: true
      },
      cardContent2: {
        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: "Kirjeldus 2" })
      },
      cardHeader: false
    }
  };
  var SplitCard = () => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(grid_exports.Row, { gutter: 0, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card, { borderless: true, borderRadius: { right: false }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(ds_Card_exports.Card.Content, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: "Left" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis mollis augue, vitae aliquet elit congue a. Donec vitae sagittis odio, et maximus nulla. Quisque metus augue, euismod non auctor sed, consequat in ligula. Pellentesque consectetur, justo in luctus sagittis, metus justo ultricies leo, et mollis enim ipsum id erat. Pellentesque congue ante metus, ut tempor tortor lobortis non. Proin in ligula sed ante accumsan viverra. Ut et tempor neque." })
    ] }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_StretchContent_exports.StretchContent, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card, { borderless: true, borderRadius: { left: false }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card.Content, { background: "secondary", children: "Right" }) }) }) })
  ] }) });
  var SplitCardBody = {
    render: SplitCard
  };
  var Borderless = {
    render: GeneralTemplate,
    args: {
      ...Default.args,
      card: {
        borderless: true
      },
      cardHeader: false
    }
  };
  var BorderRadius = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card.Content, { children: "Default radius" }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card, { borderRadius: false, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card.Content, { children: "No radius" }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card, { borderRadius: { top: false }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card.Content, { children: "No top radius" }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card, { borderRadius: { bottom: false }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card.Content, { children: "No bottom radius" }) }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Separator_exports.Separator, { spacing: 1.5 }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card, { borderRadius: { left: false }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card.Content, { children: "No left radius" }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card, { borderRadius: { right: false }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card.Content, { children: "No right radius" }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card, { borderRadius: { topLeft: false }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card.Content, { children: "No top-left" }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card, { borderRadius: { bottomRight: false }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card.Content, { children: "No bottom-right" }) }) })
      ] })
    ] });
  };
  var BreakpointProps = {
    render: GeneralTemplate,
    args: {
      card: {
        background: "success-primary",
        border: "brand-primary"
      },
      cardContent: {
        className: "test123",
        background: void 0,
        sm: {
          background: "brand-secondary",
          padding: 0
        },
        md: {
          background: "brand-tertiary",
          padding: 1
        },
        lg: {
          background: void 0,
          padding: 1.5
        }
      }
    }
  };
  var EqualHeight = {
    ...CardsExample
  };
  var WithNotification = {
    render: GeneralTemplate,
    args: {
      card: {
        padding: 0.75
      },
      cardHeader: {
        background: "primary",
        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Heading_exports.Heading, { element: "h3", children: "Kaardi pealkiri" })
      },
      cardNotification: true
    }
  };
  var Timeline = (args) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card, { ...args, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(grid_exports.Row, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(grid_exports.Col, { width: 3, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: "Kaardi sisu" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Separator_exports.Separator, { axis: "vertical", color: "accent", variant: "dotted", dotPosition: "center", isStretched: true }) }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: "Kaardi sisu" }) })
  ] }) }) });
  var TimelineCard = {
    render: Timeline,
    args: {}
  };
  var TwoToned = (_args) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(grid_exports.Row, { gutter: 0, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_StretchContent_exports.StretchContent, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card, { borderRadius: { right: false }, borderless: true, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card.Content, { background: "secondary", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Icon_exports.Icon, { name: "straighten", className: "text-disabled" }) }) }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Separator_exports.Separator, { axis: "vertical" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Card_exports.Card, { borderRadius: { left: false }, borderless: true, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(ds_Card_exports.Card.Content, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-bold", children: "Mingi statistika: x kg" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: "Mingi kirjeldus" })
    ] }) }) })
  ] }) });
  var TwoTonedCard = {
    render: TwoToned,
    args: {}
  };

  // .design-sync/.cache/previews/Card.tsx
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
    compose(card_stories_exports, "Default")
  );
  var HeaderTypes2 = (
    /* Header Types */
    compose(card_stories_exports, "HeaderTypes")
  );
  var DefaultCard2 = (
    /* Default Card */
    compose(card_stories_exports, "DefaultCard")
  );
  var CardInfo2 = (
    /* Card Info */
    compose(card_stories_exports, "CardInfo")
  );
  var AlternativeCards2 = (
    /* Alternative Cards */
    compose(card_stories_exports, "AlternativeCards")
  );
  var Spacing2 = (
    /* Spacing */
    compose(card_stories_exports, "Spacing")
  );
  var Backgrounds2 = (
    /* Backgrounds */
    compose(card_stories_exports, "Backgrounds")
  );
  var MultipleContent2 = (
    /* Multiple Content */
    compose(card_stories_exports, "MultipleContent")
  );
  var SplitCardBody2 = (
    /* Split Card Body */
    compose(card_stories_exports, "SplitCardBody")
  );
  var Borderless2 = (
    /* Borderless */
    compose(card_stories_exports, "Borderless")
  );
  var BorderRadius2 = (
    /* Border Radius */
    compose(card_stories_exports, "BorderRadius")
  );
  var BreakpointProps2 = (
    /* Breakpoint Props */
    compose(card_stories_exports, "BreakpointProps")
  );
  var EqualHeight2 = (
    /* Equal Height */
    compose(card_stories_exports, "EqualHeight")
  );
  var WithNotification2 = (
    /* With Notification */
    compose(card_stories_exports, "WithNotification")
  );
  var TimelineCard2 = (
    /* Timeline Card */
    compose(card_stories_exports, "TimelineCard")
  );
  var TwoTonedCard2 = (
    /* Two Toned Card */
    compose(card_stories_exports, "TwoTonedCard")
  );
  return __toCommonJS(Card_exports);
})();
