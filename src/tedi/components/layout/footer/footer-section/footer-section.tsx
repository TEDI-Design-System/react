import cn from 'classnames';
import { ReactNode, useContext, useId, useState } from 'react';

import { Breakpoint } from '../../../../helpers';
import { Icon } from '../../../base/icon/icon';
import { Heading } from '../../../base/typography/heading/heading';
import styles from '../footer.module.scss';
import { FooterContext } from '../footer-context';

export interface FooterSectionProps {
  /**
   * Section heading text. Rendered as `<strong>` on desktop or as the label of the toggle
   * button on mobile (when `collapsible` is true).
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
   * toggle button. Desktop layout is unaffected.
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
  const { mobileBreakpoint } = useContext(FooterContext);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = `tedi-footer-section-${useId()}`;

  return (
    <div
      data-name="footer-section"
      className={cn(
        styles['tedi-footer-section'],
        styles[`tedi-footer-section--below-${mobileBreakpoint}`],
        { [styles['tedi-footer-section--collapsible']]: collapsible },
        className
      )}
    >
      {icon && (
        <span
          className={cn(
            styles['tedi-footer-section__icon'],
            styles[`tedi-footer-section__icon--below-${iconBreakpoint}`]
          )}
        >
          <Icon name={icon} color="white" size={24} />
        </span>
      )}
      <div className={styles['tedi-footer-section__container']}>
        <strong className={styles['tedi-footer-section__heading']}>{heading}</strong>
        {collapsible && (
          <button
            type="button"
            className={styles['tedi-footer-section__toggle']}
            aria-expanded={isOpen}
            aria-controls={contentId}
            onClick={() => setIsOpen((open) => !open)}
          >
            <Heading element="h6" color="white">
              {heading}
            </Heading>
            <span className={styles['tedi-footer-section__toggle-icon']}>
              <Icon name="expand_more" color="inherit" filled size={18} />
            </span>
          </button>
        )}
        <div
          id={contentId}
          className={cn(styles['tedi-footer-section__content'], {
            [styles['tedi-footer-section__content--open']]: isOpen,
          })}
        >
          <div className={styles['tedi-footer-section__content-inner']}>{children}</div>
        </div>
      </div>
    </div>
  );
};

FooterSection.displayName = 'Footer.Section';

export default FooterSection;
