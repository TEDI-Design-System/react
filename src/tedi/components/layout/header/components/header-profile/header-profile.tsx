import cn from 'classnames';
import { useEffect, useId, useRef, useState } from 'react';

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
  /**
   * Whether the profile button is disabled. Prevents opening the dropdown or modal.
   * @default false
   */
  disabled?: boolean;
}

export const HeaderProfile = (props: HeaderProfileProps) => {
  const { children, showLabel = false, disabled = false } = props;
  const { getLabel } = useLabels();
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const { showDropdown = 'lg', label } = getCurrentBreakpointProps<HeaderProfileBreakpointProps>(props);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const modalId = useId();

  const breakpoint = useBreakpoint();
  const isMobileView = isBreakpointBelow(breakpoint, 'md');
  const isTabletView = isBreakpointBelow(breakpoint, 'lg');

  const useDropdown = !isBreakpointBelow(breakpoint, showDropdown);

  const resolvedLabel = label ?? (isMobileView ? getLabel('header.profile.mobile') : getLabel('header.profile'));

  useEffect(() => {
    if (!modalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

  const handleToggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  const isOpen = useDropdown ? dropdownOpen : modalOpen;

  const button = isMobileView ? (
    <HeaderMobileButton
      onClick={handleToggleModal}
      icon={{ name: isOpen ? 'close' : 'account_circle', size: 24, color: 'inherit' }}
      label={resolvedLabel}
      selected={isOpen}
      disabled={disabled}
    />
  ) : showLabel ? (
    <Button
      visualType="secondary"
      iconLeft="account_circle"
      onClick={handleToggleModal}
      ref={triggerRef}
      disabled={disabled}
    >
      <div className={styles['tedi-header-profile__button']}>
        {resolvedLabel}
        <Icon
          name="expand_more"
          size={18}
          className={cn(styles['tedi-header-profile__icon'], {
            [styles['tedi-header-profile__icon--open']]: isOpen,
          })}
        />
      </div>
    </Button>
  ) : (
    <Button
      icon={{ name: 'account_circle', size: 36 }}
      visualType="neutral"
      aria-label={resolvedLabel}
      onClick={handleToggleModal}
      ref={triggerRef}
      disabled={disabled}
    >
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
          {button}

          {modalOpen && (
            <>
              <div
                className={styles['tedi-header-profile__overlay']}
                onClick={() => setModalOpen(false)}
                aria-hidden="true"
              />
              <div
                className={styles['tedi-header-profile__modal']}
                role="dialog"
                aria-modal="true"
                aria-label={resolvedLabel}
                id={modalId}
              >
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

HeaderProfile.displayName = 'Header.Profile';

export default HeaderProfile;
