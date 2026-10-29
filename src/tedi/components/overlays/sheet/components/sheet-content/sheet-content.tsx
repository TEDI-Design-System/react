import { FloatingFocusManager, FloatingOverlay, FloatingPortal, useTransitionStatus } from '@floating-ui/react';
import cn from 'classnames';
import {
  ComponentProps,
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../../../helpers';
import { useLabels } from '../../../../../providers/label-provider';
import styles from '../../sheet.module.scss';
import { useSheetContext } from '../../sheet-context';

const DRAG_DISMISS_THRESHOLD = 120;
const DRAG_EXPAND_THRESHOLD = 40;
// A press only becomes a drag after moving this far, so a tap on the header stays a tap.
const DRAG_START_THRESHOLD_TOUCH = 10;
const DRAG_START_THRESHOLD_MOUSE = 2;
const DRAG_ZONE_SELECTOR = `.${styles['tedi-sheet__handle-zone']}, .${styles['tedi-sheet__header']}`;
// Presses on interactive header content never drag.
const NO_DRAG_SELECTOR = [
  'a[href]',
  'button',
  'input',
  'select',
  'textarea',
  'label',
  '[contenteditable]:not([contenteditable="false"])',
  '[role="button"]',
  '[role="link"]',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

const closestInside = (target: Element, selector: string, panel: Element) => {
  const match = target.closest(selector);
  return match !== null && match !== panel && panel.contains(match);
};

type SheetContentBreakpointProps = {
  /**
   * Top-corner radius of the sheet panel (the header follows it). Overrides the default sheet radius,
   * and can be set per breakpoint via the `BreakpointSupport` API (e.g.
   * `<Sheet.Content radius="none" md={{ radius: 'card' }} />`).
   * - `default` — the standard sheet radius.
   * - `card` — matches a `Card`'s rounded corners (`--card-radius-rounded`).
   * - `none` — square corners.
   *
   * For any other value, set the `--tedi-sheet-radius` custom property via `style`.
   * @default default
   */
  radius?: 'default' | 'card' | 'none';
};

export interface SheetContentProps extends BreakpointSupport<SheetContentBreakpointProps> {
  /**
   * `<Sheet.Header>`, `<Sheet.Body>`, `<Sheet.Footer>` and any other content.
   */
  children: ReactNode;
  /**
   * Show the drag handle at the top. While it's shown, the sheet can be dragged from the handle or
   * from anywhere on `<Sheet.Header>` except its interactive content.
   * @default true
   */
  showHandle?: boolean;
  /**
   * Trap focus inside the sheet while open.
   * @default true
   */
  trapFocus?: boolean;
  /**
   * Restore focus to the trigger after closing.
   * @default true
   */
  returnFocus?: boolean;
  /**
   * Render the dimmed backdrop. `false` keeps portal + focus management but no overlay.
   *
   * On its own this only removes the backdrop: scroll stays locked and a click on the page still
   * closes the sheet. For a non-modal sheet the page stays usable behind (docked peek), also set
   * `trapFocus={false}`, `lockScroll={false}` and `Sheet`'s `closeOnBackdropClick={false}`.
   * @default true
   */
  showOverlay?: boolean;
  /**
   * Lock background scroll while open.
   * @default true
   */
  lockScroll?: boolean;
  /**
   * Keep the panel mounted while closed instead of removing it from the DOM. Preserves its content
   * and internal state (form values, scroll position) across close / reopen. The kept panel is
   * inert (`hidden`) while closed.
   * @default false
   */
  keepMounted?: boolean;
  /**
   * Rest positions for the sheet, as fractions of the viewport height (`0`–`1`), e.g. `[0.4, 0.9]`.
   * Drag the handle or header to move between them; releasing snaps to the nearest, and dragging below the
   * lowest point dismisses.
   */
  snapPoints?: number[];
  /**
   * Index into the sorted `snapPoints` for the initial rest position, clamped to the available range.
   * Defaults to the tallest (last) snap. The selected snap point is retained across close / reopen.
   */
  defaultSnapPoint?: number;
  /**
   * Called with the fraction the sheet snapped to after a drag settles.
   */
  onSnapPointChange?: (snapPoint: number) => void;
  /**
   * Render visually-hidden dismiss buttons at the start and end of the dialog
   * so touch screen-readers can escape without an Escape key. Only applies while
   * `trapFocus` is `true` (a modal sheet); set `false` to opt out.
   * @default true
   */
  visuallyHiddenDismiss?: boolean;
  /**
   * Override the dialog's labelling element. Only needed when the label lives
   * outside `<Sheet.Header>` - the header wires this automatically.
   */
  'aria-labelledby'?: string;
  /**
   * Plain-text accessible name. Use when there's no visible title. Ignored when
   * `aria-labelledby` is set.
   */
  'aria-label'?: string;
  /**
   * Element to focus on open. Tabbable index (`0` = first tabbable, `-1` = dialog
   * container) or a ref.
   */
  initialFocus?: ComponentProps<typeof FloatingFocusManager>['initialFocus'];
  /**
   * Minimum height of the sheet panel (any CSS length, e.g. `'60dvh'`). Keeps the sheet from
   * shrinking as its content shrinks - useful when a search or filter reduces the body but the
   * sheet should stay put rather than collapsing around the results.
   */
  minHeight?: CSSProperties['minHeight'];
  /**
   * Maximum height of the sheet panel (any CSS length, e.g. `'80dvh'`). Defaults to `90dvh`; when
   * the content is taller than this the body scrolls and the panel never exceeds the viewport.
   * Ignored while `snapPoints` are set (the tallest snap caps the height instead).
   */
  maxHeight?: CSSProperties['maxHeight'];
  /**
   * Padding scale for the whole sheet - header, body and footer tighten together.
   * - `default` - the standard sheet padding (`1rem`).
   * - `small` - a denser layout (`0.5rem`), for compact or data-heavy sheets.
   *
   * Note: this is the sheet-wide padding *size*. To drop body padding entirely (edge-to-edge
   * content) use `Sheet.Body`'s own `padding="none"`.
   * @default default
   */
  padding?: 'default' | 'small';
  /**
   * Additional class name on the sheet panel.
   */
  className?: string;
  /**
   * Inline style applied to the sheet panel - handy for a custom `maxWidth`.
   */
  style?: CSSProperties;
}

export const SheetContent = (props: SheetContentProps): JSX.Element | null => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const { radius = 'default' } = getCurrentBreakpointProps<SheetContentBreakpointProps>(props);

  const {
    children,
    showHandle = true,
    trapFocus = true,
    returnFocus = true,
    showOverlay = true,
    lockScroll = true,
    keepMounted = false,
    visuallyHiddenDismiss = true,
    initialFocus,
    minHeight,
    maxHeight,
    padding = 'default',
    className,
    style,
  } = props;

  const { getLabel } = useLabels();
  const { open, floating, getFloatingProps, context, labelId, onOpenChange, collapsed, onCollapsedChange } =
    useSheetContext();
  const { isMounted, status } = useTransitionStatus(context, { duration: { open: 350, close: 300 } });

  const { snapPoints, defaultSnapPoint, onSnapPointChange } = props;
  const snaps = useMemo(() => (snapPoints ? [...snapPoints].sort((a, b) => a - b) : []), [snapPoints]);
  // Snap points are suspended while collapsed, so the panel shrinks to its header and an upward drag expands it.
  const hasSnaps = snaps.length > 0 && !collapsed;
  const maxSnap = snaps[snaps.length - 1] ?? 1;
  // `null` until the user drags: the default (tallest snap) is then resolved against the current
  // `snapPoints`, so snap points that arrive after mount still open at the tallest one.
  const [snapIndex, setSnapIndex] = useState<number | null>(defaultSnapPoint ?? null);
  const resolvedSnapIndex = snapIndex ?? snaps.length - 1;
  const currentSnap = snaps[Math.max(0, Math.min(resolvedSnapIndex, snaps.length - 1))] ?? maxSnap;

  const viewportHeight = () => (typeof window !== 'undefined' ? window.innerHeight : 0);
  const snapHeightPx = (snap: number) => snap * viewportHeight();

  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    target: HTMLDivElement;
    started: boolean;
  } | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);

  const resetDrag = useCallback(() => {
    const drag = dragRef.current;
    if (!drag) return;
    dragRef.current = null;
    setDragging(false);
    setDragOffset(0);
    if (drag.target.hasPointerCapture(drag.pointerId)) {
      drag.target.releasePointerCapture(drag.pointerId);
    }
  }, []);

  useEffect(() => {
    resetDrag();
  }, [open, collapsed, showHandle, resetDrag]);

  useEffect(() => {
    if (!dragging) return;
    const ownerWindow = dragRef.current?.target.ownerDocument.defaultView;
    ownerWindow?.addEventListener('blur', resetDrag);
    return () => ownerWindow?.removeEventListener('blur', resetDrag);
  }, [dragging, resetDrag]);

  const handleDragStart = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!open || !showHandle || event.button !== 0 || event.ctrlKey || dragRef.current !== null) return;

    const { target, currentTarget } = event;
    if (!(target instanceof Element) || !closestInside(target, DRAG_ZONE_SELECTOR, currentTarget)) return;
    if (closestInside(target, NO_DRAG_SELECTOR, currentTarget)) return;

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      target: currentTarget,
      started: false,
    };
  };

  const handleDragMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag?.pointerId !== event.pointerId) return;
    if (event.pointerType === 'mouse' && (event.buttons & 1) === 0) {
      resetDrag();
      return;
    }
    const delta = event.clientY - drag.startY;

    if (!drag.started) {
      const deltaX = event.clientX - drag.startX;
      const threshold = event.pointerType === 'touch' ? DRAG_START_THRESHOLD_TOUCH : DRAG_START_THRESHOLD_MOUSE;
      if (Math.max(Math.abs(delta), Math.abs(deltaX)) < threshold) return;
      // A mostly horizontal swipe isn't a sheet drag.
      if (Math.abs(deltaX) > Math.abs(delta)) {
        resetDrag();
        return;
      }
      drag.started = true;
      setDragging(true);
      drag.target.setPointerCapture(drag.pointerId);
    }

    setDragOffset(hasSnaps ? delta : Math.max(0, delta));
  };

  const handleDragEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (drag?.pointerId !== event.pointerId) return;
    const delta = event.clientY - drag.startY;
    resetDrag();
    if (!drag.started) return;

    if (hasSnaps) {
      const height = snapHeightPx(currentSnap) - delta;
      if (height < snapHeightPx(snaps[0]) - DRAG_DISMISS_THRESHOLD) {
        onOpenChange(false);
      } else {
        let nearest = 0;
        let best = Infinity;
        snaps.forEach((snap, index) => {
          const distance = Math.abs(snapHeightPx(snap) - height);
          if (distance < best) {
            best = distance;
            nearest = index;
          }
        });
        setSnapIndex(nearest);
        onSnapPointChange?.(snaps[nearest]);
      }
    } else if (collapsed && delta < -DRAG_EXPAND_THRESHOLD) {
      onCollapsedChange(false);
    } else if (delta > DRAG_DISMISS_THRESHOLD) {
      onOpenChange(false);
    }
  };

  const handleDragCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId === event.pointerId) resetDrag();
  };

  if (!isMounted && !keepMounted) return null;

  const panelClassName = cn(
    styles['tedi-sheet__panel'],
    {
      [styles['tedi-sheet__panel--padding-small']]: padding === 'small',
      [styles['tedi-sheet__panel--draggable']]: showHandle,
    },
    className
  );

  const active = isMounted;

  const ariaLabelledBy = props['aria-labelledby'] ?? (labelId || undefined);
  const ariaLabel = !ariaLabelledBy ? props['aria-label'] : undefined;

  const radiusOverride = radius === 'card' ? 'var(--card-radius-rounded)' : radius === 'none' ? '0' : undefined;
  const panelStyle: CSSProperties = {
    ...(radiusOverride ? ({ '--tedi-sheet-radius': radiusOverride } as CSSProperties) : undefined),
    // Like snap points, `minHeight` is dropped while collapsed so the panel can shrink to its header.
    ...(minHeight !== undefined && !collapsed ? { minHeight } : undefined),
    ...(maxHeight !== undefined && !hasSnaps ? { maxHeight } : undefined),
    ...style,
  };
  if (hasSnaps) {
    panelStyle.maxHeight = `${maxSnap * 100}dvh`;
    if (dragging) {
      const height = Math.min(maxSnap * viewportHeight(), Math.max(0, snapHeightPx(currentSnap) - dragOffset));
      panelStyle.height = `${height}px`;
      panelStyle.transition = 'none';
    } else {
      panelStyle.height = `${currentSnap * 100}dvh`;
    }
  } else if (dragOffset > 0) {
    panelStyle.transform = `translateY(${dragOffset}px)`;
    panelStyle.transition = 'none';
  }

  return (
    <FloatingPortal>
      <FloatingOverlay
        lockScroll={lockScroll && active}
        // `FloatingOverlay` sets `overflow: auto` inline, so overriding it needs an inline style too.
        style={{ overflow: 'clip' }}
        data-status={status}
        className={cn(styles['tedi-sheet__overlay'], {
          [styles['tedi-sheet__overlay--no-overlay']]: !showOverlay,
          [styles['tedi-sheet__overlay--hidden']]: !active,
        })}
      >
        <FloatingFocusManager
          context={context}
          disabled={!active}
          modal={trapFocus}
          closeOnFocusOut={false}
          returnFocus={returnFocus}
          initialFocus={initialFocus}
          visuallyHiddenDismiss={trapFocus && visuallyHiddenDismiss && active ? getLabel('sheet.close') : undefined}
        >
          <div
            {...getFloatingProps({
              ref: floating,
              hidden: !active,
              'aria-labelledby': ariaLabelledBy,
              'aria-label': ariaLabel,
              'aria-modal': trapFocus,
              style: panelStyle,
              className: panelClassName,
              onPointerDown: handleDragStart,
              onPointerMove: handleDragMove,
              onPointerUp: handleDragEnd,
              onPointerCancel: handleDragCancel,
              onLostPointerCapture: handleDragCancel,
              onContextMenu: resetDrag,
            })}
            data-status={status}
          >
            {showHandle && (
              <div className={styles['tedi-sheet__handle-zone']} data-name="sheet-handle" aria-hidden="true">
                <span className={styles['tedi-sheet__handle']} />
              </div>
            )}
            {children}
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
};

SheetContent.displayName = 'Sheet.Content';
export default SheetContent;
