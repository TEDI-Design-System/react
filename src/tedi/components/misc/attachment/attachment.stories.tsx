import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Attachment, AttachmentProps } from './attachment';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.49.74?node-id=30427-154344&m=dev" target="_blank">Figma ↗</a>
 */
const meta: Meta<AttachmentProps> = {
  component: Attachment,
  title: 'TEDI-Ready/Components/Helpers/Attachment',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.49.74?node-id=30427-154591&m=dev',
    },
  },
};

export default meta;

type Story = StoryObj<AttachmentProps>;

const Template: StoryFn<AttachmentProps> = (args) => (
  <div style={{ maxWidth: 360 }}>
    <Attachment {...args} />
  </div>
);

export const Default: Story = {
  render: Template,
  args: {
    name: 'Kodukülastusakt_Triin.pdf',
    onRemove: () => null,
  },
};

/**
 * `fileSize` (bytes) is auto-formatted with `Intl.NumberFormat` using the
 * largest unit ≤ value. Lock the unit with `fileSizeUnit`, swap the locale
 * with `fileSizeLocale`, or replace the formatter entirely via
 * `formatFileSize`.
 */
export const FileSize: StoryFn<AttachmentProps> = () => (
  <div style={{ maxWidth: 480 }}>
    <VerticalSpacing size={0.5}>
      <Attachment name="väike_logo.svg" fileSize={512} onRemove={() => null} />
      <Attachment name="arve_2026_06.pdf" fileSize={1_200_000} onRemove={() => null} />
      <Attachment name="raamatupidamise_aruanne.xlsx" fileSize={45_300_000} onRemove={() => null} />
      <Attachment name="suur_andmestik.zip" fileSize={2_400_000_000} onRemove={() => null} />
      <Attachment
        name="locked_to_kb.pdf"
        fileSize={1_200_000}
        fileSizeUnit="KB"
        meta="lukustatud KB-le"
        onRemove={() => null}
      />
      <Attachment
        name="custom_format.pdf"
        fileSize={1_200_000}
        formatFileSize={(b) => `~${(b / 1024 / 1024).toFixed(0)} MB`}
        meta="kohandatud vormindaja"
        onRemove={() => null}
      />
    </VerticalSpacing>
  </div>
);

/**
 * `meta` is rendered on the secondary line below the file name **inside**
 * the card. `fileSize` renders independently on the right, next to the
 * remove button. Both can be set at the same time.
 */
export const WithMeta: StoryFn<AttachmentProps> = () => (
  <div style={{ maxWidth: 480 }}>
    <VerticalSpacing size={0.5}>
      <Attachment name="arve_2026_06.pdf" meta="Üles laaditud 03.06.2026" onRemove={() => null} />
      <Attachment name="arve_2026_06.pdf" fileSize={1_200_000} onRemove={() => null} />
      <Attachment name="arve_2026_06.pdf" fileSize={1_200_000} meta="PDF" onRemove={() => null} />
      <Attachment
        name="arve_2026_06.pdf"
        fileSize={1_200_000}
        meta="Üles laaditud Anne Tamme poolt"
        onRemove={() => null}
      />
    </VerticalSpacing>
  </div>
);

/**
 * File-type glyph rendered on the left of the row. Pass any Material icon
 * name — typically `description` for documents, `image` for pictures,
 * `audio_file`, `video_file`, `picture_as_pdf`, etc. Pass `null` to omit
 * the icon entirely.
 */
export const WithIcon: StoryFn<AttachmentProps> = () => (
  <div style={{ maxWidth: 480 }}>
    <VerticalSpacing size={0.5}>
      <Attachment icon="description" name="arve_2026_06.pdf" fileSize={1_200_000} onRemove={() => null} />
      <Attachment icon="picture_as_pdf" name="aastaaruanne.pdf" fileSize={5_400_000} onRemove={() => null} />
      <Attachment icon="image" name="pilt_2026_06.jpg" fileSize={2_800_000} onRemove={() => null} />
      <Attachment icon="audio_file" name="koosolek_03_06.mp3" fileSize={18_000_000} onRemove={() => null} />
      <Attachment icon="video_file" name="esitlus.mp4" fileSize={140_000_000} onRemove={() => null} />
      <Attachment icon="folder_zip" name="kõik_failid.zip" fileSize={420_000_000} onRemove={() => null} />
    </VerticalSpacing>
  </div>
);

/**
 * Setting `href` (without `onRemove`) turns the whole row into an anchor —
 * use for already-saved attachments that the user downloads instead of
 * removes. The row gets a hover background and a focus outline.
 */
export const AsDownloadLink: StoryFn<AttachmentProps> = () => (
  <div style={{ maxWidth: 480 }}>
    <VerticalSpacing size={0.5}>
      <Attachment icon="download" name="aastaaruanne_2025.pdf" fileSize={5_400_000} href="#download-1" />
      <Attachment icon="download" name="leping_täisversioon.docx" fileSize={2_100_000} href="#download-2" />
      <Attachment
        icon="download"
        name="profiilipilt.jpg"
        fileSize={840_000}
        meta="Avaneb uuel vahekaardil"
        href="#download-3"
      />
    </VerticalSpacing>
  </div>
);

/**
 * Async upload UX: `isLoading` swaps the remove button for a spinner so the
 * user can't remove the file mid-upload. `isValid={false}` flips the row to
 * the danger surface and surfaces the error glyph next to the name.
 */
export const LoadingAndInvalid: StoryFn<AttachmentProps> = () => (
  <div style={{ maxWidth: 480 }}>
    <VerticalSpacing size={0.5}>
      <Attachment name="arve_üleslaadimine.pdf" meta="Üleslaadimine…" isLoading onRemove={() => null} />
      <Attachment
        name="pilt_2026_06.heic"
        fileSize={8_500_000}
        meta="Fail on liiga suur"
        isValid={false}
        onRemove={() => null}
      />
      <Attachment name="dokument.exe" meta="Lubamatu failitüüp" isValid={false} onRemove={() => null} />
    </VerticalSpacing>
  </div>
);

/**
 * `feedback` renders a `FeedbackText` row **below** the attachment card —
 * use for validation errors, hint messages, or success confirmation that
 * should sit outside the card surface (mirrors how `helper` works on form
 * fields). It's wired to the card via `aria-describedby` so screen readers
 * announce it alongside the file name. Distinct from `meta`, which is
 * secondary text **inside** the card under the file name.
 */
export const WithFeedback: StoryFn<AttachmentProps> = () => (
  <div style={{ maxWidth: 480 }}>
    <VerticalSpacing size={1}>
      <Attachment
        name="suur_pilt.heic"
        fileSize={8_500_000}
        isValid={false}
        onRemove={() => null}
        feedback={{ text: 'Fail on liiga suur — maksimaalne lubatud suurus on 5 MB', type: 'error' }}
      />
      <Attachment
        name="arve_2026_06.pdf"
        meta="Üles laaditud Anne Tamme poolt"
        fileSize={1_200_000}
        onRemove={() => null}
        feedback={{ text: 'Toetatud failitüübid: PDF, DOCX, XLSX', type: 'hint' }}
      />
    </VerticalSpacing>
  </div>
);
