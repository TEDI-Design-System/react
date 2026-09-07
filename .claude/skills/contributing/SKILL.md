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
| Refreshing `DESIGN.md` / `component.manifest.json` after a component or core change | [update-design-docs](../update-design-docs/SKILL.md) |

For **compound tasks** (e.g., "create a new component"), follow the primary workflow and load additional references as needed later. Creating a component will also need testing.md and stories.md at the end.

## Cross-Cutting Rules

### Figma Integration
Use `figma-desktop` MCP tools to fetch design context, screenshots, and metadata from provided Figma links. Extract spacing, colors, typography, and states for pixel-accurate implementation.

### Third-Party Libraries
Always prefer existing dependencies. When a new one is needed, **stop and ask for permission** with: library name, why it's needed, alternatives considered, and bundle size impact.

### Parallel Work
For bulk tasks (e.g., "audit all form components for a11y"), launch parallel agents — one per component — to speed up the work. Collect and summarize results.

### Consumer-Facing Docs

Consumers get their component knowledge from the **published package**, not from a hand-written
list. Three layers, and each one has a different owner:

| Layer | Where | Who maintains it |
|---|---|---|
| Prop names, types, defaults, rationale | JSDoc on the props interface, shipped in the `.d.ts` | **You, in the source** |
| Roster, category, `sourcePath`, `status` | `component.manifest.json` | Generated. Never hand-edit |
| One-line `description`, `keyProps` | `component.manifest.json` | Authored, via [update-design-docs](../update-design-docs/SKILL.md) |
| Behaviour the types can't express | `skills/tedi-react/references/*.md` | **You, by hand** |

**The rule: if it can go in JSDoc, it goes in JSDoc.** The `.d.ts` tree ships to consumers with
JSDoc preserved, so a documented prop is a documented prop for every consuming agent, at the exact
version they installed. Do not copy prop tables into the consumer skill; that is what made the old
catalog rot.

So when you add, remove, rename, or change a component's API:

1. **Document it in the source.** Every public prop gets JSDoc: what it does, `@default`, and why
   the default is what it is when that isn't obvious. This is the deliverable, not an afterthought.
2. **Regenerate.** `npm run design:build`, then fill in the new component's `description` and
   `keyProps` (use the `update-design-docs` skill). Validate with
   `npm test -- design-docs/ --coverage=false`.
3. **Update the consumer skill only for what JSDoc cannot carry** (see below). If there is nothing
   in that category, you are done. A routine new prop needs no consumer-skill edit at all.

#### What still belongs in the consumer skill by hand

`skills/tedi-react/references/components.md` has a "Behaviour the types don't tell you" section.
Add an entry there only when the fact is invisible in, or spread across, the type signature:

- **Choosing between components**: this one is a low-level primitive, reach for that one instead.
- **Composition constraints**: what may or may not be nested inside what.
- **Responsive behaviour that isn't a prop**: layout that restacks, clamps, or scrolls on its own.
- **Accessibility requirements a signature won't convey**: a prop that is optional in the types but
  mandatory in practice (an icon-only control's `aria-label`, say), or the only compliant way to
  wire something up.
- **Browser or data caveats**: minimum browser versions, callbacks that expect you to apply the
  change yourself.

Also update, in the same pass:

- `references/forms.md` when you change a form control's value shape, event convention, or add a
  control. It documents idiom, not props.
- `references/theming.md` when tokens are added, renamed, or removed, and always when a legacy
  token is dropped (consumers need the mapping).
- `SKILL.md`'s pitfalls list when you have found a *new* way for consumers to get it wrong.

**Deprecations** go in the manifest's `status` field and an `@deprecated` JSDoc tag pointing at the
replacement, not into a hand-written list.

**Deleting entries counts.** If you fix the source so a documented trap no longer exists, or make it
expressible in JSDoc, remove its entry from `components.md` in the same PR. That section is only
trustworthy if it shrinks as well as grows.

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
