import cn from 'classnames';
import React, { forwardRef, useEffect, useRef } from 'react';

import { FeedbackTextProps } from '../feedback-text/feedback-text';
import { TextField, TextFieldForwardRef, TextFieldProps } from '../textfield/textfield';
import styles from './textarea.module.scss';

export interface TextAreaProps extends TextFieldProps {
  /**
   * Maximum number of characters allowed in the textarea.
   */
  characterLimit?: number;
  /**
   * Enable automatic height adjustment based on content.
   * @default false
   */
  autoGrow?: boolean;
  /**
   * Minimum number of rows (only used when autoGrow = true).
   * @default 3
   */
  minRows?: number;
  /**
   * Maximum number of rows before scrolling (only used when autoGrow = true).
   * @default 12
   */
  maxRows?: number;
  /**
   * Fixed height for the textarea (e.g. '200px', '12rem', 240).
   * Ignored when autoGrow = true.
   *
   * @default 7.5rem
   */
  height?: string | number;
  /**
   * Maximum height when autoGrow is enabled.
   */
  maxHeight?: string | number;
}

export const TextArea = forwardRef<TextFieldForwardRef, TextAreaProps>((props, ref): JSX.Element => {
  const {
    className,
    helper = [],
    characterLimit,
    onChange,
    onChangeEvent,
    value: externalValue,
    defaultValue,
    autoGrow = false,
    minRows = 3,
    maxRows = 12,
    height = '7.5rem',
    maxHeight,
    ...rest
  } = props;

  const [innerValue, setInnerValue] = React.useState(defaultValue ?? '');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [textareaHeight, setTextareaHeight] = React.useState<string | number>('auto');

  const handleInputChange = React.useCallback(
    (inputValue: string) => {
      if (!externalValue && !(onChange || onChangeEvent)) {
        setInnerValue(inputValue);
      }
      onChange?.(inputValue);
    },
    [externalValue, onChange, onChangeEvent]
  );

  const value = React.useMemo(() => externalValue ?? innerValue, [externalValue, innerValue]);

  const calculateHeight = React.useCallback(() => {
    if (!autoGrow || !textareaRef.current) return;

    const textarea = textareaRef.current;

    const originalOverflow = textarea.style.overflow;

    textarea.style.overflow = 'hidden';

    const computedStyle = window.getComputedStyle(textarea);
    const lineHeight = parseFloat(computedStyle.lineHeight);

    const paddingTop = parseFloat(computedStyle.paddingTop);
    const paddingBottom = parseFloat(computedStyle.paddingBottom);

    const scrollHeight = textarea.scrollHeight;
    const contentHeight = scrollHeight - paddingTop - paddingBottom;

    let rowCount = Math.ceil(contentHeight / lineHeight);

    rowCount = Math.min(Math.max(rowCount, minRows), maxRows);

    const calculatedHeight = rowCount * lineHeight + paddingTop + paddingBottom;

    textarea.style.height = `${calculatedHeight}px`;

    textarea.style.overflow = originalOverflow;

    if (rowCount >= maxRows) {
      textarea.style.overflowY = 'auto';
    } else {
      textarea.style.overflowY = 'hidden';
    }
  }, [autoGrow, minRows, maxRows]);

  useEffect(() => {
    if (autoGrow) {
      requestAnimationFrame(() => {
        calculateHeight();
      });
    }
  }, [value, autoGrow, calculateHeight]);

  useEffect(() => {
    if (autoGrow && textareaRef.current) {
      calculateHeight();
    }
  }, [autoGrow, calculateHeight]);

  const handleRef = React.useCallback(
    (node: TextFieldForwardRef | null) => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(node);
        } else {
          ref.current = node;
        }
      }

      if (node?.input && node.input instanceof HTMLTextAreaElement) {
        textareaRef.current = node.input;

        if (autoGrow) {
          setTimeout(calculateHeight, 0);
        }
      }
    },
    [ref, autoGrow, calculateHeight]
  );

  const customInputProps = React.useMemo(() => {
    if (autoGrow) {
      return {
        rows: minRows,
        style: {
          ...(maxHeight ? { maxHeight } : {}),
          overflow: 'hidden',
          height: textareaHeight,
        },
      };
    } else {
      return {
        rows: minRows,
        style: {
          height: height,
          ...(maxHeight ? { maxHeight } : {}),
          overflow: 'auto',
        },
      };
    }
  }, [autoGrow, minRows, maxHeight, height, textareaHeight]);

  useEffect(() => {
    if (autoGrow && textareaRef.current) {
      const updateHeight = () => {
        if (textareaRef.current) {
          setTextareaHeight(textareaRef.current.style.height);
        }
      };
      updateHeight();
    }
  }, [autoGrow, value]);

  const charCount = value.length;
  const charCountHelper = characterLimit ? `${charCount}/${characterLimit}` : '';
  const combinedHelpers = [
    ...(Array.isArray(helper) ? helper : [helper]),
    ...(characterLimit
      ? [
          {
            type: charCount > characterLimit ? 'error' : 'hint',
            text: charCountHelper,
            position: 'right',
            className: cn(styles['tedi-textarea__character-count']),
          },
        ]
      : []),
  ];

  return (
    <TextField
      {...rest}
      ref={handleRef}
      data-name="textarea"
      inputClassName={cn(styles['tedi-textarea__input'], {
        [styles['tedi-textarea__input--auto-grow']]: autoGrow,
      })}
      isTextArea={true}
      className={cn(styles['tedi-textarea'], className)}
      value={value}
      onChange={handleInputChange}
      onChangeEvent={onChangeEvent}
      helper={combinedHelpers as FeedbackTextProps[]}
      input={customInputProps}
    />
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;
