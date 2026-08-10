import * as React from 'react';

/**
 * Icon — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/base/icon/icon.stories.tsx).
 */
export interface IconProps {
  /** Name of material icon https://fonts.google.com/icons */
  name: string;
  /** Additional classes to style the icon or its wrapper. - If `background` is provided, the `className` will be applied to the wrapper element. - If `background` is not provided, the `className` will be applied directly to the icon element. */
  className?: string;
  /** Type of icon It is recommended to only use one type throughout your app */
  type?: "outlined" | "sharp" | "rounded";
  /** Size of the icon */
  size?: 18 | 24 | 8 | 12 | 16 | 36 | 48;
  /** Render a filled variant of the icon */
  filled?: boolean;
  /** Which color Icon should be Use 'positive', 'important' or 'warning' with caution, usually they should not be in application UI */
  color?: "primary" | "secondary" | "danger" | "success" | "warning" | "tertiary" | "brand" | "white" | "inherit" | "brand-dark" | "warning-dark";
  /** Icons label for screen-readers. If omitted then the icon is hidden for screen-readers. */
  label?: string;
  /** Add round background */
  background?: "primary" | "secondary" | "brand-primary" | "brand-secondary";
  display?: "inline" | "block";
}

export declare const Icon: React.ComponentType<IconProps>;
