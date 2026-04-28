import cn from 'classnames';
import React from 'react';

import { isBreakpointBelow, useBreakpoint } from '../../../helpers';
import { FileUploadFile, useFileUpload } from '../../../helpers/hooks/use-file-upload';
import { useLabels } from '../../../providers/label-provider';
import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import { ClosingButton } from '../../buttons/closing-button/closing-button';
import { FormLabel, FormLabelProps } from '../../form/form-label/form-label';
import { Col, Row } from '../../layout/grid';
import Separator from '../../misc/separator/separator';
import { Tag } from '../../tags/tag/tag';
import { FeedbackText, FeedbackTextProps } from '../feedback-text/feedback-text';
import { useOptionalInputGroup } from '../input-group/input-group';
import styles from './file-upload.module.scss';

export interface FileUploadProps extends Omit<FormLabelProps, 'id' | 'label'> {
  id?: string;
  label?: string;
  /**
   * Additional class names appended to the inner dropzone element
   * (`tedi-file-upload`) — the content area that holds the file list and the
   * upload button. Use this to tweak the dropzone itself (border, padding,
   * background) without affecting the surrounding container.
   */
  className?: string;
  /**
   * Additional class names appended to the outer container element
   * (`tedi-file-upload__container`) that wraps the dropzone, file list, and
   * helper/error states. Use this to tweak the component's outer shell
   * (radius, outline, max-width) or to override size/state modifiers.
   */
  wrapperClassName?: string;
  /**
   * The name of the file input field, used for form submission and accessibility.
   */
  name: string;
  /**
   * A helper text or error message to display below the file upload field.
   */
  helper?: FeedbackTextProps;
  /**
   * Specifies the allowed file types (e.g., "image/png, image/jpeg").
   */
  accept?: string;
  /**
   * Allows multiple file selection if `true`. Defaults to `false`.
   */
  multiple?: boolean;
  /**
   * Callback function triggered when files are added or changed.
   */
  onChange?: (files: FileUploadFile[]) => void;
  /**
   * An array of preloaded files that appear in the upload field by default.
   */
  defaultFiles?: FileUploadFile[];
  /**
   * Callback function triggered when a file is removed.
   */
  onDelete?: (file: FileUploadFile) => void;
  /**
   * Determines whether a "Clear" button is shown to remove all files.
   */
  hasClearButton?: boolean;
  /**
   * A controlled list of uploaded files. If provided, `onChange` should be used to update them.
   */
  files?: FileUploadFile[];
  /**
   * If `true`, prevents file selection and removal, making the field read-only.
   */
  readOnly?: boolean;
  /**
   * Disables the file upload field, preventing interactions.
   */
  disabled?: boolean;
  /**
   * Maximum allowed file size in bytes.
   */
  maxSize?: number;
  /**
   * If `true`, validates each file separately instead of rejecting all at once.
   */
  validateIndividually?: boolean;
  /**
   * Determines the visual size of the file upload field. Defaults to `"default"`.
   */
  size?: 'small' | 'default';
}

