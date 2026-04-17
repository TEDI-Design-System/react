import { useState } from 'react';

import { BreakpointSupport, isBreakpointBelow, useBreakpoint } from '../../../../../helpers';
import { useLabels } from '../../../../../providers/label-provider';
import { Icon } from '../../../../base/icon/icon';
import { Text } from '../../../../base/typography/text/text';
import { Button } from '../../../../buttons/button/button';
import HeaderMobileButton from '../header-mobile-button/header-mobile-button';
import styles from './header-search.module.scss';

interface HeaderProfileBreakpointProps {}

type MobileSearchVariant = 'modal' | 'inline';

export interface HeaderSearchProps extends BreakpointSupport<HeaderProfileBreakpointProps> {
  children: React.ReactNode;
  mobileVariant?: MobileSearchVariant;
}

const HeaderSearch = (props: HeaderSearchProps) => {
  const { children, mobileVariant = 'modal' } = props;
  const breakpoint = useBreakpoint();
  const isMobileView = isBreakpointBelow(breakpoint, 'md');
  const { getLabel } = useLabels();

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {isMobileView && mobileVariant === 'modal' ? (
        <>
          {modalOpen && (
            <div className={styles['tedi-header-search__modal']}>
              <div className={styles['tedi-header-search__modal-heading']}>
                <Text modifiers="h3" color="secondary">
                  {getLabel('header.search')}
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
            </div>
          )}
          <HeaderMobileButton
            onClick={() => setModalOpen(!modalOpen)}
            icon={{ name: 'search', size: 24, color: 'inherit' }}
            text={getLabel('header.search')}
          />
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default HeaderSearch;
