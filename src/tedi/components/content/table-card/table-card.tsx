import cn from 'classnames';
import React from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import { useLabels } from '../../../providers/label-provider';
import { Icon } from '../../base/icon/icon';
import { Text, TextModifiers } from '../../base/typography/text/text';
import { Checkbox } from '../../form/checkbox/checkbox';
import { Card, CardContentPadding } from '../card/card';
import { Label } from '../label/label';
import { TextGroupList, TextGroupListItem } from '../text-group/text-group-list/text-group-list';
import styles from './table-card.module.scss';

type TableCardAlign = 'left' | 'right';

export interface TableCardRow {
  /** Row label (usually the column header). Strings are wrapped in a `<Label>`; nodes render as-is. */
  label: React.ReactNode;
  /** Row value — text, a `StatusBadge`, a link, etc. */
  value: React.ReactNode;
  /**
   * Show the value in bold.
   * @default false
   */
  bold?: boolean;
  /** In a multi-column body, span this row across N columns. Ignored when `columns` is 1. */
  colSpan?: number;
}

type TableCardBreakpointProps = {
  /**
   * Row layout: `horizontal` (label beside value) or `vertical` (label above value).
   * @default horizontal
   */
  layout?: 'horizontal' | 'vertical';
  /**
   * Number of equal-width columns. Best with `layout="vertical"`.
   * @default 1
   */
  columns?: number;
  /**
   * Label column width (horizontal layout); a `number` is pixels.
   * @default 8.25rem horizontal, auto vertical
   */
  labelWidth?: string | number;
  /** Label text alignment. Defaults to `right` in horizontal layout, `left` otherwise. */
  labelAlign?: TableCardAlign;
  /** Value text alignment. Defaults to `right` in horizontal layout, `left` otherwise. */
  valueAlign?: TableCardAlign;
  /**
   * Vertical alignment of each label against its value (horizontal layout only).
   * `'center'` keeps the label centred when a value is taller, e.g. a `StatusBadge`.
   * @default start
   */
  rowAlign?: 'start' | 'center';
  /**
   * Padding of the card body (the rows section). Accepts the same values as `Card.Content`:
   * a number in rems, `{ vertical, horizontal }`, or `{ top, right, bottom, left }`.
   * @default 1
   */
  padding?: CardContentPadding;
  /**
   * Vertical gap between rows in the body. Any CSS length (a `number` is pixels).
   * Defaults to the layout gutter in `vertical` layout and the list's compact spacing otherwise.
   */
  rowGap?: string | number;
  /** Class name for the root element. */
  className?: string;
};

export interface TableCardProps extends BreakpointSupport<TableCardBreakpointProps> {
  /** Label / value pairs (one per column) rendered as the card body - a single `<dl>`. */
  rows: TableCardRow[];
  /** Header title. Required for `collapsible`. */
  title?: React.ReactNode;
  /** Secondary line under the title. */
  subtitle?: React.ReactNode;
  /** Trailing header content, e.g. a `StatusBadge`. */
  status?: React.ReactNode;
  /**
   * Heading tag for `title` (for the document outline). The title stays body-sized unless
   * `titleModifiers` is set.
   * @default h3
   */
  titleElement?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Visual size / weight of the title (`Text` modifiers), independent of `titleElement`. */
  titleModifiers?: TextModifiers;
  /**
   * Make the header a toggle that shows / hides the body. Provide a `title` (or, failing that,
   * `ariaLabel`) so the toggle has an accessible name.
   * @default false
   */
  collapsible?: boolean;
  /**
   * Initial open state (uncontrolled). Ignored when `open` is set.
   * @default true
   */
  defaultOpen?: boolean;
  /** Controlled open state. Pair with `onOpenChange`. */
  open?: boolean;
  /** Called with the next open state when the header toggles. */
  onOpenChange?: (open: boolean) => void;
  /** Footer content (e.g. `Button`s), divided from the body. */
  actions?: React.ReactNode;
  /** Emphasised summary / total row after the body, on a muted background. */
  summary?: {
    label: React.ReactNode;
    value: React.ReactNode;
  };
  /**
   * Show a leading checkbox to select the row.
   * @default false
   */
  selectable?: boolean;
  /** Controlled selected state. Pair with `onSelectedChange`. */
  selected?: boolean;
  /**
   * Initial selected state in uncontrolled mode. Ignored when `selected` is provided.
   * @default false
   */
  defaultSelected?: boolean;
  /** Called with the next selected state when the checkbox toggles. */
  onSelectedChange?: (selected: boolean) => void;
  /**
   * Use the smaller 14px label style instead of 16px body.
   * @default false
   */
  smallLabels?: boolean;
  /** Accessible name for the selection checkbox. Defaults to the `table-card.select-row` label. */
  selectionLabel?: string;
  /** Accessible name for the card region. */
  ariaLabel?: string;
  /** Root element id (also wires the collapsible ARIA). Auto-generated when omitted. */
  id?: string;
  /** Extra full-width body content after `rows` (e.g. child row-groups). Collapses with the body. */
  children?: React.ReactNode;
}

