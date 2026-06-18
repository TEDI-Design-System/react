import { render } from '@testing-library/react';

import InputGroup from '../../input-group';

const getRoot = (container: HTMLElement) => container.querySelector('[data-name="tedi-input-group"]') as HTMLDivElement;

describe('InputGroup.Suffix', () => {
  it('renders its children with the suffix class', () => {
    const { container, getByText } = render(
      <InputGroup id="test-group" label="Test Group">
        <InputGroup.Input>
          <input aria-label="plain" />
        </InputGroup.Input>
        <InputGroup.Suffix>Suffix content</InputGroup.Suffix>
      </InputGroup>
    );

    expect(getByText('Suffix content')).toBeInTheDocument();
    const suffix = container.querySelector('.tedi-input-group__suffix');
    expect(suffix).toBeInTheDocument();
    expect(suffix).toHaveTextContent('Suffix content');
  });

  it('merges a custom className onto the suffix wrapper', () => {
    const { container } = render(
      <InputGroup id="test-group" label="Test Group">
        <InputGroup.Input>
          <input aria-label="plain" />
        </InputGroup.Input>
        <InputGroup.Suffix className="custom-suffix">suffix</InputGroup.Suffix>
      </InputGroup>
    );

    const suffix = container.querySelector('.tedi-input-group__suffix');
    expect(suffix).toHaveClass('custom-suffix');
  });

  it('inherits the disabled flag from the InputGroup context via aria-disabled', () => {
    const { container } = render(
      <InputGroup disabled id="test-group" label="Test Group">
        <InputGroup.Input>
          <input aria-label="plain" />
        </InputGroup.Input>
        <InputGroup.Suffix>suffix</InputGroup.Suffix>
      </InputGroup>
    );

    const suffix = container.querySelector('.tedi-input-group__suffix');
    expect(suffix).toHaveAttribute('aria-disabled', 'true');
  });

  it('propagates the disabled state to an interactive child element', () => {
    const { getByRole } = render(
      <InputGroup disabled id="test-group" label="Test Group">
        <InputGroup.Input>
          <input aria-label="plain" />
        </InputGroup.Input>
        <InputGroup.Suffix>
          <button type="button">Apply</button>
        </InputGroup.Suffix>
      </InputGroup>
    );

    expect(getByRole('button', { name: 'Apply' })).toBeDisabled();
  });

  it('leaves an interactive child enabled when the group is not disabled', () => {
    const { getByRole } = render(
      <InputGroup id="test-group" label="Test Group">
        <InputGroup.Input>
          <input aria-label="plain" />
        </InputGroup.Input>
        <InputGroup.Suffix>
          <button type="button">Apply</button>
        </InputGroup.Suffix>
      </InputGroup>
    );

    expect(getByRole('button', { name: 'Apply' })).toBeEnabled();
  });

  it('unregisters from the InputGroup when it is removed', () => {
    const { container, rerender } = render(
      <InputGroup id="test-group" label="Test Group">
        <InputGroup.Input>
          <input aria-label="plain" />
        </InputGroup.Input>
        <InputGroup.Suffix>suffix</InputGroup.Suffix>
      </InputGroup>
    );

    expect(getRoot(container)).toHaveClass('tedi-input-group--has-suffix');

    rerender(
      <InputGroup id="test-group" label="Test Group">
        <InputGroup.Input>
          <input aria-label="plain" />
        </InputGroup.Input>
      </InputGroup>
    );

    expect(getRoot(container)).not.toHaveClass('tedi-input-group--has-suffix');
  });

  it('throws when rendered outside of an InputGroup', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);

    expect(() => render(<InputGroup.Suffix>suffix</InputGroup.Suffix>)).toThrow('InputGroupContext missing');

    spy.mockRestore();
  });
});
