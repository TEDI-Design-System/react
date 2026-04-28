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

  const isText = typeof children === 'string' || typeof children === 'number';

  return (
    <div
      {...props}
      className={classNames(
        styles['tedi-input-group__suffix'],
        { [styles['tedi-input-group__suffix--no-inner-div']]: isText },
        className
      )}
      aria-disabled={disabled}
    >
      {children}
    </div>
  );
};

Suffix.displayName = 'InputGroup.Suffix';
