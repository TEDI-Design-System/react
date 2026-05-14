import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  size,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import cn from 'classnames';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DateRange, Locale, Matcher, OnSelectHandler } from 'react-day-picker';
import { et } from 'react-day-picker/locale';

import { BreakpointSupport, isBreakpointBelow, useBreakpoint, useBreakpointProps } from '../../../helpers';
import { useLabels } from '../../../providers/label-provider';
import { UnknownType } from '../../../types/commonTypes';
import { Button } from '../../buttons/button/button';
import { Calendar } from '../../content/calendar/calendar';
import { CalendarView } from '../date-field/date-field';
import {
  buildDateRegexSource,
  buildDisabledMatchers,
  CALENDAR_POPOVER_OFFSET,
  CALENDAR_POPOVER_PADDING,
  getLocaleDateParts,
} from '../date-field/date-field-helpers';
import TextField, { TextFieldForwardRef, TextFieldProps } from '../textfield/textfield';
import { TimePicker } from '../time-picker/time-picker';
import styles from './date-time-field.module.scss';

export type DateTimeFieldStep = 'date' | 'time';
export type DateTimeFieldLayout = 'side-by-side' | 'multi-step';
export type DateTimeFieldMode = 'single' | 'range';

export interface DateTimeRange {
  from?: Date;
  to?: Date;
}

export type DateTimeFieldValue = Date | DateTimeRange;

type DateTimeFieldBreakpointProps = {
  /**
   * When `true`, renders an `<input type="datetime-local">` and skips the
   * custom popover entirely — the browser's built-in date/time picker is
   * shown when the calendar icon is clicked. Has no effect when
   * `mode='range'` (native datetime-local has no range counterpart).
   * @default false
   */
  useNativePicker?: boolean;
  /**
   * Layout of the date-and-time popover. `mode='range'` always uses
   * `'side-by-side'` regardless of this value — the range UI needs the
   * calendar and both `from` / `to` time pickers visible at once.
   * @default side-by-side
   */
  layout?: DateTimeFieldLayout;
  /**
   * Predefined time slots, each in `"HH:mm"` format. When provided, the
   * time step renders a grid of slots instead of the scroll-wheel picker.
   */
  availableTimes?: string[];
  /**
   * Layout variant for the time grid when `availableTimes` is set.
   * Defaults differ per layout: `'button'` for `side-by-side`, `'radio'`
   * for `multi-step`.
   */
  timeGridVariant?: 'button' | 'radio';
  /**
   * How the month/year selector in the calendar header is rendered.
   * @default dropdown
   */
  monthYearSelectType?: 'dropdown' | 'grid';
  /**
   * Show days from adjacent months in the calendar grid.
   * @default true
   */
  showOutsideDays?: boolean;
  /**
   * Heading rendered above the time picker in the side-by-side layout.
   * Falls back to the localised `dateTimeField.timeHeading` label.
   */
  timeHeading?: React.ReactNode;
};

