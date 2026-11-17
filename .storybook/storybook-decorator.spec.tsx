import { act, render } from '@testing-library/react';

import { useLabels } from '../src/tedi/providers/label-provider';
import StorybookDecorator, { hasOwnStorybookDecorator } from './storybook-decorator';

describe('StorybookDecorator', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('lang');
  });

  it('sets <html lang> to et by default', () => {
    document.documentElement.lang = 'en';
    render(<StorybookDecorator>content</StorybookDecorator>);

    expect(document.documentElement.lang).toBe('et');
  });

  it('sets <html lang> to the locale prop', () => {
    render(<StorybookDecorator locale="en">content</StorybookDecorator>);

    expect(document.documentElement.lang).toBe('en');
  });

  it('follows locale changes made inside a story', () => {
    let setLocale: ReturnType<typeof useLabels>['setLocale'] = () => undefined;
    const Story = () => {
      setLocale = useLabels().setLocale;
      return null;
    };

    render(
      <StorybookDecorator>
        <Story />
      </StorybookDecorator>
    );
    act(() => setLocale('en'));

    expect(document.documentElement.lang).toBe('en');
  });

  it('lets the LabelProvider story set its own locale', () => {
    expect(hasOwnStorybookDecorator('TEDI-Ready/Providers/LabelProvider')).toBe(true);
    expect(hasOwnStorybookDecorator('TEDI-Ready/Components/Buttons/Button')).toBe(false);
  });
});
