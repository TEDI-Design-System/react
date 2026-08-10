import * as React from 'react';

/**
 * Filter — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/filter/filter/filter.stories.tsx).
 */
export interface FilterProps {
  /** Trigger label. In single-select mode it's replaced by the picked option (or prefixed when `preserveLabel`). */
  text: string;
  /** Identifier for participating in a managed `<FilterGroup>`. Unused outside a group. */
  value?: string;
  disabled?: boolean;
  /** Class on the root wrapper `<div>` (not the inner `<button>`). */
  className?: string;
  /** Trigger `<button>` id. Auto-generated when omitted; also used as a prefix for sub-element ids. */
  id?: string;
  /** Selected appearance. - Toggle mode (no `options`, no `children`): controlled or uncontrolled (`defaultSelected`). - Custom-content mode (`children`): controlled-only — derive it from your own state. - Dropdown mode (`options`): ignored; derived from `selectedValue` / `selectedValues`. */
  selected?: boolean;
  /** Toggle-mode initial state. Ignored when `selected` is set. */
  defaultSelected?: boolean;
  /** Toggle-mode change callback. Not fired in custom-content or dropdown modes. */
  onSelectedChange?: (selected: boolean) => void;
  /** Single-select controlled value (`''` = nothing selected). Pair with `options`. */
  selectedValue?: string;
  /** Single-select initial value. Ignored when `selectedValue` is set. */
  defaultSelectedValue?: string;
  /** Single-select change callback — fires on commit or clear (`''`). */
  onSelectedValueChange?: (value: string) => void;
  /** Switch the dropdown to multi-select (checkboxes). Requires `options`. */
  multiselect?: boolean;
  /** Multi-select controlled values. */
  selectedValues?: string[];
  /** Multi-select initial values. Ignored when `selectedValues` is set. */
  defaultSelectedValues?: string[];
  /** Multi-select change callback — fires on toggle, "Select all", or clear. */
  onSelectedValuesChange?: (values: string[]) => void;
  /** Dropdown options. Mutually exclusive with `children` (children wins if both). */
  options?: FilterOption[];
  /** Search input that filters `options` by label (case-insensitive substring). */
  searchable?: boolean;
  /** Multi-select "Select all" toggle; targets enabled + visible options. */
  showSelectAll?: boolean;
  /** Override the `filter.select-all` i18n label. */
  selectAllLabel?: string;
  /** "Clear selection" button below the panel. Dropdown modes clear automatically; custom-content mode delegates to `onClear`. */
  showClear?: boolean;
  /** Override the `filter.clear-selection` i18n label. */
  clearLabel?: string;
  /** Single-select: keep `text` as a prefix once a value is picked ("Teenus: …"). */
  preserveLabel?: boolean;
  /** Custom dropdown content. Switches the filter into controlled custom-content mode. */
  children?: React.ReactNode;
  /** Fires when "Clear" is clicked in custom-content mode — reset your own state here. */
  onClear?: () => void;
  /** Slot before `text` (icon, status). Auto-replaced by a check icon when toggle-mode selected — disable via `hidePrependWhenSelected={false}`. */
  prepend?: React.ReactNode;
  /** Hide `prepend` while selected so the check icon can take its place. */
  hidePrependWhenSelected?: boolean;
  /** Slot after `text`. In multi-select sits alongside the built-in count badge. */
  append?: React.ReactNode;
  /** Floating UI placement; flips when room is tight. */
  placement?: "top" | "left" | "right" | "bottom" | "top-end" | "top-start" | "left-end" | "left-start" | "right-end" | "right-start" | "bottom-end" | "bottom-start";
  /** Accessible label for the search input. Falls back to `text`. */
  searchLabel?: string;
  /** Visual variant of the filter. */
  variant?: "primary" | "secondary";
  /** Visual size of the filter. */
  size?: "default" | "large";
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<FilterBreakpointProps>;
  md?: Partial<FilterBreakpointProps>;
  lg?: Partial<FilterBreakpointProps>;
  xl?: Partial<FilterBreakpointProps>;
  xxl?: Partial<FilterBreakpointProps>;
}

// Referenced types, resolved one level deep (see the story source for the rest).
type FilterBreakpointProps = {
    /**
     * Visual variant of the filter.
     * @default primary
     */
    variant?: FilterVariant;
    /**
     * Visual size of the filter.
     * @default default
     */
    size?: FilterSize;
};

interface FilterOption {
    /** Display label of the option. */
    label: string;
    /** Stable identifier returned via selection callbacks. */
    value: string;
    /** Whether the option cannot be selected. */
    disabled?: boolean;
}

export declare const Filter: React.ComponentType<FilterProps>;
