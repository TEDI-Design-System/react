import cn from 'classnames';
import React, { forwardRef, useCallback, useEffect, useId, useRef, useState } from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import { Tooltip } from '../../overlays/tooltip/tooltip';
import { TooltipContent } from '../../overlays/tooltip/tooltip-content';
import { TooltipTrigger } from '../../overlays/tooltip/tooltip-trigger';
import { FeedbackText, FeedbackTextProps } from '../feedback-text/feedback-text';
import { FormLabel } from '../form-label/form-label';
import styles from './slider.module.scss';

type SliderBreakpointProps = {
  /**
   * Text/element rendered to the left of the track (e.g. the minimum value).
   */
  minLabel?: React.ReactNode;
  /**
   * Text/element rendered to the right of the track (e.g. the maximum value).
   * Ignored when `showCurrentValue` is `true`.
   */
  maxLabel?: React.ReactNode;
  /**
   * When `true`, renders the current value to the right of the track instead of `maxLabel`.
   * @default false
   */
  showCurrentValue?: boolean;
  /**
   * Formats the current value, used by both the thumb tooltip and the `showCurrentValue` label.
   * @default (value) => value
   */
  valueFormatter?: (value: number) => React.ReactNode;
  /**
   * Renders a tooltip above the thumb showing the current value. Shown only while the slider is
   * hovered, focused, or being dragged. Value is formatted via `valueFormatter`.
   * @default true
   */
  tooltip?: boolean;
  /**
   * Node rendered to the right of the slider, typically a NumberField used to edit the same value.
   */
  addonRight?: React.ReactNode;
  /**
   * Helper text rendered below the slider.
   */
  helper?: FeedbackTextProps;
  /**
   * Additional class name(s) applied to the root element.
   */
  className?: string;
};

