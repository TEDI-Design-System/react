import * as React from 'react';

/**
 * FeedbackText — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/form/feedback-text/feedback-text.stories.tsx).
 */
export interface FeedbackTextProps {
  /** Helper text */
  text: boolean | ReactNode[] | React.ReactNode;
  /** ID to reference the helper from aria-describedby attributes. If omitted, then the id might be set through a parent component. */
  id?: string;
  /** Additional custom class. */
  className?: string;
  /** Type of form-helper. */
  type?: "hint" | "valid" | "error";
  /** Position of the helper. */
  position?: "left" | "right";
}

export declare const FeedbackText: React.ComponentType<FeedbackTextProps>;
