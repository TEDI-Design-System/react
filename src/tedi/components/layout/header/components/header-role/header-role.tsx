import cn from 'classnames';
import React, { useEffect, useId, useMemo, useState } from 'react';

import { Text } from '../../../../../components/base/typography/text/text';
import { isBreakpointBelow, useBreakpoint } from '../../../../../helpers';
import { useLabels } from '../../../../../providers/label-provider';
import { Icon } from '../../../../base/icon/icon';
import Button from '../../../../buttons/button/button';
import Separator from '../../../../misc/separator/separator';
import Popover from '../../../../overlays/popover/popover';
import styles from './header-role.module.scss';
import HeaderRoleRepresentatives, { Representative } from './header-role-representatives';

export interface HeaderRoleProps {
  /**
   * Descriptive label rendered above the representative name (e.g. plain text, Tag, or any ReactNode).
   */
  label?: React.ReactNode;
  /**
   * Whether to display the selected representative's description text in the header area.
   * Does not affect the description shown in the selection list items.
   * @default true
   */
  showDescription?: boolean;
  /** List of selectable representatives. */
  representatives: Representative[];
  /** Whether the role represents an organization. */
  isOrganization?: boolean;
  /** Custom labels for the accordion toggle button. */
  accordionLabels?: {
    open?: string;
    close?: string;
  };
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
  /** Callback fired when the role selection accordion or popover is toggled. */
  onRoleSelectionToggle?: (isOpen: boolean) => void;
  /** Callback fired when a representative is selected. */
  onRepresentativeChange?: (representative: Representative) => void;
}

export const HeaderRole = (props: HeaderRoleProps) => {
  const {
    label,
    showDescription = true,
    representatives,
    isOrganization,
    accordionLabels,
    searchLabel,
    organizationSearchLabel,
    searchId,
    onRoleSelectionToggle,
    onRepresentativeChange,
  } = props;
  const { getLabel } = useLabels();
  const roleId = useId();
  const [representative, setRepresentative] = useState<Representative | undefined>(representatives?.[0]);
  const [isRoleSelectionOpen, setIsRoleSelectionOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setRepresentative(representatives?.[0]);
  }, [representatives]);

  const breakpoint = useBreakpoint();
  const isTabletView = isBreakpointBelow(breakpoint, 'lg');
  const hasMultipleRepresentatives = (representatives?.length ?? 0) > 1;

  const filteredRepresentatives = useMemo(() => {
    if (!representatives) return [];
    if (!inputValue) return representatives;

    const search = inputValue.toLowerCase();
    return representatives.filter((r) => {
      return r.name.toLowerCase().includes(search) || r.description?.toLowerCase().includes(search);
    });
  }, [representatives, inputValue]);

  const handleToggle = () => {
    const next = !isRoleSelectionOpen;
    setIsRoleSelectionOpen(next);
    onRoleSelectionToggle?.(next);
  };

  const handleRepresentativeChange = (rep: Representative) => {
    setRepresentative(rep);
    onRepresentativeChange?.(rep);
  };

  const toggleId = `${roleId}-toggle`;
  const panelId = `${roleId}-panel`;

  const representativesProps = {
    id: panelId,
    toggleId,
    representatives: filteredRepresentatives,
    representative,
    inputValue,
    setInputValue,
    setRepresentative: handleRepresentativeChange,
    setIsRoleSelectionOpen,
    onRoleSelectionToggle: handleToggle,
    isRoleSelectionOpen,
    isOrganization,
    searchLabel,
    organizationSearchLabel,
    searchId,
  };

  if (isTabletView) {
    const openLabel = accordionLabels?.open ?? getLabel('header.role-selection');
    const closeLabel = accordionLabels?.close ?? getLabel('header.role-selection.close');

    return (
      <div className={styles['tedi-header-role__accordion--container']}>
        <div
          className={cn(styles['tedi-header-role__accordion'], {
            [styles['tedi-header-role__accordion--has-representatives']]: hasMultipleRepresentatives,
          })}
        >
          <div
            className={cn(styles['tedi-header-role__accordion--body'], {
              [styles['tedi-header-role__accordion--body-inline']]:
                !hasMultipleRepresentatives && showDescription && representative?.description,
            })}
          >
            <div className={styles['tedi-header-role__accordion--title']}>
              {label}
              <Text modifiers="bold" color="secondary">
                {representative?.name}
              </Text>
            </div>
            {showDescription && representative?.description && (
              <>
                {!hasMultipleRepresentatives && <Separator axis="vertical" />}
                <Text color="secondary">{representative?.description}</Text>
              </>
            )}
          </div>

          {hasMultipleRepresentatives && (
            <Button
              id={toggleId}
              visualType="link"
              underline={false}
              onClick={() => handleToggle()}
              aria-expanded={isRoleSelectionOpen}
              aria-controls={panelId}
            >
              <div className={styles['tedi-header-role__accordion--toggle']}>
                {isRoleSelectionOpen ? closeLabel : openLabel}
                <Icon
                  name="expand_more"
                  size={16}
                  className={cn(styles['tedi-header-role__accordion--toggle-icon'], {
                    [styles['tedi-header-role__accordion--toggle-icon--open']]: isRoleSelectionOpen,
                  })}
                />
              </div>
            </Button>
          )}
        </div>

        {hasMultipleRepresentatives && <HeaderRoleRepresentatives {...representativesProps} keepOpenOnSelect />}
      </div>
    );
  }

  return (
    <div className={styles['tedi-header-role']}>
      <div className={styles['tedi-header-role__label']}>
        {label}
        {showDescription && !isOrganization && representative?.description && (
          <Text modifiers="small" color="secondary">
            {representative?.description}
          </Text>
        )}
      </div>

      {hasMultipleRepresentatives ? (
        <Popover placement="bottom" open={isRoleSelectionOpen} onToggle={handleToggle} withBorder={true}>
          <Popover.Trigger>
            <Button visualType="link" underline={false}>
              <div className={styles['tedi-header-role__value']}>
                {representative?.name}
                <Icon
                  name="expand_more"
                  size={16}
                  color="primary"
                  className={cn(styles['tedi-header-role__icon'], {
                    [styles['tedi-header-role__icon--open']]: isRoleSelectionOpen,
                  })}
                />
              </div>
            </Button>
          </Popover.Trigger>
          <Popover.Content>
            <HeaderRoleRepresentatives {...representativesProps} />
          </Popover.Content>
        </Popover>
      ) : (
        <div className={styles['tedi-header-role__value']}>
          <Text>{representative?.name}</Text>
        </div>
      )}
    </div>
  );
};

HeaderRole.displayName = 'Header.Role';

export default HeaderRole;
