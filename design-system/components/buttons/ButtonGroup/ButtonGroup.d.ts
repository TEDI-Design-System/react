import * as React from 'react';

/**
 * ButtonGroup — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/buttons/button-group/button-group.stories.tsx).
 */
export interface ButtonGroupProps {
  /** The child components to render inside the ButtonGroup. Typically, these should be `<Button>` components. */
  children: React.ReactNode;
  /** The visual style of the ButtonGroup, determining its color and appearance. */
  type?: "primary" | "secondary";
  /** Callback function triggered when the selected button changes. Receives the `id` of the selected button as an argument. */
  onSelectionChange?: (id: string) => void;
  /** Whether all buttons in the group should have equal width and stretched inside their parent element. If `true`, all buttons will take up equal space. If `false`, the button widths will be determined by their content. */
  stretch?: boolean;
  /** A label for the button group, used for accessibility. Required if the group does not have a visible label. */
  ariaLabel?: string;
  /** Additional custom CSS classes to apply to the ButtonGroup container */
  className?: string;
  /** Size of the buttons in ButtonGroup */
  size?: "default" | "small";
  /** Whether the button group should collapse into a dropdown on mobile */
  enableMobileDropdown?: boolean;
  /** Breakpoint at which to switch to dropdown */
  mobileBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  /** Label to display on the dropdown trigger button when the button group collapses on mobile. If not provided, the label provider value for `sidenav.submenu` will be used as fallback. */
  dropdownLabel?: string;
  dropdownLabelMode?: "active" | "static";
}

export declare const ButtonGroup: React.ComponentType<ButtonGroupProps>;
