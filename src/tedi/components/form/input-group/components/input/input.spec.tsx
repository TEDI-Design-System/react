import { render } from '@testing-library/react';

import InputGroup from '../../input-group';

describe('InputGroup.Input', () => {
  it('returns the child unchanged when it is not a valid React element', () => {
    const { container } = render(
      <InputGroup id="test-group" label="Test Group">
        <InputGroup.Input>plain string</InputGroup.Input>
      </InputGroup>
    );

    expect(container).toHaveTextContent('plain string');
  });

  it('propagates the disabled flag from the InputGroup to its child', () => {
    const { getByLabelText } = render(
      <InputGroup disabled id="test-group" label="Test Group">
        <InputGroup.Input>
          <input aria-label="plain" />
        </InputGroup.Input>
      </InputGroup>
    );

    expect(getByLabelText('plain')).toBeDisabled();
  });

  it('keeps the child disabled prop when the group is not disabled', () => {
    const { getByLabelText } = render(
      <InputGroup id="test-group" label="Test Group">
        <InputGroup.Input>
          <input aria-label="plain" disabled />
        </InputGroup.Input>
      </InputGroup>
    );

    expect(getByLabelText('plain')).toBeDisabled();
  });

  it('uses the InputGroup inputId when the child has no id', () => {
    const { getByLabelText } = render(
      <InputGroup id="group-id" label="Test Group">
        <InputGroup.Input>
          <input aria-label="plain" />
        </InputGroup.Input>
      </InputGroup>
    );

    expect(getByLabelText('plain')).toHaveAttribute('id', 'group-id');
  });

  it('preserves an id already set on the child', () => {
    const { getByLabelText } = render(
      <InputGroup id="group-id" label="Test Group">
        <InputGroup.Input>
          <input aria-label="plain" id="explicit-id" />
        </InputGroup.Input>
      </InputGroup>
    );

    expect(getByLabelText('plain')).toHaveAttribute('id', 'explicit-id');
  });

  it('merges the input class onto the child className', () => {
    const { getByLabelText } = render(
      <InputGroup label="Test Group" id="test-group">
        <InputGroup.Input>
          <input aria-label="plain" className="user-class" />
        </InputGroup.Input>
      </InputGroup>
    );

    const input = getByLabelText('plain');
    expect(input).toHaveClass('user-class');
    expect(input).toHaveClass('tedi-input-group__input');
  });

  it('throws when rendered outside of an InputGroup', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);

    expect(() =>
      render(
        <InputGroup.Input>
          <input aria-label="plain" />
        </InputGroup.Input>
      )
    ).toThrow('InputGroupContext missing');

    spy.mockRestore();
  });
});
