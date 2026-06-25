import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { LabelProvider } from '../../../providers/label-provider';
import { Col, Row } from '../../layout/grid';
import { FileDropzone, FileDropzoneProps } from './file-dropzone';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.63.78?node-id=11335-185781&m=dev" target="_BLANK">Figma ↗</a><br />
 * <a href="https://www.tedi.ee/1ee8444b7/p/70876f-file-dropzone" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof FileDropzone> = {
  component: FileDropzone,
  title: 'TEDI-Ready/Components/Form/FileDropzone',
  args: {
    name: 'file-dropzone',
  },
  decorators: [
    (Story) => (
      <LabelProvider locale="et">
        <Story />
      </LabelProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FileDropzone>;

const formatBytes = (bytes?: number): string | undefined => {
  if (typeof bytes !== 'number') return undefined;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${(bytes / 1024 ** 3).toFixed(1)} GB`;
};

export const Default: Story = {};

const Template: StoryFn<FileDropzoneProps> = (args) => (
  <Row>
    <Col md={6}>
      <FileDropzone {...args} />
    </Col>
  </Row>
);

export const WithHint: Story = {
  render: Template,
  args: {
    name: 'file',
    helper: {
      text: 'JPG, PNG, PDF suurusega kuni 1 MB.',
    },
  },
};

export const Disabled: Story = {
  render: Template,
  args: {
    id: 'file-dropzone-disabled',
    name: 'file-loading',
    label: 'Lohista failid siia',
    disabled: true,
  },
};

export const Multiple: Story = {
  render: Template,
  args: {
    id: 'file-dropzone-multiple',
    name: 'file-multiple',
    multiple: true,
    defaultFiles: [{ name: 'report.pdf' }, { name: 'report_1.pdf' }, { name: 'report_2.pdf' }],
    helper: {
      text: 'JPG, PNG, PDF suurusega kuni 1 MB.',
    },
  },
};

export const ValidationFailed: Story = {
  args: {
    id: 'file-dropzone-validation-failed',
    name: 'file-validation-failed',
    maxSize: 1,
    accept: '.pdf,.txt',
    multiple: true,
    validateIndividually: true,
    defaultFiles: [{ name: 'invalid_file.pdf', isValid: false }],
  },
  render: (args) => (
    <Row>
      <Col md={6}>
        <FileDropzone
          {...args}
          helper={{
            type: 'error',
            text: 'Sobimatu fail. Lubatud on ainult .pdf ja .txt failid suurusega kuni 1 MB.',
          }}
        />
      </Col>
    </Row>
  ),
};

export const MultipleWithIndividualValidation: Story = {
  args: {
    id: 'file-dropzone-multiple-individual-validation',
    name: 'file-multiple-individual-validation',
    multiple: true,
    maxSize: 0.01,
    accept: '.pdf,.txt',
    validateIndividually: true,
    defaultFiles: [
      { name: 'taotlus_scan_lk_1.pdf' },
      { name: 'taotlus_scan_lk_2.pdf' },
      { name: 'taotlus_scan_lk_3.pdf' },
      { name: 'taotlus_scan_lk_4.pdf' },
      { name: 'taotlus_scan_lk_5.pdf', isValid: false },
    ],
    helper: {
      text: 'Lubatud on ainult .pdf ja .txt failid suurusega kuni 1 KB.',
      type: 'error',
    },
  },
  render: (args) => (
    <Row>
      <Col md={6}>
        <FileDropzone
          {...args}
          onChange={(files) => {
            console.log('Uploaded files:', files);
          }}
        />
      </Col>
    </Row>
  ),
};

export const HasTooltip: Story = {
  render: Template,
  args: {
    id: 'file-dropzone-tooltip',
    name: 'file-tooltip',
    label: 'Lohista failid siia',
    tooltip: 'Lorem ipsum',
  },
};

/**
 * Combines per-file validation with `attachmentProps`. The function form
 * derives `fileSize` and per-file `feedback` from each `FileUploadFile`, so the
 * rejected file surfaces its own inline error message under the attachment row.
 */
export const MultipleWithIndividualValidationAndAttachmentProps: Story = {
  args: {
    id: 'file-dropzone-multiple-individual-validation-attachment-props',
    name: 'file-multiple-individual-validation-attachment-props',
    multiple: true,
    maxSize: 0.01,
    accept: '.pdf,.txt',
    validateIndividually: true,
    defaultFiles: [
      { id: '1', name: 'taotlus_scan_lk_1.pdf', size: 18_600, isValid: false },
      { id: '2', name: 'taotlus_scan_lk_2.pdf', size: 7_100 },
      { id: '3', name: 'taotlus_scan_lk_3.pdf', size: 31_200, isValid: false },
      { id: '4', name: 'taotlus_scan_lk_4.pdf', size: 9_200 },
      { id: '5', name: 'taotlus_scan_lk_5.pdf', size: 24_500, isValid: false },
    ],
    helper: {
      text: 'Lubatud on ainult .pdf ja .txt failid suurusega kuni 1 KB.',
      type: 'error',
    },
  },
  render: (args) => (
    <Row>
      <Col md={6}>
        <FileDropzone
          {...args}
          onChange={(files) => {
            console.log('Uploaded files:', files);
          }}
          attachmentProps={(file) => ({
            icon: 'picture_as_pdf',
            fileSize: formatBytes(file.size),
            feedback:
              file.isValid === false ? { text: 'Fail on liiga suur — lubatud kuni 1 KB', type: 'error' } : undefined,
          })}
        />
      </Col>
    </Row>
  ),
};

/**
 * The `attachmentProps` slot forwards extra props (e.g. `icon`, `fileSize`,
 * `progress`, `feedback`) onto each rendered `Attachment`. Pass a function to
 * vary the props per file — here the size and progress are sourced from each
 * file's own state, with the in-flight upload showing a `ProgressBar`.
 */
export const WithAttachmentProps: Story = {
  args: {
    id: 'file-dropzone-attachment-props',
    name: 'file-attachment-props',
    multiple: true,
    defaultFiles: [
      { id: '1', name: 'arve_2026_06.pdf', size: 1_200_000 },
      { id: '2', name: 'aastaaruanne_2025.pdf', size: 5_400_000 },
      { id: '3', name: 'esitlus.mp4', size: 140_000_000, isLoading: true },
    ],
    helper: {
      text: 'PDF, DOCX, XLSX — maks. 200 MB',
    },
  },
  render: (args) => {
    const progressByFile: Record<string, number> = { '3': 64 };
    return (
      <Row>
        <Col md={6}>
          <FileDropzone
            {...args}
            attachmentProps={(file) => ({
              icon: 'description',
              fileSize: formatBytes(file.size),
              progress: file.id ? progressByFile[file.id] : undefined,
            })}
          />
        </Col>
      </Row>
    );
  },
};
