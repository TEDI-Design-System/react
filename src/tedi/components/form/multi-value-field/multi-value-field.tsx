import classNames from 'classnames';
import React, { forwardRef, useState } from 'react';

import { Icon, IconWithoutBackgroundProps } from '../../base/icon/icon';
import { ClosingButton } from '../../buttons/closing-button/closing-button';
import Separator from '../../misc/separator/separator';
import { Tag } from '../../tags/tag/tag';
import FormLabel from '../form-label/form-label';
import styles from './multi-value-field.module.scss';

export interface MultiValueFieldProps {
  /**
   * Unique identifier for the field. Used to associate the label with the input.
   */
  id: string;
  /**
   * Optional label displayed above the field.
   */
  label?: string;
  /**
   * Name attribute for the hidden input. When provided, the field value
   * will be submitted as a JSON string in forms.
   */
  name?: string;
  /**
   * List of values to display as tags.
   * If provided, the component acts as a controlled component.
   */
  values?: string[];
  /**
   * Callback fired whenever the values change
   * (e.g. removing a tag or clearing all values).
   */
  onChange?: (values: string[]) => void;
  /**
   * Visual style of the tags.
   * @default 'primary'
   */
  tagColor?: 'primary' | 'secondary' | 'danger';
  /**
   * Additional CSS class names applied to the root element.
   */
  className?: string;
  /**
   * Optional icon displayed on the right side.
   * Can be a string (icon name) or full icon props.
   */
  icon?: string | IconWithoutBackgroundProps;
  /**
   * Click handler for the icon.
   * If provided, the icon will be rendered as a button.
   */
  onIconClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  /**
   * Whether the clear button should be shown when values exist.
   * @default true
   */
  isClearable?: boolean;
  /**
   * Marks the field as required.
   * Adds required indicator to label and applies native required validation to the hidden input.
   */
  required?: boolean;
  /**
   * Whether the input is disabled.
   */
  disabled?: boolean;
}

export interface MultiValueFieldRef {
  input: HTMLInputElement | null;
  wrapper: HTMLDivElement | null;
}

export const MultiValueField = forwardRef<MultiValueFieldRef, MultiValueFieldProps>((props, ref): JSX.Element => {
  const {
    id,
    label,
    name,
    values: externalValues,
    onChange,
    tagColor = 'primary',
    className,
    icon,
    onIconClick,
    isClearable = true,
    required,
    disabled,
  } = props;

  const [internalValues, setInternalValues] = useState<string[]>(externalValues ?? []);

  const values = externalValues ?? internalValues;

  const updateValues = (newValues: string[]) => {
    setInternalValues(newValues);
    onChange?.(newValues);
  };

  const removeValue = (index: number) => {
    const newVals = values.filter((_, i) => i !== index);
    updateValues(newVals);
  };

  const showClear = !disabled && isClearable && values.length > 0;

  const clearAll = () => {
    updateValues([]);
  };

  const renderIcon = () => {
    if (!icon) return null;

    const iconProps: IconWithoutBackgroundProps = typeof icon === 'string' ? { name: icon } : icon;

    const WrapperElement = onIconClick ? 'button' : 'div';

    return (
      <WrapperElement
        className={styles['tedi-multi-value-field__icon-wrapper']}
        onClick={onIconClick}
        type={onIconClick ? 'button' : undefined}
      >
        <Icon {...iconProps} size={18} />
      </WrapperElement>
    );
  };

  return (
    <div className={classNames(styles['tedi-multi-value-field'], className)}>
      {label && <FormLabel id={id} label={label} required={required} />}
      <div className={styles['tedi-multi-value-field__inner']}>
        {values.length > 0 && (
          <div className={styles['tedi-multi-value-field__tags']}>
            {values.map((value, index) => (
              <Tag key={`${value}-${index}`} color={tagColor} onClose={disabled ? undefined : () => removeValue(index)}>
                {value}
              </Tag>
            ))}
          </div>
        )}

        {(showClear || icon) && (
          <div className={styles['tedi-multi-value-field__right-area']}>
            {showClear && (
              <ClosingButton
                onClick={clearAll}
                title="Clear"
                className={styles['tedi-multi-value-field__clear-button']}
                iconSize={18}
              />
            )}
            {showClear && icon && <Separator color="primary" axis="vertical" height={1.5} spacing={0.25} />}
            {icon && renderIcon()}
          </div>
        )}
      </div>

      {name && (
        <input
          type="hidden"
          name={name}
          value={values.length ? JSON.stringify(values) : ''}
          required={required}
          disabled={disabled}
        />
      )}
    </div>
  );
});

MultiValueField.displayName = 'MultiValueField';

export default MultiValueField;
