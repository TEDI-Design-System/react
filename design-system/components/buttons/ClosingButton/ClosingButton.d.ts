import * as React from 'react';

/**
 * ClosingButton — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/buttons/closing-button/closing-button.stories.tsx).
 */
export interface ClosingButtonProps {
  /** Additional classes to apply custom styles to the ClosingButton. */
  className?: string;
  /** Size of the ClosingButton */
  size?: "default" | "small";
  /** Event handler for the button click event. Triggered when the user clicks on the close button. */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  title?: string;
  color?: "primary" | "brand" | "white";
  iconSize?: 18 | 24;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export declare const ClosingButton: React.ComponentType<ClosingButtonProps>;
