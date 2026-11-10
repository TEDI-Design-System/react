import { useMergeRefs } from '@floating-ui/react';
import { cloneElement, isValidElement, ReactNode, Ref, useEffect, useRef } from 'react';

import { getElementRef } from '../../../helpers/get-element-ref';

export interface HashTriggerProps {
  /**
   * HashTrigger content.
   */
  children: ReactNode;
  /**
   * Id, which is passed to first child element/component.<br />
   * Child component has to inject id to DOM itself.<br />
   * Inside a Shadow DOM the child also has to forward its ref to that DOM element, otherwise the element is not found.<br />
   * It's used to detect element on page where to scroll.
   */
  id: string;
  /**
   * Callback called when hash matches.
   */
  onMatch?: (id: string) => void;
  /**
   * Scroll to element on match.
   * @default true
   */
  scrollOnMatch?: boolean;
}

type ChildProps = { id?: string; ref?: Ref<HTMLElement> };

function isInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function getHashArray(): string[] {
  const hash = window.location.hash;

  return hash
    .split('/')
    .filter((i) => i.indexOf('?') !== 0 && i.length !== 1 && i.length !== 0)
    .map((i) => (i.charAt(0) === '#' ? i.substring(1) : i));
}

export const HashTrigger = (props: HashTriggerProps) => {
  const { scrollOnMatch = true, onMatch, id, children } = props;
  const isInitial = useRef(true);
  const elementRef = useRef<HTMLElement | null>(null);
  const childRef = isValidElement(children) ? getElementRef<HTMLElement>(children) : undefined;
  const mergedRef = useMergeRefs<HTMLElement>([elementRef, childRef]);

  useEffect(() => {
    const handleHashChange = () => {
      const hashes = getHashArray();

      if (hashes.indexOf(id) !== -1) {
        if (onMatch) {
          onMatch(id);
        }

        // Falls back to a document lookup for children whose ref is not a DOM element.
        const element = elementRef.current instanceof HTMLElement ? elementRef.current : document.getElementById(id);

        if (scrollOnMatch && element && !isInViewport(element)) {
          element.scrollIntoView(isInitial.current ? { behavior: 'instant' } : { behavior: 'smooth', block: 'center' });
        }
      }
    };

    if (isInitial.current) {
      handleHashChange();
      isInitial.current = false;
    }

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [id, onMatch, scrollOnMatch]);

  if (isValidElement<ChildProps>(children)) {
    return cloneElement(children, { id, ref: mergedRef });
  }

  return (
    <div id={id} ref={mergedRef}>
      {children}
    </div>
  );
};
