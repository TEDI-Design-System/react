import cn from 'classnames';
import React from 'react';

import { FeedbackText, FeedbackTextProps } from '../../../../tedi/components/form/feedback-text/feedback-text';
import { FormLabel, FormLabelProps } from '../../../../tedi/components/form/form-label/form-label';
import { Col, Row } from '../../../../tedi/components/layout/grid';
import { Tag } from '../../../../tedi/components/tags/tag/tag';
import { ILabelContext, useLabels } from '../../../../tedi/providers/label-provider';
import Button from '../../button/button';
import { Card, CardContent } from '../../card';
import styles from './file-upload.module.scss';

export interface FileUploadFile extends Partial<File> {
  id?: string;
  /**
   * Is the file currently loading. Used when files are uploaded immediately
   */
  isLoading?: boolean;
}

export type FileRejectionType = 'size' | 'extension';

export interface RejectedFile {
  type: FileRejectionType;
  file: File;
}

export interface FileUploadProps extends FormLabelProps {
  /**
   * Additional classes.
   */
  className?: string;
  /**
   * Field name
   */
  name: string;
  /**
   * FileUpload helper
   */
  helper?: FeedbackTextProps;
  /**
   * The accept attribute value is a string that defines the file types the file input should accept
   * For example '.pdf,.jpg'
   */
  accept?: string;
  /**
   * When the multiple Boolean attribute is true, the file input allows the user to select more than one file.
   */
  multiple?: boolean;
  /**
   * onChange handler
   */
  onChange?: (files: FileUploadFile[]) => void;
  /**
   * defaultValue
   */
  defaultFiles?: FileUploadFile[];
  /**
   * onDelete handler
   */
  onDelete?: (file: FileUploadFile) => void;
  /**
   * Value of input to control input value from outside of component.
   * Do not use with defaultValue
   */
  files?: FileUploadFile[];
  /**
   * Is the fileUpload read-only
   */
  readOnly?: boolean;
  /**
   * If fileUpload is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Size limit in megabytes
   */
  maxSize?: number;
}

const getDefaultHelpers = (
  { accept, maxSize }: Partial<FileUploadProps>,
  getLabel: ILabelContext['getLabel']
): FeedbackTextProps | undefined => {
  if (!accept && !maxSize) return;
  const text = [
    accept && `${getLabel('file-upload.accept')} ${accept.replaceAll(',', ', ')}`,
    maxSize && `${getLabel('file-upload.max-size')} ${maxSize}MB`,
  ]
    .filter(Boolean)
    .join('. ');
  return text.length ? { text } : undefined;
};

const getUploadErrorHelperText = (rejectedFiles: RejectedFile[], getLabel: ILabelContext['getLabel']): string => {
  const textMap = rejectedFiles.reduce(
    (acc, { type, file }) => {
      acc[type].push(file.name);
      return acc;
    },
    { extension: [] as string[], size: [] as string[] }
  );

  // Get labels based on rejection type
  return Object.entries(textMap)
    .filter(([_, names]) => names.length)
    .map(([type, names]) => {
      const joinedNames = names.map((name) => `'${name}'`).join(', ');
      const label = getLabel(`file-upload.${type as FileRejectionType}-rejected`, joinedNames);
      return label;
    })
    .join('. ');
};

export const FileUpload = (props: FileUploadProps): JSX.Element => {
  const { getLabel } = useLabels();
  const {
    id,
    name,
    accept,
    multiple,
    onChange,
    className,
    defaultFiles,
    onDelete,
    files,
    readOnly,
    disabled = false,
    maxSize,
    helper = getDefaultHelpers({ accept, maxSize }, getLabel),
    ...rest
  } = props;
  const helperId = helper ? helper?.id ?? `${id}-helper` : undefined;

  const [hovered, setHovered] = React.useState(false);
  const [innerFiles, setInnerFiles] = React.useState<FileUploadFile[]>(defaultFiles || []);
  const [uploadErrorHelper, setUploadErrorHelper] = React.useState<FeedbackTextProps | undefined>();

  const fileUploadBEM = cn(styles['file-upload'], { [styles['file-upload-disabled']]: disabled });

  const validFileType = (file: File) => {
    if (!accept) {
      return true;
    }

    const fileTypes = accept?.replace(/,/g, '').split('.') || [];
    // Todo: Handle error handling

    const fileType = file.name.split('.').pop()?.toLowerCase();
    return !!fileType && fileTypes.includes(fileType);
  };

  const getFiles = React.useMemo(() => {
    return !!files && !!onChange ? files : innerFiles;
  }, [files, innerFiles, onChange]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const rejectedFiles: RejectedFile[] = [];
      const uploadedFiles = [...Array.from(e.target.files)]
        .filter((file) => {
          if (validFileType(file)) return true;

          rejectedFiles.push({ type: 'extension', file });
          return false;
        })
        .filter((file) => {
          if (!maxSize || file.size <= maxSize * 1024 ** 2) return true;

          rejectedFiles.push({ type: 'size', file });
          return false;
        });
      const newFiles = [...getFiles, ...uploadedFiles];

      if (typeof files === 'undefined') {
        setInnerFiles(newFiles);
      }

      onChange?.(newFiles);

      // reset input to allow re-uploading of the same file after deletion
      (e.target as HTMLInputElement).value = '';

      if (rejectedFiles.length) {
        setUploadErrorHelper({ type: 'error', text: getUploadErrorHelperText(rejectedFiles, getLabel) });
      } else {
        setUploadErrorHelper(undefined);
      }
    }
  };

  const onFileRemove = (file: FileUploadFile): void => {
    const newFiles = [...getFiles].filter((f) => f !== file);

    if (onDelete) {
      onDelete(file);
    }

    if (typeof files === 'undefined') {
      setInnerFiles(newFiles);
    }

    onChange?.(newFiles);
  };

  const getFileElement = (file: FileUploadFile, index: number) => {
    return (
      <li key={index}>
        <Tag
          color="secondary"
          onClose={!file.isLoading && !disabled && !readOnly ? () => onFileRemove(file) : undefined}
          isLoading={file.isLoading}
        >
          {file.name}
        </Tag>
      </li>
    );
  };

  const showFiles = () => {
    return (
      <ul className={styles['file-upload__items']}>{getFiles.map((file, index) => getFileElement(file, index))}</ul>
    );
  };

  return (
    <div>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={styles['file-upload__label-wrapper']}
      >
        <FormLabel id={id} {...rest} renderWithoutLabel={readOnly} className={styles['file-upload__label']} />
      </div>
      {readOnly ? (
        showFiles()
      ) : (
        <Card padding={0.5} background={disabled ? 'bg-disabled' : undefined} className={styles['file-upload__card']}>
          <CardContent>
            <Row gutterY={2}>
              <Col>{showFiles()}</Col>
              <Col xs={12} md="auto" align="center">
                <div className={fileUploadBEM}>
                  <input
                    id={id}
                    type="file"
                    name={name}
                    accept={accept}
                    onChange={onFileChange}
                    multiple={multiple}
                    disabled={disabled}
                  />
                  <Button
                    visualType="link"
                    iconLeft="file_upload"
                    aria-describedby={helperId}
                    isActive={hovered}
                    disabled={disabled}
                    onClick={() => document.getElementById(id)?.click()}
                  >
                    {getLabel('file-upload.add')}
                  </Button>
                </div>
              </Col>
            </Row>
          </CardContent>
        </Card>
      )}
      {(uploadErrorHelper || helper) && (
        <FeedbackText {...((uploadErrorHelper || helper) as FeedbackTextProps)} id={helperId} />
      )}
    </div>
  );
};

export default FileUpload;
