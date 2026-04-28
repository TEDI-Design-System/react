import classNames from 'classnames';
import { ReactNode, useEffect } from 'react';

import { useInputGroup } from '../../input-group';
import styles from '../../input-group.module.scss';

export interface SuffixProps {
  /**
   * Content rendered inside the suffix slot. Typically a short text label,
   * an `Icon`, a `Button`, or any other inline element. When `children` is a
   * plain string or number, the suffix automatically applies the
   * `--no-inner-div` modifier so the wrapper itself receives the correct
   * padding instead of relying on a child element.
   */
  children: ReactNode;
  /**
   * Additional class name appended to the wrapper `div`. Useful for one-off
   * tweaks; the default `tedi-input-group__suffix` BEM class is always
   * applied.
   */
  className?: string;
}

export const Suffix = ({ children, className, ...props }: SuffixProps) => {
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
