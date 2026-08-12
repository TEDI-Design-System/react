import { useMergeRefs } from '@floating-ui/react';
import cn from 'classnames';
import { cloneElement, isValidElement } from 'react';

import { useDropdownContext } from '../dropdown-context';
import styles from './dropdown-item.module.scss';

const composeHandlers =
  <E,>(itemHandler?: (e: E) => void, childHandler?: (e: E) => void) =>
  (event: E) => {
    itemHandler?.(event);
    childHandler?.(event);
  };

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
   * Render the item as its child element instead of a `<button>`.
   *
   * - **Navigable child (default `closeOnSelect`)** — e.g. a `Link`: the item props (`role`,
   *   roving `tabindex`, handlers, styles) are merged directly onto the child so it becomes the
   *   single focusable `menuitem`. This avoids a focusable wrapper *and* a focusable child (a
   *   double Tab stop) and keeps the role and accessible name on one element.
   * - **Form control (`closeOnSelect={false}`)** — e.g. a `Checkbox` / `Radio`: the child is
   *   wrapped in a plain `<div>` menuitem that forwards activation to the inner control.
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
  /**
   * ARIA role for the item. Defaults to `menuitem`; override to convey selection
   * semantics (e.g. `menuitemcheckbox` / `menuitemradio` / `option`) and pair it
   * with the matching `aria-checked` / `aria-selected`.
   * @default menuitem
   */
  role?: React.AriaRole;
} & React.AriaAttributes;

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
  role,
  ...aria
}: DropdownItemProps) => {
  const { getItemProps, listItemsRef, setOpen, activeIndex, divided, variant } = useDropdownContext();

  const Component = asChild ? 'div' : 'button';
  const isSlot = asChild && closeOnSelect !== false && isValidElement(children);

  const setItemRef = (node: HTMLElement | null) => {
    if (typeof index === 'number') {
      listItemsRef.current[index] = node as HTMLButtonElement | null;
    }
  };
  const childRef = isValidElement(children) ? (children as unknown as { ref?: React.Ref<unknown> }).ref : undefined;
  const slotRef = useMergeRefs([setItemRef, childRef]);

  const getCssVars = (indent?: number): React.CSSProperties => {
    // indent <= 0 means no indentation — leave `--dropdown-indent` unset so the
    // base left padding applies (setting it to 0 would zero out the padding).
    if (typeof indent !== 'number' || indent <= 0) return {};
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

    onClick?.(e);

    if ((!asChild || isSlot) && closeOnSelect) {
      setOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      const input = (e.currentTarget as HTMLElement).querySelector<HTMLInputElement>(
        'input[type="checkbox"], input[type="radio"]'
      );

      if (input) {
        e.preventDefault();
        input.click();
        if (!asChild && closeOnSelect) setOpen(false);
        return;
      }

      if (isSlot) {
        if (e.key === ' ') {
          e.preventDefault();
          (e.currentTarget as HTMLElement).click();
        }
        onClick?.(e);
        if (closeOnSelect) setOpen(false);
        return;
      }

      e.preventDefault();
      onClick?.(e);
      if (!asChild && closeOnSelect) setOpen(false);
    }
  };

  const baseProps = {
    ref: setItemRef,
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
    ...aria,
  };

  const itemProps =
    asChild && closeOnSelect === false
      ? { ...baseProps, role }
      : getItemProps({
          role: role ?? 'menuitem',
          disabled: !asChild ? disabled : undefined,
          ...baseProps,
        });

  if (isSlot) {
    const child = children as React.ReactElement;
    const childProps = child.props as {
      className?: string;
      style?: React.CSSProperties;
      onClick?: (e: React.MouseEvent) => void;
      onKeyDown?: (e: React.KeyboardEvent) => void;
    };
    const merged = itemProps as typeof itemProps & {
      className?: string;
      style?: React.CSSProperties;
      onClick?: (e: React.MouseEvent) => void;
      onKeyDown?: (e: React.KeyboardEvent) => void;
    };

    return cloneElement(child, {
      ...merged,
      ref: slotRef,
      className: cn(merged.className, childProps.className),
      style: { ...merged.style, ...childProps.style },
      onClick: composeHandlers(merged.onClick, childProps.onClick),
      onKeyDown: composeHandlers(merged.onKeyDown, childProps.onKeyDown),
    });
  }

  return <Component {...itemProps}>{children}</Component>;
};
