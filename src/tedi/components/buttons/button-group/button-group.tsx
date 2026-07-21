import cn from 'classnames';
import { Children, cloneElement, isValidElement, ReactNode } from 'react';

import { Breakpoint, isBreakpointBelow, useBreakpoint } from '../../../helpers';
import { useLabels } from '../../../providers/label-provider';
import { Icon } from '../../base/icon/icon';
import { Dropdown } from '../../overlays/dropdown';
import Button, { ButtonProps } from '../button/button';
import styles from './button-group.module.scss';

export type ButtonGroupProps = {
  /**
   * The child components to render inside the ButtonGroup.
   * Typically, these should be `<Button>` components.
   */
  children: ReactNode;
  /**
   * The visual style of the ButtonGroup, determining its color and appearance.
   * @default primary
   */
  type?: 'primary' | 'secondary';
  /**
   * Callback function triggered when the selected button changes.
   * Receives the `id` of the selected button as an argument.
   */
  onSelectionChange?: (id: string) => void;
  /**
   * Whether all buttons in the group should have equal width and stretched inside their parent element.
   * If `true`, all buttons will take up equal space.
   * If `false`, the button widths will be determined by their content.
   * @default true
   */
  stretch?: boolean;
  /**
   * A label for the button group, used for accessibility.
   * Required if the group does not have a visible label.
   */
  ariaLabel?: string;
  /**
   * Additional custom CSS classes to apply to the ButtonGroup container
   */
  className?: string;
  /**
   * Size of the buttons in ButtonGroup
   */
  size?: 'default' | 'small';
  /**
   * Whether the button group should collapse into a dropdown on mobile
   * @default false
   */
  enableMobileDropdown?: boolean;
  /**
   * Breakpoint at which to switch to dropdown
   * @default 'md'
   */
  mobileBreakpoint?: Breakpoint;
  /**
   * Label to display on the dropdown trigger button when the button group collapses on mobile.
   * If not provided, the label provider value for `sidenav.submenu` will be used as fallback.
   */
  dropdownLabel?: string;
  /*
   * Determines the source of the dropdown trigger button's label when the button group collapses on mobile.
   * - `'active'` – uses the label of the currently active button as the dropdown trigger label. If no button is active, falls back to `dropdownLabel`.
   * - `'static'` (default) – always uses `dropdownLabel`, regardless of which button is active.
   *
   * @default static
   */
  dropdownLabelMode?: 'active' | 'static';
};

export const ButtonGroup = (props: ButtonGroupProps): JSX.Element => {
  const { getLabel } = useLabels();
  const {
    children,
    className,
    type = 'primary',
    onSelectionChange,
    stretch = false,
    ariaLabel,
    size = 'default',
    enableMobileDropdown = false,
    mobileBreakpoint = 'md',
    dropdownLabel = getLabel('sidenav.submenu'),
    dropdownLabelMode = 'static',
  } = props;

  const breakpoint = useBreakpoint();
  const isMobileView = isBreakpointBelow(breakpoint, mobileBreakpoint);

  const buttonsArray = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === Button
  ) as React.ReactElement<ButtonProps>[];

  const activeButton = buttonsArray.find((btn) => btn.props.isActive);
  const activeLabel = dropdownLabelMode === 'static' ? dropdownLabel : activeButton?.props.children ?? dropdownLabel;

  const activeIconLeft = activeButton?.props.iconLeft;
  const activeIcon = activeButton?.props.icon;

  if (isMobileView && enableMobileDropdown) {
    return (
      <Dropdown width="trigger">
        <Dropdown.Trigger>
          <Button
            visualType={type}
            className={cn(
              styles['tedi-button-group__dropdown-trigger'],
              styles[`tedi-button-group__dropdown-trigger--${type}`],
              className
            )}
            noStyle
            fullWidth
          >
            {activeIconLeft ? (
              <Icon name={typeof activeIconLeft === 'string' ? activeIconLeft : activeIconLeft.name} color="inherit" />
            ) : activeIcon ? (
              <Icon name={typeof activeIcon === 'string' ? activeIcon : activeIcon.name} color="inherit" />
            ) : (
              <Icon name="menu" color="inherit" />
            )}

            {activeLabel}
          </Button>
        </Dropdown.Trigger>

        <Dropdown.Content>
          {buttonsArray.map((btn, index) => (
            <Dropdown.Item
              key={btn.props.id || index}
              index={index}
              active={btn?.props.isActive}
              disabled={btn?.props.disabled}
              onClick={(event: React.MouseEvent | React.KeyboardEvent) => {
                if (btn.props.disabled) return;

                if (event.type === 'click') {
                  btn.props.onClick?.(event as React.MouseEvent<HTMLButtonElement>);
                }

                if (btn.props.id) {
                  onSelectionChange?.(btn.props.id);
                }
              }}
              className={styles['tedi-button-group__dropdown-item']}
            >
              {btn.props.iconLeft && (
                <Icon
                  name={typeof btn.props.iconLeft === 'string' ? btn.props.iconLeft : btn.props.iconLeft.name}
                  color="inherit"
                />
              )}
              {btn.props.children}
              {btn.props.iconRight && (
                <Icon
                  name={typeof btn.props.iconRight === 'string' ? btn.props.iconRight : btn.props.iconRight.name}
                  color="inherit"
                />
              )}
              {btn.props.isActive && <span className="sr-only">{getLabel('button-group.selected')}</span>}
            </Dropdown.Item>
          ))}
        </Dropdown.Content>
      </Dropdown>
    );
  }

  return (
    <div
      className={cn(
        styles['tedi-button-group'],
        styles[`tedi-button-group--${type}`],
        { [styles['tedi-button-group--stretch']]: stretch },
        className
      )}
      role="group"
      aria-label={ariaLabel}
    >
      {buttonsArray.map((child) =>
        cloneElement(child, {
          className: cn(
            styles['tedi-button-group__item'],
            {
              [styles['tedi-button-group__item--active']]: child.props.isActive,
              [styles['tedi-button-group__item--disabled']]: child.props.disabled,
              [styles[`tedi-button-group__item--size-${size}`]]: size,
            },
            child.props.className
          ),
          size,
          'aria-pressed': Boolean(child.props.isActive),
          onClick: (event) => {
            child.props.onClick?.(event);
            if (child.props.id) {
              onSelectionChange?.(child.props.id);
            }
          },
        } as Partial<ButtonProps> & { 'aria-pressed': boolean })
      )}
    </div>
  );
};

export default ButtonGroup;
