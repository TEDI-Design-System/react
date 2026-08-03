import { Placement } from '@floating-ui/react';
import { ReactNode } from 'react';

import { BreakpointSupport, useBreakpointProps } from '../../../helpers';
import { useLabels } from '../../../providers/label-provider';
import InfoButton from '../../buttons/info-button/info-button';
import { OverlayOpenWith } from '../overlay/overlay';
import Tooltip from './tooltip';
import { TooltipContentProps } from './tooltip-content';

interface InfoTooltipBreakpointProps {
  /**
   * Tooltip content shown when the info button is hovered or focused.
   */
  children: ReactNode;
  /**
   * Placement of the tooltip relative to the info button.
   * @default top
   */
  placement?: Placement;
  /**
   * How the tooltip is opened.
   * @default hover
   */
  openWith?: OverlayOpenWith;
  /**
   * Max width of the tooltip content.
   * @default medium
   */
  maxWidth?: TooltipContentProps['maxWidth'];
  /**
   * Info button colour. Use `inverted` on dark or coloured backgrounds.
   * @default default
   */
  color?: 'default' | 'inverted';
  /**
   * Renders the smaller (16px) info button.
   * @default false
   */
  isSmall?: boolean;
  /**
   * Accessible name for the info button.
   * @default the translated "more information" label
   */
  ariaLabel?: string;
}

export type InfoTooltipProps = BreakpointSupport<InfoTooltipBreakpointProps>;

/**
 * An info button that reveals a tooltip on hover/focus — the standard
 * "ⓘ + tooltip" pattern. Bundles `InfoButton` + `Tooltip` so consumers don't
 * have to wire the trigger and content by hand (e.g. next to a form label).
 */
export const InfoTooltip = (props: InfoTooltipProps): JSX.Element => {
  const { getLabel } = useLabels();
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const {
    children,
    placement,
    openWith,
    maxWidth,
    color = 'default',
    isSmall = false,
    ariaLabel,
  } = getCurrentBreakpointProps<InfoTooltipBreakpointProps>(props);

  return (
    <Tooltip placement={placement} openWith={openWith}>
      <Tooltip.Trigger>
        <InfoButton color={color} isSmall={isSmall} aria-label={ariaLabel ?? getLabel('infoButton.moreInformation')} />
      </Tooltip.Trigger>
      <Tooltip.Content maxWidth={maxWidth}>{children}</Tooltip.Content>
    </Tooltip>
  );
};

InfoTooltip.displayName = 'InfoTooltip';

export default InfoTooltip;
