import cn from 'classnames';
import { Children, Fragment, isValidElement, ReactNode, useContext } from 'react';

import { isBreakpointBelow, useBreakpoint } from '../../../../helpers';
import styles from '../footer.module.scss';
import { FooterContext } from '../footer-context';

export interface FooterBottomProps {
  /**
   * Bottom-row content — typically a sequence of `<Link>` elements. On mobile the gap shrinks
   * and items wrap to multiple lines.
   */
  children: ReactNode;
  /**
   * Insert a small dot between items (matches the Figma "with separator" bottom variant). When
   * `false`, items are spaced only by the flex `gap`.
   * @default false
   */
  separator?: boolean;
  /**
   * Additional class name on the bottom strip.
   */
  className?: string;
}

export const FooterBottom = ({ children, separator = false, className }: FooterBottomProps): JSX.Element => {
  const breakpoint = useBreakpoint();
  const { mobileBreakpoint, maxWidth } = useContext(FooterContext);
  const isMobile = isBreakpointBelow(breakpoint, mobileBreakpoint);

  const items = separator ? Children.toArray(children).filter((child) => isValidElement(child) || child) : null;

  return (
    <div
      data-name="footer-bottom"
      className={cn(styles['tedi-footer-bottom'], { [styles['tedi-footer-bottom--mobile']]: isMobile }, className)}
    >
      {/* Inner wrapper keeps the strip background full-bleed while its content caps to `maxWidth`. */}
      <div className={styles['tedi-footer-bottom__inner']} style={maxWidth !== undefined ? { maxWidth } : undefined}>
        {items
          ? items.map((child, index) => (
              <Fragment key={index}>
                {child}
                {index < items.length - 1 && <span className={styles['tedi-footer-bottom__dot']} aria-hidden="true" />}
              </Fragment>
            ))
          : children}
      </div>
    </div>
  );
};

FooterBottom.displayName = 'Footer.Bottom';

export default FooterBottom;
