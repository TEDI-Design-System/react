import cn from 'classnames';
import React, { forwardRef, useId } from 'react';

import { Icon } from '../../base/icon/icon';
import { Spinner } from '../../loaders/spinner/spinner';
import FeedbackText, { FeedbackTextProps } from '../feedback-text/feedback-text';
import FormLabel from '../form-label/form-label';
import styles from './toggle.module.scss';

export interface ToggleProps {
  /**
   * Unique identifier for the toggle input.
   * Required for accessibility and to link the label with the input.
   */
  id: string;
  /**
   * Label text or element displayed next to the toggle.
   * This is shown to users and should clearly describe what the toggle does.
   */
  label: React.ReactNode;
  /**
   * Visually hides the label while keeping it accessible to screen readers.
   * Useful when the toggle's purpose is clear from context (e.g., in a settings row).
   * @default false
   */
  hideLabel?: boolean;
  /**
   * Position of the label relative to the toggle switch.
   * @default right
   */
  labelPosition?: 'left' | 'right';
  /**
   * Optional helper text displayed below the toggle.
   * Can be used to provide additional context or validation messages.
   */
  helper?: FeedbackTextProps;
  /**
   * Additional CSS class name(s) to apply to the toggle wrapper.
   * Useful for custom styling or theming from parent components.
   */
  className?: string;
  /**
   * Controlled state of the toggle.
   * Use this together with `onChange` for full control over the checked state.
   */
  checked?: boolean;
  /**
   * Initial checked state for uncontrolled usage.
   * Ignored if `checked` prop is provided.
   */
  defaultChecked?: boolean;
  /**
   * Callback fired when the toggle state changes.
   * @param value - The new checked state (`true` or `false`)
   */
  onChange?(value: boolean): void;
  /**
   * Size of the toggle switch.
   * @default default
   */
  size?: 'default' | 'large';
  /**
   * Color variant of the toggle.
   * - `primary`: Standard toggle (usually blue/brand color)
   * - `colored`: Alternative accent color (e.g. for special settings)
   * @default primary
   */
  color?: 'primary' | 'colored';
  /**
   * Visual style variant of the toggle.
   * @default filled
   */
  type?: 'filled' | 'outlined';
  /**
   * Shows a lock icon inside the toggle knob.
   * Typically used with `size="large"` to indicate secure/private settings.
   * @default false
   */
  icon?: boolean;
  /**
   * Disables the toggle, preventing user interaction.
   * @default false
   */
  disabled?: boolean;
  /**
   * Shows a loading spinner inside the toggle instead of the icon or dot.
   * Useful for async operations (e.g. saving settings).
   * When `true`, `onChange` will not be triggered.
   * @default false
   */
  isLoading?: boolean;
  /**
   * Tooltip content shown when hovering over the label.
   * Useful for providing extra explanation without cluttering the UI.
   */
  tooltip?: string;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>((props, ref) => {
  const {
    id: propId,
    label,
    hideLabel = false,
    labelPosition = 'left',
    helper,
    className,
    checked,
    defaultChecked,
    onChange,
    size: propSize,
    color = 'primary',
    type = 'filled',
    icon,
    disabled = false,
    isLoading = false,
    tooltip,
    ...rest
  } = props;

  const generatedId = useId();
  const id = propId || `toggle-${generatedId}`;
  const helperId = helper ? `${id}-helper` : undefined;

  const isControlled = typeof checked !== 'undefined';
  const isChecked = isControlled ? checked : defaultChecked ?? false;

  const size = propSize || (icon ? 'large' : 'default');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLoading) return;
    onChange?.(e.target.checked);
  };

  const toggleClass = cn(
    styles['tedi-toggle'],
    styles[`tedi-toggle--${size}`],
    styles[`tedi-toggle--${color}-${type}`],
    {
      [styles['tedi-toggle--active']]: isChecked,
      [styles['tedi-toggle--disabled']]: disabled,
    },
    className
  );

  const controlClass = cn(styles['tedi-toggle__control'], styles[`tedi-toggle__control--label-${labelPosition}`]);

  return (
    <div className={styles['tedi-toggle-wrapper']}>
      <label htmlFor={id} className={controlClass}>
        {label && labelPosition === 'left' && (
          <FormLabel
            id={id}
            className={styles['tedi-toggle__label']}
            hideLabel={hideLabel}
            label={label}
            tooltip={tooltip}
          />
        )}

        <div className={toggleClass}>
          <input
            {...rest}
            ref={ref}
            id={id}
            type="checkbox"
            role="switch"
            aria-label={typeof label === 'string' ? label : undefined}
            aria-describedby={helperId}
            className={styles['tedi-toggle__input']}
            checked={isControlled ? isChecked : undefined}
            defaultChecked={!isControlled ? defaultChecked : undefined}
            disabled={disabled}
            onChange={handleChange}
          />

          <span className={styles['tedi-toggle__slider']}>
            {isLoading ? (
              <Spinner size={size === 'large' ? 16 : 10} className={styles['tedi-toggle__icon']} />
            ) : icon ? (
              <Icon name={isChecked ? 'lock_open_right' : 'lock'} size={16} color="inherit" />
            ) : null}
          </span>
        </div>

        {label && labelPosition === 'right' && (
          <FormLabel
            id={id}
            className={styles['tedi-toggle__label']}
            hideLabel={hideLabel}
            label={label}
            tooltip={tooltip}
          />
        )}
      </label>

      {helper && (
        <FeedbackText id={helperId} {...helper} className={cn(styles['tedi-toggle__helper'], helper.className)} />
      )}
    </div>
  );
});

Toggle.displayName = 'Toggle';

export default Toggle;
