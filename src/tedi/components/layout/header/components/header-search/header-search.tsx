import { useEffect, useRef, useState } from 'react';

import { BreakpointSupport, isBreakpointBelow, useBreakpoint } from '../../../../../helpers';
import { useLabels } from '../../../../../providers/label-provider';
import { Icon } from '../../../../base/icon/icon';
import { Text } from '../../../../base/typography/text/text';
import { Button } from '../../../../buttons/button/button';
import HeaderMobileButton from '../header-mobile-button/header-mobile-button';
import styles from './header-search.module.scss';

interface HeaderSearchBreakpointProps {}

type MobileSearchVariant = 'modal' | 'inline';

export interface HeaderSearchProps extends BreakpointSupport<HeaderSearchBreakpointProps> {
  /** Search input or form content rendered inside the search area. */
  children: React.ReactNode;
  /**
   * How the search is presented on mobile viewports.
   * `'modal'` opens a full-screen overlay with a close button, `'inline'` renders the search directly in the header bottom area.
   * @default modal
   */
  mobileVariant?: MobileSearchVariant;
  /** Custom label overrides for the search button and modal title. */
  mobileLabels?: {
    /** Label for the mobile search toggle button. Falls back to the `header.search` translation key. */
    button?: string;
    /** Title displayed at the top of the mobile search modal. Falls back to the `header.search` translation key. */
    modalTitle?: string;
  };
}

export const HeaderSearch = (props: HeaderSearchProps) => {
  const { children, mobileVariant = 'modal', mobileLabels } = props;
  const breakpoint = useBreakpoint();
  const isMobileView = isBreakpointBelow(breakpoint, 'md');
  const { getLabel } = useLabels();

  const [modalOpen, setModalOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (modalOpen && !dialog.open) {
      dialog.showModal();
    } else if (!modalOpen && dialog.open) {
      dialog.close();
    }

    const handleClose = () => setModalOpen(false);
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [modalOpen]);

  return (
    <>
      {isMobileView && mobileVariant === 'modal' ? (
        <>
          <dialog
            ref={dialogRef}
            className={styles['tedi-header-search__modal']}
            aria-label={mobileLabels?.modalTitle ?? getLabel('header.search')}
          >
            <div className={styles['tedi-header-search__modal-heading']}>
              <Text modifiers="h3" color="secondary">
                {mobileLabels?.modalTitle ?? getLabel('header.search')}
              </Text>
              <Button
                onClick={() => setModalOpen(false)}
                className={styles['tedi-header-search__button-close']}
                noStyle
              >
                <Icon name="close" size={24} color="inherit" />
              </Button>
            </div>
            <div className={styles['tedi-header-search__modal-body']}>{children}</div>
          </dialog>
          <HeaderMobileButton
            onClick={() => setModalOpen((prev) => !prev)}
            icon={{ name: 'search', size: 24, color: 'inherit' }}
            label={mobileLabels?.button ?? getLabel('header.search')}
          />
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default HeaderSearch;
