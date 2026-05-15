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
export type ModalFullscreenBreakpoint = 'sm' | 'md' | 'lg' | 'xl';
export type ModalFullscreen = boolean | ModalFullscreenBreakpoint;

const WIDTH_PRESETS: readonly ModalWidthPreset[] = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const isPresetWidth = (value: ModalWidth): value is ModalWidthPreset =>
  (WIDTH_PRESETS as readonly string[]).includes(value);

type ModalContentBreakpointProps = {
  /**
   * Modal width. Accepts a Figma preset (`xs` ≈ 460, `sm` ≈ 616, `md` ≈ 820, `lg` ≈ 1024,
   * `xl` ≈ 1212) or any CSS length (`'800px'`, `'60vw'`, `'75%'`). Side-positioned modals
   * stretch to full height regardless of width.
   * @default sm
   */
  width?: ModalWidth;
  /**
   * Hard cap on width. Useful when `width` is a custom value (e.g. `width="800px"` with
   * `maxWidth="75%"`).
   * @default `calc(100vw - 16px * 2)`
   */
  maxWidth?: string;
  /**
   * Placement on the viewport. Use the breakpoint API to flip a side drawer back to a
   * centered modal on mobile, e.g. `<Modal.Content position="right" md={{ position: "center" }} />`.
   * @default center
   */
  position?: ModalPosition;
};

export interface ModalContentProps extends BreakpointSupport<ModalContentBreakpointProps> {
  /**
   * `<Modal.Header>`, `<Modal.Body>`, `<Modal.Footer>` and any other content.
   */
  children: ReactNode;
  /**
   * Size density — controls header/body/footer padding. `'small'` reduces vertical padding
   * (header ≈ 42px) to fit denser layouts; `'default'` matches the 64px header in Figma.
   * @default default
   */
  size?: ModalSize;
  /**
   * Fullscreen behaviour:
   * - `true` — always fullscreen.
   * - `'sm' | 'md' | 'lg' | 'xl'` — fullscreen at and below the given breakpoint
   *   (useful for "fullscreen on mobile only" via `'sm'`).
   * - `false` (default) — never fullscreen.
   * @default false
   */
  fullscreen?: ModalFullscreen;
  /**
   * Where overflow is allowed. `'content'` keeps the modal frame fixed and scrolls the body
   * (recommended — matches Figma's "scrollbar" variant). `'page'` lets the entire modal
   * grow with content and scrolls the overlay around it.
   * @default content
   */
  scrollBehavior?: ModalScrollBehavior;
  /**
   * Trap focus inside the modal while open.
   * @default true
   */
  trapFocus?: boolean;
  /**
   * Restore focus to the trigger element after closing.
   * @default true
   */
  returnFocus?: boolean;
  /**
   * Render the dimmed backdrop. Set to `false` for a non-blocking dialog that still
   * portals + focus-manages.
   * @default true
   */
  showOverlay?: boolean;
  /**
   * Lock background scroll while the modal is open.
   * @default true
   */
  lockScroll?: boolean;
  /**
   * Render a visually-hidden dismiss button at the start and end of the dialog so
   * touch-based screen readers can escape without an Escape key.
   * @default false
   */
  visuallyHiddenDismiss?: boolean;
  /**
   * Manually associate the modal with a labelling element. Only needed when the
   * label lives outside `<Modal.Header>` — the header wires this automatically.
   */
  'aria-labelledby'?: string;
  /**
   * Manually associate the modal with a describing element. Only needed when the
   * description lives outside `<Modal.Header>` — the header wires this automatically.
   */
  'aria-describedby'?: string;
  /**
   * Plain-text accessible name for the dialog. Use this when there's no visible
   * title (e.g. an icon-only confirmation popup) — it satisfies WCAG 4.1.2's
   * requirement that every dialog has an accessible name. Ignored when
   * `aria-labelledby` is set (either explicitly or auto-wired by `Modal.Header`).
   */
  'aria-label'?: string;
  /**
   * Which element receives focus when the modal opens. Forwarded to floating-ui's
   * `FloatingFocusManager`. Accepts a tabbable index (`0` = first tabbable, the default;
   * `-1` = the dialog container itself, no specific element) or a ref to a specific
   * element. Useful when the safe default isn't right:
   * - Form-heavy modal: pass a ref to the first input.
   * - Destructive confirmation: pass a ref to the "Cancel" button so an accidental Enter
   *   doesn't trigger the destructive action.
   */
  initialFocus?: ComponentProps<typeof FloatingFocusManager>['initialFocus'];
  /**
   * Additional class name on the modal container.
   */
  className?: string;
}

export const ModalContent = (props: ModalContentProps): JSX.Element | null => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const { width = 'sm', maxWidth, position = 'center' } = getCurrentBreakpointProps<ModalContentBreakpointProps>(props);

  const {
    children,
    size = 'default',
    fullscreen = false,
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
  const inlineStyle: CSSProperties = {};
  if (!widthIsPreset) inlineStyle.width = width;
  if (maxWidth) inlineStyle.maxWidth = maxWidth;

  const fullscreenClass =
    fullscreen === true
      ? styles['tedi-modal__container--fullscreen']
      : typeof fullscreen === 'string'
      ? styles[`tedi-modal__container--fullscreen-${fullscreen}`]
      : undefined;

  return (
    <FloatingPortal>
      <FloatingOverlay
        lockScroll={lockScroll}
        className={cn(styles['tedi-modal__overlay'], styles[`tedi-modal__overlay--position-${position}`], {
          [styles['tedi-modal__overlay--no-overlay']]: !showOverlay,
          [styles['tedi-modal__overlay--scroll-page']]: scrollBehavior === 'page',
        })}
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
                fullscreenClass,
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
