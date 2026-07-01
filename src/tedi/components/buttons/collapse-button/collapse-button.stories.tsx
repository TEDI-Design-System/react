import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

import { Text, TextProps } from '../../base/typography/text/text';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { CollapseButton, CollapseButtonProps } from './collapse-button';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.49.74?node-id=15433-138256&m=dev" target="_BLANK">Figma ↗</a>
 *
 * Standalone button that toggles between open and closed states.
 * The parent owns the `open` state and listens to `onOpenChange`.
 */

const meta: Meta<typeof CollapseButton> = {
  component: CollapseButton,
  title: 'TEDI-Ready/Components/Buttons/CollapseButton',
  parameters: {
    status: {
      type: ['devComponent'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.49.74?node-id=15433-138256&m=dev',
    },
  },
  args: {
    hideText: false,
    arrowType: 'default',
    size: 'default',
    inverted: false,
    underline: true,
    open: false,
  },
};

export default meta;

export const Default: StoryObj<typeof CollapseButton> = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<CollapseButtonProps>();
    return <CollapseButton {...args} onOpenChange={(open) => updateArgs({ open })} />;
  },
};

const pseudoStates = ['Default', 'Hover', 'Active', 'Focus'] as const;

const PSEUDO_PARAMS = {
  pseudo: {
    hover: '#Hover',
    active: '#Active',
    focusVisible: '#Focus',
  },
};

type StatesArgs = Pick<
  CollapseButtonProps,
  'openText' | 'closeText' | 'hideText' | 'arrowType' | 'inverted' | 'underline'
> & {
  'aria-label'?: string;
  titleColor?: TextProps['color'];
  hideSizes?: boolean;
};

const StatesTemplate: StoryFn<StatesArgs> = (args) => {
  const { titleColor = 'primary', hideSizes = false, ...collapseProps } = args;

  const renderRow = (state: (typeof pseudoStates)[number], size?: 'small') => (
    <Row key={`${state}-${size ?? 'default'}`} cols={5} alignItems="center" gap={2}>
      <Col>
        <Text color={titleColor}>{state}</Text>
      </Col>
      <Col width={4} className="display-flex align-items-center gap-3">
        <CollapseButton {...collapseProps} id={state} size={size ?? 'default'} open={false} />
        <CollapseButton {...collapseProps} id={state} size={size ?? 'default'} open />
      </Col>
    </Row>
  );

  return (
    <>
      <VerticalSpacing.Item size={3}>
        <VerticalSpacing size={1}>
          <Text modifiers="bold" color={titleColor}>
            Default
          </Text>
          {pseudoStates.map((state) => renderRow(state))}
        </VerticalSpacing>
      </VerticalSpacing.Item>

      {!hideSizes && (
        <VerticalSpacing size={1}>
          <Text modifiers="bold" color={titleColor}>
            Small
          </Text>
          {pseudoStates.map((state) => renderRow(state, 'small'))}
        </VerticalSpacing>
      )}
    </>
  );
};

export const States: StoryObj<StatesArgs> = {
  render: StatesTemplate,
  parameters: PSEUDO_PARAMS,
};

export const IconOnly: StoryObj<StatesArgs> = {
  render: StatesTemplate,
  args: {
    hideText: true,
    'aria-label': 'Toggle details',
  },
  parameters: PSEUDO_PARAMS,
};

export const SecondaryButton: StoryObj<StatesArgs> = {
  render: StatesTemplate,
  args: {
    hideText: true,
    arrowType: 'secondary',
    'aria-label': 'Toggle details',
  },
  parameters: PSEUDO_PARAMS,
};

export const WithTextInverted: StoryObj<StatesArgs> = {
  render: StatesTemplate,
  args: {
    inverted: true,
    titleColor: 'white',
  },
  parameters: PSEUDO_PARAMS,
  globals: { backgrounds: { value: 'brand' } },
};

export const IconOnlyInverted: StoryObj<StatesArgs> = {
  render: StatesTemplate,
  args: {
    hideText: true,
    inverted: true,
    titleColor: 'white',
    'aria-label': 'Toggle details',
  },
  parameters: PSEUDO_PARAMS,
  globals: { backgrounds: { value: 'brand' } },
};
