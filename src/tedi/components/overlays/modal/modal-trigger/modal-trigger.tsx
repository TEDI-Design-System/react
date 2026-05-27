import { cloneElement, JSX, MutableRefObject, Ref } from 'react';

import { useModalContext } from '../modal-context';

type AnyRef<T> = Ref<T> | undefined | null;

const mergeRefs =
  <T,>(...refs: AnyRef<T>[]) =>
  (node: T | null) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === 'function') {
        ref(node);
      } else {
        (ref as MutableRefObject<T | null>).current = node;
      }
    }
  };

export interface ModalTriggerProps {
  /**
   * Element that opens the modal when clicked. The element is cloned and receives
   * the `onClick` / `aria-*` props produced by floating-ui.
   */
  children: JSX.Element;
}

export const ModalTrigger = ({ children }: ModalTriggerProps): JSX.Element => {
  const { getReferenceProps, reference } = useModalContext();

  const existingRef =
    (children as unknown as { ref?: Ref<unknown> }).ref ?? (children.props as { ref?: Ref<unknown> }).ref;
  const mergedRef = mergeRefs(reference, existingRef as AnyRef<unknown>);
  return cloneElement(children, getReferenceProps({ ref: mergedRef, ...children.props }));
};

ModalTrigger.displayName = 'Modal.Trigger';
export default ModalTrigger;
