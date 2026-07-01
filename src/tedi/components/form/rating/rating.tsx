import cn from 'classnames';
import React, { useId, useState } from 'react';

import { Icon } from '../../base/icon/icon';
import styles from './rating.module.scss';

export type RatingType = 'star' | 'number' | 'icon';

const DEFAULT_ICONS = [
  'sentiment_very_dissatisfied',
  'sentiment_dissatisfied',
  'sentiment_neutral',
  'sentiment_satisfied',
  'sentiment_very_satisfied',
] as const;

export interface RatingProps {
  /**
   * Accessible name for the rating group (`radiogroup`). Required so screen readers announce what
   * is being rated.
   */
  label: string;
  /**
   * Visual style of the scale.
   * - `star` — outlined / filled stars, cumulative (every item up to the value fills).
   * - `number` — numbered circles, cumulative, with optional start / end captions.
   * - `icon` — a single highlighted icon (e.g. sentiment faces) with per-item captions.
   * @default star
   */
  type?: RatingType;
  /**
   * Number of items in the scale.
   * @default 5 (`star` / `icon`), 10 (`number`)
   */
  count?: number;
  /**
   * Selected value (1-based; `0` means no rating). Provide with `onChange` for controlled use.
   */
  value?: number;
  /**
   * Initial value for uncontrolled use.
   * @default 0
   */
  defaultValue?: number;
  /**
   * Fired with the chosen value (1-based) when the selection changes.
   */
  onChange?: (value: number) => void;
  /**
   * Per-item labels (length should match `count`). Used as each item's accessible name and:
   * - `icon` — shown as a caption under every item.
   * - `number` — the first and last are shown as start / end captions.
   * - `star` — the selected (or hovered) item's label is shown as a single caption below the row.
   */
  itemLabels?: string[];
  /**
   * Icon glyph names for `type="icon"` (length should match `count`). Defaults to the five
   * sentiment faces when `count` is 5.
   */
  icons?: string[];
  /**
   * Disable interaction and mute the colours.
   * @default false
   */
  disabled?: boolean;
  /**
   * Show the value without allowing changes.
   * @default false
   */
  readOnly?: boolean;
  /**
   * `name` for the underlying radio inputs (form submission). Defaults to a generated id.
   */
  name?: string;
  /**
   * Additional class name on the root element.
   */
  className?: string;
}

export const Rating = (props: RatingProps): JSX.Element => {
  const {
    label,
    type = 'star',
    count,
    value,
    defaultValue = 0,
    onChange,
    itemLabels,
    icons,
    disabled = false,
    readOnly = false,
    name,
    className,
  } = props;

  const generatedName = useId();
  const groupName = name ?? generatedName;
  const total = count ?? (type === 'number' ? 10 : 5);

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled ? value : internalValue;

  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const interactive = !disabled && !readOnly;
  const displayValue = interactive && hoverValue !== null ? hoverValue : currentValue;

  const resolvedIcons = icons ?? (total === DEFAULT_ICONS.length ? [...DEFAULT_ICONS] : undefined);

  const setValue = (next: number): void => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  const isItemActive = (position: number): boolean =>
    type === 'icon' ? position === displayValue : position <= displayValue;

  const itemLabel = (position: number): string => itemLabels?.[position - 1] || `${position} of ${total}`;

  const renderVisual = (position: number, active: boolean): React.ReactNode => {
    if (type === 'star') {
      return (
        <Icon
          name="kid_star"
          filled={active}
          color={disabled ? 'tertiary' : 'brand'}
          size={24}
          className={styles['tedi-rating__star']}
        />
      );
    }

    return (
      <span className={styles['tedi-rating__circle']}>
        {type === 'number' ? (
          position
        ) : (
          <Icon
            name={resolvedIcons?.[position - 1] ?? 'circle'}
            color={active ? 'white' : disabled ? 'tertiary' : 'brand'}
            size={18}
          />
        )}
      </span>
    );
  };

  const positions = Array.from({ length: total }, (_, index) => index + 1);

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        styles['tedi-rating'],
        styles[`tedi-rating--${type}`],
        { [styles['tedi-rating--disabled']]: disabled },
        className
      )}
    >
      <div className={styles['tedi-rating__items']} onMouseLeave={() => setHoverValue(null)}>
        {positions.map((position) => {
          const active = isItemActive(position);
          return (
            <label
              key={position}
              className={cn(styles['tedi-rating__item'], { [styles['tedi-rating__item--active']]: active })}
              onMouseEnter={interactive ? () => setHoverValue(position) : undefined}
            >
              <input
                type="radio"
                className={styles['tedi-rating__input']}
                name={groupName}
                value={position}
                checked={currentValue === position}
                disabled={!interactive}
                onChange={() => setValue(position)}
                aria-label={itemLabel(position)}
              />
              <span className={styles['tedi-rating__visual']} aria-hidden="true">
                {renderVisual(position, active)}
              </span>
              {type === 'icon' && itemLabels?.[position - 1] && (
                <span className={styles['tedi-rating__caption']}>{itemLabels[position - 1]}</span>
              )}
            </label>
          );
        })}
      </div>

      {type === 'number' && (itemLabels?.[0] || itemLabels?.[total - 1]) && (
        <div className={styles['tedi-rating__endpoints']}>
          <span>{itemLabels?.[0]}</span>
          <span>{itemLabels?.[total - 1]}</span>
        </div>
      )}

      {type === 'star' && itemLabels?.some(Boolean) && (
        <div className={styles['tedi-rating__star-caption']}>
          {displayValue > 0 ? itemLabels[displayValue - 1] : null}
        </div>
      )}
    </div>
  );
};

Rating.displayName = 'Rating';

export default Rating;
