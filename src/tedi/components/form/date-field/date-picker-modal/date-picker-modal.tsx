import cn from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import type { DateRange, DayPickerProps, Locale, Matcher, OnSelectHandler } from 'react-day-picker';

import { useLabels } from '../../../../providers/label-provider';
import { UnknownType } from '../../../../types/commonTypes';
import { Heading } from '../../../base/typography/heading/heading';
import Button from '../../../buttons/button/button';
import ClosingButton from '../../../buttons/closing-button/closing-button';
import { Calendar } from '../../../content/calendar/calendar';
import { Modal, ModalContentProps, useModal } from '../../../overlays/modal';
import { CalendarView } from '../date-field';
import { resolveRangeSelection } from '../date-field-helpers';
import styles from './date-picker-modal.module.scss';

type DateFieldMode = 'single' | 'multiple' | 'range';
type DateValue = Date | Date[] | DateRange | undefined;

export interface DatePickerModalProps
  extends Omit<DayPickerProps, 'mode' | 'selected' | 'onSelect' | 'numberOfMonths'> {
  /** Whether the modal is open. Pair with `onOpenChange`. */
  open: boolean;
  /** Fires when the modal opens or closes (Escape / backdrop / Cancel / Confirm). */
  onOpenChange: (open: boolean) => void;
  /** Current committed value. Used to seed the draft when the modal opens. */
  value: DateValue;
  /**
   * Fires with the chosen value when the user clicks "Confirm". Cancel /
   * Escape / backdrop dismiss discards the draft.
   */
  onConfirm: (date: DateValue) => void;
  /** Selection mode forwarded to `Calendar`. @default single */
  mode?: DateFieldMode;
  numberOfMonths?: number;
  locale?: Locale;
  localeCode?: string;
  showOutsideDays?: boolean;
  disabledMatchers?: Matcher[];
  required?: boolean;
  availableDays?: Date[] | ((date: Date) => boolean);
  footer?: React.ReactNode;
  monthYearSelectType?: 'dropdown' | 'grid';
  showNavigation?: boolean;
  selectionLevel?: CalendarView;
  /** Grid the calendar opens on, independent of `selectionLevel`. Defaults to `selectionLevel`. */
  initialView?: CalendarView;
  /** Initial month to display when the modal opens. Defaults to the selected date or today. */
  initialMonth?: Date;
  /**
   * Extra props spread onto `Modal.Content`, overriding the responsive width / `position="center"`
   * defaults (including `fullscreen`). `className` is merged, not replaced, so the internal layout survives.
   */
  modalProps?: Omit<ModalContentProps, 'children'>;
  /** Modal title text. Falls back to the `date-field.modal-title` i18n key. */
  title?: string;
}

const getInitialMonth = (val: DateValue, fallback?: Date): Date => {
  if (val instanceof Date) return val;
  if (Array.isArray(val) && val.length > 0) {
    return [...val].sort((a, b) => a.getTime() - b.getTime())[0];
  }
  if (val && typeof val === 'object' && 'from' in val && val.from instanceof Date) return val.from;
  if (val && typeof val === 'object' && 'to' in val && val.to instanceof Date) return val.to;
  return fallback ?? new Date();
};

const DatePickerModalHeader = ({ title }: { title: string }): JSX.Element => {
  const { labelId, onOpenChange } = useModal();
  return (
    <div className={styles['tedi-date-picker-modal__header']}>
      <Heading element="h2" modifiers="h4" id={labelId} className={styles['tedi-date-picker-modal__title']}>
        {title}
      </Heading>
      <ClosingButton size="small" onClick={() => onOpenChange(false)} />
    </div>
  );
};

export const DatePickerModal = (props: DatePickerModalProps): JSX.Element => {
  const {
    open,
    onOpenChange,
    value,
    onConfirm,
    mode = 'single',
    numberOfMonths,
    locale,
    localeCode,
    showOutsideDays = true,
    disabledMatchers,
    required,
    availableDays,
    footer,
    monthYearSelectType,
    showNavigation,
    selectionLevel = 'days',
    initialView,
    initialMonth,
    modalProps,
    title,
    ...dayPickerProps
  } = props;

  const { getLabel } = useLabels();

  const [draft, setDraft] = useState<DateValue>(value);
  const [view, setView] = useState<CalendarView>(initialView ?? selectionLevel);
  const [currentMonth, setCurrentMonth] = useState<Date>(() => getInitialMonth(value, initialMonth));

  useEffect(() => {
    if (open) {
      setDraft(value);
      setView(initialView ?? selectionLevel);
      setCurrentMonth(getInitialMonth(value, initialMonth));
    }
  }, [open, value, selectionLevel, initialView, initialMonth]);

  const handleSelect: OnSelectHandler<DateValue> = useCallback(
    (date, selectedDay) => {
      if (mode === 'range') {
        setDraft((prev) => resolveRangeSelection(date, prev, selectedDay));
      } else {
        setDraft(date);
      }
    },
    [mode]
  );

  const applyValue = useCallback((date: Date) => {
    setDraft(date);
  }, []);

  const handleConfirm = () => {
    onConfirm(draft);
    onOpenChange(false);
  };

  const resolvedTitle = title ?? getLabel('date-field.modal-title');

  return (
    <Modal open={open} onToggle={onOpenChange}>
      <Modal.Content
        position="center"
        aria-label={resolvedTitle}
        {...modalProps}
        md={{ width: 'max-content', ...modalProps?.md }}
        sm={{ width: 'full', ...modalProps?.sm }}
        className={cn(styles['tedi-date-picker-modal'], modalProps?.className)}
      >
        <Modal.Header>
          <DatePickerModalHeader title={resolvedTitle} />
        </Modal.Header>
        <Modal.Body className={styles['tedi-date-picker-modal__body']}>
          <Calendar
            {...(dayPickerProps as UnknownType)}
            numberOfMonths={numberOfMonths}
            view={view}
            selectionLevel={selectionLevel}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            setView={setView}
            mode={mode}
            value={draft}
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
            className={styles['tedi-date-picker-modal__calendar']}
            bordered={false}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button visualType="secondary" onClick={() => onOpenChange(false)}>
            {getLabel('date-field.cancel')}
          </Button>
          <Button onClick={handleConfirm}>{getLabel('date-field.confirm')}</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

DatePickerModal.displayName = 'DatePickerModal';

export default DatePickerModal;
