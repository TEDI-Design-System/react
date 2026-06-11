import { FloatingFocusManager, FloatingOverlay, FloatingPortal } from '@floating-ui/react';
import cn from 'classnames';
import { ComponentProps, CSSProperties, ReactNode } from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../../helpers';
import { useLabels } from '../../../../providers/label-provider';
import styles from '../modal.module.scss';
import { useModalContext } from '../modal-context';

export type ModalWidthPreset = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ModalWidth = ModalWidthPreset | (string & Record<never, never>);
export type ModalSize = 'default' | 'small';
export type ModalPosition = 'center' | 'top' | 'right' | 'left';
export type ModalScrollBehavior = 'content' | 'page';
export type ModalFullscreen = boolean | 'edge';

const WIDTH_PRESETS: readonly ModalWidthPreset[] = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const isPresetWidth = (value: ModalWidth): value is ModalWidthPreset =>
  (WIDTH_PRESETS as readonly string[]).includes(value);

type ModalContentBreakpointProps = {
  /**
   * Modal width — a Figma-aligned preset (`xs`–`xl`) or any CSS length.
   * Use `maxWidth` when you only need to cap the width instead of set it.
   * @default md
   */
  width?: ModalWidth;
  /**
   * Hard cap on width. Lightweight alternative to a custom `width`.
   * @default calc(100vw - 16px * 2)
   */
  maxWidth?: string;
  /**
   * Placement on the viewport.
   * @default center
   */
  position?: ModalPosition;
  /**
   * Fullscreen behaviour:
   * - `false` — content-sized modal inside the 16px backdrop padding.
   * - `true` — modal fills the overlay; 16px backdrop stays visible.
   * - `'edge'` — edge-to-edge; overlay padding removed, no border/radius.
   * @default false
   */
  fullscreen?: ModalFullscreen;
};

export interface ModalContentProps extends BreakpointSupport<ModalContentBreakpointProps> {
  /**
   * `<Modal.Header>`, `<Modal.Body>`, `<Modal.Footer>` and any other content.
   */
  children: ReactNode;
  /**
   * Size density — controls header/body/footer padding.
   * @default default
   */
  size?: ModalSize;
  /**
   * Where overflow scrolls. `'content'` keeps the modal frame fixed and scrolls the body;
   * `'page'` lets the modal grow with content and scrolls the overlay around it.
   * @default content
   */
  scrollBehavior?: ModalScrollBehavior;
  /**
   * Trap focus inside the modal while open.
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
   * Render visually-hidden dismiss buttons at the start and end of the dialog
   * so touch screen-readers can escape without an Escape key.
   * @default false
   */
  visuallyHiddenDismiss?: boolean;
  /**
   * Override the dialog's labelling element. Only needed when the label lives
   * outside `<Modal.Header>` — the header wires this automatically.
   */
  'aria-labelledby'?: string;
  /**
   * Override the dialog's describing element. Only needed when the description
   * lives outside `<Modal.Header>` — the header wires this automatically.
   */
  'aria-describedby'?: string;
  /**
   * Plain-text accessible name. Use when there's no visible title (icon-only
   * confirmation, etc.). Ignored when `aria-labelledby` is set.
   */
  'aria-label'?: string;
  /**
   * Element to focus on open. Tabbable index (`0` = first tabbable, `-1` = dialog
   * container) or a ref. Override the default to focus a "Cancel" button on
   * destructive prompts, or the first input on form-heavy modals.
   */
  initialFocus?: ComponentProps<typeof FloatingFocusManager>['initialFocus'];
  /**
   * Additional class name on the modal container.
   */
  className?: string;
}

export const ModalContent = (props: ModalContentProps): JSX.Element | null => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const {
    width = 'md',
    maxWidth,
    position = 'center',
    fullscreen = false,
  } = getCurrentBreakpointProps<ModalContentBreakpointProps>(props);

  const {
    children,
    size = 'default',
    scrollBehavior = 'content',
    trapFocus = true,
    returnFocus = true,
    showOverlay = true,
    lockScroll = true,
    visuallyHiddenDismiss = false,
    initialFocus,
    className,
  } = props;

  const { getLabel } = useLabels();
  const { open, floating, getFloatingProps, context, labelId, descriptionId } = useModalContext();

  if (!open) return null;

  const ariaLabelledBy = props['aria-labelledby'] ?? (labelId || undefined);
  const ariaDescribedBy = props['aria-describedby'] ?? (descriptionId || undefined);
  const ariaLabel = !ariaLabelledBy ? props['aria-label'] : undefined;

  const widthIsPreset = isPresetWidth(width);
  // Inline styles cover the cases that can't be expressed via a preset class —
  // a custom CSS-length `width` (e.g. `"800px"`) and the optional `maxWidth` cap.
  const inlineStyle: CSSProperties = {};
  if (!widthIsPreset) inlineStyle.width = width;
  if (maxWidth) inlineStyle.maxWidth = maxWidth;

  const fullscreenContainerClass =
    fullscreen === true
      ? styles['tedi-modal__container--fullscreen']
      : fullscreen === 'edge'
      ? styles['tedi-modal__container--fullscreen-edge']
      : undefined;
  const fullscreenOverlayClass = fullscreen === 'edge' ? styles['tedi-modal__overlay--fullscreen-edge'] : undefined;

  return (
    <FloatingPortal>
      <FloatingOverlay
        lockScroll={lockScroll}
        className={cn(
          styles['tedi-modal__overlay'],
          styles[`tedi-modal__overlay--position-${position}`],
          fullscreenOverlayClass,
          {
            [styles['tedi-modal__overlay--no-overlay']]: !showOverlay,
            [styles['tedi-modal__overlay--scroll-page']]: scrollBehavior === 'page',
          }
        )}
      >
        <FloatingFocusManager
          context={context}
          modal={trapFocus}
          returnFocus={returnFocus}
          initialFocus={initialFocus}
          visuallyHiddenDismiss={visuallyHiddenDismiss ? getLabel('modal.close') : undefined}
        >
          <div
            {...getFloatingProps({
              ref: floating,
              'aria-labelledby': ariaLabelledBy,
              'aria-describedby': ariaDescribedBy,
              'aria-label': ariaLabel,
              'aria-modal': trapFocus,
              style: inlineStyle,
              className: cn(
                styles['tedi-modal__container'],
                widthIsPreset && styles[`tedi-modal__container--${width}`],
                styles[`tedi-modal--${size}`],
                fullscreenContainerClass,
                className
              ),
            })}
          >
            {children}
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
};

ModalContent.displayName = 'Modal.Content';
export default ModalContent;
