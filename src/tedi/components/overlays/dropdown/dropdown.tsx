import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useInteractions,
  useListNavigation,
  useRole,
} from '@floating-ui/react';
import cn from 'classnames';
import React from 'react';

import { useLabels } from '../../../providers/label-provider';
import styles from './dropdown.module.scss';
import { DropdownContent } from './dropdown-content/dropdown-content';
import { DropdownContext, DropdownContextValue } from './dropdown-context';
import { DropdownItem } from './dropdown-item/dropdown-item';
import { DropdownTrigger } from './dropdown-trigger/dropdown-trigger';

export type DropdownProps = {
  /**
   * Child elements — must include exactly one `Dropdown.Trigger` and one `Dropdown.Content`
   */
  children: React.ReactNode;
  /**
   * When `true`, the dropdown behaves like a modal:
   * - Traps focus inside the dropdown
   * - Shows a visually hidden "Close" button for screen readers
   * - Usually used for menus that require explicit dismissal
   *
   * @default false
   */
  modal?: boolean;
};

export const Dropdown = ({ children, modal = false }: DropdownProps) => {
  const { getLabel } = useLabels();
  const nodeId = useFloatingNodeId();

  const listItemsRef = React.useRef<Array<HTMLButtonElement | null>>([]);
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [content, setContent] = React.useState<React.ReactNode>(null);

  const floating = useFloating({
    placement: 'bottom-start',
    nodeId,
    open,
    onOpenChange: setOpen,
    middleware: [flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const { context, refs, x, y, strategy, placement } = floating;

  const interactions = useInteractions([
    useClick(context),
    useRole(context, { role: 'menu' }),
    useDismiss(context),
    useListNavigation(context, {
      listRef: listItemsRef,
      activeIndex,
      onNavigate: setActiveIndex,
      loop: true,
    }),
  ]);

  const value: DropdownContextValue = {
    open,
    setOpen,
    refs,
    listItemsRef,
    activeIndex,
    setActiveIndex,
    placement,
    content,
    setContent,
    ...interactions,
  };

  return (
    <DropdownContext.Provider value={value}>
      {children}

      <FloatingPortal>
        {open && (
          <FloatingFocusManager
            context={context}
            modal={modal}
            visuallyHiddenDismiss={modal ? getLabel('close') : false}
          >
            <div
              {...interactions.getFloatingProps({
                ref: refs.setFloating,
                className: cn(styles['tedi-dropdown']),
                style: {
                  position: strategy,
                  left: x ?? 0,
                  top: y ?? 0,
                },
                onKeyDown(event) {
                  if (event.key === 'Tab') {
                    setOpen(false);
                  }
                },
              })}
              data-placement={placement}
              data-state={open ? 'open' : 'closed'}
            >
              {content}
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </DropdownContext.Provider>
  );
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.Content = DropdownContent;
Dropdown.Item = DropdownItem;
