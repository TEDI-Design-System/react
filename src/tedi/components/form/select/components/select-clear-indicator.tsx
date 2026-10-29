import cn from 'classnames';
import { ClearIndicatorProps } from 'react-select';

import { useLabels } from '../../../../../tedi/providers/label-provider';
import { UnknownType } from '../../../../types/commonTypes';
import ClosingButton from '../../../buttons/closing-button/closing-button';
import Separator from '../../../misc/separator/separator';
import { ISelectOption } from '../select';
import styles from '../select.module.scss';

type ClearIndicatorType = ClearIndicatorProps<ISelectOption> & { isClearIndicatorVisible?: boolean };

export const SelectClearIndicator = ({
  isClearIndicatorVisible,
  innerProps: { ref, ...restInnerProps },
}: ClearIndicatorType) => {
  const { getLabel } = useLabels();

  return isClearIndicatorVisible ? (
    <>
      <ClosingButton
        tabIndex={0}
        ref={ref}
        iconSize={18}
        {...(restInnerProps as UnknownType)}
        className={cn(styles['tedi-select__clear-indicator'], (restInnerProps as UnknownType).className)}
      >
        {getLabel('clear')}
      </ClosingButton>
      <Separator color="primary" axis="vertical" className={styles['tedi-select__separator']} />
    </>
  ) : null;
};
