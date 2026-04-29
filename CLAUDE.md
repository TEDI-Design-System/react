# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TEDI Design System React — a React component library (`@tedi-design-system/react`) providing accessible, reusable UI components. Two export namespaces:
- **`/tedi`** — TEDI-Ready components (production-grade, stricter rules)
- **`/community`** — Community/extended components (relaxed linting rules, NOT a reference for TEDI patterns)

## Common Commands

```bash
npm start                # Storybook dev server on port 4400
npm run build            # Production build with Vite
npm test                 # Run all Jest tests
npm test -- --testPathPattern="button"  # Run tests matching path pattern
npm run lint             # ESLint + Stylelint with auto-fix
npm run test:coverage    # Tests with 80% coverage threshold
npm run build:sb         # Build static Storybook
```

## Architecture

### Source Structure

Components live in `src/tedi/components/` and `src/community/components/`, organized by category: `base/`, `buttons/`, `cards/`, `content/`, `form/`, `layout/`, `loaders/`, `misc/`, `navigation/`, `notifications/`, `overlays/`, `tags/`.

Each component directory follows this pattern:
- `component-name.tsx` — Component implementation
- `component-name.spec.tsx` — Tests (Jest + React Testing Library)
- `component-name.stories.tsx` — Storybook stories

Barrel exports: `src/tedi/index.ts` and `src/community/index.ts`.

### Key Patterns

- **Polymorphic components**: Many components accept an `as` prop via `forwardRef` and generic typing (`<C extends React.ElementType>`). See `helpers/polymorphic/`.
- **Breakpoint support**: Responsive props via `useBreakpointProps` hook — components accept per-breakpoint prop overrides.
- **CSS Modules with SCSS**: Styles use CSS modules with hash-based class names. SCSS files live alongside components or in `styles/` directories.
- **Providers**: `ThemeProvider`, `StyleProvider`, `AccessibilityProvider`, `LabelProvider` in `src/tedi/providers/`.

### Build Output

Vite builds two entry points to ES + CJS formats. Types generated via `vite-plugin-dts`. Output goes to `dist/`. Design tokens come from `@tedi-design-system/core`.

## Commit Convention

Conventional commits enforced by commitlint (husky pre-commit hook). Rules:
- Format: `type(scope): Subject text #issue-ref`
- Subject must be Start Case, minimum 10 characters
- **Issue reference is required** (`references-empty: never`)
- Example: `feat(button): Add Loading State Support #123`

## Code Style

- Single quotes, semicolons required, print width 120
- JSX uses double quotes
- Import sorting enforced by `simple-import-sort` (packages → `@ria.*` → relative → absolute → side-effects)
- Unused imports are errors; unused vars are warnings (prefix with `_` to ignore)
- SCSS follows BEM naming convention, enforced by Stylelint
- Pre-commit hook runs lint-staged (ESLint + Stylelint + Prettier on staged files)

## Testing

- Framework: Jest + jsdom + React Testing Library
- Coverage collected only from `src/tedi/components/**/*.{js,ts,tsx}` (excludes stories)
- Coverage threshold: 80% for branches, functions, lines, and statements
- `jest-setup.js` includes `@testing-library/jest-dom` matchers and `window.matchMedia` mock

## Related Repositories

- **TEDI Angular** (`../angular/`) — Angular implementation of the same design system. Useful as behavioral reference.
- **TEDI Core** (`../core/`) — Shared design tokens, SCSS variables, fonts, and icons.

> **Note:** These sibling repositories are available in local development only. They are NOT present in CI/CD environments — do not rely on `../angular/` or `../core/` paths in build scripts, tests, or imports that run in CI.

## Do NOT

- Use `src/community/` components as reference for coding patterns or style — they are community-contributed and not always reviewed
- Hardcode color values — always use design tokens from `@tedi-design-system/core`
- Use fallback values in CSS `var()` functions — write `var(--token-name)`, not `var(--token-name, fallback)`
- Forget `displayName` on exported components
- Create form controls that only support controlled mode — always support both controlled and uncontrolled
- Use non-semantic queries in tests (`getByTestId`) when semantic ones work (`getByRole`, `getByLabelText`)
- Skip `forwardRef` when a component needs ref forwarding
- Use inline styles instead of CSS Modules with SCSS
- Forget to mock `useBreakpointProps` in tests for components that use breakpoint support
- Add `@ts-ignore` or `any` types — use proper TypeScript generics

## Release

Semantic Release on `main` (stable) and `rc` (prerelease) branches. Tag format: `react-${version}`. Publishes to npm from `dist/`.

## For Code Review Agents (CodeRabbit, etc.)

Read `.claude/skills/contributing/references/best-practices.md` for the full set of coding patterns and rules to enforce during review.

Key things to **not** flag:
- Missing CSS `var()` fallback values — intentionally omitted.
