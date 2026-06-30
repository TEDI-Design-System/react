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
import FormLabel, { FormLabelProps } from '../form-label/form-label';
import styles from './file-dropzone.module.scss';

export type FileDropzoneAttachmentProps =
  | Partial<Omit<AttachmentProps, 'name'>>
  | ((file: FileUploadFile) => Partial<Omit<AttachmentProps, 'name'>>);

export interface FileDropzoneProps extends Omit<FormLabelProps, 'size' | 'hideLabel' | 'label'>, UseFileUploadProps {
  /**
   * Additional CSS class names to apply to the dropzone for custom styling
   */
  className?: string;
  /**
   * The name attribute for the file input, used for form submission and identifying the field.
   */
  name: string;
  /**
   * The text label displayed for the file dropzone, providing context for users.
   * Defaults to the `LabelProvider`'s localised `file-dropzone.label` (e.g. "Lohista
   * failid siia või klõpsa, et sirvida" in Estonian).
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

export const FileDropzone = (props: FileDropzoneProps): JSX.Element => {
  const { getLabel } = useLabels();
  const {
    label = getLabel('file-dropzone.label'),
    className,
    disabled = false,
    helper,
    id,
    attachmentProps,
    ...rest
  } = props;
  const { innerFiles, uploadErrorHelper, onFileChange, onFileRemove } = useFileUpload(props);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    disabled,
    accept: props.accept ? { 'application/*': [props.accept] } : undefined,
    multiple: props.multiple,
    maxSize: props.maxSize ? props.maxSize * 1024 ** 2 : undefined,
    onDrop: (acceptedFiles) => {
      if (disabled) return;
      const event = {
        target: { files: acceptedFiles },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onFileChange(event);
    },
  });

  const fileDropzoneBEM = cn(
    styles['tedi-file-dropzone'],
    { [styles['tedi-file-dropzone--disabled']]: disabled },
    { [styles['tedi-file-dropzone--invalid']]: (uploadErrorHelper?.type || helper?.type) === 'error' },
    { [styles['tedi-file-dropzone--valid']]: (uploadErrorHelper?.type || helper?.type) === 'valid' },
    { [styles['tedi-file-dropzone--drop-over']]: isDragActive },
    className
  );
  const helperId = helper ? helper?.id ?? `${id}-helper` : undefined;

  return (
    <>
      <div
        {...getRootProps({
          tabIndex: disabled ? -1 : 0,
          'aria-disabled': disabled,
          'aria-describedby': helperId,
        })}
        className={fileDropzoneBEM}
      >
        <input {...getInputProps()} disabled={disabled} />
        <div className={styles['tedi-file-dropzone__label-wrapper']}>
          <FormLabel
            {...rest}
            id={id}
            label={
              <>
                <Icon
                  color={disabled ? 'tertiary' : 'secondary'}
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
      {helper ? (
        <FeedbackText {...helper} id={helperId} />
      ) : uploadErrorHelper ? (
        <FeedbackText {...uploadErrorHelper} id={helperId} />
      ) : null}
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
              </List.Item>
            );
          })}
        </List>
      )}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {innerFiles.length === 0
          ? getLabel('file-dropzone.no-file')
          : getLabel('file-dropzone.files-selected', innerFiles.length)}
      </div>
    </>
  );
};

export default FileDropzone;
