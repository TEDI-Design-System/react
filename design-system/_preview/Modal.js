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

  // .design-sync/.cache/previews/Modal.tsx
  var Modal_exports = {};
  __export(Modal_exports, {
    AlertDialog: () => AlertDialog3,
    Controlled: () => Controlled3,
    CustomWidth: () => CustomWidth2,
    Default: () => Default2,
    FooterVariants: () => FooterVariants2,
    Fullscreen: () => Fullscreen2,
    NoBackdropClose: () => NoBackdropClose2,
    NoCloseButton: () => NoCloseButton2,
    Position: () => Position2,
    ResponsiveProps: () => ResponsiveProps2,
    ScrollableContent: () => ScrollableContent2,
    Size: () => Size2,
    Width: () => Width2,
    WithDescription: () => WithDescription2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/overlays/modal/modal.stories.tsx
  var modal_stories_exports = {};
  __export(modal_stories_exports, {
    AlertDialog: () => AlertDialog,
    Controlled: () => Controlled,
    CustomWidth: () => CustomWidth,
    Default: () => Default,
    FooterVariants: () => FooterVariants,
    Fullscreen: () => Fullscreen,
    NoBackdropClose: () => NoBackdropClose,
    NoCloseButton: () => NoCloseButton,
    Position: () => Position,
    ResponsiveProps: () => ResponsiveProps,
    ScrollableContent: () => ScrollableContent,
    Size: () => Size,
    Width: () => Width,
    WithDescription: () => WithDescription,
    default: () => modal_stories_default
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

  // ds-shim:ds:TextField
  var ds_TextField_exports = {};
  __export(ds_TextField_exports, {
    default: () => ds_TextField_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_TextField_exports, __toESM(require_ds_raw()));
  var g4 = window.Tedi;
  var ds_TextField_default = g4["TextField"] !== void 0 ? g4["TextField"] : g4;

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
  var g5 = window.Tedi;
  var ds_Row_default = g5["Row"] !== void 0 ? g5["Row"] : g5;

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
  var g6 = window.Tedi;
  var ds_Col_default = g6["Col"] !== void 0 ? g6["Col"] : g6;

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
  var g7 = window.Tedi;
  var ds_VerticalSpacing_default = g7["VerticalSpacing"] !== void 0 ? g7["VerticalSpacing"] : g7;

  // ds-shim:ds:ScrollFade
  var ds_ScrollFade_exports = {};
  __export(ds_ScrollFade_exports, {
    default: () => ds_ScrollFade_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_ScrollFade_exports, __toESM(require_ds_raw()));
  var g8 = window.Tedi;
  var ds_ScrollFade_default = g8["ScrollFade"] !== void 0 ? g8["ScrollFade"] : g8;

  // ds-shim:ds:Separator
  var ds_Separator_exports = {};
  __export(ds_Separator_exports, {
    default: () => ds_Separator_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Separator_exports, __toESM(require_ds_raw()));
  var g9 = window.Tedi;
  var ds_Separator_default = g9["Separator"] !== void 0 ? g9["Separator"] : g9;

  // ds-shim:ds:Modal
  var ds_Modal_exports = {};
  __export(ds_Modal_exports, {
    default: () => ds_Modal_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Modal_exports, __toESM(require_ds_raw()));
  var g10 = window.Tedi;
  var ds_Modal_default = g10["Modal"] !== void 0 ? g10["Modal"] : g10;

  // src/tedi/components/overlays/modal/modal.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    component: ds_Modal_exports.Modal,
    subcomponents: {
      "Modal.Trigger": ds_Modal_exports.Modal.Trigger,
      "Modal.Content": ds_Modal_exports.Modal.Content,
      "Modal.Header": ds_Modal_exports.Modal.Header,
      "Modal.Body": ds_Modal_exports.Modal.Body,
      "Modal.Footer": ds_Modal_exports.Modal.Footer,
      "Modal.Closer": ds_Modal_exports.Modal.Closer
    },
    title: "TEDI-Ready/Components/Overlay/Modal",
    parameters: {
      status: {
        type: [{ name: "breakpointSupport", url: "?path=/docs/helpers-usebreakpointprops--usebreakpointprops" }]
      },
      design: {
        type: "figma",
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.70?node-id=4624-94325&m=dev"
      }
    }
  };
  var modal_stories_default = meta;
  var SampleForm = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextField_exports.TextField, { id: "modal-field-1", label: "Label" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextField_exports.TextField, { id: "modal-field-2", label: "Label" })
  ] });
  var ScrollableForm = ({ idPrefix }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Heading_exports.Heading, { element: "h3", modifiers: "h5", children: "Teenus" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextField_exports.TextField, { id: `${idPrefix}-service`, label: "Teenus" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextField_exports.TextField, { id: `${idPrefix}-institution`, label: "Asutus" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextField_exports.TextField, { id: `${idPrefix}-persons`, label: "Isikud" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextField_exports.TextField, { id: `${idPrefix}-priority`, label: "Prioriteet" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextField_exports.TextField, { id: `${idPrefix}-description`, label: "Probleemi kirjeldus" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 6, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextField_exports.TextField, { id: `${idPrefix}-start-date`, label: "Alguskuupäev" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 6, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextField_exports.TextField, { id: `${idPrefix}-end-date`, label: "Lõppkuupäev" }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_default, {}),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Heading_exports.Heading, { element: "h3", modifiers: "h5", children: "Kontaktisik" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 6, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextField_exports.TextField, { id: `${idPrefix}-contact-first-name`, label: "Eesnimi" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 6, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextField_exports.TextField, { id: `${idPrefix}-contact-last-name`, label: "Perenimi" }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextField_exports.TextField, { id: `${idPrefix}-contact-id`, label: "Isikukood" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 6, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextField_exports.TextField, { id: `${idPrefix}-contact-phone`, label: "Telefon" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 6, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextField_exports.TextField, { id: `${idPrefix}-contact-email`, label: "E-post" }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextField_exports.TextField, { id: `${idPrefix}-contact-address`, label: "Aadress" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_default, {}),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Heading_exports.Heading, { element: "h3", modifiers: "h5", children: "Esindaja" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 6, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextField_exports.TextField, { id: `${idPrefix}-rep-first-name`, label: "Eesnimi" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 6, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextField_exports.TextField, { id: `${idPrefix}-rep-last-name`, label: "Perenimi" }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextField_exports.TextField, { id: `${idPrefix}-rep-id`, label: "Isikukood" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 6, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextField_exports.TextField, { id: `${idPrefix}-rep-phone`, label: "Telefon" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 6, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextField_exports.TextField, { id: `${idPrefix}-rep-email`, label: "E-post" }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextField_exports.TextField, { id: `${idPrefix}-rep-address`, label: "Aadress" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextField_exports.TextField, { id: `${idPrefix}-rep-relation`, label: "Seos isikuga" })
  ] });
  var DefaultFooter = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal.Footer, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Closer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "Cancel" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Closer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { children: "Continue" }) })
  ] });
  var Default = {
    argTypes: {
      ...subcomponentArgTypes(ds_Modal_exports.Modal.Content, {
        category: "Modal.Content",
        prefix: "content",
        exclude: ["children", "initialFocus", "aria-labelledby", "aria-describedby", "aria-label"]
      })
    },
    render: (args) => {
      const { heading = "Modal title", description, closeButton = true, ...rest } = args;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal, { ...getPrimaryComponentProps(rest), children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "Open modal" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal.Content, { ...getSubcomponentProps(args, "content"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Modal_exports.Modal.Header,
            {
              title: heading,
              description,
              closeButton
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Body, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SampleForm, {}) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefaultFooter, {})
        ] })
      ] });
    }
  };
  var Position = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { gutterY: 2, children: ["center", "top", "right", "left"].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: p === "center" ? "Center" : p === "top" ? "Top-aligned" : `Side (${p})` }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal.Content, { position: p, width: p === "right" || p === "left" ? "sm" : "md", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Modal_exports.Modal.Header,
          {
            title: p === "center" ? "Center modal" : p === "top" ? "Top-aligned modal" : `Side modal (${p})`
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Body, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SampleForm, {}) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefaultFooter, {})
      ] })
    ] }) }, p)) })
  };
  var Size = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { gutterY: 2, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "Open small modal" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal.Content, { size: "small", width: "sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Header, { title: "Small modal" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Body, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SampleForm, {}) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefaultFooter, {})
        ] })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "Open default modal" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal.Content, { size: "default", width: "sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Header, { title: "Default modal" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Body, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SampleForm, {}) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefaultFooter, {})
        ] })
      ] }) })
    ] })
  };
  var Width = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { gutterY: 2, children: ["xs", "sm", "md", "lg", "xl"].map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: w }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal.Content, { width: w, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Header, { title: `Width: ${w}` }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Body, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SampleForm, {}) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefaultFooter, {})
      ] })
    ] }) }, w)) })
  };
  var CustomWidth = {
    name: "Custom width",
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "Open modal" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal.Content, { width: "800px", maxWidth: "75%", position: "left", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Header, { title: "Width: 800px, max: 75%" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Body, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SampleForm, {}) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefaultFooter, {})
      ] })
    ] })
  };
  var Fullscreen = {
    render: () => {
      const variants = [
        { label: "Normal (default)", value: false },
        { label: "Padded fullscreen", value: true },
        { label: "Edge-to-edge fullscreen", value: "edge" }
      ];
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { gutterY: 2, children: variants.map(({ label, value }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: label }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal.Content, { width: "md", fullscreen: value, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Header, { title: label }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Body, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SampleForm, {}) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefaultFooter, {})
        ] })
      ] }) }, label)) });
    }
  };
  var ScrollableContent = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { gutterY: 2, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "Content scrollbar" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal.Content, { width: "md", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Header, { title: "Uus toiming" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Body, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollableForm, { idPrefix: "scroll" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal.Footer, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Closer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "Katkesta" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Closer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { children: "Lisa" }) })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "Content fade" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal.Content, { width: "md", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Header, { title: "Uus toiming" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Body, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ScrollFade_exports.ScrollFade, { fadePosition: "both", fadeSize: 10, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { padding: "var(--modal-body-padding)" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollableForm, { idPrefix: "fade" }) }) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal.Footer, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Closer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "Katkesta" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Closer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { children: "Lisa" }) })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "Page scroll" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal.Content, { width: "md", scrollBehavior: "page", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Header, { title: "Uus toiming" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Body, { noScroll: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollableForm, { idPrefix: "page" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal.Footer, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Closer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "Katkesta" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Closer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { children: "Lisa" }) })
          ] })
        ] })
      ] }) })
    ] })
  };
  var WithDescription = {
    name: "With header description",
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "With description" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal.Content, { width: "md", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Modal_exports.Modal.Header,
          {
            title: "With description",
            description: "This modal has additional description text in the header."
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Body, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SampleForm, {}) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefaultFooter, {})
      ] })
    ] })
  };
  var NoBackdropClose = {
    name: "No backdrop close",
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal, { closeOnBackdropClick: false, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "No backdrop close" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal.Content, { width: "md", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Header, { title: "No backdrop close" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Body, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SampleForm, {}) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefaultFooter, {})
      ] })
    ] })
  };
  var NoCloseButton = {
    name: "No close button",
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "No close button" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal.Content, { width: "md", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Header, { title: "No close button", closeButton: false }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Body, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SampleForm, {}) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefaultFooter, {})
      ] })
    ] })
  };
  var FooterVariants = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { gutterY: 2, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "Open modal" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal.Content, { width: "sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Header, { title: "Title" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Body, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SampleForm, {}) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefaultFooter, {})
        ] })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "Left right buttons" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal.Content, { width: "sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Header, { title: "Title" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Body, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SampleForm, {}) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Modal_exports.Modal.Footer,
            {
              left: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Closer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "Cancel" }) }),
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Closer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { children: "Continue" }) })
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "Three buttons" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal.Content, { width: "sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Header, { title: "Title" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Body, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SampleForm, {}) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            ds_Modal_exports.Modal.Footer,
            {
              left: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Closer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "neutral", iconLeft: "arrow_back", children: "Back" }) }),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Closer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "Cancel" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Closer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { children: "Continue" }) })
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "No footer" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal.Content, { width: "sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Header, { title: "Title" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Body, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SampleForm, {}) })
        ] })
      ] }) })
    ] })
  };
  var ResponsiveProps = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { gutterY: 2, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "Side on desktop, centered on mobile" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal.Content, { position: "center", width: "sm", md: { position: "right" }, defaultServerBreakpoint: "md", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Header, { title: "Responsive position" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal.Body, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Side drawer at `md` and up; centered modal below `md`." }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SampleForm, {})
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefaultFooter, {})
        ] })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", children: "lg on desktop, fullscreen on mobile" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal.Content, { width: "lg", fullscreen: "edge", md: { fullscreen: false }, defaultServerBreakpoint: "md", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Header, { title: "Responsive width" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal.Body, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Wide `lg` modal on desktop; edge-to-edge fullscreen below `md`. Width presets don't differentiate on phone viewports — every preset is wider than a 375px screen and clamps to viewport width — so the responsive payoff is usually a fullscreen flip, not a width swap." }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SampleForm, {})
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefaultFooter, {})
        ] })
      ] }) })
    ] })
  };
  var AlertDialog = {
    render: function AlertDialog2() {
      const cancelRef = (0, import_react.useRef)(null);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal, { role: "alertdialog", closeOnBackdropClick: false, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "neutral", color: "danger", children: "Delete account" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal.Content, { width: "xs", initialFocus: cancelRef, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Modal_exports.Modal.Header,
            {
              title: "Delete your account?",
              description: "This action is permanent and cannot be undone.",
              closeButton: false
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal.Footer, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Closer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { ref: cancelRef, visualType: "secondary", children: "Cancel" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Closer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { color: "danger", children: "Delete" }) })
          ] })
        ] })
      ] });
    }
  };
  var Controlled = {
    render: function Controlled2() {
      const [open, setOpen] = (0, import_react.useState)(false);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", onClick: () => setOpen(true), children: "External open" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal, { open, onToggle: setOpen, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Modal_exports.Modal.Content, { width: "sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Header, { title: "Controlled modal" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Body, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "The trigger lives outside the Modal subtree — open state is held by the parent." }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Footer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Modal_exports.Modal.Closer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { children: "Close" }) }) })
        ] }) })
      ] });
    }
  };

  // .design-sync/.cache/previews/Modal.tsx
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
    compose(modal_stories_exports, "Default")
  );
  var Position2 = (
    /* Position */
    compose(modal_stories_exports, "Position")
  );
  var Size2 = (
    /* Size */
    compose(modal_stories_exports, "Size")
  );
  var Width2 = (
    /* Width */
    compose(modal_stories_exports, "Width")
  );
  var CustomWidth2 = (
    /* Custom width */
    compose(modal_stories_exports, "CustomWidth")
  );
  var Fullscreen2 = (
    /* Fullscreen */
    compose(modal_stories_exports, "Fullscreen")
  );
  var ScrollableContent2 = (
    /* Scrollable Content */
    compose(modal_stories_exports, "ScrollableContent")
  );
  var WithDescription2 = (
    /* With header description */
    compose(modal_stories_exports, "WithDescription")
  );
  var NoBackdropClose2 = (
    /* No backdrop close */
    compose(modal_stories_exports, "NoBackdropClose")
  );
  var NoCloseButton2 = (
    /* No close button */
    compose(modal_stories_exports, "NoCloseButton")
  );
  var FooterVariants2 = (
    /* Footer Variants */
    compose(modal_stories_exports, "FooterVariants")
  );
  var ResponsiveProps2 = (
    /* Responsive Props */
    compose(modal_stories_exports, "ResponsiveProps")
  );
  var AlertDialog3 = (
    /* Alert Dialog */
    compose(modal_stories_exports, "AlertDialog")
  );
  var Controlled3 = (
    /* Controlled */
    compose(modal_stories_exports, "Controlled")
  );
  return __toCommonJS(Modal_exports);
})();
