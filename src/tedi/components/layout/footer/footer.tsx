import cn from 'classnames';
import { Children, isValidElement, ReactNode, useMemo } from 'react';

import { Breakpoint, isBreakpointBelow, useBreakpoint } from '../../../helpers';
import styles from './footer.module.scss';
import { FooterBody } from './footer-body/footer-body';
import { FooterBottom } from './footer-bottom/footer-bottom';
import { FooterContext, FooterContextValue } from './footer-context';
import { FooterSection } from './footer-section/footer-section';
import { FooterSide } from './footer-side/footer-side';

export interface FooterProps {
  /**
   * `<Footer.Side>`, `<Footer.Body>` (with `<Footer.Section>` children), and `<Footer.Bottom>` slots.
   *
   * Recognised arrangement:
   * 1. Zero or more `<Footer.Side placement="start">` elements (logos on the left).
   * 2. Exactly one `<Footer.Body>`.
   * 3. Zero or more `<Footer.Side placement="end">` elements (logos on the right).
   * 4. Optional `<Footer.Bottom>` rendered below the main row as a strip with separator dots.
   *
   * Other nodes are rendered verbatim where the consumer placed them.
   */
  children: ReactNode;
  /**
   * Viewport breakpoint at and below which the footer switches to its stacked
   * mobile layout — sections collapse into accordions, sides stack, the bottom
   * strip wraps. Propagated to every Footer subcomponent via context so they
   * agree on the threshold.
   * @default sm
   */
  mobileBreakpoint?: Breakpoint;
  /**
   * Caps the inner content — the column row and the bottom strip's content — to a maximum width
   * and centers it, while the dark backgrounds stay full-bleed. Pass any CSS length (e.g. `1280`,
   * `'1280px'`, `'80rem'`). Omit to let the content fill the full width (with the 40px padding).
   */
  maxWidth?: number | string;
  /**
   * Additional class name on the `<footer>` root.
   */
  className?: string;
}

export const Footer = ({ children, className, mobileBreakpoint = 'sm', maxWidth }: FooterProps): JSX.Element => {
  const breakpoint = useBreakpoint();
  const isMobile = isBreakpointBelow(breakpoint, mobileBreakpoint);
  const contextValue = useMemo<FooterContextValue>(
    () => ({ mobileBreakpoint, maxWidth }),
    [mobileBreakpoint, maxWidth]
  );

  const start: ReactNode[] = [];
  const end: ReactNode[] = [];
  let body: ReactNode = null;
  let bottom: ReactNode = null;
  const passthrough: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      if (child !== null && child !== undefined && child !== false) passthrough.push(child);
      return;
    }
    const type = child.type;
    if (type === FooterSide) {
      const placement = (child.props as { placement?: 'start' | 'end' }).placement ?? 'start';
      (placement === 'end' ? end : start).push(child);
      return;
    }
    if (type === FooterBody) {
      body = child;
      return;
    }
    if (type === FooterBottom) {
      bottom = child;
      return;
    }
    passthrough.push(child);
  });

  return (
    <FooterContext.Provider value={contextValue}>
      <footer data-name="footer" className={cn(styles['tedi-footer'], className)}>
        <div
          className={cn(styles['tedi-footer__container'], { [styles['tedi-footer__container--mobile']]: isMobile })}
          style={maxWidth !== undefined ? { maxWidth, marginInline: 'auto' } : undefined}
        >
          {start}
          {body !== null && <div className={styles['tedi-footer__center']}>{body}</div>}
          {passthrough}
          {end}
        </div>
        {bottom}
      </footer>
    </FooterContext.Provider>
  );
};

Footer.Side = FooterSide;
Footer.Body = FooterBody;
Footer.Section = FooterSection;
Footer.Bottom = FooterBottom;

Footer.displayName = 'Footer';

export default Footer;
