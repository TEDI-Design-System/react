import { FloatingContext, ReferenceType } from '@floating-ui/react';
import { createContext, useContext } from 'react';

export interface SheetContextValue {
  /** Whether the sheet is open (the controlled `open` prop, or the internal state). */
  open: boolean;
  /** Opens or closes the sheet - updates the internal state when uncontrolled and calls `onToggle`. */
  onOpenChange: (open: boolean) => void;
  /** Ref callback registering the trigger element with Floating UI (used by `Sheet.Trigger`). */
  reference: (node: ReferenceType | null) => void;
  /** Ref callback registering the sheet panel with Floating UI (used by `Sheet.Content`). */
  floating: (node: HTMLElement | null) => void;
  /** Merges the trigger's interaction props (click to toggle, ARIA attributes) into the given props. */
  getReferenceProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>;
  /** Merges the panel's interaction props (dialog role, dismiss handling) into the given props. */
  getFloatingProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>;
  /** Floating UI context, used for the focus manager and transition status. */
  context: FloatingContext<ReferenceType>;
  /** Id the dialog is labelled by - `''` until `Sheet.Header` has registered a title. */
  labelId: string;
  /** Stable id for the header title element, available from the first render. */
  titleId: string;
  /** Lets `Sheet.Header` register whether it renders a title, which switches `labelId` on or off. */
  setHasTitle: (hasTitle: boolean) => void;
  /** Whether the sheet is collapsed to just its header (bottom-sheet peek state). */
  collapsed: boolean;
  /** Collapses or expands the sheet - updates the internal state when uncontrolled and calls `onCollapsedChange`. */
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
  /** Whether the sheet is open. */
  open: boolean;
  /** Opens or closes the sheet; also calls the `Sheet`'s `onToggle`. */
  onOpenChange: (open: boolean) => void;
  /** Whether the sheet is collapsed to just its header. */
  collapsed: boolean;
  /** Collapses or expands the sheet; also calls the `Sheet`'s `onCollapsedChange`. */
  onCollapsedChange: (collapsed: boolean) => void;
  /** Id of the element labelling the dialog - `''` while no `Sheet.Header` title is rendered. */
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
