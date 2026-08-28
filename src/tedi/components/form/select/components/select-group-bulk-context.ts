import { createContext, useContext } from 'react';
import { SetValueAction } from 'react-select';

import { ISelectOption } from '../select';

/**
 * Exposes react-select's `getValue` / `setValue` helpers from the `Group`
 * component down to `GroupHeading`. react-select only forwards `selectProps`
 * + theme/styles to the heading at runtime, so the heading can't read these
 * helpers from its own props — it has to grab them from this context.
 *
 * Using `selectProps.value` / `selectProps.onChange` instead would only work
 * in fully controlled mode: in uncontrolled mode `value` is undefined and
 * `onChange` bypasses react-select's internal state.
 */
export interface SelectGroupBulkApi {
  getValue: () => ReadonlyArray<ISelectOption>;
  setValue: (value: ReadonlyArray<ISelectOption>, action: SetValueAction) => void;
}

export const SelectGroupBulkContext = createContext<SelectGroupBulkApi | null>(null);

export const useSelectGroupBulkApi = () => useContext(SelectGroupBulkContext);
