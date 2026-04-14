import { render } from '@testing-library/react';

import { DropdownContent } from './dropdown-content';

const mockSetContent = jest.fn();

jest.mock('../dropdown-context', () => ({
  useDropdownContext: () => ({
    setContent: mockSetContent,
  }),
}));

describe('DropdownContent', () => {
  beforeEach(() => {
    mockSetContent.mockClear();
  });

  it('sets content on mount', () => {
    render(
      <DropdownContent>
        <div>Menu content</div>
      </DropdownContent>
    );

    expect(mockSetContent).toHaveBeenCalledWith(expect.objectContaining({ props: { children: 'Menu content' } }));
  });

  it('clears content on unmount', () => {
    const { unmount } = render(
      <DropdownContent>
        <div>Menu content</div>
      </DropdownContent>
    );

    unmount();
    expect(mockSetContent).toHaveBeenLastCalledWith(null);
  });
});
