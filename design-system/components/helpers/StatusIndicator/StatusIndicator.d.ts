import * as React from 'react';

/**
 * StatusIndicator — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/components/tags/status-indicator/status-indicator.stories.tsx).
 */
export interface StatusIndicatorProps {
  /** The status type, which determines the indicator color. */
  type?: "danger" | "success" | "warning" | "inactive";
  /** The size of the indicator. */
  size?: "sm" | "lg";
  /** Whether the indicator has a white border ring. */
  hasBorder?: boolean;
  /** Controls positioning of the indicator. - `'default'` — inline, no absolute positioning - `'top-right'` — absolutely positioned at the top-right corner of the parent */
  position?: "default" | "top-right";
  /** Additional class name(s) */
  className?: string;
}

export declare const StatusIndicator: React.ComponentType<StatusIndicatorProps>;
