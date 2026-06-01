import { ReactNode } from 'react';
import { components as ReactSelectComponents, SingleValueProps } from 'react-select';

import { ISelectOption } from '../select';

export const SelectSingleValue = (props: SingleValueProps<ISelectOption, boolean>): JSX.Element => {
  const { renderValue } = props.selectProps as unknown as {
    renderValue?: (option: ISelectOption) => ReactNode;
  };

  if (renderValue) {
    return <ReactSelectComponents.SingleValue {...props}>{renderValue(props.data)}</ReactSelectComponents.SingleValue>;
  }

  return <ReactSelectComponents.SingleValue {...props}>{props.children}</ReactSelectComponents.SingleValue>;
};
