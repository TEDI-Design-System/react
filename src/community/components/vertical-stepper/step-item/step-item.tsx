import cn from 'classnames';
import React from 'react';

import { Col, Row } from '../../../../tedi';
import { Icon } from '../../../../tedi/components/base/icon/icon';
import Collapse from '../../../../tedi/components/buttons/collapse/collapse';
import styles from '../vertical-stepper.module.scss';

export interface StepItemProps {
  /**
   * SubItems
   */
  children?: React.ReactNode;
  /**
   * Custom class name.
   */
  className?: string;

  /** Shows the current step */
  isSelected?: boolean;
  hasNumber?: boolean;
  /**Step title text */
  title: string | React.ReactNode;
  href?: string;
  state?: 'default' | 'completed' | 'error' | 'disabled';
  hasIcon?: boolean;
  onClick?: () => void;
  /**
   * Additional info components like StatusBadge, Button, Link or Text.
   */
  info?: React.ReactNode;
}

export const StepItem = ({
  children,
  className,
  isSelected,
  hasIcon,
  title,
  href,
  onClick,
  state = 'default',
  info,
}: StepItemProps): JSX.Element => {
  const [open, selected] = React.useState(false);
  const stepItemClassName = cn(
    styles['stepper-item'],
    {
      [styles[state]]: state,
      [styles['selected']]: isSelected,
      [styles['has-info']]: info && !children,
      [styles['info-with-children']]: info && children,
      [styles['stepper-collapse-open']]: open,
    },
    className
  );

  return (
    <li role="treeitem" aria-selected={isSelected} className={stepItemClassName}>
      <span className={styles['stepper-counter']}></span>
      <div className={styles['stepper-content']}>
        {children ? (
          <Collapse
            onToggle={(isOpen) => selected(isOpen)}
            open={open}
            hideCollapseText
            id="vertical-stepper-collapse"
            className={styles['stepper-item-collapse']}
            title={
              <>
                <Row alignItems="start">
                  <Col className={styles['stepper-link']}>
                    {title}
                    {hasIcon && state === 'error' && (
                      <Icon
                        name="error"
                        color="danger"
                        size={16}
                        display="inline"
                        className={styles['radio__tooltip-icon']}
                      />
                    )}
                    {hasIcon && state === 'completed' && (
                      <Icon
                        name="check"
                        color="success"
                        size={16}
                        display="inline"
                        className={styles['radio__tooltip-icon']}
                      />
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>{info}</Col>
                </Row>
              </>
            }
          >
            {children && <ul className={styles['sub-item-list']}>{children}</ul>}
          </Collapse>
        ) : (
          <>
            <div className={styles['stepper-link-container']}>
              <a
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  if (onClick) {
                    onClick();
                  }
                }}
                className={styles['stepper-link']}
              >
                {title}
              </a>
              <span className={styles['stepper-link-icon']}>
                {hasIcon && state === 'error' && <Icon name="error" color="danger" size={16} display="inline" />}
                {hasIcon && state === 'completed' && <Icon name="check" color="success" size={16} display="inline" />}
              </span>
            </div>
            <Row>
              <Col>{info}</Col>
            </Row>
          </>
        )}
      </div>
      <div className={styles['stepper-line']}></div>
    </li>
  );
};
