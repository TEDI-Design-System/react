import { Controls, Description, Primary, Stories, Subtitle, Title } from '@storybook/addon-docs/blocks';
import { Preview, StoryContext } from '@storybook/react-vite';

import StorybookDecorator from './storybook-decorator';

import '../src/tedi/styles/index.scss';
import '../src/community/styles/index.scss';
import '../node_modules/@tedi-design-system/core/tedi-storybook-styles.scss';
import '../src/community/styles/storybook.scss';

import { PrintingProvider } from '../src/tedi/providers/printing-provider';
import { ThemeProvider } from '../src/tedi/providers/theme-provider/theme-provider';
import { useEffect } from 'react';

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'TEDI theme',
    defaultValue: 'default',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'default', title: 'Default' },
        { value: 'dark', title: 'Dark' },
      ],
      showName: true,
    },
  },
};

export const decorators: Preview['decorators'] = [
  (Story: React.ComponentType, context: StoryContext) => {
    const theme = (context.globals.theme || 'default') as 'default' | 'dark';

    useEffect(() => {
      // The dark surface itself is applied via CSS in preview-head.html, keyed
      // off this class — that beats the backgrounds addon on direct story URLs.
      document.documentElement.classList.remove('tedi-theme--default', 'tedi-theme--dark');
      document.documentElement.classList.add(`tedi-theme--${theme}`);
    }, [theme]);

    return (
      <ThemeProvider theme={theme}>
        <PrintingProvider>
          {context.componentId === 'components-labelprovider' ? (
            <Story />
          ) : (
            <StorybookDecorator>
              <Story />
            </StorybookDecorator>
          )}
        </PrintingProvider>
      </ThemeProvider>
    );
  },
];

const preview: Preview = {
  tags: ['autodocs'],
  initialGlobals: {
    backgrounds: { value: 'default' },
  },
  parameters: {
    viewMode: 'docs',
    backgrounds: {
      options: {
        default: { name: 'default', value: 'var(--color-bg-default)' },
        muted: { name: 'muted', value: 'var(--color-bg-muted)' },
        subtle: { name: 'subtle', value: 'var(--color-bg-subtle)' },
        disabled: { name: 'disabled', value: 'var(--color-bg-disabled)' },
        black: { name: 'black', value: 'var(--color-black)' },
        inverted: { name: 'inverted', value: 'var(--color-bg-inverted)' },
        'inverted-contrast': { name: 'inverted-contrast', value: 'var(--color-bg-inverted-contrast)' },
        brand: { name: 'brand', value: 'var(--tedi-primary-600)' },
      },
    },
    docs: {
      codePanel: true,
      toc: true,
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Description of="story" />
          <Controls />
          <Stories includePrimary={false} />
        </>
      ),
    },
    status: {
      statuses: {
        devComponent: {
          background: '#D2D3D8',
          color: '#000',
          description: 'This component is dev only and not found in Figma',
        },
        breakpointSupport: {
          background: '#308653',
          color: '#ffffff',
          description: 'This component has breakpoint support',
        },
        internalComponent: {
          background: '#fff',
          color: '#000',
          description: 'This component is only used to build other components and not being exported from library',
        },
        ExistsInTediReady: {
          background: '#005aa3',
          color: '#fff',
          description: 'This component has been migrated to TEDI-Ready',
        },
        partiallyTediReady: {
          background: '#9bbb5f',
          color: '#fff',
          description:
            'This component lacks some TEDI-Ready functionality, e.g it may rely on another component that has not yet been developed',
        },
        mobileViewDifference: {
          background: '#99BDDA',
          color: '#000',
          description:
            'This component has a different layout on mobile. Use the mobile breakpoint or resize the browser window to review the mobile design.',
        },
      },
    },
  },
};

export default preview;
