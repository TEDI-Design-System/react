import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { isBreakpointBelow, useBreakpoint } from '../../../helpers';
import { Text } from '../../base/typography/text/text';
import { ProgressBar, ProgressBarProps } from './progress-bar';

const HINT = { text: 'Üleslaadimine', type: 'hint' } as const;

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.49.74?node-id=25616-189000&m=dev" target="_BLANK">Figma ↗</a>
 */
const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  title: 'TEDI-Ready/Components/Loader/ProgressBar',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.49.74?node-id=25616-189000&m=dev',
    },
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

type MatrixRow = { lines: string[]; props: ProgressBarProps };

const MatrixTable = ({ rows }: { rows: MatrixRow[] }): JSX.Element => {
  const breakpoint = useBreakpoint();
  const isMobile = isBreakpointBelow(breakpoint, 'md');

  return (
    <div className="example-list">
      {rows.map((row, index) => (
        <div
          key={row.lines.join('|')}
          className={`${index === rows.length - 1 ? '' : 'border-bottom'} padding-14-16`}
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            flexWrap: 'wrap',
            gap: '8px 24px',
            alignItems: isMobile ? 'stretch' : 'center',
          }}
        >
          <div style={{ flex: isMobile ? '0 0 auto' : '1 1 140px', margin: 0 }}>
            {row.lines.map((line) => (
              <Text key={line} modifiers="small">
                {line}
              </Text>
            ))}
          </div>
          <div style={{ flex: isMobile ? '0 0 auto' : '3 1 260px', minWidth: 0 }}>
            <ProgressBar {...row.props} />
          </div>
        </div>
      ))}
    </div>
  );
};

export const Default: Story = {
  args: { value: 60, ariaLabel: 'Edenemisriba pealkiri' },
};

const sizeRows: MatrixRow[] = [
  { lines: ['Default'], props: { value: 20, ariaLabel: 'Edenemisriba pealkiri', helper: HINT } },
  { lines: ['Small'], props: { value: 20, small: true, ariaLabel: 'Edenemisriba pealkiri', helper: HINT } },
];

export const Sizes: Story = {
  render: () => <MatrixTable rows={sizeRows} />,
  parameters: {
    docs: {
      source: {
        code: `<ProgressBar value={20} ariaLabel="Edenemisriba pealkiri" helper={{ text: 'Üleslaadimine', type: 'hint' }} />
<ProgressBar value={20} small ariaLabel="Edenemisriba pealkiri" helper={{ text: 'Üleslaadimine', type: 'hint' }} />`,
      },
    },
  },
};

const positionRows: MatrixRow[] = [
  {
    lines: ['Top title', 'Horizontal value', 'Bottom hint'],
    props: {
      value: 20,
      label: 'Edenemisriba pealkiri',
      required: true,
      labelPosition: 'top',
      valuePosition: 'horizontal',
      helper: HINT,
    },
  },
  {
    lines: ['Top title', 'Bottom value', 'Bottom hint'],
    props: {
      value: 20,
      label: 'Edenemisriba pealkiri',
      required: true,
      labelPosition: 'top',
      valuePosition: 'bottom',
      helper: HINT,
    },
  },
  {
    lines: ['Horizontal title', 'Horizontal value', 'Bottom hint'],
    props: {
      value: 20,
      label: 'Edenemisriba pealkiri',
      required: true,
      labelPosition: 'top',
      valuePosition: 'horizontal',
      helper: HINT,
      md: { labelPosition: 'horizontal' },
    },
  },
  {
    lines: ['Horizontal title', 'Bottom value', 'Bottom hint'],
    props: {
      value: 20,
      label: 'Edenemisriba pealkiri',
      required: true,
      labelPosition: 'top',
      valuePosition: 'bottom',
      helper: HINT,
      md: { labelPosition: 'horizontal' },
    },
  },
];

