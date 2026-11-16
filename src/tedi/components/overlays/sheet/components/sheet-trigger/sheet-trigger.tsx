import { useMergeRefs } from '@floating-ui/react';
import { cloneElement, JSX } from 'react';

import { getElementRef } from '../../../../../helpers/get-element-ref';
import { useSheetContext } from '../../sheet-context';

export interface SheetTriggerProps {
  /**
   * Element that opens the sheet when clicked. The element is cloned and receives
   * the `onClick` / `aria-*` props produced by floating-ui.
   */
  children: JSX.Element;
}

export const SheetTrigger = ({ children }: SheetTriggerProps): JSX.Element => {
  const { getReferenceProps, reference } = useSheetContext();

  const existingRef = getElementRef(children);
  const mergedRef = useMergeRefs([reference, existingRef]);

  return cloneElement(children, getReferenceProps({ ...children.props, ref: mergedRef }));
};

SheetTrigger.displayName = 'Sheet.Trigger';
export default SheetTrigger;
