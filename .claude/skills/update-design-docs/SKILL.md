---
name: update-design-docs
description: >
  Author and maintain @tedi-design-system/react AI-facing design docs — DESIGN.md prose and
  component.manifest.json descriptions. Use after adding/changing a tedi-ready component or bumping
  @tedi-design-system/core. Runs the deterministic generators, then writes only the prose.
---

# Update TEDI Design Docs

Keep `DESIGN.md` and `component.manifest.json` current. **Generators own the data;
you own the prose.** Never hand-edit token values or the manifest's derived fields.

## Procedure

1. **Detect scope.** `git status`/`git diff` for changes under `src/tedi/components/**` or a
   `@tedi-design-system/core` version bump in `package.json`/lockfile.
2. **Refresh data.** Run `npm run design:build`. This regenerates the root
   `component.manifest.json` skeleton (merge-preserving descriptions) and the DESIGN.md token
   table. Do not edit these outputs by hand. Token data is **not** generated here — it is read
   from `@tedi-design-system/core/tokens.json`, which core generates from Figma and publishes;
   if the build reports that file missing, the installed core is too old and needs bumping.
3. **Author prose — DESIGN.md, only between `<!-- prose:* -->` markers:**
   - `overview`: brand personality/tone (see `skills/tedi-react/SKILL.md`).
   - `foundations`: how to use semantic color/typography/shape/spacing tokens; that dark theme
     overrides live in `@tedi-design-system/core/tokens.json` under `themes.dark`; that agents
     must use semantic tokens, never raw `--tedi-*` base tokens. There are exactly **two**
     tiers (`base`, `semantic`) — the semantic one holds component-scoped roles (`button-*`,
     `card-*`) alongside `general-*` / `form-*`; do not describe a third.
   - `components`: high-level guidance + a pointer to `skills/tedi-react/references/components.md`.
     Do NOT re-document every component — the skill and manifest are the catalog.
   - `dosdonts`: concrete rules (import from `@tedi-design-system/react/tedi`; wrap in
     `ThemeProvider`/`LabelProvider`/`StyleProvider`; no hardcoded hex; tedi-ready over community).
   Never write outside the marker pairs; never touch the `<!-- tokens:start/end -->` block.
4. **Fill manifest descriptions.** For each component whose `description` is `null` or whose source
   changed, read its `.tsx`, prop types, and `.stories.tsx`; set a one-line `description`, the
   canonical `name` (from the export / `displayName`), and 2–5 `keyProps`. Preserve existing
   human-authored descriptions unless the component's behavior changed.
5. **Validate.** Run `npm run design:build` again then `npx jest design-tokens/ --coverage=false` —
   the drift test must pass and the second build must produce no diff (idempotent). Confirm DESIGN.md
   has no duplicate `##` headings.
6. **Report.** Summarize what changed and flag any component whose intended usage is unclear from
   source (needs human input) rather than guessing.

## Boundaries
- Never edit token *values* or manifest derived fields (`category`, `sourcePath`, `status`) — those
  come from the generator.
- Never touch code outside `DESIGN.md` and `component.manifest.json` description/name/keyProps.
- Scope is **tedi-ready** (`src/tedi`) only; ignore `src/community`.
- Output is reviewed by a human in the PR — draft, don't merge.
