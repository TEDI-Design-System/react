import { useMergeRefs } from '@floating-ui/react';
import cn from 'classnames';
import { cloneElement, isValidElement, ReactNode, useContext } from 'react';

import { useLabels } from '../../../providers/label-provider';
import { Icon } from '../../base/icon/icon';
import { OverlayContext } from './overlay';
import styles from './overlay.module.scss';

export interface OverlayTriggerProps {
  /**
   * Content inside trigger.
   */
  children: ReactNode;
  /**
   * Additional class name when children is text.
   */
  className?: string;
}

export const OverlayTrigger = (props: OverlayTriggerProps) => {
  const { children, className } = props;
  const { getLabel } = useLabels();
  const { getReferenceProps, reference, openWith, open, role, ariaHidden, contentId } = useContext(OverlayContext);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childElement = children as any;
  const childRef = childElement?.props?.ref ?? childElement?.ref;
  const refs = useMergeRefs([reference, childRef]);
  const extraProps =
    role === 'tooltip' && !ariaHidden
      ? {
          'aria-describedby': open ? contentId : undefined,
        }
      : {};

  if (isValidElement(children)) {
    return cloneElement(
      children,
      getReferenceProps({
        tabIndex: 0,
        ...extraProps,
        label: children.type === Icon ? getLabel('tooltip.icon-trigger') : undefined,
        ...children.props,
        ref: refs,
      })
    );
  }

  return (
    <div
      {...getReferenceProps({
        ref: refs,
        tabIndex: 0,
        className: cn(
          styles['tedi-overlay__trigger'],
          styles['tedi-overlay__trigger--text'],
          {
            [styles['tedi-overlay__trigger--click']]: openWith === 'click',
          },
          className
        ),
        ...extraProps,
      })}
    >
      {children}
    </div>
  );
};
