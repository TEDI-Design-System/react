import { createMultiValueCloseHandler } from './select-multi-value';

type AnyEvent = {
  type: string;
  key?: string;
  preventDefault?: jest.Mock;
  stopPropagation?: jest.Mock;
};

const makeEvent = (type: string, key?: string): AnyEvent => ({
  type,
  key,
  preventDefault: jest.fn(),
  stopPropagation: jest.fn(),
});

describe('createMultiValueCloseHandler', () => {
  it('forwards click events to removeProps.onClick', () => {
    const onClick = jest.fn();
    const handler = createMultiValueCloseHandler({ onClick } as never);
    const event = makeEvent('click');
    handler(event as never);
    expect(onClick).toHaveBeenCalledWith(event);
  });

  it('does nothing on click when removeProps.onClick is missing', () => {
    const handler = createMultiValueCloseHandler({} as never);
    const event = makeEvent('click');
    expect(() => handler(event as never)).not.toThrow();
  });

  it('treats Enter as activation and prevents the default + bubbling', () => {
    const onClick = jest.fn();
    const handler = createMultiValueCloseHandler({ onClick } as never);
    const event = makeEvent('keydown', 'Enter');
    handler(event as never);
    expect(onClick).toHaveBeenCalledWith(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('treats Space as activation', () => {
    const onClick = jest.fn();
    const handler = createMultiValueCloseHandler({ onClick } as never);
    const event = makeEvent('keydown', ' ');
    handler(event as never);
    expect(onClick).toHaveBeenCalled();
  });

  it('ignores other keys', () => {
    const onClick = jest.fn();
    const handler = createMultiValueCloseHandler({ onClick } as never);
    const event = makeEvent('keydown', 'a');
    handler(event as never);
    expect(onClick).not.toHaveBeenCalled();
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('ignores keydown when removeProps.onClick is missing', () => {
    const handler = createMultiValueCloseHandler({} as never);
    const event = makeEvent('keydown', 'Enter');
    expect(() => handler(event as never)).not.toThrow();
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('ignores unrelated event types', () => {
    const onClick = jest.fn();
    const handler = createMultiValueCloseHandler({ onClick } as never);
    handler(makeEvent('mousedown') as never);
    expect(onClick).not.toHaveBeenCalled();
  });
});
