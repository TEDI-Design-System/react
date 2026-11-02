import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import NextLink from 'next/link';
import { ElementType, forwardRef } from 'react';

import { Text, TextProps } from '../../base/typography/text/text';
import { Card } from '../../content/card';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Link, LinkProps } from './link';

/**
 * <a href="https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2160-25385&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/76e0c0-link" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof Link> = {
  component: Link,
  title: 'TEDI-Ready/Components/Navigation/Link',
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2160-25385&m=dev',
    },
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

const linkStateArray = ['Default', 'Hover', 'Active', 'Focus'];
const Template: StoryFn<LinkProps<ElementType>> = (args) => <Link href="#" {...args} />;

export const Default = {
  render: Template,
  argTypes: {
    as: {
      control: false,
      table: {
        type: { summary: 'ElementType' },
      },
    },
  },
  args: {
    children: 'Link',
  },
};

const sizeArray = ['default', 'small'];

const SizeTemplate: StoryFn = () => {
  return (
    <div className="example-list">
      {sizeArray.map((size, key) => (
        <Row className={`${key === sizeArray.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <Col className="flex w-50">
            <b>{size.charAt(0).toUpperCase() + size.slice(1)}</b>
          </Col>
          <Col className="flex">
            <Link size={size as LinkProps['size']} href="#">
              View result
            </Link>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export const Sizes = {
  render: SizeTemplate,
};

const ColorTemplate: StoryFn = () => {
  return (
    <Row gap={3}>
      <Link href="#">
        Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad
        on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
      </Link>
      <Link href="#" underline={false}>
        Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja karvad
        on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
      </Link>
      <Row
        gap={3}
        style={{
          background: 'var(--general-icon-background-brand-primary)',
          borderRadius: '4px',
          padding: '1rem',
          margin: '0px',
        }}
      >
        <Link href="#" color="inverted">
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja
          karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </Link>
        <Link href="#" color="inverted" underline={false}>
          Rebane on väikese koera suurune ja pika koheva sabaga. Joostes hoiab ta saba horisontaalselt. Tema selja
          karvad on oranžid. Eestis eelistab ta elupaigana metsatukkasid.
        </Link>
      </Row>
    </Row>
  );
};

export const Colors = {
  render: ColorTemplate,
};

type TemplateMultipleProps<Type = typeof linkStateArray> = Omit<LinkProps<'a'>, 'children'> & {
  array: Type;
  titleColor?: TextProps['color'];
  idPrefix?: string;
};

const TemplateColumn: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, titleColor, idPrefix, ...buttonProps } = args;
  const getId = (value: string, index: number) => (idPrefix ? `${idPrefix}-${value}-${index}` : value);

  return (
    <>
      <VerticalSpacing size={1}>
        <Row>
          <Col md={1}></Col>
          <Col>
            <Text color={titleColor} modifiers="bold">
              Default
            </Text>
          </Col>
          <Col className="text-bold">
            <Text color={titleColor} modifiers="bold">
              Small
            </Text>
          </Col>
        </Row>
        {array.map((value, key) => (
          <Row key={key}>
            <Col md={1} className="flex align-items-center">
              <Text color={titleColor} modifiers="bold">
                {value}
              </Text>
            </Col>
            <Col className="flex align-items-center gap-3">
              <Link id={getId(value, 1)} href="#" {...buttonProps}>
                Create
              </Link>
              <Link id={getId(value, 2)} href="#" {...buttonProps} iconRight="arrow_right_alt">
                Continue
              </Link>
              <Link id={getId(value, 3)} href="#" {...buttonProps} iconLeft="edit">
                Edit
              </Link>
            </Col>
            <Col className="flex align-items-center gap-3">
              <Link id={getId(value, 4)} href="#" size="small" {...buttonProps}>
                Create
              </Link>
              <Link id={getId(value, 5)} href="#" size="small" {...buttonProps} iconRight="arrow_right_alt">
                Continue
              </Link>
              <Link id={getId(value, 6)} href="#" size="small" {...buttonProps} iconLeft="edit">
                Edit
              </Link>
            </Col>
          </Row>
        ))}
      </VerticalSpacing>
    </>
  );
};

export const DefaultUnderlined: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: linkStateArray,
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
};

export const DefaultNoUnderline: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: linkStateArray,
    underline: false,
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
};

export const InvertedUnderline: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: linkStateArray,
    color: 'inverted',
    titleColor: 'white',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
  globals: { backgrounds: { value: 'brand' } },
};

export const InvertedNoUnderline: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: linkStateArray,
    color: 'inverted',
    titleColor: 'white',
    underline: false,
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
  globals: { backgrounds: { value: 'brand' } },
};

export const AsPrimaryButton: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: linkStateArray,
    visualType: 'primary',
    underline: false,
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focusVisible: '#Focus',
    },
  },
};

export const CustomComponent: StoryObj<LinkProps> = {
  render: () => {
    // reuse this function when you want to pass it into other components that accept Anchor props (E.g. Logo, Header etc)
    const LinkBehaviour = forwardRef<HTMLAnchorElement, React.ComponentProps<typeof NextLink>>(
      ({ children, className, ...rest }, ref) => {
        return (
          <NextLink ref={ref} className={className} {...rest}>
            {children}
          </NextLink>
        );
      }
    );
    LinkBehaviour.displayName = 'LinkBehaviour';

    // reuse this component when you want to render <Anchor> in JSX. NB! Do not pass this to other components link(s) props.
    const CustomAnchor = (props: LinkProps<typeof NextLink>) => {
      return <Link as={LinkBehaviour} {...props} />;
    };

    return (
      <Row justifyContent="around">
        <Col width="auto">
          <Link href="#">Plain link</Link>
        </Col>
        <Col width="auto">
          <Link
            as={LinkBehaviour}
            iconRight="north_east"
            href={{ pathname: '/path', query: { personalCode: '1234567' } }}
          >
            Next.js link with custom logic
          </Link>
        </Col>
        <Col width="auto">
          <CustomAnchor iconRight="north_east" href={{ pathname: '/path', query: { personalCode: '1234567' } }}>
            Wrapped Next.js link
          </CustomAnchor>
        </Col>
      </Row>
    );
  },
};

export const NoStyleLink = {
  args: {
    noStyle: true,
    href: 'https://www.tehik.ee/',
    children: <img width={200} src="tehik_logo.png" alt="tehik.ee" />,
    target: '_blank',
  },
};

export const FullWidth = {
  args: {
    fullWidth: true,
    href: '#',
    visualType: 'primary',
    children: 'Link that stretches',
    underline: false,
  },
};

export const LongTextIconInline: Story = {
  args: {
    children: 'This is a very long link text that should wrap into multiple lines',
  },

  render: (args) => (
    <Row>
      <Col md={4}>
        <Link iconLeft="notifications">{args.children}</Link>
      </Col>
      <Col md={4}>
        <Link iconRight="north_east">{args.children}</Link>
      </Col>
    </Row>
  ),
};

export const LinkIconFlexed: Story = {
  args: {
    children: 'This is a very long link text that should wrap into multiple lines',
  },

  render: (args) => (
    <Row>
      <Col md={4}>
        <Link iconLeft="notifications" iconStandalone>
          {args.children}
        </Link>
      </Col>
      <Col md={4}>
        <Link iconRight="north_east" iconStandalone>
          {args.children}
        </Link>
      </Col>
    </Row>
  ),
};

const visualTestVariants: { label: string; idPrefix: string; inverted?: boolean; props: Partial<LinkProps<'a'>> }[] = [
  { label: 'Default underlined', idPrefix: 'vt-underlined', props: {} },
  { label: 'Default no underline', idPrefix: 'vt-no-underline', props: { underline: false } },
  { label: 'Inverted underline', idPrefix: 'vt-inverted-underline', inverted: true, props: { color: 'inverted' } },
  {
    label: 'Inverted no underline',
    idPrefix: 'vt-inverted-no-underline',
    inverted: true,
    props: { color: 'inverted', underline: false },
  },
  { label: 'As primary button', idPrefix: 'vt-primary-button', props: { visualType: 'primary', underline: false } },
];

const longText = 'This is a very long link text that should wrap into multiple lines';

/** Chromatic snapshot for Link: add every new visual variant here too. */
export const VisualTest: Story = {
  tags: ['!dev', '!autodocs'],
  parameters: {
    chromatic: { disableSnapshot: false },
    pseudo: {
      hover: '[id^="vt-"][id*="-Hover-"]',
      active: '[id^="vt-"][id*="-Active-"]',
      focusVisible: '[id^="vt-"][id*="-Focus-"]',
    },
  },
  render: () => (
    <VerticalSpacing size={2}>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Default</Text>
        <Link href="#">Link</Link>
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Sizes</Text>
        <SizeTemplate />
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Colors</Text>
        <ColorTemplate />
      </VerticalSpacing>
      {visualTestVariants.map(({ label, idPrefix, inverted, props }) =>
        inverted ? (
          <Card key={idPrefix} background="brand-primary" borderless>
            <Card.Content>
              <VerticalSpacing size={0.5}>
                <Text modifiers="bold" color="white">
                  {label}
                </Text>
                <TemplateColumn array={linkStateArray} titleColor="white" idPrefix={idPrefix} {...props} />
              </VerticalSpacing>
            </Card.Content>
          </Card>
        ) : (
          <VerticalSpacing key={idPrefix} size={0.5}>
            <Text modifiers="bold">{label}</Text>
            <TemplateColumn array={linkStateArray} idPrefix={idPrefix} {...props} />
          </VerticalSpacing>
        )
      )}
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Custom component</Text>
        {CustomComponent.render?.({} as never, {} as never)}
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">No style link</Text>
        <Link noStyle href="https://www.tehik.ee/" target="_blank">
          <img width={200} src="tehik_logo.png" alt="tehik.ee" />
        </Link>
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Full width</Text>
        <Link fullWidth href="#" visualType="primary" underline={false}>
          Link that stretches
        </Link>
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Long text icon inline</Text>
        <Row>
          <Col md={4}>
            <Link iconLeft="notifications">{longText}</Link>
          </Col>
          <Col md={4}>
            <Link iconRight="north_east">{longText}</Link>
          </Col>
        </Row>
      </VerticalSpacing>
      <VerticalSpacing size={0.5}>
        <Text modifiers="bold">Link icon flexed</Text>
        <Row>
          <Col md={4}>
            <Link iconLeft="notifications" iconStandalone>
              {longText}
            </Link>
          </Col>
          <Col md={4}>
            <Link iconRight="north_east" iconStandalone>
              {longText}
            </Link>
          </Col>
        </Row>
      </VerticalSpacing>
    </VerticalSpacing>
  ),
};
