import { useClick, useDismiss, useFloating, useInteractions, useRole } from '@floating-ui/react';
import { ReactNode, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

import { SheetBody } from './components/sheet-body/sheet-body';
import { SheetCloser } from './components/sheet-closer/sheet-closer';
import { SheetContent } from './components/sheet-content/sheet-content';
import { SheetFooter } from './components/sheet-footer/sheet-footer';
import { SheetHeader } from './components/sheet-header/sheet-header';
import { SheetTrigger } from './components/sheet-trigger/sheet-trigger';
import { SheetContext, SheetContextValue } from './sheet-context';

export type SheetRole = 'dialog' | 'alertdialog';

export interface SheetProps {
  /**
   * `Sheet.Trigger`, `Sheet.Content` and any other content.
   */
  children: ReactNode;
  /**
   * Initial open state for uncontrolled usage.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Controlled open state. Provide together with `onToggle`.
   */
  open?: boolean;
  /**
   * Called whenever the sheet requests to open or close (trigger click, backdrop,
   * Escape, close button). Required to react to changes in controlled mode.
   */
  onToggle?: (open: boolean) => void;
  /**
   * Close the sheet when the backdrop is clicked.
   * @default true
   */
  closeOnBackdropClick?: boolean;
  /**
   * Close the sheet when Escape is pressed.
   * @default true
   */
  closeOnEscape?: boolean;
  /**
   * Initial collapsed state for uncontrolled usage. The sheet returns to this state each time it opens.
   * @default false
   */
  defaultCollapsed?: boolean;
  /**
   * Controlled collapsed state - collapsed to just its header (docked peek). Collapsing only hides the
   * body and footer, so their content and state are kept, unlike closing. Provide together with
   * `onCollapsedChange` to collapse or expand the sheet from outside (e.g. after a map interaction).
   */
  collapsed?: boolean;
  /**
   * Called whenever the sheet requests to collapse or expand (header toggle, drag handle).
   */
  onCollapsedChange?: (collapsed: boolean) => void;
  /**
   * ARIA role of the sheet dialog. Use `alertdialog` for interruptive confirmations.
   * @default dialog
   */
  role?: SheetRole;
}

export const Sheet = (props: SheetProps): JSX.Element => {
  const {
    children,
    defaultOpen = false,
    open: controlledOpen,
    onToggle,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    defaultCollapsed = false,
    collapsed: controlledCollapsed,
    onCollapsedChange,
    role = 'dialog',
  } = props;

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = typeof controlledOpen !== 'undefined';
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isCollapsedControlled = controlledCollapsed !== undefined;
  const collapsed = isCollapsedControlled ? controlledCollapsed : internalCollapsed;

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onToggle?.(next);
    },
    [isControlled, onToggle]
  );

  const handleCollapsedChange = useCallback(
    (next: boolean) => {
      if (!isCollapsedControlled) setInternalCollapsed(next);
      onCollapsedChange?.(next);
    },
    [isCollapsedControlled, onCollapsedChange]
  );

  // An uncontrolled sheet returns to `defaultCollapsed` each time it opens (not on mount, so a
  // `defaultOpen` + `defaultCollapsed` sheet starts collapsed).
  const wasOpenRef = useRef(isOpen);

  useEffect(() => {
    if (isOpen && !wasOpenRef.current && !isCollapsedControlled) setInternalCollapsed(defaultCollapsed);
    wasOpenRef.current = isOpen;
  }, [isOpen, isCollapsedControlled, defaultCollapsed]);

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: handleOpenChange,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context, { role }),
    useDismiss(context, {
      enabled: closeOnBackdropClick || closeOnEscape,
      escapeKey: closeOnEscape,
      outsidePress: closeOnBackdropClick,
    }),
  ]);

  const baseId = useId();
  const labelId = `${baseId}-label`;
  const [hasTitle, setHasTitle] = useState(false);

  const value = useMemo<SheetContextValue>(
    () => ({
      open: isOpen,
      onOpenChange: handleOpenChange,
      reference: refs.setReference,
      floating: refs.setFloating,
      getReferenceProps,
      getFloatingProps,
      context,
      labelId: hasTitle ? labelId : '',
      setHasTitle,
      collapsed,
      onCollapsedChange: handleCollapsedChange,
    }),
    [
      isOpen,
      handleOpenChange,
      refs.setReference,
      refs.setFloating,
      getReferenceProps,
      getFloatingProps,
      context,
      hasTitle,
      labelId,
      collapsed,
      handleCollapsedChange,
    ]
  );

  return <SheetContext.Provider value={value}>{children}</SheetContext.Provider>;
};

Sheet.Trigger = SheetTrigger;
Sheet.Content = SheetContent;
Sheet.Header = SheetHeader;
Sheet.Body = SheetBody;
Sheet.Footer = SheetFooter;
Sheet.Closer = SheetCloser;

Sheet.displayName = 'Sheet';
export default Sheet;
