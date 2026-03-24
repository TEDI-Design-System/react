import classNames from 'classnames';
import React, { forwardRef } from 'react';

import { Tag } from '../../tags/tag/tag';
import TextField, { TextFieldForwardRef, TextFieldProps } from '../textfield/textfield';
import styles from './multi-value-field.module.scss';

export interface MultiValueFieldProps extends Omit<TextFieldProps, 'value' | 'onChange'> {
  values?: string[];
  onChange?: (values: string[]) => void;
  maxValues?: number;
  tagColor?: 'primary' | 'secondary' | 'danger';
}

export const MultiValueField = forwardRef<TextFieldForwardRef, MultiValueFieldProps>((props, ref): JSX.Element => {
  const { values: externalValues, onChange, maxValues, tagColor = 'primary', disabled, className, ...rest } = props;
  const [internalValues, setInternalValues] = React.useState<string[]>(externalValues ?? []);
  const [inputValue, setInputValue] = React.useState('');

  const values = externalValues ?? internalValues;

  const updateValues = (newValues: string[]) => {
    setInternalValues(newValues);
    onChange?.(newValues);
  };

  const addValue = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (values.includes(trimmed)) return;
    if (maxValues && values.length >= maxValues) return;

    updateValues([...values, trimmed]);
    setInputValue('');
  };

  const removeValue = (index: number) => {
    const newVals = values.filter((_, i) => i !== index);
    updateValues(newVals);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addValue(inputValue);
    }

    if (e.key === 'Backspace' && !inputValue && values.length) {
      removeValue(values.length - 1);
    }
  };

  return (
    <TextField
      {...rest}
      ref={ref}
      disabled={disabled}
      value={values.join(', ')}
      onChange={setInputValue}
      onKeyDown={handleKeyDown}
      className={classNames(styles['tedi-multi-value-field'], className)}
      inputClassName={styles['tedi-multi-value-field__input']}
      isClearable
      onClear={() => updateValues([])}
      startSlot={
        values.length > 0 && (
          <div className={styles['tedi-multi-value-field__tags']}>
            {values.map((value, index) => (
              <Tag key={`${value}-${index}`} color={tagColor} onClose={disabled ? undefined : () => removeValue(index)}>
                {value}
              </Tag>
            ))}
          </div>
        )
      }
    />
  );
});

MultiValueField.displayName = 'MultiValueField';

export default MultiValueField;
