import { useMergeRefs } from '@floating-ui/react';
import cn from 'classnames';
import React from 'react';

import { Icon } from '../../../tedi/components/base/icon/icon';
import { getElementRef } from '../../../tedi/helpers/get-element-ref';
import { useLabels } from '../../../tedi/providers/label-provider';
import styles from './tooltip.module.scss';
import { TooltipContext } from './tooltip-provider';

export interface TooltipTriggerProps {
  /**
   * The element that opens tooltip.
   */
  children: JSX.Element;
}

/**
 * @deprecated Use `TooltipTrigger` from `@tedi-design-system/react/tedi` instead.
 */
export const TooltipTrigger = (props: TooltipTriggerProps): JSX.Element => {
  const { children } = props;
  const { getLabel } = useLabels();
  const { getReferenceProps, reference, openWith } = React.useContext(TooltipContext);
  const childRef = getElementRef(children);
  const refs = useMergeRefs([reference, childRef]);

  return React.cloneElement(
    children,
    getReferenceProps({
      tabIndex: 0,
      label: children.type === Icon ? getLabel('tooltip.icon-trigger') : undefined,
      ...children.props,
      className: cn(
        styles['tooltip__trigger'],
        { [styles['tooltip__trigger--click']]: openWith === 'click' },
        children.props.className
      ),
      ref: refs,
    })
  );
};

export default TooltipTrigger;
