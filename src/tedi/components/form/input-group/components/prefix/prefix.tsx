import classNames from 'classnames';
import { ReactNode, useEffect } from 'react';

import { useInputGroup } from '../../input-group';
import styles from '../../input-group.module.scss';

export interface PrefixProps {
  /**
   * Content rendered inside the prefix slot. Typically a short text label,
   * an `Icon`, a `Button`, or any other inline element. When `children` is a
   * plain string or number, the prefix automatically applies the
   * `--no-inner-div` modifier so the wrapper itself receives the correct
   * padding instead of relying on a child element.
   */
  children: ReactNode;
  /**
   * Additional class name appended to the wrapper `div`. Useful for one-off
   * tweaks; the default `tedi-input-group__prefix` BEM class is always
   * applied.
   */
  className?: string;
}

export const Prefix = ({ children, className, ...props }: PrefixProps) => {
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
