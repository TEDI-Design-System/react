/* istanbul ignore file */
import { Text } from '../../base/typography/text/text';
import { InfoTooltip } from '../../overlays/tooltip/info-tooltip';
import { SideNavItemProps } from './components/sidenav-item/sidenav-item';

export const exampleNavItems: SideNavItemProps[] = [
  { href: '#', children: 'Avaleht', icon: 'home' },
  { href: '#', children: 'Kliendid', icon: 'account_box' },
  { href: '/', children: 'Lapsed', icon: 'child_care', isActive: true },
  { href: '#', children: 'Väga pikk tekst, mis ei mahu kuhugi ära ja läheb reavahetusse', icon: 'assignment' },
  { href: '#', children: 'Ülesanded', icon: 'assignment' },
  { href: '#', children: 'Ülesanne, mis on pikk tekst', icon: 'assignment' },
  { href: '#', children: 'Ülesanded', icon: 'assignment' },
];

export const exampleNavCollapsibleItems: SideNavItemProps[] = [
  { href: '#', children: 'Töölaud', icon: 'dashboard' },
  { href: '#', children: 'Patsiendi andmed', icon: 'people' },
  {
    children: 'Kliiniline haldus',
    icon: 'medical_services',
    subItemGroups: [
      {
        subItems: [
          { href: '#', children: 'Elunäitajad' },
          {
            href: '#',
            children: 'Terviklik patsiendihoolduse koordineerimine',
          },
          { href: '#', children: 'Hindamised' },
          {
            href: '#',
            children: 'Ravid',
          },
          {
            href: '#',
            children: 'Dokumentatsioon',
          },
          {
            href: '#',
            children: 'Raviplaani koostamise teenused',
          },
        ],
      },
    ],
  },
  {
    children: 'Haldus',
    icon: 'admin_panel_settings',
    subItems: [
      { href: '#', children: 'Personalihaldus' },
      { href: '#', children: 'Ajakava' },
      {
        href: '#',
        children: 'Süsteemi seaded',
      },
      {
        href: '#',
        children: 'Aruanded ja analüütika',
      },
    ],
  },
  { href: '#', children: 'Laohaldus', icon: 'inventory' },
  { href: '#', children: 'Arveldus ja rahandus', icon: 'payments' },
];

export const exampleDefaultOpen: SideNavItemProps[] = [
  { href: '#', children: 'Töölaud', icon: 'dashboard' },
  { href: '#', children: 'Patsiendi andmed', icon: 'people' },
  {
    children: 'Kliiniline haldus',
    icon: 'medical_services',
    subItemGroups: [
      {
        subItems: [
          { href: '#', children: 'Elunäitajad' },
          {
            href: '#',
            children: 'Terviklik patsiendihoolduse koordineerimine',
          },
          { href: '#', children: 'Hindamised' },
          {
            href: '#',
            children: 'Ravid',
          },
          {
            href: '#',
            children: 'Dokumentatsioon',
          },
          {
            href: '#',
            children: 'Raviplaani koostamise teenused',
          },
        ],
      },
    ],
  },
  {
    children: 'Haldus',
    isDefaultOpen: true,
    icon: 'admin_panel_settings',
    subItems: [
      { href: '#', children: 'Personalihaldus' },
      { href: '#', children: 'Ajakava' },
      {
        href: '#',
        children: 'Süsteemi seaded',
      },
      {
        href: '#',
        children: 'Aruanded ja analüütika',
      },
    ],
  },
  { href: '#', children: 'Laohaldus', icon: 'inventory' },
  { href: '#', children: 'Arveldus ja rahandus', icon: 'payments' },
];

export const exampleNavCollapsibleItemsWithLinks: SideNavItemProps[] = [
  { href: '#', children: 'Töölaud', icon: 'dashboard' },
  { href: '#', children: 'Patsiendi andmed', icon: 'people' },
  {
    href: '#critical-management',
    children: 'Kliiniline haldus',
    icon: 'medical_services',
    subItems: [
      { href: '#', children: 'Elunäitajad' },
      {
        href: '#',
        children: 'Terviklik patsiendihoolduse koordineerimine',
      },
      { href: '#', children: 'Hindamised' },
      {
        href: '#',
        children: 'Ravid',
      },
      {
        href: '#',
        children: 'Dokumentatsioon',
      },
      {
        href: '#',
        children: 'Raviplaani koostamise teenused',
      },
    ],
  },
  {
    href: '#',
    children: 'Haldus',
    icon: 'admin_panel_settings',
    subItems: [
      { href: '#', children: 'Personalihaldus' },
      { href: '#', children: 'Ajakava' },
      {
        href: '#',
        children: 'Süsteemi seaded',
      },
      {
        href: '#',
        children: 'Aruanded ja analüütika',
      },
    ],
  },
  { href: '#', children: 'Laohaldus', icon: 'inventory' },
  { href: '#', children: 'Arveldus ja rahandus', icon: 'payments' },
];

