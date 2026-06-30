import classNames from 'classnames';
import { JSX } from 'react';

import styles from './base-map-selection.module.scss';

export type BaseMapOptionType = 'button' | 'historical' | 'selection';

export interface BaseMapOptionProps {
  /**
   * The title displayed within the option.
   */
  title: string;
  /**
   * The main content of the option, typically a thumbnail. Can be any valid React node.
   */
  content: React.ReactNode;
  /**
   * Indicates whether the option is currently selected.
   * Used to apply specific visual styles.
   */
  selected?: boolean;
  /**
   * Callback triggered when the option is clicked
   * or activated via keyboard (Enter or Space).
   */
  onSelect?: () => void;
  /**
   * The type of the option, which controls styling.
   * - `'selection'`: thumbnail with the title rendered below (default)
   * - `'button'`: square thumbnail with the title overlaid
   * - `'historical'`: styled for historical context
   * @default 'selection'
   */
  type?: BaseMapOptionType;
  /**
   * Optional custom class name to apply additional styles.
   */
  className?: string;
  /**
   * HTML `id` attribute to identify the element.
   */
  id: string;
  /**
   * When `true`, renders a "stacked" visual indicating multiple maps.
   */
  multiple?: boolean;
  /**
   * Applies disabled style.
   */
  disabled?: boolean;
}

export const BaseMapOption = (props: BaseMapOptionProps): JSX.Element => {
  const { title, content, selected, onSelect, type = 'selection', className, id, multiple, disabled } = props;

  const handleSelect = () => {
    if (disabled) {
      return;
    }
    onSelect?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect?.();
    }
  };

  const optionBEM = classNames(
    styles['tedi-base-map-selection__wrapper'],
    selected && styles['tedi-base-map-selection--selected'],
    type && styles[`tedi-base-map-selection--${type}`],
    multiple && styles['tedi-base-map-selection--multiple'],
    disabled && styles['tedi-base-map-selection--disabled'],
    className
  );

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-pressed={!!selected}
      aria-disabled={disabled || undefined}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      className={optionBEM}
      id={id}
    >
      <div className={styles['tedi-base-map-selection__content']}>{content}</div>
      <div className={styles['tedi-base-map-selection__title']}>{title}</div>
    </div>
  );
};

BaseMapOption.displayName = 'BaseMapOption';

export default BaseMapOption;
