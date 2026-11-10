import styled from '@emotion/styled';
import { render, screen } from '@testing-library/react';

import { StyleProvider, usePortalRoot } from './style-provider';

import '@testing-library/jest-dom';

const Consumer = () => {
  const root = usePortalRoot();

  const label = root === undefined ? 'default' : root === null ? 'pending' : root.id;

  return <div data-testid="root">{label}</div>;
};

describe('StyleProvider', () => {
  it('renders children', () => {
    render(
      <StyleProvider>
        <span>content</span>
      </StyleProvider>
    );

    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('gives no portal root without a container element', () => {
    render(
      <StyleProvider>
        <Consumer />
      </StyleProvider>
    );

    expect(screen.getByTestId('root')).toHaveTextContent('default');
  });

  it('gives no portal root outside a provider', () => {
    render(<Consumer />);

    expect(screen.getByTestId('root')).toHaveTextContent('default');
  });

  it('keeps a pending (null) container element so portals wait for it', () => {
    render(
      <StyleProvider containerElement={null}>
        <Consumer />
      </StyleProvider>
    );

    expect(screen.getByTestId('root')).toHaveTextContent('pending');
  });

  it('gives the container element as the portal root', () => {
    const host = document.createElement('div');
    host.id = 'shadow-root-element';

    render(
      <StyleProvider containerElement={host}>
        <Consumer />
      </StyleProvider>
    );

    expect(screen.getByTestId('root')).toHaveTextContent('shadow-root-element');
  });

  it('injects Emotion styles into the container element instead of document.head', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const Box = styled.div({ color: 'red' });

    render(
      <StyleProvider containerElement={container} cacheKey="scoped-test">
        <Box>styled</Box>
      </StyleProvider>
    );

    expect(container.querySelector('style[data-emotion^="scoped-test"]')).toBeInTheDocument();
    expect(document.head.querySelector('style[data-emotion^="scoped-test"]')).not.toBeInTheDocument();
    container.remove();
  });
});
