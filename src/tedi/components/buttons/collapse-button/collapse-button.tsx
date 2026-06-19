import cn from 'classnames';
import React from 'react';

import { labelsMap, useLabels } from '../../../providers/label-provider';
import { Icon } from '../../base/icon/icon';
import styles from './collapse-button.module.scss';

export type CollapseButtonArrowType = 'default' | 'secondary';
export type CollapseButtonSize = 'default' | 'small';

export interface CollapseButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onChange' | 'children'> {
  /**
   * Current open state. Bind alongside `onOpenChange` to keep in sync.
   */
  open: boolean;
  /**
   * Called when the user toggles the button. Receives the next open state.
   * Standard native `onClick` still fires too; if it calls `preventDefault`
   * the toggle is suppressed.
   */
  onOpenChange?: (next: boolean) => void;
  /**
   * Label shown when collapsed. Defaults to the translated `'open'` label
   * resolved through `LabelProvider`. Known translation keys are localised;
   * arbitrary strings are used literally.
   * @default open
   */
  openText?: string;
  /**
   * Label shown when expanded. Defaults to the translated `'close'` label
   * resolved through `LabelProvider`.
   * @default close
   */
  closeText?: string;
  /**
   * Hide the label and render the chevron only.
   * @default false
   */
  hideText?: boolean;
  /**
   * Chevron style. Only takes effect with `hideText` (icon-only mode).
   * @default default
   */
  arrowType?: CollapseButtonArrowType;
  /**
   * Visual size.
   * @default default
   */
  size?: CollapseButtonSize;
  /**
   * Light text and icon for placement on a dark / brand background. Ignored
   * when `arrowType` is `secondary` (no inverted form in the design).
   * @default false
   */
  inverted?: boolean;
  /**
   * Underline the text label. Set `false` in contexts where the chevron is
   * the sole affordance (e.g. inside an accordion header). Has no effect in
   * icon-only mode.
   * @default true
   */
  underline?: boolean;
  /**
   * Accessible label. Required when `hideText` is `true`.
   */
  'aria-label'?: string;
}

const CollapseButtonComponent = (props: CollapseButtonProps): JSX.Element => {
  const {
    open,
    onOpenChange,
    openText,
    closeText,
    hideText = false,
    arrowType = 'default',
    size = 'default',
    inverted = false,
    underline = true,
    className,
    onClick,
    'aria-label': ariaLabelProp,
    ...rest
  } = props;

  const { getLabel } = useLabels();

  const resolveLabel = (value: string | undefined, fallbackKey: Parameters<typeof getLabel>[0]): string => {
    if (value === undefined) return getLabel(fallbackKey);
    return value in labelsMap ? getLabel(value as Parameters<typeof getLabel>[0]) : value;
  };

  const label = open ? resolveLabel(closeText, 'close') : resolveLabel(openText, 'open');

  const resolvedAriaLabel = hideText ? ariaLabelProp ?? label : ariaLabelProp;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    onOpenChange?.(!open);
  };

  const hostClass = cn(
    styles['tedi-collapse-button'],
    {
      [styles['tedi-collapse-button--open']]: open,
      [styles['tedi-collapse-button--small']]: size === 'small',
      [styles['tedi-collapse-button--inverted']]: inverted && arrowType !== 'secondary',
      [styles['tedi-collapse-button--icon-only']]: hideText,
      [styles['tedi-collapse-button--neutral']]: hideText && arrowType !== 'secondary',
      [styles['tedi-collapse-button--secondary']]: hideText && arrowType === 'secondary',
      [styles['tedi-collapse-button--no-underline']]: !hideText && !underline,
    },
    className
  );

  return (
    <button
      type="button"
      {...rest}
      className={hostClass}
      onClick={handleClick}
      aria-expanded={open}
      aria-label={resolvedAriaLabel}
    >
      {!hideText && <span className={styles['tedi-collapse-button__text']}>{label}</span>}
      {hideText ? (
        arrowType === 'secondary' ? (
          <span className={styles['tedi-collapse-button__icon-wrapper']}>
            <Icon
              className={styles['tedi-collapse-button__icon']}
              name="expand_more"
              color="inherit"
              filled
              size={24}
            />
          </span>
        ) : (
          <Icon className={styles['tedi-collapse-button__icon']} name="expand_more" color="inherit" filled size={24} />
        )
      ) : (
        <span className={styles['tedi-collapse-button__icon-pad']}>
          <Icon className={styles['tedi-collapse-button__icon']} name="expand_more" color="inherit" size={16} />
        </span>
      )}
    </button>
  );
};

CollapseButtonComponent.displayName = 'CollapseButton';

export const CollapseButton = CollapseButtonComponent;

export default CollapseButton;
