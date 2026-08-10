import * as React from 'react';

/**
 * HeadingWithIcon — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/content/heading-with-icon/heading-with-icon.stories.tsx).
 */
export interface HeadingWithIconProps {
  /** Heading text */
  children: React.ReactNode;
  /** Additional class */
  className?: string;
  /** Heading text color */
  headingColor?: "primary" | "secondary" | "neutral" | "danger" | "success" | "disabled" | "info" | "warning" | "tertiary" | "brand" | "white";
  /** Icon color */
  iconColor?: "primary" | "secondary" | "danger" | "success" | "warning" | "tertiary" | "brand" | "white" | "inherit" | "brand-dark" | "warning-dark";
  sm?: Partial<{ className?: string; element?: TextElement; modifiers?: TextModifiers[] | TextModifiers; color?: TextColor; }>;
  md?: Partial<{ className?: string; element?: TextElement; modifiers?: TextModifiers[] | TextModifiers; color?: TextColor; }>;
  lg?: Partial<{ className?: string; element?: TextElement; modifiers?: TextModifiers[] | TextModifiers; color?: TextColor; }>;
  xl?: Partial<{ className?: string; element?: TextElement; modifiers?: TextModifiers[] | TextModifiers; color?: TextColor; }>;
  xxl?: Partial<{ className?: string; element?: TextElement; modifiers?: TextModifiers[] | TextModifiers; color?: TextColor; }>;
  /** ID attribute */
  id?: string;
  /** Allows to focus the element */
  tabIndex?: number;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  /** Single or multiple modifiers to change the text behavior */
  modifiers?: "center" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "small" | "left" | "right" | "normal" | "extra-small" | "bold" | "thin" | "italic" | "nowrap" | (string & {}) /* +13 more */;
  /** Semantic heading tag h1-h6 are allowed values */
  element?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /** Size of the icon */
  size?: 18 | 24 | 8 | 12 | 16 | 36 | 48;
  /** Type of icon It is recommended to only use one type throughout your app */
  type?: "outlined" | "sharp" | "rounded";
  /** Icons label for screen-readers. If omitted then the icon is hidden for screen-readers. */
  label?: string;
  /** Name of material icon https://fonts.google.com/icons */
  name: string;
  background?: undefined;
  /** Type of display */
  display?: "inline" | "block";
  /** Render a filled variant of the icon */
  filled?: boolean;
}

// Referenced types, resolved one level deep (see the story source for the rest).
type TextColor = 'primary' | 'secondary' | 'tertiary' | 'white' | 'disabled' | 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

type TextElement = 'div' | 'p' | 'span' | 'li' | 'label' | HeadingModifiers;

type TextModifiers = HeadingModifiers | 'normal' | 'small' | 'extra-small' | 'bold' | 'thin' | 'italic' | 'center' | 'left' | 'right' | 'nowrap' | 'break-all' | 'break-word' | 'break-spaces' | 'uppercase' | 'lowercase' | 'capitalize' | 'capitalize-first' | 'inline-block' | 'inline' | 'line-normal' | 'line-condensed' | 'subtitle';

export declare const HeadingWithIcon: React.ComponentType<HeadingWithIconProps>;
