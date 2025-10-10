import React from 'react';

import { FeedbackTextProps } from '../../components/form/feedback-text/feedback-text';
import { ILabelContext, useLabels } from '../../providers/label-provider';

export interface FileUploadFile extends Partial<File> {
  /*
   * A unique identifier for the file, useful for tracking files in a list.
   */
  id?: string;
  /*
   * Indicates if the file is currently being uploaded.
   */
  isLoading?: boolean;
  /*
   * Specifies whether the file passed validation checks (e.g., size, extension).
   */
  isValid?: boolean;
}

export type FileRejectionType = 'size' | 'extension';

export interface RejectedFile {
  /*
   * The reason the file was rejected (either 'size' or 'extension').
   */
  type: FileRejectionType;
  /*
   * The original file object that was rejected.
   */
  file: File;
}

export interface UseFileUploadProps {
  /*
   * Specifies the allowed file types (e.g., "image/png, image/jpeg").
   */
  accept?: string;
  /*
   * The maximum file size allowed for upload, in bytes.
   */
  maxSize?: number;
  /*
   * Determines if multiple files can be uploaded at once.
   * @default false
   */
  multiple?: boolean;
  /*
   * If true, each file is validated separately instead of rejecting all at once.
   */
  validateIndividually?: boolean;
  /*
   * An array of default files that are preloaded in the upload list.
   */
  defaultFiles?: FileUploadFile[];
  /*
   * Callback function triggered when files are added or changed.
   */
  onChange?: (files: FileUploadFile[]) => void;
  /*
   * Callback function triggered when a file is removed.
   */
  onDelete?: (file: FileUploadFile) => void;
  /*
   * An optional array of files to be used in controlled mode.
   When provided, the hook uses this array as the source of truth for the file list instead of its internal state. 
   The parent component is responsible for updating this prop in response to the `onChange` callback. 
   If not provided, the hook operates in uncontrolled mode, managing its own internal file state via `defaultFiles` and user interactions.
   */
  files?: FileUploadFile[];
}

const getDefaultHelpers = (
  { accept, maxSize }: Partial<UseFileUploadProps>,
  getLabel: ILabelContext['getLabel']
): FeedbackTextProps | undefined => {
  if (!accept && !maxSize) return undefined;

  const text = [
    accept && `${getLabel('file-upload.accept')} ${accept.replaceAll(',', ', ')}`,
    maxSize && `${getLabel('file-upload.max-size')} ${maxSize}MB`,
  ]
    .filter(Boolean)
    .join('. ');

  return text.length ? { text } : undefined;
};

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const useFileUpload = (props: UseFileUploadProps) => {
  const { getLabel } = useLabels();
  const {
    accept,
    maxSize,
    multiple = false,
    validateIndividually = false,
    defaultFiles = [],
    onChange,
    onDelete,
    files,
  } = props;

  const isControlled = files !== undefined;
  const [innerFiles, setInnerFiles] = React.useState<FileUploadFile[]>(defaultFiles);
  const actualFiles = isControlled ? files : innerFiles;

  const [uploadErrorHelper, setUploadErrorHelper] = React.useState<FeedbackTextProps | undefined>(
    getDefaultHelpers({ accept, maxSize }, getLabel)
  );

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const validFileType = (file: File) => {
    if (!accept) return true;

    const fileTypes = accept.split(',').map((type) => type.trim().toLowerCase());
    const fileExtension = file.name.includes('.') ? `.${file.name.split('.').pop()?.toLowerCase()}` : '';
    const fileMimeType = file.type.toLowerCase();

    return fileTypes.includes(fileExtension) || fileTypes.includes(fileMimeType);
  };

  const getUploadErrorHelperText = (rejectedFiles: RejectedFile[]): string => {
    const textMap = rejectedFiles.reduce(
      (acc, { type, file }) => {
        acc[type].push(file.name);
        return acc;
      },
      { extension: [] as string[], size: [] as string[] }
    );

    return Object.entries(textMap)
      .filter(([_, names]) => names.length)
      .map(([type, names]) => {
        const joinedNames = names.map((name) => `'${name}'`).join(', ');
        return getLabel(`file-upload.${type as FileRejectionType}-rejected`, joinedNames);
      })
      .join('. ');
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const rejectedFiles: RejectedFile[] = [];
      const uploadedFiles = filesArray.map((file) => {
        const isValidExtension = validFileType(file);
        const isValidSize = !maxSize || file.size <= maxSize * 1024 ** 2;

        if (!isValidExtension) rejectedFiles.push({ type: 'extension', file });
        if (!isValidSize) rejectedFiles.push({ type: 'size', file });

        const enhancedFile = new File([file], file.name, {
          type: file.type,
          lastModified: file.lastModified,
        });

        return Object.assign(enhancedFile, {
          id: generateId(),
          isLoading: false,
          isValid: isValidExtension && isValidSize,
        });
      });

      let newFiles: FileUploadFile[] = [];

      if (!multiple && uploadedFiles.length > 0) {
        if (uploadedFiles[0].isValid) {
          newFiles = [uploadedFiles[0]];
        }
      } else if (validateIndividually) {
        newFiles = [...actualFiles, ...uploadedFiles];
      } else {
        const validFiles = uploadedFiles.filter((file) => file.isValid);
        if (validFiles.length > 0) {
          newFiles = [...actualFiles, ...validFiles];
        }
      }

      if (newFiles.length > 0) {
        if (!isControlled) {
          setInnerFiles(newFiles);
        }
        onChange?.(newFiles);
      }

      if (rejectedFiles.length) {
        setUploadErrorHelper({ type: 'error', text: getUploadErrorHelperText(rejectedFiles) });
      } else {
        setUploadErrorHelper(getDefaultHelpers({ accept, maxSize }, getLabel));
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const onFileRemove = (file: FileUploadFile): void => {
    const newFiles = actualFiles.filter((f) => f !== file);

    if (!isControlled) {
      setInnerFiles(newFiles);
    }
    onDelete?.(file);
    onChange?.(newFiles);

    if (newFiles.length === 0) {
      setUploadErrorHelper(getDefaultHelpers({ accept, maxSize }, getLabel));
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClear = (): FileUploadFile[] => {
    const deletedFiles = [...actualFiles];
    deletedFiles.forEach((file) => onDelete?.(file));

    if (!isControlled) {
      setInnerFiles([]);
    }
    onChange?.([]);
    setUploadErrorHelper(getDefaultHelpers({ accept, maxSize }, getLabel));

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    return deletedFiles;
  };

  return {
    innerFiles: actualFiles,
    uploadErrorHelper,
    onFileChange,
    onFileRemove,
    handleClear,
    fileInputRef,
  };
};
