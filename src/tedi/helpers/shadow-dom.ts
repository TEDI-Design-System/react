/**
 * Returns the root the node lives in: the `ShadowRoot` when it is inside a Shadow DOM, otherwise the `Document`.
 * Use it instead of `document` so element lookups and the active element work inside a shadow root.
 */
export const getRootNode = (node: Node): Document | ShadowRoot => {
  const root = node.getRootNode();

  if (root.nodeType === Node.DOCUMENT_NODE || root.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
    return root as Document | ShadowRoot;
  }

  return node.ownerDocument ?? document;
};

/**
 * Finds an element by id in the same root as `node` (the document or its shadow root).
 */
export const getElementByIdInRoot = (node: Node, id: string): HTMLElement | null =>
  getRootNode(node).getElementById(id);

/**
 * Returns the focused element in the same root as `node`. `document.activeElement` returns the shadow host
 * for focus inside a shadow root.
 */
export const getActiveElementInRoot = (node: Node): Element | null => getRootNode(node).activeElement;

/**
 * Returns where to append elements that normally go to `document.body`: the shadow root when `node`
 * is inside one, otherwise the document body.
 */
export const getBodyOrShadowRoot = (node: Node): HTMLElement | ShadowRoot => {
  const root = getRootNode(node);

  if (root.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
    return root as ShadowRoot;
  }

  return (root as Document).body ?? document.body;
};
