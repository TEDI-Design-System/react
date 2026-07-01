import cn from 'classnames';

import styles from './vertical-stepper.module.scss';

/**
 * @deprecated Use `VerticalStepper` from `@tedi-design-system/react/tedi` instead.
 */
export interface VerticalStepperProps {
  /**
   * SubItem or Separator
   */
  children: React.ReactNode;
  /**
   * Custom class name.
   */
  className?: string;
  /** Compact version of the stepper */
  isCompact?: boolean;
}

/**
 * @deprecated Use `VerticalStepper` from `@tedi-design-system/react/tedi` instead.
 */
export const VerticalStepper = (props: VerticalStepperProps): JSX.Element => {
  const { className, children, isCompact } = props;

  const StepperBEM = cn(styles['stepper'], className, { [styles['stepper--compact']]: isCompact });

  return (
    <nav>
      <ol role="tree" className={StepperBEM}>
        {children}
      </ol>
    </nav>
  );
};

export default VerticalStepper;
