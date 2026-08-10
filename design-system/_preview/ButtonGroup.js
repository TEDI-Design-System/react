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

  // .design-sync/.cache/previews/ButtonGroup.tsx
  var ButtonGroup_exports = {};
  __export(ButtonGroup_exports, {
    Default: () => Default2,
    DifferentWidthButtons: () => DifferentWidthButtons2,
    IconOnly: () => IconOnly2,
    Primary: () => Primary2,
    Secondary: () => Secondary2,
    Sizes: () => Sizes2,
    Stretched: () => Stretched2,
    Types: () => Types2,
    WithIcon: () => WithIcon2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/buttons/button-group/button-group.stories.tsx
  var button_group_stories_exports = {};
  __export(button_group_stories_exports, {
    Default: () => Default,
    DifferentWidthButtons: () => DifferentWidthButtons,
    IconOnly: () => IconOnly,
    Primary: () => Primary,
    Secondary: () => Secondary,
    Sizes: () => Sizes,
    Stretched: () => Stretched,
    Types: () => Types,
    WithIcon: () => WithIcon,
    default: () => button_group_stories_default
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
  var g2 = window.Tedi;
  var ds_Row_default = g2["Row"] !== void 0 ? g2["Row"] : g2;

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
  var g3 = window.Tedi;
  var ds_Col_default = g3["Col"] !== void 0 ? g3["Col"] : g3;

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
  var g4 = window.Tedi;
  var ds_VerticalSpacing_default = g4["VerticalSpacing"] !== void 0 ? g4["VerticalSpacing"] : g4;

  // ds-shim:ds:Button
  var ds_Button_exports = {};
  __export(ds_Button_exports, {
    default: () => ds_Button_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Button_exports, __toESM(require_ds_raw()));
  var g5 = window.Tedi;
  var ds_Button_default = g5["Button"] !== void 0 ? g5["Button"] : g5;

  // ds-shim:ds:ButtonGroup
  var ds_ButtonGroup_exports = {};
  __export(ds_ButtonGroup_exports, {
    default: () => ds_ButtonGroup_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_ButtonGroup_exports, __toESM(require_ds_raw()));
  var g6 = window.Tedi;
  var ds_ButtonGroup_default = g6["ButtonGroup"] !== void 0 ? g6["ButtonGroup"] : g6;

  // src/tedi/components/buttons/button-group/button-group.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    title: "TEDI-Ready/Components/Buttons/ButtonGroup",
    component: ds_ButtonGroup_default
  };
  var button_group_stories_default = meta;
  var buttonStates = ["Default", "Hover", "Active", "Focus", "Disabled"];
  var sizeArray = ["default", "small"];
  var Template = (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_ButtonGroup_default, { ...args, ariaLabel: "Button group example", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { id: "1", children: "Details" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { id: "2", isActive: true, children: "Updates" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { id: "3", children: "Settings" })
  ] });
  var TemplateSizes = (args) => {
    const { array, property, ...buttonGroupProps } = args;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "example-list", children: array.map((value, key) => {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { className: `${key === array.length - 1 ? "" : "border-bottom"} padding-14-16`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: 2, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: value ? value.charAt(0).toUpperCase() + value.slice(1) : "" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_ButtonGroup_default, { type: "primary", ...buttonGroupProps, ...{ [property]: value }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { id: "01", children: "Tab 1" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { id: "02", isActive: true, children: "Tab 2" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { id: "03", children: "Tab 3" })
        ] }) })
      ] }, key);
    }) });
  };
  var TemplateTypes = (args) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { gutterY: 2, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_ButtonGroup_default, { type: "primary", stretch: false, ariaLabel: "Button group example", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { id: "1", ...args, children: "Tab 1" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { id: "2", isActive: true, ...args, children: "Tab 2" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { id: "3", ...args, children: "Tab 3" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_ButtonGroup_default, { type: "secondary", stretch: false, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { id: "1", ...args, children: "Tab 1" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { id: "2", isActive: true, ...args, children: "Tab 2" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { id: "3", ...args, children: "Tab 3" })
      ] }) })
    ] });
  };
  var TemplateWithIcons = (args) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_ButtonGroup_default, { ...args, stretch: false, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { id: "1", iconLeft: "table", children: "Tab 1" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { id: "2", iconLeft: "refresh", isActive: true, children: "Tab 2" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { id: "3", iconLeft: "settings", children: "Tab 3" })
    ] });
  };
  var TemplateIconOnly = (args) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_ButtonGroup_default, { ...args, stretch: false, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { id: "1", icon: "table", children: "Tab 1" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { id: "2", icon: "refresh", isActive: true, children: "Tab 2" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { id: "3", icon: "settings", children: "Tab 3" })
    ] });
  };
  var Default = {
    render: Template,
    args: {
      type: "primary",
      stretch: false,
      dropdownLabel: "Text"
    }
  };
  var Sizes = {
    render: TemplateSizes,
    args: {
      property: "size",
      array: sizeArray,
      dropdownLabel: "Text",
      enableMobileDropdown: true
    }
  };
  var Types = {
    render: TemplateTypes
  };
  var WithIcon = {
    render: TemplateWithIcons,
    args: {
      type: "primary",
      enableMobileDropdown: true,
      dropdownLabelMode: "active"
    }
  };
  var IconOnly = {
    render: TemplateIconOnly,
    args: {
      type: "primary"
    }
  };
  var TemplateColumn = (args) => {
    const [selectedId, setSelectedId] = (0, import_react.useState)(null);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0.5, children: args.states.map((state, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 1, md: 2, sm: 2, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: state }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 6, md: 10, sm: 10, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_ButtonGroup_default, { type: args.type, onSelectionChange: setSelectedId, ariaLabel: "Button group example", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Button_exports.Button,
          {
            id: `${state}-${args.type}`,
            isActive: state === "Active" || selectedId === `${state}-1-${args.type}`,
            onClick: () => setSelectedId(`${state}-1-${args.type}`),
            disabled: state === "Disabled",
            children: "Details"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { id: `${state}-2-${args.type}`, onClick: () => setSelectedId(`${state}-2-${args.type}`), children: "Updates" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { id: `${state}-3-${args.type}`, onClick: () => setSelectedId(`${state}-3-${args.type}`), children: "Settings" })
      ] }) })
    ] }, index)) });
  };
  var Primary = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateColumn, { ...args, type: "primary" }),
    args: {
      states: buttonStates
    },
    parameters: {
      pseudo: {
        hover: ["#Hover-primary"],
        active: ["#Active-primary"],
        focusVisible: ["#Focus-primary"]
      }
    }
  };
  var Secondary = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateColumn, { ...args, type: "secondary" }),
    args: {
      states: buttonStates
    },
    parameters: {
      pseudo: {
        hover: ["#Hover-secondary"],
        active: ["#Active-secondary"],
        focusVisible: ["#Focus-secondary"]
      }
    }
  };
  var DifferentWidthButtons = {
    render: (args) => {
      const [selectedId, setSelectedId] = (0, import_react.useState)(null);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        ds_ButtonGroup_default,
        {
          ...args,
          stretch: false,
          onSelectionChange: setSelectedId,
          ariaLabel: "Button group example",
          enableMobileDropdown: true,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { id: "1", isActive: selectedId === "1", onClick: () => setSelectedId("1"), children: "Text" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { id: "2", isActive: selectedId === "2", children: "Longer text" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { id: "3", isActive: selectedId === "3", children: "Even longer text" })
          ]
        }
      ) }) });
    },
    args: {
      type: "primary"
    }
  };
  var Stretched = {
    render: Template,
    args: {
      stretch: true
    }
  };

  // .design-sync/.cache/previews/ButtonGroup.tsx
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
    compose(button_group_stories_exports, "Default")
  );
  var Sizes2 = (
    /* Sizes */
    compose(button_group_stories_exports, "Sizes")
  );
  var Types2 = (
    /* Types */
    compose(button_group_stories_exports, "Types")
  );
  var WithIcon2 = (
    /* With Icon */
    compose(button_group_stories_exports, "WithIcon")
  );
  var IconOnly2 = (
    /* Icon Only */
    compose(button_group_stories_exports, "IconOnly")
  );
  var Primary2 = (
    /* Primary */
    compose(button_group_stories_exports, "Primary")
  );
  var Secondary2 = (
    /* Secondary */
    compose(button_group_stories_exports, "Secondary")
  );
  var DifferentWidthButtons2 = (
    /* Different Width Buttons */
    compose(button_group_stories_exports, "DifferentWidthButtons")
  );
  var Stretched2 = (
    /* Stretched */
    compose(button_group_stories_exports, "Stretched")
  );
  return __toCommonJS(ButtonGroup_exports);
})();
