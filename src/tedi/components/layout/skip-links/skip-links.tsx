import cn from 'classnames';

import { useLabels } from '../../../providers/label-provider';
import Link, { LinkProps } from '../../navigation/link/link';
import styles from './skip-links.module.scss';

export type SkipLink = Omit<LinkProps<'a'>, 'as'>;

export interface SkipLinksProps {
  /**
   * Links to landmarks on the page. Each `href` should point to the `id` of an element that exists on the page.
   * Defaults to a single link to `#main-content` labelled with the `skip-links.main-content` label.
   */
  links?: SkipLink[];
  /**
   * Additional class name
   */
  className?: string;
}

// Like the browser's own fragment navigation, so `#%C3%B5ige` finds `id="õige"`.
const decodeId = (id: string) => {
  try {
    return decodeURIComponent(id);
  } catch {
    return id;
  }
};

/**
 * Links that let keyboard users bypass repeated content (WCAG 2.4.1). Hidden until a link receives focus.
 * Render it as the first element on the page, before `Header`.
 */
export const SkipLinks = (props: SkipLinksProps): JSX.Element => {
  const { links, className } = props;
  const { getLabel } = useLabels();

  // Focuses the target directly: an app's <base href="/"> would turn `#id` into a link to the home page.
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.defaultPrevented) return;

    const href = (event.target as Element).closest('a[href^="#"]')?.getAttribute('href');
    const target = href ? document.getElementById(decodeId(href.slice(1))) : null;
    if (!target) return;

    event.preventDefault();

    // A non-interactive target takes focus only to move the Tab start point, so it gets no focus ring.
    if (target.tabIndex < 0) {
      const addedTabIndex = !target.hasAttribute('tabindex');
      if (addedTabIndex) target.setAttribute('tabindex', '-1');
      target.classList.add(styles['tedi-skip-links__target']);
      target.addEventListener(
        'blur',
        () => {
          target.classList.remove(styles['tedi-skip-links__target']);
          if (addedTabIndex) target.removeAttribute('tabindex');
        },
        { once: true }
      );
    }

    target.focus();
  };

  return (
    <div data-name="skip-links" className={cn(styles['tedi-skip-links'], className)} onClick={handleClick}>
      <ul className={styles['tedi-skip-links__list']}>
        {links ? (
          links.map((link, index) => (
            <li key={index}>
              <Link {...link} />
            </li>
          ))
        ) : (
          <li>
            <Link href="#main-content">{getLabel('skip-links.main-content')}</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

SkipLinks.displayName = 'SkipLinks';

export default SkipLinks;
