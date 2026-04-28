import cn from 'classnames';
import { ReactElement } from 'react';
import { components as ReactSelectComponents, GroupHeadingProps } from 'react-select';

import { Text, TextProps } from '../../../base/typography/text/text';
import { Checkbox } from '../../checkbox/checkbox';
import { IGroupedOptions, ISelectOption } from '../select';
import styles from '../select.module.scss';
import { areAllSelected, getGroupEnabledOptions, isIndeterminate, toggleBulkSelection } from './select-bulk-helpers';

type GroupHeadingType = GroupHeadingProps<ISelectOption, boolean, IGroupedOptions<ISelectOption>> & {
  optionGroupHeadingText?: Pick<TextProps, 'modifiers' | 'color'>;
};

export const SelectGroupHeading = ({ optionGroupHeadingText, ...props }: GroupHeadingType): ReactElement => {
  const textSettings = props.data.text || optionGroupHeadingText;

  // Forwarded from <Select>; cast to read without polluting react-select types.
  const { selectableGroups, isMulti, value, options, onChange } = props.selectProps as unknown as {
    selectableGroups?: boolean;
    isMulti?: boolean;
    value?: ReadonlyArray<ISelectOption> | ISelectOption | null;
    options: ReadonlyArray<unknown>;
    onChange: (value: ISelectOption[], action: { action: string }) => void;
  };

  const interactive = !!isMulti && !!selectableGroups;
  const groupEnabled = interactive ? getGroupEnabledOptions(options as never, props.data.label ?? '') : [];
  const selected = Array.isArray(value) ? (value as ReadonlyArray<ISelectOption>) : [];
  const allSelected = interactive && areAllSelected(selected, groupEnabled);
  const indeterminate = interactive && isIndeterminate(selected, groupEnabled);

  const handleToggle = () => {
    if (!interactive || groupEnabled.length === 0) return;
    const next = toggleBulkSelection(selected, groupEnabled);
    onChange(next, { action: allSelected ? 'deselect-option' : 'select-option' });
  };

  return (
    <ReactSelectComponents.GroupHeading {...props} className={cn(styles['tedi-select__group-heading'])}>
      {interactive ? (
        <div
          className={styles['tedi-select__group-heading-toggle']}
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleToggle}
        >
          <Checkbox
            id={`${props.selectProps.instanceId ?? 'tedi-select'}-group-${props.data.label}`}
            name="tedi-select__group-toggle"
            value={`__group_${props.data.label}__`}
            label={<Text {...textSettings}>{props.data.label}</Text>}
            checked={allSelected}
            indeterminate={indeterminate}
            onChange={handleToggle}
          />
        </div>
      ) : (
        <Text {...textSettings}>{props.data.label}</Text>
      )}
    </ReactSelectComponents.GroupHeading>
  );
};
