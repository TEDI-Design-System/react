import { getActiveElementInRoot, getBodyOrShadowRoot, getElementByIdInRoot, getRootNode } from './shadow-dom';

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
});
