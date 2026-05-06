import { MultiValueProps } from 'react-select';

import { Tag } from '../../../tags/tag/tag';
import { ISelectOption } from '../select';
import { useSelectTagsContext } from './select-tags-context';

type MultiValueType = MultiValueProps<ISelectOption> & { isTagRemovable?: boolean };

type RemoveProps = MultiValueProps<ISelectOption>['removeProps'];

/**
 * Build the close handler that the rendered Tag passes to its inner button.
 *
 * Click activations forward straight to react-select's `removeProps.onClick`.
 * Keyboard activations (Enter / Space) are also accepted as a defensive
 * fallback for consumers who wire the handler directly to a custom keyboard
 * trigger — Tag itself only invokes `onClose` from its click handler, so the
 * keyboard branch only fires when the handler is reused outside Tag.
 */
export const createMultiValueCloseHandler =
  (
    removeProps: RemoveProps
  ): React.MouseEventHandler<HTMLButtonElement> & React.KeyboardEventHandler<HTMLButtonElement> =>
  (event) => {
    if (event.type === 'click' && removeProps.onClick) {
      removeProps.onClick(event as unknown as React.MouseEvent<HTMLDivElement>);
      return;
    }

    if (event.type === 'keydown') {
      const keyboardEvent = event as React.KeyboardEvent<HTMLButtonElement>;
      if ((keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') && removeProps.onClick) {
        keyboardEvent.preventDefault();
        keyboardEvent.stopPropagation();
        removeProps.onClick(keyboardEvent as unknown as React.MouseEvent<HTMLDivElement>);
      }
    }
  };

export const SelectMultiValue = ({
  isTagRemovable,
  children,
  removeProps,
  ...props
}: MultiValueType): JSX.Element | null => {
  const { isSingleRow, visibleCount } = useSelectTagsContext();

  const selected = (props.selectProps.value as ReadonlyArray<ISelectOption> | null) ?? [];
  const index = Array.isArray(selected) ? selected.findIndex((opt) => opt.value === props.data.value) : -1;
  const isHidden = isSingleRow && visibleCount !== null && index !== -1 && index >= visibleCount;

  const handleClose = createMultiValueCloseHandler(removeProps);

  // Stop the click from bubbling to react-select's control (which would
  // toggle the menu) before forwarding to the remove handler. The wrapping
  // div's onMouseDown also stops propagation, but we keep the click guard on
  // the button itself in case keyboard activation synthesises a click event.
  const handleCloseClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    handleClose(event);
  };

  // Enter/Space activate the close button. preventDefault keeps Space from
  // scrolling the menu list, stopPropagation keeps the activation event from
  // re-opening the menu after the tag is removed.
  const handleCloseKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      handleClose(event);
    }
  };

  if (isHidden) return null;

  return (
    <div onMouseDown={(event) => event.stopPropagation()} data-tedi-tag-index={index}>
      <Tag
        color="primary"
        onClose={isTagRemovable ? handleCloseClick : undefined}
        closeButtonProps={
          isTagRemovable
            ? {
                tabIndex: 0,
                onMouseDown: (event) => event.stopPropagation(),
                onKeyDown: handleCloseKeyDown,
              }
            : undefined
        }
      >
        {children}
      </Tag>
    </div>
  );
};
