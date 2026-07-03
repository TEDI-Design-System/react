import classNames from 'classnames';
import React, { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';

import { useLabels } from '../../../providers/label-provider';
import { Icon, IconWithoutBackgroundProps } from '../../base/icon/icon';
import { ClosingButton } from '../../buttons/closing-button/closing-button';
import Separator from '../../misc/separator/separator';
import { Tag } from '../../tags/tag/tag';
import FormLabel from '../form-label/form-label';
import styles from './multi-value-field.module.scss';

// Gap between tags (matches `--layout-grid-gutters-04`) and the width reserved
// for the `+N` overflow counter when measuring how many tags fit on one row.
const TAG_GAP_PX = 4;
const COUNTER_RESERVE_PX = 44;

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
   * Layout for the value tags.
   * - `'stack'` (default) — tags wrap onto multiple rows; the field grows in height.
   * - `'row'` — tags stay on a single row; any that don't fit collapse into a
   *   `+N` counter (the count is measured from the available width).
   * @default stack
   */
  tagsDirection?: 'stack' | 'row';
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
    tagsDirection = 'stack',
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

  const innerRef = useRef<HTMLDivElement | null>(null);
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => ({ input: hiddenInputRef.current, wrapper: innerRef.current }), []);

  const values = externalValues ?? internalValues;

  const isRow = tagsDirection === 'row';
  const tagsRef = useRef<HTMLDivElement | null>(null);
  const lastMeasuredWidthRef = useRef(0);
  const [visibleCount, setVisibleCount] = useState<number | null>(null);

  useEffect(() => {
    if (isRow) setVisibleCount(null);
  }, [values.length, isRow]);

  useEffect(() => {
    if (!isRow) return;
    const el = tagsRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      if (width > 0 && width !== lastMeasuredWidthRef.current) setVisibleCount(null);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [isRow]);

  useLayoutEffect(() => {
    if (!isRow || visibleCount !== null) return;
    const el = tagsRef.current;
    if (!el) return;

    const containerWidth = el.clientWidth;
    if (containerWidth === 0) return;

    const tagEls = el.querySelectorAll<HTMLElement>('[data-tedi-tag-index]');
    if (tagEls.length === 0) return;

    let totalWidth = 0;
    for (let i = 0; i < tagEls.length; i++) {
      totalWidth += tagEls[i].offsetWidth + (i > 0 ? TAG_GAP_PX : 0);
    }
    if (totalWidth <= containerWidth) {
      lastMeasuredWidthRef.current = containerWidth;
      setVisibleCount(tagEls.length);
      return;
    }

    let usedWidth = 0;
    let visible = 0;
    for (let i = 0; i < tagEls.length; i++) {
      const tagWidth = tagEls[i].offsetWidth;
      const hasMore = i < tagEls.length - 1;
      const reserved = hasMore ? COUNTER_RESERVE_PX + TAG_GAP_PX : 0;
      const needed = usedWidth + tagWidth + (visible > 0 ? TAG_GAP_PX : 0);
      if (needed + reserved <= containerWidth) {
        usedWidth = needed;
        visible++;
      } else {
        break;
      }
    }
    if (visible === 0) visible = 1;

    lastMeasuredWidthRef.current = containerWidth;
    setVisibleCount(visible);
  }, [isRow, visibleCount, values]);

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

  const hiddenCount = isRow && visibleCount !== null ? Math.max(0, values.length - visibleCount) : 0;

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
      <div
        ref={innerRef}
        className={classNames(styles['tedi-multi-value-field__inner'], {
          [styles['tedi-multi-value-field__inner--row']]: isRow,
        })}
      >
        {values.length > 0 && (
          <div
            ref={tagsRef}
            className={classNames(styles['tedi-multi-value-field__tags'], {
              [styles['tedi-multi-value-field__tags--row']]: isRow,
            })}
          >
            {values.map((value, index) => {
              if (isRow && visibleCount !== null && index >= visibleCount) return null;
              return (
                <Tag
                  key={`${value}-${index}`}
                  color={tagColor}
                  data-tedi-tag-index={index}
                  onClose={disabled ? undefined : () => removeValue(index)}
                >
                  {value}
                </Tag>
              );
            })}
            {hiddenCount > 0 && (
              <Tag color={tagColor} className={styles['tedi-multi-value-field__overflow-tag']}>
                +{hiddenCount}
              </Tag>
            )}
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
          ref={hiddenInputRef}
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
