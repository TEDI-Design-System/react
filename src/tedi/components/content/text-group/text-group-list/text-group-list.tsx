import cn from 'classnames';
import React from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../../helpers';
import { Label } from '../../label/label';
import styles from '../text-group.module.scss';

type TextAlign = 'left' | 'right';

type TextGroupListBreakpointProps =
  | {
      /**
       * Type of text group layout.
       */
      type?: 'horizontal';
      /**
       * Alignment for the label text.
       * @default 'left'
       */
      labelAlign?: TextAlign;
      /**
       * Width for the label column (e.g., `'200px'`, `'30%'`, or a `number`
       * interpreted as a percent).
       * @default 'auto'
       */
      labelWidth?: string | number;
    }
  | {
      /**
       * Type of text group layout.
       */
      type: 'vertical';
      /**
       * Alignment for the label text. Vertical layout only supports left
       * alignment — pass `'right'` only with `type: 'horizontal'`.
       * @default 'left'
       */
      labelAlign?: 'left';
      /**
       * Width for the label column (e.g., `'200px'`, `'30%'`, or a `number`
       * interpreted as a percent).
       * @default 'auto'
       */
      labelWidth?: string | number;
    };

export interface TextGroupListItem {
  /**
   * Label rendered as the `<dt>` for this row. Strings are auto-wrapped in
   * `<Label>`; any other ReactNode is rendered as-is.
   */
  label: React.ReactNode;
  /**
   * Value rendered as the `<dd>` for this row.
   */
  value: React.ReactNode | React.ReactNode[];
  /**
   * Per-row override of the list-level `labelAlign`. Falls back to the list's
   * value when omitted.
   */
  labelAlign?: TextAlign;
  /**
   * Per-row override of the list-level `labelWidth`. Falls back to the list's
   * value when omitted.
   */
  labelWidth?: string | number;
}

export type TextGroupListProps = BreakpointSupport<TextGroupListBreakpointProps> & {
  /**
   * Label / value pairs rendered together inside a **single** `<dl>` element,
   * preserving the definition-list semantics that stacking N individual
   * `<TextGroup>`s would break.
   */
  items: TextGroupListItem[];
  /**
   * Additional class name(s) to apply to the root `<dl>` element.
   */
  className?: string;
};

const renderLabelContent = (label: React.ReactNode): React.ReactNode =>
  typeof label === 'string' ? <Label>{label}</Label> : label;

const resolveLabelWidth = (labelWidth: string | number): string =>
  typeof labelWidth === 'number' ? `${labelWidth}%` : labelWidth;

/**
 * Multi-row variant of `TextGroup`. Visually identical to stacking N
 * `<TextGroup>` rows, but wraps every label / value pair in **one** semantic
 * `<dl>` — so screen readers announce them as one definition list, not N
 * fragments. Reuse the same `type` / `labelWidth` / `labelAlign` knobs as the
 * single-pair component; per-row overrides are available via `items[i]`.
 */
export const TextGroupList = (props: TextGroupListProps): JSX.Element => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const {
    items,
    labelWidth = 'auto',
    className,
    type = 'vertical',
    labelAlign = 'left',
  } = getCurrentBreakpointProps<TextGroupListProps>(props);

  const listBEM = cn(
    styles['tedi-text-group'],
    styles['tedi-text-group--list'],
    styles[`tedi-text-group--${type}`],
    className
  );
  const listLabelWidth = resolveLabelWidth(labelWidth);

  return (
    <dl className={listBEM} style={{ '--label-width': listLabelWidth } as React.CSSProperties}>
      {items.map((item, index) => {
        const rowLabelAlign = item.labelAlign ?? labelAlign;
        const rowStyle: React.CSSProperties | undefined =
          item.labelWidth !== undefined
            ? ({ '--label-width': resolveLabelWidth(item.labelWidth) } as React.CSSProperties)
            : undefined;
        return (
          <div key={index} className={styles['tedi-text-group__row']} style={rowStyle}>
            <dt className={cn(styles['tedi-text-group__label'], styles[`tedi-text-group--align-${rowLabelAlign}`])}>
              {renderLabelContent(item.label)}
            </dt>
            <dd className={cn(styles['tedi-text-group__value'])}>{item.value}</dd>
          </div>
        );
      })}
    </dl>
  );
};

TextGroupList.displayName = 'TextGroup.List';
