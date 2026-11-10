import cn from 'classnames';
import { KeyboardEvent, ReactNode } from 'react';

import styles from '../dropdown.module.scss';
import { useDropdownContext } from '../dropdown-context';

export type DropdownHeaderProps = {
  /**
   * Content above the items, such as a search field, placed inside `Dropdown.Content`; its first
   * control gets focus when the dropdown opens.
   */
  children: ReactNode;
  /**
   * Additional class name(s) for the header.
   */
  className?: string;
};

/** Header controls that use the arrow keys themselves, e.g. to open their own list or move the caret. */
export const OWN_ARROW_KEYS =
  '[role="combobox"], select, textarea, [aria-expanded="true"], input[type="number"], [role="spinbutton"]';

export const DropdownHeader = ({ children, className }: DropdownHeaderProps) => {
  const { headerRef } = useDropdownContext();

  // Keep those keys from reaching the menu's list navigation once the control has handled them.
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const isArrow = event.key === 'ArrowDown' || event.key === 'ArrowUp';
    if (isArrow && (event.target as HTMLElement).closest(OWN_ARROW_KEYS)) event.stopPropagation();
  };

  return (
    <div ref={headerRef} className={cn(styles['tedi-dropdown__header'], className)} onKeyDown={handleKeyDown}>
      {children}
    </div>
  );
};

DropdownHeader.displayName = 'DropdownHeader';
