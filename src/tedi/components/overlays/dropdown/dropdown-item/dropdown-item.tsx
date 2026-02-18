import cn from 'classnames';

import { useDropdownContext } from '../dropdown-context';
import styles from './dropdown-item.module.scss';

export type DropdownItemProps = {
  /**
   * The content of the menu item (text, icons, checkbox, etc.)
   */
  children: React.ReactNode;
  /**
   * Called when the item is activated (mouse click or Enter/Space key).
   * Receives either a MouseEvent or KeyboardEvent.
   */
  onClick?: (e: React.MouseEvent | React.KeyboardEvent) => void;
  /**
   * Disables the item — prevents interaction and applies disabled styling.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * Highlights the item visually (e.g. selected language, current sort option).
   * Does **not** affect behavior — only styling.
   *
   * @default false
   */
  active?: boolean;
  /**
   * Required when using keyboard navigation (ArrowUp/ArrowDown).
   * Must be a unique, sequential number (0, 1, 2, ...) for each item in the list.
   *
   * When omitted, the item won't be keyboard-focusable.
   */
  index?: number;
  /**
   * Indentation level (in rem units). Useful for nested / hierarchical menus.
   *
   * Example: `indent={1}` → adds ~1rem left padding
   *
   * @default 0
   */
  indent?: number;
  /**
   * When `true`, renders a plain `<div>` instead of a `<button>`.
   * Useful when wrapping form controls like `<Checkbox>` or `<Radio>` that already handle their own events.
   *
   * **Warning:** When `asChild={true}`, the item is no longer focusable via keyboard navigation
   * unless the child element itself is focusable.
   *
   * @default false
   */
  asChild?: boolean;
  /**
   * Controls whether the dropdown should close after this item is selected.
   *
   * - Set to `false` for multi-select menus, toggles, or when selection should persist
   * - Set to `true` for action menus (delete, download, navigate, etc.)
   *
   * @default true
   */
  closeOnSelect?: boolean;
};

export const DropdownItem = ({
  children,
  onClick,
  disabled,
  active,
  index,
  indent,
  asChild = false,
  closeOnSelect = true,
}: DropdownItemProps) => {
  const { getItemProps, listItemsRef, setOpen, activeIndex, divided } = useDropdownContext();

  const Component = asChild ? 'div' : 'button';

  return (
    <Component
      {...getItemProps({
        ref(node: HTMLElement) {
          if (!asChild && typeof index === 'number') {
            listItemsRef.current[index] = node as HTMLButtonElement;
          }
        },
        role: 'menuitem',
        disabled: !asChild ? disabled : undefined,
        tabIndex: activeIndex === index ? 0 : -1,
        className: cn(styles['tedi-dropdown__item'], {
          [styles['tedi-dropdown__item--active']]: active,
          [styles['tedi-dropdown__item--disabled']]: disabled,
          [styles['tedi-dropdown__item--divided']]: divided,
        }),
        onClick(e) {
          if (asChild || disabled) return;
          onClick?.(e);
          if (closeOnSelect) setOpen(false);
        },
        onKeyDown(e) {
          if (asChild || disabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            onClick?.(e);
            if (closeOnSelect) setOpen(false);
          }
        },
        style: {
          paddingLeft: `calc(0.75rem + ${indent} * 1rem)`,
        },
      })}
    >
      {children}
    </Component>
  );
};
