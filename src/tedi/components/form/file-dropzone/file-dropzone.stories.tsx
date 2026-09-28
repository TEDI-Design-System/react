import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { Text } from '../../base/typography/text/text';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { FileDropzone, FileDropzoneProps } from './file-dropzone';
import styles from './file-dropzone.module.scss';

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
    accept: '.jpg,.png,.pdf',
    maxSize: 1,
    helper: {
      text: 'JPG, PNG, PDF suurusega kuni 1 MB.',
    },
  },
};

export const Multiple: Story = {
  render: Template,
  args: {
    id: 'file-dropzone-multiple',
    name: 'file-multiple',
    multiple: true,
    accept: '.jpg,.png,.pdf',
    maxSize: 1,
    defaultFiles: [{ name: 'report.pdf' }, { name: 'report_1.pdf' }, { name: 'report_2.pdf' }],
    helper: {
      text: 'JPG, PNG, PDF suurusega kuni 1 MB.',
    },
  },
};

/**
 * Batch validation (default): rejected files are discarded and all rejections are summarised
 * in a single error message. Only valid files are kept.
 */
export const BatchValidation: Story = {
  args: {
    id: 'file-dropzone-batch-validation',
    name: 'file-batch-validation',
    maxSize: 1,
    accept: '.pdf,.txt',
    multiple: true,
    defaultFiles: [{ id: '1', name: 'taotlus.pdf' }],
  },
  render: (args) => (
    <Row>
      <Col md={6}>
        <FileDropzone
          {...args}
          helper={{
            type: 'error',
            text: 'Failid foto.png ja video.mov on sobimatud.',
          }}
        />
      </Col>
    </Row>
  ),
};

/**
 * `validateIndividually`: each file is validated separately and kept with its own valid/invalid
 * state, so the user can see and remove the ones that failed.
 */
export const IndividualValidation: Story = {
  args: {
    id: 'file-dropzone-individual-validation',
    name: 'file-individual-validation',
    multiple: true,
    maxSize: 1,
    accept: '.pdf,.txt',
    validateIndividually: true,
    defaultFiles: [
      { id: '1', name: 'taotlus_scan_lk_1.pdf' },
      { id: '2', name: 'taotlus_scan_lk_2.pdf' },
      { id: '3', name: 'taotlus_scan_lk_3.pdf', isValid: false },
      { id: '4', name: 'taotlus_scan_lk_4.pdf' },
      { id: '5', name: 'taotlus_scan_lk_5.pdf', isValid: false },
    ],
    helper: {
      text: 'Lubatud on ainult .pdf ja .txt failid suurusega kuni 1 MB.',
    },
  },
  render: (args) => (
    <Row>
      <Col md={6}>
        <FileDropzone
          {...args}
          attachmentProps={(file) => ({
            feedback: file.isValid === false ? { type: 'error', text: 'Fail on liiga suur' } : undefined,
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
    maxSize: 200,
    defaultFiles: [
      { id: '1', name: 'arve_2026_06.pdf', size: 1_200_000 },
      { id: '2', name: 'aastaaruanne_2025.pdf', size: 5_400_000 },
      { id: '3', name: 'esitlus.mp4', size: 140_000_000, isLoading: true },
    ],
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

/**
 * All visual states in one place (mirrors the Figma states spec). Hover / active / focus are
 * forced with the pseudo-states addon; drop-over, disabled and error are driven by props/classes.
 * Toggle the Storybook theme to preview the dark-mode variants.
 */
const stateRows: Array<{ label: string; className?: string; props?: Partial<FileDropzoneProps> }> = [
  { label: 'Default' },
  { label: 'Hover', className: 'dz-hover' },
  { label: 'Active', className: 'dz-active' },
  {
    label: 'Error',
    props: { helper: { type: 'error', text: 'Fail on liiga suur. Valige mõni teine fail või vähendage suurust.' } },
  },
  { label: 'Drop over', className: styles['tedi-file-dropzone--drop-over'] },
  { label: 'Disabled', props: { disabled: true } },
  { label: 'Focus', className: 'dz-focus' },
];

export const States: Story = {
  render: () => (
    <>
      <VerticalSpacing size={1}>
        {stateRows.map(({ label, className, props }) => (
          <Row key={label}>
            <Col lg={2} xs={12} className="flex align-items-center gap-3">
              <Text modifiers="bold">{label}</Text>
            </Col>
            <Col md={6}>
              <FileDropzone
                id={`state-${label}`}
                name={`state-${label}`}
                maxSize={30}
                className={className}
                {...props}
              />
            </Col>
          </Row>
        ))}
      </VerticalSpacing>
    </>
  ),
  parameters: {
    pseudo: { hover: '.dz-hover', active: '.dz-active', focusVisible: '.dz-focus' },
  },
};
