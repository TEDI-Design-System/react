import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  Placement,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useInteractions,
  useListNavigation,
  useRole,
} from '@floating-ui/react';
import cn from 'classnames';
import React from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import { useLabels } from '../../../providers/label-provider';
import styles from './dropdown.module.scss';
import { DropdownContent } from './dropdown-content/dropdown-content';
import { DropdownContext, DropdownContextValue } from './dropdown-context';
import { DropdownFooter } from './dropdown-footer/dropdown-footer';
import { DropdownGroup } from './dropdown-group/dropdown-group';
import { DropdownHeader, OWN_ARROW_KEYS } from './dropdown-header/dropdown-header';
import { resolveDropdownWidth } from './dropdown-helpers';
import { DropdownItem } from './dropdown-item/dropdown-item';
import { DropdownSeparator } from './dropdown-separator/dropdown-separator';
import { DropdownTrigger } from './dropdown-trigger/dropdown-trigger';

const DROPDOWN_OFFSET = 4;
const HEADER_FOCUSABLE =
  'input:not([disabled]), button:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

type DropdownBreakpointProps = {
  /**
   * When `true` there is a border between the dropdown items
   *  @default false
   */
  divided?: boolean;
  /**
   * Controls the width of the dropdown menu.
   * - `'auto'` – width is determined by content, never narrower than the trigger (default)
   * - `'trigger'` – matches the width of the trigger element
   * - `'full'` – spans the full width of the containing block
   * - `number` – fixed width in pixels
   * - `string` – any valid CSS width value (e.g. `'16rem'`, `'100%'`)
   * @default auto
   */
  width?: 'auto' | 'trigger' | 'full' | number | string;
  /**
   * Controls where the dropdown is positioned relative to its trigger.
   * Accepts any Floating UI placement value, such as:
   * `'bottom-start'`, `'bottom-end'`, `'top-start'`, `'right-end'`, etc.
   *
   * @default bottom-start
   */
  placement?: Placement;
  /**
   * Controls the visual and structural variant of the dropdown.
   * - `'default'` – standard flat list of items
   * - `'tree'` – hierarchical (tree-style) list with indented items and connector lines
   * Tree visuals are only applied when this prop is set to `'tree'`.
   * Ignored by default.
   * @default 'default'
   */
  variant?: 'default' | 'tree';
  /**
   * Restricts the height of the items; they scroll when they are taller. A `Dropdown.Footer` stays
   * in place below them and adds to the panel's height.
   * - `number` – fixed max height in pixels
   * - `string` – any valid CSS length (e.g. `'20rem'`, `'50vh'`)
   *
   * Prefer rem, so the maximum height scales with the user's font size.
   * @default undefined (no restriction)
   */
  maxHeight?: number | string;
};

export interface DropdownProps extends BreakpointSupport<DropdownBreakpointProps> {
  /**
   * Child elements — must include exactly one `Dropdown.Trigger` and one `Dropdown.Content`
   */
  children: React.ReactNode;
  /**
   * When `true`, the dropdown behaves like a modal:
   * - Traps focus inside the dropdown
   * - Shows a visually hidden "Close" button for screen readers
   * - Usually used for menus that require explicit dismissal
   *
   * @default false
   */
  modal?: boolean;
  /**
   * Controlled open state
   */
  open?: boolean;
  /**
   * Uncontrolled default state
   */
  defaultOpen?: boolean;
  /**
   * Change handler (fires for both modes)
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Index of the item focused when the dropdown opens, such as the current selection; without it the
   * first item, or the first control of a `Dropdown.Header`.
   */
  defaultActiveIndex?: number;
  /**
   * Navigation mode — use when the dropdown lists **links** (e.g. collapsed breadcrumbs) rather than
   * menu commands. Drops the `menu` / `menuitem` roles, `aria-haspopup="menu"` and roving tabindex, so
   * screen readers announce the items as links and each is a normal Tab stop. Keep it `false` (default)
   * for action menus.
   * @default false
   */
  navigation?: boolean;
  /**
   * Close the dropdown when the page or any scrollable ancestor of the trigger scrolls.
   * Scrolling the dropdown's own items keeps it open.
   * @default false
   */
  hideOnScroll?: boolean;
  /**
   * Additional class name(s) for the dropdown panel.
   */
  className?: string;
}

