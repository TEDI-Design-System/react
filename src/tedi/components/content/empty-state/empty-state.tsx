import cn from 'classnames';
import React from 'react';

import { Icon, type IconWithoutBackgroundProps } from '../../base/icon/icon';
import { Heading } from '../../base/typography/heading/heading';
import { Text } from '../../base/typography/text/text';
import styles from './empty-state.module.scss';

export type EmptyStateType = 'separate' | 'attached' | 'inside';
export type EmptyStateSize = 'default' | 'small';

export interface EmptyStateProps {
  /**
   * Container variant — matches the Figma "Types" section.
   * - `'separate'` (default) — full border + radius, stands on its own.
   * - `'attached'` — top border omitted so the block sits flush beneath a
   *   preceding card or table (same width + same bottom-radius).
   * - `'inside'` — no border, no radius; intended to be placed inside another
   *   container such as a `<Card>` or `<Table>`.
   * @default separate
   */
  type?: EmptyStateType;
  /**
   * Padding scale. `default` = 24px, `small` = 16px.
   * @default default
   */
  size?: EmptyStateSize;
  /**
   * Icon rendered above the text block. Pass a Material icon name, a full
   * `IconWithoutBackgroundProps` object to configure the underlying `Icon`,
   * or `null` to hide the icon.
   * @default spa
   */
  icon?: string | IconWithoutBackgroundProps | null;
  /**
   * Optional heading rendered above the description — appears as an H3 in
   * brand-primary text color.
   */
  heading?: React.ReactNode;
  /**
   * Main body text describing why there is nothing to show.
   */
  children?: React.ReactNode;
  /**
   * Call-to-action slot. Typically a `<Button>` (or two) or a `<Link>`.
   * Rendered below the text block.
   */
  actions?: React.ReactNode;
  /**
   * Additional class name on the root element.
   */
  className?: string;
}

export const EmptyState = ({
  type = 'separate',
  size = 'default',
  icon = 'spa',
  heading,
  children,
  actions,
  className,
}: EmptyStateProps): JSX.Element => {
  const rootClassName = cn(
    styles['tedi-empty-state'],
    styles[`tedi-empty-state--${type}`],
    styles[`tedi-empty-state--${size}`],
    className
  );

  const renderedIcon = (() => {
    if (icon === null) return null;
    if (typeof icon === 'string') {
      return <Icon name={icon} size={36} color="brand" />;
    }
    return <Icon size={36} color="brand" {...icon} />;
  })();

  return (
    <div data-name="tedi-empty-state" className={rootClassName}>
      <div className={styles['tedi-empty-state__text']}>
        {renderedIcon && <div className={styles['tedi-empty-state__icon']}>{renderedIcon}</div>}
        {(heading || children) && (
          <div className={styles['tedi-empty-state__content']}>
            {heading && (
              <Heading className={styles['tedi-empty-state__heading']} element="h3" modifiers="h3" color="brand">
                {heading}
              </Heading>
            )}
            {children && (
              <Text className={styles['tedi-empty-state__description']} color="secondary" modifiers="center">
                {children}
              </Text>
            )}
          </div>
        )}
      </div>
      {actions && <div className={styles['tedi-empty-state__actions']}>{actions}</div>}
    </div>
  );
};

EmptyState.displayName = 'EmptyState';

export default EmptyState;
