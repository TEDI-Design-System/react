import cn from 'classnames';
import React from 'react';
import { useDropzone } from 'react-dropzone';

import { FileUploadFile, useFileUpload, UseFileUploadProps } from '../../../helpers/hooks/use-file-upload';
import { useLabels } from '../../../providers/label-provider';
import { Icon } from '../../base/icon/icon';
import { Button } from '../../buttons/button/button';
import { List } from '../../content/list';
import { Attachment, AttachmentProps } from '../../misc/attachment/attachment';
import FeedbackText, { FeedbackTextProps } from '../feedback-text/feedback-text';
import FormLabel from '../form-label/form-label';
import styles from './file-dropzone.module.scss';

export type FileDropzoneAttachmentProps =
  | Partial<Omit<AttachmentProps, 'name'>>
  | ((file: FileUploadFile) => Partial<Omit<AttachmentProps, 'name'>>);

export interface FileDropzoneProps extends UseFileUploadProps {
  /**
   * Unique identifier for the underlying file input. Auto-generated when omitted.
   */
  id?: string;
  /**
   * Additional CSS class names to apply to the dropzone for custom styling
   */
  className?: string;
  /**
   * The name attribute for the file input, used for form submission and identifying the field.
   */
  name: string;
  /**
   * Marks the field as required — adds the required indicator to the label.
   */
  required?: boolean;
  /**
   * The text label displayed for the file dropzone, providing context for users.
   * Defaults to the `LabelProvider`'s localised `file-dropzone.label` (e.g. "Lohista
   * failid siia või klõpsa failide valimiseks" in Estonian).
   */
  label?: string;
  /**
   * Provides helper text or feedback (such as an error or instruction message) to guide the user.
   */
  helper?: FeedbackTextProps;
  /**
   * Disables the file dropzone, preventing user interaction.
   */
  disabled?: boolean;
  /**
   * Overrides forwarded to each rendered `Attachment` (e.g. `icon`, `fileSize`,
   * `progress`, `feedback`). Pass a function to vary per file. `FileDropzone`
   * sets `name`, `isValid` and `isLoading` itself, and always appends a remove
   * button to the `actions` slot (after any `actions` you provide here).
   */
  attachmentProps?: FileDropzoneAttachmentProps;
}

/**
 * Maps a comma-separated `accept` string to react-dropzone's accept-object shape
 * (`{ [mime]: string[] }`) so the rendered input's `accept` attribute matches the
 * prop exactly. Extensions are grouped under a wildcard key that react-dropzone
 * drops from the attribute (it is not a valid MIME type) so only the extensions
 * surface, while explicit MIME types stay as their own keys. Avoids the old
 * hardcoded key that leaked the whole `application` wildcard family into the
 * native picker and drag validation (#783).
 */
export const toDropzoneAccept = (accept?: string): Record<string, string[]> | undefined => {
  if (!accept) return undefined;
  const mapped = accept.split(',').reduce<Record<string, string[]>>((acc, token) => {
    const value = token.trim();
    if (!value) return acc;
    if (value.startsWith('.')) {
      acc['*/*'] = acc['*/*'] ?? [];
      acc['*/*'].push(value);
    } else {
      acc[value] = acc[value] ?? [];
    }
    return acc;
  }, {});

  return Object.keys(mapped).length ? mapped : undefined;
};

