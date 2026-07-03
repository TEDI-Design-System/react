import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import cn from 'classnames';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { dateMatchModifiers, DateRange, DayPickerProps, Locale, Matcher, OnSelectHandler } from 'react-day-picker';
import { et } from 'react-day-picker/locale';

import {
  type Breakpoint,
  BreakpointSupport,
  isBreakpointBelow,
  useBreakpoint,
  useBreakpointProps,
} from '../../../helpers';
import { useLabels } from '../../../providers/label-provider';
import { UnknownType } from '../../../types/commonTypes';
import { Calendar } from '../../content/calendar/calendar';
import type { ModalContentProps } from '../../overlays/modal/modal-content/modal-content';
import MultiValueField, { MultiValueFieldProps, MultiValueFieldRef } from '../multi-value-field/multi-value-field';
import TextField, { TextFieldForwardRef, TextFieldProps } from '../textfield/textfield';
import styles from './date-field.module.scss';
import {
  buildDateRegexSource,
  CALENDAR_POPOVER_OFFSET,
  CALENDAR_POPOVER_PADDING,
  getLocaleDateParts,
  resolveRangeSelection,
} from './date-field-helpers';
import { DatePickerModal } from './date-picker-modal/date-picker-modal';

export type DateFieldModal = boolean | Exclude<Breakpoint, 'xs'>;

export type DateFieldMode = 'single' | 'multiple' | 'range';
export type CalendarView = 'days' | 'months' | 'years';
export type DateFieldCalendarTrigger = 'input' | 'button';
type DateTextFieldProps = Omit<TextFieldProps, 'label' | 'id'>;
type DateMultiValueFieldProps = Omit<MultiValueFieldProps, 'label' | 'id'>;

/**
 * Subset of DateField props that can be overridden per breakpoint via the
 * `BreakpointSupport` API (e.g. `<DateField useNativePicker md={{ useNativePicker: false }} />`).
 */
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

