import * as React from 'react';

/**
 * OptionContent — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/misc/option-content/option-content.stories.tsx).
 */
export interface OptionContentProps {
  /** Content of the value row — typically `OptionContent.Label` and optionally `OptionContent.Meta`, but any node is allowed. */
  children?: React.ReactNode;
  /** Selection-indicator type: - `default` — no indicator - `checkbox` — checkbox indicator (multi-select) - `radio` — radio indicator (single-select listbox) */
  type?: "default" | "radio" | "checkbox";
  /** Arrange the label and meta side-by-side (`horizontal`) or stacked (`vertical`, e.g. a title with a description below). */
  layout?: "horizontal" | "vertical";
  /** Whether the indicator renders as selected (checked). */
  selected?: boolean;
  /** Whether the checkbox indicator renders as indeterminate. Ignored for other types. */
  indeterminate?: boolean;
  /** Whether the row renders as disabled (dims the indicator and text). */
  disabled?: boolean;
  /** Leading icon, rendered before the content. Accepts an icon name or full `IconProps`. */
  icon?: string | IconSharedProps & IconWithBackgroundProps | IconSharedProps & IconWithoutBackgroundProps;
  /** How the selection indicator is exposed to assistive tech: - `presentation` (default) — the indicator is `aria-hidden`; the interactive parent owns selection (menu pattern: `aria-checked` on the `DropdownItem`). - `control` — the indicator itself carries `role="checkbox"`/`"radio"`, `aria-checked` and is named via `aria-labelledby` from `OptionContent.Label` (listbox pattern, e.g. inside a `Select` option). Requires a `Label` child. */
  indicatorSemantics?: "presentation" | "control";
  /** Additional class name. */
  className?: string;
}

// Referenced types, resolved one level deep (see the story source for the rest).
interface IconWithBackgroundProps extends IconSharedProps {
    /**
     * Add round background
     */
    background: IconBackgroundColor;
    display?: 'block';
}

interface IconWithoutBackgroundProps extends IconSharedProps {
    background?: undefined;
    /**
     * Type of display
     * @default block
     */
    display?: 'block' | 'inline';
}

export declare const OptionContent: React.ComponentType<OptionContentProps> & {
  Label: React.ComponentType<any>;
  Meta: React.ComponentType<any>;
};
