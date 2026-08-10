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
      function jsx3(t, p, k) {
        var c = p && p.children;
        return c === void 0 ? R.createElement(t, np(p, k)) : R.createElement(t, np(p, k), c);
      }
      function jsxs2(t, p, k) {
        return R.createElement.apply(R, [t, np(p, k)].concat(p.children));
      }
      module.exports = R;
      module.exports.jsx = jsx3;
      module.exports.jsxs = jsxs2;
      module.exports.jsxDEV = function(t, p, k, s) {
        return (s ? jsxs2 : jsx3)(t, p, k);
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

  // .design-sync/.cache/previews/FileUpload.tsx
  var FileUpload_exports = {};
  __export(FileUpload_exports, {
    ControlledClearing: () => ControlledClearing2,
    Default: () => Default2,
    Disabled: () => Disabled2,
    ExtensionAndSizeLimit: () => ExtensionAndSizeLimit2,
    LoadingState: () => LoadingState2,
    Multiple: () => Multiple2,
    MultipleHandled: () => MultipleHandled2,
    MultipleWithIndividualValidation: () => MultipleWithIndividualValidation2,
    PdfAndTxtOnly: () => PdfAndTxtOnly2,
    ReadOnlyFiles: () => ReadOnlyFiles2,
    SizeLimited: () => SizeLimited2,
    Sizes: () => Sizes2,
    ValidationFailed: () => ValidationFailed2,
    ValidationSuccess: () => ValidationSuccess2,
    WithHint: () => WithHint2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React3 = __toESM(require_react_shim(), 1);

  // src/tedi/components/form/file-upload/file-upload.stories.tsx
  var file_upload_stories_exports = {};
  __export(file_upload_stories_exports, {
    ControlledClearing: () => ControlledClearing,
    Default: () => Default,
    Disabled: () => Disabled,
    ExtensionAndSizeLimit: () => ExtensionAndSizeLimit,
    LoadingState: () => LoadingState,
    Multiple: () => Multiple,
    MultipleHandled: () => MultipleHandled,
    MultipleWithIndividualValidation: () => MultipleWithIndividualValidation,
    PdfAndTxtOnly: () => PdfAndTxtOnly,
    ReadOnlyFiles: () => ReadOnlyFiles,
    SizeLimited: () => SizeLimited,
    Sizes: () => Sizes,
    ValidationFailed: () => ValidationFailed,
    ValidationSuccess: () => ValidationSuccess,
    WithHint: () => WithHint,
    default: () => file_upload_stories_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  var import_react2 = __toESM(require_react_shim());

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

  // src/tedi/components/form/file-upload/examples/multiple-handled.tsx
  init_define_import_meta_env();
  init_define_process_env();
  var import_react = __toESM(require_react_shim());

  // ds-shim:ds:FileUpload
  var ds_FileUpload_exports = {};
  __export(ds_FileUpload_exports, {
    default: () => ds_FileUpload_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_FileUpload_exports, __toESM(require_ds_raw()));
  var g5 = window.Tedi;
  var ds_FileUpload_default = g5["FileUpload"] !== void 0 ? g5["FileUpload"] : g5;

  // src/tedi/components/form/file-upload/examples/multiple-handled.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var MultipleHandledTemplate = (args) => {
    const [files, setFiles] = import_react.default.useState([{ name: "avaldus.pdf" }]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_FileUpload_default, { files, onChange: setFiles, ...args });
  };

  // src/tedi/components/form/file-upload/file-upload.stories.tsx
  var import_jsx_runtime2 = __toESM(require_react_shim());
  var meta = {
    component: ds_FileUpload_default,
    title: "TEDI-Ready/Components/Form/FileUpload",
    parameters: {
      design: {
        type: "figma",
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4536-78765&m=dev"
      }
    }
  };
  var file_upload_stories_default = meta;
  var sizesArray = ["default", "small"];
  var TemplateSizes = (args) => {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "example-list", children: sizesArray.map((size, key) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Row, { className: `${key === sizesArray.length - 1 ? "" : "border-bottom"} padding-14-16`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: size.charAt(0).toUpperCase() + size.slice(1) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_FileUpload_default, { ...args, size, id: `file-upload-${key}` }) })
    ] }, key)) });
  };
  var Default = {
    args: {
      id: "file-upload",
      name: "file",
      label: "Laadi fail üles"
    }
  };
  var Sizes = {
    render: TemplateSizes,
    args: {
      label: "Silt"
    }
  };
  var WithHint = {
    args: {
      id: "file-upload",
      name: "file",
      label: "Laadi fail üles",
      helper: {
        text: "JPG, PNG, PDF suurusega kuni 0.001 MB."
      }
    }
  };
  var Disabled = {
    args: {
      id: "file-upload-disabled",
      name: "file-loading",
      label: "Laadi fail üles",
      defaultFiles: [{ name: "report.pdf" }],
      disabled: true
    }
  };
  var ValidationFailed = {
    args: {
      id: "file-upload-validation-failed",
      name: "file-validation-failed",
      label: "Laadi fail üles",
      maxSize: 1e-3,
      accept: ".pdf,.txt",
      multiple: true,
      validateIndividually: true,
      defaultFiles: [{ name: "taotlus_scan_lk_1.pdf", isValid: false }]
    },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      ds_FileUpload_default,
      {
        ...args,
        helper: {
          type: "error",
          text: "Tagasiside tekst"
        }
      }
    )
  };
  var ValidationSuccess = {
    args: {
      id: "file-upload-validation-failed",
      name: "file-validation-failed",
      label: "Laadi fail üles",
      maxSize: 1e-3,
      accept: ".pdf,.txt",
      multiple: true,
      validateIndividually: true,
      defaultFiles: [{ name: "taotlus_scan_lk_1.pdf", isValid: false }]
    },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      ds_FileUpload_default,
      {
        ...args,
        helper: {
          type: "valid",
          text: "Tagasiside tekst"
        }
      }
    )
  };
  var MultipleWithIndividualValidation = {
    args: {
      id: "file-upload-multiple-individual-validation",
      name: "file-multiple-individual-validation",
      label: "Laadi failid üles",
      multiple: true,
      maxSize: 0.01,
      accept: ".pdf,.txt",
      validateIndividually: true,
      hasClearButton: true,
      defaultFiles: [
        { name: "taotlus_scan_lk_1.pdf" },
        { name: "taotlus_scan_lk_2.pdf" },
        { name: "taotlus_scan_lk_3.pdf" },
        { name: "taotlus_scan_lk_4.pdf" },
        { name: "taotlus_scan_lk_5.pdf", isValid: false }
      ],
      helper: {
        text: "Lubatud on ainult .pdf ja .txt failid suurusega kuni 1 KB."
      }
    },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      ds_FileUpload_default,
      {
        ...args,
        onChange: (files) => {
          console.log("Uploaded files:", files);
        },
        helper: {
          type: "error",
          text: "Sobimatu fail. Lubatud on ainult .pdf ja .txt failid suurusega kuni 1 KB."
        }
      }
    )
  };
  var LoadingState = {
    args: {
      id: "file-upload-loading",
      name: "file-loading",
      label: "Laadi fail üles",
      defaultFiles: [{ name: "report.pdf", isLoading: true }, { name: "report_1.pdf" }]
    }
  };
  var Multiple = {
    args: {
      id: "file-upload-MULTIPLE",
      name: "file-multiple",
      label: "Laadi fail üles",
      multiple: true,
      defaultFiles: [{ name: "report.pdf" }, { name: "report_1.pdf" }, { name: "report_2.pdf" }],
      helper: {
        text: "JPG, PNG, PDF suurusega kuni 0.001 MB."
      }
    }
  };
  var MultipleHandled = {
    render: MultipleHandledTemplate,
    args: {
      id: "file-upload-handled",
      name: "file-loading-handled",
      label: "Laadi fail üles",
      multiple: true,
      onDelete: (file) => {
        console.log(`Deleted - ${file.name}`);
      }
    }
  };
  var ReadOnlyFiles = {
    args: {
      id: "file-upload-read-only",
      name: "file-loading",
      label: "Laadi fail üles",
      defaultFiles: [{ name: "report.pdf" }, { name: "report_1.pdf" }, { name: "report_2.pdf" }],
      onChange: (files) => {
        console.log(files);
      },
      readOnly: true
    }
  };
  var PdfAndTxtOnly = {
    args: {
      id: "file-upload-accepts",
      name: "file-accepts",
      label: "Laadi fail üles",
      accept: ".pdf,.txt"
    }
  };
  var SizeLimited = {
    args: {
      id: "file-upload-size-limited",
      name: "file-size-limited",
      label: "Laadi fail üles",
      maxSize: 1e-3,
      multiple: true
    }
  };
  var ExtensionAndSizeLimit = {
    args: {
      id: "file-upload-size-extension-limited",
      name: "file-size-extension-limited",
      label: "Laadi fail üles",
      maxSize: 1e-3,
      accept: ".pdf,.txt",
      multiple: true
    }
  };
  var ControlledClearing = {
    render: (args) => {
      const [files, setFiles] = import_react2.default.useState([
        { name: "report.pdf" },
        { name: "report_1.pdf" },
        { name: "report_2.pdf" }
      ]);
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_FileUpload_default, { ...args, files, onChange: (f) => setFiles(f), multiple: true }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { marginTop: "12px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Button_default, { onClick: () => setFiles([]), children: "Salvesta ja tühjenda failid" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("pre", { children: [
            "Failid: ",
            JSON.stringify(files, null, 2)
          ] })
        ] })
      ] });
    },
    args: {
      id: "file-upload-clear-controlled",
      name: "file-upload-clear-controlled",
      label: "Laadi fail üles",
      hasClearButton: true
    }
  };

  // .design-sync/.cache/previews/FileUpload.tsx
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
      if (C) render = () => React3.createElement(C, args);
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
    return () => React3.createElement("div", { style: { background: bg } }, composed());
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
    compose(file_upload_stories_exports, "Default")
  );
  var Sizes2 = (
    /* Sizes */
    compose(file_upload_stories_exports, "Sizes")
  );
  var WithHint2 = (
    /* With Hint */
    compose(file_upload_stories_exports, "WithHint")
  );
  var Disabled2 = (
    /* Disabled */
    compose(file_upload_stories_exports, "Disabled")
  );
  var ValidationFailed2 = (
    /* Validation Failed */
    compose(file_upload_stories_exports, "ValidationFailed")
  );
  var ValidationSuccess2 = (
    /* Validation Success */
    compose(file_upload_stories_exports, "ValidationSuccess")
  );
  var MultipleWithIndividualValidation2 = (
    /* Multiple With Individual Validation */
    compose(file_upload_stories_exports, "MultipleWithIndividualValidation")
  );
  var LoadingState2 = (
    /* Loading State */
    compose(file_upload_stories_exports, "LoadingState")
  );
  var Multiple2 = (
    /* Multiple */
    compose(file_upload_stories_exports, "Multiple")
  );
  var MultipleHandled2 = (
    /* Multiple Handled */
    compose(file_upload_stories_exports, "MultipleHandled")
  );
  var ReadOnlyFiles2 = (
    /* Read Only Files */
    compose(file_upload_stories_exports, "ReadOnlyFiles")
  );
  var PdfAndTxtOnly2 = (
    /* Pdf And Txt Only */
    compose(file_upload_stories_exports, "PdfAndTxtOnly")
  );
  var SizeLimited2 = (
    /* Size Limited */
    compose(file_upload_stories_exports, "SizeLimited")
  );
  var ExtensionAndSizeLimit2 = (
    /* Extension And Size Limit */
    compose(file_upload_stories_exports, "ExtensionAndSizeLimit")
  );
  var ControlledClearing2 = (
    /* Controlled Clearing */
    compose(file_upload_stories_exports, "ControlledClearing")
  );
  return __toCommonJS(FileUpload_exports);
})();