export interface DateFieldProps
  extends BreakpointSupport<DateFieldBreakpointProps>,
    Omit<DayPickerProps, 'mode' | 'selected' | 'onSelect' | 'numberOfMonths'> {
  /**
   * Unique identifier for the date field.
   */
  id: string;
  /**
   * Field label. Required for accessibility.
   */
  label: string;
  /**
   * Determines the selection mode of the calendar.
   * - `'single'` (default) – only one date can be selected. The `selected` prop should be a `Date` object or `undefined`.
   * - `'multiple'` – multiple individual dates can be selected. The `selected` prop should be an array of `Date` objects.
   * - `'range'` – a continuous date range can be selected. The `selected` prop should be an object with `from` and optional `to` properties, both being `Date` objects.
   *
   * @default single
   */
  mode?: DateFieldMode;
  /**
   * The currently selected date(s). The expected type depends on the `mode`:
   * - For `mode="single"`, this should be a `Date` object or `undefined`.
   * - For `mode="multiple"`, this should be an array of `Date` objects.
   * - For `mode="range"`, this should be an object with a `from` property (a `Date` object) and an optional `to` property (also a `Date` object).
   */
  selected?: Date | Date[] | DateRange | undefined;
  /**
   * Callback fired when the user selects a date or date range. The exact parameters depend on the `mode`:
   * - For `mode="single"`, the callback receives the selected `Date` object (or `undefined` if cleared).
   * - For `mode="multiple"`, the callback receives an array of selected `Date` objects.
   * - For `mode="range"`, the callback receives an object with `from` and optional `to` properties, both being `Date` objects (or `undefined` if cleared).
   */
  onSelect?: OnSelectHandler<Date | Date[] | DateRange | undefined>;
  /**
   * Disable specific dates. Accepts the same matchers as React DayPicker's `disabled` prop.
   *
   * @deprecated Use `disabledMatchers` instead — same shape, semantics, and merging
   * behaviour. The current overload re-uses the form-control `disabled` name for a
   * matcher prop, which is inconsistent with `DateTimeField`'s boolean `disabled`
   * and confusing for consumers migrating between the two siblings. `disabledMatchers`
   * stays additive for now; this overload will be replaced by `disabled?: boolean`
   * in a future major.
   */
  disabled?: Matcher | Matcher[];
  /**
   * Disable specific dates via react-day-picker matchers. Mirrors the
   * `disabledMatchers` prop on `DateTimeField` so the API is consistent across
   * the date-field family. Merges with the (deprecated) `disabled` overload —
   * if both are supplied, the union of both matcher sets is applied.
   */
  disabledMatchers?: Matcher | Matcher[];
  /**
   * Input placeholder text when no date is selected.
   */
  placeholder?: string;
  /**
   * Additional class name(s) to apply to the component container.
   */
  className?: string;
  /**
   * Custom date formatting function. Receives the selected date(s) and should return a string for display in the input field.
   * If not provided, a default formatter will be used that formats dates as "dd.MM.yyyy" in the "et-EE" locale.
   */
  formatDate?: (date: Date | Date[] | DateRange | undefined) => string;
  /**
   * Show days from adjacent months in the calendar view. Default is `true`.
   *
   * @default true
   */
  showOutsideDays?: boolean;
  /**
   * Custom date parsing function for user input. Receives the input string and should return a `Date`, an array of `Date`s, a `DateRange`, or `undefined` if the input is invalid or cleared.
   * If not provided, the component will not allow manual input and will rely solely on the calendar picker for date selection.
   */
  parseDate?: (value: string) => Date | Date[] | DateRange | undefined;
  /**
   * Initial month to display when the calendar is opened. If not provided, defaults to the month of the currently selected date or the current month if no date is selected.
   */
  initialMonth?: Date;
  /**
   * When `true`, the date field is marked as required, and the calendar will enforce that a date is selected before allowing the user to close it. Default is `false`.
   *
   * @default false
   */
  required?: boolean;
  /**
   * How the month/year selector in the calendar header is rendered.
   * Forwarded to the internal `Calendar` / `CalendarHeader`.
   * - `'dropdown'` (default) — each picker is a `<Select>` dropdown.
   * - `'grid'` — each picker opens a full grid of options.
   * @default dropdown
   */
  monthYearSelectType?: 'dropdown' | 'grid';
  /**
   * Show or hide the calendar header's previous/next navigation. When hidden, the month/year header
   * also becomes a static, non-interactive label (no dropdown / grid jumping) — so the calendar is
   * locked to the visible month(s): a clean "pick from these" view for a fixed month or range.
   * @default true
   */
  showNavigation?: boolean;
  /**
   * **Selection granularity** — controls the level at which a click finalises
   * the date selection rather than drilling further into days. Use a coarser
   * level when the consumer only needs to pick a year or a month.
   * - `'years'` — clicking a year selects Jan 1 of that year and closes; the
   *   calendar opens on the year grid.
   * - `'months'` — clicking a month selects the first day of that month; the
   *   calendar opens on the month grid.
   * - `'days'` (default) — full day-level selection; the calendar opens on
   *   the day grid as usual.
   *
   * Distinct from the *currently visible* grid — that's managed internally
   * and flips as the user navigates between year / month / day. This prop
   * is the lowest level the user can drill down to before a click commits.
   * @default 'days'
   */
  selectionLevel?: CalendarView;
  /**
   * **Initial grid** the calendar opens on, independent of `selectionLevel`.
   * Use it to start the user on the year / month grid for fast year-first
   * navigation while still letting them drill down and commit at the
   * `selectionLevel` (e.g. `initialView="years"` with the default
   * `selectionLevel="days"` opens the year grid → month grid → day grid).
   * Pair with `monthYearSelectType="grid"` so the navigation stays grid-based.
   * @default selectionLevel
   */
  initialView?: CalendarView;
  /**
   * The locale object for the calendar, used by React DayPicker. Defaults to Estonian locale.
   */
  locale?: Locale;
  /**
   * The locale code string used for date formatting. Defaults to 'et-EE'.
   */
  localeCode?: string;
  /**
   * When `true`, the calendar popover will automatically close after a date is selected. Default behavior is to close on select only in 'single' mode.
   * You can override this behavior by explicitly setting this prop to `true` or `false`.
   *
   * @default depends on mode (true for 'single', false for 'multiple' and 'range')
   */
  closeOnSelect?: boolean;
  /**
   * Custom footer content to display at the bottom of the calendar popover. Can be used to add action buttons or additional information.
   * The footer will be rendered inside the calendar popover, below the calendar grid.
   */
  footer?: React.ReactNode;
  /**
   * Initial value for uncontrolled usage
   */
  defaultValue?: Date | Date[] | DateRange;
  /**
   * Minimum selectable date. Dates before this will be disabled.
   * If you want to disable past dates, you can also use the `disablePast` boolean prop.
   */
  minDate?: Date;
  /**
   * Maximum selectable date. Dates after this will be disabled.
   * If you want to disable future dates, you can also use the `disableFuture` boolean prop.
   */
  maxDate?: Date;
  /**
   * Disable all past dates. Dates before the current date will be disabled.
   */
  disablePast?: boolean;
  /**
   * Disable all future dates. Dates after the current date will be disabled.
   */
  disableFuture?: boolean;
  /**
   * Disable specific months dynamically. Receives a month `Date` object and should return `true` if that month should be disabled.
   */
  shouldDisableMonth?: (month: Date) => boolean;
  /**
   * Disable specific years dynamically. Receives a year `Date` object and should return `true` if that year should be disabled.
   */
  shouldDisableYear?: (year: Date) => boolean;
  /**
   * When `true`, the input field will be read-only, preventing manual text input. The calendar can still be opened and used for date selection.
   * This is useful when you want to allow date selection only through the calendar picker and not allow users to type in dates manually.
   *
   * @default false
   */
  readOnly?: boolean;
  /**
   * Specify available days. Can be an array of `Date` objects or a function that receives a date and returns `true` if that date is available.
   * This is useful for highlighting specific dates as available while keeping other dates enabled.
   */
  availableDays?: Date[] | ((date: Date) => boolean);
  /**
   * Props to pass down to the underlying TextField (in 'single' mode) or MultiValueField (in 'multiple' mode). This allows for additional customization of the input field, such as adding custom styles, attributes, or event handlers.
   */
  inputProps?: DateTextFieldProps | DateMultiValueFieldProps;
  /**
   * Layout for the selected-date tags in `'multiple'` mode.
   * - `'stack'` (default) — tags wrap onto multiple rows; the field grows in height.
   * - `'row'` — tags stay on a single row; any that don't fit collapse into a
   *   `+N` counter (measured from the available width).
   * @default stack
   */
  tagsDirection?: 'stack' | 'row';
  /**
   * Open the calendar inside a modal instead of a floating popover. Useful
   * on narrow viewports where a popover overlaps the input itself. Mirrors
   * `TimeField`'s `modal` prop.
   *
   * - `true` always opens in a modal
   * - `false` (default) always uses the popover
   * - A breakpoint name (e.g. `'md'`) opens in a modal *below* that breakpoint
   *   and falls back to the popover from that breakpoint up
   *
   * Ignored when `useNativePicker` resolves to `true` (the native picker is
   * already handled by the OS).
   * @default false
   */
  modal?: DateFieldModal;
  /**
   * Extra props forwarded to the calendar modal's `Modal.Content` — e.g. `size`, `width`, `maxWidth`,
   * `position`, `fullscreen`, and per-breakpoint overrides. Lets the consumer tune the modal beyond
   * its responsive-width defaults. `className` is merged with the component's own (so the internal
   * layout is preserved). Only applies when the calendar opens as a modal.
   */
  modalProps?: Omit<ModalContentProps, 'children'>;
  /**
   * Heading shown at the top of the calendar modal. Falls back to the `date-field.modal-title`
   * label. Handy for month/year-only pickers (e.g. `"Vali kuu"` / `"Vali aasta"`). Only applies when
   * the calendar opens as a modal.
   */
  modalTitle?: string;
  /**
   * Error message rendered below the input when the user types a date that
   * matches one of the disable matchers (`disablePast`, `disableFuture`,
   * `minDate`, `maxDate`, `disabledMatchers`, or the deprecated `disabled`
   * overload). Falls back to the localised `dateField.disabledDateError`
   * label.
   */
  disabledDateErrorMessage?: string;
  /**
   * Error message rendered below the input when the typed text cannot be parsed
   * into a valid date for the current `mode`. Validation runs on blur so
   * partially-typed input isn't flagged mid-typing. Falls back to the localised
   * `dateField.invalidDateError` label.
   */
  invalidDateErrorMessage?: string;
}

