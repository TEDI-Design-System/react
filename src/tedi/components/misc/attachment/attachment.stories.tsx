import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Button } from '../../buttons/button/button';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Attachment, AttachmentProps } from './attachment';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.56.78?node-id=30427-154591&m=dev" target="_blank">Figma ↗</a>
 *
 * A file-attachment row: a file name (with optional size, meta or upload
 * progress) on a tertiary surface, plus neutral icon-only action buttons on the
 * right. The row is never a single clickable target — every action is its own
 * focusable button.
 */
const meta: Meta<AttachmentProps> = {
  component: Attachment,
  title: 'TEDI-Ready/Components/Helpers/Attachment',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.56.78?node-id=30427-154591&m=dev',
    },
  },
};

export default meta;

type Story = StoryObj<AttachmentProps>;

const Template: StoryFn<AttachmentProps> = (args) => (
  <div style={{ maxWidth: 480 }}>
    <Attachment {...args} />
  </div>
);

/**
 * The base row: a file name with a single neutral remove (delete) button, shown
 * by passing `onRemove`.
 */
export const Default: Story = {
  render: Template,
  args: {
    name: 'Kodukülastusakt_Triin.pdf',
    onRemove: () => null,
  },
};

/**
 * Read-only files have no remove button — omit `onRemove` and provide a
 * `download` (or `visibility`) action instead so the file can still be opened.
 */
export const ReadOnly: StoryFn<AttachmentProps> = () => (
  <div style={{ maxWidth: 480 }}>
    <VerticalSpacing size={0.5}>
      {['Kodukülastusakt_Triin.pdf', 'Lisa_5.pdf', 'Graafik_2025.pdf'].map((name) => (
        <Attachment
          key={name}
          name={name}
          actions={
            <Button icon="download" onClick={() => null}>
              Lae alla {name}
            </Button>
          }
        />
      ))}
    </VerticalSpacing>
  </div>
);

/**
 * `fileSize` (bytes) renders right-aligned on the file-name line, auto-formatted
 * with `Intl.NumberFormat` (largest unit ≤ value). Lock the unit with
 * `fileSizeUnit`, swap the locale with `fileSizeLocale`, or replace the
 * formatter entirely via `formatFileSize`.
 */
export const WithFileSize: StoryFn<AttachmentProps> = () => (
  <div style={{ maxWidth: 480 }}>
    <VerticalSpacing size={0.5}>
      <Attachment name="väike_logo.svg" fileSize={512} onRemove={() => null} />
      <Attachment name="Kodukülastusakt_Triin.pdf" fileSize={900_000} onRemove={() => null} />
      <Attachment name="raamatupidamise_aruanne.xlsx" fileSize={45_300_000} onRemove={() => null} />
      <Attachment name="suur_andmestik.zip" fileSize={2_400_000_000} onRemove={() => null} />
      <Attachment name="locked_to_kb.pdf" fileSize={1_200_000} fileSizeUnit="KB" onRemove={() => null} />
      <Attachment
        name="custom_format.pdf"
        fileSize={1_200_000}
        formatFileSize={(b) => `~${(b / 1024 / 1024).toFixed(0)} MB`}
        onRemove={() => null}
      />
    </VerticalSpacing>
  </div>
);

/**
 * `meta` adds a secondary line below the file name (uploader, date, type, …).
 * It's independent from `fileSize`, which stays right-aligned on the name line.
 */
