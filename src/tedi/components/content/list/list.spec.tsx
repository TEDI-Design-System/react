import { render } from '@testing-library/react';

import { useBreakpointProps } from '../../../helpers';
import List, { ListProps } from './list';
import ListItem from './list-item';

import '@testing-library/jest-dom';

jest.mock('../../../helpers', () => ({
  useBreakpointProps: jest.fn(),
}));

describe('List Component', () => {
  beforeEach(() => {
    (useBreakpointProps as jest.Mock).mockReturnValue({
      getCurrentBreakpointProps: jest.fn((props) => props),
    });
  });

  const renderList = (props: Partial<ListProps> = {}) => {
    return render(
      <List {...props}>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
      </List>
    );
  };

  test('renders unordered list by default', () => {
    const { container } = renderList();
    expect(container.querySelector('ul')).toBeInTheDocument();
  });

  test('renders ordered list when element is "ol"', () => {
    const { container } = renderList({ element: 'ol' });
    expect(container.querySelector('ol')).toBeInTheDocument();
  });

  test('does not apply special styling class when style is "styled"', () => {
    const { container } = renderList({ style: 'styled' });
    expect(container.firstChild).not.toHaveClass('tedi-list--style-none');
  });

  test('applies "list--style-none" class when style is "none"', () => {
    const { container } = renderList({ style: 'none' });
    expect(container.firstChild).toHaveClass('tedi-list--style-none');
  });

  test('applies custom className', () => {
    const customClass = 'custom-list';
    const { container } = renderList({ className: customClass });
    expect(container.firstChild).toHaveClass(customClass);
  });

  test('applies default bullet color class "brand" when no color is provided', () => {
    const { container } = renderList();
    expect(container.firstChild).toHaveClass('tedi-list--bullet-color-brand');
  });

  test('forwards the "start" attribute and seeds the CSS counter so numbering begins at it', () => {
    const { container } = renderList({ element: 'ol', start: 5 });
    const ol = container.querySelector('ol');
    expect(ol).toHaveAttribute('start', '5');
    expect(ol).toHaveStyle({ counterReset: 'item 4' });
  });

  test('forwards native attributes (id, aria-label, reversed) to the list element', () => {
    const { container } = renderList({ element: 'ol', id: 'steps', 'aria-label': 'Steps', reversed: true });
    const ol = container.querySelector('ol');
    expect(ol).toHaveAttribute('id', 'steps');
    expect(ol).toHaveAttribute('aria-label', 'Steps');
    expect(ol).toHaveAttribute('reversed');
  });

  test('forwards the "value" attribute on a ListItem and seeds the counter to that number', () => {
    const { container } = render(
      <List element="ol">
        <ListItem value={10}>Item</ListItem>
      </List>
    );
    const li = container.querySelector('li');
    expect(li).toHaveAttribute('value', '10');
    // Set the counter (no new scope) and drop the increment so the number is exact.
    expect(li).toHaveStyle({ counterSet: 'item 10', counterIncrement: 'none' });
  });

  test.each([
    'primary',
    'secondary',
    'tertiary',
    'brand',
    'brand-dark',
    'success',
    'warning',
    'warning-dark',
    'danger',
    'white',
  ] as const)('applies bullet color class for color "%s"', (color) => {
    const { container } = renderList({ color });
    expect(container.firstChild).toHaveClass(`tedi-list--bullet-color-${color}`);
  });
});
