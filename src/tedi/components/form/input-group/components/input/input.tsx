import classNames from 'classnames';
import React, { ReactNode } from 'react';

import { UnknownType } from '../../../../../types/commonTypes';
import { useInputGroup } from '../../input-group';
import styles from '../../input-group.module.scss';

export const Input = ({ children }: { children: ReactNode }) => {
  const { disabled, inputId } = useInputGroup();

  if (!React.isValidElement(children)) return children;

  const extraProps: UnknownType = {
    disabled: disabled || children.props.disabled,
    id: children.props.id ?? inputId,
    className: classNames(children.props.className, styles['tedi-input-group__input']),
    wrapperClassName: classNames(children.props.wrapperClassName, styles['tedi-input-group__input']),
  };

  return React.cloneElement(children, extraProps);
};

Input.displayName = 'InputGroup.Input';
