import cn from 'classnames';
import React, { forwardRef } from 'react';

import { Breakpoint, isBreakpointBelow, useBreakpoint } from '../../../helpers';
import { Icon } from '../../base/icon/icon';
import { Text } from '../../base/typography/text/text';
import { Button, ButtonProps } from '../../buttons/button/button';
import FeedbackText, { FeedbackTextProps } from '../../form/feedback-text/feedback-text';
import { ProgressBar } from '../../loaders/progress-bar/progress-bar';
import styles from './attachment.module.scss';

export type AttachmentDirection = 'horizontal' | 'vertical';

export interface AttachmentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'color'> {
  /**
   * File name (required).
   */
  name: string;
  /**
   * Hint / error message shown below the card, wired via `aria-describedby`.
   */
  feedback?: FeedbackTextProps;
  /**
   * Pre-formatted file size (e.g. `'1.2 MB'`), shown after the name. Format it yourself.
   */
  fileSize?: string;
  /**
   * Material icon name for a leading file-type glyph.
   */
  icon?: string | null;
  /**
   * Action buttons (download, delete, …) shown on the right. `Button`s default to
   * `visualType="neutral"`.
   */
  actions?: React.ReactNode;
  /**
   * Show an upload progress bar.
   * @default false
   */
  isLoading?: boolean;
  /**
   * Upload progress (0..100); only shown while `isLoading`.
   * @default 0
   */
  progress?: number;
  /**
   * Hint text under the progress bar (e.g. `'Üleslaadimine'`); only shown while `isLoading`.
   */
  progressLabel?: string;
  /**
   * `false` switches the card to the error state (danger surface + warning glyph).
   */
  isValid?: boolean;
  /**
   * Force the layout: `'vertical'` stacks the content, `'horizontal'` keeps one row.
   * When omitted, derived from the viewport via `verticalBelow`.
   */
  direction?: AttachmentDirection;
  /**
   * Breakpoint below which the layout auto-switches to vertical (when `direction` is unset).
   * @default sm
   */
  verticalBelow?: Breakpoint;
  /**
   * Additional class name on the root element.
   */
  className?: string;
}

export const Attachment = forwardRef<HTMLDivElement, AttachmentProps>((props, ref) => {
  const {
    name,
    feedback,
    fileSize,
    icon,
    actions,
    isLoading = false,
    progress,
    progressLabel,
    isValid,
    direction,
    verticalBelow = 'sm',
    className,
    id,
    ...rest
  } = props;

  const currentBreakpoint = useBreakpoint();
  const isVertical = direction ? direction === 'vertical' : isBreakpointBelow(currentBreakpoint, verticalBelow);

  const reactId = React.useId();
  const rowId = id ?? `tedi-attachment-${reactId}`;
  const feedbackId = feedback ? feedback.id ?? `${rowId}-feedback` : undefined;

  const invalid = isValid === false;

  const attachmentBEM = cn(
    styles['tedi-attachment'],
    {
      [styles['tedi-attachment--invalid']]: invalid,
      [styles['tedi-attachment--multi-line']]: isLoading,
      [styles['tedi-attachment--vertical']]: isVertical,
    },
    className
  );

  const body = (
    <>
      {icon && (
        <span className={styles['tedi-attachment__icon']} aria-hidden="true">
          <Icon name={icon} size={18} color={invalid ? 'danger' : 'secondary'} />
        </span>
      )}
      <span className={styles['tedi-attachment__body']}>
        <span className={styles['tedi-attachment__name']}>
          <Text element="span" className={styles['tedi-attachment__name-text']}>
            {name}

            {invalid && (
              <Icon
                name="error"
                color="danger"
                display="inline"
                size={18}
                className={styles['tedi-attachment__invalid-icon']}
              />
            )}
          </Text>
          {fileSize && (
            <Text element="span" modifiers="small" color="tertiary" className={styles['tedi-attachment__file-size']}>
              {fileSize}
            </Text>
          )}
        </span>
        {isLoading && (
          <ProgressBar
            value={progress}
            ariaLabel={name}
            valuePosition="bottom"
            helper={progressLabel ? { text: progressLabel, type: 'hint' } : undefined}
            className={styles['tedi-attachment__progress']}
          />
        )}
      </span>
    </>
  );

  const renderAction = (node: React.ReactNode): React.ReactNode => {
    if (!React.isValidElement(node)) {
      return node;
    }

    if (node.type === React.Fragment) {
      const children = (node.props as { children?: React.ReactNode }).children;
      return React.cloneElement(node, undefined, React.Children.map(children, renderAction));
    }

    if (node.type === Button && (node.props as ButtonProps).visualType === undefined) {
      return React.cloneElement(node as React.ReactElement<ButtonProps>, { visualType: 'neutral' });
    }

    return node;
  };

  const actionsSlot = actions ? (
    <span className={styles['tedi-attachment__actions']} data-name="attachment-actions">
      {React.Children.map(actions, renderAction)}
    </span>
  ) : null;

  const card = (
    <div ref={ref} id={rowId} className={attachmentBEM} aria-describedby={feedbackId} {...rest}>
      {body}
      {actionsSlot}
    </div>
  );

  if (!feedback) return card;

  return (
    <div className={styles['tedi-attachment-wrapper']}>
      {card}
      <FeedbackText
        {...feedback}
        id={feedbackId}
        className={cn(styles['tedi-attachment__feedback'], feedback.className)}
      />
    </div>
  );
});

Attachment.displayName = 'Attachment';

export default Attachment;
