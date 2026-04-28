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

  const isText = typeof children === 'string' || typeof children === 'number';

  return (
    <div
      {...props}
      className={classNames(
        styles['tedi-input-group__prefix'],
        { [styles['tedi-input-group__prefix--no-inner-div']]: isText },
        className
      )}
      aria-disabled={disabled}
    >
      {children}
    </div>
  );
};

Prefix.displayName = 'InputGroup.Prefix';
