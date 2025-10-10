import React from 'react';

import '../../styles/index.scss';

export interface StyleProviderProps {
  children: React.ReactNode;
}

export const StyleProvider = (props: StyleProviderProps): JSX.Element => {
  const { children } = props;
  return <>{children}</>;
};
