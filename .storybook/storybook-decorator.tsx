import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import React, { useEffect } from 'react';

import { AccessibilityProvider } from '../src/tedi/providers/accessibility-provider/accessibility-provider';
import { LabelProvider, LabelProviderProps, useLabels } from '../src/tedi/providers/label-provider';

import 'dayjs/locale/et';

dayjs.extend(weekday);

interface StorybookDecoratorProps {
  children: React.ReactNode;
  locale?: LabelProviderProps['locale'];
}

const HtmlLang = () => {
  const { locale } = useLabels();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
};

const StorybookDecorator = ({ children, locale = 'et', ...rest }: StorybookDecoratorProps) => (
  <LabelProvider locale={locale} {...rest}>
    <HtmlLang />
    <AccessibilityProvider>{children}</AccessibilityProvider>
  </LabelProvider>
);

/**
 * Stories that wrap themselves in `StorybookDecorator` with their own locale skip the global one,
 * which would otherwise overwrite `<html lang>` after the inner decorator sets it.
 */
export const hasOwnStorybookDecorator = (title: string) => title.endsWith('/LabelProvider');

export default StorybookDecorator;
