import cn from 'classnames';
import { MouseEventHandler } from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import { Icon } from '../../base/icon/icon';
import ClosingButton, { ClosingButtonProps } from '../../buttons/closing-button/closing-button';
import { Spinner } from '../../loaders/spinner/spinner';
import { Ellipsis } from '../../misc/ellipsis/ellipsis';
import styles from './tag.module.scss';

type TagColor = 'primary' | 'secondary' | 'danger';

export type TagEllipsis = 'start' | 'end' | false;

type TagBreakpointProps = {
  /**
   * Determines Tag color
   * When true, the Tag will be styled accordingly and an error icon will be displayed.
   * @default 'primary'
   */
  color?: TagColor;
  /**
   * Truncates the label when the Tag is width-constrained, revealing the full text
   * in a popover on hover/focus. `end` shows a trailing ellipsis (`Long label…`);
   * `start` shows a leading one (`…label`), keeping the most significant tail
   * (e.g. dates, IDs) visible. `false` never truncates — the label wraps and the
   * Tag keeps its full width.
   * @default false
   */
  ellipsis?: TagEllipsis;
  /**
   * Additional classes to apply custom styles to the Tag.
   */
  className?: string;
};

export interface TagProps extends BreakpointSupport<TagBreakpointProps> {
  /**
   * The content inside the Tag.
   * Typically this will be text or any JSX elements to be displayed.
   */
  children: React.ReactNode;
  /**
   * Function to be called when the close button is clicked.
   * If provided, a close button will be rendered inside the Tag.
   */
  onClose?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Extra props forwarded to the inner close button (when `onClose` is set).
   * Lets consumers wire up keyboard handlers, tab focus, or event isolation
   * without reaching past the Tag API. `onClick` and `iconSize` are owned by
   * Tag and can't be overridden here.
   */
  closeButtonProps?: Omit<ClosingButtonProps, 'onClick' | 'iconSize'>;
  /**
   * Determines whether the Tag is in a loading state
   * @default false
   */
  isLoading?: boolean;
}

export const Tag = (props: TagProps): JSX.Element => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const {
    children,
    className,
    onClose,
    closeButtonProps,
    isLoading = false,
    color = 'primary',
    ellipsis = false,
    ...rest
  } = getCurrentBreakpointProps<TagProps>(props);

  const tagBEM = cn(
    styles['tedi-tag'],
    color && styles[`tedi-tag--color-${color}`],
    onClose && !isLoading && styles['tedi-tag__close'],
    ellipsis !== false && styles['tedi-tag--ellipsis'],
    className
  );

  return (
    <div className={tagBEM} role="status" aria-live={isLoading ? 'polite' : undefined} {...rest}>
      {color === 'danger' && (
        <div className={styles['tedi-tag__icon-wrapper']}>
          <Icon name="info" color="danger" size={16} className={styles['tedi-tag__icon--error']} />
        </div>
      )}
      <div className={styles['tedi-tag__content']}>
        {ellipsis !== false ? (
          <Ellipsis position={ellipsis === 'start' ? 'start' : 'end'} lineClamp={1}>
            {children}
          </Ellipsis>
        ) : (
          children
        )}
      </div>
      {isLoading && !onClose && (
        <div className={styles['tedi-tag__icon-wrapper']}>
          <Spinner className={styles['tedi-tag__loader']} />
        </div>
      )}
      {!isLoading && onClose && <ClosingButton iconSize={18} {...closeButtonProps} onClick={onClose} />}
    </div>
  );
};