export const Dropdown = (props: DropdownProps) => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const {
    children,
    modal = false,
    divided = false,
    width = 'auto',
    variant = 'default',
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    defaultActiveIndex,
    placement = 'bottom-start',
    maxHeight,
    navigation = false,
    hideOnScroll = false,
    className,
  } = getCurrentBreakpointProps<DropdownProps>(props);
  const { getLabel } = useLabels();
  const nodeId = useFloatingNodeId();
  const contentId = React.useId();

  const listItemsRef = React.useRef<Array<HTMLButtonElement | null>>([]);
  const headerRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(defaultActiveIndex ?? null);
  const [content, setContent] = React.useState<React.ReactNode>(null);
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);

  const open = controlledOpen ?? uncontrolledOpen;

  const isType = (type: React.ElementType) => (node: React.ReactNode) =>
    React.isValidElement(node) && node.type === type;
  const isHeader = isType(DropdownHeader);
  const isFooter = isType(DropdownFooter);
  const flatten = (nodes: React.ReactNode): React.ReactNode[] =>
    React.Children.toArray(nodes).flatMap((node) =>
      React.isValidElement<{ children?: React.ReactNode }>(node) && node.type === React.Fragment
        ? flatten(node.props.children).map((child) =>
            React.isValidElement(child) ? React.cloneElement(child, { key: `${node.key}${child.key}` }) : child
          )
        : [node]
    );
  const contentNodes = flatten(content);
  const header = contentNodes.filter(isHeader);
  const footer = contentNodes.filter(isFooter);
  const hasChrome = header.length > 0 || footer.length > 0;
  const itemNodes = hasChrome ? contentNodes.filter((node) => !isHeader(node) && !isFooter(node)) : content;

  React.useEffect(() => {
    if (!open) setActiveIndex(defaultActiveIndex ?? null);
  }, [open, defaultActiveIndex]);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) {
        setUncontrolledOpen(next);
      }
      onOpenChange?.(next);
    },
    [controlledOpen, onOpenChange]
  );

  const floating = useFloating({
    nodeId,
    open,
    placement,
    onOpenChange: setOpen,
    middleware: [
      offset(DROPDOWN_OFFSET),
      flip(),
      shift(),
      size({
        // Re-measured on every position update, so it follows the trigger when it resizes.
        apply({ rects, elements }) {
          const { style } = elements.floating;
          if (width === 'auto') style.setProperty('--_tedi-dropdown-trigger-width', `${rects.reference.width}px`);
          else style.removeProperty('--_tedi-dropdown-trigger-width');
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const { context, refs, x, y, strategy } = floating;

  const interactions = useInteractions([
    useClick(context),
    // In navigation mode the popup is a list of links, not a menu — disable the menu role and the
    // roving-tabindex list navigation so items stay plain, tabbable links.
    useRole(context, { role: 'menu', enabled: !navigation }),
    useDismiss(context, { ancestorScroll: hideOnScroll }),
    useListNavigation(context, {
      listRef: listItemsRef,
      activeIndex,
      onNavigate: setActiveIndex,
      loop: true,
      selectedIndex: defaultActiveIndex ?? null,
      focusItemOnOpen: !header.length,
      focusItemOnHover: false,
      enabled: !navigation,
    }),
  ]);

  const value: DropdownContextValue = {
    open,
    setOpen,
    refs,
    listItemsRef,
    activeIndex,
    setActiveIndex,
    placement,
    content,
    setContent,
    divided,
    variant,
    navigation,
    contentId,
    headerRef,
    ...interactions,
  };

  const reference = refs.reference.current as HTMLElement | null;
  const triggerWidth = width === 'trigger' ? reference?.getBoundingClientRect().width : undefined;
  const containerWidth =
    width === 'full'
      ? (reference?.offsetParent as HTMLElement | null | undefined)?.getBoundingClientRect().width
      : undefined;

  const items =
    maxHeight !== undefined ? (
      <div
        className={styles['tedi-dropdown__scroll']}
        role="group"
        tabIndex={0}
        style={{ maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }}
      >
        {itemNodes}
      </div>
    ) : (
      itemNodes
    );

  const menuProps: React.HTMLAttributes<HTMLElement> = navigation
    ? { id: contentId }
    : {
        role: 'menu',
        'aria-orientation': 'vertical',
        'aria-activedescendant': activeIndex !== null ? `dropdown-item-${activeIndex}` : undefined,
      };

  const floatingProps = interactions.getFloatingProps({
    ref: refs.setFloating,
    className: cn(styles['tedi-dropdown'], className),
    style: {
      position: strategy,
      left: x,
      top: y,
      width: resolveDropdownWidth(width, triggerWidth, containerWidth),
    },
    ...(hasChrome ? {} : menuProps),
  });

  // With a header or footer, the menu role and its ARIA attributes (including the id the trigger's
  // `aria-controls` points to) move to the items' wrapper.
  const panelProps: React.HTMLAttributes<HTMLElement> = { ...floatingProps };
  if (hasChrome && !navigation) {
    const moved = ['role', 'id', 'aria-labelledby', 'aria-orientation', 'aria-activedescendant'] as const;
    moved.forEach((name) => {
      if (panelProps[name] !== undefined) Object.assign(menuProps, { [name]: panelProps[name] });
      delete panelProps[name];
    });
  }

  // ArrowDown from a header control moves to the first item; ArrowUp on the first item comes back.
  const handleHeaderKeys = (event: React.KeyboardEvent) => {
    const headerEl = headerRef.current;
    if (!headerEl || navigation || (event.key !== 'ArrowDown' && event.key !== 'ArrowUp')) return;

    const target = event.target as HTMLElement;
    const firstIndex = listItemsRef.current.findIndex(
      (item) => !!item && !item.disabled && item.getAttribute('aria-disabled') !== 'true'
    );
    const firstItem = listItemsRef.current[firstIndex];
    const headerControl = headerEl.querySelector<HTMLElement>(HEADER_FOCUSABLE);

    if (event.key === 'ArrowDown' && headerEl.contains(target) && !target.closest(OWN_ARROW_KEYS) && firstItem) {
      event.preventDefault();
      event.stopPropagation();
      setActiveIndex(firstIndex);
      firstItem.focus();
    } else if (event.key === 'ArrowUp' && target === firstItem && headerControl) {
      event.preventDefault();
      event.stopPropagation();
      headerControl.focus();
    }
  };

  return (
    <DropdownContext.Provider value={value}>
      {children}

      <FloatingPortal>
        {open && (
          <FloatingFocusManager
            context={context}
            modal={modal}
            visuallyHiddenDismiss={modal ? getLabel('close') : false}
          >
            <div {...panelProps} onKeyDownCapture={handleHeaderKeys} data-placement={placement} data-state="open">
              {header}
              {hasChrome ? (
                <div
                  {...menuProps}
                  className={styles['tedi-dropdown__menu']}
                  data-dropdown-header={header.length ? '' : undefined}
                  data-dropdown-footer={footer.length ? '' : undefined}
                >
                  {items}
                </div>
              ) : (
                items
              )}
              {footer}
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </DropdownContext.Provider>
  );
};

Dropdown.displayName = 'Dropdown';

Dropdown.Trigger = DropdownTrigger;
Dropdown.Content = DropdownContent;
Dropdown.Item = DropdownItem;
Dropdown.Separator = DropdownSeparator;
Dropdown.Group = DropdownGroup;
Dropdown.Header = DropdownHeader;
Dropdown.Footer = DropdownFooter;