export const FileUpload = (props: FileUploadProps): JSX.Element => {
  const { getLabel } = useLabels();
  const {
    id,
    name,
    label,
    accept,
    multiple,
    onChange,
    className,
    wrapperClassName,
    defaultFiles,
    onDelete,
    hasClearButton = true,
    files,
    readOnly,
    disabled = false,
    maxSize,
    validateIndividually = false,
    size = 'default',
    helper,
    ...rest
  } = props;

  const { innerFiles, uploadErrorHelper, onFileChange, onFileRemove, handleClear, announcement } = useFileUpload({
    accept,
    maxSize,
    multiple,
    validateIndividually,
    defaultFiles,
    onChange,
    onDelete,
    files,
  });

  const currentBreakpoint = useBreakpoint();
  const generatedId = React.useId();
  const inputGroup = useOptionalInputGroup?.();
  const shouldHideLabel = inputGroup?.hasExternalLabel;
  const resolvedId = props.id ?? inputGroup?.inputId ?? generatedId;

  const inputRef = React.useRef<HTMLInputElement>(null);

  const fileUploadBEM = cn(styles['tedi-file-upload'], { [styles['tedi-file-upload--disabled']]: disabled }, className);
  const helperId = helper?.id ?? (helper || uploadErrorHelper ? `${resolvedId}-helper` : undefined);

  const getFiles = React.useMemo(() => {
    return !!files && !!onChange ? files : innerFiles;
  }, [files, innerFiles, onChange]);

  const getFileElement = (file: FileUploadFile, index: number) => {
    const fileLabel = file.isValid === false ? `${file.name} (${getLabel('file-upload.failed')})` : file.name;

    return (
      <li key={index}>
        <Tag
          color={file.isValid === false ? 'danger' : 'primary'}
          onClose={!file.isLoading && !disabled && !readOnly ? () => onFileRemove(file) : undefined}
          isLoading={file.isLoading}
          aria-label={fileLabel}
        >
          {file.name}
        </Tag>
      </li>
    );
  };

  const showFiles = () => {
    if (getFiles.length > 1) {
      return (
        <ul className={cn(styles['tedi-file-upload__items'], styles['tedi-file-upload__truncate-list'])}>
          {getFiles.map((file, index) => getFileElement(file, index))}
        </ul>
      );
    } else if (getFiles.length === 1) {
      const singleFile = getFiles[0];
      const singleLabel =
        singleFile.isValid === false ? `${singleFile.name} (${getLabel('file-upload.failed')})` : singleFile.name;

      return (
        <Text
          aria-label={singleLabel}
          className={cn(styles['tedi-file-upload__items'], styles['tedi-file-upload__truncate'])}
        >
          {singleFile.name}
        </Text>
      );
    }
    return null;
  };

  return (
    <>
      <div className={styles['tedi-file-upload__label-wrapper']}>
        {!shouldHideLabel && label && (
          <FormLabel
            id={resolvedId}
            label={label ?? ''}
            {...rest}
            renderWithoutLabel={readOnly}
            className={styles['tedi-file-upload__label']}
            size={size}
          />
        )}
      </div>

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>

      {readOnly ? (
        showFiles()
      ) : (
        <div
          className={cn(
            styles['tedi-file-upload__container'],
            {
              [styles['tedi-file-upload--disabled']]: disabled,
              [styles['tedi-file-upload--error']]: (uploadErrorHelper?.type || helper?.type) === 'error',
              [styles['tedi-file-upload--valid']]: (uploadErrorHelper?.type || helper?.type) === 'valid',
            },
            { [styles[`tedi-file-upload__container--${size}`]]: size },
            wrapperClassName
          )}
        >
          <div className={styles['tedi-file-upload__content']}>
            <Row>
              <Col className="display-flex">{showFiles()}</Col>
              <Col xs={12} md="auto">
                <div className={fileUploadBEM}>
                  <input
                    ref={inputRef}
                    id={resolvedId}
                    type="file"
                    name={name}
                    accept={accept}
                    onChange={onFileChange}
                    multiple={multiple}
                    disabled={disabled}
                    aria-invalid={!!uploadErrorHelper && uploadErrorHelper.type === 'error'}
                    aria-describedby={helperId}
                  />
                  {hasClearButton && getFiles.length > 0 && !disabled && (
                    <>
                      {isBreakpointBelow(currentBreakpoint, 'md') ? (
                        <Button
                          visualType="neutral"
                          iconLeft="close"
                          disabled={disabled}
                          onClick={handleClear}
                          className={styles['tedi-file-upload__button']}
                        >
                          {getLabel('clear')}
                        </Button>
                      ) : (
                        <ClosingButton onClick={handleClear} iconSize={18} title={getLabel('clear')} />
                      )}
                      <Separator axis="vertical" height={1.5} spacing={0.5} color="primary" />
                    </>
                  )}
                  <Button
                    visualType="neutral"
                    iconLeft="file_upload"
                    disabled={disabled}
                    onClick={() => inputRef.current?.click()}
                    className={styles['tedi-file-upload__button']}
                    size={size}
                  >
                    {getLabel('file-upload.add')}
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      )}
      {helper ? (
        <FeedbackText {...helper} id={helperId} />
      ) : uploadErrorHelper ? (
        <FeedbackText {...uploadErrorHelper} id={helperId} />
      ) : null}
    </>
  );
};

export default FileUpload;