export const exampleThirdLevelMenuItems: SideNavItemProps[] = [
  { href: '#', children: 'Töölaud', icon: 'dashboard' },
  { href: '#', children: 'Patsiendi andmed', collapsedText: 'Patsiendid', icon: 'people' },
  {
    children: 'Kliiniline haldus',
    collapsedText: 'Kliiniline',
    icon: 'medical_services',
    subItems: [
      { href: '#', children: 'Elunäitajad' },
      { href: '#', children: 'Hindamised' },
      {
        children: 'Ravid',
        subItems: [
          { href: '#', children: 'Aktiivsed ravid' },
          { href: '#', children: 'Ravi ajalugu' },
          { href: '#', children: 'Raviplaanid' },
          { href: '#', children: 'Kliinilised protokollid' },
        ],
      },
      {
        children: 'Dokumentatsioon',
        subItems: [
          { href: '#', children: 'Kliinilised märkmed' },
          { href: '#', children: 'Meditsiinilised vormid' },
          { href: '#', children: 'Nõusolekuvormid' },
          { href: '#', children: 'Aruanded' },
        ],
      },
    ],
  },
  {
    children: 'Haldus',
    icon: 'admin_panel_settings',
    subItems: [
      { href: '#', children: 'Personalihaldus' },
      { href: '#', children: 'Ajakava' },
    ],
  },
  { href: '#', children: 'Laohaldus', icon: 'inventory' },
  { href: '#', children: 'Arveldus ja rahandus', icon: 'payments' },
];

export const exampleThirdLevelMenuItemsLinks: SideNavItemProps[] = [
  { href: '#', children: 'Töölaud', icon: 'dashboard' },
  { href: '#', children: 'Patsiendi andmed', icon: 'people' },
  {
    children: 'Kliiniline haldus',
    href: '#',
    icon: 'medical_services',
    subItems: [
      { href: '#', children: 'Elunäitajad' },
      { href: '#', children: 'Hindamised' },
      {
        href: '#',
        children: 'Ravid',
        subItems: [
          { href: '#', children: 'Aktiivsed ravid' },
          { href: '#', children: 'Ravi ajalugu' },
          { href: '#', children: 'Raviplaanid' },
          { href: '#', children: 'Kliinilised protokollid' },
        ],
      },
      {
        href: '#',
        children: 'Dokumentatsioon',
        subItems: [
          { href: '#', children: 'Kliinilised märkmed' },
          { href: '#', children: 'Meditsiinilised vormid' },
          { href: '#', children: 'Nõusolekuvormid' },
          { href: '#', children: 'Aruanded' },
        ],
      },
    ],
  },
  {
    href: '#',
    children: 'Haldus',
    icon: 'admin_panel_settings',
    subItems: [
      { href: '#', children: 'Personalihaldus' },
      { href: '#', children: 'Ajakava' },
    ],
  },
  { href: '#', children: 'Laohaldus', icon: 'inventory' },
  { href: '#', children: 'Arveldus ja rahandus', icon: 'payments' },
];

export const exampleThirdLevelMenuItemsLinksWithSubTitles: SideNavItemProps[] = [
  { href: '#', children: 'Töölaud', icon: 'dashboard' },
  { href: '#', children: 'Patsiendi andmed', icon: 'people' },
  {
    children: 'Kliiniline haldus',
    icon: 'medical_services',
    subItemGroups: [
      {
        subHeading: (
          <Text>
            Minu tervise ajalugu{' '}
            <InfoTooltip color="inverted" isSmall>
              Lorem ipsum
            </InfoTooltip>
          </Text>
        ),
        subItems: [
          { href: '#', children: 'Aktiivsed ravid' },
          { href: '#', children: 'Ravi ajalugu' },
          { href: '#', children: 'Raviplaanid' },
          { href: '#', children: 'Kliinilised protokollid' },
        ],
      },
    ],
    subItems: [
      { href: '#', children: 'Elunäitajad' },
      { href: '#', children: 'Hindamised' },
      {
        href: '#',
        children: 'Ravid',
        subItems: [
          { href: '#', children: 'Aktiivsed ravid' },
          { href: '#', children: 'Ravi ajalugu' },
          { href: '#', children: 'Raviplaanid' },
          { href: '#', children: 'Kliinilised protokollid' },
        ],
      },
      {
        href: '#',
        children: 'Dokumentatsioon',
        subItems: [
          { href: '#', children: 'Kliinilised märkmed' },
          { href: '#', children: 'Meditsiinilised vormid' },
          { href: '#', children: 'Nõusolekuvormid' },
          { href: '#', children: 'Aruanded' },
        ],
      },
    ],
    isDefaultOpen: true,
  },
  {
    href: '#',
    children: 'Haldus',
    icon: 'admin_panel_settings',
    subItems: [
      { href: '#', children: 'Personalihaldus' },
      { href: '#', children: 'Ajakava' },
    ],
  },
  { href: '#', children: 'Laohaldus', icon: 'inventory' },
  { href: '#', children: 'Arveldus ja rahandus', icon: 'payments' },
];

export const exampleWithGroupTitle: SideNavItemProps[] = [
  // `subHeading` starts a group: shows the title when expanded, a divider line when collapsed.
  { href: '#', children: 'Minu töölaud', subHeading: 'Tervis', icon: 'dashboard' },
  { href: '#', children: 'Minu andmed', icon: 'account_circle' },
  { href: '#', children: 'Vastuvõtud ja saatekirjad', icon: 'calendar_today' },
  { href: '#', children: 'Retseptid ja meditsiiniseadmed', icon: 'medical_services' },
  { href: '#', children: 'Hammaste tervis', icon: 'dentistry' },
  { href: '#', children: 'Vaktsineerimine', icon: 'vaccines' },
  { href: '#', children: 'Tervisetõendid ja -deklaratsioonid', icon: 'assignment' },
  { href: '#', children: 'Töövõime', icon: 'work' },
  { href: '#', children: 'Raviarved', subHeading: 'Üldine', icon: 'payments' },
  { href: '#', children: 'Minu seaded', icon: 'settings' },
];
