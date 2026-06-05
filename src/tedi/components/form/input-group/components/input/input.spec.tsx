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

  it('sets aria-invalid on an intrinsic child when the group is invalid', () => {
    const { getByLabelText } = render(
      <InputGroup invalid id="test-group" label="Test Group">
        <InputGroup.Input>
          <input aria-label="plain" />
        </InputGroup.Input>
      </InputGroup>
    );

    expect(getByLabelText('plain')).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not set aria-invalid on an intrinsic child when the group is valid', () => {
    const { getByLabelText } = render(
      <InputGroup id="test-group" label="Test Group">
        <InputGroup.Input>
          <input aria-label="plain" />
        </InputGroup.Input>
      </InputGroup>
    );

    expect(getByLabelText('plain')).not.toHaveAttribute('aria-invalid');
  });

  it('keeps the child aria-invalid when the group is valid', () => {
    const { getByLabelText } = render(
      <InputGroup id="test-group" label="Test Group">
        <InputGroup.Input>
          <input aria-label="plain" aria-invalid />
        </InputGroup.Input>
      </InputGroup>
    );

    expect(getByLabelText('plain')).toHaveAttribute('aria-invalid', 'true');
  });

  it('propagates invalid and wrapperClassName to a non-intrinsic child', () => {
    const Probe = ({ invalid, wrapperClassName }: { invalid?: boolean; wrapperClassName?: string }) => (
      <div data-testid="probe" data-invalid={String(!!invalid)} className={wrapperClassName} />
    );

    const { getByTestId } = render(
      <InputGroup invalid id="test-group" label="Test Group">
        <InputGroup.Input>
          <Probe />
        </InputGroup.Input>
      </InputGroup>
    );

    const probe = getByTestId('probe');
    expect(probe).toHaveAttribute('data-invalid', 'true');
    expect(probe).toHaveClass('tedi-input-group__input');
  });

  it('keeps a non-intrinsic child invalid and merges its wrapperClassName when the group is valid', () => {
    const Probe = ({ invalid, wrapperClassName }: { invalid?: boolean; wrapperClassName?: string }) => (
      <div data-testid="probe" data-invalid={String(!!invalid)} className={wrapperClassName} />
    );

    const { getByTestId } = render(
      <InputGroup id="test-group" label="Test Group">
        <InputGroup.Input>
          <Probe invalid wrapperClassName="own-wrapper" />
        </InputGroup.Input>
      </InputGroup>
    );

    const probe = getByTestId('probe');
    expect(probe).toHaveAttribute('data-invalid', 'true');
    expect(probe).toHaveClass('own-wrapper');
    expect(probe).toHaveClass('tedi-input-group__input');
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
