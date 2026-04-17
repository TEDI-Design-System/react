import {
  arrow,
  autoUpdate,
  flip,
  FloatingContext,
  FloatingFocusManager,
  offset,
  OffsetOptions,
  Placement,
  ReferenceType,
  safePolygon,
  shift,
  Strategy,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  UseRoleProps,
} from '@floating-ui/react';
import { ComponentProps, createContext, ReactNode, useCallback, useId, useMemo, useRef, useState } from 'react';

import { useIsMounted, useIsTouchDevice } from '../../../helpers';
import { OverlayContent } from './overlay-content';
import { OverlayTrigger } from './overlay-trigger';

export type OverlayOpenWith = 'click' | 'hover';
const GAP = 3 as const;

export interface OverlayProps {
  /**
   * Trigger and Content components
   */
  children: ReactNode | ReactNode[];
  /**
   * Props passed to FloatingFocusManager
   */
  focusManager?: Omit<ComponentProps<typeof FloatingFocusManager>, 'context' | 'children'>;
  /**
   * Adds correct event listeners that change the open state.
   * @default hover
   */
  openWith?: OverlayOpenWith;
  /**
   * Is open by default?<br />
   * Does not work with open and onToggle props.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Is open?<br />
   * Use this with onToggle prop for controlled component.
   */
  open?: boolean;
  /**
   * Callback when toggled.<br />
   * Use this with open prop for state outside of component.
   */
  onToggle?: (open: boolean) => void;
  /**
   * Is dismissible by clicking outside of content or Escape button?
   * @default true
   */
  dismissible?: boolean;
  /**
   * Is scrolling locked outside of content?
   * @default false
   */
  scrollLock?: boolean;
  /**
   * Changes aria attributes on trigger and content based on the components role
   * @default tooltip
   */
  role?: UseRoleProps['role'];
  /**
   * Content overlay arrow dimensions.
   */
  arrowDimensions?: {
    width: number;
    height: number;
  };
  /**
   * Placement of content.
   * @default top
   */
  placement?: Placement;
  /**
   * Offset of content.
   * @default GAP + arrow height
   */
  offset?: OffsetOptions;
  /**
   * Minimum distance (in px) between the arrow and the edges of the content.
   * Helps keep the arrow away from rounded corners, especially on `-start` and `-end` placements.
   * Use a larger value for bigger arrows or arrows with borders.
   * @default 4
   */
  arrowPadding?: number;
}

export interface OverlayContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isMounted: boolean;
  openWith: OverlayOpenWith;
  focusManager?: OverlayProps['focusManager'];
  reference: (node: ReferenceType | null) => void;
  floating: (node: HTMLElement | null) => void;
  arrowRef: React.MutableRefObject<SVGSVGElement | null>;
  x: number;
  y: number;
  strategy: Strategy;
  getReferenceProps: (userProps?: React.HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
  getFloatingProps: (userProps?: React.HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
  arrow?: {
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    centerOffset?: number;
  };
  placement: Placement;
  context: FloatingContext<ReferenceType>;
  scrollLock?: boolean;
  role?: UseRoleProps['role'];
  contentId: string;
}

export const OverlayContext = createContext<OverlayContextType>({
  open: false,
  onOpenChange: () => {},
  isMounted: false,
  openWith: 'hover',
  reference: () => {},
  floating: () => {},
  focusManager: {},
  arrowRef: { current: null },
  x: 0,
  y: 0,
  strategy: 'absolute',
  getReferenceProps: () => ({}),
  getFloatingProps: () => ({}),
  arrow: {
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    centerOffset: 0,
  },
  placement: 'top',
  context: {} as FloatingContext,
  scrollLock: undefined,
  contentId: '',
});

export const Overlay = (props: OverlayProps) => {
  const isTouchDevice = useIsTouchDevice();

  const {
    children,
    placement: placementDefault = 'top',
    openWith = isTouchDevice ? 'click' : 'hover',
    defaultOpen = false,
    open: externalOpen,
    onToggle,
    role = 'tooltip',
    arrowDimensions,
    offset: offsetOptions = GAP + (arrowDimensions?.height ?? 0),
    arrowPadding = 4,
    focusManager,
    dismissible,
    scrollLock,
  } = props;

  const { order = ['reference', 'content'], initialFocus, modal, ...restFocusManager } = focusManager ?? {};
  const resolvedInitialFocus = initialFocus !== undefined ? initialFocus : modal ? 0 : undefined;

  const [open, setOpen] = useState(defaultOpen);
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const isMounted = useIsMounted();

  const isOpen = useMemo(() => {
    if (onToggle && typeof externalOpen !== 'undefined') return externalOpen;
    return open;
  }, [onToggle, externalOpen, open]);

  const onOpenChange = useCallback(
    (open: boolean): void => {
      if (typeof externalOpen === 'undefined') {
        setOpen(open);
      }

      onToggle?.(open);
    },
    [externalOpen, setOpen, onToggle]
  );

  const { x, y, refs, strategy, context, middlewareData, placement } = useFloating({
    placement: placementDefault,
    open: isOpen,
    onOpenChange,
    middleware: [
      offset(offsetOptions),
      flip(),
      shift({ padding: 8 }),
      arrow({
        element: arrowRef,
        padding: arrowPadding,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      enabled: openWith === 'hover',
      handleClose: safePolygon(),
    }),
    useClick(context, {
      toggle: dismissible,
    }),
    useFocus(context, {
      enabled: openWith === 'hover',
    }),
    useRole(context, { role }),
    useDismiss(context, {
      enabled: dismissible,
      outsidePressEvent: openWith === 'click' ? 'mousedown' : 'pointerdown',
    }),
  ]);

  const contentId = useId();
  const contextValue = useMemo<OverlayContextType>(
    () => ({
      open: isOpen,
      onOpenChange,
      isMounted,
      openWith,
      focusManager: focusManager
        ? {
            order,
            modal,
            initialFocus: resolvedInitialFocus,
            ...restFocusManager,
          }
        : undefined,
      reference: refs.setReference,
      floating: refs.setFloating,
      arrowRef,
      x,
      y,
      strategy,
      getReferenceProps,
      getFloatingProps,
      arrow: {
        width: arrowDimensions?.width,
        height: arrowDimensions?.height,
        ...middlewareData.arrow,
      },
      context,
      placement,
      scrollLock,
      role,
      contentId,
    }),
    [
      isOpen,
      onOpenChange,
      isMounted,
      openWith,
      focusManager,
      refs.setReference,
      refs.setFloating,
      arrowRef,
      x,
      y,
      strategy,
      getReferenceProps,
      getFloatingProps,
      arrowDimensions?.width,
      arrowDimensions?.height,
      middlewareData.arrow,
      context,
      placement,
      scrollLock,
      role,
      contentId,
      modal,
      order,
      resolvedInitialFocus,
      restFocusManager,
    ]
  );

  return <OverlayContext.Provider value={contextValue}>{children}</OverlayContext.Provider>;
};

Overlay.Trigger = OverlayTrigger;
Overlay.Content = OverlayContent;
export default Overlay;
