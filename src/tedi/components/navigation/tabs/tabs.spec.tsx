import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Tabs, TabsProps } from './tabs';

jest.mock('../../../providers/label-provider', () => ({
  useLabels: jest.fn(() => ({
    getLabel: jest.fn((key: string) => {
      const labels: Record<string, string> = { 'tabs.more': 'More', close: 'Close' };
      return labels[key] ?? key;
    }),
  })),
}));

let resizeCallback: (() => void) | null = null;

beforeAll(() => {
  global.ResizeObserver = jest.fn().mockImplementation((cb: ResizeObserverCallback) => ({
    observe: jest.fn(() => {
      resizeCallback = () => cb([], {} as ResizeObserver);
    }),
    unobserve: jest.fn(),
    disconnect: jest.fn(() => {
      resizeCallback = null;
    }),
  }));
});

const renderTabs = (props?: Partial<TabsProps>) => {
  return render(
    <Tabs defaultValue="tab-1" {...props}>
      <Tabs.List aria-label="Test tabs">
        <Tabs.Trigger id="tab-1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger id="tab-2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger id="tab-3" disabled>
          Tab 3
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content id="tab-1">Content 1</Tabs.Content>
      <Tabs.Content id="tab-2">Content 2</Tabs.Content>
      <Tabs.Content id="tab-3">Content 3</Tabs.Content>
    </Tabs>
  );
};

const simulateOverflow = () => {
  const listEl = screen.getByRole('tablist');
  Object.defineProperty(listEl, 'scrollWidth', { value: 500, configurable: true });
  Object.defineProperty(listEl, 'clientWidth', { value: 300, configurable: true });

  const wrapper = listEl.parentElement!;
  Object.defineProperty(wrapper, 'clientWidth', { value: 300, configurable: true });

  act(() => {
    resizeCallback?.();
  });
};

const simulateNoOverflow = () => {
  const listEl = screen.getByRole('tablist');
  Object.defineProperty(listEl, 'scrollWidth', { value: 300, configurable: true });
  Object.defineProperty(listEl, 'clientWidth', { value: 600, configurable: true });

  const wrapper = listEl.parentElement!;
  Object.defineProperty(wrapper, 'clientWidth', { value: 600, configurable: true });

  act(() => {
    resizeCallback?.();
  });
};

