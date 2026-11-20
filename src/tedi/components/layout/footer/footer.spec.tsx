import { fireEvent, render, screen } from '@testing-library/react';
import { execFileSync } from 'child_process';
import path from 'path';
import { renderToString } from 'react-dom/server.node';

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

  it('collapsible section renders a toggle button below the mobile breakpoint and toggles aria-expanded on click', () => {
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

  it('lays the body out as a grid and hands the column count to CSS', () => {
    const { container } = render(
      <Footer>
        <Footer.Body columns={3}>
          <Footer.Section heading="A">
            <a href="#">A</a>
          </Footer.Section>
        </Footer.Body>
      </Footer>
    );

    const body = container.querySelector('.tedi-footer-body') as HTMLElement;
    expect(body.className).toMatch(/--grid/);
    expect(body.style.getPropertyValue('--tedi-footer-body-columns-xs')).toBe('3');
    expect(body.style.getPropertyValue('--tedi-footer-body-columns-xxl')).toBe('3');
  });

  it('resolves responsive `columns` mobile-first, keeping the previous value where a breakpoint has none', () => {
    const { container } = render(
      <Footer>
        <Footer.Body columns={2} md={{ columns: 3 }} xl={{ columns: 4 }}>
          <Footer.Section heading="A">
            <a href="#">A</a>
          </Footer.Section>
        </Footer.Body>
      </Footer>
    );

    const body = container.querySelector('.tedi-footer-body') as HTMLElement;
    const columns = (bp: string) => body.style.getPropertyValue(`--tedi-footer-body-columns-${bp}`);
    expect([columns('xs'), columns('sm'), columns('md'), columns('lg'), columns('xl'), columns('xxl')]).toEqual([
      '2',
      '2',
      '3',
      '3',
      '4',
      '4',
    ]);
  });

  it('does not use the grid when `columns` is not set', () => {
    const { container } = render(
      <Footer>
        <Footer.Body>
          <Footer.Section heading="A">
            <a href="#">A</a>
          </Footer.Section>
        </Footer.Body>
      </Footer>
    );

    const body = container.querySelector('.tedi-footer-body') as HTMLElement;
    expect(body.className).not.toMatch(/--grid/);
    expect(body.getAttribute('style')).toBeNull();
  });

  it('passes `mobileBreakpoint` to every part as a CSS class', () => {
    const { container } = render(
      <Footer mobileBreakpoint="md">
        <Footer.Side>
          <img alt="logo" />
        </Footer.Side>
        <Footer.Body>
          <Footer.Section heading="A" collapsible>
            <a href="#">A</a>
          </Footer.Section>
        </Footer.Body>
        <Footer.Bottom>
          <a href="#">Terms</a>
        </Footer.Bottom>
      </Footer>
    );

    expect(container.querySelector('.tedi-footer__container')?.className).toMatch(/--below-md/);
    expect(container.querySelector('.tedi-footer-side')?.className).toMatch(/--below-md/);
    expect(container.querySelector('.tedi-footer-body')?.className).toMatch(/--below-md/);
    expect(container.querySelector('.tedi-footer-section')?.className).toMatch(/--below-md/);
    expect(container.querySelector('.tedi-footer-bottom')?.className).toMatch(/--below-md/);
  });

  it('turns responsive `placement` and `position` of a side into classes applied from each breakpoint', () => {
    const { container } = render(
      <Footer>
        <Footer.Side placement="end" position="start" sm={{ placement: 'start' }} lg={{ position: 'end' }}>
          <img alt="logo" />
        </Footer.Side>
      </Footer>
    );

    const classes = (container.querySelector('.tedi-footer-side') as HTMLElement).className;
    expect(classes).toContain('tedi-footer-side--placement-end');
    expect(classes).toContain('tedi-footer-side--placement-start-from-sm');
    expect(classes).toContain('tedi-footer-side--vertical-start');
    expect(classes).toContain('tedi-footer-side--vertical-end-from-lg');
  });

  it('keeps the class for a placement that switches back at a later breakpoint', () => {
    const { container } = render(
      <Footer>
        <Footer.Side placement="start" sm={{ placement: 'end' }} lg={{ placement: 'start' }}>
          <img alt="logo" />
        </Footer.Side>
      </Footer>
    );

    const classes = (container.querySelector('.tedi-footer-side') as HTMLElement).className;
    expect(classes).toContain('tedi-footer-side--placement-start');
    expect(classes).toContain('tedi-footer-side--placement-end-from-sm');
    expect(classes).toContain('tedi-footer-side--placement-start-from-lg');
  });

  it('renders a section icon that is hidden below `lg` by default', () => {
    const { container } = render(
      <Footer>
        <Footer.Body>
          <Footer.Section heading="Contact" icon="mail">
            <a href="#">Email</a>
          </Footer.Section>
        </Footer.Body>
      </Footer>
    );

    const icon = container.querySelector('.tedi-footer-section__icon');
    expect(icon).toBeInTheDocument();
    expect(icon?.className).toContain('tedi-footer-section__icon--below-lg');
  });

  it('hides the section icon below `iconBreakpoint`', () => {
    const { container } = render(
      <Footer>
        <Footer.Body>
          <Footer.Section heading="Contact" icon="mail" iconBreakpoint="md">
            <a href="#">Email</a>
          </Footer.Section>
        </Footer.Body>
      </Footer>
    );

    expect(container.querySelector('.tedi-footer-section__icon')?.className).toContain(
      'tedi-footer-section__icon--below-md'
    );
  });

  it('renders no icon element without an `icon`', () => {
    const { container } = render(
      <Footer>
        <Footer.Body>
          <Footer.Section heading="Contact">
            <a href="#">Email</a>
          </Footer.Section>
        </Footer.Body>
      </Footer>
    );

    expect(container.querySelector('.tedi-footer-section__icon')).not.toBeInTheDocument();
  });

  it('server-renders the same markup for every width: both headings, content once, no layout chosen by JS', () => {
    const html = renderToString(
      <Footer mobileBreakpoint="md">
        <Footer.Body>
          <Footer.Section heading="Contact" collapsible>
            <a href="#">Phone</a>
          </Footer.Section>
        </Footer.Body>
      </Footer>
    );

    expect(html).toContain('<strong');
    expect(html).toContain('aria-expanded="false"');
    expect(html.match(/Phone/g)).toHaveLength(1);
    expect(html).toContain('tedi-footer__container--below-md');
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
    expect(dots).toHaveLength(2);
    dots.forEach((dot) => expect(dot).toHaveAttribute('aria-hidden', 'true'));
  });
});

