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

  // .design-sync/.cache/previews/Calendar.tsx
  var Calendar_exports = {};
  __export(Calendar_exports, {
    Availability: () => Availability2,
    Default: () => Default2,
    MonthView: () => MonthView2,
    MultipleSelectedDates: () => MultipleSelectedDates2,
    NoControls: () => NoControls2,
    Range: () => Range2,
    WithFooter: () => WithFooter2,
    WithLegend: () => WithLegend2,
    WithWeeksCount: () => WithWeeksCount2,
    YearView: () => YearView2
  });
  init_define_import_meta_env();
  init_define_process_env();
  var React = __toESM(require_react_shim(), 1);

  // src/tedi/components/content/calendar/calendar.stories.tsx
  var calendar_stories_exports = {};
  __export(calendar_stories_exports, {
    Availability: () => Availability,
    Default: () => Default,
    MonthView: () => MonthView,
    MultipleSelectedDates: () => MultipleSelectedDates,
    NoControls: () => NoControls,
    Range: () => Range,
    WithFooter: () => WithFooter,
    WithLegend: () => WithLegend,
    WithWeeksCount: () => WithWeeksCount,
    YearView: () => YearView,
    default: () => calendar_stories_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  var import_react = __toESM(require_react_shim());

  // node_modules/react-day-picker/dist/esm/locale.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/react-day-picker/node_modules/date-fns/locale/_lib/buildFormatLongFn.js
  init_define_import_meta_env();
  init_define_process_env();
  function buildFormatLongFn(args) {
    return (options = {}) => {
      const width = options.width ? String(options.width) : args.defaultWidth;
      const format2 = args.formats[width] || args.formats[args.defaultWidth];
      return format2;
    };
  }

  // node_modules/react-day-picker/node_modules/date-fns/locale/_lib/buildLocalizeFn.js
  init_define_import_meta_env();
  init_define_process_env();
  function buildLocalizeFn(args) {
    return (value, options) => {
      const context = options?.context ? String(options.context) : "standalone";
      let valuesArray;
      if (context === "formatting" && args.formattingValues) {
        const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
        const width = options?.width ? String(options.width) : defaultWidth;
        valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
      } else {
        const defaultWidth = args.defaultWidth;
        const width = options?.width ? String(options.width) : args.defaultWidth;
        valuesArray = args.values[width] || args.values[defaultWidth];
      }
      const index = args.argumentCallback ? args.argumentCallback(value) : value;
      return valuesArray[index];
    };
  }

  // node_modules/react-day-picker/node_modules/date-fns/locale/_lib/buildMatchFn.js
  init_define_import_meta_env();
  init_define_process_env();
  function buildMatchFn(args) {
    return (string, options = {}) => {
      const width = options.width;
      const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
      const matchResult = string.match(matchPattern);
      if (!matchResult) {
        return null;
      }
      const matchedString = matchResult[0];
      const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
      const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString)) : (
        // [TODO] -- I challenge you to fix the type
        findKey(parsePatterns, (pattern) => pattern.test(matchedString))
      );
      let value;
      value = args.valueCallback ? args.valueCallback(key) : key;
      value = options.valueCallback ? (
        // [TODO] -- I challenge you to fix the type
        options.valueCallback(value)
      ) : value;
      const rest = string.slice(matchedString.length);
      return { value, rest };
    };
  }
  function findKey(object, predicate) {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) {
        return key;
      }
    }
    return void 0;
  }
  function findIndex(array, predicate) {
    for (let key = 0; key < array.length; key++) {
      if (predicate(array[key])) {
        return key;
      }
    }
    return void 0;
  }

  // node_modules/react-day-picker/node_modules/date-fns/locale/_lib/buildMatchPatternFn.js
  init_define_import_meta_env();
  init_define_process_env();
  function buildMatchPatternFn(args) {
    return (string, options = {}) => {
      const matchResult = string.match(args.matchPattern);
      if (!matchResult) return null;
      const matchedString = matchResult[0];
      const parseResult = string.match(args.parsePattern);
      if (!parseResult) return null;
      let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
      value = options.valueCallback ? options.valueCallback(value) : value;
      const rest = string.slice(matchedString.length);
      return { value, rest };
    };
  }

  // node_modules/react-day-picker/node_modules/date-fns/_lib/normalizeDates.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/react-day-picker/node_modules/date-fns/constructFrom.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/react-day-picker/node_modules/date-fns/constants.js
  init_define_import_meta_env();
  init_define_process_env();
  var daysInYear = 365.2425;
  var maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1e3;
  var minTime = -maxTime;
  var millisecondsInWeek = 6048e5;
  var millisecondsInDay = 864e5;
  var secondsInHour = 3600;
  var secondsInDay = secondsInHour * 24;
  var secondsInWeek = secondsInDay * 7;
  var secondsInYear = secondsInDay * daysInYear;
  var secondsInMonth = secondsInYear / 12;
  var secondsInQuarter = secondsInMonth * 3;
  var constructFromSymbol = /* @__PURE__ */ Symbol.for("constructDateFrom");

  // node_modules/react-day-picker/node_modules/date-fns/constructFrom.js
  function constructFrom(date, value) {
    if (typeof date === "function") return date(value);
    if (date && typeof date === "object" && constructFromSymbol in date)
      return date[constructFromSymbol](value);
    if (date instanceof Date) return new date.constructor(value);
    return new Date(value);
  }

  // node_modules/react-day-picker/node_modules/date-fns/_lib/normalizeDates.js
  function normalizeDates(context, ...dates) {
    const normalize = constructFrom.bind(
      null,
      context || dates.find((date) => typeof date === "object")
    );
    return dates.map(normalize);
  }

  // node_modules/react-day-picker/node_modules/date-fns/startOfWeek.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/react-day-picker/node_modules/date-fns/_lib/defaultOptions.js
  init_define_import_meta_env();
  init_define_process_env();
  var defaultOptions = {};
  function getDefaultOptions() {
    return defaultOptions;
  }

  // node_modules/react-day-picker/node_modules/date-fns/toDate.js
  init_define_import_meta_env();
  init_define_process_env();
  function toDate(argument, context) {
    return constructFrom(context || argument, argument);
  }

  // node_modules/react-day-picker/node_modules/date-fns/startOfWeek.js
  function startOfWeek(date, options) {
    const defaultOptions2 = getDefaultOptions();
    const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0;
    const _date = toDate(date, options?.in);
    const day = _date.getDay();
    const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    _date.setDate(_date.getDate() - diff);
    _date.setHours(0, 0, 0, 0);
    return _date;
  }

  // node_modules/react-day-picker/node_modules/date-fns/locale/en-US/_lib/formatDistance.js
  init_define_import_meta_env();
  init_define_process_env();
  var formatDistanceLocale = {
    lessThanXSeconds: {
      one: "less than a second",
      other: "less than {{count}} seconds"
    },
    xSeconds: {
      one: "1 second",
      other: "{{count}} seconds"
    },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
      one: "less than a minute",
      other: "less than {{count}} minutes"
    },
    xMinutes: {
      one: "1 minute",
      other: "{{count}} minutes"
    },
    aboutXHours: {
      one: "about 1 hour",
      other: "about {{count}} hours"
    },
    xHours: {
      one: "1 hour",
      other: "{{count}} hours"
    },
    xDays: {
      one: "1 day",
      other: "{{count}} days"
    },
    aboutXWeeks: {
      one: "about 1 week",
      other: "about {{count}} weeks"
    },
    xWeeks: {
      one: "1 week",
      other: "{{count}} weeks"
    },
    aboutXMonths: {
      one: "about 1 month",
      other: "about {{count}} months"
    },
    xMonths: {
      one: "1 month",
      other: "{{count}} months"
    },
    aboutXYears: {
      one: "about 1 year",
      other: "about {{count}} years"
    },
    xYears: {
      one: "1 year",
      other: "{{count}} years"
    },
    overXYears: {
      one: "over 1 year",
      other: "over {{count}} years"
    },
    almostXYears: {
      one: "almost 1 year",
      other: "almost {{count}} years"
    }
  };
  var formatDistance = (token, count, options) => {
    let result;
    const tokenValue = formatDistanceLocale[token];
    if (typeof tokenValue === "string") {
      result = tokenValue;
    } else if (count === 1) {
      result = tokenValue.one;
    } else {
      result = tokenValue.other.replace("{{count}}", count.toString());
    }
    if (options?.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        return "in " + result;
      } else {
        return result + " ago";
      }
    }
    return result;
  };

  // node_modules/react-day-picker/node_modules/date-fns/locale/en-US/_lib/formatRelative.js
  init_define_import_meta_env();
  init_define_process_env();
  var formatRelativeLocale = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: "P"
  };
  var formatRelative = (token, _date, _baseDate, _options) => formatRelativeLocale[token];

  // node_modules/react-day-picker/node_modules/date-fns/locale/en-US/_lib/localize.js
  init_define_import_meta_env();
  init_define_process_env();
  var eraValues = {
    narrow: ["B", "A"],
    abbreviated: ["BC", "AD"],
    wide: ["Before Christ", "Anno Domini"]
  };
  var quarterValues = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
    wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
  };
  var monthValues = {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbreviated: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    wide: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
  };
  var dayValues = {
    narrow: ["S", "M", "T", "W", "T", "F", "S"],
    short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    wide: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]
  };
  var dayPeriodValues = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    }
  };
  var formattingDayPeriodValues = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    }
  };
  var ordinalNumber = (dirtyNumber, _options) => {
    const number = Number(dirtyNumber);
    const rem100 = number % 100;
    if (rem100 > 20 || rem100 < 10) {
      switch (rem100 % 10) {
        case 1:
          return number + "st";
        case 2:
          return number + "nd";
        case 3:
          return number + "rd";
      }
    }
    return number + "th";
  };
  var localize = {
    ordinalNumber,
    era: buildLocalizeFn({
      values: eraValues,
      defaultWidth: "wide"
    }),
    quarter: buildLocalizeFn({
      values: quarterValues,
      defaultWidth: "wide",
      argumentCallback: (quarter) => quarter - 1
    }),
    month: buildLocalizeFn({
      values: monthValues,
      defaultWidth: "wide"
    }),
    day: buildLocalizeFn({
      values: dayValues,
      defaultWidth: "wide"
    }),
    dayPeriod: buildLocalizeFn({
      values: dayPeriodValues,
      defaultWidth: "wide",
      formattingValues: formattingDayPeriodValues,
      defaultFormattingWidth: "wide"
    })
  };

  // node_modules/react-day-picker/node_modules/date-fns/locale/en-US/_lib/match.js
  init_define_import_meta_env();
  init_define_process_env();
  var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
  var parseOrdinalNumberPattern = /\d+/i;
  var matchEraPatterns = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i
  };
  var parseEraPatterns = {
    any: [/^b/i, /^(a|c)/i]
  };
  var matchQuarterPatterns = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i
  };
  var parseQuarterPatterns = {
    any: [/1/i, /2/i, /3/i, /4/i]
  };
  var matchMonthPatterns = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
  };
  var parseMonthPatterns = {
    narrow: [
      /^j/i,
      /^f/i,
      /^m/i,
      /^a/i,
      /^m/i,
      /^j/i,
      /^j/i,
      /^a/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i
    ],
    any: [
      /^ja/i,
      /^f/i,
      /^mar/i,
      /^ap/i,
      /^may/i,
      /^jun/i,
      /^jul/i,
      /^au/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i
    ]
  };
  var matchDayPatterns = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
  };
  var parseDayPatterns = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
  };
  var matchDayPeriodPatterns = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
  };
  var parseDayPeriodPatterns = {
    any: {
      am: /^a/i,
      pm: /^p/i,
      midnight: /^mi/i,
      noon: /^no/i,
      morning: /morning/i,
      afternoon: /afternoon/i,
      evening: /evening/i,
      night: /night/i
    }
  };
  var match = {
    ordinalNumber: buildMatchPatternFn({
      matchPattern: matchOrdinalNumberPattern,
      parsePattern: parseOrdinalNumberPattern,
      valueCallback: (value) => parseInt(value, 10)
    }),
    era: buildMatchFn({
      matchPatterns: matchEraPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseEraPatterns,
      defaultParseWidth: "any"
    }),
    quarter: buildMatchFn({
      matchPatterns: matchQuarterPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseQuarterPatterns,
      defaultParseWidth: "any",
      valueCallback: (index) => index + 1
    }),
    month: buildMatchFn({
      matchPatterns: matchMonthPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseMonthPatterns,
      defaultParseWidth: "any"
    }),
    day: buildMatchFn({
      matchPatterns: matchDayPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseDayPatterns,
      defaultParseWidth: "any"
    }),
    dayPeriod: buildMatchFn({
      matchPatterns: matchDayPeriodPatterns,
      defaultMatchWidth: "any",
      parsePatterns: parseDayPeriodPatterns,
      defaultParseWidth: "any"
    })
  };

  // node_modules/react-day-picker/node_modules/date-fns/locale/en-US.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/react-day-picker/node_modules/date-fns/locale/en-US/_lib/formatLong.js
  init_define_import_meta_env();
  init_define_process_env();
  var dateFormats = {
    full: "EEEE, MMMM do, y",
    long: "MMMM do, y",
    medium: "MMM d, y",
    short: "MM/dd/yyyy"
  };
  var timeFormats = {
    full: "h:mm:ss a zzzz",
    long: "h:mm:ss a z",
    medium: "h:mm:ss a",
    short: "h:mm a"
  };
  var dateTimeFormats = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: "{{date}}, {{time}}",
    short: "{{date}}, {{time}}"
  };
  var formatLong = {
    date: buildFormatLongFn({
      formats: dateFormats,
      defaultWidth: "full"
    }),
    time: buildFormatLongFn({
      formats: timeFormats,
      defaultWidth: "full"
    }),
    dateTime: buildFormatLongFn({
      formats: dateTimeFormats,
      defaultWidth: "full"
    })
  };

  // node_modules/react-day-picker/node_modules/date-fns/locale/en-US.js
  var enUS = {
    code: "en-US",
    formatDistance,
    formatLong,
    formatRelative,
    localize,
    match,
    options: {
      weekStartsOn: 0,
      firstWeekContainsDate: 1
    }
  };

  // node_modules/react-day-picker/node_modules/date-fns/locale/et.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/react-day-picker/node_modules/date-fns/locale/et/_lib/formatDistance.js
  init_define_import_meta_env();
  init_define_process_env();
  var formatDistanceLocale2 = {
    lessThanXSeconds: {
      standalone: {
        one: "vähem kui üks sekund",
        other: "vähem kui {{count}} sekundit"
      },
      withPreposition: {
        one: "vähem kui ühe sekundi",
        other: "vähem kui {{count}} sekundi"
      }
    },
    xSeconds: {
      standalone: {
        one: "üks sekund",
        other: "{{count}} sekundit"
      },
      withPreposition: {
        one: "ühe sekundi",
        other: "{{count}} sekundi"
      }
    },
    halfAMinute: {
      standalone: "pool minutit",
      withPreposition: "poole minuti"
    },
    lessThanXMinutes: {
      standalone: {
        one: "vähem kui üks minut",
        other: "vähem kui {{count}} minutit"
      },
      withPreposition: {
        one: "vähem kui ühe minuti",
        other: "vähem kui {{count}} minuti"
      }
    },
    xMinutes: {
      standalone: {
        one: "üks minut",
        other: "{{count}} minutit"
      },
      withPreposition: {
        one: "ühe minuti",
        other: "{{count}} minuti"
      }
    },
    aboutXHours: {
      standalone: {
        one: "umbes üks tund",
        other: "umbes {{count}} tundi"
      },
      withPreposition: {
        one: "umbes ühe tunni",
        other: "umbes {{count}} tunni"
      }
    },
    xHours: {
      standalone: {
        one: "üks tund",
        other: "{{count}} tundi"
      },
      withPreposition: {
        one: "ühe tunni",
        other: "{{count}} tunni"
      }
    },
    xDays: {
      standalone: {
        one: "üks päev",
        other: "{{count}} päeva"
      },
      withPreposition: {
        one: "ühe päeva",
        other: "{{count}} päeva"
      }
    },
    aboutXWeeks: {
      standalone: {
        one: "umbes üks nädal",
        other: "umbes {{count}} nädalat"
      },
      withPreposition: {
        one: "umbes ühe nädala",
        other: "umbes {{count}} nädala"
      }
    },
    xWeeks: {
      standalone: {
        one: "üks nädal",
        other: "{{count}} nädalat"
      },
      withPreposition: {
        one: "ühe nädala",
        other: "{{count}} nädala"
      }
    },
    aboutXMonths: {
      standalone: {
        one: "umbes üks kuu",
        other: "umbes {{count}} kuud"
      },
      withPreposition: {
        one: "umbes ühe kuu",
        other: "umbes {{count}} kuu"
      }
    },
    xMonths: {
      standalone: {
        one: "üks kuu",
        other: "{{count}} kuud"
      },
      withPreposition: {
        one: "ühe kuu",
        other: "{{count}} kuu"
      }
    },
    aboutXYears: {
      standalone: {
        one: "umbes üks aasta",
        other: "umbes {{count}} aastat"
      },
      withPreposition: {
        one: "umbes ühe aasta",
        other: "umbes {{count}} aasta"
      }
    },
    xYears: {
      standalone: {
        one: "üks aasta",
        other: "{{count}} aastat"
      },
      withPreposition: {
        one: "ühe aasta",
        other: "{{count}} aasta"
      }
    },
    overXYears: {
      standalone: {
        one: "rohkem kui üks aasta",
        other: "rohkem kui {{count}} aastat"
      },
      withPreposition: {
        one: "rohkem kui ühe aasta",
        other: "rohkem kui {{count}} aasta"
      }
    },
    almostXYears: {
      standalone: {
        one: "peaaegu üks aasta",
        other: "peaaegu {{count}} aastat"
      },
      withPreposition: {
        one: "peaaegu ühe aasta",
        other: "peaaegu {{count}} aasta"
      }
    }
  };
  var formatDistance2 = (token, count, options) => {
    const usageGroup = options?.addSuffix ? formatDistanceLocale2[token].withPreposition : formatDistanceLocale2[token].standalone;
    let result;
    if (typeof usageGroup === "string") {
      result = usageGroup;
    } else if (count === 1) {
      result = usageGroup.one;
    } else {
      result = usageGroup.other.replace("{{count}}", String(count));
    }
    if (options?.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        return result + " pärast";
      } else {
        return result + " eest";
      }
    }
    return result;
  };

  // node_modules/react-day-picker/node_modules/date-fns/locale/et/_lib/formatLong.js
  init_define_import_meta_env();
  init_define_process_env();
  var dateFormats2 = {
    full: "EEEE, d. MMMM y",
    long: "d. MMMM y",
    medium: "d. MMM y",
    short: "dd.MM.y"
  };
  var timeFormats2 = {
    full: "HH:mm:ss zzzz",
    long: "HH:mm:ss z",
    medium: "HH:mm:ss",
    short: "HH:mm"
  };
  var dateTimeFormats2 = {
    full: "{{date}} 'kell' {{time}}",
    long: "{{date}} 'kell' {{time}}",
    medium: "{{date}}. {{time}}",
    short: "{{date}}. {{time}}"
  };
  var formatLong2 = {
    date: buildFormatLongFn({
      formats: dateFormats2,
      defaultWidth: "full"
    }),
    time: buildFormatLongFn({
      formats: timeFormats2,
      defaultWidth: "full"
    }),
    dateTime: buildFormatLongFn({
      formats: dateTimeFormats2,
      defaultWidth: "full"
    })
  };

  // node_modules/react-day-picker/node_modules/date-fns/locale/et/_lib/formatRelative.js
  init_define_import_meta_env();
  init_define_process_env();
  var formatRelativeLocale2 = {
    lastWeek: "'eelmine' eeee 'kell' p",
    yesterday: "'eile kell' p",
    today: "'täna kell' p",
    tomorrow: "'homme kell' p",
    nextWeek: "'järgmine' eeee 'kell' p",
    other: "P"
  };
  var formatRelative2 = (token, _date, _baseDate, _options) => formatRelativeLocale2[token];

  // node_modules/react-day-picker/node_modules/date-fns/locale/et/_lib/localize.js
  init_define_import_meta_env();
  init_define_process_env();
  var eraValues2 = {
    narrow: ["e.m.a", "m.a.j"],
    abbreviated: ["e.m.a", "m.a.j"],
    wide: ["enne meie ajaarvamist", "meie ajaarvamise järgi"]
  };
  var quarterValues2 = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["K1", "K2", "K3", "K4"],
    wide: ["1. kvartal", "2. kvartal", "3. kvartal", "4. kvartal"]
  };
  var monthValues2 = {
    narrow: ["J", "V", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbreviated: [
      "jaan",
      "veebr",
      "märts",
      "apr",
      "mai",
      "juuni",
      "juuli",
      "aug",
      "sept",
      "okt",
      "nov",
      "dets"
    ],
    wide: [
      "jaanuar",
      "veebruar",
      "märts",
      "aprill",
      "mai",
      "juuni",
      "juuli",
      "august",
      "september",
      "oktoober",
      "november",
      "detsember"
    ]
  };
  var dayValues2 = {
    narrow: ["P", "E", "T", "K", "N", "R", "L"],
    short: ["P", "E", "T", "K", "N", "R", "L"],
    abbreviated: [
      "pühap.",
      "esmasp.",
      "teisip.",
      "kolmap.",
      "neljap.",
      "reede.",
      "laup."
    ],
    wide: [
      "pühapäev",
      "esmaspäev",
      "teisipäev",
      "kolmapäev",
      "neljapäev",
      "reede",
      "laupäev"
    ]
  };
  var dayPeriodValues2 = {
    narrow: {
      am: "AM",
      pm: "PM",
      midnight: "kesköö",
      noon: "keskpäev",
      morning: "hommik",
      afternoon: "pärastlõuna",
      evening: "õhtu",
      night: "öö"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "kesköö",
      noon: "keskpäev",
      morning: "hommik",
      afternoon: "pärastlõuna",
      evening: "õhtu",
      night: "öö"
    },
    wide: {
      am: "AM",
      pm: "PM",
      midnight: "kesköö",
      noon: "keskpäev",
      morning: "hommik",
      afternoon: "pärastlõuna",
      evening: "õhtu",
      night: "öö"
    }
  };
  var formattingDayPeriodValues2 = {
    narrow: {
      am: "AM",
      pm: "PM",
      midnight: "keskööl",
      noon: "keskpäeval",
      morning: "hommikul",
      afternoon: "pärastlõunal",
      evening: "õhtul",
      night: "öösel"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "keskööl",
      noon: "keskpäeval",
      morning: "hommikul",
      afternoon: "pärastlõunal",
      evening: "õhtul",
      night: "öösel"
    },
    wide: {
      am: "AM",
      pm: "PM",
      midnight: "keskööl",
      noon: "keskpäeval",
      morning: "hommikul",
      afternoon: "pärastlõunal",
      evening: "õhtul",
      night: "öösel"
    }
  };
  var ordinalNumber2 = (dirtyNumber, _options) => {
    const number = Number(dirtyNumber);
    return number + ".";
  };
  var localize2 = {
    ordinalNumber: ordinalNumber2,
    era: buildLocalizeFn({
      values: eraValues2,
      defaultWidth: "wide"
    }),
    quarter: buildLocalizeFn({
      values: quarterValues2,
      defaultWidth: "wide",
      argumentCallback: (quarter) => quarter - 1
    }),
    month: buildLocalizeFn({
      values: monthValues2,
      defaultWidth: "wide",
      formattingValues: monthValues2,
      defaultFormattingWidth: "wide"
    }),
    day: buildLocalizeFn({
      values: dayValues2,
      defaultWidth: "wide",
      formattingValues: dayValues2,
      defaultFormattingWidth: "wide"
    }),
    dayPeriod: buildLocalizeFn({
      values: dayPeriodValues2,
      defaultWidth: "wide",
      formattingValues: formattingDayPeriodValues2,
      defaultFormattingWidth: "wide"
    })
  };

  // node_modules/react-day-picker/node_modules/date-fns/locale/et/_lib/match.js
  init_define_import_meta_env();
  init_define_process_env();
  var matchOrdinalNumberPattern2 = /^\d+\./i;
  var parseOrdinalNumberPattern2 = /\d+/i;
  var matchEraPatterns2 = {
    narrow: /^(e\.m\.a|m\.a\.j|eKr|pKr)/i,
    abbreviated: /^(e\.m\.a|m\.a\.j|eKr|pKr)/i,
    wide: /^(enne meie ajaarvamist|meie ajaarvamise järgi|enne Kristust|pärast Kristust)/i
  };
  var parseEraPatterns2 = {
    any: [/^e/i, /^(m|p)/i]
  };
  var matchQuarterPatterns2 = {
    narrow: /^[1234]/i,
    abbreviated: /^K[1234]/i,
    wide: /^[1234](\.)? kvartal/i
  };
  var parseQuarterPatterns2 = {
    any: [/1/i, /2/i, /3/i, /4/i]
  };
  var matchMonthPatterns2 = {
    narrow: /^[jvmasond]/i,
    abbreviated: /^(jaan|veebr|märts|apr|mai|juuni|juuli|aug|sept|okt|nov|dets)/i,
    wide: /^(jaanuar|veebruar|märts|aprill|mai|juuni|juuli|august|september|oktoober|november|detsember)/i
  };
  var parseMonthPatterns2 = {
    narrow: [
      /^j/i,
      /^v/i,
      /^m/i,
      /^a/i,
      /^m/i,
      /^j/i,
      /^j/i,
      /^a/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i
    ],
    any: [
      /^ja/i,
      /^v/i,
      /^mär/i,
      /^ap/i,
      /^mai/i,
      /^juun/i,
      /^juul/i,
      /^au/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i
    ]
  };
  var matchDayPatterns2 = {
    narrow: /^[petknrl]/i,
    short: /^[petknrl]/i,
    abbreviated: /^(püh?|esm?|tei?|kolm?|nel?|ree?|laup?)\.?/i,
    wide: /^(pühapäev|esmaspäev|teisipäev|kolmapäev|neljapäev|reede|laupäev)/i
  };
  var parseDayPatterns2 = {
    any: [/^p/i, /^e/i, /^t/i, /^k/i, /^n/i, /^r/i, /^l/i]
  };
  var matchDayPeriodPatterns2 = {
    any: /^(am|pm|keskööl?|keskpäev(al)?|hommik(ul)?|pärastlõunal?|õhtul?|öö(sel)?)/i
  };
  var parseDayPeriodPatterns2 = {
    any: {
      am: /^a/i,
      pm: /^p/i,
      midnight: /^keskö/i,
      noon: /^keskp/i,
      morning: /hommik/i,
      afternoon: /pärastlõuna/i,
      evening: /õhtu/i,
      night: /öö/i
    }
  };
  var match2 = {
    ordinalNumber: buildMatchPatternFn({
      matchPattern: matchOrdinalNumberPattern2,
      parsePattern: parseOrdinalNumberPattern2,
      valueCallback: (value) => parseInt(value, 10)
    }),
    era: buildMatchFn({
      matchPatterns: matchEraPatterns2,
      defaultMatchWidth: "wide",
      parsePatterns: parseEraPatterns2,
      defaultParseWidth: "any"
    }),
    quarter: buildMatchFn({
      matchPatterns: matchQuarterPatterns2,
      defaultMatchWidth: "wide",
      parsePatterns: parseQuarterPatterns2,
      defaultParseWidth: "any",
      valueCallback: (index) => index + 1
    }),
    month: buildMatchFn({
      matchPatterns: matchMonthPatterns2,
      defaultMatchWidth: "wide",
      parsePatterns: parseMonthPatterns2,
      defaultParseWidth: "any"
    }),
    day: buildMatchFn({
      matchPatterns: matchDayPatterns2,
      defaultMatchWidth: "wide",
      parsePatterns: parseDayPatterns2,
      defaultParseWidth: "any"
    }),
    dayPeriod: buildMatchFn({
      matchPatterns: matchDayPeriodPatterns2,
      defaultMatchWidth: "any",
      parsePatterns: parseDayPeriodPatterns2,
      defaultParseWidth: "any"
    })
  };

  // node_modules/react-day-picker/node_modules/date-fns/locale/et.js
  var et = {
    code: "et",
    formatDistance: formatDistance2,
    formatLong: formatLong2,
    formatRelative: formatRelative2,
    localize: localize2,
    match: match2,
    options: {
      weekStartsOn: 1,
      firstWeekContainsDate: 4
    }
  };

  // node_modules/react-day-picker/dist/esm/classes/DateLib.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/@date-fns/tz/index.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/@date-fns/tz/constants/index.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/@date-fns/tz/date/index.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/@date-fns/tz/tzName/index.js
  init_define_import_meta_env();
  init_define_process_env();
  function tzName(timeZone, date, format2 = "long") {
    return new Intl.DateTimeFormat("en-US", {
      // Enforces engine to render the time. Without the option JavaScriptCore omits it.
      hour: "numeric",
      timeZone,
      timeZoneName: format2
    }).format(date).split(/\s/g).slice(2).join(" ");
  }

  // node_modules/@date-fns/tz/date/mini.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/@date-fns/tz/tzOffset/index.js
  init_define_import_meta_env();
  init_define_process_env();
  var offsetFormatCache = {};
  var offsetCache = {};
  function tzOffset(timeZone, date) {
    try {
      const format2 = offsetFormatCache[timeZone] ||= new Intl.DateTimeFormat("en-US", {
        timeZone,
        timeZoneName: "longOffset"
      }).format;
      const offsetStr = format2(date).split("GMT")[1];
      if (offsetStr in offsetCache) return offsetCache[offsetStr];
      return calcOffset(offsetStr, offsetStr.split(":"));
    } catch {
      if (timeZone in offsetCache) return offsetCache[timeZone];
      const captures = timeZone?.match(offsetRe);
      if (captures) return calcOffset(timeZone, captures.slice(1));
      return NaN;
    }
  }
  var offsetRe = /([+-]\d\d):?(\d\d)?/;
  function calcOffset(cacheStr, values) {
    const hours = +(values[0] || 0);
    const minutes = +(values[1] || 0);
    const seconds = +(values[2] || 0) / 60;
    return offsetCache[cacheStr] = hours * 60 + minutes > 0 ? hours * 60 + minutes + seconds : hours * 60 - minutes - seconds;
  }

  // node_modules/@date-fns/tz/date/mini.js
  var TZDateMini = class _TZDateMini extends Date {
    //#region static
    constructor(...args) {
      super();
      if (args.length > 1 && typeof args[args.length - 1] === "string") {
        this.timeZone = args.pop();
      }
      this.internal = /* @__PURE__ */ new Date();
      if (isNaN(tzOffset(this.timeZone, this))) {
        this.setTime(NaN);
      } else {
        if (!args.length) {
          this.setTime(Date.now());
        } else if (typeof args[0] === "number" && (args.length === 1 || args.length === 2 && typeof args[1] !== "number")) {
          this.setTime(args[0]);
        } else if (typeof args[0] === "string") {
          this.setTime(+new Date(args[0]));
        } else if (args[0] instanceof Date) {
          this.setTime(+args[0]);
        } else {
          this.setTime(+new Date(...args));
          adjustToSystemTZ(this, args);
        }
      }
    }
    static tz(tz, ...args) {
      return args.length ? new _TZDateMini(...args, tz) : new _TZDateMini(Date.now(), tz);
    }
    //#endregion
    //#region time zone
    withTimeZone(timeZone) {
      return new _TZDateMini(+this, timeZone);
    }
    getTimezoneOffset() {
      const offset = -tzOffset(this.timeZone, this);
      return offset > 0 ? Math.floor(offset) : Math.ceil(offset);
    }
    //#endregion
    //#region time
    setTime(_time) {
      Date.prototype.setTime.apply(this, arguments);
      syncToInternal(this);
      return +this;
    }
    //#endregion
    //#region date-fns integration
    [/* @__PURE__ */ Symbol.for("constructDateFrom")](date) {
      return new _TZDateMini(+new Date(date), this.timeZone);
    }
    //#endregion
  };
  var re = /^(get|set)(?!UTC)/;
  Object.getOwnPropertyNames(Date.prototype).forEach((method) => {
    if (!re.test(method)) return;
    const utcMethod = method.replace(re, "$1UTC");
    if (!TZDateMini.prototype[utcMethod]) return;
    if (method.startsWith("get")) {
      TZDateMini.prototype[method] = function() {
        return this.internal[utcMethod]();
      };
    } else {
      TZDateMini.prototype[method] = function() {
        Date.prototype[utcMethod].apply(this.internal, arguments);
        syncFromInternal(this);
        return +this;
      };
      TZDateMini.prototype[utcMethod] = function() {
        Date.prototype[utcMethod].apply(this, arguments);
        syncToInternal(this);
        return +this;
      };
    }
  });
  function syncToInternal(date) {
    date.internal.setTime(+date);
    date.internal.setUTCSeconds(date.internal.getUTCSeconds() - // Round after converting minutes to seconds to avoid fractional offset
    // precision errors from historical offsets.
    Math.round(-tzOffset(date.timeZone, date) * 60));
  }
  function syncFromInternal(date) {
    Date.prototype.setFullYear.call(date, date.internal.getUTCFullYear(), date.internal.getUTCMonth(), date.internal.getUTCDate());
    Date.prototype.setHours.call(date, date.internal.getUTCHours(), date.internal.getUTCMinutes(), date.internal.getUTCSeconds(), date.internal.getUTCMilliseconds());
    adjustToSystemTZ(date);
  }
  function adjustToSystemTZ(date, constructorArgs) {
    const expectedInternalTime = Array.isArray(constructorArgs) ? constructorArgsToInternalTime(constructorArgs) : +date.internal;
    const offsetWithSeconds = tzOffset(date.timeZone, date);
    const offset = offsetWithSeconds > 0 ? Math.floor(offsetWithSeconds) : Math.ceil(offsetWithSeconds);
    const prevHour = /* @__PURE__ */ new Date(+date);
    prevHour.setUTCHours(prevHour.getUTCHours() - 1);
    const systemOffset = -(/* @__PURE__ */ new Date(+date)).getTimezoneOffset();
    const prevHourSystemOffset = -(/* @__PURE__ */ new Date(+prevHour)).getTimezoneOffset();
    const systemDSTChange = systemOffset - prevHourSystemOffset;
    let systemOffsetForDiff = systemOffset;
    if (systemDSTChange && systemOffset !== offset) {
      const systemHour = Date.prototype.getHours.apply(date);
      const expectedHour = Array.isArray(constructorArgs) ? constructorArgs[3] || 0 : date.internal.getUTCHours();
      if (systemHour !== expectedHour) {
        const testDate = /* @__PURE__ */ new Date(+date);
        const testOffsetDiff = systemOffset - offset;
        if (testOffsetDiff) testDate.setUTCMinutes(testDate.getUTCMinutes() + testOffsetDiff);
        const testOffsetWithSeconds = tzOffset(date.timeZone, testDate);
        const testOffset = testOffsetWithSeconds > 0 ? Math.floor(testOffsetWithSeconds) : Math.ceil(testOffsetWithSeconds);
        if (testOffset === offset) systemOffsetForDiff = prevHourSystemOffset;
      }
    }
    const offsetDiff = systemOffsetForDiff - offset;
    if (offsetDiff)
      Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + offsetDiff);
    const systemDate = /* @__PURE__ */ new Date(+date);
    systemDate.setUTCSeconds(0);
    const systemSecondsOffset = systemOffset > 0 ? systemDate.getSeconds() : (systemDate.getSeconds() - 60) % 60;
    const secondsOffset = Math.round(-(tzOffset(date.timeZone, date) * 60)) % 60;
    if (secondsOffset || systemSecondsOffset)
      Date.prototype.setUTCSeconds.call(date, Date.prototype.getUTCSeconds.call(date) + secondsOffset + systemSecondsOffset);
    const postOffsetWithSeconds = tzOffset(date.timeZone, date);
    const postOffset = postOffsetWithSeconds > 0 ? Math.floor(postOffsetWithSeconds) : Math.ceil(postOffsetWithSeconds);
    const postSystemOffset = -(/* @__PURE__ */ new Date(+date)).getTimezoneOffset();
    const postOffsetDiff = postSystemOffset - postOffset;
    const offsetChanged = postOffset !== offset;
    const postDiff = postOffsetDiff - offsetDiff;
    const targetDSTShift = postOffset - offset;
    const postOffsetCandidate = expectedInternalTime - postOffset * 60 * 1e3;
    const normalizedTargetDSTGap = targetDSTShift > 0 && targetInternalTime(date) - expectedInternalTime === targetDSTShift * 60 * 1e3 && targetInternalTime(date, postOffsetCandidate) !== expectedInternalTime;
    if (offsetChanged && postDiff && !normalizedTargetDSTGap) {
      Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + postDiff);
      const newOffsetWithSeconds = tzOffset(date.timeZone, date);
      const newOffset = newOffsetWithSeconds > 0 ? Math.floor(newOffsetWithSeconds) : Math.ceil(newOffsetWithSeconds);
      const offsetChange = postOffset - newOffset;
      if (offsetChange && postDiff < 0) {
        Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + offsetChange);
      }
    }
    syncToInternal(date);
    const expectedTime = constructorArgs ? expectedInternalTime : expectedInternalTime + secondsOffset * 1e3;
    const drift = expectedTime - +date.internal;
    if (drift && Math.abs(drift) < 30 * 60 * 1e3) {
      Date.prototype.setTime.call(date, +date + drift);
      syncToInternal(date);
    }
  }
  function constructorArgsToInternalTime(args) {
    return Date.UTC(args[0], args.length > 1 ? args[1] : 0, args.length > 2 ? args[2] : 1, ...args.slice(3));
  }
  function targetInternalTime(date, time) {
    const internal = new Date(time ?? +date);
    internal.setUTCSeconds(internal.getUTCSeconds() - Math.round(-tzOffset(date.timeZone, internal) * 60));
    return +internal;
  }

  // node_modules/@date-fns/tz/date/index.js
  var TZDate = class _TZDate extends TZDateMini {
    //#region static
    static tz(tz, ...args) {
      return args.length ? new _TZDate(...args, tz) : new _TZDate(Date.now(), tz);
    }
    //#endregion
    //#region representation
    toISOString() {
      const [sign, hours, minutes] = this.tzComponents();
      const tz = `${sign}${hours}:${minutes}`;
      return this.internal.toISOString().slice(0, -1) + tz;
    }
    toString() {
      return `${this.toDateString()} ${this.toTimeString()}`;
    }
    toDateString() {
      const [day, date, month, year] = this.internal.toUTCString().split(" ");
      return `${day?.slice(0, -1)} ${month} ${date} ${year}`;
    }
    toTimeString() {
      const time = this.internal.toUTCString().split(" ")[4];
      const [sign, hours, minutes] = this.tzComponents();
      return `${time} GMT${sign}${hours}${minutes} (${tzName(this.timeZone, this)})`;
    }
    toLocaleString(locales, options) {
      return Date.prototype.toLocaleString.call(this, locales, {
        ...options,
        timeZone: options?.timeZone || this.timeZone
      });
    }
    toLocaleDateString(locales, options) {
      return Date.prototype.toLocaleDateString.call(this, locales, {
        ...options,
        timeZone: options?.timeZone || this.timeZone
      });
    }
    toLocaleTimeString(locales, options) {
      return Date.prototype.toLocaleTimeString.call(this, locales, {
        ...options,
        timeZone: options?.timeZone || this.timeZone
      });
    }
    //#endregion
    //#region private
    tzComponents() {
      const offset = this.getTimezoneOffset();
      const sign = offset > 0 ? "-" : "+";
      const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0");
      const minutes = String(Math.abs(offset) % 60).padStart(2, "0");
      return [sign, hours, minutes];
    }
    //#endregion
    withTimeZone(timeZone) {
      return new _TZDate(+this, timeZone);
    }
    //#region date-fns integration
    [/* @__PURE__ */ Symbol.for("constructDateFrom")](date) {
      return new _TZDate(+new Date(date), this.timeZone);
    }
    //#endregion
  };

  // node_modules/@date-fns/tz/tz/index.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/@date-fns/tz/tzScan/index.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/react-day-picker/node_modules/date-fns/addDays.js
  init_define_import_meta_env();
  init_define_process_env();
  function addDays(date, amount, options) {
    const _date = toDate(date, options?.in);
    if (isNaN(amount)) return constructFrom(options?.in || date, NaN);
    if (!amount) return _date;
    _date.setDate(_date.getDate() + amount);
    return _date;
  }

  // node_modules/react-day-picker/node_modules/date-fns/addMonths.js
  init_define_import_meta_env();
  init_define_process_env();
  function addMonths(date, amount, options) {
    const _date = toDate(date, options?.in);
    if (isNaN(amount)) return constructFrom(options?.in || date, NaN);
    if (!amount) {
      return _date;
    }
    const dayOfMonth = _date.getDate();
    const endOfDesiredMonth = constructFrom(options?.in || date, _date.getTime());
    endOfDesiredMonth.setMonth(_date.getMonth() + amount + 1, 0);
    const daysInMonth = endOfDesiredMonth.getDate();
    if (dayOfMonth >= daysInMonth) {
      return endOfDesiredMonth;
    } else {
      _date.setFullYear(
        endOfDesiredMonth.getFullYear(),
        endOfDesiredMonth.getMonth(),
        dayOfMonth
      );
      return _date;
    }
  }

  // node_modules/react-day-picker/node_modules/date-fns/getISOWeekYear.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/react-day-picker/node_modules/date-fns/startOfISOWeek.js
  init_define_import_meta_env();
  init_define_process_env();
  function startOfISOWeek(date, options) {
    return startOfWeek(date, { ...options, weekStartsOn: 1 });
  }

  // node_modules/react-day-picker/node_modules/date-fns/getISOWeekYear.js
  function getISOWeekYear(date, options) {
    const _date = toDate(date, options?.in);
    const year = _date.getFullYear();
    const fourthOfJanuaryOfNextYear = constructFrom(_date, 0);
    fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
    fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
    const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
    const fourthOfJanuaryOfThisYear = constructFrom(_date, 0);
    fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
    fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
    const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
    if (_date.getTime() >= startOfNextYear.getTime()) {
      return year + 1;
    } else if (_date.getTime() >= startOfThisYear.getTime()) {
      return year;
    } else {
      return year - 1;
    }
  }

  // node_modules/react-day-picker/node_modules/date-fns/differenceInCalendarDays.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/react-day-picker/node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js
  init_define_import_meta_env();
  init_define_process_env();
  function getTimezoneOffsetInMilliseconds(date) {
    const _date = toDate(date);
    const utcDate = new Date(
      Date.UTC(
        _date.getFullYear(),
        _date.getMonth(),
        _date.getDate(),
        _date.getHours(),
        _date.getMinutes(),
        _date.getSeconds(),
        _date.getMilliseconds()
      )
    );
    utcDate.setUTCFullYear(_date.getFullYear());
    return +date - +utcDate;
  }

  // node_modules/react-day-picker/node_modules/date-fns/startOfDay.js
  init_define_import_meta_env();
  init_define_process_env();
  function startOfDay(date, options) {
    const _date = toDate(date, options?.in);
    _date.setHours(0, 0, 0, 0);
    return _date;
  }

  // node_modules/react-day-picker/node_modules/date-fns/differenceInCalendarDays.js
  function differenceInCalendarDays(laterDate, earlierDate, options) {
    const [laterDate_, earlierDate_] = normalizeDates(
      options?.in,
      laterDate,
      earlierDate
    );
    const laterStartOfDay = startOfDay(laterDate_);
    const earlierStartOfDay = startOfDay(earlierDate_);
    const laterTimestamp = +laterStartOfDay - getTimezoneOffsetInMilliseconds(laterStartOfDay);
    const earlierTimestamp = +earlierStartOfDay - getTimezoneOffsetInMilliseconds(earlierStartOfDay);
    return Math.round((laterTimestamp - earlierTimestamp) / millisecondsInDay);
  }

  // node_modules/react-day-picker/node_modules/date-fns/startOfISOWeekYear.js
  init_define_import_meta_env();
  init_define_process_env();
  function startOfISOWeekYear(date, options) {
    const year = getISOWeekYear(date, options);
    const fourthOfJanuary = constructFrom(options?.in || date, 0);
    fourthOfJanuary.setFullYear(year, 0, 4);
    fourthOfJanuary.setHours(0, 0, 0, 0);
    return startOfISOWeek(fourthOfJanuary);
  }

  // node_modules/react-day-picker/node_modules/date-fns/addWeeks.js
  init_define_import_meta_env();
  init_define_process_env();
  function addWeeks(date, amount, options) {
    return addDays(date, amount * 7, options);
  }

  // node_modules/react-day-picker/node_modules/date-fns/addYears.js
  init_define_import_meta_env();
  init_define_process_env();
  function addYears(date, amount, options) {
    return addMonths(date, amount * 12, options);
  }

  // node_modules/react-day-picker/node_modules/date-fns/max.js
  init_define_import_meta_env();
  init_define_process_env();
  function max(dates, options) {
    let result;
    let context = options?.in;
    dates.forEach((date) => {
      if (!context && typeof date === "object")
        context = constructFrom.bind(null, date);
      const date_ = toDate(date, context);
      if (!result || result < date_ || isNaN(+date_)) result = date_;
    });
    return constructFrom(context, result || NaN);
  }

  // node_modules/react-day-picker/node_modules/date-fns/min.js
  init_define_import_meta_env();
  init_define_process_env();
  function min(dates, options) {
    let result;
    let context = options?.in;
    dates.forEach((date) => {
      if (!context && typeof date === "object")
        context = constructFrom.bind(null, date);
      const date_ = toDate(date, context);
      if (!result || result > date_ || isNaN(+date_)) result = date_;
    });
    return constructFrom(context, result || NaN);
  }

  // node_modules/react-day-picker/node_modules/date-fns/isSameDay.js
  init_define_import_meta_env();
  init_define_process_env();
  function isSameDay(laterDate, earlierDate, options) {
    const [dateLeft_, dateRight_] = normalizeDates(
      options?.in,
      laterDate,
      earlierDate
    );
    return +startOfDay(dateLeft_) === +startOfDay(dateRight_);
  }

  // node_modules/react-day-picker/node_modules/date-fns/isValid.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/react-day-picker/node_modules/date-fns/isDate.js
  init_define_import_meta_env();
  init_define_process_env();
  function isDate(value) {
    return value instanceof Date || typeof value === "object" && Object.prototype.toString.call(value) === "[object Date]";
  }

  // node_modules/react-day-picker/node_modules/date-fns/isValid.js
  function isValid(date) {
    return !(!isDate(date) && typeof date !== "number" || isNaN(+toDate(date)));
  }

  // node_modules/react-day-picker/node_modules/date-fns/differenceInCalendarMonths.js
  init_define_import_meta_env();
  init_define_process_env();
  function differenceInCalendarMonths(laterDate, earlierDate, options) {
    const [laterDate_, earlierDate_] = normalizeDates(
      options?.in,
      laterDate,
      earlierDate
    );
    const yearsDiff = laterDate_.getFullYear() - earlierDate_.getFullYear();
    const monthsDiff = laterDate_.getMonth() - earlierDate_.getMonth();
    return yearsDiff * 12 + monthsDiff;
  }

  // node_modules/react-day-picker/node_modules/date-fns/endOfMonth.js
  init_define_import_meta_env();
  init_define_process_env();
  function endOfMonth(date, options) {
    const _date = toDate(date, options?.in);
    const month = _date.getMonth();
    _date.setFullYear(_date.getFullYear(), month + 1, 0);
    _date.setHours(23, 59, 59, 999);
    return _date;
  }

  // node_modules/react-day-picker/node_modules/date-fns/_lib/normalizeInterval.js
  init_define_import_meta_env();
  init_define_process_env();
  function normalizeInterval(context, interval) {
    const [start, end] = normalizeDates(context, interval.start, interval.end);
    return { start, end };
  }

  // node_modules/react-day-picker/node_modules/date-fns/eachMonthOfInterval.js
  init_define_import_meta_env();
  init_define_process_env();
  function eachMonthOfInterval(interval, options) {
    const { start, end } = normalizeInterval(options?.in, interval);
    let reversed = +start > +end;
    const endTime = reversed ? +start : +end;
    const date = reversed ? end : start;
    date.setHours(0, 0, 0, 0);
    date.setDate(1);
    let step = options?.step ?? 1;
    if (!step) return [];
    if (step < 0) {
      step = -step;
      reversed = !reversed;
    }
    const dates = [];
    while (+date <= endTime) {
      dates.push(constructFrom(start, date));
      date.setMonth(date.getMonth() + step);
    }
    return reversed ? dates.reverse() : dates;
  }

  // node_modules/react-day-picker/node_modules/date-fns/startOfMonth.js
  init_define_import_meta_env();
  init_define_process_env();
  function startOfMonth(date, options) {
    const _date = toDate(date, options?.in);
    _date.setDate(1);
    _date.setHours(0, 0, 0, 0);
    return _date;
  }

  // node_modules/react-day-picker/node_modules/date-fns/endOfYear.js
  init_define_import_meta_env();
  init_define_process_env();
  function endOfYear(date, options) {
    const _date = toDate(date, options?.in);
    const year = _date.getFullYear();
    _date.setFullYear(year + 1, 0, 0);
    _date.setHours(23, 59, 59, 999);
    return _date;
  }

  // node_modules/react-day-picker/node_modules/date-fns/startOfYear.js
  init_define_import_meta_env();
  init_define_process_env();
  function startOfYear(date, options) {
    const date_ = toDate(date, options?.in);
    date_.setFullYear(date_.getFullYear(), 0, 1);
    date_.setHours(0, 0, 0, 0);
    return date_;
  }

  // node_modules/react-day-picker/node_modules/date-fns/eachYearOfInterval.js
  init_define_import_meta_env();
  init_define_process_env();
  function eachYearOfInterval(interval, options) {
    const { start, end } = normalizeInterval(options?.in, interval);
    let reversed = +start > +end;
    const endTime = reversed ? +start : +end;
    const date = reversed ? end : start;
    date.setHours(0, 0, 0, 0);
    date.setMonth(0, 1);
    let step = options?.step ?? 1;
    if (!step) return [];
    if (step < 0) {
      step = -step;
      reversed = !reversed;
    }
    const dates = [];
    while (+date <= endTime) {
      dates.push(constructFrom(start, date));
      date.setFullYear(date.getFullYear() + step);
    }
    return reversed ? dates.reverse() : dates;
  }

  // node_modules/react-day-picker/node_modules/date-fns/endOfISOWeek.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/react-day-picker/node_modules/date-fns/endOfWeek.js
  init_define_import_meta_env();
  init_define_process_env();
  function endOfWeek(date, options) {
    const defaultOptions2 = getDefaultOptions();
    const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0;
    const _date = toDate(date, options?.in);
    const day = _date.getDay();
    const diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
    _date.setDate(_date.getDate() + diff);
    _date.setHours(23, 59, 59, 999);
    return _date;
  }

  // node_modules/react-day-picker/node_modules/date-fns/endOfISOWeek.js
  function endOfISOWeek(date, options) {
    return endOfWeek(date, { ...options, weekStartsOn: 1 });
  }

  // node_modules/react-day-picker/node_modules/date-fns/format.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/react-day-picker/node_modules/date-fns/_lib/defaultLocale.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/react-day-picker/node_modules/date-fns/_lib/format/formatters.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/react-day-picker/node_modules/date-fns/getDayOfYear.js
  init_define_import_meta_env();
  init_define_process_env();
  function getDayOfYear(date, options) {
    const _date = toDate(date, options?.in);
    const diff = differenceInCalendarDays(_date, startOfYear(_date));
    const dayOfYear = diff + 1;
    return dayOfYear;
  }

  // node_modules/react-day-picker/node_modules/date-fns/getISOWeek.js
  init_define_import_meta_env();
  init_define_process_env();
  function getISOWeek(date, options) {
    const _date = toDate(date, options?.in);
    const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);
    return Math.round(diff / millisecondsInWeek) + 1;
  }

  // node_modules/react-day-picker/node_modules/date-fns/getWeek.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/react-day-picker/node_modules/date-fns/startOfWeekYear.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/react-day-picker/node_modules/date-fns/getWeekYear.js
  init_define_import_meta_env();
  init_define_process_env();
  function getWeekYear(date, options) {
    const _date = toDate(date, options?.in);
    const year = _date.getFullYear();
    const defaultOptions2 = getDefaultOptions();
    const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1;
    const firstWeekOfNextYear = constructFrom(options?.in || date, 0);
    firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
    firstWeekOfNextYear.setHours(0, 0, 0, 0);
    const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
    const firstWeekOfThisYear = constructFrom(options?.in || date, 0);
    firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
    firstWeekOfThisYear.setHours(0, 0, 0, 0);
    const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
    if (+_date >= +startOfNextYear) {
      return year + 1;
    } else if (+_date >= +startOfThisYear) {
      return year;
    } else {
      return year - 1;
    }
  }

  // node_modules/react-day-picker/node_modules/date-fns/startOfWeekYear.js
  function startOfWeekYear(date, options) {
    const defaultOptions2 = getDefaultOptions();
    const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1;
    const year = getWeekYear(date, options);
    const firstWeek = constructFrom(options?.in || date, 0);
    firstWeek.setFullYear(year, 0, firstWeekContainsDate);
    firstWeek.setHours(0, 0, 0, 0);
    const _date = startOfWeek(firstWeek, options);
    return _date;
  }

  // node_modules/react-day-picker/node_modules/date-fns/getWeek.js
  function getWeek(date, options) {
    const _date = toDate(date, options?.in);
    const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);
    return Math.round(diff / millisecondsInWeek) + 1;
  }

  // node_modules/react-day-picker/node_modules/date-fns/_lib/addLeadingZeros.js
  init_define_import_meta_env();
  init_define_process_env();
  function addLeadingZeros(number, targetLength) {
    const sign = number < 0 ? "-" : "";
    const output = Math.abs(number).toString().padStart(targetLength, "0");
    return sign + output;
  }

  // node_modules/react-day-picker/node_modules/date-fns/_lib/format/lightFormatters.js
  init_define_import_meta_env();
  init_define_process_env();
  var lightFormatters = {
    // Year
    y(date, token) {
      const signedYear = date.getFullYear();
      const year = signedYear > 0 ? signedYear : 1 - signedYear;
      return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
    },
    // Month
    M(date, token) {
      const month = date.getMonth();
      return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
    },
    // Day of the month
    d(date, token) {
      return addLeadingZeros(date.getDate(), token.length);
    },
    // AM or PM
    a(date, token) {
      const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
      switch (token) {
        case "a":
        case "aa":
          return dayPeriodEnumValue.toUpperCase();
        case "aaa":
          return dayPeriodEnumValue;
        case "aaaaa":
          return dayPeriodEnumValue[0];
        case "aaaa":
        default:
          return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
      }
    },
    // Hour [1-12]
    h(date, token) {
      return addLeadingZeros(date.getHours() % 12 || 12, token.length);
    },
    // Hour [0-23]
    H(date, token) {
      return addLeadingZeros(date.getHours(), token.length);
    },
    // Minute
    m(date, token) {
      return addLeadingZeros(date.getMinutes(), token.length);
    },
    // Second
    s(date, token) {
      return addLeadingZeros(date.getSeconds(), token.length);
    },
    // Fraction of second
    S(date, token) {
      const numberOfDigits = token.length;
      const milliseconds = date.getMilliseconds();
      const fractionalSeconds = Math.trunc(
        milliseconds * Math.pow(10, numberOfDigits - 3)
      );
      return addLeadingZeros(fractionalSeconds, token.length);
    }
  };

  // node_modules/react-day-picker/node_modules/date-fns/_lib/format/formatters.js
  var dayPeriodEnum = {
    am: "am",
    pm: "pm",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  };
  var formatters = {
    // Era
    G: function(date, token, localize3) {
      const era = date.getFullYear() > 0 ? 1 : 0;
      switch (token) {
        // AD, BC
        case "G":
        case "GG":
        case "GGG":
          return localize3.era(era, { width: "abbreviated" });
        // A, B
        case "GGGGG":
          return localize3.era(era, { width: "narrow" });
        // Anno Domini, Before Christ
        case "GGGG":
        default:
          return localize3.era(era, { width: "wide" });
      }
    },
    // Year
    y: function(date, token, localize3) {
      if (token === "yo") {
        const signedYear = date.getFullYear();
        const year = signedYear > 0 ? signedYear : 1 - signedYear;
        return localize3.ordinalNumber(year, { unit: "year" });
      }
      return lightFormatters.y(date, token);
    },
    // Local week-numbering year
    Y: function(date, token, localize3, options) {
      const signedWeekYear = getWeekYear(date, options);
      const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
      if (token === "YY") {
        const twoDigitYear = weekYear % 100;
        return addLeadingZeros(twoDigitYear, 2);
      }
      if (token === "Yo") {
        return localize3.ordinalNumber(weekYear, { unit: "year" });
      }
      return addLeadingZeros(weekYear, token.length);
    },
    // ISO week-numbering year
    R: function(date, token) {
      const isoWeekYear = getISOWeekYear(date);
      return addLeadingZeros(isoWeekYear, token.length);
    },
    // Extended year. This is a single number designating the year of this calendar system.
    // The main difference between `y` and `u` localizers are B.C. years:
    // | Year | `y` | `u` |
    // |------|-----|-----|
    // | AC 1 |   1 |   1 |
    // | BC 1 |   1 |   0 |
    // | BC 2 |   2 |  -1 |
    // Also `yy` always returns the last two digits of a year,
    // while `uu` pads single digit years to 2 characters and returns other years unchanged.
    u: function(date, token) {
      const year = date.getFullYear();
      return addLeadingZeros(year, token.length);
    },
    // Quarter
    Q: function(date, token, localize3) {
      const quarter = Math.ceil((date.getMonth() + 1) / 3);
      switch (token) {
        // 1, 2, 3, 4
        case "Q":
          return String(quarter);
        // 01, 02, 03, 04
        case "QQ":
          return addLeadingZeros(quarter, 2);
        // 1st, 2nd, 3rd, 4th
        case "Qo":
          return localize3.ordinalNumber(quarter, { unit: "quarter" });
        // Q1, Q2, Q3, Q4
        case "QQQ":
          return localize3.quarter(quarter, {
            width: "abbreviated",
            context: "formatting"
          });
        // 1, 2, 3, 4 (narrow quarter; could be not numerical)
        case "QQQQQ":
          return localize3.quarter(quarter, {
            width: "narrow",
            context: "formatting"
          });
        // 1st quarter, 2nd quarter, ...
        case "QQQQ":
        default:
          return localize3.quarter(quarter, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    // Stand-alone quarter
    q: function(date, token, localize3) {
      const quarter = Math.ceil((date.getMonth() + 1) / 3);
      switch (token) {
        // 1, 2, 3, 4
        case "q":
          return String(quarter);
        // 01, 02, 03, 04
        case "qq":
          return addLeadingZeros(quarter, 2);
        // 1st, 2nd, 3rd, 4th
        case "qo":
          return localize3.ordinalNumber(quarter, { unit: "quarter" });
        // Q1, Q2, Q3, Q4
        case "qqq":
          return localize3.quarter(quarter, {
            width: "abbreviated",
            context: "standalone"
          });
        // 1, 2, 3, 4 (narrow quarter; could be not numerical)
        case "qqqqq":
          return localize3.quarter(quarter, {
            width: "narrow",
            context: "standalone"
          });
        // 1st quarter, 2nd quarter, ...
        case "qqqq":
        default:
          return localize3.quarter(quarter, {
            width: "wide",
            context: "standalone"
          });
      }
    },
    // Month
    M: function(date, token, localize3) {
      const month = date.getMonth();
      switch (token) {
        case "M":
        case "MM":
          return lightFormatters.M(date, token);
        // 1st, 2nd, ..., 12th
        case "Mo":
          return localize3.ordinalNumber(month + 1, { unit: "month" });
        // Jan, Feb, ..., Dec
        case "MMM":
          return localize3.month(month, {
            width: "abbreviated",
            context: "formatting"
          });
        // J, F, ..., D
        case "MMMMM":
          return localize3.month(month, {
            width: "narrow",
            context: "formatting"
          });
        // January, February, ..., December
        case "MMMM":
        default:
          return localize3.month(month, { width: "wide", context: "formatting" });
      }
    },
    // Stand-alone month
    L: function(date, token, localize3) {
      const month = date.getMonth();
      switch (token) {
        // 1, 2, ..., 12
        case "L":
          return String(month + 1);
        // 01, 02, ..., 12
        case "LL":
          return addLeadingZeros(month + 1, 2);
        // 1st, 2nd, ..., 12th
        case "Lo":
          return localize3.ordinalNumber(month + 1, { unit: "month" });
        // Jan, Feb, ..., Dec
        case "LLL":
          return localize3.month(month, {
            width: "abbreviated",
            context: "standalone"
          });
        // J, F, ..., D
        case "LLLLL":
          return localize3.month(month, {
            width: "narrow",
            context: "standalone"
          });
        // January, February, ..., December
        case "LLLL":
        default:
          return localize3.month(month, { width: "wide", context: "standalone" });
      }
    },
    // Local week of year
    w: function(date, token, localize3, options) {
      const week = getWeek(date, options);
      if (token === "wo") {
        return localize3.ordinalNumber(week, { unit: "week" });
      }
      return addLeadingZeros(week, token.length);
    },
    // ISO week of year
    I: function(date, token, localize3) {
      const isoWeek = getISOWeek(date);
      if (token === "Io") {
        return localize3.ordinalNumber(isoWeek, { unit: "week" });
      }
      return addLeadingZeros(isoWeek, token.length);
    },
    // Day of the month
    d: function(date, token, localize3) {
      if (token === "do") {
        return localize3.ordinalNumber(date.getDate(), { unit: "date" });
      }
      return lightFormatters.d(date, token);
    },
    // Day of year
    D: function(date, token, localize3) {
      const dayOfYear = getDayOfYear(date);
      if (token === "Do") {
        return localize3.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
      }
      return addLeadingZeros(dayOfYear, token.length);
    },
    // Day of week
    E: function(date, token, localize3) {
      const dayOfWeek = date.getDay();
      switch (token) {
        // Tue
        case "E":
        case "EE":
        case "EEE":
          return localize3.day(dayOfWeek, {
            width: "abbreviated",
            context: "formatting"
          });
        // T
        case "EEEEE":
          return localize3.day(dayOfWeek, {
            width: "narrow",
            context: "formatting"
          });
        // Tu
        case "EEEEEE":
          return localize3.day(dayOfWeek, {
            width: "short",
            context: "formatting"
          });
        // Tuesday
        case "EEEE":
        default:
          return localize3.day(dayOfWeek, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    // Local day of week
    e: function(date, token, localize3, options) {
      const dayOfWeek = date.getDay();
      const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
      switch (token) {
        // Numerical value (Nth day of week with current locale or weekStartsOn)
        case "e":
          return String(localDayOfWeek);
        // Padded numerical value
        case "ee":
          return addLeadingZeros(localDayOfWeek, 2);
        // 1st, 2nd, ..., 7th
        case "eo":
          return localize3.ordinalNumber(localDayOfWeek, { unit: "day" });
        case "eee":
          return localize3.day(dayOfWeek, {
            width: "abbreviated",
            context: "formatting"
          });
        // T
        case "eeeee":
          return localize3.day(dayOfWeek, {
            width: "narrow",
            context: "formatting"
          });
        // Tu
        case "eeeeee":
          return localize3.day(dayOfWeek, {
            width: "short",
            context: "formatting"
          });
        // Tuesday
        case "eeee":
        default:
          return localize3.day(dayOfWeek, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    // Stand-alone local day of week
    c: function(date, token, localize3, options) {
      const dayOfWeek = date.getDay();
      const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
      switch (token) {
        // Numerical value (same as in `e`)
        case "c":
          return String(localDayOfWeek);
        // Padded numerical value
        case "cc":
          return addLeadingZeros(localDayOfWeek, token.length);
        // 1st, 2nd, ..., 7th
        case "co":
          return localize3.ordinalNumber(localDayOfWeek, { unit: "day" });
        case "ccc":
          return localize3.day(dayOfWeek, {
            width: "abbreviated",
            context: "standalone"
          });
        // T
        case "ccccc":
          return localize3.day(dayOfWeek, {
            width: "narrow",
            context: "standalone"
          });
        // Tu
        case "cccccc":
          return localize3.day(dayOfWeek, {
            width: "short",
            context: "standalone"
          });
        // Tuesday
        case "cccc":
        default:
          return localize3.day(dayOfWeek, {
            width: "wide",
            context: "standalone"
          });
      }
    },
    // ISO day of week
    i: function(date, token, localize3) {
      const dayOfWeek = date.getDay();
      const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
      switch (token) {
        // 2
        case "i":
          return String(isoDayOfWeek);
        // 02
        case "ii":
          return addLeadingZeros(isoDayOfWeek, token.length);
        // 2nd
        case "io":
          return localize3.ordinalNumber(isoDayOfWeek, { unit: "day" });
        // Tue
        case "iii":
          return localize3.day(dayOfWeek, {
            width: "abbreviated",
            context: "formatting"
          });
        // T
        case "iiiii":
          return localize3.day(dayOfWeek, {
            width: "narrow",
            context: "formatting"
          });
        // Tu
        case "iiiiii":
          return localize3.day(dayOfWeek, {
            width: "short",
            context: "formatting"
          });
        // Tuesday
        case "iiii":
        default:
          return localize3.day(dayOfWeek, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    // AM or PM
    a: function(date, token, localize3) {
      const hours = date.getHours();
      const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
      switch (token) {
        case "a":
        case "aa":
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting"
          });
        case "aaa":
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting"
          }).toLowerCase();
        case "aaaaa":
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "narrow",
            context: "formatting"
          });
        case "aaaa":
        default:
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    // AM, PM, midnight, noon
    b: function(date, token, localize3) {
      const hours = date.getHours();
      let dayPeriodEnumValue;
      if (hours === 12) {
        dayPeriodEnumValue = dayPeriodEnum.noon;
      } else if (hours === 0) {
        dayPeriodEnumValue = dayPeriodEnum.midnight;
      } else {
        dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
      }
      switch (token) {
        case "b":
        case "bb":
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting"
          });
        case "bbb":
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting"
          }).toLowerCase();
        case "bbbbb":
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "narrow",
            context: "formatting"
          });
        case "bbbb":
        default:
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    // in the morning, in the afternoon, in the evening, at night
    B: function(date, token, localize3) {
      const hours = date.getHours();
      let dayPeriodEnumValue;
      if (hours >= 17) {
        dayPeriodEnumValue = dayPeriodEnum.evening;
      } else if (hours >= 12) {
        dayPeriodEnumValue = dayPeriodEnum.afternoon;
      } else if (hours >= 4) {
        dayPeriodEnumValue = dayPeriodEnum.morning;
      } else {
        dayPeriodEnumValue = dayPeriodEnum.night;
      }
      switch (token) {
        case "B":
        case "BB":
        case "BBB":
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting"
          });
        case "BBBBB":
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "narrow",
            context: "formatting"
          });
        case "BBBB":
        default:
          return localize3.dayPeriod(dayPeriodEnumValue, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    // Hour [1-12]
    h: function(date, token, localize3) {
      if (token === "ho") {
        let hours = date.getHours() % 12;
        if (hours === 0) hours = 12;
        return localize3.ordinalNumber(hours, { unit: "hour" });
      }
      return lightFormatters.h(date, token);
    },
    // Hour [0-23]
    H: function(date, token, localize3) {
      if (token === "Ho") {
        return localize3.ordinalNumber(date.getHours(), { unit: "hour" });
      }
      return lightFormatters.H(date, token);
    },
    // Hour [0-11]
    K: function(date, token, localize3) {
      const hours = date.getHours() % 12;
      if (token === "Ko") {
        return localize3.ordinalNumber(hours, { unit: "hour" });
      }
      return addLeadingZeros(hours, token.length);
    },
    // Hour [1-24]
    k: function(date, token, localize3) {
      let hours = date.getHours();
      if (hours === 0) hours = 24;
      if (token === "ko") {
        return localize3.ordinalNumber(hours, { unit: "hour" });
      }
      return addLeadingZeros(hours, token.length);
    },
    // Minute
    m: function(date, token, localize3) {
      if (token === "mo") {
        return localize3.ordinalNumber(date.getMinutes(), { unit: "minute" });
      }
      return lightFormatters.m(date, token);
    },
    // Second
    s: function(date, token, localize3) {
      if (token === "so") {
        return localize3.ordinalNumber(date.getSeconds(), { unit: "second" });
      }
      return lightFormatters.s(date, token);
    },
    // Fraction of second
    S: function(date, token) {
      return lightFormatters.S(date, token);
    },
    // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
    X: function(date, token, _localize) {
      const timezoneOffset = date.getTimezoneOffset();
      if (timezoneOffset === 0) {
        return "Z";
      }
      switch (token) {
        // Hours and optional minutes
        case "X":
          return formatTimezoneWithOptionalMinutes(timezoneOffset);
        // Hours, minutes and optional seconds without `:` delimiter
        // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
        // so this token always has the same output as `XX`
        case "XXXX":
        case "XX":
          return formatTimezone(timezoneOffset);
        // Hours, minutes and optional seconds with `:` delimiter
        // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
        // so this token always has the same output as `XXX`
        case "XXXXX":
        case "XXX":
        // Hours and minutes with `:` delimiter
        default:
          return formatTimezone(timezoneOffset, ":");
      }
    },
    // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
    x: function(date, token, _localize) {
      const timezoneOffset = date.getTimezoneOffset();
      switch (token) {
        // Hours and optional minutes
        case "x":
          return formatTimezoneWithOptionalMinutes(timezoneOffset);
        // Hours, minutes and optional seconds without `:` delimiter
        // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
        // so this token always has the same output as `xx`
        case "xxxx":
        case "xx":
          return formatTimezone(timezoneOffset);
        // Hours, minutes and optional seconds with `:` delimiter
        // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
        // so this token always has the same output as `xxx`
        case "xxxxx":
        case "xxx":
        // Hours and minutes with `:` delimiter
        default:
          return formatTimezone(timezoneOffset, ":");
      }
    },
    // Timezone (GMT)
    O: function(date, token, _localize) {
      const timezoneOffset = date.getTimezoneOffset();
      switch (token) {
        // Short
        case "O":
        case "OO":
        case "OOO":
          return "GMT" + formatTimezoneShort(timezoneOffset, ":");
        // Long
        case "OOOO":
        default:
          return "GMT" + formatTimezone(timezoneOffset, ":");
      }
    },
    // Timezone (specific non-location)
    z: function(date, token, _localize) {
      const timezoneOffset = date.getTimezoneOffset();
      switch (token) {
        // Short
        case "z":
        case "zz":
        case "zzz":
          return "GMT" + formatTimezoneShort(timezoneOffset, ":");
        // Long
        case "zzzz":
        default:
          return "GMT" + formatTimezone(timezoneOffset, ":");
      }
    },
    // Seconds timestamp
    t: function(date, token, _localize) {
      const timestamp = Math.trunc(+date / 1e3);
      return addLeadingZeros(timestamp, token.length);
    },
    // Milliseconds timestamp
    T: function(date, token, _localize) {
      return addLeadingZeros(+date, token.length);
    }
  };
  function formatTimezoneShort(offset, delimiter = "") {
    const sign = offset > 0 ? "-" : "+";
    const absOffset = Math.abs(offset);
    const hours = Math.trunc(absOffset / 60);
    const minutes = absOffset % 60;
    if (minutes === 0) {
      return sign + String(hours);
    }
    return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
  }
  function formatTimezoneWithOptionalMinutes(offset, delimiter) {
    if (offset % 60 === 0) {
      const sign = offset > 0 ? "-" : "+";
      return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
    }
    return formatTimezone(offset, delimiter);
  }
  function formatTimezone(offset, delimiter = "") {
    const sign = offset > 0 ? "-" : "+";
    const absOffset = Math.abs(offset);
    const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2);
    const minutes = addLeadingZeros(absOffset % 60, 2);
    return sign + hours + delimiter + minutes;
  }

  // node_modules/react-day-picker/node_modules/date-fns/_lib/format/longFormatters.js
  init_define_import_meta_env();
  init_define_process_env();
  var dateLongFormatter = (pattern, formatLong3) => {
    switch (pattern) {
      case "P":
        return formatLong3.date({ width: "short" });
      case "PP":
        return formatLong3.date({ width: "medium" });
      case "PPP":
        return formatLong3.date({ width: "long" });
      case "PPPP":
      default:
        return formatLong3.date({ width: "full" });
    }
  };
  var timeLongFormatter = (pattern, formatLong3) => {
    switch (pattern) {
      case "p":
        return formatLong3.time({ width: "short" });
      case "pp":
        return formatLong3.time({ width: "medium" });
      case "ppp":
        return formatLong3.time({ width: "long" });
      case "pppp":
      default:
        return formatLong3.time({ width: "full" });
    }
  };
  var dateTimeLongFormatter = (pattern, formatLong3) => {
    const matchResult = pattern.match(/(P+)(p+)?/) || [];
    const datePattern = matchResult[1];
    const timePattern = matchResult[2];
    if (!timePattern) {
      return dateLongFormatter(pattern, formatLong3);
    }
    let dateTimeFormat;
    switch (datePattern) {
      case "P":
        dateTimeFormat = formatLong3.dateTime({ width: "short" });
        break;
      case "PP":
        dateTimeFormat = formatLong3.dateTime({ width: "medium" });
        break;
      case "PPP":
        dateTimeFormat = formatLong3.dateTime({ width: "long" });
        break;
      case "PPPP":
      default:
        dateTimeFormat = formatLong3.dateTime({ width: "full" });
        break;
    }
    return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong3)).replace("{{time}}", timeLongFormatter(timePattern, formatLong3));
  };
  var longFormatters = {
    p: timeLongFormatter,
    P: dateTimeLongFormatter
  };

  // node_modules/react-day-picker/node_modules/date-fns/_lib/protectedTokens.js
  init_define_import_meta_env();
  init_define_process_env();
  var dayOfYearTokenRE = /^D+$/;
  var weekYearTokenRE = /^Y+$/;
  var throwTokens = ["D", "DD", "YY", "YYYY"];
  function isProtectedDayOfYearToken(token) {
    return dayOfYearTokenRE.test(token);
  }
  function isProtectedWeekYearToken(token) {
    return weekYearTokenRE.test(token);
  }
  function warnOrThrowProtectedError(token, format2, input) {
    const _message = message(token, format2, input);
    console.warn(_message);
    if (throwTokens.includes(token)) throw new RangeError(_message);
  }
  function message(token, format2, input) {
    const subject = token[0] === "Y" ? "years" : "days of the month";
    return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format2}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
  }

  // node_modules/react-day-picker/node_modules/date-fns/format.js
  var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
  var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
  var escapedStringRegExp = /^'([^]*?)'?$/;
  var doubleQuoteRegExp = /''/g;
  var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
  function format(date, formatStr, options) {
    const defaultOptions2 = getDefaultOptions();
    const locale = options?.locale ?? defaultOptions2.locale ?? enUS;
    const firstWeekContainsDate = options?.firstWeekContainsDate ?? options?.locale?.options?.firstWeekContainsDate ?? defaultOptions2.firstWeekContainsDate ?? defaultOptions2.locale?.options?.firstWeekContainsDate ?? 1;
    const weekStartsOn = options?.weekStartsOn ?? options?.locale?.options?.weekStartsOn ?? defaultOptions2.weekStartsOn ?? defaultOptions2.locale?.options?.weekStartsOn ?? 0;
    const originalDate = toDate(date, options?.in);
    if (!isValid(originalDate)) {
      throw new RangeError("Invalid time value");
    }
    let parts = formatStr.match(longFormattingTokensRegExp).map((substring) => {
      const firstCharacter = substring[0];
      if (firstCharacter === "p" || firstCharacter === "P") {
        const longFormatter = longFormatters[firstCharacter];
        return longFormatter(substring, locale.formatLong);
      }
      return substring;
    }).join("").match(formattingTokensRegExp).map((substring) => {
      if (substring === "''") {
        return { isToken: false, value: "'" };
      }
      const firstCharacter = substring[0];
      if (firstCharacter === "'") {
        return { isToken: false, value: cleanEscapedString(substring) };
      }
      if (formatters[firstCharacter]) {
        return { isToken: true, value: substring };
      }
      if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" + firstCharacter + "`"
        );
      }
      return { isToken: false, value: substring };
    });
    if (locale.localize.preprocessor) {
      parts = locale.localize.preprocessor(originalDate, parts);
    }
    const formatterOptions = {
      firstWeekContainsDate,
      weekStartsOn,
      locale
    };
    return parts.map((part) => {
      if (!part.isToken) return part.value;
      const token = part.value;
      if (!options?.useAdditionalWeekYearTokens && isProtectedWeekYearToken(token) || !options?.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(token)) {
        warnOrThrowProtectedError(token, formatStr, String(date));
      }
      const formatter = formatters[token[0]];
      return formatter(originalDate, token, locale.localize, formatterOptions);
    }).join("");
  }
  function cleanEscapedString(input) {
    const matched = input.match(escapedStringRegExp);
    if (!matched) {
      return input;
    }
    return matched[1].replace(doubleQuoteRegExp, "'");
  }

  // node_modules/react-day-picker/node_modules/date-fns/getDaysInMonth.js
  init_define_import_meta_env();
  init_define_process_env();
  function getDaysInMonth(date, options) {
    const _date = toDate(date, options?.in);
    const year = _date.getFullYear();
    const monthIndex = _date.getMonth();
    const lastDayOfMonth = constructFrom(_date, 0);
    lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
    lastDayOfMonth.setHours(0, 0, 0, 0);
    return lastDayOfMonth.getDate();
  }

  // node_modules/react-day-picker/node_modules/date-fns/getMonth.js
  init_define_import_meta_env();
  init_define_process_env();
  function getMonth(date, options) {
    return toDate(date, options?.in).getMonth();
  }

  // node_modules/react-day-picker/node_modules/date-fns/getYear.js
  init_define_import_meta_env();
  init_define_process_env();
  function getYear(date, options) {
    return toDate(date, options?.in).getFullYear();
  }

  // node_modules/react-day-picker/node_modules/date-fns/isAfter.js
  init_define_import_meta_env();
  init_define_process_env();
  function isAfter(date, dateToCompare) {
    return +toDate(date) > +toDate(dateToCompare);
  }

  // node_modules/react-day-picker/node_modules/date-fns/isBefore.js
  init_define_import_meta_env();
  init_define_process_env();
  function isBefore(date, dateToCompare) {
    return +toDate(date) < +toDate(dateToCompare);
  }

  // node_modules/react-day-picker/node_modules/date-fns/isSameMonth.js
  init_define_import_meta_env();
  init_define_process_env();
  function isSameMonth(laterDate, earlierDate, options) {
    const [laterDate_, earlierDate_] = normalizeDates(
      options?.in,
      laterDate,
      earlierDate
    );
    return laterDate_.getFullYear() === earlierDate_.getFullYear() && laterDate_.getMonth() === earlierDate_.getMonth();
  }

  // node_modules/react-day-picker/node_modules/date-fns/isSameYear.js
  init_define_import_meta_env();
  init_define_process_env();
  function isSameYear(laterDate, earlierDate, options) {
    const [laterDate_, earlierDate_] = normalizeDates(
      options?.in,
      laterDate,
      earlierDate
    );
    return laterDate_.getFullYear() === earlierDate_.getFullYear();
  }

  // node_modules/react-day-picker/node_modules/date-fns/setMonth.js
  init_define_import_meta_env();
  init_define_process_env();
  function setMonth(date, month, options) {
    const _date = toDate(date, options?.in);
    const year = _date.getFullYear();
    const day = _date.getDate();
    const midMonth = constructFrom(options?.in || date, 0);
    midMonth.setFullYear(year, month, 15);
    midMonth.setHours(0, 0, 0, 0);
    const daysInMonth = getDaysInMonth(midMonth);
    _date.setMonth(month, Math.min(day, daysInMonth));
    return _date;
  }

  // node_modules/react-day-picker/node_modules/date-fns/setYear.js
  init_define_import_meta_env();
  init_define_process_env();
  function setYear(date, year, options) {
    const date_ = toDate(date, options?.in);
    if (isNaN(+date_)) return constructFrom(options?.in || date, NaN);
    date_.setFullYear(year);
    return date_;
  }

  // node_modules/react-day-picker/dist/esm/helpers/endOfBroadcastWeek.js
  init_define_import_meta_env();
  init_define_process_env();

  // node_modules/react-day-picker/dist/esm/helpers/getBroadcastWeeksInMonth.js
  init_define_import_meta_env();
  init_define_process_env();
  var FIVE_WEEKS = 5;
  var FOUR_WEEKS = 4;
  function getBroadcastWeeksInMonth(month, dateLib) {
    const firstDayOfMonth = dateLib.startOfMonth(month);
    const firstDayOfWeek = firstDayOfMonth.getDay() > 0 ? firstDayOfMonth.getDay() : 7;
    const broadcastStartDate = dateLib.addDays(month, -firstDayOfWeek + 1);
    const lastDateOfLastWeek = dateLib.addDays(broadcastStartDate, FIVE_WEEKS * 7 - 1);
    const numberOfWeeks = dateLib.getMonth(month) === dateLib.getMonth(lastDateOfLastWeek) ? FIVE_WEEKS : FOUR_WEEKS;
    return numberOfWeeks;
  }

  // node_modules/react-day-picker/dist/esm/helpers/startOfBroadcastWeek.js
  init_define_import_meta_env();
  init_define_process_env();
  function startOfBroadcastWeek(date, dateLib) {
    const firstOfMonth = dateLib.startOfMonth(date);
    const dayOfWeek = firstOfMonth.getDay();
    if (dayOfWeek === 1) {
      return firstOfMonth;
    } else if (dayOfWeek === 0) {
      return dateLib.addDays(firstOfMonth, -1 * 6);
    } else {
      return dateLib.addDays(firstOfMonth, -1 * (dayOfWeek - 1));
    }
  }

  // node_modules/react-day-picker/dist/esm/helpers/endOfBroadcastWeek.js
  function endOfBroadcastWeek(date, dateLib) {
    const startDate = startOfBroadcastWeek(date, dateLib);
    const numberOfWeeks = getBroadcastWeeksInMonth(date, dateLib);
    const endDate = dateLib.addDays(startDate, numberOfWeeks * 7 - 1);
    return endDate;
  }

  // node_modules/react-day-picker/dist/esm/locale/en-US.js
  init_define_import_meta_env();
  init_define_process_env();
  var enUS2 = {
    ...enUS,
    labels: {
      labelDayButton: (date, modifiers, options, dateLib) => {
        let formatDate;
        if (dateLib && typeof dateLib.format === "function") {
          formatDate = dateLib.format.bind(dateLib);
        } else {
          formatDate = (d, pattern) => format(d, pattern, { locale: enUS, ...options });
        }
        let label = formatDate(date, "PPPP");
        if (modifiers.today)
          label = `Today, ${label}`;
        if (modifiers.selected)
          label = `${label}, selected`;
        return label;
      },
      labelMonthDropdown: "Choose the Month",
      labelNext: "Go to the Next Month",
      labelPrevious: "Go to the Previous Month",
      labelWeekNumber: (weekNumber) => `Week ${weekNumber}`,
      labelYearDropdown: "Choose the Year",
      labelGrid: (date, options, dateLib) => {
        let formatDate;
        if (dateLib && typeof dateLib.format === "function") {
          formatDate = dateLib.format.bind(dateLib);
        } else {
          formatDate = (d, pattern) => format(d, pattern, { locale: enUS, ...options });
        }
        return formatDate(date, "LLLL yyyy");
      },
      labelGridcell: (date, modifiers, options, dateLib) => {
        let formatDate;
        if (dateLib && typeof dateLib.format === "function") {
          formatDate = dateLib.format.bind(dateLib);
        } else {
          formatDate = (d, pattern) => format(d, pattern, { locale: enUS, ...options });
        }
        let label = formatDate(date, "PPPP");
        if (modifiers?.today) {
          label = `Today, ${label}`;
        }
        return label;
      },
      labelNav: "Navigation bar",
      labelWeekNumberHeader: "Week Number",
      labelWeekday: (date, options, dateLib) => {
        let formatDate;
        if (dateLib && typeof dateLib.format === "function") {
          formatDate = dateLib.format.bind(dateLib);
        } else {
          formatDate = (d, pattern) => format(d, pattern, { locale: enUS, ...options });
        }
        return formatDate(date, "cccc");
      }
    }
  };

  // node_modules/react-day-picker/dist/esm/classes/DateLib.js
  var DateLib = class _DateLib {
    /**
     * Creates an instance of `DateLib`.
     *
     * @param options Configuration options for the date library.
     * @param overrides Custom overrides for the date library functions.
     */
    constructor(options, overrides) {
      this.Date = Date;
      this.today = () => {
        if (this.overrides?.today) {
          return this.overrides.today();
        }
        if (this.options.timeZone) {
          return TZDate.tz(this.options.timeZone);
        }
        return new this.Date();
      };
      this.newDate = (year, monthIndex, date) => {
        if (this.overrides?.newDate) {
          return this.overrides.newDate(year, monthIndex, date);
        }
        if (this.options.timeZone) {
          return new TZDate(year, monthIndex, date, this.options.timeZone);
        }
        return new Date(year, monthIndex, date);
      };
      this.addDays = (date, amount) => {
        return this.overrides?.addDays ? this.overrides.addDays(date, amount) : addDays(date, amount);
      };
      this.addMonths = (date, amount) => {
        return this.overrides?.addMonths ? this.overrides.addMonths(date, amount) : addMonths(date, amount);
      };
      this.addWeeks = (date, amount) => {
        return this.overrides?.addWeeks ? this.overrides.addWeeks(date, amount) : addWeeks(date, amount);
      };
      this.addYears = (date, amount) => {
        return this.overrides?.addYears ? this.overrides.addYears(date, amount) : addYears(date, amount);
      };
      this.differenceInCalendarDays = (dateLeft, dateRight) => {
        return this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(dateLeft, dateRight) : differenceInCalendarDays(dateLeft, dateRight);
      };
      this.differenceInCalendarMonths = (dateLeft, dateRight) => {
        return this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(dateLeft, dateRight) : differenceInCalendarMonths(dateLeft, dateRight);
      };
      this.eachMonthOfInterval = (interval) => {
        return this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(interval) : eachMonthOfInterval(interval);
      };
      this.eachYearOfInterval = (interval) => {
        const years = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(interval) : eachYearOfInterval(interval);
        const uniqueYears = new Set(years.map((d) => this.getYear(d)));
        if (uniqueYears.size === years.length) {
          return years;
        }
        const yearsArray = [];
        uniqueYears.forEach((y) => {
          yearsArray.push(new Date(y, 0, 1));
        });
        return yearsArray;
      };
      this.endOfBroadcastWeek = (date) => {
        return this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(date) : endOfBroadcastWeek(date, this);
      };
      this.endOfISOWeek = (date) => {
        return this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(date) : endOfISOWeek(date);
      };
      this.endOfMonth = (date) => {
        return this.overrides?.endOfMonth ? this.overrides.endOfMonth(date) : endOfMonth(date);
      };
      this.endOfWeek = (date, options2) => {
        return this.overrides?.endOfWeek ? this.overrides.endOfWeek(date, options2) : endOfWeek(date, this.options);
      };
      this.endOfYear = (date) => {
        return this.overrides?.endOfYear ? this.overrides.endOfYear(date) : endOfYear(date);
      };
      this.format = (date, formatStr, _options) => {
        const formatted = this.overrides?.format ? this.overrides.format(date, formatStr, this.options) : format(date, formatStr, this.options);
        if (this.options.numerals && this.options.numerals !== "latn") {
          return this.replaceDigits(formatted);
        }
        return formatted;
      };
      this.getISOWeek = (date) => {
        return this.overrides?.getISOWeek ? this.overrides.getISOWeek(date) : getISOWeek(date);
      };
      this.getMonth = (date, _options) => {
        return this.overrides?.getMonth ? this.overrides.getMonth(date, this.options) : getMonth(date, this.options);
      };
      this.getYear = (date, _options) => {
        return this.overrides?.getYear ? this.overrides.getYear(date, this.options) : getYear(date, this.options);
      };
      this.getWeek = (date, _options) => {
        return this.overrides?.getWeek ? this.overrides.getWeek(date, this.options) : getWeek(date, this.options);
      };
      this.isAfter = (date, dateToCompare) => {
        return this.overrides?.isAfter ? this.overrides.isAfter(date, dateToCompare) : isAfter(date, dateToCompare);
      };
      this.isBefore = (date, dateToCompare) => {
        return this.overrides?.isBefore ? this.overrides.isBefore(date, dateToCompare) : isBefore(date, dateToCompare);
      };
      this.isDate = (value) => {
        return this.overrides?.isDate ? this.overrides.isDate(value) : isDate(value);
      };
      this.isSameDay = (dateLeft, dateRight) => {
        return this.overrides?.isSameDay ? this.overrides.isSameDay(dateLeft, dateRight) : isSameDay(dateLeft, dateRight);
      };
      this.isSameMonth = (dateLeft, dateRight) => {
        return this.overrides?.isSameMonth ? this.overrides.isSameMonth(dateLeft, dateRight) : isSameMonth(dateLeft, dateRight);
      };
      this.isSameYear = (dateLeft, dateRight) => {
        return this.overrides?.isSameYear ? this.overrides.isSameYear(dateLeft, dateRight) : isSameYear(dateLeft, dateRight);
      };
      this.max = (dates) => {
        return this.overrides?.max ? this.overrides.max(dates) : max(dates);
      };
      this.min = (dates) => {
        return this.overrides?.min ? this.overrides.min(dates) : min(dates);
      };
      this.setMonth = (date, month) => {
        return this.overrides?.setMonth ? this.overrides.setMonth(date, month) : setMonth(date, month);
      };
      this.setYear = (date, year) => {
        return this.overrides?.setYear ? this.overrides.setYear(date, year) : setYear(date, year);
      };
      this.startOfBroadcastWeek = (date, _dateLib) => {
        return this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(date, this) : startOfBroadcastWeek(date, this);
      };
      this.startOfDay = (date) => {
        return this.overrides?.startOfDay ? this.overrides.startOfDay(date) : startOfDay(date);
      };
      this.startOfISOWeek = (date) => {
        return this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(date) : startOfISOWeek(date);
      };
      this.startOfMonth = (date) => {
        return this.overrides?.startOfMonth ? this.overrides.startOfMonth(date) : startOfMonth(date);
      };
      this.startOfWeek = (date, _options) => {
        return this.overrides?.startOfWeek ? this.overrides.startOfWeek(date, this.options) : startOfWeek(date, this.options);
      };
      this.startOfYear = (date) => {
        return this.overrides?.startOfYear ? this.overrides.startOfYear(date) : startOfYear(date);
      };
      this.options = { locale: enUS2, ...options };
      this.overrides = overrides;
    }
    /**
     * Generates a mapping of Arabic digits (0-9) to the target numbering system
     * digits.
     *
     * @since 9.5.0
     * @returns A record mapping Arabic digits to the target numerals.
     */
    getDigitMap() {
      const { numerals = "latn" } = this.options;
      const formatter = new Intl.NumberFormat("en-US", {
        numberingSystem: numerals
      });
      const digitMap = {};
      for (let i = 0; i < 10; i++) {
        digitMap[i.toString()] = formatter.format(i);
      }
      return digitMap;
    }
    /**
     * Replaces Arabic digits in a string with the target numbering system digits.
     *
     * @since 9.5.0
     * @param input The string containing Arabic digits.
     * @returns The string with digits replaced.
     */
    replaceDigits(input) {
      const digitMap = this.getDigitMap();
      return input.replace(/\d/g, (digit) => digitMap[digit] || digit);
    }
    /**
     * Formats a number using the configured numbering system.
     *
     * @since 9.5.0
     * @param value The number to format.
     * @returns The formatted number as a string.
     */
    formatNumber(value) {
      return this.replaceDigits(value.toString());
    }
    /**
     * Returns the preferred ordering for month and year labels for the current
     * locale.
     */
    getMonthYearOrder() {
      const code = this.options.locale?.code;
      if (!code) {
        return "month-first";
      }
      return _DateLib.yearFirstLocales.has(code) ? "year-first" : "month-first";
    }
    /**
     * Formats the month/year pair respecting locale conventions.
     *
     * @since 9.11.0
     */
    formatMonthYear(date) {
      const { locale, timeZone, numerals } = this.options;
      const localeCode = locale?.code;
      if (localeCode && _DateLib.yearFirstLocales.has(localeCode)) {
        try {
          const intl = new Intl.DateTimeFormat(localeCode, {
            month: "long",
            year: "numeric",
            timeZone,
            numberingSystem: numerals
          });
          const formatted = intl.format(date);
          return formatted;
        } catch {
        }
      }
      const pattern = this.getMonthYearOrder() === "year-first" ? "y LLLL" : "LLLL y";
      return this.format(date, pattern);
    }
  };
  DateLib.yearFirstLocales = /* @__PURE__ */ new Set([
    "eu",
    "hu",
    "ja",
    "ja-Hira",
    "ja-JP",
    "ko",
    "ko-KR",
    "lt",
    "lt-LT",
    "lv",
    "lv-LV",
    "mn",
    "mn-MN",
    "zh",
    "zh-CN",
    "zh-HK",
    "zh-TW"
  ]);
  var defaultDateLib = new DateLib();

  // node_modules/react-day-picker/dist/esm/locale/et.js
  init_define_import_meta_env();
  init_define_process_env();
  var et2 = {
    ...et,
    labels: {
      labelDayButton: (date, modifiers, options, dateLib) => {
        const lib = dateLib ?? new DateLib(options);
        let label = lib.format(date, "PPPP");
        if (modifiers.today)
          label = `Täna, ${label}`;
        if (modifiers.selected)
          label = `${label}, valitud`;
        return label;
      },
      labelMonthDropdown: "Vali kuu",
      labelNext: "Mine järgmisele kuule",
      labelPrevious: "Mine eelmisele kuule",
      labelWeekNumber: (weekNumber) => `Nädal ${weekNumber}`,
      labelYearDropdown: "Vali aasta",
      labelGrid: (date, options, dateLib) => (dateLib ?? new DateLib(options)).formatMonthYear(date),
      labelGridcell: (date, modifiers, options, dateLib) => {
        const lib = dateLib ?? new DateLib(options);
        let label = lib.format(date, "PPPP");
        if (modifiers?.today) {
          label = `Täna, ${label}`;
        }
        return label;
      },
      labelNav: "Navigeerimisriba",
      labelWeekNumberHeader: "Nädala number",
      labelWeekday: (date, options, dateLib) => (dateLib ?? new DateLib(options)).format(date, "cccc")
    }
  };

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

  // ds-shim:ds:Calendar
  var ds_Calendar_exports = {};
  __export(ds_Calendar_exports, {
    default: () => ds_Calendar_default
  });
  init_define_import_meta_env();
  init_define_process_env();
  __reExport(ds_Calendar_exports, __toESM(require_ds_raw()));
  var g5 = window.Tedi;
  var ds_Calendar_default = g5["Calendar"] !== void 0 ? g5["Calendar"] : g5;

  // src/tedi/components/content/calendar/calendar.stories.tsx
  var import_jsx_runtime = __toESM(require_react_shim());
  var meta = {
    title: "TEDI-Ready/Content/Calendar",
    component: ds_Calendar_exports.Calendar
  };
  var calendar_stories_default = meta;
  var CalendarTemplate = (props) => {
    const [view, setView] = (0, import_react.useState)("days");
    const [currentMonth, setCurrentMonth] = (0, import_react.useState)(/* @__PURE__ */ new Date());
    const defaultValue = props.mode === "multiple" ? [] : props.mode === "range" ? { from: /* @__PURE__ */ new Date() } : void 0;
    const [value, setValue] = (0, import_react.useState)(props.value ?? defaultValue);
    const handleSelect = (selected, day, modifiers, event) => {
      setValue(selected);
      props.handleSelect?.(selected, day, modifiers, event);
    };
    const applyValue = (d) => {
      setValue(d);
      props.applyValue?.(d);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ds_Calendar_exports.Calendar,
      {
        view,
        selectionLevel: "days",
        currentMonth,
        setCurrentMonth,
        setView,
        mode: "single",
        value,
        locale: et2,
        showOutsideDays: true,
        handleSelect,
        applyValue,
        ...props
      }
    );
  };
  var Default = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarTemplate, {})
  };
  var WithFooter = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { gutterY: 3, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          CalendarTemplate,
          {
            footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: 12, className: "text-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "link", size: "small", iconRight: "schedule", children: "Select time" }) }) })
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          CalendarTemplate,
          {
            footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: 12, className: "text-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { iconRight: "arrow_forward", children: "Search times" }) }) })
          }
        ) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { gutterY: 3, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          CalendarTemplate,
          {
            footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: 12, className: "text-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", size: "small", children: "Cancel selection" }) }) })
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          CalendarTemplate,
          {
            footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: 12, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "secondary", fullWidth: true, size: "small", children: "Cancel" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_Button_default, { visualType: "primary", fullWidth: true, size: "small", children: "Save" })
            ] }) }) })
          }
        ) })
      ] })
    ] })
  };
  var MultipleSelectedDates = {
    render: () => {
      const defaultDates = [
        new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() - 10)),
        new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() - 2)),
        new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() + 6)),
        new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() + 7)),
        new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() + 12)),
        new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() + 16))
      ];
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarTemplate, { mode: "multiple", value: defaultDates, handleSelect: (d) => console.log("Selected:", d) });
    }
  };
  var WithLegend = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ds_VerticalSpacing_exports.VerticalSpacing, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      CalendarTemplate,
      {
        footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { width: "auto", className: "flex align-items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "div",
              {
                style: {
                  backgroundColor: "var(--form-datepicker-date-selected)",
                  width: "18px",
                  height: "18px",
                  borderRadius: "4px"
                }
              }
            ),
            " ",
            "Selected"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Col, { width: "auto", className: "flex align-items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "div",
              {
                style: {
                  backgroundColor: "var(--form-datepicker-date-available)",
                  border: "1px solid var(--green-200)",
                  width: "18px",
                  height: "18px",
                  borderRadius: "4px"
                }
              }
            ),
            " ",
            "Available"
          ] })
        ] })
      }
    ) }) }) })
  };
  var Availability = {
    render: () => {
      const today = /* @__PURE__ */ new Date();
      const availableDays = [
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
        new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4),
        new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
        new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6)
      ];
      const unavailableDays = [
        new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
        new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
        new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3)
      ];
      const [selectedAvailable, setSelectedAvailable] = (0, import_react.useState)();
      const [selectedUnavailable, setSelectedUnavailable] = (0, import_react.useState)();
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(grid_exports.Row, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          CalendarTemplate,
          {
            id: "available-days",
            mode: "single",
            value: selectedAvailable,
            availableDays,
            handleSelect: (selected, day, modifiers, event) => {
              setSelectedAvailable(selected);
            }
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(grid_exports.Col, { width: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          CalendarTemplate,
          {
            id: "unavailable-days",
            mode: "single",
            value: selectedUnavailable,
            unavailableDays,
            handleSelect: (selected, day, modifiers, event) => {
              setSelectedUnavailable(selected);
            }
          }
        ) })
      ] });
    }
  };
  var Range = {
    render: () => {
      const today = /* @__PURE__ */ new Date();
      const defaultRange = {
        from: today,
        to: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 12)
      };
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarTemplate, { mode: "range", value: defaultRange, handleSelect: (d) => console.log("Range selected:", d) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          CalendarTemplate,
          {
            mode: "range",
            value: defaultRange,
            numberOfMonths: 2,
            handleSelect: (d) => console.log("Range selected:", d),
            showNavigation: false
          }
        )
      ] });
    }
  };
  var NoControls = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarTemplate, { showNavigation: false })
  };
  var WithWeeksCount = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ds_VerticalSpacing_exports.VerticalSpacing, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarTemplate, { showWeekNumber: true }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarTemplate, { showWeekNumber: true, numberOfMonths: 2 })
    ] })
  };
  var MonthView = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarTemplate, { selectionLevel: "months", view: "months", showNavigation: false })
  };
  var YearView = {
    render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarTemplate, { selectionLevel: "years", view: "years" })
  };

  // .design-sync/.cache/previews/Calendar.tsx
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
    compose(calendar_stories_exports, "Default")
  );
  var WithFooter2 = (
    /* With Footer */
    compose(calendar_stories_exports, "WithFooter")
  );
  var MultipleSelectedDates2 = (
    /* Multiple Selected Dates */
    compose(calendar_stories_exports, "MultipleSelectedDates")
  );
  var WithLegend2 = (
    /* With Legend */
    compose(calendar_stories_exports, "WithLegend")
  );
  var Availability2 = (
    /* Availability */
    compose(calendar_stories_exports, "Availability")
  );
  var Range2 = (
    /* Range */
    compose(calendar_stories_exports, "Range")
  );
  var NoControls2 = (
    /* No Controls */
    compose(calendar_stories_exports, "NoControls")
  );
  var WithWeeksCount2 = (
    /* With Weeks Count */
    compose(calendar_stories_exports, "WithWeeksCount")
  );
  var MonthView2 = (
    /* Month View */
    compose(calendar_stories_exports, "MonthView")
  );
  var YearView2 = (
    /* Year View */
    compose(calendar_stories_exports, "YearView")
  );
  return __toCommonJS(Calendar_exports);
})();
