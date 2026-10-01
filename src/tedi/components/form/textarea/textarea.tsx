import cn from 'classnames';
import React, { forwardRef, useEffect, useRef } from 'react';

import { FeedbackTextProps } from '../feedback-text/feedback-text';
import { TextField, TextFieldForwardRef, TextFieldProps } from '../textfield/textfield';
import styles from './textarea.module.scss';

export interface TextareaProps
  extends Omit<TextFieldProps, 'icon' | 'isClearable' | 'showClearOnInteraction' | 'onClear'> {
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
   * Maximum height of the textarea.
   *
   * - When `autoGrow` is enabled, this limits how tall the textarea can grow.
   * - When `autoGrow` is disabled, this limits the fixed height.
   */
  maxHeight?: string | number;
}

export const Textarea = forwardRef<TextFieldForwardRef, TextareaProps>((props, ref): JSX.Element => {
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

    let lineHeight = parseFloat(computedStyle.lineHeight);

    if (isNaN(lineHeight)) {
      // Fallback: estimate from font-size (common ratio ~1.5)
      const fontSize = parseFloat(computedStyle.fontSize) || 16;
      lineHeight = fontSize * 1.5;
    }

    const paddingTop = parseFloat(computedStyle.paddingTop);
    const paddingBottom = parseFloat(computedStyle.paddingBottom);

    // With border-box sizing the border is part of the height; leaving it out makes the box 2px too short
    const borderHeight =
      computedStyle.boxSizing === 'border-box'
        ? (parseFloat(computedStyle.borderTopWidth) || 0) + (parseFloat(computedStyle.borderBottomWidth) || 0)
        : 0;

    // Reset height so scrollHeight reflects the content, not the current box — otherwise it can never shrink
    textarea.style.height = 'auto';
    const scrollHeight = textarea.scrollHeight;
    const contentHeight = scrollHeight - paddingTop - paddingBottom;

    // 1px tolerance: scrollHeight is rounded, so fractional line heights shouldn't add a phantom row
    const contentRows = Math.ceil((contentHeight - 1) / lineHeight);
    const rowCount = Math.min(Math.max(contentRows, minRows), maxRows);

    const nextHeight = `${rowCount * lineHeight + paddingTop + paddingBottom + borderHeight}px`;
    textarea.style.height = nextHeight;
    setTextareaHeight(nextHeight);

    textarea.style.overflow = originalOverflow;
    // Only scroll once content overflows (past maxRows, or clipped by maxHeight); 1px tolerance for rounding
    textarea.style.overflowY = textarea.scrollHeight - textarea.clientHeight > 1 ? 'auto' : 'hidden';
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

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!autoGrow || !textarea || typeof ResizeObserver === 'undefined') return undefined;

    // Recalculate when the width changes (e.g. window resize), since line wrapping depends on it
    let lastWidth = textarea.clientWidth;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      // Record every width (including 0 while hidden), so showing it again at the same width still recalculates
      const widthChanged = width !== lastWidth;
      lastWidth = width;
      if (width > 0 && widthChanged) {
        calculateHeight();
      }
    });
    observer.observe(textarea);
    return () => observer.disconnect();
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
        style: {
          height: height,
          ...(maxHeight ? { maxHeight } : {}),
          overflow: 'auto',
        },
      };
    }
  }, [autoGrow, minRows, maxHeight, height, textareaHeight]);

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
      isClearable={false}
      className={cn(styles['tedi-textarea'], className)}
      value={value}
      onChange={handleInputChange}
      onChangeEvent={onChangeEvent}
      helper={combinedHelpers as FeedbackTextProps[]}
      input={customInputProps}
    />
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
