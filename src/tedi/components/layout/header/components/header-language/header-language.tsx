import cn from 'classnames';
import { useState } from 'react';

import { Text } from '../../../../../components/base/typography/text/text';
import { BreakpointSupport, isBreakpointBelow, useBreakpoint, useBreakpointProps } from '../../../../../helpers';
import { TediLanguage, useLabels } from '../../../../../providers/label-provider';
import { Icon } from '../../../../base/icon/icon';
import Button from '../../../../buttons/button/button';
import Popover from '../../../../overlays/popover/popover';
import styles from './header-language.module.scss';

export interface Language {
  /** Display text shown in the language selector (e.g. 'EST', 'ENG'). */
  label: string;
  /**
   * Locale code for this language. When present, `setLocale` from the LabelProvider
   * is called with this value on selection. Ignored when `onClick` is provided.
   */
  locale?: TediLanguage;
  /**
   * Custom click handler. When provided, it takes full control of what happens on select —
   * the component only updates its displayed label and provides `onToggle` so the handler
   * can decide when to close the popover.
   */
  onClick?: (props: { onToggle: (open: boolean) => void }) => void;
  /** Whether this language is currently active. Used to set `aria-current` on the option. */
  isSelected?: boolean;
  /** Accessible label for screen readers (e.g. 'Estonian', 'English'). */
  'aria-label'?: string;
}

interface HeaderLanguageBreakpointProps {
  /** Whether to hide the "Select language" label text. */
  hideLabel?: boolean;
}

interface HeaderLanguageProps extends BreakpointSupport<HeaderLanguageBreakpointProps> {
  /** List of available languages to display in the selector dropdown. */
  languages: Language[];
  /** Initially displayed language label. Falls back to the label matching the current locale, or the first item. */
  currentLanguage?: string;
}

const HeaderLanguage = (props: HeaderLanguageProps) => {
  const [languageSelectionOpen, setLanguageSelectionOpen] = useState(false);
  const { getLabel, setLocale, locale } = useLabels();
  const { getCurrentBreakpointProps } = useBreakpointProps(props.defaultServerBreakpoint);
  const breakpoint = useBreakpoint();
  const isMobileView = isBreakpointBelow(breakpoint, 'md');
  const { hideLabel } = getCurrentBreakpointProps({
    hideLabel: true,
    lg: { hideLabel: false },
  });
  const availableLanguages: Language[] = props.languages ?? [];

  const initialLabel = (() => {
    if (locale) {
      const found = availableLanguages.find((l) => l.locale === locale);
      if (found) return found.label;
    }

    if (props.currentLanguage) return props.currentLanguage;
    return availableLanguages[0]?.label ?? '';
  })();

  const [language, setLanguage] = useState(initialLabel);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang.label);

    if (lang.onClick) {
      lang.onClick({ onToggle: setLanguageSelectionOpen });
      return;
    }

    setLanguageSelectionOpen(false);

    if (lang.locale && setLocale) {
      setLocale(lang.locale);
    }
  };

  return (
    <div
      className={cn(styles['tedi-header-language'], {
        [styles['tedi-header-language__mobile']]: isMobileView,
      })}
    >
      {!hideLabel && (
        <Text modifiers="small" color="secondary">
          {getLabel('header.select-lang')}
        </Text>
      )}

      <Popover
        placement="bottom"
        open={languageSelectionOpen}
        onToggle={() => setLanguageSelectionOpen((prev) => !prev)}
        withBorder={true}
      >
        <Popover.Trigger>
          <Button
            visualType="link"
            underline={false}
            aria-label={`${getLabel('header.select-lang')} ${language}`}
            aria-expanded={languageSelectionOpen}
          >
            <div className={styles['tedi-header-language__selected']}>
              {language}
              <Icon
                name="expand_more"
                size={16}
                className={cn(styles['tedi-header-language__icon'], {
                  [styles['tedi-header-language__icon--open']]: languageSelectionOpen,
                })}
              />
            </div>
          </Button>
        </Popover.Trigger>
        <Popover.Content width="none">
          <div className={styles['tedi-header-language__list']}>
            {availableLanguages.map((lang) => (
              <Button
                visualType="link"
                aria-current={lang.isSelected}
                key={lang.label}
                underline={false}
                onClick={() => changeLanguage(lang)}
              >
                {lang.label}
              </Button>
            ))}
          </div>
        </Popover.Content>
      </Popover>
    </div>
  );
};

export default HeaderLanguage;
