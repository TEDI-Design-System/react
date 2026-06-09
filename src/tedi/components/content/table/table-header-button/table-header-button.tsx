import cn from 'classnames';
import React, { forwardRef } from 'react';

import { Icon, IconSize } from '../../../base/icon/icon';
import styles from './table-header-button.module.scss';

interface TableHeaderButtonBaseProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'aria-label'> {
  /**
   * Material icon name rendered inside the button (e.g. `unfold_more`,
   * `arrow_downward`, `filter_alt`).
   */
  icon: string;
  /**
   * Render the icon's "filled" variant. Pair with `selected` for a fully
   * activated look (e.g. an applied filter).
   * @default false
   */
  filled?: boolean;
  /**
   * When `true`, the icon paints in the brand colour to indicate an active
   * sort or filter at rest. Hover / focus / active states are still applied
   * on top.
   * @default false
   */
  selected?: boolean;
  /** Size of the icon, in pixels. @default 18 */
  iconSize?: IconSize;
}

/**
 * Accessibility-driven discriminated union enforcing WCAG SC 4.1.2 at compile
 * time:
 * - **Labelled** — `children` provide visible text (e.g. a sortable column
 *   header), which is the accessible name, so `aria-label` is optional.
 * - **Icon-only** — no `children` (e.g. a filter trigger), so the button has
 *   nothing to announce; `aria-label` is required.
 */
type TableHeaderButtonLabelProps =
  | {
      /**
       * Label rendered before the icon — the whole "text + icon" area becomes
       * one clickable button (matching the Angular implementation).
       */
      children: React.ReactNode;
      /** Optional accessible name; the visible `children` already provide one. */
      'aria-label'?: string;
    }
  | {
      children?: undefined;
      /**
       * Required accessible name — icon-only buttons have no visible text for
       * screen readers to announce.
       */
      'aria-label': string;
    };

export type TableHeaderButtonProps = TableHeaderButtonBaseProps & TableHeaderButtonLabelProps;

export const TableHeaderButton = forwardRef<HTMLButtonElement, TableHeaderButtonProps>(
  (
    {
      icon,
      filled = false,
      selected = false,
      disabled,
      onClick,
      className,
      iconSize = 18,
      type = 'button',
      children,
      ...rest
    },
    ref
  ) => (
    <button
      {...rest}
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        styles['tedi-table-header-button'],
        { [styles['tedi-table-header-button--selected']]: selected },
        className
      )}
    >
      {children}
      <Icon name={icon} filled={filled} color="inherit" size={iconSize} />
    </button>
  )
);

TableHeaderButton.displayName = 'TableHeaderButton';

export default TableHeaderButton;
