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

  // .design-sync/.cache/previews/ChoiceGroup.tsx
  var ChoiceGroup_exports = {};
  __export(ChoiceGroup_exports, {
    Checkbox: () => Checkbox2,
    CheckboxCard: () => CheckboxCard2,
    CheckboxCardWithIcon: () => CheckboxCardWithIcon2,
    CheckboxRow: () => CheckboxRow2,
    CustomItemHTMLLabels: () => CustomItemHTMLLabels2,
    CustomItemLabels: () => CustomItemLabels2,
    CustomLabel: () => CustomLabel2,
    Radio: () => Radio2,
    RadioCardSegmented: () => RadioCardSegmented2,
    RadioCardSeparated: () => RadioCardSeparated2,
    RadioCardWithIcon: () => RadioCardWithIcon2,
    RadioRow: () => RadioRow2,
    Responsive: () => Responsive2,
    WithDefaultValue: () => WithDefaultValue2,
    WithError: () => WithError2,
    WithExtraContent: () => WithExtraContent2,
    WithIndeterminate: () => WithIndeterminate2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/form/choice-group/choice-group.stories.tsx
  var choice_group_stories_exports = {};
  __export(choice_group_stories_exports, {
    Checkbox: () => Checkbox,
    CheckboxCard: () => CheckboxCard,
    CheckboxCardWithIcon: () => CheckboxCardWithIcon,
    CheckboxRow: () => CheckboxRow,
    CustomItemHTMLLabels: () => CustomItemHTMLLabels,
    CustomItemLabels: () => CustomItemLabels,
    CustomLabel: () => CustomLabel,
    Radio: () => Radio,
    RadioCardSegmented: () => RadioCardSegmented,
    RadioCardSeparated: () => RadioCardSeparated,
    RadioCardWithIcon: () => RadioCardWithIcon,
    RadioRow: () => RadioRow,
    Responsive: () => Responsive,
    WithDefaultValue: () => WithDefaultValue,
    WithError: () => WithError,
    WithExtraContent: () => WithExtraContent,
    WithIndeterminate: () => WithIndeterminate,
    default: () => choice_group_stories_default
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

  // ds-shim:ds:Icon
  var ds_Icon_exports = {};
  __export(ds_Icon_exports, {
    default: () => ds_Icon_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Icon_exports, __toESM(require_ds_raw()));
  var g = window.Tedi;
  var ds_Icon_default = g["Icon"] !== void 0 ? g["Icon"] : g;

  // ds-shim:ds:Text
  var ds_Text_exports = {};
  __export(ds_Text_exports, {
    default: () => ds_Text_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Text_exports, __toESM(require_ds_raw()));
  var g2 = window.Tedi;
  var ds_Text_default = g2["Text"] !== void 0 ? g2["Text"] : g2;

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

  // ds-shim:ds:VerticalSpacing
  var ds_VerticalSpacing_exports = {};
  __export(ds_VerticalSpacing_exports, {
    default: () => ds_VerticalSpacing_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_VerticalSpacing_exports, __toESM(require_ds_raw()));
  var g5 = window.Tedi;
  var ds_VerticalSpacing_default = g5["VerticalSpacing"] !== void 0 ? g5["VerticalSpacing"] : g5;

  // ds-shim:ds:Separator
  var ds_Separator_exports = {};
  __export(ds_Separator_exports, {
    default: () => ds_Separator_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Separator_exports, __toESM(require_ds_raw()));
  var g6 = window.Tedi;
  var ds_Separator_default = g6["Separator"] !== void 0 ? g6["Separator"] : g6;

  // ds-shim:ds:TextField
  var ds_TextField_exports = {};
  __export(ds_TextField_exports, {
    default: () => ds_TextField_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_TextField_exports, __toESM(require_ds_raw()));
  var g7 = window.Tedi;
  var ds_TextField_default = g7["TextField"] !== void 0 ? g7["TextField"] : g7;

  // ds-shim:ds:ChoiceGroup
  var ds_ChoiceGroup_exports = {};
  __export(ds_ChoiceGroup_exports, {
    default: () => ds_ChoiceGroup_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_ChoiceGroup_exports, __toESM(require_ds_raw()));
  var g8 = window.Tedi;
  var ds_ChoiceGroup_default = g8["ChoiceGroup"] !== void 0 ? g8["ChoiceGroup"] : g8;

  // src/tedi/components/form/choice-group/choice-group.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    component: ds_ChoiceGroup_default,
    title: "TEDI-Ready/Components/Form/ChoiceGroup/ChoiceGroup",
    subcomponents: { "ChoiceGroup.Item": ds_ChoiceGroup_default.Item },
    parameters: {
      a11y: { test: "todo" },
      docs: {
        source: {
          transform: (code) => {
            return code.replaceAll("ChoiceGroupItem", "ChoiceGroup.Item");
          }
        }
      },
      status: {
        type: [{ name: "breakpointSupport", url: "?path=/docs/helpers-usebreakpointprops--usebreakpointprops" }]
      },
      controls: {
        exclude: ["sm", "md", "lg", "xl", "xxl"]
      }
    }
  };
  var choice_group_stories_default = meta;
  var generateItems = ({
    index,
    inputType = "radio",
    variant = "primary",
    withHelper = false,
    withIndicator = false,
    tooltip = false,
    colProps,
    layout,
    justifyContent,
    withIcons = false
  }) => {
    const baseId = withIcons ? `icon-${inputType}-${variant}` : `${inputType}-${variant}`;
    const icons = withIcons ? ["train", "directions_walk", "directions_car"] : [];
    return [1, 2, 3].map((i) => {
      const itemIndex = index * 10 + i;
      const suffix = `${withHelper}-${withIndicator}-${layout ?? "default"}`;
      let label = "Text";
      if (withIcons) {
        label = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Text_exports.Text, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: icons[i - 1], color: "inherit", display: "inline" }),
          " Text"
        ] });
      }
      return {
        id: `${baseId}-value-${itemIndex}-${suffix}`,
        label,
        value: `${baseId}-value-${itemIndex}`,
        ...withHelper && {
          helper: {
            text: "Description",
            ...i === 3 && { type: "error" }
          }
        },
        disabled: i === 3,
        colProps,
        tooltip: tooltip ? "Tooltip" : void 0,
        justifyContent,
        ...withIcons && i === 1 && { defaultChecked: true }
      };
    });
  };
  var renderGroup = (inputType, variant, withHelper, withIndicator, layout, index, justifyContent = "start", withIcons = false) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 6, md: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_ChoiceGroup_default,
      {
        color: "primary",
        id: `${withIcons ? "icon-" : ""}${inputType}-${variant}-${layout}-no-helper-${index}`,
        inputType,
        items: generateItems({
          index,
          inputType,
          variant: "primary",
          withHelper,
          withIndicator,
          layout,
          justifyContent,
          withIcons
        }),
        label: "Filter",
        hideLabel: true,
        name: `${withIcons ? "icon-" : ""}${inputType}-${variant}-${layout}-no-helper-${index}`,
        showIndicator: withIndicator,
        variant: "card",
        layout
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 6, md: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_ChoiceGroup_default,
      {
        color: "secondary",
        id: `${withIcons ? "icon-" : ""}${inputType}-${variant}-${layout}-with-helper-${index}`,
        inputType,
        items: generateItems({
          index: index + 1,
          inputType,
          variant: "secondary",
          withHelper,
          withIndicator,
          layout,
          justifyContent,
          withIcons
        }),
        label: "Filter",
        hideLabel: true,
        name: `${withIcons ? "icon-" : ""}${inputType}-${variant}-${layout}-with-helper-${index}`,
        showIndicator: withIndicator,
        variant: "card",
        layout
      }
    ) })
  ] }, `${withIcons ? "icon-" : ""}${inputType}-${variant}-${layout}-${index}`);
  var renderChoiceGroups = (inputType, layout, withIcons = false) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 6, md: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Primary" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 6, md: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Secondary" }) })
    ] }),
    renderGroup(inputType, "primary", false, true, layout, 1, "start", withIcons),
    renderGroup(inputType, "primary", true, true, layout, 2, "start", withIcons),
    inputType !== "radio" || layout !== "separated" && renderGroup(inputType, "primary", false, false, layout, 3, "start", withIcons),
    inputType !== "radio" || layout !== "separated" && renderGroup(inputType, "primary", true, false, layout, 4, "start", withIcons)
  ] });
  var Radio = {
    argTypes: {
      ...subcomponentArgTypes(ds_ChoiceGroup_default.Item, {
        category: "ChoiceGroup.Item",
        prefix: "item",
        include: ["variant", "color", "layout", "showIndicator", "disabled", "justifyContent", "direction"]
      })
    },
    args: {
      label: "ChoiceGroup with radios:",
      id: "example-1",
      defaultValue: [],
      inputType: "radio",
      name: "radio-1",
      item__variant: "card",
      item__showIndicator: true,
      item__layout: "separated"
    },
    render: (args) => {
      const itemProps = getSubcomponentProps(args, "item");
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_ChoiceGroup_default,
        {
          ...getPrimaryComponentProps(args),
          items: generateItems({ index: 0 }).map((item) => ({ ...item, ...itemProps }))
        }
      );
    }
  };
  var RadioRow = {
    args: {
      label: "ChoiceGroup with radios:",
      id: "example-1.2",
      defaultValue: [],
      inputType: "radio",
      name: "radio-1.2",
      direction: "row",
      items: generateItems({ index: 1 })
    }
  };
  var Checkbox = {
    args: {
      label: "ChoiceGroup with checkboxes:",
      id: "example-2",
      defaultValue: [],
      inputType: "checkbox",
      name: "check-2",
      items: generateItems({ index: 2 })
    }
  };
  var CheckboxRow = {
    args: {
      label: "ChoiceGroup with checkboxes:",
      id: "example-2.1",
      defaultValue: [],
      inputType: "checkbox",
      name: "check-2.1",
      direction: "row",
      items: generateItems({ index: 33 })
    }
  };
  var RadioCardSegmented = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_VerticalSpacing_exports.VerticalSpacing, { children: renderChoiceGroups("radio", "segmented") });
  var RadioCardSeparated = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_VerticalSpacing_exports.VerticalSpacing, { children: renderChoiceGroups("radio", "separated") });
  var CheckboxCard = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_VerticalSpacing_exports.VerticalSpacing, { children: renderChoiceGroups("checkbox", "separated") });
  var RadioCardWithIcon = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 6, md: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Primary" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 6, md: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Secondary" }) })
      ] }),
      renderGroup("radio", "primary", false, true, "segmented", 1, "start", true),
      renderGroup("radio", "secondary", true, true, "segmented", 2, "start", true)
    ] })
  };
  var CheckboxCardWithIcon = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 6, md: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Primary" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { lg: 6, md: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Secondary" }) })
      ] }),
      renderGroup("checkbox", "primary", false, true, "separated", 5, "start", true),
      renderGroup("checkbox", "secondary", true, true, "separated", 6, "start", true)
    ] })
  };
  var WithError = {
    render: function Render(args) {
      const [selectedValues, setSelectedValues] = (0, import_react.useState)([]);
      const hasError = Array.isArray(selectedValues) && selectedValues.length === 0;
      const handleChange = (value) => {
        setSelectedValues(value);
      };
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_ChoiceGroup_default,
        {
          ...args,
          value: selectedValues,
          onChange: handleChange,
          helper: hasError ? {
            text: "Please select at least one option to continue.",
            type: "error",
            id: "error-helper"
          } : void 0
        }
      );
    },
    args: {
      label: "Select at least one option:",
      id: "example-with-error",
      inputType: "checkbox",
      name: "with-error",
      items: [
        {
          id: "error-option-1",
          label: "Option 1",
          value: "option-1"
        },
        {
          id: "error-option-2",
          label: "Option 2",
          value: "option-2"
        },
        {
          id: "error-option-3",
          label: "Option 3",
          value: "option-3"
        }
      ]
    }
  };
  var WithDefaultValue = {
    args: {
      ...Checkbox.args,
      label: "I have the second item selected by default:",
      items: generateItems({ index: 13 }),
      defaultValue: ["radio-primary-value-132-false-false-undefined"]
    }
  };
  var WithIndeterminate = {
    args: {
      ...Checkbox.args,
      label: "I have an indeterminate checkbox:",
      items: generateItems({ index: 14 }),
      indeterminateCheck: (state) => state === "all" ? "Unselect all" : "Select all"
    }
  };
  var WithExtraContent = {
    args: {
      inputType: "checkbox",
      label: "I have extra content after each option:",
      id: "example-extra-content",
      name: "extra-content",
      items: [
        {
          id: "extra-content-1",
          label: "Basic plan",
          value: "basic",
          helper: { text: "Includes 5GB storage and basic support" }
        },
        {
          id: "extra-content-2",
          label: "Pro plan",
          value: "pro",
          helper: { text: "Includes 20GB storage and priority support" }
        },
        {
          id: "extra-content-3",
          label: "Enterprise plan",
          value: "enterprise",
          helper: {
            text: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: 4, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0.5, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextField_default, { id: "success-textfield-1", label: "Field 1" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_TextField_default, { id: "success-textfield-2", label: "Field 2" })
            ] }) }) })
          }
        }
      ]
    }
  };
  var Responsive = {
    args: {
      inputType: "radio",
      label: "Choose an option:",
      variant: "card",
      showIndicator: true,
      layout: "separated",
      color: "primary",
      direction: "row",
      lg: { layout: "segmented", direction: "row", color: "secondary" },
      items: [
        {
          id: "radio-card-1",
          label: "Option 1",
          value: "value-1",
          sm: { justifyContent: "start" },
          lg: { justifyContent: "center", colProps: { width: "auto", grow: 1 } }
        },
        {
          id: "radio-card-2",
          label: "Option 2",
          value: "value-2",
          defaultChecked: true,
          sm: { justifyContent: "start" },
          lg: { justifyContent: "center", colProps: { width: "auto", grow: 1 } }
        },
        {
          id: "radio-card-3",
          label: "Option 3",
          value: "value-3",
          sm: { justifyContent: "start" },
          lg: { justifyContent: "center", colProps: { width: "auto", grow: 1 } }
        }
      ]
    }
  };
  var CustomLabel = {
    args: {
      inputType: "checkbox",
      direction: "row",
      label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: ["bold", "italic"], color: "brand", children: "Custom label" }),
      id: "custom-label",
      name: "custom-label",
      items: generateItems({ index: 16 })
    }
  };
  var CustomItemLabels = {
    args: {
      inputType: "radio",
      label: "Custom item labels:",
      id: "custom-item-labels",
      name: "custom-item-labels",
      items: [
        {
          id: "radio-custom-item-labels-1",
          label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Text_exports.Text, { children: [
            "Lorem ipsum dolor sit, amet",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              ds_Separator_default,
              {
                element: "span",
                axis: "vertical",
                color: "secondary",
                display: "inline",
                dotSize: "small",
                spacing: 0.5,
                variant: "dot-only",
                "aria-hidden": "true"
              }
            ),
            "consectetur adipisicing elit."
          ] }),
          value: "radio-custom-item-labels-1"
        },
        {
          id: "radio-custom-item-labels-2",
          label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Text_exports.Text, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { display: "inline", name: "error", color: "danger", "aria-hidden": "true" }),
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
          ] }),
          value: "radio-custom-item-labels-2",
          defaultChecked: true
        },
        {
          id: "radio-custom-item-labels-3",
          label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Text_exports.Text, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { display: "inline", name: "check", color: "success", "aria-hidden": "true" }),
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
          ] }),
          value: "radio-custom-item-labels-3"
        },
        {
          id: "radio-custom-item-labels-4",
          label: "Lorem ipsum",
          value: "radio-custom-item-labels-4"
        }
      ]
    }
  };
  var CustomItemHTMLLabels = {
    args: {
      inputType: "checkbox",
      label: "Custom item HTML labels:",
      id: "custom-item-html-labels",
      name: "custom-item-html-labels",
      items: [
        {
          id: "checkbox-custom-item-labels-1",
          label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              style: {
                backgroundColor: "var(--tedi-primary-600)",
                color: "var(--tedi-neutral-100)",
                padding: "0 8px",
                borderRadius: "5px"
              },
              children: "Lorem ipsum 1"
            }
          ),
          value: "checkbox-custom-item-labels-1"
        },
        {
          id: "checkbox-custom-item-labels-2",
          label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "check", color: "success", "aria-hidden": "true" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { children: "Lorem ipsum 2" })
          ] }),
          value: "checkbox-custom-item-labels-2",
          defaultChecked: true
        },
        {
          id: "checkbox-custom-item-labels-3",
          label: "Lorem ipsum 3",
          value: "checkbox-custom-item-labels-3"
        },
        {
          id: "checkbox-custom-item-labels-4",
          label: "Lorem ipsum 4",
          value: "checkbox-custom-item-labels-4"
        }
      ]
    }
  };

  // .design-sync/.cache/previews/ChoiceGroup.tsx
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
  var Radio2 = (
    /* Radio */
    compose(choice_group_stories_exports, "Radio")
  );
  var RadioRow2 = (
    /* Radio Row */
    compose(choice_group_stories_exports, "RadioRow")
  );
  var Checkbox2 = (
    /* Checkbox */
    compose(choice_group_stories_exports, "Checkbox")
  );
  var CheckboxRow2 = (
    /* Checkbox Row */
    compose(choice_group_stories_exports, "CheckboxRow")
  );
  var RadioCardSegmented2 = (
    /* Radio Card Segmented */
    compose(choice_group_stories_exports, "RadioCardSegmented")
  );
  var RadioCardSeparated2 = (
    /* Radio Card Separated */
    compose(choice_group_stories_exports, "RadioCardSeparated")
  );
  var CheckboxCard2 = (
    /* Checkbox Card */
    compose(choice_group_stories_exports, "CheckboxCard")
  );
  var RadioCardWithIcon2 = (
    /* Radio Card With Icon */
    compose(choice_group_stories_exports, "RadioCardWithIcon")
  );
  var CheckboxCardWithIcon2 = (
    /* Checkbox Card With Icon */
    compose(choice_group_stories_exports, "CheckboxCardWithIcon")
  );
  var WithError2 = (
    /* With Error */
    compose(choice_group_stories_exports, "WithError")
  );
  var WithDefaultValue2 = (
    /* With Default Value */
    compose(choice_group_stories_exports, "WithDefaultValue")
  );
  var WithIndeterminate2 = (
    /* With Indeterminate */
    compose(choice_group_stories_exports, "WithIndeterminate")
  );
  var WithExtraContent2 = (
    /* With Extra Content */
    compose(choice_group_stories_exports, "WithExtraContent")
  );
  var Responsive2 = (
    /* Responsive */
    compose(choice_group_stories_exports, "Responsive")
  );
  var CustomLabel2 = (
    /* Custom Label */
    compose(choice_group_stories_exports, "CustomLabel")
  );
  var CustomItemLabels2 = (
    /* Custom Item Labels */
    compose(choice_group_stories_exports, "CustomItemLabels")
  );
  var CustomItemHTMLLabels2 = (
    /* Custom Item HTML Labels */
    compose(choice_group_stories_exports, "CustomItemHTMLLabels")
  );
  return __toCommonJS(ChoiceGroup_exports);
})();
