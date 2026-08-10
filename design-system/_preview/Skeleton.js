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

  // .design-sync/.cache/previews/Skeleton.tsx
  var Skeleton_exports = {};
  __export(Skeleton_exports, {
    Accessibility: () => Accessibility2,
    Default: () => Default2,
    SkeletonHeight: () => SkeletonHeight2,
    SkeletonWidth: () => SkeletonWidth2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React2 = __toESM(require_react_shim(), 1);

  // src/tedi/components/loaders/skeleton/skeleton.stories.tsx
  var skeleton_stories_exports = {};
  __export(skeleton_stories_exports, {
    Accessibility: () => Accessibility,
    Default: () => Default,
    SkeletonHeight: () => SkeletonHeight,
    SkeletonWidth: () => SkeletonWidth,
    default: () => skeleton_stories_default
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

  // ds-shim:ds:Button
  var ds_Button_exports = {};
  __export(ds_Button_exports, {
    default: () => ds_Button_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Button_exports, __toESM(require_ds_raw()));
  var g = window.Tedi;
  var ds_Button_default = g["Button"] !== void 0 ? g["Button"] : g;

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

  // ds-shim:ds:Skeleton
  var ds_Skeleton_exports = {};
  __export(ds_Skeleton_exports, {
    default: () => ds_Skeleton_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Skeleton_exports, __toESM(require_ds_raw()));
  var g5 = window.Tedi;
  var ds_Skeleton_default = g5["Skeleton"] !== void 0 ? g5["Skeleton"] : g5;

  // src/tedi/components/loaders/skeleton/skeleton.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    component: ds_Skeleton_exports.Skeleton,
    title: "TEDI-Ready/Components/Loader/Skeleton",
    subcomponents: {
      "Skeleton.Block": ds_Skeleton_exports.Skeleton.Block
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
            return code.replaceAll("SkeletonBlock", "Skeleton.Block");
          }
        }
      },
      design: {
        type: "figma",
        url: "https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2188-34298&m=dev"
      }
    }
  };
  var skeleton_stories_default = meta;
  var Template = (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Skeleton_exports.Skeleton, { ...args, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Skeleton_exports.Skeleton.Block, { height: "p" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Skeleton_exports.Skeleton.Block, { height: "h3" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Skeleton_exports.Skeleton.Block, { height: "h2" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Skeleton_exports.Skeleton.Block, { height: "h1" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Skeleton_exports.Skeleton.Block, { height: 100 })
  ] }) });
  var TemplateWidth = (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Skeleton_exports.Skeleton, { ...args, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Skeleton_exports.Skeleton.Block, { width: 50, height: "p" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Skeleton_exports.Skeleton.Block, { width: 75, height: "h3" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Skeleton_exports.Skeleton.Block, { width: "36px", height: "h2" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Skeleton_exports.Skeleton.Block, { width: "auto", height: "h1" })
  ] }) });
  var Default = {
    argTypes: {
      ...subcomponentArgTypes(ds_Skeleton_exports.Skeleton.Block, {
        category: "Skeleton.Block",
        prefix: "block",
        exclude: ["children"]
      })
    },
    args: {
      label: "Loading something",
      block__width: 50,
      block__height: "h2"
    },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Skeleton_exports.Skeleton, { ...getPrimaryComponentProps(args), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Skeleton_exports.Skeleton.Block, { ...getSubcomponentProps(args, "block") }) })
  };
  var SkeletonHeight = {
    render: Template,
    args: {
      label: "Loading something"
    }
  };
  var SkeletonWidth = {
    render: TemplateWidth,
    args: {
      label: "Loading something"
    }
  };
  var AccessibilityTemplate = ({ style, id, remove, delay = 3e3, ...args }) => {
    import_react.default.useEffect(() => {
      const timeout = setTimeout(() => {
        remove(id);
      }, delay);
      return () => {
        clearTimeout(timeout);
      };
    }, [delay, id, remove]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Skeleton_exports.Skeleton, { ...args, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Skeleton_exports.Skeleton.Block, { width: 100, height: "p", style }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Skeleton_exports.Skeleton.Block, { width: 75, height: 29, style }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Skeleton_exports.Skeleton.Block, { width: 40, height: 50, style }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Skeleton_exports.Skeleton.Block, { width: 80, style })
    ] }) });
  };
  var Accessibility = {
    render: (args) => {
      const [skeletons, setSkeletons] = import_react.default.useState([]);
      const removeSkeleton = (id) => setSkeletons((prevState) => prevState.filter((skeleton) => skeleton.id !== id));
      const addSkeleton = (skeleton) => {
        setSkeletons((prevState) => [...prevState, { ...skeleton, remove: removeSkeleton }]);
      };
      const renderButton = (label, options) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { onClick: () => addSkeleton(options), children: label }) });
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { gutterX: 2, children: [
          renderButton("Add a short loading block", { id: `skeleton-${skeletons.length}`, delay: 900 }),
          renderButton("Add a long loading block", {
            id: `skeleton-${skeletons.length}`,
            style: { "--loader-skeleton-color": "var(--tedi-red-600)" }
          }),
          renderButton("Render loading block with custom labels", {
            id: `skeleton-${skeletons.length}`,
            style: { "--loader-skeleton-color": "var(--tedi-green-600)" },
            label: "Custom block is loading",
            completedLabel: "Custom block has finished loading"
          })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: skeletons?.length ? skeletons.map((skeleton) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { xs: 12, md: 3, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccessibilityTemplate, { ...args, ...skeleton }) }, skeleton.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { children: "No loaders" }) })
      ] });
    }
  };

  // .design-sync/.cache/previews/Skeleton.tsx
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
      if (C) render = () => React2.createElement(C, args);
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
    return () => React2.createElement("div", { style: { background: bg } }, composed());
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
    compose(skeleton_stories_exports, "Default")
  );
  var SkeletonHeight2 = (
    /* Skeleton Height */
    compose(skeleton_stories_exports, "SkeletonHeight")
  );
  var SkeletonWidth2 = (
    /* Skeleton Width */
    compose(skeleton_stories_exports, "SkeletonWidth")
  );
  var Accessibility2 = (
    /* Accessibility */
    compose(skeleton_stories_exports, "Accessibility")
  );
  return __toCommonJS(Skeleton_exports);
})();
