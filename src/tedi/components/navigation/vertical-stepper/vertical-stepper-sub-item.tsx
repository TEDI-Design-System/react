import cn from 'classnames';
import React, { forwardRef } from 'react';

import { useLabels } from '../../../providers/label-provider';
import { Icon } from '../../base/icon/icon';
import { Text } from '../../base/typography/text/text';
import styles from './vertical-stepper.module.scss';

export type VerticalStepperSubItemState = 'default' | 'completed' | 'error' | 'disabled' | 'informative';

export interface VerticalStepperSubItemProps {
  /**
   * Sub-step label.
   */
  title: React.ReactNode;
  /**
   * Visual / semantic state of the sub-step.
   * - `completed` — green dot, trailing check icon
   * - `error` — red dot, trailing error icon
   * - `disabled` — muted, non-interactive
   * - `informative` — read-only row (no link), e.g. "filled in by an official"
   * @default default
   */
  state?: VerticalStepperSubItemState;
  /**
   * Marks the sub-step as the active one — blue ring dot, bold blue label and
   * `aria-current="step"`. Independent from `state`.
   */
  current?: boolean;
  /**
   * Navigates when set; renders the label as an anchor. Mutually usable with `onClick`.
   */
  href?: string;
  /**
   * Click handler. Without `href` the label renders as a `<button>`.
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  /**
   * Element used for the interactive label. Defaults to `'a'` when `href` is set,
   * otherwise `'button'`. Ignored for `disabled` / `informative` rows (rendered as text).
   */
  as?: 'a' | 'button';
  /**
   * Trailing content rendered under the label — a `StatusBadge`, `Link`, `Button`, `Text`, etc.
   */
  info?: React.ReactNode;
  /**
   * Additional class name applied to the `<li>`.
   */
  className?: string;
}

export const VerticalStepperSubItem = forwardRef<HTMLLIElement, VerticalStepperSubItemProps>((props, ref) => {
  const { getLabel } = useLabels();
  const { title, state = 'default', current = false, href, onClick, as, info, className } = props;

  const isStatic = state === 'disabled' || state === 'informative';
  const isInteractive = !isStatic && (href !== undefined || onClick !== undefined);
  const Element: 'a' | 'button' = as ?? (href ? 'a' : 'button');

  const subItemBEM = cn(
    styles['tedi-vertical-stepper__sub-item'],
    styles[`tedi-vertical-stepper__sub-item--${state}`],
    { [styles['tedi-vertical-stepper__sub-item--current']]: current },
    className
  );

  const label = (
    <Text element="span" className={styles['tedi-vertical-stepper__label']}>
      <span className={styles['tedi-vertical-stepper__label-text']}>{title}</span>
      {state === 'completed' && (
        <Icon
          name="check"
          color="success"
          size={16}
          display="inline"
          label={getLabel('stepper.completed')}
          className={styles['tedi-vertical-stepper__label-icon']}
        />
      )}
      {state === 'error' && (
        <Icon
          name="error"
          color="danger"
          size={16}
          display="inline"
          label={getLabel('stepper.error')}
          className={styles['tedi-vertical-stepper__label-icon']}
        />
      )}
      {state === 'disabled' && <span className="visually-hidden"> ({getLabel('stepper.disabled')})</span>}
    </Text>
  );

  // `aria-current` goes on the focusable link/button when interactive (announced
  // on focus), otherwise on the `<li>` (static / informative / disabled rows).
  const ariaCurrent = current ? 'step' : undefined;

  return (
    <li ref={ref} aria-current={isInteractive ? undefined : ariaCurrent} className={subItemBEM}>
      <span className={styles['tedi-vertical-stepper__sub-indicator']} aria-hidden="true">
        <span className={styles['tedi-vertical-stepper__sub-dot']} />
      </span>
      <span className={styles['tedi-vertical-stepper__content']}>
        {isInteractive ? (
          <Element
            href={Element === 'a' ? href : undefined}
            type={Element === 'button' ? 'button' : undefined}
            onClick={onClick}
            aria-current={ariaCurrent}
            className={styles['tedi-vertical-stepper__link']}
          >
            {label}
          </Element>
        ) : (
          label
        )}
        {info && <div className={styles['tedi-vertical-stepper__info']}>{info}</div>}
      </span>
    </li>
  );
});

VerticalStepperSubItem.displayName = 'VerticalStepperSubItem';

export default VerticalStepperSubItem;
