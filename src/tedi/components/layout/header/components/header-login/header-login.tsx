import { Text } from '../../../../../../tedi/components/base/typography/text/text';
import { BreakpointSupport, isBreakpointBelow, useBreakpoint, useBreakpointProps } from '../../../../../helpers';
import { useLabels } from '../../../../../providers/label-provider';
import Link from '../../../../navigation/link/link';
import HeaderMobileButton from '../header-mobile-button/header-mobile-button';
import styles from './header-login.module.scss';

interface HeaderLoginBreakpointProps {
  size?: 'default' | 'small';
}

interface HeaderLoginProps extends BreakpointSupport<HeaderLoginBreakpointProps> {
  onClick?: () => void;
  href?: string;
}

const HeaderLogin = (props: HeaderLoginProps) => {
  const { onClick, href } = props;
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const { size: sizeProp } = getCurrentBreakpointProps<HeaderLoginBreakpointProps>(props);
  const { getLabel } = useLabels();

  const breakpoint = useBreakpoint();
  const isMobileView = isBreakpointBelow(breakpoint, 'md');

  const size = sizeProp ?? (isMobileView ? 'small' : 'default');
  const isSmall = size === 'small';

  return (
    <>
      {isSmall ? (
        <HeaderMobileButton
          onClick={onClick}
          href={href}
          icon={{ name: 'login', size: 24, color: 'inherit' }}
          text={getLabel('header.login-small')}
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
              {getLabel('header.login')}
            </Text>
          </div>
        </Link>
      )}
    </>
  );
};

export default HeaderLogin;
