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

  // .design-sync/.cache/previews/EmptyState.tsx
  var EmptyState_exports = {};
  __export(EmptyState_exports, {
    AttachedToComponent: () => AttachedToComponent2,
    CustomIcon: () => CustomIcon2,
    Default: () => Default2,
    DifferentIconColor: () => DifferentIconColor2,
    InsideComponent: () => InsideComponent2,
    Minimal: () => Minimal2,
    Separate: () => Separate2,
    SmallPadding: () => SmallPadding2,
    WithHeading: () => WithHeading2,
    WithLink: () => WithLink2,
    WithPrimaryAction: () => WithPrimaryAction2,
    WithSecondaryAction: () => WithSecondaryAction2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/content/empty-state/empty-state.stories.tsx
  var empty_state_stories_exports = {};
  __export(empty_state_stories_exports, {
    AttachedToComponent: () => AttachedToComponent,
    CustomIcon: () => CustomIcon,
    Default: () => Default,
    DifferentIconColor: () => DifferentIconColor,
    InsideComponent: () => InsideComponent,
    Minimal: () => Minimal,
    Separate: () => Separate,
    SmallPadding: () => SmallPadding,
    WithHeading: () => WithHeading,
    WithLink: () => WithLink,
    WithPrimaryAction: () => WithPrimaryAction,
    WithSecondaryAction: () => WithSecondaryAction,
    default: () => empty_state_stories_default
  });
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
  var g = window.Tedi;
  var ds_Button_default = g["Button"] !== void 0 ? g["Button"] : g;

  // ds-shim:ds:Card
  var ds_Card_exports = {};
  __export(ds_Card_exports, {
    default: () => ds_Card_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Card_exports, __toESM(require_ds_raw()));
  var g2 = window.Tedi;
  var ds_Card_default = g2["Card"] !== void 0 ? g2["Card"] : g2;

  // ds-shim:ds:Link
  var ds_Link_exports = {};
  __export(ds_Link_exports, {
    default: () => ds_Link_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Link_exports, __toESM(require_ds_raw()));
  var g3 = window.Tedi;
  var ds_Link_default = g3["Link"] !== void 0 ? g3["Link"] : g3;

  // ds-shim:ds:EmptyState
  var ds_EmptyState_exports = {};
  __export(ds_EmptyState_exports, {
    default: () => ds_EmptyState_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_EmptyState_exports, __toESM(require_ds_raw()));
  var g4 = window.Tedi;
  var ds_EmptyState_default = g4["EmptyState"] !== void 0 ? g4["EmptyState"] : g4;

  // src/tedi/components/content/empty-state/empty-state.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    component: ds_EmptyState_exports.EmptyState,
    title: "TEDI-Ready/Content/EmptyState",
    argTypes: {
      heading: { control: false },
      actions: { control: false }
    },
    parameters: {
      design: {
        type: "figma",
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.65.81?node-id=2413-40492&m=dev"
      }
    }
  };
  var empty_state_stories_default = meta;
  var Default = {
    args: {
      children: "Andmed puuduvad"
    }
  };
  var WithPrimaryAction = {
    args: {
      children: "Andmed puuduvad",
      actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { type: "button", iconLeft: "add", children: "Loo uus" })
    }
  };
  var WithSecondaryAction = {
    args: {
      children: "Andmed puuduvad",
      actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { type: "button", visualType: "secondary", iconLeft: "add", children: "Loo uus" })
    }
  };
  var WithLink = {
    args: {
      children: "Andmed puuduvad",
      actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", iconRight: "arrow_forward", children: "Loe rohkem" })
    }
  };
  var WithHeading = {
    args: {
      icon: "event_busy",
      heading: "Broneeri aeg",
      children: "Andmed puuduvad",
      actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { type: "button", children: "Vali aeg" })
    }
  };
  var Minimal = {
    args: {
      icon: null,
      children: "Andmed puuduvad"
    }
  };
  var SmallPadding = {
    args: {
      children: "Andmed puuduvad",
      size: "small",
      actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { type: "button", iconLeft: "add", children: "Loo uus" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { type: "button", visualType: "secondary", iconRight: "arrow_forward", children: "Loe rohkem" })
      ] })
    }
  };
  var Separate = {
    args: {
      children: "Andmed puuduvad",
      type: "separate"
    }
  };
  var AttachedToComponent = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Card_exports.Card, { borderRadius: { bottomLeft: false, bottomRight: false }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Card_exports.CardContent, { children: "Previous content" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_EmptyState_exports.EmptyState, { type: "attached", children: "Andmed puuduvad" })
    ] })
  };
  var InsideComponent = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Card_exports.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Card_exports.CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_EmptyState_exports.EmptyState, { type: "inside", children: "Andmed puuduvad" }) }) })
  };
  var CustomIcon = {
    args: {
      children: "Ostukorvis pole tooteid",
      icon: { name: "shopping_cart_off" }
    }
  };
  var DifferentIconColor = {
    args: {
      children: "Andmed puuduvad",
      icon: { name: "spa", color: "tertiary" }
    }
  };

  // .design-sync/.cache/previews/EmptyState.tsx
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
    compose(empty_state_stories_exports, "Default")
  );
  var WithPrimaryAction2 = (
    /* With Primary Action */
    compose(empty_state_stories_exports, "WithPrimaryAction")
  );
  var WithSecondaryAction2 = (
    /* With Secondary Action */
    compose(empty_state_stories_exports, "WithSecondaryAction")
  );
  var WithLink2 = (
    /* With Link */
    compose(empty_state_stories_exports, "WithLink")
  );
  var WithHeading2 = (
    /* With Heading */
    compose(empty_state_stories_exports, "WithHeading")
  );
  var Minimal2 = (
    /* Minimal */
    compose(empty_state_stories_exports, "Minimal")
  );
  var SmallPadding2 = (
    /* Small Padding */
    compose(empty_state_stories_exports, "SmallPadding")
  );
  var Separate2 = (
    /* Separate */
    compose(empty_state_stories_exports, "Separate")
  );
  var AttachedToComponent2 = (
    /* Attached To Component */
    compose(empty_state_stories_exports, "AttachedToComponent")
  );
  var InsideComponent2 = (
    /* Inside Component */
    compose(empty_state_stories_exports, "InsideComponent")
  );
  var CustomIcon2 = (
    /* Custom Icon */
    compose(empty_state_stories_exports, "CustomIcon")
  );
  var DifferentIconColor2 = (
    /* Different Icon Color */
    compose(empty_state_stories_exports, "DifferentIconColor")
  );
  return __toCommonJS(EmptyState_exports);
})();
