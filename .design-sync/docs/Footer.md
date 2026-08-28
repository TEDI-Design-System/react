Page footer. Composed from `Footer.Side`, `Footer.Body`, `Footer.Section` and
`Footer.Bottom`. The footer surface is **dark** — see gotcha 3.

**Live Storybook:** https://storybook.tedi.ee/react/rc/?path=/docs/tedi-ready-layout-footer--docs

Stories (see `Footer.html`): `Default`, `DeviceSize`, `DeviceFrameSource`,
`DeviceFrameSourceAccordions`, `DeviceFrameSourceAccordionsOpen`, `LogoBreakpointSource`,
`LogoPosition`, `WithBottomSection`, `CustomContent`, `MaxWidthAndColumns`.

## Gotchas

**1. Slots are assigned by child element TYPE — any wrapper breaks the layout.**

Footer walks its direct children and compares `child.type` against `Footer.Side`,
`Footer.Body` and `Footer.Bottom`. A wrapper element is not one of those types, so every
child falls through into the generic centre row and renders **side by side** instead of
in its slots. No error is raised.

```jsx
// ✗ fragment/div wrapper — slot detection fails, everything lands in one row
<Footer>
  <div>
    <Footer.Side placement="start"><img src={logo} /></Footer.Side>
    <Footer.Body columns={3}>…</Footer.Body>
  </div>
</Footer>

// ✗ also broken — conditional wrapped in a fragment
<Footer>
  <>{showLogo && <Footer.Side placement="start">…</Footer.Side>}</>
  <Footer.Body columns={3}>…</Footer.Body>
</Footer>

// ✓ slot components must be DIRECT children
<Footer>
  {showLogo && <Footer.Side placement="start"><img src={logo} /></Footer.Side>}
  <Footer.Body columns={3}>…</Footer.Body>
  <Footer.Side placement="end"><img src={partnerLogo} /></Footer.Side>
  <Footer.Bottom>…</Footer.Bottom>
</Footer>
```

A bare `{cond && <Footer.Body/>}` is fine — it yields the element itself. Only wrapping
*elements* (`<div>`, `<>…</>`) break it.

**2. `Footer.Body` needs `columns={n}`** for the section grid. Without it the columns are
content-sized and spread unevenly. It is breakpoint-aware:
`columns={1} md={{ columns: 2 }} lg={{ columns: 4 }}`.

**3. The surface is dark — set colours explicitly.** Inherited colour does not carry:

```jsx
// ✗ dark-on-dark, effectively invisible
<Link href="/privacy">Privaatsus</Link>
<Text>Kõik õigused kaitstud</Text>

// ✓
<Link href="/privacy" color="inverted">Privaatsus</Link>
<Text color="white">Kõik õigused kaitstud</Text>
```

**4. Footer is not print-hidden.** `Header` and `SideNav` wrap themselves in
`Print visibility="hide"`; `Footer` does not. Wrap it yourself if it should not print.

## Full correct footer

```jsx
<Footer mobileBreakpoint="lg">
  <Footer.Side placement="start">
    <img src={logo} alt="TEHIK" height={48} />
  </Footer.Side>

  <Footer.Body columns={1} md={{ columns: 3 }}>
    <Footer.Section icon="info" heading="Uuri lähemalt" collapsible>
      <Link href="/about" color="inverted">Meist</Link>
      <Link href="/news" color="inverted">Uudised</Link>
    </Footer.Section>
    <Footer.Section icon="call" heading="Kontakt" collapsible>
      <Text color="white">info@tehik.ee</Text>
      <Text color="white">+372 794 3900</Text>
    </Footer.Section>
  </Footer.Body>

  <Footer.Side placement="end">
    <img src={euLogo} alt="" height={48} />
  </Footer.Side>

  <Footer.Bottom>
    <Text color="white">© 2026 TEHIK</Text>
  </Footer.Bottom>
</Footer>
```

`mobileBreakpoint` (default `sm`) sets where the footer collapses to the stacked layout;
`Footer.Section` takes `collapsible` and `defaultOpen`.
