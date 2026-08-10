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

  // .design-sync/.cache/previews/Radio.tsx
  var Radio_exports = {};
  __export(Radio_exports, {
    Controlled: () => Controlled2,
    Default: () => Default2,
    HiddenLabel: () => HiddenLabel2,
    RadioWithLongTitle: () => RadioWithLongTitle2,
    Sizes: () => Sizes2,
    States: () => States2,
    WithExtraContent: () => WithExtraContent2,
    WithTooltip: () => WithTooltip2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/form/radio/radio.stories.tsx
  var radio_stories_exports = {};
  __export(radio_stories_exports, {
    Controlled: () => Controlled,
    Default: () => Default,
    HiddenLabel: () => HiddenLabel,
    RadioWithLongTitle: () => RadioWithLongTitle,
    Sizes: () => Sizes,
    States: () => States,
    WithExtraContent: () => WithExtraContent,
    WithTooltip: () => WithTooltip,
    default: () => radio_stories_default
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

  // ds-shim:ds:Alert
  var ds_Alert_exports = {};
  __export(ds_Alert_exports, {
    default: () => ds_Alert_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Alert_exports, __toESM(require_ds_raw()));
  var g5 = window.Tedi;
  var ds_Alert_default = g5["Alert"] !== void 0 ? g5["Alert"] : g5;

  // ds-shim:ds:Radio
  var ds_Radio_exports = {};
  __export(ds_Radio_exports, {
    default: () => ds_Radio_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Radio_exports, __toESM(require_ds_raw()));
  var g6 = window.Tedi;
  var ds_Radio_default = g6["Radio"] !== void 0 ? g6["Radio"] : g6;

  // src/tedi/components/form/radio/radio.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    component: ds_Radio_default,
    title: "TEDI-Ready/Components/Form/ChoiceGroup/Radio"
  };
  var radio_stories_default = meta;
  var Template = (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Radio_default, { ...args, label: "Text", value: "default" });
  var sizesArray = ["default", "large"];
  var TemplateSizes = (args) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 6, md: 12, className: "example-list", children: sizesArray.map((size, key) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { className: `${key === sizesArray.length - 1 ? "" : "border-bottom"} padding-14-16`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 10, md: 6, xs: 8, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: size.charAt(0).toUpperCase() + size.slice(1) }),
        size === "large" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Alert_default, { type: "warning", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Applied automatically on mobile screen sizes. " }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Otherwise, prefer using default size." })
        ] })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 2, md: 6, xs: 4, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Radio_default,
        {
          ...args,
          size,
          id: `radio-size-${size}`,
          label: `${size.charAt(0).toUpperCase() + size.slice(1)} size`,
          hideLabel: true
        }
      ) })
    ] }, key)) }) });
  };
  var Default = {
    render: Template,
    args: {
      id: "default-radio",
      name: "default-radio",
      defaultChecked: true
    }
  };
  var Sizes = {
    render: TemplateSizes
  };
  var States = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 6, md: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: 3, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Default" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Radio_default, { id: "radio-default", label: "Text", name: "radio-default", value: "radio" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: 3, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Hover" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Radio_default, { id: "radio-hover", label: "Text", name: "radio-hover", value: "radio", hover: true }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: 3, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Selected" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Radio_default, { id: "radio-checked", label: "Text", name: "radio-checked", value: "radio", defaultChecked: true }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: 3, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Disabled" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Radio_default, { id: "radio-disabled", label: "Text", name: "radio-disabled", value: "radio", disabled: true }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: 3, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Disabled selected" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Radio_default,
          {
            id: "radio-disabled-checked",
            label: "Text",
            name: "radio-disabled-checked",
            value: "radio",
            disabled: true,
            defaultChecked: true
          }
        ) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: 3, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Error" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Radio_default,
          {
            id: "radio-invalid",
            label: "Text",
            name: "radio-invalid",
            value: "radio",
            invalid: true,
            helper: { text: "Feedback text", type: "error" }
          }
        ) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: 3, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Required" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Radio_default, { id: "radio-required", label: "Text", name: "radio-required", value: "radio", required: true }) })
      ] })
    ] }) }) });
  };
  var HiddenLabel = {
    render: Template,
    args: {
      id: "hidden-label-radio",
      name: "hidden-label-radio",
      hideLabel: true
    }
  };
  var WithExtraContent = {
    render: Template,
    args: {
      id: "extra-content-radio",
      name: "extra-content-radio",
      helper: {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque quis augue sit amet semper. Donec porttitor mauris neque, quis feugiat erat malesuada ac. Cras vel mauris a est pretium egestas."
      }
    }
  };
  var WithTooltip = {
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 6, md: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Radio_default, { ...args, id: "radio-short-title-tooltip", label: "Text", name: "radio-short-title-tooltip", value: "radio" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Radio_default,
        {
          ...args,
          id: "radio-short-title-helper-tooltip",
          label: "Text",
          name: "radio-short-title-helper-tooltip",
          value: "radio",
          helper: {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque quis augue sit amet semper. Donec porttitor mauris neque, quis feugiat erat malesuada ac. Cras vel mauris a est pretium egestas."
          }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Radio_default,
        {
          ...args,
          id: "radio-long-title-tooltip-helper",
          label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius, sem blandit sodales tincidunt, orci elit ornare ex, eu ultrices diam turpis id nisl. Sed sollicitudin auctor nunc. Aliquam a arcu in sem bibendum laoreet non eu nunc.",
          name: "radio-long-title-tooltip-helper",
          value: "radio",
          helper: {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque quis augue sit amet semper. Donec porttitor mauris neque, quis feugiat erat malesuada ac. Cras vel mauris a est pretium egestas."
          }
        }
      )
    ] }) }) }),
    args: {
      name: "tooltip-check",
      tooltip: "This is a tooltip"
    }
  };
  var Controlled = () => {
    const [checked, setChecked] = (0, import_react.useState)(false);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_Radio_default,
      {
        id: "controlled-check",
        label: "Select me",
        name: "controlled-check",
        value: "controlled",
        checked,
        onChange: (value, checked2) => setChecked(checked2)
      }
    );
  };
  var RadioWithLongTitle = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: 6, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_Radio_default,
      {
        id: "radio-long-title",
        label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius, sem blandit sodales tincidunt, orci elit ornare ex, eu ultrices diam turpis id nisl. Sed sollicitudin auctor nunc. Aliquam a arcu in sem bibendum laoreet non eu nunc.",
        name: "radio-long-title",
        value: "radio"
      }
    ) }) });
  };

  // .design-sync/.cache/previews/Radio.tsx
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
    compose(radio_stories_exports, "Default")
  );
  var Sizes2 = (
    /* Sizes */
    compose(radio_stories_exports, "Sizes")
  );
  var States2 = (
    /* States */
    compose(radio_stories_exports, "States")
  );
  var HiddenLabel2 = (
    /* Hidden Label */
    compose(radio_stories_exports, "HiddenLabel")
  );
  var WithExtraContent2 = (
    /* With Extra Content */
    compose(radio_stories_exports, "WithExtraContent")
  );
  var WithTooltip2 = (
    /* With Tooltip */
    compose(radio_stories_exports, "WithTooltip")
  );
  var Controlled2 = (
    /* Controlled */
    compose(radio_stories_exports, "Controlled")
  );
  var RadioWithLongTitle2 = (
    /* Radio With Long Title */
    compose(radio_stories_exports, "RadioWithLongTitle")
  );
  return __toCommonJS(Radio_exports);
})();
