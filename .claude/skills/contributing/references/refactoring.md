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

## Step 6: Update Consumer Catalog

If the refactor changed the public API (renamed component, props, removed or deprecated a component), update `skills/tedi-react/references/components.md` to match.

## Step 7: Report

Summarize:
- Files changed (with brief description of each change)
- Public API changes (if any)
- Test results: before vs. after
- Any manual verification needed (e.g., visual review in Storybook)
