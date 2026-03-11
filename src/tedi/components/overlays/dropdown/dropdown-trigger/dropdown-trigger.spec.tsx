import { fireEvent, render } from '@testing-library/react';

import { DropdownTrigger } from './dropdown-trigger';

const mockSetReference = jest.fn();
const mockGetReferenceProps = jest.fn((props) => props);

jest.mock('../dropdown-context', () => ({
  useDropdownContext: () => ({
    refs: {
      setReference: mockSetReference,
    },
    getReferenceProps: mockGetReferenceProps,
  }),
}));

describe('DropdownTrigger', () => {
  beforeEach(() => {
    mockSetReference.mockClear();
    mockGetReferenceProps.mockClear();
  });

  it('clones child and applies reference props', () => {
    const { getByText } = render(
      <DropdownTrigger>
        <button>Open</button>
      </DropdownTrigger>
    );

    fireEvent.click(getByText('Open'));
    expect(mockGetReferenceProps).toHaveBeenCalled();
  });

  it('passes ref to setReference', () => {
    render(
      <DropdownTrigger>
        <button>Open</button>
      </DropdownTrigger>
    );

    const refCall = mockGetReferenceProps.mock.calls[0][0];
    expect(refCall.ref).toBe(mockSetReference);
  });
});
