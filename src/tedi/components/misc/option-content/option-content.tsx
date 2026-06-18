import cn from 'classnames';
import { Children, cloneElement, forwardRef, isValidElement, ReactElement, useId } from 'react';

import { Icon, IconProps } from '../../base/icon/icon';
import styles from './option-content.module.scss';

export type OptionContentType = 'default' | 'checkbox' | 'radio';
export type OptionContentLayout = 'horizontal' | 'vertical';

export interface OptionContentSlotProps {
  children?: React.ReactNode;
  /** Additional class name. */
  className?: string;
  /** @internal id wired up by `OptionContent` to link the indicator's `aria-labelledby`. */
  id?: string;
}

export const OptionContentLabel = forwardRef<HTMLSpanElement, OptionContentSlotProps>(
  ({ children, className, id }, ref) => (
    <span ref={ref} id={id} className={cn(styles['tedi-option-content__label'], className)}>
      {children}
    </span>
  )
);

OptionContentLabel.displayName = 'OptionContentLabel';

export const OptionContentMeta = forwardRef<HTMLSpanElement, OptionContentSlotProps>(({ children, className }, ref) => (
  <span ref={ref} className={cn(styles['tedi-option-content__meta'], className)}>
    {children}
  </span>
));

OptionContentMeta.displayName = 'OptionContentMeta';

export interface OptionContentProps {
  /**
   * Content of the value row — typically `OptionContent.Label` and
   * optionally `OptionContent.Meta`, but any node is allowed.
   */
  children?: React.ReactNode;
  /**
   * Selection-indicator type:
   * - `default` — no indicator
   * - `checkbox` — checkbox indicator (multi-select)
   * - `radio` — radio indicator (single-select listbox)
   * @default default
   */
  type?: OptionContentType;
  /**
   * Arrange the label and meta side-by-side (`horizontal`) or stacked
   * (`vertical`, e.g. a title with a description below).
   * @default horizontal
   */
  layout?: OptionContentLayout;
  /**
   * Whether the indicator renders as selected (checked).
   * @default false
   */
  selected?: boolean;
  /**
   * Whether the checkbox indicator renders as indeterminate. Ignored for other types.
   * @default false
   */
  indeterminate?: boolean;
  /**
   * Whether the row renders as disabled (dims the indicator and text).
   * @default false
   */
  disabled?: boolean;
  /**
   * Leading icon, rendered before the content. Accepts an icon name or full `IconProps`.
   */
  icon?: string | IconProps;
  /**
   * How the selection indicator is exposed to assistive tech:
   * - `presentation` (default) — the indicator is `aria-hidden`; the interactive
   *   parent owns selection (menu pattern: `aria-checked` on the `DropdownItem`).
   * - `control` — the indicator itself carries `role="checkbox"`/`"radio"`,
   *   `aria-checked` and is named via `aria-labelledby` from `OptionContent.Label`
   *   (listbox pattern, e.g. inside a `Select` option). Requires a `Label` child.
   * @default presentation
   */
  indicatorSemantics?: 'presentation' | 'control';
  /**
   * Additional class name.
   */
  className?: string;
}

const renderIcon = (icon: string | IconProps, className: string): JSX.Element => {
  const props: IconProps = typeof icon === 'string' ? { name: icon } : icon;
  return <Icon size={18} {...props} className={cn(className, props.className)} />;
};

const OptionContentInner = forwardRef<HTMLDivElement, OptionContentProps>(
  (
    {
      children,
      type = 'default',
      layout = 'horizontal',
      selected = false,
      indeterminate = false,
      disabled = false,
      icon,
      indicatorSemantics = 'presentation',
      className,
    },
    ref
  ) => {
    const labelId = useId();
    const control = indicatorSemantics === 'control';

    const hasLabelChild =
      control &&
      type !== 'default' &&
      Children.toArray(children).some((child) => isValidElement(child) && child.type === OptionContentLabel);
    const labelledBy = hasLabelChild ? labelId : undefined;

    const checkboxAria = control
      ? {
          role: 'checkbox' as const,
          'aria-checked': indeterminate ? ('mixed' as const) : selected,
          'aria-disabled': disabled || undefined,
          'aria-labelledby': labelledBy,
        }
      : { 'aria-hidden': true };

    const radioAria = control
      ? {
          role: 'radio' as const,
          'aria-checked': selected,
          'aria-disabled': disabled || undefined,
          'aria-labelledby': labelledBy,
        }
      : { 'aria-hidden': true };

    const content = hasLabelChild
      ? Children.map(children, (child) =>
          isValidElement(child) && child.type === OptionContentLabel
            ? cloneElement(child as ReactElement<OptionContentSlotProps>, { id: labelId })
            : child
        )
      : children;

    return (
      <div
        ref={ref}
        className={cn(
          styles['tedi-option-content'],
          styles[`tedi-option-content--${layout}`],
          {
            [styles['tedi-option-content--checkbox']]: type === 'checkbox',
            [styles['tedi-option-content--radio']]: type === 'radio',
            [styles['tedi-option-content--disabled']]: disabled,
          },
          className
        )}
      >
        {type === 'checkbox' && (
          <span
            {...checkboxAria}
            className={cn(styles['tedi-option-content__indicator'], styles['tedi-option-content__checkbox'], {
              [styles['tedi-option-content__checkbox--checked']]: selected || indeterminate,
            })}
          >
            {indeterminate ? (
              <Icon name="remove" size={16} className={styles['tedi-option-content__check-icon']} />
            ) : selected ? (
              <Icon name="check" size={16} className={styles['tedi-option-content__check-icon']} />
            ) : null}
          </span>
        )}

        {type === 'radio' && (
          <span
            {...radioAria}
            className={cn(styles['tedi-option-content__indicator'], styles['tedi-option-content__radio'], {
              [styles['tedi-option-content__radio--checked']]: selected,
            })}
          />
        )}

        {icon && renderIcon(icon, styles['tedi-option-content__icon'])}

        <div className={styles['tedi-option-content__content']}>{content}</div>
      </div>
    );
  }
);

OptionContentInner.displayName = 'OptionContent';

export const OptionContent = Object.assign(OptionContentInner, {
  Label: OptionContentLabel,
  Meta: OptionContentMeta,
});

export default OptionContent;
