import { render, screen } from '@testing-library/react';
import React from 'react';

import { warnDeprecated, withDeprecationWarning } from './warn-deprecated';

describe('warnDeprecated', () => {
  const originalEnv = process.env.NODE_ENV;
  let warn: jest.SpyInstance;

  beforeEach(() => {
    warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    warn.mockRestore();
    process.env.NODE_ENV = originalEnv;
  });

  it('warns with the component name and message', () => {
    warnDeprecated('A', 'Use B instead.');
    expect(warn).toHaveBeenCalledWith('[TEDI] A is deprecated. Use B instead.');
  });

  it('warns only once per component', () => {
    warnDeprecated('B', 'Use C instead.');
    warnDeprecated('B', 'Use C instead.');
    expect(warn).toHaveBeenCalledTimes(1);
  });

  it('does not warn in production', () => {
    process.env.NODE_ENV = 'production';
    warnDeprecated('C', 'Use D instead.');
    expect(warn).not.toHaveBeenCalled();
  });

  describe('withDeprecationWarning', () => {
    const Base = React.forwardRef<HTMLButtonElement, { children: React.ReactNode }>((props, ref) => (
      <button ref={ref}>{props.children}</button>
    ));
    Base.displayName = 'Base';

    it('warns only when the wrapped component renders', () => {
      const Wrapped = withDeprecationWarning(Base, 'Wrapped', 'Use Other instead.');
      render(<Base>internal</Base>);
      expect(warn).not.toHaveBeenCalled();

      render(<Wrapped>public</Wrapped>);
      expect(warn).toHaveBeenCalledWith('[TEDI] Wrapped is deprecated. Use Other instead.');
    });

    it('forwards the ref and keeps the display name', () => {
      const Wrapped = withDeprecationWarning(Base, 'WrappedRef', 'Use Other instead.');
      const ref = React.createRef<HTMLButtonElement>();
      render(<Wrapped ref={ref}>Save</Wrapped>);
      expect(ref.current).toBe(screen.getByRole('button', { name: 'Save' }));
      expect((Wrapped as { displayName?: string }).displayName).toBe('Base');
    });
  });
});
