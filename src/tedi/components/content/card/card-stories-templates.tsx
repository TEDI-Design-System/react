/* istanbul ignore file */
import { StoryFn } from '@storybook/react-vite';

import { Icon } from '../../base/icon/icon';
import { Heading } from '../../base/typography/heading/heading';
import { Text } from '../../base/typography/text/text';
import { Button } from '../../buttons/button/button';
import { HeadingWithIcon } from '../../content/heading-with-icon/heading-with-icon';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Separator } from '../../misc/separator/separator';
import { Link } from '../../navigation/link/link';
import { StatusBadge } from '../../tags/status-badge/status-badge';
import { CardStory } from './card.stories';
import { Card, CardContentPadding } from './index';
import { CardBackground } from './utility';

export const HeaderTypesTemplate: StoryFn<CardStory> = (_args) => (
  <VerticalSpacing>
    <Card>
      <Card.Header background="primary">
        <Heading element="h3">Pealkiri</Heading>
      </Card.Header>
    </Card>
    <Card>
      <Card.Header background="primary">
        <Heading element="h3">Pealkiri</Heading>
        <Text color="secondary">Kirjeldus</Text>
      </Card.Header>
    </Card>
    <Card>
      <Card.Header background="primary">
        <Row>
          <Col>
            <Heading element="h3">Pealkiri</Heading>
          </Col>
          <Col width="auto">
            <Button>Loo</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Text color="secondary">Kirjeldus</Text>
          </Col>
        </Row>
      </Card.Header>
    </Card>
    <Card>
      <Card.Header background="primary">
        <Row>
          <Col>
            <Heading element="h3">Pealkiri</Heading>
          </Col>
          <Col width="auto" style={{ display: 'flex', gap: 10 }}>
            <Button visualType="secondary" iconLeft={{ name: 'share' }}>
              Jaga
            </Button>
            <Button visualType="secondary" iconLeft={{ name: 'print' }}>
              Prindi
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Text color="secondary">Kirjeldus</Text>
          </Col>
        </Row>
      </Card.Header>
    </Card>
    <Card>
      <Card.Header background="primary">
        <Row>
          <Col>
            <Heading element="h3">Pealkiri</Heading>
          </Col>
          <Col width="auto">
            <Link id="card-link" iconRight={{ name: 'arrow_right_alt' }} href="#">
              Vaata tulemust
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <Text color="secondary">Kirjeldus</Text>
          </Col>
        </Row>
      </Card.Header>
    </Card>
    <Card>
      <Card.Header background="primary">
        <Row>
          <Col>
            <Heading element="h3">Pealkiri</Heading>
          </Col>
          <Col width="auto">
            <StatusBadge color="brand">Kinnitatud</StatusBadge>
          </Col>
        </Row>
        <Row>
          <Col>
            <Text color="secondary">Kirjeldus</Text>
          </Col>
        </Row>
      </Card.Header>
    </Card>
    <Card>
      <Card.Header background="secondary">
        <Row>
          <Col>
            <Heading element="h3">Pealkiri</Heading>
          </Col>
          <Col width="auto">
            <Button>Loo</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Text color="secondary">Kirjeldus</Text>
          </Col>
        </Row>
      </Card.Header>
    </Card>
    <Card>
      <Card.Header background="tertiary">
        <Row>
          <Col>
            <Heading element="h3">Pealkiri</Heading>
          </Col>
          <Col width="auto">
            <Button>Loo</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Text color="secondary">Kirjeldus</Text>
          </Col>
        </Row>
      </Card.Header>
    </Card>
    <Card>
      <Card.Header background="brand-primary">
        <Row>
          <Col>
            <Heading element="h3">Pealkiri</Heading>
          </Col>
          <Col width="auto">
            <Button visualType="secondary">Loo</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Text>Kirjeldus</Text>
          </Col>
        </Row>
      </Card.Header>
    </Card>
    <Card>
      <Card.Header background="brand-secondary">
        <Row>
          <Col>
            <Heading element="h3">Pealkiri</Heading>
          </Col>
          <Col width="auto">
            <Button visualType="secondary">Loo</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Text>Kirjeldus</Text>
          </Col>
        </Row>
      </Card.Header>
    </Card>
  </VerticalSpacing>
);

