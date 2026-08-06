import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { useDropzone } from 'react-dropzone';

import { useFileUpload } from '../../../helpers/hooks/use-file-upload';
import { useLabels } from '../../../providers/label-provider';
import FileDropzone from './file-dropzone';

jest.mock('../../../helpers/hooks/use-file-upload');
jest.mock('../../../providers/label-provider');

jest.mock('react-dropzone', () => ({
  useDropzone: jest.fn(),
}));

describe('FileDropzone', () => {
  const mockUseFileUpload = useFileUpload as jest.Mock;
  const mockUseLabels = useLabels as jest.Mock;
  const mockUseDropzone = useDropzone as jest.Mock;

  beforeEach(() => {
    mockUseFileUpload.mockReturnValue({
      innerFiles: [],
      uploadErrorHelper: undefined,
      onFileChange: jest.fn(),
      onFileRemove: jest.fn(),
      handleClear: jest.fn(),
      fileInputRef: { current: null },
    });

    mockUseLabels.mockReturnValue({
      getLabel: (key: string) => key,
    });

    mockUseDropzone.mockImplementation((props) => {
      return {
        getRootProps: jest.fn((rootProps) => ({
          className: 'tedi-file-dropzone',
          ...rootProps,
        })),
        getInputProps: jest.fn(() => ({
          type: 'file',
        })),
        isDragActive: false,
        ...props,
      };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the dropzone with the correct label', () => {
    render(<FileDropzone id="1" name="file" label="Upload File" />);
    expect(screen.getByText('Upload File')).toBeInTheDocument();
  });

  it('renders the dropzone with a helper text', () => {
    render(<FileDropzone id="2" name="file" label="Upload File" helper={{ text: 'Helper text' }} />);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('renders the dropzone with an error message', () => {
    mockUseFileUpload.mockReturnValue({
      innerFiles: [],
      uploadErrorHelper: { type: 'error', text: 'Error message' },
      onFileChange: jest.fn(),
      onFileRemove: jest.fn(),
      handleClear: jest.fn(),
      fileInputRef: { current: null },
    });

    render(<FileDropzone id="3" name="file" label="Upload File" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('gives each instance a unique helper association when no id is provided', () => {
    mockUseFileUpload.mockReturnValue({
      innerFiles: [],
      uploadErrorHelper: undefined,
      onFileChange: jest.fn(),
      onFileRemove: jest.fn(),
      handleClear: jest.fn(),
      fileInputRef: { current: null },
    });

    const { container } = render(
      <>
        <FileDropzone name="a" label="First" helper={{ text: 'Hint A' }} />
        <FileDropzone name="b" label="Second" helper={{ text: 'Hint B' }} />
      </>
    );

    const [first, second] = Array.from(container.querySelectorAll<HTMLElement>('[role="button"]'));
    const firstDescribedBy = first.getAttribute('aria-describedby');
    const secondDescribedBy = second.getAttribute('aria-describedby');

    expect(firstDescribedBy).toBeTruthy();
    expect(secondDescribedBy).toBeTruthy();
    expect(firstDescribedBy).not.toContain('undefined');
    expect(firstDescribedBy).not.toBe(secondDescribedBy);
  });

  it('applies invalid styling that matches the shown feedback, even with the hook default hint present', () => {
    mockUseFileUpload.mockReturnValue({
      innerFiles: [],
      uploadErrorHelper: { type: 'hint', text: 'Max 1 MB' },
      onFileChange: jest.fn(),
      onFileRemove: jest.fn(),
      handleClear: jest.fn(),
      fileInputRef: { current: null },
    });

    render(<FileDropzone id="9" name="file" label="Upload File" helper={{ type: 'error', text: 'Required' }} />);

    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('tedi-file-dropzone--invalid');
  });

  it('configures useDropzone with correct props and handles file drop', () => {
    const onFileChange = jest.fn();
    mockUseFileUpload.mockReturnValue({
      innerFiles: [],
      uploadErrorHelper: undefined,
      onFileChange,
      onFileRemove: jest.fn(),
      handleClear: jest.fn(),
      fileInputRef: { current: null },
    });

    render(<FileDropzone id="5" name="file" label="Upload File" accept="image/png" multiple maxSize={5} />);

    const useDropzoneMock = useDropzone as jest.Mock;
    const dropzoneProps = useDropzoneMock.mock.calls[0][0];

    expect(dropzoneProps.accept).toEqual({ 'image/png': [] });
    expect(dropzoneProps.multiple).toBe(true);
    expect(dropzoneProps.maxSize).toBe(5 * 1024 ** 2);

    const file = new File(['file content'], 'file.png', { type: 'image/png' });
    const rejectedFile = new File(['too big'], 'big.pdf', { type: 'application/pdf' });

    dropzoneProps.onDrop([file], [{ file: rejectedFile, errors: [{ code: 'file-too-large', message: 'too large' }] }]);

    expect(onFileChange).toHaveBeenCalledWith({
      target: { files: [file, rejectedFile] },
    } as unknown as React.ChangeEvent<HTMLInputElement>);
  });

  it('does not re-accept files react-dropzone rejected for reasons the hook cannot classify', () => {
    const onFileChange = jest.fn();
    mockUseFileUpload.mockReturnValue({
      innerFiles: [],
      uploadErrorHelper: undefined,
      onFileChange,
      onFileRemove: jest.fn(),
      handleClear: jest.fn(),
      fileInputRef: { current: null },
    });

    render(<FileDropzone id="8" name="file" label="Upload File" />);
    const dropzoneProps = (useDropzone as jest.Mock).mock.calls[0][0];

    const a = new File(['a'], 'a.png', { type: 'image/png' });
    const b = new File(['b'], 'b.png', { type: 'image/png' });
    dropzoneProps.onDrop(
      [],
      [
        { file: a, errors: [{ code: 'too-many-files', message: 'too many' }] },
        { file: b, errors: [{ code: 'too-many-files', message: 'too many' }] },
      ]
    );

    expect(onFileChange).not.toHaveBeenCalled();
  });

  it('exposes the dropzone as a button whose description is wired to the helper', () => {
    render(<FileDropzone id="role-test" name="file" label="Upload File" helper={{ text: 'PDF only' }} />);
    const dropzone = screen.getByRole('button');
    expect(dropzone).toHaveAttribute('aria-describedby', 'role-test-helper');
    expect(screen.getByText('PDF only')).toHaveAttribute('id', 'role-test-helper');
  });

  it('exposes an invalid file status to screen readers', () => {
    mockUseFileUpload.mockReturnValue({
      innerFiles: [{ id: '1', name: 'big.pdf', isValid: false }],
      uploadErrorHelper: undefined,
      onFileChange: jest.fn(),
      onFileRemove: jest.fn(),
      handleClear: jest.fn(),
      fileInputRef: { current: null },
    });

    render(<FileDropzone id="invalid" name="file" label="Upload File" />);
    expect(screen.getByText('file-dropzone.failed big.pdf')).toBeInTheDocument();
  });

  it('drives the status live region from the hook announcement', () => {
    mockUseFileUpload.mockReturnValue({
      innerFiles: [],
      uploadErrorHelper: undefined,
      onFileChange: jest.fn(),
      onFileRemove: jest.fn(),
      handleClear: jest.fn(),
      fileInputRef: { current: null },
      announcement: 'file-upload.success-added',
    });

    render(<FileDropzone id="ann" name="file" label="Upload File" />);
    expect(screen.getByRole('status')).toHaveTextContent('file-upload.success-added');
  });

  it('renders uploaded files', () => {
    const file = { id: '1', name: 'file.png', isValid: true };
    mockUseFileUpload.mockReturnValue({
      innerFiles: [file],
      uploadErrorHelper: undefined,
      onFileChange: jest.fn(),
      onFileRemove: jest.fn(),
      handleClear: jest.fn(),
      fileInputRef: { current: null },
    });

    render(<FileDropzone id="6" name="file" label="Upload File" />);
    expect(screen.getByText('file.png')).toBeInTheDocument();
  });

  it('calls onFileRemove when a file is removed', () => {
    const onFileRemove = jest.fn();
    const file = { id: '1', name: 'file.png', isValid: true };
    mockUseFileUpload.mockReturnValue({
      innerFiles: [file],
      uploadErrorHelper: undefined,
      onFileChange: jest.fn(),
      onFileRemove,
      handleClear: jest.fn(),
      fileInputRef: { current: null },
    });

    render(<FileDropzone id="test-file-dropzone" name="file" label="Upload File" />);
    const removeButton = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(removeButton);

    expect(onFileRemove).toHaveBeenCalledWith(file);
  });

  it('disables the dropzone when disabled prop is true', () => {
    render(<FileDropzone id="7" name="file" label="Upload File" disabled />);
    const dropzone = screen.getByText('Upload File').closest('.tedi-file-dropzone');
    expect(dropzone).toHaveClass('tedi-file-dropzone--disabled');
  });

  it('does not leak upload props onto the <label>, and puts name on the input', () => {
    const { container } = render(
      <FileDropzone
        id="upload"
        name="docs"
        label="Label"
        accept=".pdf,.txt"
        maxSize={100}
        multiple
        validateIndividually
        files={[]}
        defaultFiles={[]}
        onChange={() => undefined}
        onDelete={() => undefined}
        announcementTimeout={5000}
      />
    );

    const label = container.querySelector('label');
    ['accept', 'maxsize', 'files', 'name', 'defaultfiles', 'announcementtimeout', 'validateindividually'].forEach(
      (attr) => expect(label).not.toHaveAttribute(attr)
    );
    expect(container.querySelector('input[type="file"]')).toHaveAttribute('name', 'docs');
  });
});
