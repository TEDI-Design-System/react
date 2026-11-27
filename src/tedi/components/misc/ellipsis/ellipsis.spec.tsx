import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';

import * as helpers from '../../../helpers';
import Ellipsis, { EllipsisProps } from './ellipsis';

import '@testing-library/jest-dom';

jest.mock('../../../helpers', () => ({
  ...jest.requireActual('../../../helpers'),
  useIsTouchDevice: jest.fn(),
}));

describe('Ellipsis Component', () => {
  beforeEach(() => {
    (helpers.useIsTouchDevice as jest.Mock).mockReturnValue(false);
  });

  const renderEllipsis = (props: Partial<EllipsisProps> = {}) => {
    return render(
      <Ellipsis {...props}>
        <p>Ellipsis content</p>
      </Ellipsis>
    );
  };

  it('renders the component', () => {
    const { getByText } = renderEllipsis();
    expect(getByText('Ellipsis content')).toBeInTheDocument();
  });

  it('applies default lineClamp value (2)', () => {
    const { container } = renderEllipsis();
    const ellipsisElement = container.querySelector('[data-name="ellipsis"]');
    expect(ellipsisElement).toHaveStyle({ 'line-clamp': '2' });
  });

  it('applies custom lineClamp value', () => {
    const { container } = renderEllipsis({ lineClamp: 3 });
    const ellipsisElement = container.querySelector('[data-name="ellipsis"]');
    expect(ellipsisElement).toHaveStyle({ 'line-clamp': '3' });
  });

  it('renders the trigger when content overflows', () => {
    const { container } = renderEllipsis({ popover: true });
    const popoverTrigger = container.querySelector('[data-name="ellipsis"]');
    expect(popoverTrigger).toBeInTheDocument();
  });

  it('does not render a tooltip when popover is false', () => {
    const { container } = renderEllipsis({ popover: false });
    expect(container.querySelector('Popover')).not.toBeInTheDocument();
  });

  it('applies additional props', () => {
    const { container } = renderEllipsis({ className: 'custom-class' });
    const ellipsisElement = container.querySelector('[data-name="ellipsis"]');
    expect(ellipsisElement).toBeInTheDocument();
    expect(ellipsisElement).toHaveClass('custom-class');
  });

  it('updates state when content overflows', () => {
    jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(100);
    jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(50);

    render(
      <Ellipsis>
        <p>Ellipsis content</p>
      </Ellipsis>
    );

    const trigger = screen.getByText('Ellipsis content').closest('[data-name="ellipsis"]');
    expect(trigger).toHaveAttribute('tabindex', '0');
    expect(trigger).not.toHaveAttribute('role', 'button');
  });

  it('shows the full content in a tooltip when the text is truncated', async () => {
    jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(100);
    jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(50);

    render(
      <Ellipsis>
        <p>Ellipsis content</p>
      </Ellipsis>
    );

    fireEvent.mouseEnter(screen.getByText('Ellipsis content').closest('[data-name="ellipsis"]') as HTMLElement);

    expect(await screen.findByRole('tooltip')).toHaveTextContent('Ellipsis content');
  });

  it('does not show tooltip when content fits within container', () => {
    jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(50);
    jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(50);

    render(
      <Ellipsis>
        <p>Ellipsis content</p>
      </Ellipsis>
    );

    expect(screen.getByText('Ellipsis content')).toBeInTheDocument();
    const element = screen.getByText('Ellipsis content').closest('[data-name="ellipsis"]');
    expect(element).not.toHaveAttribute('tabindex');
  });

  it('does not apply a lineClamp style for the start position', () => {
    const { container } = renderEllipsis({ position: 'start' });
    const ellipsisElement = container.querySelector('[data-name="ellipsis"]');
    expect(ellipsisElement).not.toHaveStyle({ 'line-clamp': '2' });
  });

  it('detects horizontal overflow (scrollWidth) for the start position', () => {
    jest.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockReturnValue(200);
    jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(100);

    act(() => {
      renderEllipsis({ position: 'start' });
    });

    expect(screen.getByText('Ellipsis content')).toBeInTheDocument();
  });
});
