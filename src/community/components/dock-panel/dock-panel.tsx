'use client';

import cn from 'classnames';
import { CSSProperties, JSX, ReactNode, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';

import { Heading, HeadingProps } from '../../../tedi/components/base/typography/heading/heading';
import { Button } from '../../../tedi/components/buttons/button/button';
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
  /** Receives the next minimized state requested by the toggle or minimizeCounter. */
  onCollapsedChange?: (collapsed: boolean) => void;
  /**
   * Shows the close button and requests dismissal without changing the minimized state.
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
  /**
   * Expanded height for any placement. Accepts presets, CSS lengths, pixel numbers or auto.
   * Use auto with maxHeight for content height with a scrolling limit.
   * Minimized side rails keep an explicit height or fit their content with auto.
   * @default 100% for left/right; 50% for top/bottom
   */
  height?: DockPanelHeight;
  /**
   * Maximum height as a CSS length or pixel number, without presets.
   * Content scrolls at this limit while the header and footer remain visible.
   * @default 100%
   */
  maxHeight?: CSSProperties['maxHeight'];
  /**
   * Title heading tag and expanded text size. Minimized titles always use compact text.
   * @default h3 (h4 when size is small)
   */
  headingElement?: HeadingProps['element'];
  /** Panel id for external controls. Generated when omitted. */
  id?: string;
  /** Additional panel class names. */
  className?: string;
  /** Panel styles, including stacking order and CSS custom properties. */
  style?: CSSProperties;
}

type DockPanelStyle = CSSProperties & {
  '--dock-panel-width'?: string;
  '--dock-panel-height'?: string;
  '--dock-panel-max-height'?: string;
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
    collapsed,
    defaultCollapsed = false,
    minimizeCounter,
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
  } = props;

  const generatedId = useId();
  const panelId = id ?? `tedi-dock-panel-${generatedId}`;
  const titleId = `${panelId}-title`;
  const bodyId = `${panelId}-body`;
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isControlled = collapsed !== undefined;
  const isCollapsed = collapsed ?? internalCollapsed;
  const previousMinimizeCounter = useRef(minimizeCounter);
  const resizeMeasurementRef = useRef<HTMLDivElement>(null);
  const [initialResizeMeasurements, setInitialResizeMeasurements] = useState<{
    width: number;
    height: number;
    maxWidth: number;
    maxHeight: number;
  }>();

  useLayoutEffect(() => {
    if (resizable && !initialResizeMeasurements && resizeMeasurementRef.current) {
      const measurement = resizeMeasurementRef.current;
      const { width, height } = measurement.getBoundingClientRect();
      const workspace = measurement.offsetParent as HTMLElement;
      setInitialResizeMeasurements({
        width,
        height,
        maxWidth: workspace.clientWidth,
        maxHeight: workspace.clientHeight,
      });
    }
  }, [resizable, initialResizeMeasurements]);

  const handleCollapseToggle = (): void => {
    const nextCollapsed = !isCollapsed;
    if (!isControlled) setInternalCollapsed(nextCollapsed);
    onCollapsedChange?.(nextCollapsed);
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
  if (height !== undefined) {
    panelStyle['--dock-panel-height'] = resolveCssDimension(height);
  }
  if (maxHeight !== undefined) {
    panelStyle['--dock-panel-max-height'] = typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;
  }

  const titleElement = headingElement ?? (size === 'small' ? 'h4' : 'h3');
  const toggleButtonLabel = isCollapsed ? labels.expand : labels.collapse;
  const toggleButtonIcon = isCollapsed ? 'zoom_out_map' : 'zoom_in_map';
  const hasHeaderActions = headerActions !== null && headerActions !== undefined && typeof headerActions !== 'boolean';
  const hasFooter = footer !== null && footer !== undefined && typeof footer !== 'boolean';

  const panel = (
    <div
      id={panelId}
      role="region"
      aria-labelledby={titleId}
      data-placement={placement}
      data-size={size}
      data-collapsed={isCollapsed}
      data-resizable={resizable}
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
            <div className={styles['tedi-dock-panel__header-actions']} hidden={isCollapsed}>
              {headerActions}
            </div>
          )}

          <div className={styles['tedi-dock-panel__controls']}>
            <Button
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
          <div className={styles['tedi-dock-panel__content']}>{children}</div>
        </div>
        {hasFooter && <div className={styles['tedi-dock-panel__footer']}>{footer}</div>}
      </div>
    </div>
  );

  if (!resizable) return panel;

  if (!initialResizeMeasurements) {
    return (
      <div
        ref={resizeMeasurementRef}
        aria-hidden="true"
        data-placement={placement}
        className={cn(styles['tedi-dock-panel'], styles['tedi-dock-panel__resize-measurement'], className)}
        style={panelStyle}
      />
    );
  }

  const resizeLayoutStyle: DockPanelStyle = {
    height: placement === 'left' || placement === 'right' ? panelStyle['--dock-panel-height'] : undefined,
    maxHeight: panelStyle['--dock-panel-max-height'],
    zIndex: style?.zIndex,
    '--dock-panel-gap': panelStyle['--dock-panel-gap'],
    '--dock-panel-rail-size': panelStyle['--dock-panel-rail-size'],
    '--dock-panel-layer': panelStyle['--dock-panel-layer'],
  };

  return (
    <div
      className={styles['tedi-dock-panel__resize-layout']}
      data-placement={placement}
      data-collapsed={isCollapsed}
      style={resizeLayoutStyle}
    >
      <Resizer
        className={styles['tedi-dock-panel__resizer']}
        handlePosition={resizeHandleByPlacement[placement]}
        initialWidth={initialResizeMeasurements.width}
        initialHeight={initialResizeMeasurements.height}
        minWidth={0}
        minHeight={0}
        maxWidth={initialResizeMeasurements.maxWidth}
        maxHeight={initialResizeMeasurements.maxHeight}
        showIndicator={false}
      >
        {panel}
      </Resizer>
    </div>
  );
};

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

export default DockPanel;
