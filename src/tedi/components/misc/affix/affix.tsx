import cn from 'classnames';
import { ReactNode, useContext } from 'react';
import StickyBox from 'react-sticky-box';

import { LayoutContext } from '../../../../community/components/layout';
import { useElementSize } from '../../../helpers';
import styles from './affix.module.scss';

export type AffixPosition = 0 | 0.5 | 1 | 1.5 | 2 | 'unset';

export interface AffixProps {
  /**
   * Affix children
   */
  children?: ReactNode;
  /**
   * Additional class.
   */
  className?: string;
  /**
   * Position of Affix.
   * @default sticky
   */
  position?: 'sticky' | 'fixed';
  /**
   *  Spacing from the top of the Container.
   * @default 1.5rem
   */
  top?: AffixPosition;
  /**
   *  Spacing from the bottom of the Container.
   * @default unset
   */
  bottom?: AffixPosition;
  /**
   *  Spacing from the left of the Container.
   * @default unset
   */
  left?: AffixPosition;
  /**
   *  Spacing from the right of the Container.
   * @default unset
   */
  right?: AffixPosition;
  /**
   * Determine what element(s) the top/bottom values should be relative to
   * @default ['header']
   */
  relative?: Array<'header'> | 'window';
}

export const Affix = (props: AffixProps): JSX.Element => {
  const { children, relative = ['header'], className, position = 'sticky', top = 1.5, bottom, right, left } = props;
  const { headerBottomElement } = useContext(LayoutContext);
  const headerBottomSize = useElementSize(headerBottomElement);

  const BEM = cn(styles['tedi-affix'], className, styles[`tedi-affix--${position}`], {
    [styles[`tedi-affix--top-${top}`.replace('.', '-')]]: typeof top !== 'undefined' && position === 'fixed',
    [styles[`tedi-affix--bottom-${bottom}`.replace('.', '-')]]: typeof bottom !== 'undefined',
    [styles[`tedi-affix--left-${left}`.replace('.', '-')]]: typeof left !== 'undefined',
    [styles[`tedi-affix--right-${right}`.replace('.', '-')]]: typeof right !== 'undefined',
  });

  if (position === 'fixed') {
    return <div className={BEM}>{children}</div>;
  }

  const topSpacing = (typeof top === 'number' ? top : 0) * 16;
  const offsetTop = relative.includes('header') ? topSpacing + (headerBottomSize?.height || 0) : topSpacing;
  const offsetBottom = (typeof bottom === 'number' ? bottom : 0) * 16;

  return (
    <StickyBox offsetTop={offsetTop} offsetBottom={offsetBottom} className={BEM}>
      {children}
    </StickyBox>
  );
};

export default Affix;
