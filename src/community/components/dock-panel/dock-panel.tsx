'use client';

import cn from 'classnames';
import { CSSProperties, forwardRef, HTMLAttributes, ReactNode, useEffect, useId, useRef, useState } from 'react';

import { Heading, HeadingProps } from '../../../tedi/components/base/typography/heading/heading';
import { Button } from '../../../tedi/components/buttons/button/button';
import styles from './dock-panel.module.scss';

export type DockPanelPlacement = 'left' | 'right' | 'top' | 'bottom';
export type DockPanelSize = 'default' | 'small';
export type DockPanelDimensionPreset = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type DockPanelWidth = DockPanelDimensionPreset | CSSProperties['width'];
export type DockPanelHeight = DockPanelDimensionPreset | CSSProperties['height'];

const DIMENSION_PRESETS: readonly DockPanelDimensionPreset[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const DIMENSION_PERCENTAGES: Record<DockPanelDimensionPreset, string> = {
  xs: '25%',
  sm: '35%',
  md: '50%',
  lg: '65%',
  xl: '80%',
};

const isDimensionPreset = (value: DockPanelWidth | DockPanelHeight): value is DockPanelDimensionPreset =>
  typeof value === 'string' && (DIMENSION_PRESETS as readonly string[]).includes(value);

const getCssDimension = (value: DockPanelWidth | DockPanelHeight): string | undefined => {
  if (isDimensionPreset(value)) {
    return DIMENSION_PERCENTAGES[value];
  }

  if (typeof value === 'number') {
    return `${value}px`;
  }

  return value;
};

export interface DockPanelLabels {
  /** Accessible name for the minimize button. Supply translated text. */
  collapse: string;
  /** Accessible name for the restore button. Supply translated text. */
  expand: string;
  /** Accessible name for the optional close button. Supply translated text. */
  close: string;
}

export interface DockPanelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
  /** Required. Visible heading and default accessible name of the panel. */
  title: string;
  /** Required. Application-provided React content. Kept mounted while minimized. */
  children: ReactNode;
  /**
   * Required. Translated accessible button names: { collapse, expand, close }.
   * All three strings are required by this interface, including close when onClose is omitted.
   * Providing labels.close alone does not display a close button.
   */
  labels: DockPanelLabels;
  /**
   * Optional. Edge of the containing workspace, not necessarily the browser viewport.
   * Place the panel in DockPanelLayout to overlay when expanded and reserve space when minimized.
   * @default right
   */
  placement?: DockPanelPlacement;
  /**
   * Optional. Panel density, using TEDI Modal padding tokens for the header, content and footer.
   * The title defaults to h3 for default and h4 for small, including its text size when expanded.
   * Set headingElement to override both. Minimized titles always use compact text.
   * This is independent of width/height: small does not mean a narrower panel.
   * @default default
   */
  size?: DockPanelSize;
  /**
   * Optional. Controlled minimized state. Supply onCollapsedChange and apply the requested value.
   * When omitted, the component manages its own state, initialized from defaultCollapsed.
   */
  collapsed?: boolean;
  /**
   * Optional. Initial minimized state in uncontrolled mode; ignored when collapsed is supplied.
   * Changes after mounting do not reset the state.
   * @default false
   */
  defaultCollapsed?: boolean;
  /** Optional. Requests/notifies a minimize/restore change. Receives the next collapsed value. */
  onCollapsedChange?: (collapsed: boolean) => void;
  /**
   * Optional. Displays the close button and requests dismissal when clicked.
   * The application owns removal, unsaved-change confirmation and focus restoration.
   * Omit this callback to hide the close button. Closing is separate from minimizing.
   */
  onClose?: () => void;
  /** Optional. React content before the grouped panel controls. Hidden, not unmounted, when minimized. */
  headerActions?: ReactNode;
  /** Optional. React content below the scrolling body. Hidden, not unmounted, when minimized. */
  footer?: ReactNode;
  /**
   * Optional. Expanded width for left/right placement; ignored for top/bottom.
   * Presets share the height scale: xs=25%, sm=35%, md=50%, lg=65%, xl=80% of workspace width.
   * Every named preset leaves some workspace visible beside the panel, including xl.
   * Also accepts a CSS length or a number in pixels, limited to the workspace width.
   * Use 100% explicitly to fill the workspace. An omitted width defaults to xs (25%) via CSS.
   * @default xs
   */
  width?: DockPanelWidth;
  /**
   * Optional. Expanded height for any placement. Numbers mean pixels; CSS lengths and auto work too.
   * Presets share the width scale: xs=25%, sm=35%, md=50%, lg=65%, xl=80% of workspace height.
   * Named presets leave workspace visible; use 100% explicitly for the full available height.
   * Defaults to 100% for left/right and 50% for top/bottom.
   * Use auto for content height, with maxHeight to leave background visible underneath.
   * A minimized side rail keeps an explicit height, or fits its title and controls for auto.
   */
  height?: DockPanelHeight;
  /**
   * Optional. Maximum height as a CSS length or number in pixels; not a preset.
   * For example, calc(100% - 4rem) reserves space below a side panel.
   * At the limit, the body scrolls while the header and footer remain visible.
   * @default 100%
   */
  maxHeight?: CSSProperties['maxHeight'];
  /**
   * Optional. Overrides the title's HTML heading tag and expanded text size.
   * When omitted, uses h3 for default and h4 for small. Minimized titles always use compact text.
   * @default h3 (h4 when size is small)
   */
  headingElement?: HeadingProps['element'];
}

