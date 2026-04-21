import cn from 'classnames';

import { Text } from '../../../../../../tedi/components/base/typography/text/text';
import { Icon, IconWithoutBackgroundProps } from '../../../../base/icon/icon';
import { Button } from '../../../../buttons/button/button';
import Link from '../../../../navigation/link/link';
import styles from './header-mobile-button.module.scss';

interface HeaderMobileButtonProps {
  /** Click handler for the button. */
  onClick?: () => void;
  /** If provided, the button renders as a link navigating to this URL. */
  href?: string;
  /**
   * Icon displayed inside the button.
   * Can be a material icon name (e.g. 'menu') or a full IconWithoutBackgroundProps object for more control.
   */
  icon: string | IconWithoutBackgroundProps;
  /** Label text displayed below the icon. */
  label?: string;
  /** Whether the button is in a selected state. */
  selected?: boolean;
  /** Whether the button is disabled. */
  disabled?: boolean;
}

const HeaderMobileButton = (props: HeaderMobileButtonProps) => {
  const { onClick, href, icon, label, selected, disabled } = props;

  const getIcon = (icon: string | IconWithoutBackgroundProps) => {
    const iconProps: IconWithoutBackgroundProps =
      typeof icon === 'string' ? { name: icon } : { ...icon, className: cn(icon?.className) };

    return <Icon {...iconProps} />;
  };

  const innerContent = (
    <div className={styles['tedi-header-mobile-button__inner']}>
      {getIcon(icon)}
      <Text modifiers="extra-small" className={styles['tedi-header-mobile-button__text']}>
        {label}
      </Text>
    </div>
  );

  const className = cn(styles['tedi-header-mobile-button'], {
    [styles['tedi-header-mobile-button--selected']]: selected,
    [styles['tedi-header-mobile-button--disabled']]: disabled,
  });

  if (disabled || !href) {
    return (
      <Button onClick={onClick} disabled={disabled} className={className} noStyle>
        {innerContent}
      </Button>
    );
  }

  return (
    <Link onClick={onClick} href={href} noStyle underline={false} className={className}>
      {innerContent}
    </Link>
  );
};

export default HeaderMobileButton;
