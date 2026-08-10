import * as React from 'react';

/**
 * CardButton — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/buttons/card-button/card-button.stories.tsx).
 */
export interface CardButtonProps<C extends React.ElementType = 'button'> {
  /** A single `<Card>` to render as the interactive surface. The host element provides the interaction semantics and applies the hover / active / focus / disabled states to the card and its blocks. Keep it to one card and avoid nested interactive elements. */
  children?: React.ReactNode;
  /** Additional class name on the host element. */
  className?: string;
  /** Render as custom component */
  as?: C;
  ref?: PolymorphicRef<C>;
}

// Referenced types, resolved one level deep (see the story source for the rest).
type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

export declare const CardButton: React.ComponentType<CardButtonProps>;
