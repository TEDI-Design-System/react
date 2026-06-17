import { StorybookConfig } from '@storybook/react-vite';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-designs',
    '@etchteam/storybook-addon-status',
    'storybook-addon-pseudo-states',
    '@chromatic-com/storybook',
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
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
    },
  },
  async viteFinal(config) {
    // Workaround for storybookjs/storybook#33537: with .storybook in a subdirectory,
    // @storybook/addon-docs resolves its MDX provider via import.meta.resolve(), which
    // returns a `file://` URL. Vite's import analysis can't resolve `file://` specifiers,
    // so MDX docs fail to build. Convert them back to plain filesystem paths.
    const fileUrlResolveFix = {
      name: 'tedi-storybook-mdx-file-url-fix',
      enforce: 'pre' as const,
      resolveId(id: string) {
        return id.startsWith('file://') ? fileURLToPath(id) : null;
      },
    };

    // Components read process.env at runtime (e.g. JEST_WORKER_ID to detect the test
    // environment); define them so the browser bundle doesn't hit `process is not defined`.
    return {
      ...config,
      define: {
        ...config.define,
        'process.env.JEST_WORKER_ID': JSON.stringify(process.env.JEST_WORKER_ID),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      },
      publicDir: join(__dirname, '../public'),
      plugins: [fileUrlResolveFix, ...(config.plugins ?? [])],
    };
  },
};

export default config;
