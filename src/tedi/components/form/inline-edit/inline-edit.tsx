import cn from 'classnames';
import React from 'react';

import { useLabels } from '../../../providers/label-provider';
import { Icon } from '../../base/icon/icon';
import { FeedbackText, FeedbackTextProps } from '../feedback-text/feedback-text';
import styles from './inline-edit.module.scss';

export interface UseInlineEditOptions<T> {
  /** Controlled committed value. Pair with `onChange`. */
  value?: T;
  /** Initial committed value for uncontrolled use. Ignored when `value` is set. */
  defaultValue?: T;
  /** Called with the draft when an edit is committed. */
  onChange?: (value: T) => void;
  /** Starts in edit mode. An editor that starts open does not take focus. @default false */
  defaultEditing?: boolean;
}

export type InlineEditSize = 'default' | 'small';

/** Props handed to the editor render function. */
export interface InlineEditEditor<T> {
  /** Current draft value — wire this to the control's `value`. */
  value: T;
  /** Update the draft — wire this to the control's `onChange`. */
  onChange: (value: T) => void;
  /** Commit the draft (fires `onChange`) and leave edit mode. */
  commit: () => void;
  /** Discard the draft and leave edit mode. */
  cancel: () => void;
}

export interface UseInlineEditResult<T> extends InlineEditEditor<T> {
  /** Whether the field is currently in edit mode. */
  isEditing: boolean;
  /** Enter edit mode (seeds the draft from the committed value). */
  edit: () => void;
  /** The last committed value (what the read view shows). */
  committedValue: T;
}

/**
 * Headless edit-in-place state: read/committed value + an inline-edit draft, with
 * `edit` / `commit` / `cancel` transitions. Supports controlled and
 * uncontrolled use. Use directly when you want full control of the markup;
 * otherwise use `InlineEdit`.
 */
export function useInlineEdit<T>({
  value,
  defaultValue,
  onChange,
  defaultEditing = false,
}: UseInlineEditOptions<T>): UseInlineEditResult<T> {
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = React.useState<T>((value ?? defaultValue) as T);
  const committedValue = (isControlled ? value : innerValue) as T;

  const [isEditing, setIsEditing] = React.useState(defaultEditing);
  const [draft, setDraftState] = React.useState<T>(committedValue);
  const draftRef = React.useRef<T>(draft);

  const setDraft = React.useCallback((next: T) => {
    draftRef.current = next;
    setDraftState(next);
  }, []);

  const edit = React.useCallback(() => {
    setDraft(committedValue);
    setIsEditing(true);
  }, [committedValue, setDraft]);

  const cancel = React.useCallback(() => setIsEditing(false), []);

  const commit = React.useCallback(() => {
    const next = draftRef.current;
    if (!isControlled) setInnerValue(next);
    onChange?.(next);
    setIsEditing(false);
  }, [isControlled, onChange]);

  return { isEditing, edit, commit, cancel, committedValue, value: draft, onChange: setDraft };
}

