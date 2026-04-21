import cn from 'classnames';
import React, { useId } from 'react';

import Separator from '../../../../../../tedi/components/misc/separator/separator';
import { Text } from '../../../../../components/base/typography/text/text';
import { useLabels } from '../../../../../providers/label-provider';
import { Icon, IconProps } from '../../../../base/icon/icon';
import { Button } from '../../../../buttons/button/button';
import { Search } from '../../../../form/search/search';
import styles from './header-role.module.scss';

export interface Representative {
  name: string;
  description?: string;
  icon?: IconProps;
}
interface HeaderRoleRepresentativesProps {
  representatives: Representative[];
  representative: Representative;
  inputValue: string;
  setInputValue: (value: string) => void;
  setRepresentative: (rep: Representative) => void;
  setIsRoleSelectionOpen: (open: boolean) => void;
  /** Callback fired when the role selection is toggled. Handles both state update and external notification. */
  onRoleSelectionToggle?: () => void;
  isRoleSelectionOpen: boolean;
  isOrganization?: boolean;
  /**
   * Label for the search input when selecting a representative.
   * Falls back to i18n labels when not provided.
   */
  searchLabel?: string;
  /**
   * Label for the search input when selecting an organization representative.
   * Overrides both the default and `searchLabel` when `isOrganization` is true.
   */
  organizationSearchLabel?: string;
  /** Optional id for the search input. Falls back to a generated unique id. */
  searchId?: string;
  /** Whether to keep the role selection open after selecting a representative. */
  keepOpenOnSelect?: boolean;
}

const HeaderRoleRepresentatives = (props: HeaderRoleRepresentativesProps) => {
  const {
    representatives,
    inputValue,
    setInputValue,
    setRepresentative,
    setIsRoleSelectionOpen,
    onRoleSelectionToggle,
    isRoleSelectionOpen,
    representative,
    isOrganization,
    searchLabel,
    organizationSearchLabel,
    searchId,
    keepOpenOnSelect,
  } = props;
  const { getLabel } = useLabels();

  const resolvedSearchLabel = isOrganization
    ? organizationSearchLabel ?? getLabel('header.role-selection.search.organizationLabel')
    : searchLabel ?? getLabel('header.role-selection.search.label');

  const handleSelect = (rep: Representative) => {
    setRepresentative(rep);
    setInputValue('');

    if (!keepOpenOnSelect) {
      if (isRoleSelectionOpen && onRoleSelectionToggle) {
        onRoleSelectionToggle();
      } else {
        setIsRoleSelectionOpen(false);
      }
    }
  };

  const generatedSearchId = useId();

  return (
    <div
      className={cn(styles['tedi-header-role__collapse'], {
        [styles['tedi-header-role__collapse--open']]: isRoleSelectionOpen,
      })}
      {...(!isRoleSelectionOpen && { inert: '' })}
    >
      <div className={styles['tedi-header-role__collapse-inner']}>
        <div className={styles['tedi-header-role__list']}>
          <Search
            id={searchId ?? generatedSearchId}
            value={inputValue}
            onChange={(e) => setInputValue(e)}
            label={resolvedSearchLabel}
          />
          {representatives.map((rep) => {
            const isSelected = representative.name === rep.name;

            return (
              <React.Fragment key={rep.name}>
                <Separator />
                <Button
                  onClick={() => handleSelect(rep)}
                  visualType={isSelected ? 'primary' : 'neutral'}
                  className={cn(styles['tedi-header-role__item'], {
                    [styles['tedi-header-role__item--selected']]: isSelected,
                  })}
                  noStyle
                >
                  <div className={styles['tedi-header-role__item-inner']}>
                    {rep.icon && <Icon name={rep.icon.name} size={rep.icon.size} color="inherit" />}
                    <div className={styles['tedi-header-role__item-text']}>
                      {rep.name}

                      <Text modifiers="small">{rep.description}</Text>
                    </div>
                  </div>
                </Button>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeaderRoleRepresentatives;
