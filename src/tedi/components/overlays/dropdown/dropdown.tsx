import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  Placement,
  shift,
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
import { resolveDropdownWidth } from './dropdown-helpers';
import { DropdownItem } from './dropdown-item/dropdown-item';
import { DropdownSeparator } from './dropdown-separator/dropdown-separator';
import { DropdownTrigger } from './dropdown-trigger/dropdown-trigger';

const DROPDOWN_OFFSET = 4;

type DropdownBreakpointProps = {
  /**
   * When `true` there is a border between the dropdown items
   *  @default false
   */
  divided?: boolean;
  /**
   * Controls the width of the dropdown menu.
   * - `'auto'` – width is determined by content (default)
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
   * Index of the item that should be focused when the dropdown opens.
   *
   * Pass the index of the "current selection" so the user can arrow-key or
   * Enter/Space to reconfirm without first pressing an arrow. Omit (or pass
   * `undefined`) to keep the default behaviour — no item is pre-focused and
   * the user has to press an arrow key to start navigating.
   */
  defaultActiveIndex?: number;
  /*
   * Additional class name(s) to apply to the dropdown container
   * @default undefined
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
    className,
  } = getCurrentBreakpointProps<DropdownProps>(props);
  const { getLabel } = useLabels();
  const nodeId = useFloatingNodeId();

  const listItemsRef = React.useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(defaultActiveIndex ?? null);
  const [content, setContent] = React.useState<React.ReactNode>(null);
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);

  const open = controlledOpen ?? uncontrolledOpen;

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
    middleware: [offset(DROPDOWN_OFFSET), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const { context, refs, x, y, strategy } = floating;

  const interactions = useInteractions([
    useClick(context),
    useRole(context, { role: 'menu' }),
    useDismiss(context),
    useListNavigation(context, {
      listRef: listItemsRef,
      activeIndex,
      onNavigate: setActiveIndex,
      loop: true,
      selectedIndex: defaultActiveIndex ?? null,
      focusItemOnOpen: defaultActiveIndex !== undefined ? true : 'auto',
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
    ...interactions,
  };

  const triggerWidth = refs.reference.current?.getBoundingClientRect().width;
  const containerWidth = React.useMemo(() => {
    const ref = refs.reference.current as HTMLElement | null;
    if (!ref) return undefined;

    const container = ref.offsetParent as HTMLElement | null;
    if (!container) return undefined;

    return container.getBoundingClientRect().width;
  }, [refs.reference.current]);

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
            <div
              {...interactions.getFloatingProps({
                ref: refs.setFloating,
                className: cn(
                  styles['tedi-dropdown'],
                  { [styles[`tedi-dropdown--${variant}`]]: variant === 'tree' },
                  className
                ),
                style: {
                  position: strategy,
                  left: x ?? 0,
                  top: y ?? 0,
                  width: resolveDropdownWidth(width, triggerWidth, containerWidth),
                },
                role: 'menu',
                'aria-orientation': 'vertical',
                'aria-activedescendant': activeIndex !== null ? `dropdown-item-${activeIndex}` : undefined,
              })}
              data-placement={placement}
              data-state={open ? 'open' : 'closed'}
            >
              {content}
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </DropdownContext.Provider>
  );
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.Content = DropdownContent;
Dropdown.Item = DropdownItem;
Dropdown.Separator = DropdownSeparator;
