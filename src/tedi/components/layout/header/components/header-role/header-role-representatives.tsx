import cn from 'classnames';
import React from 'react';

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
  isRoleSelectionOpen: boolean;
  isOrganization?: boolean;
}

const HeaderRoleRepresentatives = ({
  representatives,
  inputValue,
  setInputValue,
  setRepresentative,
  setIsRoleSelectionOpen,
  isRoleSelectionOpen,
  representative,
  isOrganization,
}: HeaderRoleRepresentativesProps) => {
  const { getLabel } = useLabels();

  const searchLabel = isOrganization
    ? getLabel('header.role-selection.search-label-organization')
    : getLabel('header.role-selection.search-label');

  const handleSelect = (rep: Representative) => {
    setRepresentative(rep);
    setInputValue('');
    setIsRoleSelectionOpen(false);
  };

  return (
    <div
      className={cn(styles['tedi-header-role__collapse'], {
        [styles['tedi-header-role__collapse--open']]: isRoleSelectionOpen,
      })}
    >
      <div className={styles['tedi-header-role__collapse-inner']}>
        <div className={styles['tedi-header-role__list']}>
          <Search id="header-role-search" value={inputValue} onChange={(e) => setInputValue(e)} label={searchLabel} />
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
