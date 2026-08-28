# TEDI Design System for React

`@tedi-design-system/react` is a library of React components implementing the TEDI Design System.
It provides reusable, accessible, and consistent UI components to streamline building React applications.

Usage instructions and detailed documentation for using the components in your application are available in [Storybook](https://storybook.tedi.ee/react/rc/?path=/docs/documentation-get-started--get-started).

[![codecov](https://codecov.io/gh/TEHIK-EE/tedi-design-system/graph/badge.svg?token=NKNNJSG19D)](https://codecov.io/gh/TEHIK-EE/tedi-design-system/graph/badge.svg?token=NKNNJSG19D)
[![semantic-release](https://img.shields.io/badge/semantic--release-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

---

## Getting Started (Using the package)

If you are installing `@tedi-design-system/react` in your own project, follow the
[Get Started guide in Storybook](https://storybook.tedi.ee/react/main/?path=/docs/documentation-get-started--get-started)

The Storybook documentation covers:

- installation instructions
- required styles and providers
- component usage examples
- accessibility notes
- component APIs

---

## Repository Development Guide (Contributors)

The following instructions apply only if you are working on this repository itself
(e.g. developing, fixing, or adding components).

### Install dependencies

```
npm install
```

### Running Storybook locally

To view and develop components in isolation, start Storybook:

```
npm run start
```

This will launch a local Storybook instance for component development.

---

## Contributing

Check the [wiki](https://github.com/TEDI-Design-System/general/wiki) for component guidelines and coding standards.  
Report issues or contribute via [GitHub Issues](https://github.com/TEDI-Design-System/react/issues).

---

## AI Skills

This project ships with AI agent skills to help both contributors and consumers work with TEDI components.

### For consumers — `tedi-react`

Helps you build UIs with `@tedi-design-system/react`: component usage, forms integration, and theming. Lives in [`skills/tedi-react`](./skills/tedi-react).

Install it into your agent (Claude Code, Cursor, Codex, and others) with the [`skills`](https://www.skills.sh/tedi-design-system/react/tedi-react) CLI:

```bash
npx skills add https://github.com/tedi-design-system/react --skill tedi-react
```

### For contributors — `contributing`

Guides development inside this repo: creating new components, running tests/lint, WCAG audits, refactoring, and Storybook stories. Available as `/contributing` when working in this repository.

### For AI-driven design & UI generation — `DESIGN.md`

[`DESIGN.md`](./DESIGN.md) is the machine-readable representation of the design system — semantic tokens plus tedi-ready component rules — that AI agents read to ground generated UI in real TEDI tokens and components. It also covers where to look things up, and how to use TEDI as a design system in [claude.ai/design](https://claude.ai/design) (each organisation runs its own; design-system projects cannot be shared across organisations).

Its token table is read straight from `@tedi-design-system/core/tokens.json` (core generates it from Figma and publishes it with the stylesheet it describes) and [`component.manifest.json`](./component.manifest.json) is derived from the `src/tedi` barrel; both are produced by `npm run design:build` (see [`design-docs/`](./design-docs)). The surrounding prose is hand-maintained, with the `update-design-docs` skill keeping it current. [`design-system-spec.json`](./design-system-spec.json) is a descriptor pointing at those files, intended for repository-URL import.

---

## Visual Testing

<a href="https://www.chromatic.com/"><img src="https://user-images.githubusercontent.com/321738/84662277-e3db4f80-af1b-11ea-88f5-91d67a5e59f6.png" width="153" height="30" alt="Chromatic" /></a>

We use [Chromatic](https://www.chromatic.com/) for visual testing, reviewing UI changes, and preventing visual regressions.
