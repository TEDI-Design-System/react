import { cloneElement, MouseEvent, ReactElement } from 'react';

import { useSheetContext } from '../../sheet-context';

export interface SheetCloserProps {
  /**
   * Element that closes the sheet when clicked. The element is cloned and receives
   * a wrapped `onClick` that calls the original handler first, then closes the sheet.
   */
  children: ReactElement<{ onClick?: (event: MouseEvent<HTMLElement>) => void }>;
}

export const SheetCloser = ({ children }: SheetCloserProps): JSX.Element => {
  const { onOpenChange } = useSheetContext();
  return cloneElement(children, {
    onClick: (event: MouseEvent<HTMLElement>) => {
      children.props.onClick?.(event);
      onOpenChange(false);
    },
  });
};

SheetCloser.displayName = 'Sheet.Closer';
export default SheetCloser;
