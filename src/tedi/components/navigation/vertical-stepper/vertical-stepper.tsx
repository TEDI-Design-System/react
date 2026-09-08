import cn from 'classnames';
import React, { forwardRef } from 'react';

import styles from './vertical-stepper.module.scss';
import { VerticalStepperContext } from './vertical-stepper-context';
import { VerticalStepperItem, VerticalStepperItemProps } from './vertical-stepper-item';
import { VerticalStepperSubItem } from './vertical-stepper-sub-item';

export interface VerticalStepperProps {
  /**
   * `VerticalStepper.Item` elements (and optional `Separator`s between them).
   * Items are auto-numbered in source order.
   */
  children: React.ReactNode;
  /**
   * Compact density — smaller indicators and tighter rows. Completed / error
   * steps show their state icon inside the indicator instead of the number.
   * @default false
   */
  compact?: boolean;
  /**
   * Accessible name for the `<nav>` landmark.
   */
  'aria-label'?: string;
  /**
   * Additional class name applied to the `<ol>`.
   */
  className?: string;
}

const VerticalStepperInner = forwardRef<HTMLOListElement, VerticalStepperProps>((props, ref) => {
  const { children, compact = false, 'aria-label': ariaLabel, className } = props;

  let stepNumber = 0;
  const numberedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === VerticalStepperItem) {
      stepNumber += 1;
      return React.cloneElement(child as React.ReactElement<VerticalStepperItemProps>, { index: stepNumber });
    }
    return child;
  });

  return (
    <VerticalStepperContext.Provider value={{ compact }}>
      <nav aria-label={ariaLabel}>
        <ol
          ref={ref}
          className={cn(
            styles['tedi-vertical-stepper'],
            { [styles['tedi-vertical-stepper--compact']]: compact },
            className
          )}
        >
          {numberedChildren}
        </ol>
      </nav>
    </VerticalStepperContext.Provider>
  );
});

VerticalStepperInner.displayName = 'VerticalStepper';

export const VerticalStepper = Object.assign(VerticalStepperInner, {
  Item: VerticalStepperItem,
  SubItem: VerticalStepperSubItem,
});

export default VerticalStepper;
