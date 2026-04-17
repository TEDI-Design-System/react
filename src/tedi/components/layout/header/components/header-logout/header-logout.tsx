import { Text } from '../../../../../../tedi/components/base/typography/text/text';
import { BreakpointSupport, isBreakpointBelow, useBreakpoint, useBreakpointProps } from '../../../../../helpers';
import { useLabels } from '../../../../../providers/label-provider';
import { Icon } from '../../../../base/icon/icon';
import Link from '../../../../navigation/link/link';
import HeaderMobileButton from '../header-mobile-button/header-mobile-button';
import styles from './header-logout.module.scss';

interface HeaderLogoutBreakpointProps {
  size?: 'default' | 'small';
}

interface HeaderLogoutProps extends BreakpointSupport<HeaderLogoutBreakpointProps> {
  onClick?: () => void;
  href?: string;
}

const HeaderLogout = (props: HeaderLogoutProps) => {
  const { getLabel } = useLabels();
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const { size: sizeProp } = getCurrentBreakpointProps<HeaderLogoutBreakpointProps>(props);

  const breakpoint = useBreakpoint();
  const isMobileView = isBreakpointBelow(breakpoint, 'md');

  const size = sizeProp ?? (isMobileView ? 'small' : 'default');
  const isSmall = size === 'small';

  const { onClick, href } = props;

  return (
    <>
      {isSmall ? (
        <HeaderMobileButton
          onClick={onClick}
          href={href}
          icon={{ name: 'logout', size: 24, color: 'inherit' }}
          text={getLabel('header.logout-small')}
        />
      ) : (
        <Link onClick={onClick} href={href} underline={false}>
          <div className={styles['tedi-header-logout']}>
            <Icon name="logout" size={18} color="inherit" />
            <Text modifiers="normal" className={styles['tedi-header-logout__text']}>
              {getLabel('header.logout')}
            </Text>
          </div>
        </Link>
      )}
    </>
  );
};

export default HeaderLogout;
