import { fireEvent, render, screen } from '@testing-library/react';

import { BaseMapOption, BaseMapSelection } from './base-map-selection';

const renderSelection = (props?: Partial<React.ComponentProps<typeof BaseMapSelection>>) =>
  render(
    <BaseMapSelection id="basemap" title="Active map" content={<img src="active.png" alt="Active map" />} {...props}>
      <BaseMapSelection.Option id="streets" title="Streets" content={<img src="streets.png" alt="Streets" />} />
      <BaseMapSelection.Option id="satellite" title="Satellite" content={<img src="satellite.png" alt="Satellite" />} />
    </BaseMapSelection>
  );

describe('BaseMapSelection', () => {
  it('renders the trigger button labelled by its title', () => {
    renderSelection();
    expect(screen.getByRole('button', { name: 'Active map' })).toBeInTheDocument();
  });

  it('keeps the popover closed until the trigger is clicked', () => {
    renderSelection();
    expect(screen.queryByText('Streets')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Active map' }));

    expect(screen.getByText('Streets')).toBeInTheDocument();
    expect(screen.getByText('Satellite')).toBeInTheDocument();
  });

  it('renders the transparency slider only when enabled', () => {
    const { rerender } = renderSelection();
    fireEvent.click(screen.getByRole('button', { name: 'Active map' }));
    expect(screen.queryByRole('slider')).not.toBeInTheDocument();

    rerender(
      <BaseMapSelection
        id="basemap"
        title="Active map"
        content={<img src="active.png" alt="Active map" />}
        showTransparency
      >
        <BaseMapSelection.Option id="streets" title="Streets" content={<img src="streets.png" alt="Streets" />} />
      </BaseMapSelection>
    );

    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('calls onTransparencyChange when the slider value changes', () => {
    const onTransparencyChange = jest.fn();
    renderSelection({ showTransparency: true, transparency: 50, onTransparencyChange });

    fireEvent.click(screen.getByRole('button', { name: 'Active map' }));
    fireEvent.change(screen.getByRole('slider'), { target: { value: '60' } });

    expect(onTransparencyChange).toHaveBeenCalledWith(60);
  });

  it('associates the transparency numeric field with its label', () => {
    renderSelection({ showTransparency: true, transparency: 50, transparencyLabel: 'Map transparency' });

    fireEvent.click(screen.getByRole('button', { name: 'Active map' }));

    const field = screen.getByRole('spinbutton', { name: 'Map transparency' });
    expect(field).toHaveAttribute('id', 'basemap-transparency');
  });

  it('calls onTransparencyChange when the numeric field value changes', () => {
    const onTransparencyChange = jest.fn();
    renderSelection({
      showTransparency: true,
      transparency: 50,
      transparencyLabel: 'Map transparency',
      onTransparencyChange,
    });

    fireEvent.click(screen.getByRole('button', { name: 'Active map' }));
    fireEvent.change(screen.getByRole('spinbutton', { name: 'Map transparency' }), { target: { value: '70' } });

    expect(onTransparencyChange).toHaveBeenCalledWith(70);
  });

  it('clamps an out-of-range transparency value consistently in the slider and the field', () => {
    renderSelection({ showTransparency: true, transparency: 150, transparencyLabel: 'Map transparency' });

    fireEvent.click(screen.getByRole('button', { name: 'Active map' }));

    expect(screen.getByRole('slider')).toHaveValue('100');
    expect(screen.getByRole('spinbutton', { name: 'Map transparency' })).toHaveValue(100);
  });

  it('reports a clamped value when the numeric field exceeds the range', () => {
    const onTransparencyChange = jest.fn();
    renderSelection({
      showTransparency: true,
      transparency: 50,
      transparencyLabel: 'Map transparency',
      onTransparencyChange,
    });

    fireEvent.click(screen.getByRole('button', { name: 'Active map' }));
    fireEvent.change(screen.getByRole('spinbutton', { name: 'Map transparency' }), { target: { value: '150' } });

    expect(onTransparencyChange).toHaveBeenCalledWith(100);
  });

  it('keeps slider edits in uncontrolled mode (no transparency prop)', () => {
    renderSelection({ showTransparency: true, transparencyLabel: 'Map transparency' });

    fireEvent.click(screen.getByRole('button', { name: 'Active map' }));

    const slider = screen.getByRole('slider');
    expect(slider).toHaveValue('0');

    fireEvent.change(slider, { target: { value: '40' } });

    expect(slider).toHaveValue('40');
    expect(screen.getByRole('spinbutton', { name: 'Map transparency' })).toHaveValue(40);
  });

  it('seeds uncontrolled mode from defaultTransparency, clamped', () => {
    renderSelection({ showTransparency: true, defaultTransparency: 150, transparencyLabel: 'Map transparency' });

    fireEvent.click(screen.getByRole('button', { name: 'Active map' }));

    expect(screen.getByRole('slider')).toHaveValue('100');
    expect(screen.getByRole('spinbutton', { name: 'Map transparency' })).toHaveValue(100);
  });
});

describe('BaseMapOption', () => {
  it('renders its title and is exposed as a button', () => {
    render(<BaseMapOption id="streets" title="Streets" content={<img src="streets.png" alt="Streets" />} />);
    const option = screen.getByRole('button', { name: /Streets/ });
    expect(option).toBeInTheDocument();
    expect(option).toHaveAttribute('aria-pressed', 'false');
  });

  it('reflects the selected state via aria-pressed', () => {
    render(<BaseMapOption selected id="streets" title="Streets" content={<img src="streets.png" alt="Streets" />} />);
    expect(screen.getByRole('button', { name: /Streets/ })).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onSelect on click and on Enter/Space', () => {
    const onSelect = jest.fn();
    render(
      <BaseMapOption
        id="streets"
        title="Streets"
        onSelect={onSelect}
        content={<img src="streets.png" alt="Streets" />}
      />
    );
    const option = screen.getByRole('button', { name: /Streets/ });

    fireEvent.click(option);
    fireEvent.keyDown(option, { key: 'Enter' });
    fireEvent.keyDown(option, { key: ' ' });

    expect(onSelect).toHaveBeenCalledTimes(3);
  });

  it('exposes the disabled state and removes itself from the tab order', () => {
    render(<BaseMapOption disabled id="streets" title="Streets" content={<img src="streets.png" alt="Streets" />} />);
    const option = screen.getByRole('button', { name: /Streets/ });

    expect(option).toHaveAttribute('aria-disabled', 'true');
    expect(option).toHaveAttribute('tabindex', '-1');
  });

  it('does not call onSelect when disabled, on click or keyboard', () => {
    const onSelect = jest.fn();
    render(
      <BaseMapOption
        disabled
        id="streets"
        title="Streets"
        onSelect={onSelect}
        content={<img src="streets.png" alt="Streets" />}
      />
    );
    const option = screen.getByRole('button', { name: /Streets/ });

    fireEvent.click(option);
    fireEvent.keyDown(option, { key: 'Enter' });
    fireEvent.keyDown(option, { key: ' ' });

    expect(onSelect).not.toHaveBeenCalled();
  });

  describe('title truncation tooltip', () => {
    const stubTitleWidths = (scrollWidth: number, clientWidth: number) => {
      Object.defineProperty(HTMLElement.prototype, 'scrollWidth', { configurable: true, value: scrollWidth });
      Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: clientWidth });
    };

    afterEach(() => {
      stubTitleWidths(0, 0);
    });

    it('shows the full title in a tooltip on hover when the title is truncated', () => {
      stubTitleWidths(200, 100);
      const title = 'A Very Long Base Map Title';
      render(<BaseMapOption id="streets" title={title} content={<img src="streets.png" alt="Streets" />} />);

      expect(screen.getAllByText(title)).toHaveLength(1);

      fireEvent.mouseEnter(screen.getByText(title));

      expect(screen.getAllByText(title)).toHaveLength(2);
    });

    it('does not render a tooltip when the title fits', () => {
      stubTitleWidths(100, 100);
      render(<BaseMapOption id="streets" title="Streets" content={<img src="streets.png" alt="Streets" />} />);

      fireEvent.mouseEnter(screen.getByText('Streets'));

      expect(screen.getAllByText('Streets')).toHaveLength(1);
    });
  });

  describe('info tooltip', () => {
    it('renders no icon when tooltipText is not set', () => {
      render(<BaseMapOption id="streets" title="Streets" content={<img src="streets.png" alt="Streets" />} />);

      expect(screen.queryByText('info')).not.toBeInTheDocument();
      expect(screen.queryByText('error')).not.toBeInTheDocument();
    });

    it('renders an info icon that reveals the tooltip text on hover', () => {
      render(
        <BaseMapOption
          id="streets"
          title="Streets"
          tooltipText="Additional information"
          content={<img src="streets.png" alt="Streets" />}
        />
      );

      const trigger = screen.getByText('info').closest('span[class*="__info"]');
      expect(trigger).not.toBeNull();
      expect(screen.queryByText('Additional information')).not.toBeInTheDocument();

      fireEvent.mouseEnter(trigger as HTMLElement);

      expect(screen.getByText('Additional information')).toBeInTheDocument();
    });

    it('keeps the info tooltip available when the option is disabled', () => {
      render(
        <BaseMapOption
          disabled
          id="streets"
          title="Streets"
          tooltipText="Additional information"
          content={<img src="streets.png" alt="Streets" />}
        />
      );

      const trigger = screen.getByText('info').closest('span[class*="__info"]');
      expect(trigger).not.toBeNull();

      fireEvent.mouseEnter(trigger as HTMLElement);

      expect(screen.getByText('Additional information')).toBeInTheDocument();
    });

    it('renders the error icon variant when tooltipType is "error"', () => {
      render(
        <BaseMapOption
          id="streets"
          title="Streets"
          tooltipText="This layer is unavailable"
          tooltipType="error"
          content={<img src="streets.png" alt="Streets" />}
        />
      );

      const trigger = screen.getByText('error').closest('span[class*="__info"]');
      expect(trigger).not.toBeNull();

      fireEvent.mouseEnter(trigger as HTMLElement);

      expect(screen.getByText('This layer is unavailable')).toBeInTheDocument();
    });
  });
});
