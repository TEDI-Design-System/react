import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { Fragment, useState } from 'react';

import { Heading } from '../../../../tedi/components/base/typography/heading/heading';
import { Text } from '../../../../tedi/components/base/typography/text/text';
import { Section } from '../../../../tedi/components/content/section/section';
import { Col, Row } from '../../../../tedi/components/layout/grid';
import { VerticalSpacing } from '../../../../tedi/components/layout/vertical-spacing';
import Separator from '../../../../tedi/components/misc/separator/separator';
import { StretchContent } from '../../../../tedi/components/misc/stretch-content/stretch-content';
import useLayout from '../../../helpers/hooks/use-layout';
import Anchor from '../../anchor/anchor';
import Button from '../../button/button';
import { Card, CardContent } from '../../card';
import Breadcrumbs, { BreadcrumbsProps } from '../breadcrumbs/breadcrumbs';
import { Default as BreadcrumbsDefault } from '../breadcrumbs/breadcrumbs.stories';
import Footer, { FooterProps } from '../footer/footer';
import { Default as FooterDefault } from '../footer/footer.stories';
import { HeaderContent, HeaderLanguage, HeaderProps, HeaderRole, HeaderSettings } from '../header';
import SideNav, { SideNavProps } from '../sidenav/sidenav';
import { Default as SidenavDefault, Public as SidenavPublic } from '../sidenav/sidenav.stories';
import { Layout } from './layout';

const SettingsLinks = ({ onToggle }: { onToggle: (open: boolean) => void }) => {
  const isMobile = useLayout(['mobile']);
  const labels = ['My data', 'Representation rights', 'Access to health data', 'Statements of intention', 'Contacts'];

  return (
    <VerticalSpacing>
      {(isMobile ? ['Custom Content', ...labels] : labels).map((label, index) => (
        <Fragment key={label}>
          {index > 0 && <Separator isStretched />}
          <Anchor href="#" onClick={() => onToggle(false)}>
            {label}
          </Anchor>
        </Fragment>
      ))}
    </VerticalSpacing>
  );
};

const SettingsContent = ({ onToggle }: { onToggle: (open: boolean) => void }) => {
  const isMobileTablet = useLayout(['mobile', 'tablet']);

  if (!isMobileTablet) {
    return <SettingsLinks onToggle={onToggle} />;
  }

  return (
    <>
      <HeaderRole
        primaryInfo="Ida-Tallinna Keskhaigla"
        secondaryInfo="Family physician"
        label="Kristo Käärmann:"
        renderModal
      >
        Any content
      </HeaderRole>
      <Card border="top-info-main">
        <CardContent>
          <SettingsLinks onToggle={onToggle} />
        </CardContent>
      </Card>
    </>
  );
};

const settings = (
  <HeaderSettings onActionClick={() => console.log('Logout')}>
    {({ onToggle }) => <SettingsContent onToggle={onToggle} />}
  </HeaderSettings>
);

const languages = (
  <HeaderLanguage
    languages={[
      { label: 'EST', 'aria-label': 'Estonian', isSelected: true },
      { label: 'ENG', 'aria-label': 'English', isSelected: false },
      { label: 'RUS', 'aria-label': 'Russian', isSelected: false },
    ].map((language) => ({
      ...language,
      onClick: ({ onToggle }) => {
        console.log(`Selected ${language.label}`);
        onToggle(false);
      },
    }))}
  />
);

const customHeaderContent = (
  <HeaderContent>
    <StretchContent>
      <Row justifyContent="center" alignItems="center">
        <Col width="auto">Custom content</Col>
      </Row>
    </StretchContent>
  </HeaderContent>
);

const publicHeader: HeaderProps<'a'> = {
  logo: { imageUrl: 'logo.svg', anchorProps: { href: '#' } },
  skipLinks: { links: [{ children: 'Skip to main content', href: '#main-content' }] },
  minimalSettingsArea: ['mobile', 'tablet'],
  children: (
    <>
      {settings}
      {languages}
    </>
  ),
};

const defaultHeader: HeaderProps<'a'> = {
  ...publicHeader,
  children: (
    <>
      {settings}
      {languages}
      <HeaderRole primaryInfo="Kristo Käärmann">Any content</HeaderRole>
      {customHeaderContent}
      <Anchor href="#">Accessibilty</Anchor>
    </>
  ),
};
const publicHeaderWithCustomContent: HeaderProps<'a'> = {
  ...publicHeader,
  enablePublicCustomContent: true,
  children: (
    <>
      {settings}
      {languages}
      {customHeaderContent}
    </>
  ),
};

const defaultContent = (
  <Section>
    <VerticalSpacing>
      <Heading>Page title & content</Heading>
      <Button>Focusable item</Button>
    </VerticalSpacing>
  </Section>
);

