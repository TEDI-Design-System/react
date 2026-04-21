import { Text } from '../../../../../../tedi/components/base/typography/text/text';
import { BreakpointSupport, isBreakpointBelow, useBreakpoint, useBreakpointProps } from '../../../../../helpers';
import { useLabels } from '../../../../../providers/label-provider';
import { Icon } from '../../../../base/icon/icon';
import Link from '../../../../navigation/link/link';
import HeaderMobileButton from '../header-mobile-button/header-mobile-button';
import styles from './header-logout.module.scss';

interface HeaderLogoutBreakpointProps {
  /**
   * Controls the visual size of the logout button.
   * `'small'` renders a compact icon button (used on mobile), `'default'` renders a full-width link with icon.
   * Automatically falls back to `'small'` on mobile viewports when not specified.
   */
  size?: 'default' | 'small';
  /** Custom label text for the logout button. Falls back to the `header.logout` or `header.logout-small` translation key. */
  label?: string;
}

export interface HeaderLogoutProps extends BreakpointSupport<HeaderLogoutBreakpointProps> {
  /** Click handler fired when the logout button is activated. */
  onClick?: () => void;
  /** URL to navigate to when the logout button is clicked. */
  href?: string;
}

export const HeaderLogout = (props: HeaderLogoutProps) => {
  const { onClick, href } = props;
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const { size: sizeProp, label } = getCurrentBreakpointProps<HeaderLogoutBreakpointProps>(props);
  const { getLabel } = useLabels();

  const breakpoint = useBreakpoint();
  const isMobileView = isBreakpointBelow(breakpoint, 'md');

  const size = sizeProp ?? (isMobileView ? 'small' : 'default');
  const isSmall = size === 'small';

  const resolvedLabel = label ?? (isSmall ? getLabel('header.logout-small') : getLabel('header.logout'));

  return (
    <>
      {isSmall ? (
        <HeaderMobileButton
          onClick={onClick}
          href={href}
          icon={{ name: 'logout', size: 24, color: 'inherit' }}
          label={resolvedLabel}
        />
      ) : (
        <Link onClick={onClick} href={href} underline={false}>
          <div className={styles['tedi-header-logout']}>
            <Icon name="logout" size={18} color="inherit" />
            <Text modifiers="normal" className={styles['tedi-header-logout__text']}>
              {resolvedLabel}
            </Text>
          </div>
        </Link>
      )}
    </>
  );
};

export default HeaderLogout;
