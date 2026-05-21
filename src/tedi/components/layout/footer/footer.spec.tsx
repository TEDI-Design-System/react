import { fireEvent, render, screen } from '@testing-library/react';

import { Footer } from './footer';

jest.mock('../../../providers/label-provider', () => ({
  useLabels: jest.fn(() => ({
    getLabel: jest.fn((key: string) => `Mocked: ${key}`),
  })),
}));

// `<Collapse>` (used inside Footer.Section's mobile branch) calls `usePrint()`,
// which throws when there's no PrintingProvider. Bypass both the provider
// requirement and the print state so tests can render Footer in isolation.
jest.mock('../../../providers/printing-provider/printing-provider', () => ({
  PrintingProvider: ({ children }: { children: React.ReactNode }) => children,
  usePrint: jest.fn(() => false),
}));

describe('Footer', () => {
  it('renders body sections and bottom slot when provided', () => {
    render(
      <Footer>
        <Footer.Body>
          <Footer.Section heading="Heading">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
          </Footer.Section>
        </Footer.Body>
        <Footer.Bottom>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
        </Footer.Bottom>
      </Footer>
    );

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText('Heading')).toBeInTheDocument();
    expect(screen.getByText('Link 1')).toBeInTheDocument();
    expect(screen.getByText('Terms')).toBeInTheDocument();
    expect(screen.getByText('Privacy')).toBeInTheDocument();
  });

  it('places start sides before the body and end sides after', () => {
    const { container } = render(
      <Footer>
        {/* Source order intentionally reversed — Footer should re-order by placement prop. */}
        <Footer.Side placement="end">
          <span>END</span>
        </Footer.Side>
        <Footer.Body>
          <Footer.Section heading="Body">
            <a href="#">Link</a>
          </Footer.Section>
        </Footer.Body>
        <Footer.Side placement="start">
          <span>START</span>
        </Footer.Side>
      </Footer>
    );

    const row = container.querySelector('.tedi-footer__container') as HTMLElement;
    const texts = Array.from(row.children).map((el) => el.textContent);
    expect(texts.indexOf('START')).toBeLessThan(texts.findIndex((t) => t?.includes('Link')));
    expect(texts.indexOf('END')).toBeGreaterThan(texts.findIndex((t) => t?.includes('Link')));
  });

  it('collapsible section renders a toggle button at xs and toggles aria-expanded on click', () => {
    // jsdom defaults to xs (no matchMedia matches), so `isMobile` is true and the
    // collapsible branch engages — exactly the responsive case the prop covers.
    render(
      <Footer>
        <Footer.Body>
          <Footer.Section heading="Heading" collapsible>
            <a href="#">Link</a>
          </Footer.Section>
        </Footer.Body>
      </Footer>
    );

    const toggle = screen.getByRole('button', { name: /heading/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });

  it('non-collapsible section uses a heading element, not a button', () => {
    render(
      <Footer>
        <Footer.Body>
          <Footer.Section heading="Static heading">
            <a href="#">Link</a>
          </Footer.Section>
        </Footer.Body>
      </Footer>
    );

    expect(screen.queryByRole('button', { name: /static heading/i })).not.toBeInTheDocument();
    expect(screen.getByText('Static heading').tagName.toLowerCase()).toBe('strong');
  });

  it('Footer.Bottom renders its children verbatim with no injected separators', () => {
    const { container } = render(
      <Footer>
        <Footer.Bottom>
          <a href="#">A</a>
          <a href="#">B</a>
          <a href="#">C</a>
        </Footer.Bottom>
      </Footer>
    );

    const bottom = container.querySelector('.tedi-footer-bottom') as HTMLElement;
    // Only the three link children — no separator spans, no svg dots.
    expect(bottom.children).toHaveLength(3);
    Array.from(bottom.children).forEach((el) => expect(el.tagName.toLowerCase()).toBe('a'));
  });
});
