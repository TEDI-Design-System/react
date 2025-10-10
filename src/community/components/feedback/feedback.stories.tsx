import { Meta, StoryFn } from '@storybook/react';

import { Section } from '../../../tedi/components/content/section/section';
import { TextArea } from '../../../tedi/components/form/textarea/textarea';
import TextField from '../../../tedi/components/form/textfield/textfield';
import { Col, Row } from '../../../tedi/components/layout/grid';
import { VerticalSpacing } from '../../../tedi/components/layout/vertical-spacing';
import Button from '../button/button';
import { CardContent, CardHeader } from '../card';
import { Default as LayoutDefault } from '../layout/layout/layout.stories';
import Heading from '../typography/heading/heading';
import Feedback, { FeedbackProps } from './feedback';

/**
 * Feedback component contains everything to render a modal, including the trigger button.<br/>
 * It adds some default props to the trigger and modal and renders the button on the right side for desktop and inline for mobile.<br/>
 * Feedback component should be rendered after the main content to have the correct focus order.
 */
export default {
  title: 'Community/Feedback',
  component: Feedback,
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 700,
      },
    },
  },
} as Meta;

const Template: StoryFn<FeedbackProps> = (args) => {
  const lorem =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias asperiores aspernatur blanditiis cupiditate ea eum explicabo fugiat, id ipsam laudantium molestiae nemo, quae sed similique ut velit veniam, voluptas? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias asperiores aspernatur blanditiis cupiditate ea eum explicabo fugiat, id ipsam laudantium molestiae nemo, quae sed similique ut velit veniam, voluptas?';

  return (
    <VerticalSpacing>
      {Array.from({ length: 10 }, (a, index) => (
        <p key={index}>{lorem}</p>
      ))}
      <Feedback {...args}>
        <CardHeader background="white">
          <Heading modifiers="h4">Feedback</Heading>
        </CardHeader>
        <CardContent>
          <VerticalSpacing>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consequatur culpa, deleniti fugit id
              labore perspiciatis quaerat quas quibusdam recusandae? Aperiam cupiditate doloremque facilis molestiae
              molestias nihil tempore temporibus voluptatibus! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Architecto consequatur culpa, deleniti fugit id labore perspiciatis quaerat quas quibusdam recusandae?
            </p>
            <TextField
              id="subject"
              label="Subject"
              helper={{
                text: '0/200',
              }}
            />
            <TextArea
              id="content"
              label="Content"
              helper={{
                text: '0/4000',
              }}
            />
            <Row justifyContent="end">
              <Col width="auto">
                <Button>Send feedback</Button>
              </Col>
            </Row>
          </VerticalSpacing>
        </CardContent>
      </Feedback>
    </VerticalSpacing>
  );
};

export const Default = {
  render: Template,
  args: {
    triggerProps: {
      children: 'Feedback',
    },
  },
};

export const InLayout = {
  parameters: {
    layout: 'fullscreen',
  },
  render: LayoutDefault.render,
  args: {
    ...LayoutDefault.args,
    children: (
      <Section>
        <Template triggerProps={{ children: 'Feedback' }}>content</Template>
      </Section>
    ),
  },
};
