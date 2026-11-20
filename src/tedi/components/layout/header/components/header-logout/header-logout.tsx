import { Text } from '../../../../../../tedi/components/base/typography/text/text';
import { Breakpoint, BreakpointSupport } from '../../../../../helpers';
import { useLabels } from '../../../../../providers/label-provider';
import { Icon } from '../../../../base/icon/icon';
import { Button } from '../../../../buttons/button/button';
import Link from '../../../../navigation/link/link';
import {
  getHeaderButtonVariants,
  HeaderButtonVariant,
  HeaderResponsiveVariants,
} from '../../header-responsive-variants';
import HeaderMobileButton from '../header-mobile-button/header-mobile-button';
import styles from './header-logout.module.scss';

interface HeaderLogoutBreakpointProps {
  /**
   * Controls the visual size of the logout button.
   * `'small'` renders a compact icon button (used on mobile), `'default'` renders a full-width link with icon.
   * Falls back to `'small'` below the `md` breakpoint when not specified.
   */
  size?: 'default' | 'small';
  /** Custom label text for the logout button. Falls back to the `header.logout` or `header.logout.mobile` translation key. */
  label?: string;
}

export interface HeaderLogoutProps extends BreakpointSupport<HeaderLogoutBreakpointProps> {
  /**
   * @deprecated Ignored. The layout is chosen with CSS.
   */
  defaultServerBreakpoint?: Breakpoint;
  /** Click handler fired when the logout button is activated. */
  onClick?: () => void;
  /** URL to navigate to when the logout button is clicked. */
  href?: string;
}

export const HeaderLogout = (props: HeaderLogoutProps) => {
  const { onClick, href } = props;
  const { getLabel } = useLabels();

  const renderButton = ({ size, label }: HeaderButtonVariant) => {
    const isSmall = size === 'small';
    const resolvedLabel = label ?? (isSmall ? getLabel('header.logout.mobile') : getLabel('header.logout'));

    return (
      <>
        {isSmall ? (
          <HeaderMobileButton
            onClick={onClick}
            href={href}
            icon={{ name: 'logout', size: 24, color: 'inherit' }}
            label={resolvedLabel}
          />
        ) : href ? (
          <Link onClick={onClick} href={href} underline={false}>
            <div className={styles['tedi-header-logout']}>
              <Icon name="logout" size={18} color="inherit" />
              <Text modifiers="normal" className={styles['tedi-header-logout__text']}>
                {resolvedLabel}
              </Text>
            </div>
          </Link>
        ) : (
          <Button onClick={onClick} noStyle>
            <div className={styles['tedi-header-logout']}>
              <Icon name="logout" size={18} color="inherit" />
              <Text modifiers="normal" className={styles['tedi-header-logout__text']}>
                {resolvedLabel}
              </Text>
            </div>
          </Button>
        )}
      </>
    );
  };

  return <HeaderResponsiveVariants variants={getHeaderButtonVariants(props)}>{renderButton}</HeaderResponsiveVariants>;
};

HeaderLogout.displayName = 'HeaderLogout';

export default HeaderLogout;
