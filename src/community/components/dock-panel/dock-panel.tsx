'use client';

import { enableFocusInside } from '@floating-ui/react/utils';
import cn from 'classnames';
import {
  CSSProperties,
  JSX,
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { createPortal } from 'react-dom';

import { Heading, HeadingProps } from '../../../tedi/components/base/typography/heading/heading';
import { Button } from '../../../tedi/components/buttons/button/button';
import { ClosingButton } from '../../../tedi/components/buttons/closing-button/closing-button';
import { CollapseButton } from '../../../tedi/components/buttons/collapse-button/collapse-button';
import { Sheet } from '../../../tedi/components/overlays/sheet/sheet';
import { isBreakpointBelow, useBreakpoint } from '../../../tedi/helpers';
import { Resizer } from '../map-components/resizer/resizer';
import styles from './dock-panel.module.scss';

export type DockPanelPlacement = 'left' | 'right' | 'top' | 'bottom';
export type DockPanelSize = 'default' | 'small';
/** Percentages of the workspace dimension: xs=25%, sm=35%, md=50%, lg=65%, xl=80%. */
export type DockPanelDimensionPreset = keyof typeof DIMENSION_PERCENTAGES;
export type DockPanelWidth = DockPanelDimensionPreset | CSSProperties['width'];
export type DockPanelHeight = DockPanelDimensionPreset | CSSProperties['height'];

const DIMENSION_PERCENTAGES = {
  xs: '25%',
  sm: '35%',
  md: '50%',
  lg: '65%',
  xl: '80%',
} as const;

const resizeHandleByPlacement: Record<DockPanelPlacement, DockPanelPlacement> = {
  left: 'right',
  right: 'left',
  top: 'bottom',
  bottom: 'top',
};

const isDimensionPreset = (value: DockPanelWidth | DockPanelHeight): value is DockPanelDimensionPreset =>
  typeof value === 'string' && Object.prototype.hasOwnProperty.call(DIMENSION_PERCENTAGES, value);

const resolveCssDimension = (value: DockPanelWidth | DockPanelHeight): string | undefined => {
  if (isDimensionPreset(value)) {
    return DIMENSION_PERCENTAGES[value];
  }

  if (typeof value === 'number') {
    return `${value}px`;
  }

  return value;
};

export interface DockPanelLabels {
  /** Accessible name for the minimize button. */
  collapse: string;
  /** Accessible name for the restore button. */
  expand: string;
  /** Accessible name for the close button. */
  close: string;
}

export interface DockPanelProps {
  /** Visible heading and accessible name. */
  title: string;
  /** Text below the title, hidden while minimized. Omitted or empty text adds no spacing. */
  description?: string;
  /** Panel content, kept mounted while minimized. */
  children: ReactNode;
  /** Translated accessible names for the panel controls. */
  labels: DockPanelLabels;
  /**
   * Edge of the containing workspace.
   * @default right
   */
  placement?: DockPanelPlacement;
  /**
   * Header, content and footer padding using TEDI Modal density tokens, independent of dimensions.
   * @default default
   */
  size?: DockPanelSize;
  /**
   * Enables resizing from the workspace-facing edge.
   * The configured width/height supplies the initial size; dragging then uses pixels.
   * Minimize/restore preserves content and resized dimensions.
   * @default false
   */
  resizable?: boolean;
  /**
   * Use the bottom sheet (true) or docked panel (false).
   * When omitted, follows TEDI's below-md breakpoint.
   * Changing presentation preserves content, except when mobile changes to or from false.
   */
  mobile?: boolean;
  /**
   * Controlled minimized state. Apply changes requested by onCollapsedChange.
   * Omit to use internal state initialized from defaultCollapsed.
   */
  collapsed?: boolean;
  /**
   * Initial uncontrolled minimized state; ignored when collapsed is supplied.
   * Later changes have no effect.
   * @default false
   */
  defaultCollapsed?: boolean;
  /**
   * Application-owned minimize counter. The initial value is ignored.
   * Later changes request minimization only while expanded.
   * In controlled mode, the parent applies onCollapsedChange(true).
   */
  minimizeCounter?: number;
  /**
   * Receives the next minimized state requested by the toggle, minimizeCounter,
   * or a drag or Escape in the bottom sheet.
   */
  onCollapsedChange?: (collapsed: boolean) => void;
  /**
   * Shows the close button and requests dismissal without changing the minimized state.
   * Dragging a minimized bottom sheet down also requests it.
   * The application handles removal, unsaved-change confirmation and focus restoration.
   */
  onClose?: () => void;
  /** Content before the controls. Hidden but kept mounted while minimized. */
  headerActions?: ReactNode;
  /** Content below the scroll area. Hidden but kept mounted while minimized. */
  footer?: ReactNode;
  /**
   * Expanded width for left/right placement; ignored for top/bottom.
   * Accepts presets, CSS lengths or pixel numbers, limited to the workspace width.
   * @default xs
   */
  width?: DockPanelWidth;
  /** Minimum side-panel resize width in pixels. Defaults to 8% of the workspace width. */
  minWidth?: number;
  /** Maximum side-panel width in pixels. Defaults to 92% when resizable; otherwise the workspace width. */
  maxWidth?: number;
  /**
   * Expanded height for any placement. Accepts presets, CSS lengths, pixel numbers or auto.
   * Use auto with maxHeight for content height with a scrolling limit.
   * Minimized side rails always fill the workspace height.
   * @default 100% for left/right; 50% for top/bottom
   */
  height?: DockPanelHeight;
  /** Minimum top/bottom resize height in pixels. Defaults to 8% of the workspace height. */
  minHeight?: number;
  /**
   * Maximum expanded height in pixels.
   * Body content scrolls at this limit. Very shallow panels also scroll the header.
   * @default 92% of workspace height for top/bottom resizing; otherwise the workspace height
   */
  maxHeight?: number;
  /**
   * Title heading tag and expanded text size. Minimized titles always use compact text.
   * The bottom sheet uses only the tag.
   * @default h3 (h4 when size is small)
   */
  headingElement?: HeadingProps['element'];
  /** Panel id for external controls, on the content element in the bottom sheet. Generated when omitted. */
  id?: string;
  /** Additional panel class names. */
  className?: string;
  /** Panel styles, including docked stacking order and CSS custom properties. */
  style?: CSSProperties;
}

type DockPanelStyle = CSSProperties & {
  '--dock-panel-width'?: string;
  '--dock-panel-max-width'?: string;
  '--dock-panel-height'?: string;
  '--dock-panel-max-height'?: string;
};

const subscribeToNothing = () => () => undefined;

const useContentSlot = (content: ReactNode, inline: boolean) => {
  // Portals can't render on the server or during hydration.
  const isClient = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false
  );
  const nodeRef = useRef<HTMLDivElement | null>(null);
  if (!inline && isClient && !nodeRef.current) {
    nodeRef.current = document.createElement('div');
    nodeRef.current.className = styles['tedi-dock-panel__slot'];
  }
  const node = nodeRef.current;
  const attach = useCallback(
    (host: HTMLElement | null) => {
      if (!node) return;
      if (!host) {
        // A host switching to inline content would otherwise keep the emptied node.
        node.remove();
        return;
      }
      // FloatingPortal leaves tabindex="-1" on content that moves out of it while focus is outside.
      enableFocusInside(node);
      host.appendChild(node);
    },
    [node]
  );
  // The Fragment keeps falsy content such as 0: React replaces falsy portal children on update.
  const portal = node && createPortal(<>{content}</>, node);
  return inline ? { node: null, host: { children: content }, portal: null } : { node, host: { ref: attach }, portal };
};

