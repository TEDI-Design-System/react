import cn from 'classnames';
import { MouseEventHandler } from 'react';
import { ButtonHTMLAttributes } from 'react';

import { useLabels } from '../../../providers/label-provider';
import { Icon } from '../../base/icon/icon';
import styles from './closing-button.module.scss';

export type ClosingButtonSize = 'default' | 'small';
export type ClosingButtonIconSize = 18 | 24;

export interface ClosingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Additional classes to apply custom styles to the ClosingButton.
   */
  className?: string;
  /**
   * Size of the ClosingButton
   * @default 'default'
   */
  size?: ClosingButtonSize;
  /**
   * Event handler for the button click event. Triggered when the user clicks on the close button.
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /*
   * Title for the button.
   * Used for accessibility and as a tooltip on hover. If not provided, the label provider's 'close' label will be used as a fallback.
   */
  title?: string;
  /*
   * Size of the icon inside the button
   * @default 24
   * If iconSize is set to 18, the button size will automatically adjust to 'small'.
   */
  iconSize?: ClosingButtonIconSize;
}

export const ClosingButton = (props: ClosingButtonProps): JSX.Element => {
  const { getLabel } = useLabels();
  const { title = getLabel('close'), onClick, size = 'default', iconSize = 24, className, ...rest } = props;

  const resolvedSize: ClosingButtonSize = iconSize === 18 ? 'small' : size;

  const buttonClass = cn(
    styles['tedi-closing-button'],
    {
      [styles[`tedi-closing-button--${resolvedSize}`]]: resolvedSize,
    },
    className
  );

  const resolvedIconSize: ClosingButtonIconSize = iconSize ?? 24;

  return (
    <button
      data-name="closing-button"
      type="button"
      {...rest}
      className={buttonClass}
      onClick={onClick}
      title={title}
      aria-label={title}
    >
      <Icon name="close" size={resolvedIconSize} />
    </button>
  );
};

export default ClosingButton;
