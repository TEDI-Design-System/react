import cn from 'classnames';
import { useEffect, useState } from 'react';

import { useLabels } from '../../../../providers/label-provider';
import { Heading } from '../../../base/typography/heading/heading';
import Button from '../../../buttons/button/button';
import ClosingButton from '../../../buttons/closing-button/closing-button';
import { Modal, ModalContentProps, useModal } from '../../../overlays/modal';
import { TimePicker, TimePickerProps } from '../../time-picker/time-picker';
import styles from './time-picker-modal.module.scss';

export interface TimePickerModalProps {
  /** Whether the modal is open. Pair with `onOpenChange`. */
  open: boolean;
  /** Fires when the modal opens or closes (e.g. dismiss via backdrop or Escape). */
  onOpenChange: (open: boolean) => void;
  /** Current committed value (HH:mm). Used to seed the draft when the modal opens. */
  value?: string;
  /** Fires with the chosen value when the user clicks "Confirm". Cancel/dismiss do nothing. */
  onConfirm: (value: string) => void;
  /** Forwarded to the inner `TimePicker`. */
  stepMinutes?: TimePickerProps['stepMinutes'];
  /** Forwarded to the inner `TimePicker`. */
  availableTimes?: TimePickerProps['availableTimes'];
  /** Forwarded to the inner `TimePicker`. */
  gridVariant?: TimePickerProps['gridVariant'];
  /**
   * Extra props spread onto `Modal.Content`, overriding the `size="small"` / `width="xs"` (capped to 312px)
   * defaults (including `fullscreen`). `className` is merged, not replaced, so the internal padding reset survives.
   */
  modalProps?: Omit<ModalContentProps, 'children'>;
  /** Modal title text. Falls back to the `time-field.modal-title` i18n key. */
  title?: string;
}

/**
 * Custom Modal.Header content — replaces the default h3 + default-sized X
 * with an h4 heading and a small `ClosingButton`. Lives inside the modal
 * tree so `useModal()` can wire `labelId` for aria-labelledby and call
 * `onOpenChange(false)` on dismiss.
 */
const TimePickerModalHeader = ({ title }: { title: string }): JSX.Element => {
  const { labelId, onOpenChange } = useModal();
  return (
    <div className={styles['tedi-time-picker-modal__header']}>
      <Heading element="h2" modifiers="h4" id={labelId} className={styles['tedi-time-picker-modal__title']}>
        {title}
      </Heading>
      <ClosingButton size="small" onClick={() => onOpenChange(false)} />
    </div>
  );
};

export const TimePickerModal = (props: TimePickerModalProps): JSX.Element => {
  const { open, onOpenChange, value, onConfirm, stepMinutes, availableTimes, gridVariant, modalProps, title } = props;
  const { getLabel } = useLabels();
  const resolvedTitle = title ?? getLabel('time-field.modal-title');

  const [draft, setDraft] = useState<string>(value ?? '');

  useEffect(() => {
    if (open) setDraft(value ?? '');
  }, [open, value]);

  const handleConfirm = () => {
    if (draft) onConfirm(draft);
    onOpenChange(false);
  };

  return (
    <Modal open={open} onToggle={onOpenChange}>
      <Modal.Content
        size="small"
        width="xs"
        {...modalProps}
        className={cn(styles['tedi-time-picker-modal'], modalProps?.className)}
      >
        <Modal.Header>
          <TimePickerModalHeader title={resolvedTitle} />
        </Modal.Header>
        <Modal.Body className={styles['tedi-time-picker-modal__body']}>
          <TimePicker
            value={draft}
            stepMinutes={stepMinutes}
            availableTimes={availableTimes}
            gridVariant={gridVariant}
            onChange={setDraft}
            bordered={false}
            className={styles['tedi-time-picker-modal__picker']}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button visualType="secondary" onClick={() => onOpenChange(false)}>
            {getLabel('time-field.cancel')}
          </Button>
          <Button onClick={handleConfirm}>{getLabel('time-field.confirm')}</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

TimePickerModal.displayName = 'TimePickerModal';

export default TimePickerModal;
