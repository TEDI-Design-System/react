import classNames from 'classnames';
import { ReactNode, useEffect } from 'react';

import { useInputGroup } from '../../input-group';
import styles from '../../input-group.module.scss';

export const Prefix = ({ children, className, ...props }: { children: ReactNode; className?: string }) => {
  const { registerPrefix, unregisterPrefix, disabled } = useInputGroup();

  useEffect(() => {
    registerPrefix();
    return () => unregisterPrefix();
  }, [registerPrefix, unregisterPrefix]);

  return (
    <div className={classNames(styles['tedi-input-group__prefix'], className)} aria-disabled={disabled} {...props}>
      {children}
    </div>
  );
};
