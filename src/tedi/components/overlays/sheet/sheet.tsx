import cn from 'classnames';
import { ReactNode, useId } from 'react';

import { Text } from '../../base/typography/text/text';
import { ClosingButton } from '../../buttons/closing-button/closing-button';
import { Modal } from '../modal/modal';
import styles from './sheet.module.scss';

interface SheetBaseProps {
  /** Controlled open state. Pair with `onToggle`; omit for uncontrolled use with `defaultOpen`. */
  open?: boolean;
  /** Called when the sheet opens or closes. */
  onToggle?: (open: boolean) => void;
  /**
   * Initial open state in uncontrolled mode. Ignored when `open` is provided.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Whether the close button is shown next to the `title`. Only applies to the
   * `title` layout — a custom `header` owns its own controls.
   * @default true
   */
  closeButton?: boolean;
  /** Extra class name applied to the sheet container. */
  className?: string;
  /** Sheet body content. */
  children: ReactNode;
}

/**
 * The dialog must always have an accessible name (WCAG 4.1.2). A plain `title` names it via
 * `aria-labelledby`; when no title is rendered (a custom `header`, or no title at all) an explicit
 * `ariaLabel` is required — the type enforces one of these.
 */
export type SheetProps = SheetBaseProps &
  (
    | {
        /**
         * Plain header title, rendered as the sheet's bold heading (with a close button per
         * `closeButton`) and wired to the dialog's `aria-labelledby`.
         */
        title: ReactNode;
        header?: never;
        /** Optional — the rendered `title` already names the dialog. */
        ariaLabel?: string;
      }
    | {
        /**
         * Accessible name for the dialog. Required here because no plain `title` is rendered
         * (a custom `header`, or no title).
         */
        ariaLabel: string;
        /** Plain header title. Ignored when `header` is set. */
        title?: ReactNode;
        /**
         * Full header override (custom controls, layout, …), rendered as `Modal.Header` children —
         * replaces the default title/close-button layout, so the consumer owns any close control.
         * Takes precedence over `title`.
         */
        header?: ReactNode;
      }
  );

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
  defaultOpen,
  title,
  header,
  closeButton = true,
  ariaLabel,
  className,
  children,
}: SheetProps): JSX.Element => {
  const titleId = useId();

  return (
    <Modal open={open} onToggle={onToggle} defaultOpen={defaultOpen}>
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
