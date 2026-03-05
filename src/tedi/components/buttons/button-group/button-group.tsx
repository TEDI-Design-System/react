import cn from 'classnames';
import { Children, cloneElement, isValidElement, ReactNode } from 'react';

import { Breakpoint, isBreakpointBelow, useBreakpoint } from '../../../helpers';
import { useLabels } from '../../../providers/label-provider';
import { UnknownType } from '../../../types/commonTypes';
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
   * Breakpoint at which to switch to dropdown
   * @default 'md'
   */
  mobileBreakpoint?: Breakpoint;
  /**
   * Label to display on the dropdown trigger button when the button group collapses on mobile.
   * If not provided, `ariaLabel` will be used as fallback.
   */
  dropdownLabel?: string;
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
    mobileBreakpoint = 'md',
    dropdownLabel = getLabel('sidenav.submenu'),
  } = props;

  const breakpoint = useBreakpoint();
  const isMobileView = isBreakpointBelow(breakpoint, mobileBreakpoint);

  const buttonsArray = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === Button
  ) as React.ReactElement<ButtonProps>[];

  if (isMobileView) {
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
            <Icon name="menu" color="inherit" />
            {dropdownLabel}
          </Button>
        </Dropdown.Trigger>

        <Dropdown.Content>
          {buttonsArray.map((btn, index) => (
            <Dropdown.Item
              key={btn.props.id || index}
              index={index}
              active={btn?.props.isActive}
              disabled={btn?.props.disabled}
              onClick={(event) => {
                btn.props.onClick?.(event as UnknownType);
                if (btn.props.id) {
                  onSelectionChange?.(btn.props.id);
                }
              }}
            >
              {btn.props.children}
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
          className: cn(styles['tedi-button-group__item'], {
            [styles['tedi-button-group__item--active']]: child.props.isActive,
            [styles['tedi-button-group__item--disabled']]: child.props.disabled,
            [styles[`tedi-button-group__item--size-${size}`]]: size,
          }),
          size,
          onClick: (event) => {
            child.props.onClick?.(event);
            if (child.props.id) {
              onSelectionChange?.(child.props.id);
            }
          },
        })
      )}
    </div>
  );
};

export default ButtonGroup;
