import cn from 'classnames';
import { useId } from 'react';

import { FeedbackText, FeedbackTextProps } from '../../form/feedback-text/feedback-text';
import { FormLabel } from '../../form/form-label/form-label';
import styles from './progress-bar.module.scss';

export type ProgressBarLabelPosition = 'top' | 'horizontal';
export type ProgressBarValuePosition = 'horizontal' | 'bottom';

export interface ProgressBarProps {
  /**
   * Id forwarded to the bar element so external `<label htmlFor>` can target it.
   */
  id?: string;
  /**
   * Progress value, clamped to `0..100`. `NaN` is treated as `0`.
   * @default 0
   */
  value?: number;
  /**
   * Use the 4px bar height instead of the 8px default.
   * @default false
   */
  small?: boolean;
  /**
   * Label rendered above or inline with the bar.
   */
  label?: string;
  /**
   * Label placement. Ignored without `label`.
   * @default top
   */
  labelPosition?: ProgressBarLabelPosition;
  /**
   * Renders a required indicator on the label. Ignored without `label`.
   * @default false
   */
  required?: boolean;
  /**
   * Show the percentage value.
   * @default true
   */
  showValue?: boolean;
  /**
   * Where the percentage sits relative to the bar / hint row.
   * @default horizontal
   */
  valuePosition?: ProgressBarValuePosition;
  /**
   * Override the rendered value text (e.g. `"1 / 5"`) without affecting the fill.
   */
  valueLabel?: string;
  /**
   * Accessible name. Falls back to `label`.
   */
  ariaLabel?: string;
  /**
   * Hint or error text rendered below the bar via `FeedbackText`.
   */
  helper?: FeedbackTextProps;
  /** Class on the root wrapper. */
  className?: string;
}

const clampValue = (raw: number | undefined): number => {
  if (raw === undefined || Number.isNaN(raw)) return 0;
  if (raw < 0) return 0;
  if (raw > 100) return 100;
  return raw;
};

export const ProgressBar = (props: ProgressBarProps): JSX.Element => {
  const {
    id,
    value,
    small = false,
    label,
    labelPosition = 'top',
    required = false,
    showValue = true,
    valuePosition = 'horizontal',
    valueLabel,
    ariaLabel,
    helper,
    className,
  } = props;

  const generatedId = useId();
  const resolvedId = id ?? `tedi-progress-bar-${generatedId.replace(/[^a-zA-Z0-9-]/g, '')}`;
  const labelId = `${resolvedId}__label`;
  const helperId = helper ? helper.id ?? `${resolvedId}__helper` : undefined;

  const safeValue = clampValue(value);
  const displayValue = valueLabel ?? `${Math.round(safeValue)}%`;

  const renderLabel = label ? (
    <FormLabel
      id={resolvedId}
      label={label}
      required={required}
      renderWithoutLabel
      className={styles['tedi-progress-bar__label']}
    />
  ) : null;

  const renderValue =
    showValue && valuePosition === 'horizontal' ? (
      <span className={styles['tedi-progress-bar__value']}>{displayValue}</span>
    ) : null;

  const bar = (
    <div
      id={resolvedId}
      role="progressbar"
      aria-valuenow={safeValue}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={valueLabel}
      aria-labelledby={label && !ariaLabel ? labelId : undefined}
      aria-label={ariaLabel || undefined}
      aria-describedby={helperId}
      className={styles['tedi-progress-bar__track']}
    >
      <div className={styles['tedi-progress-bar__fill']} style={{ width: `${safeValue}%` }} />
    </div>
  );

  const isLabelInline = label && labelPosition === 'horizontal';

  const barRow = (
    <div
      className={cn(styles['tedi-progress-bar__row'], {
        [styles['tedi-progress-bar__row--label-inline']]: isLabelInline,
      })}
    >
      {isLabelInline ? <div id={labelId}>{renderLabel}</div> : null}
      {bar}
      {renderValue}
    </div>
  );

  const hasValueBelow = showValue && valuePosition === 'bottom';

  const helperContent =
    helper || hasValueBelow ? (
      <div
        className={cn(styles['tedi-progress-bar__hint-row'], {
          [styles['tedi-progress-bar__hint-row--with-value']]: hasValueBelow,
        })}
      >
        {helper ? (
          <FeedbackText {...helper} id={helperId} className={cn(styles['tedi-progress-bar__hint'], helper.className)} />
        ) : (
          <span />
        )}
        {hasValueBelow ? <span className={styles['tedi-progress-bar__value']}>{displayValue}</span> : null}
      </div>
    ) : null;

  return (
    <div
      className={cn(styles['tedi-progress-bar'], { [styles['tedi-progress-bar--small']]: small }, className)}
      data-name="progress-bar"
    >
      {label && labelPosition === 'top' ? (
        <div id={labelId} className={styles['tedi-progress-bar__label-wrapper']}>
          {renderLabel}
        </div>
      ) : null}
      {barRow}
      {helperContent}
    </div>
  );
};

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
