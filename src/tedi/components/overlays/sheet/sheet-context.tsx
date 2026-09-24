import { FloatingContext, ReferenceType } from '@floating-ui/react';
import { createContext, useContext } from 'react';

export interface SheetContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reference: (node: ReferenceType | null) => void;
  floating: (node: HTMLElement | null) => void;
  getReferenceProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>;
  getFloatingProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>;
  context: FloatingContext<ReferenceType>;
  labelId: string;
  setHasTitle: (hasTitle: boolean) => void;
  /** Whether the sheet is collapsed to just its header (bottom-sheet peek state). */
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

export const SheetContext = createContext<SheetContextValue | null>(null);

export const useSheetContext = (): SheetContextValue => {
  const ctx = useContext(SheetContext);
  if (!ctx) {
    throw new Error('Sheet subcomponents must be rendered inside <Sheet>.');
  }
  return ctx;
};

export interface UseSheetReturn {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  labelId: string;
}

/**
 * Read and control the surrounding `Sheet`'s open / collapsed state from a
 * descendant (e.g. to close it from a custom action).
 */
export const useSheet = (): UseSheetReturn => {
  const { open, onOpenChange, collapsed, onCollapsedChange, labelId } = useSheetContext();
  return { open, onOpenChange, collapsed, onCollapsedChange, labelId };
};
