import cn from 'classnames';
import { ReactNode, useContext } from 'react';

import { BreakpointSupport, isBreakpointBelow, useBreakpoint, useBreakpointProps } from '../../../../helpers';
import styles from '../footer.module.scss';
import { FooterContext } from '../footer-context';

export type FooterSidePlacement = 'start' | 'end';
export type FooterSidePosition = 'start' | 'center' | 'end';

export interface FooterSideBaseProps {
  /**
   * Where the side slot sits relative to `<Footer.Body>`. `'start'` renders before the body
   * (left on LTR, and first — above the sections — once the footer stacks on mobile); `'end'`
   * renders after the body (right on LTR, and last — below the sections — when stacked).
   *
   * Accepts breakpoint props, so the logo can sit on the side on desktop and drop to the bottom
   * on mobile — e.g. `placement="end" sm={{ placement: 'start' }}` keeps the logo on the left
   * from `sm` up and moves it to the last position once the footer collapses to its stacked layout.
   * @default start
   */
  placement?: FooterSidePlacement;
  /**
   * Vertical alignment of the contents inside the side slot. Accepts breakpoint props.
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

export type FooterSideProps = BreakpointSupport<FooterSideBaseProps>;

export const FooterSide = (props: FooterSideProps): JSX.Element => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const breakpoint = useBreakpoint();
  const { mobileBreakpoint } = useContext(FooterContext);
  const isMobile = isBreakpointBelow(breakpoint, mobileBreakpoint);

  const {
    placement = 'start',
    position = 'center',
    children,
    className,
  } = getCurrentBreakpointProps<FooterSideBaseProps>(props, { placement: 'start', position: 'center' });

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
