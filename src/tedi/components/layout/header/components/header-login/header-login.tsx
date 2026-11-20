import { Text } from '../../../../../../tedi/components/base/typography/text/text';
import { Breakpoint, BreakpointSupport } from '../../../../../helpers';
import { useLabels } from '../../../../../providers/label-provider';
import { Button } from '../../../../buttons/button/button';
import Link from '../../../../navigation/link/link';
import {
  getHeaderButtonVariants,
  HeaderButtonVariant,
  HeaderResponsiveVariants,
} from '../../header-responsive-variants';
import HeaderMobileButton from '../header-mobile-button/header-mobile-button';
import styles from './header-login.module.scss';

interface HeaderLoginBreakpointProps {
  /**
   * Controls the visual size of the login button.
   * `'small'` renders a compact icon button (used on mobile), `'default'` renders a full-width link.
   * Falls back to `'small'` below the `md` breakpoint when not specified.
   */
  size?: 'default' | 'small';
  /** Custom label text for the login button. Falls back to the `header.login` or `header.login.mobile` translation key. */
  label?: string;
}

export interface HeaderLoginProps extends BreakpointSupport<HeaderLoginBreakpointProps> {
  /**
   * @deprecated Ignored. The layout is chosen with CSS.
   */
  defaultServerBreakpoint?: Breakpoint;
  /** Click handler fired when the login button is activated. */
  onClick?: () => void;
  /** URL to navigate to when the login button is clicked. */
  href?: string;
}

export const HeaderLogin = (props: HeaderLoginProps) => {
  const { onClick, href } = props;
  const { getLabel } = useLabels();

  const renderButton = ({ size, label }: HeaderButtonVariant) => {
    const isSmall = size === 'small';
    const resolvedLabel = label ?? (isSmall ? getLabel('header.login.mobile') : getLabel('header.login'));

    return (
      <>
        {isSmall ? (
          <HeaderMobileButton
            onClick={onClick}
            href={href}
            icon={{ name: 'login', size: 24, color: 'inherit' }}
            label={resolvedLabel}
          />
        ) : href ? (
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
        ) : (
          <Button onClick={onClick} visualType="primary" className={styles['tedi-header-login__button']}>
            <div className={styles['tedi-header-login__button--inner']}>
              <Text modifiers="normal" className={styles['tedi-header-login__button--text']}>
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

HeaderLogin.displayName = 'Header.Login';

export default HeaderLogin;
