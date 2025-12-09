import cn from 'classnames';
import React from 'react';
import AnimateHeight from 'react-animate-height';

import { BreakpointSupport, useBreakpointProps, usePrint } from '../../../helpers';
import { useLabels } from '../../../providers/label-provider';
import { Icon } from '../../base/icon/icon';
import { Text } from '../../base/typography/text/text';
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
  /*
   * Display toggle arrow as default or secondary button style
   */
  arrowType?: 'default' | 'secondary';
  /**
   * Collapse text & icon size
   * @default default
   */
  size?: 'default' | 'small';
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
}

export const Collapse = (props: CollapseProps): JSX.Element => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const { getLabel } = useLabels();
  const {
    id,
    children,
    className,
    openText = getLabel('open'),
    closeText = getLabel('close'),
    hideCollapseText = false,
    title,
    titleRowProps,
    defaultOpen,
    open,
    onToggle,
    arrowType = 'default',
    size = 'default',
    ...rest
  } = getCurrentBreakpointProps<CollapseProps>(props);

  const triggerId = `${id}__trigger`;
  const labelId = `${id}__label`;
  const contentId = `${id}__content`;
  const animateId = `${id}__animate`;

  const [isOpenState, setIsOpen] = React.useState(() => defaultOpen);
  const isPrint = usePrint();

  const isOpen = React.useMemo(
    () => isPrint || (open !== undefined ? open : isOpenState),
    [isPrint, open, isOpenState]
  );

  const CollapseBEM = cn(
    styles['tedi-collapse'],
    size === 'small' && styles['tedi-collapse--small'],
    isOpen && styles['tedi-collapse--is-open'],
    hideCollapseText && styles['tedi-collapse--iconOnly'],
    styles[`tedi-collapse--arrow-${arrowType}`],
    className
  );

  const handleClick = () => {
    const newOpenState = !isOpen;
    setIsOpen(newOpenState);
    onToggle?.(newOpenState);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) {
      e.preventDefault();
      handleClick();
    }
  };

  const renderContent = React.useMemo(
    () => (
      <div id={contentId} className={styles['tedi-collapse__content']}>
        {children}
      </div>
    ),
    [children, contentId]
  );

  return (
    <div data-name="collapse" {...rest} className={CollapseBEM}>
      <button
        id={triggerId}
        type="button"
        data-name="collapse-trigger"
        className={styles['tedi-collapse__title']}
        aria-labelledby={labelId}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
      >
        <Row justifyContent="between" alignItems="center" wrap="nowrap" {...titleRowProps} element="span">
          {title && <Col aria-hidden="true">{title}</Col>}
          <Col width="auto">
            <Row element="span" alignItems="center" gutter={0}>
              <Print visibility="hide">
                <Col width="auto" className={cn({ 'visually-hidden': hideCollapseText })}>
                  <Text element="span" className={cn(styles['tedi-collapse__text'])} id={labelId}>
                    {isOpen ? closeText : openText}
                  </Text>
                </Col>
              </Print>
              <Col width="auto">
                <div
                  className={cn(
                    styles['tedi-collapse__icon-wrapper'],
                    styles[`tedi-collapse__icon-wrapper--${arrowType}`],
                    size === 'small' && styles['tedi-collapse__icon-wrapper--small']
                  )}
                >
                  <Icon
                    className={cn(
                      styles['tedi-collapse__icon'],
                      styles[`tedi-collapse__icon--${arrowType}`],
                      size === 'small' && styles['tedi-collapse__icon--small']
                    )}
                    name="expand_more"
                    size={size === 'small' || arrowType === 'secondary' ? 18 : 24}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </button>

      {isPrint ? (
        renderContent
      ) : (
        <AnimateHeight id={animateId} duration={300} height={isOpen ? 'auto' : 0} data-testid="collapse-inner">
          {renderContent}
        </AnimateHeight>
      )}
    </div>
  );
};

export default Collapse;
