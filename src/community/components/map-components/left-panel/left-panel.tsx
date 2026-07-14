import cn from 'classnames';
import { CSSProperties, JSX, ReactNode, useEffect, useId, useRef, useState } from 'react';

import { Button, Icon, useLabels } from '../../../../tedi';
import { Resizer } from '../resizer/resizer';
import styles from './left-panel.module.scss';

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
  /** Content placed in the blue header area, under the icon. */
  header?: ReactNode;
  /** Content placed in the gray footer area. */
  footer?: ReactNode;
  /** Main scrollable content. */
  children?: ReactNode;
  /** Panel width in pixels. Initial width when resizable, fixed width otherwise. */
  width?: number;
  /** Maximum resize width in pixels. Only applies when resizable. */
  maxWidth?: number;
  /** Minimum resize width in pixels. Only applies when resizable. */
  minWidth?: number;
}

export const LeftPanel = ({
  className,
  icon,
  hideCloseButton = false,
  hideOpenButton = false,
  defaultOpen = true,
  open,
  onOpenChange,
  resizable = true,
  header,
  footer,
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
  const closeButtonRef = useRef<HTMLButtonElement>(null);
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

    if (isOpen) {
      closeButtonRef.current?.focus();
    } else {
      expanderRef.current?.focus();
    }
  }, [isOpen]);

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

  const panel = (
    <aside id={panelId} aria-label={getLabel('leftPanel')} className={rootClassName} style={rootStyle}>
      <div className={styles['tedi-left-panel__actions']}>
        <div className={styles['tedi-left-panel__header']}>
          {icon}
          {!hideCloseButton && (
            <Button
              ref={closeButtonRef}
              className={styles['tedi-left-panel__close']}
              onClick={() => setOpen(false)}
              visualType="link"
              aria-label={getLabel('leftPanelClose')}
              aria-controls={panelId}
              aria-expanded={true}
            >
              <Icon name="close" color="white" size={36} />
            </Button>
          )}
        </div>
        <div className={styles['tedi-left-panel__header-controls']}>{header}</div>
        <div className={styles['tedi-left-panel__content-wrapper']}>{children}</div>
      </div>
      {footer && <div className={styles['tedi-left-panel__footer']}>{footer}</div>}
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

LeftPanel.displayName = 'LeftPanel';

export default LeftPanel;
