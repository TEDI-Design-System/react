import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Col, Row } from '../../layout/grid';
import ClosingButton, { ClosingButtonProps } from './closing-button';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4514-63815&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/30df1b-closing-button" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof ClosingButton> = {
  component: ClosingButton,
  title: 'Tedi-Ready/Components/Buttons/ClosingButton',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4514-63815&m=dev',
    },
  },
};

const sizeArray: ClosingButtonProps['size'][] = ['default', 'small'];
const iconSizeArray: ClosingButtonProps['iconSize'][] = [18, 24];

export default meta;
type Story = StoryObj<typeof ClosingButton>;

const SizeTemplate: StoryFn = () => {
  return (
    <div className="example-list">
      {sizeArray.map((size, key) => (
        <Row className={`${key === sizeArray.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <Col className="display-flex w-50">{size}</Col>
          <Col className="display-flex">
            <ClosingButton size={size} onClick={() => alert(`${size} button clicked`)} />
          </Col>
        </Row>
      ))}
    </div>
  );
};

const stateArray = ['Default', 'Hover', 'Active', 'Focus'];

const StatesTemplate: StoryFn = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '200px' }}>
      {stateArray.map((state) => (
        <Row key={state}>
          <Col>
            <b>{state}</b>
          </Col>
          <Col>
            <ClosingButton id={state} />
          </Col>
        </Row>
      ))}
    </div>
  );
};

const IconSizeTemplate: StoryFn = () => {
  return (
    <div className="example-list">
      {iconSizeArray.map((iconSize, key) => (
        <Row className={`${key === iconSizeArray.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <Col className="display-flex w-50">{`${iconSize}px`}</Col>
          <Col className="display-flex">
            <ClosingButton iconSize={iconSize} onClick={() => alert(`${iconSize}px icon clicked`)} className="hover" />
            {iconSize === 24 && (
              <div style={{ marginLeft: '16px' }}>
                <ClosingButton
                  iconSize={iconSize}
                  size="small"
                  onClick={() => alert(`${iconSize}px icon clicked`)}
                  className="hover"
                />
              </div>
            )}
          </Col>
        </Row>
      ))}
    </div>
  );
};

export const Default: Story = {
  args: {
    title: 'close',
  },
};

export const Size: Story = {
  render: SizeTemplate,
};

/**
 * Hover state is shown on all buttons for size preview.
 */
export const IconSizes: Story = {
  render: IconSizeTemplate,
  parameters: {
    pseudo: {
      hover: '.hover',
    },
  },
};

export const States: Story = {
  render: StatesTemplate,
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
};
