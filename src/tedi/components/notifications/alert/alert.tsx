import cn from 'classnames';
import React from 'react';

import { BreakpointSupport, useBreakpointProps, useIsMounted } from '../../../helpers';
import { Icon, IconWithoutBackgroundProps } from '../../base/icon/icon';
import { Heading } from '../../base/typography/heading/heading';
import { ClosingButton } from '../../buttons/closing-button/closing-button';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import styles from './alert.module.scss';

export type AlertType = 'info' | 'success' | 'warning' | 'danger';

type AlertBreakpointProps = {
  /**
   * Additional CSS class names to apply to the alert for custom styling.
   * Allows combining multiple styles or adding external CSS classes.
   */
  className?: string;
  /**
   * Indicates that the alert is intended to span the full width of the page,
   * typically for critical or prominent messages.
   * @default false
   */
  isGlobal?: boolean;
  /**
   * Removes the side borders from the alert for a cleaner appearance.
   * This also sets the border radius to 0.
   * @default false
   */
  noSideBorders?: boolean;
};

export interface AlertProps extends BreakpointSupport<AlertBreakpointProps> {
  /**
   * The primary content displayed within the alert. This can include text, links, or other elements.
   */
  children?: React.ReactNode;
  /**
   * An optional title for the alert, typically used to summarize the message's purpose.
   * If provided, it appears prominently at the top of the alert.
   */
  title?: React.ReactNode;
  /**
   * Defines the visual and contextual type of the alert. This determines the icon, color, and
   * overall style, making it clear whether the alert is informational, a success message,
   * a warning, or an error.
   * @default info
   */
  type?: AlertType;
  /**
   * Specifies an optional icon to display in the alert, providing quick visual context.
   * Can be a string (icon name) or an object with additional `IconProps` to further customize the icon.
   */
  icon?: string | IconWithoutBackgroundProps;
  /**
   * Callback function triggered when the close button is clicked.
   * Adding this handler renders a close button in the alert.
   * Useful for dismissible alerts.
   */
  onClose?: () => void;
  /**
   * The ARIA role of the alert, informing screen readers about the alert's purpose.
   * Options:
   * - 'alert': For high-priority messages that demand immediate attention.
   * - 'status': For less urgent messages providing feedback or updates.
   * - 'none': Used when no ARIA role is needed.
   * @default alert
   */
  role?: 'alert' | 'status' | 'none';
  /**
   * Semantic heading level for alert titles to ensure WCAG compliance.
   *
   * @example
   * // For critical alerts that are main content
   * titleElement="h2"
   *
   * @example
   * // For secondary notifications
   * titleElement="h4"
   *
   * @default 'h3'
   */
  titleElement?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Alert = (props: AlertProps): JSX.Element | null => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const {
    children,
    role = 'alert',
    title,
    className,
    type = 'info',
    icon,
    onClose,
    isGlobal = false,
    noSideBorders = false,
    titleElement = 'h3',
    ...rest
  } = getCurrentBreakpointProps<AlertProps>(props);

  const alertBEM = cn(
    styles['tedi-alert'],
    styles[`tedi-alert--${type}`],
    {
      [styles['tedi-alert--global']]: isGlobal,
      [styles['tedi-alert--no-side-borders']]: noSideBorders,
    },
    className
  );

  const isMounted = useIsMounted();

  const getIcon = (icon: string | IconWithoutBackgroundProps) => {
    const defaultIconProps: Partial<IconWithoutBackgroundProps> = { size: 18 };
    const iconProps: IconWithoutBackgroundProps =
      typeof icon === 'string' ? { ...defaultIconProps, name: icon } : { ...defaultIconProps, ...icon };

    return <Icon {...iconProps} className={styles['tedi-alert__icon']} />;
  };

  const ariaLive = role === 'alert' ? 'assertive' : role === 'status' ? 'polite' : 'off';
  const headingId = React.useId();

  return isMounted ? (
    <div
      role={role}
      data-name="alert"
      aria-label={`${type} alert`}
      aria-live={ariaLive}
      aria-labelledby={title ? headingId : undefined}
      {...rest}
      className={alertBEM}
    >
      <VerticalSpacing size={0.25}>
        <Row gutterX={2} alignItems={title ? 'center' : 'start'}>
          <Col grow={1} className={styles['tedi-alert__content']}>
            {icon && getIcon(icon)}
            <div className="tedi-alert__content-wrapper">
              {title ? (
                <Heading element={titleElement} id={headingId} modifiers={['h5']}>
                  {title}
                </Heading>
              ) : (
                children
              )}
            </div>
          </Col>
          {onClose && (
            <Col width="auto">
              <ClosingButton onClick={onClose} />
            </Col>
          )}
        </Row>
        {title && children && <div className="tedi-alert__content-wrapper">{children}</div>}
      </VerticalSpacing>
    </div>
  ) : null;
};

export default Alert;
