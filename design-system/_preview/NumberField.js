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

  // .design-sync/.cache/previews/NumberField.tsx
  var NumberField_exports = {};
  __export(NumberField_exports, {
    Controlled: () => Controlled2,
    Decimal: () => Decimal2,
    Default: () => Default2,
    FullWidth: () => FullWidth2,
    Sizes: () => Sizes2,
    States: () => States2,
    WithHint: () => WithHint2,
    WithUnit: () => WithUnit2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/form/number-field/number-field.stories.tsx
  var number_field_stories_exports = {};
  __export(number_field_stories_exports, {
    Controlled: () => Controlled,
    Decimal: () => Decimal,
    Default: () => Default,
    FullWidth: () => FullWidth,
    Sizes: () => Sizes,
    States: () => States,
    WithHint: () => WithHint,
    WithUnit: () => WithUnit,
    default: () => number_field_stories_default
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

  // ds-shim:ds:NumberField
  var ds_NumberField_exports = {};
  __export(ds_NumberField_exports, {
    default: () => ds_NumberField_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_NumberField_exports, __toESM(require_ds_raw()));
  var g6 = window.Tedi;
  var ds_NumberField_default = g6["NumberField"] !== void 0 ? g6["NumberField"] : g6;

  // src/tedi/components/form/number-field/number-field.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    component: ds_NumberField_exports.NumberField,
    title: "TEDI-Ready/Components/Form/NumberField",
    parameters: {
      status: {
        type: [{ name: "breakpointSupport", url: "?path=/docs/helpers-usebreakpointprops--usebreakpointprops" }]
      },
      controls: {
        exclude: ["sm", "md", "lg", "xl", "xxl"]
      },
      design: {
        type: "figma",
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4536-78765&m=dev"
      }
    }
  };
  var number_field_stories_default = meta;
  var sizesArray = ["default", "small"];
  var TemplateSizes = (args) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 6, md: 12, className: "example-list", children: sizesArray.map((size, key) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { className: `${key === sizesArray.length - 1 ? "" : "border-bottom"} padding-14-16`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 2, md: 12, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: size.charAt(0).toUpperCase() + size.slice(1) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: "auto", md: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_NumberField_exports.NumberField, { ...args, size, id: `numberfield-size-${size}` }) })
    ] }, key)) }) });
  };
  var Default = {
    args: {
      label: "Label",
      defaultValue: 1,
      step: 1,
      max: 10,
      min: 0
    }
  };
  var Sizes = {
    render: TemplateSizes,
    args: {
      label: "Label",
      defaultValue: 1,
      step: 1,
      max: 10,
      min: 0
    }
  };
  var States = {
    args: {
      step: 1,
      max: 10,
      min: -10,
      label: "Label",
      defaultValue: 1
    },
    parameters: {
      pseudo: {
        hover: "#Hover",
        active: "#Active",
        focus: "#Focus"
      }
    },
    render: (args) => {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 2, md: 12, className: "flex align-items-center gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Default" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_NumberField_exports.NumberField, { ...args, id: "example-6" }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 2, md: 12, className: "flex align-items-center gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Min value" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_NumberField_exports.NumberField, { ...args, defaultValue: 1, min: 1 }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 2, md: 12, className: "flex align-items-center gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Max value" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_NumberField_exports.NumberField, { ...args, defaultValue: 1, max: 1 }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 2, md: 12, className: "flex align-items-center gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Disabled" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_NumberField_exports.NumberField, { ...args, defaultValue: 1, disabled: true }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 2, md: 12, className: "flex align-items-center gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Error" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_NumberField_exports.NumberField, { ...args, helper: { id: "example-3", text: "Feedback text", type: "error" } }) })
        ] })
      ] });
    }
  };
  var WithHint = {
    args: {
      label: "Label",
      helper: {
        text: "Hint text",
        type: "hint"
      }
    }
  };
  var Decimal = {
    args: {
      label: "Label",
      defaultValue: 1.5,
      step: 0.25,
      max: 3,
      min: -3
    }
  };
  var WithUnit = {
    args: {
      label: "Label",
      defaultValue: 2,
      step: 1,
      max: 5,
      min: -5,
      suffix: "unit"
    }
  };
  var FullWidth = {
    args: {
      label: "Label",
      value: 2,
      step: 1,
      suffix: "unit",
      fullWidth: true
    }
  };
  var Controlled = {
    args: {
      step: 1,
      max: 10,
      min: -10,
      defaultValue: 1,
      suffix: "unit"
    },
    render: (args) => {
      const [state, setState] = (0, import_react.useState)(15);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 2, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { cols: "auto", alignItems: "center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { icon: { name: "remove" }, onClick: () => setState((prev) => prev - 1), children: "Remove" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
            "Current state: ",
            state
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { icon: { name: "add" }, onClick: () => setState((prev) => prev + 1), children: "Add" }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_NumberField_exports.NumberField,
          {
            ...args,
            value: state,
            onChange: (num) => setState(num),
            id: "example-8",
            label: "Controlled"
          }
        ) }) })
      ] });
    }
  };

  // .design-sync/.cache/previews/NumberField.tsx
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
    compose(number_field_stories_exports, "Default")
  );
  var Sizes2 = (
    /* Sizes */
    compose(number_field_stories_exports, "Sizes")
  );
  var States2 = (
    /* States */
    compose(number_field_stories_exports, "States")
  );
  var WithHint2 = (
    /* With Hint */
    compose(number_field_stories_exports, "WithHint")
  );
  var Decimal2 = (
    /* Decimal */
    compose(number_field_stories_exports, "Decimal")
  );
  var WithUnit2 = (
    /* With Unit */
    compose(number_field_stories_exports, "WithUnit")
  );
  var FullWidth2 = (
    /* Full Width */
    compose(number_field_stories_exports, "FullWidth")
  );
  var Controlled2 = (
    /* Controlled */
    compose(number_field_stories_exports, "Controlled")
  );
  return __toCommonJS(NumberField_exports);
})();
