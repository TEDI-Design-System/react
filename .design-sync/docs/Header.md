Application header bar. Composed from `Header.Logo`, `Header.Center` and
`Header.Actions`, with `Header.Language`, `Header.Profile`, `Header.Role` and
`Header.Logout` as ready-made action-cluster pieces.

**Live Storybook:** https://storybook.tedi.ee/react/rc/?path=/docs/tedi-ready-layout-header--docs

Stories (see `Header.html`): `Default`, `LoggedOut`, `LoggedOutWithSearch`, `LoggedIn`,
`LoggedInWithTagLabel`, `WithOrganizationSelection`, `WithSingleOrganization`,
`WithProfileLabel`, `WithProfileLabelAndNoOrganization`, `WithNameAsProfileLabel`,
`WithStandaloneLogoutButton`, `WithTopHeader`, `WithTopHeaderAndLanguageDropdown`,
`WithInlineSearch`, `WithMobileBottomSearch`, `WithCustomRoleContent`,
`LanguageWithNavigationLinks`, `LoggedInWithSidenav`.

`LoggedInWithSidenav` is the one that shows the full app shell.

## The default pattern for a logged-in app

Wordmark logo, **no centre nav** (primary navigation lives in `SideNav` or `TopNav`), and
an actions cluster of language + identity + logout:

```jsx
<Header toggle={<SideNav.Toggle menuOpen={open} toggleMenu={() => setOpen(!open)} />}>
  <Header.Logo logo={<Text modifiers="bold">Terviseportaal</Text>} />
  <Header.Actions>
    <Header.Language
      languages={[
        { label: 'Eesti keel', locale: 'et', isSelected: true, onClick: …},
        { label: 'English',    locale: 'en', onClick: …},
      ]}
    />
    <Separator axis="vertical" />
    <Header.Profile>
      <Text modifiers="bold">Mari Maasikas</Text>
      <Text color="secondary" modifiers="small">48001010000</Text>
      <Header.Logout onClick={signOut} />
    </Header.Profile>
  </Header.Actions>
</Header>
```

## Gotchas

**1. `Header.Logo` takes `logo` as a PROP, not children.** Children are ignored.

```jsx
// ✗ renders nothing
<Header.Logo><Text modifiers="bold">Terviseportaal</Text></Header.Logo>

// ✓ wordmark, no image asset needed
<Header.Logo logo={<Text modifiers="bold">Terviseportaal</Text>} />

// ✓ image, with a dark-theme variant and a home link
<Header.Logo logo={<img src={logo} alt="" />} logoDark={<img src={logoDark} alt="" />} href="/" />
```

**2. Primary navigation does not belong in `Header.Center`.** In a logged-in application
the nav lives in `SideNav` (the shell's left column) or `TopNav`. `Header.Center` is for
**logged-out / marketing link rows** — a public site's "About / Services / Contact"
strip — plus occasional global slots like a search field or environment banner. It takes
`alignment` (`center` by default). Most logged-in app headers omit it entirely.

**3. The mobile nav toggle goes in the `toggle` prop, not in `children`.** That slot
places it ahead of the logo; in `children` it is misaligned. Its `menuOpen` must be the
same boolean as `SideNav`'s `isMobileOpen` — the two components share no context.

## Subcomponent props

```ts
Header.Logo    { logo: ReactNode; logoDark?: ReactNode; href?: string; showLogo?: boolean }
Header.Center  { children: ReactNode; alignment?: HeaderAlignment }  // default 'center'
Header.Actions { children: ReactNode }

Header.Language {
  languages: {
    label: string;                 // "Eesti keel"
    locale?: 'et' | 'en' | 'ru';
    href?: string;                 // use href OR onClick
    onClick?: (p: { onToggle: (open: boolean) => void }) => void;
    isSelected?: boolean;          // marks the current language
    'aria-label'?: string;
  }[];
  currentLanguage?: string;
  selectLabel?: string;
}

Header.Profile {
  children: ReactNode;             // identity block + Header.Logout go here
  label?: string;                  // breakpoint-overridable: lg={{ label: 'Minu konto' }}
  showLabel?: boolean;             // show the label next to the avatar
  showPopover?: Breakpoint;        // breakpoint at and above which it opens as a popover
  disabled?: boolean;
  noStyle?: boolean;
}

Header.Role {
  representatives: { id: string; name: string;
                     description?: string; icon?: string | IconProps }[];
  label?: ReactNode;               // e.g. <Text modifiers="bold">Roll:</Text>
  showSearch?: boolean;            // search field in the representative list
  showDescription?: boolean;
  isOrganization?: boolean;        // organisation rather than person semantics
  searchLabel?: string;
  onRepresentativeChange?: (r: Representative) => void;
  accordionLabels?: { open?: string; close?: string };
}

Header.Logout { onClick?: () => void; href?: string; label?: string;
                size?: 'default' | 'small' }
```

`Header` itself also takes `top` (a bar above the main row), `bottom` (rendered below the
bar under `md` — typically a compact search) and `topAlignment` (breakpoint-aware).

Use `ShowAt` / `HideAt` to move pieces between the bar and the profile popover per
breakpoint rather than duplicating markup.
