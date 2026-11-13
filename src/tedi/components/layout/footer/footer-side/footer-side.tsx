import cn from 'classnames';
import { ReactNode, useContext } from 'react';

import { BreakpointSupport } from '../../../../helpers';
import styles from '../footer.module.scss';
import { FooterContext } from '../footer-context';
import { getResponsiveClassNames, getResponsiveValues } from '../footer-responsive';

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
   *
   * Breakpoint values change only the visual order; the keyboard and screen-reader order
   * follows the plain `placement` value.
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
  const { mobileBreakpoint } = useContext(FooterContext);
  const { children, className } = props;

  // `placement` and `position` accept breakpoint props, so every value is turned into a class that CSS
  // applies from its breakpoint up.
  const placementClasses = getResponsiveClassNames(
    styles,
    'tedi-footer-side--placement',
    getResponsiveValues<FooterSideBaseProps, 'placement'>(props, 'placement', 'start')
  );
  const positionClasses = getResponsiveClassNames(
    styles,
    'tedi-footer-side--vertical',
    getResponsiveValues<FooterSideBaseProps, 'position'>(props, 'position', 'center')
  );

  return (
    <div
      data-name="footer-side"
      className={cn(
        styles['tedi-footer-side'],
        placementClasses,
        positionClasses,
        styles[`tedi-footer-side--below-${mobileBreakpoint}`],
        className
      )}
    >
      {children}
    </div>
  );
};

FooterSide.displayName = 'Footer.Side';
export default FooterSide;
