import { render, screen } from '@testing-library/react';

import { Card } from './card';
import { CardContent } from './card-content/card-content';
import { CardContext } from './card-context';
import { CardHeader } from './card-header/card-header';

import '@testing-library/jest-dom';

describe('Card Component', () => {
  it('renders the Card component with default props', () => {
    render(
      <Card>
        <CardHeader>
          <h3>Card Title</h3>
        </CardHeader>
        <CardContent>
          <p>Description</p>
        </CardContent>
      </Card>
    );
    const card = screen.getByTestId('tedi-card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('tedi-card');
  });

  it('renders children components correctly', () => {
    render(
      <Card>
        <CardHeader>
          <h3>Title</h3>
        </CardHeader>
        <CardContent>
          <p>Hello</p>
        </CardContent>
      </Card>
    );

    const cardContent = screen.getByText('Hello');
    expect(cardContent).toBeInTheDocument();
  });

  it('provides context values to child components', () => {
    render(
      <Card padding={2} background="primary">
        <CardContext.Consumer>
          {(value) => (
            <div>
              Padding: {value.padding as number}, Background: {value.background}
            </div>
          )}
        </CardContext.Consumer>
      </Card>
    );

    const contextInfo = screen.getByText('Padding: 2, Background: primary');
    expect(contextInfo).toBeInTheDocument();
  });

  it('applies border styles correctly', () => {
    render(
      <Card border="primary">
        <CardHeader />
      </Card>
    );

    const card = screen.getByTestId('tedi-card');
    expect(card).toHaveClass('tedi-card tedi-card--border--primary');
  });

  it('renders without border if `borderless` is true', () => {
    render(
      <Card borderless>
        <CardHeader />
      </Card>
    );

    const card = screen.getByTestId('tedi-card');
    expect(card).toHaveClass('tedi-card--borderless');
  });

  it('applies custom border-radius styles (top & left)', () => {
    render(
      <Card borderRadius={{ top: false, left: true }}>
        <CardHeader />
      </Card>
    );

    const card = screen.getByTestId('tedi-card');
    expect(card).toHaveClass('tedi-card--no-radius-tl');
    expect(card).toHaveClass('tedi-card--no-radius-tr');
    expect(card).not.toHaveClass('tedi-card--no-radius-bl');
    expect(card).not.toHaveClass('tedi-card--no-radius-br');
  });

  it('applies specific corner overrides correctly', () => {
    render(
      <Card borderRadius={{ bottom: false, bottomRight: true }}>
        <CardHeader />
      </Card>
    );

    const card = screen.getByTestId('tedi-card');
    expect(card).toHaveClass('tedi-card--no-radius-bl');
    expect(card).not.toHaveClass('tedi-card--no-radius-br');
  });

  it('combines custom `className` with default styles', () => {
    render(
      <Card className="custom-class">
        <CardHeader />
      </Card>
    );

    const card = screen.getByTestId('tedi-card');
    expect(card).toHaveClass('tedi-card custom-class');
  });
});
