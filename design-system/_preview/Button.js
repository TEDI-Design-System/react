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

  // .design-sync/.cache/previews/Button.tsx
  var Button_exports = {};
  __export(Button_exports, {
    Danger: () => Danger2,
    DangerNeutral: () => DangerNeutral2,
    Default: () => Default2,
    FullWidth: () => FullWidth2,
    LongTextButtonThatWrapsIntoMultipleLines: () => LongTextButtonThatWrapsIntoMultipleLines2,
    Neutral: () => Neutral2,
    NeutralInverted: () => NeutralInverted2,
    NoStyleTemplate: () => NoStyleTemplate2,
    Primary: () => Primary2,
    PrimaryInverted: () => PrimaryInverted2,
    ResponsiveButton: () => ResponsiveButton2,
    Secondary: () => Secondary2,
    SecondaryInverted: () => SecondaryInverted2,
    Success: () => Success2,
    VisualTypeLink: () => VisualTypeLink2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/buttons/button/button.stories.tsx
  var button_stories_exports = {};
  __export(button_stories_exports, {
    Danger: () => Danger,
    DangerNeutral: () => DangerNeutral,
    Default: () => Default,
    FullWidth: () => FullWidth,
    LongTextButtonThatWrapsIntoMultipleLines: () => LongTextButtonThatWrapsIntoMultipleLines,
    Neutral: () => Neutral,
    NeutralInverted: () => NeutralInverted,
    NoStyleTemplate: () => NoStyleTemplate,
    Primary: () => Primary,
    PrimaryInverted: () => PrimaryInverted,
    ResponsiveButton: () => ResponsiveButton,
    Secondary: () => Secondary,
    SecondaryInverted: () => SecondaryInverted,
    Success: () => Success,
    VisualTypeLink: () => VisualTypeLink,
    default: () => button_stories_default
  });
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

  // ds-shim:ds:Button
  var ds_Button_exports = {};
  __export(ds_Button_exports, {
    default: () => ds_Button_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Button_exports, __toESM(require_ds_raw()));
  var g6 = window.Tedi;
  var ds_Button_default = g6["Button"] !== void 0 ? g6["Button"] : g6;

  // src/tedi/components/buttons/button/button.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    component: ds_Button_exports.Button,
    title: "TEDI-Ready/Components/Buttons/Button",
    parameters: {
      status: {
        type: [{ name: "breakpointSupport", url: "?path=/docs/helpers-usebreakpointprops--usebreakpointprops" }]
      },
      controls: {
        exclude: ["sm", "md", "lg", "xl", "xxl"]
      },
      design: {
        type: "figma",
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=136-19706&m=dev"
      }
    }
  };
  var button_stories_default = meta;
  var buttonStateArray = ["Default", "Hover", "Active", "Loading", "Disabled"];
  var Template = (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { ...args });
  var Default = {
    render: Template,
    argTypes: {
      as: {
        control: false,
        table: {
          type: { summary: "ElementType" }
        }
      }
    },
    args: {
      children: "Button"
    }
  };
  var TemplateColumn = (args) => {
    const { array, titleColor, ...buttonProps } = args;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0.5, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: 1 }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: titleColor, modifiers: "bold", children: "Default" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { className: "text-bold", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: titleColor, modifiers: "bold", children: "Small" }) })
      ] }),
      array.map((value, key) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: 1, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: titleColor, modifiers: "bold", children: value }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { className: "flex align-items-center gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { id: value, ...buttonProps, disabled: value === "Disabled", isLoading: value === "Loading", children: "Create" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Button_exports.Button,
            {
              id: value,
              ...buttonProps,
              iconRight: "arrow_right_alt",
              disabled: value === "Disabled",
              isLoading: value === "Loading",
              children: "Continue"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Button_exports.Button,
            {
              id: value,
              ...buttonProps,
              iconLeft: "edit",
              disabled: value === "Disabled",
              isLoading: value === "Loading",
              children: "Edit"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Button_exports.Button,
            {
              id: value,
              ...buttonProps,
              icon: "arrow_right_alt",
              disabled: value === "Disabled",
              isLoading: value === "Loading",
              showTooltip: true,
              children: "Icon Only"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { className: "flex align-items-center gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Button_exports.Button,
            {
              id: value,
              size: "small",
              ...buttonProps,
              disabled: value === "Disabled",
              isLoading: value === "Loading",
              children: "Create"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Button_exports.Button,
            {
              id: value,
              size: "small",
              ...buttonProps,
              iconRight: "arrow_right_alt",
              disabled: value === "Disabled",
              isLoading: value === "Loading",
              children: "Continue"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Button_exports.Button,
            {
              id: value,
              size: "small",
              ...buttonProps,
              iconLeft: "edit",
              disabled: value === "Disabled",
              isLoading: value === "Loading",
              children: "Edit"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Button_exports.Button,
            {
              id: value,
              size: "small",
              ...buttonProps,
              icon: "arrow_right_alt",
              disabled: value === "Disabled",
              isLoading: value === "Loading",
              showTooltip: true,
              children: "Icon Only"
            }
          )
        ] })
      ] }, key))
    ] }) });
  };
  var Primary = {
    render: TemplateColumn,
    args: {
      array: buttonStateArray,
      visualType: "primary"
    },
    parameters: {
      pseudo: {
        hover: "#Hover",
        active: "#Active",
        focus: "#Focus"
      }
    }
  };
  var PrimaryInverted = {
    render: TemplateColumn,
    args: {
      array: buttonStateArray,
      visualType: "primary",
      color: "inverted",
      titleColor: "white"
    },
    parameters: {
      pseudo: {
        hover: "#Hover",
        active: "#Active",
        focus: "#Focus"
      }
    },
    globals: { backgrounds: { value: "brand" } }
  };
  var Secondary = {
    render: TemplateColumn,
    args: {
      array: buttonStateArray,
      visualType: "secondary"
    },
    parameters: {
      pseudo: {
        hover: "#Hover",
        active: "#Active",
        focus: "#Focus"
      }
    }
  };
  var SecondaryInverted = {
    render: TemplateColumn,
    args: {
      array: buttonStateArray,
      visualType: "secondary",
      color: "inverted",
      titleColor: "white"
    },
    parameters: {
      pseudo: {
        hover: "#Hover",
        active: "#Active",
        focus: "#Focus"
      }
    },
    globals: { backgrounds: { value: "brand" } }
  };
  var Neutral = {
    render: TemplateColumn,
    args: {
      array: buttonStateArray,
      visualType: "neutral"
    },
    parameters: {
      pseudo: {
        hover: "#Hover",
        active: "#Active",
        focus: "#Focus"
      }
    }
  };
  var NeutralInverted = {
    render: TemplateColumn,
    args: {
      array: buttonStateArray,
      visualType: "neutral",
      color: "inverted",
      titleColor: "white"
    },
    parameters: {
      pseudo: {
        hover: "#Hover",
        active: "#Active",
        focus: "#Focus"
      }
    },
    globals: { backgrounds: { value: "brand" } }
  };
  var Success = {
    render: TemplateColumn,
    args: {
      array: buttonStateArray,
      color: "success"
    },
    parameters: {
      pseudo: {
        hover: "#Hover",
        active: "#Active",
        focus: "#Focus"
      }
    }
  };
  var Danger = {
    render: TemplateColumn,
    args: {
      array: buttonStateArray,
      color: "danger"
    },
    parameters: {
      pseudo: {
        hover: "#Hover",
        active: "#Active",
        focus: "#Focus"
      }
    }
  };
  var DangerNeutral = {
    render: TemplateColumn,
    args: {
      array: buttonStateArray,
      color: "danger",
      visualType: "neutral"
    },
    parameters: {
      pseudo: {
        hover: "#Hover",
        active: "#Active",
        focus: "#Focus"
      }
    }
  };
  var NoStyleTemplate = (args) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { ...args, noStyle: true, children: "Button without styles" });
  };
  var FullWidth = {
    args: {
      fullWidth: true,
      children: "Button"
    }
  };
  var ResponsiveTemplate = (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { ...args, lg: { color: "default" }, sm: { color: "success", visualType: "primary" }, children: "Button - Success (sm)" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_Button_exports.Button,
      {
        ...args,
        lg: { color: "default", visualType: "primary" },
        md: { color: "danger", visualType: "neutral" },
        sm: { color: "danger", visualType: "primary" },
        children: "Button - Danger neutral (md)"
      }
    ) })
  ] });
  var ResponsiveButton = {
    render: ResponsiveTemplate,
    args: {
      children: "Responsive Button"
    },
    parameters: {
      viewport: {
        defaultViewport: "responsive"
      }
    }
  };
  var LongTextButtonThatWrapsIntoMultipleLines = {
    args: {
      children: "This is a very long button text that should wrap into multiple lines"
    },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: 6, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Alert_default, { type: "warning", children: "Please avoid long text. This is fallback for emergencies — use only with caution." }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: 4, width: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { children: args.children }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: 4, width: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { iconLeft: "edit", children: args.children }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: 3, width: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { children: args.children }) })
      ] })
    ] })
  };
  var VisualTypeLink = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_VerticalSpacing_exports.VerticalSpacing, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { gap: 3, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { visualType: "link", children: "Add file" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { visualType: "link", iconLeft: "add", children: "Add file" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { visualType: "link", iconRight: "add", children: "Add file" }) })
    ] }) })
  };

  // .design-sync/.cache/previews/Button.tsx
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
    compose(button_stories_exports, "Default")
  );
  var Primary2 = (
    /* Primary */
    compose(button_stories_exports, "Primary")
  );
  var PrimaryInverted2 = (
    /* Primary Inverted */
    compose(button_stories_exports, "PrimaryInverted")
  );
  var Secondary2 = (
    /* Secondary */
    compose(button_stories_exports, "Secondary")
  );
  var SecondaryInverted2 = (
    /* Secondary Inverted */
    compose(button_stories_exports, "SecondaryInverted")
  );
  var Neutral2 = (
    /* Neutral */
    compose(button_stories_exports, "Neutral")
  );
  var NeutralInverted2 = (
    /* Neutral Inverted */
    compose(button_stories_exports, "NeutralInverted")
  );
  var Success2 = (
    /* Success */
    compose(button_stories_exports, "Success")
  );
  var Danger2 = (
    /* Danger */
    compose(button_stories_exports, "Danger")
  );
  var DangerNeutral2 = (
    /* Danger Neutral */
    compose(button_stories_exports, "DangerNeutral")
  );
  var NoStyleTemplate2 = (
    /* No Style Template */
    compose(button_stories_exports, "NoStyleTemplate")
  );
  var FullWidth2 = (
    /* Full Width */
    compose(button_stories_exports, "FullWidth")
  );
  var ResponsiveButton2 = (
    /* Responsive Button */
    compose(button_stories_exports, "ResponsiveButton")
  );
  var LongTextButtonThatWrapsIntoMultipleLines2 = (
    /* Long Text Button That Wraps Into Multiple Lines */
    compose(button_stories_exports, "LongTextButtonThatWrapsIntoMultipleLines")
  );
  var VisualTypeLink2 = (
    /* Visual Type Link */
    compose(button_stories_exports, "VisualTypeLink")
  );
  return __toCommonJS(Button_exports);
})();
