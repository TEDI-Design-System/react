import { addons } from 'storybook/manager-api';

import tediTheme from './tedi-theme.js';

addons.setConfig({
  theme: tediTheme,
});
