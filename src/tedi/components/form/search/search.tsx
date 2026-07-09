import cn from 'classnames';
import React, { forwardRef } from 'react';

import { useLabels } from '../../../providers/label-provider';
import { IconWithoutBackgroundProps } from '../../base/icon/icon';
import { Button, ButtonProps } from '../../buttons/button/button';
import { TextField, TextFieldForwardRef, TextFieldProps } from '../textfield/textfield';
import styles from './search.module.scss';

export interface SearchProps extends Omit<TextFieldProps, 'isTextArea' | 'icon' | 'onKeyPress'> {
  /**
   * Callback triggered when the search is executed (Enter key pressed or button clicked).
   */
  onSearch?: (value: string) => void;
  /**
   * Custom icon for the search input.
   */
  searchIcon?: string | IconWithoutBackgroundProps;
  /**
   * Optional button properties.
   */
  button?: Partial<ButtonProps>;
  /**
   * For accessibility: search field name (accessible name). Recommended to always set.
   * E.g., "Search products" or "Search site".
   */
  ariaLabel?: string;
}

export const Search = forwardRef<TextFieldForwardRef, SearchProps>(
  (
    {
      placeholder,
      isClearable = true,
      searchIcon = 'search',
      onSearch,
      onChange,
      button,
      ariaLabel,
      className,
      input,
      ...rest
    },
    ref
  ): JSX.Element => {
    const { getLabel } = useLabels();
    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (e.key === 'Enter') {
        onSearch?.(rest.value as string);
      }
    };

    const handleButtonClick = () => {
      onSearch?.(rest.value as string);
    };

    const iconBase: IconWithoutBackgroundProps = typeof searchIcon === 'string' ? { name: searchIcon } : searchIcon;
    const resolvedSearchIcon: IconWithoutBackgroundProps = {
      color: 'secondary',
      ...iconBase,
      className: cn(iconBase.className, rest.disabled && styles['tedi-search__icon--disabled']),
    };

    const textFieldProps = {
      ...rest,
      ref,
      inputClassName: cn(styles['tedi-search__input'], button && styles['tedi-search__input--has-button'], className),
      placeholder,
      isClearable,
      onKeyDown: handleKeyDown,
      onChange,
      input: { ...input, role: 'searchbox' as const },
      ...(button ? {} : { icon: resolvedSearchIcon }),
    };

    const defaultAriaLabel = placeholder || getLabel('search');
    const searchAriaLabel = ariaLabel ?? defaultAriaLabel;

    return (
      <div
        className={cn(
          styles['tedi-search__wrapper'],
          rest.size === 'small' && styles['tedi-search__wrapper--small'],
          rest.size === 'large' && styles['tedi-search__wrapper--large']
        )}
        role="search"
        aria-label={searchAriaLabel}
      >
        <TextField {...textFieldProps} />
        {button && (
          <Button
            {...button}
            onClick={handleButtonClick}
            className={cn(
              styles['tedi-search__button'],
              !button.children && styles['tedi-search__button--icon-only'],
              button.className
            )}
            aria-label={button.children ? undefined : getLabel('search')}
          >
            {button.children ?? getLabel('search')}
          </Button>
        )}
      </div>
    );
  }
);

Search.displayName = 'Search';
