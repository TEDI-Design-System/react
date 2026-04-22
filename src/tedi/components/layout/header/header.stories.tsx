import { useGlobals } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';

import Toggle from '../../../../tedi/components/form/toggle/toggle';
import Separator from '../../../../tedi/components/misc/separator/separator';
import { useTheme } from '../../../providers/theme-provider/theme-provider';
import { Icon } from '../../base/icon/icon';
import { Text } from '../../base/typography/text/text';
import { Search } from '../../form/search/search';
import Link from '../../navigation/link/link';
import { Tag } from '../../tags/tag/tag';
import { HideAt } from '../hide-at';
import { ShowAt } from '../show-at';
import { SideNav } from '../sidenav';
import { Representative } from './components/header-role/header-role-representatives';
import { Header, HeaderActions, HeaderCenter, HeaderLogo, HeaderLogoProps } from './header';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.68?m=dev&node-id=6380-53060" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/68343d-header" target="_BLANK">Zeroheight ↗</a>
 */

const STORAGE_KEY = 'tedi-theme';

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
    status: {
      type: ['breakpointSupport'],
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
  { name: 'Mari Maasikas', description: '49504080934', icon: { name: 'person', size: 24 } },
  { name: 'Juulia Sarapuu', description: 'Peasekretär', icon: { name: 'supervised_user_circle', size: 24 } },
  { name: 'Marta Sarapuu', description: 'Sekretär', icon: { name: 'supervised_user_circle', size: 24 } },
  { name: 'Helgi Sarapuu', description: 'Jurist', icon: { name: 'supervised_user_circle', size: 24 } },
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

const representatives2 = [{ name: 'Mari Maasikas', description: '49504080934' }];

const organizations = [{ name: 'Pärnu linnavolikogu' }, { name: 'Tartu Linnavalitsus' }];
const organizations2 = [{ name: 'Tartu Linnavalitsus' }];

const logo = <img src="header-logo.svg" alt="Logo" />;
const logoDark = <img src="header-logo-white.svg" alt="Logo (Dark Mode)" />;

const ProfileExample = () => {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === 'dark' ? 'default' : 'dark');
  };

  return (
    <>
      <Link underline={false} href="#">
        Minu andmed
      </Link>
      <Link underline={false} href="#">
        Esindatavad
      </Link>
      <Link underline={false} href="#">
        Kontaktid
      </Link>
      <ShowAt lg>
        <Separator axis="horizontal" />
      </ShowAt>

      <div>
        <Toggle id="theme-toggle" onChange={handleToggle} label="Tume režiim" checked={theme === 'dark'} />
      </div>

      <ShowAt lg>
        <Separator axis="horizontal" />
      </ShowAt>
      <Link underline={false} iconLeft="notifications" href="#">
        Riiklikud teated
      </Link>
      <ShowAt lg>
        <Separator axis="horizontal" />
      </ShowAt>
      <Header.Logout size="default" href="#" />
    </>
  );
};

const accessibilityLink = (
  <Link underline={false} href="#">
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--link-inner-spacing-x)' }}>
      Ligipääsetavus
      <Icon name="arrow_outward" size={16} />
    </div>
  </Link>
);

type StoryWrapperProps = {
  children: (args: { isOpen: boolean; setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => React.ReactNode;
};

const StoryWrapper = ({ children }: StoryWrapperProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return <>{children({ isOpen, setIsOpen })}</>;
};

const ResponsiveLogo = (props: HeaderLogoProps) => {
  const query = '(min-width: 360px)';

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
        <>
          <Header toggle={<SideNav.Toggle menuOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />}>
            <Header.Logo logoDark={logoDark} logo={logo} href="#" />
            <Header.Center>
              <ShowAt lg>
                <Link color="text" underline={false} href="#">
                  Link text
                </Link>
                <Link color="text" underline={false} href="#">
                  Link text
                </Link>
                <Link color="text" underline={false} href="#">
                  Link text
                </Link>
              </ShowAt>
            </Header.Center>
            <Header.Actions>
              <Header.Language languages={languages} currentLanguage={languages[0].label} />
              <Separator axis="vertical" />
              <Header.Login href="#" />
            </Header.Actions>
          </Header>

          <HideAt lg>
            <SideNav
              ariaLabel=""
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
          </HideAt>
        </>
      )}
    </StoryWrapper>
  ),
};

