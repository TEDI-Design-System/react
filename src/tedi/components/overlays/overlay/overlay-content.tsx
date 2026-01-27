import { FloatingArrow, FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import { ReactNode, useContext, useEffect, useId } from 'react';

import { OverlayContext } from './overlay';

export interface OverlayContentProps {
  /**
   * Overlay content.
   * Can contain any valid React nodes (text, elements, components).
   */
  children: ReactNode | ReactNode[];

  /**
   * Additional class names for styling overlay elements.
   */
  classNames?: {
    /**
     * Class name applied to the floating content container.
     */
    content: string;

    /**
     * Class name applied to the overlay arrow element.
     */
    arrow: string;
  };

  /**
   * ID of the element that labels the overlay content.
   *
   * This is used to set the `aria-labelledby` attribute on the overlay container,
   * providing an accessible name for screen readers.
   *
   * Typically points to a heading element inside the overlay (e.g. a title).
   */
  labelledBy?: string;

  /**
   * ID of the element that describes the overlay content.
   *
   * This is used to set the `aria-describedby` attribute on the overlay container,
   * allowing screen readers to announce additional descriptive text.
   *
   * Useful for longer explanations or supporting content that complements the title.
   */
  describedBy?: string;
}

export const OverlayContent = (props: OverlayContentProps) => {
  const { children, classNames, labelledBy, describedBy } = props;
  const contentId = useId();
  const {
    open,
    x,
    y,
    strategy,
    focusManager,
    floating,
    arrowRef,
    getFloatingProps,
    placement,
    context,
    arrow,
    scrollLock,
  } = useContext(OverlayContext);

  useEffect(() => {
    if (scrollLock) {
      if (open) {
        document.documentElement.style.overflow = 'hidden';
        const hasScrollbar = document.documentElement.scrollHeight > window.innerHeight;

        if (hasScrollbar) {
          document.body.style.overflow = 'scroll';
        }
      } else {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      }
    }
  }, [open, scrollLock]);

  if (!open) return null;

  return (
    <FloatingPortal>
      <FloatingFocusManager modal={focusManager?.modal || false} {...focusManager} context={context}>
        <div
          {...getFloatingProps({
            ref: floating,
            tabIndex: -1,
            id: contentId,
            'aria-labelledby': labelledBy,
            'aria-describedby': describedBy,
            style: {
              position: strategy,
              left: x,
              top: y,
            },
            className: classNames?.content,
          })}
          data-placement={placement}
          data-testid="overlay-content"
        >
          <FloatingArrow
            ref={(el) => (arrowRef.current = el)}
            context={context}
            className={classNames?.arrow}
            height={arrow?.height}
            width={arrow?.width}
            data-testid="overlay-arrow"
          />
          {children}
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  );
};
