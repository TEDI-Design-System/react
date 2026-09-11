import classNames from 'classnames';
import { JSX, useEffect, useRef, useState } from 'react';

import { Icon } from '../../../../tedi/components/base/icon/icon';
import Button from '../../../../tedi/components/buttons/button/button';
import { Tooltip } from '../../../../tedi/components/overlays/tooltip';
import { useElementSize } from '../../../../tedi/helpers';
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
   * Text shown in a tooltip. When set, an info icon is rendered in the middle of the
   * option and hovering anywhere on the option reveals this text. A title too long to
   * fit is shown above it in the same tooltip rather than in a second, competing one.
   */
  tooltipText?: string;
  /**
   * Which icon and colour the tooltip indicator uses.
   * - `'info'`: neutral info icon in the brand colour (default)
   * - `'error'`: error icon in the danger colour, for a layer that is unavailable
   *
   * Only takes effect when `tooltipText` is set, since that is what renders the icon.
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

  const titleRef = useRef<HTMLDivElement>(null);
  const titleSize = useElementSize(titleRef);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const node = titleRef.current;

    if (node) {
      setIsTruncated(node.scrollWidth > node.clientWidth);
    }
  }, [titleSize, title]);

  const handleSelect = () => {
    if (disabled) {
      return;
    }
    onSelect?.();
  };

  const optionBEM = classNames(
    styles['tedi-base-map-selection__wrapper'],
    selected && styles['tedi-base-map-selection--selected'],
    type && styles[`tedi-base-map-selection--${type}`],
    multiple && styles['tedi-base-map-selection--multiple'],
    disabled && styles['tedi-base-map-selection--disabled'],
    className
  );

  const option = (
    <Button
      noStyle
      disabled={disabled}
      aria-pressed={!!selected}
      aria-disabled={disabled || undefined}
      onClick={handleSelect}
      className={optionBEM}
      id={id}
    >
      <div aria-hidden className={styles['tedi-base-map-selection__content']}>
        {content}
      </div>
      {tooltipText && (
        <span className={styles['tedi-base-map-selection__info']}>
          <Icon
            background="brand-secondary"
            name={tooltipType === 'error' ? 'error' : 'info'}
            size={16}
            color={tooltipType === 'error' ? 'danger' : 'brand'}
          />
        </span>
      )}
      <div ref={titleRef} className={styles['tedi-base-map-selection__title']}>
        {title}
      </div>
    </Button>
  );

  if (!tooltipText && !isTruncated) {
    return option;
  }

  return (
    <Tooltip ariaHidden={!tooltipText} openWith="hover">
      <Tooltip.Trigger>{option}</Tooltip.Trigger>
      <Tooltip.Content>
        {tooltipText ? (
          <>
            {isTruncated && <div aria-hidden>{title}</div>}
            {tooltipText}
          </>
        ) : (
          title
        )}
      </Tooltip.Content>
    </Tooltip>
  );
};

BaseMapOption.displayName = 'BaseMapOption';

export default BaseMapOption;
