# TEDI Design System for React

`@tedi-design-system/react` is a library of React components implementing the TEDI Design System.
It provides reusable, accessible, and consistent UI components to streamline building React applications.

Usage instructions and detailed documentation for using the components in your application are available in [Storybook](https://storybook.tedi.ee/react/main/?path=/docs/documentation-get-started--get-started).

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

## AI Agent Skills

This repository ships an **integration skill** for AI coding agents that consume `@tedi-design-system/react` in a downstream application. The skill lives at [`skills/tedi-react/`](./skills/tedi-react) and conforms to the [skill.sh](https://skill.sh) standard, so it works with any modern AI tool that supports skills.

It teaches an agent:

- The canonical import paths (`/tedi` vs `/community`), required providers, and setup snippet
- Component APIs, props, polymorphic and breakpoint patterns
- Form control conventions (controlled/uncontrolled, helpers, validation)
- Theming with design tokens from `@tedi-design-system/core`
- Common pitfalls to avoid (deprecated Community components, hardcoded colors, `var()` fallbacks, etc.)
- Pointers back to this repo and the [live Storybook](https://storybook.tedi.ee/react/main/?path=/docs/documentation-get-started--get-started) as authoritative sources

### Install

Drop the skill into your agent's skill directory (the exact location depends on the tool — for example `.<tool>/skills/` in the project root, or a user-level equivalent). [`degit`](https://github.com/Rich-Harris/degit) is the simplest way to fetch a single folder:

```bash
npx degit TEDI-Design-System/react/skills/tedi-react <skills-dir>/tedi-react
```

Once installed, the agent will trigger the skill whenever you work with TEDI React components.

> Skills for **contributing to** the TEDI Design System (contributor skills, standards validation, etc.) live in a separate repo: [TEDI-Design-System/ai-skills](https://github.com/TEDI-Design-System/ai-skills).

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

## Visual Testing

<a href="https://www.chromatic.com/"><img src="https://user-images.githubusercontent.com/321738/84662277-e3db4f80-af1b-11ea-88f5-91d67a5e59f6.png" width="153" height="30" alt="Chromatic" /></a>

We use [Chromatic](https://www.chromatic.com/) for visual testing, reviewing UI changes, and preventing visual regressions.
