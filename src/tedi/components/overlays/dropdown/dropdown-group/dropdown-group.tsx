import cn from 'classnames';
import { ReactNode, useId } from 'react';

import styles from '../dropdown.module.scss';

export type DropdownGroupProps = {
  /**
   * Title above the group's items, also used as the group's accessible name.
   */
  label: ReactNode;
  /**
   * The group's `Dropdown.Item`s.
   */
  children: ReactNode;
  /**
   * Additional class name(s) for the group.
   */
  className?: string;
};

export const DropdownGroup = ({ label, children, className }: DropdownGroupProps) => {
  const labelId = useId();

  return (
    <div role="group" aria-labelledby={labelId} className={cn(styles['tedi-dropdown__group'], className)}>
      <div id={labelId} className={styles['tedi-dropdown__group-title']}>
        {label}
      </div>
      {children}
    </div>
  );
};

DropdownGroup.displayName = 'DropdownGroup';
