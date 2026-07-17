import cn from 'classnames';
import {
  Children,
  CSSProperties,
  ElementType,
  isValidElement,
  JSX,
  ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import { Button, ClosingButton, Icon, useLabels } from '../../../../tedi';
import { Resizer } from '../resizer/resizer';
import styles from './left-panel.module.scss';
import LeftPanelContent, { LeftPanelContentProps } from './left-panel-content';
import LeftPanelFooter, { LeftPanelFooterProps } from './left-panel-footer';
import LeftPanelHeader, { LeftPanelHeaderProps } from './left-panel-header';

export type { LeftPanelContentProps, LeftPanelFooterProps, LeftPanelHeaderProps };

const findSlot = (children: ReactNode, type: ElementType): ReactNode => {
  let slot: ReactNode = null;

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === type) {
      slot = child;
    }
  });

  return slot;
};

export interface LeftPanelProps {
  /** Additional class name applied to the panel root. */
  className?: string;
  /** Icon shown on the left of the (blue) header. */
  icon?: ReactNode;
  /** Hide the close button that collapses the panel. */
  hideCloseButton?: boolean;
  /** Hide the reopen button shown when collapsed. */
  hideOpenButton?: boolean;
  /** Uncontrolled initial open state. Ignored when `open` is provided. */
  defaultOpen?: boolean;
  /** Controlled open state. When set, the component does not manage its own state. */
  open?: boolean;
  /** Notified whenever the panel wants to open or close. */
  onOpenChange?: (open: boolean) => void;
  /** Allow the user to drag-resize the panel width. */
  resizable?: boolean;
  /** `LeftPanel.Header`, `LeftPanel.Content` and `LeftPanel.Footer`. */
  children?: ReactNode;
  /** Panel width in pixels. Initial width when resizable, fixed width otherwise. */
  width?: number;
  /** Maximum resize width in pixels. Only applies when resizable. */
  maxWidth?: number;
  /** Minimum resize width in pixels. Only applies when resizable. */
  minWidth?: number;
}

const LeftPanelComponent = ({
  className,
  icon,
  hideCloseButton = false,
  hideOpenButton = false,
  defaultOpen = true,
  open,
  onOpenChange,
  resizable = true,
  children,
  width = 350,
  minWidth = 350,
  maxWidth = 600,
}: LeftPanelProps): JSX.Element | null => {
  const { getLabel } = useLabels();
  const panelId = useId();

  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = isControlled ? open : internalOpen;

  const userToggledRef = useRef(false);
  const expanderRef = useRef<HTMLButtonElement>(null);

  const setOpen = (next: boolean): void => {
    userToggledRef.current = true;

    if (!isControlled) {
      setInternalOpen(next);
    }

    onOpenChange?.(next);
  };

  useEffect(() => {
    if (!userToggledRef.current) {
      return;
    }

    userToggledRef.current = false;

    if (!isOpen && !hideOpenButton) {
      expanderRef.current?.focus();
    }
  }, [isOpen, hideOpenButton]);

  if (!isOpen && hideOpenButton) {
    return null;
  }

  if (!isOpen) {
    return (
      <Button
        ref={expanderRef}
        aria-label={getLabel('leftPanelOpen')}
        aria-expanded={false}
        noStyle
        onClick={() => setOpen(true)}
        className={styles['tedi-left-panel__expander-button']}
      >
        <Icon name="keyboard_double_arrow_right" color="brand" />
      </Button>
    );
  }

  const rootClassName = cn(styles['tedi-left-panel'], className);
  const rootStyle: CSSProperties | undefined = resizable ? undefined : { width };

  const headerSlot = findSlot(children, LeftPanelHeader);
  const contentSlot = findSlot(children, LeftPanelContent);
  const footerSlot = findSlot(children, LeftPanelFooter);

  const headerClassName = cn(styles['tedi-left-panel__header'], {
    [styles['tedi-left-panel__header--rounded']]: !headerSlot,
  });

  const panel = (
    <aside id={panelId} aria-label={getLabel('leftPanel')} className={rootClassName} style={rootStyle}>
      <div className={styles['tedi-left-panel__actions']}>
        <div className={headerClassName}>
          {icon}
          {!hideCloseButton && (
            <ClosingButton
              className={styles['tedi-left-panel__close']}
              color="white"
              onClick={() => setOpen(false)}
              title={getLabel('leftPanelClose')}
              aria-controls={panelId}
              aria-expanded={true}
            />
          )}
        </div>
        {headerSlot}
        {contentSlot}
      </div>
      {footerSlot}
    </aside>
  );

  if (!resizable) {
    return panel;
  }

  return (
    <Resizer minWidth={minWidth} initialWidth={width} maxWidth={maxWidth}>
      {panel}
    </Resizer>
  );
};

LeftPanelComponent.displayName = 'LeftPanel';

export const LeftPanel = Object.assign(LeftPanelComponent, {
  Header: LeftPanelHeader,
  Content: LeftPanelContent,
  Footer: LeftPanelFooter,
});

export default LeftPanel;
