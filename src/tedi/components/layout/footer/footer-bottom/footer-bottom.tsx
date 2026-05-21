import cn from 'classnames';
import { ReactNode, useContext } from 'react';

import { isBreakpointBelow, useBreakpoint } from '../../../../helpers';
import styles from '../footer.module.scss';
import { FooterContext } from '../footer-context';

export interface FooterBottomProps {
  /**
   * Bottom-row content — typically a sequence of `<Link>` elements. Items are rendered
   * verbatim with the flex `gap` providing spacing; no separator dots are injected.
   * On mobile the gap shrinks and items wrap to multiple lines.
   */
  children: ReactNode;
  /**
   * Additional class name on the bottom strip.
   */
  className?: string;
}

/**
 * Bottom strip rendered below `<Footer.Body>`. Holds legal / utility links; items are
 * spaced via flex `gap` and wrap on narrow viewports.
 */
export const FooterBottom = ({ children, className }: FooterBottomProps): JSX.Element => {
  const breakpoint = useBreakpoint();
  const { mobileBreakpoint } = useContext(FooterContext);
  const isMobile = isBreakpointBelow(breakpoint, mobileBreakpoint);

  return (
    <div
      data-name="footer-bottom"
      className={cn(styles['tedi-footer-bottom'], { [styles['tedi-footer-bottom--mobile']]: isMobile }, className)}
    >
      {children}
    </div>
  );
};

FooterBottom.displayName = 'Footer.Bottom';
export default FooterBottom;
