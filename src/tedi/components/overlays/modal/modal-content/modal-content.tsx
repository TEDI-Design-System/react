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
   * Modal width. Prefer one of the Figma-aligned presets:
   *
   * | Preset | Approx. max-width   |
   * |--------|---------------------|
   * | `xs`   | ~28.75rem           |
   * | `sm`   | ~38.5rem            |
   * | `md`   | ~51.25rem (default) |
   * | `lg`   | ~64rem              |
   * | `xl`   | ~77rem              |
   *
   * For edge cases that don't fit a preset, pass any valid CSS length
   * (e.g. `'50rem'`, `'60vw'`). When you only need to _cap_ the width
   * rather than set it exactly, prefer the lighter `maxWidth` prop instead.
   *
   * `@default` md
   */
  width?: ModalWidth;
  /**
   * Hard cap on width. This is the preferred lightweight alternative to a
   * fully custom `width` — e.g. use `maxWidth="75%"` together with the
   * default `width="md"` instead of overriding `width` directly.
   * `@default` calc(100vw - 16px * 2)
   */
  maxWidth?: string;
  /**
   * Placement on the viewport. Use the breakpoint API to flip a side drawer back to a
   * centered modal on mobile, e.g. `<Modal.Content position="right" md={{ position: "center" }} />`.
   * @default center
   */
  position?: ModalPosition;
  /**
   * Three sizing modes:
   *
   * - `false` (default) — **normal**: content-sized modal floating inside the
   *   16px backdrop padding (Figma example `4631:92443`).
   * - `true` — **padded fullscreen**: modal fills the overlay's content box;
   *   16px backdrop stays visible all around (Figma example `5981:67531`).
   * - `'edge'` — **edge-to-edge fullscreen**: overlay padding is removed and the
   *   modal covers the entire viewport with no border or radius.
   *
   * Combine with the breakpoint API for responsive behaviour — e.g. fullscreen
   * on phone, centered modal on desktop:
   *
   * ```tsx
   * <Modal.Content fullscreen md={{ fullscreen: false }} />
   * ```
   *
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
   * Size density — controls header/body/footer padding. `'small'` reduces vertical padding
   * (header ≈ 42px) to fit denser layouts; `'default'` matches the 64px header in Figma.
   * @default default
   */
  size?: ModalSize;
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
   * Additional class name on the modal container (the box with the border + radius).
   * Lands last so it can override the built-in styles. Use this for one-off visual
   * treatments like a coloured top accent on error / success / warning modals:
   *
   * ```css
   * .my-error-modal {
   *   border-top: 4px solid var(--general-feedback-error-text);
   * }
   * ```
   *
   * ```tsx
   * <Modal.Content className={styles['my-error-modal']}>...</Modal.Content>
   * ```
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
