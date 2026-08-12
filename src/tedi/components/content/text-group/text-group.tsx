import cn from 'classnames';
import React from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import { Label } from '../label/label';
import styles from './text-group.module.scss';
import { TextGroupList } from './text-group-list/text-group-list';

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
       * Alignment for the value text. `'right'` grows the value so it sits flush
       * against the trailing edge. Horizontal only.
       * @default 'left'
       */
      valueAlign?: TextAlign;
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
       * Value alignment is horizontal-only; not available in vertical layout.
       */
      valueAlign?: never;
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
  label: React.ReactNode;
  /**
   * Value displayed alongside the label
   */
  value: React.ReactNode | React.ReactNode[];
  /**
   * Additional class name(s) to apply to the element
   */
  className?: string;
};

const renderLabelContent = (label: React.ReactNode): React.ReactNode =>
  typeof label === 'string' ? <Label>{label}</Label> : label;

const resolveLabelWidth = (labelWidth: string | number): string =>
  typeof labelWidth === 'number' ? `${labelWidth}%` : labelWidth;

const TextGroupBase = (props: TextGroupProps): JSX.Element => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const {
    label,
    value,
    labelWidth = 'auto',
    className,
    type = 'vertical',
    labelAlign = 'left',
    valueAlign = 'left',
  } = getCurrentBreakpointProps<TextGroupProps>(props);

  const textGroupBEM = cn(styles['tedi-text-group'], styles[`tedi-text-group--${type}`], className);
  const labelWidthStyle = resolveLabelWidth(labelWidth);

  return (
    <dl className={textGroupBEM} style={{ '--label-width': labelWidthStyle } as React.CSSProperties}>
      <dt className={cn(styles['tedi-text-group__label'], styles[`tedi-text-group--align-${labelAlign}`])}>
        {renderLabelContent(label)}
      </dt>
      <dd className={cn(styles['tedi-text-group__value'], styles[`tedi-text-group__value--align-${valueAlign}`])}>
        {value}
      </dd>
    </dl>
  );
};

TextGroupBase.displayName = 'TextGroup';

export const TextGroup = Object.assign(TextGroupBase, {
  List: TextGroupList,
});
