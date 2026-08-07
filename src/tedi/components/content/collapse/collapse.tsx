import cn from 'classnames';
import React from 'react';
import AnimateHeight from 'react-animate-height';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import { usePrint } from '../../../providers/printing-provider/printing-provider';
import { CollapseButton } from '../../buttons/collapse-button/collapse-button';
import { Col, Row, RowProps } from '../../layout/grid';
import Print from '../../misc/print/print';
import styles from './collapse.module.scss';

type CollapseBreakpointProps = {
  /**
   * Whether the collapse should be initially open (uncontrolled mode)
   * This is ignored when `open` and `onToggle` are provided
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Controls the open/closed state of the collapse (controlled mode)
   * Should be used together with `onToggle`
   */
  open?: boolean;
  /**
   * Whether to visually hide the open/close text on the toggle button
   * Useful for icon-only toggles
   * @default false
   */
  hideCollapseText?: boolean;
  /**
   * Additional props to pass to the `Row` component used in the title area
   */
  titleRowProps?: RowProps;
  /**
   * Custom class name for the root element
   */
  className?: string;
  /**
   * Visual style of the toggle chevron, intended for icon-only toggles:
   * `secondary` wraps the chevron in a bordered secondary button, `default` renders a plain arrow.
   * @default default
   */
  arrowType?: 'default' | 'secondary';
  /**
   * Collapse text & icon size
   * @default default
   */
  size?: 'default' | 'small';
  /**
   * Display underline below the title
   * @default true
   */
  underline?: boolean;
  /**
   * Render collapse as icon-only toggle.
   * Icon-only styles are applied ONLY when no title is provided.
   * @default false
   */
  iconOnly?: boolean;
  /**
   * Inverted color palette — flips the link / icon colors to their
   * inverted-surface equivalents (white text + icon), for use on top of dark
   * backgrounds. Pairs with both the with-text and icon-only variants; the
   * secondary-arrow style has no inverted form in the design.
   * @default false
   */
  inverted?: boolean;
  /**
   * Make the whole header row (title included) toggle on click, not just the chevron button.
   * The chevron button stays the keyboard / screen-reader control; this only adds a mouse click
   * target across the row. Clicks on interactive elements inside the title (links, buttons) are
   * ignored, so they keep working.
   * @default false
   */
  fullRowToggle?: boolean;
};

export interface CollapseProps extends BreakpointSupport<CollapseBreakpointProps> {
  /**
   * Unique identifier for the collapse content.
   * Used for ARIA attributes like `aria-controls`.
   */
  id: string;
  /**
   * Content to be displayed inside the collapsible area.
   */
  children: React.ReactNode;
  /**
   * Callback triggered when the collapse is toggled.
   * Use this to update the `open` prop in controlled mode.
   */
  onToggle?: (open: boolean) => void;
  /**
   * The title/header element for the collapsible section.
   * Rendered inside the toggle button.
   */
  title?: JSX.Element;
  /**
   * Text shown on the toggle button when the content is collapsed.
   * Defaults to the result of `getLabel('open')`.
   */
  openText?: string;
  /**
   * Text shown on the toggle button when the content is expanded.
   * Defaults to the result of `getLabel('close')`.
   */
  closeText?: string;
  /**
   * Descriptive label for screen readers (e.g. "Toggle Products submenu")
   * If provided, overrides the default open/close text for the accessible name.
   */
  toggleLabel?: string;
  /**
   * Use Collapse purely as a toggle trigger for content rendered elsewhere.
   *
   * When set, the toggle button's `aria-controls` points at the supplied id
   * instead of Collapse's internal content panel, and the internal panel is
   * **not rendered**. Useful when the disclosed region must live outside
   * Collapse's DOM subtree (e.g. a table row whose details live in a
   * sibling `<tr>`). The consumer is responsible for rendering the target
   * element with the matching `id` and an appropriate `role` (typically
   * `region`).
   *
   * When omitted (default), Collapse renders its own `children` inside a
   * built-in `role="region"` panel.
   */
  controlsId?: string;
}

export const Collapse = (props: CollapseProps): JSX.Element => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const {
    id,
    children,
    className,
    openText,
    closeText,
    hideCollapseText = false,
    title,
    titleRowProps,
    defaultOpen,
    open,
    onToggle,
    arrowType = 'default',
    size = 'default',
    underline = true,
    toggleLabel,
    iconOnly = false,
    controlsId,
    inverted = false,
    fullRowToggle = false,
    ...rest
  } = getCurrentBreakpointProps<CollapseProps>(props);

  const isExternallyControlled = controlsId !== undefined;

  const triggerId = `${id}__trigger`;
  const contentId = `${id}__content`;
  const animateId = `${id}__animate`;

  const [isOpenState, setIsOpen] = React.useState(() => defaultOpen ?? false);
  const isPrint = usePrint();
  const isOpen = isPrint || (open !== undefined ? open : isOpenState);

  const isIconOnly = iconOnly === true && !title;

  const headerRef = React.useRef<HTMLDivElement>(null);

  const handleToggle = (next: boolean): void => {
    setIsOpen(next);
    onToggle?.(next);
  };

  const toggleRef = React.useRef(handleToggle);
  toggleRef.current = handleToggle;
  const isOpenRef = React.useRef(isOpen);
  isOpenRef.current = isOpen;

  React.useEffect(() => {
    const element = headerRef.current;
    if (!fullRowToggle || !element) return undefined;

    const onClick = (event: MouseEvent): void => {
      if ((event.target as HTMLElement).closest('a, button, input, select, textarea, label')) return;
      toggleRef.current(!isOpenRef.current);
    };

    element.addEventListener('click', onClick);
    return () => element.removeEventListener('click', onClick);
  }, [fullRowToggle]);

  const renderContent = (
    <div id={contentId} role="region" aria-labelledby={triggerId} className={styles['tedi-collapse__content']}>
      {children}
    </div>
  );

  return (
    <div data-name="collapse" {...rest} className={cn(styles['tedi-collapse'], className)}>
      <div
        ref={headerRef}
        className={cn(styles['tedi-collapse__header'], {
          [styles['tedi-collapse__header--clickable']]: fullRowToggle,
        })}
      >
        <Row justifyContent="between" alignItems="center" wrap="nowrap" {...titleRowProps}>
          {title && <Col>{title}</Col>}
          <Col width="auto">
            <Print visibility="hide">
              <CollapseButton
                id={triggerId}
                open={isOpen}
                onOpenChange={handleToggle}
                openText={openText}
                closeText={closeText}
                hideText={hideCollapseText || isIconOnly}
                arrowType={arrowType}
                size={size}
                inverted={inverted}
                underline={underline}
                aria-controls={isExternallyControlled ? controlsId : contentId}
                {...(toggleLabel ? { 'aria-label': toggleLabel } : {})}
              />
            </Print>
          </Col>
        </Row>
      </div>

      {!isExternallyControlled &&
        (isPrint ? (
          renderContent
        ) : (
          <AnimateHeight id={animateId} duration={300} height={isOpen ? 'auto' : 0} data-testid="collapse-inner">
            {renderContent}
          </AnimateHeight>
        ))}
    </div>
  );
};

export default Collapse;
