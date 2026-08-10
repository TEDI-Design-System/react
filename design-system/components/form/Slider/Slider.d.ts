import * as React from 'react';

/**
 * Slider — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/form/slider/slider.stories.tsx).
 * @replaces input[type=range]
 */
export interface SliderProps {
  /** Unique identifier for the underlying input element. Generated automatically if not provided. */
  id?: string;
  /** Name attribute of the underlying input element. */
  name?: string;
  /** Label text rendered above the slider. */
  label?: React.ReactNode;
  /** Controls the visibility of the label. Pass `true` to hide it visually while keeping it available to assistive technology, or `'keep-space'` to reserve the vertical space. */
  hideLabel?: boolean | "keep-space";
  /** Marks the field as required. */
  required?: boolean;
  /** Minimum allowed value. */
  min?: number;
  /** Maximum allowed value. */
  max?: number;
  /** Step size. */
  step?: number;
  /** Controlled value. Use together with `onChange`. */
  value?: number;
  /** Default value for uncontrolled usage. */
  defaultValue?: number;
  /** Callback fired when the value changes. */
  onChange?: (value: number) => void;
  /** Disables the slider. */
  disabled?: boolean;
  /** Marks the slider as invalid for validation purposes. */
  invalid?: boolean;
  /** Accessible label used when no visible `label` is provided. */
  "aria-label"?: string;
  /** ID of an element that labels the slider, used when no visible `label` is provided. */
  "aria-labelledby"?: string;
  /** Human-readable text alternative of the current value. */
  "aria-valuetext"?: string;
  /** Text/element rendered to the left of the track (e.g. the minimum value). */
  minLabel?: React.ReactNode;
  /** Text/element rendered to the right of the track (e.g. the maximum value). Ignored when `showCurrentValue` is `true`. */
  maxLabel?: React.ReactNode;
  /** When `true`, renders the current value to the right of the track instead of `maxLabel`. */
  showCurrentValue?: boolean;
  /** Formats the current value, used by both the thumb tooltip and the `showCurrentValue` label. */
  valueFormatter?: (value: number) => React.ReactNode;
  /** Renders a tooltip above the thumb showing the current value. Shown only while the slider is hovered, focused, or being dragged. Value is formatted via `valueFormatter`. */
  tooltip?: boolean;
  /** Node rendered to the right of the slider, typically a NumberField used to edit the same value. */
  addonRight?: React.ReactNode;
  /** Helper text rendered below the slider. */
  helper?: FeedbackTextProps;
  /** Additional class name(s) applied to the root element. */
  className?: string;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<SliderBreakpointProps>;
  md?: Partial<SliderBreakpointProps>;
  lg?: Partial<SliderBreakpointProps>;
  xl?: Partial<SliderBreakpointProps>;
  xxl?: Partial<SliderBreakpointProps>;
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

export declare const Slider: React.ComponentType<SliderProps>;
