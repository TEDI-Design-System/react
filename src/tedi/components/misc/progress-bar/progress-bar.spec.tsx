import { render, screen } from '@testing-library/react';

import { ProgressBar } from './progress-bar';

import '@testing-library/jest-dom';

describe('ProgressBar', () => {
  it('renders a progressbar with default value 0', () => {
    render(<ProgressBar />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '0');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
  });

  it('reflects the value on aria-valuenow and as fill width', () => {
    render(<ProgressBar value={42} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '42');
    const fill = bar.firstElementChild as HTMLElement;
    expect(fill).toHaveStyle({ width: '42%' });
  });

  it('clamps out-of-range values to 0..100', () => {
    const { rerender } = render(<ProgressBar value={150} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
    rerender(<ProgressBar value={-20} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });

  it('treats NaN as 0', () => {
    render(<ProgressBar value={Number.NaN} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });

  it('renders the label and wires aria-labelledby', () => {
    render(<ProgressBar label="Upload" value={60} />);
    const bar = screen.getByRole('progressbar', { name: /upload/i });
    expect(bar).toBeInTheDocument();
    expect(screen.getByText('Upload')).toBeInTheDocument();
  });

  it('falls back to ariaLabel when no visible label is provided', () => {
    render(<ProgressBar ariaLabel="Uploading file" value={10} />);
    expect(screen.getByRole('progressbar', { name: 'Uploading file' })).toBeInTheDocument();
  });

  it('shows the percentage by default', () => {
    render(<ProgressBar value={37} />);
    expect(screen.getByText('37%')).toBeInTheDocument();
  });

  it('hides the percentage when showValue=false', () => {
    render(<ProgressBar value={37} showValue={false} />);
    expect(screen.queryByText('37%')).not.toBeInTheDocument();
  });

  it('uses valueLabel as the visible text and exposes it via aria-valuetext', () => {
    render(<ProgressBar value={20} valueLabel="1 / 5" />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '20');
    expect(bar).toHaveAttribute('aria-valuetext', '1 / 5');
    expect(screen.getByText('1 / 5')).toBeInTheDocument();
  });

  it('renders the helper feedback row when `helper` is provided', () => {
    render(<ProgressBar value={50} helper={{ text: 'Almost there', type: 'hint' }} />);
    expect(screen.getByText('Almost there')).toBeInTheDocument();
  });

  it('renders an error feedback row with role=alert', () => {
    render(<ProgressBar value={50} helper={{ text: 'Upload failed', type: 'error' }} />);
    expect(screen.getByRole('alert')).toHaveTextContent('Upload failed');
  });

  it('applies the small modifier when small=true', () => {
    const { container } = render(<ProgressBar value={10} small />);
    expect(container.querySelector('[data-name="progress-bar"]')).toHaveClass('tedi-progress-bar--small');
  });
});
