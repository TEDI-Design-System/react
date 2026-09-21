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
       * @default left
       */
      labelAlign?: TextAlign;
      /**
       * Alignment for the value text. `'right'` grows the value so it sits flush
       * against the trailing edge (numeric / summary columns). Horizontal only.
       * @default left
       */
      valueAlign?: TextAlign;
      /**
       * Width for the label column (e.g., `'200px'`, `'30%'`, or a `number`
       * interpreted as a percent).
       * @default auto
       */
      labelWidth?: string | number;
      /**
       * Vertical alignment of the label against its value within each row.
       * `'center'` aligns them on the cross axis (useful when a value is taller,
       * e.g. a `StatusBadge`). Horizontal layout only.
       * @default 'start'
       */
      rowAlign?: 'start' | 'center';
    }
  | {
      /**
       * Type of text group layout.
       */
      type: 'vertical';
      /**
       * Alignment for the label text. Vertical layout only supports left
       * alignment — pass `'right'` only with `type: 'horizontal'`.
       * @default left
       */
      labelAlign?: 'left';
      /**
       * Value alignment is horizontal-only; not available in vertical layout.
       */
      valueAlign?: never;
      /**
       * Row alignment is horizontal-only; not available in vertical layout.
       */
      rowAlign?: never;
      /**
       * Width for the label column (e.g., `'200px'`, `'30%'`, or a `number`
       * interpreted as a percent).
       * @default auto
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
   * Value rendered as the `<dd>` for this row. Accepts multiple nodes — a trailing
   * `StatusBadge`, `Tag`, or info tooltip renders inline beside the text.
   */
  value: React.ReactNode | React.ReactNode[];
  /**
   * Per-row override of the list-level `labelAlign`. Falls back to the list's
   * value when omitted.
   */
  labelAlign?: TextAlign;
  /**
   * Per-row override of the list-level `valueAlign`. Falls back to the list's
   * value when omitted.
   */
  valueAlign?: TextAlign;
  /**
   * Per-row override of the list-level `labelWidth`. Falls back to the list's
   * value when omitted.
   */
  labelWidth?: string | number;
  /**
   * In a multi-column layout (`columns > 1`), span this row across N grid
   * columns. Ignored in single-column layouts. Clamped to the column count.
   */
  colSpan?: number;
}

export type TextGroupListProps = BreakpointSupport<TextGroupListBreakpointProps> & {
  /**
   * Label / value pairs rendered together inside a **single** `<dl>` element,
   * preserving the definition-list semantics that stacking N individual
   * `<TextGroup>`s would break.
   */
  items: TextGroupListItem[];
  /**
   * Lay the pairs out in this many equal-width columns (CSS grid, filling
   * left-to-right, top-to-bottom). `1` keeps the plain stacked list.
   * @default 1
   */
  columns?: number;
  /**
   * Vertical gap between rows. Accepts any CSS length (a `number` is treated as
   * pixels). Defaults to the component's compact spacing.
   */
  rowGap?: string | number;
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
    valueAlign = 'left',
    columns = 1,
    rowGap,
    rowAlign = 'start',
  } = getCurrentBreakpointProps<TextGroupListProps>(props);

  const listBEM = cn(
    styles['tedi-text-group'],
    styles['tedi-text-group--list'],
    styles[`tedi-text-group--${type}`],
    { [styles['tedi-text-group--columns']]: columns > 1 },
    { [styles['tedi-text-group--row-align-center']]: type === 'horizontal' && rowAlign === 'center' },
    className
  );
  const listLabelWidth = resolveLabelWidth(labelWidth);
  const listStyle = {
    '--label-width': listLabelWidth,
    ...(columns > 1 ? { '--tedi-text-group-columns': columns } : {}),
    ...(rowGap !== undefined
      ? { '--tedi-text-group-list-gap': typeof rowGap === 'number' ? `${rowGap}px` : rowGap }
      : {}),
  } as React.CSSProperties;

  return (
    <dl className={listBEM} style={listStyle}>
      {items.map((item, index) => {
        const rowLabelAlign = item.labelAlign ?? labelAlign;
        const rowValueAlign = item.valueAlign ?? valueAlign;
        const rowStyle: React.CSSProperties = {};
        if (item.labelWidth !== undefined) {
          (rowStyle as Record<string, string>)['--label-width'] = resolveLabelWidth(item.labelWidth);
        }
        if (columns > 1 && item.colSpan && item.colSpan > 1) {
          rowStyle.gridColumn = `span ${Math.min(item.colSpan, columns)}`;
        }
        const hasRowStyle = Object.keys(rowStyle).length > 0;
        return (
          <div key={index} className={styles['tedi-text-group__row']} style={hasRowStyle ? rowStyle : undefined}>
            <dt className={cn(styles['tedi-text-group__label'], styles[`tedi-text-group--align-${rowLabelAlign}`])}>
              {renderLabelContent(item.label)}
            </dt>
            <dd
              className={cn(styles['tedi-text-group__value'], styles[`tedi-text-group__value--align-${rowValueAlign}`])}
            >
              {item.value}
            </dd>
          </div>
        );
      })}
    </dl>
  );
};

TextGroupList.displayName = 'TextGroup.List';
