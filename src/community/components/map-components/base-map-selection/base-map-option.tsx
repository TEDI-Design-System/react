import classNames from 'classnames';
import { JSX, useCallback, useRef, useState } from 'react';

import { Icon } from '../../../../tedi/components/base/icon/icon';
import { Tooltip } from '../../../../tedi/components/overlays/tooltip';
import styles from './base-map-selection.module.scss';

export type BaseMapOptionType = 'button' | 'historical' | 'selection';
export type BaseMapOptionTooltipType = 'info' | 'error';

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
  /**
   * Text shown in a tooltip. When set, an info icon is rendered in the middle of
   * the option and reveals this text on hover.
   */
  tooltipText?: string;
  /**
   * Visual style of the info icon shown when `tooltipText` is set.
   * - `'info'`: neutral informational icon (default)
   * - `'error'`: error/danger styled icon
   * @default 'info'
   */
  tooltipType?: BaseMapOptionTooltipType;
}

export const BaseMapOption = (props: BaseMapOptionProps): JSX.Element => {
  const {
    title,
    content,
    selected,
    onSelect,
    type = 'selection',
    className,
    id,
    multiple,
    disabled,
    tooltipText,
    tooltipType = 'info',
  } = props;

  const [isTruncated, setIsTruncated] = useState(false);
  const observerRef = useRef<ResizeObserver>();

  const titleRef = useCallback((node: HTMLDivElement | null) => {
    observerRef.current?.disconnect();

    if (!node) {
      return;
    }

    const measure = () => setIsTruncated(node.scrollWidth > node.clientWidth);
    measure();

    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    observerRef.current = new ResizeObserver(measure);
    observerRef.current.observe(node);
  }, []);

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

  const titleContent = (
    <div ref={titleRef} tabIndex={-1} className={styles['tedi-base-map-selection__title']}>
      {title}
    </div>
  );

  const titleElement = isTruncated ? (
    <Tooltip>
      <Tooltip.Trigger>{titleContent}</Tooltip.Trigger>
      <Tooltip.Content>{title}</Tooltip.Content>
    </Tooltip>
  ) : (
    titleContent
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
      <div aria-hidden className={styles['tedi-base-map-selection__content']}>
        {content}
      </div>
      {tooltipText && (
        <Tooltip>
          <Tooltip.Trigger>
            <span tabIndex={-1} className={styles['tedi-base-map-selection__info']}>
              <Icon
                background="brand-secondary"
                name={tooltipType === 'error' ? 'error' : 'info'}
                size={16}
                color={tooltipType === 'error' ? 'danger' : 'brand'}
              />
            </span>
          </Tooltip.Trigger>
          <Tooltip.Content>{tooltipText}</Tooltip.Content>
        </Tooltip>
      )}
      {titleElement}
    </div>
  );
};

BaseMapOption.displayName = 'BaseMapOption';

export default BaseMapOption;
