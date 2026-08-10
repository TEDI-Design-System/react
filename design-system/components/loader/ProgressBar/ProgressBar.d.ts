import * as React from 'react';

/**
 * ProgressBar — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/loaders/progress-bar/progress-bar.stories.tsx).
 */
export interface ProgressBarProps {
  /** Id forwarded to the bar element so external `<label htmlFor>` can target it. */
  id?: string;
  /** Progress value, clamped to `0..100`. `NaN` is treated as `0`. */
  value?: number;
  /** Label rendered above or inline with the bar. */
  label?: string;
  /** Renders a required indicator on the label. Ignored without `label`. */
  required?: boolean;
  /** Accessible name. Falls back to `label`. */
  ariaLabel?: string;
  /** Use the 4px bar height instead of the 8px default. */
  small?: boolean;
  /** Label placement. Ignored without `label`. */
  labelPosition?: "horizontal" | "top";
  /** Show the percentage value. */
  showValue?: boolean;
  /** Where the percentage sits relative to the bar / hint row. */
  valuePosition?: "horizontal" | "bottom";
  /** Override the rendered value text (e.g. `"1 / 5"`) without affecting the fill. */
  valueLabel?: string;
  /** Hint or error text rendered below the bar via `FeedbackText`. */
  helper?: FeedbackTextProps;
  /** Class on the root wrapper. */
  className?: string;
  /** Default breakpoint for SSR, the component is rendered with this breakpoint props on the server-side. */
  defaultServerBreakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  sm?: Partial<ProgressBarBreakpointProps>;
  md?: Partial<ProgressBarBreakpointProps>;
  lg?: Partial<ProgressBarBreakpointProps>;
  xl?: Partial<ProgressBarBreakpointProps>;
  xxl?: Partial<ProgressBarBreakpointProps>;
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

type ProgressBarBreakpointProps = {
    /**
     * Use the 4px bar height instead of the 8px default.
     * @default false
     */
    small?: boolean;
    /**
     * Label placement. Ignored without `label`.
     * @default top
     */
    labelPosition?: ProgressBarLabelPosition;
    /**
     * Show the percentage value.
     * @default true
     */
    showValue?: boolean;
    /**
     * Where the percentage sits relative to the bar / hint row.
     * @default horizontal
     */
    valuePosition?: ProgressBarValuePosition;
    /**
     * Override the rendered value text (e.g. `"1 / 5"`) without affecting the fill.
     */
    valueLabel?: string;
    /**
     * Hint or error text rendered below the bar via `FeedbackText`.
     */
    helper?: FeedbackTextProps;
    /** Class on the root wrapper. */
    className?: string;
};

export declare const ProgressBar: React.ComponentType<ProgressBarProps>;
