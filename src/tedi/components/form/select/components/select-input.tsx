import cn from 'classnames';
import { components as ReactSelectComponents, InputProps } from 'react-select';

import { ISelectOption } from '../select';
import styles from '../select.module.scss';

export const SelectInput = (props: InputProps<ISelectOption, boolean>): JSX.Element => {
  // react-select points the combobox's `aria-describedby` at its own placeholder
  // element, so screen readers announce the placeholder as the field's
  // description (placeholder should be visual only). Drop that reference, keep any
  // other react-select description (e.g. its live-region), and append the field's
  // helper/error text so it's actually announced.
  const helperDescribedBy = (props.selectProps as { 'aria-describedby'?: string })['aria-describedby'];
  const describedBy =
    [
      ...(props['aria-describedby']?.split(' ') ?? []).filter((token) => token && !token.endsWith('-placeholder')),
      helperDescribedBy,
    ]
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <ReactSelectComponents.Input
      {...props}
      className={cn(props.className, styles['tedi-select__input'])}
      isHidden={props.selectProps.inputIsHidden !== undefined ? props.selectProps.inputIsHidden : props.isHidden}
      aria-required={props.selectProps.required}
      required={props.selectProps.required}
      aria-describedby={describedBy}
      inputMode={props.selectProps.softKeyboardSuppressed ? 'none' : undefined}
    />
  );
};
