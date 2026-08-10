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

  // .design-sync/.cache/previews/TextArea.tsx
  var TextArea_exports = {};
  __export(TextArea_exports, {
    Default: () => Default2,
    DefaultValue: () => DefaultValue2,
    HeightExamples: () => HeightExamples2,
    HintTextAndCharacterCount: () => HintTextAndCharacterCount2,
    OnlyCharacterCount: () => OnlyCharacterCount2,
    Placeholder: () => Placeholder2,
    Sizes: () => Sizes2,
    States: () => States2,
    TextValue: () => TextValue2,
    WithHint: () => WithHint2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/form/textarea/textarea.stories.tsx
  var textarea_stories_exports = {};
  __export(textarea_stories_exports, {
    Default: () => Default,
    DefaultValue: () => DefaultValue,
    HeightExamples: () => HeightExamples,
    HintTextAndCharacterCount: () => HintTextAndCharacterCount,
    OnlyCharacterCount: () => OnlyCharacterCount,
    Placeholder: () => Placeholder,
    Sizes: () => Sizes,
    States: () => States,
    TextValue: () => TextValue,
    WithHint: () => WithHint,
    default: () => textarea_stories_default
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

  // ds-shim:ds:TextArea
  var ds_TextArea_exports = {};
  __export(ds_TextArea_exports, {
    default: () => ds_TextArea_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_TextArea_exports, __toESM(require_ds_raw()));
  var g5 = window.Tedi;
  var ds_TextArea_default = g5["TextArea"] !== void 0 ? g5["TextArea"] : g5;

  // src/tedi/components/form/textarea/textarea.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    component: ds_TextArea_default,
    title: "TEDI-Ready/Components/Form/TextArea",
    parameters: {
      status: {
        type: [{ name: "breakpointSupport", url: "?path=/docs/helpers-usebreakpointprops--usebreakpointprops" }]
      },
      controls: {
        exclude: ["sm", "md", "lg", "xl", "xxl"]
      },
      design: {
        type: "figma",
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=3486-37618&m=dev"
      }
    }
  };
  var textarea_stories_default = meta;
  var stateArray = ["Default", "Hover", "Focus", "Active", "Disabled"];
  var TemplateColumnWithStates = (args) => {
    const { array, ...textFieldProps } = args;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
      array.map((state, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 2, xs: 12, className: "flex align-items-center gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: state }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextArea_default, { disabled: state === "Disabled", ...textFieldProps, id: state }) })
      ] }, index)),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 2, xs: 12, className: "flex align-items-center gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Success" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_TextArea_default,
          {
            ...textFieldProps,
            id: "success-textarea",
            helper: {
              text: "Feedback text",
              type: "valid"
            }
          }
        ) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 2, xs: 12, className: "flex align-items-center gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Error" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_TextArea_default,
          {
            ...textFieldProps,
            id: "error-textarea",
            helper: {
              text: "Feedback text",
              type: "error"
            }
          }
        ) })
      ] })
    ] });
  };
  var sizesArray = ["default", "small"];
  var TemplateSizes = (args) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "example-list", children: sizesArray.map((size, key) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { className: `${key === sizesArray.length - 1 ? "" : "border-bottom"} padding-14-16`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: 12, sm: 2, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: size.charAt(0).toUpperCase() + size.slice(1) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: 12, sm: 10, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextArea_default, { ...args, size, id: `textarea-size-${size}` }) })
    ] }, key)) });
  };
  var TemplateTextValue = (args) => {
    const { value, ...props } = args;
    const [text, setText] = (0, import_react.useState)(value ?? "");
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextArea_default, { value: text, onChange: (t) => setText(t), ...props });
  };
  var Default = {
    args: {
      id: "example-1",
      label: "Label"
    }
  };
  var Sizes = {
    render: TemplateSizes,
    args: {
      id: "example-1",
      label: "Label"
    }
  };
  var States = {
    render: TemplateColumnWithStates,
    args: {
      array: stateArray,
      label: "Label"
    },
    parameters: {
      pseudo: {
        hover: "#Hover",
        focus: "#Focus",
        active: "#Active"
      }
    }
  };
  var WithHint = {
    args: {
      id: "example-1",
      label: "Label",
      helper: { text: "Hint text" }
    }
  };
  var HintTextAndCharacterCount = {
    args: {
      id: "example-1",
      label: "Label",
      characterLimit: 400,
      helper: [{ text: "Hint text" }]
    }
  };
  var OnlyCharacterCount = {
    args: {
      id: "example-1",
      label: "Label",
      characterLimit: 400
    }
  };
  var TextValue = {
    render: TemplateTextValue,
    args: {
      id: "example-1",
      label: "Label",
      value: "Text value"
    }
  };
  var Placeholder = {
    args: {
      id: "example-1",
      label: "Label",
      placeholder: "Text value"
    }
  };
  var DefaultValue = {
    args: {
      id: "example-1",
      label: "Label",
      defaultValue: "Text value"
    }
  };
  var TemplateHeights = (args) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Fixed Height (7.5rem default)" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_TextArea_default,
          {
            ...args,
            id: "fixed-height-default",
            label: "Label",
            placeholder: "This textarea has a fixed height of 7.5rem"
          }
        ) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Custom Fixed Height" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_TextArea_default,
          {
            ...args,
            id: "custom-height",
            label: "Label",
            height: "4rem",
            placeholder: "This textarea has a fixed height of 4rem"
          }
        ) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Auto Grow (minRows: 3, maxRows: 12)" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_TextArea_default,
          {
            ...args,
            id: "auto-grow",
            label: "Label",
            autoGrow: true,
            minRows: 3,
            maxRows: 12,
            placeholder: "Type multiple lines to see it grow automatically"
          }
        ) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Auto Grow with Custom Rows" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_TextArea_default,
          {
            ...args,
            id: "auto-grow-custom",
            label: "Label",
            autoGrow: true,
            minRows: 5,
            maxRows: 8,
            placeholder: "This will grow from 5 to 8 rows maximum"
          }
        ) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Auto Grow with Max Height" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_TextArea_default,
          {
            ...args,
            id: "auto-grow-max-height",
            label: "Label",
            autoGrow: true,
            maxHeight: "200px",
            minRows: 3,
            maxRows: 12,
            placeholder: "This will grow but max height is limited to 200px"
          }
        ) })
      ] })
    ] });
  };
  var HeightExamples = {
    render: TemplateHeights,
    parameters: {
      docs: {
        description: {
          story: "Examples showing different height configurations for TextArea"
        }
      }
    }
  };

  // .design-sync/.cache/previews/TextArea.tsx
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
    compose(textarea_stories_exports, "Default")
  );
  var Sizes2 = (
    /* Sizes */
    compose(textarea_stories_exports, "Sizes")
  );
  var States2 = (
    /* States */
    compose(textarea_stories_exports, "States")
  );
  var WithHint2 = (
    /* With Hint */
    compose(textarea_stories_exports, "WithHint")
  );
  var HintTextAndCharacterCount2 = (
    /* Hint Text And Character Count */
    compose(textarea_stories_exports, "HintTextAndCharacterCount")
  );
  var OnlyCharacterCount2 = (
    /* Only Character Count */
    compose(textarea_stories_exports, "OnlyCharacterCount")
  );
  var TextValue2 = (
    /* Text Value */
    compose(textarea_stories_exports, "TextValue")
  );
  var Placeholder2 = (
    /* Placeholder */
    compose(textarea_stories_exports, "Placeholder")
  );
  var DefaultValue2 = (
    /* Default Value */
    compose(textarea_stories_exports, "DefaultValue")
  );
  var HeightExamples2 = (
    /* Height Examples */
    compose(textarea_stories_exports, "HeightExamples")
  );
  return __toCommonJS(TextArea_exports);
})();
