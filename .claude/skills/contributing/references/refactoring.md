# Safe Refactor TEDI React Component

Target: `$ARGUMENTS`

## Step 1: Understand the Blast Radius

1. Read the component being refactored — all files (`.tsx`, `.spec.tsx`, `.stories.tsx`, `.module.scss`).
2. Find all consumers:
   - Search for imports of the component across `src/tedi/` and `src/`.
   - Search for JSX usage of the component name in templates.
   - Check `src/tedi/index.ts` for exported names.
3. List all affected files before making any changes.

## Step 2: Baseline Tests

Run the full test suite and record the result:
```
npm test
```

If any tests fail before your changes, note them — they are pre-existing failures, not caused by your refactor.

## Step 3: Plan

Enter plan mode. The plan must cover:

- **What changes** — exact files and what changes in each
- **Consumer impact** — which files need updating and why
- **Public API changes** — any changes to props, exports, component names, or types
- **Migration path** — if the public API changes, how consumers should update
- **Risk assessment** — what could break, ordered by likelihood

## Step 4: Execute

Apply changes in this order:
1. **Internal implementation** — component logic, hooks, styles
2. **Public API** — props, types, component name (only if needed)
3. **Barrel exports** — update `src/tedi/index.ts` if paths or names changed
4. **Consumers** — update all files that import or use the component
5. **Tests** — update spec files to match new API/behavior
6. **Stories** — update Storybook stories to match new API

## Step 5: Verify

1. Run the specific component test: `npm test -- --testPathPattern="<component-name>"`
2. Run the full test suite: `npm test`
3. Run lint: `npm run lint`
4. Compare test results with the baseline from Step 2 — no new failures allowed.

## Step 6: Update Consumer-Facing Docs

Only if the refactor changed the public API. See **SKILL.md → Consumer-Facing Docs** for the
contract.

1. **Update the JSDoc** on every prop you renamed, retyped, or whose default changed. Add
   `@deprecated` with the replacement to anything you deprecated rather than removed.
2. **Regenerate**: `npm run design:build`. A renamed or removed component changes the manifest's
   roster; a rename also needs its `description` and `keyProps` carried over to the new entry.
   Validate with `npx jest design-docs/ --coverage=false`.
3. **Reconcile `skills/tedi-react/references/components.md`.** Its "Behaviour the types don't tell
   you" entries reference component and prop names, so a rename can leave them pointing at nothing:
   grep the file for the old names. Two cases are easy to miss:
   - **You fixed the trap.** If the refactor makes a documented gotcha impossible, or moves the fact
     into JSDoc where it belongs, **delete the entry**. Stale traps are worse than no traps.
   - **You created one.** A behaviour change that callers cannot see in the types needs a new entry.
4. **Renamed or removed a token?** Update `skills/tedi-react/references/theming.md`, including the
   legacy mapping table if consumers need a migration path.
5. **Breaking change?** It also needs a consumer migration guide; see the `tedi-migration-guide`
   skill rather than burying it in the reference docs.

## Step 7: Report

Summarize:
- Files changed (with brief description of each change)
- Public API changes (if any)
- Test results: before vs. after
- Any manual verification needed (e.g., visual review in Storybook)
