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

  // shim:react-dom-shim
  var require_react_dom_shim = __commonJS({
    "shim:react-dom-shim"(exports, module) {
      init_define_import_meta_env();
      init_define_process_env();
      var D = window.ReactDOM;
      var n = function() {
      };
      module.exports = Object.assign({ preload: n, preinit: n, preconnect: n, prefetchDNS: n, preloadModule: n, preinitModule: n }, D);
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

  // .design-sync/.cache/previews/Table.tsx
  var Table_exports = {};
  __export(Table_exports, {
    Actions: () => Actions3,
    ClickableRows: () => ClickableRows3,
    CollapsibleRows: () => CollapsibleRows2,
    CollapsibleRowsRowTrigger: () => CollapsibleRowsRowTrigger2,
    Custom: () => Custom3,
    Default: () => Default3,
    EditableValues: () => EditableValues3,
    Filters: () => Filters3,
    GroupedRows: () => GroupedRows3,
    LongTexts: () => LongTexts3,
    MergedCells: () => MergedCells3,
    NoOutsideBorder: () => NoOutsideBorder2,
    ReorderableColumns: () => ReorderableColumns2,
    ReorderableColumnsStickyHeader: () => ReorderableColumnsStickyHeader2,
    ReorderableRows: () => ReorderableRows2,
    Responsive: () => Responsive3,
    SelectableRows: () => SelectableRows2,
    ServerSide: () => ServerSide3,
    Simple: () => Simple3,
    SingleSelectRows: () => SingleSelectRows2,
    Sizes: () => Sizes3,
    Sortable: () => Sortable3,
    StickyFirstColumn: () => StickyFirstColumn2,
    StickyHeader: () => StickyHeader2,
    StickyHeaderAndFirstColumn: () => StickyHeaderAndFirstColumn2,
    Striped: () => Striped2,
    VerticalBorders: () => VerticalBorders2,
    WithColumnsMenu: () => WithColumnsMenu2,
    WithEmptyState: () => WithEmptyState2,
    WithFooter: () => WithFooter2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React4 = __toESM(require_react_shim(), 1);

  // src/tedi/components/content/table/table.stories.tsx
  var table_stories_exports = {};
  __export(table_stories_exports, {
    Actions: () => Actions,
    ClickableRows: () => ClickableRows,
    CollapsibleRows: () => CollapsibleRows,
    CollapsibleRowsRowTrigger: () => CollapsibleRowsRowTrigger,
    Custom: () => Custom,
    Default: () => Default,
    EditableValues: () => EditableValues,
    Filters: () => Filters,
    GroupedRows: () => GroupedRows,
    LongTexts: () => LongTexts,
    MergedCells: () => MergedCells,
    NoOutsideBorder: () => NoOutsideBorder,
    ReorderableColumns: () => ReorderableColumns,
    ReorderableColumnsStickyHeader: () => ReorderableColumnsStickyHeader,
    ReorderableRows: () => ReorderableRows,
    Responsive: () => Responsive,
    SelectableRows: () => SelectableRows,
    ServerSide: () => ServerSide,
    Simple: () => Simple,
    SingleSelectRows: () => SingleSelectRows,
    Sizes: () => Sizes,
    Sortable: () => Sortable,
    StickyFirstColumn: () => StickyFirstColumn,
    StickyHeader: () => StickyHeader,
    StickyHeaderAndFirstColumn: () => StickyHeaderAndFirstColumn,
    Striped: () => Striped,
    VerticalBorders: () => VerticalBorders,
    WithColumnsMenu: () => WithColumnsMenu,
    WithEmptyState: () => WithEmptyState,
    WithFooter: () => WithFooter,
    default: () => table_stories_default
  });
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/@dnd-kit/sortable/dist/sortable.esm.js
  init_define_import_meta_env();
  init_define_process_env();
  var import_react4 = __toESM(require_react_shim());

  // node_modules/@dnd-kit/core/dist/core.esm.js
  init_define_import_meta_env();
  init_define_process_env();
  var import_react3 = __toESM(require_react_shim());
  var import_react_dom = __toESM(require_react_dom_shim());

  // node_modules/@dnd-kit/utilities/dist/utilities.esm.js
  init_define_import_meta_env();
  init_define_process_env();
  var import_react = __toESM(require_react_shim());
  var canUseDOM = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
  function isWindow(element) {
    const elementString = Object.prototype.toString.call(element);
    return elementString === "[object Window]" || // In Electron context the Window object serializes to [object global]
    elementString === "[object global]";
  }
  function isNode(node) {
    return "nodeType" in node;
  }
  function getWindow(target) {
    var _target$ownerDocument, _target$ownerDocument2;
    if (!target) {
      return window;
    }
    if (isWindow(target)) {
      return target;
    }
    if (!isNode(target)) {
      return window;
    }
    return (_target$ownerDocument = (_target$ownerDocument2 = target.ownerDocument) == null ? void 0 : _target$ownerDocument2.defaultView) != null ? _target$ownerDocument : window;
  }
  function isDocument(node) {
    const {
      Document
    } = getWindow(node);
    return node instanceof Document;
  }
  function isHTMLElement(node) {
    if (isWindow(node)) {
      return false;
    }
    return node instanceof getWindow(node).HTMLElement;
  }
  function isSVGElement(node) {
    return node instanceof getWindow(node).SVGElement;
  }
  function getOwnerDocument(target) {
    if (!target) {
      return document;
    }
    if (isWindow(target)) {
      return target.document;
    }
    if (!isNode(target)) {
      return document;
    }
    if (isDocument(target)) {
      return target;
    }
    if (isHTMLElement(target) || isSVGElement(target)) {
      return target.ownerDocument;
    }
    return document;
  }
  function createAdjustmentFn(modifier) {
    return function(object) {
      for (var _len = arguments.length, adjustments = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        adjustments[_key - 1] = arguments[_key];
      }
      return adjustments.reduce((accumulator, adjustment) => {
        const entries = Object.entries(adjustment);
        for (const [key, valueAdjustment] of entries) {
          const value = accumulator[key];
          if (value != null) {
            accumulator[key] = value + modifier * valueAdjustment;
          }
        }
        return accumulator;
      }, {
        ...object
      });
    };
  }
  var add = /* @__PURE__ */ createAdjustmentFn(1);
  var subtract = /* @__PURE__ */ createAdjustmentFn(-1);
  function hasViewportRelativeCoordinates(event) {
    return "clientX" in event && "clientY" in event;
  }
  function isKeyboardEvent(event) {
    if (!event) {
      return false;
    }
    const {
      KeyboardEvent
    } = getWindow(event.target);
    return KeyboardEvent && event instanceof KeyboardEvent;
  }
  function isTouchEvent(event) {
    if (!event) {
      return false;
    }
    const {
      TouchEvent
    } = getWindow(event.target);
    return TouchEvent && event instanceof TouchEvent;
  }
  function getEventCoordinates(event) {
    if (isTouchEvent(event)) {
      if (event.touches && event.touches.length) {
        const {
          clientX: x,
          clientY: y
        } = event.touches[0];
        return {
          x,
          y
        };
      } else if (event.changedTouches && event.changedTouches.length) {
        const {
          clientX: x,
          clientY: y
        } = event.changedTouches[0];
        return {
          x,
          y
        };
      }
    }
    if (hasViewportRelativeCoordinates(event)) {
      return {
        x: event.clientX,
        y: event.clientY
      };
    }
    return null;
  }

  // node_modules/@dnd-kit/accessibility/dist/accessibility.esm.js
  init_define_import_meta_env();
  init_define_process_env();
  var import_react2 = __toESM(require_react_shim());

  // node_modules/@dnd-kit/core/dist/core.esm.js
  var Action;
  (function(Action2) {
    Action2["DragStart"] = "dragStart";
    Action2["DragMove"] = "dragMove";
    Action2["DragEnd"] = "dragEnd";
    Action2["DragCancel"] = "dragCancel";
    Action2["DragOver"] = "dragOver";
    Action2["RegisterDroppable"] = "registerDroppable";
    Action2["SetDroppableDisabled"] = "setDroppableDisabled";
    Action2["UnregisterDroppable"] = "unregisterDroppable";
  })(Action || (Action = {}));
  var defaultCoordinates = /* @__PURE__ */ Object.freeze({
    x: 0,
    y: 0
  });
  function parseTransform(transform) {
    if (transform.startsWith("matrix3d(")) {
      const transformArray = transform.slice(9, -1).split(/, /);
      return {
        x: +transformArray[12],
        y: +transformArray[13],
        scaleX: +transformArray[0],
        scaleY: +transformArray[5]
      };
    } else if (transform.startsWith("matrix(")) {
      const transformArray = transform.slice(7, -1).split(/, /);
      return {
        x: +transformArray[4],
        y: +transformArray[5],
        scaleX: +transformArray[0],
        scaleY: +transformArray[3]
      };
    }
    return null;
  }
  function inverseTransform(rect, transform, transformOrigin) {
    const parsedTransform = parseTransform(transform);
    if (!parsedTransform) {
      return rect;
    }
    const {
      scaleX,
      scaleY,
      x: translateX,
      y: translateY
    } = parsedTransform;
    const x = rect.left - translateX - (1 - scaleX) * parseFloat(transformOrigin);
    const y = rect.top - translateY - (1 - scaleY) * parseFloat(transformOrigin.slice(transformOrigin.indexOf(" ") + 1));
    const w = scaleX ? rect.width / scaleX : rect.width;
    const h = scaleY ? rect.height / scaleY : rect.height;
    return {
      width: w,
      height: h,
      top: y,
      right: x + w,
      bottom: y + h,
      left: x
    };
  }
  var defaultOptions = {
    ignoreTransform: false
  };
  function getClientRect(element, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    let rect = element.getBoundingClientRect();
    if (options.ignoreTransform) {
      const {
        transform,
        transformOrigin
      } = getWindow(element).getComputedStyle(element);
      if (transform) {
        rect = inverseTransform(rect, transform, transformOrigin);
      }
    }
    const {
      top,
      left,
      width,
      height,
      bottom,
      right
    } = rect;
    return {
      top,
      left,
      width,
      height,
      bottom,
      right
    };
  }
  function getTransformAgnosticClientRect(element) {
    return getClientRect(element, {
      ignoreTransform: true
    });
  }
  function isFixed(node, computedStyle) {
    if (computedStyle === void 0) {
      computedStyle = getWindow(node).getComputedStyle(node);
    }
    return computedStyle.position === "fixed";
  }
  function isScrollable(element, computedStyle) {
    if (computedStyle === void 0) {
      computedStyle = getWindow(element).getComputedStyle(element);
    }
    const overflowRegex = /(auto|scroll|overlay)/;
    const properties = ["overflow", "overflowX", "overflowY"];
    return properties.some((property) => {
      const value = computedStyle[property];
      return typeof value === "string" ? overflowRegex.test(value) : false;
    });
  }
  function getScrollableAncestors(element, limit) {
    const scrollParents = [];
    function findScrollableAncestors(node) {
      if (limit != null && scrollParents.length >= limit) {
        return scrollParents;
      }
      if (!node) {
        return scrollParents;
      }
      if (isDocument(node) && node.scrollingElement != null && !scrollParents.includes(node.scrollingElement)) {
        scrollParents.push(node.scrollingElement);
        return scrollParents;
      }
      if (!isHTMLElement(node) || isSVGElement(node)) {
        return scrollParents;
      }
      if (scrollParents.includes(node)) {
        return scrollParents;
      }
      const computedStyle = getWindow(element).getComputedStyle(node);
      if (node !== element) {
        if (isScrollable(node, computedStyle)) {
          scrollParents.push(node);
        }
      }
      if (isFixed(node, computedStyle)) {
        return scrollParents;
      }
      return findScrollableAncestors(node.parentNode);
    }
    if (!element) {
      return scrollParents;
    }
    return findScrollableAncestors(element);
  }
  function getFirstScrollableAncestor(node) {
    const [firstScrollableAncestor] = getScrollableAncestors(node, 1);
    return firstScrollableAncestor != null ? firstScrollableAncestor : null;
  }
  var Direction;
  (function(Direction2) {
    Direction2[Direction2["Forward"] = 1] = "Forward";
    Direction2[Direction2["Backward"] = -1] = "Backward";
  })(Direction || (Direction = {}));
  function isDocumentScrollingElement(element) {
    if (!canUseDOM || !element) {
      return false;
    }
    return element === document.scrollingElement;
  }
  function getScrollPosition(scrollingContainer) {
    const minScroll = {
      x: 0,
      y: 0
    };
    const dimensions = isDocumentScrollingElement(scrollingContainer) ? {
      height: window.innerHeight,
      width: window.innerWidth
    } : {
      height: scrollingContainer.clientHeight,
      width: scrollingContainer.clientWidth
    };
    const maxScroll = {
      x: scrollingContainer.scrollWidth - dimensions.width,
      y: scrollingContainer.scrollHeight - dimensions.height
    };
    const isTop = scrollingContainer.scrollTop <= minScroll.y;
    const isLeft = scrollingContainer.scrollLeft <= minScroll.x;
    const isBottom = scrollingContainer.scrollTop >= maxScroll.y;
    const isRight = scrollingContainer.scrollLeft >= maxScroll.x;
    return {
      isTop,
      isLeft,
      isBottom,
      isRight,
      maxScroll,
      minScroll
    };
  }
  function getScrollElementRect(element) {
    if (element === document.scrollingElement) {
      const {
        innerWidth,
        innerHeight
      } = window;
      return {
        top: 0,
        left: 0,
        right: innerWidth,
        bottom: innerHeight,
        width: innerWidth,
        height: innerHeight
      };
    }
    const {
      top,
      left,
      right,
      bottom
    } = element.getBoundingClientRect();
    return {
      top,
      left,
      right,
      bottom,
      width: element.clientWidth,
      height: element.clientHeight
    };
  }
  function scrollIntoViewIfNeeded(element, measure) {
    if (measure === void 0) {
      measure = getClientRect;
    }
    if (!element) {
      return;
    }
    const {
      top,
      left,
      bottom,
      right
    } = measure(element);
    const firstScrollableAncestor = getFirstScrollableAncestor(element);
    if (!firstScrollableAncestor) {
      return;
    }
    if (bottom <= 0 || right <= 0 || top >= window.innerHeight || left >= window.innerWidth) {
      element.scrollIntoView({
        block: "center",
        inline: "center"
      });
    }
  }
  var Listeners = class {
    constructor(target) {
      this.target = void 0;
      this.listeners = [];
      this.removeAll = () => {
        this.listeners.forEach((listener) => {
          var _this$target;
          return (_this$target = this.target) == null ? void 0 : _this$target.removeEventListener(...listener);
        });
      };
      this.target = target;
    }
    add(eventName, handler, options) {
      var _this$target2;
      (_this$target2 = this.target) == null ? void 0 : _this$target2.addEventListener(eventName, handler, options);
      this.listeners.push([eventName, handler, options]);
    }
  };
  function getEventListenerTarget(target) {
    const {
      EventTarget
    } = getWindow(target);
    return target instanceof EventTarget ? target : getOwnerDocument(target);
  }
  function hasExceededDistance(delta, measurement) {
    const dx = Math.abs(delta.x);
    const dy = Math.abs(delta.y);
    if (typeof measurement === "number") {
      return Math.sqrt(dx ** 2 + dy ** 2) > measurement;
    }
    if ("x" in measurement && "y" in measurement) {
      return dx > measurement.x && dy > measurement.y;
    }
    if ("x" in measurement) {
      return dx > measurement.x;
    }
    if ("y" in measurement) {
      return dy > measurement.y;
    }
    return false;
  }
  var EventName;
  (function(EventName2) {
    EventName2["Click"] = "click";
    EventName2["DragStart"] = "dragstart";
    EventName2["Keydown"] = "keydown";
    EventName2["ContextMenu"] = "contextmenu";
    EventName2["Resize"] = "resize";
    EventName2["SelectionChange"] = "selectionchange";
    EventName2["VisibilityChange"] = "visibilitychange";
  })(EventName || (EventName = {}));
  function preventDefault(event) {
    event.preventDefault();
  }
  function stopPropagation(event) {
    event.stopPropagation();
  }
  var KeyboardCode;
  (function(KeyboardCode2) {
    KeyboardCode2["Space"] = "Space";
    KeyboardCode2["Down"] = "ArrowDown";
    KeyboardCode2["Right"] = "ArrowRight";
    KeyboardCode2["Left"] = "ArrowLeft";
    KeyboardCode2["Up"] = "ArrowUp";
    KeyboardCode2["Esc"] = "Escape";
    KeyboardCode2["Enter"] = "Enter";
    KeyboardCode2["Tab"] = "Tab";
  })(KeyboardCode || (KeyboardCode = {}));
  var defaultKeyboardCodes = {
    start: [KeyboardCode.Space, KeyboardCode.Enter],
    cancel: [KeyboardCode.Esc],
    end: [KeyboardCode.Space, KeyboardCode.Enter, KeyboardCode.Tab]
  };
  var defaultKeyboardCoordinateGetter = (event, _ref) => {
    let {
      currentCoordinates
    } = _ref;
    switch (event.code) {
      case KeyboardCode.Right:
        return {
          ...currentCoordinates,
          x: currentCoordinates.x + 25
        };
      case KeyboardCode.Left:
        return {
          ...currentCoordinates,
          x: currentCoordinates.x - 25
        };
      case KeyboardCode.Down:
        return {
          ...currentCoordinates,
          y: currentCoordinates.y + 25
        };
      case KeyboardCode.Up:
        return {
          ...currentCoordinates,
          y: currentCoordinates.y - 25
        };
    }
    return void 0;
  };
  var KeyboardSensor = class {
    constructor(props) {
      this.props = void 0;
      this.autoScrollEnabled = false;
      this.referenceCoordinates = void 0;
      this.listeners = void 0;
      this.windowListeners = void 0;
      this.props = props;
      const {
        event: {
          target
        }
      } = props;
      this.props = props;
      this.listeners = new Listeners(getOwnerDocument(target));
      this.windowListeners = new Listeners(getWindow(target));
      this.handleKeyDown = this.handleKeyDown.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
      this.attach();
    }
    attach() {
      this.handleStart();
      this.windowListeners.add(EventName.Resize, this.handleCancel);
      this.windowListeners.add(EventName.VisibilityChange, this.handleCancel);
      setTimeout(() => this.listeners.add(EventName.Keydown, this.handleKeyDown));
    }
    handleStart() {
      const {
        activeNode,
        onStart
      } = this.props;
      const node = activeNode.node.current;
      if (node) {
        scrollIntoViewIfNeeded(node);
      }
      onStart(defaultCoordinates);
    }
    handleKeyDown(event) {
      if (isKeyboardEvent(event)) {
        const {
          active,
          context,
          options
        } = this.props;
        const {
          keyboardCodes = defaultKeyboardCodes,
          coordinateGetter = defaultKeyboardCoordinateGetter,
          scrollBehavior = "smooth"
        } = options;
        const {
          code
        } = event;
        if (keyboardCodes.end.includes(code)) {
          this.handleEnd(event);
          return;
        }
        if (keyboardCodes.cancel.includes(code)) {
          this.handleCancel(event);
          return;
        }
        const {
          collisionRect
        } = context.current;
        const currentCoordinates = collisionRect ? {
          x: collisionRect.left,
          y: collisionRect.top
        } : defaultCoordinates;
        if (!this.referenceCoordinates) {
          this.referenceCoordinates = currentCoordinates;
        }
        const newCoordinates = coordinateGetter(event, {
          active,
          context: context.current,
          currentCoordinates
        });
        if (newCoordinates) {
          const coordinatesDelta = subtract(newCoordinates, currentCoordinates);
          const scrollDelta = {
            x: 0,
            y: 0
          };
          const {
            scrollableAncestors
          } = context.current;
          for (const scrollContainer of scrollableAncestors) {
            const direction = event.code;
            const {
              isTop,
              isRight,
              isLeft,
              isBottom,
              maxScroll,
              minScroll
            } = getScrollPosition(scrollContainer);
            const scrollElementRect = getScrollElementRect(scrollContainer);
            const clampedCoordinates = {
              x: Math.min(direction === KeyboardCode.Right ? scrollElementRect.right - scrollElementRect.width / 2 : scrollElementRect.right, Math.max(direction === KeyboardCode.Right ? scrollElementRect.left : scrollElementRect.left + scrollElementRect.width / 2, newCoordinates.x)),
              y: Math.min(direction === KeyboardCode.Down ? scrollElementRect.bottom - scrollElementRect.height / 2 : scrollElementRect.bottom, Math.max(direction === KeyboardCode.Down ? scrollElementRect.top : scrollElementRect.top + scrollElementRect.height / 2, newCoordinates.y))
            };
            const canScrollX = direction === KeyboardCode.Right && !isRight || direction === KeyboardCode.Left && !isLeft;
            const canScrollY = direction === KeyboardCode.Down && !isBottom || direction === KeyboardCode.Up && !isTop;
            if (canScrollX && clampedCoordinates.x !== newCoordinates.x) {
              const newScrollCoordinates = scrollContainer.scrollLeft + coordinatesDelta.x;
              const canScrollToNewCoordinates = direction === KeyboardCode.Right && newScrollCoordinates <= maxScroll.x || direction === KeyboardCode.Left && newScrollCoordinates >= minScroll.x;
              if (canScrollToNewCoordinates && !coordinatesDelta.y) {
                scrollContainer.scrollTo({
                  left: newScrollCoordinates,
                  behavior: scrollBehavior
                });
                return;
              }
              if (canScrollToNewCoordinates) {
                scrollDelta.x = scrollContainer.scrollLeft - newScrollCoordinates;
              } else {
                scrollDelta.x = direction === KeyboardCode.Right ? scrollContainer.scrollLeft - maxScroll.x : scrollContainer.scrollLeft - minScroll.x;
              }
              if (scrollDelta.x) {
                scrollContainer.scrollBy({
                  left: -scrollDelta.x,
                  behavior: scrollBehavior
                });
              }
              break;
            } else if (canScrollY && clampedCoordinates.y !== newCoordinates.y) {
              const newScrollCoordinates = scrollContainer.scrollTop + coordinatesDelta.y;
              const canScrollToNewCoordinates = direction === KeyboardCode.Down && newScrollCoordinates <= maxScroll.y || direction === KeyboardCode.Up && newScrollCoordinates >= minScroll.y;
              if (canScrollToNewCoordinates && !coordinatesDelta.x) {
                scrollContainer.scrollTo({
                  top: newScrollCoordinates,
                  behavior: scrollBehavior
                });
                return;
              }
              if (canScrollToNewCoordinates) {
                scrollDelta.y = scrollContainer.scrollTop - newScrollCoordinates;
              } else {
                scrollDelta.y = direction === KeyboardCode.Down ? scrollContainer.scrollTop - maxScroll.y : scrollContainer.scrollTop - minScroll.y;
              }
              if (scrollDelta.y) {
                scrollContainer.scrollBy({
                  top: -scrollDelta.y,
                  behavior: scrollBehavior
                });
              }
              break;
            }
          }
          this.handleMove(event, add(subtract(newCoordinates, this.referenceCoordinates), scrollDelta));
        }
      }
    }
    handleMove(event, coordinates) {
      const {
        onMove
      } = this.props;
      event.preventDefault();
      onMove(coordinates);
    }
    handleEnd(event) {
      const {
        onEnd
      } = this.props;
      event.preventDefault();
      this.detach();
      onEnd();
    }
    handleCancel(event) {
      const {
        onCancel
      } = this.props;
      event.preventDefault();
      this.detach();
      onCancel();
    }
    detach() {
      this.listeners.removeAll();
      this.windowListeners.removeAll();
    }
  };
  KeyboardSensor.activators = [{
    eventName: "onKeyDown",
    handler: (event, _ref, _ref2) => {
      let {
        keyboardCodes = defaultKeyboardCodes,
        onActivation
      } = _ref;
      let {
        active
      } = _ref2;
      const {
        code
      } = event.nativeEvent;
      if (keyboardCodes.start.includes(code)) {
        const activator = active.activatorNode.current;
        if (activator && event.target !== activator) {
          return false;
        }
        event.preventDefault();
        onActivation == null ? void 0 : onActivation({
          event: event.nativeEvent
        });
        return true;
      }
      return false;
    }
  }];
  function isDistanceConstraint(constraint) {
    return Boolean(constraint && "distance" in constraint);
  }
  function isDelayConstraint(constraint) {
    return Boolean(constraint && "delay" in constraint);
  }
  var AbstractPointerSensor = class {
    constructor(props, events2, listenerTarget) {
      var _getEventCoordinates;
      if (listenerTarget === void 0) {
        listenerTarget = getEventListenerTarget(props.event.target);
      }
      this.props = void 0;
      this.events = void 0;
      this.autoScrollEnabled = true;
      this.document = void 0;
      this.activated = false;
      this.initialCoordinates = void 0;
      this.timeoutId = null;
      this.listeners = void 0;
      this.documentListeners = void 0;
      this.windowListeners = void 0;
      this.props = props;
      this.events = events2;
      const {
        event
      } = props;
      const {
        target
      } = event;
      this.props = props;
      this.events = events2;
      this.document = getOwnerDocument(target);
      this.documentListeners = new Listeners(this.document);
      this.listeners = new Listeners(listenerTarget);
      this.windowListeners = new Listeners(getWindow(target));
      this.initialCoordinates = (_getEventCoordinates = getEventCoordinates(event)) != null ? _getEventCoordinates : defaultCoordinates;
      this.handleStart = this.handleStart.bind(this);
      this.handleMove = this.handleMove.bind(this);
      this.handleEnd = this.handleEnd.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
      this.handleKeydown = this.handleKeydown.bind(this);
      this.removeTextSelection = this.removeTextSelection.bind(this);
      this.attach();
    }
    attach() {
      const {
        events: events2,
        props: {
          options: {
            activationConstraint,
            bypassActivationConstraint
          }
        }
      } = this;
      this.listeners.add(events2.move.name, this.handleMove, {
        passive: false
      });
      this.listeners.add(events2.end.name, this.handleEnd);
      if (events2.cancel) {
        this.listeners.add(events2.cancel.name, this.handleCancel);
      }
      this.windowListeners.add(EventName.Resize, this.handleCancel);
      this.windowListeners.add(EventName.DragStart, preventDefault);
      this.windowListeners.add(EventName.VisibilityChange, this.handleCancel);
      this.windowListeners.add(EventName.ContextMenu, preventDefault);
      this.documentListeners.add(EventName.Keydown, this.handleKeydown);
      if (activationConstraint) {
        if (bypassActivationConstraint != null && bypassActivationConstraint({
          event: this.props.event,
          activeNode: this.props.activeNode,
          options: this.props.options
        })) {
          return this.handleStart();
        }
        if (isDelayConstraint(activationConstraint)) {
          this.timeoutId = setTimeout(this.handleStart, activationConstraint.delay);
          this.handlePending(activationConstraint);
          return;
        }
        if (isDistanceConstraint(activationConstraint)) {
          this.handlePending(activationConstraint);
          return;
        }
      }
      this.handleStart();
    }
    detach() {
      this.listeners.removeAll();
      this.windowListeners.removeAll();
      setTimeout(this.documentListeners.removeAll, 50);
      if (this.timeoutId !== null) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
    }
    handlePending(constraint, offset) {
      const {
        active,
        onPending
      } = this.props;
      onPending(active, constraint, this.initialCoordinates, offset);
    }
    handleStart() {
      const {
        initialCoordinates
      } = this;
      const {
        onStart
      } = this.props;
      if (initialCoordinates) {
        this.activated = true;
        this.documentListeners.add(EventName.Click, stopPropagation, {
          capture: true
        });
        this.removeTextSelection();
        this.documentListeners.add(EventName.SelectionChange, this.removeTextSelection);
        onStart(initialCoordinates);
      }
    }
    handleMove(event) {
      var _getEventCoordinates2;
      const {
        activated,
        initialCoordinates,
        props
      } = this;
      const {
        onMove,
        options: {
          activationConstraint
        }
      } = props;
      if (!initialCoordinates) {
        return;
      }
      const coordinates = (_getEventCoordinates2 = getEventCoordinates(event)) != null ? _getEventCoordinates2 : defaultCoordinates;
      const delta = subtract(initialCoordinates, coordinates);
      if (!activated && activationConstraint) {
        if (isDistanceConstraint(activationConstraint)) {
          if (activationConstraint.tolerance != null && hasExceededDistance(delta, activationConstraint.tolerance)) {
            return this.handleCancel();
          }
          if (hasExceededDistance(delta, activationConstraint.distance)) {
            return this.handleStart();
          }
        }
        if (isDelayConstraint(activationConstraint)) {
          if (hasExceededDistance(delta, activationConstraint.tolerance)) {
            return this.handleCancel();
          }
        }
        this.handlePending(activationConstraint, delta);
        return;
      }
      if (event.cancelable) {
        event.preventDefault();
      }
      onMove(coordinates);
    }
    handleEnd() {
      const {
        onAbort,
        onEnd
      } = this.props;
      this.detach();
      if (!this.activated) {
        onAbort(this.props.active);
      }
      onEnd();
    }
    handleCancel() {
      const {
        onAbort,
        onCancel
      } = this.props;
      this.detach();
      if (!this.activated) {
        onAbort(this.props.active);
      }
      onCancel();
    }
    handleKeydown(event) {
      if (event.code === KeyboardCode.Esc) {
        this.handleCancel();
      }
    }
    removeTextSelection() {
      var _this$document$getSel;
      (_this$document$getSel = this.document.getSelection()) == null ? void 0 : _this$document$getSel.removeAllRanges();
    }
  };
  var events = {
    cancel: {
      name: "pointercancel"
    },
    move: {
      name: "pointermove"
    },
    end: {
      name: "pointerup"
    }
  };
  var PointerSensor = class extends AbstractPointerSensor {
    constructor(props) {
      const {
        event
      } = props;
      const listenerTarget = getOwnerDocument(event.target);
      super(props, events, listenerTarget);
    }
  };
  PointerSensor.activators = [{
    eventName: "onPointerDown",
    handler: (_ref, _ref2) => {
      let {
        nativeEvent: event
      } = _ref;
      let {
        onActivation
      } = _ref2;
      if (!event.isPrimary || event.button !== 0) {
        return false;
      }
      onActivation == null ? void 0 : onActivation({
        event
      });
      return true;
    }
  }];
  var events$1 = {
    move: {
      name: "mousemove"
    },
    end: {
      name: "mouseup"
    }
  };
  var MouseButton;
  (function(MouseButton2) {
    MouseButton2[MouseButton2["RightClick"] = 2] = "RightClick";
  })(MouseButton || (MouseButton = {}));
  var MouseSensor = class extends AbstractPointerSensor {
    constructor(props) {
      super(props, events$1, getOwnerDocument(props.event.target));
    }
  };
  MouseSensor.activators = [{
    eventName: "onMouseDown",
    handler: (_ref, _ref2) => {
      let {
        nativeEvent: event
      } = _ref;
      let {
        onActivation
      } = _ref2;
      if (event.button === MouseButton.RightClick) {
        return false;
      }
      onActivation == null ? void 0 : onActivation({
        event
      });
      return true;
    }
  }];
  var events$2 = {
    cancel: {
      name: "touchcancel"
    },
    move: {
      name: "touchmove"
    },
    end: {
      name: "touchend"
    }
  };
  var TouchSensor = class extends AbstractPointerSensor {
    constructor(props) {
      super(props, events$2);
    }
    static setup() {
      window.addEventListener(events$2.move.name, noop, {
        capture: false,
        passive: false
      });
      return function teardown() {
        window.removeEventListener(events$2.move.name, noop);
      };
      function noop() {
      }
    }
  };
  TouchSensor.activators = [{
    eventName: "onTouchStart",
    handler: (_ref, _ref2) => {
      let {
        nativeEvent: event
      } = _ref;
      let {
        onActivation
      } = _ref2;
      const {
        touches
      } = event;
      if (touches.length > 1) {
        return false;
      }
      onActivation == null ? void 0 : onActivation({
        event
      });
      return true;
    }
  }];
  var AutoScrollActivator;
  (function(AutoScrollActivator2) {
    AutoScrollActivator2[AutoScrollActivator2["Pointer"] = 0] = "Pointer";
    AutoScrollActivator2[AutoScrollActivator2["DraggableRect"] = 1] = "DraggableRect";
  })(AutoScrollActivator || (AutoScrollActivator = {}));
  var TraversalOrder;
  (function(TraversalOrder2) {
    TraversalOrder2[TraversalOrder2["TreeOrder"] = 0] = "TreeOrder";
    TraversalOrder2[TraversalOrder2["ReversedTreeOrder"] = 1] = "ReversedTreeOrder";
  })(TraversalOrder || (TraversalOrder = {}));
  var defaultScrollIntent = {
    x: {
      [Direction.Backward]: false,
      [Direction.Forward]: false
    },
    y: {
      [Direction.Backward]: false,
      [Direction.Forward]: false
    }
  };
  var MeasuringStrategy;
  (function(MeasuringStrategy2) {
    MeasuringStrategy2[MeasuringStrategy2["Always"] = 0] = "Always";
    MeasuringStrategy2[MeasuringStrategy2["BeforeDragging"] = 1] = "BeforeDragging";
    MeasuringStrategy2[MeasuringStrategy2["WhileDragging"] = 2] = "WhileDragging";
  })(MeasuringStrategy || (MeasuringStrategy = {}));
  var MeasuringFrequency;
  (function(MeasuringFrequency2) {
    MeasuringFrequency2["Optimized"] = "optimized";
  })(MeasuringFrequency || (MeasuringFrequency = {}));
  var defaultMeasuringConfiguration = {
    draggable: {
      measure: getTransformAgnosticClientRect
    },
    droppable: {
      measure: getTransformAgnosticClientRect,
      strategy: MeasuringStrategy.WhileDragging,
      frequency: MeasuringFrequency.Optimized
    },
    dragOverlay: {
      measure: getClientRect
    }
  };
  var ActiveDraggableContext = /* @__PURE__ */ (0, import_react3.createContext)({
    ...defaultCoordinates,
    scaleX: 1,
    scaleY: 1
  });
  var Status;
  (function(Status2) {
    Status2[Status2["Uninitialized"] = 0] = "Uninitialized";
    Status2[Status2["Initializing"] = 1] = "Initializing";
    Status2[Status2["Initialized"] = 2] = "Initialized";
  })(Status || (Status = {}));

  // node_modules/@dnd-kit/sortable/dist/sortable.esm.js
  function arrayMove(array, from, to) {
    const newArray = array.slice();
    newArray.splice(to < 0 ? newArray.length + to : to, 0, newArray.splice(from, 1)[0]);
    return newArray;
  }
  var directions = [KeyboardCode.Down, KeyboardCode.Right, KeyboardCode.Up, KeyboardCode.Left];

  // src/tedi/components/content/table/table.stories.tsx
  var import_react6 = __toESM(require_react_shim());

  // src/tedi/helpers/hooks/use-breakpoint.ts
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/lodash.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/isSymbol.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_baseGetTag.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_Symbol.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_root.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_freeGlobal.js
  init_define_import_meta_env();
  init_define_process_env();
  var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
  var freeGlobal_default = freeGlobal;

  // node_modules/lodash-es/_root.js
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal_default || freeSelf || Function("return this")();
  var root_default = root;

  // node_modules/lodash-es/_Symbol.js
  var Symbol2 = root_default.Symbol;
  var Symbol_default = Symbol2;

  // node_modules/lodash-es/_getRawTag.js
  init_define_import_meta_env();
  init_define_process_env();
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var nativeObjectToString = objectProto.toString;
  var symToStringTag = Symbol_default ? Symbol_default.toStringTag : void 0;
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
    try {
      value[symToStringTag] = void 0;
      var unmasked = true;
    } catch (e) {
    }
    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }
  var getRawTag_default = getRawTag;

  // node_modules/lodash-es/_objectToString.js
  init_define_import_meta_env();
  init_define_process_env();
  var objectProto2 = Object.prototype;
  var nativeObjectToString2 = objectProto2.toString;
  function objectToString(value) {
    return nativeObjectToString2.call(value);
  }
  var objectToString_default = objectToString;

  // node_modules/lodash-es/_baseGetTag.js
  var nullTag = "[object Null]";
  var undefinedTag = "[object Undefined]";
  var symToStringTag2 = Symbol_default ? Symbol_default.toStringTag : void 0;
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag2 && symToStringTag2 in Object(value) ? getRawTag_default(value) : objectToString_default(value);
  }
  var baseGetTag_default = baseGetTag;

  // node_modules/lodash-es/isObjectLike.js
  init_define_import_meta_env();
  init_define_process_env();
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  var isObjectLike_default = isObjectLike;

  // node_modules/lodash-es/isSymbol.js
  var symbolTag = "[object Symbol]";
  function isSymbol(value) {
    return typeof value == "symbol" || isObjectLike_default(value) && baseGetTag_default(value) == symbolTag;
  }
  var isSymbol_default = isSymbol;

  // node_modules/lodash-es/toNumber.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_baseTrim.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/_trimmedEndIndex.js
  init_define_import_meta_env();
  init_define_process_env();
  var reWhitespace = /\s/;
  function trimmedEndIndex(string) {
    var index = string.length;
    while (index-- && reWhitespace.test(string.charAt(index))) {
    }
    return index;
  }
  var trimmedEndIndex_default = trimmedEndIndex;

  // node_modules/lodash-es/_baseTrim.js
  var reTrimStart = /^\s+/;
  function baseTrim(string) {
    return string ? string.slice(0, trimmedEndIndex_default(string) + 1).replace(reTrimStart, "") : string;
  }
  var baseTrim_default = baseTrim;

  // node_modules/lodash-es/isObject.js
  init_define_import_meta_env();
  init_define_process_env();
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  var isObject_default = isObject;

  // node_modules/lodash-es/toNumber.js
  var NAN = 0 / 0;
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
  var reIsBinary = /^0b[01]+$/i;
  var reIsOctal = /^0o[0-7]+$/i;
  var freeParseInt = parseInt;
  function toNumber(value) {
    if (typeof value == "number") {
      return value;
    }
    if (isSymbol_default(value)) {
      return NAN;
    }
    if (isObject_default(value)) {
      var other = typeof value.valueOf == "function" ? value.valueOf() : value;
      value = isObject_default(other) ? other + "" : other;
    }
    if (typeof value != "string") {
      return value === 0 ? value : +value;
    }
    value = baseTrim_default(value);
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
  }
  var toNumber_default = toNumber;

  // node_modules/lodash-es/debounce.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/lodash-es/now.js
  init_define_import_meta_env();
  init_define_process_env();
  var now = function() {
    return root_default.Date.now();
  };
  var now_default = now;

  // node_modules/lodash-es/debounce.js
  var FUNC_ERROR_TEXT = "Expected a function";
  var nativeMax = Math.max;
  var nativeMin = Math.min;
  function debounce(func, wait, options) {
    var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
    if (typeof func != "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    wait = toNumber_default(wait) || 0;
    if (isObject_default(options)) {
      leading = !!options.leading;
      maxing = "maxWait" in options;
      maxWait = maxing ? nativeMax(toNumber_default(options.maxWait) || 0, wait) : maxWait;
      trailing = "trailing" in options ? !!options.trailing : trailing;
    }
    function invokeFunc(time) {
      var args = lastArgs, thisArg = lastThis;
      lastArgs = lastThis = void 0;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }
    function leadingEdge(time) {
      lastInvokeTime = time;
      timerId = setTimeout(timerExpired, wait);
      return leading ? invokeFunc(time) : result;
    }
    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
      return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
    }
    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
      return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    }
    function timerExpired() {
      var time = now_default();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      timerId = setTimeout(timerExpired, remainingWait(time));
    }
    function trailingEdge(time) {
      timerId = void 0;
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = void 0;
      return result;
    }
    function cancel() {
      if (timerId !== void 0) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = void 0;
    }
    function flush() {
      return timerId === void 0 ? result : trailingEdge(now_default());
    }
    function debounced() {
      var time = now_default(), isInvoking = shouldInvoke(time);
      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;
      if (isInvoking) {
        if (timerId === void 0) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          clearTimeout(timerId);
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === void 0) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }
  var debounce_default = debounce;

  // src/tedi/helpers/hooks/use-breakpoint.ts
  var import_react5 = __toESM(require_react_shim());
  var breakpoints = ["xs", "sm", "md", "lg", "xl", "xxl"];
  var BREAKPOINT_WIDTHS = {
    xs: "0",
    sm: "36rem",
    md: "48rem",
    lg: "62rem",
    xl: "75rem",
    xxl: "87.5rem"
  };
  var useBreakpoint = (defaultServerBreakpoint = "xs") => {
    const [breakpoint, setBreakpoint] = (0, import_react5.useState)(defaultServerBreakpoint);
    (0, import_react5.useLayoutEffect)(() => {
      const getBreakpoint = () => {
        if (window.matchMedia(`(min-width: ${BREAKPOINT_WIDTHS.xxl})`).matches) {
          return "xxl";
        } else if (window.matchMedia(`(min-width: ${BREAKPOINT_WIDTHS.xl})`).matches) {
          return "xl";
        } else if (window.matchMedia(`(min-width: ${BREAKPOINT_WIDTHS.lg})`).matches) {
          return "lg";
        } else if (window.matchMedia(`(min-width: ${BREAKPOINT_WIDTHS.md})`).matches) {
          return "md";
        } else if (window.matchMedia(`(min-width: ${BREAKPOINT_WIDTHS.sm})`).matches) {
          return "sm";
        } else {
          return "xs";
        }
      };
      const resizeEvent = debounce_default(() => {
        setBreakpoint(getBreakpoint());
      }, 20);
      setBreakpoint(getBreakpoint());
      window.addEventListener("resize", resizeEvent);
      return () => {
        resizeEvent.cancel();
        window.removeEventListener("resize", resizeEvent);
      };
    }, []);
    return breakpoint;
  };
  var isBreakpointBelow = (current, target) => {
    if (!current) return false;
    return breakpoints.indexOf(current) < breakpoints.indexOf(target);
  };

  // ds-shim:ds:Heading
  var ds_Heading_exports = {};
  __export(ds_Heading_exports, {
    default: () => ds_Heading_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Heading_exports, __toESM(require_ds_raw()));
  var g = window.Tedi;
  var ds_Heading_default = g["Heading"] !== void 0 ? g["Heading"] : g;

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

  // ds-shim:ds:Button
  var ds_Button_exports = {};
  __export(ds_Button_exports, {
    default: () => ds_Button_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Button_exports, __toESM(require_ds_raw()));
  var g3 = window.Tedi;
  var ds_Button_default = g3["Button"] !== void 0 ? g3["Button"] : g3;

  // ds-shim:ds:ClosingButton
  var ds_ClosingButton_exports = {};
  __export(ds_ClosingButton_exports, {
    default: () => ds_ClosingButton_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_ClosingButton_exports, __toESM(require_ds_raw()));
  var g4 = window.Tedi;
  var ds_ClosingButton_default = g4["ClosingButton"] !== void 0 ? g4["ClosingButton"] : g4;

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

  // ds-shim:ds:EmptyState
  var ds_EmptyState_exports = {};
  __export(ds_EmptyState_exports, {
    default: () => ds_EmptyState_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_EmptyState_exports, __toESM(require_ds_raw()));
  var g6 = window.Tedi;
  var ds_EmptyState_default = g6["EmptyState"] !== void 0 ? g6["EmptyState"] : g6;

  // ds-shim:ds:Checkbox
  var ds_Checkbox_exports = {};
  __export(ds_Checkbox_exports, {
    default: () => ds_Checkbox_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Checkbox_exports, __toESM(require_ds_raw()));
  var g7 = window.Tedi;
  var ds_Checkbox_default = g7["Checkbox"] !== void 0 ? g7["Checkbox"] : g7;

  // ds-shim:ds:DateField
  var ds_DateField_exports = {};
  __export(ds_DateField_exports, {
    default: () => ds_DateField_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_DateField_exports, __toESM(require_ds_raw()));
  var g8 = window.Tedi;
  var ds_DateField_default = g8["DateField"] !== void 0 ? g8["DateField"] : g8;

  // ds-shim:ds:TextField
  var ds_TextField_exports = {};
  __export(ds_TextField_exports, {
    default: () => ds_TextField_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_TextField_exports, __toESM(require_ds_raw()));
  var g9 = window.Tedi;
  var ds_TextField_default = g9["TextField"] !== void 0 ? g9["TextField"] : g9;

  // ds-shim:ds:TimeField
  var ds_TimeField_exports = {};
  __export(ds_TimeField_exports, {
    default: () => ds_TimeField_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_TimeField_exports, __toESM(require_ds_raw()));
  var g10 = window.Tedi;
  var ds_TimeField_default = g10["TimeField"] !== void 0 ? g10["TimeField"] : g10;

  // ds-shim:ds:VerticalSpacing
  var ds_VerticalSpacing_exports = {};
  __export(ds_VerticalSpacing_exports, {
    default: () => ds_VerticalSpacing_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_VerticalSpacing_exports, __toESM(require_ds_raw()));
  var g11 = window.Tedi;
  var ds_VerticalSpacing_default = g11["VerticalSpacing"] !== void 0 ? g11["VerticalSpacing"] : g11;

  // ds-shim:ds:Separator
  var ds_Separator_exports = {};
  __export(ds_Separator_exports, {
    default: () => ds_Separator_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Separator_exports, __toESM(require_ds_raw()));
  var g12 = window.Tedi;
  var ds_Separator_default = g12["Separator"] !== void 0 ? g12["Separator"] : g12;

  // ds-shim:ds:Alert
  var ds_Alert_exports = {};
  __export(ds_Alert_exports, {
    default: () => ds_Alert_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Alert_exports, __toESM(require_ds_raw()));
  var g13 = window.Tedi;
  var ds_Alert_default = g13["Alert"] !== void 0 ? g13["Alert"] : g13;

  // ds-shim:ds:Dropdown
  var ds_Dropdown_exports = {};
  __export(ds_Dropdown_exports, {
    default: () => ds_Dropdown_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Dropdown_exports, __toESM(require_ds_raw()));
  var g14 = window.Tedi;
  var ds_Dropdown_default = g14["Dropdown"] !== void 0 ? g14["Dropdown"] : g14;

  // ds-shim:ds:Popover
  var ds_Popover_exports = {};
  __export(ds_Popover_exports, {
    default: () => ds_Popover_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Popover_exports, __toESM(require_ds_raw()));
  var g15 = window.Tedi;
  var ds_Popover_default = g15["Popover"] !== void 0 ? g15["Popover"] : g15;

  // ds-shim:ds:Tooltip
  var ds_Tooltip_exports = {};
  __export(ds_Tooltip_exports, {
    default: () => ds_Tooltip_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Tooltip_exports, __toESM(require_ds_raw()));
  var g16 = window.Tedi;
  var ds_Tooltip_default = g16["Tooltip"] !== void 0 ? g16["Tooltip"] : g16;

  // ds-shim:ds:StatusBadge
  var ds_StatusBadge_exports = {};
  __export(ds_StatusBadge_exports, {
    default: () => ds_StatusBadge_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_StatusBadge_exports, __toESM(require_ds_raw()));
  var g17 = window.Tedi;
  var ds_StatusBadge_default = g17["StatusBadge"] !== void 0 ? g17["StatusBadge"] : g17;

  // ds-shim:ds:TextGroup
  var ds_TextGroup_exports = {};
  __export(ds_TextGroup_exports, {
    default: () => ds_TextGroup_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_TextGroup_exports, __toESM(require_ds_raw()));
  var g18 = window.Tedi;
  var ds_TextGroup_default = g18["TextGroup"] !== void 0 ? g18["TextGroup"] : g18;

  // ds-shim:ds:Truncate
  var ds_Truncate_exports = {};
  __export(ds_Truncate_exports, {
    default: () => ds_Truncate_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Truncate_exports, __toESM(require_ds_raw()));
  var g19 = window.Tedi;
  var ds_Truncate_default = g19["Truncate"] !== void 0 ? g19["Truncate"] : g19;

  // ds-shim:ds:Table
  var ds_Table_exports = {};
  __export(ds_Table_exports, {
    default: () => ds_Table_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Table_exports, __toESM(require_ds_raw()));
  var g20 = window.Tedi;
  var ds_Table_default = g20["Table"] !== void 0 ? g20["Table"] : g20;

  // src/tedi/components/content/table/table.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    component: ds_Table_exports.Table,
    title: "TEDI-Ready/Content/Table",
    parameters: {
      design: {
        type: "figma",
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.70?node-id=4514-63761&m=dev"
      }
    }
  };
  var table_stories_default = meta;
  var personSeed = [
    {
      name: "Anna Tamm",
      email: "anna.tamm@example.ee",
      role: "Engineer",
      location: "Tallinn",
      salary: 4200,
      status: "active"
    },
    {
      name: "Jüri Kask",
      email: "juri.kask@example.ee",
      role: "Designer",
      location: "Tartu",
      salary: 3800,
      status: "active"
    },
    {
      name: "Maria Saar",
      email: "maria.saar@example.ee",
      role: "Product",
      location: "Pärnu",
      salary: 4600,
      status: "active"
    },
    {
      name: "Mart Mets",
      email: "mart.mets@example.ee",
      role: "Engineer",
      location: "Tallinn",
      salary: 4100,
      status: "inactive"
    },
    { name: "Liis Lepp", email: "liis.lepp@example.ee", role: "Ops", location: "Narva", salary: 3600, status: "active" },
    {
      name: "Kadri Kask",
      email: "kadri.kask@example.ee",
      role: "Engineer",
      location: "Viljandi",
      salary: 4e3,
      status: "active"
    },
    {
      name: "Rain Roos",
      email: "rain.roos@example.ee",
      role: "Designer",
      location: "Rakvere",
      salary: 3900,
      status: "inactive"
    }
  ];
  var people = Array.from({ length: 28 }, (_, index) => {
    const seed = personSeed[index % personSeed.length];
    const round = Math.floor(index / personSeed.length);
    return {
      ...seed,
      id: String(index + 1),
      name: round === 0 ? seed.name : `${seed.name} ${round + 1}`
    };
  });
  var DEFAULT_PAGINATION = { pageSize: 10, pageSizeOptions: [10, 25, 50] };
  var SHOWCASE_PAGINATION_3 = { pageSize: 3, pageSizeOptions: [3, 10, 25, 50] };
  var SHOWCASE_PAGINATION_4 = { pageSize: 4, pageSizeOptions: [4, 10, 25, 50] };
  var personColumns = [
    { id: "name", header: "Name", accessorKey: "name" },
    { id: "email", header: "Email", accessorKey: "email" },
    { id: "role", header: "Role", accessorKey: "role" },
    { id: "location", header: "Location", accessorKey: "location" }
  ];
  var bookingDateRange = {
    from: new Date(2029, 2, 22),
    to: new Date(2029, 2, 29)
  };
  var bookings = Array.from({ length: 28 }, (_, index) => ({
    id: String(index + 1),
    dateRange: bookingDateRange,
    hour: "11:14",
    duration: "6 min",
    location: "Harjumaa"
  }));
  var dateRangeFormatter = new Intl.DateTimeFormat("et-EE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
  var formatDateRange = (range) => {
    if (!range?.from) return "";
    const from = dateRangeFormatter.format(range.from);
    return range.to ? `${from} – ${dateRangeFormatter.format(range.to)}` : from;
  };
  var doctorSeed = [
    { name: "Kalle Kask", specialty: "Dermatovenereoloog", experience: "4 a", location: "Tallinn" },
    { name: "Mari Maasikas", specialty: "Kopsuarst", experience: "4 a", location: "Tallinn" },
    { name: "Vello Vaarikas", specialty: "Kõrva-nina-kurguarst", experience: "4 a", location: "Tallinn" }
  ];
  var doctors = Array.from({ length: 28 }, (_, index) => ({
    ...doctorSeed[index % doctorSeed.length],
    id: String(index + 1)
  }));
  var editRowActionsStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
    width: "100%"
  };
  var EditableRowsContext = (0, import_react6.createContext)(null);
  function EditableRowsProvider({
    value,
    children
  }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableRowsContext.Provider, { value, children });
  }
  function useEditor() {
    const editor = (0, import_react6.useContext)(EditableRowsContext);
    if (!editor) throw new Error("EditableRowsContext missing — wrap the table in <EditableRowsProvider>.");
    return editor;
  }
  function useEditableRows(initial) {
    const [rows, setRows] = (0, import_react6.useState)(initial);
    const [editingId, setEditingId] = (0, import_react6.useState)(null);
    const [draft, setDraft] = (0, import_react6.useState)(null);
    const draftRef = (0, import_react6.useRef)(draft);
    draftRef.current = draft;
    const beginEdit = (0, import_react6.useCallback)((row) => {
      setEditingId(row.id);
      setDraft(row);
    }, []);
    const cancelEdit = (0, import_react6.useCallback)(() => {
      setEditingId(null);
      setDraft(null);
    }, []);
    const commitEdit = (0, import_react6.useCallback)(() => {
      const current = draftRef.current;
      if (!current) return;
      setRows((existing) => existing.map((row) => row.id === current.id ? current : row));
      setEditingId(null);
      setDraft(null);
    }, []);
    return { rows, editingId, draft, setDraft, beginEdit, cancelEdit, commitEdit };
  }
  function EditActionsCell({ row }) {
    const editor = useEditor();
    if (row.id === editor.editingId) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: editRowActionsStyle, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ClosingButton_exports.ClosingButton, { title: "Tühista", onClick: editor.cancelEdit }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "primary", size: "small", icon: "check", onClick: editor.commitEdit, children: "Kinnita" })
      ] });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: editRowActionsStyle, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "link", iconLeft: "edit", onClick: () => editor.beginEdit(row), children: "Muuda" }) });
  }
  function EditableTextCell({
    row,
    field,
    label
  }) {
    const editor = useEditor();
    const isEditing = row.id === editor.editingId && editor.draft;
    if (!isEditing) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: String(row[field] ?? "") });
    }
    const draftValue = String(editor.draft[field] ?? "");
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_TextField_exports.TextField,
      {
        id: `${row.id}-${field}`,
        name: field,
        label,
        hideLabel: true,
        value: draftValue,
        onChange: (next) => editor.setDraft((prev) => prev ? { ...prev, [field]: next } : prev)
      }
    );
  }
  function EditableTimeCell({
    row,
    field,
    label
  }) {
    const editor = useEditor();
    const isEditing = row.id === editor.editingId && editor.draft;
    if (!isEditing) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: String(row[field] ?? "") });
    }
    const draftValue = String(editor.draft[field] ?? "");
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_TimeField_exports.TimeField,
      {
        id: `${row.id}-${field}`,
        label,
        value: draftValue,
        inputProps: { hideLabel: true, name: field },
        onChange: (next) => editor.setDraft((prev) => prev ? { ...prev, [field]: next } : prev)
      }
    );
  }
  function EditableDateRangeCell({
    row,
    field,
    label
  }) {
    const editor = useEditor();
    const isEditing = row.id === editor.editingId && editor.draft;
    const value = row[field];
    if (!isEditing) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: formatDateRange(value) });
    }
    const draftValue = editor.draft[field];
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_DateField_exports.DateField,
      {
        id: `${row.id}-${field}`,
        mode: "range",
        label,
        inputProps: { hideLabel: true },
        selected: draftValue,
        onSelect: (next) => editor.setDraft(
          (prev) => prev ? { ...prev, [field]: next ?? { from: void 0 } } : prev
        )
      }
    );
  }
  var bookingShowcaseColumns = [
    {
      id: "dateRange",
      header: "Kuupäev",
      accessorKey: "dateRange",
      cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableDateRangeCell, { row: row.original, field: "dateRange", label: "Kuupäev" })
    },
    {
      id: "hour",
      header: "Kellaaeg",
      accessorKey: "hour",
      cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableTimeCell, { row: row.original, field: "hour", label: "Kellaaeg" })
    },
    {
      id: "duration",
      header: "Kestus",
      accessorKey: "duration",
      cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableTextCell, { row: row.original, field: "duration", label: "Kestus" })
    },
    {
      id: "location",
      header: "Asukoht",
      accessorKey: "location",
      cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableTextCell, { row: row.original, field: "location", label: "Asukoht" })
    },
    {
      id: "actions",
      header: "",
      size: 1,
      cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditActionsCell, { row: row.original })
    }
  ];
  var Default = {
    render: function Default2() {
      const editor = useEditableRows(bookings);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableRowsProvider, { value: editor, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Table_exports.Table,
        {
          id: "tedi-table-default",
          autoResetPageIndex: false,
          data: editor.rows,
          columns: bookingShowcaseColumns,
          pagination: SHOWCASE_PAGINATION_3
        }
      ) });
    }
  };
  var Sizes = {
    render: function Sizes2() {
      const defaultEditor = useEditableRows(bookings);
      const smallEditor = useEditableRows(bookings);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Heading_exports.Heading, { element: "h3", children: "Default" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableRowsProvider, { value: defaultEditor, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Table_exports.Table,
          {
            id: "tedi-table-sizes-default",
            autoResetPageIndex: false,
            data: defaultEditor.rows,
            columns: bookingShowcaseColumns,
            pagination: SHOWCASE_PAGINATION_3
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Heading_exports.Heading, { element: "h3", children: "Small" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableRowsProvider, { value: smallEditor, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Table_exports.Table,
          {
            id: "tedi-table-sizes-small",
            autoResetPageIndex: false,
            data: smallEditor.rows,
            columns: bookingShowcaseColumns,
            size: "small",
            pagination: SHOWCASE_PAGINATION_3
          }
        ) })
      ] });
    }
  };
  var simplePeopleColumns = [
    {
      id: "name",
      header: "Isik",
      accessorKey: "name",
      cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "link", children: row.original.name })
    },
    { id: "age", header: "Vanus", accessorKey: "age" },
    { id: "visits", header: "Külastuste arv", accessorKey: "visits" },
    {
      id: "status",
      header: "Tõendi staatus",
      accessorKey: "status",
      cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { color: certStatusColor[row.original.status], children: row.original.status })
    }
  ];
  var simpleDoctorColumns = [
    {
      id: "name",
      header: "Arst",
      cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: row.original.name }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { color: "var(--general-text-secondary)" }, children: row.original.specialty })
      ] })
    },
    {
      id: "experience",
      header: "Tööstaaž",
      accessorKey: "experience",
      cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableTextCell, { row: row.original, field: "experience", label: "Tööstaaž" })
    },
    {
      id: "location",
      header: "Asukoht",
      accessorKey: "location",
      cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableTextCell, { row: row.original, field: "location", label: "Asukoht" })
    },
    {
      id: "actions",
      header: "",
      size: 1,
      cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditActionsCell, { row: row.original })
    }
  ];
  var Simple = {
    render: function Simple2() {
      const bookingEditor = useEditableRows(bookings);
      const doctorEditor = useEditableRows(doctors);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableRowsProvider, { value: bookingEditor, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Table_exports.Table,
          {
            id: "tedi-table-simple-bookings",
            autoResetPageIndex: false,
            data: bookingEditor.rows,
            columns: bookingShowcaseColumns,
            pagination: SHOWCASE_PAGINATION_3
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Table_exports.Table,
          {
            id: "tedi-table-simple-people",
            data: filterablePeople,
            columns: simplePeopleColumns,
            pagination: SHOWCASE_PAGINATION_4
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableRowsProvider, { value: doctorEditor, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Table_exports.Table,
          {
            id: "tedi-table-simple-doctors",
            autoResetPageIndex: false,
            data: doctorEditor.rows,
            columns: simpleDoctorColumns,
            pagination: SHOWCASE_PAGINATION_3
          }
        ) })
      ] });
    }
  };
  var LONG_DESCRIPTION = "Pellentesque mattis augue at mi tristique dignissim. Aliquam lobortis hendrerit augue, sit amet pellentesque nibh ultricies eu. Nullam ut nibh non lectus pulvinar volutpat.";
  var LONG_TEXT_MAX_LENGTH = 70;
  var baseDoctorWithDescriptionColumns = [
    {
      id: "name",
      header: "Arst",
      cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: row.original.name }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { color: "var(--general-text-secondary)" }, children: row.original.specialty })
      ] })
    },
    {
      id: "location",
      header: "Asukoht",
      accessorKey: "location",
      cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableTextCell, { row: row.original, field: "location", label: "Asukoht" })
    },
    {
      id: "actions",
      header: "",
      size: 1,
      cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditActionsCell, { row: row.original })
    }
  ];
  var baseDoctorActionsColumns = () => [
    {
      id: "name",
      header: "Arst",
      cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: row.original.name }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { color: "var(--general-text-secondary)" }, children: row.original.specialty })
      ] })
    },
    { id: "experience", header: "Tööstaaž", accessorKey: "experience" },
    { id: "location", header: "Asukoht", accessorKey: "location" }
  ];
  var rowActionsCellStyle = {
    display: "inline-flex",
    gap: 8,
    justifyContent: "flex-end",
    width: "100%"
  };
  var customDoctorSeed = [
    {
      name: "Kalle Kask",
      specialty: "Dermatovenereoloog",
      experience: "4 a",
      location: "Tallinn",
      note: "Esineb maksehäireid",
      noteColor: "warning"
    },
    {
      name: "Mari Maasikas",
      specialty: "Kopsuarst",
      experience: "4 a",
      location: "Tallinn"
    },
    {
      name: "Vello Vaarikas",
      specialty: "Kõrva-nina-kurguarst",
      experience: "4 a",
      location: "Tallinn",
      note: "Arve tasumata",
      noteColor: "danger"
    }
  ];
  var customDoctors = Array.from({ length: 28 }, (_, index) => ({
    ...customDoctorSeed[index % customDoctorSeed.length],
    id: String(index + 1)
  }));
  var avatarStyle = {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "var(--general-surface-secondary)",
    color: "var(--general-text-secondary)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "var(--heading-weight)",
    fontSize: "var(--body-small-regular-size)",
    flexShrink: 0
  };
  var initialsOf = (name) => name.split(" ").map((part) => part[0]).filter(Boolean).slice(0, 2).join("");
  var mergedCellsColumns = [
    {
      id: "dateRange",
      accessorKey: "dateRange",
      size: 240,
      header: ({ column }) => {
        const sorted = column.getIsSorted();
        const iconName = sorted === "asc" ? "arrow_upward" : sorted === "desc" ? "arrow_downward" : "unfold_more";
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { display: "inline-flex", alignItems: "center", gap: 4 }, children: [
          "Kuupäev",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Table_exports.Table.HeaderButton,
            {
              icon: iconName,
              selected: !!sorted,
              "aria-label": "Sort by Kuupäev",
              onClick: column.getToggleSortingHandler()
            }
          )
        ] });
      },
      cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableDateRangeCell, { row: row.original, field: "dateRange", label: "Kuupäev" })
    },
    {
      id: "aeg",
      header: "Aeg",
      columns: [
        {
          id: "hour",
          header: "Kellaaeg",
          accessorKey: "hour",
          cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableTimeCell, { row: row.original, field: "hour", label: "Kellaaeg" })
        },
        {
          id: "duration",
          header: "Kestus",
          accessorKey: "duration",
          cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableTextCell, { row: row.original, field: "duration", label: "Kestus" })
        }
      ]
    },
    {
      id: "location",
      header: "Asukoht",
      accessorKey: "location",
      cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableTextCell, { row: row.original, field: "location", label: "Asukoht" })
    },
    {
      id: "actions",
      header: "",
      size: 1,
      cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditActionsCell, { row: row.original })
    }
  ];
  var MergedCells = {
    render: function MergedCells2() {
      const editor = useEditableRows(bookings);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableRowsProvider, { value: editor, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Table_exports.Table,
        {
          id: "tedi-table-merged",
          verticalBorders: true,
          autoResetPageIndex: false,
          data: editor.rows,
          columns: mergedCellsColumns,
          pagination: DEFAULT_PAGINATION
        }
      ) });
    }
  };
  var GroupedRows = {
    render: function GroupedRows2() {
      const patientRows = (0, import_react6.useMemo)(
        () => [
          { id: "1", date: "2026-05-20", doctor: "Dr Tamm", procedure: "Consultation" },
          { id: "2", date: "2026-05-20", doctor: "Dr Tamm", procedure: "Follow-up" },
          { id: "3", date: "2026-05-21", doctor: "Dr Kask", procedure: "X-ray" },
          { id: "4", date: "2026-05-21", doctor: "Dr Kask", procedure: "Consultation" }
        ],
        []
      );
      const columns = (0, import_react6.useMemo)(
        () => [
          {
            id: "date",
            header: "Date",
            accessorKey: "date",
            meta: { rowSpan: (0, ds_Table_exports.groupRowSpan)(patientRows, (row) => row.date), vAlign: "top" }
          },
          {
            id: "doctor",
            header: "Doctor",
            accessorKey: "doctor",
            meta: { rowSpan: (0, ds_Table_exports.groupRowSpan)(patientRows, (row) => `${row.date}|${row.doctor}`), vAlign: "top" }
          },
          { id: "procedure", header: "Procedure", accessorKey: "procedure" }
        ],
        [patientRows]
      );
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Table_exports.Table, { id: "tedi-table-grouped", data: patientRows, columns, verticalBorders: true });
    }
  };
  var HeaderWithInfo = ({ label, info, align }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "span",
    {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 4,
        justifyContent: align === "right" ? "flex-end" : "flex-start"
      },
      children: [
        label,
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Tooltip_exports.Tooltip, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tooltip_exports.Tooltip.Trigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InfoButton_default, { isSmall: true, "aria-label": `${label} info` }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Tooltip_exports.Tooltip.Content, { children: info })
        ] })
      ]
    }
  );
  var serviceSeed = [
    { service: "Vaimse tervise nõustamisteenus", doctor: "Pille Paunküla", price: 45.5, location: "Tallinn" },
    { service: "Hematoloogia", doctor: "Kalle Kuusik", price: 89.99, location: "Tallinn" },
    { service: "Ortopeedia", doctor: "Märt Männimets", price: 110, location: "Tallinn" },
    { service: "Dermatoloogia", doctor: "Anna Tamm", price: 75, location: "Tartu" },
    { service: "Kardioloogia", doctor: "Mati Saar", price: 120.5, location: "Pärnu" },
    { service: "Neuroloogia", doctor: "Liis Põld", price: 95.25, location: "Tallinn" },
    { service: "Pediaatria", doctor: "Jaan Lepp", price: 60, location: "Tartu" }
  ];
  var services = Array.from({ length: 28 }, (_, index) => ({
    id: String(index + 1),
    ...serviceSeed[index % serviceSeed.length]
  }));
  var priceFormatter = new Intl.NumberFormat("et-EE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  var VerticalBorders = {
    render: () => {
      const columns = [
        {
          id: "service",
          accessorKey: "service",
          header: ({ column }) => {
            const sorted = column.getIsSorted();
            const iconName = sorted === "asc" ? "arrow_upward" : sorted === "desc" ? "arrow_downward" : "unfold_more";
            return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { display: "inline-flex", alignItems: "center", gap: 4 }, children: [
              "Teenus",
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                ds_Table_exports.Table.HeaderButton,
                {
                  icon: iconName,
                  selected: !!sorted,
                  "aria-label": "Sorteeri Teenus järgi",
                  onClick: column.getToggleSortingHandler()
                }
              )
            ] });
          }
        },
        {
          id: "doctor",
          accessorKey: "doctor",
          header: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderWithInfo, { label: "Arst", info: "Vastutav raviarst, kes teostab teenuse." })
        },
        {
          id: "price",
          accessorKey: "price",
          header: "Maksumus",
          meta: { align: "right" },
          cell: ({ row }) => `${priceFormatter.format(row.original.price)} €/h`
        },
        {
          id: "location",
          accessorKey: "location",
          header: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeaderWithInfo, { label: "Asukoht", info: "Vastuvõtu toimumiskoht." })
        }
      ];
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Table_exports.Table,
        {
          id: "tedi-table-vb",
          data: services,
          columns,
          verticalBorders: true,
          pagination: DEFAULT_PAGINATION
        }
      );
    }
  };
  var NoOutsideBorder = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_Table_exports.Table,
      {
        id: "tedi-table-borderless",
        data: people,
        columns: personColumns,
        borderless: true,
        pagination: DEFAULT_PAGINATION
      }
    )
  };
  var EditableValues = {
    render: function EditableValues2() {
      const editor = useEditableRows(bookings);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableRowsProvider, { value: editor, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Table_exports.Table,
        {
          id: "tedi-table-editable",
          autoResetPageIndex: false,
          data: editor.rows,
          columns: bookingShowcaseColumns,
          pagination: DEFAULT_PAGINATION
        }
      ) });
    }
  };
  var Sortable = {
    render: function Sortable2() {
      const columns = (0, import_react6.useMemo)(
        () => [
          { id: "name", header: "Name", accessorKey: "name" },
          { id: "role", header: "Role", accessorKey: "role" },
          { id: "location", header: "Location", accessorKey: "location" },
          { id: "salary", header: "Salary", accessorKey: "salary" }
        ].map((col) => ({
          ...col,
          meta: { label: col.header },
          header: ({ column }) => {
            const sorted = column.getIsSorted();
            const iconName = sorted === "asc" ? "arrow_upward" : sorted === "desc" ? "arrow_downward" : "unfold_more";
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              ds_Table_exports.Table.HeaderButton,
              {
                icon: iconName,
                selected: !!sorted,
                "aria-label": `Sort by ${col.header}`,
                onClick: column.getToggleSortingHandler(),
                children: col.header
              }
            );
          }
        })),
        []
      );
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Table_exports.Table, { id: "tedi-table-sortable", data: people, columns, pagination: DEFAULT_PAGINATION });
    }
  };
  var certStatusColor = {
    Kehtiv: "success",
    Aegumas: "warning",
    Kehtetu: "danger",
    Aegunud: "neutral"
  };
  var CERT_STATUSES = ["Kehtiv", "Kehtetu", "Aegumas", "Aegunud"];
  var filterablePeopleSeed = [
    { name: "Mari Maasikas", jobStart: "21.08.2019", age: 25, visits: 6, status: "Kehtiv" },
    { name: "Kalle Kapsapea", jobStart: "14.03.2020", age: 35, visits: 13, status: "Kehtiv" },
    { name: "Mart Mägi", jobStart: "02.01.2018", age: 43, visits: 26, status: "Kehtiv" },
    { name: "Meelis Mets", jobStart: "10.07.2021", age: 64, visits: 26, status: "Kehtetu" },
    { name: "Kadri Kask", jobStart: "30.11.2022", age: 32, visits: 4, status: "Aegumas" },
    { name: "Liis Linn", jobStart: "21.08.2019", age: 21, visits: 13, status: "Aegunud" }
  ];
  var filterablePeople = Array.from({ length: 28 }, (_, index) => {
    const seed = filterablePeopleSeed[index % filterablePeopleSeed.length];
    const round = Math.floor(index / filterablePeopleSeed.length);
    return {
      ...seed,
      id: String(index + 1),
      name: round === 0 ? seed.name : `${seed.name} ${round + 1}`
    };
  });
  var SortLabel = ({
    column,
    children,
    ariaLabel
  }) => {
    const sorted = column.getIsSorted();
    const iconName = sorted === "asc" ? "arrow_upward" : sorted === "desc" ? "arrow_downward" : "unfold_more";
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_Table_exports.Table.HeaderButton,
      {
        icon: iconName,
        selected: !!sorted,
        "aria-label": ariaLabel,
        onClick: column.getToggleSortingHandler(),
        children
      }
    );
  };
  var TextFilterPopover = ({
    value,
    onApply,
    label
  }) => {
    const [draft, setDraft] = (0, import_react6.useState)(value);
    const [open, setOpen] = (0, import_react6.useState)(false);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_exports.Popover, { open, onToggle: setOpen, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_exports.PopoverTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Table_exports.Table.HeaderButton, { icon: "filter_alt", selected: !!value, filled: !!value, "aria-label": `Filtreeri ${label}` }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_exports.PopoverContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0.5, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_TextField_exports.TextField,
          {
            id: `filter-${label}`,
            name: `filter-${label}`,
            label,
            hideLabel: true,
            value: draft,
            onChange: setDraft
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Button_default,
            {
              visualType: "secondary",
              size: "small",
              onClick: () => {
                setDraft("");
                onApply(void 0);
                setOpen(false);
              },
              children: "Tühista"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Button_default,
            {
              visualType: "primary",
              size: "small",
              onClick: () => {
                onApply(draft || void 0);
                setOpen(false);
              },
              children: "Filtreeri"
            }
          )
        ] })
      ] }) })
    ] });
  };
  var dateRangeStringToDate = (value) => {
    if (!value) return void 0;
    const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value);
    if (!match) return void 0;
    const [, dd, mm, yyyy] = match;
    return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  };
  var dateToDateRangeString = (date) => {
    if (!date) return void 0;
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    return `${dd}.${mm}.${date.getFullYear()}`;
  };
  var DateRangeFilterPopover = ({
    value,
    onApply,
    label
  }) => {
    const [range, setRange] = (0, import_react6.useState)(() => {
      const from = dateRangeStringToDate(value?.from);
      const to = dateRangeStringToDate(value?.to);
      return from || to ? { from, to } : void 0;
    });
    const [open, setOpen] = (0, import_react6.useState)(false);
    const active = Boolean(value?.from || value?.to);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_exports.Popover, { open, onToggle: setOpen, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_exports.PopoverTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Table_exports.Table.HeaderButton, { icon: "filter_alt", selected: active, filled: active, "aria-label": `Filtreeri ${label}` }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_exports.PopoverContent, { width: "medium", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0.5, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_DateField_exports.DateField,
          {
            id: "filter-date-range",
            mode: "range",
            label,
            selected: range,
            placeholder: "pp.kk.aaaa - pp.kk.aaaa",
            onSelect: (next) => setRange(next)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Button_default,
            {
              visualType: "secondary",
              size: "small",
              onClick: () => {
                setRange(void 0);
                onApply(void 0);
                setOpen(false);
              },
              children: "Tühista"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Button_default,
            {
              visualType: "primary",
              size: "small",
              onClick: () => {
                const fromStr = dateToDateRangeString(range?.from);
                const toStr = dateToDateRangeString(range?.to);
                onApply(fromStr || toStr ? { from: fromStr, to: toStr } : void 0);
                setOpen(false);
              },
              children: "Filtreeri"
            }
          )
        ] })
      ] }) })
    ] });
  };
  var MultiSelectFilterPopover = ({
    value,
    onApply,
    label
  }) => {
    const [draft, setDraft] = (0, import_react6.useState)(value ?? []);
    const [open, setOpen] = (0, import_react6.useState)(false);
    const active = (value?.length ?? 0) > 0;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_exports.Popover, { open, onToggle: setOpen, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_exports.PopoverTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Table_exports.Table.HeaderButton, { icon: "filter_alt", selected: active, filled: active, "aria-label": `Filtreeri ${label}` }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_exports.PopoverContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0.5, children: [
        CERT_STATUSES.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Checkbox_exports.Checkbox,
          {
            id: `filter-status-${option}`,
            name: "filter-status",
            value: option,
            label: option,
            checked: draft.includes(option),
            onChange: (_val, checked) => setDraft((prev) => checked ? [...prev, option] : prev.filter((v) => v !== option))
          },
          option
        )),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Button_default,
            {
              visualType: "secondary",
              size: "small",
              onClick: () => {
                setDraft([]);
                onApply(void 0);
                setOpen(false);
              },
              children: "Tühista"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_Button_default,
            {
              visualType: "primary",
              size: "small",
              onClick: () => {
                onApply(draft.length ? draft : void 0);
                setOpen(false);
              },
              children: "Filtreeri"
            }
          )
        ] })
      ] }) })
    ] });
  };
  var parseDate = (value) => {
    const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value);
    if (!match) return null;
    const [, dd, mm, yyyy] = match;
    return Date.UTC(Number(yyyy), Number(mm) - 1, Number(dd));
  };
  var Filters = {
    render: function Filters2() {
      const columns = (0, import_react6.useMemo)(
        () => [
          {
            id: "name",
            accessorKey: "name",
            filterFn: "includesString",
            header: ({ column }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { display: "inline-flex", alignItems: "center", gap: 4 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortLabel, { column, ariaLabel: "Sorteeri Nimi", children: "Nimi" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                TextFilterPopover,
                {
                  value: column.getFilterValue() ?? "",
                  onApply: (next) => column.setFilterValue(next),
                  label: "Nimi"
                }
              )
            ] })
          },
          {
            id: "jobStart",
            accessorKey: "jobStart",
            filterFn: (row, id, value) => {
              if (!value?.from && !value?.to) return true;
              const cell = parseDate(row.getValue(id));
              if (cell === null) return false;
              const fromTs = value.from ? parseDate(value.from) : null;
              const toTs = value.to ? parseDate(value.to) : null;
              if (fromTs !== null && cell < fromTs) return false;
              if (toTs !== null && cell > toTs) return false;
              return true;
            },
            header: ({ column }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { display: "inline-flex", alignItems: "center", gap: 4 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortLabel, { column, ariaLabel: "Sorteeri Töö algus", children: "Töö algus" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                DateRangeFilterPopover,
                {
                  value: column.getFilterValue(),
                  onApply: (next) => column.setFilterValue(next),
                  label: "Töö algus"
                }
              )
            ] })
          },
          {
            id: "age",
            accessorKey: "age",
            header: ({ column }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortLabel, { column, ariaLabel: "Sorteeri Vanus", children: "Vanus" })
          },
          {
            id: "visits",
            accessorKey: "visits",
            header: ({ column }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortLabel, { column, ariaLabel: "Sorteeri Külastuste arv", children: "Külastuste arv" })
          },
          {
            id: "status",
            accessorKey: "status",
            filterFn: (row, id, value) => !value?.length || value.includes(row.getValue(id)),
            header: ({ column }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { display: "inline-flex", alignItems: "center", gap: 4 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortLabel, { column, ariaLabel: "Sorteeri Tõendi staatus", children: "Tõendi staatus" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                MultiSelectFilterPopover,
                {
                  value: column.getFilterValue(),
                  onApply: (next) => column.setFilterValue(next),
                  label: "Tõendi staatus"
                }
              )
            ] }),
            cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { color: certStatusColor[row.original.status], children: row.original.status })
          }
        ],
        []
      );
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Table_exports.Table,
        {
          id: "tedi-table-filters",
          data: filterablePeople,
          columns,
          pagination: DEFAULT_PAGINATION
        }
      );
    }
  };
  var collapsibleSeed = [
    { name: "Mari Maasikas", age: 25, visits: 6, status: "Kehtiv" },
    { name: "Kalle Kapsapea", age: 35, visits: 13, status: "Kehtiv" },
    { name: "Mart Mägi", age: 43, visits: 26, status: "Kehtiv" },
    { name: "Meelis Mets", age: 64, visits: 26, status: "Kehtetu" },
    { name: "Kadri Kask", age: 32, visits: 4, status: "Aegumas" },
    { name: "Liis Linn", age: 21, visits: 13, status: "Aegunud" }
  ];
  var collapsiblePeople = Array.from({ length: 28 }, (_, index) => {
    const seed = collapsibleSeed[index % collapsibleSeed.length];
    const round = Math.floor(index / collapsibleSeed.length);
    const name = round === 0 ? seed.name : `${seed.name} ${round + 1}`;
    const id = String(index + 1);
    const subRows = index % 2 === 0 ? [
      { id: `${id}-1`, name, age: seed.age, visits: Math.floor(seed.visits / 2), status: "Kehtiv" },
      { id: `${id}-2`, name, age: seed.age, visits: seed.visits - Math.floor(seed.visits / 2), status: "Kehtetu" }
    ] : void 0;
    return { ...seed, id, name, ...subRows ? { subRows } : {} };
  });
  var CollapsibleRows = {
    render: () => {
      const columns = [
        { id: "name", header: "Isik", accessorKey: "name" },
        { id: "age", header: "Vanus", accessorKey: "age" },
        { id: "visits", header: "Külastuste arv", accessorKey: "visits" },
        {
          id: "status",
          header: "Tõendi staatus",
          accessorKey: "status",
          cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { color: certStatusColor[row.original.status], children: row.original.status })
        }
      ];
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Table_exports.Table,
        {
          id: "tedi-table-collapse",
          data: collapsiblePeople,
          columns,
          getSubRows: (row) => row.subRows,
          pagination: DEFAULT_PAGINATION
        }
      );
    }
  };
  var CollapsibleRowsRowTrigger = {
    render: () => {
      const columns = [
        { id: "name", header: "Isik", accessorKey: "name" },
        { id: "age", header: "Vanus", accessorKey: "age" },
        { id: "visits", header: "Külastuste arv", accessorKey: "visits" },
        {
          id: "status",
          header: "Tõendi staatus",
          accessorKey: "status",
          cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { color: certStatusColor[row.original.status], children: row.original.status })
        }
      ];
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Table_exports.Table,
        {
          id: "tedi-table-collapse-row-trigger",
          data: collapsiblePeople,
          columns,
          getSubRows: (row) => row.subRows,
          expandTrigger: "row",
          pagination: DEFAULT_PAGINATION
        }
      );
    }
  };
  var RESPONSIVE_SECONDARY_COLUMNS = [
    { id: "email", header: "E-post" },
    { id: "role", header: "Roll" },
    { id: "location", header: "Asukoht" }
  ];
  var SelectableRows = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_Table_exports.Table,
      {
        id: "tedi-table-selectable",
        data: people,
        columns: personColumns,
        enableRowSelection: true,
        pagination: DEFAULT_PAGINATION
      }
    )
  };
  var SingleSelectRows = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_Table_exports.Table,
      {
        id: "tedi-table-single-select",
        data: people,
        columns: personColumns,
        enableRowSelection: true,
        selectionMode: "single",
        pagination: DEFAULT_PAGINATION
      }
    )
  };
  var ClickableRows = {
    render: function ClickableRows2() {
      const [active, setActive] = (0, import_react6.useState)(null);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { className: "margin-bottom-10", children: active ? `You clicked ${active.name}` : "Click a row to select it." }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Table_exports.Table,
          {
            id: "tedi-table-clickable",
            data: people,
            columns: personColumns,
            onRowClick: (row) => setActive({ id: row.id, name: row.original.name }),
            activeRowId: active?.id,
            pagination: DEFAULT_PAGINATION
          }
        )
      ] });
    }
  };
  var Striped = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_Table_exports.Table,
      {
        id: "tedi-table-striped",
        data: people,
        columns: personColumns,
        striped: true,
        pagination: DEFAULT_PAGINATION
      }
    )
  };
  var stickyDoctorSeed = [
    {
      name: "Kalle Kask",
      personalId: "49504080456",
      specialty: "Dermatovenereoloog",
      experience: "4 a",
      location: "Tallinn"
    },
    {
      name: "Mari Maasikas",
      personalId: "39404080456",
      specialty: "Kopsuarst",
      experience: "4 a",
      location: "Tallinn"
    },
    {
      name: "Vello Vaarikas",
      personalId: "39403080865",
      specialty: "Kõrva-nina-kurguarst",
      experience: "4 a",
      location: "Tallinn"
    }
  ];
  var stickyDoctors = Array.from({ length: 28 }, (_, index) => ({
    ...stickyDoctorSeed[index % stickyDoctorSeed.length],
    id: String(index + 1)
  }));
  var stickyDoctorColumns = [
    {
      id: "name",
      header: "Arst",
      accessorKey: "name",
      size: 280,
      cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { display: "inline-flex", alignItems: "center", gap: 16 }, children: [
        row.original.name,
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { color: "var(--general-text-tertiary)" }, children: row.original.personalId })
      ] })
    },
    { id: "specialty", header: "Eriala", accessorKey: "specialty", size: 240 },
    { id: "experience", header: "Tööstaaž", accessorKey: "experience", size: 200 },
    { id: "location", header: "Asukoht", accessorKey: "location", size: 200 },
    {
      id: "actions",
      header: "",
      size: 1,
      cell: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: rowActionsCellStyle, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "link", iconLeft: "edit", children: "Muuda" }) })
    }
  ];
  var StickyFirstColumn = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { maxWidth: 600 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_Table_exports.Table,
      {
        id: "tedi-table-sticky",
        data: stickyDoctors,
        columns: stickyDoctorColumns,
        stickyFirstColumn: true,
        pagination: DEFAULT_PAGINATION
      }
    ) })
  };
  var StickyHeader = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Table_exports.Table, { id: "tedi-table-sticky-header", data: people, columns: personColumns, stickyHeader: true, maxHeight: 240 })
  };
  var StickyHeaderAndFirstColumn = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { maxWidth: 600 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_Table_exports.Table,
      {
        id: "tedi-table-sticky-both",
        data: stickyDoctors,
        columns: stickyDoctorColumns,
        stickyHeader: true,
        stickyFirstColumn: true,
        maxHeight: 280
      }
    ) })
  };
  var WithEmptyState = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_Table_exports.Table,
      {
        id: "tedi-table-empty-state",
        data: [],
        columns: personColumns,
        emptyState: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_EmptyState_exports.EmptyState, { type: "inside", icon: { name: "spa", color: "tertiary" }, children: "No results found" })
      }
    )
  };
  var longTextsColumns = [
    baseDoctorWithDescriptionColumns[0],
    {
      id: "description",
      header: "Kirjeldus",
      size: 480,
      cell: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Truncate_exports.Truncate, { maxLength: LONG_TEXT_MAX_LENGTH, children: LONG_DESCRIPTION })
    },
    baseDoctorWithDescriptionColumns[1],
    baseDoctorWithDescriptionColumns[2]
  ];
  var LongTexts = {
    render: function LongTexts2() {
      const editor = useEditableRows(doctors);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableRowsProvider, { value: editor, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Table_exports.Table,
        {
          id: "tedi-table-long-texts",
          autoResetPageIndex: false,
          data: editor.rows,
          columns: longTextsColumns,
          pagination: SHOWCASE_PAGINATION_3
        }
      ) });
    }
  };
  var Actions = {
    render: function Actions2() {
      const columns = (0, import_react6.useMemo)(
        () => [
          ...baseDoctorActionsColumns(),
          {
            id: "actions",
            header: "",
            size: 1,
            cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: rowActionsCellStyle, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.Dropdown, { placement: "bottom-end", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.DropdownTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                ds_Button_default,
                {
                  visualType: "secondary",
                  size: "small",
                  icon: "more_vert",
                  "aria-label": `Avalda ${row.original.name} valikud`,
                  onClick: () => void 0,
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {})
                }
              ) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Dropdown_exports.DropdownContent, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.DropdownItem, { onClick: () => void 0, children: "Muuda" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.DropdownItem, { onClick: () => void 0, children: "Dubleeri" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.DropdownItem, { onClick: () => void 0, children: "Saada e-mail" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Dropdown_exports.DropdownItem, { onClick: () => void 0, children: "Kustuta" })
              ] })
            ] }) })
          }
        ],
        []
      );
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Table_exports.Table, { id: "tedi-table-actions", data: doctors, columns, pagination: SHOWCASE_PAGINATION_3 });
    }
  };
  var Custom = {
    render: function Custom2() {
      const columns = (0, import_react6.useMemo)(
        () => [
          {
            id: "name",
            header: "Arst",
            cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true", style: avatarStyle, children: initialsOf(row.original.name) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: row.original.name }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { color: "var(--general-text-secondary)" }, children: row.original.specialty })
              ] })
            ] })
          },
          {
            id: "note",
            header: "",
            cell: ({ row }) => row.original.note && row.original.noteColor ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Alert_exports.Alert, { type: row.original.noteColor, size: "small", role: "status", children: row.original.note }) : null
          },
          { id: "location", header: "Asukoht", accessorKey: "location" },
          {
            id: "actions",
            header: "",
            size: 1,
            cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: rowActionsCellStyle, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Popover_exports.Popover, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_exports.PopoverTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_InfoButton_default, { isSmall: true, "aria-label": `${row.original.name} eelvaade` }) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Popover_exports.PopoverContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0.5, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontWeight: "var(--heading-weight)" }, children: row.original.name }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { color: "var(--general-text-secondary)" }, children: [
                  row.original.specialty,
                  " · ",
                  row.original.location
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_default, { color: "primary", axis: "horizontal", spacing: 0.5 }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", size: "small", icon: "edit", onClick: () => void 0, children: "Muuda" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "primary", size: "small", icon: "open_in_new", onClick: () => void 0, children: "Ava profiil" })
                ] })
              ] }) })
            ] }) })
          }
        ],
        []
      );
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Table_exports.Table,
        {
          id: "tedi-table-custom",
          data: customDoctors,
          columns,
          pagination: SHOWCASE_PAGINATION_3
        }
      ) });
    }
  };
  var WithFooter = {
    render: () => {
      const columns = [
        { id: "name", header: "Name", accessorKey: "name", footer: `${people.length} people` },
        { id: "role", header: "Role", accessorKey: "role" },
        { id: "location", header: "Location", accessorKey: "location" },
        {
          id: "salary",
          accessorKey: "salary",
          header: "Salary (€)",
          meta: { align: "right" },
          cell: (info) => info.getValue().toLocaleString("et-EE"),
          footer: (info) => {
            const total = info.table.getFilteredRowModel().rows.reduce((sum, row) => sum + row.original.salary, 0);
            return `Total €${total.toLocaleString("et-EE")}`;
          }
        }
      ];
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Table_exports.Table, { id: "tedi-table-footer", data: people, columns, pagination: DEFAULT_PAGINATION });
    }
  };
  var WithColumnsMenu = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Table_exports.Table, { id: "tedi-table-visibility", data: people, columns: personColumns, pagination: DEFAULT_PAGINATION, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Table_exports.Table.Toolbar, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Table_exports.Table.ColumnsMenu, {}) }) })
  };
  var ReorderableRows = {
    render: function DraggableRows() {
      const [rows, setRows] = (0, import_react6.useState)(() => people.slice(0, 8));
      const columns = (0, import_react6.useMemo)(
        () => [
          { id: "name", header: "Name", accessorKey: "name" },
          { id: "role", header: "Role", accessorKey: "role" },
          { id: "location", header: "Location", accessorKey: "location" }
        ],
        []
      );
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Alert_exports.Alert, { type: "info", role: "status", title: "Row reordering", icon: "lightbulb", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Text_exports.Text, { children: [
          "Reorder by mouse (grab the ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { children: "≡" }),
          " handle) or ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "keyboard" }),
          ": Tab to a handle, press ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { children: "Space" }),
          "/",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { children: "Enter" }),
          " to pick the row up, then",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { children: "↑" }),
          "/",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { children: "↓" }),
          " to move, ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { children: "Space" }),
          "/",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { children: "Enter" }),
          " to drop, or ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { children: "Esc" }),
          " to cancel. Each move emits",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { children: "onRowDrop" }),
          " with source indices — the parent applies it (e.g. with",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { children: "arrayMove" }),
          ") and passes the new data back. Moves are announced to screen readers via a live region."
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Table_exports.Table,
          {
            id: "tedi-table-row-drag",
            data: rows,
            columns,
            reorderableRows: true,
            onRowDrop: ({ fromIndex, toIndex }) => setRows((current) => arrayMove(current, fromIndex, toIndex))
          }
        )
      ] });
    }
  };
  var ReorderableColumns = {
    render: function DraggableColumns() {
      const columns = (0, import_react6.useMemo)(
        () => [
          { id: "name", header: "Name", accessorKey: "name" },
          { id: "email", header: "Email", accessorKey: "email" },
          { id: "role", header: "Role", accessorKey: "role" },
          { id: "location", header: "Location", accessorKey: "location" }
        ],
        []
      );
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Alert_exports.Alert, { type: "info", role: "status", title: "Column reordering", icon: "lightbulb", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Text_exports.Text, { children: [
          "Reorder by mouse (reorder a header by its ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { children: "≡" }),
          " handle) or ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "keyboard" }),
          ": Tab to a handle, ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { children: "Space" }),
          "/",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { children: "Enter" }),
          " to pick up, then",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { children: "←" }),
          "/",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { children: "→" }),
          " to move, ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { children: "Space" }),
          "/",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { children: "Enter" }),
          " to drop, or ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { children: "Esc" }),
          " to cancel. The Table owns the wiring and pushes the new order into TanStack's ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { children: "state.columnOrder" }),
          " (announced to screen readers) — combine with ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { children: "persist" }),
          " to keep the order across refreshes."
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Table_exports.Table, { id: "tedi-table-column-drag", data: people.slice(0, 6), columns, reorderableColumns: true })
      ] });
    }
  };
  var ReorderableColumnsStickyHeader = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Alert_exports.Alert, { type: "info", role: "status", title: "Reorder columns + sticky header", icon: "lightbulb", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Text_exports.Text, { children: [
        "Reorder columns by dragging a header handle while the header stays pinned during vertical scroll. The two features are independent — drag rewrites ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { children: "state.columnOrder" }),
        "; the sticky header is pure CSS."
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Table_exports.Table,
        {
          id: "tedi-table-column-drag-sticky",
          data: people,
          columns: personColumns,
          reorderableColumns: true,
          stickyHeader: true,
          maxHeight: 280,
          pagination: { pageSize: 10 }
        }
      )
    ] })
  };
  var ServerSide = {
    render: function ServerSide2() {
      const [pagination, setPagination] = (0, import_react6.useState)({ pageIndex: 0, pageSize: 5 });
      const [sorting, setSorting] = (0, import_react6.useState)([]);
      const sortedData = (0, import_react6.useMemo)(() => {
        if (sorting.length === 0) return people;
        const { id, desc } = sorting[0];
        const direction = desc ? -1 : 1;
        return [...people].sort((a, b) => {
          const av = a[id];
          const bv = b[id];
          if (av === bv) return 0;
          return av > bv ? direction : -direction;
        });
      }, [sorting]);
      const pageRows = (0, import_react6.useMemo)(
        () => sortedData.slice(pagination.pageIndex * pagination.pageSize, (pagination.pageIndex + 1) * pagination.pageSize),
        [sortedData, pagination]
      );
      const sortableColumns = (0, import_react6.useMemo)(
        () => personColumns.map((col) => ({
          ...col,
          header: ({ column }) => {
            const sorted = column.getIsSorted();
            const iconName = sorted === "asc" ? "arrow_upward" : sorted === "desc" ? "arrow_downward" : "unfold_more";
            return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { display: "inline-flex", alignItems: "center", gap: 4 }, children: [
              col.header,
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                ds_Table_exports.Table.HeaderButton,
                {
                  icon: iconName,
                  selected: !!sorted,
                  "aria-label": `Sort by ${col.header}`,
                  onClick: column.getToggleSortingHandler()
                }
              )
            ] });
          }
        })),
        []
      );
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 1, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Alert_exports.Alert, { type: "info", role: "status", title: "Server-side mode", icon: "lightbulb", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Text_exports.Text, { children: [
            "This story simulates a server-paginated, server-sorted table. The parent owns the current page slice and the sort state; the Table is told ",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { children: "manualPagination" }),
            " +",
            " ",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { children: "manualSorting" }),
            " so it does not re-slice or re-sort its",
            " ",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { children: "data" }),
            " locally."
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { modifiers: "bold", children: "Wiring it up in your app" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "pre",
            {
              style: {
                margin: 0,
                padding: "var(--tedi-dimensions-12)",
                background: "var(--general-surface-secondary)",
                fontSize: "var(--body-small-regular-size)",
                whiteSpace: "pre-wrap"
              },
              children: `const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
const [sorting, setSorting] = useState([]);

// Refetch from the server whenever pagination / sort changes.
const { data: page, total } = useServerQuery({ pagination, sorting });

<Table
  data={page.rows}                    // current page only
  columns={columns}
  manualPagination                    // disables in-memory pagination
  manualSorting                       // disables in-memory sort
  pageCount={Math.ceil(total / pagination.pageSize)}
  rowCount={total}                    // shown in the "X results" footer
  state={{ pagination, sorting }}     // controlled
  onStateChange={(next) => {
    if (next.pagination) setPagination(next.pagination);
    if (next.sorting) setSorting(next.sorting);
  }}
  pagination
/>`
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Separator_default, { axis: "horizontal", spacing: 1, color: "secondary" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Text_exports.Text, { modifiers: "small", color: "secondary", children: [
            "Tip: ",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { children: "manualFiltering" }),
            " works the same way for column filters when you have them."
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ds_Table_exports.Table,
          {
            id: "tedi-table-server-side",
            data: pageRows,
            columns: sortableColumns,
            manualPagination: true,
            manualSorting: true,
            pageCount: Math.ceil(people.length / pagination.pageSize),
            rowCount: people.length,
            state: { pagination, sorting },
            onStateChange: (next) => {
              if (next.pagination) setPagination(next.pagination);
              if (next.sorting !== void 0) setSorting(next.sorting);
            },
            pagination: { pageSize: 5, pageSizeOptions: [5, 10, 25] }
          }
        )
      ] });
    }
  };
  var Responsive = {
    render: function Responsive2() {
      const breakpoint = useBreakpoint();
      const belowMd = isBreakpointBelow(breakpoint, "md");
      const columns = (0, import_react6.useMemo)(
        () => [
          { id: "name", header: "Nimi", accessorKey: "name" },
          { id: "email", header: "E-post", accessorKey: "email" },
          { id: "role", header: "Roll", accessorKey: "role" },
          { id: "location", header: "Asukoht", accessorKey: "location" },
          { id: "salary", header: "Palk", accessorKey: "salary" }
        ],
        []
      );
      const columnVisibility = (0, import_react6.useMemo)(
        () => RESPONSIVE_SECONDARY_COLUMNS.reduce((acc, col) => {
          acc[col.id] = !belowMd;
          return acc;
        }, {}),
        [belowMd]
      );
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Table_exports.Table,
        {
          id: "tedi-table-responsive",
          data: people,
          columns,
          state: { columnVisibility },
          getRowCanExpand: () => belowMd,
          renderSubComponent: belowMd ? (row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0.5, children: RESPONSIVE_SECONDARY_COLUMNS.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ds_TextGroup_exports.TextGroup,
            {
              type: "horizontal",
              labelWidth: "6rem",
              label: col.header,
              value: String(row.original[col.id])
            },
            col.id
          )) }) : void 0,
          pagination: DEFAULT_PAGINATION
        }
      );
    }
  };

  // .design-sync/.cache/previews/Table.tsx
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
  var Default3 = (
    /* Default */
    compose(table_stories_exports, "Default")
  );
  var Sizes3 = (
    /* Sizes */
    compose(table_stories_exports, "Sizes")
  );
  var Simple3 = (
    /* Simple */
    compose(table_stories_exports, "Simple")
  );
  var MergedCells3 = (
    /* Merged Cells */
    compose(table_stories_exports, "MergedCells")
  );
  var GroupedRows3 = (
    /* Grouped Rows */
    compose(table_stories_exports, "GroupedRows")
  );
  var VerticalBorders2 = (
    /* Vertical Borders */
    compose(table_stories_exports, "VerticalBorders")
  );
  var NoOutsideBorder2 = (
    /* No Outside Border */
    compose(table_stories_exports, "NoOutsideBorder")
  );
  var EditableValues3 = (
    /* Editable Values */
    compose(table_stories_exports, "EditableValues")
  );
  var Sortable3 = (
    /* Sortable */
    compose(table_stories_exports, "Sortable")
  );
  var Filters3 = (
    /* Filters */
    compose(table_stories_exports, "Filters")
  );
  var CollapsibleRows2 = (
    /* Collapsible Rows */
    compose(table_stories_exports, "CollapsibleRows")
  );
  var CollapsibleRowsRowTrigger2 = (
    /* Collapsible Rows Row Trigger */
    compose(table_stories_exports, "CollapsibleRowsRowTrigger")
  );
  var SelectableRows2 = (
    /* Selectable Rows */
    compose(table_stories_exports, "SelectableRows")
  );
  var SingleSelectRows2 = (
    /* Single Select Rows */
    compose(table_stories_exports, "SingleSelectRows")
  );
  var ClickableRows3 = (
    /* Clickable Rows */
    compose(table_stories_exports, "ClickableRows")
  );
  var Striped2 = (
    /* Striped */
    compose(table_stories_exports, "Striped")
  );
  var StickyFirstColumn2 = (
    /* Sticky First Column */
    compose(table_stories_exports, "StickyFirstColumn")
  );
  var StickyHeader2 = (
    /* Sticky Header */
    compose(table_stories_exports, "StickyHeader")
  );
  var StickyHeaderAndFirstColumn2 = (
    /* Sticky Header And First Column */
    compose(table_stories_exports, "StickyHeaderAndFirstColumn")
  );
  var WithEmptyState2 = (
    /* With Empty State */
    compose(table_stories_exports, "WithEmptyState")
  );
  var LongTexts3 = (
    /* Long Texts */
    compose(table_stories_exports, "LongTexts")
  );
  var Actions3 = (
    /* Actions */
    compose(table_stories_exports, "Actions")
  );
  var Custom3 = (
    /* Custom */
    compose(table_stories_exports, "Custom")
  );
  var WithFooter2 = (
    /* With Footer */
    compose(table_stories_exports, "WithFooter")
  );
  var WithColumnsMenu2 = (
    /* With Columns Menu */
    compose(table_stories_exports, "WithColumnsMenu")
  );
  var ReorderableRows2 = (
    /* Reorderable Rows */
    compose(table_stories_exports, "ReorderableRows")
  );
  var ReorderableColumns2 = (
    /* Reorderable Columns */
    compose(table_stories_exports, "ReorderableColumns")
  );
  var ReorderableColumnsStickyHeader2 = (
    /* Reorderable Columns Sticky Header */
    compose(table_stories_exports, "ReorderableColumnsStickyHeader")
  );
  var ServerSide3 = (
    /* Server Side */
    compose(table_stories_exports, "ServerSide")
  );
  var Responsive3 = (
    /* Responsive */
    compose(table_stories_exports, "Responsive")
  );
  return __toCommonJS(Table_exports);
})();
/*! Bundled license information:

lodash-es/lodash.js:
  (**
   * @license
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="es" --repo lodash/lodash#4.18.1 -o ./`
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