export interface InlineEditProps<T> extends UseInlineEditOptions<T> {
  /** Accessible label for the field (announced on the read trigger). */
  label: string;
  /**
   * Renders the read view. Defaults to the value itself. Return a node — e.g.
   * format a `Date`, or map a select option to its `label`.
   */
  renderValue?: (value: T) => React.ReactNode;
  /** Shown in the read view when the value is empty. No default — supply one if you want an empty-state hint. */
  placeholder?: React.ReactNode;
  /**
   * Renders the value as plain text with no edit affordance, keeping the row's inset so a fixed value lines up among
   * editable ones. For a block that is entirely read-only, use `TextGroup` instead.
   */
  readOnly?: boolean;
  /**
   * Disables editing while keeping the trigger and edit icon visible but greyed — use for
   * transient states (saving/pending) or when the field depends on another. Clicking and keyboard
   * activation are blocked and the trigger leaves the tab order, but a controlled `value` update
   * still re-renders. Differs from `readOnly`, which drops the edit affordance entirely.
   * @default false
   */
  disabled?: boolean;
  /**
   * Marks the row as invalid — the read trigger gets an error border and
   * `aria-invalid`. `helper` items with `type: 'error'` set this automatically.
   * @default false
   */
  invalid?: boolean;
  /**
   * Feedback text rendered below the field — a single `FeedbackTextProps` or an
   * array. An `error` item also drives the invalid state (red border), a `valid`
   * item the success state. Wired to the read trigger via `aria-describedby`.
   */
  helper?: FeedbackTextProps | FeedbackTextProps[];
  /**
   * Sizes the row to its value rather than filling its container. The row then
   * changes width when the editor opens, because the control brings its own
   * width — use it only for a value edited inside running text. @default false
   */
  contentWidth?: boolean;
  /**
   * Size of the read trigger and editor.
   * - `default` — regular body text.
   * - `small` — smaller body text for dense layouts.
   * Both sizes use the same edit icon size. Dimensions follow the design tokens.
   * @default default
   */
  size?: InlineEditSize;
  /**
   * Placement of the edit (pencil) icon on the read trigger. Hidden while the
   * row is invalid.
   * - `end` — the icon is pushed to the trailing edge, so icons line up across
   *   stacked rows.
   * - `inline` — the icon sits directly after the value.
   * @default end
   */
  editIconPosition?: 'inline' | 'end';
  /** id applied to the read trigger. */
  id?: string;
  /** Additional class on the root element. */
  className?: string;
  /**
   * Renders the edit view — return any TEDI control wired to the render props.
   * The wrapper commits on focus leaving the editor and cancels on `Escape`.
   * The editor also receives the field's `size` — forward it to the control so the
   * editor matches the read view (a small field opens a small control).
   */
  children: (editor: InlineEditEditor<T> & { size: InlineEditSize }) => React.ReactNode;
}

const isEmpty = (value: unknown): boolean => value === undefined || value === null || value === '';

