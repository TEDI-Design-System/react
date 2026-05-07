import { render, renderHook } from '@testing-library/react';
import React from 'react';

import InputGroup, { InputGroupForwardRef, useInputGroup, useOptionalInputGroup } from './input-group';

import '@testing-library/jest-dom';

const getRoot = (container: HTMLElement) => container.querySelector('[data-name="tedi-input-group"]') as HTMLDivElement;

describe('InputGroup component', () => {
  it('renders a root element with the base class', () => {
    const { container } = render(
      <InputGroup id="test-group" label="Test Group">
        <InputGroup.Input>
          <input aria-label="plain" />
        </InputGroup.Input>
      </InputGroup>
    );

    const root = getRoot(container);
    expect(root).toBeInTheDocument();
    expect(root).toHaveClass('tedi-input-group');
    expect(root).toHaveClass('tedi-input-group--addons');
  });

  it('omits the addons modifier when addons is false', () => {
    const { container } = render(
      <InputGroup addons={false} id="test-group" label="Test Group">
        <InputGroup.Input>
          <input aria-label="plain" />
        </InputGroup.Input>
      </InputGroup>
    );

    expect(getRoot(container)).not.toHaveClass('tedi-input-group--addons');
  });

  it('merges an external className onto the root element', () => {
    const { container } = render(
      <InputGroup className="custom-class" id="test-group" label="Test Group">
        <InputGroup.Input>
          <input aria-label="plain" />
        </InputGroup.Input>
      </InputGroup>
    );

    expect(getRoot(container)).toHaveClass('custom-class');
  });

  it('applies the disabled modifier and aria-disabled when disabled', () => {
    const { container } = render(
      <InputGroup disabled id="test-group" label="Test Group">
        <InputGroup.Input>
          <input aria-label="plain" />
        </InputGroup.Input>
      </InputGroup>
    );

    const root = getRoot(container);
    expect(root).toHaveClass('tedi-input-group--disabled');
    expect(root).toHaveAttribute('aria-disabled', 'true');
  });

  it('adds has-prefix and has-suffix modifiers when slots are present', () => {
    const { container } = render(
      <InputGroup id="test-group" label="Test Group">
        <InputGroup.Prefix>prefix</InputGroup.Prefix>
        <InputGroup.Input>
          <input aria-label="plain" />
        </InputGroup.Input>
        <InputGroup.Suffix>suffix</InputGroup.Suffix>
      </InputGroup>
    );

    const root = getRoot(container);
    expect(root).toHaveClass('tedi-input-group--has-prefix');
    expect(root).toHaveClass('tedi-input-group--has-suffix');
  });

  it('renders a FormLabel that references the provided id when label is set', () => {
    const { container } = render(
      <InputGroup label="Address" id="address-input">
        <InputGroup.Input>
          <input aria-label="address" />
        </InputGroup.Input>
      </InputGroup>
    );

    const label = container.querySelector('label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('Address');
    expect(label).toHaveAttribute('for', 'address-input');
  });

  it('renders a single helper as one FeedbackText', () => {
    const { container, getByText } = render(
      <InputGroup id="test-group" label="Test Group" helper={{ text: 'Helpful hint', type: 'hint' }}>
        <InputGroup.Input>
          <input aria-label="plain" />
        </InputGroup.Input>
      </InputGroup>
    );

    expect(getByText('Helpful hint')).toBeInTheDocument();
    const items = container.querySelectorAll('[data-name="feedback-text"]');
    expect(items).toHaveLength(1);
    expect(items[0]).toHaveAttribute('id', 'group-helper');
  });

  it('renders multiple helpers when an array is provided', () => {
    const { container, getByText } = render(
      <InputGroup
        id="test-group"
        label="Test Group"
        helper={[
          { text: 'Hint text', type: 'hint' },
          { text: 'Error text', type: 'error' },
        ]}
      >
        <InputGroup.Input>
          <input aria-label="plain" />
        </InputGroup.Input>
      </InputGroup>
    );

    expect(getByText('Hint text')).toBeInTheDocument();
    expect(getByText('Error text')).toBeInTheDocument();
    const items = container.querySelectorAll('[data-name="feedback-text"]');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveAttribute('id', 'group-helper-0');
    expect(items[1]).toHaveAttribute('id', 'group-helper-1');
  });

  it('renders no feedback wrapper when helper is omitted', () => {
    const { container } = render(
      <InputGroup id="test-group" label="Test Group">
        <InputGroup.Input>
          <input aria-label="plain" />
        </InputGroup.Input>
      </InputGroup>
    );

    expect(container.querySelector('[data-name="feedback-text"]')).not.toBeInTheDocument();
  });

  it('renders no feedback wrapper when helper is an empty array', () => {
    const { container } = render(
      <InputGroup id="test-group" label="Test Group" helper={[]}>
        <InputGroup.Input>
          <input aria-label="plain" />
        </InputGroup.Input>
      </InputGroup>
    );

    expect(container.querySelector('[data-name="feedback-text"]')).not.toBeInTheDocument();
  });

  it('exposes the root element through its forwarded ref', () => {
    const ref = React.createRef<InputGroupForwardRef>();

    const { container } = render(
      <InputGroup ref={ref} id="test-group" label="Test Group">
        <InputGroup.Input>
          <input aria-label="plain" />
        </InputGroup.Input>
      </InputGroup>
    );

    expect(ref.current?.root).toBe(getRoot(container));
  });

  it('has the expected displayName', () => {
    expect(InputGroup.displayName).toBe('InputGroup');
  });
});

describe('useInputGroup / useOptionalInputGroup', () => {
  it('useInputGroup throws when used outside of a provider', () => {
    expect(() => renderHook(() => useInputGroup())).toThrow('InputGroupContext missing');
  });

  it('useOptionalInputGroup returns null when used outside of a provider', () => {
    const { result } = renderHook(() => useOptionalInputGroup());
    expect(result.current).toBeNull();
  });

  it('useOptionalInputGroup returns the provider value when nested inside an InputGroup', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <InputGroup id="wrapped" label="Wrapped">
        {children}
      </InputGroup>
    );

    const { result } = renderHook(() => useOptionalInputGroup(), { wrapper });

    expect(result.current).not.toBeNull();
    expect(result.current?.inputId).toBe('wrapped');
    expect(result.current?.hasExternalLabel).toBe(true);
    expect(typeof result.current?.registerPrefix).toBe('function');
    expect(typeof result.current?.registerSuffix).toBe('function');
    expect(typeof result.current?.unregisterPrefix).toBe('function');
    expect(typeof result.current?.unregisterSuffix).toBe('function');
  });
});
