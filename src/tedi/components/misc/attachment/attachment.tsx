import cn from 'classnames';
import React, { forwardRef } from 'react';

import { useLabels } from '../../../providers/label-provider';
import { Icon } from '../../base/icon/icon';
import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import FeedbackText, { FeedbackTextProps } from '../../form/feedback-text/feedback-text';
import { Link } from '../../navigation/link/link';
import { ProgressBar } from '../progress-bar/progress-bar';
import styles from './attachment.module.scss';

export type AttachmentFileSizeUnit = 'auto' | 'B' | 'KB' | 'MB' | 'GB';

const FILE_SIZE_UNITS: AttachmentFileSizeUnit[] = ['B', 'KB', 'MB', 'GB'];

/**
 * Format a byte count for display. Picks the largest unit ≤ value with one
 * fractional digit (e.g. `1.2 MB`). Pass `unit` to lock to a specific scale.
 * Pass `locale` to override the default `'et-EE'` number formatting.
 */
const defaultFormatFileSize = (bytes: number, unit: AttachmentFileSizeUnit = 'auto', locale = 'et-EE'): string => {
  if (!Number.isFinite(bytes) || bytes < 0) return '';

  const fixedUnit = unit === 'auto' ? null : unit;
  let index = fixedUnit ? FILE_SIZE_UNITS.indexOf(fixedUnit) : 0;
  if (index < 0) index = 0;

  let value = bytes;
  if (fixedUnit) {
    value = bytes / 1024 ** index;
  } else {
    while (value >= 1024 && index < FILE_SIZE_UNITS.length - 1) {
      value /= 1024;
      index += 1;
    }
  }

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: index === 0 ? 0 : 1,
    maximumFractionDigits: index === 0 ? 0 : 1,
  }).format(value);

  return `${formatted} ${FILE_SIZE_UNITS[index]}`;
};

export interface AttachmentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'color'> {
  /**
   * File name shown as the primary label. Required.
   */
  name: string;
  /**
   * Optional secondary line shown under the name **inside** the attachment
   * card. Pass a pre-formatted string (e.g. `'PDF'`, `'Uploaded by Anne'`) —
   * the component does no formatting of its own so the consumer keeps full
   * control over locale and units. Independent from `fileSize`: meta renders
   * below the file name, file size renders inline before the remove button.
   *
   * For error / validation feedback rendered **below** the card, use
   * `feedback` instead — it's a separate semantic slot bound to ARIA.
   */
  meta?: React.ReactNode;
  /**
   * Validation / hint message rendered below the attachment card. Mirrors
   * the `helper` slot on form fields — supports `'hint' | 'valid' | 'error'`
   * types and is wired to the row via `aria-describedby` for screen readers.
   *
   * Distinct from `meta`: meta is secondary text inside the card surface,
   * `feedback` is the message that appears outside / under the card.
   */
  feedback?: FeedbackTextProps;
  /**
   * File size in bytes. When set, the formatted size is rendered inline to
   * the left of the remove / loading slot — same row as the file name, not
   * under it. Use the `fileSizeUnit` prop to lock the displayed unit, or
   * `formatFileSize` for full control over the output string.
   */
  fileSize?: number;
  /**
   * Display unit for `fileSize`. `'auto'` (default) picks the largest unit
   * ≤ value (`1.2 MB`, `512 B`, etc.). Override with a fixed unit when the
   * row sits next to other rows that should share the same scale.
   * @default auto
   */
  fileSizeUnit?: AttachmentFileSizeUnit;
  /**
   * Locale code passed to `Intl.NumberFormat` for the file-size number.
   * @default et-EE
   */
  fileSizeLocale?: string;
  /**
   * Replaces the default file-size formatter entirely. Receives the raw byte
   * count and returns the display string. Use when the consumer needs locale
   * rules outside the `Intl` defaults or wants e.g. "less than 1 KB" copy
   * for small files.
   */
  formatFileSize?: (bytes: number) => string;
  /**
   * Material icon name for the file-type glyph rendered on the left. Defaults
   * to `'description'`. Pass `null` to omit the icon entirely.
   * @default description
   */
  icon?: string | null;
  /**
   * If provided (and `onRemove` is not), renders the attachment as an `<a>`
   * pointing to this URL — typical for already-uploaded files where the user
   * downloads instead of removes. Falls back to a `<div>` wrapper otherwise.
   */
  href?: string;
  /**
   * `target` forwarded to the anchor when `href` is set. Defaults to `_blank`
   * with `rel="noopener noreferrer"` applied automatically for safety.
   */
  target?: string;
  /**
   * Click handler for the remove action. When provided, renders the inline
   * delete button on the right. Stays visible during `isLoading` so the user
   * can cancel an in-flight upload.
   */
  onRemove?: () => void;
  /**
   * Material icon name for the remove button. Defaults to `'close'`. Common
   * alternative: `'delete'` (trash can) for already-saved attachments.
   * @default delete
   */
  removeIcon?: string;
  /**
   * Accessible label for the remove button. Falls back to
   * `${label('remove')} ${name}` — override only when the file name doesn't
   * read well in screen-reader announcements.
   */
  removeLabel?: string;
  /**
   * Shows an upload progress bar inside the card — use during async uploads.
   * The progress value is controlled via the `progress` prop (defaults to
   * `0`). When `meta` is also set, it's passed into the progress bar's
   * feedback slot instead of rendering on its own row, so the two pieces of
   * upload feedback stay grouped. The remove button stays visible during
   * loading so the user can cancel the upload.
   * @default false
   */
  isLoading?: boolean;
  /**
   * Upload progress as a percentage (0..100). Only rendered when `isLoading`
   * is true. Out-of-range values are clamped by `ProgressBar`.
   * @default 0
   */
  progress?: number;
  /**
   * `false` flips the attachment into the danger surface variant and surfaces
   * a warning glyph next to the file name. Use for files that failed
   * validation (wrong extension, too large, server rejected, etc.).
   */
  isValid?: boolean;
  /**
   * Additional CSS class names appended to the root element.
   */
  className?: string;
}

