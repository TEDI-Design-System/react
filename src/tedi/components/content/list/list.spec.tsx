import { render, screen } from '@testing-library/react';

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
    renderList({ element: 'ol', start: 5 });
    const ol = screen.getByRole('list');
    expect(ol).toHaveAttribute('start', '5');
    expect(ol).toHaveStyle({ counterReset: 'item 4' });
  });

  test('forwards native attributes (id, aria-label, reversed) to the list element', () => {
    renderList({ element: 'ol', id: 'steps', 'aria-label': 'Steps', reversed: true });
    const ol = screen.getByRole('list', { name: 'Steps' });
    expect(ol).toHaveAttribute('id', 'steps');
    expect(ol).toHaveAttribute('reversed');
  });

  test('counts a reversed ordered list down, seeding from the item count', () => {
    renderList({ element: 'ol', reversed: true });
    const ol = screen.getByRole('list');
    expect(ol).toHaveClass('tedi-list--reversed');
    expect(ol).toHaveStyle({ counterReset: 'item 4' });
  });

  test('reversed ordered list honours an explicit start', () => {
    renderList({ element: 'ol', reversed: true, start: 5 });
    expect(screen.getByRole('list')).toHaveStyle({ counterReset: 'item 6' });
  });

  test('seeds the counter through the verticalSpacing wrapper', () => {
    const { container } = renderList({ element: 'ol', start: 5, verticalSpacing: { size: 1 } });
    expect(container.querySelector('ol')).toHaveStyle({ counterReset: 'item 4' });
  });

  test('applies the value counter override through the verticalSpacingItem wrapper', () => {
    render(
      <List element="ol">
        <ListItem verticalSpacingItem={{ size: 1 }} value={10}>
          Item
        </ListItem>
      </List>
    );
    expect(screen.getByRole('listitem')).toHaveStyle({ counterSet: 'item 10', counterIncrement: 'none' });
  });

  test('forwards the "value" attribute on a ListItem and seeds the counter to that number', () => {
    render(
      <List element="ol">
        <ListItem value={10}>Item</ListItem>
      </List>
    );
    const li = screen.getByRole('listitem');
    expect(li).toHaveAttribute('value', '10');
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
