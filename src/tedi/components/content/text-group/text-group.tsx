import cn from 'classnames';
import React from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import { Label } from '../label/label';
import styles from './text-group.module.scss';

type TextAlign = 'left' | 'right';

type TextGroupBreakpointProps =
  | {
      /**
       * Type of text group layout
       */
      type?: 'horizontal';
      /**
       * Alignment for the label text
       *  @default 'left'
       */
      labelAlign?: TextAlign;
      /**
       * Width for the label (e.g., '200px', '30%', etc.)
       * @default 'auto'
       */
      labelWidth?: string | number;
    }
  | {
      /**
       * Type of text group layout
       */
      type: 'vertical';
      /**
       * Alignment for the label text
       *  @default 'left'
       */
      labelAlign?: 'left';
      /**
       * Width for the label (e.g., '200px', '30%', etc.)
       * @default 'auto'
       */
      labelWidth?: string | number;
    };

export type TextGroupProps = BreakpointSupport<TextGroupBreakpointProps> & {
  /**
   * Label for the text group
   */
  label: string;
  /**
   * Value displayed alongside the label
   */
  value: React.ReactNode | React.ReactNode[];
  /**
   * Additional class name(s) to apply to the element
   */
  className?: string;
};

export const TextGroup = (props: TextGroupProps): JSX.Element => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const {
    label,
    value,
    labelWidth = 'auto',
    className,
    type = 'vertical',
    labelAlign = 'left',
  } = getCurrentBreakpointProps<TextGroupProps>(props);

  const textGroupBEM = cn(styles['tedi-text-group'], styles[`tedi-text-group--${type}`], className);
  const labelWidthStyle = typeof labelWidth === 'number' ? `${labelWidth}%` : labelWidth;

  return (
    <dl className={textGroupBEM} style={{ '--label-width': labelWidthStyle }}>
      <dt className={cn(styles['tedi-text-group__label'], styles[`tedi-text-group--align-${labelAlign}`])}>
        <Label>{label}</Label>
      </dt>
      <dd className={cn(styles['tedi-text-group__value'])}>{value}</dd>
    </dl>
  );
};
