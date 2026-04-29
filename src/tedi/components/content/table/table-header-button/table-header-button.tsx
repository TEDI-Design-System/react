import cn from 'classnames';
import React, { forwardRef } from 'react';

import { Icon, IconSize } from '../../../base/icon/icon';
import styles from './table-header-button.module.scss';

export interface TableHeaderButtonProps {
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
  /**
   * Disables interaction and applies disabled styling.
   * @default false
   */
  disabled?: boolean;
  /**
   * Required accessible name — these are icon-only buttons, so screen readers
   * have nothing else to announce.
   */
  'aria-label': string;
  /** Size of the icon, in pixels. @default 18 */
  iconSize?: IconSize;
  /** Click handler. */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Additional class on the root button element. */
  className?: string;
  /**
   * Native `type` attribute. Defaults to `'button'` to avoid accidentally
   * submitting an enclosing `<form>`.
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Compact icon-only button intended for table header cells — sort toggles,
 * filter triggers, and similar inline header actions. Matches the Figma
 * "Filter and sort buttons" frame: transparent at rest, light-tint on
 * hover / active, brand colour when `selected` or focused, focus ring on
 * keyboard focus.
 *
 * `forwardRef` is wired through so the component can be used directly as a
 * `Popover.Trigger` child or referenced for imperative focus management.
 */
export const TableHeaderButton = forwardRef<HTMLButtonElement, TableHeaderButtonProps>(
  (
    { icon, filled = false, selected = false, disabled, onClick, className, iconSize = 18, type = 'button', ...rest },
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
      <Icon name={icon} filled={filled} color="inherit" size={iconSize} />
    </button>
  )
);

TableHeaderButton.displayName = 'TableHeaderButton';

export default TableHeaderButton;
