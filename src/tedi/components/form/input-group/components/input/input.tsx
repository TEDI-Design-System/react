import classNames from 'classnames';
import React, { ReactNode } from 'react';

import { UnknownType } from '../../../../../types/commonTypes';
import { useInputGroup } from '../../input-group';
import styles from '../../input-group.module.scss';

export const Input = ({ children }: { children: ReactNode }) => {
  const { disabled } = useInputGroup();

  if (!React.isValidElement(children)) return children;

  const extraProps: UnknownType = {
    disabled: disabled ?? children.props.disabled,
    className: classNames(children.props.className, styles['tedi-input-group__input']),
    wrapperClassName: classNames(children.props.wrapperClassName, styles['tedi-input-group__input']),
  };

  return React.cloneElement(children, extraProps);
};
