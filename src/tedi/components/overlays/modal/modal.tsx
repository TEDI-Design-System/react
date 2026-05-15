import { useClick, useDismiss, useFloating, useInteractions, useRole } from '@floating-ui/react';
import { ReactNode, useCallback, useId, useMemo, useState } from 'react';

import { ModalBody } from './modal-body/modal-body';
import { ModalCloser } from './modal-closer/modal-closer';
import { ModalContent } from './modal-content/modal-content';
import { ModalContext, ModalContextValue } from './modal-context';
import { ModalFooter } from './modal-footer/modal-footer';
import { ModalHeader } from './modal-header/modal-header';
import { ModalTrigger } from './modal-trigger/modal-trigger';

export type ModalRole = 'dialog' | 'alertdialog';

export interface ModalProps {
  /**
   * `<Modal.Trigger>` and `<Modal.Content>` children.
   */
  children: ReactNode;
  /**
   * Open state for uncontrolled mode. Use `open` + `onToggle` for controlled mode.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Open state for controlled mode. Pair with `onToggle`.
   */
  open?: boolean;
  /**
   * Called whenever the modal opens or closes. Pair with `open` for controlled mode.
   */
  onToggle?: (open: boolean) => void;
  /**
   * Close the modal when the backdrop is clicked.
   * @default true
   */
  closeOnBackdropClick?: boolean;
  /**
   * Close the modal when the Escape key is pressed.
   * @default true
   */
  closeOnEscape?: boolean;
  /**
   * ARIA role for the dialog. Use `'alertdialog'` for destructive confirmations
   * (delete, cancel subscription) — screen readers announce alertdialogs with higher
   * urgency and require an explicit user action to dismiss. Affects both the trigger's
   * `aria-haspopup` and the floating element's `role`.
   * @default 'dialog'
   */
  role?: ModalRole;
}

export const Modal = (props: ModalProps): JSX.Element => {
  const {
    children,
    defaultOpen = false,
    open: controlledOpen,
    onToggle,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    role = 'dialog',
  } = props;

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = typeof controlledOpen !== 'undefined';
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onToggle?.(next);
    },
    [isControlled, onToggle]
  );

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: handleOpenChange,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context, { role }),
    useDismiss(context, {
      enabled: closeOnBackdropClick || closeOnEscape,
      escapeKey: closeOnEscape,
      outsidePress: closeOnBackdropClick,
    }),
  ]);

  const baseId = useId();
  const labelId = `${baseId}-label`;
  const descriptionId = `${baseId}-description`;
  const [hasTitle, setHasTitle] = useState(false);
  const [hasDescription, setHasDescription] = useState(false);

  const value = useMemo<ModalContextValue>(
    () => ({
      open: isOpen,
      onOpenChange: handleOpenChange,
      reference: refs.setReference,
      floating: refs.setFloating,
      getReferenceProps,
      getFloatingProps,
      context,
      labelId: hasTitle ? labelId : '',
      descriptionId: hasDescription ? descriptionId : '',
      setHasTitle,
      setHasDescription,
    }),
    [
      isOpen,
      handleOpenChange,
      refs.setReference,
      refs.setFloating,
      getReferenceProps,
      getFloatingProps,
      context,
      hasTitle,
      hasDescription,
      labelId,
      descriptionId,
    ]
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

Modal.Trigger = ModalTrigger;
Modal.Content = ModalContent;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Closer = ModalCloser;

Modal.displayName = 'Modal';
export default Modal;