export const WithMeta: StoryFn<AttachmentProps> = () => (
  <div style={{ maxWidth: 480 }}>
    <VerticalSpacing size={0.5}>
      <Attachment name="arve_2026_06.pdf" meta="Üles laaditud 03.06.2026" onRemove={() => null} />
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
 * File-type glyph on the left via the `icon` prop — pass any Material icon name
 * (`description`, `image`, `audio_file`, `video_file`, `picture_as_pdf`,
 * `folder_zip`, …). Not part of the base Figma row; opt in when a type glyph
 * helps scanning. Pass `null` to omit.
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
 * The `actions` slot takes any combination of neutral icon buttons (view,
 * download, …) rendered before the remove button. Action `Button`s default to
 * `visualType="neutral"`; the slot stays open, so set `visualType` explicitly to
 * use any other type (see the last row's `primary` confirm).
 */
export const WithDifferentActions: StoryFn<AttachmentProps> = () => (
  <div style={{ maxWidth: 480 }}>
    <VerticalSpacing size={0.5}>
      <Attachment
        name="Kodukülastusakt_Triin.pdf"
        actions={
          <>
            <Button visualType="neutral" icon="visibility" onClick={() => null}>
              Vaata Kodukülastusakt_Triin.pdf
            </Button>
            <Button visualType="neutral" icon="download" onClick={() => null}>
              Lae alla Kodukülastusakt_Triin.pdf
            </Button>
          </>
        }
        onRemove={() => null}
      />
      <Attachment
        name="Kodukülastusakt_Triin.pdf"
        actions={
          <Button icon="download" onClick={() => null}>
            Lae alla Kodukülastusakt_Triin.pdf
          </Button>
        }
        onRemove={() => null}
      />
      <Attachment
        name="Kodukülastusakt_Triin.pdf"
        fileSize={900_000}
        actions={
          <Button icon="download" onClick={() => null}>
            Lae alla Kodukülastusakt_Triin.pdf
          </Button>
        }
      />
      <Attachment
        name="leping.docx"
        fileSize={2_100_000}
        actions={
          <Button visualType="neutral" icon="check" onClick={() => null}>
            Kinnita leping.docx
          </Button>
        }
        onRemove={() => null}
      />
    </VerticalSpacing>
  </div>
);

/**
 * No remove button — omit `onRemove`. Either show no actions at all (a static
 * read-only row) or a single non-delete action such as download.
 */
export const WithoutDeleteButton: StoryFn<AttachmentProps> = () => (
  <div style={{ maxWidth: 480 }}>
    <VerticalSpacing size={0.5}>
      <Attachment name="Kodukülastusakt_Triin.pdf" fileSize={900_000} />
      <Attachment
        name="Kodukülastusakt_Triin.pdf"
        fileSize={900_000}
        actions={
          <Button icon="download" onClick={() => null}>
            Lae alla Kodukülastusakt_Triin.pdf
          </Button>
        }
      />
    </VerticalSpacing>
  </div>
);

/**
 * Async upload UX: `isLoading` swaps the meta line for an inline `ProgressBar`
 * and keeps the remove button visible so the upload can be cancelled. `progress`
 * controls the value (0..100); `fileSize` / `meta` show alongside.
 */
export const WithProgressBar: StoryFn<AttachmentProps> = () => (
  <div style={{ maxWidth: 480 }}>
    <VerticalSpacing size={0.5}>
      <Attachment name="Kodukülastusakt_Triin.pdf" isLoading progress={34} meta="Üleslaadimine" onRemove={() => null} />
      <Attachment
        name="Kodukülastusakt_Triin.pdf"
        fileSize={900_000}
        isLoading
        progress={34}
        meta="Üleslaadimine"
        onRemove={() => null}
      />
    </VerticalSpacing>
  </div>
);

/**
 * `isValid={false}` flips the row to the danger surface and shows an error glyph
 * next to the file name — for files that failed validation. Pair with `meta` or
 * `feedback` to explain why.
 */
export const Invalid: StoryFn<AttachmentProps> = () => (
  <div style={{ maxWidth: 480 }}>
    <VerticalSpacing size={0.5}>
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
 * `feedback` renders a `FeedbackText` row **below** the card (validation error,
 * hint, success), wired to the row via `aria-describedby`. Distinct from `meta`,
 * which is secondary text **inside** the card under the file name.
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

/**
 * Narrow / mobile width — long file names wrap, the file size drops under the
 * name and the row reflows to the responsive grid layout. Shown at ~360px.
 */
export const Mobile: StoryFn<AttachmentProps> = () => (
  <div style={{ maxWidth: 360 }}>
    <VerticalSpacing size={0.5}>
      <Attachment
        name="Kodukülastusakt_Triin_natuke_pikema_pealkirjaga.pdf"
        fileSize={900_000}
        isLoading
        progress={34}
        meta="Üleslaadimine"
        onRemove={() => null}
      />
      <Attachment name="Kodukülastusakt_Triin_natuke_pikema_pealkirjaga.pdf" fileSize={900_000} onRemove={() => null} />
      <Attachment
        name="Kodukülastusakt.pdf"
        fileSize={900_000}
        actions={
          <Button icon="download" onClick={() => null}>
            Lae alla Kodukülastusakt.pdf
          </Button>
        }
        onRemove={() => null}
      />
    </VerticalSpacing>
  </div>
);
