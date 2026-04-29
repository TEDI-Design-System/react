import cn from 'classnames';
import { ReactElement, useId } from 'react';
import { components as ReactSelectComponents, GroupHeadingProps } from 'react-select';

import { Text, TextProps } from '../../../base/typography/text/text';
import { Checkbox } from '../../checkbox/checkbox';
import { IGroupedOptions, ISelectOption } from '../select';
import styles from '../select.module.scss';
import { areAllSelected, getGroupEnabledOptions, isIndeterminate, toggleBulkSelection } from './select-bulk-helpers';
import { useSelectGroupBulkApi } from './select-group-bulk-context';

type GroupHeadingType = GroupHeadingProps<ISelectOption, boolean, IGroupedOptions<ISelectOption>> & {
  optionGroupHeadingText?: Pick<TextProps, 'modifiers' | 'color'>;
};

export const SelectGroupHeading = ({ optionGroupHeadingText, ...props }: GroupHeadingType): ReactElement => {
  const groupHeadingId = useId();
  const textSettings = props.data.text || optionGroupHeadingText;

  // Forwarded from <Select>; cast to read without polluting react-select types.
  const { selectableGroups, isMulti } = props.selectProps as unknown as {
    selectableGroups?: boolean;
    isMulti?: boolean;
  };

  // `getValue` / `setValue` come from the parent `SelectGroup` via context —
  // react-select doesn't forward them onto `GroupHeading` directly, and
  // reading `selectProps.value` / `selectProps.onChange` instead would only
  // work in fully controlled mode.
  const bulkApi = useSelectGroupBulkApi();
  const interactive = !!isMulti && !!selectableGroups && !!bulkApi;

  // `props.data` is the current group provided by react-select — using it
  // directly avoids re-finding by label, which would collide if two groups
  // share the same label.
  const groupEnabled = interactive ? getGroupEnabledOptions(props.data) : [];
  const selected = bulkApi?.getValue() ?? [];
  const allSelected = interactive && areAllSelected(selected, groupEnabled);
  const indeterminate = interactive && isIndeterminate(selected, groupEnabled);

  const handleToggle = () => {
    if (!interactive || !bulkApi || groupEnabled.length === 0) return;
    const next = toggleBulkSelection(selected, groupEnabled);
    bulkApi.setValue(next, allSelected ? 'deselect-option' : 'select-option');
  };

  return (
    <ReactSelectComponents.GroupHeading {...props} className={cn(styles['tedi-select__group-heading'])}>
      {interactive ? (
        // The Checkbox owns the toggle path through its own `onChange`;
        // attaching another handler to the wrapper would fire `handleToggle`
        // twice on a single user click. The wrapper stays only to swallow the
        // mousedown that would otherwise close react-select's menu.
        <div className={styles['tedi-select__group-heading-toggle']} onMouseDown={(e) => e.preventDefault()}>
          <Checkbox
            id={`${props.selectProps.instanceId ?? 'tedi-select'}-group-${groupHeadingId}`}
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

SelectGroupHeading.displayName = 'SelectGroupHeading';
