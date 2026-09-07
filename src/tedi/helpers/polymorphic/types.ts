/**
 * Type helpers for building polymorphic components (the `as` prop pattern).
 *
 * These are part of the public API (re-exported from the package root via
 * `helpers`) so consumers can build custom or extended components that match
 * TEDI's polymorphic typing without deep relative imports. Treat them as a
 * stable, advanced/extension API. See issue #200.
 */
import React from 'react';

/**
 * Types for polymorphic components
 */
export type AllowedHTMLTags<C extends React.ElementType, V> = C extends V ? C : never;
type AsProp<C extends React.ElementType> = {
  /**
   * Render as custom component
   */
  as?: C;
};
type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);
// This is the type for the "ref" only
export type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

export type PolymorphicComponentPropWithoutRef<C extends React.ElementType, Props = unknown> = Props &
  AsProp<C> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = unknown
> = PolymorphicComponentPropWithoutRef<C, Props> & {
  ref?: PolymorphicRef<C>;
};
