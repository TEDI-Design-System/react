import React from 'react';

const warned = new Set<string>();

/**
 * Logs a deprecation warning once per component, outside production builds only.
 * @internal
 */
export const warnDeprecated = (name: string, message: string): void => {
  if (process.env.NODE_ENV === 'production' || warned.has(name)) return;
  warned.add(name);
  console.warn(`[TEDI] ${name} is deprecated. ${message}`);
};

/**
 * Wraps a deprecated component so only the public export warns. Library code that renders the
 * component imports the unwrapped one, so consumers are not warned about components they never used.
 * @internal
 */
export const withDeprecationWarning = <T extends React.ElementType>(Component: T, name: string, message: string): T => {
  const Wrapped = React.forwardRef<unknown, Record<string, unknown>>((props, ref) => {
    warnDeprecated(name, message);
    return React.createElement(Component, ref ? { ...props, ref } : props);
  });
  const { displayName, name: fnName } = Component as { displayName?: string; name?: string };
  Wrapped.displayName = displayName ?? fnName;
  return Wrapped as unknown as T;
};
