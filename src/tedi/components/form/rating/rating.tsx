import cn from 'classnames';
import React, { useId, useState } from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import { useLabels } from '../../../providers/label-provider';
import { Icon, IconSize } from '../../base/icon/icon';
import styles from './rating.module.scss';

export type RatingType = 'star' | 'number' | 'icon';

export interface RatingBreakpointProps {
  /**
   * Lay the scale out horizontally or stack it vertically (icon + caption per row; number scale
   * stacked with the endpoint captions bracketing it). Use `vertical` on narrow layouts for
   * `type="icon"` with long `itemLabels`, or for a number scale that would otherwise overflow.
   * Breakpoint-aware: e.g. `orientation="vertical" md={{ orientation: 'horizontal' }}`.
   * @default horizontal
   */
  orientation?: 'horizontal' | 'vertical';
}

/** Star glyph size (matches `--feedback-star-size`). */
const STAR_ICON_SIZE: IconSize = 24;
/** Glyph size inside the circular number/icon items. */
const CIRCLE_ICON_SIZE: IconSize = 18;

const DEFAULT_ICONS = [
  'sentiment_very_dissatisfied',
  'sentiment_dissatisfied',
  'sentiment_neutral',
  'sentiment_satisfied',
  'sentiment_very_satisfied',
] as const;

export interface RatingProps extends BreakpointSupport<RatingBreakpointProps> {
  /** Accessible name for the group; also prefixes the `readOnly` summary. */
  label: string;
  /**
   * Visual style. `star` / `number` fill cumulatively; `icon` highlights a single item.
   * @default star
   */
  type?: RatingType;
  /**
   * Number of items (the max rating).
   * @default 5 (`star` / `icon`), 10 (`number`)
   */
  count?: number;
  /** Selected value (1-based; `0` = none). Use with `onChange` for controlled mode. In `readOnly`, the (possibly fractional) average. */
  value?: number;
  /**
   * Initial value for uncontrolled mode.
   * @default 0
   */
  defaultValue?: number;
  /** Called with the chosen value when the selection changes. */
  onChange?: (value: number) => void;
  /** Per-item labels (length = `count`); used as each item's accessible name and as captions. */
  itemLabels?: string[];
  /**
   * Custom Material Symbol glyph(s): an array (one per item) for `type="icon"`, or a single string to
   * swap the `type="star"` glyph.
   * @default sentiment faces (`icon`) / `kid_star` (`star`)
   */
  icons?: string | string[];
  /**
   * Disable interaction and mute the colours.
   * @default false
   */
  disabled?: boolean;
  /**
   * Show a compact read-only summary (visual + `{value}/{count}` text; text only for `type="number"`) instead
   * of the interactive scale.
   * @default false
   */
  readOnly?: boolean;
  /** Number of ratings shown in the `readOnly` summary (e.g. `271 hindajat`); omitted when unset. */
  ratingsCount?: number;
  /**
   * Show the descriptive raters label next to `ratingsCount` (e.g. `271 hindajat`). Set `false` to
   * show the number only (`271`).
   * @default true
   */
  showRatingsCountLabel?: boolean;
  /**
   * `readOnly` layout: `summary` (single visual) or `scale` (full star scale with fractional fill).
   * @default summary
   */
  readOnlyVariant?: 'summary' | 'scale';
  /** `name` for the radio inputs (form submission). Defaults to a generated id. */
  name?: string;
  /** Additional class name on the root element. */
  className?: string;
}