/**
 * Layout-specific defaults for the body's `TextGroupList`, applied when the matching prop is omitted.
 * Horizontal: fixed label column, right-aligned text, the list's own compact row gap. Vertical:
 * auto-width left-aligned labels with the layout gutter between rows.
 */
const LAYOUT_DEFAULTS = {
  horizontal: { labelAlign: 'right', valueAlign: 'right', labelWidth: '8.25rem', rowGap: undefined },
  vertical: { labelAlign: 'left', valueAlign: 'left', labelWidth: 'auto', rowGap: 'var(--layout-grid-gutters-16)' },
} as const satisfies Record<
  'horizontal' | 'vertical',
  { labelAlign: TableCardAlign; valueAlign: TableCardAlign; labelWidth: string; rowGap?: string }
>;

const renderValue = (row: TableCardRow): React.ReactNode =>
  row.bold ? (
    <Text element="span" modifiers="bold">
      {row.value}
    </Text>
  ) : (
    row.value
  );

const renderRowLabel = (label: React.ReactNode, small: boolean): React.ReactNode =>
  typeof label === 'string' ? <Label isSmall={small}>{label}</Label> : label;

export const TableCard = (props: TableCardProps): JSX.Element => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const { getLabel } = useLabels();
  const {
    rows,
    title,
    subtitle,
    status,
    titleElement = 'h3',
    titleModifiers,
    collapsible = false,
    defaultOpen = true,
    open,
    onOpenChange,
    actions,
    summary,
    selectable = false,
    selected,
    defaultSelected = false,
    onSelectedChange,
    smallLabels = false,
    selectionLabel = getLabel('table-card.select-row'),
    ariaLabel,
    id: idProp,
    children,
    layout = 'horizontal',
    columns = 1,
    labelWidth,
    labelAlign,
    valueAlign,
    rowAlign = 'start',
    padding = 1,
    rowGap,
    className,
  } = getCurrentBreakpointProps<TableCardProps>(props);

  const isHorizontal = layout === 'horizontal';
  const layoutDefaults = LAYOUT_DEFAULTS[layout];
  const resolvedLabelAlign = labelAlign ?? layoutDefaults.labelAlign;
  const resolvedValueAlign = valueAlign ?? layoutDefaults.valueAlign;
  const resolvedLabelWidth = labelWidth ?? layoutDefaults.labelWidth;
  const resolvedRowGap = rowGap ?? layoutDefaults.rowGap;

  const generatedId = React.useId();
  const id = idProp ?? generatedId;
  const bodyId = `${id}-body`;
  const titleId = `${id}-title`;

  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = collapsible ? (isControlled ? open : internalOpen) : true;

  const handleToggle = () => {
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const [internalSelected, setInternalSelected] = React.useState(defaultSelected);
  const isSelectedControlled = selected !== undefined;
  const isSelected = isSelectedControlled ? selected : internalSelected;

  const handleSelectedChange = (checked: boolean) => {
    if (!isSelectedControlled) setInternalSelected(checked);
    onSelectedChange?.(checked);
  };

  const HeadingTag = titleElement;

  const hasHeader = Boolean(selectable || title || subtitle || status || collapsible);
  const hasActions = Boolean(actions);
  const hasSummary = Boolean(summary);
  const hasChildren = Boolean(children);
  const headerHasSeparator = collapsible ? isOpen || hasActions : selectable;
  const tightenHeaderBottom = isOpen && !headerHasSeparator;
  const bodyHasSeparator = hasSummary || hasActions || hasChildren;
  const summaryHasSeparator = hasActions;
  const titleAsSelectionLabel = selectable && !collapsible && !!title && !subtitle;

  const items: TextGroupListItem[] = rows.map((row) => ({
    label: renderRowLabel(row.label, smallLabels),
    value: renderValue(row),
    ...(row.colSpan ? { colSpan: row.colSpan } : {}),
  }));

  return (
    <Card padding={0} className={cn(styles['tedi-table-card'], className)} aria-label={ariaLabel} id={id}>
      {hasHeader && (
        <Card.Content
          padding={tightenHeaderBottom ? { top: 1, right: 1, bottom: 0, left: 1 } : 1}
          hasSeparator={headerHasSeparator}
          className={cn(styles['tedi-table-card__header'], {
            [styles['tedi-table-card__header--select-title']]: titleAsSelectionLabel,
          })}
        >
          {selectable && (
            <Checkbox
              id={`${id}-select`}
              name={`${id}-select`}
              value="selected"
              label={
                titleAsSelectionLabel ? (
                  <Text
                    element="span"
                    color="primary"
                    modifiers={titleModifiers}
                    id={titleId}
                    className={cn(styles['tedi-table-card__title'], {
                      [styles['tedi-table-card__title--body']]: !titleModifiers,
                    })}
                  >
                    {title}
                  </Text>
                ) : (
                  selectionLabel
                )
              }
              hideLabel={!titleAsSelectionLabel}
              checked={isSelected}
              onChange={(_, checked) => handleSelectedChange(checked)}
            />
          )}
          {collapsible ? (
            <HeadingTag className={styles['tedi-table-card__heading']}>
              <button
                type="button"
                className={styles['tedi-table-card__toggle']}
                aria-expanded={isOpen}
                aria-controls={bodyId}
                aria-label={title ? undefined : ariaLabel}
                onClick={handleToggle}
              >
                <span className={styles['tedi-table-card__title-group']}>
                  {title && (
                    <Text
                      element="span"
                      modifiers={titleModifiers}
                      id={titleId}
                      className={cn(styles['tedi-table-card__title'], {
                        [styles['tedi-table-card__title--body']]: !titleModifiers,
                      })}
                    >
                      {title}
                    </Text>
                  )}
                  {subtitle && (
                    <Text element="span" color="secondary" modifiers="small">
                      {subtitle}
                    </Text>
                  )}
                </span>
                {status && <span className={styles['tedi-table-card__status']}>{status}</span>}
                <Icon
                  name="expand_more"
                  size={24}
                  color="brand"
                  className={cn(styles['tedi-table-card__chevron'], {
                    [styles['tedi-table-card__chevron--open']]: isOpen,
                  })}
                />
              </button>
            </HeadingTag>
          ) : (
            <>
              {(title || subtitle) && !titleAsSelectionLabel && (
                <span className={styles['tedi-table-card__title-group']}>
                  {title && (
                    <Text
                      element={titleElement}
                      modifiers={titleModifiers}
                      id={titleId}
                      className={cn(styles['tedi-table-card__title'], {
                        [styles['tedi-table-card__title--body']]: !titleModifiers,
                      })}
                    >
                      {title}
                    </Text>
                  )}
                  {subtitle && (
                    <Text element="span" color="secondary" modifiers="small">
                      {subtitle}
                    </Text>
                  )}
                </span>
              )}
              {status && <div className={styles['tedi-table-card__status']}>{status}</div>}
            </>
          )}
        </Card.Content>
      )}

      <div
        id={bodyId}
        hidden={collapsible && !isOpen}
        className={cn({ [styles['tedi-table-card__body--has-footer']]: hasActions })}
      >
        <Card.Content padding={padding} hasSeparator={bodyHasSeparator}>
          <TextGroupList
            columns={columns}
            items={items}
            rowGap={resolvedRowGap}
            {...(isHorizontal
              ? {
                  type: 'horizontal' as const,
                  labelAlign: resolvedLabelAlign,
                  valueAlign: resolvedValueAlign,
                  labelWidth: resolvedLabelWidth,
                  rowAlign,
                }
              : {
                  type: 'vertical' as const,
                  labelAlign: 'left' as const,
                  labelWidth: resolvedLabelWidth,
                })}
          />
        </Card.Content>

        {children}

        {hasSummary && (
          <Card.Content padding={1} background="tertiary" hasSeparator={summaryHasSeparator}>
            <TextGroupList
              type="horizontal"
              labelAlign="left"
              valueAlign="right"
              items={[
                {
                  label: summary?.label,
                  value: (
                    <Text element="span" modifiers="bold">
                      {summary?.value}
                    </Text>
                  ),
                },
              ]}
            />
          </Card.Content>
        )}
      </div>

      {hasActions && (
        <Card.Content padding={{ vertical: 0.5, horizontal: 1 }} className={styles['tedi-table-card__actions']}>
          {actions}
        </Card.Content>
      )}
    </Card>
  );
};

TableCard.displayName = 'TableCard';

export default TableCard;
