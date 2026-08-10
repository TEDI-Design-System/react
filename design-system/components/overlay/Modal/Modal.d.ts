import * as React from 'react';

/**
 * Modal — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/overlays/modal/modal.stories.tsx).
 * @replaces dialog
 */
export interface ModalProps {
  /** `<Modal.Trigger>` and `<Modal.Content>` children. */
  children: React.ReactNode;
  /** Open state for uncontrolled mode. Use `open` + `onToggle` for controlled mode. */
  defaultOpen?: boolean;
  /** Open state for controlled mode. Pair with `onToggle`. */
  open?: boolean;
  /** Called whenever the modal opens or closes. Pair with `open` for controlled mode. */
  onToggle?: (open: boolean) => void;
  /** Close the modal when the backdrop is clicked. */
  closeOnBackdropClick?: boolean;
  /** Close the modal when the Escape key is pressed. */
  closeOnEscape?: boolean;
  /** ARIA role for the dialog. Use `'alertdialog'` for destructive confirmations (delete, cancel subscription) — screen readers announce alertdialogs with higher urgency and require an explicit user action to dismiss. Affects both the trigger's `aria-haspopup` and the floating element's `role`. */
  role?: "dialog" | "alertdialog";
}

export declare const Modal: React.ComponentType<ModalProps> & {
  Trigger: React.ComponentType<any>;
  Content: React.ComponentType<any>;
  Header: React.ComponentType<any>;
  Body: React.ComponentType<any>;
  Footer: React.ComponentType<any>;
  Closer: React.ComponentType<any>;
};
