import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { Button } from '../../buttons/button/button';
import { HideAt } from '../../layout/hide-at/hide-at';
import { ShowAt } from '../../layout/show-at/show-at';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Dropdown } from '../../overlays/dropdown';
import { Tooltip } from '../../overlays/tooltip';
import { Attachment, AttachmentProps } from './attachment';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.59.78?node-id=30427-154342&m=dev" target="_blank">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/125c5a-attachment" target="_blank">Zeroheight ↗</a>
 */
const meta: Meta<AttachmentProps> = {
  component: Attachment,
  title: 'TEDI-Ready/Components/Helpers/Attachment',
  args: {
    name: 'Kodukülastusakt_Triin.pdf',
  },
  argTypes: {
    icon: { control: 'text' },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.59.78?node-id=30427-154342&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<AttachmentProps>;

const action = (icon: string, label: string): JSX.Element => (
  <Tooltip>
    <Tooltip.Trigger>
      <Button visualType="neutral" icon={{ name: icon, size: 18 }}>
        {label}
      </Button>
    </Tooltip.Trigger>
    <Tooltip.Content>{label}</Tooltip.Content>
  </Tooltip>
);

const deleteAction = action('delete', 'Kustuta');
const downloadAction = action('download', 'Laadi alla');

const renderWithDelete: StoryFn<AttachmentProps> = (args) => (
  <div style={{ maxWidth: 480 }}>
    <Attachment {...args} actions={deleteAction} />
  </div>
);

export const Default: Story = {
  render: renderWithDelete,
};

export const ReadOnly: StoryFn<AttachmentProps> = () => (
  <div style={{ maxWidth: 480 }}>
    <VerticalSpacing size={0.5}>
      <Attachment name="Kodukülastusakt_Triin.pdf" actions={downloadAction} />
      <Attachment name="Lisa_5.pdf" actions={downloadAction} />
      <Attachment name="Graafik_2025.pdf" actions={downloadAction} />
    </VerticalSpacing>
  </div>
);

export const WithProgress: StoryFn<AttachmentProps> = () => (
  <div style={{ maxWidth: 480 }}>
    <VerticalSpacing size={0.5}>
      <Attachment
        name="Kodukülastusakt_Triin.pdf"
        isLoading
        progress={34}
        progressLabel="Üleslaadimine"
        actions={deleteAction}
      />
      <Attachment name="Kodukülastusakt_Triin.pdf" fileSize="0,9 MB" isLoading progress={34} actions={deleteAction} />
      <Attachment
        name="Kodukülastusakt_Triin.pdf"
        fileSize="0,9 MB"
        isLoading
        progress={34}
        progressLabel="Üleslaadimine"
        actions={
          <>
            {downloadAction}
            {deleteAction}
          </>
        }
      />
    </VerticalSpacing>
  </div>
);

export const WithFileSize: Story = {
  render: renderWithDelete,
  args: {
    fileSize: '0,9 MB',
  },
};

export const WithIcon: StoryFn<AttachmentProps> = () => (
  <div style={{ maxWidth: 480 }}>
    <VerticalSpacing size={0.5}>
      <Attachment name="Kodukülastusakt_Triin.pdf" fileSize="0,9 MB" icon="description" actions={deleteAction} />
      <Attachment name="Kodukülastusakt_Triin.pdf" fileSize="0,9 MB" icon="imagesmode" actions={deleteAction} />
      <Attachment name="Kodukülastusakt_Triin.pdf" fileSize="0,9 MB" icon="audio_file" actions={deleteAction} />
      <Attachment name="Kodukülastusakt_Triin.pdf" fileSize="0,9 MB" icon="picture_as_pdf" actions={deleteAction} />
    </VerticalSpacing>
  </div>
);

export const WithoutDeleteButton: StoryFn<AttachmentProps> = () => (
  <div style={{ maxWidth: 480 }}>
    <VerticalSpacing size={0.5}>
      <Attachment name="Kodukülastusakt_Triin.pdf" fileSize="0,9 MB" />
      <Attachment name="Kodukülastusakt_Triin.pdf" fileSize="0,9 MB" />
    </VerticalSpacing>
  </div>
);

/**
 * Pass any combination of neutral icon buttons to the `actions` slot — view,
 * download, delete, or a mix. The last row pairs the actions with a progress bar.
 */
export const WithDifferentActions: StoryFn<AttachmentProps> = () => (
  <div style={{ maxWidth: 480 }}>
    <VerticalSpacing size={0.5}>
      <Attachment
        name="Kodukülastusakt_Triin.pdf"
        actions={
          <>
            {action('visibility', 'Vaata')}
            {downloadAction}
            {deleteAction}
          </>
        }
      />
      <Attachment
        name="Kodukülastusakt_Triin.pdf"
        actions={
          <>
            {downloadAction}
            {deleteAction}
          </>
        }
      />
      <Attachment name="Kodukülastusakt_Triin.pdf" actions={downloadAction} />
      <Attachment name="Kodukülastusakt_Triin.pdf" fileSize="0,9 MB" actions={deleteAction} />
      <Attachment
        name="Kodukülastusakt_Triin.pdf"
        fileSize="0,9 MB"
        isLoading
        progress={34}
        actions={
          <>
            {downloadAction}
            {deleteAction}
          </>
        }
      />
    </VerticalSpacing>
  </div>
);
export const Vertical: StoryFn<AttachmentProps> = () => (
  <div style={{ maxWidth: 350 }}>
    <VerticalSpacing size={0.75}>
      <Attachment
        direction="vertical"
        name="Kodukülastusakt_Triin_natuke_pikema_pealkirjaga.pdf"
        fileSize="0,9 MB"
        isLoading
        progress={34}
        actions={deleteAction}
      />
      <Attachment
        direction="vertical"
        name="Kodukülastusakt_Triin_natuke_pikema_pealkirjaga.pdf"
        fileSize="0,9 MB"
        actions={deleteAction}
      />
      <Attachment direction="vertical" name="Kodukülastusakt.pdf" fileSize="0,9 MB" actions={downloadAction} />
      <Attachment
        direction="vertical"
        name="Kodukülastusakt.pdf"
        fileSize="0,9 MB"
        actions={
          <>
            {downloadAction}
            <Dropdown>
              <Dropdown.Trigger>
                <Button visualType="neutral" icon={{ name: 'more_vert', size: 18 }}>
                  Rohkem valikuid
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Content>
                <Dropdown.Item index={0}>Nimeta ümber</Dropdown.Item>
                <Dropdown.Item index={1}>Kustuta</Dropdown.Item>
              </Dropdown.Content>
            </Dropdown>
          </>
        }
      />
    </VerticalSpacing>
  </div>
);

export const WithError: StoryFn<AttachmentProps> = () => (
  <div style={{ maxWidth: 480 }}>
    <VerticalSpacing size={0.75}>
      <Attachment name="Kodukülastusakt_Triin.pdf" actions={deleteAction} />
      <Attachment
        name="Kodukülastusakt_Triin.pdf"
        isValid={false}
        feedback={{ text: 'Tagasiside tekst', type: 'error' }}
        actions={deleteAction}
      />
    </VerticalSpacing>
  </div>
);

export const LabeledActions: StoryFn<AttachmentProps> = () => (
  <div style={{ maxWidth: 480 }}>
    <Attachment
      name="Kodukülastusakt_Triin.pdf"
      actions={
        <>
          <ShowAt sm>
            <span style={{ display: 'inline-flex', gap: '0.5rem', paddingInline: '0.5rem' }}>
              <Button visualType="neutral" iconLeft={{ name: 'download', size: 18 }}>
                Laadi alla
              </Button>
              <Button visualType="neutral" iconLeft={{ name: 'delete', size: 18 }}>
                Kustuta
              </Button>
            </span>
          </ShowAt>
          <HideAt sm>
            {downloadAction}
            {deleteAction}
          </HideAt>
        </>
      }
    />
  </div>
);
