import cn from 'classnames';
import React, { createContext, forwardRef, ReactNode, useContext, useImperativeHandle, useMemo, useState } from 'react';

import FeedbackText, { FeedbackTextProps } from '../feedback-text/feedback-text';
import FormLabel, { FormLabelProps } from '../form-label/form-label';
import { Input } from './components/input/input';
import { Prefix } from './components/prefix/prefix';
import { Suffix } from './components/suffix/suffix';
import styles from './input-group.module.scss';

export interface InputGroupProps extends FormLabelProps {
  /**
   * Additional class name(s) applied to the root element of the InputGroup.
   * Useful for custom styling or layout overrides.
   */
  className?: string;
  /**
   * Enables merged styling between input and its prefix/suffix elements.
   * When `true`, borders and radius are visually combined into a single control.
   * Disable this when using non-standard addons (e.g. buttons) that should not visually merge.
   *
   * @default true
   */
  addons?: boolean;
  /**
   * Helper or feedback text displayed below the input group.
   * Can be a single item or multiple messages (e.g. error + hint).
   *
   * Accepts the same props as `FeedbackText`.
   */
  helper?: FeedbackTextProps | FeedbackTextProps[];
  /**
   * InputGroup composition slots.
   * Typically includes `InputGroup.Input` and optionally `InputGroup.Prefix` and/or `InputGroup.Suffix`.
   */
  children: ReactNode;
  /**
   * Disables the entire input group.
   * Applies disabled styles to the group and propagates the disabled state
   * to the input and any interactive prefix/suffix elements.
   */
  disabled?: boolean;
}

export interface InputGroupForwardRef {
  root: HTMLDivElement | null;
}

export type InputGroupContextValue = {
  /**
   * Registers a prefix element within the InputGroup.
   * Used internally to apply correct styling (e.g. border merging).
   */
  registerPrefix: () => void;
  /**
   * Unregisters the prefix element when it is removed.
   */
  unregisterPrefix: () => void;
  /**
   * Registers a suffix element within the InputGroup.
   * Used internally to apply correct styling.
   */
  registerSuffix: () => void;
  /**
   * Unregisters the suffix element when it is removed.
   */
  unregisterSuffix: () => void;
  /**
   * Whether a prefix is currently present.
   */
  hasPrefix: boolean;
  /**
   * Whether a suffix is currently present.
   */
  hasSuffix: boolean;
  /**
   * Disabled state inherited from InputGroup.
   * Consumers (Input, Prefix, Suffix) should use this to adjust
   * behavior and styling.
   */
  disabled?: boolean;
  /*
   * Indicates if the InputGroup has an external label (i.e. FormLabel rendered by InputGroup).
   * This is used by child components to determine if they should render their own label or not.
   * E.g., if `hasExternalLabel` is true, an Input component inside the group might choose to hide its own label to avoid redundancy.
   * This is particularly important for accessibility, ensuring that screen readers do not announce duplicate labels.
   */
  hasExternalLabel?: boolean;
  /*
   * The ID to be applied to the input element within the group.
   * This allows the FormLabel rendered by InputGroup to correctly reference the input for accessibility.
   * If not provided, InputGroup will generate a unique ID internally.
   */
  inputId?: string;
};

const InputGroupContext = createContext<InputGroupContextValue | null>(null);

export const useInputGroup = () => {
  const ctx = useContext(InputGroupContext);
  if (!ctx) throw new Error('InputGroupContext missing');
  return ctx;
};

export const useOptionalInputGroup = () => {
  return useContext(InputGroupContext);
};

const InputGroupBase = forwardRef<InputGroupForwardRef, InputGroupProps>(
  ({ className, addons = true, helper, label, children, disabled, id, ...labelProps }, ref) => {
    const rootRef = React.useRef<HTMLDivElement>(null);
    const generatedId = React.useId();

    const inputId = id ?? generatedId;

    const [hasPrefix, setHasPrefix] = useState(false);
    const [hasSuffix, setHasSuffix] = useState(false);

    useImperativeHandle(ref, () => ({
      get root() {
        return rootRef.current;
      },
    }));

    const ctxValue = useMemo(
      () => ({
        hasPrefix,
        hasSuffix,
        disabled,
        hasExternalLabel: !!label,
        inputId,
        registerPrefix: () => setHasPrefix(true),
        unregisterPrefix: () => setHasPrefix(false),
        registerSuffix: () => setHasSuffix(true),
        unregisterSuffix: () => setHasSuffix(false),
      }),
      [inputId, hasPrefix, hasSuffix, disabled]
    );

    const groupClassName = cn(
      styles['tedi-input-group'],
      {
        [styles['tedi-input-group--addons']]: addons,
        [styles['tedi-input-group--has-prefix']]: hasPrefix,
        [styles['tedi-input-group--has-suffix']]: hasSuffix,
        [styles['tedi-input-group--disabled']]: disabled,
      },
      className
    );

    const renderFeedback = () => {
      if (!helper || (Array.isArray(helper) && helper.length === 0)) return null;

      return (
        <div className={styles['tedi-input-group__feedback-wrapper']}>
          {Array.isArray(helper) ? (
            helper.map((item, index) => <FeedbackText key={index} {...item} id={`group-helper-${index}`} />)
          ) : (
            <FeedbackText {...helper} id="group-helper" />
          )}
        </div>
      );
    };

    return (
      <InputGroupContext.Provider value={ctxValue}>
        {label && <FormLabel {...labelProps} label={label} id={inputId} />}

        <div ref={rootRef} className={groupClassName} data-name="tedi-input-group" aria-disabled={disabled}>
          {children}
        </div>

        {renderFeedback()}
      </InputGroupContext.Provider>
    );
  }
);

InputGroupBase.displayName = 'InputGroup';

const InputGroup = Object.assign(InputGroupBase, {
  Prefix,
  Suffix,
  Input,
});

export default InputGroup;
