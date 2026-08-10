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
      function jsx5(t, p, k) {
        var c = p && p.children;
        return c === void 0 ? R.createElement(t, np(p, k)) : R.createElement(t, np(p, k), c);
      }
      function jsxs4(t, p, k) {
        return R.createElement.apply(R, [t, np(p, k)].concat(p.children));
      }
      module.exports = R;
      module.exports.jsx = jsx5;
      module.exports.jsxs = jsxs4;
      module.exports.jsxDEV = function(t, p, k, s) {
        return (s ? jsxs4 : jsx5)(t, p, k);
      };
      module.exports.Fragment = R.Fragment;
    }
  });

  // node_modules/classnames/index.js
  var require_classnames = __commonJS({
    "node_modules/classnames/index.js"(exports, module) {
      init_define_import_meta_env();
      init_define_process_env();
      (function() {
        "use strict";
        var hasOwn = {}.hasOwnProperty;
        function classNames() {
          var classes = "";
          for (var i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            if (arg) {
              classes = appendClass(classes, parseValue(arg));
            }
          }
          return classes;
        }
        function parseValue(arg) {
          if (typeof arg === "string" || typeof arg === "number") {
            return arg;
          }
          if (typeof arg !== "object") {
            return "";
          }
          if (Array.isArray(arg)) {
            return classNames.apply(null, arg);
          }
          if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
            return arg.toString();
          }
          var classes = "";
          for (var key in arg) {
            if (hasOwn.call(arg, key) && arg[key]) {
              classes = appendClass(classes, key);
            }
          }
          return classes;
        }
        function appendClass(value, newClass) {
          if (!newClass) {
            return value;
          }
          if (value) {
            return value + " " + newClass;
          }
          return value + newClass;
        }
        if (typeof module !== "undefined" && module.exports) {
          classNames.default = classNames;
          module.exports = classNames;
        } else if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
          define("classnames", [], function() {
            return classNames;
          });
        } else {
          window.classNames = classNames;
        }
      })();
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

  // src/community/components/button-content/button-content.module.scss
  var require_button_content_module = __commonJS({
    "src/community/components/button-content/button-content.module.scss"() {
      init_define_import_meta_env();
      init_define_process_env();
    }
  });

  // src/community/components/form/toggle/toggle.module.scss
  var require_toggle_module = __commonJS({
    "src/community/components/form/toggle/toggle.module.scss"() {
      init_define_import_meta_env();
      init_define_process_env();
    }
  });

  // .design-sync/.cache/previews/Tooltip.tsx
  var Tooltip_exports = {};
  __export(Tooltip_exports, {
    ArrowPosition: () => ArrowPosition2,
    ControlledOpen: () => ControlledOpen2,
    Default: () => Default2,
    OpenWithClick: () => OpenWithClick2,
    TooltipWidth: () => TooltipWidth2,
    Triggers: () => Triggers2,
    UncontrolledDefaultOpen: () => UncontrolledDefaultOpen2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React4 = __toESM(require_react_shim(), 1);

  // src/tedi/components/overlays/tooltip/tooltip.stories.tsx
  var tooltip_stories_exports = {};
  __export(tooltip_stories_exports, {
    ArrowPosition: () => ArrowPosition,
    ControlledOpen: () => ControlledOpen,
    Default: () => Default,
    OpenWithClick: () => OpenWithClick,
    TooltipWidth: () => TooltipWidth,
    Triggers: () => Triggers,
    UncontrolledDefaultOpen: () => UncontrolledDefaultOpen,
    default: () => tooltip_stories_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  var import_react4 = __toESM(require_react_shim());

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

  // src/community/components/form/toggle/toggle.tsx
  init_define_import_meta_env();
  init_define_process_env();
  var import_classnames2 = __toESM(require_classnames());
  var import_react3 = __toESM(require_react_shim());

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

  // ds-shim:ds:Spinner
  var ds_Spinner_exports = {};
  __export(ds_Spinner_exports, {
    default: () => ds_Spinner_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Spinner_exports, __toESM(require_ds_raw()));
  var g2 = window.Tedi;
  var ds_Spinner_default = g2["Spinner"] !== void 0 ? g2["Spinner"] : g2;

  // src/community/components/button/button.tsx
  init_define_import_meta_env();
  init_define_process_env();
  var import_react2 = __toESM(require_react_shim());

  // src/community/components/button-content/button-content.tsx
  init_define_import_meta_env();
  init_define_process_env();
  var import_classnames = __toESM(require_classnames());
  var import_react = __toESM(require_react_shim());

  // ds-shim:ds:Print
  var ds_Print_exports = {};
  __export(ds_Print_exports, {
    default: () => ds_Print_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Print_exports, __toESM(require_ds_raw()));
  var g3 = window.Tedi;
  var ds_Print_default = g3["Print"] !== void 0 ? g3["Print"] : g3;

  // src/community/components/button-content/button-content.tsx
  var import_button_content_module = __toESM(require_button_content_module());
  var import_jsx_runtime = __toESM(require_react_shim());
  var InternalButtonContent = (0, import_react.forwardRef)(
    ({
      children,
      as,
      text,
      className,
      visualType = "primary",
      color = "default",
      size,
      icon,
      iconLeft,
      iconRight,
      underline = false,
      isHovered,
      isActive,
      isLoading = false,
      noStyle,
      renderWrapperElement,
      fullWidth,
      onClick,
      ...rest
    }, ref) => {
      const Component = as || "button";
      const hasIcon = icon || iconLeft || iconRight;
      const BEM = !noStyle ? (0, import_classnames.default)(
        import_button_content_module.default["btn"],
        import_button_content_module.default[`btn--${visualType}`],
        import_button_content_module.default[`btn--${color}`],
        className,
        { [import_button_content_module.default[`btn--${size}`]]: size },
        { [import_button_content_module.default["btn--underline"]]: underline },
        { [import_button_content_module.default["btn--is-hovered"]]: isHovered },
        { [import_button_content_module.default["btn--is-active"]]: isActive },
        { [import_button_content_module.default["btn--is-loading"]]: isLoading },
        { [import_button_content_module.default["btn--icon-only"]]: icon },
        { [import_button_content_module.default["btn--icon"]]: hasIcon },
        { [import_button_content_module.default["btn--full-width"]]: fullWidth }
      ) : (0, import_classnames.default)(import_button_content_module.default["btn--no-style"], className, { [import_button_content_module.default["btn--full-width"]]: fullWidth });
      const getIcon = (location, icon2) => {
        const iconBEM = (0, import_classnames.default)(import_button_content_module.default["btn__icon"], import_button_content_module.default[`btn__icon--${location}`], {
          [import_button_content_module.default["btn__spinner"]]: isLoading
        });
        const defaultIconProps = { size: 16, className: iconBEM };
        const iconProps = typeof icon2 === "string" ? { ...defaultIconProps, name: icon2, color: "inherit" } : {
          ...defaultIconProps,
          ...icon2,
          color: "inherit",
          background: void 0,
          className: (0, import_classnames.default)(defaultIconProps.className, icon2?.className)
        };
        return isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Spinner_exports.Spinner, { className: iconProps.className }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { ...iconProps });
      };
      const renderContent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: import_button_content_module.default["btn__inner"], children: [
        icon && getIcon("centre", icon),
        iconLeft && getIcon("left", iconLeft),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: import_button_content_module.default["btn__text"], children }),
        isLoading && !hasIcon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Spinner_exports.Spinner, { position: "absolute", className: import_button_content_module.default["btn__spinner"] }),
        iconRight && getIcon("right", iconRight)
      ] });
      const onClickHandler = (event) => {
        if (onClick && !isLoading) onClick(event);
      };
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Print_default, { visibility: "hide", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        Component,
        {
          "data-name": "button-content",
          ...rest,
          "aria-disabled": isLoading || rest["aria-disabled"],
          onClick: onClickHandler,
          ref,
          className: BEM,
          children: !noStyle ? renderContent() : children
        }
      ) });
    }
  );
  InternalButtonContent.displayName = "ButtonContent";
  var ButtonContent = InternalButtonContent;
  var button_content_default = ButtonContent;

  // src/community/components/button/button.tsx
  var import_jsx_runtime2 = __toESM(require_react_shim());
  var InternalButton = (0, import_react2.forwardRef)(
    (props, ref) => {
      const {
        children,
        as,
        type,
        formNoValidate,
        visualType,
        color,
        size,
        icon,
        iconLeft,
        iconRight,
        underline,
        isHovered,
        isActive,
        noStyle,
        ...rest
      } = props;
      const ComponentAs = as || "button";
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        button_content_default,
        {
          "data-name": "button",
          ...rest,
          type: type || "button",
          formNoValidate: formNoValidate ?? type === "submit" ? true : void 0,
          ref,
          as: ComponentAs,
          visualType,
          color,
          size,
          icon,
          iconLeft,
          iconRight,
          underline,
          isHovered,
          isActive,
          noStyle,
          children
        }
      );
    }
  );
  InternalButton.displayName = "Button";
  var Button = InternalButton;
  var button_default = Button;

  // src/community/components/form/toggle/toggle.tsx
  var import_toggle_module = __toESM(require_toggle_module());
  var import_jsx_runtime3 = __toESM(require_react_shim());
  var Toggle = (0, import_react3.forwardRef)((props, ref) => {
    const {
      ariaLabel,
      className,
      checked,
      defaultChecked,
      onChange,
      size = props.icon ? "large" : "medium",
      color = "default",
      type,
      icon,
      disabled = false,
      isLoading = false,
      extraContent,
      label,
      ...rest
    } = props;
    const [innerChecked, setInnerChecked] = import_react3.default.useState(defaultChecked || false);
    const getChecked = import_react3.default.useMemo(() => {
      return onChange && typeof checked !== "undefined" ? checked : innerChecked;
    }, [onChange, innerChecked, checked]);
    const ToggleBEM = (0, import_classnames2.default)(
      import_toggle_module.default["toggle"],
      import_toggle_module.default[`toggle--${size}`],
      import_toggle_module.default[`toggle--${color}`],
      {
        [import_toggle_module.default["toggle--active"]]: getChecked,
        [import_toggle_module.default["toggle--disabled"]]: disabled,
        [import_toggle_module.default[`toggle--${type}`]]: type
      },
      className
    );
    const handleChange = () => {
      if (isLoading) {
        return;
      }
      const newChecked = !getChecked;
      if (typeof checked === "undefined") {
        setInnerChecked(newChecked);
      }
      onChange?.(newChecked);
    };
    const buttonProps = {
      noStyle: true,
      type: "button",
      "aria-label": ariaLabel,
      "aria-pressed": getChecked,
      disabled,
      "aria-disabled": isLoading,
      ...rest,
      onClick: handleChange
    };
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: import_toggle_module.default["toggle-wrapper"], children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        button_default,
        {
          ...buttonProps,
          onClick: (event) => {
            rest?.onClick?.(event);
            handleChange();
          },
          ref,
          "data-name": "toggle",
          className: ToggleBEM,
          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: import_toggle_module.default["toggle__dot"], children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            ds_Spinner_exports.Spinner,
            {
              size: size === "large" ? 16 : 10,
              className: (0, import_classnames2.default)(import_toggle_module.default["toggle__icon"], import_toggle_module.default["toggle__spinner"])
            }
          ) : icon ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ds_Icon_exports.Icon, { className: import_toggle_module.default["toggle__icon"], name: getChecked ? "lock_open_right" : "lock", size: 16 }) : null })
        }
      ),
      label && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(button_default, { ...buttonProps, className: import_toggle_module.default["toggle__label"], "aria-hidden": true, tabIndex: -1, children: label }),
      extraContent && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: import_toggle_module.default["toggle__extra-content"], children: extraContent })
    ] });
  });
  Toggle.displayName = "Toggle";
  var toggle_default = Toggle;

  // ds-shim:ds:Button
  var ds_Button_exports = {};
  __export(ds_Button_exports, {
    default: () => ds_Button_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Button_exports, __toESM(require_ds_raw()));
  var g4 = window.Tedi;
  var ds_Button_default = g4["Button"] !== void 0 ? g4["Button"] : g4;

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
  var g6 = window.Tedi;
  var ds_Row_default = g6["Row"] !== void 0 ? g6["Row"] : g6;

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
  var g7 = window.Tedi;
  var ds_Col_default = g7["Col"] !== void 0 ? g7["Col"] : g7;

  // src/tedi/components/layout/grid/index.ts
  __reExport(grid_exports, ds_Col_exports);

  // ds-shim:ds:Tooltip
  var ds_Tooltip_exports = {};
  __export(ds_Tooltip_exports, {
    default: () => ds_Tooltip_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Tooltip_exports, __toESM(require_ds_raw()));
  var g8 = window.Tedi;
  var ds_Tooltip_default = g8["Tooltip"] !== void 0 ? g8["Tooltip"] : g8;

  // src/tedi/components/overlays/tooltip/tooltip.stories.tsx
  var import_jsx_runtime4 = __toESM(require_react_shim());
  var meta = {
    component: ds_Tooltip_default,
    title: "TEDI-Ready/Components/Overlay/Tooltip",
    subcomponents: {
      "Tooltip.Trigger": ds_Tooltip_default.Trigger,
      "Tooltip.Content": ds_Tooltip_default.Content
    },
    parameters: {
      docs: {
        source: {
          transform: (code) => {
            return code.replaceAll("TooltipContent", "Tooltip.Content").replaceAll("TooltipTrigger", "Tooltip.Trigger");
          }
        }
      },
      design: {
        type: "figma",
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=5797-117363&m=dev"
      }
    }
  };
  var tooltip_stories_default = meta;
  var Template = (args) => {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ds_Tooltip_default, { ...args, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_InfoButton_default, { children: "Info" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Content, { children: "Tooltip Content" })
    ] });
  };
  var PositionTemplate = (args) => {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(grid_exports.Row, { gap: 3, justifyContent: "center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { xs: 12, lg: 3, className: "flex justify-content-center", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ds_Tooltip_default, { ...args, placement: "top-start", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Trigger, { children: "Top start" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Content, { children: "Tooltip Content" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { xs: 12, lg: 3, className: "flex justify-content-center", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ds_Tooltip_default, { ...args, placement: "top", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Trigger, { children: "Top center" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Content, { children: "Tooltip Content" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { xs: 12, lg: 3, className: "flex justify-content-center", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ds_Tooltip_default, { ...args, placement: "top-end", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Trigger, { children: "Top end" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Content, { children: "Tooltip Content" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { xs: 12, lg: 3, className: "flex justify-content-center", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ds_Tooltip_default, { ...args, placement: "bottom-start", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Trigger, { children: "Bottom start" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Content, { children: "Tooltip Content" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { xs: 12, lg: 3, className: "flex justify-content-center", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ds_Tooltip_default, { ...args, placement: "bottom", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Trigger, { children: "Bottom center" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Content, { children: "Tooltip Content" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { xs: 12, lg: 3, className: "flex justify-content-center", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ds_Tooltip_default, { ...args, placement: "bottom-end", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Trigger, { children: "Bottom end" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Content, { children: "Tooltip Content" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { xs: 12, lg: 3, className: "flex justify-content-center", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ds_Tooltip_default, { ...args, placement: "left-start", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Trigger, { children: "Left start" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Content, { children: "Tooltip Content" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { xs: 12, lg: 3, className: "flex justify-content-center", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ds_Tooltip_default, { ...args, placement: "left", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Trigger, { children: "Left center" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Content, { children: "Tooltip Content" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { xs: 12, lg: 3, className: "flex justify-content-center", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ds_Tooltip_default, { ...args, placement: "left-end", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Trigger, { children: "Left end" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Content, { children: "Tooltip Content" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { xs: 12, lg: 3, className: "flex justify-content-center", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ds_Tooltip_default, { ...args, placement: "right-start", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Trigger, { children: "Right start" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Content, { children: "Tooltip Content" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { xs: 12, lg: 3, className: "flex justify-content-center", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ds_Tooltip_default, { ...args, placement: "right", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Trigger, { children: "Right center" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Content, { children: "Tooltip Content" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { xs: 12, lg: 3, className: "flex justify-content-center", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ds_Tooltip_default, { ...args, placement: "right-end", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Trigger, { children: "Right end" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Content, { children: "Tooltip Content" })
      ] }) })
    ] });
  };
  var WidthTemplate = (args) => {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(grid_exports.Row, { gap: 3, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ds_Tooltip_default, { ...args, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Trigger, { children: "Tooltip with no width limit" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Content, { maxWidth: "none", children: "The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas." })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ds_Tooltip_default, { ...args, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Trigger, { children: "Small tooltip width" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Content, { maxWidth: "small", children: "The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas." })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ds_Tooltip_default, { ...args, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Trigger, { children: "Medium tooltip width" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Content, { children: "The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas." })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ds_Tooltip_default, { ...args, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Trigger, { children: "Large tooltip width" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Content, { maxWidth: "large", children: "The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas." })
      ] }) })
    ] });
  };
  var TriggerTemplate = (args) => {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(grid_exports.Row, { gap: 3, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ds_Tooltip_default, { ...args, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_InfoButton_default, { children: "Info" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Content, { children: "This tooltip trigger is Info icon." })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ds_Tooltip_default, { ...args, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Button_default, { icon: "search", children: "Search" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Content, { children: "This tooltip trigger is button with icon." })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ds_Tooltip_default, { ...args, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(toggle_default, { ariaLabel: "Some toggle", label: "Some toggle" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Content, { children: "This tooltip trigger is toggle." })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(grid_exports.Col, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ds_Tooltip_default, { ...args, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Trigger, { children: "Tooltip trigger can..." }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Content, { children: "Tooltip trigger can be even text." })
      ] }) })
    ] });
  };
  var ControlledTemplate = (args) => {
    const { open, ...rest } = args;
    const [innerOpen, setInnerOpen] = (0, import_react4.useState)(open);
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ds_Tooltip_default, { ...rest, open: innerOpen, onToggle: setInnerOpen, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_InfoButton_default, { children: "Info" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Content, { children: "TooltipContent" })
    ] });
  };
  var Default = {
    argTypes: {
      ...subcomponentArgTypes(ds_Tooltip_default.Content, {
        category: "Tooltip.Content",
        prefix: "content",
        exclude: ["children", "labelledBy", "describedBy"]
      })
    },
    args: {
      content__maxWidth: "medium"
    },
    render: (args) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(ds_Tooltip_default, { ...getPrimaryComponentProps(args), children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_InfoButton_default, { children: "Info" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ds_Tooltip_default.Content, { ...getSubcomponentProps(args, "content"), children: "The polar bear (Ursus maritimus) is a large bear native to the Arctic and nearby areas." })
    ] })
  };
  var ArrowPosition = {
    render: PositionTemplate,
    args: {}
  };
  var TooltipWidth = {
    render: WidthTemplate,
    args: {}
  };
  var Triggers = {
    render: TriggerTemplate,
    args: {}
  };
  var OpenWithClick = {
    render: Template,
    args: {
      openWith: "click"
    }
  };
  var UncontrolledDefaultOpen = {
    render: Template,
    args: {
      defaultOpen: true
    }
  };
  var ControlledOpen = {
    render: ControlledTemplate,
    args: {
      open: true
    }
  };

  // .design-sync/.cache/previews/Tooltip.tsx
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
      if (C) render = () => React4.createElement(C, args);
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
    return () => React4.createElement("div", { style: { background: bg } }, composed());
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
    compose(tooltip_stories_exports, "Default")
  );
  var ArrowPosition2 = (
    /* Arrow Position */
    compose(tooltip_stories_exports, "ArrowPosition")
  );
  var TooltipWidth2 = (
    /* Tooltip Width */
    compose(tooltip_stories_exports, "TooltipWidth")
  );
  var Triggers2 = (
    /* Triggers */
    compose(tooltip_stories_exports, "Triggers")
  );
  var OpenWithClick2 = (
    /* Open With Click */
    compose(tooltip_stories_exports, "OpenWithClick")
  );
  var UncontrolledDefaultOpen2 = (
    /* Uncontrolled Default Open */
    compose(tooltip_stories_exports, "UncontrolledDefaultOpen")
  );
  var ControlledOpen2 = (
    /* Controlled Open */
    compose(tooltip_stories_exports, "ControlledOpen")
  );
  return __toCommonJS(Tooltip_exports);
})();
/*! Bundled license information:

classnames/index.js:
  (*!
  	Copyright (c) 2018 Jed Watson.
  	Licensed under the MIT License (MIT), see
  	http://jedwatson.github.io/classnames
  *)
*/
