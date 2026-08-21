import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  size,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from '@floating-ui/react';
import cn from 'classnames';
import React, { forwardRef, useMemo, useRef, useState } from 'react';

import { useLabels } from '../../../providers/label-provider';
import { Text } from '../../base/typography/text/text';
import { Spinner } from '../../loaders/spinner/spinner';
import { OptionContent } from '../../misc/option-content/option-content';
import { TextField, TextFieldForwardRef, TextFieldProps } from '../textfield/textfield';
import styles from './search-autocomplete.module.scss';

export interface SearchAutocompleteOption {
  /**
   * Stable value returned to `onSelect` and used as the React key. For richer
   * payloads keep a lookup keyed by this value on the consumer side.
   */
  value: string;
  /**
   * Visible label. Falls back to `value` when omitted.
   */
  label?: React.ReactNode;
  /**
   * Renders the option greyed out and skips it during keyboard navigation.
   * @default false
   */
  disabled?: boolean;
}

export interface SearchAutocompleteProps
  extends Omit<
    TextFieldProps,
    'value' | 'defaultValue' | 'onChange' | 'onChangeEvent' | 'input' | 'icon' | 'isTextArea' | 'onKeyDown'
  > {
  /**
   * Unique identifier. Required — it seeds the `aria-controls` / option ids that
   * wire the input to the listbox.
   */
  id: string;
  /**
   * Options rendered in the listbox. Filter / fetch these yourself in response to
   * `onQueryChange`; the component only renders what it is given.
   */
  options: SearchAutocompleteOption[];
  /**
   * Controlled query string. Pair with `onQueryChange`. Omit for uncontrolled use
   * (supply `defaultValue` instead).
   */
  value?: string;
  /**
   * Initial query for uncontrolled use. Ignored when `value` is provided.
   */
  defaultValue?: string;
  /**
   * Fired on every keystroke with the new query — fetch or filter `options` here.
   */
  onQueryChange?: (query: string) => void;
  /**
   * Fired when an option is chosen (Enter on the active option, or click). In
   * controlled mode update `value` from here to reflect the picked label.
   */
  onSelect?: (option: SearchAutocompleteOption) => void;
  /**
   * Fired on Enter when no option is active — i.e. a free-text search submit.
   */
  onSearch?: (query: string) => void;
  /**
   * Shows a loading row in the listbox instead of options — use while an async
   * request is in flight.
   * @default false
   */
  loading?: boolean;
  /**
   * Minimum query length (after trimming) before the listbox opens.
   * @default 1
   */
  openThreshold?: number;
  /**
   * Text shown when there are no options and it is not loading. Defaults to the
   * localized `search.no-results` label.
   */
  noResultsText?: React.ReactNode;
  /**
   * Text shown in the loading row. Defaults to the localized `search.loading` label.
   */
  loadingText?: React.ReactNode;
  /**
   * Custom option renderer. Receives the option plus its active state and the
   * current query (handy for match highlighting).
   */
  renderOption?: (option: SearchAutocompleteOption, state: { active: boolean; query: string }) => React.ReactNode;
  /**
   * Derives the input text to show after an option is picked (uncontrolled mode).
   * Defaults to the option's string label, falling back to its `value`.
   */
  getOptionText?: (option: SearchAutocompleteOption) => string;
  /**
   * Called when the clear (×) button is clicked. The query is cleared regardless.
   */
  onClear?: () => void;
}

const optionText = (
  option: SearchAutocompleteOption,
  getOptionText?: SearchAutocompleteProps['getOptionText']
): string => {
  if (getOptionText) return getOptionText(option);
  return typeof option.label === 'string' ? option.label : String(option.value);
};