export const LoggedOut: Story = {
  render: () => (
    <>
      <div style={{ marginBottom: '0.625rem' }}>
        <StoryWrapper>
          {({ isOpen, setIsOpen }) => (
            <>
              <Header toggle={<SideNav.Toggle menuOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />}>
                <Header.Logo logoDark={logoDark} logo={logo} />

                <Header.Center>
                  <ShowAt lg>
                    <Link color="text" underline={false} href="#">
                      Link text
                    </Link>
                    <Link color="text" underline={false} href="#">
                      Link text
                    </Link>
                    <Link color="text" underline={false} href="#">
                      Link text
                    </Link>
                    <Link color="text" underline={false} href="#">
                      Link text
                    </Link>
                    <Link color="text" underline={false} href="#">
                      Link text
                    </Link>
                  </ShowAt>
                </Header.Center>

                <Header.Actions>
                  <Header.Language languages={languages} currentLanguage={languages[0].label} />
                  <Separator axis="vertical" />
                  <Header.Login href="#" />
                </Header.Actions>
              </Header>

              <HideAt lg>
                <SideNav
                  ariaLabel=""
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
              </HideAt>
            </>
          )}
        </StoryWrapper>
      </div>

      <StoryWrapper>
        {({ isOpen, setIsOpen }) => (
          <>
            <Header toggle={<SideNav.Toggle menuOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />}>
              <ResponsiveLogo logoDark={logoDark} logo={logo} />

              <Header.Center alignment="space-between">
                <ShowAt lg>
                  <div>
                    <Link color="text" underline={false} href="#">
                      Avaleht
                    </Link>
                    <Link color="text" underline={false} href="#">
                      Teenused
                    </Link>
                    <Link color="text" underline={false} href="#">
                      Blogi
                    </Link>
                    <Link color="text" underline={false} href="#">
                      Kontakt
                    </Link>
                  </div>
                  <Header.Search>
                    <div style={{ width: '100%', maxWidth: '22.5rem' }}>
                      <Search label="search-1" hideLabel id="search-1" />
                    </div>
                  </Header.Search>
                </ShowAt>
              </Header.Center>

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
              <SideNav
                ariaLabel=""
                linkAs="a"
                isMobileOpen={isOpen}
                navItems={[
                  {
                    children: 'Avaleht',
                    href: '#',
                  },
                  {
                    children: 'Teenused',
                    href: '#',
                  },
                  {
                    children: 'Blogi',
                    href: '#',
                  },
                  {
                    children: 'Kontakt',
                    href: '#',
                  },
                ]}
              />
            </HideAt>
          </>
        )}
      </StoryWrapper>
    </>
  ),
};