export interface DateTimeFieldProps extends BreakpointSupport<DateTimeFieldBreakpointProps> {
  /**
   * Unique identifier for the input field.
   */
  id: string;
  /**
   * Field label. Required for accessibility.
   */
  label: string;
  /**
   * Placeholder shown in the input when no value is selected.
   */
  placeholder?: string;
  /**
   * Additional class on the container.
   */
  className?: string;
  /**
   * Selection mode.
   * - `'single'` (default) — one combined `Date` value.
   * - `'range'` — pair of `from` / `to` `Date` values, each carrying their
   *   own time. Renders a 2-month calendar and two time pickers (one for
   *   `from`, one for `to`) stacked underneath.
   * @default single
   */
  mode?: DateTimeFieldMode;
  /**
   * Controlled value. Type depends on `mode`:
   * - `mode='single'` → `Date | undefined`
   * - `mode='range'` → `DateTimeRange | undefined` (`{ from, to }`)
   */
  value?: DateTimeFieldValue;
  /**
   * Initial value for uncontrolled usage. Ignored when `value` is provided.
   */
  defaultValue?: DateTimeFieldValue;
  /**
   * Fires whenever the user picks a date or a time. The argument shape
   * matches `mode`: `Date | undefined` for `'single'`,
   * `DateTimeRange | undefined` for `'range'`.
   */
  onChange?: (value: DateTimeFieldValue | undefined) => void;
  /**
   * Marks the field as required.
   * @default false
   */
  required?: boolean;
  /**
   * When `true`, the input is read-only — typing is disabled, but the
   * picker can still be opened.
   * @default false
   */
  readOnly?: boolean;
  /**
   * Disables the input and the picker.
   * @default false
   */
  disabled?: boolean;
  /**
   * Minimum selectable date. Dates before this are disabled in the calendar.
   */
  minDate?: Date;
  /**
   * Maximum selectable date. Dates after this are disabled in the calendar.
   */
  maxDate?: Date;
  /**
   * Disables every date strictly before today.
   */
  disablePast?: boolean;
  /**
   * Disables every date strictly after today.
   */
  disableFuture?: boolean;
  /**
   * Step interval (minutes) for the time-wheel picker. Ignored when
   * `availableTimes` is set.
   * @default 15
   */
  stepMinutes?: number;
  /**
   * Initial month displayed when the calendar opens. Defaults to the
   * month of the current value, or the current month if no value.
   */
  initialMonth?: Date;
  /**
   * Locale object used by react-day-picker for the calendar grid.
   * @default Estonian
   */
  locale?: Locale;
  /**
   * Locale code used for the displayed date format.
   * @default et-EE
   */
  localeCode?: string;
  /**
   * Label of the "Select time" footer button under the calendar in the
   * multi-step layout. Falls back to the localised
   * `dateTimeField.selectTime` label.
   */
  selectTimeLabel?: string;
  /**
   * Label of the "Back" link shown above the time picker in the
   * multi-step layout. Falls back to the localised `dateTimeField.back`
   * label.
   */
  backLabel?: string;
  /**
   * Forwarded to the underlying `TextField`. `id`, `label`, `value`, and
   * `onChange` are owned by `DateTimeField`.
   */
  inputProps?: Omit<TextFieldProps, 'id' | 'label' | 'value' | 'onChange'>;
}

const pad = (n: number) => String(n).padStart(2, '0');

