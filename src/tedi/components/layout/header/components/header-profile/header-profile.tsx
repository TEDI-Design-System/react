import cn from 'classnames';
import { useState } from 'react';

import {
  Breakpoint,
  BreakpointSupport,
  isBreakpointBelow,
  useBreakpoint,
  useBreakpointProps,
} from '../../../../../helpers';
import { useLabels } from '../../../../../providers/label-provider';
import { Icon } from '../../../../base/icon/icon';
import Button from '../../../../buttons/button/button';
import Popover from '../../../../overlays/popover/popover';
import HeaderMobileButton from '../header-mobile-button/header-mobile-button';
import styles from './header-profile.module.scss';

interface HeaderProfileBreakpointProps {
  /**
   * Defines the breakpoint from which the profile menu is displayed as a dropdown.
   * Below this breakpoint, it is rendered as a full-screen modal.
   *
   * @default lg
   */
  showDropdown?: Breakpoint;
  /** Custom label text for the profile button. Falls back to the `header.profile` translation key. */
  label?: string;
}

export interface HeaderProfileProps extends BreakpointSupport<HeaderProfileBreakpointProps> {
  /** Content rendered inside the profile dropdown or modal (e.g. navigation links, logout button). */
  children: React.ReactNode;
  /**
   * Whether to display a text label next to the profile icon on non-mobile viewports.
   * @default false
   */
  showLabel?: boolean;
}

export const HeaderProfile = (props: HeaderProfileProps) => {
  const { children, showLabel = false } = props;
  const { getLabel } = useLabels();
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const { showDropdown = 'lg', label } = getCurrentBreakpointProps<HeaderProfileBreakpointProps>(props);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const breakpoint = useBreakpoint();
  const isMobileView = isBreakpointBelow(breakpoint, 'md');
  const isTabletView = isBreakpointBelow(breakpoint, 'lg');

  const useDropdown = !isBreakpointBelow(breakpoint, showDropdown);

  const resolvedLabel = label ?? (isMobileView ? getLabel('header.profile.mobile') : getLabel('header.profile'));

  const button = isMobileView ? (
    <HeaderMobileButton
      icon={{ name: modalOpen ? 'close' : 'account_circle', size: 24, color: 'inherit' }}
      label={resolvedLabel}
      selected={modalOpen}
    />
  ) : showLabel ? (
    <Button visualType="secondary" iconLeft="account_circle">
      <div className={styles['tedi-header-profile__button']}>
        {resolvedLabel}
        <Icon
          name="expand_more"
          size={18}
          className={cn(styles['tedi-header-profile__icon'], {
            [styles['tedi-header-profile__icon--open']]: modalOpen || dropdownOpen,
          })}
        />
      </div>
    </Button>
  ) : (
    <Button icon={{ name: 'account_circle', size: 36 }} visualType="neutral" aria-label={resolvedLabel}>
      <></>
    </Button>
  );

  return (
    <>
      {useDropdown ? (
        <Popover
          placement="bottom-end"
          withBorder={true}
          open={dropdownOpen}
          onToggle={() => setDropdownOpen((prev) => !prev)}
        >
          <Popover.Trigger>{button}</Popover.Trigger>
          <Popover.Content>
            <div className={styles['tedi-header-profile__list']}>{children}</div>
          </Popover.Content>
        </Popover>
      ) : (
        <>
          <div onClick={() => setModalOpen(!modalOpen)}>{button}</div>

          {modalOpen && (
            <>
              <div className={styles['tedi-header-profile__overlay']} onClick={() => setModalOpen(false)} />
              <div className={styles['tedi-header-profile__modal']}>
                <div
                  className={cn(styles['tedi-header-profile__modal--content'], {
                    [styles['tedi-header-profile__modal--content-small']]: isTabletView,
                  })}
                >
                  {children}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default HeaderProfile;
