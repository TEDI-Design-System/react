# PR Review

Run this before opening a PR, and use it when reviewing someone else's. Review from a fresh context
if your tool allows it (a subagent, a new session): the agent that wrote the code tends to accept its
own reasoning, so it misses the problems that reasoning caused. The review itself doesn't edit
files; whoever ran it fixes the findings afterwards.

## Input

Everything on the branch since its base, committed or not. The base is the PR's target branch
(`gh pr view --json baseRefName -q .baseRefName`), or `rc` when there is no PR yet. Run
`git fetch origin <base>` first.

- `git diff $(git merge-base origin/<base> HEAD)` for tracked files.
- `git ls-files --others --exclude-standard` for new files. Skip untracked files that won't be in
  the PR; ask if unsure.
- A moved file shows as a deletion plus an untracked file. Diff it against the old version in git,
  not on disk (the old path may be gone or a symlink to the new one):
  `git show $(git merge-base origin/<base> HEAD):<old> | git diff --no-index - <new>`.

Read [best-practices.md](best-practices.md) first. Every finding cites `file:line` and the rule it
breaks.

## Checklist

### Prop API ([best-practices.md → Prop API](best-practices.md#prop-api))

- [ ] Each new prop has a consumer who needs it. Flag any prop whose JSDoc says it has no effect.
- [ ] Names, controlled/uncontrolled pairs and callback signatures match sibling components.
- [ ] Names, units and defaults match TEDI Angular, and every claim about Angular matches its source.
- [ ] Each prop with a default has an `@default`, and each `@default` matches the code.

### Prose ([best-practices.md → Comments and JSDoc](best-practices.md#comments-and-jsdoc))

- [ ] Prop JSDoc follows the length and content rules. `@deprecated` naming the replacement is
      expected, not a finding.
- [ ] Code comments explain a *why* in one line. Delete any comment that restates a name.
- [ ] Story docblocks are usually empty ([stories.md](stories.md) section 8).

### Consumer docs

- [ ] Each new entry in `skills/tedi-react/references/` is something JSDoc can't carry
      ([SKILL.md → Consumer-Facing Docs](../SKILL.md#consumer-facing-docs)). Delete bullets that
      repeat prop docs.
- [ ] `component.manifest.json` `description` and `keyProps` are filled in for new components.

### Reuse and simplicity

- [ ] New code doesn't duplicate an existing component, util, or core token or mixin.
- [ ] No dead code, unused props or needless indirection.

### Tests, a11y, stories

- [ ] Tests pass (`npx jest --testPathPattern="<component-name>" --coverage=false`) and lint is
      clean without fixing (`npm run lint:ci`).
- [ ] Interactive components or changed ARIA/keyboard behaviour pass [a11y-review.md](a11y-review.md).
- [ ] Changed stories pass the [stories.md](stories.md) checklist (section 6).

### Labels (`src/tedi/providers/label-provider/labels-map.ts`)

- [ ] Each new label lists only components that use it.

## Output

Findings ordered by severity. For a prose finding, give the replacement text, not just "too long".
Leave out findings that are speculative or only stylistic preferences against the project's own
conventions.
