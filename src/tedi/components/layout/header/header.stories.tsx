import { useGlobals } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useId, useRef, useState } from 'react';

import Toggle from '../../../../tedi/components/form/toggle/toggle';
import Separator from '../../../../tedi/components/misc/separator/separator';
import { isBreakpointBelow, useBreakpoint } from '../../../helpers';
import { useLabels } from '../../../providers/label-provider';
import { useTheme } from '../../../providers/theme-provider/theme-provider';
import { Icon } from '../../base/icon/icon';
import { Text } from '../../base/typography/text/text';
import { Search } from '../../form/search/search';
import { EmptyState } from '../../misc/empty-state/empty-state';
import Link from '../../navigation/link/link';
import { Tag } from '../../tags/tag/tag';
import { HideAt } from '../hide-at/hide-at';
import { ShowAt } from '../show-at/show-at';
import { SideNav } from '../sidenav';
import { Representative } from './components/header-role/header-role-representatives';
import { Header, HeaderActions, HeaderCenter, HeaderLogo, HeaderLogoProps } from './header';

const STORAGE_KEY = 'tedi-theme';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.70?m=dev&node-id=6380-53060" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/68343d-header" target="_BLANK">Zeroheight ↗</a>
 */
const meta: Meta<typeof Header> = {
  title: 'TEDI-Ready/Layout/Header',
  component: Header,
  subcomponents: {
    'Header.Logo': HeaderLogo,
    'Header.Center': HeaderCenter,
    'Header.Actions': HeaderActions,
    'Header.Language': Header.Language,
    'Header.Login': Header.Login,
    'Header.Logout': Header.Logout,
    'Header.Profile': Header.Profile,
    'Header.Role': Header.Role,
    'Header.Search': Header.Search,
  } as never,
  decorators: [
    (Story) => {
      const [globals, updateGlobals] = useGlobals();
      const originalThemeRef = useRef<string | null>(null);

      useEffect(() => {
        originalThemeRef.current = localStorage.getItem(STORAGE_KEY);

        if (originalThemeRef.current && globals.theme !== originalThemeRef.current) {
          updateGlobals({ theme: originalThemeRef.current });
        }

        return () => {
          if (originalThemeRef.current !== null) {
            localStorage.setItem(STORAGE_KEY, originalThemeRef.current);
          }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      return <Story />;
    },
  ],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.70?m=dev&node-id=6380-53060',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

const languages = [
  {
    'aria-label': 'Estonian',
    label: 'EST',
    locale: 'et' as const,
  },
  {
    'aria-label': 'English',
    label: 'ENG',
    locale: 'en' as const,
  },
  {
    'aria-label': 'Russian',
    label: 'RUS',
    locale: 'ru' as const,
  },
];

const representatives: Representative[] = [
  { id: '1', name: 'Mari Maasikas', description: '49504080934', icon: { name: 'person' } },
  { id: '2', name: 'Juulia Sarapuu', description: 'Peasekretär', icon: { name: 'supervised_user_circle' } },
  { id: '3', name: 'Marta Sarapuu', description: 'Sekretär', icon: { name: 'supervised_user_circle' } },
  { id: '4', name: 'Helgi Sarapuu', description: 'Jurist', icon: { name: 'supervised_user_circle' } },
];

const loggedInNavItems = [
  {
    children: 'Minu andmed',
    icon: 'account_circle',
    subItemGroups: [
      {
        subItems: [
          {
            children: 'Seadistused',
            href: '#',
          },
          {
            children: 'Esindusõigused',
            href: '#',
          },
          {
            children: 'Minu seotud isikud',
            href: '#',
          },
        ],
      },
    ],
  },
  {
    children: 'Minu töölaud',
    icon: 'dashboard',
    href: '#',
  },
  {
    children: 'Vastuvõtud ja saatekirjad',
    icon: 'calendar_today',
    href: '#',
  },
  {
    children: 'Retseptid ja meditsiiniseadmed',
    icon: 'medication',
    href: '#',
  },
  {
    children: 'Minu tervise ajalugu',
    icon: 'history',
    href: '#',
  },
  {
    children: 'Hammaste tervis',
    icon: 'dentistry',
    href: '#',
  },
  {
    children: 'Vaktsineerimine',
    icon: 'vaccines',
    href: '#',
  },
  {
    children: 'Töövõime',
    icon: 'business_center',
    href: '#',
  },
  {
    children: 'Raviarved',
    icon: 'credit_card',
    href: '#',
  },
];

const representatives2 = [{ id: '1', name: 'Mari Maasikas', description: '49504080934' }];

const organizations = [
  { id: 'org-1', name: 'Pärnu linnavolikogu' },
  { id: 'org-2', name: 'Tartu Linnavalitsus' },
];
const organizations2 = [{ id: 'org-2', name: 'Tartu Linnavalitsus' }];

const logo = <img src="header-logo.svg" alt="Logo" />;
const logoDark = <img src="header-logo-white.svg" alt="Logo (Dark Mode)" />;

const profileTranslations = {
  myData: { et: 'Minu andmed', en: 'My data', ru: 'Мои данные' },
  representatives: { et: 'Esindatavad', en: 'Representatives', ru: 'Представители' },
  contacts: { et: 'Kontaktid', en: 'Contacts', ru: 'Контакты' },
  darkMode: { et: 'Tume režiim', en: 'Dark mode', ru: 'Тёмная тема' },
  notifications: { et: 'Riiklikud teated', en: 'Official Notices', ru: 'Государственные уведомления' },
  accessibility: { et: 'Ligipääsetavus', en: 'Accessibility', ru: 'Доступность' },
  home: { et: 'Avaleht', en: 'Home', ru: 'Главная' },
  services: { et: 'Teenused', en: 'Services', ru: 'Услуги' },
  blog: { et: 'Blogi', en: 'Blog', ru: 'Блог' },
  contact: { et: 'Kontakt', en: 'Contact', ru: 'Контакт' },
  organization: { et: 'Asutus', en: 'Organization', ru: 'Организация' },
  personalCode: { et: 'Isikukood', en: 'Personal code', ru: 'Личный код' },
  role: { et: 'Roll', en: 'Role', ru: 'Роль' },
  representative: { et: 'Esindatav', en: 'Representative', ru: 'Представитель' },
} as const;

const ProfileExample = ({ showLogout = true }: { showLogout?: boolean }) => {
  const { theme, setTheme } = useTheme();
  const { locale = 'en' } = useLabels();
  const id = useId();

  const t = (key: keyof typeof profileTranslations) => profileTranslations[key][locale] ?? profileTranslations[key].et;

  const handleToggle = () => {
    setTheme(theme === 'dark' ? 'default' : 'dark');
  };

  return (
    <>
      <Link underline={false} href="#">
        {t('myData')}
      </Link>
      <Link underline={false} href="#">
        {t('representatives')}
      </Link>
      <Link underline={false} href="#">
        {t('contacts')}
      </Link>
      <ShowAt lg>
        <Separator axis="horizontal" />
      </ShowAt>

      <div>
        <Toggle id={id} onChange={handleToggle} label={t('darkMode')} checked={theme === 'dark'} />
      </div>

      <ShowAt lg>
        <Separator axis="horizontal" />
      </ShowAt>
      <Link underline={false} href="#">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--link-inner-spacing-x)' }}>
          <Icon name="notifications" size={16} />
          {t('notifications')}
        </div>
      </Link>
      <ShowAt lg>
        <Separator axis="horizontal" />
      </ShowAt>
      {showLogout && <Header.Logout size="default" href="#" />}
    </>
  );
};

const AccessibilityLink = () => {
  const { locale = 'en' } = useLabels();
  const label = profileTranslations.accessibility[locale] ?? profileTranslations.accessibility.et;

  return (
    <Link underline={false} href="#">
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--link-inner-spacing-x)' }}>
        {label}
        <Icon name="north_east" size={16} />
      </div>
    </Link>
  );
};

const NavigationLinks = () => {
  const { locale = 'en' } = useLabels();
  const pt = (key: keyof typeof profileTranslations) => profileTranslations[key][locale] ?? profileTranslations[key].et;

  return (
    <>
      <Link underline={false} href="#">
        {pt('home')}
      </Link>
      <Link underline={false} href="#">
        {pt('services')}
      </Link>
      <Link underline={false} href="#">
        {pt('blog')}
      </Link>
      <Link underline={false} href="#">
        {pt('contact')}
      </Link>
    </>
  );
};

const NavigationSideNav = ({ isMobileOpen }: { isMobileOpen: boolean }) => {
  const { locale = 'en' } = useLabels();
  const pt = (key: keyof typeof profileTranslations) => profileTranslations[key][locale] ?? profileTranslations[key].et;

  return (
    <SideNav
      ariaLabel="Main navigation"
      linkAs="a"
      isMobileOpen={isMobileOpen}
      navItems={[
        { children: pt('home'), href: '#' },
        { children: pt('services'), href: '#' },
        { children: pt('blog'), href: '#' },
        { children: pt('contact'), href: '#' },
      ]}
    />
  );
};

type StoryTranslateFn = (key: keyof typeof profileTranslations) => string;

const WithTranslations = ({ children }: { children: (t: StoryTranslateFn) => React.ReactNode }) => {
  const { locale = 'en' } = useLabels();
  const t: StoryTranslateFn = (key) => profileTranslations[key][locale] ?? profileTranslations[key].et;
  return <>{children(t)}</>;
};

type StoryWrapperProps = {
  children: (args: { isOpen: boolean; setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => React.ReactNode;
};

const StoryWrapper = ({ children }: StoryWrapperProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return <>{children({ isOpen, setIsOpen })}</>;
};

const SidenavLayout = ({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) => {
  const breakpoint = useBreakpoint();
  const isMobile = isBreakpointBelow(breakpoint, 'lg');
  const fullHeight = isMobile ? isOpen : true;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', ...(fullHeight && { height: '100vh' }) }}>{children}</div>
  );
};

const ResponsiveLogo = (props: HeaderLogoProps) => {
  const query = '(min-width: 420px)';

  const getMatches = () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : true);

  const [show, setShow] = useState(getMatches);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setShow(e.matches);

    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return <Header.Logo {...props} showLogo={show} />;
};

export const Default: Story = {
  render: () => (
    <StoryWrapper>
      {({ isOpen, setIsOpen }) => (
        <div style={{ display: 'flex', flexDirection: 'column', ...(isOpen && { height: '100vh' }) }}>
          <Header toggle={<SideNav.Toggle menuOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />}>
            <Header.Logo logoDark={logoDark} logo={logo} href="#" />
            <ShowAt lg>
              <Header.Center>
                <Link underline={false} href="#">
                  Link text
                </Link>
                <Link underline={false} href="#">
                  Link text
                </Link>
                <Link underline={false} href="#">
                  Link text
                </Link>
              </Header.Center>
            </ShowAt>
            <Header.Actions>
              <Header.Language languages={languages} currentLanguage={languages[0].label} />
              <Separator axis="vertical" />
              <Header.Login href="#" />
            </Header.Actions>
          </Header>

          <HideAt lg>
            <div style={{ display: 'flex', flex: 1 }}>
              <SideNav
                ariaLabel="Main navigation"
                linkAs="a"
                isMobileOpen={isOpen}
                navItems={[
                  {
                    children: 'Link text',
                    href: '#',
                  },
                  {
                    children: 'Link text',
                    href: '#',
                  },
                  {
                    children: 'Link text',
                    href: '#',
                  },
                ]}
              />
            </div>
          </HideAt>
        </div>
      )}
    </StoryWrapper>
  ),
};

export const LoggedOut: Story = {
  render: () => (
    <StoryWrapper>
      {({ isOpen, setIsOpen }) => (
        <div style={{ display: 'flex', flexDirection: 'column', ...(isOpen && { height: '100vh' }) }}>
          <Header toggle={<SideNav.Toggle menuOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />}>
            <Header.Logo logoDark={logoDark} logo={logo} />

            <ShowAt lg>
              <Header.Center>
                <Link underline={false} href="#">
                  Link text
                </Link>
                <Link underline={false} href="#">
                  Link text
                </Link>
                <Link underline={false} href="#">
                  Link text
                </Link>
                <Link underline={false} href="#">
                  Link text
                </Link>
                <Link underline={false} href="#">
                  Link text
                </Link>
              </Header.Center>
            </ShowAt>

            <Header.Actions>
              <Header.Language languages={languages} currentLanguage={languages[0].label} />
              <Separator axis="vertical" />
              <Header.Login href="#" />
            </Header.Actions>
          </Header>

          <HideAt lg>
            <div style={{ display: 'flex', flex: 1 }}>
              <SideNav
                ariaLabel="Main navigation"
                linkAs="a"
                isMobileOpen={isOpen}
                navItems={[
                  {
                    children: 'Link text',
                    href: '#',
                  },
                  {
                    children: 'Link text',
                    href: '#',
                  },
                  {
                    children: 'Link text',
                    href: '#',
                  },
                  {
                    children: 'Link text',
                    href: '#',
                  },
                  {
                    children: 'Link text',
                    href: '#',
                  },
                ]}
              />
            </div>
          </HideAt>
        </div>
      )}
    </StoryWrapper>
  ),
};

export const LoggedOutWithSearch: Story = {
  render: () => (
    <StoryWrapper>
      {({ isOpen, setIsOpen }) => (
        <div style={{ display: 'flex', flexDirection: 'column', ...(isOpen && { height: '100vh' }) }}>
          <Header toggle={<SideNav.Toggle menuOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />}>
            <ResponsiveLogo logoDark={logoDark} logo={logo} />

            <ShowAt lg>
              <Header.Center alignment="space-between">
                <div>
                  <NavigationLinks />
                </div>
                <Header.Search>
                  <div style={{ width: '100%', maxWidth: '22.5rem' }}>
                    <Search label="search-1" hideLabel id="search-1" />
                  </div>
                </Header.Search>
              </Header.Center>
            </ShowAt>

            <Header.Actions>
              <HideAt lg>
                <Header.Search>
                  <Search label="search-1" hideLabel id="search-1" />
                </Header.Search>
                <Separator axis="vertical" />
              </HideAt>
              <Header.Language languages={languages} />
              <Separator axis="vertical" />
              <Header.Login href="#" />
            </Header.Actions>
          </Header>

          <HideAt lg>
            <div style={{ display: 'flex', flex: 1 }}>
              <NavigationSideNav isMobileOpen={isOpen} />
            </div>
          </HideAt>
        </div>
      )}
    </StoryWrapper>
  ),
};

export const LoggedIn: Story = {
  render: () => (
    <WithTranslations>
      {(t) => (
        <Header>
          <Header.Logo logoDark={logoDark} logo={logo} />
          <Header.Actions>
            <ShowAt lg>
              <AccessibilityLink />
              <Separator axis="vertical" />
              <Header.Role
                showSearch
                label={
                  <Text modifiers={['small', 'bold']} color="secondary">
                    {t('role')}:
                  </Text>
                }
                representatives={representatives}
              />
              <Separator axis="vertical" />
            </ShowAt>
            <Header.Language languages={languages} />
            <Separator axis="vertical" />
            <Header.Profile>
              <HideAt lg>
                <Header.Role
                  showSearch
                  label={
                    <Text modifiers="bold" color="secondary">
                      {t('role')}:
                    </Text>
                  }
                  representatives={representatives}
                />
                <AccessibilityLink />
              </HideAt>
              <ProfileExample />
            </Header.Profile>
          </Header.Actions>
        </Header>
      )}
    </WithTranslations>
  ),
};

export const LoggedInWithTagLabel: Story = {
  render: () => (
    <WithTranslations>
      {(t) => (
        <Header>
          <Header.Logo logoDark={logoDark} logo={logo} />
          <Header.Actions>
            <ShowAt lg>
              <AccessibilityLink />
              <Separator axis="vertical" />
              <Header.Role
                showSearch
                label={<Tag>{t('representative')}</Tag>}
                showDescription={false}
                representatives={representatives}
              />
              <Separator axis="vertical" />
            </ShowAt>
            <Header.Language languages={languages} />
            <Separator axis="vertical" />
            <Header.Profile>
              <HideAt lg>
                <Header.Role
                  showSearch
                  label={<Tag>{t('representative')}:</Tag>}
                  showDescription={false}
                  representatives={representatives}
                />
                <AccessibilityLink />
              </HideAt>
              <ProfileExample />
            </Header.Profile>
          </Header.Actions>
        </Header>
      )}
    </WithTranslations>
  ),
};

export const WithOrganizationSelection: Story = {
  render: () => (
    <WithTranslations>
      {(t) => (
        <Header>
          <Header.Logo logoDark={logoDark} logo={logo} />
          <Header.Actions>
            <ShowAt lg>
              <AccessibilityLink />
              <Separator axis="vertical" />
              <Header.Role
                showSearch
                label={
                  <Text modifiers={['small', 'bold']} color="secondary">
                    {t('organization')}
                  </Text>
                }
                representatives={organizations}
                isOrganization
              />
              <Separator axis="vertical" />
              <Header.Role
                showSearch
                label={
                  <Text modifiers={['small', 'bold']} color="secondary">
                    {t('role')}:
                  </Text>
                }
                representatives={representatives}
              />
              <Separator axis="vertical" />
            </ShowAt>
            <Header.Language languages={languages} />
            <Separator axis="vertical" />
            <Header.Profile>
              <HideAt lg>
                <Header.Role
                  showSearch
                  label={
                    <Text modifiers="bold" color="secondary">
                      {t('organization')}:
                    </Text>
                  }
                  representatives={organizations}
                  isOrganization
                />
                <Header.Role
                  showSearch
                  label={
                    <Text modifiers="bold" color="secondary">
                      {t('role')}:
                    </Text>
                  }
                  representatives={representatives}
                />
                <AccessibilityLink />
              </HideAt>
              <ProfileExample />
            </Header.Profile>
          </Header.Actions>
        </Header>
      )}
    </WithTranslations>
  ),
};

export const WithSingleOrganization: Story = {
  render: () => (
    <WithTranslations>
      {(t) => (
        <Header>
          <Header.Logo logoDark={logoDark} logo={logo} />
          <Header.Actions>
            <ShowAt lg>
              <AccessibilityLink />
              <Separator axis="vertical" />
              <Header.Role
                showSearch
                label={
                  <Text modifiers={['small', 'bold']} color="secondary">
                    {t('organization')}
                  </Text>
                }
                representatives={organizations2}
              />
              <Separator axis="vertical" />
            </ShowAt>
            <Header.Language languages={languages} />
            <Separator axis="vertical" />
            <Header.Profile>
              <HideAt lg>
                <Header.Role
                  showSearch
                  label={
                    <Text modifiers="bold" color="secondary">
                      {t('organization')}:
                    </Text>
                  }
                  representatives={organizations2}
                  isOrganization
                />
                <AccessibilityLink />
              </HideAt>
              <ProfileExample />
            </Header.Profile>
          </Header.Actions>
        </Header>
      )}
    </WithTranslations>
  ),
};

export const WithProfileLabel: Story = {
  render: () => (
    <WithTranslations>
      {(t) => (
        <Header>
          <Header.Logo logoDark={logoDark} logo={logo} />
          <Header.Actions>
            <ShowAt lg>
              <AccessibilityLink />
              <Separator axis="vertical" />
              <Header.Role
                showSearch
                label={
                  <Text modifiers={['small', 'bold']} color="secondary">
                    {t('organization')}
                  </Text>
                }
                representatives={organizations}
                isOrganization
              />
              <Separator axis="vertical" />
              <Header.Role
                showSearch
                label={
                  <Text modifiers={['small', 'bold']} color="secondary">
                    {t('personalCode')}:
                  </Text>
                }
                representatives={representatives}
              />
              <Separator axis="vertical" />
            </ShowAt>
            <Header.Language languages={languages} />
            <Separator axis="vertical" />
            <Header.Profile showLabel>
              <HideAt lg>
                <Header.Role
                  showSearch
                  label={
                    <Text modifiers="bold" color="secondary">
                      {t('organization')}:
                    </Text>
                  }
                  representatives={organizations}
                  isOrganization
                />
                <Header.Role
                  showSearch
                  label={
                    <Text modifiers="bold" color="secondary">
                      {t('role')}:
                    </Text>
                  }
                  representatives={representatives}
                />
                <AccessibilityLink />
              </HideAt>
              <ProfileExample />
            </Header.Profile>
          </Header.Actions>
        </Header>
      )}
    </WithTranslations>
  ),
};

export const WithProfileLabelAndNoOrganization: Story = {
  render: () => (
    <WithTranslations>
      {(t) => (
        <Header>
          <Header.Logo logoDark={logoDark} logo={logo} />
          <Header.Actions>
            <ShowAt lg>
              <AccessibilityLink />
              <Separator axis="vertical" />
              <Header.Role
                showSearch
                label={
                  <Text modifiers={['small', 'bold']} color="secondary">
                    {t('personalCode')}:
                  </Text>
                }
                representatives={representatives}
              />
              <Separator axis="vertical" />
            </ShowAt>
            <Header.Language languages={languages} />
            <Separator axis="vertical" />
            <Header.Profile showLabel>
              <HideAt lg>
                <Header.Role
                  showSearch
                  label={
                    <Text modifiers="bold" color="secondary">
                      {t('role')}:
                    </Text>
                  }
                  representatives={representatives}
                />
                <AccessibilityLink />
              </HideAt>
              <ProfileExample />
            </Header.Profile>
          </Header.Actions>
        </Header>
      )}
    </WithTranslations>
  ),
};

export const WithNameAsProfileLabel: Story = {
  render: () => (
    <Header>
      <Header.Logo logoDark={logoDark} logo={logo} />
      <Header.Actions>
        <Header.Language languages={languages} />
        <Separator axis="vertical" />

        <Header.Profile showLabel md={{ label: representatives2[0].name }}>
          <HideAt lg>
            <Header.Role showSearch representatives={representatives2}></Header.Role>
          </HideAt>
          <ProfileExample />
        </Header.Profile>
      </Header.Actions>
    </Header>
  ),
};

export const WithStandaloneLogoutButton: Story = {
  render: () => (
    <WithTranslations>
      {(t) => (
        <Header>
          <Header.Logo logoDark={logoDark} logo={logo} />
          <Header.Actions>
            <ShowAt lg>
              <AccessibilityLink />
              <Separator axis="vertical" />
              <Header.Role
                showSearch
                label={
                  <Text modifiers={['small', 'bold']} color="secondary">
                    {t('organization')}
                  </Text>
                }
                representatives={organizations}
                isOrganization
              />
              <Separator axis="vertical" />
            </ShowAt>
            <Header.Language languages={languages} />
            <Separator axis="vertical" />
            <HideAt lg>
              <Header.Profile>
                <Header.Role
                  showSearch
                  label={
                    <Text modifiers="bold" color="secondary">
                      {t('organization')}:
                    </Text>
                  }
                  representatives={organizations}
                  isOrganization
                />
                <AccessibilityLink />
              </Header.Profile>
              <Separator axis="vertical" />
            </HideAt>
            <Header.Logout href="#" />
          </Header.Actions>
        </Header>
      )}
    </WithTranslations>
  ),
};

export const WithInlineSearch: Story = {
  render: () => (
    <WithTranslations>
      {(t) => (
        <Header>
          <Header.Logo logoDark={logoDark} logo={logo} />
          <Header.Actions>
            <Header.Search>
              <Search label="search-3" hideLabel id="search-3" />
            </Header.Search>
            <Separator axis="vertical" />
            <ShowAt lg>
              <Header.Role
                showSearch
                label={
                  <Text modifiers={['small', 'bold']} color="secondary">
                    {t('role')}:
                  </Text>
                }
                representatives={representatives}
              />
              <Separator axis="vertical" />
            </ShowAt>
            <Header.Language languages={languages} />
            <Separator axis="vertical" />
            <Header.Profile>
              <HideAt lg>
                <Header.Role
                  showSearch
                  label={
                    <Text modifiers="bold" color="secondary">
                      {t('role')}:
                    </Text>
                  }
                  representatives={representatives}
                />
              </HideAt>
              <ProfileExample />
            </Header.Profile>
          </Header.Actions>
        </Header>
      )}
    </WithTranslations>
  ),
};

export const WithMobileBottomSearch: Story = {
  render: () => (
    <Header
      bottom={
        <Header.Search mobileVariant="inline">
          <Search label="search-4" hideLabel id="search-4-mobile" />
        </Header.Search>
      }
    >
      <Header.Logo logoDark={logoDark} logo={logo} />
      <Header.Actions>
        <ShowAt md>
          <Header.Search>
            <Search label="search-4" hideLabel id="search-4-desktop" />
          </Header.Search>
        </ShowAt>
        <ShowAt lg>
          <Separator axis="vertical" />
          <Header.Role showSearch representatives={representatives2} />
          <Separator axis="vertical" />
        </ShowAt>
        <Header.Language languages={languages} />
        <Separator axis="vertical" />
        <Header.Profile showLabel md={{ label: representatives2[0].name }}>
          <HideAt lg>
            <Header.Role showSearch representatives={representatives2} />
          </HideAt>
          <ProfileExample showLogout={false} />
        </Header.Profile>
        <Separator axis="vertical" />
        <Header.Logout href="#" />
      </Header.Actions>
    </Header>
  ),
};

export const WithCustomRoleContent: Story = {
  render: () => (
    <WithTranslations>
      {(t) => (
        <Header>
          <Header.Logo logoDark={logoDark} logo={logo} />
          <Header.Actions>
            <ShowAt lg>
              <AccessibilityLink />
              <Separator axis="vertical" />
              <Header.Role
                label={
                  <Text modifiers={['small', 'bold']} color="secondary">
                    {t('role')}:
                  </Text>
                }
                representatives={representatives2}
                showRoleSwitch
              >
                <div style={{ ['--empty-state-padding-sm' as string]: '0' }}>
                  <EmptyState type="inside" size="small" icon="heart_check">
                    Sul puuduvad esindatavad
                  </EmptyState>
                </div>
              </Header.Role>
              <Separator axis="vertical" />
            </ShowAt>
            <Header.Language languages={languages} />
            <Separator axis="vertical" />
            <Header.Profile>
              <HideAt lg>
                <Header.Role
                  label={
                    <Text modifiers="bold" color="secondary">
                      {t('role')}:
                    </Text>
                  }
                  representatives={representatives2}
                  showRoleSwitch
                >
                  <EmptyState type="inside" size="small" icon="heart_check">
                    Sul puuduvad esindatavad
                  </EmptyState>
                </Header.Role>
                <AccessibilityLink />
              </HideAt>
              <ProfileExample />
            </Header.Profile>
          </Header.Actions>
        </Header>
      )}
    </WithTranslations>
  ),
};

export const LoggedInWithSidenav: Story = {
  render: () => (
    <StoryWrapper>
      {({ isOpen, setIsOpen }) => (
        <WithTranslations>
          {(t) => (
            <SidenavLayout isOpen={isOpen}>
              <Header toggle={<SideNav.Toggle menuOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />}>
                <Header.Logo logoDark={logoDark} logo={logo} />
                <Header.Actions>
                  <ShowAt lg>
                    <AccessibilityLink />
                    <Separator axis="vertical" />
                    <Header.Role
                      showSearch
                      label={
                        <Text modifiers={['small', 'bold']} color="secondary">
                          {t('role')}:
                        </Text>
                      }
                      representatives={representatives}
                    />
                    <Separator axis="vertical" />
                  </ShowAt>
                  <Header.Language languages={languages} />
                  <Separator axis="vertical" />
                  <Header.Profile>
                    <HideAt lg>
                      <Header.Role
                        showSearch
                        label={
                          <Text modifiers="bold" color="secondary">
                            {t('role')}:
                          </Text>
                        }
                        representatives={representatives}
                      />
                      <AccessibilityLink />
                    </HideAt>
                    <ProfileExample />
                  </Header.Profile>
                </Header.Actions>
              </Header>

              <div style={{ display: 'flex', flex: 1 }}>
                <SideNav ariaLabel="Main navigation" linkAs="a" isMobileOpen={isOpen} navItems={loggedInNavItems} />
              </div>
            </SidenavLayout>
          )}
        </WithTranslations>
      )}
    </StoryWrapper>
  ),
};
