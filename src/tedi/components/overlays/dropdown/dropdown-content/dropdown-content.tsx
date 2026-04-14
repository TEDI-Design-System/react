import { ReactNode, useEffect } from 'react';

import { useDropdownContext } from '../dropdown-context';

export const DropdownContent = ({ children }: { children: ReactNode }) => {
  const { setContent } = useDropdownContext();

  useEffect(() => {
    setContent(children);
    return () => setContent(null);
  }, [children, setContent]);

  return null;
};
