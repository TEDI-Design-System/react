import * as React from 'react';

/**
 * Attachment — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/misc/attachment/attachment.stories.tsx).
 */
export interface AttachmentProps {
  /** File name (required). */
  name: string;
  /** Hint / error message shown below the card, wired via `aria-describedby`. */
  feedback?: FeedbackTextProps;
  /** Pre-formatted file size (e.g. `'1.2 MB'`), shown after the name. Format it yourself. */
  fileSize?: string;
  /** Material icon name for a leading file-type glyph. */
  icon?: string;
  /** Action buttons (download, delete, …) shown on the right. `Button`s default to `visualType="neutral"`. */
  actions?: React.ReactNode;
  /** Show an upload progress bar. */
  isLoading?: boolean;
  /** Upload progress (0..100); only shown while `isLoading`. */
  progress?: number;
  /** Hint text under the progress bar (e.g. `'Üleslaadimine'`); only shown while `isLoading`. */
  progressLabel?: string;
  /** `false` switches the card to the error state (danger surface + warning glyph). */
  isValid?: boolean;
  /** Force the layout: `'vertical'` stacks the content, `'horizontal'` keeps one row. When omitted, derived from the viewport via `verticalBelow`. */
  direction?: "horizontal" | "vertical";
  /** Breakpoint below which the layout auto-switches to vertical (when `direction` is unset). */
  verticalBelow?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  /** Additional class name on the root element. */
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  id?: string;
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

export declare const Attachment: React.ComponentType<AttachmentProps>;
