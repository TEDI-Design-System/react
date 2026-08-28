import cn from 'classnames';
import { Children, forwardRef, isValidElement, type ReactNode } from 'react';

import styles from './horizontal-stepper.module.scss';
import { HorizontalStepperStepNumberContext } from './horizontal-stepper-context';
import { HorizontalStepperItem } from './horizontal-stepper-item';

export type HorizontalStepperBackground = 'default' | 'transparent';
export type HorizontalStepperCompact = boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface HorizontalStepperProps {
  /**
   * `HorizontalStepper.Item` elements, one per step.
   */
  children: ReactNode;
  /**
   * Accessible name for the navigation landmark.
   */
  'aria-label'?: string;
  /**
   * Background style of the stepper track.
   * @default default
   */
  background?: HorizontalStepperBackground;
  /**
   * Collapse labels so only the indicators plus the selected step's label are
   * visible. `true` collapses at every width; a breakpoint (`'sm'`, `'md'`,
   * `'lg'`, `'xl'`, `'xxl'`) collapses only below that breakpoint.
   * @default sm
   */
  compact?: HorizontalStepperCompact;
  /**
   * Additional class name on the root element.
   */
  className?: string;
}

const HorizontalStepperComponent = forwardRef<HTMLElement, HorizontalStepperProps>(
  ({ children, 'aria-label': ariaLabel, background = 'default', compact = 'sm', className }, ref) => {
    let stepNumber = 0;
    const items = Children.map(children, (child) => {
      if (isValidElement(child) && child.type === HorizontalStepperItem) {
        stepNumber += 1;
        return (
          <HorizontalStepperStepNumberContext.Provider value={stepNumber}>
            {child}
          </HorizontalStepperStepNumberContext.Provider>
        );
      }
      return child;
    });

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        data-name="horizontal-stepper"
        className={cn(
          styles['tedi-horizontal-stepper'],
          {
            [styles['tedi-horizontal-stepper--transparent']]: background === 'transparent',
            [styles['tedi-horizontal-stepper--compact']]: compact === true,
          },
          typeof compact === 'string' && styles[`tedi-horizontal-stepper--compact-${compact}`],
          className
        )}
      >
        <ol className={styles['tedi-horizontal-stepper__list']}>{items}</ol>
      </nav>
    );
  }
);

HorizontalStepperComponent.displayName = 'HorizontalStepper';

export const HorizontalStepper = Object.assign(HorizontalStepperComponent, {
  Item: HorizontalStepperItem,
});

export default HorizontalStepper;
