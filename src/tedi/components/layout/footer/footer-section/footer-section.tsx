import cn from 'classnames';
import { ReactNode, useContext, useId } from 'react';

import { Breakpoint, isBreakpointBelow, useBreakpoint } from '../../../../helpers';
import { Icon } from '../../../base/icon/icon';
import { Heading } from '../../../base/typography/heading/heading';
import { Collapse } from '../../../content/collapse/collapse';
import styles from '../footer.module.scss';
import { FooterContext } from '../footer-context';

export type FooterSectionHeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface FooterSectionProps {
  /**
   * Section heading text. Rendered as `<strong>` on desktop or as the trigger label of a
   * `<Collapse>` on mobile (when `collapsible` is true).
   */
  heading: ReactNode;
  /**
   * Semantic heading level of the section heading, in every layout; the visual style stays the same
   * regardless. Set it to fit the host page's heading outline (WCAG 1.3.1).
   * @default h2
   */
  headingLevel?: FooterSectionHeadingLevel;
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
  headingLevel = 'h2',
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
  const HeadingTag = headingLevel;

  return (
    <div
      data-name="footer-section"
      className={cn(
        styles['tedi-footer-section'],
        {
          [styles['tedi-footer-section--mobile']]: isMobile,
          [styles['tedi-footer-section--collapsible']]: applyCollapse,
        },
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
            size="small"
            inverted
            defaultOpen={defaultOpen}
            className={styles['tedi-footer-section__collapse']}
            {...(typeof heading === 'string'
              ? // The toggle button sits inside the heading, so the section has one control named once.
                { headingLevel, openText: heading, closeText: heading, underline: false }
              : {
                  title: (
                    <Heading element={headingLevel} modifiers="h6" color="white">
                      {heading}
                    </Heading>
                  ),
                  hideCollapseText: true,
                  fullRowToggle: true,
                  titleRowProps: { gutter: 0 },
                })}
          >
            <div className={styles['tedi-footer-section__content-inner']}>{children}</div>
          </Collapse>
        ) : (
          <>
            <HeadingTag className={styles['tedi-footer-section__heading']}>{heading}</HeadingTag>
            <div className={styles['tedi-footer-section__content']}>{children}</div>
          </>
        )}
      </div>
    </div>
  );
};

FooterSection.displayName = 'Footer.Section';

export default FooterSection;
