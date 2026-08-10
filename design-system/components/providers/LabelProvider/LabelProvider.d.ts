import * as React from 'react';

/**
 * LabelProvider — from @tedi-design-system/react@0.0.0-semantic-version (./src/tedi/providers/label-provider/label-provider.stories.tsx).
 */
export interface LabelProviderProps<TRecord extends TediLabelEntryRecord<TRecord> = Record<string, never>> {
  /** Global labels that are use in components. If omitted then default labels are used based on `locale` prop. If both props are omitted then Estonian translations are used by default */
  labels?: TRecord | TediLabelValuesRecord;
  /** Currently used locale. Supported languages are:<br /> et - Estonian<br /> en - English<br /> ru - Russian */
  locale?: "et" | "en" | "ru";
  /** Rest of the App code */
  children: React.ReactNode;
}

// Referenced types, resolved one level deep (see the story source for the rest).
type TediLabelValuesRecord = {
    [TKey in keyof DefaultLabels]?: DefaultLabels[TKey]['et'];
} & {
    [TKey: string]: string | LabelFunctionValue<any[]>;
};

export declare const LabelProvider: React.ComponentType<LabelProviderProps>;
