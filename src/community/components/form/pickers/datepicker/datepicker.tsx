import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers';
import { DateValidationError } from '@mui/x-date-pickers/internals';
import { Dayjs } from 'dayjs';
import React from 'react';

import { TextFieldProps } from '../../../../../tedi/components/form/textfield/textfield';
import MuiInputTransition from '../mui-input-transition/mui-input-transition';

export type DatepickerValue = Dayjs | null;

export interface DatePickerProps extends Omit<TextFieldProps, 'defaultValue' | 'value' | 'onChange'> {
  /**
   * Datepicker initial value. Accepts a dayjs date object.
   */
  defaultValue?: DatepickerValue;
  /**
   * Currently selected value. Accepts a dayjs date object.
   * Used only if onChange is also defined
   */
  value?: DatepickerValue;
  /**
   * onChange handler.
   * Triggers each time when new value is selected from datepicker.
   */
  onChange?: (value: DatepickerValue) => void;
  /**
   * minDate to set minDate user can select.
   * If want to disable past dates use disablePast boolean.
   */
  minDate?: Dayjs;
  /**
   * maxDate to set maxDate user can select.
   * If want to disable future dates use disableFuture boolean.
   */
  maxDate?: Dayjs;
  /**
   * Controls the date the picker is opened to
   */
  referenceDate?: Dayjs;
  /**
   * If true future days are disabled.
   */
  disableFuture?: boolean;
  /**
   * If true past days are disabled.
   */
  disablePast?: boolean;
  /**
   * If true, today's date is rendering without highlighting with circle.
   */
  disableHighlightToday?: boolean;
  /**
   * Disable specific date.
   */
  shouldDisableDate?: (day: DatepickerValue) => boolean;
  /**
   * Disable specific months dynamically. Works like shouldDisableDate but for month selection view
   */
  shouldDisableMonth?: (month: DatepickerValue) => boolean;
  /**
   * Disable specific years dynamically. Works like shouldDisableDate but for year selection view
   */
  shouldDisableYear?: (month: DatepickerValue) => boolean;
  /**
   * Mobile picker title, displaying in the toolbar. Default from LabelProvider
   */
  toolbarTitle?: string;
  /**
   * Format string.
   * @Default DD.MM.YYYY
   */
  inputFormat?: string;
  /**
   * If true renders LoadingComponent in calendar instead of calendar view. Can be used to preload information and show it in calendar.
   */
  loading?: boolean;
  /**
   * Callback that fired when input value or new value prop validation returns new validation error (or value is valid after error).
   * In case of validation error detected reason prop return non-null value and TextField must be displayed in error state.
   * This can be used to render appropriate form error.
   * Read the guide about form integration and error displaying (https://next.material-ui-pickers.dev/guides/forms).
   */
  onError?: (reason: DateValidationError, value: DatepickerValue) => void;
  /**
   * Array of views to show.
   * @default ['year', 'day']
   */
  views?: Array<'day' | 'month' | 'year'>;
  /**
   * Callback fired when the popup requests to be closed.
   */
  onClose?: () => void;
}

export const DatePicker = (props: DatePickerProps): JSX.Element => {
  const {
    value,
    defaultValue,
    onChange,
    minDate,
    maxDate,
    disabled,
    readOnly,
    toolbarTitle,
    disableFuture,
    disablePast,
    shouldDisableDate,
    shouldDisableMonth,
    shouldDisableYear,
    disableHighlightToday,
    referenceDate,
    inputFormat = 'DD.MM.YYYY',
    views = ['year', 'day'],
    onError,
    loading,
    onClose,
    ...rest
  } = props;
  const [innerDate, setInnerDate] = React.useState<DatepickerValue>(defaultValue || null);
  const [open, setOpen] = React.useState(false);

  const getValue = React.useMemo((): DatepickerValue => {
    return onChange && typeof value !== 'undefined' ? value : innerDate;
  }, [innerDate, onChange, value]);

  const onChangeHandler = (date: DatepickerValue): void => {
    if (!date?.isValid() && date !== null) {
      return;
    }

    if (typeof value === 'undefined') {
      setInnerDate(date);
    }

    onChange?.(date);
  };

  const onCloseHandler = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <MuiDatePicker<DatepickerValue>
      data-name="datepicker"
      value={getValue}
      onChange={onChangeHandler}
      renderInput={(props) => (
        <MuiInputTransition
          muiTextfieldProps={props}
          inputFormat={inputFormat}
          onChangeHandler={onChangeHandler}
          textfieldProps={{
            ...rest,
            onClear: () => onChangeHandler(null),
            onIconClick: !readOnly ? () => setOpen((open) => !open) : undefined,
          }}
        />
      )}
      open={open}
      inputFormat={inputFormat}
      onOpen={() => setOpen(true)}
      onClose={onCloseHandler}
      defaultCalendarMonth={referenceDate}
      disabled={disabled}
      disableFuture={disableFuture}
      disablePast={disablePast}
      shouldDisableDate={shouldDisableDate}
      shouldDisableMonth={shouldDisableMonth}
      shouldDisableYear={shouldDisableYear}
      disableHighlightToday={disableHighlightToday}
      readOnly={readOnly}
      minDate={minDate}
      maxDate={maxDate}
      toolbarTitle={toolbarTitle}
      onError={onError}
      loading={loading}
      views={views}
    />
  );
};

export default DatePicker;
