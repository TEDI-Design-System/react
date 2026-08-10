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
      function jsxs3(t, p, k) {
        return R.createElement.apply(R, [t, np(p, k)].concat(p.children));
      }
      module.exports = R;
      module.exports.jsx = jsx3;
      module.exports.jsxs = jsxs3;
      module.exports.jsxDEV = function(t, p, k, s) {
        return (s ? jsxs3 : jsx3)(t, p, k);
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

  // .design-sync/.cache/previews/SideNav.tsx
  var SideNav_exports = {};
  __export(SideNav_exports, {
    CollapsibleToggle: () => CollapsibleToggle2,
    Default: () => Default2,
    DefaultOpen: () => DefaultOpen2,
    MediumSideNavItems: () => MediumSideNavItems2,
    SecondLevelMenuItems: () => SecondLevelMenuItems2,
    SecondLevelMenuItemsParentsAreLinks: () => SecondLevelMenuItemsParentsAreLinks2,
    SidenavItemStates: () => SidenavItemStates2,
    SmallSideNavItems: () => SmallSideNavItems2,
    SubTitles: () => SubTitles2,
    ThirdLevelMenuItems: () => ThirdLevelMenuItems2,
    ThirdLevelMenuItemsParentsAreLinks: () => ThirdLevelMenuItemsParentsAreLinks2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/layout/sidenav/sidenav.stories.tsx
  var sidenav_stories_exports = {};
  __export(sidenav_stories_exports, {
    CollapsibleToggle: () => CollapsibleToggle,
    Default: () => Default,
    DefaultOpen: () => DefaultOpen,
    MediumSideNavItems: () => MediumSideNavItems,
    SecondLevelMenuItems: () => SecondLevelMenuItems,
    SecondLevelMenuItemsParentsAreLinks: () => SecondLevelMenuItemsParentsAreLinks,
    SidenavItemStates: () => SidenavItemStates,
    SmallSideNavItems: () => SmallSideNavItems,
    SubTitles: () => SubTitles,
    ThirdLevelMenuItems: () => ThirdLevelMenuItems,
    ThirdLevelMenuItemsParentsAreLinks: () => ThirdLevelMenuItemsParentsAreLinks,
    default: () => sidenav_stories_default
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

  // ds-shim:ds:SideNavItem
  var ds_SideNavItem_exports = {};
  __export(ds_SideNavItem_exports, {
    default: () => ds_SideNavItem_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_SideNavItem_exports, __toESM(require_ds_raw()));
  var g4 = window.Tedi;
  var ds_SideNavItem_default = g4["SideNavItem"] !== void 0 ? g4["SideNavItem"] : g4;

  // src/tedi/components/layout/sidenav/examples.tsx
  init_define_import_meta_env();
  init_define_process_env();

  // ds-shim:ds:InfoButton
  var ds_InfoButton_exports = {};
  __export(ds_InfoButton_exports, {
    default: () => ds_InfoButton_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_InfoButton_exports, __toESM(require_ds_raw()));
  var g5 = window.Tedi;
  var ds_InfoButton_default = g5["InfoButton"] !== void 0 ? g5["InfoButton"] : g5;

  // src/tedi/components/layout/sidenav/examples.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var exampleNavItems = [
    { href: "#", children: "Home", icon: "home" },
    { href: "#", children: "Clients", icon: "account_box" },
    { href: "/", children: "Children", icon: "child_care", isActive: true },
    { href: "#", children: "Some very long text that doest fit anything and wraps", icon: "assignment" },
    { href: "#", children: "Assignments", icon: "assignment" },
    { href: "#", children: "Assignment that is a long text", icon: "assignment" },
    { href: "#", children: "Assignments", icon: "assignment" }
  ];
  var exampleNavCollapsibleItems = [
    { href: "#", children: "Dashboard", icon: "dashboard" },
    { href: "#", children: "Patient Records", icon: "people" },
    {
      children: "Clinical Management",
      icon: "medical_services",
      subItemGroups: [
        {
          subItems: [
            { href: "#", children: "Vital Signs" },
            {
              href: "#",
              children: "Comprehensive Patient Care Coordination"
            },
            { href: "#", children: "Assessments" },
            {
              href: "#",
              children: "Treatments"
            },
            {
              href: "#",
              children: "Documentation"
            },
            {
              href: "#",
              children: "Care Plan Development Services"
            }
          ]
        }
      ]
    },
    {
      children: "Administration",
      icon: "admin_panel_settings",
      subItems: [
        { href: "#", children: "Staff Management" },
        { href: "#", children: "Scheduling" },
        {
          href: "#",
          children: "System Settings"
        },
        {
          href: "#",
          children: "Reports & Analytics"
        }
      ]
    },
    { href: "#", children: "Inventory Management", icon: "inventory" },
    { href: "#", children: "Billing & Finance", icon: "payments" }
  ];
  var exampleDefaultOpen = [
    { href: "#", children: "Dashboard", icon: "dashboard" },
    { href: "#", children: "Patient Records", icon: "people" },
    {
      children: "Clinical Management",
      icon: "medical_services",
      subItemGroups: [
        {
          subItems: [
            { href: "#", children: "Vital Signs" },
            {
              href: "#",
              children: "Comprehensive Patient Care Coordination"
            },
            { href: "#", children: "Assessments" },
            {
              href: "#",
              children: "Treatments"
            },
            {
              href: "#",
              children: "Documentation"
            },
            {
              href: "#",
              children: "Care Plan Development Services"
            }
          ]
        }
      ]
    },
    {
      children: "Administration",
      isDefaultOpen: true,
      icon: "admin_panel_settings",
      subItems: [
        { href: "#", children: "Staff Management" },
        { href: "#", children: "Scheduling" },
        {
          href: "#",
          children: "System Settings"
        },
        {
          href: "#",
          children: "Reports & Analytics"
        }
      ]
    },
    { href: "#", children: "Inventory Management", icon: "inventory" },
    { href: "#", children: "Billing & Finance", icon: "payments" }
  ];
  var exampleNavCollapsibleItemsWithLinks = [
    { href: "#", children: "Dashboard", icon: "dashboard" },
    { href: "#", children: "Patient Records", icon: "people" },
    {
      href: "#critical-management",
      children: "Clinical Management",
      icon: "medical_services",
      subItems: [
        { href: "#", children: "Vital Signs" },
        {
          href: "#",
          children: "Comprehensive Patient Care Coordination"
        },
        { href: "#", children: "Assessments" },
        {
          href: "#",
          children: "Treatments"
        },
        {
          href: "#",
          children: "Documentation"
        },
        {
          href: "#",
          children: "Care Plan Development Services"
        }
      ]
    },
    {
      href: "#",
      children: "Administration",
      icon: "admin_panel_settings",
      subItems: [
        { href: "#", children: "Staff Management" },
        { href: "#", children: "Scheduling" },
        {
          href: "#",
          children: "System Settings"
        },
        {
          href: "#",
          children: "Reports & Analytics"
        }
      ]
    },
    { href: "#", children: "Inventory Management", icon: "inventory" },
    { href: "#", children: "Billing & Finance", icon: "payments" }
  ];
  var exampleThirdLevelMenuItems = [
    { href: "#", children: "Dashboard", icon: "dashboard" },
    { href: "#", children: "Patient Records", icon: "people" },
    {
      children: "Clinical Management",
      icon: "medical_services",
      subItems: [
        { href: "#", children: "Vital Signs" },
        { href: "#", children: "Assessments" },
        {
          children: "Treatments",
          subItems: [
            { href: "#", children: "Active Treatments" },
            { href: "#", children: "Treatment History" },
            { href: "#", children: "Treatment Plans" },
            { href: "#", children: "Clinical Protocols" }
          ]
        },
        {
          children: "Documentation",
          subItems: [
            { href: "#", children: "Clinical Notes" },
            { href: "#", children: "Medical Forms" },
            { href: "#", children: "Consent Forms" },
            { href: "#", children: "Reports" }
          ]
        }
      ]
    },
    {
      children: "Administration",
      icon: "admin_panel_settings",
      subItems: [
        { href: "#", children: "Staff Management" },
        { href: "#", children: "Scheduling" }
      ]
    },
    { href: "#", children: "Inventory Management", icon: "inventory" },
    { href: "#", children: "Billing & Finance", icon: "payments" }
  ];
  var exampleThirdLevelMenuItemsLinks = [
    { href: "#", children: "Dashboard", icon: "dashboard" },
    { href: "#", children: "Patient Records", icon: "people" },
    {
      children: "Clinical Management",
      href: "#",
      icon: "medical_services",
      subItems: [
        { href: "#", children: "Vital Signs" },
        { href: "#", children: "Assessments" },
        {
          href: "#",
          children: "Treatments",
          subItems: [
            { href: "#", children: "Active Treatments" },
            { href: "#", children: "Treatment History" },
            { href: "#", children: "Treatment Plans" },
            { href: "#", children: "Clinical Protocols" }
          ]
        },
        {
          href: "#",
          children: "Documentation",
          subItems: [
            { href: "#", children: "Clinical Notes" },
            { href: "#", children: "Medical Forms" },
            { href: "#", children: "Consent Forms" },
            { href: "#", children: "Reports" }
          ]
        }
      ]
    },
    {
      href: "#",
      children: "Administration",
      icon: "admin_panel_settings",
      subItems: [
        { href: "#", children: "Staff Management" },
        { href: "#", children: "Scheduling" }
      ]
    },
    { href: "#", children: "Inventory Management", icon: "inventory" },
    { href: "#", children: "Billing & Finance", icon: "payments" }
  ];
  var exampleThirdLevelMenuItemsLinksWithSubTitles = [
    { href: "#", children: "Dashboard", icon: "dashboard" },
    { href: "#", children: "Patient Records", icon: "people" },
    {
      children: "Clinical Management",
      icon: "medical_services",
      subItemGroups: [
        {
          subHeading: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Text_exports.Text, { children: [
            "Minu tervise ajalugu ",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InfoButton_exports.InfoButton, { color: "inverted", children: "Lorem ipsum" })
          ] }),
          subItems: [
            { href: "#", children: "Active Treatments" },
            { href: "#", children: "Treatment History" },
            { href: "#", children: "Treatment Plans" },
            { href: "#", children: "Clinical Protocols" }
          ]
        }
      ],
      subItems: [
        { href: "#", children: "Vital Signs" },
        { href: "#", children: "Assessments" },
        {
          href: "#",
          children: "Treatments",
          subItems: [
            { href: "#", children: "Active Treatments" },
            { href: "#", children: "Treatment History" },
            { href: "#", children: "Treatment Plans" },
            { href: "#", children: "Clinical Protocols" }
          ]
        },
        {
          href: "#",
          children: "Documentation",
          subItems: [
            { href: "#", children: "Clinical Notes" },
            { href: "#", children: "Medical Forms" },
            { href: "#", children: "Consent Forms" },
            { href: "#", children: "Reports" }
          ]
        }
      ],
      isDefaultOpen: true
    },
    {
      href: "#",
      children: "Administration",
      icon: "admin_panel_settings",
      subItems: [
        { href: "#", children: "Staff Management" },
        { href: "#", children: "Scheduling" }
      ]
    },
    { href: "#", children: "Inventory Management", icon: "inventory" },
    { href: "#", children: "Billing & Finance", icon: "payments" }
  ];

  // ds-shim:ds:SideNav
  var ds_SideNav_exports = {};
  __export(ds_SideNav_exports, {
    default: () => ds_SideNav_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_SideNav_exports, __toESM(require_ds_raw()));
  var g6 = window.Tedi;
  var ds_SideNav_default = g6["SideNav"] !== void 0 ? g6["SideNav"] : g6;

  // src/tedi/components/layout/sidenav/sidenav.stories.tsx
  var import_jsx_runtime2 = __toESM(require_react_shim());
  var meta = {
    component: ds_SideNav_exports.SideNav,
    title: "TEDI-Ready/Layout/SideNav",
    subcomponents: {
      "SideNav.Item": ds_SideNav_exports.SideNav.Item,
      "SideNav.Toggle": ds_SideNav_exports.SideNav.Toggle,
      "SideNav.Dropdown": ds_SideNav_exports.SideNav.Dropdown,
      "SideNav.Mobile": ds_SideNav_exports.SideNav.Mobile
    },
    parameters: {
      docs: {
        source: {
          transform: (code) => {
            return code.replaceAll("SideNavItem", "SideNav.Item").replaceAll("SideNavToggle", "SideNav.Toggle").replaceAll("SideNavDropdown", "SideNav.Dropdown").replaceAll("SideNavMobile", "SideNav.Mobile");
          }
        }
      },
      design: {
        type: "figma",
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.8.9--work-in-progress-?node-id=6367-171750&m=dev"
      }
    }
  };
  var sidenav_stories_default = meta;
  var Template = (args) => {
    const [isOpen, setIsOpen] = (0, import_react.useState)(true);
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_SideNav_exports.SideNav.Toggle, { menuOpen: isOpen, toggleMenu: () => setIsOpen(!isOpen) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_SideNav_exports.SideNav, { ...args, isMobileOpen: isOpen })
    ] });
  };
  var Default = {
    render: Template,
    args: {
      navItems: exampleNavItems,
      ariaLabel: "Menu title"
    },
    decorators: [
      (Story) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { height: "1024px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Story, {}) })
    ]
  };
  var stateArray = ["Default", "Hover", "Focus", "Active"];
  var TemplateWithStates = (args) => {
    const { states, ...sideNavItemProps } = args;
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
      states.map((state, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Row, { className: "padding-14-16", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { width: 3, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: state }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("ul", { style: { listStyle: "none", padding: 0, margin: 0, width: "240px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          ds_SideNavItem_exports.SideNavItem,
          {
            ...sideNavItemProps,
            isActive: state === "Active",
            className: state === "Focus" ? "focus-visible" : "",
            id: state
          }
        ) }) })
      ] }, index)),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Row, { className: "padding-14-16", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { width: 3, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "With Subitems" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("ul", { style: { listStyle: "none", padding: 0, margin: 0, width: "240px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          ds_SideNavItem_exports.SideNavItem,
          {
            ...sideNavItemProps,
            isDefaultOpen: true,
            subItems: [{ children: "Sub Item 1" }, { children: "Sub Item 2", isActive: true }],
            children: "Parent item"
          }
        ) }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Row, { className: "padding-14-16", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { width: 3, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Parent is link with subitems" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("ul", { style: { listStyle: "none", padding: 0, margin: 0, width: "240px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          ds_SideNavItem_exports.SideNavItem,
          {
            href: "#",
            isDefaultOpen: true,
            subItems: [{ children: "Sub Item 1" }, { children: "Sub Item 2", isActive: true }],
            children: "Parent item"
          }
        ) }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(grid_exports.Row, { className: "padding-14-16", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { width: 3, className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Sub item is parent" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(grid_exports.Col, { className: "flex align-items-center", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("ul", { style: { listStyle: "none", padding: 0, margin: 0, width: "240px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          ds_SideNavItem_exports.SideNavItem,
          {
            isDefaultOpen: true,
            subItems: [
              { children: "Second level" },
              { children: "Second level" },
              { children: "Second level parent", isActive: true, subItems: [{ children: "Third level" }] }
            ],
            children: "First level"
          }
        ) }) })
      ] })
    ] });
  };
  var SidenavItemStates = {
    render: TemplateWithStates,
    args: {
      states: stateArray,
      children: "Text",
      icon: "dashboard"
    },
    parameters: {
      pseudo: {
        hover: "#Hover",
        focusVisible: "#Focus",
        active: "#Active"
      }
    }
  };
  var SecondLevelMenuItems = {
    render: Template,
    args: {
      navItems: exampleNavCollapsibleItems,
      ariaLabel: "Menu title"
    },
    decorators: [
      (Story) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { height: "1024px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Story, {}) })
    ]
  };
  var SecondLevelMenuItemsParentsAreLinks = {
    render: Template,
    args: {
      navItems: exampleNavCollapsibleItemsWithLinks,
      ariaLabel: "Menu title"
    },
    decorators: [
      (Story) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { height: "1024px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Story, {}) })
    ]
  };
  var ThirdLevelMenuItems = {
    render: Template,
    args: {
      navItems: exampleThirdLevelMenuItems,
      ariaLabel: "Menu title"
    },
    decorators: [
      (Story) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { height: "1024px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Story, {}) })
    ]
  };
  var ThirdLevelMenuItemsParentsAreLinks = {
    render: Template,
    args: {
      navItems: exampleThirdLevelMenuItemsLinks,
      ariaLabel: "Menu title"
    },
    decorators: [
      (Story) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { height: "1024px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Story, {}) })
    ]
  };
  var CollapsibleToggle = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      ds_SideNav_exports.SideNav,
      {
        ariaLabel: "Collapsible menu",
        navItems: exampleThirdLevelMenuItems,
        isCollapsed: true,
        isMobileOpen: true
      }
    );
  };
  var DefaultOpen = {
    render: Template,
    args: {
      navItems: exampleDefaultOpen,
      ariaLabel: "Default open menu",
      isMobileOpen: true
    }
  };
  var MediumSideNavItems = {
    render: Template,
    args: {
      navItems: exampleThirdLevelMenuItems,
      ariaLabel: "Default open menu",
      sideNavItemSize: "medium"
    }
  };
  var SmallSideNavItems = {
    render: Template,
    args: {
      navItems: exampleThirdLevelMenuItems,
      ariaLabel: "Default open menu",
      sideNavItemSize: "small"
    }
  };
  var SubTitles = {
    render: Template,
    args: {
      navItems: exampleThirdLevelMenuItemsLinksWithSubTitles
    }
  };

  // .design-sync/.cache/previews/SideNav.tsx
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
    compose(sidenav_stories_exports, "Default")
  );
  var SidenavItemStates2 = (
    /* Sidenav Item States */
    compose(sidenav_stories_exports, "SidenavItemStates")
  );
  var SecondLevelMenuItems2 = (
    /* Second Level Menu Items */
    compose(sidenav_stories_exports, "SecondLevelMenuItems")
  );
  var SecondLevelMenuItemsParentsAreLinks2 = (
    /* Second Level Menu Items Parents Are Links */
    compose(sidenav_stories_exports, "SecondLevelMenuItemsParentsAreLinks")
  );
  var ThirdLevelMenuItems2 = (
    /* Third Level Menu Items */
    compose(sidenav_stories_exports, "ThirdLevelMenuItems")
  );
  var ThirdLevelMenuItemsParentsAreLinks2 = (
    /* Third Level Menu Items Parents Are Links */
    compose(sidenav_stories_exports, "ThirdLevelMenuItemsParentsAreLinks")
  );
  var CollapsibleToggle2 = (
    /* Collapsible Toggle */
    compose(sidenav_stories_exports, "CollapsibleToggle")
  );
  var DefaultOpen2 = (
    /* Default Open */
    compose(sidenav_stories_exports, "DefaultOpen")
  );
  var MediumSideNavItems2 = (
    /* Medium Side Nav Items */
    compose(sidenav_stories_exports, "MediumSideNavItems")
  );
  var SmallSideNavItems2 = (
    /* Small Side Nav Items */
    compose(sidenav_stories_exports, "SmallSideNavItems")
  );
  var SubTitles2 = (
    /* Sub Titles */
    compose(sidenav_stories_exports, "SubTitles")
  );
  return __toCommonJS(SideNav_exports);
})();
