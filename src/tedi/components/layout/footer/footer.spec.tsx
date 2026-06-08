import { fireEvent, render, screen } from '@testing-library/react';

import { Footer } from './footer';

jest.mock('../../../providers/label-provider', () => ({
  useLabels: jest.fn(() => ({
    getLabel: jest.fn((key: string) => `Mocked: ${key}`),
  })),
}));

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

    const inner = container.querySelector('.tedi-footer-bottom__inner') as HTMLElement;
    expect(inner.children).toHaveLength(3);
    Array.from(inner.children).forEach((el) => expect(el.tagName.toLowerCase()).toBe('a'));
  });

  it('caps the inner content to `maxWidth` (container + bottom inner) while the background stays full-bleed', () => {
    const { container } = render(
      <Footer maxWidth={1280}>
        <Footer.Body>
          <Footer.Section heading="Heading">
            <a href="#">Link</a>
          </Footer.Section>
        </Footer.Body>
        <Footer.Bottom>
          <a href="#">Terms</a>
        </Footer.Bottom>
      </Footer>
    );

    const row = container.querySelector('.tedi-footer__container') as HTMLElement;
    expect(row.style.maxWidth).toBe('1280px');
    const bottomInner = container.querySelector('.tedi-footer-bottom__inner') as HTMLElement;
    expect(bottomInner.style.maxWidth).toBe('1280px');
  });

  it('lays the body out as a grid with the given column count above the mobile breakpoint', () => {
    const { container } = render(
      <Footer mobileBreakpoint="xs">
        <Footer.Body columns={3}>
          <Footer.Section heading="A">
            <a href="#">A</a>
          </Footer.Section>
          <Footer.Section heading="B">
            <a href="#">B</a>
          </Footer.Section>
          <Footer.Section heading="C">
            <a href="#">C</a>
          </Footer.Section>
        </Footer.Body>
      </Footer>
    );

    const body = container.querySelector('.tedi-footer-body') as HTMLElement;
    expect(body.className).toMatch(/--grid/);
    expect(body.style.gridTemplateColumns).toBe('repeat(3, minmax(0, 1fr))');
  });

  it('Footer.Bottom with `separator` inserts a decorative dot between items', () => {
    const { container } = render(
      <Footer>
        <Footer.Bottom separator>
          <a href="#">A</a>
          <a href="#">B</a>
          <a href="#">C</a>
        </Footer.Bottom>
      </Footer>
    );

    const bottom = container.querySelector('.tedi-footer-bottom') as HTMLElement;
    expect(bottom.querySelectorAll('a')).toHaveLength(3);
    const dots = bottom.querySelectorAll('.tedi-footer-bottom__dot');
    expect(dots).toHaveLength(2); // n items → n-1 separators
    dots.forEach((dot) => expect(dot).toHaveAttribute('aria-hidden', 'true'));
  });
});
