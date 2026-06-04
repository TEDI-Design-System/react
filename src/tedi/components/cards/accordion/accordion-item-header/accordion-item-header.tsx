import cn from 'classnames';
import React from 'react';

import { labelsMap, useLabels } from '../../../../providers/label-provider';
import { Icon } from '../../../base/icon/icon';
import { Text } from '../../../base/typography/text/text';
import Link from '../../../navigation/link/link';
import styles from '../accordion.module.scss';
import { useAccordionItemContext } from '../accordion-item/accordion-item-context';

export type AccordionItemHeaderTitleLayout = 'hug' | 'fill';
export type AccordionItemHeaderExpandActionPosition = 'start' | 'end';
export type AccordionItemHeaderHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface AccordionItemHeaderProps {
  /**
   * If false, disables header toggling and enables using interactive elements in the
   * accordion header. The default expand action is still rendered alongside it unless
   * `showDefaultExpandAction` is also set to `false`.
   * @default true
   */
  headerClickable?: boolean;
  /**
   * Sets how the accordion title stretches horizontally.
   *
   * `hug` — wraps tightly around content.
   *
   * `fill` — expands to available space and pushes trailing elements to the end.
   * @default hug
   */
  titleLayout?: AccordionItemHeaderTitleLayout;
  /**
   * Label shown when the accordion is collapsed. The default value `open` is
   * a translation key resolved through the active `LabelProvider`.
   *
   * Passing another known label key (anything in `labelsMap`) also goes
   * through the translation lookup. Passing an arbitrary string uses it
   * literally with no translation.
   * @default 'open'
   */
  openLabel?: string;
  /**
   * Label shown when the accordion is expanded. The default value `close` is
   * a translation key resolved through the active `LabelProvider`.
   *
   * Passing another known label key (anything in `labelsMap`) also goes
   * through the translation lookup. Passing an arbitrary string uses it
   * literally with no translation.
   * @default 'close'
   */
  closeLabel?: string;
  /**
   * Controls whether the expand/collapse label is shown.
   * @default true
   */
  showExpandLabel?: boolean;
  /**
   * Controls whether the default expand/collapse action is shown.
   * @default true
   */
  showDefaultExpandAction?: boolean;
  /**
   * Position of the expand action relative to the header content.
   * @default end
   */
  expandActionPosition?: AccordionItemHeaderExpandActionPosition;
  /**
   * Custom CSS class for the accordion header.
   */
  headerClass?: string;
  /**
   * The accordion title content. Renders inside the header's title slot.
   * Use a string for plain text, or a node for richer content.
   */
  title?: React.ReactNode;
  /**
   * Custom content rendered before the title.
   */
  beforeTitle?: React.ReactNode;
  /**
   * Custom content rendered after the title.
   */
  afterTitle?: React.ReactNode;
  /**
   * Custom action elements rendered at the start of the header.
   */
  startAction?: React.ReactNode;
  /**
   * Custom action elements rendered at the end of the header.
   */
  endAction?: React.ReactNode;
  /**
   * Custom description content rendered below the title (start of the header).
   */
  startDescription?: React.ReactNode;
  /**
   * Custom description content rendered at the end of the header.
   */
  endDescription?: React.ReactNode;
  /**
   * When set, wraps the header trigger in a semantic `<h1>`–`<h6>` element
   * following the WAI-ARIA Accordion Pattern. Improves accessibility for
   * documents with a heading hierarchy (FAQ pages, docs). The wrapper uses
   * `display: contents` so it doesn't affect the visual layout — it only adds
   * semantic information for assistive technologies and TOC tools.
   */
  headingLevel?: AccordionItemHeaderHeadingLevel;
}

