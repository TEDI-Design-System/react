import cn from 'classnames';
import React, { useId, useState } from 'react';

import { useLabels } from '../../../providers/label-provider';
import { Icon } from '../../base/icon/icon';
import { Text } from '../../base/typography/text/text';
import styles from './vertical-stepper.module.scss';
import { useVerticalStepperContext } from './vertical-stepper-context';

export type VerticalStepperItemState = 'default' | 'completed' | 'error' | 'disabled';

export interface VerticalStepperItemProps {
  /**
   * Step title.
   */
  title: React.ReactNode;
  /**
   * Optional secondary line rendered under the title.
   */
  description?: React.ReactNode;
  /**
   * Visual / semantic state of the step.
   * - `completed` — green indicator + check icon
   * - `error` — red indicator + error icon
   * - `disabled` — muted, non-interactive
   * @default default
   */
  state?: VerticalStepperItemState;
  /**
   * Marks the step as the active one — blue indicator, bold blue title and
   * `aria-current="step"`. Independent from `state`.
   */
  current?: boolean;
  /**
   * Navigates when set; renders the title as an anchor. Ignored when the step
   * has sub-steps (`children`) — then the title toggles the sub-step list instead.
   */
  href?: string;
  /**
   * Click handler. Without `href` the title renders as a `<button>`. Ignored
   * when the step has sub-steps.
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  /**
   * Element used for the interactive title. Defaults to `'a'` when `href` is set,
   * otherwise `'button'`. Ignored for `disabled` steps and steps with sub-steps.
   */
  as?: 'a' | 'button';
  /**
   * Trailing content under the title — a `StatusBadge`, `Link`, `Button`, `Text`, etc.
   */
  info?: React.ReactNode;
  /**
   * `VerticalStepper.SubItem` elements. When present the step becomes an
   * expandable section: the title toggles the (collapsible) sub-step list.
   */
  children?: React.ReactNode;
  /**
   * Controlled open state of the sub-step list. Use with `onToggle`.
   */
  open?: boolean;
  /**
   * Initial open state of the sub-step list (uncontrolled).
   */
  defaultOpen?: boolean;
  /**
   * Fired when the sub-step list is toggled.
   */
  onToggle?: (open: boolean) => void;
  /**
   * Additional class name applied to the `<li>`.
   */
  className?: string;
  /**
   * Step number, injected automatically by `VerticalStepper`. Do not set manually.
   * @internal
   */
  index?: number;
}

export const VerticalStepperItem = (props: VerticalStepperItemProps): JSX.Element => {
  const { getLabel } = useLabels();
  const { compact } = useVerticalStepperContext();
  const {
    title,
    description,
    state = 'default',
    current = false,
    href,
    onClick,
    as,
    info,
    children,
    open,
    defaultOpen,
    onToggle,
    className,
    index,
  } = props;

  const generatedId = useId();
  const subListId = `tedi-vertical-stepper-sublist-${generatedId}`;
  const hasChildren = React.Children.count(children) > 0;
  const isDisabled = state === 'disabled';
  const isInteractive = !isDisabled && !hasChildren && (href !== undefined || onClick !== undefined);
  const Element: 'a' | 'button' = as ?? (href ? 'a' : 'button');

  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);
  const isOpen = open ?? internalOpen;
  const handleToggle = (): void => {
    const next = !isOpen;
    if (open === undefined) setInternalOpen(next);
    onToggle?.(next);
  };

  const itemBEM = cn(
    styles['tedi-vertical-stepper__item'],
    styles[`tedi-vertical-stepper__item--${state}`],
    {
      [styles['tedi-vertical-stepper__item--current']]: current,
      [styles['tedi-vertical-stepper__item--has-children']]: hasChildren,
    },
    className
  );

  const indicator = (
    <span className={styles['tedi-vertical-stepper__indicator']}>
      {compact ? (
        state === 'completed' ? (
          <Icon name="check" size={12} color="white" label={getLabel('stepper.completed')} />
        ) : state === 'error' ? (
          <Icon name="priority_high" size={12} color="white" label={getLabel('stepper.error')} />
        ) : null
      ) : (
        <span className={styles['tedi-vertical-stepper__number']}>{index}</span>
      )}
    </span>
  );

  const titleNode = (
    <Text element="span" className={styles['tedi-vertical-stepper__label']}>
      <span className={styles['tedi-vertical-stepper__label-text']}>{title}</span>
      {!compact && state === 'completed' && (
        <Icon
          name="check"
          color="success"
          size={16}
          display="inline"
          label={getLabel('stepper.completed')}
          className={styles['tedi-vertical-stepper__label-icon']}
        />
      )}
      {!compact && state === 'error' && (
        <Icon
          name="error"
          color="danger"
          size={16}
          display="inline"
          label={getLabel('stepper.error')}
          className={styles['tedi-vertical-stepper__label-icon']}
        />
      )}
      {isDisabled && <span className="visually-hidden"> ({getLabel('stepper.disabled')})</span>}
    </Text>
  );

  const description_ = description && (
    <Text element="span" modifiers="small" color="tertiary" className={styles['tedi-vertical-stepper__description']}>
      {description}
    </Text>
  );

  const info_ = info && <div className={styles['tedi-vertical-stepper__info']}>{info}</div>;

  return (
    <li aria-current={current ? 'step' : undefined} className={itemBEM}>
      {indicator}
      <div className={styles['tedi-vertical-stepper__content']}>
        {hasChildren ? (
          <>
            <button
              type="button"
              className={cn(styles['tedi-vertical-stepper__link'], styles['tedi-vertical-stepper__toggle'])}
              aria-expanded={isOpen}
              aria-controls={subListId}
              onClick={handleToggle}
            >
              {titleNode}
              <Icon
                name="expand_more"
                size={18}
                aria-hidden="true"
                className={cn(styles['tedi-vertical-stepper__chevron'], {
                  [styles['tedi-vertical-stepper__chevron--open']]: isOpen,
                })}
              />
            </button>
            {description_}
            {info_}
            <ul id={subListId} hidden={!isOpen} className={styles['tedi-vertical-stepper__sub-list']}>
              {children}
            </ul>
          </>
        ) : (
          <>
            {isInteractive ? (
              <Element
                href={Element === 'a' ? href : undefined}
                type={Element === 'button' ? 'button' : undefined}
                onClick={onClick}
                className={styles['tedi-vertical-stepper__link']}
              >
                {titleNode}
              </Element>
            ) : (
              titleNode
            )}
            {description_}
            {info_}
          </>
        )}
      </div>
    </li>
  );
};

VerticalStepperItem.displayName = 'VerticalStepperItem';

export default VerticalStepperItem;
