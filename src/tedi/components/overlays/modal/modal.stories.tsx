import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import { Heading } from '../../base/typography/heading/heading';
import { Text } from '../../base/typography/text/text';
import Button from '../../buttons/button/button';
import { TextField } from '../../form/textfield/textfield';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { ScrollFade } from '../../misc/scroll-fade/scroll-fade';
import Separator from '../../misc/separator/separator';
import { Modal, ModalProps } from './modal';
import { ModalContentProps, ModalFullscreen, ModalWidthPreset } from './modal-content/modal-content';

type ModalStoryArgs = ModalProps &
  ModalContentProps & {
    heading?: string;
    description?: string;
    closeButton?: boolean;
  };

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.70?node-id=4624-94325&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://www.tedi.ee/1ee8444b7/p/9842cf-modal" target="_BLANK">Zeroheight ↗</a>
 */
const meta: Meta<ModalStoryArgs> = {
  component: Modal,
  subcomponents: {
    'Modal.Trigger': Modal.Trigger,
    'Modal.Content': Modal.Content,
    'Modal.Header': Modal.Header,
    'Modal.Body': Modal.Body,
    'Modal.Footer': Modal.Footer,
    'Modal.Closer': Modal.Closer,
  } as never,
  title: 'TEDI-Ready/Components/Overlay/Modal',
  parameters: {
    docs: {
      source: {
        transform: (code: string) =>
          code
            .replaceAll('ModalTrigger', 'Modal.Trigger')
            .replaceAll('ModalContent', 'Modal.Content')
            .replaceAll('ModalHeader', 'Modal.Header')
            .replaceAll('ModalBody', 'Modal.Body')
            .replaceAll('ModalFooter', 'Modal.Footer')
            .replaceAll('ModalCloser', 'Modal.Closer'),
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.45.70?node-id=4624-94325&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<ModalStoryArgs>;

const SampleForm = () => (
  <VerticalSpacing size={1}>
    <TextField id="modal-field-1" label="Label" />
    <TextField id="modal-field-2" label="Label" />
  </VerticalSpacing>
);

const ScrollableForm = ({ idPrefix }: { idPrefix: string }) => (
  <VerticalSpacing size={1}>
    <Heading element="h3" modifiers="h5">
      Teenus
    </Heading>
    <TextField id={`${idPrefix}-service`} label="Teenus" />
    <TextField id={`${idPrefix}-institution`} label="Asutus" />
    <TextField id={`${idPrefix}-persons`} label="Isikud" />
    <TextField id={`${idPrefix}-priority`} label="Prioriteet" />
    <TextField id={`${idPrefix}-description`} label="Probleemi kirjeldus" />
    <Row>
      <Col xs={6}>
        <TextField id={`${idPrefix}-start-date`} label="Alguskuupäev" />
      </Col>
      <Col xs={6}>
        <TextField id={`${idPrefix}-end-date`} label="Lõppkuupäev" />
      </Col>
    </Row>
    <Separator />
    <Heading element="h3" modifiers="h5">
      Kontaktisik
    </Heading>
    <Row>
      <Col xs={6}>
        <TextField id={`${idPrefix}-contact-first-name`} label="Eesnimi" />
      </Col>
      <Col xs={6}>
        <TextField id={`${idPrefix}-contact-last-name`} label="Perenimi" />
      </Col>
    </Row>
    <TextField id={`${idPrefix}-contact-id`} label="Isikukood" />
    <Row>
      <Col xs={6}>
        <TextField id={`${idPrefix}-contact-phone`} label="Telefon" />
      </Col>
      <Col xs={6}>
        <TextField id={`${idPrefix}-contact-email`} label="E-post" />
      </Col>
    </Row>
    <TextField id={`${idPrefix}-contact-address`} label="Aadress" />
    <Separator />
    <Heading element="h3" modifiers="h5">
      Esindaja
    </Heading>
    <Row>
      <Col xs={6}>
        <TextField id={`${idPrefix}-rep-first-name`} label="Eesnimi" />
      </Col>
      <Col xs={6}>
        <TextField id={`${idPrefix}-rep-last-name`} label="Perenimi" />
      </Col>
    </Row>
    <TextField id={`${idPrefix}-rep-id`} label="Isikukood" />
    <Row>
      <Col xs={6}>
        <TextField id={`${idPrefix}-rep-phone`} label="Telefon" />
      </Col>
      <Col xs={6}>
        <TextField id={`${idPrefix}-rep-email`} label="E-post" />
      </Col>
    </Row>
    <TextField id={`${idPrefix}-rep-address`} label="Aadress" />
    <TextField id={`${idPrefix}-rep-relation`} label="Seos isikuga" />
  </VerticalSpacing>
);

const DefaultFooter = () => (
  <Modal.Footer>
    <Modal.Closer>
      <Button visualType="secondary">Cancel</Button>
    </Modal.Closer>
    <Modal.Closer>
      <Button>Continue</Button>
    </Modal.Closer>
  </Modal.Footer>
);

const DefaultTemplate: StoryFn<ModalStoryArgs> = ({
  heading = 'Modal title',
  description,
  closeButton = true,
  width,
  maxWidth,
  size,
  position,
  scrollBehavior,
  fullscreen,
  ...modalProps
}) => (
  <Modal {...modalProps}>
    <Modal.Trigger>
      <Button visualType="secondary">Open modal</Button>
    </Modal.Trigger>
    <Modal.Content
      width={width}
      maxWidth={maxWidth}
      size={size}
      position={position}
      scrollBehavior={scrollBehavior}
      fullscreen={fullscreen}
    >
      <Modal.Header title={heading} description={description} closeButton={closeButton} />
      <Modal.Body>
        <SampleForm />
      </Modal.Body>
      <DefaultFooter />
    </Modal.Content>
  </Modal>
);

export const Default: Story = {
  render: DefaultTemplate,
};

export const Position: Story = {
  render: () => (
    <Row gutterY={2}>
      {(['center', 'top', 'right', 'left'] as const).map((p) => (
        <Col key={p} xs="auto">
          <Modal>
            <Modal.Trigger>
              <Button visualType="secondary">
                {p === 'center' ? 'Center' : p === 'top' ? 'Top-aligned' : `Side (${p})`}
              </Button>
            </Modal.Trigger>
            <Modal.Content position={p} width={p === 'right' || p === 'left' ? 'sm' : 'md'}>
              <Modal.Header
                title={p === 'center' ? 'Center modal' : p === 'top' ? 'Top-aligned modal' : `Side modal (${p})`}
              />
              <Modal.Body>
                <SampleForm />
              </Modal.Body>
              <DefaultFooter />
            </Modal.Content>
          </Modal>
        </Col>
      ))}
    </Row>
  ),
};

export const Size: Story = {
  render: () => (
    <Row gutterY={2}>
      <Col xs="auto">
        <Modal>
          <Modal.Trigger>
            <Button visualType="secondary">Open small modal</Button>
          </Modal.Trigger>
          <Modal.Content size="small" width="sm">
            <Modal.Header title="Small modal" />
            <Modal.Body>
              <SampleForm />
            </Modal.Body>
            <DefaultFooter />
          </Modal.Content>
        </Modal>
      </Col>
      <Col xs="auto">
        <Modal>
          <Modal.Trigger>
            <Button visualType="secondary">Open default modal</Button>
          </Modal.Trigger>
          <Modal.Content size="default" width="sm">
            <Modal.Header title="Default modal" />
            <Modal.Body>
              <SampleForm />
            </Modal.Body>
            <DefaultFooter />
          </Modal.Content>
        </Modal>
      </Col>
    </Row>
  ),
};

export const Width: Story = {
  render: () => (
    <Row gutterY={2}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as ModalWidthPreset[]).map((w) => (
        <Col key={w} xs="auto">
          <Modal>
            <Modal.Trigger>
              <Button visualType="secondary">{w}</Button>
            </Modal.Trigger>
            <Modal.Content width={w}>
              <Modal.Header title={`Width: ${w}`} />
              <Modal.Body>
                <SampleForm />
              </Modal.Body>
              <DefaultFooter />
            </Modal.Content>
          </Modal>
        </Col>
      ))}
    </Row>
  ),
};

/**
 * `width` also accepts any CSS length (e.g. `'800px'`, `'60vw'`). Pair it with `maxWidth`
 * to cap the size on small viewports.
 */
export const CustomWidth: Story = {
  name: 'Custom width',
  render: () => (
    <Modal>
      <Modal.Trigger>
        <Button visualType="secondary">Open modal</Button>
      </Modal.Trigger>
      <Modal.Content width="800px" maxWidth="75%" position="left">
        <Modal.Header title="Width: 800px, max: 75%" />
        <Modal.Body>
          <SampleForm />
        </Modal.Body>
        <DefaultFooter />
      </Modal.Content>
    </Modal>
  ),
};

/**
 * Three sizing modes plus the breakpoint shortcut:
 *
 * - `fullscreen={true}` — padded fullscreen (modal fills the overlay's content box,
 *   16px backdrop visible all around — matches Figma `5981:67531`).
 * - `fullscreen="edge"` — true edge-to-edge takeover (no backdrop, no border, no radius).
 * - `fullscreen="sm"` / `"md"` / `"lg"` / `"xl"` — padded fullscreen at and below that
 *   breakpoint. Useful for "fullscreen on mobile only".
 */
export const Fullscreen: Story = {
  render: () => {
    const variants: { label: string; value: ModalFullscreen }[] = [
      { label: 'Normal (default)', value: false },
      { label: 'Padded fullscreen', value: true },
      { label: 'Edge-to-edge fullscreen', value: 'edge' },
      { label: 'Padded below md', value: 'md' },
      { label: 'Padded on mobile (≤ sm)', value: 'sm' },
    ];
    return (
      <Row gutterY={2}>
        {variants.map(({ label, value }) => (
          <Col key={label} xs="auto">
            <Modal>
              <Modal.Trigger>
                <Button visualType="secondary">{label}</Button>
              </Modal.Trigger>
              <Modal.Content width="md" fullscreen={value}>
                <Modal.Header title={label} />
                <Modal.Body>
                  <SampleForm />
                </Modal.Body>
                <DefaultFooter />
              </Modal.Content>
            </Modal>
          </Col>
        ))}
      </Row>
    );
  },
};

export const ScrollableContent: Story = {
  render: () => (
    <Row gutterY={2}>
      <Col xs="auto">
        <Modal>
          <Modal.Trigger>
            <Button visualType="secondary">Content scrollbar</Button>
          </Modal.Trigger>
          <Modal.Content width="md">
            <Modal.Header title="Uus toiming" />
            <Modal.Body>
              <ScrollableForm idPrefix="scroll" />
            </Modal.Body>
            <Modal.Footer>
              <Modal.Closer>
                <Button visualType="secondary">Katkesta</Button>
              </Modal.Closer>
              <Modal.Closer>
                <Button>Lisa</Button>
              </Modal.Closer>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Col>
      <Col xs="auto">
        <Modal>
          <Modal.Trigger>
            <Button visualType="secondary">Content fade</Button>
          </Modal.Trigger>
          <Modal.Content width="md">
            <Modal.Header title="Uus toiming" />
            <Modal.Body>
              <ScrollFade fadePosition="both" fadeSize={10}>
                <div style={{ padding: 'var(--modal-body-padding)' }}>
                  <ScrollableForm idPrefix="fade" />
                </div>
              </ScrollFade>
            </Modal.Body>
            <Modal.Footer>
              <Modal.Closer>
                <Button visualType="secondary">Katkesta</Button>
              </Modal.Closer>
              <Modal.Closer>
                <Button>Lisa</Button>
              </Modal.Closer>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Col>
      <Col xs="auto">
        <Modal>
          <Modal.Trigger>
            <Button visualType="secondary">Page scroll</Button>
          </Modal.Trigger>
          <Modal.Content width="md" scrollBehavior="page">
            <Modal.Header title="Uus toiming" />
            <Modal.Body noScroll>
              <ScrollableForm idPrefix="page" />
            </Modal.Body>
            <Modal.Footer>
              <Modal.Closer>
                <Button visualType="secondary">Katkesta</Button>
              </Modal.Closer>
              <Modal.Closer>
                <Button>Lisa</Button>
              </Modal.Closer>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Col>
    </Row>
  ),
};

export const WithDescription: Story = {
  name: 'With header description',
  render: () => (
    <Modal>
      <Modal.Trigger>
        <Button visualType="secondary">With description</Button>
      </Modal.Trigger>
      <Modal.Content width="md">
        <Modal.Header
          title="With description"
          description="This modal has additional description text in the header."
        />
        <Modal.Body>
          <SampleForm />
        </Modal.Body>
        <DefaultFooter />
      </Modal.Content>
    </Modal>
  ),
};

export const NoBackdropClose: Story = {
  name: 'No backdrop close',
  render: () => (
    <Modal closeOnBackdropClick={false}>
      <Modal.Trigger>
        <Button visualType="secondary">No backdrop close</Button>
      </Modal.Trigger>
      <Modal.Content width="md">
        <Modal.Header title="No backdrop close" />
        <Modal.Body>
          <SampleForm />
        </Modal.Body>
        <DefaultFooter />
      </Modal.Content>
    </Modal>
  ),
};

export const NoCloseButton: Story = {
  name: 'No close button',
  render: () => (
    <Modal>
      <Modal.Trigger>
        <Button visualType="secondary">No close button</Button>
      </Modal.Trigger>
      <Modal.Content width="md">
        <Modal.Header title="No close button" closeButton={false} />
        <Modal.Body>
          <SampleForm />
        </Modal.Body>
        <DefaultFooter />
      </Modal.Content>
    </Modal>
  ),
};

export const FooterVariants: Story = {
  render: () => (
    <Row gutterY={2}>
      <Col xs="auto">
        <Modal>
          <Modal.Trigger>
            <Button visualType="secondary">Open modal</Button>
          </Modal.Trigger>
          <Modal.Content width="sm">
            <Modal.Header title="Title" />
            <Modal.Body>
              <SampleForm />
            </Modal.Body>
            <DefaultFooter />
          </Modal.Content>
        </Modal>
      </Col>
      <Col xs="auto">
        <Modal>
          <Modal.Trigger>
            <Button visualType="secondary">Left right buttons</Button>
          </Modal.Trigger>
          <Modal.Content width="sm">
            <Modal.Header title="Title" />
            <Modal.Body>
              <SampleForm />
            </Modal.Body>
            <Modal.Footer
              left={
                <Modal.Closer>
                  <Button visualType="secondary">Cancel</Button>
                </Modal.Closer>
              }
            >
              <Modal.Closer>
                <Button>Continue</Button>
              </Modal.Closer>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Col>
      <Col xs="auto">
        <Modal>
          <Modal.Trigger>
            <Button visualType="secondary">Three buttons</Button>
          </Modal.Trigger>
          <Modal.Content width="sm">
            <Modal.Header title="Title" />
            <Modal.Body>
              <SampleForm />
            </Modal.Body>
            <Modal.Footer
              left={
                <Modal.Closer>
                  <Button visualType="neutral" icon="arrow_back">
                    Back
                  </Button>
                </Modal.Closer>
              }
            >
              <Modal.Closer>
                <Button visualType="secondary">Cancel</Button>
              </Modal.Closer>
              <Modal.Closer>
                <Button>Continue</Button>
              </Modal.Closer>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Col>
      <Col xs="auto">
        <Modal>
          <Modal.Trigger>
            <Button visualType="secondary">No footer</Button>
          </Modal.Trigger>
          <Modal.Content width="sm">
            <Modal.Header title="Title" />
            <Modal.Body>
              <SampleForm />
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Col>
    </Row>
  ),
};

/**
 * `position`, `width`, and `maxWidth` accept per-breakpoint overrides via the
 * `BreakpointSupport` API. A side drawer on desktop can drop back to a centered modal on
 * mobile; a wide `lg` modal can shrink to `sm` below the desktop breakpoint. Resize the
 * preview to see the swap.
 *
 * Each declared breakpoint overrides everything at or above its threshold (mobile-first
 * cascade). `defaultServerBreakpoint` controls the initial render breakpoint on the server
 * before the client has measured the viewport.
 */
export const ResponsiveProps: Story = {
  render: () => (
    <Row gutterY={2}>
      <Col xs="auto">
        <Modal>
          <Modal.Trigger>
            <Button visualType="secondary">Side on desktop, centered on mobile</Button>
          </Modal.Trigger>
          <Modal.Content position="right" width="sm" md={{ position: 'right' }} defaultServerBreakpoint="md">
            <Modal.Header title="Responsive position" />
            <Modal.Body>
              <Text>Side drawer at `md` and up; centered modal below `md`.</Text>
              <SampleForm />
            </Modal.Body>
            <DefaultFooter />
          </Modal.Content>
        </Modal>
      </Col>
      <Col xs="auto">
        <Modal>
          <Modal.Trigger>
            <Button visualType="secondary">lg on desktop, sm on mobile</Button>
          </Modal.Trigger>
          <Modal.Content width="sm" md={{ width: 'lg' }} defaultServerBreakpoint="md">
            <Modal.Header title="Responsive width" />
            <Modal.Body>
              <Text>Wide `lg` modal on desktop; compact `sm` modal below `md`.</Text>
              <SampleForm />
            </Modal.Body>
            <DefaultFooter />
          </Modal.Content>
        </Modal>
      </Col>
    </Row>
  ),
};

/**
 * `role="alertdialog"` for destructive confirmations. Screen readers announce alertdialogs
 * with higher urgency, and the ARIA APG pattern requires the user to explicitly choose an
 * action — pair it with `closeOnBackdropClick={false}`. Pointing `initialFocus` at the
 * Cancel button (via `ref`) prevents an accidental Enter from triggering the destructive action.
 */
export const AlertDialog: Story = {
  render: function AlertDialog() {
    const cancelRef = useRef<HTMLButtonElement>(null);
    return (
      <Modal role="alertdialog" closeOnBackdropClick={false}>
        <Modal.Trigger>
          <Button color="danger">Delete account</Button>
        </Modal.Trigger>
        <Modal.Content width="xs" initialFocus={cancelRef}>
          <Modal.Header
            title="Delete your account?"
            description="This action is permanent and cannot be undone."
            closeButton={false}
          />
          <Modal.Footer>
            <Modal.Closer>
              <Button ref={cancelRef} visualType="secondary">
                Cancel
              </Button>
            </Modal.Closer>
            <Modal.Closer>
              <Button color="danger">Delete</Button>
            </Modal.Closer>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );
  },
};

/**
 * Open / close from outside the Modal subtree by owning `open` and `onToggle` in the parent.
 */
export const Controlled: Story = {
  render: function Controlled() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button visualType="secondary" onClick={() => setOpen(true)}>
          External open
        </Button>
        <Modal open={open} onToggle={setOpen}>
          <Modal.Content width="sm">
            <Modal.Header title="Controlled modal" />
            <Modal.Body>
              <Text>The trigger lives outside the Modal subtree — open state is held by the parent.</Text>
            </Modal.Body>
            <Modal.Footer>
              <Modal.Closer>
                <Button>Close</Button>
              </Modal.Closer>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>
    );
  },
};
