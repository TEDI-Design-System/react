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

  // .design-sync/.cache/previews/Pagination.tsx
  var Pagination_exports = {};
  __export(Pagination_exports, {
    AllPropertiesShown: () => AllPropertiesShown3,
    ArrowsPrimaryVariant: () => ArrowsPrimaryVariant3,
    ArrowsWithLabels: () => ArrowsWithLabels2,
    Borders: () => Borders2,
    ControlledPage: () => ControlledPage3,
    CustomArrowIcons: () => CustomArrowIcons2,
    CustomLabels: () => CustomLabels2,
    Default: () => Default2,
    DisabledBoundaryArrows: () => DisabledBoundaryArrows3,
    FewPages: () => FewPages2,
    First: () => First2,
    HugePageCount: () => HugePageCount2,
    Last: () => Last2,
    ManyPagesEllipsis: () => ManyPagesEllipsis2,
    MobilePicker: () => MobilePicker2,
    ResponsiveVisibility: () => ResponsiveVisibility2,
    ShowAllPageSize: () => ShowAllPageSize3,
    TopBottomSplit: () => TopBottomSplit3,
    Transparent: () => Transparent2,
    WiderSiblings: () => WiderSiblings2,
    WithoutDropdown: () => WithoutDropdown2,
    WithoutResultsNumber: () => WithoutResultsNumber3
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/navigation/pagination/pagination.stories.tsx
  var pagination_stories_exports = {};
  __export(pagination_stories_exports, {
    AllPropertiesShown: () => AllPropertiesShown,
    ArrowsPrimaryVariant: () => ArrowsPrimaryVariant,
    ArrowsWithLabels: () => ArrowsWithLabels,
    Borders: () => Borders,
    ControlledPage: () => ControlledPage,
    CustomArrowIcons: () => CustomArrowIcons,
    CustomLabels: () => CustomLabels,
    Default: () => Default,
    DisabledBoundaryArrows: () => DisabledBoundaryArrows,
    FewPages: () => FewPages,
    First: () => First,
    HugePageCount: () => HugePageCount,
    Last: () => Last,
    ManyPagesEllipsis: () => ManyPagesEllipsis,
    MobilePicker: () => MobilePicker,
    ResponsiveVisibility: () => ResponsiveVisibility,
    ShowAllPageSize: () => ShowAllPageSize,
    TopBottomSplit: () => TopBottomSplit,
    Transparent: () => Transparent,
    WiderSiblings: () => WiderSiblings,
    WithoutDropdown: () => WithoutDropdown,
    WithoutResultsNumber: () => WithoutResultsNumber,
    default: () => pagination_stories_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  var import_react = __toESM(require_react_shim());

  // ds-shim:ds:Pagination
  var ds_Pagination_exports = {};
  __export(ds_Pagination_exports, {
    default: () => ds_Pagination_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Pagination_exports, __toESM(require_ds_raw()));
  var g = window.Tedi;
  var ds_Pagination_default = g["Pagination"] !== void 0 ? g["Pagination"] : g;

  // src/tedi/components/navigation/pagination/pagination.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    component: ds_Pagination_exports.Pagination,
    title: "TEDI-Ready/Components/Navigation/Pagination",
    parameters: {
      status: {
        type: [{ name: "breakpointSupport", url: "?path=/docs/helpers-usebreakpointprops--usebreakpointprops" }]
      },
      controls: {
        exclude: ["sm", "md", "lg", "xl", "xxl"]
      },
      design: {
        type: "figma",
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.70?node-id=8478-72385&m=dev"
      }
    }
  };
  var pagination_stories_default = meta;
  var Default = {
    args: {
      pageCount: 10,
      defaultPage: 3
    }
  };
  var First = {
    args: {
      pageCount: 10,
      defaultPage: 1
    }
  };
  var Last = {
    args: {
      pageCount: 10,
      defaultPage: 10
    }
  };
  var AllPropertiesShown = {
    render: function AllPropertiesShown2() {
      const [page, setPage] = (0, import_react.useState)(3);
      const [pageSize, setPageSize] = (0, import_react.useState)(10);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Pagination_exports.Pagination,
        {
          pageCount: Math.ceil(97 / pageSize),
          page,
          onPageChange: setPage,
          totalItems: 97,
          pageSize,
          pageSizeOptions: [10, 25, 50, 100],
          onPageSizeChange: (next) => {
            setPageSize(next);
            setPage(1);
          }
        }
      );
    }
  };
  var WithoutResultsNumber = {
    render: function WithoutResultsNumber2() {
      const [page, setPage] = (0, import_react.useState)(3);
      const [pageSize, setPageSize] = (0, import_react.useState)(10);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Pagination_exports.Pagination,
        {
          pageCount: Math.ceil(97 / pageSize),
          page,
          onPageChange: setPage,
          pageSize,
          pageSizeOptions: [10, 25, 50, 100],
          onPageSizeChange: (next) => {
            setPageSize(next);
            setPage(1);
          }
        }
      );
    }
  };
  var WithoutDropdown = {
    args: {
      pageCount: 10,
      defaultPage: 3,
      totalItems: 97
    }
  };
  var ControlledPage = {
    render: function ControlledPage2() {
      const [page, setPage] = (0, import_react.useState)(3);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Pagination_exports.Pagination, { pageCount: 10, page, onPageChange: setPage });
    }
  };
  var FewPages = {
    args: {
      pageCount: 4,
      defaultPage: 2
    }
  };
  var ManyPagesEllipsis = {
    args: {
      pageCount: 50,
      defaultPage: 12
    }
  };
  var HugePageCount = {
    args: {
      pageCount: 5e3,
      defaultPage: 2500
    }
  };
  var WiderSiblings = {
    args: {
      pageCount: 40,
      defaultPage: 20,
      siblingCount: 2,
      boundaryCount: 2
    }
  };
  var Transparent = {
    args: {
      pageCount: 10,
      defaultPage: 3,
      totalItems: 97,
      pageSize: 10,
      pageSizeOptions: [10, 25, 50, 100],
      background: "transparent"
    },
    decorators: [
      (StoryEl) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { background: "var(--general-surface-secondary)", padding: "1rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryEl, {}) })
    ]
  };
  var TopBottomSplit = {
    render: function TopBottomSplit2() {
      const [page, setPage] = (0, import_react.useState)(3);
      const [pageSize, setPageSize] = (0, import_react.useState)(10);
      const sharedProps = {
        pageCount: Math.ceil(97 / pageSize),
        page,
        onPageChange: setPage,
        totalItems: 97,
        pageSize,
        pageSizeOptions: [10, 25, 50, 100],
        onPageSizeChange: (next) => {
          setPageSize(next);
          setPage(1);
        }
      };
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Pagination_exports.Pagination, { ...sharedProps, hidePager: true, borders: "bottom" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { padding: "1.5rem 0", color: "var(--general-text-tertiary)", textAlign: "center" }, children: "— table content goes here —" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Pagination_exports.Pagination, { ...sharedProps, hideResults: true, hidePageSize: true, borders: "top" })
      ] });
    }
  };
  var DisabledBoundaryArrows = {
    render: function DisabledBoundaryArrows2() {
      const [page, setPage] = (0, import_react.useState)(1);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Pagination_exports.Pagination, { pageCount: 5, page, onPageChange: setPage, showPrevNextButtons: true });
    }
  };
  var ArrowsWithLabels = {
    args: {
      pageCount: 8,
      defaultPage: 3,
      showEdgeNavLabels: true
    }
  };
  var CustomArrowIcons = {
    args: {
      pageCount: 10,
      defaultPage: 4,
      previousIcon: "chevron_left",
      nextIcon: "chevron_right"
    }
  };
  var ArrowsPrimaryVariant = {
    parameters: {
      status: {
        type: "mobileViewDifference"
      }
    },
    render: function ArrowsPrimaryVariant2() {
      const [page, setPage] = (0, import_react.useState)(3);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Pagination_exports.Pagination,
        {
          pageCount: 10,
          page,
          onPageChange: setPage,
          arrowVariant: "default",
          showPrevNextButtons: true,
          md: { arrowVariant: "primary" }
        }
      );
    }
  };
  var Borders = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: "2rem" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { margin: "0 0 0.5rem", color: "var(--general-text-secondary)" }, children: 'borders="top" (default)' }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Pagination_exports.Pagination, { pageCount: 10, defaultPage: 3, totalItems: 97, pageSize: 10, pageSizeOptions: [10, 25, 50] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { margin: "0 0 0.5rem", color: "var(--general-text-secondary)" }, children: 'borders="bottom"' }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Pagination_exports.Pagination,
          {
            pageCount: 10,
            defaultPage: 3,
            totalItems: 97,
            pageSize: 10,
            pageSizeOptions: [10, 25, 50],
            borders: "bottom"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { margin: "0 0 0.5rem", color: "var(--general-text-secondary)" }, children: 'borders="both"' }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Pagination_exports.Pagination,
          {
            pageCount: 10,
            defaultPage: 3,
            totalItems: 97,
            pageSize: 10,
            pageSizeOptions: [10, 25, 50],
            borders: "both"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { margin: "0 0 0.5rem", color: "var(--general-text-secondary)" }, children: 'borders="none"' }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Pagination_exports.Pagination,
          {
            pageCount: 10,
            defaultPage: 3,
            totalItems: 97,
            pageSize: 10,
            pageSizeOptions: [10, 25, 50],
            borders: "none"
          }
        )
      ] })
    ] })
  };
  var ResponsiveVisibility = {
    args: {
      pageCount: 10,
      defaultPage: 3,
      totalItems: 97,
      pageSize: 10,
      pageSizeOptions: [10, 25, 50, 100],
      hidePageSize: "md"
    }
  };
  var MobilePicker = {
    args: {
      pageCount: 24,
      defaultPage: 7,
      totalItems: 240,
      pageSize: 10,
      pageSizeOptions: [10, 25, 50, 100]
    }
  };
  var CustomLabels = {
    args: {
      pageCount: 24,
      defaultPage: 3,
      totalItems: 1234,
      pageSize: 50,
      pageSizeOptions: [25, 50, 100],
      labels: {
        results: (count) => count > 999 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "1000+" }),
          " tulemust"
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: count }),
          " tulemust"
        ] }),
        previous: "Eelmine",
        next: "Järgmine",
        pageSize: "Tulemusi lehel"
      }
    }
  };
  var ShowAllPageSize = {
    render: function ShowAllPageSize2() {
      const totalItems = 97;
      const [page, setPage] = (0, import_react.useState)(1);
      const [pageSize, setPageSize] = (0, import_react.useState)(10);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Pagination_exports.Pagination,
        {
          pageCount: Math.max(1, Math.ceil(totalItems / pageSize)),
          page,
          onPageChange: setPage,
          totalItems,
          pageSize,
          pageSizeOptions: [10, 25, 50, { value: totalItems, label: "Show all" }],
          onPageSizeChange: (next) => {
            setPageSize(next);
            setPage(1);
          }
        }
      );
    }
  };

  // .design-sync/.cache/previews/Pagination.tsx
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
    compose(pagination_stories_exports, "Default")
  );
  var First2 = (
    /* First */
    compose(pagination_stories_exports, "First")
  );
  var Last2 = (
    /* Last */
    compose(pagination_stories_exports, "Last")
  );
  var AllPropertiesShown3 = (
    /* All Properties Shown */
    compose(pagination_stories_exports, "AllPropertiesShown")
  );
  var WithoutResultsNumber3 = (
    /* Without Results Number */
    compose(pagination_stories_exports, "WithoutResultsNumber")
  );
  var WithoutDropdown2 = (
    /* Without Dropdown */
    compose(pagination_stories_exports, "WithoutDropdown")
  );
  var ControlledPage3 = (
    /* Controlled Page */
    compose(pagination_stories_exports, "ControlledPage")
  );
  var FewPages2 = (
    /* Few Pages */
    compose(pagination_stories_exports, "FewPages")
  );
  var ManyPagesEllipsis2 = (
    /* Many Pages Ellipsis */
    compose(pagination_stories_exports, "ManyPagesEllipsis")
  );
  var HugePageCount2 = (
    /* Huge Page Count */
    compose(pagination_stories_exports, "HugePageCount")
  );
  var WiderSiblings2 = (
    /* Wider Siblings */
    compose(pagination_stories_exports, "WiderSiblings")
  );
  var Transparent2 = (
    /* Transparent */
    compose(pagination_stories_exports, "Transparent")
  );
  var TopBottomSplit3 = (
    /* Top Bottom Split */
    compose(pagination_stories_exports, "TopBottomSplit")
  );
  var DisabledBoundaryArrows3 = (
    /* Disabled Boundary Arrows */
    compose(pagination_stories_exports, "DisabledBoundaryArrows")
  );
  var ArrowsWithLabels2 = (
    /* Arrows With Labels */
    compose(pagination_stories_exports, "ArrowsWithLabels")
  );
  var CustomArrowIcons2 = (
    /* Custom Arrow Icons */
    compose(pagination_stories_exports, "CustomArrowIcons")
  );
  var ArrowsPrimaryVariant3 = (
    /* Arrows Primary Variant */
    compose(pagination_stories_exports, "ArrowsPrimaryVariant")
  );
  var Borders2 = (
    /* Borders */
    compose(pagination_stories_exports, "Borders")
  );
  var ResponsiveVisibility2 = (
    /* Responsive Visibility */
    compose(pagination_stories_exports, "ResponsiveVisibility")
  );
  var MobilePicker2 = (
    /* Mobile Picker */
    compose(pagination_stories_exports, "MobilePicker")
  );
  var CustomLabels2 = (
    /* Custom Labels */
    compose(pagination_stories_exports, "CustomLabels")
  );
  var ShowAllPageSize3 = (
    /* Show All Page Size */
    compose(pagination_stories_exports, "ShowAllPageSize")
  );
  return __toCommonJS(Pagination_exports);
})();