const meta: Meta<typeof Layout> = {
  component: Layout,
  title: 'Community/Layout',
  subcomponents: {
    SideNav,
    Footer,
    Breadcrumbs,
  } as never,
  argTypes: {
    children: {
      control: {
        type: 'text',
        defaultValue: '-',
      },
      table: {
        type: { summary: '-' },
      },
    },
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 700,
      },
    },
    layout: 'fullscreen',
  },
  globals: { backgrounds: { value: 'subtle' } },
};

export default meta;
type Story = StoryObj<typeof Layout>;

const Template: StoryFn<typeof Layout> = (args) => {
  const isSmallLayout = useLayout(['mobile', 'tablet']);

  const footerLogo: FooterProps['logo'] = {
    src: isSmallLayout ? 'sf_logod.jpg' : 'sf_logod_vertikaalne.jpg',
    alt: 'logo',
    style: isSmallLayout
      ? { width: '9rem', height: '5.25rem', borderRadius: '0.25rem' }
      : { width: '3.75rem', height: '7rem', borderRadius: '0.25rem' },
  };

  const footerProps = { ...args.footer, logo: footerLogo } as FooterProps;

  return (
    <Layout {...args} footer={footerProps}>
      {args.children}
    </Layout>
  );
};

export const Default: Story = {
  render: Template,

  args: {
    children: defaultContent,
    header: defaultHeader,
    sideNav: SidenavDefault.args as SideNavProps,
    footer: FooterDefault.args as FooterProps,
    breadcrumbsProps: BreadcrumbsDefault.args as BreadcrumbsProps,
    mainLogo: {
      src: 'sf_logod.jpg',
      alt: 'European structure and investing logo',
      style: { width: '6.625rem', height: '4rem', borderRadius: '0.25rem' },
    },
  },
};

/**
 * Layout with a public header. Public header is simpler, it supports custom content when `Header.enablePublicCustomContent` is true (default false).
 * It would render navigation to `Header` on larger screens based on breakpoints in `SideNav.breakToHeader` prop. When `SideNav.breakToHeader` breakpoint is met, custom content is not rendered.
 * <br/>
 * It can be used for public pages.
 */
export const Public: Story = {
  render: Template,

  args: {
    ...Default.args,
    header: publicHeader,
    sideNav: SidenavPublic.args as SideNavProps,
    headerType: 'public',
    breadcrumbsProps: undefined,
  },
};

/**
 * Layout with a public header and custom content enabled: `Header.enablePublicCustomContent` set to true (default false).
 * It would render navigation to `Header` on larger screens based on breakpoints in `SideNav.breakToHeader` prop.
 * <br/>
 * When `SideNav.breakToHeader` breakpoint is met, custom content is not rendered.
 */
export const PublicWithCustomContent: Story = {
  render: Template,
  args: {
    ...Public.args,
    header: publicHeaderWithCustomContent,
  },
};

/**
 * Layout with a notification. Notification is rendered HeaderNotification. It can be used to display important system-wide messages to user.
 */
export const WithNotification: Story = {
  render: Template,

  args: {
    ...Default.args,
    header: {
      ...defaultHeader,
      notification: {
        children: (
          <>
            <Text element="span" modifiers="bold">
              Attention!
            </Text>{' '}
            There are issues with &quot;health&quot; menu links. We are aware and are already working the problem.
          </>
        ),
      },
    },
  },
};

/**
 * Layout with a notice. Notice is rendered BottomContent and passed Card props to style the notice.<br/>
 * It can be used to display important information to user.
 */
export const WithNotice: Story = {
  render: Template,

  args: {
    ...Default.args,
    header: {
      ...defaultHeader,
      bottomContent: {
        children: (
          <Text modifiers="center">
            Viewer role: <b>Asta Sarapuu</b>
          </Text>
        ),
        cardProps: {
          border: 'top-warning-main',
          background: 'warning-highlight',
        },
      },
    },
  },
};

/**
 * When we need to have the main content take all available space. For example a 404 page with illustration.
 */
export const MainGrow: Story = {
  render: Template,

  args: {
    ...Default.args,
    growMainContent: true,
    sideNav: undefined,
    breadcrumbsProps: undefined,
    mainLogo: undefined,
    children: (
      <>
        {/* NB! This is only an example. Illustrations responsiveness must be implemented in app. */}
        <StretchContent className="not-found">
          <img alt="404 Page" src="404.svg" className="not-found__image" />
        </StretchContent>
      </>
    ),
  },
};

/**
 * Layout with a custom menu. The custom menu can be toggled using the header's sidenav toggle.
 */
export const WithCustomMenu: Story = {
  render: (args) => {
    const [isMenuShown, setIsMenuShown] = useState(false);
    return (
      <Layout {...args} header={defaultHeader} onHeaderSidenavToggle={() => setIsMenuShown(!isMenuShown)}>
        {/* NB! This is only an example. Custom menu implementation is not included. */}
        <div>Custom menu status: {isMenuShown ? 'Opened' : 'Closed'}</div>
      </Layout>
    );
  },
  args: {
    ...Default.args,
    breadcrumbsProps: undefined,
    sideNav: undefined,
  },
};
