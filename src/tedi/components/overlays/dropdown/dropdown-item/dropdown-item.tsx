import { useMergeRefs } from '@floating-ui/react';
import cn from 'classnames';
import { cloneElement, isValidElement, useLayoutEffect, useRef } from 'react';

import { Checkbox } from '../../../form/checkbox/checkbox';
import { Radio } from '../../../form/radio/radio';
import { OptionContent, OptionContentProps } from '../../../misc/option-content/option-content';
import { useDropdownContext } from '../dropdown-context';
import styles from './dropdown-item.module.scss';

const CONTROL_SELECTOR = 'input[type="checkbox"], input[type="radio"]';

const composeHandlers =
  <E extends { defaultPrevented: boolean }>(itemHandler?: (e: E) => void, childHandler?: (e: E) => void) =>
  (event: E) => {
    itemHandler?.(event);
    if (!event.defaultPrevented) childHandler?.(event);
  };

export type DropdownItemProps = {
  /**
   * The content of the menu item (text, icons, checkbox, etc.). A `Checkbox` or `Radio` child
   * becomes the `menuitemcheckbox` / `menuitemradio` itself, and toggling it keeps the dropdown open.
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
   * Nesting level; each level indents the item by `--dropdown-item-indent` (32px), or by 1rem in a
   * `tree` dropdown.
   *
   * @default 0
   */
  indent?: number;
  /**
   * Renders the item as its child (e.g. a `Link`) with the item's role, tabindex, handlers and styles
   * merged onto it; with `closeOnSelect={false}` the child is wrapped in a `<div>`.
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
   * In a `tree` dropdown, draws a bullet on the connector line and starts the line here; give it
   * the same `indent` as its children.
   * @default false
   */
  isParent?: boolean;
  /**
   * Additional class name(s) for the dropdown item.
   */
  className?: string;
  /**
   * ARIA role for the item; a checkbox or radio `OptionContent`, `Checkbox` or `Radio` child makes it
   * `menuitemcheckbox` / `menuitemradio` unless set.
   * @default menuitem
   */
  role?: React.AriaRole;
} & React.AriaAttributes;

/**
 * Calls a Floating UI item handler as if the event came from the inner control. The handlers find
 * the item by `currentTarget`, and a `Checkbox` / `Radio` item registers its input, not the row.
 */
const retarget =
  <E extends React.SyntheticEvent>(handler?: unknown) =>
  (event: E) => {
    if (typeof handler !== 'function') return;
    const control = (event.currentTarget as HTMLElement).querySelector(CONTROL_SELECTOR);
    handler(control ? { ...event, currentTarget: control } : event);
  };