const getTimeOf = (d: Date | undefined): string => {
  if (!d) return '00:00';
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const combineDateTime = (date: Date, time: string): Date => {
  const [hStr, mStr] = time.split(':');
  const h = Number(hStr);
  const m = Number(mStr);
  const result = new Date(date);
  result.setHours(Number.isFinite(h) ? h : 0, Number.isFinite(m) ? m : 0, 0, 0);
  return result;
};

const isDate = (val: unknown): val is Date => val instanceof Date;

const formatNativeValue = (d: Date | undefined): string => {
  if (!d) return '';
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const parseNativeValue = (input: string): Date | undefined => {
  if (!input) return undefined;
  const date = new Date(input);
  return isNaN(date.getTime()) ? undefined : date;
};

const asRange = (val: DateTimeFieldValue | undefined): DateTimeRange => {
  if (!val || isDate(val)) return {};
  return val;
};

const asSingle = (val: DateTimeFieldValue | undefined): Date | undefined => (isDate(val) ? val : undefined);

export const DateTimeField = React.forwardRef<TextFieldForwardRef, DateTimeFieldProps>((props, ref) => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const { getLabel } = useLabels();
  const breakpoint = useBreakpoint(props.defaultServerBreakpoint);
  const isMobile = isBreakpointBelow(breakpoint, 'md');
  const {
    layout = 'side-by-side',
    useNativePicker = false,
    monthYearSelectType = 'dropdown',
    timeGridVariant,
    showOutsideDays = true,
    availableTimes,
    timeHeading = getLabel('dateTimeField.timeHeading'),
  } = getCurrentBreakpointProps<DateTimeFieldBreakpointProps>(props);

  const {
    id,
    label,
    placeholder,
    className,
    value,
    defaultValue,
    onChange,
    required,
    readOnly,
    disabled,
    minDate,
    maxDate,
    disablePast,
    disableFuture,
    stepMinutes = 15,
    initialMonth,
    locale = et,
    localeCode = 'et-EE',
    selectTimeLabel = getLabel('dateTimeField.selectTime'),
    backLabel = getLabel('dateTimeField.back'),
    mode = 'single',
    inputProps,
  } = props;

  const isRange = mode === 'range';
  const useNative = useNativePicker && !isRange;
  const effectiveLayout: DateTimeFieldLayout = isRange ? 'side-by-side' : layout;
  const resolvedGridVariant: 'button' | 'radio' =
    timeGridVariant ?? (effectiveLayout === 'multi-step' ? 'radio' : 'button');
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<DateTimeFieldValue | undefined>(defaultValue);
  const currentValue = isControlled ? value : internalValue;
  const rangeValue = isRange ? asRange(currentValue) : ({} as DateTimeRange);
  const singleValue = isRange ? undefined : asSingle(currentValue);

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<DateTimeFieldStep>('date');
  const [view, setView] = useState<CalendarView>('days');
  const monthAnchor = isRange ? rangeValue.from : singleValue;
  const [currentMonth, setCurrentMonth] = useState<Date>(() => monthAnchor ?? initialMonth ?? new Date());

  const monthAnchorRef = useRef(monthAnchor);
  monthAnchorRef.current = monthAnchor;

  useEffect(() => {
    if (!open) {
      setStep('date');
      setView('days');
      setCurrentMonth(monthAnchorRef.current ?? initialMonth ?? new Date());
    }
  }, [open, initialMonth]);

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(localeCode, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    [localeCode]
  );

  const shortDateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(localeCode, {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }),
    [localeCode]
  );

  const formatSingle = useCallback(
    (d: Date | undefined): string => {
      if (!d) return '';
      return `${dateFormatter.format(d)} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    },
    [dateFormatter]
  );

  const formatValue = useCallback(
    (val: DateTimeFieldValue | undefined): string => {
      if (!val) return '';
      if (isDate(val)) return formatSingle(val);
      const from = formatSingle(val.from);
      const to = formatSingle(val.to);
      if (!from && !to) return '';
      if (!to) return from;
      if (!from) return to;
      return `${from} – ${to}`;
    },
    [formatSingle]
  );

  const parseDateTimeText = useMemo(() => {
    const localeParts = getLocaleDateParts(dateFormatter);
    const { fieldOrder } = localeParts;
    const regex = new RegExp(`^${buildDateRegexSource(localeParts)}\\s+(\\d{2}):(\\d{2})$`);

    return (input: string): Date | undefined => {
      const match = input.trim().match(regex);
      if (!match) return undefined;

      const values: Partial<Record<'day' | 'month' | 'year', number>> = {};
      fieldOrder.forEach((field, i) => {
        values[field] = Number(match[i + 1]);
      });
      const hour = Number(match[fieldOrder.length + 1]);
      const minute = Number(match[fieldOrder.length + 2]);

      const { day, month, year } = values;
      if (day === undefined || month === undefined || year === undefined) return undefined;
      if (hour > 23 || minute > 59) return undefined;

      const date = new Date(year, month - 1, day, hour, minute, 0, 0);
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

  const [inputText, setInputText] = useState<string>(() => formatValue(currentValue));

  useEffect(() => {
    setInputText(formatValue(currentValue));
  }, [currentValue, formatValue]);

  const floating = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom-end',
    middleware: [
      offset(CALENDAR_POPOVER_OFFSET),
      flip(),
      shift({ padding: CALENDAR_POPOVER_PADDING }),
      size({
        padding: CALENDAR_POPOVER_PADDING,
        apply({ availableWidth, elements }) {
          elements.floating.style.maxWidth = `${availableWidth}px`;
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });
  const { refs, context, x, y, strategy } = floating;
  const interactions = useInteractions([useDismiss(context), useRole(context, { role: 'dialog' })]);

  const textFieldRef = React.useRef<TextFieldForwardRef | null>(null);

  const setTextFieldRef = useCallback(
    (node: TextFieldForwardRef | null) => {
      textFieldRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );

  useEffect(() => {
    if (textFieldRef.current?.inner) {
      refs.setReference(textFieldRef.current.inner);
    }
  }, [refs]);

  const updateValue = (next: DateTimeFieldValue | undefined) => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
    setInputText(formatValue(next));
  };

  const handleCalendarSelect: OnSelectHandler<Date | Date[] | DateRange | undefined> = (selected) => {
    if (isRange) {
      const range = selected as DateRange | undefined;
      if (!range || (!range.from && !range.to)) {
        updateValue(undefined);
        return;
      }
      const fromTime = getTimeOf(rangeValue.from);
      const toTime = getTimeOf(rangeValue.to);
      const next: DateTimeRange = {};
      if (range.from) next.from = combineDateTime(range.from, fromTime);
      if (range.to) next.to = combineDateTime(range.to, toTime);
      updateValue(next);
      return;
    }
    if (selected instanceof Date) {
      updateValue(combineDateTime(selected, getTimeOf(singleValue)));
    } else if (selected === undefined) {
      updateValue(undefined);
    }
  };

  const handleApplyValue = (date: Date) => {
    if (isRange) {
      updateValue({ from: combineDateTime(date, getTimeOf(rangeValue.from)) });
      return;
    }
    updateValue(combineDateTime(date, getTimeOf(singleValue)));
  };

  const handleTimeSelect = (time: string) => {
    const baseDate = singleValue ?? new Date();
    updateValue(combineDateTime(baseDate, time));
    if (effectiveLayout === 'multi-step' && availableTimes) setOpen(false);
  };

  const handleRangeTimeSelect = (kind: 'from' | 'to') => (time: string) => {
    const baseDate = rangeValue[kind] ?? rangeValue.from ?? new Date();
    updateValue({ ...rangeValue, [kind]: combineDateTime(baseDate, time) });
  };

  const handleInputChange = (newText: string) => {
    setInputText(newText);

    if (newText === '') {
      updateValue(undefined);
      return;
    }

    if (useNative) {
      const parsed = parseNativeValue(newText);
      if (!parsed) return;
      updateValue(parsed);
      setCurrentMonth(parsed);
      return;
    }

    if (isRange) return;

    const parsed = parseDateTimeText(newText);
    if (!parsed) return;

    updateValue(parsed);
    setCurrentMonth(parsed);
  };

  const openNativePicker = () => {
    const input = textFieldRef.current?.input as HTMLInputElement | undefined;
    if (!input) return;
    if (typeof input.showPicker === 'function') {
      input.showPicker();
      return;
    }
    input.focus();
  };

  const handleIconClick = () => {
    if (readOnly || disabled) return;
    if (useNative) {
      openNativePicker();
      return;
    }
    setOpen((prev) => !prev);
  };

  const disabledMatchers: Matcher[] = buildDisabledMatchers({
    minDate,
    maxDate,
    disablePast,
    disableFuture,
  });

  const calendarFooter =
    effectiveLayout === 'multi-step' ? (
      <div className={styles['tedi-date-time-field__select-time-wrapper']}>
        <Button type="button" visualType="link" iconLeft="schedule" onClick={() => setStep('time')}>
          {selectTimeLabel}
        </Button>
      </div>
    ) : undefined;

  const calendarElement = (
    <Calendar
      view={view}
      setView={setView}
      selectionLevel="days"
      currentMonth={currentMonth}
      setCurrentMonth={setCurrentMonth}
      mode={isRange ? 'range' : 'single'}
      value={isRange ? (rangeValue as DateRange) : singleValue}
      numberOfMonths={isRange && !isMobile ? 2 : 1}
      locale={locale}
      localeCode={localeCode}
      showOutsideDays={showOutsideDays}
      monthYearSelectType={monthYearSelectType}
      disabledMatchers={disabledMatchers.length ? disabledMatchers : undefined}
      required={required}
      handleSelect={handleCalendarSelect}
      applyValue={handleApplyValue}
      footer={calendarFooter}
      className={cn(
        styles['tedi-date-time-field__calendar'],
        effectiveLayout === 'side-by-side' && styles['tedi-date-time-field__calendar--split']
      )}
    />
  );

  const isWheelMode = !availableTimes || availableTimes.length === 0;

  const timePickerElement = (
    <TimePicker
      value={getTimeOf(singleValue)}
      stepMinutes={stepMinutes}
      availableTimes={availableTimes}
      gridVariant={resolvedGridVariant}
      onChange={handleTimeSelect}
      className={cn(styles['tedi-date-time-field__time-picker'], {
        [styles['tedi-date-time-field__time-picker--wheel']]: isWheelMode,
      })}
    />
  );

  const renderRangeTimePicker = (kind: 'from' | 'to') => (
    <TimePicker
      value={getTimeOf(rangeValue[kind])}
      stepMinutes={stepMinutes}
      availableTimes={availableTimes}
      gridVariant={resolvedGridVariant}
      onChange={handleRangeTimeSelect(kind)}
      className={cn(styles['tedi-date-time-field__time-picker'], {
        [styles['tedi-date-time-field__time-picker--wheel']]: isWheelMode,
      })}
    />
  );

  const textFieldProps: TextFieldProps = {
    ...(inputProps as TextFieldProps),
    id,
    label,
    value: useNative ? formatNativeValue(singleValue) : inputText,
    placeholder,
    readOnly: readOnly || (!useNative && !!availableTimes && !!currentValue),
    icon: 'calendar_today',
    isClearable: true,
    required,
    disabled,
    onIconClick: handleIconClick,
    onChange: handleInputChange,
    className: cn(styles['tedi-date-time-field__textfield'], inputProps?.className, {
      [styles['tedi-date-time-field__icon--disabled']]: disabled || readOnly,
    }),
    input: {
      ...(inputProps?.input as UnknownType),
      type: useNative ? 'datetime-local' : 'text',
      'aria-expanded': useNative ? undefined : open,
    },
  };

  return (
    <>
      <div className={cn(styles['tedi-date-time-field__container'], className)} aria-haspopup="dialog">
        <TextField ref={setTextFieldRef} {...textFieldProps} />
      </div>

      {!useNative && (
        <FloatingPortal>
          {open && !disabled && (
            <FloatingFocusManager context={context} modal={false} initialFocus={-1}>
              <div
                ref={refs.setFloating}
                className={styles['tedi-date-time-field__popup']}
                {...interactions.getFloatingProps({
                  style: {
                    position: strategy,
                    top: y ?? 0,
                    left: x ?? 0,
                  },
                })}
              >
                {isRange ? (
                  <div className={styles['tedi-date-time-field__range']}>
                    {calendarElement}
                    <div className={styles['tedi-date-time-field__range-separator']} aria-hidden="true">
                      <div className={styles['tedi-date-time-field__range-separator-line']} />
                    </div>
                    <div className={styles['tedi-date-time-field__range-times']}>
                      <div className={styles['tedi-date-time-field__range-time']}>
                        <div className={styles['tedi-date-time-field__split-time-header']}>
                          <span className={styles['tedi-date-time-field__split-heading']}>{timeHeading}</span>
                        </div>
                        <div className={styles['tedi-date-time-field__split-time-body']}>
                          {renderRangeTimePicker('from')}
                        </div>
                      </div>
                      <div className={styles['tedi-date-time-field__range-time']}>
                        <div className={styles['tedi-date-time-field__split-time-header']}>
                          <span className={styles['tedi-date-time-field__split-heading']}>{timeHeading}</span>
                        </div>
                        <div className={styles['tedi-date-time-field__split-time-body']}>
                          {renderRangeTimePicker('to')}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : effectiveLayout === 'side-by-side' ? (
                  <div className={styles['tedi-date-time-field__split']}>
                    {calendarElement}
                    <div className={styles['tedi-date-time-field__split-separator']} aria-hidden="true">
                      <div className={styles['tedi-date-time-field__split-separator-line']} />
                    </div>
                    <div className={styles['tedi-date-time-field__split-time']}>
                      <div className={styles['tedi-date-time-field__split-time-header']}>
                        <span className={styles['tedi-date-time-field__split-heading']}>{timeHeading}</span>
                      </div>
                      <div className={styles['tedi-date-time-field__split-time-body']}>{timePickerElement}</div>
                    </div>
                  </div>
                ) : step === 'date' ? (
                  calendarElement
                ) : (
                  <div className={styles['tedi-date-time-field__time-step']}>
                    <header className={styles['tedi-date-time-field__time-header']}>
                      <Button type="button" visualType="link" iconLeft="arrow_back" onClick={() => setStep('date')}>
                        {backLabel}
                      </Button>
                      <span className={styles['tedi-date-time-field__time-date']}>
                        {shortDateFormatter.format(singleValue ?? new Date())}
                      </span>
                    </header>
                    <div className={styles['tedi-date-time-field__time-body']}>{timePickerElement}</div>
                  </div>
                )}
              </div>
            </FloatingFocusManager>
          )}
        </FloatingPortal>
      )}
    </>
  );
});

DateTimeField.displayName = 'DateTimeField';

export default DateTimeField;
