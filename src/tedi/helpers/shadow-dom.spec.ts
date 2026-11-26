import {
  getActiveElementInRoot,
  getBodyOrShadowRoot,
  getElementByIdInRoot,
  getNextFocusable,
  getRootNode,
} from './shadow-dom';

describe('shadow-dom helpers', () => {
  let host: HTMLDivElement;
  let shadowRoot: ShadowRoot;
  let inside: HTMLButtonElement;

  beforeEach(() => {
    host = document.createElement('div');
    document.body.appendChild(host);
    shadowRoot = host.attachShadow({ mode: 'open' });
    inside = document.createElement('button');
    inside.id = 'inside';
    shadowRoot.appendChild(inside);
  });

  afterEach(() => {
    host.remove();
  });

  it('returns the shadow root for a node inside one', () => {
    expect(getRootNode(inside)).toBe(shadowRoot);
  });

  it('returns the document for a node in the light DOM', () => {
    expect(getRootNode(host)).toBe(document);
  });

  it('falls back to the owner document for a detached node', () => {
    expect(getRootNode(document.createElement('div'))).toBe(document);
  });

  it('finds an element by id inside the shadow root, which the document cannot', () => {
    expect(document.getElementById('inside')).toBeNull();
    expect(getElementByIdInRoot(inside, 'inside')).toBe(inside);
  });

  it('returns the focused element inside the shadow root', () => {
    inside.focus();

    expect(document.activeElement).toBe(host);
    expect(getActiveElementInRoot(inside)).toBe(inside);
  });

  it('returns the shadow root as the body replacement inside a shadow root', () => {
    expect(getBodyOrShadowRoot(inside)).toBe(shadowRoot);
  });

  it('returns document.body in the light DOM', () => {
    expect(getBodyOrShadowRoot(host)).toBe(document.body);
  });

  describe('getNextFocusable', () => {
    const selector = 'button';

    it('returns the next matching element in the same root', () => {
      const second = document.createElement('button');
      shadowRoot.appendChild(second);

      expect(getNextFocusable(inside, selector)).toBe(second);
    });

    it('continues after the shadow host when nothing follows in the shadow root', () => {
      const outside = document.createElement('button');
      document.body.appendChild(outside);

      expect(getNextFocusable(inside, selector)).toBe(outside);
      outside.remove();
    });

    it('skips excluded elements', () => {
      const second = document.createElement('button');
      const third = document.createElement('button');
      shadowRoot.append(second, third);

      expect(getNextFocusable(inside, selector, (element) => element === second)).toBe(third);
    });

    it('ignores elements before the node', () => {
      const before = document.createElement('button');
      document.body.insertBefore(before, host);

      expect(getNextFocusable(inside, selector)).toBeUndefined();
      before.remove();
    });

    it('returns undefined when nothing follows', () => {
      expect(getNextFocusable(host, selector)).toBeUndefined();
    });
  });
});
