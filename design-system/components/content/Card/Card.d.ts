import * as React from 'react';

/**
 * Card — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/content/card/card.stories.tsx).
 */
export interface CardProps {
  children?: React.ReactNode;
  /** Additional class. */
  className?: string;
  /** Controls card border radius. Accepts `false` to remove all radius or an object to control sides or individual corners. Side values affect two corners while corner values take precedence. Examples: `false` → no radius `{ top:false }` → removes top corners `{ left:false }` → removes left corners `{ topLeft:false }` → removes one corner `{ bottom:false, bottomRight:true }` → corner override */
  borderRadius?: false | { top?: boolean; right?: boolean; bottom?: boolean; left?: boolean; topLeft?: boolean; topRight?: boolean; bottomRight?: boolean; bottomLeft?: boolean; };
  /** Removes the card's border entirely. */
  borderless?: boolean;
  /** Adds a colored accent border to the top or left of the card (e.g. `top-success-primary`, `left-danger-primary`). */
  border?: unknown;
  /** Card content padding Values can be:<br /> - predefined number value in rems<br /> - object of separated horizontal and vertical number values in rems - object of separated top, right, bottom, left number values in rems */
  padding?: unknown;
  /** Background color. */
  background?: unknown;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<CardBreakpointProps>;
  md?: Partial<CardBreakpointProps>;
  lg?: Partial<CardBreakpointProps>;
  xl?: Partial<CardBreakpointProps>;
  xxl?: Partial<CardBreakpointProps>;
}

export declare const Card: React.ComponentType<CardProps> & {
  Content: React.ComponentType<any>;
  Header: React.ComponentType<any>;
  Notification: React.ComponentType<any>;
};