type PanelStyle = CSSProperties & {
  '--dock-panel-width'?: string;
  '--dock-panel-height'?: string;
  '--dock-panel-max-height'?: string;
};

export const DockPanel = forwardRef<HTMLDivElement, DockPanelProps>((props, ref) => {
  const {
    title,
    children,
    labels,
    placement = 'right',
    size = 'default',
    collapsed,
    defaultCollapsed = false,
    onCollapsedChange,
    onClose,
    headerActions,
    footer,
    width,
    height,
    maxHeight,
    headingElement,
    id,
    className,
    style,
    ...rest
  } = props;

  const generatedId = useId();
  const panelId = id ?? `tedi-dock-panel-${generatedId}`;
  const titleId = `${panelId}-title`;
  const bodyId = `${panelId}-body`;
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isControlled = collapsed !== undefined;
  const isCollapsed = collapsed ?? internalCollapsed;
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const headerActionsRef = useRef<HTMLDivElement>(null);

  // Remember focus before React hides the body, including programmatic collapse.
  // A document-level listener also notices focus moving outside this panel.
  const focusWasInCollapsibleAreaRef = useRef(false);
  useEffect(() => {
    const ownerDocument = toggleButtonRef.current?.ownerDocument;
    if (!ownerDocument) return;

    const handleDocumentFocusIn = (): void => {
      const activeElement = ownerDocument.activeElement;
      const isFocusInCollapsibleArea = Boolean(
        activeElement && (bodyRef.current?.contains(activeElement) || headerActionsRef.current?.contains(activeElement))
      );
      // Hiding a focused element can temporarily move focus to the document body.
      // Preserve the previous location in that case until the restore button is focused.
      if (isFocusInCollapsibleArea || activeElement !== ownerDocument.body || !bodyRef.current?.hidden) {
        focusWasInCollapsibleAreaRef.current = isFocusInCollapsibleArea;
      }
    };

    const handleDocumentFocusOut = (): void => {
      if (!bodyRef.current?.hidden) focusWasInCollapsibleAreaRef.current = false;
    };

    handleDocumentFocusIn();
    ownerDocument.addEventListener('focusin', handleDocumentFocusIn);
    ownerDocument.addEventListener('focusout', handleDocumentFocusOut);
    return () => {
      ownerDocument.removeEventListener('focusin', handleDocumentFocusIn);
      ownerDocument.removeEventListener('focusout', handleDocumentFocusOut);
    };
  }, []);

  useEffect(() => {
    if (isCollapsed && focusWasInCollapsibleAreaRef.current) {
      toggleButtonRef.current?.focus();
      focusWasInCollapsibleAreaRef.current = false;
    }
  }, [isCollapsed]);

  const handleToggle = (): void => {
    const nextCollapsed = !isCollapsed;
    // Some browsers do not focus a button on pointer activation.
    toggleButtonRef.current?.focus();
    if (!isControlled) setInternalCollapsed(nextCollapsed);
    onCollapsedChange?.(nextCollapsed);
  };

  const panelStyle: PanelStyle = { ...style };
  if (width !== undefined) {
    panelStyle['--dock-panel-width'] = getCssDimension(width);
  }
  if (height !== undefined) {
    panelStyle['--dock-panel-height'] = getCssDimension(height);
  }
  if (maxHeight !== undefined) {
    panelStyle['--dock-panel-max-height'] = typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;
  }

  const defaultHeadingTag = size === 'small' ? 'h4' : 'h3';
  const titleHeadingTag = headingElement ?? defaultHeadingTag;
  const titleTextStyle = isCollapsed ? 'small' : undefined;
  const toggleButtonLabel = isCollapsed ? labels.expand : labels.collapse;
  const toggleButtonIcon = isCollapsed ? 'zoom_out_map' : 'zoom_in_map';
  const hasHeaderActions = headerActions !== null && headerActions !== undefined;
  const hasFooter = footer !== null && footer !== undefined;

  return (
    <div
      {...rest}
      ref={ref}
      id={panelId}
      role="region"
      aria-labelledby={rest['aria-labelledby'] ?? titleId}
      data-dock-panel=""
      data-placement={placement}
      data-size={size}
      data-collapsed={isCollapsed}
      className={cn(styles['tedi-dock-panel'], className)}
      style={panelStyle}
    >
      <div className={styles['tedi-dock-panel__header']}>
        <Heading
          id={titleId}
          element={titleHeadingTag}
          modifiers={titleTextStyle}
          className={styles['tedi-dock-panel__title']}
        >
          {title}
        </Heading>

        {hasHeaderActions && (
          <div ref={headerActionsRef} className={styles['tedi-dock-panel__header-actions']} hidden={isCollapsed}>
            {headerActions}
          </div>
        )}

        <div className={styles['tedi-dock-panel__controls']}>
          <Button
            ref={toggleButtonRef}
            className={styles['tedi-dock-panel__toggle']}
            type="button"
            visualType="neutral"
            icon={toggleButtonIcon}
            title={toggleButtonLabel}
            aria-expanded={!isCollapsed}
            aria-controls={bodyId}
            onClick={handleToggle}
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

      <div ref={bodyRef} id={bodyId} className={styles['tedi-dock-panel__body']} hidden={isCollapsed}>
        <div className={styles['tedi-dock-panel__content']}>
          <div className={styles['tedi-dock-panel__content-inner']}>{children}</div>
        </div>
        {hasFooter && <div className={styles['tedi-dock-panel__footer']}>{footer}</div>}
      </div>
    </div>
  );
});

DockPanel.displayName = 'DockPanel';

/**
 * Shared layout for one DockPanel and its underlying application content.
 * Expanded panels are out of flow. A minimized panel occupies a separate grid track,
 * so the workspace resizes without being obscured by the rail.
 * Keep the layout mounted when opening/closing the panel to preserve application state.
 */
export interface DockPanelLayoutProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Required. Underlying application content, such as a map, editor or table. */
  children: ReactNode;
  /** Optional. One DockPanel, or a layout-aware wrapper containing it. Null means closed. */
  panel?: ReactNode;
}

export const DockPanelLayout = forwardRef<HTMLDivElement, DockPanelLayoutProps>(
  ({ children, panel, className, ...rest }, ref) => (
    <div {...rest} ref={ref} className={cn(styles['tedi-dock-panel-layout'], className)}>
      <div className={styles['tedi-dock-panel-layout__content']} data-dock-panel-layout-content="">
        {children}
      </div>
      {panel}
    </div>
  )
);

DockPanelLayout.displayName = 'DockPanelLayout';

export default DockPanel;
