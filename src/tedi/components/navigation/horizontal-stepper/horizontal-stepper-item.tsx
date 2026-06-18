import cn from 'classnames';
import { useContext } from 'react';

import { useLabels } from '../../../providers/label-provider';
import { Icon } from '../../base/icon/icon';
import styles from './horizontal-stepper.module.scss';
import { HorizontalStepperStepNumberContext } from './horizontal-stepper-context';

export interface HorizontalStepperItemProps {
  /**
   * Step label shown next to the indicator.
   */
  label: string;
  /**
   * Secondary text rendered below the label.
   */
  description?: string;
  /**
   * Marks the step as completed — the indicator shows a check glyph. Ignored
   * while `error` is set.
   */
  completed?: boolean;
  /**
   * Marks the step as invalid — the indicator shows a warning glyph and the
   * step uses the danger colours. Takes precedence over `completed`.
   */
  error?: boolean;
  /**
   * Marks the step as the current one. Sets `aria-current="step"` and renders
   * the selected (filled) treatment; the step is not clickable while selected.
   */
  selected?: boolean;
  /**
   * Prevents the step from being clicked or focused. Use for future steps the
   * user shouldn't reach yet (e.g. when validation runs step-by-step). Leave
   * completed steps enabled so users can navigate back to them.
   */
  disabled?: boolean;
  /**
   * Fired when the user activates the step. Does not fire when the step is
   * `selected` (already current) or `disabled`.
   */
  onSelect?: () => void;
  /**
   * Additional class name on the item's root element.
   */
  className?: string;
}

export const HorizontalStepperItem = (props: HorizontalStepperItemProps): JSX.Element => {
  const { label, description, completed, error, selected, disabled, onSelect, className } = props;
  const { getLabel } = useLabels();
  const stepNumber = useContext(HorizontalStepperStepNumberContext);
  const isCompleted = !!completed && !error;

  const handleClick = (): void => {
    if (selected || disabled) return;
    onSelect?.();
  };

  return (
    <li
      data-name="horizontal-stepper-item"
      className={cn(
        styles['tedi-horizontal-stepper-item'],
        {
          [styles['tedi-horizontal-stepper-item--selected']]: selected,
          [styles['tedi-horizontal-stepper-item--completed']]: isCompleted,
          [styles['tedi-horizontal-stepper-item--error']]: error,
          [styles['tedi-horizontal-stepper-item--disabled']]: disabled,
        },
        className
      )}
    >
      <button
        type="button"
        className={styles['tedi-horizontal-stepper-item__step']}
        disabled={disabled}
        aria-current={selected ? 'step' : undefined}
        onClick={handleClick}
      >
        <span className={styles['tedi-horizontal-stepper-item__indicator']}>
          {isCompleted ? (
            <Icon name="check" color="white" size={18} label={getLabel('stepper.completed')} />
          ) : error ? (
            <Icon name="priority_high" color="white" size={18} label={getLabel('stepper.error')} />
          ) : (
            <span className={styles['tedi-horizontal-stepper-item__number']}>{stepNumber}</span>
          )}
        </span>
        <span className={styles['tedi-horizontal-stepper-item__content']}>
          <span className={styles['tedi-horizontal-stepper-item__label']}>{label}</span>
          {description && <span className={styles['tedi-horizontal-stepper-item__description']}>{description}</span>}
        </span>
      </button>
    </li>
  );
};

HorizontalStepperItem.displayName = 'HorizontalStepperItem';

export default HorizontalStepperItem;
