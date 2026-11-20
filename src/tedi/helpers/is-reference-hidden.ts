/**
 * Floating content renders in a portal, so it does not disappear with a hidden trigger. The trigger is hidden when it
 * has no box and an ancestor is `display: none` (a `display: contents` element has no box either, but it is not hidden).
 */
export const isReferenceHidden = (reference: unknown): boolean => {
  if (!(reference instanceof Element) || reference.getClientRects().length > 0) return false;

  for (let node: Element | null = reference; node; node = node.parentElement) {
    if (getComputedStyle(node).display === 'none') return true;
  }

  return false;
};
