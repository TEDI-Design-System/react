import cn from 'classnames';
import { useEffect, useRef } from 'react';

import { Sheet } from '../../../overlays/sheet/sheet';
import styles from './pagination-mobile-modal.module.scss';

export interface PaginationMobileModalOption {
  /** Value emitted when this option is selected. */
  value: number;
  /** Visible label inside the row. */
  label: string;
  /** Full accessible name for the row's button. */
  ariaLabel: string;
}

export interface PaginationMobileModalProps {
  /** Whether the sheet is open. */
  open: boolean;
  /** Callback when the sheet opens or closes (e.g. dismiss via backdrop, Escape or drag). */
  onOpenChange: (open: boolean) => void;
  /** Options listed in the picker. */
  options: PaginationMobileModalOption[];
  /** Currently selected value — drives the active row styling. */
  selectedValue: number;
  /** Fires with the chosen value. The sheet closes automatically. */
  onSelect: (value: number) => void;
  /** Accessible name for the sheet dialog (used when `title` is omitted). */
  ariaLabel: string;
  /** Optional heading rendered in the sheet header. */
  title?: string;
  /** `aria-current` value set on the selected row. @default 'true' */
  ariaCurrent?: 'page' | 'step' | 'true';
}

/**
 * Mobile option picker in a bottom sheet — one row per option with a radio-style
 * indicator on the active one. Used by `Pagination` below `md` for both the page
 * picker and the page-size picker.
 */
export const PaginationMobileModal = (props: PaginationMobileModalProps): JSX.Element => {
  const { open, onOpenChange, options, selectedValue, onSelect, ariaLabel, title, ariaCurrent = 'true' } = props;

  const selectedItemRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => {
      if (typeof selectedItemRef.current?.scrollIntoView === 'function') {
        selectedItemRef.current.scrollIntoView({ block: 'start' });
      }
    });
    return () => cancelAnimationFrame(id);
  }, [open]);

  const handleSelect = (value: number) => {
    onSelect(value);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onToggle={onOpenChange}>
      <Sheet.Content initialFocus={selectedItemRef} aria-label={title ? undefined : ariaLabel}>
        <Sheet.Header title={title} variant="default" />
        <Sheet.Body padding="none">
          <ul className={styles['tedi-pagination-mobile-modal__list']}>
            {options.map((option) => {
              const isSelected = option.value === selectedValue;
              return (
                <li key={option.value}>
                  <button
                    ref={isSelected ? selectedItemRef : undefined}
                    type="button"
                    className={cn(styles['tedi-pagination-mobile-modal__item'], {
                      [styles['tedi-pagination-mobile-modal__item--selected']]: isSelected,
                    })}
                    aria-current={isSelected ? ariaCurrent : undefined}
                    aria-label={option.ariaLabel}
                    onClick={() => handleSelect(option.value)}
                  >
                    <span
                      className={cn(styles['tedi-pagination-mobile-modal__radio'], {
                        [styles['tedi-pagination-mobile-modal__radio--selected']]: isSelected,
                      })}
                      aria-hidden="true"
                    />
                    <span className={styles['tedi-pagination-mobile-modal__label']}>{option.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Sheet.Body>
      </Sheet.Content>
    </Sheet>
  );
};

PaginationMobileModal.displayName = 'PaginationMobileModal';

export default PaginationMobileModal;
