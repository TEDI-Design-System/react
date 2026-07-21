import { act, render, renderHook, screen } from '@testing-library/react';

import { Modal } from './modal';
import { useModal, useModalContext } from './modal-context';

import '@testing-library/jest-dom';

const OUTSIDE_ERROR = 'Modal subcomponents must be rendered inside <Modal>.';

const silenceErrors = () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
  return () => spy.mockRestore();
};

describe('useModalContext', () => {
  it('throws a helpful error when called outside a <Modal>', () => {
    const restore = silenceErrors();
    expect(() => renderHook(() => useModalContext())).toThrow(OUTSIDE_ERROR);
    restore();
  });

  it('returns the full floating-ui plumbing inside <Modal>', () => {
    let captured: ReturnType<typeof useModalContext> | null = null;
    const Probe = () => {
      captured = useModalContext();
      return null;
    };

    render(
      <Modal defaultOpen>
        <Modal.Content>
          <Modal.Body>
            <Probe />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    );

    const ctx = captured!;
    expect(ctx).not.toBeNull();
    expect(ctx.open).toBe(true);
    expect(typeof ctx.onOpenChange).toBe('function');
    expect(typeof ctx.reference).toBe('function');
    expect(typeof ctx.floating).toBe('function');
    expect(typeof ctx.getReferenceProps).toBe('function');
    expect(typeof ctx.getFloatingProps).toBe('function');
    expect(typeof ctx.setHasTitle).toBe('function');
    expect(typeof ctx.setHasDescription).toBe('function');
    expect(ctx.context).toBeDefined();
  });
});

describe('useModal', () => {
  it('throws when called outside a <Modal>', () => {
    const restore = silenceErrors();
    expect(() => renderHook(() => useModal())).toThrow(OUTSIDE_ERROR);
    restore();
  });

  it('exposes only the safe public subset', () => {
    let captured: ReturnType<typeof useModal> | null = null;
    const Probe = () => {
      captured = useModal();
      return null;
    };

    render(
      <Modal defaultOpen>
        <Modal.Content>
          <Modal.Header title="Hello" description="World" />
          <Modal.Body>
            <Probe />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    );

    expect(captured).not.toBeNull();
    expect(Object.keys(captured!).sort()).toEqual(['descriptionId', 'labelId', 'onOpenChange', 'open']);
    expect(captured!.open).toBe(true);
    expect(captured!.labelId).toBeTruthy();
    expect(captured!.descriptionId).toBeTruthy();
  });

  it('returns empty `labelId` / `descriptionId` when no Modal.Header is rendered', () => {
    let captured: ReturnType<typeof useModal> | null = null;
    const Probe = () => {
      captured = useModal();
      return null;
    };

    render(
      <Modal defaultOpen>
        <Modal.Content aria-label="No header here">
          <Modal.Body>
            <Probe />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    );

    expect(captured!.labelId).toBe('');
    expect(captured!.descriptionId).toBe('');
  });

  it('lets consumers toggle the modal via `onOpenChange`', () => {
    const onToggle = jest.fn();
    let captured: ReturnType<typeof useModal> | null = null;
    const Probe = () => {
      captured = useModal();
      return <button onClick={() => captured!.onOpenChange(false)}>close from probe</button>;
    };

    render(
      <Modal defaultOpen onToggle={onToggle}>
        <Modal.Content>
          <Modal.Body>
            <Probe />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    );

    expect(captured!.open).toBe(true);
    act(() => {
      captured!.onOpenChange(false);
    });
    expect(onToggle).toHaveBeenCalledWith(false);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
