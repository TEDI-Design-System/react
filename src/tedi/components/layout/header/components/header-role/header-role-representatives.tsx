import cn from 'classnames';
import React, { useId } from 'react';

import { useLabels } from '../../../../../providers/label-provider';
import { Icon, IconProps } from '../../../../base/icon/icon';
import { Text } from '../../../../base/typography/text/text';
import { Button } from '../../../../buttons/button/button';
import { Search } from '../../../../form/search/search';
import Separator from '../../../../misc/separator/separator';
import styles from './header-role.module.scss';

export interface Representative {
  /** Unique identifier for the representative. */
  id: string;
  /** Display name shown in the header and selection list. */
  name: string;
  /** Additional context shown below the name (e.g. role, organization, personal code). */
  description?: string;
  /** Icon displayed next to the representative in the selection list. */
  icon?: IconProps;
}
interface HeaderRoleRepresentativesProps {
  /** Unique id for the collapsible panel, used for aria-controls on the toggle. */
  id?: string;
  /** Id of the toggle button, used for aria-labelledby on the panel. */
  toggleId?: string;
  /** List of representatives to display in the selection list. */
  representatives: Representative[];
  /** Currently selected representative. */
  representative?: Representative;
  /** Current value of the search input. */
  inputValue: string;
  /** Callback to update the search input value. */
  setInputValue: (value: string) => void;
  /** Callback to update the selected representative. */
  setRepresentative: (rep: Representative) => void;
  /** Callback to control the open/closed state of the role selection. */
  setIsRoleSelectionOpen: (open: boolean) => void;
  /** Callback fired when the role selection is toggled. Handles both state update and external notification. */
  onRoleSelectionToggle?: () => void;
  /** Whether the role selection panel is currently open. */
  isRoleSelectionOpen: boolean;
  /** Whether the representatives belong to an organization context. Affects the search input label. */
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
    id,
    toggleId,
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
      id={id}
      role="region"
      aria-labelledby={toggleId}
      className={cn(styles['tedi-header-role__selection'], {
        [styles['tedi-header-role__selection--open']]: isRoleSelectionOpen,
      })}
      {...(!isRoleSelectionOpen && { inert: '' })}
    >
      <div className={styles['tedi-header-role__selection-inner']}>
        <div className={styles['tedi-header-role__selection-body']}>
          <div className={styles['tedi-header-role__list']}>
            <Search
              id={searchId ?? generatedSearchId}
              value={inputValue}
              onChange={(value) => setInputValue(value)}
              label={resolvedSearchLabel}
            />
            {representatives.map((rep) => {
              const isSelected = representative?.id === rep.id;

              return (
                <React.Fragment key={rep.id}>
                  <Separator />
                  <Button
                    onClick={() => handleSelect(rep)}
                    visualType={isSelected ? 'primary' : 'neutral'}
                    aria-current={isSelected || undefined}
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
    </div>
  );
};

HeaderRoleRepresentatives.displayName = 'HeaderRoleRepresentatives';

export default HeaderRoleRepresentatives;
