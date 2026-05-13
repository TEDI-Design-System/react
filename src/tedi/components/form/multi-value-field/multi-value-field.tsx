import classNames from 'classnames';
import React, { forwardRef, useState } from 'react';

import { useLabels } from '../../../providers/label-provider';
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
   * Extra HTML attributes spread on the icon `<button>` element. Use this to
   * wire ARIA state (e.g. `aria-expanded`, `aria-controls`) directly to the
   * icon trigger when it opens a popover / dialog. Only applied when
   * `onIconClick` is set.
   */
  iconButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
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
    iconButtonProps,
    isClearable = true,
    required,
    disabled,
  } = props;

  const { getLabel } = useLabels();
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

    if (onIconClick) {
      return (
        <button
          {...iconButtonProps}
          className={classNames(styles['tedi-multi-value-field__icon-wrapper'], iconButtonProps?.className)}
          onClick={onIconClick}
          type="button"
        >
          <Icon {...iconProps} size={18} />
        </button>
      );
    }

    return (
      <div className={styles['tedi-multi-value-field__icon-wrapper']}>
        <Icon {...iconProps} size={18} />
      </div>
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
                title={getLabel('clear')}
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
