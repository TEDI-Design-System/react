import cn from 'classnames';
import { useMemo, useState } from 'react';

import Separator from '../../../../../../tedi/components/misc/separator/separator';
import { Text } from '../../../../../components/base/typography/text/text';
import { isBreakpointBelow, useBreakpoint } from '../../../../../helpers';
import { ILabelContext, useLabels } from '../../../../../providers/label-provider';
import { Icon } from '../../../../base/icon/icon';
import Link from '../../../../navigation/link/link';
import Popover from '../../../../overlays/popover/popover';
import { StatusBadge } from '../../../../tags/status-badge/status-badge';
import styles from './header-role.module.scss';
import HeaderRoleRepresentatives, { Representative } from './header-role-representatives';

interface HeaderRoleProps {
  title?: string;
  representatives?: Representative[];
  defaultLanguage?: string;
  withStatusBadge?: boolean;
  isOrganization?: boolean;
}

interface HeaderRoleViewProps extends HeaderRoleProps {
  representative: Representative;
  setRepresentative: (r: Representative) => void;
  isRoleSelectionOpen: boolean;
  setIsRoleSelectionOpen: (open: boolean) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  filteredRepresentatives: Representative[];
  getLabel: ILabelContext['getLabel'];
}

const HeaderRole = (props: HeaderRoleProps) => {
  const { getLabel } = useLabels();
  const [representative, setRepresentative] = useState<Representative>(
    props.representatives?.[0] ?? ({} as Representative)
  );
  const [isRoleSelectionOpen, setIsRoleSelectionOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const breakpoint = useBreakpoint();
  const isTabletView = isBreakpointBelow(breakpoint, 'lg');

  const filteredRepresentatives = useMemo(() => {
    if (!props.representatives) return [];

    if (!inputValue) return props.representatives;

    const search = inputValue.toLowerCase();

    return props.representatives.filter((r) => {
      return r.name.toLowerCase().includes(search) || r.description?.toLowerCase().includes(search);
    });
  }, [props.representatives, inputValue]);

  const viewProps: HeaderRoleViewProps = {
    ...props,
    representative,
    setRepresentative,
    isRoleSelectionOpen,
    setIsRoleSelectionOpen,
    inputValue,
    setInputValue,
    filteredRepresentatives,
    getLabel,
  };

  return isTabletView ? <HeaderRoleAccordion {...viewProps} /> : <HeaderRoleSwitch {...viewProps} />;
};

const HeaderRoleAccordion = ({
  title,
  representatives,
  withStatusBadge,
  isOrganization,
  representative,
  setRepresentative,
  isRoleSelectionOpen,
  setIsRoleSelectionOpen,
  inputValue,
  setInputValue,
  filteredRepresentatives,
  getLabel,
}: HeaderRoleViewProps) => {
  const hasMultipleRepresentatives = (representatives?.length ?? 0) > 1;
  const hasSingleRepresentative = representatives?.length === 1;

  return (
    <div className={styles['tedi-header-role__accordion--container']}>
      <div
        className={cn(styles['tedi-header-role__accordion'], {
          [styles['tedi-header-role__accordion---has-representatives']]: hasMultipleRepresentatives,
        })}
      >
        <div
          className={cn(styles['tedi-header-role__accordion--body'], {
            [styles['tedi-header-role__accordion--body-inline']]: filteredRepresentatives.length === 1,
          })}
        >
          {withStatusBadge ? (
            <div className={styles['tedi-header-role__accordion--title']}>
              {title && <StatusBadge>{title}</StatusBadge>}
              <Text modifiers="bold" color="secondary">
                {representative.name}
              </Text>
            </div>
          ) : (
            <Text modifiers="bold" color="secondary" className={styles['tedi-header-role__accordion--title']}>
              {title && <span>{title}</span>}
              <span>{representative.name}</span>
            </Text>
          )}

          {hasSingleRepresentative && representative.description && <Separator axis="vertical" />}
          {!withStatusBadge && <Text color="secondary">{representative.description}</Text>}
        </div>

        {hasMultipleRepresentatives && (
          <Link underline={false} onClick={() => setIsRoleSelectionOpen(!isRoleSelectionOpen)}>
            <div className={styles['tedi-header-role__accordion--toggle']}>
              {isRoleSelectionOpen ? getLabel('close') : getLabel('header.role-selection')}
              <Icon
                name="expand_more"
                size={16}
                className={cn(styles['tedi-header-role__accordion--toggle-icon'], {
                  [styles['tedi-header-role__accordion--toggle-icon--open']]: isRoleSelectionOpen,
                })}
              />
            </div>
          </Link>
        )}
      </div>

      <HeaderRoleRepresentatives
        representatives={filteredRepresentatives}
        inputValue={inputValue}
        setInputValue={setInputValue}
        setRepresentative={setRepresentative}
        setIsRoleSelectionOpen={setIsRoleSelectionOpen}
        isRoleSelectionOpen={isRoleSelectionOpen}
        representative={representative}
        isOrganization={isOrganization}
      />
    </div>
  );
};

const HeaderRoleSwitch = ({
  title,
  representatives,
  withStatusBadge,
  isOrganization,
  representative,
  setRepresentative,
  isRoleSelectionOpen,
  setIsRoleSelectionOpen,
  inputValue,
  setInputValue,
  filteredRepresentatives,
}: HeaderRoleViewProps) => {
  const hasMultipleRepresentatives = (representatives?.length ?? 0) > 1;
  const showStatusBadge = withStatusBadge && title;

  return (
    <div className={styles['tedi-header-role']}>
      <div className={styles['tedi-header-role__label']}>
        {showStatusBadge ? (
          <StatusBadge>{title}</StatusBadge>
        ) : (
          <>
            {title && (
              <Text modifiers={['small', 'bold']} color="secondary">
                {title}
              </Text>
            )}
            {!isOrganization && (
              <Text modifiers="small" color="secondary">
                {representative.description}
              </Text>
            )}
          </>
        )}
      </div>

      {hasMultipleRepresentatives ? (
        <Popover
          placement="bottom"
          open={isRoleSelectionOpen}
          onToggle={() => setIsRoleSelectionOpen(!isRoleSelectionOpen)}
          withBorder={true}
        >
          <Popover.Trigger>
            <Link underline={false}>
              <div className={styles['tedi-header-role__value']}>
                {representative.name}
                <Icon
                  name="expand_more"
                  size={16}
                  color="primary"
                  className={cn(styles['tedi-header-role__icon'], {
                    [styles['tedi-header-role__icon--open']]: isRoleSelectionOpen,
                  })}
                />
              </div>
            </Link>
          </Popover.Trigger>
          <Popover.Content>
            <HeaderRoleRepresentatives
              representatives={filteredRepresentatives}
              inputValue={inputValue}
              setInputValue={setInputValue}
              setRepresentative={setRepresentative}
              setIsRoleSelectionOpen={setIsRoleSelectionOpen}
              isRoleSelectionOpen={isRoleSelectionOpen}
              representative={representative}
              isOrganization={isOrganization}
            />
          </Popover.Content>
        </Popover>
      ) : (
        <div className={styles['tedi-header-role__value']}>
          <Text>{representative.name}</Text>
        </div>
      )}
    </div>
  );
};

export default HeaderRole;
