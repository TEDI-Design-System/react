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
} from '@floating-ui/react';
import cn from 'classnames';
import React, { forwardRef, useMemo, useRef, useState } from 'react';

import { useLabels } from '../../../providers/label-provider';
import { IconWithoutBackgroundProps } from '../../base/icon/icon';
import { Text } from '../../base/typography/text/text';
import { Button, ButtonProps } from '../../buttons/button/button';
import { Spinner } from '../../loaders/spinner/spinner';
import { OptionContent } from '../../misc/option-content/option-content';
import { FieldElement } from '../field/field';
import { TextField, TextFieldForwardRef, TextFieldProps } from '../textfield/textfield';
import styles from './search.module.scss';

export interface SearchSuggestion {
  /**
   * Stable value returned to `onSuggestionSelect` and used as the React key. For
   * richer payloads keep a lookup keyed by this value on the consumer side.
   */
  value: string;
  /**
   * Visible label. Falls back to `value` when omitted.
   */
  label?: React.ReactNode;
  /**
   * Optional secondary line shown beneath the label (e.g. a code, category, or
   * hint). Rendered as `OptionContent.Meta` in the default row layout; ignored
   * when a custom `renderSuggestionContent` is supplied.
   */
  description?: React.ReactNode;
  /**
   * Renders the suggestion greyed out and skips it during keyboard navigation.
   * @default false
   */
  disabled?: boolean;
}

const SEARCH_PANEL_OFFSET = 4;
const SEARCH_PANEL_PADDING = 8;

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export interface SearchProps
  extends Omit<
    TextFieldProps,
    | 'isTextArea'
    | 'icon'
    | 'onIconClick'
    | 'iconButtonProps'
    | 'isArrowsHidden'
    | 'onKeyPress'
    | 'startSlot'
    | 'endSlot'
    | 'inputClassName'
  > {
  /**
   * Callback triggered when the search is executed (Enter key pressed or button clicked).
   * In autocomplete mode it fires on Enter only when no suggestion is active — a free-text submit.
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
  /**
   * Suggestions rendered in the popup. Providing this array (even empty) turns the
   * field into an accessible combobox; leave it `undefined` for a plain search
   * field. Filter / fetch these yourself in response to `onChange`; the component
   * renders exactly what it is given.
   */
  suggestions?: SearchSuggestion[];
  /**
   * Fired when a suggestion is chosen (Enter on the active suggestion, or click). In
   * controlled mode update `value` from here to reflect the picked label.
   */
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void;
  /**
   * Shows a loading row in the popup instead of suggestions — use while an async
   * request is in flight.
   * @default false
   */
  loading?: boolean;
  /**
   * Minimum query length (after trimming) before the popup opens.
   * @default 0
   */
  minQueryLength?: number;
  /**
   * Closes the suggestion popup when the page (or a scrollable ancestor) scrolls.
   * Scrolling the suggestion list itself keeps the popup open.
   * @default false
   */
  hideOnScroll?: boolean;
  /**
   * Custom suggestion renderer. Receives the suggestion plus its active state and
   * the current query (handy for match highlighting).
   */
  renderSuggestionContent?: (
    suggestion: SearchSuggestion,
    state: { active: boolean; query: string }
  ) => React.ReactNode;
  /**
   * Derives the input text to show after a suggestion is picked (uncontrolled mode).
   * Defaults to the suggestion's string label, falling back to its `value`.
   */
  getSuggestionText?: (suggestion: SearchSuggestion) => string;
  /**
   * Text shown when there are no suggestions and it is not loading. Defaults to the
   * localized `search.no-results` label.
   */
  noResultsText?: React.ReactNode;
  /**
   * Text shown in the loading row. Defaults to the localized `search.loading` label.
   */
  loadingText?: React.ReactNode;
  /**
   * Builds the politely announced live-region message stating how many suggestions
   * are available. Defaults to the localized `search.results-count` label.
   */
  resultsCountText?: (count: number) => string;
  /**
   * Extra content pinned below the suggestions — fallback actions or a hint, for
   * example. It shows whenever the popup is open, including the no-results state.
   * `Tab` from the field moves focus into the footer's controls.
   */
  footer?: React.ReactNode;
  /**
   * Additional native attributes for the input element (e.g. `autoComplete`, `maxLength`).
   * Narrowed to input attributes — a search field is always a single-line `<input>`.
   */
  input?: React.InputHTMLAttributes<HTMLInputElement>;
}

