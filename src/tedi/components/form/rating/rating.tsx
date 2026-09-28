import cn from 'classnames';
import React, { useId, useState } from 'react';

import { useLabels } from '../../../providers/label-provider';
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
   * is being rated. In `readOnly` mode it prefixes the summary's accessible name.
   */
  label: string;
  /**
   * Visual style of the scale.
   * - `star` - outlined / filled stars, cumulative (every item up to the value fills).
   * - `number` - numbered circles, cumulative, with optional start / end captions.
   * - `icon` - a single highlighted icon (e.g. sentiment faces) with per-item captions.
   * @default star
   */
  type?: RatingType;
  /**
   * Number of items in the scale (the maximum rating).
   * @default 5 (`star` / `icon`), 10 (`number`)
   */
  count?: number;
  /**
   * Selected value (1-based; `0` means no rating). Provide with `onChange` for controlled use.
   * In `readOnly` mode this is the (possibly fractional) average, e.g. `3.5`.
   */
  value?: number;
  /**
   * Initial value for uncontrolled use.
   * @default 0
   */
  defaultValue?: number;
  /**
   * Fired with the chosen value (1-based) when the selection changes. Not called in `readOnly` mode.
   */
  onChange?: (value: number) => void;
  /**
   * Per-item labels (length should match `count`). Used as each item's accessible name and:
   * - `icon` - shown as a caption under every item.
   * - `number` - the first and last are shown as start / end captions.
   * - `star` - the selected (or hovered) item's label is shown as a single caption below the row.
   */
  itemLabels?: string[];
  /**
   * Custom glyph(s), as Material Symbol names.
   * - `type="icon"` — an array, one glyph per item (length should match `count`); defaults to the
   *   five sentiment faces when `count` is 5.
   * - `type="star"` — a single glyph string (e.g. `'favorite'`, `'thumb_up'`) to swap the cumulative
   *   star; an array uses its first entry. Defaults to `kid_star`.
   */
  icons?: string | string[];
  /**
   * Disable interaction and mute the colours.
   * @default false
   */
  disabled?: boolean;
  /**
   * Render a compact, non-interactive summary of an aggregate rating instead of the interactive
   * scale: a single filled visual (`star`, or `icon` for the rounded value; `number` shows none)
   * followed by `{value}/{count}` and, when {@link ratingsCount} is set, the localised rater count
   * (e.g. `3,5/5 - 271 hindajat`). `value` may be fractional here.
   * @default false
   */
  readOnly?: boolean;
  /**
   * Number of ratings behind the average, shown in the `readOnly` summary (e.g. `271 hindajat`).
   * Ignored outside `readOnly` mode; the count is omitted when not provided.
   */
  ratingsCount?: number;
  /**
   * How the `readOnly` rating is displayed. Ignored when not `readOnly`.
   * - `summary` - a single filled visual + `{value}/{count}` text (compact aggregate).
   * - `scale` - the whole star scale with the boundary star filled to the fraction (`3.5` → three
   *   full, one half, one empty), then the text. `star` only; other types fall back to `summary`.
   * @default summary
   */
  readOnlyVariant?: 'summary' | 'scale';
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
    ratingsCount,
    readOnlyVariant = 'summary',
    name,
    className,
  } = props;

  const { getLabel, locale } = useLabels();
  const generatedName = useId();
  const groupName = name ?? generatedName;
  const total = count ?? (type === 'number' ? 10 : 5);

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled ? value : internalValue;

  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const interactive = !disabled && !readOnly;
  const isHovering = interactive && hoverValue !== null;
  const displayValue = isHovering ? (hoverValue as number) : currentValue;

  const iconList = Array.isArray(icons) ? icons : icons !== undefined ? [icons] : undefined;
  const resolvedIcons = iconList ?? (total === DEFAULT_ICONS.length ? [...DEFAULT_ICONS] : undefined);
  const starGlyph = iconList?.[0] ?? 'kid_star';

  const setValue = (next: number): void => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  const isItemActive = (position: number): boolean =>
    type === 'icon' ? position === displayValue : position <= displayValue;

  const itemLabel = (position: number): string => itemLabels?.[position - 1] || `${position} of ${total}`;

  const positions = Array.from({ length: total }, (_, index) => index + 1);

  const renderVisual = (position: number, active: boolean): React.ReactNode => {
    const filledActive = active && !disabled;
    if (type === 'star') {
      return (
        <Icon
          name={starGlyph}
          filled={filledActive}
          color="inherit"
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
          <Icon name={resolvedIcons?.[position - 1] ?? 'circle'} color={filledActive ? 'white' : 'inherit'} size={18} />
        )}
      </span>
    );
  };

  if (readOnly) {
    const formattedValue = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(currentValue);
    const valueText = `${formattedValue}/${total}`;
    const countText = ratingsCount !== undefined ? ` - ${getLabel('rating.raters', ratingsCount)}` : '';
    const summary = `${valueText}${countText}`;
    const iconPosition = Math.min(total, Math.max(1, Math.round(currentValue)));
    const isStarScale = type === 'star' && readOnlyVariant === 'scale';
    const readOnlyVisual = isStarScale ? (
      <span className={styles['tedi-rating__stars']}>
        {positions.map((position) => {
          const fill = Math.max(0, Math.min(1, currentValue - (position - 1))) * 100;
          return (
            <span key={position} className={styles['tedi-rating__star-partial']}>
              <Icon name={starGlyph} color="inherit" size={24} className={styles['tedi-rating__star']} />
              {fill > 0 && (
                <span
                  className={styles['tedi-rating__star-partial-fill']}
                  style={{ '--tedi-rating-star-fill': `${fill}%` } as React.CSSProperties}
                >
                  <Icon name={starGlyph} filled color="inherit" size={24} className={styles['tedi-rating__star']} />
                </span>
              )}
            </span>
          );
        })}
      </span>
    ) : type === 'star' ? (
      <Icon name={starGlyph} filled color="inherit" size={24} className={styles['tedi-rating__star']} />
    ) : type === 'icon' ? (
      <span className={cn(styles['tedi-rating__circle'], styles['tedi-rating__circle--filled'])}>
        <Icon name={resolvedIcons?.[iconPosition - 1] ?? 'circle'} color="white" size={18} />
      </span>
    ) : null;

    return (
      <div
        role="img"
        aria-label={`${label}: ${summary}`}
        className={cn(
          styles['tedi-rating'],
          styles['tedi-rating--readonly'],
          styles[`tedi-rating--${type}`],
          className
        )}
      >
        <div className={styles['tedi-rating__summary']} aria-hidden="true">
          {readOnlyVisual}
          <span className={styles['tedi-rating__summary-text']}>
            <span className={styles['tedi-rating__summary-value']}>{valueText}</span>
            {countText && <span className={styles['tedi-rating__summary-count']}>{countText}</span>}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        styles['tedi-rating'],
        styles[`tedi-rating--${type}`],
        { [styles['tedi-rating--disabled']]: disabled },
        { [styles['tedi-rating--hovering']]: isHovering },
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
