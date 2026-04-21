import { Text } from '../../../../../../tedi/components/base/typography/text/text';
import { BreakpointSupport, isBreakpointBelow, useBreakpoint, useBreakpointProps } from '../../../../../helpers';
import { useLabels } from '../../../../../providers/label-provider';
import Link from '../../../../navigation/link/link';
import HeaderMobileButton from '../header-mobile-button/header-mobile-button';
import styles from './header-login.module.scss';

interface HeaderLoginBreakpointProps {
  /**
   * Controls the visual size of the login button.
   * `'small'` renders a compact icon button (used on mobile), `'default'` renders a full-width link.
   * Automatically falls back to `'small'` on mobile viewports when not specified.
   */
  size?: 'default' | 'small';
  /** Custom label text for the login button. Falls back to the `header.login` or `header.login-small` translation key. */
  label?: string;
}

export interface HeaderLoginProps extends BreakpointSupport<HeaderLoginBreakpointProps> {
  /** Click handler fired when the login button is activated. */
  onClick?: () => void;
  /** URL to navigate to when the login button is clicked. */
  href?: string;
}

export const HeaderLogin = (props: HeaderLoginProps) => {
  const { onClick, href } = props;
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const { size: sizeProp, label } = getCurrentBreakpointProps<HeaderLoginBreakpointProps>(props);
  const { getLabel } = useLabels();

  const breakpoint = useBreakpoint();
  const isMobileView = isBreakpointBelow(breakpoint, 'md');

  const size = sizeProp ?? (isMobileView ? 'small' : 'default');
  const isSmall = size === 'small';

  const resolvedLabel = label ?? (isSmall ? getLabel('header.login-small') : getLabel('header.login'));

  return (
    <>
      {isSmall ? (
        <HeaderMobileButton
          onClick={onClick}
          href={href}
          icon={{ name: 'login', size: 24, color: 'inherit' }}
          label={resolvedLabel}
        />
      ) : (
        <Link
          onClick={onClick}
          href={href}
          underline={false}
          visualType="primary"
          className={styles['tedi-header-login__button']}
        >
          <div className={styles['tedi-header-login__button--inner']}>
            <Text modifiers="normal" className={styles['tedi-header-login__button--text']}>
              {resolvedLabel}
            </Text>
          </div>
        </Link>
      )}
    </>
  );
};

export default HeaderLogin;