export const LoggedIn: Story = {
  render: () => (
    <>
      <div style={{ marginBottom: '0.625rem' }}>
        <Header>
          <Header.Logo logoDark={logoDark} logo={logo} />
          <Header.Actions>
            <ShowAt lg>
              {accessibilityLink}
              <Separator axis="vertical" />
              <Header.Role
                label={
                  <Text modifiers={['small', 'bold']} color="secondary">
                    Roll:
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
                  label={
                    <Text modifiers="bold" color="secondary">
                      Roll:
                    </Text>
                  }
                  representatives={representatives}
                />
                {accessibilityLink}
              </HideAt>
              <ProfileExample />
            </Header.Profile>
          </Header.Actions>
        </Header>
      </div>

      <Header>
        <Header.Logo logoDark={logoDark} logo={logo} />
        <Header.Actions>
          <ShowAt lg>
            {accessibilityLink}
            <Separator axis="vertical" />
            <Header.Role label={<Tag>Esindatav</Tag>} showDescription={false} representatives={representatives} />
            <Separator axis="vertical" />
          </ShowAt>
          <Header.Language languages={languages} />
          <Separator axis="vertical" />
          <Header.Profile>
            <HideAt lg>
              <Header.Role label={<Tag>Esindatav:</Tag>} showDescription={false} representatives={representatives} />
              {accessibilityLink}
            </HideAt>
            <ProfileExample />
          </Header.Profile>
        </Header.Actions>
      </Header>
    </>
  ),
};

export const WithOrganizationSelection: Story = {
  render: () => (
    <>
      <div style={{ marginBottom: '0.625rem' }}>
        <Header>
          <Header.Logo logoDark={logoDark} logo={logo} />
          <Header.Actions>
            <ShowAt lg>
              {accessibilityLink}
              <Separator axis="vertical" />
              <Header.Role
                label={
                  <Text modifiers={['small', 'bold']} color="secondary">
                    Asutus
                  </Text>
                }
                representatives={organizations}
                isOrganization
              />
              <Separator axis="vertical" />
              <Header.Role
                label={
                  <Text modifiers={['small', 'bold']} color="secondary">
                    Roll:
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
                  label={
                    <Text modifiers="bold" color="secondary">
                      Asutus:
                    </Text>
                  }
                  representatives={organizations}
                  isOrganization
                />
                <Header.Role
                  label={
                    <Text modifiers="bold" color="secondary">
                      Roll:
                    </Text>
                  }
                  representatives={representatives}
                />
                {accessibilityLink}
              </HideAt>
              <ProfileExample />
            </Header.Profile>
          </Header.Actions>
        </Header>
      </div>

      <Header>
        <Header.Logo logoDark={logoDark} logo={logo} />
        <Header.Actions>
          <ShowAt lg>
            {accessibilityLink}
            <Separator axis="vertical" />
            <Header.Role
              label={
                <Text modifiers={['small', 'bold']} color="secondary">
                  Asutus
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
                label={
                  <Text modifiers="bold" color="secondary">
                    Asutus:
                  </Text>
                }
                representatives={organizations2}
                isOrganization
              />
              {accessibilityLink}
            </HideAt>
            <ProfileExample />
          </Header.Profile>
        </Header.Actions>
      </Header>
    </>
  ),
};

export const AlternativeProfileAndLogoutButton: Story = {
  render: () => (
    <>
      <div style={{ marginBottom: '0.625rem' }}>
        <Header>
          <Header.Logo logoDark={logoDark} logo={logo} />
          <Header.Actions>
            <ShowAt lg>
              {accessibilityLink}
              <Separator axis="vertical" />
              <Header.Role
                label={
                  <Text modifiers={['small', 'bold']} color="secondary">
                    Asutus
                  </Text>
                }
                representatives={organizations}
                isOrganization
              />
              <Separator axis="vertical" />
              <Header.Role
                label={
                  <Text modifiers={['small', 'bold']} color="secondary">
                    Isikukood:
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
                  label={
                    <Text modifiers="bold" color="secondary">
                      Asutus:
                    </Text>
                  }
                  representatives={organizations}
                  isOrganization
                />
                <Header.Role
                  label={
                    <Text modifiers="bold" color="secondary">
                      Isikukood:
                    </Text>
                  }
                  representatives={representatives}
                />
                {accessibilityLink}
              </HideAt>
              <ProfileExample />
            </Header.Profile>
          </Header.Actions>
        </Header>
      </div>

      <div style={{ marginBottom: '0.625rem' }}>
        <Header>
          <Header.Logo logoDark={logoDark} logo={logo} />
          <Header.Actions>
            <ShowAt lg>
              {accessibilityLink}
              <Separator axis="vertical" />
              <Header.Role
                label={
                  <Text modifiers={['small', 'bold']} color="secondary">
                    Isikukood:
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
                  label={
                    <Text modifiers="bold" color="secondary">
                      Isikukood:
                    </Text>
                  }
                  representatives={representatives}
                />
                {accessibilityLink}
              </HideAt>
              <ProfileExample />
            </Header.Profile>
          </Header.Actions>
        </Header>
      </div>

      <div style={{ marginBottom: '0.625rem' }}>
        <Header>
          <Header.Logo logoDark={logoDark} logo={logo} />
          <Header.Actions>
            <Header.Language languages={languages} />
            <Separator axis="vertical" />

            <Header.Profile showLabel md={{ label: representatives2[0].name }}>
              <HideAt lg>
                <Header.Role representatives={representatives2}></Header.Role>
              </HideAt>
              <ProfileExample />
            </Header.Profile>
          </Header.Actions>
        </Header>
      </div>

      <Header>
        <Header.Logo logoDark={logoDark} logo={logo} />
        <Header.Actions>
          <ShowAt lg>
            {accessibilityLink}
            <Separator axis="vertical" />
            <Header.Role
              label={
                <Text modifiers={['small', 'bold']} color="secondary">
                  Asutus
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
                label={
                  <Text modifiers="bold" color="secondary">
                    Asutus:
                  </Text>
                }
                representatives={organizations}
                isOrganization
              />
              {accessibilityLink}
            </Header.Profile>
            <Separator axis="vertical" />
          </HideAt>
          <Header.Logout href="#" />
        </Header.Actions>
      </Header>
    </>
  ),
};

export const WithSearch: Story = {
  render: () => (
    <>
      <div style={{ marginBottom: '0.625rem' }}>
        <Header>
          <Header.Logo logoDark={logoDark} logo={logo} />
          <Header.Actions>
            <Header.Search>
              <Search label="search-3" hideLabel id="search-3" />
            </Header.Search>
            <Separator axis="vertical" />
            <ShowAt lg>
              <Header.Role
                label={
                  <Text modifiers={['small', 'bold']} color="secondary">
                    Roll:
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
                  label={
                    <Text modifiers="bold" color="secondary">
                      Roll:
                    </Text>
                  }
                  representatives={representatives}
                />
              </HideAt>
              <ProfileExample />
            </Header.Profile>
          </Header.Actions>
        </Header>
      </div>
      <>
        <Header
          bottom={
            <Header.Search mobileVariant="inline">
              <Search label="search-4" hideLabel id="search-4" />
            </Header.Search>
          }
        >
          <Header.Logo logoDark={logoDark} logo={logo} />
          <Header.Actions>
            <ShowAt md>
              <Header.Search>
                <Search label="search-4" hideLabel id="search-4" />
              </Header.Search>
            </ShowAt>
            <ShowAt lg>
              <Separator axis="vertical" />
              <Header.Role representatives={representatives2} />
              <Separator axis="vertical" />
            </ShowAt>
            <Header.Language languages={languages} />
            <Separator axis="vertical" />
            <Header.Profile showLabel md={{ label: representatives2[0].name }}>
              <HideAt lg>
                <Header.Role representatives={representatives2} />
              </HideAt>
              <ProfileExample />
            </Header.Profile>
            <Separator axis="vertical" />
            <Header.Logout href="#" />
          </Header.Actions>
        </Header>
      </>
    </>
  ),
};

export const LoggedInWithSidenav: Story = {
  render: () => (
    <StoryWrapper>
      {({ isOpen, setIsOpen }) => (
        <>
          <Header toggle={<SideNav.Toggle menuOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />}>
            <Header.Logo logoDark={logoDark} logo={logo} />
            <Header.Actions>
              <ShowAt lg>
                {accessibilityLink}
                <Separator axis="vertical" />
                <Header.Role
                  label={
                    <Text modifiers={['small', 'bold']} color="secondary">
                      Roll:
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
                    label={
                      <Text modifiers="bold" color="secondary">
                        Roll:
                      </Text>
                    }
                    representatives={representatives}
                  />
                  {accessibilityLink}
                </HideAt>
                <ProfileExample />
              </Header.Profile>
            </Header.Actions>
          </Header>

          <SideNav ariaLabel="" linkAs="a" isMobileOpen={isOpen} navItems={loggedInNavItems} />
        </>
      )}
    </StoryWrapper>
  ),
};
