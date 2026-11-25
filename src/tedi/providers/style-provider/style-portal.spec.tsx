import { render, screen } from '@testing-library/react';

import { StylePortal } from './style-portal';
import { StyleProvider } from './style-provider';

import '@testing-library/jest-dom';

describe('StylePortal', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  it('renders into document.body without a container element', () => {
    render(
      <StyleProvider>
        <StylePortal>
          <span>portal content</span>
        </StylePortal>
      </StyleProvider>
    );

    expect(container).not.toContainElement(screen.getByText('portal content'));
    expect(document.body).toContainElement(screen.getByText('portal content'));
  });

  it('renders into the container element', () => {
    render(
      <StyleProvider containerElement={container}>
        <StylePortal>
          <span>portal content</span>
        </StylePortal>
      </StyleProvider>
    );

    expect(container).toContainElement(screen.getByText('portal content'));
  });

  it('renders nothing while the container element is pending, then into it', () => {
    const { rerender } = render(
      <StyleProvider containerElement={null}>
        <StylePortal>
          <span>portal content</span>
        </StylePortal>
      </StyleProvider>
    );

    expect(screen.queryByText('portal content')).not.toBeInTheDocument();

    rerender(
      <StyleProvider containerElement={container}>
        <StylePortal>
          <span>portal content</span>
        </StylePortal>
      </StyleProvider>
    );

    expect(container).toContainElement(screen.getByText('portal content'));
  });

  it('keeps a nested portal inside its parent portal', () => {
    render(
      <StyleProvider containerElement={container}>
        <StylePortal>
          <div data-testid="outer">
            <StylePortal>
              <span>nested content</span>
            </StylePortal>
          </div>
        </StylePortal>
      </StyleProvider>
    );

    const outerPortalNode = screen.getByTestId('outer').closest('[data-floating-ui-portal]');

    expect(outerPortalNode).toContainElement(screen.getByText('nested content'));
  });

  it('moves the content to the new container when the container element changes', () => {
    const otherContainer = document.createElement('div');
    document.body.appendChild(otherContainer);
    const content = (target: HTMLElement | null) => (
      <StyleProvider containerElement={target}>
        <StylePortal>
          <span>portal content</span>
        </StylePortal>
      </StyleProvider>
    );

    const { rerender } = render(content(container));
    expect(container).toContainElement(screen.getByText('portal content'));

    rerender(content(otherContainer));
    expect(otherContainer).toContainElement(screen.getByText('portal content'));
    expect(container).not.toContainElement(screen.getByText('portal content'));

    otherContainer.remove();
  });

  it('removes the content when the container element becomes pending again', () => {
    const content = (target: HTMLElement | null) => (
      <StyleProvider containerElement={target}>
        <StylePortal>
          <span>portal content</span>
        </StylePortal>
      </StyleProvider>
    );

    const { rerender } = render(content(container));
    expect(screen.getByText('portal content')).toBeInTheDocument();

    rerender(content(null));
    expect(screen.queryByText('portal content')).not.toBeInTheDocument();
  });
});
