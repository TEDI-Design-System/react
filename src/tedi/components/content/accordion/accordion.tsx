import cn from 'classnames';
import React from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import styles from './accordion.module.scss';
import { AccordionContext, AccordionContextValue } from './accordion-context';
import { AccordionItem } from './accordion-item/accordion-item';

type AccordionBreakpointProps = {
  /**
   * Additional class.
   */
  className?: string;
  /**
   * Whether the accordion allows multiple items to be expanded at the same time.
   * If false, opening one item will collapse the others automatically.
   * @default false
   */
  allowMultiple?: boolean;
  /**
   * Group-level default for items' initial expanded state. Sets the initial
   * `defaultExpanded` for every child `Accordion.Item` that doesn't specify
   * its own. Per-item `defaultExpanded` (including an explicit `false`)
   * takes precedence.
   *
   * Typically combined with `allowMultiple` to start with all items open.
   * @default false
   */
  defaultExpanded?: boolean;
  /**
   * Vertical gap between sibling `Accordion.Item` components in rem
   * Accepts any number, not limited to a fixed scale.
   *
   * Forwarded as the `--tedi-accordion-item-gap` CSS variable, so consumers
   * can also override it from any ancestor class — or set a px value there
   * directly when an exact-pixel override is needed.
   *
   * When omitted, falls back to the design-token default
   * (`var(--layout-grid-gutters-08)` = 0.5rem).
   */
  itemGap?: number;
};

export interface AccordionProps extends BreakpointSupport<AccordionBreakpointProps> {
  /**
   * Accordion content. Should be one or more `AccordionItem` components.
   */
  children?: React.ReactNode;
}

const AccordionComponent = (props: AccordionProps): JSX.Element => {
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const {
    children,
    className,
    allowMultiple = false,
    defaultExpanded = false,
    itemGap,
    ...rest
  } = getCurrentBreakpointProps<AccordionProps>(props);

  const inlineStyle =
    itemGap !== undefined ? ({ '--tedi-accordion-item-gap': `${itemGap}rem` } as React.CSSProperties) : undefined;

  const itemsRef = React.useRef<Map<string, (value: boolean) => void>>(new Map());
  const allowMultipleRef = React.useRef(allowMultiple);
  allowMultipleRef.current = allowMultiple;

  const register = React.useCallback<AccordionContextValue['register']>((id, setExpanded) => {
    itemsRef.current.set(id, setExpanded);
    return () => {
      itemsRef.current.delete(id);
    };
  }, []);

  const notifyExpanded = React.useCallback<AccordionContextValue['notifyExpanded']>((activeId) => {
    if (allowMultipleRef.current) {
      return;
    }
    itemsRef.current.forEach((setExpanded, id) => {
      if (id !== activeId) {
        setExpanded(false);
      }
    });
  }, []);

  const contextValue = React.useMemo<AccordionContextValue>(
    () => ({
      allowMultiple,
      defaultExpanded,
      notifyExpanded,
      register,
    }),
    [allowMultiple, defaultExpanded, notifyExpanded, register]
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <div
        data-name="accordion"
        data-testid="tedi-accordion"
        {...rest}
        className={cn(styles['tedi-accordion'], className)}
        style={inlineStyle}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

AccordionComponent.displayName = 'Accordion';

export const Accordion = Object.assign(AccordionComponent, {
  Item: AccordionItem,
});

export default Accordion;
