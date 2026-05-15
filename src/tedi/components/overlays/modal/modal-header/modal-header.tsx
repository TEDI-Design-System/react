import cn from 'classnames';
import { ReactNode, useEffect } from 'react';

import { Heading } from '../../../base/typography/heading/heading';
import { Text } from '../../../base/typography/text/text';
import ClosingButton, { ClosingButtonProps } from '../../../buttons/closing-button/closing-button';
import styles from '../modal.module.scss';
import { useModalContext } from '../modal-context';

export interface ModalHeaderProps {
  /**
   * Title text. Rendered as an `<h3>` and automatically registered as the modal's
   * `aria-labelledby`. Pass `children` instead for full control of the title markup.
   */
  title?: ReactNode;
  /**
   * Description text below the title. Automatically registered as the modal's
   * `aria-describedby`.
   */
  description?: ReactNode;
  /**
   * Show the closing button.
   * @default true
   */
  closeButton?: boolean;
  /**
   * Forwarded to the closing button — use to override size, title, etc.
   */
  closeButtonProps?: Omit<ClosingButtonProps, 'onClick'>;
  /**
   * Replaces the default title/description layout entirely. When set, `title` and
   * `description` are ignored.
   *
   * Accessibility note: the automatic `aria-labelledby` / `aria-describedby` wiring
   * only fires for the `title` / `description` props. With `children` you need to
   * connect them yourself — call `useModal()` to read `labelId` / `descriptionId`
   * and put them on the right elements:
   *
   * ```tsx
   * function CustomHeader() {
   *   const { labelId, descriptionId, onOpenChange } = useModal();
   *   return (
   *     <Modal.Header>
   *       <h2 id={labelId}>Custom title</h2>
   *       <p id={descriptionId}>Supporting text</p>
   *       <ClosingButton onClick={() => onOpenChange(false)} />
   *     </Modal.Header>
   *   );
   * }
   * ```
   *
   * Alternatively, set `aria-labelledby` / `aria-describedby` explicitly on
   * `<Modal.Content>` pointing at IDs you control.
   */
  children?: ReactNode;
  /**
   * Additional class name.
   */
  className?: string;
}

export const ModalHeader = (props: ModalHeaderProps): JSX.Element => {
  const { title, description, closeButton = true, closeButtonProps, children, className } = props;
  const { onOpenChange, labelId, descriptionId, setHasTitle, setHasDescription } = useModalContext();

  useEffect(() => {
    setHasTitle(Boolean(title));
    return () => setHasTitle(false);
  }, [title, setHasTitle]);

  useEffect(() => {
    setHasDescription(Boolean(description));
    return () => setHasDescription(false);
  }, [description, setHasDescription]);

  const handleClose = () => onOpenChange(false);

  return (
    <div className={cn(styles['tedi-modal__header'], className)}>
      {children ?? (
        <>
          <div className={styles['tedi-modal__header-row']}>
            {title && (
              <Heading element="h3" modifiers="h3" id={labelId} className={styles['tedi-modal__header-title']}>
                {title}
              </Heading>
            )}
            {closeButton && <ClosingButton size="default" {...closeButtonProps} onClick={handleClose} />}
          </div>
          {description && (
            <Text id={descriptionId} className={styles['tedi-modal__header-description']}>
              {description}
            </Text>
          )}
        </>
      )}
    </div>
  );
};

ModalHeader.displayName = 'Modal.Header';
export default ModalHeader;
