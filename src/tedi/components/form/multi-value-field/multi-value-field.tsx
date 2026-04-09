import classNames from 'classnames';
import React, { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Tag } from '../../tags/tag/tag';
import TextField, { TextFieldForwardRef, TextFieldProps } from '../textfield/textfield';
import styles from './multi-value-field.module.scss';

export interface MultiValueFieldProps extends Omit<TextFieldProps, 'value' | 'onChange'> {
  /*
   * Array of string values to display as tags. Can be controlled or uncontrolled.
   */
  values?: string[];
  /**
   * Callback fired when the values change (e.g. tag added or removed).
   * Provides the updated array of values.
   */
  onChange?: (values: string[]) => void;
  /*
   * Color of the tags. Can be 'primary', 'secondary', or 'danger'.
   * Defaults to 'primary'.
   */
  tagColor?: 'primary' | 'secondary' | 'danger';
}

export const MultiValueField = forwardRef<TextFieldForwardRef, MultiValueFieldProps>((props, ref): JSX.Element => {
  const { values: externalValues, onChange, tagColor = 'primary', className, ...rest } = props;
  const [internalValues, setInternalValues] = React.useState<string[]>(externalValues ?? []);
  const [inputValue, setInputValue] = React.useState('');

  const values = externalValues ?? internalValues;
  const tagsRef = useRef<HTMLDivElement>(null);
  const [tagsHeight, setTagsHeight] = useState(0);

  const updateValues = (newValues: string[]) => {
    setInternalValues(newValues);
    onChange?.(newValues);
  };

  const addValue = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (values.includes(trimmed)) return;

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

  useLayoutEffect(() => {
    if (tagsRef.current) {
      const height = tagsRef.current.offsetHeight;
      setTagsHeight(height);
    }
  }, [values]);

  useEffect(() => {
    const handleResize = () => {
      if (tagsRef.current) setTagsHeight(tagsRef.current.offsetHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const wrapperStyle: React.CSSProperties = {
    '--tags-height': `${tagsHeight}px`,
  } as React.CSSProperties;

  return (
    <div style={wrapperStyle} className={styles['tedi-multi-value-field__wrapper']}>
      <TextField
        {...rest}
        ref={ref}
        value={values.join(', ')}
        onChange={setInputValue}
        onKeyDown={handleKeyDown}
        className={classNames(styles['tedi-multi-value-field'], className)}
        inputClassName={styles['tedi-multi-value-field__input']}
        onClear={() => updateValues([])}
        startSlot={
          values.length > 0 && (
            <div ref={tagsRef} className={styles['tedi-multi-value-field__tags']}>
              {values.map((value, index) => (
                <Tag
                  key={`${value}-${index}`}
                  color={tagColor}
                  onClose={rest.disabled ? undefined : () => removeValue(index)}
                >
                  {value}
                </Tag>
              ))}
            </div>
          )
        }
      />
    </div>
  );
});

MultiValueField.displayName = 'MultiValueField';

export default MultiValueField;
