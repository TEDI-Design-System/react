# TEDI Design System for React

[![codecov](https://codecov.io/gh/TEDI-Design-System/react/graph/badge.svg)](https://codecov.io/gh/TEDI-Design-System/react)
[![semantic-release](https://img.shields.io/badge/semantic--release-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

`@tedi-design-system/react` is a library of React components implementing the TEDI Design System.
It provides reusable, accessible, and consistent UI components to streamline building React applications.

Component documentation, examples and APIs are in [Storybook](https://storybook.tedi.ee/react/main/?path=/docs/documentation-get-started--get-started).

---

## Getting Started

### Installation

```
npm install @tedi-design-system/react
```

Peer dependencies: `react` and `react-dom` 18.3.1 or 19, and `dayjs`. Design tokens, fonts and icons come from `@tedi-design-system/core`, which is installed with the package.

### Setup

Import the stylesheet (fonts, tokens and component styles) once, at your app's entry point:

```tsx
import '@tedi-design-system/react/index.css';
```

To load only one Material Symbols style, use `index-without-icons.css` together with one of `icons/outlined.css`, `icons/rounded.css`, `icons/sharp.css` or `icons/all.css`.

Wrap the app in the providers:

```tsx
import { AccessibilityProvider, LabelProvider, PrintingProvider, ThemeProvider } from '@tedi-design-system/react/tedi';

export function App() {
  return (
    <ThemeProvider theme="default">
      <PrintingProvider>
        <LabelProvider locale="et">
          <AccessibilityProvider>{/* your app */}</AccessibilityProvider>
        </LabelProvider>
      </PrintingProvider>
    </ThemeProvider>
  );
}
```

`PrintingProvider` and `LabelProvider` are required: some components throw or show label keys without them.

### Usage

```tsx
import { Button } from '@tedi-design-system/react/tedi';

export function SaveButton() {
  return <Button visualType="primary">Save</Button>;
}
```

TEDI-Ready components are exported from `@tedi-design-system/react/tedi`, community components from `@tedi-design-system/react/community`. Prefer a TEDI-Ready component where one exists. Browse all components in [Storybook](https://storybook.tedi.ee/react/main/?path=/docs/documentation-get-started--get-started).

### Supported versions

The library supports the latest React major and one major older. See [Supported versions](https://github.com/TEDI-Design-System/general/wiki/Supported-versions) in the wiki for the policy.

---

## Accessibility

TEDI follows EN 301 549 and, for web content, WCAG 2.2 level AA. Components released before TEDI moved to WCAG 2.2 were built and tested against WCAG 2.1 AA and are being reviewed for the new criteria.

The [accessibility page on tedi.ee](https://www.tedi.ee/1ee8444b7/p/33df89-sissejuhatus/b/05a2e8) (in Estonian) describes how components are tested, what TEDI covers and what stays with your project, and how to report an accessibility issue.

---

## AI Tooling

### For consumers: the `tedi-react` skill

Helps AI coding agents build UIs with `@tedi-design-system/react`. It lives in [`skills/tedi-react`](./skills/tedi-react) and teaches an agent:

- the import paths (`/tedi` vs `/community`), the required providers and the setup snippet
- how to read the component roster and props from the **installed package** (`component.manifest.json` and the shipped `.d.ts` files), so it never works from a stale prop list
- component patterns: polymorphic `as`, per-breakpoint props, compound sub-components
- form control conventions (controlled and uncontrolled, helpers, validation)
- theming with design tokens from `@tedi-design-system/core`
- behaviour the types don't express: composition constraints, responsive quirks and accessibility requirements
- common pitfalls (deprecated community components, hardcoded colours, `var()` fallbacks)

Install it into your agent (Claude Code, Cursor, Codex and others) with the [`skills`](https://www.skills.sh/tedi-design-system/react/tedi-react) CLI, from your project root:

```bash
npx skills add https://github.com/TEDI-Design-System/react --skill tedi-react
```

### For AI-driven design and UI generation: `DESIGN.md`

[`DESIGN.md`](./DESIGN.md) is the machine-readable description of the design system, semantic tokens and TEDI-Ready component rules, that AI agents read to ground generated UI in real TEDI tokens and components. It ships in the npm package.

To design with TEDI in Claude, use it as a Design System artifact: each organisation publishes its own copy from [claude-design-system](https://github.com/TEDI-Design-System/claude-design-system), built from this library's releases. See [Designing with AI](https://github.com/TEDI-Design-System/general/wiki/Designing-with-AI) in the wiki.

### For contributors: the `contributing` skill

Guides development inside this repository: creating new components, running tests and lint, WCAG audits, refactoring and Storybook stories. Available as `/contributing` when working in this repository. Skills for contributing across the design system live in [TEDI-Design-System/ai-skills](https://github.com/TEDI-Design-System/ai-skills).

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to report issues, set up the repository and open a pull request. Component guidelines and coding standards are in the [wiki](https://github.com/TEDI-Design-System/general/wiki).

To work on the library locally:

```
npm install
npm run start
```

`npm run start` launches Storybook for developing components in isolation.

`DESIGN.md`'s token table and [`component.manifest.json`](./component.manifest.json) are generated by `npm run design:build` from `@tedi-design-system/core/tokens.json` and the `src/tedi` barrel (see [`design-docs/`](./design-docs)); the surrounding prose is maintained with the `update-design-docs` skill.

---

## Visual Testing

[![Chromatic](https://img.shields.io/badge/Chromatic-fc521f?logo=chromatic&logoColor=white)](https://www.chromatic.com/)

We use [Chromatic](https://www.chromatic.com/) for visual testing, reviewing UI changes, and preventing visual regressions.

## License

[MIT](LICENSE). The bundled fonts and the logos in `public/` are not covered, see [NOTICE.md](NOTICE.md).