const suggestionText = (suggestion: SearchSuggestion, getSuggestionText?: SearchProps['getSuggestionText']): string => {
  if (getSuggestionText) return getSuggestionText(suggestion);
  return typeof suggestion.label === 'string' ? suggestion.label : String(suggestion.value);
};

/** Bolds the substring of `label` that matches `query` (case-insensitive). */
const highlightMatch = (label: string, query: string): React.ReactNode => {
  const trimmed = query.trim();
  if (!trimmed) return label;

  const index = label.toLowerCase().indexOf(trimmed.toLowerCase());
  if (index === -1) return label;

  return (
    <>
      {label.slice(0, index)}
      <Text element="span" modifiers="bold">
        {label.slice(index, index + trimmed.length)}
      </Text>
      {label.slice(index + trimmed.length)}
    </>
  );
};

const SearchInner = forwardRef<TextFieldForwardRef, SearchProps>((props, ref): JSX.Element => {
  const {
    id,
    placeholder,
    isClearable = true,
    searchIcon = 'search',
    onSearch,
    onChange,
    onClear,
    onFocus,
    button,
    ariaLabel,
    className,
    input,
    value: externalValue,
    defaultValue,
    suggestions,
    onSuggestionSelect,
    loading = false,
    minQueryLength = 0,
    hideOnScroll = false,
    renderSuggestionContent,
    getSuggestionText,
    noResultsText,
    loadingText,
    resultsCountText,
    footer,
    ...rest
  } = props;

  const { getLabel } = useLabels();

  const generatedId = React.useId();
  const resolvedId = id ?? generatedId;

  const isAutocomplete = suggestions !== undefined;
  const suggestionList = useMemo(() => (Array.isArray(suggestions) ? suggestions : []), [suggestions]);

  const isControlled = externalValue !== undefined;
  const [innerValue, setInnerValue] = useState(defaultValue ?? '');
  const query = externalValue ?? innerValue;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<Array<HTMLElement | null>>([]);
  const footerRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<TextFieldForwardRef>(null);
  const skipReopenRef = useRef(false);

  React.useImperativeHandle(ref, () => fieldRef.current as TextFieldForwardRef, []);

  const meetsThreshold = query.trim().length >= minQueryLength;
  const hasSuggestions = !loading && suggestionList.length > 0;
  const disabledIndices = useMemo(
    () =>
      suggestionList.reduce<number[]>((acc, suggestion, index) => (suggestion.disabled ? [...acc, index] : acc), []),
    [suggestionList]
  );

  const { refs, floatingStyles, context } = useFloating({
    open: isAutocomplete && open,
    onOpenChange: setOpen,
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(SEARCH_PANEL_OFFSET),
      flip({ padding: SEARCH_PANEL_PADDING }),
      shift({ padding: SEARCH_PANEL_PADDING }),
      size({
        padding: SEARCH_PANEL_PADDING,
        apply({ rects, elements, availableHeight }) {
          elements.floating.style.width = `${rects.reference.width}px`;
          elements.floating.style.setProperty('--tedi-search-panel-available-height', `${availableHeight}px`);
        },
      }),
    ],
  });

  const dismiss = useDismiss(context, { ancestorScroll: hideOnScroll });
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true,
    disabledIndices,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([dismiss, listNav]);

  const listboxId = `${resolvedId}-listbox`;
  const optionId = (index: number) => `${resolvedId}-option-${index}`;

  const panelVisible =
    isAutocomplete && open && meetsThreshold && (loading || hasSuggestions || query.trim().length > 0);

  const getFooterFocusables = (): HTMLElement[] =>
    footerRef.current ? Array.from(footerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)) : [];

  const focusInput = (skipReopen = true) => {
    skipReopenRef.current = skipReopen;
    fieldRef.current?.input?.focus();
  };

  const closePanel = () => {
    setOpen(false);
    setActiveIndex(null);
  };

  const selectSuggestion = (suggestion: SearchSuggestion) => {
    if (suggestion.disabled) return;
    if (!isControlled) setInnerValue(suggestionText(suggestion, getSuggestionText));
    onSuggestionSelect?.(suggestion);
    closePanel();
  };

  const handleChange = (next: string) => {
    if (!isControlled) setInnerValue(next);
    onChange?.(next);
    if (isAutocomplete) {
      skipReopenRef.current = false;
      setActiveIndex(null);
      setOpen(next.trim().length >= minQueryLength);
    }
  };

  const handleFocus: React.FocusEventHandler<FieldElement> = (event) => {
    onFocus?.(event);
    if (!isAutocomplete) return;
    if (skipReopenRef.current) {
      skipReopenRef.current = false;
      return;
    }
    if (meetsThreshold) setOpen(true);
  };

  const handlePlainKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') onSearch?.(query);
  };

  const activeSuggestion = !loading && activeIndex !== null ? suggestionList[activeIndex] : undefined;

  const focusAfterField = () => {
    const inputEl = fieldRef.current?.input;
    if (!inputEl) return;

    const panel = refs.floating.current;
    const focusables = Array.from(document.body.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
      (element) => !panel?.contains(element)
    );
    focusables[focusables.indexOf(inputEl) + 1]?.focus();
  };

  const handleAutocompleteKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      if (
        panelVisible &&
        activeIndex !== null &&
        suggestionList[activeIndex] &&
        !suggestionList[activeIndex].disabled
      ) {
        event.preventDefault();
        selectSuggestion(suggestionList[activeIndex]);
        return;
      }
      onSearch?.(query);
      setOpen(false);
      return;
    }

    if (event.key === 'Tab' && !event.shiftKey && panelVisible && footer) {
      const focusables = getFooterFocusables();
      if (focusables.length) {
        event.preventDefault();
        focusables[0].focus();
      }
    }
  };

  const handleBlur: React.FocusEventHandler<HTMLDivElement> = (event) => {
    if (!isAutocomplete || !open) return;
    const next = event.relatedTarget as Node | null;
    const panel = refs.floating.current;
    if (next && (event.currentTarget.contains(next) || panel?.contains(next))) return;
    closePanel();
  };

  const handleFooterKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closePanel();
      focusInput();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusables = getFooterFocusables();
    const index = focusables.indexOf(event.target as HTMLElement);

    if (event.shiftKey && index === 0) {
      event.preventDefault();
      focusInput();
    } else if (!event.shiftKey && index === focusables.length - 1) {
      event.preventDefault();
      closePanel();
      focusAfterField();
    }
  };

  const iconBase: IconWithoutBackgroundProps = typeof searchIcon === 'string' ? { name: searchIcon } : searchIcon;
  const resolvedSearchIcon: IconWithoutBackgroundProps = {
    color: 'secondary',
    ...iconBase,
    className: cn(iconBase.className, rest.disabled && styles['tedi-search__icon--disabled']),
  };

  const comboboxInputProps: React.InputHTMLAttributes<HTMLInputElement> = isAutocomplete
    ? (getReferenceProps({
        role: 'combobox',
        'aria-autocomplete': 'list',
        'aria-expanded': panelVisible,
        'aria-controls': panelVisible && hasSuggestions ? listboxId : undefined,
        'aria-activedescendant':
          panelVisible && activeSuggestion && activeIndex !== null ? optionId(activeIndex) : undefined,
        onKeyDown: handleAutocompleteKeyDown,
      }) as React.InputHTMLAttributes<HTMLInputElement>)
    : { role: 'searchbox' };

  const mergedInput: React.InputHTMLAttributes<HTMLInputElement> = { ...input, ...comboboxInputProps };

  if (isAutocomplete) {
    const consumerOnKeyDown = input?.onKeyDown;
    const comboboxOnKeyDown = comboboxInputProps.onKeyDown;
    mergedInput.onKeyDown = (event) => {
      consumerOnKeyDown?.(event);
      comboboxOnKeyDown?.(event);
    };
  }

  const textFieldProps = {
    ...rest,
    ref: fieldRef,
    id: resolvedId,
    value: query,
    onChange: handleChange,
    onClear,
    onFocus: handleFocus,
    inputClassName: cn(styles['tedi-search__input'], button && styles['tedi-search__input--has-button'], className),
    placeholder,
    isClearable,
    input: mergedInput,
    ...(button ? {} : { icon: resolvedSearchIcon }),
    ...(isAutocomplete ? {} : { onKeyDown: handlePlainKeyDown }),
  };

  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    button?.onClick?.(event);
    onSearch?.(query);
  };

  const searchAriaLabel = ariaLabel || getLabel('search');

  const resolvedLoadingText = loadingText ?? getLabel('search.loading');
  const resolvedNoResults = noResultsText ?? getLabel('search.no-results');
  const resolvedResultsCount = resultsCountText ?? ((count: number) => getLabel('search.results-count', count));

  const liveMessage = !panelVisible
    ? ''
    : loading
    ? resolvedLoadingText
    : suggestionList.length > 0
    ? resolvedResultsCount(suggestionList.length)
    : resolvedNoResults;

  const renderPanelBody = () => {
    if (loading) {
      return (
        <div className={styles['tedi-search__panel-status']}>
          <Spinner size={16} />
          <Text color="tertiary">{resolvedLoadingText}</Text>
        </div>
      );
    }

    if (hasSuggestions) {
      return (
        <ul id={listboxId} role="listbox" className={styles['tedi-search__panel-list']}>
          {suggestionList.map((suggestion, index) => {
            const active = activeIndex === index;
            const labelText =
              typeof (suggestion.label ?? suggestion.value) === 'string'
                ? String(suggestion.label ?? suggestion.value)
                : undefined;
            const descriptionText = typeof suggestion.description === 'string' ? suggestion.description : undefined;
            const optionAriaLabel =
              !renderSuggestionContent && labelText
                ? [labelText, descriptionText].filter(Boolean).join(', ')
                : undefined;

            return (
              <li
                key={suggestion.value}
                id={optionId(index)}
                role="option"
                aria-selected={active}
                aria-disabled={suggestion.disabled || undefined}
                aria-label={optionAriaLabel}
                ref={(node) => {
                  listRef.current[index] = node;
                }}
                className={cn(styles['tedi-search__option'], {
                  [styles['tedi-search__option--active']]: active,
                  [styles['tedi-search__option--disabled']]: suggestion.disabled,
                })}
                {...getItemProps({
                  onClick: () => selectSuggestion(suggestion),
                  onMouseDown: (event) => event.preventDefault(),
                })}
              >
                {renderSuggestionContent ? (
                  renderSuggestionContent(suggestion, { active, query })
                ) : (
                  <OptionContent layout={suggestion.description !== undefined ? 'vertical' : 'horizontal'}>
                    <OptionContent.Label>
                      {labelText ? highlightMatch(labelText, query) : suggestion.label ?? suggestion.value}
                    </OptionContent.Label>
                    {suggestion.description !== undefined && (
                      <OptionContent.Meta>{suggestion.description}</OptionContent.Meta>
                    )}
                  </OptionContent>
                )}
              </li>
            );
          })}
        </ul>
      );
    }

    return (
      <div className={styles['tedi-search__panel-status']}>
        <Text color="tertiary">{resolvedNoResults}</Text>
      </div>
    );
  };

  return (
    <div
      ref={refs.setReference}
      className={cn(
        styles['tedi-search__wrapper'],
        rest.size === 'small' && styles['tedi-search__wrapper--small'],
        rest.size === 'large' && styles['tedi-search__wrapper--large']
      )}
      role="search"
      aria-label={searchAriaLabel}
      onBlur={handleBlur}
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
          aria-label={button['aria-label'] ?? (button.children ? undefined : getLabel('search'))}
        >
          {button.children ?? getLabel('search')}
        </Button>
      )}

      {isAutocomplete && (
        <span aria-live="polite" role="status" className={styles['tedi-search__announcement']}>
          {liveMessage}
        </span>
      )}

      {panelVisible && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className={styles['tedi-search__panel']}
            {...getFloatingProps()}
          >
            {renderPanelBody()}
            {footer && (
              <div ref={footerRef} className={styles['tedi-search__footer']} onKeyDown={handleFooterKeyDown}>
                {footer}
              </div>
            )}
          </div>
        </FloatingPortal>
      )}
    </div>
  );
});

SearchInner.displayName = 'Search';

export const Search = SearchInner;

export default Search;
