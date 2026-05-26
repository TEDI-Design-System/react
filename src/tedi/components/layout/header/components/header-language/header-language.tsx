import cn from 'classnames';
import { useMemo, useState } from 'react';

import { Text } from '../../../../../components/base/typography/text/text';
import { isBreakpointBelow, useBreakpoint, useBreakpointProps } from '../../../../../helpers';
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

export interface HeaderLanguageProps {
  /**
   * List of available languages to display in the selector dropdown.
   * Each language object accepts:
   * - `label` — display text (e.g. 'EST', 'ENG')
   * - `locale` — locale code passed to `setLocale` on selection (ignored when `onClick` is provided)
   * - `onClick` — custom click handler that takes full control of selection behavior
   * - `isSelected` — marks the language as currently active (`aria-current`)
   * - `aria-label` — accessible label for screen readers (e.g. 'Estonian', 'English')
   */
  languages: Language[];
  /** Initially displayed language label. Falls back to the label matching the current locale, or the first item. */
  currentLanguage?: string;
  /** Label for the language selector.
   * Falls back to the default i18n label when not provided.
   **/
  selectLabel?: string;
}

export const HeaderLanguage = (props: HeaderLanguageProps) => {
  const { languages, currentLanguage, selectLabel } = props;
  const [languageSelectionOpen, setLanguageSelectionOpen] = useState(false);
  const { getLabel, setLocale, locale } = useLabels();
  const { getCurrentBreakpointProps } = useBreakpointProps();
  const breakpoint = useBreakpoint();
  const isMobileView = isBreakpointBelow(breakpoint, 'md');
  const { hideLabel } = getCurrentBreakpointProps({
    hideLabel: true,
    lg: { hideLabel: false },
  });
  const displayedLanguage = useMemo(() => {
    if (locale) {
      const found = languages.find((l) => l.locale === locale);
      if (found) return found.label;
    }

    if (currentLanguage) return currentLanguage;
    return languages[0]?.label ?? '';
  }, [languages, locale, currentLanguage]);

  const changeLanguage = (lang: Language) => {
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
      <Text modifiers="small" color="secondary" className={cn({ 'visually-hidden': hideLabel })}>
        {selectLabel ?? getLabel('header.select-lang')}
      </Text>

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
            aria-label={`${selectLabel ?? getLabel('header.select-lang')} ${displayedLanguage}`}
            aria-expanded={languageSelectionOpen}
          >
            <div className={styles['tedi-header-language__selected']}>
              {displayedLanguage}
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
            {languages.map((lang) => (
              <Button
                visualType="link"
                aria-current={lang.isSelected}
                aria-label={lang['aria-label']}
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

HeaderLanguage.displayName = 'HeaderLanguage';

export default HeaderLanguage;
