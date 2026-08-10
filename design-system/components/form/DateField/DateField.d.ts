import * as React from 'react';

/**
 * DateField — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/form/date-field/date-field.stories.tsx).
 */
export interface DateFieldProps {
  /** Unique identifier for the date field. */
  id: string;
  /** Field label. Required for accessibility. */
  label: string;
  /** Determines the selection mode of the calendar. - `'single'` (default) – only one date can be selected. The `selected` prop should be a `Date` object or `undefined`. - `'multiple'` – multiple individual dates can be selected. The `selected` prop should be an array of `Date` objects. - `'range'` – a continuous date range can be selected. The `selected` prop should be an object with `from` and optional `to` properties, both being `Date` objects. */
  mode?: "single" | "multiple" | "range";
  /** The currently selected date(s). The expected type depends on the `mode`: - For `mode="single"`, this should be a `Date` object or `undefined`. - For `mode="multiple"`, this should be an array of `Date` objects. - For `mode="range"`, this should be an object with a `from` property (a `Date` object) and an optional `to` property (also a `Date` object). */
  selected?: Date | Date[] | DateRange;
  /** Callback fired when the user selects a date or date range. The exact parameters depend on the `mode`: - For `mode="single"`, the callback receives the selected `Date` object (or `undefined` if cleared). - For `mode="multiple"`, the callback receives an array of selected `Date` objects. - For `mode="range"`, the callback receives an object with `from` and optional `to` properties, both being `Date` objects (or `undefined` if cleared). */
  onSelect?: OnSelectHandler<Date | Date[] | DateRange>;
  /** Disable specific dates. Accepts the same matchers as React DayPicker's `disabled` prop. */
  disabled?: boolean | ((date: Date) => boolean) | Date | Date[] | DateRange | DateBefore | DateAfter | DateInterval | DayOfWeek | Matcher[];
  /** Disable specific dates via react-day-picker matchers. Mirrors the `disabledMatchers` prop on `DateTimeField` so the API is consistent across the date-field family. Merges with the (deprecated) `disabled` overload — if both are supplied, the union of both matcher sets is applied. */
  disabledMatchers?: boolean | ((date: Date) => boolean) | Date | Date[] | DateRange | DateBefore | DateAfter | DateInterval | DayOfWeek | Matcher[];
  /** Input placeholder text when no date is selected. */
  placeholder?: string;
  /** Additional class name(s) to apply to the component container. */
  className?: string;
  /** Custom date formatting function. Receives the selected date(s) and should return a string for display in the input field. If not provided, a default formatter will be used that formats dates as "dd.MM.yyyy" in the "et-EE" locale. */
  formatDate?: (date: Date | Date[] | DateRange | undefined) => string;
  /** Show days from adjacent months in the calendar view. Default is `true`. */
  showOutsideDays?: boolean;
  /** Custom date parsing function for user input. Receives the input string and should return a `Date`, an array of `Date`s, a `DateRange`, or `undefined` if the input is invalid or cleared. If not provided, the component will not allow manual input and will rely solely on the calendar picker for date selection. */
  parseDate?: (value: string) => Date | Date[] | DateRange | undefined;
  /** Initial month to display when the calendar is opened. If not provided, defaults to the month of the currently selected date or the current month if no date is selected. */
  initialMonth?: Date;
  /** When `true`, the date field is marked as required, and the calendar will enforce that a date is selected before allowing the user to close it. Default is `false`. */
  required?: boolean;
  /** How the month/year selector in the calendar header is rendered. Forwarded to the internal `Calendar` / `CalendarHeader`. - `'dropdown'` (default) — each picker is a `<Select>` dropdown. - `'grid'` — each picker opens a full grid of options. */
  monthYearSelectType?: "dropdown" | "grid";
  /** Show or hide the calendar header's previous/next navigation. When hidden, the month/year header also becomes a static, non-interactive label (no dropdown / grid jumping) — so the calendar is locked to the visible month(s): a clean "pick from these" view for a fixed month or range. */
  showNavigation?: boolean;
  /** **Selection granularity** — controls the level at which a click finalises the date selection rather than drilling further into days. Use a coarser level when the consumer only needs to pick a year or a month. - `'years'` — clicking a year selects Jan 1 of that year and closes; the calendar opens on the year grid. - `'months'` — clicking a month selects the first day of that month; the calendar opens on the month grid. - `'days'` (default) — full day-level selection; the calendar opens on the day grid as usual. Distinct from the *currently visible* grid — that's managed internally and flips as the user navigates between year / month / day. This prop is the lowest level the user can drill down to before a click commits. */
  selectionLevel?: "days" | "months" | "years";
  /** **Initial grid** the calendar opens on, independent of `selectionLevel`. Use it to start the user on the year / month grid for fast year-first navigation while still letting them drill down and commit at the `selectionLevel` (e.g. `initialView="years"` with the default `selectionLevel="days"` opens the year grid → month grid → day grid). Pair with `monthYearSelectType="grid"` so the navigation stays grid-based. */
  initialView?: "days" | "months" | "years";
  /** The locale object for the calendar, used by React DayPicker. Defaults to Estonian locale. */
  locale?: DayPickerLocale;
  /** The locale code string used for date formatting. Defaults to 'et-EE'. */
  localeCode?: string;
  /** When `true`, the calendar popover will automatically close after a date is selected. Default behavior is to close on select only in 'single' mode. You can override this behavior by explicitly setting this prop to `true` or `false`. */
  closeOnSelect?: boolean;
  /** Custom footer content to display at the bottom of the calendar popover. Can be used to add action buttons or additional information. The footer will be rendered inside the calendar popover, below the calendar grid. */
  footer?: React.ReactNode;
  /** Initial value for uncontrolled usage */
  defaultValue?: Date | Date[] | DateRange;
  /** Minimum selectable date. Dates before this will be disabled. If you want to disable past dates, you can also use the `disablePast` boolean prop. */
  minDate?: Date;
  /** Maximum selectable date. Dates after this will be disabled. If you want to disable future dates, you can also use the `disableFuture` boolean prop. */
  maxDate?: Date;
  /** Disable all past dates. Dates before the current date will be disabled. */
  disablePast?: boolean;
  /** Disable all future dates. Dates after the current date will be disabled. */
  disableFuture?: boolean;
  /** Disable specific months dynamically. Receives a month `Date` object and should return `true` if that month should be disabled. */
  shouldDisableMonth?: (month: Date) => boolean;
  /** Disable specific years dynamically. Receives a year `Date` object and should return `true` if that year should be disabled. */
  shouldDisableYear?: (year: Date) => boolean;
  /** When `true`, the input field will be read-only, preventing manual text input. The calendar can still be opened and used for date selection. This is useful when you want to allow date selection only through the calendar picker and not allow users to type in dates manually. */
  readOnly?: boolean;
  /** Specify available days. Can be an array of `Date` objects or a function that receives a date and returns `true` if that date is available. This is useful for highlighting specific dates as available while keeping other dates enabled. */
  availableDays?: Date[] | ((date: Date) => boolean);
  /** Props to pass down to the underlying TextField (in 'single' mode) or MultiValueField (in 'multiple' mode). This allows for additional customization of the input field, such as adding custom styles, attributes, or event handlers. */
  inputProps?: DateTextFieldProps | DateMultiValueFieldProps;
  /** Layout for the selected-date tags in `'multiple'` mode. - `'stack'` (default) — tags wrap onto multiple rows; the field grows in height. - `'row'` — tags stay on a single row; any that don't fit collapse into a `+N` counter (measured from the available width). */
  tagsDirection?: "row" | "stack";
  /** Open the calendar inside a modal instead of a floating popover. Useful on narrow viewports where a popover overlaps the input itself. Mirrors `TimeField`'s `modal` prop. - `true` always opens in a modal - `false` (default) always uses the popover - A breakpoint name (e.g. `'md'`) opens in a modal *below* that breakpoint and falls back to the popover from that breakpoint up Ignored when `useNativePicker` resolves to `true` (the native picker is already handled by the OS). */
  modal?: boolean | "sm" | "md" | "lg" | "xl" | "xxl";
  /** Extra props forwarded to the calendar modal's `Modal.Content` — e.g. `size`, `width`, `maxWidth`, `position`, `fullscreen`, and per-breakpoint overrides. Lets the consumer tune the modal beyond its responsive-width defaults. `className` is merged with the component's own (so the internal layout is preserved). Only applies when the calendar opens as a modal. */
  modalProps?: Omit<ModalContentProps, "children">;
  /** Heading shown at the top of the calendar modal. Falls back to the `date-field.modal-title` label. Handy for month/year-only pickers (e.g. `"Vali kuu"` / `"Vali aasta"`). Only applies when the calendar opens as a modal. */
  modalTitle?: string;
  /** Error message rendered below the input when the user types a date that matches one of the disable matchers (`disablePast`, `disableFuture`, `minDate`, `maxDate`, `disabledMatchers`, or the deprecated `disabled` overload). Falls back to the localised `dateField.disabledDateError` label. */
  disabledDateErrorMessage?: string;
  /** Error message rendered below the input when the typed text cannot be parsed into a valid date for the current `mode`. Validation runs on blur so partially-typed input isn't flagged mid-typing. Falls back to the localised `dateField.invalidDateError` label. */
  invalidDateErrorMessage?: string;
  /** Whether the calendar popover is interactive. */
  enableCalendar?: boolean;
  /** What opens the calendar — only the icon (`'button'`) or anywhere in the input (`'input'`). */
  calendarTrigger?: "button" | "input";
  /** Swap the custom calendar for the browser's native `<input type="date">`. Only applies to `mode='single'`. */
  useNativePicker?: boolean;
  /** Number of months shown side-by-side. In the **popover** on mobile (`< md`) values > 1 are clamped to 1 — a multi-month popover gets unscrollable on a phone viewport. In a **modal** the count is kept: the months wrap to a vertical stack and the modal body scrolls. */
  numberOfMonths?: number;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<DateFieldBreakpointProps>;
  md?: Partial<DateFieldBreakpointProps>;
  lg?: Partial<DateFieldBreakpointProps>;
  xl?: Partial<DateFieldBreakpointProps>;
  xxl?: Partial<DateFieldBreakpointProps>;
  /** Style to apply to the root element. */
  style?: React.CSSProperties;
  /** Add a `title` attribute to the container element. */
  title?: string;
  /** Animate navigating between months. */
  animate?: boolean;
  /** When a selection mode is set, DayPicker will focus the first selected day (if set) or today's date (if not disabled). Use this prop when you need to focus DayPicker after a user action, for improved accessibility. */
  autoFocus?: boolean;
  /** The text direction of the calendar. Use `ltr` for left-to-right (default) or `rtl` for right-to-left. */
  dir?: string;
  /** Apply the `hidden` modifier to the matching days. Will hide them from the calendar. */
  hidden?: boolean | ((date: Date) => boolean) | Date | Date[] | DateRange | DateBefore | DateAfter | DateInterval | DayOfWeek | Matcher[];
  /** Add the language tag to the container element. When omitted, DayPicker uses the active locale code (`locale.code`). Set this prop to override the language tag. */
  lang?: string;
  /** A cryptographic nonce ("number used once") which can be used by Content Security Policy for the inline `style` attributes. */
  nonce?: string;
  /** The role attribute to add to the container element. */
  role?: "dialog" | "application";
  /** Change the class names used by DayPicker. Use this prop when you need to change the default class names — for example, when importing the style via CSS modules or when using a CSS framework. */
  classNames?: Partial<ClassNames> & Partial<DeprecatedUI<string>>;
  /** Change the class name for the day matching the `modifiers`. */
  modifiersClassNames?: ModifiersClassNames;
  /** Change the inline styles of the HTML elements. */
  styles?: Partial<Styles> & Partial<DeprecatedUI<React.CSSProperties>>;
  /** Change the class name for the day matching the {@link modifiers}. */
  modifiersStyles?: ModifiersStyles;
  /** The initial month to show in the calendar. Use this prop to let DayPicker control the current month. If you need to set the month programmatically, use {@link month} and {@link onMonthChange}. */
  defaultMonth?: Date;
  /** The month displayed in the calendar. As opposed to `defaultMonth`, use this prop with `onMonthChange` to change the month programmatically. */
  month?: Date;
  /** The earliest month to start the month navigation. */
  startMonth?: Date;
  fromDate?: Date;
  fromMonth?: Date;
  fromYear?: number;
  /** The latest month to end the month navigation. */
  endMonth?: Date;
  toDate?: Date;
  toMonth?: Date;
  toYear?: number;
  /** Paginate the month navigation displaying the `numberOfMonths` at a time. */
  pagedNavigation?: boolean;
  /** Render the months in reversed order (when {@link numberOfMonths} is set) to display the most recent month first. */
  reverseMonths?: boolean;
  /** Hide the navigation buttons. This prop won't disable the navigation: to disable the navigation, use {@link disableNavigation}. */
  hideNavigation?: boolean;
  /** Disable the navigation between months. This prop won't hide the navigation: to hide the navigation, use {@link hideNavigation}. */
  disableNavigation?: boolean;
  /** Show dropdowns to navigate between months or years. - `label`: Displays the month and year as a label. Default value. - `dropdown`: Displays dropdowns for both month and year navigation. - `dropdown-months`: Displays a dropdown only for the month navigation. - `dropdown-years`: Displays a dropdown only for the year navigation. **Note:** By default, showing the dropdown will set the {@link startMonth} to 100 years ago and {@link endMonth} to the end of the current year. You can override this behavior by explicitly setting `startMonth` and `endMonth`. */
  captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years";
  /** Reverse the order of years in the dropdown when using `captionLayout="dropdown"` or `captionLayout="dropdown-years"`. */
  reverseYears?: boolean;
  /** Adjust the positioning of the navigation buttons. - `around`: Displays the buttons on either side of the caption. - `after`: Displays the buttons after the caption. This ensures the tab order matches the visual order. If not set, the buttons default to being displayed after the caption, but the tab order may not align with the visual order. */
  navLayout?: "around" | "after";
  /** Display always 6 weeks per each month, regardless of the month’s number of weeks. Weeks will be filled with the days from the next month. */
  fixedWeeks?: boolean;
  /** Hide the row displaying the weekday row header. */
  hideWeekdays?: boolean;
  /** Show the week numbers column. Weeks are numbered according to the local week index. */
  showWeekNumber?: boolean;
  /** Display the weeks in the month following the broadcast calendar. Setting this prop will ignore {@link weekStartsOn} (always Monday) and {@link showOutsideDays} will default to true. */
  broadcastCalendar?: boolean;
  /** Use ISO week dates instead of the locale setting. Setting this prop will ignore `weekStartsOn` and `firstWeekContainsDate`. */
  ISOWeek?: boolean;
  /** The time zone (IANA or UTC offset) to use in the calendar (experimental). See [Wikipedia](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) for the possible values. */
  timeZone?: string;
  /** Keep calendar math at noon in the configured {@link timeZone} to avoid historical second-level offsets drifting dates across midnight. This prop sets the time of the dates to noon (12:00). */
  noonSafe?: boolean;
  /** Change the components used for rendering the calendar elements. */
  components?: Partial<CustomComponents>;
  initialFocus?: boolean;
  /** The today’s date. Default is the current date. This date will get the `today` modifier to style the day. */
  today?: Date;
  /** Add modifiers to the matching days. */
  modifiers?: Record<string, Matcher | Matcher[]>;
  /** Labels creators to override the defaults. Use this prop to customize the aria-label attributes in DayPicker. */
  labels?: Partial<Labels>;
  /** Formatters used to format dates to strings. Use this prop to override the default functions. */
  formatters?: Partial<Formatters>;
  /** The numeral system to use when formatting dates. - `latn`: Latin (Western Arabic) - `arab`: Arabic-Indic - `arabext`: Eastern Arabic-Indic (Persian) - `deva`: Devanagari - `beng`: Bengali - `guru`: Gurmukhi - `gujr`: Gujarati - `orya`: Oriya - `tamldec`: Tamil - `telu`: Telugu - `knda`: Kannada - `mlym`: Malayalam */
  numerals?: "latn" | "arab" | "arabext" | "deva" | "geez" | "beng" | "guru" | "gujr" | "orya" | "tamldec" | "telu" | "knda" | "mlym" | "thai" | "mymr" | "khmr" | "laoo" | "tibt";
  /** The index of the first day of the week (0 - Sunday). Overrides the locale's default. */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** The day of January that is always in the first week of the year. */
  firstWeekContainsDate?: 1 | 4;
  /** Enable `DD` and `DDDD` for week year tokens when formatting or parsing dates. */
  useAdditionalWeekYearTokens?: boolean;
  /** Enable `YY` and `YYYY` for day of year tokens when formatting or parsing dates. */
  useAdditionalDayOfYearTokens?: boolean;
  /** Replace the default date library with a custom one. Experimental: not guaranteed to be stable (may not respect semver). */
  dateLib?: Partial<DateLib>;
}

// Referenced types, resolved one level deep (see the story source for the rest).
type DateFieldBreakpointProps = {
    /**
     * Whether the calendar popover is interactive.
     * @default true
     */
    enableCalendar?: boolean;
    /**
     * What opens the calendar — only the icon (`'button'`) or anywhere in the input (`'input'`).
     * @default button
     */
    calendarTrigger?: DateFieldCalendarTrigger;
    /**
     * Swap the custom calendar for the browser's native `<input type="date">`.
     * Only applies to `mode='single'`.
     * @default false
     */
    useNativePicker?: boolean;
    /**
     * Number of months shown side-by-side. In the **popover** on mobile (`< md`) values > 1 are
     * clamped to 1 — a multi-month popover gets unscrollable on a phone viewport. In a **modal** the
     * count is kept: the months wrap to a vertical stack and the modal body scrolls.
     */
    numberOfMonths?: number;
};

type DateMultiValueFieldProps = Omit<MultiValueFieldProps, 'label' | 'id'>;

type DateTextFieldProps = Omit<TextFieldProps, 'label' | 'id'>;

export declare const DateField: React.ComponentType<DateFieldProps>;
