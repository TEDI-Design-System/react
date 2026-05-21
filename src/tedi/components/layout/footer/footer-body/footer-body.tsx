import cn from 'classnames';
import { ReactNode, useContext } from 'react';

import { isBreakpointBelow, useBreakpoint } from '../../../../helpers';
import styles from '../footer.module.scss';
import { FooterContext } from '../footer-context';

export interface FooterBodyProps {
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

export const FooterBody = ({ children, className }: FooterBodyProps): JSX.Element => {
  const breakpoint = useBreakpoint();
  const { mobileBreakpoint } = useContext(FooterContext);
  const isMobile = isBreakpointBelow(breakpoint, mobileBreakpoint);

  return (
    <div
      data-name="footer-body"
      className={cn(styles['tedi-footer-body'], { [styles['tedi-footer-body--mobile']]: isMobile }, className)}
    >
      {children}
    </div>
  );
};

FooterBody.displayName = 'Footer.Body';
export default FooterBody;
