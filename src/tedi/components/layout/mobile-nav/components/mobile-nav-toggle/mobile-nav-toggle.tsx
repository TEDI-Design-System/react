import cn from 'classnames';
import React from 'react';

import { useLabels } from '../../../../../../tedi/providers/label-provider';
import { UnknownType } from '../../../../../types/commonTypes';
import { Icon } from '../../../../base/icon/icon';
import Button from '../../../../buttons/button/button';
import FloatingButton from '../../../../buttons/floating-button/floating-button';
import styles from './mobile-nav-toggle.module.scss';

export type MobileNavToggleVariant = 'mobile' | 'collapse';

export type MobileNavToggleProps = {
  /**
   * Is the menu open (for mobile) or expanded (for collapse)
   */
  menuOpen: boolean;
  /**
   * Toggle open/collapse state
   */
  toggleMenu: (open: boolean) => void;
  /**
   * Optional ref to attach to button (for floating UI etc.)
   */
  referenceRef?: React.Ref<UnknownType>;
  /**
   * Optional props passed from floating UI
   */
  getReferenceProps?: () => UnknownType;
  /**
   * Variant of toggle (mobile overlay or collapse control)
   */
  variant?: MobileNavToggleVariant;
  /**
   * Show the open/close label visibly below the icon (mobile variant only).
   * The label text comes from the `header.toggle` i18n key by default — pass
   * `label` to override it. When `false` (default), the button renders
   * icon-only and the label is still exposed as accessible text.
   * @default false
   */
  showLabel?: boolean;
  /**
   * Override the toggle's label text. Accepts a static `ReactNode` (used for
   * both states) or a function that returns a `ReactNode` for the current
   * `menuOpen` state (e.g. `(open) => open ? 'Sulge' : 'Menüü'`). When
   * omitted, the label falls back to the `header.toggle` i18n value.
   */
  label?: React.ReactNode | ((menuOpen: boolean) => React.ReactNode);
  /**
   * Add custom class to override styles
   */
  className?: string;
};

export const MobileNavToggle = ({
  menuOpen,
  toggleMenu,
  referenceRef,
  getReferenceProps = () => ({}),
  variant = 'mobile',
  showLabel = false,
  label,
  className,
}: MobileNavToggleProps) => {
  const { getLabel } = useLabels();

  const toggleLabel =
    label !== undefined ? (typeof label === 'function' ? label(menuOpen) : label) : getLabel('header.toggle', menuOpen);
  const iconName =
    variant === 'collapse' ? (menuOpen ? 'right_panel_open' : 'left_panel_open') : menuOpen ? 'close' : 'menu';
  const useLabelledLayout = showLabel && variant === 'mobile';

  const BEM = cn(
    styles['tedi-mobile-nav-toggle'],
    {
      [styles['tedi-mobile-nav-toggle--open']]: menuOpen,
      [styles[`tedi-mobile-nav-toggle--${variant}`]]: true,
      [styles['tedi-mobile-nav-toggle--with-label']]: useLabelledLayout,
    },
    className
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu(!menuOpen);
    }
  };

  if (useLabelledLayout) {
    return (
      <button
        {...getReferenceProps()}
        ref={referenceRef as React.Ref<HTMLButtonElement>}
        type="button"
        aria-expanded={menuOpen}
        className={BEM}
        onClick={() => toggleMenu(!menuOpen)}
        onKeyDown={handleKeyDown}
      >
        <Icon name={iconName} size={24} className={styles['tedi-mobile-nav-toggle__icon']} color="inherit" />
        <span className={styles['tedi-mobile-nav-toggle__label']}>{toggleLabel}</span>
      </button>
    );
  }

  const Element = variant === 'collapse' ? FloatingButton : Button;

  return (
    <Element
      {...getReferenceProps()}
      ref={referenceRef}
      icon={{
        name: iconName,
        className: styles['tedi-mobile-nav-toggle__icon'],
        size: variant === 'collapse' ? 18 : 24,
      }}
      visualType={variant === 'collapse' ? 'secondary' : 'primary'}
      className={BEM}
      onClick={() => toggleMenu(!menuOpen)}
      onKeyDown={handleKeyDown}
      position={variant === 'collapse' ? 'absolute' : 'static'}
      size={variant === 'collapse' ? 'small' : ''}
    >
      {toggleLabel}
    </Element>
  );
};

/** @deprecated Use `MobileNavToggle` — same component, vendor-neutral name. */
export const SidenavToggle = MobileNavToggle;
/** @deprecated Use `MobileNavToggleProps`. */
export type SidenavToggleProps = MobileNavToggleProps;
/** @deprecated Use `MobileNavToggleVariant`. */
export type SidenavToggleVariant = MobileNavToggleVariant;

export default MobileNavToggle;
