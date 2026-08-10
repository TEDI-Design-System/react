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
      function jsxs(t, p, k) {
        return R.createElement.apply(R, [t, np(p, k)].concat(p.children));
      }
      module.exports = R;
      module.exports.jsx = jsx2;
      module.exports.jsxs = jsxs;
      module.exports.jsxDEV = function(t, p, k, s) {
        return (s ? jsxs : jsx2)(t, p, k);
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

  // .design-sync/.cache/previews/FileDropzone.tsx
  var FileDropzone_exports = {};
  __export(FileDropzone_exports, {
    Default: () => Default2,
    Disabled: () => Disabled2,
    HasTooltip: () => HasTooltip2,
    Multiple: () => Multiple2,
    MultipleWithIndividualValidation: () => MultipleWithIndividualValidation2,
    MultipleWithIndividualValidationAndAttachmentProps: () => MultipleWithIndividualValidationAndAttachmentProps2,
    ValidationFailed: () => ValidationFailed2,
    WithAttachmentProps: () => WithAttachmentProps2,
    WithHint: () => WithHint2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/form/file-dropzone/file-dropzone.stories.tsx
  var file_dropzone_stories_exports = {};
  __export(file_dropzone_stories_exports, {
    Default: () => Default,
    Disabled: () => Disabled,
    HasTooltip: () => HasTooltip,
    Multiple: () => Multiple,
    MultipleWithIndividualValidation: () => MultipleWithIndividualValidation,
    MultipleWithIndividualValidationAndAttachmentProps: () => MultipleWithIndividualValidationAndAttachmentProps,
    ValidationFailed: () => ValidationFailed,
    WithAttachmentProps: () => WithAttachmentProps,
    WithHint: () => WithHint,
    default: () => file_dropzone_stories_default
  });
  init_define_import_meta_env();
  init_define_process_env();

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
  var g = window.Tedi;
  var ds_Row_default = g["Row"] !== void 0 ? g["Row"] : g;

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
  var g2 = window.Tedi;
  var ds_Col_default = g2["Col"] !== void 0 ? g2["Col"] : g2;

  // src/tedi/components/layout/grid/index.ts
  __reExport(grid_exports, ds_Col_exports);

  // ds-shim:ds:FileDropzone
  var ds_FileDropzone_exports = {};
  __export(ds_FileDropzone_exports, {
    default: () => ds_FileDropzone_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_FileDropzone_exports, __toESM(require_ds_raw()));
  var g3 = window.Tedi;
  var ds_FileDropzone_default = g3["FileDropzone"] !== void 0 ? g3["FileDropzone"] : g3;

  // src/tedi/components/form/file-dropzone/file-dropzone.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    component: ds_FileDropzone_exports.FileDropzone,
    title: "TEDI-Ready/Components/Form/FileDropzone",
    args: {
      name: "file-dropzone"
    }
  };
  var file_dropzone_stories_default = meta;
  var formatBytes = (bytes) => {
    if (typeof bytes !== "number") return void 0;
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
    return `${(bytes / 1024 ** 3).toFixed(1)} GB`;
  };
  var Default = {};
  var Template = (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: 6, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_FileDropzone_exports.FileDropzone, { ...args }) }) });
  var WithHint = {
    render: Template,
    args: {
      name: "file",
      helper: {
        text: "JPG, PNG, PDF suurusega kuni 1 MB."
      }
    }
  };
  var Disabled = {
    render: Template,
    args: {
      id: "file-dropzone-disabled",
      name: "file-loading",
      label: "Lohista failid siia",
      disabled: true
    }
  };
  var Multiple = {
    render: Template,
    args: {
      id: "file-dropzone-multiple",
      name: "file-multiple",
      multiple: true,
      defaultFiles: [{ name: "report.pdf" }, { name: "report_1.pdf" }, { name: "report_2.pdf" }],
      helper: {
        text: "JPG, PNG, PDF suurusega kuni 1 MB."
      }
    }
  };
  var ValidationFailed = {
    args: {
      id: "file-dropzone-validation-failed",
      name: "file-validation-failed",
      maxSize: 1,
      accept: ".pdf,.txt",
      multiple: true,
      validateIndividually: true,
      defaultFiles: [{ name: "invalid_file.pdf", isValid: false }]
    },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: 6, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_FileDropzone_exports.FileDropzone,
      {
        ...args,
        helper: {
          type: "error",
          text: "Sobimatu fail. Lubatud on ainult .pdf ja .txt failid suurusega kuni 1 MB."
        }
      }
    ) }) })
  };
  var MultipleWithIndividualValidation = {
    args: {
      id: "file-dropzone-multiple-individual-validation",
      name: "file-multiple-individual-validation",
      multiple: true,
      maxSize: 0.01,
      accept: ".pdf,.txt",
      validateIndividually: true,
      defaultFiles: [
        { name: "taotlus_scan_lk_1.pdf" },
        { name: "taotlus_scan_lk_2.pdf" },
        { name: "taotlus_scan_lk_3.pdf" },
        { name: "taotlus_scan_lk_4.pdf" },
        { name: "taotlus_scan_lk_5.pdf", isValid: false }
      ],
      helper: {
        text: "Lubatud on ainult .pdf ja .txt failid suurusega kuni 1 KB.",
        type: "error"
      }
    },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: 6, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_FileDropzone_exports.FileDropzone,
      {
        ...args,
        onChange: (files) => {
          console.log("Uploaded files:", files);
        }
      }
    ) }) })
  };
  var HasTooltip = {
    render: Template,
    args: {
      id: "file-dropzone-tooltip",
      name: "file-tooltip",
      label: "Lohista failid siia",
      tooltip: "Lorem ipsum"
    }
  };
  var MultipleWithIndividualValidationAndAttachmentProps = {
    args: {
      id: "file-dropzone-multiple-individual-validation-attachment-props",
      name: "file-multiple-individual-validation-attachment-props",
      multiple: true,
      maxSize: 0.01,
      accept: ".pdf,.txt",
      validateIndividually: true,
      defaultFiles: [
        { id: "1", name: "taotlus_scan_lk_1.pdf", size: 18600, isValid: false },
        { id: "2", name: "taotlus_scan_lk_2.pdf", size: 7100 },
        { id: "3", name: "taotlus_scan_lk_3.pdf", size: 31200, isValid: false },
        { id: "4", name: "taotlus_scan_lk_4.pdf", size: 9200 },
        { id: "5", name: "taotlus_scan_lk_5.pdf", size: 24500, isValid: false }
      ],
      helper: {
        text: "Lubatud on ainult .pdf ja .txt failid suurusega kuni 1 KB.",
        type: "error"
      }
    },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: 6, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_FileDropzone_exports.FileDropzone,
      {
        ...args,
        onChange: (files) => {
          console.log("Uploaded files:", files);
        },
        attachmentProps: (file) => ({
          icon: "picture_as_pdf",
          fileSize: formatBytes(file.size),
          feedback: file.isValid === false ? { text: "Fail on liiga suur — lubatud kuni 1 KB", type: "error" } : void 0
        })
      }
    ) }) })
  };
  var WithAttachmentProps = {
    args: {
      id: "file-dropzone-attachment-props",
      name: "file-attachment-props",
      multiple: true,
      defaultFiles: [
        { id: "1", name: "arve_2026_06.pdf", size: 12e5 },
        { id: "2", name: "aastaaruanne_2025.pdf", size: 54e5 },
        { id: "3", name: "esitlus.mp4", size: 14e7, isLoading: true }
      ],
      helper: {
        text: "PDF, DOCX, XLSX — maks. 200 MB"
      }
    },
    render: (args) => {
      const progressByFile = { "3": 64 };
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { md: 6, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_FileDropzone_exports.FileDropzone,
        {
          ...args,
          attachmentProps: (file) => ({
            icon: "description",
            fileSize: formatBytes(file.size),
            progress: file.id ? progressByFile[file.id] : void 0
          })
        }
      ) }) });
    }
  };

  // .design-sync/.cache/previews/FileDropzone.tsx
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
    compose(file_dropzone_stories_exports, "Default")
  );
  var WithHint2 = (
    /* With Hint */
    compose(file_dropzone_stories_exports, "WithHint")
  );
  var Disabled2 = (
    /* Disabled */
    compose(file_dropzone_stories_exports, "Disabled")
  );
  var Multiple2 = (
    /* Multiple */
    compose(file_dropzone_stories_exports, "Multiple")
  );
  var ValidationFailed2 = (
    /* Validation Failed */
    compose(file_dropzone_stories_exports, "ValidationFailed")
  );
  var MultipleWithIndividualValidation2 = (
    /* Multiple With Individual Validation */
    compose(file_dropzone_stories_exports, "MultipleWithIndividualValidation")
  );
  var HasTooltip2 = (
    /* Has Tooltip */
    compose(file_dropzone_stories_exports, "HasTooltip")
  );
  var MultipleWithIndividualValidationAndAttachmentProps2 = (
    /* Multiple With Individual Validation And Attachment Props */
    compose(file_dropzone_stories_exports, "MultipleWithIndividualValidationAndAttachmentProps")
  );
  var WithAttachmentProps2 = (
    /* With Attachment Props */
    compose(file_dropzone_stories_exports, "WithAttachmentProps")
  );
  return __toCommonJS(FileDropzone_exports);
})();
