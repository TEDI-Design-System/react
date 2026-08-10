import * as React from 'react';

/**
 * InputGroup — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/form/input-group/input-group.stories.tsx).
 */
export interface InputGroupProps {
  /** Additional class name(s) applied to the root element of the InputGroup. Useful for custom styling or layout overrides. */
  className?: string;
  /** Enables merged styling between input and its prefix/suffix elements. When `true`, borders and radius are visually combined into a single control. Disable this when using non-standard addons (e.g. buttons) that should not visually merge. */
  addons?: boolean;
  /** Helper or feedback text displayed below the input group. Can be a single item or multiple messages (e.g. error + hint). Accepts the same props as `FeedbackText`. */
  helper?: FeedbackTextProps | FeedbackTextProps[];
  /** InputGroup composition slots. Typically includes `InputGroup.Input` and optionally `InputGroup.Prefix` and/or `InputGroup.Suffix`. */
  children: React.ReactNode;
  /** Disables the entire input group. Applies disabled styles to the group and propagates the disabled state to the input and any interactive prefix/suffix elements. */
  disabled?: boolean;
  /** Marks the whole group as invalid. Applies the error border to the prefix/suffix addons and propagates `invalid` down to the inner form control, so you don't have to set it on the child as well. Pair with an error `helper` message. */
  invalid?: boolean;
  /** The unique identifier for the input element that this label is associated with. This ID should match the input element's `id` attribute to ensure accessibility. */
  id: string;
  /** The text content of the label that describes the input field. */
  label: React.ReactNode;
  /** Controls the visibility of the label. Use `true` to hide the label visually while maintaining its space in the layout, or use 'keep-space' to hide it without collapsing the space it occupies. */
  hideLabel?: boolean | "keep-space";
  /** Indicates whether the input field is required. If set to `true`, the required indicator (if provided) will be displayed next to the label. */
  required?: boolean;
  /** Renders the label as a `<span>` instead of a `<label>` element. This is useful when the `Form` component already handles labels internally. */
  renderWithoutLabel?: boolean;
  /** Specifies the size of the label text. Options include 'small' for a smaller label size or 'default' for the standard size. */
  size?: "default" | "small";
  /** Tooltip content to display when hovering over the info button. If provided, an info button with a tooltip will be rendered. */
  tooltip?: React.ReactNode;
}

// Referenced types, resolved one level deep (see the story source for the rest).
interface FeedbackTextProps {
    /**
     * Helper text
     */
    text: React.ReactNode | React.ReactNode[];
    /**
     * ID to reference the helper from aria-describedby attributes.
     * If omitted, then the id might be set through a parent component.
     */
    id?: string;
    /**
     * Additional custom class.
     */
    className?: string;
    /**
     * Type of form-helper.
     * @default hint
     */
    type?: FeedbackTextType;
    /**
     * Position of the helper.
     * @default left
     */
    position?: FeedbackTextPosition;
}

export declare const InputGroup: React.ComponentType<InputGroupProps> & {
  Prefix: React.ComponentType<any>;
  Suffix: React.ComponentType<any>;
  Input: React.ComponentType<any>;
};