export const Attachment = forwardRef<HTMLDivElement, AttachmentProps>((props, ref) => {
  const { getLabel } = useLabels();
  const {
    name,
    meta,
    feedback,
    fileSize,
    fileSizeUnit = 'auto',
    fileSizeLocale = 'et-EE',
    formatFileSize,
    icon,
    href,
    target,
    onRemove,
    removeIcon = 'delete',
    removeLabel,
    isLoading = false,
    progress,
    isValid,
    className,
    id,
    ...rest
  } = props;

  const hasMultiLine = !!meta || isLoading;
  const reactId = React.useId();
  const rowId = id ?? `tedi-attachment-${reactId}`;
  const feedbackId = feedback ? feedback.id ?? `${rowId}-feedback` : undefined;

  const invalid = isValid === false;

  const formattedFileSize =
    typeof fileSize === 'number'
      ? formatFileSize
        ? formatFileSize(fileSize)
        : defaultFormatFileSize(fileSize, fileSizeUnit, fileSizeLocale)
      : null;

  const attachmentBEM = cn(
    styles['tedi-attachment'],
    {
      [styles['tedi-attachment--invalid']]: invalid,
      [styles['tedi-attachment--clickable']]: !!href,
      [styles['tedi-attachment--multi-line']]: hasMultiLine,
    },
    className
  );

  const body = (
    <>
      {icon && (
        <span className={styles['tedi-attachment__icon']} aria-hidden="true">
          <Icon name={icon} size={18} color={invalid ? 'danger' : 'secondary'} />
        </span>
      )}
      <span className={styles['tedi-attachment__body']}>
        <span className={styles['tedi-attachment__name']}>
          <Text element="span">{name}</Text>
          {invalid && (
            <Icon
              name="error"
              color="danger"
              display="inline"
              size={18}
              className={styles['tedi-attachment__invalid-icon']}
            />
          )}
        </span>
        {isLoading ? (
          <ProgressBar
            value={progress}
            ariaLabel={name}
            helper={meta ? { text: meta } : undefined}
            className={styles['tedi-attachment__progress']}
          />
        ) : (
          meta && (
            <Text element="span" modifiers="small" color="tertiary" className={styles['tedi-attachment__meta']}>
              {meta}
            </Text>
          )
        )}
      </span>
      {formattedFileSize && (
        <Text element="span" modifiers="small" color="tertiary" className={styles['tedi-attachment__file-size']}>
          {formattedFileSize}
        </Text>
      )}
    </>
  );

  const action = onRemove ? (
    <Button
      className={styles['tedi-attachment__remove']}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onRemove();
      }}
      title={removeLabel ?? `${getLabel('remove')} ${name}`}
      aria-label={removeLabel ?? `${getLabel('remove')} ${name}`}
      data-name="attachment-remove"
      noStyle
    >
      <Icon name={removeIcon} size={18} color="inherit" />
    </Button>
  ) : null;

  const card = href ? (
    <Link
      ref={ref as unknown as React.Ref<HTMLAnchorElement>}
      id={rowId}
      href={href}
      target={target ?? '_blank'}
      rel={!target || target === '_blank' ? 'noopener noreferrer' : undefined}
      className={attachmentBEM}
      aria-describedby={feedbackId}
      noStyle
      {...(rest as Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'>)}
    >
      {body}
      {action}
    </Link>
  ) : (
    <div ref={ref} id={rowId} className={attachmentBEM} aria-describedby={feedbackId} {...rest}>
      {body}
      {action}
    </div>
  );

  if (!feedback) return card;

  return (
    <div className={styles['tedi-attachment-wrapper']}>
      {card}
      <FeedbackText
        {...feedback}
        id={feedbackId}
        className={cn(styles['tedi-attachment__feedback'], feedback.className)}
      />
    </div>
  );
});

Attachment.displayName = 'Attachment';

export default Attachment;
