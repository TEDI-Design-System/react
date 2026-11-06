import { ReactNode, useEffect } from 'react';

import { useDropdownContext } from '../dropdown-context';

export type DropdownContentProps = {
  /**
   * The panel's parts: `Dropdown.Item`, `Dropdown.Group`, `Dropdown.Separator`, `Dropdown.Header` and
   * `Dropdown.Footer`.
   */
  children: ReactNode;
};

export const DropdownContent = ({ children }: DropdownContentProps) => {
  const { setContent } = useDropdownContext();

  useEffect(() => {
    setContent(children);
    return () => setContent(null);
  }, [children, setContent]);

  return null;
};

DropdownContent.displayName = 'DropdownContent';
