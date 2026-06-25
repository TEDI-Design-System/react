import { Meta, StoryFn, StoryObj } from '@storybook/react';

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
 *
 * A file-attachment row: a file name (with optional size, leading icon or upload
 * progress) on a tertiary surface. Action buttons (download, delete, …) are **not**
 * built in — pass your own neutral icon-only buttons to the `actions` slot, each
 * with an `aria-label` (wrap in a `Tooltip` to surface the label visually). The row
 * is never a single clickable target.
 */
const meta: Meta<AttachmentProps> = {
  component: Attachment,
  title: 'TEDI-Ready/Components/Helpers/Attachment',
  args: {
    name: 'Kodukülastusakt_Triin.pdf',
  },
  argTypes: {
    // `icon` is a Material icon name (string). Force a text control so Storybook
    // doesn't infer an object editor for the `string | null` union — picking `{}`
    // there renders an object as a React child and throws.
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

/**
 * Read-only attachments expose only a download action — no delete button.
 */
export const ReadOnly: StoryFn<AttachmentProps> = () => (
  <div style={{ maxWidth: 480 }}>
    <VerticalSpacing size={0.5}>
      <Attachment name="Kodukülastusakt_Triin.pdf" actions={downloadAction} />
      <Attachment name="Lisa_5.pdf" actions={downloadAction} />
      <Attachment name="Graafik_2025.pdf" actions={downloadAction} />
    </VerticalSpacing>
  </div>
);

/**
 * Set `isLoading` to show upload progress as an inline `ProgressBar`; `progress`
 * (0..100) drives the value and `progressLabel` adds a hint under it. The remove
 * (or other) actions stay visible so the upload can be cancelled.
 */
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

/**
 * Pass a Material Symbol name to `icon` to show a leading file-type icon before
 * the file name.
 */
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

/**
 * Leave the `actions` slot empty to render an attachment with no action buttons.
 */
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

/**
 * `direction="vertical"` stacks the name, size and progress in a column with the
 * actions pinned top-right — useful on mobile or in narrow containers. Leave
 * `direction` unset to switch automatically below the `verticalBelow` breakpoint
 * (default `sm`).
 */
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

/**
 * `isValid={false}` flips the card to the error surface (red, error glyph next to
 * the name); pair it with a `feedback` error message rendered below the card.
 */
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

/**
 * Labeled neutral buttons (icon + text) on desktop that collapse to icon-only
 * buttons with tooltips on narrow screens — toggle the two action sets with
 * `ShowAt` / `HideAt` at the `sm` breakpoint. Resize the preview to see the switch.
 */
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