export const FileDropzone = (props: FileDropzoneProps): JSX.Element => {
  const { getLabel } = useLabels();
  const {
    label = getLabel('file-dropzone.label'),
    className,
    disabled = false,
    helper,
    id,
    name,
    required,
    attachmentProps,
    accept,
    maxSize,
    multiple,
    validateIndividually,
    defaultFiles,
    files,
    onChange,
    onDelete,
    announcementTimeout,
    showRestrictions,
  } = props;
  const { innerFiles, errorHelper, restrictionsHint, onFileChange, onFileRemove, announcement } = useFileUpload({
    accept,
    maxSize,
    multiple,
    validateIndividually,
    defaultFiles,
    files,
    onChange,
    onDelete,
    announcementTimeout,
    showRestrictions,
  });

  const generatedId = React.useId();
  const resolvedId = id ?? generatedId;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    disabled,
    accept: toDropzoneAccept(accept),
    multiple,
    maxSize: maxSize ? maxSize * 1024 ** 2 : undefined,
    onDrop: (acceptedFiles, fileRejections = []) => {
      if (disabled) return;

      const revalidatableRejections = fileRejections
        .filter((rejection) =>
          rejection.errors.some((error) => error.code === 'file-too-large' || error.code === 'file-invalid-type')
        )
        .map((rejection) => rejection.file);

      const files = [...acceptedFiles, ...revalidatableRejections];
      if (files.length === 0) return;

      const event = {
        target: { files },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onFileChange(event);
    },
  });

  const errorFeedback = errorHelper ?? (helper?.type === 'error' ? helper : undefined);
  const hintFeedback = helper && helper.type !== 'error' ? helper : restrictionsHint;

  const errorId = errorFeedback ? errorFeedback.id ?? `${resolvedId}-error` : undefined;
  const hintId = hintFeedback ? hintFeedback.id ?? `${resolvedId}-helper` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

  const fileDropzoneBEM = cn(
    styles['tedi-file-dropzone'],
    { [styles['tedi-file-dropzone--disabled']]: disabled },
    { [styles['tedi-file-dropzone--invalid']]: !!errorFeedback },
    { [styles['tedi-file-dropzone--valid']]: !errorFeedback && hintFeedback?.type === 'valid' },
    { [styles['tedi-file-dropzone--drop-over']]: isDragActive },
    className
  );

  return (
    <>
      <div
        {...getRootProps({
          role: 'button',
          tabIndex: disabled ? -1 : 0,
          'aria-disabled': disabled,
          'aria-describedby': describedBy,
        })}
        className={fileDropzoneBEM}
      >
        <input
          {...getInputProps()}
          id={resolvedId}
          name={name}
          className={styles['tedi-file-dropzone__input']}
          disabled={disabled}
        />
        <div className={styles['tedi-file-dropzone__label-wrapper']}>
          <FormLabel
            id={resolvedId}
            required={required}
            label={
              <>
                <Icon
                  color={disabled ? 'inherit' : 'secondary'}
                  size={24}
                  name="attach_file"
                  display="inline"
                  className={styles['tedi-file-dropzone__label-icon']}
                />
                {label}
              </>
            }
            className={styles['tedi-file-dropzone__label']}
          />
        </div>
      </div>
      {(errorFeedback || hintFeedback) && (
        <div className={styles['tedi-file-dropzone__feedback']}>
          {errorFeedback && <FeedbackText {...errorFeedback} id={errorId} />}
          {hintFeedback && <FeedbackText {...hintFeedback} id={hintId} />}
        </div>
      )}
      {!!innerFiles.length && (
        <List
          className={styles['tedi-file-dropzone__file-list']}
          style="none"
          aria-label={getLabel('file-dropzone.selected-files')}
        >
          {innerFiles.map((file: FileUploadFile) => {
            const overrides = typeof attachmentProps === 'function' ? attachmentProps(file) : attachmentProps;
            const { actions: overrideActions, ...attachmentOverrides } = overrides ?? {};
            return (
              <List.Item
                key={file.id ?? `${file.name ?? 'file'}-${file.size ?? ''}-${file.lastModified ?? ''}`}
                className={styles['tedi-file-dropzone__file-list-item']}
              >
                <Attachment
                  {...attachmentOverrides}
                  name={file.name ?? ''}
                  isValid={file.isValid ?? overrides?.isValid}
                  isLoading={file.isLoading ?? overrides?.isLoading}
                  actions={
                    <>
                      {overrideActions}
                      <Button visualType="neutral" icon="delete" onClick={() => onFileRemove(file)}>
                        {`${getLabel('remove')} ${file.name ?? ''}`}
                      </Button>
                    </>
                  }
                />
                {file.isValid === false && (
                  <span className="sr-only">{`${getLabel('file-dropzone.failed')} ${file.name ?? ''}`}</span>
                )}
              </List.Item>
            );
          })}
        </List>
      )}

      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>
    </>
  );
};

FileDropzone.displayName = 'FileDropzone';

export default FileDropzone;
