import cn from 'classnames';

import { Modal } from '../../../overlays/modal/modal';
import { PaginationLabels } from '../pagination';
import styles from './pagination-mobile-modal.module.scss';

export interface PaginationMobileModalProps {
  /** Whether the modal is open. */
  open: boolean;
  /** Callback when the modal opens or closes (e.g. dismiss via backdrop or Escape). */
  onOpenChange: (open: boolean) => void;
  /** Total number of pages. */
  pageCount: number;
  /** Currently selected page (1-based). */
  currentPage: number;
  /** Resolved label set — used for `aria-label`s on each list item. */
  labels: Pick<PaginationLabels, 'ariaLabel' | 'pageAriaLabel' | 'currentPageAriaLabel'>;
  /** Fires with the chosen 1-based page. The modal closes automatically. */
  onSelectPage: (page: number) => void;
  /** Optional ref to the trigger element so focus can be restored on close. */
  triggerRef?: React.RefObject<HTMLElement>;
}

/**
 * Mobile page-picker modal — listed page numbers, one per row, with a radio-
 * style indicator on the active page. Used by `Pagination` below `md`.
 */
export const PaginationMobileModal = (props: PaginationMobileModalProps): JSX.Element => {
  const { open, onOpenChange, pageCount, currentPage, labels, onSelectPage } = props;

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  const handleSelect = (page: number) => {
    onSelectPage(page);
    onOpenChange(false);
  };

  return (
    <Modal open={open} onToggle={onOpenChange}>
      <Modal.Content
        size="small"
        position="bottom"
        aria-label={labels.ariaLabel}
        className={styles['tedi-pagination-mobile-modal__content']}
      >
        <Modal.Header closeButtonProps={{ className: styles['tedi-pagination-mobile-modal__close'] }} />
        <Modal.Body>
          <ul className={styles['tedi-pagination-mobile-modal__list']}>
            {pages.map((page) => {
              const isSelected = page === currentPage;
              return (
                <li key={page}>
                  <button
                    type="button"
                    className={cn(styles['tedi-pagination-mobile-modal__item'], {
                      [styles['tedi-pagination-mobile-modal__item--selected']]: isSelected,
                    })}
                    aria-current={isSelected ? 'page' : undefined}
                    aria-label={isSelected ? labels.currentPageAriaLabel(page) : labels.pageAriaLabel(page)}
                    onClick={() => handleSelect(page)}
                  >
                    <span
                      className={cn(styles['tedi-pagination-mobile-modal__radio'], {
                        [styles['tedi-pagination-mobile-modal__radio--selected']]: isSelected,
                      })}
                      aria-hidden="true"
                    />
                    <span className={styles['tedi-pagination-mobile-modal__label']}>{page}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

PaginationMobileModal.displayName = 'PaginationMobileModal';

export default PaginationMobileModal;
