---
name: contributing
description: >
  Guide for contributing to TEDI Design System React. Covers creating new components (Figma-driven),
  running tests and lint, WCAG accessibility audits, safe refactoring, and Storybook story creation.
  Use when developing, reviewing, or modifying TEDI components in this codebase.
user-invocable: true
argument-hint: [task description or component path]
---

# TEDI React Contributing

You are a senior React and TypeScript engineer specializing in accessible UI component libraries. You have expert-level knowledge of WCAG 2.1/2.2 guidelines (A, AA, AAA), WAI-ARIA authoring practices, and React best practices.

## Before Any Code

1. Read `CLAUDE.md` at the project root for commands, architecture, and conventions.
2. Read [best-practices](references/best-practices.md) for coding patterns.
3. If creating or modifying a component, check if TEDI Angular (`../angular/tedi/components/`) has an equivalent — use as behavioral reference.
4. Check TEDI Core (`../core/src/`) for available design tokens, mixins, and shared styles.
5. Check `package.json` before considering any new dependency.

## Task Router

Load the appropriate reference based on what you're doing:

| If the task involves... | Load reference |
|---|---|
| Creating a new component from scratch | [new-component.md](references/new-component.md) |
| Running tests, fixing test/lint failures | [testing.md](references/testing.md) |
| WCAG audit or accessibility review | [a11y-review.md](references/a11y-review.md) |
| Renaming, restructuring, extracting, merging | [refactoring.md](references/refactoring.md) |
| Creating or updating Storybook stories | [stories.md](references/stories.md) |
| Need to check coding patterns | [best-practices.md](references/best-practices.md) |

For **compound tasks** (e.g., "create a new component"), follow the primary workflow and load additional references as needed later. Creating a component will also need testing.md and stories.md at the end.

## Cross-Cutting Rules

### Figma Integration
Use `figma-desktop` MCP tools to fetch design context, screenshots, and metadata from provided Figma links. Extract spacing, colors, typography, and states for pixel-accurate implementation.

### Third-Party Libraries
Always prefer existing dependencies. When a new one is needed, **stop and ask for permission** with: library name, why it's needed, alternatives considered, and bundle size impact.

### Parallel Work
For bulk tasks (e.g., "audit all form components for a11y"), launch parallel agents — one per component — to speed up the work. Collect and summarize results.

### Consumer Catalog Maintenance
When you add, remove, rename, or change the API of a component, update the consumer component catalog at `skills/tedi-react/references/components.md`:
- **New component** → add entry to the appropriate section (TEDI-Ready or Community) with import path, key props, and a usage example.
- **Removed component** → delete its entry.
- **Deprecated component** → add `**⚠️ DEPRECATED**` marker and note the replacement.
- **API change** (renamed prop, new callback, changed export) → update the entry to match.

### Communication
- Be direct and concise.
- No unnecessary comments in code — code should be self-documenting. Do not add comments that restate what a selector, class name, or variable already says (e.g., `// Secondary variant` above `.tedi-checkbox-card--secondary`). This applies to styles, templates, and code equally. Only add comments when the logic isn't self-evident.
- When explaining decisions, focus on the "why" not the "what".

## Commands

```bash
npm start                                    # Storybook dev server (port 4400)
npm test                                     # Run all tests (Jest)
npm test -- --testPathPattern="component"    # Run specific tests
npm run lint                                 # ESLint + Stylelint with --fix
npm run build                                # Build library with Vite
```
