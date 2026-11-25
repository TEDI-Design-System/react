import React from 'react';

import type { CardContentProps } from './card-content/card-content';

type CardContext = Pick<CardContentProps, 'padding' | 'backgroundColor'>;

export const CardContext = React.createContext<CardContext>({});
