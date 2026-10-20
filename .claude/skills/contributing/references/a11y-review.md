# WCAG Accessibility Review

Target component: `$ARGUMENTS`

## Standard

TEDI follows EN 301 549 and, for web content, **WCAG 2.2 level AA**. Review against WCAG 2.2 AA. Components released before TEDI moved to WCAG 2.2 were built against WCAG 2.1 AA, so check the criteria new in 2.2 explicitly (2.4.11 Focus Not Obscured, 2.5.7 Dragging Movements, 2.5.8 Target Size) and report a failure as a Major finding like any other AA violation. The [accessibility page on tedi.ee](https://www.tedi.ee/1ee8444b7/p/33df89-sissejuhatus/b/05a2e8) is the canonical statement.

## Audit Procedure

### 1. Read the Component

Read all files for the target component:
- `.tsx` — check props, ARIA attributes, semantic HTML, keyboard handlers
- `.module.scss` — check focus styles, contrast, reduced motion support
- `.spec.tsx` — check if accessibility scenarios are tested

### 2. ARIA & Semantics

Check against WAI-ARIA Authoring Practices for the component pattern:

- [ ] Correct `role` attribute for the component type
- [ ] Required ARIA attributes present (`aria-label`, `aria-labelledby`, `aria-describedby`, `aria-expanded`, `aria-selected`, `aria-checked`, etc.)
- [ ] `aria-live` regions for dynamic content updates
- [ ] Semantic HTML elements used where possible (`<button>`, `<input>`, `<nav>`, `<dialog>`) instead of ARIA on `<div>`/`<span>`
- [ ] No redundant ARIA (e.g., `role="button"` on `<button>`)
- [ ] `aria-hidden={true}` on decorative elements

### 3. Keyboard Navigation

- [ ] All interactive elements reachable via Tab
- [ ] Logical tab order (no positive `tabIndex` values)
- [ ] Enter/Space activates buttons and controls
- [ ] Escape closes overlays/popups and returns focus
- [ ] Arrow keys navigate within composite widgets (menus, listboxes, tabs, grids)
- [ ] Home/End navigate to first/last item where applicable
- [ ] No keyboard traps — focus can always leave the component

### 4. Focus Management

- [ ] Visible focus indicator on all interactive elements
- [ ] Focus moves to newly opened content (dialogs, dropdowns)
- [ ] Focus returns to trigger element when overlay closes
- [ ] `tabIndex={-1}` used for programmatically focusable non-interactive elements
- [ ] No focus on hidden/invisible elements
- [ ] Focused element is not fully hidden behind sticky headers, overlays or other content (WCAG 2.4.11, AA)
- [ ] Uses `FloatingFocusManager` for overlay focus trapping (floating-ui pattern)

### 5. Visual & Motion

- [ ] Text color contrast meets AA (4.5:1 normal, 3:1 large text)
- [ ] UI component contrast meets AA (3:1 against adjacent colors)
- [ ] Information not conveyed by color alone (icons, text, patterns as alternatives)
- [ ] `prefers-reduced-motion` respected — animations/transitions disabled or reduced
- [ ] Content readable at 200% zoom

### 6. Touch & Pointer

- [ ] Pointer targets (mouse, touch, stylus) at least 24x24 CSS pixels, or enough spacing around smaller targets (WCAG 2.5.8, AA); prefer 44x44 (WCAG 2.5.5, AAA)
- [ ] Anything done by dragging can also be done with a single pointer without dragging, e.g. clicks or taps, possibly several (WCAG 2.5.7, AA). Exceptions: dragging is essential, or the behavior comes from the browser and is not modified by the component
- [ ] No functionality dependent on hover alone (touch devices can't hover)
- [ ] Uses `useIsTouchDevice()` hook where applicable for touch-specific behavior

### 7. Test Coverage

Check that the spec file includes tests for:
- [ ] ARIA attributes are rendered correctly
- [ ] Keyboard events trigger correct behavior
- [ ] Focus moves as expected
- [ ] Disabled state prevents interaction and is communicated to assistive tech

### 8. Report

Provide findings organized by severity:

**Critical** — WCAG A violations, keyboard traps, missing roles on interactive elements
**Major** — WCAG AA violations, missing ARIA attributes, no visible focus indicator
**Minor** — Best practice improvements, missing `prefers-reduced-motion`, missing test coverage

For each finding, include:
- File and line reference
- What the issue is
- How to fix it
- Which WCAG criterion it violates (e.g., 2.1.1 Keyboard, 4.1.2 Name Role Value)
