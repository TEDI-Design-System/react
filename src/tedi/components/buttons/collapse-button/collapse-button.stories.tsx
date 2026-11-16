import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

import { Text, TextProps } from '../../base/typography/text/text';
import { Card } from '../../content/card';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { CollapseButton, CollapseButtonProps } from './collapse-button';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.49.74?node-id=15433-138256&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/9469bf-collapse-button" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof CollapseButton> = {
  component: CollapseButton,
  title: 'TEDI-Ready/Components/Buttons/CollapseButton',
  parameters: {
    chromatic: { disableSnapshot: true },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.49.74?node-id=15433-138256&m=dev',
    },
  },
  args: {
    openText: 'Ava',
    closeText: 'Sulge',
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
  idPrefix?: string;
};

const StatesTemplate: StoryFn<StatesArgs> = (args) => {
  const { titleColor = 'primary', hideSizes = false, idPrefix, ...collapseProps } = args;
  const getId = (state: string, size: string, open: boolean) =>
    idPrefix ? `${idPrefix}${state}-${size}-${open ? 'open' : 'closed'}` : state;

  const renderRow = (state: (typeof pseudoStates)[number], size?: 'small') => (
    <Row key={`${state}-${size ?? 'default'}`} cols={5} alignItems="center" gap={2}>
      <Col>
        <Text color={titleColor}>{state}</Text>
      </Col>
      <Col width={4} className="flex align-items-center gap-3">
        <CollapseButton
          {...collapseProps}
          id={getId(state, size ?? 'default', false)}
          size={size ?? 'default'}
          open={false}
        />
        <CollapseButton {...collapseProps} id={getId(state, size ?? 'default', true)} size={size ?? 'default'} open />
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
    'aria-label': 'Näita detaile',
  },
  parameters: PSEUDO_PARAMS,
};

export const SecondaryButton: StoryObj<StatesArgs> = {
  render: StatesTemplate,
  args: {
    hideText: true,
    arrowType: 'secondary',
    'aria-label': 'Näita detaile',
    // The secondary style has no small variant in the design.
    hideSizes: true,
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
    'aria-label': 'Näita detaile',
  },
  parameters: PSEUDO_PARAMS,
  globals: { backgrounds: { value: 'brand' } },
};

const visualTestProps: StatesArgs = { openText: 'Ava', closeText: 'Sulge', underline: true };

/** Chromatic snapshot for CollapseButton: add every new visual variant here too. */
export const VisualTest: StoryObj<StatesArgs> = {
  tags: ['!dev', '!autodocs'],
  parameters: {
    chromatic: { disableSnapshot: false },
    pseudo: {
      hover: '[id^="vt-"][id*="-Hover-"]',
      active: '[id^="vt-"][id*="-Active-"]',
      focusVisible: '[id^="vt-"][id*="-Focus-"]',
    },
  },
  render: () => (
    <VerticalSpacing size={2}>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">States</Text>
        <StatesTemplate {...visualTestProps} idPrefix="vt-states-" />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Icon only</Text>
        <StatesTemplate {...visualTestProps} hideText aria-label="Näita detaile" idPrefix="vt-icon-only-" />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Secondary button</Text>
        <StatesTemplate
          {...visualTestProps}
          hideText
          arrowType="secondary"
          aria-label="Näita detaile"
          hideSizes
          idPrefix="vt-secondary-"
        />
      </VerticalSpacing>
      <Card background="brand-primary" borderless>
        <Card.Content>
          <VerticalSpacing size={0.5}>
            <Text modifiers="bold" color="white">
              With text inverted
            </Text>
            <StatesTemplate {...visualTestProps} inverted titleColor="white" idPrefix="vt-inverted-" />
          </VerticalSpacing>
        </Card.Content>
      </Card>
      <Card background="brand-primary" borderless>
        <Card.Content>
          <VerticalSpacing size={0.5}>
            <Text modifiers="bold" color="white">
              Icon only inverted
            </Text>
            <StatesTemplate
              {...visualTestProps}
              hideText
              inverted
              titleColor="white"
              aria-label="Näita detaile"
              idPrefix="vt-icon-only-inverted-"
            />
          </VerticalSpacing>
        </Card.Content>
      </Card>
    </VerticalSpacing>
  ),
};