export const DefaultCardTemplates: StoryFn<CardStory> = (_args) => (
  <VerticalSpacing>
    <Card>
      <Card.Content>
        <Text color="secondary">Kirjeldus</Text>
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Text color="secondary">Kirjeldus</Text>
        <StatusBadge color="brand">Kinnitatud</StatusBadge>
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Text modifiers="bold">Pealkiri</Text>
        <Text color="secondary">Kirjeldus</Text>
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Text modifiers="bold">Pealkiri</Text>
        <Row>
          <Col>
            <Text color="secondary">Kirjeldus</Text>
          </Col>
          <Col width="auto">
            <StatusBadge color="brand">Kinnitatud</StatusBadge>
          </Col>
        </Row>
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Row>
          <Col className="display-flex align-items-center gap-3">
            <Icon name="monitor_heart" />
            <Text color="secondary">Kirjeldus</Text>
          </Col>
        </Row>
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Row>
          <Col className="display-flex align-items-center gap-3">
            <Icon name="monitor_heart" />
            <VerticalSpacing size={0}>
              <Text modifiers="bold">Pealkiri</Text>
              <Text color="secondary">Kirjeldus</Text>
            </VerticalSpacing>
          </Col>
        </Row>
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Row>
          <Col className="display-flex align-items-center gap-3">
            <Icon name="monitor_heart" />
            <VerticalSpacing size={0}>
              <Text modifiers="bold">Pealkiri</Text>
              <Text color="secondary">Kirjeldus</Text>
            </VerticalSpacing>
          </Col>
          <Col width="auto" className="display-flex align-items-center">
            <Button>Loo</Button>
          </Col>
        </Row>
      </Card.Content>
    </Card>
    <Row>
      <Col lg={6} sm={12}>
        <Card>
          <Card.Content>
            <Row>
              <Col>
                <Text modifiers="bold">Pealkiri</Text>
                <Text color="secondary">Kirjeldus</Text>
                <Separator spacing={1.5} />
                <Row justifyContent="center">
                  <Col width="auto">
                    <Button>Loo</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Content>
        </Card>
      </Col>
    </Row>
  </VerticalSpacing>
);

export const CardInfoTemplate: StoryFn<CardStory> = (_args) => (
  <VerticalSpacing>
    <Card>
      <Card.Content background="brand-tertiary">
        <Row>
          <Col width="auto" className="display-flex align-items-center gap-3">
            <Icon background="primary" name="assignment_late" />
            <VerticalSpacing size={0}>
              <Text modifiers="bold">Pealkiri</Text>
              <Text color="secondary">Kirjeldus</Text>
            </VerticalSpacing>
          </Col>
        </Row>
      </Card.Content>
    </Card>
    <Card>
      <Card.Content
        background="brand-tertiary"
        backgroundImage="card-background-example.svg"
        backgroundSize="75px"
        backgroundPosition="right center"
        backgroundRepeat="no-repeat"
      >
        <Row>
          <Col width="auto" className="display-flex align-items-center gap-3">
            <Icon background="primary" name="assignment_late" />
            <VerticalSpacing size={0}>
              <Text modifiers="bold">Pealkiri</Text>
              <Text color="secondary">Kirjeldus</Text>
            </VerticalSpacing>
          </Col>
        </Row>
      </Card.Content>
    </Card>
    <Card border="accent">
      <Card.Content background="accent">
        <Row>
          <Col width="auto" className="display-flex align-items-center gap-3">
            <Icon background="primary" name="assignment_late" />
            <VerticalSpacing size={0}>
              <Text modifiers="bold">Pealkiri</Text>
              <Text color="secondary">Kirjeldus</Text>
            </VerticalSpacing>
          </Col>
        </Row>
      </Card.Content>
    </Card>
    <Card border="neutral-primary">
      <Card.Content background="neutral-primary">
        <Row>
          <Col width="auto" className="display-flex align-items-center gap-3">
            <Icon background="primary" name="calendar_today" filled />
            <Text color="secondary">
              Haigusleht: <strong>118.</strong> päev
            </Text>
          </Col>
        </Row>
      </Card.Content>
    </Card>
  </VerticalSpacing>
);

