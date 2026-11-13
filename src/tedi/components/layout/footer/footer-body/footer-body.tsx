import cn from 'classnames';
import { ReactNode, useContext } from 'react';

import { Breakpoint, breakpoints, BreakpointSupport } from '../../../../helpers';
import styles from '../footer.module.scss';
import { FooterContext } from '../footer-context';
import { getResponsiveValues } from '../footer-responsive';

type FooterBodyBreakpointProps = {
  /**
   * Number of equal-width columns laid out per row, controllable per breakpoint via the
   * `sm`/`md`/`lg`/`xl`/`xxl` keys. The keys are **mobile-first** — a value applies at that
   * breakpoint and up — so raise the count as the viewport widens
   * (e.g. `columns={2} md={{ columns: 3 }} lg={{ columns: 4 }}`). When set, the body uses a CSS grid
   * of `columns` equal tracks; when omitted, columns are content-sized and spread with
   * `space-between` (the default). Ignored below the footer's `mobileBreakpoint`, where the body
   * always stacks into a single column. Set the plain `columns` value as the base: if it is only set
   * from a larger breakpoint, the body uses a single-column grid below that breakpoint.
   */
  columns?: number;
};

export interface FooterBodyProps extends BreakpointSupport<FooterBodyBreakpointProps> {
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

export const FooterBody = (props: FooterBodyProps): JSX.Element => {
  const { children, className } = props;
  const { mobileBreakpoint } = useContext(FooterContext);

  // The column count of every breakpoint is handed to CSS as a custom property (mobile-first, so a
  // breakpoint without its own value keeps the previous one). The grid itself is switched on and off by CSS.
  const columnValues = getResponsiveValues<FooterBodyBreakpointProps, 'columns'>(props, 'columns').filter(
    ([, value]) => typeof value === 'number' && value > 0
  );
  const useGrid = columnValues.length > 0;
  const columnVars: Record<string, number> = {};
  let current = 1;
  breakpoints.forEach((bp: Breakpoint) => {
    current = columnValues.find(([valueBp]) => valueBp === bp)?.[1] ?? current;
    columnVars[`--tedi-footer-body-columns-${bp}`] = current;
  });

  return (
    <div
      data-name="footer-body"
      className={cn(
        styles['tedi-footer-body'],
        styles[`tedi-footer-body--below-${mobileBreakpoint}`],
        { [styles['tedi-footer-body--grid']]: useGrid },
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
