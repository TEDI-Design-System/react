import cn from 'classnames';
import { ReactNode, useContext } from 'react';

import { isBreakpointBelow, useBreakpoint } from '../../../../helpers';
import styles from '../footer.module.scss';
import { FooterContext } from '../footer-context';

export type FooterSidePlacement = 'start' | 'end';
export type FooterSidePosition = 'start' | 'center' | 'end';

export interface FooterSideProps {
  /**
   * Where the side slot sits relative to `<Footer.Body>`. `'start'` renders before the
   * body (left on LTR), `'end'` renders after (right on LTR).
   * @default start
   */
  placement?: FooterSidePlacement;
  /**
   * Vertical alignment of the contents inside the side slot.
   * @default center
   */
  position?: FooterSidePosition;
  /**
   * Side content — typically a `<img>` logo.
   */
  children: ReactNode;
  /**
   * Additional class name on the side wrapper.
   */
  className?: string;
}

export const FooterSide = ({
  placement = 'start',
  position = 'center',
  children,
  className,
}: FooterSideProps): JSX.Element => {
  const breakpoint = useBreakpoint();
  const { mobileBreakpoint } = useContext(FooterContext);
  const isMobile = isBreakpointBelow(breakpoint, mobileBreakpoint);

  return (
    <div
      data-name="footer-side"
      className={cn(
        styles['tedi-footer-side'],
        styles[`tedi-footer-side--${placement}`],
        styles[`tedi-footer-side--vertical-${position}`],
        { [styles['tedi-footer-side--mobile']]: isMobile },
        className
      )}
    >
      {children}
    </div>
  );
};

FooterSide.displayName = 'Footer.Side';
export default FooterSide;
