import { fireEvent, render, screen } from '@testing-library/react';
import { forwardRef, useImperativeHandle } from 'react';

import { HashTrigger } from './hash-trigger';

import '@testing-library/jest-dom';

describe('HashTrigger Component', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders children with the provided id ', () => {
    render(
      <HashTrigger id="test-id">
        <p>Test content</p>
      </HashTrigger>
    );

    const element = screen.getByText('Test content');
    expect(element).toHaveAttribute('id', 'test-id');
  });

  it('calls onMatch when hash changes', () => {
    const onMatchMock = jest.fn();

    render(
      <HashTrigger id="test-id" onMatch={onMatchMock}>
        <p>Test content</p>
      </HashTrigger>
    );

    window.location.hash = '#test-id';
    fireEvent(window, new HashChangeEvent('hashchange'));
    expect(onMatchMock).toHaveBeenCalledWith('test-id');
  });

  const offscreenRect = {
    top: 1000,
    left: 0,
    bottom: 1200,
    right: 200,
    width: 200,
    height: 200,
    x: 0,
    y: 1000,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    toJSON: () => {},
  };

  it('scrolls to element when hash matches', () => {
    const scrollIntoViewMock = jest.fn();
    window.location.hash = '';
    render(
      <HashTrigger id="test-id">
        <div>Test Content</div>
      </HashTrigger>
    );
    const element = screen.getByText('Test Content');
    element.scrollIntoView = scrollIntoViewMock;
    jest.spyOn(element, 'getBoundingClientRect').mockReturnValue(offscreenRect);

    window.location.hash = '#test-id';
    fireEvent(window, new HashChangeEvent('hashchange'));
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' });
  });

  it('scrolls to an element inside a shadow root', () => {
    const scrollIntoViewMock = jest.fn();
    window.location.hash = '';
    const host = document.createElement('div');
    document.body.appendChild(host);
    const container = document.createElement('div');
    host.attachShadow({ mode: 'open' }).appendChild(container);

    render(
      <HashTrigger id="shadow-id">
        <div>Shadow Content</div>
      </HashTrigger>,
      { container }
    );
    const element = container.firstElementChild as HTMLElement;
    element.scrollIntoView = scrollIntoViewMock;
    jest.spyOn(element, 'getBoundingClientRect').mockReturnValue(offscreenRect);

    window.location.hash = '#shadow-id';
    fireEvent(window, new HashChangeEvent('hashchange'));
    expect(scrollIntoViewMock).toHaveBeenCalled();
    host.remove();
  });

  it('falls back to the document lookup when the child ref is not a DOM element', () => {
    const scrollIntoViewMock = jest.fn();
    window.location.hash = '';
    const Child = forwardRef<{ focus: () => void }, { id?: string }>(({ id }, ref) => {
      useImperativeHandle(ref, () => ({ focus: jest.fn() }));

      return <div id={id}>Imperative child</div>;
    });
    Child.displayName = 'Child';

    render(
      <HashTrigger id="imperative-id">
        <Child />
      </HashTrigger>
    );
    const element = screen.getByText('Imperative child');
    element.scrollIntoView = scrollIntoViewMock;
    jest.spyOn(element, 'getBoundingClientRect').mockReturnValue(offscreenRect);

    window.location.hash = '#imperative-id';
    fireEvent(window, new HashChangeEvent('hashchange'));
    expect(scrollIntoViewMock).toHaveBeenCalled();
  });
});
