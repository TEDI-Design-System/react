import { Meta, StoryFn } from '@storybook/react';

import StorybookDecorator from '../../../../.storybook/storybook-decorator';
import { Text } from '../../components/base/typography/text/text';
import { Button } from '../../components/buttons/button/button';
import { ThemeProvider, useTheme } from './theme-provider';

export default {
  title: 'TEDI-Ready/Providers/ThemeProvider/ThemeProvider',
  component: ThemeProvider,
  decorators: [
    (Story, options) => {
      return (
        <StorybookDecorator {...options.args}>
          <Story />
        </StorybookDecorator>
      );
    },
  ],
} as Meta<typeof ThemeProvider>;

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
      <Text element="p">Current theme: {theme}</Text>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button onClick={() => setTheme('default')}>Default</Button>
        <Button onClick={() => setTheme('dark')}>Dark</Button>
      </div>
    </div>
  );
};

const Template: StoryFn = () => {
  return (
    <ThemeProvider theme="default">
      <Text element="h3">ThemeProvider Example</Text>
      <Text element="p">
        Use the buttons below to toggle between default, dark, and RIT themes. The background and text colors should
        update according to the active theme.
      </Text>
      <ThemeSwitcher />
      <div style={{ marginTop: '2rem' }}>
        <Button>Primary Button</Button>
        <Button visualType="secondary" style={{ marginLeft: '1rem' }}>
          Secondary Button
        </Button>
      </div>
    </ThemeProvider>
  );
};

export const Default = {
  render: Template,

  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};