export const AlternativeCardsTemplate: StoryFn<CardStory> = (_args) => (
  <VerticalSpacing>
    <Row>
      <Col lg={6} sm={12}>
        <Card>
          <Card.Header background="primary">
            <HeadingWithIcon name="assignment_ind" headingColor="brand" iconColor="brand">
              Minu tahteavaldus
            </HeadingWithIcon>
          </Card.Header>
          <Card.Content padding={{ top: 0, right: 1, bottom: 1, left: 1 }}>
            <Row>
              <Col>
                <Text color="secondary">Näiteks elundidoonorlus ja vereülekanne</Text>
                <Separator spacing={1.5} />
                <Button visualType="secondary">Vaata tahteavaldusi</Button>
              </Col>
            </Row>
          </Card.Content>
        </Card>
      </Col>
      <Col lg={6} sm={12}>
        <Card>
          <Card.Content>
            <Row>
              <Col>
                <Text modifiers="bold">Pealkiri</Text>
                <Text color="secondary">Näiteks elundidoonorlus ja vereülekanne</Text>
                <Separator spacing={1.5} />
                <Button visualType="secondary">Vaata tahteavaldusi</Button>
              </Col>
            </Row>
          </Card.Content>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col lg={6} sm={12}>
        <Card>
          <Card.Header background="brand-primary">
            <Heading element="h3" color="white">
              Lühike pealkiri
            </Heading>
          </Card.Header>
          <Card.Content>
            <Row>
              <Col>
                <VerticalSpacing>
                  <Text color="secondary">Näiteks elundidoonorlus ja vereülekanne</Text>
                  <Button visualType="secondary">Vaata tahteavaldusi</Button>
                </VerticalSpacing>
              </Col>
            </Row>
          </Card.Content>
        </Card>
      </Col>
      <Col lg={6} sm={12}>
        <Card>
          <Card.Content>
            <Text color="secondary">Näiteks elundidoonorlus ja vereülekanne</Text>
          </Card.Content>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col>
        <Card border="left-danger-secondary">
          <Card.Content>
            <Text>Oluline kaart</Text>
          </Card.Content>
        </Card>
      </Col>
    </Row>
  </VerticalSpacing>
);

export const SpacingTemplate: StoryFn<CardStory> = (_args) => {
  const paddings: CardContentPadding[] = [
    { top: 0.5, left: 0.5, right: 0.5, bottom: 0.5 },
    { top: 1, left: 1, right: 1, bottom: 1 },
    { top: 1.5, left: 1.5, right: 1.5, bottom: 1.5 },
  ];

  return (
    <Row>
      {paddings.map((padding, index) => (
        <Col lg={4} sm={12} key={index}>
          <Card>
            <Card.Content padding={padding}>
              <Text>
                Cabbage, comprising several cultivars of Brassica oleracea, is a leafy green, red (purple), or white
                (pale green) biennial plant grown as an annual vegetable crop for its dense-leaved heads.
              </Text>
            </Card.Content>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export const BackgroundColorsTemplate: StoryFn<CardStory> = (_args) => {
  const backgroundColors: CardBackground[] = [
    'primary',
    'secondary',
    'tertiary',
    'brand-primary',
    'brand-secondary',
    'brand-tertiary',
    'brand-quaternary',
    'success-primary',
    'accent',
  ];

  return (
    <Row>
      {backgroundColors.map((color, index) => (
        <Col lg={4} sm={12} key={index} style={{ marginBottom: '1.5rem' }}>
          <Card background={color} borderless={color !== 'primary' ? true : false}>
            <Card.Content>
              <Text>
                Cabbage, comprising several cultivars of Brassica oleracea, is a leafy green, red (purple), or white
                (pale green) biennial plant grown as an annual vegetable crop for its dense-leaved heads.
              </Text>
            </Card.Content>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
