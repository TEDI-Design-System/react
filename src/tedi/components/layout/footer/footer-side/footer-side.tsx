import cn from 'classnames';
import { ReactNode, useContext } from 'react';

import { Breakpoint, BreakpointSupport } from '../../../../helpers';
import styles from '../footer.module.scss';
import { FooterContext } from '../footer-context';
import { getResponsiveClassNames, getResponsiveValues, getSwitchPoints } from '../footer-responsive';

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
   * A side whose placement changes with the breakpoint is rendered once in each slot and CSS shows the one
   * that fits, so the tab and screen-reader order follows what is on screen. The content exists twice in the
   * markup, so keep ids out of it.
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

export type FooterSideProps = Omit<BreakpointSupport<FooterSideBaseProps>, 'defaultServerBreakpoint'> & {
  /**
   * @deprecated Ignored. The layout is chosen with CSS.
   */
  defaultServerBreakpoint?: Breakpoint;
  /**
   * Which slot this copy is rendered in. Set by `Footer` when `placement` changes with the breakpoint.
   * @internal
   */
  copy?: FooterSidePlacement;
};

// The slots a side is rendered in: both when its placement changes with the breakpoint, so CSS can show the one that
// fits.
export const getSideSlots = (props: FooterSideProps): FooterSidePlacement[] => {
  const placements = getResponsiveValues<FooterSideBaseProps, 'placement'>(props, 'placement', 'start').map(
    ([, placement]) => placement
  );

  return new Set(placements).size > 1 ? ['start', 'end'] : [placements[0]];
};

// Shows a copy only where its slot is the one `placement` asks for.
const getCopyVisibilityClass = (breakpoint: Breakpoint, isShown: boolean): string => {
  if (breakpoint === 'xs') return styles['tedi-footer-side--hidden'];

  const visibility = isShown ? 'show' : 'hide';
  return styles[`tedi-footer-side--${visibility}-from-${breakpoint}`];
};

const getCopyVisibilityClasses = (entries: [Breakpoint, FooterSidePlacement][], copy: FooterSidePlacement): string[] =>
  getSwitchPoints(entries, (placement = 'start') => placement === copy, true).map(([bp, isShown]) =>
    getCopyVisibilityClass(bp, isShown)
  );

export const FooterSide = (props: FooterSideProps): JSX.Element => {
  const { mobileBreakpoint } = useContext(FooterContext);
  const { children, className, copy } = props;

  const placementValues = getResponsiveValues<FooterSideBaseProps, 'placement'>(props, 'placement', 'start');
  const placement = copy ?? placementValues[0][1];
  const copyClasses = copy ? getCopyVisibilityClasses(placementValues, copy) : [];

  // `position` accepts breakpoint props, so every value is turned into a class that CSS applies from its
  // breakpoint up.
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
        styles[`tedi-footer-side--placement-${placement}`],
        copyClasses,
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
