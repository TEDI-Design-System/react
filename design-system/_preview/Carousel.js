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

  // .design-sync/.cache/previews/Carousel.tsx
  var Carousel_exports = {};
  __export(Carousel_exports, {
    BoundedOverlayNavigation: () => BoundedOverlayNavigation2,
    CenteredBottomPaginationHasDots: () => CenteredBottomPaginationHasDots2,
    CenteredBottomPaginationHasNumbers: () => CenteredBottomPaginationHasNumbers2,
    CenteredHasDots: () => CenteredHasDots2,
    CenteredHasNumbers: () => CenteredHasNumbers2,
    CombinationsTopNavigationBottomDots: () => CombinationsTopNavigationBottomDots2,
    Default: () => Default2,
    Examples: () => Examples2,
    Faded: () => Faded2,
    FadedBothSides: () => FadedBothSides2,
    Peeking: () => Peeking2,
    PeekingBothSides: () => PeekingBothSides2,
    SeparatedBottomPaginationHasDots: () => SeparatedBottomPaginationHasDots2,
    SeparatedBottomPaginationHasNumbers: () => SeparatedBottomPaginationHasNumbers2,
    TopPaginationArrowsOnly: () => TopPaginationArrowsOnly2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/content/carousel/carousel.stories.tsx
  var carousel_stories_exports = {};
  __export(carousel_stories_exports, {
    BoundedOverlayNavigation: () => BoundedOverlayNavigation,
    CenteredBottomPaginationHasDots: () => CenteredBottomPaginationHasDots,
    CenteredBottomPaginationHasNumbers: () => CenteredBottomPaginationHasNumbers,
    CenteredHasDots: () => CenteredHasDots,
    CenteredHasNumbers: () => CenteredHasNumbers,
    CombinationsTopNavigationBottomDots: () => CombinationsTopNavigationBottomDots,
    Default: () => Default,
    Examples: () => Examples,
    Faded: () => Faded,
    FadedBothSides: () => FadedBothSides,
    Peeking: () => Peeking,
    PeekingBothSides: () => PeekingBothSides,
    SeparatedBottomPaginationHasDots: () => SeparatedBottomPaginationHasDots,
    SeparatedBottomPaginationHasNumbers: () => SeparatedBottomPaginationHasNumbers,
    TopPaginationArrowsOnly: () => TopPaginationArrowsOnly,
    default: () => carousel_stories_default
  });
  init_define_import_meta_env();
  init_define_process_env();

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

  // ds-shim:ds:FloatingButton
  var ds_FloatingButton_exports = {};
  __export(ds_FloatingButton_exports, {
    default: () => ds_FloatingButton_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_FloatingButton_exports, __toESM(require_ds_raw()));
  var g3 = window.Tedi;
  var ds_FloatingButton_default = g3["FloatingButton"] !== void 0 ? g3["FloatingButton"] : g3;

  // ds-shim:ds:Card
  var ds_Card_exports = {};
  __export(ds_Card_exports, {
    default: () => ds_Card_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Card_exports, __toESM(require_ds_raw()));
  var g4 = window.Tedi;
  var ds_Card_default = g4["Card"] !== void 0 ? g4["Card"] : g4;

  // ds-shim:ds:HideAt
  var ds_HideAt_exports = {};
  __export(ds_HideAt_exports, {
    default: () => ds_HideAt_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_HideAt_exports, __toESM(require_ds_raw()));
  var g5 = window.Tedi;
  var ds_HideAt_default = g5["HideAt"] !== void 0 ? g5["HideAt"] : g5;

  // ds-shim:ds:ShowAt
  var ds_ShowAt_exports = {};
  __export(ds_ShowAt_exports, {
    default: () => ds_ShowAt_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_ShowAt_exports, __toESM(require_ds_raw()));
  var g6 = window.Tedi;
  var ds_ShowAt_default = g6["ShowAt"] !== void 0 ? g6["ShowAt"] : g6;

  // ds-shim:ds:VerticalSpacing
  var ds_VerticalSpacing_exports = {};
  __export(ds_VerticalSpacing_exports, {
    default: () => ds_VerticalSpacing_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_VerticalSpacing_exports, __toESM(require_ds_raw()));
  var g7 = window.Tedi;
  var ds_VerticalSpacing_default = g7["VerticalSpacing"] !== void 0 ? g7["VerticalSpacing"] : g7;

  // ds-shim:ds:StretchContent
  var ds_StretchContent_exports = {};
  __export(ds_StretchContent_exports, {
    default: () => ds_StretchContent_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_StretchContent_exports, __toESM(require_ds_raw()));
  var g8 = window.Tedi;
  var ds_StretchContent_default = g8["StretchContent"] !== void 0 ? g8["StretchContent"] : g8;

  // ds-shim:ds:Link
  var ds_Link_exports = {};
  __export(ds_Link_exports, {
    default: () => ds_Link_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Link_exports, __toESM(require_ds_raw()));
  var g9 = window.Tedi;
  var ds_Link_default = g9["Link"] !== void 0 ? g9["Link"] : g9;

  // ds-shim:ds:StatusBadge
  var ds_StatusBadge_exports = {};
  __export(ds_StatusBadge_exports, {
    default: () => ds_StatusBadge_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_StatusBadge_exports, __toESM(require_ds_raw()));
  var g10 = window.Tedi;
  var ds_StatusBadge_default = g10["StatusBadge"] !== void 0 ? g10["StatusBadge"] : g10;

  // ds-shim:ds:Carousel
  var ds_Carousel_exports = {};
  __export(ds_Carousel_exports, {
    default: () => ds_Carousel_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Carousel_exports, __toESM(require_ds_raw()));
  var g11 = window.Tedi;
  var ds_Carousel_default = g11["Carousel"] !== void 0 ? g11["Carousel"] : g11;

  // src/tedi/components/content/carousel/carousel.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    component: ds_Carousel_exports.Carousel,
    title: "TEDI-Ready/Content/Carousel",
    subcomponents: {
      "Carousel.Content": ds_Carousel_exports.Carousel.Content,
      "Carousel.Navigation": ds_Carousel_exports.Carousel.Navigation,
      "Carousel.Indicators": ds_Carousel_exports.Carousel.Indicators
    },
    parameters: {
      status: {
        type: [{ name: "breakpointSupport", url: "?path=/docs/helpers-usebreakpointprops--usebreakpointprops" }]
      },
      design: {
        type: "figma",
        url: "https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.20.28?node-id=26296-151359&m=dev"
      }
    }
  };
  var carousel_stories_default = meta;
  var RESPONSIVE_SLIDES = { xs: 1, sm: 2, md: 2.5, lg: 3, xl: 3.5, xxl: 4 };
  var DemoSlide = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Card_exports.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Card_exports.Card.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        minHeight: "8rem"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "spa", size: 36, color: "tertiary" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: "secondary", element: "span", children: "Asenda oma sisuga" })
      ]
    }
  ) }) });
  var slides = (count) => Array.from({ length: count }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoSlide, {}, i));
  var NEWS = [
    {
      id: 1,
      image: "https://picsum.photos/seed/tedi-news-1/480/240",
      category: "Tervis",
      title: "Uued digiretsepti võimalused patsientidele",
      excerpt: "Alates sügisest saab retsepte pikendada otse patsiendiportaalis ilma vastuvõtuta."
    },
    {
      id: 2,
      image: "https://picsum.photos/seed/tedi-news-2/480/240",
      category: "Teenused",
      title: "Perearstikeskused laiendavad lahtiolekuaegu",
      excerpt: "Õhtused ja nädalavahetuse vastuvõtud muutuvad kättesaadavamaks kogu Eestis."
    },
    {
      id: 3,
      image: "https://picsum.photos/seed/tedi-news-3/480/240",
      category: "Uuringud",
      title: "Ennetav tervisekontroll annab varase hoiatuse",
      excerpt: "Personaalsed soovitused aitavad märgata riske enne, kui need probleemiks muutuvad."
    },
    {
      id: 4,
      image: "https://picsum.photos/seed/tedi-news-4/480/240",
      category: "Vaktsineerimine",
      title: "Sügisene gripihooaeg läheneb",
      excerpt: "Vaktsineerima saab registreeruda nii perearsti kui ka apteegi kaudu."
    },
    {
      id: 5,
      image: "https://picsum.photos/seed/tedi-news-5/480/240",
      category: "Tervis",
      title: "Vaimse tervise tugi muutub paindlikumaks",
      excerpt: "Kaugnõustamine võimaldab abi saada ka väljaspool suuremaid keskusi."
    }
  ];
  var NewsCard = ({ image, category, title, excerpt }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Card_exports.Card, { padding: 0, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "img",
      {
        src: image,
        alt: "",
        style: {
          display: "block",
          width: "100%",
          height: 140,
          objectFit: "cover",
          borderTopLeftRadius: "var(--card-radius-rounded)",
          borderTopRightRadius: "var(--card-radius-rounded)"
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Card_exports.Card.Content, { padding: 1, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0.25, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "p", modifiers: "small", color: "brand", children: category }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "p", modifiers: "bold", children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "p", modifiers: "small", color: "secondary", children: excerpt })
    ] }) })
  ] });
  var HERO = [
    {
      id: 1,
      image: "https://picsum.photos/seed/tedi-hero-1/1200/480",
      title: "Sinu terviseandmed ühes kohas",
      text: "Vaata oma retsepte, saatekirju ja uuringute tulemusi mugavalt patsiendiportaalis."
    },
    {
      id: 2,
      image: "https://picsum.photos/seed/tedi-hero-2/1200/480",
      title: "Broneeri vastuvõtt mõne klikiga",
      text: "Leia sobiv aeg perearsti või eriarsti juurde ja kinnita see kohe."
    },
    {
      id: 3,
      image: "https://picsum.photos/seed/tedi-hero-3/1200/480",
      title: "Ennetus algab teadlikkusest",
      text: "Personaalsed soovitused aitavad sul oma tervise eest paremini hoolt kanda."
    }
  ];
  var HeroSlide = ({ image, title, text }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "relative", flex: 1, minHeight: 280, overflow: "hidden", borderRadius: 8 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "img",
      {
        src: image,
        alt: "",
        style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgb(0 0 0 / 65%), rgb(0 0 0 / 0%) 60%)"
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        style: {
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: 4,
          minHeight: 280,
          padding: "1.5rem"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "h3", modifiers: "h2", color: "white", children: title }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { color: "white", children: text })
        ]
      }
    )
  ] });
  var MAP_ITEMS = [
    {
      id: 1,
      image: "https://picsum.photos/seed/tedi-map-1/320/200?grayscale",
      title: "Ajalooline kaart 1939",
      place: "Tallinn"
    },
    { id: 2, image: "https://picsum.photos/seed/tedi-map-2/320/200?grayscale", title: "Katastrikaart", place: "Tartu" },
    { id: 3, image: "https://picsum.photos/seed/tedi-map-3/320/200?grayscale", title: "Reljeefikaart", place: "Pärnu" },
    { id: 4, image: "https://picsum.photos/seed/tedi-map-4/320/200?grayscale", title: "Ortofoto 2024", place: "Narva" },
    {
      id: 5,
      image: "https://picsum.photos/seed/tedi-map-5/320/200?grayscale",
      title: "Mullastiku kaart",
      place: "Viljandi"
    },
    {
      id: 6,
      image: "https://picsum.photos/seed/tedi-map-6/320/200?grayscale",
      title: "Ajalooline kaart 1900",
      place: "Rakvere"
    },
    {
      id: 7,
      image: "https://picsum.photos/seed/tedi-map-7/320/200?grayscale",
      title: "Hübriidkaart",
      place: "Kuressaare"
    },
    { id: 8, image: "https://picsum.photos/seed/tedi-map-8/320/200?grayscale", title: "Põhikaart", place: "Haapsalu" }
  ];
  var MapCard = ({ image, title, place }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Card_exports.Card, { padding: 0, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "img",
      {
        src: image,
        alt: "",
        style: {
          display: "block",
          width: "100%",
          height: 88,
          objectFit: "cover",
          borderTopLeftRadius: "var(--card-radius-rounded)",
          borderTopRightRadius: "var(--card-radius-rounded)"
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Card_exports.Card.Content, { padding: 0.75, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "p", modifiers: ["small", "bold"], children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { display: "flex", alignItems: "center", gap: 4 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: "location_on", size: 16, color: "secondary" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "span", modifiers: "small", color: "secondary", children: place })
      ] })
    ] })
  ] });
  var EVENTS = [
    {
      id: 1,
      image: "https://picsum.photos/seed/tedi-event-1/600/360",
      badge: "Tervisepäev",
      title: "Kogukonna tervisepäev",
      by: "Korraldab Tartu LV"
    },
    {
      id: 2,
      image: "https://picsum.photos/seed/tedi-event-2/600/360",
      badge: "Sport",
      title: "Autovaba päev",
      by: "Korraldab Tallinn"
    },
    {
      id: 3,
      image: "https://picsum.photos/seed/tedi-event-3/600/360",
      badge: "Ennetus",
      title: "Vaktsineerimise nädal",
      by: "Korraldab Terviseamet"
    },
    {
      id: 4,
      image: "https://picsum.photos/seed/tedi-event-4/600/360",
      badge: "Perele",
      title: "Perepäev pargis",
      by: "Korraldab Pärnu LV"
    }
  ];
  var EventCard = ({ image, badge, title, by }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { position: "relative", flex: 1, minHeight: 180, overflow: "hidden", borderRadius: 8 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "img",
      {
        src: image,
        alt: "",
        style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgb(0 0 0 / 70%), rgb(0 0 0 / 0%) 65%)"
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        style: {
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: 180,
          padding: "1rem",
          gap: 8
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StatusBadge_exports.StatusBadge, { color: "accent", children: badge }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "p", modifiers: "bold", color: "white", children: title }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "p", modifiers: "small", color: "white", children: by })
          ] })
        ]
      }
    )
  ] });
  var SERVICES = [
    { id: 1, icon: "prescriptions", title: "Retseptid", text: "Vaata ja pikenda oma kehtivaid retsepte." },
    { id: 2, icon: "vaccines", title: "Vaktsineerimised", text: "Immuniseerimiskava ja varasemad vaktsiinid." },
    { id: 3, icon: "calendar_month", title: "Vastuvõtud", text: "Broneeri ja halda oma vastuvõtuaegu." },
    { id: 4, icon: "lab_panel", title: "Uuringud", text: "Laboritulemused ja saatekirjad ühes kohas." }
  ];
  var ServiceCard = ({ icon, title, text }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Card_exports.Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Card_exports.Card.Content, { style: { display: "flex", flexDirection: "column", height: "100%" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 0.5, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Icon_exports.Icon, { name: icon, size: 36, color: "brand" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "p", modifiers: "bold", children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "p", modifiers: "small", color: "secondary", children: text })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { marginTop: "auto" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Link_exports.Link, { href: "#", iconRight: "arrow_forward", children: "Loe edasi" }) })
  ] }) });
  var Default = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel.Header, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "h2", modifiers: "h1", children: "Pealkiri" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Navigation, {})
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Content, { slidesPerView: RESPONSIVE_SLIDES, children: slides(5) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Footer, { style: { justifyContent: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Indicators, {}) })
    ] })
  };
  var TopPaginationArrowsOnly = {
    name: "Top pagination - arrows only",
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel.Header, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "h2", modifiers: "h1", children: "Pealkiri" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Navigation, {})
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Content, { slidesPerView: RESPONSIVE_SLIDES, children: slides(5) })
    ] })
  };
  var SeparatedBottomPaginationHasDots = {
    name: "Separated bottom pagination - has dots",
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Header, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "h2", modifiers: "h1", children: "Pealkiri" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Content, { slidesPerView: RESPONSIVE_SLIDES, children: slides(5) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel.Footer, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HideAt_exports.HideAt, { md: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Indicators, { variant: "numbers" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ShowAt_exports.ShowAt, { md: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Indicators, {}) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Navigation, {})
      ] })
    ] })
  };
  var SeparatedBottomPaginationHasNumbers = {
    name: "Separated bottom pagination - has numbers",
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Header, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "h2", modifiers: "h1", children: "Pealkiri" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Content, { slidesPerView: RESPONSIVE_SLIDES, children: slides(10) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel.Footer, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Indicators, { variant: "numbers" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Navigation, {})
      ] })
    ] })
  };
  var CenteredBottomPaginationHasDots = {
    name: "Centered bottom pagination - has dots",
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Header, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "h2", modifiers: "h1", children: "Pealkiri" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Content, { slidesPerView: RESPONSIVE_SLIDES, children: slides(6) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel.Footer, { style: { justifyContent: "center" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HideAt_exports.HideAt, { md: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Indicators, { variant: "numbers", withArrows: true }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ShowAt_exports.ShowAt, { md: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Indicators, { withArrows: true }) })
      ] })
    ] })
  };
  var CenteredBottomPaginationHasNumbers = {
    name: "Centered bottom pagination - has numbers",
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Header, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "h2", modifiers: "h1", children: "Pealkiri" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Content, { slidesPerView: RESPONSIVE_SLIDES, children: slides(6) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Footer, { style: { justifyContent: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Indicators, { variant: "numbers", withArrows: true }) })
    ] })
  };
  var CombinationsTopNavigationBottomDots = {
    name: "Combinations - top navigation, bottom dots",
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel.Header, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "h2", modifiers: "h1", children: "Pealkiri" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Navigation, {})
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Content, { slidesPerView: RESPONSIVE_SLIDES, children: slides(6) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel.Footer, { style: { justifyContent: "center" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HideAt_exports.HideAt, { md: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Indicators, { variant: "numbers" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ShowAt_exports.ShowAt, { md: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Indicators, {}) })
      ] })
    ] })
  };
  var CenteredHasDots = {
    name: "Centered - has dots",
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { maxWidth: 400 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Header, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "h2", modifiers: "h1", children: "Pealkiri" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Content, { children: slides(3) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel.Footer, { style: { justifyContent: "center" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HideAt_exports.HideAt, { md: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Indicators, { variant: "numbers", withArrows: true }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ShowAt_exports.ShowAt, { md: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Indicators, { withArrows: true }) })
      ] })
    ] }) })
  };
  var CenteredHasNumbers = {
    name: "Centered - has numbers",
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { maxWidth: 400 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Header, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "h2", modifiers: "h1", children: "Pealkiri" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Content, { children: slides(10) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Footer, { style: { justifyContent: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Indicators, { variant: "numbers", withArrows: true }) })
    ] }) })
  };
  var Faded = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel.Header, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "h2", modifiers: "h1", children: "Pealkiri" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Navigation, {})
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Content, { slidesPerView: RESPONSIVE_SLIDES, fade: true, children: slides(6) })
    ] })
  };
  var FadedBothSides = {
    name: "Faded - both sides",
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel.Header, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "h2", modifiers: "h1", children: "Pealkiri" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Navigation, {})
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Content, { slidesPerView: { xs: 1.3, sm: 2.4, lg: 4.4 }, centered: true, fade: "both", children: slides(8) })
    ] })
  };
  var Peeking = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel.Header, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "h2", modifiers: "h1", children: "Pealkiri" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Navigation, {})
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Content, { slidesPerView: { xs: 1.15, sm: 2.25, lg: 3.25 }, children: slides(8) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel.Footer, { style: { justifyContent: "center" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HideAt_exports.HideAt, { md: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Indicators, { variant: "numbers" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ShowAt_exports.ShowAt, { md: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Indicators, {}) })
      ] })
    ] })
  };
  var PeekingBothSides = {
    name: "Peeking - both sides (centered)",
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel.Header, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "h2", modifiers: "h1", children: "Pealkiri" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Navigation, {})
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Content, { slidesPerView: { xs: 1.3, sm: 2.4, lg: 3.4 }, centered: true, children: slides(8) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel.Footer, { style: { justifyContent: "center" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HideAt_exports.HideAt, { md: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Indicators, { variant: "numbers" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ShowAt_exports.ShowAt, { md: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Indicators, {}) })
      ] })
    ] })
  };
  var BoundedOverlayNavigation = {
    name: "Bounded - overlay arrows (no loop)",
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Content, { slidesPerView: { xs: 2, sm: 3, md: 4, lg: 6 }, gap: 0.5, loop: false, children: MAP_ITEMS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapCard, { ...item }, item.id)) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ds_Carousel_exports.Carousel.Navigation,
        {
          overlay: true,
          renderButton: ({ buttonProps }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_FloatingButton_exports.FloatingButton, { ...buttonProps, position: "static", visualType: "secondary" })
        }
      )
    ] })
  };
  var Examples = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { size: 4, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel.Header, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "h2", modifiers: "h1", children: "Uudised" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Navigation, {})
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Content, { slidesPerView: { xs: 1, sm: 2, lg: 3 }, children: NEWS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsCard, { ...item }, item.id)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel.Footer, { style: { justifyContent: "center" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HideAt_exports.HideAt, { md: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Indicators, { variant: "numbers" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ShowAt_exports.ShowAt, { md: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Indicators, {}) })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel.Header, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "h2", modifiers: "h1", children: "Sündmused" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Navigation, {})
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Content, { slidesPerView: { xs: 1.2, sm: 2, md: 3 }, children: EVENTS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCard, { ...item }, item.id)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Footer, { style: { justifyContent: "center" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Indicators, { variant: "numbers" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel.Header, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Text_exports.Text, { element: "h2", modifiers: "h1", children: "Teenused" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Navigation, {})
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Content, { slidesPerView: { xs: 1, sm: 2, lg: 4 }, children: SERVICES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_StretchContent_exports.StretchContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceCard, { ...item }) }, item.id)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel.Footer, { style: { justifyContent: "center" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HideAt_exports.HideAt, { md: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Indicators, { variant: "numbers" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ShowAt_exports.ShowAt, { md: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Indicators, {}) })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Content, { slidesPerView: 1, children: HERO.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroSlide, { ...item }, item.id)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_Carousel_exports.Carousel.Footer, { style: { justifyContent: "center" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_HideAt_exports.HideAt, { md: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Indicators, { variant: "numbers", withArrows: true }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_ShowAt_exports.ShowAt, { md: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Carousel_exports.Carousel.Indicators, { withArrows: true }) })
        ] })
      ] })
    ] })
  };

  // .design-sync/.cache/previews/Carousel.tsx
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
    compose(carousel_stories_exports, "Default")
  );
  var TopPaginationArrowsOnly2 = (
    /* Top pagination - arrows only */
    compose(carousel_stories_exports, "TopPaginationArrowsOnly")
  );
  var SeparatedBottomPaginationHasDots2 = (
    /* Separated bottom pagination - has dots */
    compose(carousel_stories_exports, "SeparatedBottomPaginationHasDots")
  );
  var SeparatedBottomPaginationHasNumbers2 = (
    /* Separated bottom pagination - has numbers */
    compose(carousel_stories_exports, "SeparatedBottomPaginationHasNumbers")
  );
  var CenteredBottomPaginationHasDots2 = (
    /* Centered bottom pagination - has dots */
    compose(carousel_stories_exports, "CenteredBottomPaginationHasDots")
  );
  var CenteredBottomPaginationHasNumbers2 = (
    /* Centered bottom pagination - has numbers */
    compose(carousel_stories_exports, "CenteredBottomPaginationHasNumbers")
  );
  var CombinationsTopNavigationBottomDots2 = (
    /* Combinations - top navigation, bottom dots */
    compose(carousel_stories_exports, "CombinationsTopNavigationBottomDots")
  );
  var CenteredHasDots2 = (
    /* Centered - has dots */
    compose(carousel_stories_exports, "CenteredHasDots")
  );
  var CenteredHasNumbers2 = (
    /* Centered - has numbers */
    compose(carousel_stories_exports, "CenteredHasNumbers")
  );
  var Faded2 = (
    /* Faded */
    compose(carousel_stories_exports, "Faded")
  );
  var FadedBothSides2 = (
    /* Faded - both sides */
    compose(carousel_stories_exports, "FadedBothSides")
  );
  var Peeking2 = (
    /* Peeking */
    compose(carousel_stories_exports, "Peeking")
  );
  var PeekingBothSides2 = (
    /* Peeking - both sides (centered) */
    compose(carousel_stories_exports, "PeekingBothSides")
  );
  var BoundedOverlayNavigation2 = (
    /* Bounded - overlay arrows (no loop) */
    compose(carousel_stories_exports, "BoundedOverlayNavigation")
  );
  var Examples2 = (
    /* Examples */
    compose(carousel_stories_exports, "Examples")
  );
  return __toCommonJS(Carousel_exports);
})();
