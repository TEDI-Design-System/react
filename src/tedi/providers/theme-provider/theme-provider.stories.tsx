import { Args, Meta } from '@storybook/react';
import { useGlobals } from 'storybook/internal/preview-api';

import StorybookDecorator from '../../../../.storybook/storybook-decorator';
import { Text } from '../../components/base/typography/text/text';
import { Button } from '../../components/buttons/button/button';
import { ThemeProvider } from './theme-provider';

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

const ThemeSwitcher = ({ globals, updateGlobals }: { globals: Args; updateGlobals: (newGlobals: Args) => void }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
      <Text element="p" color={globals.theme === 'dark' ? 'white' : 'primary'}>
        Current theme: {globals.theme}
      </Text>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button onClick={() => updateGlobals({ theme: 'default' })}>Default</Button>
        <Button onClick={() => updateGlobals({ theme: 'dark' })}>Dark</Button>
      </div>
    </div>
  );
};

export const Default = {
  render: () => {
    const [globals, updateGlobals] = useGlobals();

    return (
      <ThemeProvider theme="default">
        <Text element="h3" color={globals.theme === 'dark' ? 'white' : 'primary'}>
          ThemeProvider Example
        </Text>
        <Text element="p" color={globals.theme === 'dark' ? 'white' : 'primary'}>
          Use the buttons below to toggle between default, dark, and RIT themes. The background and text colors should
          update according to the active theme.
        </Text>
        <ThemeSwitcher globals={globals} updateGlobals={updateGlobals} />
        <div style={{ marginTop: '2rem' }}>
          <Button>Primary Button</Button>
          <Button visualType="secondary" style={{ marginLeft: '1rem' }}>
            Secondary Button
          </Button>
        </div>
      </ThemeProvider>
    );
  },

  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};
