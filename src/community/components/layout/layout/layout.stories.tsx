import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Section } from '../../../../tedi/components/content/section/section';
import { VerticalSpacing } from '../../../../tedi/components/layout/vertical-spacing';
import { StretchContent } from '../../../../tedi/components/misc/stretch-content/stretch-content';
import useLayout from '../../../helpers/hooks/use-layout';
import Button from '../../button/button';
import Heading from '../../typography/heading/heading';
import Breadcrumbs, { BreadcrumbsProps } from '../breadcrumbs/breadcrumbs';
import { Default as BreadcrumbsDefault } from '../breadcrumbs/breadcrumbs.stories';
import Footer, { FooterProps } from '../footer/footer';
import { Default as FooterDefault } from '../footer/footer.stories';
import { Header, HeaderProps } from '../header';
import { Default as HeaderNotificationDefault } from '../header/components/header-notification/header-notification.stories';
import {
  BottomContent as HeaderBottomContent,
  Default as HeaderDefault,
  Public as HeaderPublic,
  PublicWithCustomContent as HeaderPublicWithCustomContent,
} from '../header/header.stories';
import SideNav, { SideNavProps } from '../sidenav/sidenav';
import { Default as SidenavDefault, Public as SidenavPublic } from '../sidenav/sidenav.stories';
import { Layout } from './layout';

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
    Header,
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
    backgrounds: { default: 'subtle' },
  },
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
    header: HeaderDefault.args as HeaderProps<'a'>,
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
    header: HeaderPublic.args as HeaderProps<'a'>,
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
    header: HeaderPublicWithCustomContent.args as HeaderProps<'a'>,
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
      ...(HeaderDefault.args as HeaderProps<'a'>),
      notification: {
        ...HeaderNotificationDefault.args,
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
    header: HeaderBottomContent.args as HeaderProps<'a'>,
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
      <Layout
        {...args}
        header={HeaderDefault.args as HeaderProps<'a'>}
        onHeaderSidenavToggle={() => setIsMenuShown(!isMenuShown)}
      >
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
