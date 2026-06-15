import classNames from 'classnames';
import React, { ReactNode } from 'react';

import { UnknownType } from '../../../../../types/commonTypes';
import { useInputGroup } from '../../input-group';
import styles from '../../input-group.module.scss';

export interface InputProps {
  /**
   * The form control rendered inside the input slot — must be a single React
   * element (e.g. `TextField`, `Select`, native `<input>`). The element is
   * cloned with extra props from the surrounding `InputGroup`:
   * - `disabled` is OR-ed with the group's disabled state
   * - `id` falls back to the group's `inputId` so an external `Label` can
   *   target it via `htmlFor`
   * - `className` (or `wrapperClassName` for non-intrinsic components) is
   *   merged with `tedi-input-group__input` to align borders/radii with
   *   adjacent prefix/suffix slots
   *
   * Non-element children (text, fragments, `null`) are returned as-is and
   * receive none of these props.
   */
  children: ReactNode;
}

export const Input = ({ children }: InputProps) => {
  const { disabled, invalid, inputId } = useInputGroup();

  if (!React.isValidElement(children)) return children;

  const isIntrinsicChild = typeof children.type === 'string';

  const extraProps: UnknownType = {
    disabled: disabled || children.props.disabled,
    id: children.props.id ?? inputId,
    className: classNames(children.props.className, styles['tedi-input-group__input']),
    ...(isIntrinsicChild
      ? { 'aria-invalid': invalid || children.props['aria-invalid'] || undefined }
      : {
          invalid: invalid || children.props.invalid,
          wrapperClassName: classNames(children.props.wrapperClassName, styles['tedi-input-group__input']),
        }),
  };

  return React.cloneElement(children, extraProps);
};
