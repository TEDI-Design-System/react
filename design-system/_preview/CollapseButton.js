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

  // sb-stub:storybook/preview-api
  var require_preview_api = __commonJS({
    "sb-stub:storybook/preview-api"(exports, module) {
      init_define_import_meta_env();
      init_define_process_env();
      var noopChannel = { on() {
      }, off() {
      }, once() {
      }, emit() {
      }, removeListener() {
      } };
      var addons = { register() {
      }, add() {
      }, getChannel() {
        return noopChannel;
      }, setConfig() {
      }, getConfig() {
        return {};
      } };
      var R = function() {
        return window.React || {};
      };
      var GD = { theme: "default" };
      module.exports = { addons, types: {}, useGlobals() {
        const s = R().useState(GD);
        return [s[0], function(n) {
          s[1](Object.assign({}, s[0], n));
        }];
      }, useArgs() {
        return [{}, function() {
        }, function() {
        }];
      }, useParameter() {
      }, useStorybookApi() {
        return {};
      }, useState() {
        return R().useState.apply(null, arguments);
      }, useCallback() {
        return R().useCallback.apply(null, arguments);
      }, useRef() {
        return R().useRef.apply(null, arguments);
      }, useMemo() {
        return R().useMemo.apply(null, arguments);
      }, useEffect() {
        return R().useEffect.apply(null, arguments);
      }, useReducer() {
        return R().useReducer.apply(null, arguments);
      }, useChannel() {
        return function() {
        };
      } };
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

  // .design-sync/.cache/previews/CollapseButton.tsx
  var CollapseButton_exports = {};
  __export(CollapseButton_exports, {
    Default: () => Default2,
    IconOnly: () => IconOnly2,
    IconOnlyInverted: () => IconOnlyInverted2,
    SecondaryButton: () => SecondaryButton2,
    States: () => States2,
    WithTextInverted: () => WithTextInverted2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/buttons/collapse-button/collapse-button.stories.tsx
  var collapse_button_stories_exports = {};
  __export(collapse_button_stories_exports, {
    Default: () => Default,
    IconOnly: () => IconOnly,
    IconOnlyInverted: () => IconOnlyInverted,
    SecondaryButton: () => SecondaryButton,
    States: () => States,
    WithTextInverted: () => WithTextInverted,
    default: () => collapse_button_stories_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  var import_preview_api = __toESM(require_preview_api());

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

  // ds-shim:ds:CollapseButton
  var ds_CollapseButton_exports = {};
  __export(ds_CollapseButton_exports, {
    default: () => ds_CollapseButton_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_CollapseButton_exports, __toESM(require_ds_raw()));
  var g5 = window.Tedi;
  var ds_CollapseButton_default = g5["CollapseButton"] !== void 0 ? g5["CollapseButton"] : g5;

  // src/tedi/components/buttons/collapse-button/collapse-button.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    component: ds_CollapseButton_exports.CollapseButton,
    title: "TEDI-Ready/Components/Buttons/CollapseButton",
    parameters: {
      design: {
        type: "figma",
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.49.74?node-id=15433-138256&m=dev"
      }
    },
    args: {
      openText: "Ava",
      closeText: "Sulge",
      hideText: false,
      arrowType: "default",
      size: "default",
      inverted: false,
      underline: true,
      open: false
    }
  };
  var collapse_button_stories_default = meta;
  var Default = {
    render: function Render(args) {
      const [, updateArgs] = (0, import_preview_api.useArgs)();
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_CollapseButton_exports.CollapseButton, { ...args, onOpenChange: (open) => updateArgs({ open }) });
    }
  };
  var pseudoStates = ["Default", "Hover", "Active", "Focus"];
  var PSEUDO_PARAMS = {
    pseudo: {
      hover: "#Hover",
      active: "#Active",
      focusVisible: "#Focus"
    }
  };
  var StatesTemplate = (args) => {
    const { titleColor = "primary", hideSizes = false, ...collapseProps } = args;
    const renderRow = (state, size) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { cols: 5, alignItems: "center", gap: 2, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: titleColor, children: state }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { width: 4, className: "flex align-items-center gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_CollapseButton_exports.CollapseButton, { ...collapseProps, id: state, size: size ?? "default", open: false }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_CollapseButton_exports.CollapseButton, { ...collapseProps, id: state, size: size ?? "default", open: true })
      ] })
    ] }, `${state}-${size ?? "default"}`);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_VerticalSpacing_exports.VerticalSpacing.Item, { size: 3, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", color: titleColor, children: "Default" }),
        pseudoStates.map((state) => renderRow(state))
      ] }) }),
      !hideSizes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", color: titleColor, children: "Small" }),
        pseudoStates.map((state) => renderRow(state, "small"))
      ] })
    ] });
  };
  var States = {
    render: StatesTemplate,
    parameters: PSEUDO_PARAMS
  };
  var IconOnly = {
    render: StatesTemplate,
    args: {
      hideText: true,
      "aria-label": "Näita detaile"
    },
    parameters: PSEUDO_PARAMS
  };
  var SecondaryButton = {
    render: StatesTemplate,
    args: {
      hideText: true,
      arrowType: "secondary",
      "aria-label": "Näita detaile",
      // The secondary style has no small variant in the design.
      hideSizes: true
    },
    parameters: PSEUDO_PARAMS
  };
  var WithTextInverted = {
    render: StatesTemplate,
    args: {
      inverted: true,
      titleColor: "white"
    },
    parameters: PSEUDO_PARAMS,
    globals: { backgrounds: { value: "brand" } }
  };
  var IconOnlyInverted = {
    render: StatesTemplate,
    args: {
      hideText: true,
      inverted: true,
      titleColor: "white",
      "aria-label": "Näita detaile"
    },
    parameters: PSEUDO_PARAMS,
    globals: { backgrounds: { value: "brand" } }
  };

  // .design-sync/.cache/previews/CollapseButton.tsx
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
    compose(collapse_button_stories_exports, "Default")
  );
  var States2 = (
    /* States */
    compose(collapse_button_stories_exports, "States")
  );
  var IconOnly2 = (
    /* Icon Only */
    compose(collapse_button_stories_exports, "IconOnly")
  );
  var SecondaryButton2 = (
    /* Secondary Button */
    compose(collapse_button_stories_exports, "SecondaryButton")
  );
  var WithTextInverted2 = (
    /* With Text Inverted */
    compose(collapse_button_stories_exports, "WithTextInverted")
  );
  var IconOnlyInverted2 = (
    /* Icon Only Inverted */
    compose(collapse_button_stories_exports, "IconOnlyInverted")
  );
  return __toCommonJS(CollapseButton_exports);
})();
