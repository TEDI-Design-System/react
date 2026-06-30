import classNames from 'classnames';
import { JSX } from 'react';

import Button from '../../../../tedi/components/buttons/button/button';
import { Field } from '../../../../tedi/components/form/field/field';
import { Input, Suffix } from '../../../../tedi/components/form/input-group';
import { InputGroupBase } from '../../../../tedi/components/form/input-group/input-group';
import { Slider } from '../../../../tedi/components/form/slider/slider';
import { Popover } from '../../../../tedi/components/overlays/popover';
import BaseMapOption from './base-map-option';
import styles from './base-map-selection.module.scss';

export interface BaseMapSelectionProps {
  /**
   * Title of the trigger button and used as its accessible label.
   */
  title: string;
  /**
   * Visual content (thumbnail) of the currently active base map, shown on the trigger button.
   */
  content: React.ReactNode;
  /**
   * Selectable base map options rendered inside the popover, typically `BaseMapSelection.Option` elements.
   */
  children: React.ReactNode;
  /**
   * Renders a "stacked" trigger, indicating that multiple base maps are available.
   * @default false
   */
  multiple?: boolean;
  /**
   * When `true`, renders a transparency slider at the bottom of the popover.
   * @default false
   */
  showTransparency?: boolean;
  /**
   * Controlled transparency value (0-100). Use together with `onTransparencyChange`.
   */
  transparency?: number;
  /**
   * Callback fired when the transparency value changes.
   */
  onTransparencyChange?: (value: number) => void;
  /**
   * Label for the transparency slider.
   */
  transparencyLabel?: string;
  /**
   * HTML `id` attribute applied to the trigger button.
   */
  id: string;
}

const clampTransparency = (value: string | number): number => {
  const next = Number(value);

  if (Number.isNaN(next)) {
    return 0;
  }

  return Math.min(100, Math.max(0, next));
};

export const BaseMapSelection = (props: BaseMapSelectionProps): JSX.Element => {
  const {
    title,
    content,
    children,
    multiple = false,
    showTransparency = false,
    transparency,
    onTransparencyChange,
    transparencyLabel = '',
    id,
  } = props;

  const transparencyValue = transparency ?? 0;

  const handleTransparencyChange = (value: number) => {
    onTransparencyChange?.(clampTransparency(value));
  };

  const triggerBEM = classNames(
    styles['tedi-base-map-selection__wrapper'],
    styles['tedi-base-map-selection__trigger'],
    styles['tedi-base-map-selection--button'],
    multiple && styles['tedi-base-map-selection--multiple']
  );

  return (
    <Popover placement="top-end">
      <Popover.Trigger>
        <Button noStyle id={id} className={triggerBEM} aria-label={title}>
          <div className={styles['tedi-base-map-selection__content']}>{content}</div>
          <div className={styles['tedi-base-map-selection__title']}>{title}</div>
        </Button>
      </Popover.Trigger>
      <Popover.Content width="medium">
        <div className={styles['tedi-base-map-selection__options']}>{children}</div>
        {showTransparency && (
          <div className={styles['tedi-base-map-selection__transparency']}>
            <Slider
              label={transparencyLabel}
              aria-label={transparencyLabel || 'Transparency'}
              min={0}
              max={100}
              value={transparencyValue}
              onChange={handleTransparencyChange}
              minLabel="0%"
              maxLabel="100%"
              addonRight={
                <div className={styles['tedi-base-map-selection__transparency-field']}>
                  <InputGroupBase id={`${id}-transparency`} label={transparencyLabel || 'Transparency'} hideLabel>
                    <Input>
                      <Field
                        type="number"
                        id={`${id}-transparency-field`}
                        value={String(transparencyValue)}
                        onChange={(value) => handleTransparencyChange(clampTransparency(value))}
                      />
                    </Input>
                    <Suffix>%</Suffix>
                  </InputGroupBase>
                </div>
              }
            />
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
};

BaseMapSelection.Option = BaseMapOption;
BaseMapSelection.displayName = 'BaseMapSelection';

export type { BaseMapOptionProps, BaseMapOptionType } from './base-map-option';
export { BaseMapOption };

export default BaseMapSelection;
