import { StorybookConfig } from '@storybook/react-vite';
import { join } from 'path';
import { withoutVitePlugins } from '@storybook/builder-vite';

const config: StorybookConfig = {
  stories: [
    '../src/tedi/docs/_welcome.mdx',
    '../src/tedi/docs/getStarted.mdx',
    '../src/tedi/docs/changelog.mdx',
    '../src/tedi/docs/_badges.mdx',
    '../src/tedi/docs/colors/tedi-colors.mdx',
    '../src/community/docs/scale-layout/spacing.mdx',
    '../src/community/docs/scale-layout/grid.mdx',
    '../src/tedi/**/**/*.stories.tsx',
    '../src/tedi/**/**/*.mdx',
    '../src/community/**/**/*.stories.tsx',
    '../src/community/**/**/*.mdx',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-designs',
    '@avalane/storybook-addon-status',
    'storybook-addon-pseudo-states',
  ],
  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true,
  },
  staticDirs: ['../public'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: true,
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
    },
  },
  async viteFinal(config, { configType }) {
    return {
      ...config,
      define: {
        'process.env.JEST_WORKER_ID': JSON.stringify(process.env.JEST_WORKER_ID),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      },
      publicDir: join(__dirname, '../public'),
      plugins: await withoutVitePlugins(
        [config.plugins],
        ['vite:dts']
      ),
    };
  },
};

export default config;
