import cn from 'classnames';
import { ReactNode, useContext } from 'react';

import { Breakpoint, BreakpointSupport } from '../../../../helpers';
import styles from '../footer.module.scss';
import { FooterContext } from '../footer-context';
import { getResponsiveValues, getSwitchPoints, getValuePerBreakpoint } from '../footer-responsive';

type FooterBodyBreakpointProps = {
  /**
   * Number of equal-width columns laid out per row, controllable per breakpoint via the
   * `sm`/`md`/`lg`/`xl`/`xxl` keys. The keys are **mobile-first** — a value applies at that
   * breakpoint and up — so raise the count as the viewport widens
   * (e.g. `columns={2} md={{ columns: 3 }} lg={{ columns: 4 }}`). A value above 0 lays the body out as a CSS
   * grid of `columns` equal tracks. `0`, or no value yet, keeps the default row of content-sized columns spread
   * with `space-between`, so `lg={{ columns: 4 }}` leaves the breakpoints below `lg` on that row. Ignored below
   * the footer's `mobileBreakpoint`, where the body always stacks into a single column.
   */
  columns?: number;
};

export interface FooterBodyProps extends BreakpointSupport<FooterBodyBreakpointProps> {
  /**
   * @deprecated Ignored. The layout is chosen with CSS.
   */
  defaultServerBreakpoint?: Breakpoint;
  /**
   * `<Footer.Section>` children. Other nodes render verbatim but won't pick up the
   * mobile-collapse behaviour.
   */
  children: ReactNode;
  /**
   * Additional class name.
   */
  className?: string;
}

// The grid is on from `xs` when `columns` is set there; from any other breakpoint a class switches it on or off.
const getLayoutClass = (breakpoint: Breakpoint, isGrid: boolean): string => {
  if (breakpoint === 'xs') return styles['tedi-footer-body--grid'];

  const layout = isGrid ? 'grid' : 'flex';
  return styles[`tedi-footer-body--${layout}-from-${breakpoint}`];
};

export const FooterBody = (props: FooterBodyProps): JSX.Element => {
  const { children, className } = props;
  const { mobileBreakpoint } = useContext(FooterContext);

  // A class marks each breakpoint where the layout switches between the row and the grid (`0` is the row); the column
  // count of every breakpoint goes to CSS as a custom property.
  const columnValues = getResponsiveValues<FooterBodyBreakpointProps, 'columns'>(props, 'columns');
  const layoutClasses = getSwitchPoints(columnValues, (columns = 0) => columns > 0).map(([bp, isGrid]) =>
    getLayoutClass(bp, isGrid)
  );
  const columnVars = Object.fromEntries(
    getValuePerBreakpoint(columnValues.filter(([, columns]) => columns > 0)).map(([bp, columns = 1]) => [
      `--tedi-footer-body-columns-${bp}`,
      columns,
    ])
  );
  const useGrid = layoutClasses.length > 0;

  return (
    <div
      data-name="footer-body"
      className={cn(
        styles['tedi-footer-body'],
        styles[`tedi-footer-body--below-${mobileBreakpoint}`],
        layoutClasses,
        className
      )}
      style={useGrid ? columnVars : undefined}
    >
      {children}
    </div>
  );
};

FooterBody.displayName = 'Footer.Body';

export default FooterBody;