export interface SliderProps extends BreakpointSupport<SliderBreakpointProps> {
  /**
   * Unique identifier for the underlying input element.
   * Generated automatically if not provided.
   */
  id?: string;
  /**
   * Name attribute of the underlying input element.
   */
  name?: string;
  /**
   * Label text rendered above the slider.
   */
  label?: React.ReactNode;
  /**
   * Controls the visibility of the label. Pass `true` to hide it visually while keeping it
   * available to assistive technology, or `'keep-space'` to reserve the vertical space.
   */
  hideLabel?: boolean | 'keep-space';
  /**
   * Marks the field as required.
   */
  required?: boolean;
  /**
   * Minimum allowed value.
   * @default 0
   */
  min?: number;
  /**
   * Maximum allowed value.
   * @default 100
   */
  max?: number;
  /**
   * Step size.
   * @default 1
   */
  step?: number;
  /**
   * Controlled value. Use together with `onChange`.
   */
  value?: number;
  /**
   * Default value for uncontrolled usage.
   * @default min
   */
  defaultValue?: number;
  /**
   * Callback fired when the value changes.
   */
  onChange?: (value: number) => void;
  /**
   * Disables the slider.
   */
  disabled?: boolean;
  /**
   * Marks the slider as invalid for validation purposes.
   */
  invalid?: boolean;
  /**
   * Accessible label used when no visible `label` is provided.
   */
  'aria-label'?: string;
  /**
   * ID of an element that labels the slider, used when no visible `label` is provided.
   */
  'aria-labelledby'?: string;
  /**
   * Human-readable text alternative of the current value.
   */
  'aria-valuetext'?: string;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>((props, ref) => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const {
    id: providedId,
    name,
    label,
    hideLabel,
    required,
    min = 0,
    max = 100,
    step = 1,
    value,
    defaultValue,
    onChange,
    disabled = false,
    invalid = false,
    minLabel,
    maxLabel,
    showCurrentValue = false,
    valueFormatter,
    tooltip = true,
    addonRight,
    helper,
    className,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-valuetext': ariaValueText,
  } = getCurrentBreakpointProps<SliderProps>(props);

  const generatedId = useId();
  const id = providedId ?? `tedi-slider-${generatedId}`;
  const helperId = helper ? helper.id ?? `${id}-helper` : undefined;

  const [uncontrolledValue, setUncontrolledValue] = useState<number>(defaultValue ?? min);
  const currentValue = value ?? uncontrolledValue;
  const clampedValue = Math.min(max, Math.max(min, currentValue));

  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const canShowTooltip = Boolean(tooltip) && !disabled;
  const isTooltipOpen = canShowTooltip && (isHovered || isFocused || isDragging);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  const dragPointerIdRef = useRef<number | null>(null);

  const endDrag = useCallback(() => {
    dragPointerIdRef.current = null;
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);

    return () => {
      window.removeEventListener('pointerup', endDrag);
      window.removeEventListener('pointercancel', endDrag);
    };
  }, [isDragging, endDrag]);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLInputElement>) => {
      if (disabled) return;
      dragPointerIdRef.current = event.pointerId;
      setIsDragging(true);
    },
    [disabled]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const next = Number(event.target.value);
      if (value === undefined) {
        setUncontrolledValue(next);
      }
      onChange?.(next);
    },
    [onChange, value]
  );

  const isInvalid = invalid || helper?.type === 'error';
  const progress = max === min ? 0 : ((clampedValue - min) / (max - min)) * 100;
  const formattedCurrentValue = valueFormatter ? valueFormatter(clampedValue) : clampedValue;
  const rightLabel = showCurrentValue ? formattedCurrentValue : maxLabel;

  const SliderBEM = cn(
    styles['tedi-slider'],
    {
      [styles['tedi-slider--disabled']]: disabled,
      [styles['tedi-slider--invalid']]: isInvalid,
      [styles['tedi-slider--dragging']]: isDragging && !disabled,
    },
    className
  );

  return (
    <div data-name="slider" className={SliderBEM}>
      {label && <FormLabel id={id} label={label} required={required} hideLabel={hideLabel} />}
      <div className={styles['tedi-slider__container']}>
        <div className={styles['tedi-slider__track-row']}>
          {minLabel !== undefined && minLabel !== null && (
            <span className={styles['tedi-slider__range-label']} aria-hidden="true">
              {minLabel}
            </span>
          )}
          <div
            className={styles['tedi-slider__track']}
            style={
              {
                '--tedi-slider-progress': `${progress}%`,
                '--tedi-slider-progress-ratio': `${progress / 100}`,
              } as React.CSSProperties
            }
          >
            <input
              ref={ref}
              id={id}
              name={name}
              type="range"
              min={min}
              max={max}
              step={step}
              value={clampedValue}
              disabled={disabled}
              required={required}
              aria-invalid={isInvalid ? 'true' : undefined}
              aria-describedby={helperId}
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledBy}
              aria-valuetext={ariaValueText}
              onChange={handleChange}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onPointerDown={handlePointerDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={cn(styles['tedi-slider__input'], {
                [styles['tedi-slider__input--dragging']]: isDragging,
              })}
            />
            {canShowTooltip && (
              <Tooltip
                open={isTooltipOpen}
                onToggle={() => {}}
                focusManager={{ returnFocus: false, initialFocus: -1 }}
                placement="top"
                trackReferencePosition
              >
                <TooltipTrigger>
                  <span className={styles['tedi-slider__thumb-anchor']} aria-hidden="true" tabIndex={-1} />
                </TooltipTrigger>
                <TooltipContent>{formattedCurrentValue}</TooltipContent>
              </Tooltip>
            )}
          </div>
          {rightLabel !== undefined && rightLabel !== null && (
            <span
              className={styles['tedi-slider__range-label']}
              aria-hidden={showCurrentValue ? undefined : 'true'}
              aria-live={showCurrentValue ? 'polite' : undefined}
            >
              {rightLabel}
            </span>
          )}
        </div>
        {addonRight && <div className={styles['tedi-slider__addon']}>{addonRight}</div>}
      </div>
      {helper && (
        <FeedbackText {...helper} id={helperId} className={cn(styles['tedi-slider__feedback'], helper.className)} />
      )}
    </div>
  );
});

Slider.displayName = 'Slider';

export default Slider;