export const Rating = (props: RatingProps): JSX.Element => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
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
    showRatingsCountLabel = true,
    readOnlyVariant = 'summary',
    orientation = 'horizontal',
    name,
    className,
  } = getCurrentBreakpointProps<RatingProps>(props);

  const { getLabel, locale } = useLabels();
  const generatedName = useId();
  const groupName = name ?? generatedName;
  const defaultCount = type === 'number' ? 10 : 5;
  const total = count !== undefined && Number.isInteger(count) && count > 0 ? count : defaultCount;

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

  const isInRange = (position: number, target: number): boolean =>
    type === 'icon' ? position === target : position <= target;

  // Language-neutral fallback (matches the read-only `value/total` summary format) when no itemLabels given.
  const itemLabel = (position: number): string => itemLabels?.[position - 1] || `${position}/${total}`;

  const positions = Array.from({ length: total }, (_, index) => index + 1);

  const renderVisual = (position: number, selected: boolean): React.ReactNode => {
    if (type === 'star') {
      return (
        <>
          {/* Filled copy behind the glyph; tinted only on hover so the outlined star gets a light fill. */}
          <Icon
            name={starGlyph}
            filled
            color="inherit"
            size={STAR_ICON_SIZE}
            className={styles['tedi-rating__star-backdrop']}
          />
          <Icon
            name={starGlyph}
            filled={selected}
            color="inherit"
            size={STAR_ICON_SIZE}
            className={styles['tedi-rating__star']}
          />
        </>
      );
    }

    return (
      <span className={styles['tedi-rating__circle']}>
        {type === 'number' ? (
          position
        ) : (
          <Icon name={resolvedIcons?.[position - 1] ?? 'circle'} color="inherit" size={CIRCLE_ICON_SIZE} />
        )}
      </span>
    );
  };

  if (readOnly) {
    const formattedValue = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(currentValue);
    const valueText = `${formattedValue}/${total}`;
    const countText =
      ratingsCount !== undefined
        ? ` - ${
            showRatingsCountLabel
              ? getLabel('rating.raters', ratingsCount)
              : new Intl.NumberFormat(locale).format(ratingsCount)
          }`
        : '';
    const summary = `${valueText}${countText}`;
    const iconPosition = Math.min(total, Math.max(1, Math.round(currentValue)));
    const isStarScale = type === 'star' && readOnlyVariant === 'scale';
    const readOnlyVisual = isStarScale ? (
      <span className={styles['tedi-rating__stars']}>
        {positions.map((position) => {
          const fill = Math.max(0, Math.min(1, currentValue - (position - 1))) * 100;
          return (
            <span key={position} className={styles['tedi-rating__star-partial']}>
              <Icon name={starGlyph} color="inherit" size={STAR_ICON_SIZE} className={styles['tedi-rating__star']} />
              {fill > 0 && (
                <span
                  className={styles['tedi-rating__star-partial-fill']}
                  style={{ '--tedi-rating-star-fill': `${fill}%` } as React.CSSProperties}
                >
                  <Icon
                    name={starGlyph}
                    filled
                    color="inherit"
                    size={STAR_ICON_SIZE}
                    className={styles['tedi-rating__star']}
                  />
                </span>
              )}
            </span>
          );
        })}
      </span>
    ) : type === 'star' ? (
      <Icon name={starGlyph} filled color="inherit" size={STAR_ICON_SIZE} className={styles['tedi-rating__star']} />
    ) : type === 'icon' ? (
      <span className={cn(styles['tedi-rating__circle'], styles['tedi-rating__circle--filled'])}>
        <Icon name={resolvedIcons?.[iconPosition - 1] ?? 'circle'} color="inherit" size={CIRCLE_ICON_SIZE} />
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
          <span className={styles['tedi-rating__summary-text']}>{summary}</span>
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
        { [styles['tedi-rating--vertical']]: orientation === 'vertical' },
        { [styles['tedi-rating--disabled']]: disabled },
        className
      )}
    >
      <div
        className={cn(styles['tedi-rating__items'], {
          [styles['tedi-rating__items--captioned']]: type !== 'star' && itemLabels?.some(Boolean),
        })}
        onMouseLeave={() => setHoverValue(null)}
      >
        {positions.map((position) => {
          const previewed = isHovering && isInRange(position, hoverValue as number);
          const selected = isInRange(position, currentValue) && (!isHovering || previewed || type === 'icon');
          const isEndpoint = position === 1 || position === total;
          const showCaption = !!itemLabels?.[position - 1] && (type === 'icon' || (type === 'number' && isEndpoint));
          return (
            <label
              key={position}
              className={styles['tedi-rating__item']}
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
              <span
                className={cn(styles['tedi-rating__visual'], {
                  [styles['tedi-rating__visual--selected']]: selected,
                  [styles['tedi-rating__visual--hover']]: previewed,
                })}
                aria-hidden="true"
              >
                {renderVisual(position, selected)}
              </span>
              {showCaption && <span className={styles['tedi-rating__caption']}>{itemLabels?.[position - 1]}</span>}
            </label>
          );
        })}
      </div>

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
