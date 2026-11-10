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
});
