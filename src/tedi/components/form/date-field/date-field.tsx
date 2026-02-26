/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { DateRange, DayPicker, Matcher, OnSelectHandler } from 'react-day-picker';
import { et } from 'react-day-picker/locale';

import TextField from '../textfield/textfield';
import { CalendarHeader } from './components/date-field-header';
import styles from './date-field.module.scss';

export type DateFieldMode = 'single' | 'multiple' | 'range';
type DateFieldOpenBehavior = 'input' | 'button';

export interface DateFieldProps {
  mode?: DateFieldMode;
  selected?: Date | Date[] | DateRange | undefined;
  onSelect?: OnSelectHandler<Date | Date[] | DateRange | undefined>;
  disabled?: Matcher | Matcher[];
  placeholder?: string;
  className?: string;
  formatDate?: (date: Date | Date[] | DateRange | undefined) => string;
  showOutsideDays: boolean;
  openBehavior?: DateFieldOpenBehavior;
  parseDate?: (value: string) => Date | Date[] | DateRange | undefined;
  required?: boolean;
}

export const DateField: React.FC<DateFieldProps> = ({
  mode = 'single',
  selected,
  onSelect,
  disabled,
  placeholder = 'Select date',
  className,
  formatDate,
  required,
  openBehavior = 'input',
  showOutsideDays = true,
  parseDate,
}) => {
  const [internalValue, setInternalValue] = useState<Date | Date[] | DateRange | undefined>(selected);

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const isControlled = selected !== undefined;
  const value = isControlled ? selected : internalValue;

  useEffect(() => {
    setInputValue(formatDate ? formatDate(value) : defaultFormatter(value));
  }, [value]);

  const floating = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom-end',
    middleware: [offset(4), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const { refs, context, x, y, strategy } = floating;
  const click = useClick(context);
  const interactions = useInteractions(
    [openBehavior === 'input' ? click : undefined, useDismiss(context), useRole(context, { role: 'dialog' })].filter(
      Boolean
    )
  );

  const handleSelect: OnSelectHandler<Date | Date[] | DateRange | undefined> = (date, selectedDay, modifiers, e) => {
    if (!isControlled) {
      setInternalValue(date);
    }

    onSelect?.(date, selectedDay, modifiers, e);

    if (mode === 'single') {
      setOpen(false);
    }
  };

  const defaultFormatter = (date: Date | Date[] | DateRange | undefined): string => {
    if (!date) return '';

    const fmt = new Intl.DateTimeFormat('et-EE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    if (mode === 'single' && date instanceof Date) {
      return fmt.format(date);
    }

    if (mode === 'multiple' && Array.isArray(date)) {
      return date.map((d) => fmt.format(d)).join(', ');
    }

    if (mode === 'range' && 'from' in date && date.from) {
      const from = fmt.format(date.from);
      if (date.to) {
        return `${from} – ${fmt.format(date.to)}`;
      }
      return from;
    }

    return '';
  };

  // const formattedValue = useMemo(() => (formatDate ? formatDate(value) : defaultFormatter(value)), [value, formatDate]);

  return (
    <>
      <div
        ref={refs.setReference}
        className={cn(styles['tedi-date-field__container'], className)}
        {...interactions.getReferenceProps()}
      >
        <TextField
          id="datepicker-input"
          label="Date"
          readOnly={openBehavior === 'input'}
          value={inputValue}
          placeholder={placeholder}
          icon="calendar_today"
          isClearable
          onChange={(val: string) => {
            setInputValue(val);

            if (openBehavior === 'button' && parseDate) {
              const parsed = parseDate(val);
              if (!isControlled) setInternalValue(parsed);
              onSelect?.(parsed, undefined as any, {} as any, {} as any);
            }
          }}
          onIconClick={() => setOpen(true)}
          onClear={() => {
            setInputValue('');
            if (!isControlled) setInternalValue(undefined);
            onSelect?.(undefined, undefined as any, {} as any, {} as any);
          }}
          aria-expanded={open}
        />
      </div>

      <FloatingPortal>
        {open && (
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              {...interactions.getFloatingProps({
                style: {
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                },
              })}
            >
              <DayPicker
                mode={mode as any}
                selected={value as DateRange | undefined}
                locale={et}
                weekStartsOn={1}
                components={{
                  MonthCaption: CalendarHeader,
                  Nav: () => <></>,
                }}
                showOutsideDays={showOutsideDays}
                classNames={{
                  root: styles['tedi-date-field__calendar'],
                  month_caption: styles['tedi-date-field__caption'],
                  head: styles['tedi-date-field__head'],
                  row: styles['tedi-date-field__row'],
                  day: styles['tedi-date-field__day'],
                  selected: styles['tedi-date-field__day--selected'],
                  weekday: styles['tedi-date-field__weekday'],
                  outside: styles['tedi-date-field__outside-days'],
                }}
                onSelect={handleSelect as any}
                disabled={disabled}
                // {...(required ? { required: true } : {})}
              />
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </>
  );
};
