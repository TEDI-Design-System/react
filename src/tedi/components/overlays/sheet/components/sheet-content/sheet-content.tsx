import { FloatingFocusManager, FloatingOverlay, FloatingPortal, useTransitionStatus } from '@floating-ui/react';
import cn from 'classnames';
import {
  ComponentProps,
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  ReactNode,
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
   * Show the drag handle at the top.
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
   * Drag the handle to move between them; releasing snaps to the nearest, and dragging below the
   * lowest point dismisses.
   */
  snapPoints?: number[];
  /**
   * Index into `snapPoints` for the initial rest position. Defaults to the tallest (last) snap.
   */
  defaultSnapPoint?: number;
  /**
   * Called with the fraction the sheet snapped to after a drag settles.
   */
  onSnapPointChange?: (snapPoint: number) => void;
  /**
   * Render visually-hidden dismiss buttons at the start and end of the dialog
   * so touch screen-readers can escape without an Escape key.
   * @default false
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
   * Additional class name on the sheet panel.
   */
  className?: string;
  /**
   * Inline style applied to the sheet panel - handy for a custom `maxHeight` / `maxWidth`.
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
    visuallyHiddenDismiss = false,
    initialFocus,
    className,
    style,
  } = props;

  const { getLabel } = useLabels();
  const { floating, getFloatingProps, context, labelId, onOpenChange, collapsed, onCollapsedChange } =
    useSheetContext();
  const { isMounted, status } = useTransitionStatus(context, { duration: { open: 350, close: 300 } });

  const { snapPoints, defaultSnapPoint, onSnapPointChange } = props;
  const snaps = useMemo(() => (snapPoints ? [...snapPoints].sort((a, b) => a - b) : []), [snapPoints]);
  const hasSnaps = snaps.length > 0;
  const maxSnap = snaps[snaps.length - 1] ?? 1;
  const [snapIndex, setSnapIndex] = useState(() =>
    defaultSnapPoint !== undefined ? defaultSnapPoint : Math.max(0, snaps.length - 1)
  );
  const currentSnap = snaps[Math.min(snapIndex, snaps.length - 1)] ?? maxSnap;

  const viewportHeight = () => (typeof window !== 'undefined' ? window.innerHeight : 0);
  const snapHeightPx = (snap: number) => snap * viewportHeight();

  const dragStartRef = useRef<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);

  const handleDragStart = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragStartRef.current = event.clientY;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleDragMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStartRef.current === null) return;
    const delta = event.clientY - dragStartRef.current;

    setDragOffset(hasSnaps ? delta : Math.max(0, delta));
  };

  const handleDragEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStartRef.current === null) return;
    const delta = event.clientY - dragStartRef.current;
    dragStartRef.current = null;
    setDragging(false);
    event.currentTarget.releasePointerCapture?.(event.pointerId);

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
    setDragOffset(0);
  };

  if (!isMounted && !keepMounted) return null;

  const panelClassName = cn(styles['tedi-sheet__panel'], className);

  const active = isMounted;

  const ariaLabelledBy = props['aria-labelledby'] ?? (labelId || undefined);
  const ariaLabel = !ariaLabelledBy ? props['aria-label'] : undefined;

  const radiusOverride = radius === 'card' ? 'var(--card-radius-rounded)' : radius === 'none' ? '0' : undefined;
  const panelStyle: CSSProperties = {
    ...(radiusOverride ? ({ '--tedi-sheet-radius': radiusOverride } as CSSProperties) : undefined),
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
        style={{ overflow: 'clip', display: active ? undefined : 'none' }}
        data-status={status}
        className={cn(styles['tedi-sheet__overlay'], {
          [styles['tedi-sheet__overlay--no-overlay']]: !showOverlay,
        })}
      >
        <FloatingFocusManager
          context={context}
          disabled={!active}
          modal={trapFocus}
          returnFocus={returnFocus}
          initialFocus={initialFocus}
          visuallyHiddenDismiss={visuallyHiddenDismiss && active ? getLabel('sheet.close') : undefined}
        >
          <div
            {...getFloatingProps({
              ref: floating,
              hidden: !active,
              'aria-labelledby': ariaLabelledBy,
              'aria-label': ariaLabel,
              'aria-modal': trapFocus,
              'data-status': status,
              style: panelStyle,
              className: panelClassName,
            })}
          >
            {showHandle && (
              <div
                className={styles['tedi-sheet__handle-zone']}
                data-name="sheet-handle"
                aria-hidden="true"
                onPointerDown={handleDragStart}
                onPointerMove={handleDragMove}
                onPointerUp={handleDragEnd}
                onPointerCancel={handleDragEnd}
              >
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