describe('Footer side responsive rules', () => {
  // jsdom does not evaluate media queries, so the cascade is checked on the compiled stylesheet: classes of equal
  // specificity apply by source order. The sass CLI runs in a child process, because the sass library does not
  // work inside Jest's jsdom environment.
  let css = '';

  beforeAll(() => {
    const root = path.resolve(__dirname, '../../../../..');
    css = execFileSync(
      path.join(root, 'node_modules/.bin/sass'),
      [
        '--quiet',
        '--no-source-map',
        `--load-path=${path.join(root, 'node_modules')}`,
        path.resolve(__dirname, 'footer.module.scss'),
      ],
      { encoding: 'utf8' }
    );
  });

  const BREAKPOINTS = ['sm', 'md', 'lg', 'xl', 'xxl'];
  const ruleIndex = (selector: string): number => css.indexOf(`.${selector} {`);

  it.each([
    ['placement', ['start', 'end']],
    ['vertical', ['start', 'center', 'end']],
  ])('puts a larger breakpoint after a smaller one for every %s value', (family, values) => {
    BREAKPOINTS.forEach((smaller, i) => {
      BREAKPOINTS.slice(i + 1).forEach((larger) => {
        values.forEach((smallerValue) => {
          values.forEach((largerValue) => {
            const first = ruleIndex(`tedi-footer-side--${family}-${smallerValue}-from-${smaller}`);
            const second = ruleIndex(`tedi-footer-side--${family}-${largerValue}-from-${larger}`);

            expect(first).toBeGreaterThan(-1);
            expect(second).toBeGreaterThan(first);
          });
        });
      });
    });
  });

  it('makes `below` the exact opposite of `from`, with no gap between them', () => {
    // core's media-breakpoint-down stops 0.02 short of the breakpoint (max-width), which leaves a sliver of
    // fractional widths that neither query matches.
    expect(css).toContain('@media not all and (min-width: 48rem) {\n  .tedi-footer-body--below-md');
    expect(css).not.toMatch(/max-width/);
  });
});
