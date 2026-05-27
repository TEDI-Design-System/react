import { FloatingContext, ReferenceType } from '@floating-ui/react';
import { createContext, useContext } from 'react';

export interface ModalContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reference: (node: ReferenceType | null) => void;
  floating: (node: HTMLElement | null) => void;
  getReferenceProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>;
  getFloatingProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>;
  context: FloatingContext<ReferenceType>;
  labelId: string;
  descriptionId: string;
  setHasTitle: (hasTitle: boolean) => void;
  setHasDescription: (hasDescription: boolean) => void;
}

export const ModalContext = createContext<ModalContextValue | null>(null);

export const useModalContext = (): ModalContextValue => {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error('Modal subcomponents must be rendered inside <Modal>.');
  }
  return ctx;
};

/**
 * Public Modal context — the safe subset consumers can read from inside a `<Modal>`.
 * Use this when you bypass `<Modal.Header>` and render your own title / description
 * markup, or when you need to close the modal programmatically from deeply nested code.
 *
 * The floating-ui plumbing (`reference`, `floating`, `getReferenceProps`, …) is
 * intentionally hidden — touching it from outside the Modal package leads to subtle
 * focus/dismissal bugs.
 *
 * @example Custom header with manual `aria-labelledby` wiring
 * ```tsx
 * function CustomHeader({ title }: { title: string }) {
 *   const { labelId, onOpenChange } = useModal();
 *   return (
 *     <Modal.Header>
 *       <h2 id={labelId}>{title}</h2>
 *       <ClosingButton onClick={() => onOpenChange(false)} />
 *     </Modal.Header>
 *   );
 * }
 * ```
 *
 * @example Close the modal from a footer action
 * ```tsx
 * function ConfirmButton() {
 *   const { onOpenChange } = useModal();
 *   return <Button onClick={() => onOpenChange(false)}>Confirm</Button>;
 * }
 * ```
 *
 * @throws if called outside a `<Modal>` subtree.
 */
export interface UseModalReturn {
  /** Whether the modal is currently open. */
  open: boolean;
  /** Programmatically open or close the modal. Equivalent to clicking the trigger / closer. */
  onOpenChange: (open: boolean) => void;
  /** ID assigned to the title element, intended for `aria-labelledby`. Empty when no title is registered. */
  labelId: string;
  /** ID assigned to the description element, intended for `aria-describedby`. Empty when no description is registered. */
  descriptionId: string;
}

export const useModal = (): UseModalReturn => {
  const { open, onOpenChange, labelId, descriptionId } = useModalContext();
  return { open, onOpenChange, labelId, descriptionId };
};