export const DateField = React.forwardRef<TextFieldForwardRef, DateFieldProps>((props, ref) => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const { getLabel } = useLabels();
  const {
    useNativePicker = false,
    enableCalendar = true,
    calendarTrigger = 'button',
    numberOfMonths,
  } = getCurrentBreakpointProps<DateFieldBreakpointProps>(props);

  const {
    id,
    mode = 'single',
    label,
    selected,
    onSelect,
    disabled,
    disabledMatchers: disabledMatchersProp,
    placeholder,
    className,
    formatDate,
    required,
    showOutsideDays = true,
    parseDate,
    monthYearSelectType,
    tagsDirection,
    showNavigation = true,
    selectionLevel = 'days',
    initialView,
    locale = et,
    localeCode = 'et-EE',
    initialMonth,
    closeOnSelect,
    footer,
    defaultValue,
    minDate,
    maxDate,
    disablePast,
    disableFuture,
    shouldDisableMonth,
    shouldDisableYear,
    readOnly,
    availableDays,
    inputProps,
    modal = false,
    modalProps,
    modalTitle,
    disabledDateErrorMessage = getLabel('dateField.disabledDateError'),
    invalidDateErrorMessage = getLabel('dateField.invalidDateError'),
    useNativePicker: _useNativePicker,
    enableCalendar: _enableCalendar,
    calendarTrigger: _calendarTrigger,
    numberOfMonths: _numberOfMonths,
    defaultServerBreakpoint: _defaultServerBreakpoint,
    sm: _sm,
    md: _md,
    lg: _lg,
    xl: _xl,
    xxl: _xxl,
    ...dayPickerProps
  } = props;

  const shouldUseNativePicker = useNativePicker && mode === 'single';

  const breakpoint = useBreakpoint(props.defaultServerBreakpoint);
  const isMobile = isBreakpointBelow(breakpoint, 'md');

  const [internalValue, setInternalValue] = useState<Date | Date[] | DateRange | undefined>(selected ?? defaultValue);

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [view, setView] = useState<CalendarView>(initialView ?? selectionLevel);
  const [inputValue, setInputValue] = useState('');
  const [hasDisabledDateError, setHasDisabledDateError] = useState(false);
  const [hasInvalidDateError, setHasInvalidDateError] = useState(false);

  const useModalPicker =
    enableCalendar &&
    !shouldUseNativePicker &&
    !readOnly &&
    (modal === true || (typeof modal === 'string' && isBreakpointBelow(breakpoint, modal)));

  const effectiveNumberOfMonths =
    isMobile && !useModalPicker && typeof numberOfMonths === 'number' && numberOfMonths > 1 ? 1 : numberOfMonths;

  const isControlled = selected !== undefined;
  const value = isControlled ? selected : internalValue;

  const textFieldRef = React.useRef<TextFieldForwardRef | null>(null);
  const multiValueRef = React.useRef<MultiValueFieldRef | null>(null);

  const setTextFieldRef = React.useCallback(
    (node: TextFieldForwardRef | null) => {
      textFieldRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );

  const toIsoDate = (d?: Date): string => {
    if (!d) return '';
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const nativeValue = shouldUseNativePicker && value instanceof Date ? toIsoDate(value) : '';

  const getInitialMonth = useCallback((val: Date | Date[] | DateRange | undefined, fallback?: Date): Date => {
    if (val instanceof Date) return val;

    if (Array.isArray(val) && val.length > 0) {
      return [...val].sort((a, b) => a.getTime() - b.getTime())[0];
    }

    if (val && typeof val === 'object' && 'from' in val && val.from instanceof Date) return val.from;
    if (val && typeof val === 'object' && 'to' in val && val.to instanceof Date) return val.to;

    return fallback ?? new Date();
  }, []);

  const [currentMonth, setCurrentMonth] = useState<Date>(() => getInitialMonth(value, initialMonth));

  useEffect(() => {
    if (!open) {
      setCurrentMonth(getInitialMonth(value, initialMonth));
    }
  }, [value, initialMonth, open, getInitialMonth]);

  useEffect(() => {
    if (open) {
      setView(initialView ?? selectionLevel);
    }
  }, [open, selectionLevel, initialView]);

  useEffect(() => {
    if (isControlled) {
      setInternalValue(selected);
    }
  }, [selected, isControlled]);

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(localeCode, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    [localeCode]
  );

  const defaultFormatter = useCallback(
    (date?: Date | Date[] | DateRange): string => {
      if (!date) return '';
      if (date instanceof Date) return dateFormatter.format(date);
      if (Array.isArray(date)) return date.map((d) => dateFormatter.format(d)).join(', ');
      if (date.from) {
        const from = dateFormatter.format(date.from);
        return date.to ? `${from} – ${dateFormatter.format(date.to)}` : from;
      }
      return '';
    },
    [dateFormatter]
  );

  const shouldCloseOnSelect = closeOnSelect ?? mode === 'single';

  const formattedDatesWithIds =
    mode === 'multiple' && Array.isArray(value)
      ? value.map((d, index) => ({
          id: index,
          label: formatDate ? formatDate(d) : defaultFormatter(d),
          date: d,
        }))
      : [];

  const disabledMatchers = useMemo<Matcher[]>(() => {
    const matchers: Matcher[] = [];

    if (disabled) {
      if (Array.isArray(disabled)) matchers.push(...disabled);
      else matchers.push(disabled);
    }
    // Preferred prop name, matches `DateTimeField`.
    if (disabledMatchersProp) {
      if (Array.isArray(disabledMatchersProp)) matchers.push(...disabledMatchersProp);
      else matchers.push(disabledMatchersProp);
    }
    if (minDate) matchers.push({ before: minDate });
    if (maxDate) matchers.push({ after: maxDate });
    if (disablePast) matchers.push({ before: new Date() });
    if (disableFuture) matchers.push({ after: new Date() });
    if (shouldDisableMonth) matchers.push((date: Date) => shouldDisableMonth(date));
    if (shouldDisableYear) matchers.push((date: Date) => shouldDisableYear(date));

    return matchers;
  }, [
    disabled,
    disabledMatchersProp,
    minDate,
    maxDate,
    disablePast,
    disableFuture,
    shouldDisableMonth,
    shouldDisableYear,
  ]);

  const isDateDisabled = useCallback(
    (date: Date): boolean => dateMatchModifiers(date, disabledMatchers),
    [disabledMatchers]
  );

  const handleSelect: OnSelectHandler<Date | Date[] | DateRange | undefined> = (date, selectedDay, modifiers, e) => {
    const next = mode === 'range' ? resolveRangeSelection(date, value, selectedDay) : date;

    setHasDisabledDateError(false);
    if (!isControlled) setInternalValue(next);
    onSelect?.(next, selectedDay, modifiers, e);

    if (next) {
      const formatted = formatDate ? formatDate(next) : defaultFormatter(next);
      setInputValue(formatted);
    } else {
      setInputValue('');
    }

    if (shouldCloseOnSelect) setOpen(false);
  };

  const applyValue = (date: Date) => {
    if (isDateDisabled(date)) return;

    const next: Date | Date[] | DateRange =
      mode === 'range'
        ? { from: date, to: undefined }
        : mode === 'multiple'
        ? [...(Array.isArray(value) ? value : []), date]
        : date;

    setHasDisabledDateError(false);
    if (!isControlled) setInternalValue(next);
    onSelect?.(next, date as UnknownType, {}, {} as UnknownType);

    const formatted = formatDate ? formatDate(next) : defaultFormatter(next);
    setInputValue(formatted);

    if (shouldCloseOnSelect) setOpen(false);
  };

  const defaultParseDate = useMemo(() => {
    const localeParts = getLocaleDateParts(dateFormatter);
    const regex = new RegExp(`^${buildDateRegexSource(localeParts)}$`);
    const { fieldOrder } = localeParts;

    return (value: string): Date | undefined => {
      const match = value.match(regex);
      if (!match) return undefined;

      const values: Partial<Record<'day' | 'month' | 'year', number>> = {};
      fieldOrder.forEach((field, i) => {
        values[field] = Number(match[i + 1]);
      });

      const { day, month, year } = values;
      if (day === undefined || month === undefined || year === undefined) return undefined;

      const date = new Date(year, month - 1, day);
      if (
        isNaN(date.getTime()) ||
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
      ) {
        return undefined;
      }
      return date;
    };
  }, [dateFormatter]);

  const parseInputValue = (val: string): Date | Date[] | DateRange | undefined =>
    (parseDate ?? (mode === 'single' ? defaultParseDate : () => undefined))(val);

  const isParsedValidForMode = (parsed: Date | Date[] | DateRange | undefined): boolean =>
    (mode === 'single' && parsed instanceof Date) ||
    (mode === 'multiple' && Array.isArray(parsed)) ||
    (mode === 'range' && !!parsed && !Array.isArray(parsed) && 'from' in parsed);

  const handleInputChange = (val: string) => {
    setInputValue(val);
    setHasInvalidDateError(false);

    if (val.trim() === '') {
      setHasDisabledDateError(false);
      return;
    }

    const parsed = parseInputValue(val);
    const isValidForMode = isParsedValidForMode(parsed);

    if (!isValidForMode) {
      setHasDisabledDateError(false);
      return;
    }

    const range = parsed && !Array.isArray(parsed) && 'from' in parsed ? (parsed as DateRange) : null;
    const isDisabled =
      (parsed instanceof Date && isDateDisabled(parsed)) ||
      (Array.isArray(parsed) && parsed.some((d) => d instanceof Date && isDateDisabled(d))) ||
      (!!range && ((range.from && isDateDisabled(range.from)) || (range.to && isDateDisabled(range.to))));

    if (isDisabled) {
      setHasDisabledDateError(true);
      return;
    }

    setHasDisabledDateError(false);

    if (!isControlled) setInternalValue(parsed);
    onSelect?.(parsed, parsed as Date, {}, {} as UnknownType);

    if (parsed instanceof Date) setCurrentMonth(parsed);

    if (shouldCloseOnSelect) setOpen(false);
  };

  // Flag unparseable input on blur (kept visible) so the user gets feedback
  // instead of the text silently failing to commit.
  const handleInputBlur = () => {
    if (inputValue.trim() === '') {
      setHasInvalidDateError(false);
      return;
    }
    setHasInvalidDateError(!isParsedValidForMode(parseInputValue(inputValue)));
  };

  useEffect(() => {
    if (isControlled) {
      const formatted = formatDate ? formatDate(value) : defaultFormatter(value);
      setInputValue(formatted);
    }
  }, [value, isControlled, formatDate, defaultFormatter]);

  useEffect(() => {
    if (!isControlled && defaultValue) {
      const formatted = formatDate ? formatDate(defaultValue) : defaultFormatter(defaultValue);
      setInputValue(formatted);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const floating = useFloating({
    open,
    onOpenChange: setOpen,
    placement: calendarTrigger === 'input' ? 'bottom-start' : 'bottom-end',
    middleware: [
      offset(CALENDAR_POPOVER_OFFSET),
      flip(),
      shift({ padding: CALENDAR_POPOVER_PADDING }),
      size({
        padding: CALENDAR_POPOVER_PADDING,
        apply({ availableWidth, elements }) {
          const el = elements.floating;
          el.style.width = '';
          el.style.maxWidth = '';
          el.style.overflowX = '';

          if (isMobile) return;

          el.style.width = 'max-content';
          const naturalWidth = el.getBoundingClientRect().width;

          if (naturalWidth > availableWidth) {
            el.style.width = 'min-content';
            el.style.maxWidth = `${availableWidth}px`;
          }
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const { refs, context, x, y, strategy } = floating;
  const click = useClick(context);
  const interactions = useInteractions([
    ...(enableCalendar && !shouldUseNativePicker && calendarTrigger === 'input' && !useModalPicker ? [click] : []),
    useDismiss(context, {
      outsidePress: (event) => {
        const target = event.target as Element | null;
        return !target?.closest('[role="menu"], [role="listbox"]');
      },
    }),
    useRole(context, { role: 'dialog' }),
  ]);

  // Anchor the popover to the input element itself rather than the container
  // `<div>` (which also holds the label), so an upward flip aligns to the input.
  // In multiple mode (no single text input) fall back to the container reference —
  // passing `null` would clear the anchor entirely and mis-position the popover.
  React.useEffect(() => {
    const anchorNode =
      mode === 'multiple'
        ? multiValueRef.current?.wrapper ?? null
        : (textFieldRef.current?.input as HTMLElement | undefined) ?? null;
    refs.setPositionReference(anchorNode ?? refs.reference.current);
  }, [mode, open, refs]);

  const openNativePicker = () => {
    const input = textFieldRef.current?.input as HTMLInputElement | undefined;
    if (!input) return;
    if (typeof input.showPicker === 'function') {
      try {
        input.showPicker();
        return;
      } catch {
        // showPicker() throws InvalidStateError on inputs whose type isn't
        // date / time / etc. Fall through to focus.
      }
    }
    input.focus();
  };

  const openCalendar = () => {
    if (!enableCalendar || readOnly) return;
    if (shouldUseNativePicker) {
      openNativePicker();
    } else if (useModalPicker) {
      setModalOpen(true);
    } else {
      setOpen((prev) => !prev);
    }
  };

  const handleModalConfirm = (next: Date | Date[] | DateRange | undefined) => {
    setHasDisabledDateError(false);
    if (!isControlled) setInternalValue(next);
    onSelect?.(next, next as UnknownType, {}, {} as UnknownType);
    if (next) {
      const formatted = formatDate ? formatDate(next) : defaultFormatter(next);
      setInputValue(formatted);
    } else {
      setInputValue('');
    }
  };

  const handleNativeInputChange = (val: string) => {
    if (!val) {
      setHasDisabledDateError(false);
      if (!isControlled) setInternalValue(undefined);
      onSelect?.(undefined as UnknownType, undefined as UnknownType, {}, {} as UnknownType);
      return;
    }
    const [y, m, d] = val.split('-').map(Number);
    if (!y || !m || !d) return;
    const parsed = new Date(y, m - 1, d);
    if (Number.isNaN(parsed.getTime())) return;

    if (isDateDisabled(parsed)) {
      setHasDisabledDateError(true);
      return;
    }
    setHasDisabledDateError(false);
    if (!isControlled) setInternalValue(parsed);
    onSelect?.(parsed, parsed as UnknownType, {}, {} as UnknownType);
  };

  const referenceProps = interactions.getReferenceProps(
    useModalPicker && calendarTrigger === 'input' ? { onClick: () => openCalendar() } : undefined
  );

  const {
    role: _role,
    'aria-expanded': _ariaExpanded,
    'aria-haspopup': _ariaHaspopup,
    'aria-controls': _ariaControls,
    ...containerInteractionProps
  } = referenceProps;

  return (
    <>
      <div
        className={cn(styles['tedi-date-field__container'], className)}
        {...containerInteractionProps}
        ref={refs.setReference}
      >
        {mode === 'multiple' ? (
          <MultiValueField
            {...(inputProps as MultiValueFieldProps)}
            ref={multiValueRef}
            id={id}
            label={label}
            tagsDirection={tagsDirection}
            values={formattedDatesWithIds.map((item) => item.label)}
            icon="calendar_today"
            onIconClick={openCalendar}
            iconButtonProps={
              enableCalendar
                ? {
                    'aria-label': getLabel('dateField.openCalendar'),
                    'aria-expanded': useModalPicker ? modalOpen : open,
                    'aria-haspopup': 'dialog',
                  }
                : undefined
            }
            isClearable
            required={required}
            onChange={(newLabels) => {
              if (!Array.isArray(value)) return;

              const newDates = formattedDatesWithIds
                .filter((item) => newLabels.includes(item.label))
                .map((item) => item.date);

              if (!isControlled) setInternalValue(newDates);
              onSelect?.(newDates, {} as UnknownType, {}, {} as UnknownType);
            }}
            className={cn(styles['tedi-date-field__textfield'], {
              [styles['tedi-date-field__icon--disabled']]: !enableCalendar || readOnly,
            })}
          />
        ) : (
          <TextField
            {...(inputProps as TextFieldProps)}
            ref={setTextFieldRef}
            id={id}
            label={label}
            readOnly={readOnly}
            value={shouldUseNativePicker ? nativeValue : inputValue}
            placeholder={placeholder}
            icon="calendar_today"
            aria-expanded={enableCalendar && !shouldUseNativePicker ? open : undefined}
            isClearable
            onIconClick={openCalendar}
            iconButtonProps={
              enableCalendar && !shouldUseNativePicker
                ? {
                    'aria-label': getLabel('dateField.openCalendar'),
                    'aria-expanded': useModalPicker ? modalOpen : open,
                    'aria-haspopup': 'dialog',
                  }
                : undefined
            }
            onChange={(val) => (shouldUseNativePicker ? handleNativeInputChange(val) : handleInputChange(val))}
            onBlur={(e) => {
              if (!shouldUseNativePicker) handleInputBlur();
              (inputProps as TextFieldProps)?.onBlur?.(e);
            }}
            required={required}
            invalid={hasDisabledDateError || hasInvalidDateError || (inputProps as TextFieldProps)?.invalid}
            helper={(() => {
              const consumerHelper = (inputProps as TextFieldProps)?.helper;
              const errorText = hasDisabledDateError
                ? disabledDateErrorMessage
                : hasInvalidDateError
                ? invalidDateErrorMessage
                : null;
              const errorHelper = errorText ? { text: errorText, type: 'error' as const } : null;
              if (!errorHelper) return consumerHelper;
              if (!consumerHelper) return errorHelper;
              return Array.isArray(consumerHelper) ? [...consumerHelper, errorHelper] : [consumerHelper, errorHelper];
            })()}
            className={cn(styles['tedi-date-field__textfield'], {
              [styles['tedi-date-field__textfield--disabled']]: inputProps?.disabled,
              [styles['tedi-date-field__icon--disabled']]: !enableCalendar || readOnly,
            })}
            input={{
              ...((inputProps as TextFieldProps)?.input as UnknownType),
              ...(shouldUseNativePicker && { type: 'date' }),
              ...(enableCalendar && !shouldUseNativePicker && calendarTrigger === 'input'
                ? { 'aria-haspopup': 'dialog', 'aria-expanded': open }
                : {}),
            }}
          />
        )}
      </div>

      {useModalPicker && (
        <DatePickerModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          value={value}
          onConfirm={handleModalConfirm}
          mode={mode}
          numberOfMonths={effectiveNumberOfMonths}
          locale={locale}
          localeCode={localeCode}
          showOutsideDays={showOutsideDays}
          disabledMatchers={disabledMatchers}
          required={required}
          availableDays={availableDays}
          footer={footer}
          monthYearSelectType={monthYearSelectType}
          showNavigation={showNavigation}
          selectionLevel={selectionLevel}
          initialView={initialView}
          initialMonth={initialMonth}
          modalProps={modalProps}
          {...(dayPickerProps as UnknownType)}
          title={modalTitle}
        />
      )}

      {enableCalendar && !shouldUseNativePicker && !useModalPicker && (
        <FloatingPortal>
          {open && (
            <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
              <div
                ref={refs.setFloating}
                className={cn({
                  [styles['tedi-date-field__calendar-popover--fullwidth']]: isMobile,
                })}
                {...interactions.getFloatingProps({
                  style: {
                    position: strategy,
                    top: y ?? 0,
                    left: isMobile ? 0 : x ?? 0,
                    right: isMobile ? 0 : undefined,
                  },
                })}
              >
                <Calendar
                  {...dayPickerProps}
                  numberOfMonths={effectiveNumberOfMonths}
                  view={view}
                  selectionLevel={selectionLevel}
                  currentMonth={currentMonth}
                  setCurrentMonth={setCurrentMonth}
                  setView={setView}
                  mode={mode}
                  value={value}
                  locale={locale}
                  localeCode={localeCode}
                  showOutsideDays={showOutsideDays}
                  disabledMatchers={disabledMatchers}
                  required={required}
                  availableDays={availableDays}
                  footer={footer}
                  monthYearSelectType={monthYearSelectType}
                  showNavigation={showNavigation}
                  handleSelect={handleSelect}
                  applyValue={applyValue}
                  className={cn(styles['tedi-date-field__calendar'], {
                    [styles['tedi-date-field__calendar--fullwidth']]: isMobile,
                  })}
                />
              </div>
            </FloatingFocusManager>
          )}
        </FloatingPortal>
      )}
    </>
  );
});

DateField.displayName = 'DateField';
