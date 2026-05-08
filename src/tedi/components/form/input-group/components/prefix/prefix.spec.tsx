import { render } from '@testing-library/react';

import InputGroup from '../../input-group';

const getRoot = (container: HTMLElement) => container.querySelector('[data-name="tedi-input-group"]') as HTMLDivElement;

describe('InputGroup.Prefix', () => {
  it('renders its children with the prefix class', () => {
    const { container, getByText } = render(
      <InputGroup id="test-group" label="Test Group">
        <InputGroup.Prefix>Prefix content</InputGroup.Prefix>
        <InputGroup.Input>
          <input aria-label="plain" />
        </InputGroup.Input>
      </InputGroup>
    );

    expect(getByText('Prefix content')).toBeInTheDocument();
    const prefix = container.querySelector('.tedi-input-group__prefix');
    expect(prefix).toBeInTheDocument();
    expect(prefix).toHaveTextContent('Prefix content');
  });

  it('merges a custom className onto the prefix wrapper', () => {
    const { container } = render(
      <InputGroup id="test-group" label="Test Group">
        <InputGroup.Prefix className="custom-prefix">prefix</InputGroup.Prefix>
        <InputGroup.Input>
          <input aria-label="plain" />
        </InputGroup.Input>
      </InputGroup>
    );

    const prefix = container.querySelector('.tedi-input-group__prefix');
    expect(prefix).toHaveClass('custom-prefix');
  });

  it('inherits the disabled flag from the InputGroup context via aria-disabled', () => {
    const { container } = render(
      <InputGroup disabled id="test-group" label="Test Group">
        <InputGroup.Prefix>prefix</InputGroup.Prefix>
        <InputGroup.Input>
          <input aria-label="plain" />
        </InputGroup.Input>
      </InputGroup>
    );

    const prefix = container.querySelector('.tedi-input-group__prefix');
    expect(prefix).toHaveAttribute('aria-disabled', 'true');
  });

  it('unregisters from the InputGroup when it is removed', () => {
    const { container, rerender } = render(
      <InputGroup id="test-group" label="Test Group">
        <InputGroup.Prefix>prefix</InputGroup.Prefix>
        <InputGroup.Input>
          <input aria-label="plain" />
        </InputGroup.Input>
      </InputGroup>
    );

    expect(getRoot(container)).toHaveClass('tedi-input-group--has-prefix');

    rerender(
      <InputGroup id="test-group" label="Test Group">
        <InputGroup.Input>
          <input aria-label="plain" />
        </InputGroup.Input>
      </InputGroup>
    );

    expect(getRoot(container)).not.toHaveClass('tedi-input-group--has-prefix');
  });

  it('throws when rendered outside of an InputGroup', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);

    expect(() => render(<InputGroup.Prefix>prefix</InputGroup.Prefix>)).toThrow('InputGroupContext missing');

    spy.mockRestore();
  });
});