export function InlineEdit<T>({
  label,
  renderValue,
  placeholder,
  readOnly = false,
  disabled = false,
  invalid = false,
  helper,
  contentWidth = false,
  size = 'default',
  editIconPosition = 'end',
  id,
  className,
  children,
  ...options
}: InlineEditProps<T>): JSX.Element {
  const { getLabel } = useLabels();
  const generatedId = React.useId();
  const fieldId = id ?? generatedId;
  const editorRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const restoreFocus = React.useRef(false);
  const { isEditing, edit, commit, cancel, committedValue, value, onChange } = useInlineEdit<T>(options);
  const contentWidthClass = contentWidth ? styles['tedi-inline-edit--content-width'] : undefined;
  const smallClass = size === 'small' ? styles['tedi-inline-edit--small'] : undefined;

  const hasHelper = Array.isArray(helper) ? helper.length > 0 : Boolean(helper);
  const isInvalid = React.useMemo(() => {
    if (Array.isArray(helper)) return invalid || helper.some((item) => item.type === 'error');
    return invalid || helper?.type === 'error';
  }, [invalid, helper]);

  const helperBaseId = `${fieldId}-helper`;
  const describedBy = !hasHelper
    ? undefined
    : Array.isArray(helper)
    ? helper.map((_, index) => `${helperBaseId}-${index}`).join(' ')
    : helperBaseId;

  const renderFeedback = (): React.ReactNode => {
    if (!hasHelper) return null;
    return (
      <div className={styles['tedi-inline-edit__feedback']}>
        {Array.isArray(helper) ? (
          helper.map((item, index) => <FeedbackText key={index} {...item} id={`${helperBaseId}-${index}`} />)
        ) : (
          <FeedbackText {...(helper as FeedbackTextProps)} id={helperBaseId} />
        )}
      </div>
    );
  };

  const withFeedback = (control: React.ReactNode): JSX.Element => {
    if (!hasHelper) return <>{control}</>;
    return (
      <div className={cn(styles['tedi-inline-edit__field'], contentWidthClass)}>
        {control}
        {renderFeedback()}
      </div>
    );
  };

  // An editor that starts open does not take focus; every later open does.
  const focusOnOpen = React.useRef(!isEditing);

  React.useEffect(() => {
    if (!isEditing) {
      focusOnOpen.current = true;
      if (restoreFocus.current) {
        restoreFocus.current = false;
        triggerRef.current?.focus();
      }
      return;
    }
    if (!focusOnOpen.current) return;
    const editor = editorRef.current;
    if (!editor) return;

    const target =
      editor.querySelector<HTMLElement>('input, textarea, select, [contenteditable]') ??
      editor.querySelector<HTMLElement>('[tabindex]:not([tabindex="-1"])');
    target?.focus();
  }, [isEditing]);

  const commitAndRestoreFocus = () => {
    restoreFocus.current = true;
    commit();
  };

  const cancelAndRestoreFocus = () => {
    restoreFocus.current = true;
    cancel();
  };

  if (isEditing) {
    return withFeedback(
      <div
        ref={editorRef}
        className={cn(
          styles['tedi-inline-edit'],
          styles['tedi-inline-edit--editing'],
          contentWidthClass,
          smallClass,
          className
        )}
        onKeyDown={(event) => {
          if (event.nativeEvent.isComposing) return;
          if (event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            cancelAndRestoreFocus();
            return;
          }

          if (event.key === 'Enter' && !event.shiftKey) {
            const target = event.target as HTMLElement;
            const isMultiline = target.tagName === 'TEXTAREA';
            const isWidgetInput = !!target.closest('[role="combobox"], [role="listbox"]');
            if (isMultiline || isWidgetInput) return;
            event.preventDefault();
            commitAndRestoreFocus();
          }
        }}
        onBlur={() => {
          window.setTimeout(() => {
            if (!editorRef.current) return;
            const active = document.activeElement;
            if (editorRef.current.contains(active)) return;
            if (active?.closest('[data-floating-ui-portal]')) return;
            commit();
          }, 0);
        }}
      >
        {children({ value, onChange, commit: commitAndRestoreFocus, cancel: cancelAndRestoreFocus, size })}
      </div>
    );
  }

  const display = renderValue ? renderValue(committedValue) : (committedValue as React.ReactNode);
  const empty = renderValue ? isEmpty(display) : isEmpty(committedValue);

  if (readOnly) {
    return withFeedback(
      <span
        className={cn(
          styles['tedi-inline-edit'],
          styles['tedi-inline-edit--readonly'],
          contentWidthClass,
          smallClass,
          className
        )}
      >
        <span className={empty ? styles['tedi-inline-edit__placeholder'] : undefined}>
          {empty ? placeholder : display}
        </span>
      </span>
    );
  }

  return withFeedback(
    <button
      ref={triggerRef}
      type="button"
      id={fieldId}
      onClick={edit}
      disabled={disabled}
      aria-describedby={describedBy}
      className={cn(
        styles['tedi-inline-edit'],
        styles['tedi-inline-edit__trigger'],
        contentWidthClass,
        smallClass,
        { [styles['tedi-inline-edit--icon-end']]: editIconPosition === 'end' },
        { [styles['tedi-inline-edit--invalid']]: isInvalid },
        className
      )}
    >
      <span className={styles['tedi-inline-edit__prefix']}>
        {getLabel('inline-edit.edit')} {label}:{' '}
      </span>
      <span className={empty ? styles['tedi-inline-edit__placeholder'] : styles['tedi-inline-edit__value']}>
        {empty ? placeholder : display}
      </span>
      {!isInvalid && (
        <Icon name="edit" size={18} color="inherit" aria-hidden className={styles['tedi-inline-edit__icon']} />
      )}
    </button>
  );
}

InlineEdit.displayName = 'InlineEdit';

export default InlineEdit;