export const SearchAutocomplete = forwardRef<TextFieldForwardRef, SearchAutocompleteProps>((props, ref) => {
  const {
    id,
    options,
    value: externalValue,
    defaultValue,
    onQueryChange,
    onSelect,
    onSearch,
    loading = false,
    openThreshold = 1,
    noResultsText,
    loadingText,
    renderOption,
    getOptionText,
    onClear,
    isClearable = true,
    ...rest
  } = props;

  const { getLabel } = useLabels();
  const isControlled = externalValue !== undefined;
  const [innerValue, setInnerValue] = useState(defaultValue ?? '');
  const query = externalValue ?? innerValue;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<Array<HTMLElement | null>>([]);

  const meetsThreshold = query.trim().length >= openThreshold;
  const disabledIndices = useMemo(
    () => options.reduce<number[]>((acc, option, index) => (option.disabled ? [...acc, index] : acc), []),
    [options]
  );

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      size({
        padding: 8,
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: `${Math.min(availableHeight, 320)}px`,
          });
        },
      }),
    ],
  });

  const role = useRole(context, { role: 'listbox' });
  const dismiss = useDismiss(context);
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true,
    disabledIndices,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([role, dismiss, listNav]);

  const optionId = (index: number) => `${id}-option-${index}`;

  const selectOption = (option: SearchAutocompleteOption) => {
    if (option.disabled) return;
    if (!isControlled) setInnerValue(optionText(option, getOptionText));
    onSelect?.(option);
    setOpen(false);
    setActiveIndex(null);
  };

  const handleQueryChange = (next: string) => {
    if (!isControlled) setInnerValue(next);
    onQueryChange?.(next);
    setActiveIndex(null);
    setOpen(next.trim().length >= openThreshold);
  };

  const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      if (open && activeIndex !== null && options[activeIndex] && !options[activeIndex].disabled) {
        event.preventDefault();
        selectOption(options[activeIndex]);
        return;
      }
      onSearch?.(query);
      setOpen(false);
    }
  };

  const activeOption = !loading && activeIndex !== null ? options[activeIndex] : undefined;

  const inputAttrs = getReferenceProps({
    role: 'combobox',
    'aria-autocomplete': 'list',
    'aria-activedescendant': open && activeOption && activeIndex !== null ? optionId(activeIndex) : undefined,
    onKeyDown: handleInputKeyDown,
  }) as React.InputHTMLAttributes<HTMLInputElement>;

  const resolvedLoadingText = loadingText ?? getLabel('search.loading');
  const resolvedNoResults = noResultsText ?? getLabel('search.no-results');

  const liveMessage = !open
    ? ''
    : loading
    ? resolvedLoadingText
    : options.length > 0
    ? getLabel('search.results-count', options.length)
    : resolvedNoResults;

  const renderListboxContent = () => {
    if (loading) {
      return (
        <div className={styles['tedi-search-autocomplete__status']}>
          <Spinner size={16} />
          <Text color="tertiary">{resolvedLoadingText}</Text>
        </div>
      );
    }

    if (options.length === 0) {
      return (
        <div className={styles['tedi-search-autocomplete__status']}>
          <Text color="tertiary">{resolvedNoResults}</Text>
        </div>
      );
    }

    return options.map((option, index) => {
      const active = activeIndex === index;

      return (
        <div
          key={option.value}
          id={optionId(index)}
          role="option"
          aria-selected={active}
          aria-disabled={option.disabled || undefined}
          ref={(node) => {
            listRef.current[index] = node;
          }}
          className={cn(styles['tedi-search-autocomplete__option'], {
            [styles['tedi-search-autocomplete__option--active']]: active,
            [styles['tedi-search-autocomplete__option--disabled']]: option.disabled,
          })}
          {...getItemProps({
            onClick: () => selectOption(option),
          })}
        >
          {renderOption ? (
            renderOption(option, { active, query })
          ) : (
            <OptionContent>
              <OptionContent.Label>{option.label ?? option.value}</OptionContent.Label>
            </OptionContent>
          )}
        </div>
      );
    });
  };

  return (
    <div ref={refs.setReference} className={styles['tedi-search-autocomplete']}>
      <TextField
        {...rest}
        ref={ref}
        id={id}
        icon="search"
        isClearable={isClearable}
        value={query}
        onChange={handleQueryChange}
        onClear={onClear}
        onFocus={(e) => {
          rest.onFocus?.(e);
          if (meetsThreshold) setOpen(true);
        }}
        input={inputAttrs}
      />

      <span aria-live="polite" role="status" className={styles['tedi-search-autocomplete__sr-only']}>
        {liveMessage}
      </span>

      {open && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className={styles['tedi-search-autocomplete__listbox']}
            {...getFloatingProps({
              onMouseDown: (event) => event.preventDefault(),
            })}
          >
            {renderListboxContent()}
          </div>
        </FloatingPortal>
      )}
    </div>
  );
});

SearchAutocomplete.displayName = 'SearchAutocomplete';

export default SearchAutocomplete;
