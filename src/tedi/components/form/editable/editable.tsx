import cn from 'classnames';
import React from 'react';

import { useLabels } from '../../../providers/label-provider';
import { Icon } from '../../base/icon/icon';
import styles from './editable.module.scss';

export interface UseEditableOptions<T> {
  /** Controlled committed value. Pair with `onChange`. */
  value?: T;
  /** Initial committed value for uncontrolled use. Ignored when `value` is set. */
  defaultValue?: T;
  /** Called with the draft when an edit is committed. */
  onChange?: (value: T) => void;
}

/** Props handed to the editor render function. */
export interface EditableEditor<T> {
  /** Current draft value — wire this to the control's `value`. */
  value: T;
  /** Update the draft — wire this to the control's `onChange`. */
  onChange: (value: T) => void;
  /** Commit the draft (fires `onChange`) and leave edit mode. */
  commit: () => void;
  /** Discard the draft and leave edit mode. */
  cancel: () => void;
}

export interface UseEditableResult<T> extends EditableEditor<T> {
  /** Whether the field is currently in edit mode. */
  isEditing: boolean;
  /** Enter edit mode (seeds the draft from the committed value). */
  edit: () => void;
  /** The last committed value (what the read view shows). */
  committedValue: T;
}

/**
 * Headless edit-in-place state: read/committed value + an editable draft, with
 * `edit` / `commit` / `cancel` transitions. Supports controlled and
 * uncontrolled use. Use directly when you want full control of the markup;
 * otherwise use `Editable`.
 */
export function useEditable<T>({ value, defaultValue, onChange }: UseEditableOptions<T>): UseEditableResult<T> {
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = React.useState<T>((value ?? defaultValue) as T);
  const committedValue = (isControlled ? value : innerValue) as T;

  const [isEditing, setIsEditing] = React.useState(false);
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

export interface EditableProps<T> extends UseEditableOptions<T> {
  /** Accessible label for the field (announced on the read trigger). */
  label: string;
  /**
   * Renders the read view. Defaults to the value itself. Return a node — e.g.
   * format a `Date`, or map a select option to its `label`.
   */
  renderValue?: (value: T) => React.ReactNode;
  /** Shown in the read view when the value is empty. @default '—' */
  placeholder?: React.ReactNode;
  /** Renders the value as static text with no edit affordance. */
  disabled?: boolean;
  /**
   * Stretches the field (read trigger and editor) to the full width of its
   * container, so controls like `Select`, `Slider` or `TextField` fill the row
   * instead of sizing to their content. @default false
   */
  fullWidth?: boolean;
  /**
   * Hides the edit (pencil) icon on the read trigger. The affordance still works
   * — the whole value stays clickable — this only drops the visual cue.
   * @default false
   */
  hideEditIcon?: boolean;
  /** id applied to the read trigger. */
  id?: string;
  /** Additional class on the root element. */
  className?: string;
  /**
   * Renders the edit view — return any TEDI control wired to the render props.
   * The wrapper commits on focus leaving the editor and cancels on `Escape`.
   */
  children: (editor: EditableEditor<T>) => React.ReactNode;
}

const isEmpty = (value: unknown): boolean => value === undefined || value === null || value === '';

export function Editable<T>({
  label,
  renderValue,
  placeholder = '—',
  disabled = false,
  fullWidth = false,
  hideEditIcon = false,
  id,
  className,
  children,
  ...options
}: EditableProps<T>): JSX.Element {
  const { getLabel } = useLabels();
  const generatedId = React.useId();
  const fieldId = id ?? generatedId;
  const editorRef = React.useRef<HTMLDivElement>(null);
  const { isEditing, edit, commit, cancel, committedValue, value, onChange } = useEditable<T>(options);
  const fullWidthClass = fullWidth ? styles['tedi-editable--full-width'] : undefined;

  React.useEffect(() => {
    if (!isEditing) return;
    editorRef.current?.querySelector<HTMLElement>('input, textarea, select, [contenteditable], [tabindex]')?.focus();
  }, [isEditing]);

  if (isEditing) {
    return (
      <div
        ref={editorRef}
        className={cn(styles['tedi-editable'], styles['tedi-editable--editing'], fullWidthClass, className)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.stopPropagation();
            cancel();
          }
        }}
        onBlur={() => {
          // Defer so focus can settle: composite controls (Select, Toggle) move
          // focus around internally while editing, which would otherwise blur
          // the container and commit mid-interaction.
          window.setTimeout(() => {
            if (!editorRef.current) return;
            const active = document.activeElement;
            // Focus is still inside the editor → keep editing.
            if (editorRef.current.contains(active)) return;
            // Focus landed in a floating-ui popover the editor opened (calendar,
            // select menu, time picker). Committing here would unmount the
            // control mid-interaction — before the user's pick fires its own
            // `onSelect`/`onChange` — and lose the change. Keep editing; those
            // controls call `commit()` themselves once a value is chosen.
            if (active?.closest('[data-floating-ui-portal]')) return;
            commit();
          }, 0);
        }}
      >
        {children({ value, onChange, commit, cancel })}
      </div>
    );
  }

  const display = renderValue ? renderValue(committedValue) : (committedValue as React.ReactNode);
  const empty = renderValue ? isEmpty(display) : isEmpty(committedValue);

  if (disabled) {
    return (
      <span className={cn(styles['tedi-editable'], styles['tedi-editable--disabled'], fullWidthClass, className)}>
        <span className={empty ? styles['tedi-editable__placeholder'] : undefined}>
          {empty ? placeholder : display}
        </span>
      </span>
    );
  }

  return (
    <button
      type="button"
      id={fieldId}
      onClick={edit}
      className={cn(styles['tedi-editable'], styles['tedi-editable__trigger'], fullWidthClass, className)}
    >
      <span className={styles['tedi-editable__prefix']}>
        {getLabel('editable.edit')} {label}:{' '}
      </span>
      <span className={empty ? styles['tedi-editable__placeholder'] : styles['tedi-editable__value']}>
        {empty ? placeholder : display}
      </span>
      {!hideEditIcon && (
        <Icon name="edit" size={18} color="brand" aria-hidden className={styles['tedi-editable__icon']} />
      )}
    </button>
  );
}

Editable.displayName = 'Editable';

export default Editable;
