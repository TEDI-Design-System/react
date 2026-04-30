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
   * When omitted, the item won't be keyboard-focusable.
   */
  index?: number;
  /**
   * Indentation level (in rem units). Useful for nested / hierarchical menus.
   * Example: `indent={1}` → adds ~1rem left padding
   *
   * @default 0
   */
  indent?: number;
  /**
   * When `true`, renders a plain `<div>` instead of a `<button>`.
   * Useful when wrapping form controls like `<Checkbox>` or `<Radio>` that already handle their own events.
   * **Warning:** When `asChild={true}`, the item is no longer focusable via keyboard navigation
   * unless the child element itself is focusable.
   *
   * @default false
   */
  asChild?: boolean;
  /**
   * Controls whether the dropdown should close after this item is selected.
   * - Set to `false` for multi-select menus, toggles, or when selection should persist
   * - Set to `true` for action menus (delete, download, navigate, etc.)
   *
   * @default true
   */
  closeOnSelect?: boolean;
  /**
   * Marks this item as a tree parent node when the Dropdown is in `variant="tree"` mode.
   * - Renders a visual parent indicator (bullet) aligned to the tree trunk
   * - Starts the tree trunk at the vertical center of this item
   * - Does **not** apply tree indentation — parent items remain aligned with normal items
   *
   * This prop is **purely visual** and does not affect behavior or hierarchy.
   * Child items must still use `indent` to participate in the tree.
   * Ignored when `variant !== 'tree'`.
   * @default false
   */
  isParent?: boolean;
  /*
   * Additional class name(s) to apply to the dropdown item
   * @default undefined
   */
  className?: string;
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
  isParent = false,
  className,
}: DropdownItemProps) => {
  const { getItemProps, listItemsRef, setOpen, activeIndex, divided, variant } = useDropdownContext();

  const Component = asChild ? 'div' : 'button';

  const getCssVars = (indent?: number): React.CSSProperties => {
    if (typeof indent !== 'number') return {};
    return {
      '--dropdown-indent-level': indent,
      '--dropdown-indent': `${indent}rem`,
    } as React.CSSProperties;
  };

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return; // stop everything

    // only trigger inner inputs if not disabled
    const input = (e.currentTarget as HTMLElement).querySelector<HTMLInputElement>(
      'input[type="checkbox"], input[type="radio"]'
    );
    if (input) {
      input.click();
      return;
    }

    if (!asChild) {
      onClick?.(e);
      if (closeOnSelect) setOpen(false);
    } else {
      onClick?.(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();

      const input = (e.currentTarget as HTMLElement).querySelector<HTMLInputElement>(
        'input[type="checkbox"], input[type="radio"]'
      );

      if (input) {
        input.click();
      } else {
        onClick?.(e);
      }

      if (!asChild && closeOnSelect) setOpen(false);
    }
  };

  const baseProps = {
    ref(node: HTMLElement | null) {
      if (typeof index === 'number') {
        listItemsRef.current[index] = node as HTMLButtonElement | null;
      }
    },
    tabIndex: activeIndex === index ? 0 : -1,
    className: cn(
      styles['tedi-dropdown__item'],
      {
        [styles['tedi-dropdown__item--active']]: active,
        [styles['tedi-dropdown__item--disabled']]: disabled,
        [styles['tedi-dropdown__item--divided']]: divided,
        [styles['tedi-dropdown__item--indent']]: indent,
        [styles['tedi-dropdown__item--tree-item']]: variant === 'tree' && indent,
        [styles['tedi-dropdown__item--tree-parent']]: variant === 'tree' && isParent,
      },
      className
    ),
    style: getCssVars(indent),
    onClick: handleClick,
    onKeyDown: handleKeyDown,
  };

  const itemProps =
    asChild && closeOnSelect === false
      ? baseProps
      : getItemProps({
          role: 'menuitem',
          disabled: !asChild ? disabled : undefined,
          ...baseProps,
        });

  return <Component {...itemProps}>{children}</Component>;
};