export const DropdownItem = ({
  children,
  onClick,
  disabled,
  active,
  index,
  indent = 0,
  asChild = false,
  closeOnSelect = true,
  isParent = false,
  className,
  role,
  ...aria
}: DropdownItemProps) => {
  const { getItemProps, listItemsRef, setOpen, activeIndex, divided, variant, navigation } = useDropdownContext();

  const Component = asChild ? 'div' : 'button';

  // The checkbox / radio in OptionContent is hidden from screen readers, so the item exposes its state.
  const optionContent =
    isValidElement<OptionContentProps>(children) && children.type === OptionContent ? children.props : undefined;
  const checkType =
    !navigation && optionContent?.indicatorSemantics !== 'control' && optionContent?.type !== 'default'
      ? optionContent?.type
      : undefined;
  const checkRole = checkType && (checkType === 'checkbox' ? 'menuitemcheckbox' : 'menuitemradio');
  const itemRole = role ?? checkRole;
  const ariaChecked =
    aria['aria-checked'] ??
    (checkRole && itemRole === checkRole
      ? checkType === 'checkbox' && optionContent?.indeterminate
        ? 'mixed'
        : !!optionContent?.selected
      : undefined);

  const isFormControl = isValidElement(children) && (children.type === Checkbox || children.type === Radio);
  // A Checkbox / Radio item: its input is the menu item (role, roving tabindex, focus) and the row
  // around it is presentational, so the item has one focusable control, not a control in a control.
  const controlOwnsItem = isFormControl && !navigation;
  const controlRole =
    role ?? (isValidElement(children) && children.type === Radio ? 'menuitemradio' : 'menuitemcheckbox');
  const rowRef = useRef<HTMLDivElement>(null);
  const appliedAriaRef = useRef(new Set<string>());

  useLayoutEffect(() => {
    if (!controlOwnsItem) return;
    const control = rowRef.current?.querySelector<HTMLInputElement>(CONTROL_SELECTOR);
    if (!control) return;

    control.setAttribute('role', controlRole);
    control.tabIndex = activeIndex === index ? 0 : -1;

    // The item's ARIA props go on the input, which is the menu item.
    const applied = new Set<string>();
    Object.entries(aria).forEach(([name, value]) => {
      if (value === undefined || value === null) return;
      control.setAttribute(name, String(value));
      applied.add(name);
    });
    appliedAriaRef.current.forEach((name) => !applied.has(name) && control.removeAttribute(name));
    appliedAriaRef.current = applied;

    // The input's own checked state covers checked / unchecked; only "mixed" has to be spelled out.
    if (!applied.has('aria-checked')) {
      if ((children as React.ReactElement<{ indeterminate?: boolean }>).props.indeterminate) {
        control.setAttribute('aria-checked', 'mixed');
      } else {
        control.removeAttribute('aria-checked');
      }
    }
    if (disabled) control.setAttribute('aria-disabled', 'true');
    else if (!applied.has('aria-disabled')) control.removeAttribute('aria-disabled');

    if (typeof index !== 'number') return;
    const items = listItemsRef.current;
    items[index] = control as unknown as HTMLButtonElement;
    // Unregister on unmount, as the callback ref does for other items, so arrow keys skip it.
    return () => {
      if (items[index] === (control as unknown as HTMLButtonElement)) items[index] = null;
    };
  });
  const isSlot = asChild && closeOnSelect !== false && isValidElement(children) && !isFormControl;

  const setItemRef = (node: HTMLElement | null) => {
    if (typeof index === 'number') {
      listItemsRef.current[index] = node as HTMLButtonElement | null;
    }
  };
  const childRef = isValidElement(children) ? (children as unknown as { ref?: React.Ref<unknown> }).ref : undefined;
  const slotRef = useMergeRefs([setItemRef, childRef]);

  const getCssVars = (indent?: number): React.CSSProperties => {
    // indent <= 0 means no indentation, so the base left padding applies.
    if (typeof indent !== 'number' || indent <= 0) return {};
    return { '--dropdown-indent-level': indent } as React.CSSProperties;
  };

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    // only trigger inner inputs if not disabled
    const input = (e.currentTarget as HTMLElement).querySelector<HTMLInputElement>(CONTROL_SELECTOR);
    if (input) {
      // Clicks on the control or its label already toggle it natively
      if (!(e.target as HTMLElement).closest('input, label')) input.click();
      return;
    }

    onClick?.(e);

    if ((!asChild || isSlot) && closeOnSelect) {
      setOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) {
      if (e.key === 'Enter' || e.key === ' ') e.preventDefault();
      return;
    }

    if (e.key === 'Enter' || e.key === ' ') {
      const input = (e.currentTarget as HTMLElement).querySelector<HTMLInputElement>(CONTROL_SELECTOR);

      if (input) {
        // Space on the focused input already toggles it natively
        if (e.key === ' ' && e.target === input) return;
        e.preventDefault();
        input.click();
        if (!asChild && !isFormControl && closeOnSelect) setOpen(false);
        return;
      }

      if (isSlot) {
        e.preventDefault();
        (e.currentTarget as HTMLElement).click();
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
    'aria-checked': ariaChecked,
  };

  const itemProps = navigation
    ? { ...baseProps, onKeyDown: undefined, tabIndex: disabled ? -1 : 0, role }
    : asChild && closeOnSelect === false
    ? { ...baseProps, role: itemRole }
    : getItemProps({
        role: itemRole ?? 'menuitem',
        disabled: !asChild ? disabled : undefined,
        ...baseProps,
      });

  if (controlOwnsItem) {
    const hookProps = getItemProps({ role: 'none' }) as Record<string, unknown>;

    return (
      <div
        {...hookProps}
        ref={rowRef}
        role="none"
        className={baseProps.className}
        style={baseProps.style}
        onFocus={retarget(hookProps.onFocus)}
        onMouseMove={retarget(hookProps.onMouseMove)}
        onClick={(e) => {
          retarget(hookProps.onClick)(e);
          handleClick(e);
        }}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    );
  }

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
      'aria-disabled': disabled || undefined,
      tabIndex: disabled ? -1 : merged.tabIndex,
      onClick: composeHandlers(merged.onClick, childProps.onClick),
      onKeyDown: composeHandlers(merged.onKeyDown, childProps.onKeyDown),
    });
  }

  return <Component {...itemProps}>{children}</Component>;
};

DropdownItem.displayName = 'DropdownItem';
