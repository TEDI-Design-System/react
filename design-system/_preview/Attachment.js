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

  // .design-sync/.cache/previews/Attachment.tsx
  var Attachment_exports = {};
  __export(Attachment_exports, {
    Default: () => Default2,
    LabeledActions: () => LabeledActions2,
    ReadOnly: () => ReadOnly2,
    Vertical: () => Vertical2,
    WithDifferentActions: () => WithDifferentActions2,
    WithError: () => WithError2,
    WithFileSize: () => WithFileSize2,
    WithIcon: () => WithIcon2,
    WithProgress: () => WithProgress2,
    WithoutDeleteButton: () => WithoutDeleteButton2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/misc/attachment/attachment.stories.tsx
  var attachment_stories_exports = {};
  __export(attachment_stories_exports, {
    Default: () => Default,
    LabeledActions: () => LabeledActions,
    ReadOnly: () => ReadOnly,
    Vertical: () => Vertical,
    WithDifferentActions: () => WithDifferentActions,
    WithError: () => WithError,
    WithFileSize: () => WithFileSize,
    WithIcon: () => WithIcon,
    WithProgress: () => WithProgress,
    WithoutDeleteButton: () => WithoutDeleteButton,
    default: () => attachment_stories_default
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

  // ds-shim:ds:HideAt
  var ds_HideAt_exports = {};
  __export(ds_HideAt_exports, {
    default: () => ds_HideAt_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_HideAt_exports, __toESM(require_ds_raw()));
  var g2 = window.Tedi;
  var ds_HideAt_default = g2["HideAt"] !== void 0 ? g2["HideAt"] : g2;

  // ds-shim:ds:ShowAt
  var ds_ShowAt_exports = {};
  __export(ds_ShowAt_exports, {
    default: () => ds_ShowAt_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_ShowAt_exports, __toESM(require_ds_raw()));
  var g3 = window.Tedi;
  var ds_ShowAt_default = g3["ShowAt"] !== void 0 ? g3["ShowAt"] : g3;

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

  // ds-shim:ds:Dropdown
  var ds_Dropdown_exports = {};
  __export(ds_Dropdown_exports, {
    default: () => ds_Dropdown_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Dropdown_exports, __toESM(require_ds_raw()));
  var g5 = window.Tedi;
  var ds_Dropdown_default = g5["Dropdown"] !== void 0 ? g5["Dropdown"] : g5;

  // ds-shim:ds:Tooltip
  var ds_Tooltip_exports = {};
  __export(ds_Tooltip_exports, {
    default: () => ds_Tooltip_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Tooltip_exports, __toESM(require_ds_raw()));
  var g6 = window.Tedi;
  var ds_Tooltip_default = g6["Tooltip"] !== void 0 ? g6["Tooltip"] : g6;

  // ds-shim:ds:Attachment
  var ds_Attachment_exports = {};
  __export(ds_Attachment_exports, {
    default: () => ds_Attachment_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Attachment_exports, __toESM(require_ds_raw()));
  var g7 = window.Tedi;
  var ds_Attachment_default = g7["Attachment"] !== void 0 ? g7["Attachment"] : g7;

  // src/tedi/components/misc/attachment/attachment.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    component: ds_Attachment_exports.Attachment,
    title: "TEDI-Ready/Components/Helpers/Attachment",
    args: {
      name: "Kodukülastusakt_Triin.pdf"
    },
    argTypes: {
      icon: { control: "text" }
    },
    parameters: {
      design: {
        type: "figma",
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.59.78?node-id=30427-154342&m=dev"
      }
    }
  };
  var attachment_stories_default = meta;
  var action = (icon, label) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Tooltip_exports.Tooltip, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tooltip_exports.Tooltip.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { visualType: "neutral", icon: { name: icon, size: 18 }, children: label }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tooltip_exports.Tooltip.Content, { children: label })
  ] });
  var deleteAction = action("delete", "Kustuta");
  var downloadAction = action("download", "Laadi alla");
  var renderWithDelete = (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { maxWidth: 480 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Attachment_exports.Attachment, { ...args, actions: deleteAction }) });
  var Default = {
    render: renderWithDelete
  };
  var ReadOnly = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { maxWidth: 480 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0.5, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Attachment_exports.Attachment, { name: "Kodukülastusakt_Triin.pdf", actions: downloadAction }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Attachment_exports.Attachment, { name: "Lisa_5.pdf", actions: downloadAction }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Attachment_exports.Attachment, { name: "Graafik_2025.pdf", actions: downloadAction })
  ] }) });
  var WithProgress = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { maxWidth: 480 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0.5, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_Attachment_exports.Attachment,
      {
        name: "Kodukülastusakt_Triin.pdf",
        isLoading: true,
        progress: 34,
        progressLabel: "Üleslaadimine",
        actions: deleteAction
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Attachment_exports.Attachment, { name: "Kodukülastusakt_Triin.pdf", fileSize: "0,9 MB", isLoading: true, progress: 34, actions: deleteAction }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_Attachment_exports.Attachment,
      {
        name: "Kodukülastusakt_Triin.pdf",
        fileSize: "0,9 MB",
        isLoading: true,
        progress: 34,
        progressLabel: "Üleslaadimine",
        actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          downloadAction,
          deleteAction
        ] })
      }
    )
  ] }) });
  var WithFileSize = {
    render: renderWithDelete,
    args: {
      fileSize: "0,9 MB"
    }
  };
  var WithIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { maxWidth: 480 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0.5, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Attachment_exports.Attachment, { name: "Kodukülastusakt_Triin.pdf", fileSize: "0,9 MB", icon: "description", actions: deleteAction }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Attachment_exports.Attachment, { name: "Kodukülastusakt_Triin.pdf", fileSize: "0,9 MB", icon: "imagesmode", actions: deleteAction }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Attachment_exports.Attachment, { name: "Kodukülastusakt_Triin.pdf", fileSize: "0,9 MB", icon: "audio_file", actions: deleteAction }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Attachment_exports.Attachment, { name: "Kodukülastusakt_Triin.pdf", fileSize: "0,9 MB", icon: "picture_as_pdf", actions: deleteAction })
  ] }) });
  var WithoutDeleteButton = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { maxWidth: 480 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0.5, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Attachment_exports.Attachment, { name: "Kodukülastusakt_Triin.pdf", fileSize: "0,9 MB" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Attachment_exports.Attachment, { name: "Kodukülastusakt_Triin.pdf", fileSize: "0,9 MB" })
  ] }) });
  var WithDifferentActions = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { maxWidth: 480 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0.5, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_Attachment_exports.Attachment,
      {
        name: "Kodukülastusakt_Triin.pdf",
        actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          action("visibility", "Vaata"),
          downloadAction,
          deleteAction
        ] })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_Attachment_exports.Attachment,
      {
        name: "Kodukülastusakt_Triin.pdf",
        actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          downloadAction,
          deleteAction
        ] })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Attachment_exports.Attachment, { name: "Kodukülastusakt_Triin.pdf", actions: downloadAction }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Attachment_exports.Attachment, { name: "Kodukülastusakt_Triin.pdf", fileSize: "0,9 MB", actions: deleteAction }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_Attachment_exports.Attachment,
      {
        name: "Kodukülastusakt_Triin.pdf",
        fileSize: "0,9 MB",
        isLoading: true,
        progress: 34,
        actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          downloadAction,
          deleteAction
        ] })
      }
    )
  ] }) });
  var Vertical = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { maxWidth: 350 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0.75, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_Attachment_exports.Attachment,
      {
        direction: "vertical",
        name: "Kodukülastusakt_Triin_natuke_pikema_pealkirjaga.pdf",
        fileSize: "0,9 MB",
        isLoading: true,
        progress: 34,
        actions: deleteAction
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_Attachment_exports.Attachment,
      {
        direction: "vertical",
        name: "Kodukülastusakt_Triin_natuke_pikema_pealkirjaga.pdf",
        fileSize: "0,9 MB",
        actions: deleteAction
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Attachment_exports.Attachment, { direction: "vertical", name: "Kodukülastusakt.pdf", fileSize: "0,9 MB", actions: downloadAction }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_Attachment_exports.Attachment,
      {
        direction: "vertical",
        name: "Kodukülastusakt.pdf",
        fileSize: "0,9 MB",
        actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          downloadAction,
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { visualType: "neutral", icon: { name: "more_vert", size: 18 }, children: "Rohkem valikuid" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown.Content, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 0, children: "Nimeta ümber" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.Dropdown.Item, { index: 1, children: "Kustuta" })
            ] })
          ] })
        ] })
      }
    )
  ] }) });
  var WithError = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { maxWidth: 480 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0.75, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Attachment_exports.Attachment, { name: "Kodukülastusakt_Triin.pdf", actions: deleteAction }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_Attachment_exports.Attachment,
      {
        name: "Kodukülastusakt_Triin.pdf",
        isValid: false,
        feedback: { text: "Tagasiside tekst", type: "error" },
        actions: deleteAction
      }
    )
  ] }) });
  var LabeledActions = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { maxWidth: 480 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ds_Attachment_exports.Attachment,
    {
      name: "Kodukülastusakt_Triin.pdf",
      actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ShowAt_exports.ShowAt, { sm: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { display: "inline-flex", gap: "0.5rem", paddingInline: "0.5rem" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { visualType: "neutral", iconLeft: { name: "download", size: 18 }, children: "Laadi alla" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_exports.Button, { visualType: "neutral", iconLeft: { name: "delete", size: 18 }, children: "Kustuta" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_HideAt_exports.HideAt, { sm: true, children: [
          downloadAction,
          deleteAction
        ] })
      ] })
    }
  ) });

  // .design-sync/.cache/previews/Attachment.tsx
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
    compose(attachment_stories_exports, "Default")
  );
  var ReadOnly2 = (
    /* Read Only */
    compose(attachment_stories_exports, "ReadOnly")
  );
  var WithProgress2 = (
    /* With Progress */
    compose(attachment_stories_exports, "WithProgress")
  );
  var WithFileSize2 = (
    /* With File Size */
    compose(attachment_stories_exports, "WithFileSize")
  );
  var WithIcon2 = (
    /* With Icon */
    compose(attachment_stories_exports, "WithIcon")
  );
  var WithoutDeleteButton2 = (
    /* Without Delete Button */
    compose(attachment_stories_exports, "WithoutDeleteButton")
  );
  var WithDifferentActions2 = (
    /* With Different Actions */
    compose(attachment_stories_exports, "WithDifferentActions")
  );
  var Vertical2 = (
    /* Vertical */
    compose(attachment_stories_exports, "Vertical")
  );
  var WithError2 = (
    /* With Error */
    compose(attachment_stories_exports, "WithError")
  );
  var LabeledActions2 = (
    /* Labeled Actions */
    compose(attachment_stories_exports, "LabeledActions")
  );
  return __toCommonJS(Attachment_exports);
})();
