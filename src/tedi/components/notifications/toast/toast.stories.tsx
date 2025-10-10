import { Controls, Description, Primary, Stories, Subtitle, Title } from '@storybook/blocks';
import { Meta, StoryFn, StoryObj } from '@storybook/react';

import Button from '../../buttons/button/button';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Alert, AlertProps } from '../alert/alert';
import { sendNotification, ToastContainer } from './toast';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4281-58105&m=dev" target="_blank">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/35370f-toast" target="_blank">Zeroheight ↗</a><br/>
 * <a href="?path=/docs/tedi-ready-components-notifications-toast-documentation--docs">Documentation ↗</a> <br/>
 * <a href="https://fkhadra.github.io/react-toastify/introduction" target="_blank">React-Toastify ↗</a>
 */

const meta: Meta<typeof Alert> = {
  component: Alert,
  title: 'TEDI-Ready/Components/Notifications/Toast',
  parameters: {
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4281-58105&m=dev',
    },
    docs: {
      page: () => (
        <>
          <style>{`
            .material-symbols--outlined {
              font-family: 'Material Symbols Outlined', sans-serif !important;
            }
          `}</style>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <Stories includePrimary={false} />
          <ToastContainer />
        </>
      ),
    },
  },
  decorators: [
    (Story, context) => {
      if (context.viewMode === 'docs') {
        return <Story />;
      }
      return (
        <>
          <Story />
          <ToastContainer />
        </>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<AlertProps>;

const Template: StoryFn<AlertProps> = (args) => (
  <>
    <VerticalSpacing>
      <Row>
        <Col lg={12}>
          <Button
            onClick={() =>
              sendNotification({ type: 'success', title: 'Notice', children: 'Something was successful!', ...args })
            }
          >
            Show success toast
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            onClick={() =>
              sendNotification({ type: 'warning', title: 'Notice', icon: 'warning', children: 'Warning!', ...args })
            }
          >
            Show warning toast
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            onClick={() =>
              sendNotification({
                type: 'danger',
                title: 'Notice',
                icon: 'error',
                children: 'Something went wrong!',
                ...args,
              })
            }
          >
            Show danger toast
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            onClick={() =>
              sendNotification({
                type: 'info',
                title: 'Notice',
                icon: 'info',
                children: 'Some info text that can usually be very long!',
                ...args,
              })
            }
          >
            Show info toast
          </Button>
        </Col>
      </Row>
    </VerticalSpacing>
  </>
);

export const Default: Story = {
  render: Template,
  args: {},
};

export const CustomTimerForAutoclose: Story = {
  render: (args) => (
    <VerticalSpacing>
      <Row>
        <Col>
          <Button
            onClick={() =>
              sendNotification(
                { type: 'success', title: '2s Toast', children: 'Closes after 2s', ...args },
                { autoClose: 2000, hideProgressBar: false }
              )
            }
          >
            Auto close in 2s
          </Button>
        </Col>
        <Col>
          <Button
            onClick={() =>
              sendNotification(
                { type: 'info', title: '10s Toast', children: 'Closes after 10s', ...args },
                { autoClose: 10000, hideProgressBar: false }
              )
            }
          >
            Auto close in 10s
          </Button>
        </Col>
      </Row>
    </VerticalSpacing>
  ),
};

export const PersistentToast: Story = {
  render: (args) => (
    <Button
      onClick={() =>
        sendNotification(
          { type: 'warning', title: 'Persistent', children: 'Stays until closed', ...args },
          { autoClose: false }
        )
      }
    >
      Show persistent toast
    </Button>
  ),
};

export const HoverBehavior: Story = {
  render: (args) => (
    <Row>
      <Col>
        <Button
          onClick={() =>
            sendNotification(
              { type: 'info', title: 'Pauses', children: 'Timer stops when hovered', ...args },
              { pauseOnHover: true, autoClose: 4000, hideProgressBar: false }
            )
          }
        >
          Pause on hover
        </Button>
      </Col>
      <Col>
        <Button
          onClick={() =>
            sendNotification(
              { type: 'danger', title: 'No Pause', children: 'Closes even if hovered', ...args },
              { pauseOnHover: false, autoClose: 4000, hideProgressBar: false }
            )
          }
        >
          No pause on hover
        </Button>
      </Col>
    </Row>
  ),
};

/**
 * Key guidelines for developers:
 * 1. Use appropriate ARIA roles:
 *    - role="status" for non-critical notifications (screen readers announce politely).
 *    - role="alert" for critical errors (screen readers announce immediately).
 * 2. Ensure focus is not stolen from user actions; toasts should not interrupt workflow.
 * 3. Ensure toasts can be dismissed or automatically close after a reasonable time.
 *
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/35370f-toast/b/33c51e" target="_BLANK">Accessibility guidelines ↗</a>
 */

export const WCAGCompliance: Story = {
  render: (args) => (
    <Row>
      <Col>
        <Button
          onClick={() =>
            sendNotification(
              { type: 'success', title: 'Success', children: 'Screen reader friendly', role: 'status', ...args },
              { autoClose: 5000, hideProgressBar: false }
            )
          }
        >
          Success (role=status)
        </Button>
      </Col>
      <Col>
        <Button
          onClick={() =>
            sendNotification(
              {
                type: 'danger',
                title: 'Error',
                children: 'Screen reader alerts immediately',
                role: 'alert',
                ...args,
              },
              { autoClose: 5000, hideProgressBar: false }
            )
          }
        >
          Error (role=alert)
        </Button>
      </Col>
    </Row>
  ),
};