export const AccordionItemHeader = (props: AccordionItemHeaderProps): JSX.Element => {
  const {
    headerClickable = true,
    titleLayout = 'hug',
    openLabel = 'open',
    closeLabel = 'close',
    showExpandLabel = true,
    showDefaultExpandAction = true,
    expandActionPosition = 'end',
    headerClass,
    title,
    beforeTitle,
    afterTitle,
    startAction,
    endAction,
    startDescription,
    endDescription,
    headingLevel,
  } = props;

  const { headerId, contentId, expanded, toggle, showIconCard, disabled } =
    useAccordionItemContext('Accordion.Item.Header');
  const { getLabel } = useLabels();
  const resolveLabel = (value: string): string =>
    value in labelsMap ? getLabel(value as Parameters<typeof getLabel>[0]) : value;

  const resolvedOpenLabel = resolveLabel(openLabel);
  const resolvedCloseLabel = resolveLabel(closeLabel);
  const expandLabel = expanded ? resolvedCloseLabel : resolvedOpenLabel;
  const showStartExpandAction = showDefaultExpandAction && expandActionPosition === 'start';
  const showEndExpandAction = showDefaultExpandAction && expandActionPosition === 'end';

  const hostClasses = cn(
    styles['tedi-accordion-item-header'],
    {
      [styles['tedi-accordion-item-header--hoverable']]: headerClickable && !disabled,
      [styles['tedi-accordion-item-header--expanded']]: expanded,
      [styles['tedi-accordion-item-header--with-icon-card']]: showIconCard,
      [styles['tedi-accordion-item-header--disabled']]: disabled,
    },
    headerClass
  );

  const renderExpandIcon = () => (
    <Icon
      name="expand_more"
      color="inherit"
      size={16}
      className={cn(styles['tedi-accordion-item-header__icon'], {
        [styles['tedi-accordion-item-header__icon--expanded']]: expanded,
        [styles['tedi-accordion-item-header__icon--no-label']]: !showExpandLabel,
      })}
    />
  );

  const renderCollapseButton = () => {
    if (headerClickable) {
      return (
        <span
          className={cn(styles['tedi-accordion-item-header__expand-indicator'], {
            [styles['tedi-accordion-item-header__expand-indicator--with-label']]: showExpandLabel,
          })}
        >
          <Text element="span" modifiers="normal">
            {showExpandLabel ? expandLabel : null}
          </Text>
          {renderExpandIcon()}
        </span>
      );
    }

    return (
      <Link
        type="button"
        className={styles['tedi-accordion-item-header__toggle-button']}
        onClick={toggle}
        aria-expanded={expanded}
        aria-controls={contentId}
        aria-label={!showExpandLabel ? expandLabel : undefined}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        underline={false}
      >
        <span className={styles['tedi-accordion-item-header__toggle-button-content']}>
          {showExpandLabel ? expandLabel : null}
          {renderExpandIcon()}
        </span>
      </Link>
    );
  };

  const headerContent = (
    <>
      <span className={styles['tedi-accordion-item-header__start']}>
        {startAction}
        {beforeTitle}

        <span
          className={cn(styles['tedi-accordion-item-header__title'], {
            [styles['tedi-accordion-item-header__title--grow']]: titleLayout === 'fill',
            [styles['tedi-accordion-item-header__title--with-description']]: startDescription,
          })}
        >
          <span className={styles['tedi-accordion-item-header__title-main']}>
            {showStartExpandAction && renderCollapseButton()}

            {title !== undefined && title !== null && (
              <Text element="span" color="secondary" modifiers="normal">
                {title}
              </Text>
            )}
          </span>

          {startDescription}
        </span>

        {afterTitle}
      </span>

      {endDescription}

      {showEndExpandAction && renderCollapseButton()}

      {endAction}
    </>
  );

  const headerRoot = headerClickable ? (
    <div data-name="accordion-item-header" className={hostClasses}>
      <button
        type="button"
        id={headerId}
        className={styles['tedi-accordion-item-header__trigger']}
        onClick={toggle}
        disabled={disabled}
        aria-expanded={expanded}
        aria-controls={contentId}
      >
        {headerContent}
      </button>
    </div>
  ) : (
    <div data-name="accordion-item-header" className={hostClasses}>
      <div id={headerId} className={styles['tedi-accordion-item-header__trigger']}>
        {headerContent}
      </div>
    </div>
  );

  if (headingLevel) {
    const HeadingTag = `h${headingLevel}` as const;
    return <HeadingTag className={styles['tedi-accordion-item-header__heading-wrapper']}>{headerRoot}</HeadingTag>;
  }

  return headerRoot;
};

AccordionItemHeader.displayName = 'AccordionItemHeader';

export default AccordionItemHeader;
