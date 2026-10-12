# Contributing to TEDI React

Thanks for helping improve `@tedi-design-system/react`. This page covers what is specific to this repository. The full process (component tiers, Definition of Done, Gitflow, release process) is in the [TEDI wiki](https://github.com/TEDI-Design-System/general/wiki).

Everyone taking part is expected to follow the [Code of Conduct](https://github.com/TEDI-Design-System/.github/blob/main/CODE_OF_CONDUCT.md).

## Reporting issues

- **Bugs:** open an issue and pick the template that matches the component tier (TEDI-READY or community).
- **New components and feature ideas:** propose them in [Discussions](https://github.com/TEDI-Design-System/general/discussions).
- **Design or UX problems:** report them in the [design](https://github.com/TEDI-Design-System/design/issues) repository.
- **Accessibility problems:** use the "Accessibility issue" template.
- **Security vulnerabilities:** do not open a public issue. Report privately via [Security → Report a vulnerability](https://github.com/TEDI-Design-System/react/security/advisories/new) or email info@tedi.ee. See the [security policy](https://github.com/TEDI-Design-System/.github/blob/main/SECURITY.md).
- **Questions:** ask in the [TEDI Slack](https://join.slack.com/t/tedisystem/shared_invite/zt-3hd8tnjf7-Z1smXI~ns0p8E2cxoFUKbQ). See [Getting help](https://github.com/TEDI-Design-System/.github/blob/main/SUPPORT.md) for other channels.

## Making a change

1. Open an issue first and describe what you plan to do. New components start as a [Discussion](https://github.com/TEDI-Design-System/general/discussions), where the API can be agreed before an issue is created.
2. Branch off `rc` (fork the repository if you don't have push access). Name the branch `<type>/<issue number>-<short-description>`, for example `feat/123-add-tooltip`.
3. Write commits in the [commit convention](https://github.com/TEDI-Design-System/general/wiki/Commit-convention) format with the issue number in the header. Releases are generated from commit messages, and a `commit-msg` hook checks the format.
4. Open a pull request against `rc`. Add `Closes #<issue number>` to the description so the issue closes on merge.

Maintainers and fork contributors have slightly different steps for test environments. See [Contributor workflow](https://github.com/TEDI-Design-System/general/wiki/Contributor-workflow).

## Local setup

Requires Node.js 24 (see `.nvmrc`).

```bash
npm install
npm run start          # Storybook on http://localhost:4400
npm run lint           # stylelint + ESLint, with --fix
npm run test           # Jest
npm run test:coverage  # Jest with coverage (80% threshold)
npm run build          # library build into dist/
```

Components live in two tiers: `src/tedi/` (TEDI-READY, must meet the [Definition of Done](https://github.com/TEDI-Design-System/general/wiki/Definition-of-Done)) and `src/community/` (looser requirements).

## Accessibility check

Every pull request runs an automated accessibility check (axe, through the Storybook test runner) on all `src/tedi/` stories. Violations in components the pull request changes fail the check. Violations elsewhere are reported as warnings.

To run it locally:

```bash
npx playwright install chromium
STORYBOOK_EXCLUDE_COMMUNITY=true npm run build:sb
npm run test-storybook:ci
```

A story with a known, tracked accessibility issue can be marked with `parameters: { a11y: { test: 'todo' } }` so it warns instead of failing. Link the tracking issue in a comment next to it.

The automated check catches only part of the problems. TEDI-READY components also need manual testing (keyboard, screen reader, zoom), as listed in the Definition of Done.

## AI tooling

The repository ships a `contributing` skill for AI coding agents, available as `/contributing`. It covers creating components, tests, lint, accessibility audits and stories.
