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
  /**
   * Alert size variant.
   * - 'default': Standard alert size with padding and border radius.
   * - 'small': More compact alert size with reduced padding.
   * @default default
   */
  size?: 'default' | 'small';
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
   *
   * Ignored when `action` is also set — the consumer's slot wins, and is
   * responsible for any close affordance it wants to expose.
   */
  onClose?: () => void;
  /**
   * Custom content for the right-side slot of the alert (e.g. a CTA button,
   * a link, or a small icon stack). Replaces the default close button when
   * provided. Use this instead of squeezing buttons into `children` so the
   * layout slot is reserved and aligned consistently.
   */
  action?: React.ReactNode;
  /**
   * How screen readers announce the icon, title and message (buttons stay outside the announcement).
   * - 'none': static content already on the page when it loads. Some screen readers read a
   *   role="alert" present at load immediately.
   * - 'status': non-urgent message that appears later (saved, info). Announced politely.
   * - 'alert': urgent message that appears later (error, needs action). Announced assertively.
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
   * @default h3
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
    action,
    isGlobal = false,
    noSideBorders = false,
    titleElement = 'h3',
    size = 'default',
    ...rest
  } = getCurrentBreakpointProps<AlertProps>(props);

  const alertBEM = cn(
    styles['tedi-alert'],
    styles[`tedi-alert--${type}`],
    styles[`tedi-alert--size-${size}`],
    {
      [styles['tedi-alert--global']]: isGlobal,
      [styles['tedi-alert--no-side-borders']]: noSideBorders,
      [styles['tedi-alert--has-action']]: Boolean(action),
    },
    className
  );

  const isMounted = useIsMounted();
  const headingId = React.useId();

  const getIcon = (icon: string | IconWithoutBackgroundProps) => {
    const defaultIconProps: Partial<IconWithoutBackgroundProps> = { size: 18 };
    const iconProps: IconWithoutBackgroundProps =
      typeof icon === 'string' ? { ...defaultIconProps, name: icon } : { ...defaultIconProps, ...icon };

    return <Icon {...iconProps} className={styles['tedi-alert__icon']} />;
  };

  return isMounted ? (
    <div data-name="alert" {...rest} className={alertBEM}>
      <Row gutterX={2} alignItems={action || (title && !children) ? 'center' : 'start'}>
        <Col grow={1} className={cn({ [styles['tedi-alert__main--centered']]: !title })}>
          <div role={role}>
            <VerticalSpacing size={0.25}>
              <div className={styles['tedi-alert__content']}>
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
              </div>
              {title && children && <div className="tedi-alert__content-wrapper">{children}</div>}
            </VerticalSpacing>
          </div>
        </Col>
        {action ? (
          <Col width="auto">{action}</Col>
        ) : (
          onClose && (
            <Col width="auto">
              <ClosingButton onClick={onClose} iconSize={18} aria-describedby={title ? headingId : undefined} />
            </Col>
          )
        )}
      </Row>
    </div>
  ) : null;
};

Alert.displayName = 'Alert';

export default Alert;
