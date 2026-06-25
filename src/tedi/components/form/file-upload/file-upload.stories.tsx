import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import { FileUploadFile } from '../../../helpers';
import { LabelProvider } from '../../../providers/label-provider';
import { Text } from '../../base/typography/text/text';
import Button from '../../buttons/button/button';
import { Col, Row } from '../../layout/grid';
import { MultipleHandledTemplate } from './examples/multiple-handled';
import FileUpload, { FileUploadProps } from './file-upload';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.63.78?node-id=4612-87581&m=dev" target="_BLANK">Figma ↗</a><br />
 * <a href="https://www.tedi.ee/1ee8444b7/p/012bbe-file-upload" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof FileUpload> = {
  component: FileUpload,
  title: 'TEDI-Ready/Components/Form/FileUpload',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4536-78765&m=dev',
    },
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
type Story = StoryObj<typeof FileUpload>;

const sizesArray: Array<'default' | 'small'> = ['default', 'small'];

const TemplateSizes: StoryFn<FileUploadProps> = (args) => {
  return (
    <div className="example-list">
      {sizesArray.map((size, key) => (
        <Row className={`${key === sizesArray.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <Col>
            <Text modifiers="bold">{size.charAt(0).toUpperCase() + size.slice(1)}</Text>
          </Col>
          <Col>
            <FileUpload {...args} size={size} id={`file-upload-${key}`} />
          </Col>
        </Row>
      ))}
    </div>
  );
};

export const Default: Story = {
  args: {
    id: 'file-upload',
    name: 'file',
    label: 'Laadi fail üles',
  },
};

export const Sizes: Story = {
  render: TemplateSizes,
  args: {
    label: 'Silt',
  },
};

export const WithHint: Story = {
  args: {
    id: 'file-upload',
    name: 'file',
    label: 'Laadi fail üles',
    helper: {
      text: 'JPG, PNG, PDF suurusega kuni 0.001 MB.',
    },
  },
};

export const Disabled: Story = {
  args: {
    id: 'file-upload-disabled',
    name: 'file-loading',
    label: 'Laadi fail üles',
    defaultFiles: [{ name: 'report.pdf' }],
    disabled: true,
  },
};

export const ValidationFailed: Story = {
  args: {
    id: 'file-upload-validation-failed',
    name: 'file-validation-failed',
    label: 'Laadi fail üles',
    maxSize: 0.001,
    accept: '.pdf,.txt',
    multiple: true,
    validateIndividually: true,
    defaultFiles: [{ name: 'taotlus_scan_lk_1.pdf', isValid: false }],
  },
  render: (args) => (
    <FileUpload
      {...args}
      helper={{
        type: 'error',
        text: 'Tagasiside tekst',
      }}
    />
  ),
};

export const ValidationSuccess: Story = {
  args: {
    id: 'file-upload-validation-failed',
    name: 'file-validation-failed',
    label: 'Laadi fail üles',
    maxSize: 0.001,
    accept: '.pdf,.txt',
    multiple: true,
    validateIndividually: true,
    defaultFiles: [{ name: 'taotlus_scan_lk_1.pdf', isValid: false }],
  },
  render: (args) => (
    <FileUpload
      {...args}
      helper={{
        type: 'valid',
        text: 'Tagasiside tekst',
      }}
    />
  ),
};

export const MultipleWithIndividualValidation: Story = {
  args: {
    id: 'file-upload-multiple-individual-validation',
    name: 'file-multiple-individual-validation',
    label: 'Laadi failid üles',
    multiple: true,
    maxSize: 0.01,
    accept: '.pdf,.txt',
    validateIndividually: true,
    hasClearButton: true,
    defaultFiles: [
      { name: 'taotlus_scan_lk_1.pdf' },
      { name: 'taotlus_scan_lk_2.pdf' },
      { name: 'taotlus_scan_lk_3.pdf' },
      { name: 'taotlus_scan_lk_4.pdf' },
      { name: 'taotlus_scan_lk_5.pdf', isValid: false },
    ],
    helper: {
      text: 'Lubatud on ainult .pdf ja .txt failid suurusega kuni 1 KB.',
    },
  },
  render: (args) => (
    <FileUpload
      {...args}
      onChange={(files) => {
        console.log('Uploaded files:', files);
      }}
      helper={{
        type: 'error',
        text: 'Sobimatu fail. Lubatud on ainult .pdf ja .txt failid suurusega kuni 1 KB.',
      }}
    />
  ),
};

export const LoadingState: Story = {
  args: {
    id: 'file-upload-loading',
    name: 'file-loading',
    label: 'Laadi fail üles',
    defaultFiles: [{ name: 'report.pdf', isLoading: true }, { name: 'report_1.pdf' }],
  },
};

export const Multiple: Story = {
  args: {
    id: 'file-upload-MULTIPLE',
    name: 'file-multiple',
    label: 'Laadi fail üles',
    multiple: true,
    defaultFiles: [{ name: 'report.pdf' }, { name: 'report_1.pdf' }, { name: 'report_2.pdf' }],
    helper: {
      text: 'JPG, PNG, PDF suurusega kuni 0.001 MB.',
    },
  },
};

export const MultipleHandled: Story = {
  render: MultipleHandledTemplate,
  args: {
    id: 'file-upload-handled',
    name: 'file-loading-handled',
    label: 'Laadi fail üles',
    multiple: true,
    onDelete: (file) => {
      console.log(`Deleted - ${file.name}`);
    },
  },
};

export const ReadOnlyFiles: Story = {
  args: {
    id: 'file-upload-read-only',
    name: 'file-loading',
    label: 'Laadi fail üles',
    defaultFiles: [{ name: 'report.pdf' }, { name: 'report_1.pdf' }, { name: 'report_2.pdf' }],
    onChange: (files) => {
      console.log(files);
    },
    readOnly: true,
  },
};

export const PdfAndTxtOnly: Story = {
  args: {
    id: 'file-upload-accepts',
    name: 'file-accepts',
    label: 'Laadi fail üles',
    accept: '.pdf,.txt',
  },
};

export const SizeLimited: Story = {
  args: {
    id: 'file-upload-size-limited',
    name: 'file-size-limited',
    label: 'Laadi fail üles',
    maxSize: 0.001,
    multiple: true,
  },
};

export const ExtensionAndSizeLimit: Story = {
  args: {
    id: 'file-upload-size-extension-limited',
    name: 'file-size-extension-limited',
    label: 'Laadi fail üles',
    maxSize: 0.001,
    accept: '.pdf,.txt',
    multiple: true,
  },
};

export const ControlledClearing: Story = {
  render: (args) => {
    const [files, setFiles] = React.useState<FileUploadFile[]>([
      { name: 'report.pdf' },
      { name: 'report_1.pdf' },
      { name: 'report_2.pdf' },
    ]);

    return (
      <>
        <FileUpload {...args} files={files} onChange={(f) => setFiles(f)} multiple />

        <div style={{ marginTop: '12px' }}>
          <Button onClick={() => setFiles([])}>Salvesta ja tühjenda failid</Button>

          <pre>Failid: {JSON.stringify(files, null, 2)}</pre>
        </div>
      </>
    );
  },
  args: {
    id: 'file-upload-clear-controlled',
    name: 'file-upload-clear-controlled',
    label: 'Laadi fail üles',
    hasClearButton: true,
  },
};
