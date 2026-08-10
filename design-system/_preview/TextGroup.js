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

  // .design-sync/.cache/previews/TextGroup.tsx
  var TextGroup_exports = {};
  __export(TextGroup_exports, {
    CustomLabel: () => CustomLabel2,
    Default: () => Default2,
    HorizontalLabelLength: () => HorizontalLabelLength2,
    LongTextValues: () => LongTextValues2,
    PositionType: () => PositionType2,
    ResponsiveLayoutChange: () => ResponsiveLayoutChange2,
    Types: () => Types2,
    WithList: () => WithList2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/content/text-group/text-group.stories.tsx
  var text_group_stories_exports = {};
  __export(text_group_stories_exports, {
    CustomLabel: () => CustomLabel,
    Default: () => Default,
    HorizontalLabelLength: () => HorizontalLabelLength,
    LongTextValues: () => LongTextValues,
    PositionType: () => PositionType,
    ResponsiveLayoutChange: () => ResponsiveLayoutChange,
    Types: () => Types,
    WithList: () => WithList,
    default: () => text_group_stories_default
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

  // ds-shim:ds:InfoButton
  var ds_InfoButton_exports = {};
  __export(ds_InfoButton_exports, {
    default: () => ds_InfoButton_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_InfoButton_exports, __toESM(require_ds_raw()));
  var g3 = window.Tedi;
  var ds_InfoButton_default = g3["InfoButton"] !== void 0 ? g3["InfoButton"] : g3;

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

  // ds-shim:ds:StatusBadge
  var ds_StatusBadge_exports = {};
  __export(ds_StatusBadge_exports, {
    default: () => ds_StatusBadge_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_StatusBadge_exports, __toESM(require_ds_raw()));
  var g7 = window.Tedi;
  var ds_StatusBadge_default = g7["StatusBadge"] !== void 0 ? g7["StatusBadge"] : g7;

  // ds-shim:ds:TextGroup
  var ds_TextGroup_exports = {};
  __export(ds_TextGroup_exports, {
    default: () => ds_TextGroup_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_TextGroup_exports, __toESM(require_ds_raw()));
  var g8 = window.Tedi;
  var ds_TextGroup_default = g8["TextGroup"] !== void 0 ? g8["TextGroup"] : g8;

  // src/tedi/components/content/text-group/text-group.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    component: ds_TextGroup_exports.TextGroup,
    title: "Tedi-Ready/Content/TextGroup",
    subcomponents: { "TextGroup.List": ds_TextGroup_exports.TextGroup.List },
    parameters: {
      status: {
        type: [{ name: "breakpointSupport", url: "?path=/docs/helpers-usebreakpointprops--usebreakpointprops" }]
      },
      controls: {
        exclude: ["sm", "md", "lg", "xl", "xxl"]
      },
      design: {
        type: "figma",
        url: "https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=45-30752&mode=dev"
      }
    },
    argTypes: {
      labelAlign: {
        control: "radio",
        options: ["left", "right"],
        if: { arg: "type", neq: "vertical" },
        table: {
          disable: false
        }
      },
      type: {
        control: "radio",
        options: ["vertical", "horizontal"]
      }
    }
  };
  var text_group_stories_default = meta;
  var TemplateWithLayouts = (args) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1.5, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextGroup_exports.TextGroup, { ...args, type: "vertical", labelAlign: "left" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextGroup_exports.TextGroup, { ...args, type: "horizontal", labelWidth: "150px" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextGroup_exports.TextGroup, { ...args, type: "horizontal", labelWidth: "150px", labelAlign: "right" })
    ] });
  };
  var MultipleTextGroupsTemplate = (args) => {
    const groups = [
      {
        labelWidth: "150px",
        items: [
          {
            label: "Patient",
            value: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "person", size: 18, color: "tertiary" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Mari Maasikas" })
            ] })
          },
          {
            label: "Address",
            value: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "location_on", size: 16, color: "tertiary" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Tulbi tn 4, Tallinn, 23562, Estonia" })
            ] })
          }
        ]
      },
      {
        labelWidth: "180px",
        items: [
          {
            label: "Vaccine",
            value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Mari Maasikas" })
          },
          {
            label: "Next vaccination",
            value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Immunization finished" })
          }
        ]
      },
      {
        labelWidth: "200px",
        items: [
          {
            label: "Healthcare provider",
            value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "SA Põhja-Eesti Regionaalhaigla" })
          },
          {
            label: "Healthcare specialist",
            value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Mart Mets" })
          },
          {
            label: "Document creation time",
            value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "16.08.2023 14:51:48" })
          }
        ]
      }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1, children: groups.map((group, groupIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: group.items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextGroup_exports.TextGroup, { ...args, label: item.label, labelWidth: group.labelWidth, value: item.value }, index)) }) }, groupIndex)) });
  };
  var TemplateWithTypes = (args) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextGroup_exports.TextGroup, { ...args, type: "vertical", labelAlign: "left" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_TextGroup_exports.TextGroup,
        {
          ...args,
          type: "vertical",
          labelAlign: "left",
          value: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "lock", size: 16, color: "tertiary" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Visible to doctor and representative" })
          ] })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_TextGroup_exports.TextGroup,
        {
          ...args,
          type: "vertical",
          labelAlign: "left",
          value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Visible to doctor and representative" })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_TextGroup_exports.TextGroup,
        {
          label: "Patient",
          value: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "person", size: 18, color: "tertiary" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Mari Maasikas" })
          ] }),
          type: "horizontal"
        }
      )
    ] }) }) });
  };
  var Default = {
    args: {
      label: "Accessibility",
      value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Visible to doctor and representative" })
    }
  };
  var Types = {
    render: TemplateWithTypes,
    args: {
      label: "Accessibility",
      value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Visible to doctor and representative" })
    }
  };
  var PositionType = {
    render: TemplateWithLayouts,
    args: {
      label: "Accessibility",
      value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Visible to doctor and representative" })
    }
  };
  var HorizontalLabelLength = {
    render: MultipleTextGroupsTemplate,
    args: {
      type: "horizontal"
    }
  };
  var LongTextValues = {
    render: TemplateWithLayouts,
    args: {
      label: "Accessibility",
      labelWidth: "150px",
      value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pulvinar malesuada tellus, nec efficitur orci interdum vitae. Proin semper venenatis est, vel malesuada sapien ornare at. Vestibulum egestas in lectus non finibus. Donec rhoncus sapien vel justo elementum vestibulum. Vivamus euismod dui vel erat semper luctus. Nulla egestas purus elit, non fermentum sapien sagittis nec. Pellentesque ac sapien non justo vehicula porta." })
    }
  };
  var ResponsiveLayoutChange = {
    args: {
      label: "Accessibility",
      value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Visible to doctor and representative" }),
      md: { type: "vertical" },
      lg: { type: "horizontal" }
    },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextGroup_exports.TextGroup, { ...args })
  };
  var CustomLabel = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_TextGroup_exports.TextGroup,
        {
          label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Text_exports.Text, { modifiers: "bold", color: "secondary", children: [
            "Authorisations ",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InfoButton_default, { children: "More information" })
          ] }),
          value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Visible to doctor and representative" })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_TextGroup_exports.TextGroup,
        {
          label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Text_exports.Text, { modifiers: "bold", color: "secondary", children: [
            "Status ",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { color: "success", children: "Active" })
          ] }),
          value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Some text regarding to status" }),
          type: "horizontal"
        }
      )
    ] })
  };
  var WithList = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1.5, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Vertical list (default)" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_TextGroup_exports.TextGroup.List,
        {
          items: [
            { label: "Patient", value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Mari Maasikas" }) },
            { label: "Address", value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Tulbi tn 4, Tallinn, 23562, Estonia" }) },
            { label: "Vaccine", value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "COVID-19 mRNA" }) },
            { label: "Next vaccination", value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Immunization finished" }) }
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Horizontal list with shared label column" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_TextGroup_exports.TextGroup.List,
        {
          type: "horizontal",
          labelWidth: "220px",
          items: [
            {
              label: "Patient",
              value: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "person", size: 18, color: "tertiary" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Mari Maasikas" })
              ] })
            },
            {
              label: "Address",
              value: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "location_on", size: 16, color: "tertiary" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Tulbi tn 4, Tallinn, 23562, Estonia" })
              ] })
            },
            { label: "Healthcare provider", value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "SA Põhja-Eesti Regionaalhaigla" }) },
            { label: "Healthcare specialist", value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Mart Mets" }) },
            { label: "Document creation time", value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "16.08.2023 14:51:48" }) }
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Per-row labelAlign / labelWidth overrides" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_TextGroup_exports.TextGroup.List,
        {
          type: "horizontal",
          labelWidth: "160px",
          items: [
            { label: "Item", value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "USB-C charging cable" }) },
            { label: "Quantity", value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "2" }) },
            { label: "Unit price", value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "€ 12.50" }), labelAlign: "right", labelWidth: "220px" },
            { label: "Total", value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "€ 25.00" }), labelAlign: "right", labelWidth: "220px" }
          ]
        }
      )
    ] })
  };

  // .design-sync/.cache/previews/TextGroup.tsx
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
    compose(text_group_stories_exports, "Default")
  );
  var Types2 = (
    /* Types */
    compose(text_group_stories_exports, "Types")
  );
  var PositionType2 = (
    /* Position Type */
    compose(text_group_stories_exports, "PositionType")
  );
  var HorizontalLabelLength2 = (
    /* Horizontal Label Length */
    compose(text_group_stories_exports, "HorizontalLabelLength")
  );
  var LongTextValues2 = (
    /* Long Text Values */
    compose(text_group_stories_exports, "LongTextValues")
  );
  var ResponsiveLayoutChange2 = (
    /* Responsive Layout Change */
    compose(text_group_stories_exports, "ResponsiveLayoutChange")
  );
  var CustomLabel2 = (
    /* Custom Label */
    compose(text_group_stories_exports, "CustomLabel")
  );
  var WithList2 = (
    /* With List */
    compose(text_group_stories_exports, "WithList")
  );
  return __toCommonJS(TextGroup_exports);
})();
