import { Controls, Description, Primary, Stories, Subtitle, Title } from '@storybook/blocks';
import { Preview, StoryContext } from '@storybook/react';

import StorybookDecorator from './storybook-decorator';

import '../src/tedi/styles/index.scss';
import '../src/community/styles/index.scss';
import '../node_modules/@tedi-design-system/core/tedi-storybook-styles.scss';
import '../src/community/styles/storybook.scss';

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
      document.documentElement.classList.remove('tedi-theme--default', 'tedi-theme--dark');
      document.documentElement.classList.add(`tedi-theme--${theme}`);
      
      updateAllCanvasBackgrounds(theme);
    }, [theme]);

    const updateAllCanvasBackgrounds = (currentTheme: string) => {
      const backgroundColor = getBackgroundColor(currentTheme);
      const canvases = document.querySelectorAll('.sb-show-main, .docs-story > div');
      
      canvases.forEach((canvas) => {
        const element = canvas as HTMLElement;
        element.style.backgroundColor = backgroundColor;
        element.style.transition = 'background-color 0.3s ease';
      });

      const storyPreviews = document.querySelectorAll('[data-story="true"], .sbdocs-preview');
      storyPreviews.forEach((preview) => {
        const element = preview as HTMLElement;
        element.style.backgroundColor = backgroundColor;
      });
    };

    const getBackgroundColor = (currentTheme: string): string =>  currentTheme === 'dark' ? 'var(--color-bg-inverted)' : '';

    return (
      <ThemeProvider theme={theme}>
        {context.componentId === 'components-labelprovider' ? (
          <Story />
        ) : (
          <StorybookDecorator>
            <Story />
          </StorybookDecorator>
        )}
      </ThemeProvider>
    );
  },
];


const preview: Preview = {
  parameters: {
    viewMode: 'docs',
    backgrounds: {
      default: 'default',
      values: [
        { name: 'default', value: 'var(--color-bg-default)' },
        { name: 'muted', value: 'var(--color-bg-muted)' },
        { name: 'subtle', value: 'var(--color-bg-subtle)' },
        { name: 'disabled', value: 'var(--color-bg-disabled)' },
        { name: 'black', value: 'var(--color-black)' },
        { name: 'inverted', value: 'var(--color-bg-inverted)' },
        { name: 'inverted-contrast', value: 'var(--color-bg-inverted-contrast)' },
        { name: 'brand', value: 'var(--tedi-primary-600)' },
      ],
    },
    docs: {
      toc: true,
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
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