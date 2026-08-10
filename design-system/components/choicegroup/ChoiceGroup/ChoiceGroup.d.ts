import * as React from 'react';

/**
 * ChoiceGroup — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/form/choice-group/choice-group.stories.tsx).
 */
export interface ChoiceGroupProps {
  id: string;
  items: ExtendedChoiceGroupItemProps[];
  name: string;
  label: React.ReactNode;
  inputType?: "radio" | "checkbox";
  helper?: FeedbackTextProps;
  className?: string;
  defaultValue?: string | string[];
  value?: string | string[];
  onChange?: (value: ChoiceGroupValue) => void;
  variant?: "default" | "card";
  color?: "primary" | "secondary";
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  layout?: "segmented" | "separated";
  rowProps?: RowProps;
  showIndicator?: boolean;
  indeterminateCheck?: string | boolean | ((state: ChoiceGroupIndeterminateState) => string);
  indeterminateCheckProps?: { indented?: boolean; } & Partial<Omit<CheckboxProps, "label" | "defaultChecked" | "onChange" | "checked" | "indeterminate">>;
  /** Specifies the size of the label text. Options include 'small' for a smaller label size or 'default' for the standard size. */
  size?: "default" | "small";
  /** Indicates whether the input field is required. If set to `true`, the required indicator (if provided) will be displayed next to the label. */
  required?: boolean;
  /** Controls the visibility of the label. Use `true` to hide the label visually while maintaining its space in the layout, or use 'keep-space' to hide it without collapsing the space it occupies. */
  hideLabel?: boolean | "keep-space";
  /** Renders the label as a `<span>` instead of a `<label>` element. This is useful when the `Form` component already handles labels internally. */
  renderWithoutLabel?: boolean;
  /** Tooltip content to display when hovering over the info button. If provided, an info button with a tooltip will be rendered. */
  tooltip?: React.ReactNode;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<ChoiceGroupAllProps>;
  md?: Partial<ChoiceGroupAllProps>;
  lg?: Partial<ChoiceGroupAllProps>;
  xl?: Partial<ChoiceGroupAllProps>;
  xxl?: Partial<ChoiceGroupAllProps>;
}

// Referenced types, resolved one level deep (see the story source for the rest).
interface CheckboxProps extends ChoiceInputProps {
    /**
     * If the check is in indeterminate state. (Not checked or unchecked)
     * When this is true then the checked prop is ignored
     */
    indeterminate?: boolean;
}

interface ChoiceGroupAllProps extends Omit<FormLabelProps, 'id' | 'label'> {
    id: string;
    items: ExtendedChoiceGroupItemProps[];
    name: string;
    label: React.ReactNode | string;
    inputType?: ChoiceGroupItemType;
    helper?: FeedbackTextProps;
    className?: string;
    defaultValue?: ChoiceGroupValue;
    value?: ChoiceGroupValue;
    onChange?: (value: ChoiceGroupValue) => void;
    variant?: ChoiceGroupItemVariant;
    color?: ChoiceGroupItemColor;
    direction?: Direction;
    layout?: ChoiceGroupItemLayout;
    rowProps?: RowProps;
    showIndicator?: boolean;
    indeterminateCheck?: boolean | string | ((state: ChoiceGroupIndeterminateState) => string);
    indeterminateCheckProps?: {
        indented?: boolean;
    } & Partial<Omit<CheckboxProps, 'indeterminate' | 'checked' | 'onChange' | 'defaultChecked' | 'label'>>;
}

type ChoiceGroupIndeterminateState = 'none' | 'some' | 'all';

type ChoiceGroupValue = string | string[] | null;

interface ExtendedChoiceGroupItemProps extends BreakpointSupport<ChoiceGroupItemBreakpointProps> {
    id: string;
    label: string | React.ReactNode;
    value: string;
}

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

export declare const ChoiceGroup: React.ComponentType<ChoiceGroupProps> & {
  Item: React.ComponentType<any>;
};