export const DockPanel = (props: DockPanelProps): JSX.Element => {
  const {
    title,
    description,
    children,
    labels,
    placement = 'right',
    size = 'default',
    resizable = false,
    mobile,
    collapsed,
    defaultCollapsed = false,
    minimizeCounter,
    onCollapsedChange,
    onClose,
    headerActions,
    footer,
    width,
    height,
    headingElement,
    id,
    className,
    style,
  } = props;

  const generatedId = useId();
  const panelId = id ?? `tedi-dock-panel-${generatedId}`;
  const titleId = `${panelId}-title`;
  const bodyId = `${panelId}-body`;
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isControlled = collapsed !== undefined;
  const previousMinimizeCounter = useRef(minimizeCounter);
  const resizeContainerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [resizerResetKey, setResizerResetKey] = useState(0);
  const [workspaceDimensions, setWorkspaceDimensions] = useState<{
    workspaceWidth: number;
    workspaceHeight: number;
  }>();

  const breakpoint = useBreakpoint();
  // Children mount in the docked shell: the Sheet's hosts only exist a commit after it renders.
  const [hasMounted, setHasMounted] = useState(false);
  useLayoutEffect(() => setHasMounted(true), []);
  const isMobile = hasMounted && (mobile ?? isBreakpointBelow(breakpoint, 'md'));

  // Without a Sheet to move into, content can render in place, which also keeps it in server HTML.
  const isInline = mobile === false;
  const contentSlot = useContentSlot(children, isInline);
  const footerSlot = useContentSlot(footer, isInline);
  const actionsSlot = useContentSlot(headerActions, isInline);
  const isInSlot = (element: Element | null) =>
    [contentSlot, footerSlot, actionsSlot].some((slot) => slot.node?.contains(element));
  const sheetInitialFocus = useRef<number | undefined>(undefined);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const focusToRestore = useRef<HTMLElement | null>(null);
  const previousIsMobile = useRef(isMobile);

  const attachToggle = useCallback((toggle: HTMLButtonElement | null) => {
    toggleRef.current = toggle;
    const target = focusToRestore.current;
    if (!toggle || !target) return;
    focusToRestore.current = null;
    // Deferred because slot hosts later in this commit haven't received their content yet.
    queueMicrotask(() => (target.isConnected ? target : toggle).focus());
  }, []);

  // Read during render: the swap's commit removes the focused element's host before any ref or effect runs.
  if (previousIsMobile.current !== isMobile) {
    previousIsMobile.current = isMobile;
    const active = document.activeElement;
    if (active instanceof HTMLElement && isInSlot(active)) focusToRestore.current = active;
    else if (toggleRef.current?.parentElement?.contains(active)) focusToRestore.current = toggleRef.current;
  }

  const isMeasuring = resizable && !isMobile && !workspaceDimensions;
  const isCollapsed = !isMeasuring && (collapsed ?? internalCollapsed);

  // Floating UI re-runs its focus effect if this flips sign, so resolve it once.
  // A panel that has been docked on screen swaps rather than opens, so the Sheet leaves focus alone.
  if (hasMounted && !isMobile) sheetInitialFocus.current = -1;
  else if (isMobile) sheetInitialFocus.current ??= isCollapsed ? -1 : 0;

  // Minimizing hides the slots, and the browser would otherwise drop focus to the body.
  useLayoutEffect(() => {
    if (isMobile && isCollapsed && isInSlot(document.activeElement)) toggleRef.current?.focus();
  }, [isCollapsed]);

  const isSidePanel = placement === 'left' || placement === 'right';
  const resizeDimension = isSidePanel ? 'width' : 'height';

  const getResizeLimits = (workspaceWidth: number, workspaceHeight: number) => {
    const {
      minWidth = workspaceWidth * 0.08,
      maxWidth = workspaceWidth * 0.92,
      minHeight = workspaceHeight * 0.08,
      maxHeight = workspaceHeight * 0.92,
    } = props;
    const workspaceSize = isSidePanel ? workspaceWidth : workspaceHeight;
    const maximumSize = Math.min(workspaceSize, isSidePanel ? maxWidth : maxHeight);
    const minimumSize = Math.min(isSidePanel ? minWidth : minHeight, maximumSize);
    return { minimumSize, maximumSize };
  };

  useLayoutEffect(() => {
    if (!resizable || isMobile) {
      setWorkspaceDimensions(undefined);
      return;
    }

    const workspace = resizeContainerRef.current?.offsetParent;
    if (!workspace) return;

    const updateWorkspaceSize = (): void => {
      const workspaceWidth = workspace.clientWidth;
      const workspaceHeight = workspace.clientHeight;

      setWorkspaceDimensions((current) => {
        if (current?.workspaceWidth === workspaceWidth && current.workspaceHeight === workspaceHeight) {
          return current;
        }

        return { workspaceWidth, workspaceHeight };
      });

      const resizerElement = panelRef.current?.previousElementSibling;
      if (resizerElement instanceof HTMLElement) {
        // Resizer's inline style contains its saved size before any CSS limits.
        const savedSize = Number.parseFloat(resizerElement.style[resizeDimension]);
        const { minimumSize, maximumSize } = getResizeLimits(workspaceWidth, workspaceHeight);
        if (savedSize < minimumSize || savedSize > maximumSize) {
          setResizerResetKey((key) => key + 1);
        }
      }
    };

    updateWorkspaceSize();
    if (typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(updateWorkspaceSize);
    observer.observe(workspace);
    return () => observer.disconnect();
  }, [resizable, isMobile]);

  const requestCollapsed = (next: boolean): void => {
    if (!isControlled) setInternalCollapsed(next);
    onCollapsedChange?.(next);
  };
  const handleCollapseToggle = (): void => requestCollapsed(!isCollapsed);

  // Drag and Escape reach this; outside press is off, × calls onClose directly, and Escape is off while minimized.
  const handleSheetDismiss = (open: boolean): void => {
    if (open) return;
    if (isCollapsed) onClose?.();
    else requestCollapsed(true);
  };

  useEffect(() => {
    if (previousMinimizeCounter.current !== minimizeCounter) {
      previousMinimizeCounter.current = minimizeCounter;
      if (!isCollapsed) {
        if (!isControlled) setInternalCollapsed(true);
        onCollapsedChange?.(true);
      }
    }
  }, [minimizeCounter, isCollapsed, isControlled, onCollapsedChange]);

  const panelStyle: DockPanelStyle = { ...style, zIndex: resizable ? undefined : style?.zIndex };
  if (width !== undefined) {
    panelStyle['--dock-panel-width'] = resolveCssDimension(width);
  }
  if (!resizable && isSidePanel && props.maxWidth !== undefined) {
    panelStyle['--dock-panel-max-width'] = `${props.maxWidth}px`;
  }
  if (height !== undefined) {
    panelStyle['--dock-panel-height'] = resolveCssDimension(height);
  }
  if (props.maxHeight !== undefined) {
    panelStyle['--dock-panel-max-height'] = `${props.maxHeight}px`;
  }

  const titleElement = headingElement ?? (size === 'small' ? 'h4' : 'h3');
  const toggleButtonLabel = isCollapsed ? labels.expand : labels.collapse;
  const toggleButtonIcon = isCollapsed ? 'zoom_out_map' : 'zoom_in_map';
  const hasHeaderActions = headerActions !== null && headerActions !== undefined && typeof headerActions !== 'boolean';
  const hasFooter = footer !== null && footer !== undefined && typeof footer !== 'boolean';

  const panel = (
    <div
      ref={panelRef}
      id={panelId}
      role="region"
      aria-labelledby={titleId}
      data-placement={placement}
      data-size={size}
      data-collapsed={isCollapsed}
      data-resizable={resizable && !isMeasuring}
      className={cn(styles['tedi-dock-panel'], className)}
      style={panelStyle}
    >
      <div className={styles['tedi-dock-panel__header']}>
        <div className={styles['tedi-dock-panel__header-row']}>
          <Heading
            id={titleId}
            element={titleElement}
            modifiers={isCollapsed ? 'small' : undefined}
            className={styles['tedi-dock-panel__title']}
          >
            {title}
          </Heading>

          {hasHeaderActions && (
            <div {...actionsSlot.host} className={styles['tedi-dock-panel__header-actions']} hidden={isCollapsed} />
          )}

          <div className={styles['tedi-dock-panel__controls']}>
            <Button
              ref={attachToggle}
              className={styles['tedi-dock-panel__toggle']}
              type="button"
              visualType="neutral"
              icon={toggleButtonIcon}
              title={toggleButtonLabel}
              aria-expanded={!isCollapsed}
              aria-controls={bodyId}
              onClick={handleCollapseToggle}
            >
              {toggleButtonLabel}
            </Button>

            {onClose && (
              <Button
                className={styles['tedi-dock-panel__close']}
                type="button"
                visualType="neutral"
                icon="close"
                title={labels.close}
                onClick={onClose}
              >
                {labels.close}
              </Button>
            )}
          </div>
        </div>
        {description && (
          <div className={styles['tedi-dock-panel__description']} hidden={isCollapsed}>
            {description}
          </div>
        )}
      </div>

      <div id={bodyId} className={styles['tedi-dock-panel__body']} hidden={isCollapsed}>
        <div className={styles['tedi-dock-panel__scroll-area']}>
          <div {...contentSlot.host} className={styles['tedi-dock-panel__content']} />
        </div>
        {hasFooter && <div {...footerSlot.host} className={styles['tedi-dock-panel__footer']} />}
      </div>
    </div>
  );

  const sheet = (
    <Sheet
      open
      closeOnBackdropClick={false}
      closeOnEscape={!isCollapsed}
      collapsed={isCollapsed}
      onCollapsedChange={requestCollapsed}
      onToggle={handleSheetDismiss}
    >
      <Sheet.Content
        showOverlay={false}
        trapFocus={false}
        lockScroll={false}
        returnFocus={false}
        initialFocus={sheetInitialFocus.current}
        padding={size}
        className={className}
        style={style}
      >
        <Sheet.Header
          title={title}
          headingLevel={titleElement}
          variant="default"
          className={hasHeaderActions && !isCollapsed ? styles['tedi-dock-panel__sheet-header'] : undefined}
          closeButton={false}
          endSlot={
            hasHeaderActions && (
              <div {...actionsSlot.host} className={styles['tedi-dock-panel__sheet-actions']} hidden={isCollapsed} />
            )
          }
          actions={
            <>
              <CollapseButton
                ref={attachToggle}
                className={styles['tedi-dock-panel__sheet-toggle']}
                hideText
                open={!isCollapsed}
                onOpenChange={(open) => requestCollapsed(!open)}
                aria-label={toggleButtonLabel}
                aria-controls={panelId}
              />
              {onClose && <ClosingButton title={labels.close} onClick={onClose} />}
            </>
          }
        />
        <Sheet.Body className={styles['tedi-dock-panel__sheet-body']}>
          {description && (
            <div className={cn(styles['tedi-dock-panel__description'], styles['tedi-dock-panel__sheet-description'])}>
              {description}
            </div>
          )}
          <div id={panelId} {...contentSlot.host} />
        </Sheet.Body>
        {hasFooter && (
          <Sheet.Footer fullWidth>
            <div {...footerSlot.host} />
          </Sheet.Footer>
        )}
      </Sheet.Content>
    </Sheet>
  );

  const renderResizable = () => {
    const resizerElement = panelRef.current?.previousElementSibling;
    const panelSize =
      resizerElement instanceof HTMLElement
        ? Number.parseFloat(resizerElement.style[resizeDimension])
        : panelRef.current?.getBoundingClientRect()[resizeDimension] ?? 0;
    const { minimumSize, maximumSize } = getResizeLimits(
      workspaceDimensions?.workspaceWidth ?? 0,
      workspaceDimensions?.workspaceHeight ?? 0
    );
    const sizeWithinLimits = Math.min(Math.max(panelSize, minimumSize), maximumSize);

    const resizeLayoutStyle: DockPanelStyle = {
      height: isSidePanel ? panelStyle['--dock-panel-height'] : undefined,
      maxHeight: panelStyle['--dock-panel-max-height'],
      zIndex: style?.zIndex,
      visibility: isMeasuring && (collapsed ?? internalCollapsed) ? 'hidden' : undefined,
      '--dock-panel-gap': panelStyle['--dock-panel-gap'],
      '--dock-panel-rail-size': panelStyle['--dock-panel-rail-size'],
      '--dock-panel-layer': panelStyle['--dock-panel-layer'],
    };

    // Measure against the full workspace; minimized bars also ignore expanded height limits.
    if (isCollapsed || isMeasuring) {
      resizeLayoutStyle.height = undefined;
      resizeLayoutStyle.maxHeight = undefined;
    }

    return (
      <div
        ref={resizeContainerRef}
        className={cn(
          styles['tedi-dock-panel__resize-layout'],
          isMeasuring && styles['tedi-dock-panel__resize-measurement']
        )}
        data-placement={placement}
        data-collapsed={isCollapsed}
        style={resizeLayoutStyle}
      >
        <div className={styles['tedi-dock-panel__resize-frame']}>
          {workspaceDimensions && (
            <Resizer
              key={resizerResetKey}
              className={styles['tedi-dock-panel__resizer']}
              handlePosition={resizeHandleByPlacement[placement]}
              initialWidth={isSidePanel ? sizeWithinLimits : undefined}
              initialHeight={isSidePanel ? undefined : sizeWithinLimits}
              minWidth={isSidePanel ? minimumSize : undefined}
              minHeight={isSidePanel ? undefined : minimumSize}
              maxWidth={isSidePanel ? maximumSize : undefined}
              maxHeight={isSidePanel ? undefined : maximumSize}
              showIndicator={false}
            >
              {null}
            </Resizer>
          )}
          {/* Keep content mounted when only Resizer needs a new starting size. */}
          {panel}
        </div>
      </div>
    );
  };

  const shell = isMobile ? sheet : resizable ? renderResizable() : panel;

  return (
    <>
      {shell}
      {isMobile && isCollapsed && <div className={styles['tedi-dock-panel__sheet-spacer']} />}
      {contentSlot.portal}
      {footerSlot.portal}
      {actionsSlot.portal}
    </>
  );
};

DockPanel.displayName = 'DockPanel';

/**
 * Expanded panels overlay the workspace; minimized panels reserve a grid track.
 * Keep the layout mounted when opening/closing panels to preserve workspace state.
 */
export interface DockPanelLayoutProps {
  /** Underlying application content. */
  children: ReactNode;
  /** One DockPanel or a layout-aware wrapper containing it. Null means closed. */
  panel?: ReactNode;
  /** Additional workspace layout class names. */
  className?: string;
  /** Workspace layout styles, including its height. */
  style?: CSSProperties;
}

export const DockPanelLayout = ({ children, panel, className, style }: DockPanelLayoutProps): JSX.Element => (
  <div className={cn(styles['tedi-dock-panel-layout'], className)} style={style}>
    <div className={styles['tedi-dock-panel-layout__content']}>{children}</div>
    {panel}
  </div>
);

DockPanelLayout.displayName = 'DockPanelLayout';

export default DockPanel;
