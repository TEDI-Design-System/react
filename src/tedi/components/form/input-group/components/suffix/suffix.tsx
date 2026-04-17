import classNames from 'classnames';
import { ReactNode, useEffect } from 'react';

import { useInputGroup } from '../../input-group';
import styles from '../../input-group.module.scss';

export const Suffix = ({ children, className, ...props }: { children: ReactNode; className?: string }) => {
  const { registerSuffix, unregisterSuffix, disabled } = useInputGroup();

  useEffect(() => {
    registerSuffix();
    return () => unregisterSuffix();
  }, [registerSuffix, unregisterSuffix]);

  return (
    <div className={classNames(styles['tedi-input-group__suffix'], className)} aria-disabled={disabled} {...props}>
      {children}
    </div>
  );
};
