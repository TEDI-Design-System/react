import cn from 'classnames';
import { useMemo } from 'react';
import { components as ReactSelectComponents, GroupProps } from 'react-select';

import { IGroupedOptions, ISelectOption } from '../select';
import styles from '../select.module.scss';
import { SelectGroupBulkApi, SelectGroupBulkContext } from './select-group-bulk-context';

export const SelectGroup = (props: GroupProps<ISelectOption, boolean, IGroupedOptions<ISelectOption>>): JSX.Element => {
  // `Group` is the closest component that still has react-select's commonProps
  // (`getValue` / `setValue`). Forward them via context so `SelectGroupHeading`
  // can use the documented helper API regardless of controlled/uncontrolled
  // mode.
  const bulkApi = useMemo<SelectGroupBulkApi>(
    () => ({
      getValue: () => props.getValue() as ReadonlyArray<ISelectOption>,
      setValue: (value, action) => props.setValue(value as ReadonlyArray<ISelectOption>, action),
    }),
    [props]
  );

  return (
    <SelectGroupBulkContext.Provider value={bulkApi}>
      <ReactSelectComponents.Group {...props} className={cn(styles['tedi-select__group'])}>
        {props.children}
      </ReactSelectComponents.Group>
    </SelectGroupBulkContext.Provider>
  );
};

SelectGroup.displayName = 'SelectGroup';
