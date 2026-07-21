import cn from 'classnames';
import { JSX, useState } from 'react';

import { Button, ButtonProps, Icon, Spinner, Tooltip } from '../../../../tedi';
import MapDropdown, { MapDropdownItem } from '../map-dropdown/map-dropdown';
import styles from './map-button.module.scss';

/**
 * Button props that don't apply to MapButton because it renders `<Button noStyle>` with its own
 * fixed styling. Omitted so the public API only advertises props that actually work here.
 */
type OmittedButtonProps =
  | 'size'
  | 'icon'
  | 'iconLeft'
  | 'iconRight'
  | 'visualType'
  | 'color'
  | 'fullWidth'
  | 'showTooltip'
  | 'noStyle'
  | 'renderWrapperElement';

export interface MapButtonProps extends Omit<ButtonProps, OmittedButtonProps> {
  /**
   * Size of the button. Can be:
   * - `'default'` – standard size.
   * - `'small'` – smaller button for compact UIs.
   */
  size?: 'default' | 'small';
  /**
   * Name of the icon to display above the label (e.g., Material Symbols name).
   * Replaced by a spinner while `isLoading` is `true`.
   */
  icon?: string;
  /**
   * Whether the button is in a selected state.
   * Useful for toggles or filter-style buttons.
   */
  selected?: boolean;
  /**
   * If `true`, hides the label visually (icon-only button).
   * Label may still be available to screen readers.
   */
  hideLabel?: boolean;
  /**
   * Content to show in a tooltip on hover or focus.
   * Can be a string or a React element for custom tooltips.
   */
  tooltipContent?: string | React.ReactNode;
  /**
   * Optional dropdown menu items.
   * When provided, the button can toggle a dropdown menu.
   */
  dropdownItems?: MapDropdownItem[];
}

export const MapButton = (props: MapButtonProps): JSX.Element => {
  const {
    size = 'default',
    icon,
    selected = false,
    className,
    children,
    hideLabel = false,
    tooltipContent = children,
    dropdownItems,
    isActive,
    isHovered,
    underline,
    isLoading,
    ...rest
  } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isSelected = selected || isDropdownOpen;

  const mapButtonBEM = cn(
    styles['tedi-map-button'],
    styles[`tedi-map-button--${size}`],
    isSelected && styles['tedi-map-button--selected'],
    dropdownItems && styles['tedi-map-button--dropdown'],
    isActive && styles['tedi-map-button--is-active'],
    isHovered && styles['tedi-map-button--is-hovered'],
    underline && styles['tedi-map-button--underline'],
    isLoading && styles['tedi-map-button--loading'],
    className
  );

  const buttonContent = (
    <>
      {isLoading ? (
        <Spinner size={size === 'small' ? 16 : 18} className={styles['tedi-map-button__icon']} />
      ) : (
        icon && <Icon name={icon} className={styles['tedi-map-button__icon']} size={size === 'small' ? 24 : 18} />
      )}
      {!hideLabel && <div className={cn(styles['tedi-map-button__text'])}>{children}</div>}
    </>
  );

  const buttonElement = (
    <Button noStyle isLoading={isLoading} className={mapButtonBEM} size={size} {...rest}>
      {buttonContent}
    </Button>
  );

  const buttonWithTooltip =
    hideLabel && tooltipContent ? (
      <Tooltip placement="right">
        <Tooltip.Trigger>{buttonElement}</Tooltip.Trigger>
        <Tooltip.Content>{tooltipContent}</Tooltip.Content>
      </Tooltip>
    ) : (
      buttonElement
    );

  if (dropdownItems) {
    return (
      <MapDropdown onOpenChange={setIsDropdownOpen} placement="right-start">
        <MapDropdown.Trigger>{buttonElement}</MapDropdown.Trigger>
        <MapDropdown.Content
          items={dropdownItems.map((item) => ({
            children: item.children,
            onClick: item.onClick,
            isDisabled: item.isDisabled,
          }))}
        />
      </MapDropdown>
    );
  }

  return buttonWithTooltip;
};

export default MapButton;