export const Position: Story = {
  render: () => <MatrixTable rows={positionRows} />,
  parameters: {
    docs: {
      source: {
        code: `<ProgressBar value={20} label="Edenemisriba pealkiri" required labelPosition="top" valuePosition="horizontal" helper={{ text: 'Üleslaadimine', type: 'hint' }} />
<ProgressBar value={20} label="Edenemisriba pealkiri" required labelPosition="top" valuePosition="bottom" helper={{ text: 'Üleslaadimine', type: 'hint' }} />
<ProgressBar value={20} label="Edenemisriba pealkiri" required labelPosition="top" valuePosition="horizontal" helper={{ text: 'Üleslaadimine', type: 'hint' }} md={{ labelPosition: 'horizontal' }} />
<ProgressBar value={20} label="Edenemisriba pealkiri" required labelPosition="top" valuePosition="bottom" helper={{ text: 'Üleslaadimine', type: 'hint' }} md={{ labelPosition: 'horizontal' }} />`,
      },
    },
  },
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '720px' }}>
      <ProgressBar
        value={40}
        label="Progress"
        required
        valuePosition="bottom"
        helper={{ text: 'Üleslaadimine', type: 'hint' }}
      />
      <ProgressBar
        value={40}
        label="Küsitluses osalenutest olid vanuses 15-18"
        labelPosition="top"
        md={{ labelPosition: 'horizontal' }}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<ProgressBar value={40} label="Progress" required valuePosition="bottom" helper={{ text: 'Üleslaadimine', type: 'hint' }} />
<ProgressBar value={40} label="Küsitluses osalenutest olid vanuses 15-18" labelPosition="top" lg={{ labelPosition: 'top' }} />`,
      },
    },
  },
};

export const Regular: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '720px' }}>
      <ProgressBar value={40} ariaLabel="Edenemisriba pealkiri" />
      <ProgressBar value={40} ariaLabel="Edenemisriba pealkiri" valueLabel="1 / 5" />
      <ProgressBar value={40} ariaLabel="Edenemisriba pealkiri" valuePosition="bottom" />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<ProgressBar value={40} ariaLabel="Edenemisriba pealkiri" />
<ProgressBar value={40} ariaLabel="Edenemisriba pealkiri" valueLabel="1 / 5" />
<ProgressBar value={40} ariaLabel="Edenemisriba pealkiri" valuePosition="bottom" />`,
      },
    },
  },
};

export const WithHint: Story = {
  args: {
    value: 40,
    ariaLabel: 'Edenemisriba pealkiri',
    helper: HINT,
  },
};

/**
 * An error row below the bar (announced via `role="alert"`).
 */
export const WithError: Story = {
  args: {
    value: 40,
    ariaLabel: 'Edenemisriba pealkiri',
    helper: { text: 'Üleslaadimine ebaõnnestus, fail on liiga suur', type: 'error' },
  },
};

export const ValueHidden: Story = {
  args: {
    value: 60,
    ariaLabel: 'Edenemisriba pealkiri',
    showValue: false,
  },
};

export const Responsive: Story = {
  args: {
    value: 40,
    label: 'Edenemisriba pealkiri',
    labelPosition: 'top',
    valuePosition: 'bottom',
    helper: HINT,
    md: { labelPosition: 'horizontal', valuePosition: 'horizontal' },
  },
};

/**
 * Use `ProgressBar` as a busy / loader indicator by owning the `value` from
 * outside the component — there's no built-in indeterminate animation, but a
 * stateful consumer can drive the bar however it likes.
 */
export const Animated: Story = {
  render: function AnimatedStory() {
    const [value, setValue] = useState(0);
    useEffect(() => {
      const id = window.setInterval(() => {
        setValue((v) => (v >= 100 ? 0 : v + 5));
      }, 300);
      return () => window.clearInterval(id);
    }, []);
    return <ProgressBar value={value} label="Üleslaadimine..." />;
  },
};
