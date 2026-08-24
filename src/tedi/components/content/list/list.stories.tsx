import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import List, { ListProps } from './list';

/**
 * <a href="https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2137-19322&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/37b651-list" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof List> = {
  component: List,
  title: 'Tedi-Ready/Content/List',
  subcomponents: { 'List.Item': List.Item } as never,
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
    docs: {
      source: {
        transform: (code: string) => {
          return code.replaceAll('ListItem', 'List.Item');
        },
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2137-19322&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

const Template: StoryFn<Omit<ListProps, 'children'>> = (args) => (
  <List {...args}>
    <List.Item>Caesar salad</List.Item>
    <List.Item>
      Caesar salad
      <List {...args}>
        <List.Item>Dressing</List.Item>
      </List>
    </List.Item>
    <List.Item>
      Caesar salad
      <List {...args}>
        <List.Item>
          Dressing
          <List {...args}>
            <List.Item>Lemon juice</List.Item>
            <List.Item>Anchovies</List.Item>
          </List>
        </List.Item>
      </List>
    </List.Item>
  </List>
);

const TemplateUnorderedList: StoryFn<Omit<ListProps, 'children'>> = (args) => (
  <List {...args}>
    <List.Item>Potato</List.Item>
    <List.Item>Caesar salad</List.Item>
    <List.Item>
      Caesar salad
      <List {...args}>
        <List.Item>
          Dressing
          <List {...args}>
            <List.Item>Lemon juice</List.Item>
            <List.Item>Anchovies</List.Item>
            <List.Item>Parmesan cheese</List.Item>
            <List.Item>Worcestershire sauce</List.Item>
            <List.Item>Mustard</List.Item>
          </List>
        </List.Item>
      </List>
    </List.Item>
  </List>
);

const TemplateOrderedList: StoryFn<Omit<ListProps, 'children'>> = (args) => (
  <List {...args}>
    <List.Item>School homework</List.Item>
    <List.Item>
      Chores
      <List {...args}>
        <List.Item>Wash dishes</List.Item>
        <List.Item>
          Fold laundry
          <List {...args}>
            <List.Item>Iron the sheets</List.Item>
            <List.Item>Hang dresses</List.Item>
          </List>
        </List.Item>
      </List>
    </List.Item>
    <List.Item>Walk the dog</List.Item>
    <List.Item>Water the flowers</List.Item>
  </List>
);

const TemplateNoStyleList: StoryFn<Omit<ListProps, 'children'>> = (args) => (
  <List {...args}>
    <List.Item>
      Caesar salad
      <List {...args}>
        <List.Item>
          Dressing
          <List {...args}>
            <List.Item>Lemon juice</List.Item>
            <List.Item>Anchovies</List.Item>
          </List>
        </List.Item>
      </List>
    </List.Item>
  </List>
);

export const Default: Story = {
  render: Template,
  args: {
    style: 'styled',
    element: 'ul',
  },
};

export const UnorderedList: Story = {
  render: TemplateUnorderedList,
  args: {
    style: 'styled',
  },
};

export const OrderedList: Story = {
  render: TemplateOrderedList,
  args: {
    element: 'ol',
    style: 'styled',
  },
};

/**
 * `start` begins the numbering at a given value, and a single `List.Item` can
 * override its own number with `value` (following items continue from there).
 * This example starts at **5** and jumps the third item to **10**, so it renders
 * `5, 6, 10, 11`. The numbers are drawn with a CSS counter, so `List` seeds that
 * counter from `start` / `value` (the native attributes are also forwarded).
 */
export const OrderedListWithStart: Story = {
  name: 'Ordered list with start / value',
  render: (args) => (
    <List {...args} element="ol" start={5}>
      <List.Item>Starts at five</List.Item>
      <List.Item>Six</List.Item>
      <List.Item value={10}>Jumps to ten</List.Item>
      <List.Item>Eleven</List.Item>
    </List>
  ),
  args: {
    style: 'styled',
  },
};

/**
 * `reversed` counts the list down. With no `start` it begins at the item count
 * (here `3, 2, 1`); pass `start` to begin elsewhere. The numbers are a CSS
 * counter, so `List` applies a descending increment and seeds the first value.
 */
export const ReversedOrderedList: Story = {
  name: 'Reversed ordered list',
  render: (args) => (
    <List {...args} element="ol" reversed>
      <List.Item>Third</List.Item>
      <List.Item>Second</List.Item>
      <List.Item>First</List.Item>
    </List>
  ),
  args: {
    style: 'styled',
  },
};

export const NoStyleList: Story = {
  render: TemplateNoStyleList,
  args: {
    style: 'none',
  },
};