describe('Tabs component', () => {
  it('renders the tablist with correct role', () => {
    renderTabs();
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders tab triggers with correct roles', () => {
    renderTabs();
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
  });

  it('renders the default active tab content', () => {
    renderTabs();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });

  it('switches tab on click', () => {
    renderTabs();
    fireEvent.click(screen.getByText('Tab 2'));
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('sets aria-selected correctly', () => {
    renderTabs();
    expect(screen.getByText('Tab 1')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Tab 2')).toHaveAttribute('aria-selected', 'false');

    fireEvent.click(screen.getByText('Tab 2'));
    expect(screen.getByText('Tab 1')).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByText('Tab 2')).toHaveAttribute('aria-selected', 'true');
  });

  it('sets aria-controls on triggers and aria-labelledby on panels', () => {
    renderTabs();
    expect(screen.getByText('Tab 1')).toHaveAttribute('aria-controls', 'tab-1-panel');
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-1');
  });

  it('manages tabIndex — only selected tab is in tab order', () => {
    renderTabs();
    expect(screen.getByText('Tab 1')).toHaveAttribute('tabIndex', '0');
    expect(screen.getByText('Tab 2')).toHaveAttribute('tabIndex', '-1');
  });

  it('navigates with ArrowRight key', () => {
    renderTabs();
    const tab1 = screen.getByText('Tab 1');
    fireEvent.keyDown(tab1, { key: 'ArrowRight' });
    expect(screen.getByText('Tab 2')).toHaveFocus();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('navigates with ArrowLeft key and wraps around', () => {
    renderTabs();
    const tab1 = screen.getByText('Tab 1');
    fireEvent.keyDown(tab1, { key: 'ArrowLeft' });
    expect(screen.getByText('Tab 2')).toHaveFocus();
  });

  it('navigates with Home and End keys', () => {
    renderTabs();
    fireEvent.click(screen.getByText('Tab 2'));
    const tab2 = screen.getByText('Tab 2');

    fireEvent.keyDown(tab2, { key: 'Home' });
    expect(screen.getByText('Tab 1')).toHaveFocus();

    fireEvent.keyDown(screen.getByText('Tab 1'), { key: 'End' });
    expect(screen.getByText('Tab 2')).toHaveFocus();
  });

  it('does not activate disabled tabs on click', () => {
    renderTabs();
    const disabledTab = screen.getByText('Tab 3');
    expect(disabledTab).toBeDisabled();
    fireEvent.click(disabledTab);
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
  });

  it('works in controlled mode', () => {
    const onChange = jest.fn();
    const { rerender } = render(
      <Tabs value="tab-1" onChange={onChange}>
        <Tabs.List aria-label="Test tabs">
          <Tabs.Trigger id="tab-1">Tab 1</Tabs.Trigger>
          <Tabs.Trigger id="tab-2">Tab 2</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content id="tab-1">Content 1</Tabs.Content>
        <Tabs.Content id="tab-2">Content 2</Tabs.Content>
      </Tabs>
    );

    fireEvent.click(screen.getByText('Tab 2'));
    expect(onChange).toHaveBeenCalledWith('tab-2');
    expect(screen.getByText('Content 1')).toBeInTheDocument();

    rerender(
      <Tabs value="tab-2" onChange={onChange}>
        <Tabs.List aria-label="Test tabs">
          <Tabs.Trigger id="tab-1">Tab 1</Tabs.Trigger>
          <Tabs.Trigger id="tab-2">Tab 2</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content id="tab-1">Content 1</Tabs.Content>
        <Tabs.Content id="tab-2">Content 2</Tabs.Content>
      </Tabs>
    );

    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    renderTabs({ className: 'custom-class' });
    const container = screen.getByRole('tablist').closest('[data-name="tabs"]');
    expect(container).toHaveClass('custom-class');
  });

  it('renders tabpanel with correct id', () => {
    renderTabs();
    expect(screen.getByRole('tabpanel')).toHaveAttribute('id', 'tab-1-panel');
  });

  it('applies data-name attributes', () => {
    renderTabs();
    expect(screen.getByRole('tablist')).toHaveAttribute('data-name', 'tabs-list');
    expect(screen.getByRole('tabpanel')).toHaveAttribute('data-name', 'tabs-content');
  });

  it('does not set tabIndex on tabpanel', () => {
    renderTabs();
    expect(screen.getByRole('tabpanel')).not.toHaveAttribute('tabIndex');
  });

  it('does not render "More" button when tabs do not overflow', () => {
    renderTabs();
    expect(screen.queryByText('More')).not.toBeInTheDocument();
  });
});

describe('Tabs overflow (more mode)', () => {
  it('renders "More" button when tabs overflow', () => {
    renderTabs();
    simulateOverflow();
    expect(screen.getByText('More')).toBeInTheDocument();
  });

  it('does not render "More" button when there is only one tab', () => {
    render(
      <Tabs defaultValue="tab-1">
        <Tabs.List aria-label="Single tab">
          <Tabs.Trigger id="tab-1">Only Tab</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content id="tab-1">Content</Tabs.Content>
      </Tabs>
    );

    const listEl = screen.getByRole('tablist');
    Object.defineProperty(listEl, 'scrollWidth', { value: 500, configurable: true });
    Object.defineProperty(listEl, 'clientWidth', { value: 300, configurable: true });
    const wrapper = listEl.parentElement!;
    Object.defineProperty(wrapper, 'clientWidth', { value: 300, configurable: true });
    act(() => {
      resizeCallback?.();
    });

    expect(screen.queryByText('More')).not.toBeInTheDocument();
  });

  it('opens dropdown with non-selected tabs', () => {
    renderTabs();
    simulateOverflow();
    fireEvent.click(screen.getByText('More'));

    const menu = screen.getByRole('menu');
    const menuItems = menu.querySelectorAll('[role="menuitem"]');
    expect(menuItems).toHaveLength(2);
  });

  it('closes dropdown on toggle', () => {
    renderTabs();
    simulateOverflow();
    const moreBtn = screen.getByText('More');

    fireEvent.click(moreBtn);
    expect(screen.getByRole('menu')).toBeInTheDocument();

    fireEvent.click(moreBtn);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('selects a tab from dropdown and closes it', () => {
    renderTabs();
    simulateOverflow();
    fireEvent.click(screen.getByText('More'));

    const menuItems = screen.getAllByRole('menuitem');
    const tab2Item = menuItems.find((item) => item.textContent === 'Tab 2');
    fireEvent.click(tab2Item!);

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('closes dropdown on Escape key', () => {
    renderTabs();
    simulateOverflow();
    fireEvent.click(screen.getByText('More'));
    expect(screen.getByRole('menu')).toBeInTheDocument();

    act(() => {
      fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });
    });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('removes overflow when container grows', () => {
    renderTabs();
    simulateOverflow();
    expect(screen.getByText('More')).toBeInTheDocument();

    simulateNoOverflow();
    expect(screen.queryByText('More')).not.toBeInTheDocument();
  });
});

describe('Tabs overflow (scroll mode)', () => {
  it('renders with scroll mode', () => {
    render(
      <Tabs defaultValue="tab-1">
        <Tabs.List aria-label="Scroll tabs" overflowMode="scroll">
          <Tabs.Trigger id="tab-1">Tab 1</Tabs.Trigger>
          <Tabs.Trigger id="tab-2">Tab 2</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content id="tab-1">Content 1</Tabs.Content>
        <Tabs.Content id="tab-2">Content 2</Tabs.Content>
      </Tabs>
    );

    const tablist = screen.getByRole('tablist');
    expect(tablist).toBeInTheDocument();
    expect(screen.queryByText('More')).not.toBeInTheDocument();
  });
});

describe('TabsContent without id', () => {
  it('always renders when id is omitted', () => {
    render(
      <Tabs defaultValue="tab-1">
        <Tabs.List aria-label="Router tabs">
          <Tabs.Trigger id="tab-1">Tab 1</Tabs.Trigger>
          <Tabs.Trigger id="tab-2">Tab 2</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content>Always visible</Tabs.Content>
      </Tabs>
    );

    expect(screen.getByText('Always visible')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Tab 2'));
    expect(screen.getByText('Always visible')).toBeInTheDocument();
  });

  it('does not set id or aria-labelledby when id is omitted', () => {
    render(
      <Tabs defaultValue="tab-1">
        <Tabs.List aria-label="Router tabs">
          <Tabs.Trigger id="tab-1">Tab 1</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content>Router outlet</Tabs.Content>
      </Tabs>
    );

    const panel = screen.getByRole('tabpanel');
    expect(panel).not.toHaveAttribute('id');
    expect(panel).not.toHaveAttribute('aria-labelledby');
  });
});
