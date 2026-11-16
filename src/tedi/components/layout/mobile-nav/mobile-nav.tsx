import { FloatingOverlay } from '@floating-ui/react';
import classNames from 'classnames';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { warnDeprecated } from '../../../helpers/warn-deprecated/warn-deprecated';
import { useLabels } from '../../../providers/label-provider';
import { Icon } from '../../base/icon/icon';
import Button from '../../buttons/button/button';
import { SideNavItem, SideNavItemProps } from '../sidenav/components/sidenav-item/sidenav-item';
import styles from '../sidenav/sidenav.module.scss';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * A `position: fixed` element is positioned relative to the viewport unless an ancestor
 * establishes a containing block (via `transform`, `perspective`, `filter`, `will-change`, or
 * `contain`). `offsetParent` is always `null` for fixed elements, so walk the ancestors to find
 * that block. This keeps the overlay aligned under its header both in a normal app (no such
 * ancestor → viewport) and when several instances share one document inside a transformed wrapper
 * (e.g. Storybook's Docs page, which stacks stories in a single scroll container).
 */
const findFixedContainingBlock = (element: HTMLElement | null): HTMLElement | null => {
  let node = element?.parentElement ?? null;
  while (node) {
    const style = getComputedStyle(node);
    if (
      style.transform !== 'none' ||
      style.perspective !== 'none' ||
      (style.filter !== '' && style.filter !== 'none') ||
      /\b(transform|perspective|filter)\b/.test(style.willChange) ||
      /\b(layout|paint|strict|content)\b/.test(style.contain)
    ) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
};

type NavigationLevel<C extends React.ElementType> = {
  items: SideNavItemProps<C>[];
  parent?: SideNavItemProps<C>;
  renderParentLink?: boolean;
};

export type MobileNavProps<C extends React.ElementType = 'a'> = {
  navItems: SideNavItemProps<C>[];
  ariaLabel: string;
  linkAs?: C;
  isOpen: boolean;
  onClose: () => void;
  showOverlay?: boolean;
  id?: string;
  className?: string;
};

export const MobileNav = <C extends React.ElementType = 'a'>({
  navItems,
  ariaLabel,
  linkAs,
  isOpen,
  onClose,
  showOverlay = true,
  id,
  className,
}: MobileNavProps<C>) => {
  const { getLabel } = useLabels();
  const [navigationStack, setNavigationStack] = useState<NavigationLevel<C>[]>([{ items: navItems }]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [overlayTop, setOverlayTop] = useState<string>('var(--layout-header-height)');

  useEffect(() => {
    setNavigationStack([{ items: navItems }]);
  }, [navItems]);

  useIsomorphicLayoutEffect(() => {
    if (!isOpen || !showOverlay || typeof document === 'undefined') return undefined;

    const block = findFixedContainingBlock(overlayRef.current);
    const header = (block ?? document).querySelector('header') ?? document.querySelector('header');

    if (!header) {
      setOverlayTop('var(--layout-header-height)');
      return undefined;
    }

    const measure = () => {
      const blockTop = block ? block.getBoundingClientRect().top : 0;
      setOverlayTop(`${Math.max(0, Math.round(header.getBoundingClientRect().bottom - blockTop))}px`);
    };
    measure();

    window.addEventListener('resize', measure);
    let observer: ResizeObserver | undefined;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(measure);
      observer.observe(header);
      if (block) observer.observe(block);
    }

    return () => {
      window.removeEventListener('resize', measure);
      observer?.disconnect();
    };
  }, [isOpen, showOverlay]);

  useEffect(() => {
    if (!isOpen || !showOverlay || typeof document === 'undefined') return undefined;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = 'hidden';

    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [isOpen, showOverlay]);

  const currentLevel = navigationStack[navigationStack.length - 1];
  const isRootLevel = navigationStack.length === 1;

  const handleItemClick = (item: SideNavItemProps<C>) => {
    const hasChildren = !!(item.subItems || item.subItemGroups);
    const isLinked = !!(item.href || item.to);

    if (!hasChildren) {
      onClose();
      return;
    }

    const nextLevelItems = item.subItemGroups?.flatMap((group) => group.subItems) || item.subItems || [];

    setNavigationStack([
      ...navigationStack,
      {
        items: nextLevelItems,
        parent: item,
        renderParentLink: isLinked,
      },
    ]);
  };

  const handleBackClick = () => {
    setNavigationStack(navigationStack.slice(0, -1));
  };

  const handleBackToRoot = () => {
    setNavigationStack([navigationStack[0]]);
  };

  const parentHasChildren = currentLevel.parent?.subItems?.length ?? currentLevel.parent?.subItemGroups?.length;
  const shouldRenderSubheading = navigationStack.length > 1 && !(currentLevel.renderParentLink && parentHasChildren);

  const renderMobileItem = (item: SideNavItemProps<C>, level: number) => {
    if (level === 1) {
      const hasChildren = !!(item.subItems || item.subItemGroups);

      if (!hasChildren) {
        return (
          <SideNavItem
            {...item}
            as={linkAs}
            level={level}
            onItemClick={onClose}
            className={classNames(styles['tedi-sidenav__item--mobile'], item.className)}
          />
        );
      }

      return (
        <li className={classNames(styles['tedi-sidenav__item'], styles['tedi-sidenav__item--mobile'])}>
          <button onClick={() => handleItemClick(item)} className={styles['tedi-sidenav__link']}>
            {item.icon && (
              <Icon
                name={typeof item.icon === 'string' ? item.icon : item.icon.name}
                color="white"
                className={styles['tedi-sidenav__icon']}
              />
            )}
            <span className={styles['tedi-sidenav__title']}>{item.children}</span>
            <Icon name="expand_more" color="white" className={styles['tedi-sidenav__toggle-icon']} />
          </button>
        </li>
      );
    }

    return renderNestedMobileItem(item, level);
  };

  const renderNestedMobileItem = (item: SideNavItemProps<C>, level: number) => {
    const isLink = !!(item.href || item.to);
    const hasChildren = !!(item.subItems || item.subItemGroups);

    if (isLink) {
      const itemContent = (
        <SideNavItem
          {...item}
          as={linkAs}
          level={level}
          icon={undefined}
          onItemClick={onClose}
          className={classNames(styles['tedi-sidenav__sub-item'], item.className)}
        />
      );

      return itemContent;
    }

    return (
      <li className={classNames(styles['tedi-sidenav__item'])}>
        <Button
          noStyle
          onClick={() => (hasChildren ? handleItemClick(item) : onClose())}
          className={styles['tedi-sidenav__link']}
        >
          <span className={styles['tedi-sidenav__title']}>{item.children}</span>
          {hasChildren ? (
            <Icon name="expand_more" color="white" className={styles['tedi-sidenav__toggle-icon']} />
          ) : null}
        </Button>
      </li>
    );
  };

  const content = (
    <nav
      data-name="mobile-sidenav"
      className={classNames(styles['tedi-sidenav'], styles['tedi-sidenav--mobile'], className)}
      aria-label={ariaLabel}
      id={id}
    >
      <div className={styles['tedi-sidenav__list']}>
        {!isRootLevel && (
          <div className={styles['tedi-sidenav__back-buttons']}>
            {navigationStack.length > 1 && (
              <Button
                noStyle
                onClick={handleBackToRoot}
                className={classNames(styles['tedi-sidenav__link'], styles['tedi-sidenav__back-button'])}
              >
                <Icon name="arrow_back" size={16} color="white" />
                <span>{getLabel('sidenav.backToMainMenu')}</span>
              </Button>
            )}

            {navigationStack.length > 2 && (
              <Button
                noStyle
                onClick={handleBackClick}
                className={classNames(styles['tedi-sidenav__link'], styles['tedi-sidenav__back-button'])}
              >
                <Icon name="arrow_back" size={16} color="white" />
                <span>
                  {navigationStack[navigationStack.length - 1]?.parent?.children + ' ' + getLabel('sidenav.backtoMenu')}
                </span>
              </Button>
            )}
          </div>
        )}
      </div>
      {shouldRenderSubheading && (
        <div className={classNames(styles['tedi-sidenav__subheading'], styles['tedi-sidenav__subheading--mobile'])}>
          {currentLevel.parent?.children}
        </div>
      )}
      <ul className={styles['tedi-sidenav__list']}>
        {currentLevel.renderParentLink && currentLevel.parent && (
          <li className={styles['tedi-sidenav__list-item']}>
            <div className={classNames(styles['tedi-sidenav__collapse'])}>
              {renderMobileItem(currentLevel.parent, navigationStack.length)}
            </div>
          </li>
        )}
        {!currentLevel.renderParentLink &&
          currentLevel.items.map((item, index) => (
            <React.Fragment key={item.id || index}>{renderMobileItem(item, navigationStack.length)}</React.Fragment>
          ))}
      </ul>
    </nav>
  );

  if (!isOpen) return null;

  return showOverlay ? (
    <FloatingOverlay
      ref={overlayRef}
      style={{ top: overlayTop }}
      className={styles['tedi-sidenav__overlay']}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      {content}
    </FloatingOverlay>
  ) : (
    content
  );
};

/**
 * @deprecated Use `MobileNav` (same component, vendor-neutral name). Kept for
 * backward compatibility with the `SideNav.Mobile` sub-component alias.
 */
export const SideNavMobile = <C extends React.ElementType = 'a'>(props: MobileNavProps<C>) => {
  warnDeprecated('SideNavMobile', 'Use `MobileNav` (same component, vendor-neutral name).');
  return <MobileNav<C> {...props} />;
};
/** @deprecated Use `MobileNavProps`. */
export type SideNavMobileProps<C extends React.ElementType = 'a'> = MobileNavProps<C>;
