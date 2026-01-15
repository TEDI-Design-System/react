import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Text } from '../../base/typography/text/text';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Search, SearchProps } from './search';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4620-82860&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/4013b4-search" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<SearchProps> = {
  component: Search,
  title: 'TEDI-Ready/Components/Form/Search',
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4620-82860&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<SearchProps>;

const stateArray = ['Default', 'Hover', 'Focus', 'Active', 'Disabled'];
const sizeArray: SearchProps['size'][] = ['small', 'default', 'large'];

interface TemplateStateProps extends SearchProps {
  array: typeof stateArray;
}

interface TemplateMultipleProps<Type = SearchProps['size']> extends SearchProps {
  array: Type[];
  property: keyof SearchProps;
}

const TemplateColumn: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, property, id = 'search', ...textFieldProps } = args;

  return (
    <div className="example-list">
      {array.map((value, key) => {
        const baseId = `${id}-${property}-${value}`;

        return (
          <Row className={`${key === array.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
            <Col width={2}>
              <Text modifiers="bold">{value ? value.charAt(0).toUpperCase() + value.slice(1) : ''}</Text>
            </Col>
            <Col>
              <VerticalSpacing>
                <Search {...textFieldProps} {...{ [property]: value }} id={`${baseId}-plain`} />
                <Search
                  {...textFieldProps}
                  {...{ [property]: value }}
                  id={`${baseId}-icon`}
                  button={{ icon: 'search', size: value, 'aria-label': 'Search' }}
                />
                <Search
                  {...textFieldProps}
                  {...{ [property]: value }}
                  id={`${baseId}-button`}
                  button={{ iconLeft: 'search', children: 'Search', size: value }}
                />
              </VerticalSpacing>
            </Col>
          </Row>
        );
      })}
    </div>
  );
};

const TemplateColumnWithStates: StoryFn<TemplateStateProps> = (args) => {
  const { array, id = 'search', ...textFieldProps } = args;

  return (
    <div className="state-example">
      {array.map((state, index) => {
        const stateId = `${id}-${state.toLowerCase()}`;

        return (
          <Row key={index} className="padding-14-16">
            <Col lg={2} md={12} className="display-flex align-items-center">
              <Text modifiers="bold">{state}</Text>
            </Col>
            <Col lg={10} md={12} className="display-flex align-items-center">
              <Search {...textFieldProps} id={stateId} disabled={state === 'Disabled'} />
            </Col>
          </Row>
        );
      })}

      <Row className="padding-14-16">
        <Col width={2} className="display-flex align-items-center">
          <Text modifiers="bold">Success</Text>
        </Col>
        <Col className="display-flex align-items-center">
          <Search {...textFieldProps} id={`${id}-success`} helper={{ text: 'Feedback text', type: 'valid' }} />
        </Col>
      </Row>

      <Row className="padding-14-16">
        <Col width={2} className="display-flex align-items-center">
          <Text modifiers="bold">Error</Text>
        </Col>
        <Col className="display-flex align-items-center">
          <Search {...textFieldProps} id={`${id}-error`} helper={{ text: 'Feedback text', type: 'error' }} />
        </Col>
      </Row>
    </div>
  );
};

export const Default: Story = {
  args: {
    id: 'search-default',
    label: 'Search',
    placeholder: 'Search by name or keyword',
  },
};

export const Sizes: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    id: 'search-sizes',
    label: 'Search',
    property: 'size',
    array: sizeArray,
  },
};

export const States: StoryObj<TemplateStateProps> = {
  render: TemplateColumnWithStates,
  args: {
    array: stateArray,
    label: 'Search',
    id: 'search-states',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      focus: '#Focus',
      active: '#Active',
    },
  },
};

export const Placeholder: Story = {
  args: {
    id: 'search-placeholder',
    label: 'Search',
    placeholder: 'Type something...',
  },
};

export const Clearable: Story = {
  args: {
    id: 'search-clearable',
    label: 'Search',
    isClearable: true,
    value: 'Lorem ipsum',
  },
};

export const ClearableButton: Story = {
  args: {
    id: 'search-clearable-button',
    label: 'Search',
    isClearable: true,
    value: 'Lorem ipsum',
    button: { iconLeft: 'search', children: 'Search' },
  },
};

export const WithHint: Story = {
  args: {
    id: 'search-with-hint',
    label: 'Search',
    helper: { text: 'Hint text' },
  },
};

export const Estonian: Story = {
  args: {
    id: 'search-et',
    label: 'Otsing',
    placeholder: 'Otsi tooteid, artikleid või abiinfot...',
    ariaLabel: 'Otsi kogu saidilt',
    button: { iconLeft: 'search', children: 'Otsi' },
  },
};

export const AccessibilityFocused: Story = {
  name: 'Accessibility: No Visible Label',
  args: {
    id: 'search-accessible',
    placeholder: 'Otsi tooteid või teenuseid...',
    ariaLabel: 'Otsi tooteid või teenuseid',
  },
  parameters: {
    a11y: {
      config: {
        rules: {
          label: { enabled: false },
        },
      },
    },
    docs: {
      description: {
        story: `
Always prefer a native \`<label>\` element for form controls.
If the label must not be visible in the UI, hide it visually using an \`sr-only\` (or equivalent) class rather than removing it. This preserves correct semantics and provides the most reliable experience for screen reader users.
Use \`ariaLabel\` only as a fallback when a real \`<label>\` cannot be rendered. This follows WCAG 2.1 and EN 301 549 9.2.5.3.
          `,
      },
    },
  },
};
