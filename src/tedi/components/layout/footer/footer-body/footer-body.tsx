import cn from 'classnames';
import { ReactNode, useContext } from 'react';

import { BreakpointSupport, isBreakpointBelow, useBreakpoint, useBreakpointProps } from '../../../../helpers';
import styles from '../footer.module.scss';
import { FooterContext } from '../footer-context';

type FooterBodyBreakpointProps = {
  /**
   * Number of equal-width columns laid out per row, controllable per breakpoint via the
   * `sm`/`md`/`lg`/`xl`/`xxl` keys. The keys are **mobile-first** — a value applies at that
   * breakpoint and up — so raise the count as the viewport widens
   * (e.g. `columns={2} md={{ columns: 3 }} lg={{ columns: 4 }}`). When set, the body uses a CSS grid
   * of `columns` equal tracks; when omitted, columns are content-sized and spread with
   * `space-between` (the default). Ignored below the footer's `mobileBreakpoint`, where the body
   * always stacks into a single column.
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
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const { children, className, columns } = getCurrentBreakpointProps<FooterBodyProps>(props);

  const breakpoint = useBreakpoint();
  const { mobileBreakpoint } = useContext(FooterContext);
  const isMobile = isBreakpointBelow(breakpoint, mobileBreakpoint);
  const useGrid = !isMobile && typeof columns === 'number' && columns > 0;

  return (
    <div
      data-name="footer-body"
      className={cn(
        styles['tedi-footer-body'],
        { [styles['tedi-footer-body--mobile']]: isMobile, [styles['tedi-footer-body--grid']]: useGrid },
        className
      )}
      style={useGrid ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` } : undefined}
    >
      {children}
    </div>
  );
};

FooterBody.displayName = 'Footer.Body';

export default FooterBody;
