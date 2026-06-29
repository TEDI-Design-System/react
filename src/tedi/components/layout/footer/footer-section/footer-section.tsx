import cn from 'classnames';
import { ReactNode, useContext, useId } from 'react';

import { Breakpoint, isBreakpointBelow, useBreakpoint } from '../../../../helpers';
import { Icon } from '../../../base/icon/icon';
import { Heading } from '../../../base/typography/heading/heading';
import { Collapse } from '../../../buttons/collapse/collapse';
import styles from '../footer.module.scss';
import { FooterContext } from '../footer-context';

export interface FooterSectionProps {
  /**
   * Section heading text. Rendered as `<strong>` on desktop or as the trigger label of a
   * `<Collapse>` on mobile (when `collapsible` is true).
   */
  heading: ReactNode;
  /**
   * Optional Material Symbols icon name shown in a circular tinted background next to
   * the heading on desktop. Automatically hidden below the `lg` breakpoint to save space.
   */
  icon?: string;
  /**
   * When `true`, the section's link list collapses into an accordion below the
   * footer's `mobileBreakpoint` (`sm` by default) — the heading turns into a
   * toggle button (wired via the shared `<Collapse>` component for keyboard,
   * focus, and aria-expanded handling). Desktop layout is unaffected.
   * @default false
   */
  collapsible?: boolean;
  /**
   * Initial open state of the collapse — only relevant when `collapsible` is true and the
   * viewport is below the footer's mobile breakpoint.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Viewport breakpoint at and below which the section's icon is hidden to save
   * horizontal space. Separate from the footer-wide `mobileBreakpoint` because
   * icons are typically dropped one tier earlier than the layout flips.
   * @default lg
   */
  iconBreakpoint?: Breakpoint;
  /**
   * Section content — typically a sequence of `<Link>` elements.
   */
  children: ReactNode;
  /**
   * Additional class name on the section root.
   */
  className?: string;
}

export const FooterSection = ({
  heading,
  icon,
  collapsible = false,
  defaultOpen = false,
  iconBreakpoint = 'lg',
  children,
  className,
}: FooterSectionProps): JSX.Element => {
  const breakpoint = useBreakpoint();
  const { mobileBreakpoint } = useContext(FooterContext);
  const isMobile = isBreakpointBelow(breakpoint, mobileBreakpoint);
  const hideIcon = isBreakpointBelow(breakpoint, iconBreakpoint);
  const applyCollapse = collapsible && isMobile;
  const collapseId = useId();

  return (
    <div
      data-name="footer-section"
      className={cn(
        styles['tedi-footer-section'],
        { [styles['tedi-footer-section--collapsible']]: applyCollapse },
        className
      )}
    >
      {icon && !hideIcon && (
        <span className={styles['tedi-footer-section__icon']}>
          <Icon name={icon} color="white" size={24} />
        </span>
      )}
      <div
        className={cn(styles['tedi-footer-section__container'], {
          [styles['tedi-footer-section__container--mobile']]: isMobile,
        })}
      >
        {applyCollapse ? (
          <Collapse
            id={`tedi-footer-section-${collapseId}`}
            title={
              <Heading element="h6" color="white">
                {heading}
              </Heading>
            }
            size="small"
            inverted
            hideCollapseText
            fullRowToggle
            defaultOpen={defaultOpen}
            toggleLabel={typeof heading === 'string' ? heading : undefined}
            className={styles['tedi-footer-section__collapse']}
            titleRowProps={{ gutter: 0 }}
          >
            <div className={styles['tedi-footer-section__content-inner']}>{children}</div>
          </Collapse>
        ) : (
          <>
            <strong className={styles['tedi-footer-section__heading']}>{heading}</strong>
            <div className={styles['tedi-footer-section__content']}>{children}</div>
          </>
        )}
      </div>
    </div>
  );
};

FooterSection.displayName = 'Footer.Section';

export default FooterSection;
