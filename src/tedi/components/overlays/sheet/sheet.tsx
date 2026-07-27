import cn from 'classnames';
import { ReactNode, useId } from 'react';

import { Text } from '../../base/typography/text/text';
import { ClosingButton } from '../../buttons/closing-button/closing-button';
import { Modal } from '../modal/modal';
import styles from './sheet.module.scss';

export interface SheetProps {
  /** Controlled open state. */
  open: boolean;
  /** Called when the sheet opens or closes. */
  onToggle: (open: boolean) => void;
  /**
   * Plain header title, rendered as the sheet's bold heading label with a close
   * button (per `closeButton`) and wired to the dialog's `aria-labelledby`. Use
   * `header` instead when you need full control of the header markup. Ignored
   * when `header` is set.
   */
  title?: ReactNode;
  /**
   * Full header override (custom controls, layout, …). Rendered as
   * `Modal.Header` children, which replaces the default title/close-button
   * layout — so the consumer owns any close control. Takes precedence over
   * `title`.
   */
  header?: ReactNode;
  /**
   * Whether the close button is shown next to the `title`. Only applies to the
   * `title` layout — a custom `header` owns its own controls.
   * @default true
   */
  closeButton?: boolean;
  /**
   * Accessible name for the dialog. Needed when `header` has no plain-text
   * title element for the modal to label itself with.
   */
  ariaLabel?: string;
  /** Extra class name applied to the sheet container. */
  className?: string;
  /** Sheet body content. */
  children: ReactNode;
}

/**
 * ⚠️ Internal, temporary component — **not exported publicly**.
 *
 * A bottom-sheet overlay built on `Modal` (`position="bottom"` +
 * `fullscreen="edge"`), so the sheet sits flush to the screen edges with no
 * outer margin. It centralises that configuration for the mobile variants that
 * need a sheet (e.g. `TableOfContents.Collapsible`, `CardStepper`) until a real
 * `Sheet` component exists — at which point these usages migrate to it.
 */
export const Sheet = ({
  open,
  onToggle,
  title,
  header,
  closeButton = true,
  ariaLabel,
  className,
  children,
}: SheetProps): JSX.Element => {
  const titleId = useId();

  return (
    <Modal open={open} onToggle={onToggle}>
      <Modal.Content
        position="bottom"
        fullscreen="edge"
        aria-label={ariaLabel}
        aria-labelledby={!header && title !== undefined && title !== null ? titleId : undefined}
        className={cn(styles['tedi-sheet'], className)}
      >
        {header ? (
          <Modal.Header>{header}</Modal.Header>
        ) : (
          <Modal.Header>
            <div className={styles['tedi-sheet__header']}>
              <Text id={titleId} modifiers="bold" color="secondary" className={styles['tedi-sheet__title']}>
                {title}
              </Text>
              {closeButton && (
                <Modal.Closer>
                  <ClosingButton />
                </Modal.Closer>
              )}
            </div>
          </Modal.Header>
        )}
        <Modal.Body>{children}</Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

Sheet.displayName = 'Sheet';

export default Sheet;
