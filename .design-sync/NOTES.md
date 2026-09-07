# design-sync notes — @tedi-design-system/react

> **Syncing this repo from another organisation?** You get your own Claude Design project
> (the targeting rule below handles that automatically — nothing to edit), but you inherit
> this repo, and that is what this file describes. The mechanical pipeline is ~2 minutes;
> the cost is the verification campaign over ~400 stories. **Read these four sections
> before grading anything:**
>
> 1. **Accepted permanent deltas** — the big one. Most differences you will see between the
>    storybook and preview panels are already-diagnosed storybook-harness artifacts, not
>    component faults. Grading them as `mismatch` and "fixing" them with an owned preview
>    permanently shadows the real component.
> 2. **Scope** — `cfg.entry` is tedi-only AND the reference storybook needs
>    `STORYBOOK_EXCLUDE_COMMUNITY=true`; both are required.
> 3. **Build** — always `npm run build`, never a bare `vite build` (a populated `dist/` is
>    not evidence the build succeeded).
> 4. **Re-sync risks** — what is only partially verified, and what goes stale silently.
>
> Everything under `.design-sync/` is committed on purpose: the four lib forks in
> `overrides/` load automatically, and this file is where their rationale lives. Run
> receipts are kept to the latest run only — git history has the rest.

## 🎯 Which project to target — resolve this BEFORE §1 target settlement

`cfg.projectId` pins `d10e8d07-6086-4ddd-970c-090a49feaa2f`, the **TEHIK-owned** project.
That pin is correct for TEHIK and wrong for everyone else, and TEDI is consumed by many
government teams across many organisations. Resolve it mechanically — **do not ask the
user which project to use, and do not ask them to edit config:**

1. `get_project(cfg.projectId)`.
2. **It resolves and `canEdit` is true** → you are in TEHIK. Use it. This is the normal
   re-sync path; `projectId` + `pkg` were both in place before the run, so §7 applies and
   untouched components cost nothing.
3. **Only two results may create a project: a definitive not-found, or a successful
   response with `canEdit === false`** → you are in a different organisation. Design-system
   projects are org-scoped (`invited` | `org`, neither crosses an org boundary), so there is
   no access to grant and nothing to wait for. Silently:
   - create a design-system project named `TEDI Design System`,
   - use it for this run,
   - record its id in `.design-sync/config.json` after the upload verifies (the §6
     backstop step, just reached by a different route).

   Treat the run as a **first sync** — no anchor exists, so everything is verified and
   graded once. That is expected, not a failure.
4. **Any other failure is NOT evidence of a different organisation — never create a project
   for it.** Timeouts, 5xx, rate limits, auth errors and unrecognised failures all leave the
   question unanswered, and the pinned project may be perfectly healthy: creating one here
   would orphan the real project and re-verify 83 components for nothing. Retry the call;
   if it keeps failing, **stop and tell the user** — keep `cfg.projectId` exactly as it is
   and change nothing else.

**Why the pin is committed rather than removed.** `projectId` + `pkg` present *before* a
run is the re-sync discriminator, so removing it would push TEHIK maintainers onto the
full flow on every fresh clone. Keeping it plus this rule costs a downstream org exactly
one API call and **zero human knowledge**, which is the point: nobody outside TEHIK
should need to read a setup guide.

**Downstream teams:** the recorded id is local. If you track upstream, `git pull` will
conflict on `config.json` — keep your own id; the skill re-records it after every sync
anyway, so taking upstream's version self-heals on the next run. Never push your id back.

**Two other design-system projects exist in the TEHIK org and are deliberately left
alone:** `TEDI Design System (deprecated)` (owner Silver) and `Design System` (owner
Märt). The pinned project supersedes the deprecated one — don't sync into either.

## ✅ RUN COMPLETE + UPLOADED (2026-08-12, third pass — latest) — read this first

**Re-synced at 19.0.0-rc.2 again.** Driver receipt: `ok: true`, all four stages exit 0,
`pendingGrade: []`, `learningsUnmerged: []`, render check **83/83 previews render cleanly**
(0 bad, 0 thin, 0 variantsIdentical). **452 files uploaded, 0 deleted**, anchor last.

**What moved, and why it was cheap:**
1. **The DS team added `parameters.a11y.test: 'todo'` to 10 story files** (commit
   `cfd92610`, issues #782/#815–#823). Nine map to synced components — DateTimeField,
   Popover, Search, Select, SideNav, Slider, Tabs, TimeField, TopNav — and the tenth was
   `application-shell` (excluded). **A non-visual story edit still re-grades**: `srcSha` is
   the story FILE fingerprint, so all nine `sourceKeys` moved, their generated wrappers
   recompiled, and `renderHashes` changed (the compiled preview JS embeds the parameter).
   `sourceHashes` (`.jsx`/`.d.ts`/`.prompt.md`) and `bundleSha12` did **not** move — the
   library build never sees stories. All nine were re-captured and re-graded from fresh
   sheets: **46 match / 8 close**, 0 mismatches, every `close` an already-documented
   harness delta (pseudo-states addon, `example-*` demo scaffolding, capture-clipped tails).
2. **`conventions.md` gained an `IconProps` section** from the DS team, then two
   corrections from validation (see below). Committed by the team as `bcc044e8`.
3. **The `Application shell` stories were deleted** (DS team decision) — see the
   "Excluded components" entry, which now records the mechanism and where the guidance
   lives.

**Two `conventions.md` claims were false and are now fixed** (this is exactly the
re-validation the last risk bullet demands):
- *"Only `Header.Role`'s `Representative.icon` uses `IconProps`"* — **wrong**:
  `OptionContent.icon` takes the same wider union (`option-content.tsx:74`, and its
  `.d.ts` ships the expanded form). Both "only" claims corrected; `IconBackgroundColor`
  was also spelled out as its four literals, since the type NAME is not resolvable from
  the artifacts an agent receives.
- *"19.0.0-rc.2 (npm `rc` tag)"* — the `rc` tag has moved to **19.0.0-rc.6**. The bundle
  genuinely is rc.2 (this branch is 8 commits behind `origin/rc`), so the version stayed
  and the parenthetical now says the tag has advanced.

**⚠ THE UPLOADED PROJECT IS ONE COMMIT BEHIND THE REPO — read before the next sync.**
Immediately after this upload finished, the DS team merged `origin/rc` (`7a55b541`), taking
the branch to **19.0.0-rc.6** with **core 6.5.0** installed (`feat(icons): bump core to
6.5.0`, #796/#797), and core has since been bumped again to **6.6.0** (the release that first
ships `tokens.json`) with `dist/` rebuilt against it. So: the Claude Design project is a
faithful, fully verified sync of **rc.2 / core 6.4.3**, and the working tree is now
rc.6 / core 6.6.0. Nothing is broken — the project is just older than the repo.
**Note for whoever re-syncs:** 6.6.0 renamed three tokens this repo used —
`tooltip-background`/`tooltip-text` → `tooltip-primary-*` and `general-selected-border-width`
→ `general-border-width-selected` — already fixed in `src/`, value-for-value, so no visual
change is expected from them.
**The next sync is the EXPENSIVE kind. Budget for it; do not treat it as a docs-sized run:**
`dist/` (11:54, core 6.4.3) and `sb-reference` (15:20, pre-merge) are both stale, so both
must be rebuilt; a core bump rewrites the stylesheet, which moves `styleSha`; and per the
first Re-sync risk bullet a moved `styleSha` invalidates **every** carried grade — a full
83-component capture-and-re-grade campaign (solo phase + fan-out waves), not a scoped pass.
Also re-check `conventions.md`'s version table on that run: it currently says the bundle is
rc.2 and that the `rc` tag has advanced to rc.6, which will both need updating once the
bundle actually is rc.6.

**Verified this pass** (don't re-derive): `titleMap` `{title: null}` exclusions are
**grade-free** — `configSlicesFor().componentFor()` keys only remaps *into* a component
(`[, v] => v === name`), so removing the `Applicationshell` entry re-keyed nothing. The
83-vs-81 count gap between this sync and `component.manifest.json` is
**basis, not drift**: the manifest keys off barrel export paths (`Grid` covers Row+Col,
`Tooltip` covers InfoTooltip, providers are outside its `./components/**` regex, and
`ToastContainer`/`MobileNav` are real exports this sync excludes).

## ✅ Previous run (2026-08-12, first + second pass)

**Re-synced to claude.ai/design at 19.0.0-rc.2.** Project **`TEDI Design System`**,
`projectId: d10e8d07-6086-4ddd-970c-090a49feaa2f`.
URL: https://claude.ai/design/p/d10e8d07-6086-4ddd-970c-090a49feaa2f

**452 files uploaded, 5 deleted** (the `TextArea` rename), anchor written last. The bundle
now corresponds to npm **`19.0.0-rc.2`** (`rc` tag; `latest` is still 18.1.0), core 6.4.3.
Roster went **82 → 83 components**: `Timeline` added, `TextArea` → **`Textarea`** renamed.
Upload order followed the contract: sentinel → 451 content files in 7 chunks → 5 deletes →
sentinel re-arm → `_ds_sync.json` absolutely last. Post-upload `list_files` confirms no
`TextArea` paths remain.

**Verification: the whole roster was re-graded, 0 mismatches.** 83 components / ~380
captured stories, graded from true storybook-vs-preview screenshot pairs (solo phase of 5
by the orchestrator, then 12 fan-out batches). Closing receipt: driver `ok: true`, all four
stages green, `pendingGrade: []`, `learningsUnmerged: []`, **83/83 carried forward
unchanged — 0 captured, 0 factual failures, 0 grade cleared** (that line is the proof the
next sync starts fast), and `package-validate.mjs` reports **83/83 previews render
cleanly** (0 bad, 0
thin, 0 variantsIdentical). One non-blocking warning, `[TOKENS_MISSING]` (22, triaged
below). Zero owned previews were needed again — `.design-sync/previews/` is still empty,
and the compiled bundle still reproduces the oracle on its own for every component.

Why a full re-grade rather than a carry-forward: `styleSha` changed (real CSS churn across
the major version), so verdicts earned against the 18.1.1-rc.1 stylesheet no longer
applied. See the first bullet of **Re-sync risks** for how to tell that apart from
converter-only churn next time.

**Four things this run fixed or corrected — all four were silent:**
1. **`cfg.docsDir` never resolved** → all five authored docs were being dropped
   (`docs: 0/83`). Now `"../.design-sync/docs"` → `docs: 5/83`. See the entry under
   "Known converter gaps"; the `PKG_DIR`-vs-config-dir asymmetry is the trap.
2. **The `TextArea` → `Textarea` rename deleted its own generated preview** on macOS, so
   Textarea shipped a floor card with all stories `unpaired`. Fixed by rebuilding; the
   mechanism is documented under "Known converter gaps" (build twice after a case-only
   rename).
3. **`conventions.md` had drifted** — it claimed 18.1.1-rc.1 and still named `TextArea`
   twice, which would have taught the design agent an `undefined` import. Version table
   corrected, both names fixed, and the 19.0.0 rename added to the version-sensitive API
   list. Everything else in the file re-validated against the fresh build.
4. **A stale accepted-delta entry** (Slider's InputGroup chrome) nearly cost two false
   `close` grades; deleted with the correction recorded.

**Second pass, same day (2026-08-12, after the run above).** The DS team edited
`.design-sync/conventions.md` (added the icon-only-button accessibility contract) and
`.design-sync/docs/Link.md` (the same rule for `Link`). Re-validated both against the
build — **every claim verifies**: `children: React.ReactNode` is required on `Button`,
`Link` and `FloatingButton` and optional on `ClosingButton`; `showTooltip` and `icon`
exist; and the label really is *clipped, not removed* —
`.tedi-btn--icon-only .tedi-btn__text` gets `position:absolute; 1px; clip:rect(...)` via
`mixins.visually-hidden` in `button-content.module.scss`, and that compiled rule ships
(`tedi-btn__text-a9860fef{clip:rect(1px,1px,1px,1px);…}`). `Link` genuinely shares the
contract: it imports `ButtonContent` **and** `button-content.module.scss`, and
`tedi-btn--icon-only` is applied there whenever `icon` is set. Rebuilt, then uploaded a
**9-file delta** (Link's 4 artifacts + `_preview/Link.js`, `_ds_bundle.js`, `README.md`,
sentinel, anchor last). Driver: `ok: true`, `changed: 0`, `pendingGrade: []`, 0 deletes.
A `[SPOT_CHECK]` canary fired (`trigger: reference_drift`, picks Accordion / Link /
StatusBadge / Skeleton / Button) — **all five fresh sheets confirmed against their kept
grades, no divergence**, so no re-grade was needed.

Newly documented harness deltas (all accepted, all in the deltas section): the
`translateZ(0)` containing-block effect on `position: fixed`, sticky engaged only on the
storybook panel, overlay text-trigger underlines clipped by the element shot, the
`globals.backgrounds` canvas-vs-wrapper gap, and the refinement that `parameters.pseudo`
is not by itself evidence of the pseudo-states delta.

## Resume / re-sync commands

Nothing is pending. To re-sync after DS changes, from the repo root:

```sh
# 1. ALWAYS rebuild dist via the npm script, never bare `vite build` — the script's
#    trailing replace-in-file step rewrites /fonts/ -> ./fonts/ and a lint failure
#    breaks the && chain AFTER dist is written, leaving a dist that looks healthy with
#    27 absolute /fonts/ urls that 404. Verify afterwards:
npm run build   # must exit 0
grep -c 'url("\?/fonts/' dist/index.css   # must be 0

# 2. rebuild the reference storybook whenever stories OR component sources changed
STORYBOOK_EXCLUDE_COMMUNITY=true npx storybook build -c .storybook \
  -o "$(git rev-parse --show-toplevel)/.design-sync/sb-reference"

# 3. re-copy the staged converter scripts (a stale .ds-sync/ runs an old converter)
mkdir -p .ds-sync && cp -r "<skill-base-dir>"/{package-build.mjs,package-validate.mjs,resync.mjs,lib,storybook,non-storybook} .ds-sync/

# 4. one driver run = build + diff + validate + scoped capture + verdict
#    (first sync / no anchor => omit --remote)
NODE_OPTIONS=--max-old-space-size=8192 node .ds-sync/resync.mjs \
  --config .design-sync/config.json --node-modules ./node_modules \
  --entry ./dist/tedi.es.js --out ./ds-bundle
#    gate: ok:true AND verification.pendingGrade empty
```

Fresh clone also needs: `(cd .ds-sync && npm i esbuild ts-morph @types/react playwright && npx playwright install chromium)`,
the step-2 sb-reference build, and
`ln -sfn ../.ds-sync/node_modules .design-sync/node_modules` (the committed forks import
`ts-morph`/`esbuild`). Chromium lives at `~/Library/Caches/ms-playwright` on macOS,
**not** `~/.cache/ms-playwright`.

**The project exists and is current** (see the top of this section) — the paragraph that
used to sit here said otherwise and was left over from before the first upload. It was
last updated 2026-08-10 with the docs work; the anchor on disk matches the remote one.
Sharing is `scope: "org"` with `link_permission: "edit"`, so anyone in the TEHIK
organisation can clone the repo and re-sync against the pinned `projectId`. A *different*
organisation cannot be granted access — see the adoption flow in the repo README.

## Scope

- **`tedi` namespace only.** The repo ships two export namespaces (`/tedi` = TEDI-Ready,
  production-grade; `/community` = community-contributed, relaxed lint rules).
  `CLAUDE.md` is explicit that community components are *not* a reference for TEDI
  patterns, so only `tedi` is synced — the design agent must never build on-brand UI
  out of unreviewed community parts.
- Two levers enforce this and **both are required**:
  - `cfg.entry` → `./dist/tedi.es.js` (bundle contains only tedi exports).
  - `STORYBOOK_EXCLUDE_COMMUNITY=true` when building the reference storybook — the repo's
    own `.storybook/main.ts` reads that env var and drops the `../src/community/**` story
    globs. Without it the reference carries ~64 community stories the bundle can't render.

## Reproducing this sync from scratch

Read this first if you are syncing a fresh clone, or re-syncing after the Claude Design
project was deleted. **Everything the sync needs is committed under `.design-sync/`** —
`config.json`, `conventions.md` (the README header), `docs/` (per-component gotchas),
`overrides/` (the four lib forks) and this file. Two inputs are NOT committed and must be
rebuilt, in this order:

```bash
nvm use                       # Node >= 24, npm >= 11
npm ci
npm run build                 # → dist/   NEVER `vite build` directly (see Build below)
STORYBOOK_EXCLUDE_COMMUNITY=true \
  npx storybook build -c .storybook -o .design-sync/sb-reference
```

The two builds are **independent** — Storybook compiles from `src/`, not from `dist/` —
so run them concurrently if you want the ~1 min back. It is not where the time goes:
measured, the whole mechanical pipeline is ~2 min (storybook ~1 min, `npm run build`
~1–1.5 min, converter 35 s). A first sync's real cost is the capture/compare/grade
fan-out over 403 stories.

**`npm run build:sb` is the wrong command here** — it writes to `dist/storybook-static`,
but `cfg.storybookStatic` points at `.design-sync/sb-reference`. Build straight to that
path (as above) or copy it across. Omitting `STORYBOOK_EXCLUDE_COMMUNITY=true` silently
adds community stories, which then read as unpaired components against a tedi-only bundle.

Given those two, the run reproduces the same design system without further judgement:
the README header, the per-component gotcha docs, the uncapped prop descriptions and the
referenced-type shapes all come from committed files, not from anything a previous agent
remembered.

**If the project was deleted**, no manual edit is needed — `get_project(cfg.projectId)`
will error, which is case 3 of the targeting rule at the top of this file: create a new
project, use it, record its id after the upload verifies. Same path a different
organisation takes.

## Build

- `buildCmd` is `npm run build`. It does `rm -rf dist` first, then `vite build --config
  vite.lib.config.ts`, then a `replace-in-file` pass rewriting `/fonts/` → `./fonts/` in
  `dist/index.css`. **That rewrite is what makes fonts resolve** in the synced bundle —
  a hand-run `vite build` without it leaves absolute `/fonts/` urls that 404.
- Node is pinned to `>=24` (`engines`, `.nvmrc` = `v24`).
- `dist/tedi.es.js` is small (~22KB) because the build is chunked — the real code lives in
  `dist/src/` and `dist/_virtual/`. esbuild follows the chunks; don't mistake the small
  entry for a broken build.
- `cssEntry` is `./dist/index.css` (~760KB, compiled from SCSS). It contains both tedi and
  community styles plus `@tedi-design-system/core`. The community CSS is harmless dead
  weight; it is the stylesheet the package actually ships (`exports["./index.css"]`).
- `tokensPkg` is `@tedi-design-system/core` — the sibling package holding SCSS variables,
  tokens, fonts and icons. It is a real npm dependency, not a workspace sibling, so no
  monorepo build ordering is needed.
- `--node-modules` is the repo root `node_modules` (single-package repo). `node_modules/
  @tedi-design-system/react` does not exist (npm won't self-install), hence `--entry`.

## Toolchain

- Chromium for the compare loop: playwright 1.62.1 → `chromium-1234`, cached at
  `~/Library/Caches/ms-playwright` (macOS path, *not* `~/.cache/ms-playwright`).
- Converter deps are isolated in `.ds-sync/` — the repo lockfile is never touched.

## Lib forks (`.design-sync/overrides/`)

All four are declared in `cfg.libOverrides` and each is **narrow** — an added helper, an
added define, everything else upstream verbatim. On re-sync, diff each against
`.ds-sync/lib/<same-name>` and merge upstream changes.

**⚠ `dts.mjs` deliberately diverges from upstream — do NOT revert it when merging.**
A diff against `.ds-sync/lib/dts.mjs` will show the doc-cap raise (120 → 1200) and the
`preludeFor()` addition as differences. They are intentional improvements, not drift.
Reverting them silently re-truncates 508 JSDoc blocks and removes 99 referenced-type
declarations, and costs another full grade reset to undo. Merge upstream's *other*
changes around them; keep these two. Details in the `dts.mjs` entry below.

**Cost of touching any of them:** `configSlicesFor()` hashes fork file bytes into the
global config slice, so editing a fork re-keys **every** component's `sourceKey` and
resets all grades. Prose and consumer guidance belong in `conventions.md` (`readmeHeader`
is deliberately *not* keyed) or `.design-sync/docs/` (`docsDir`, also not keyed) — never
in a fork.

- **`dts.mjs`** — `[GENERAL]` symptom: build exited 0 but emitted **0 components**, and
  reported all 84 storybook titles as `[TITLE_UNMAPPED]`. Root cause: the misleading
  tag was downstream of `exported PascalCase symbols: 0`. This package declares its
  `.d.ts` entry **only** under `exports["./tedi"].types`; there is no top-level
  `types`/`typings`, so upstream's resolution fell through to a nonexistent
  `<dist>/index.d.ts` and discovered nothing. Fix: a `subpathTypes()` helper consulted
  at **both** entry-resolution sites — `findTypesRoot` *and* `projectFor`, which
  computes `entry` independently, so patching one is not enough.
  The subpath is pinned to `'./tedi'`, which makes the tedi-only scope structural.

  **Second change (2026-08-10) — documentation quality, not correctness.** Two additions,
  both measured before and after:
  1. **Doc cap 120 → 1200** (`DOC_CAP`, sentence-boundary trim + ` …` marker as a safety
     valve). Upstream sliced every prop description at 120 chars, truncating **508 of
     1451** JSDoc blocks (35%). Because JSDoc puts the summary first and the capability
     second, the cut removed the useful half — `Select.renderValue` ended at *"may return
     any React n"*, one word before *"ode — useful for color swatches"*, which is why two
     consumers hand-rolled workarounds for shipped features. Longest real description in
     this repo is **971** chars, so 1200 truncates **nothing** (verified: 0 of 1185 props
     now carry the marker).
  2. **`preludeFor()` populates `prelude`** — emit.mjs already emits it after the Props
     interface for "inlined type refs"; upstream just never filled it. **118** distinct
     type names were referenced with no definition anywhere in the bundle. Now **99 type
     declarations across 46 components**, depth 1, capped at 12 types / 4000 chars /
     900 chars per decl. This is what finally exposes `ISelectOption.customData`,
     `FeedbackTextProps` (11 components) and `TablePaginationOptions`.

  **Gotcha if you touch `preludeFor`:** strip JSDoc **before** stripping quoted strings.
  The first version stripped quotes first, and JSDoc prose is full of apostrophes
  (`TanStack's`, `doesn't`), so `'[^']*'` spanned from one apostrophe to the next and
  deleted the prop lines in between — Table silently resolved 1 type instead of 7.
  Types from `node_modules` (`@tanstack` `ColumnDef`/`Row`, react-day-picker `Matcher`)
  are still unresolved: the DTS project only parses `dist/src/tedi/**`.
- **`story-imports.mjs`** — `[GENERAL]` **the most important fork; read this one before
  changing anything about previews.** Symptom: all 81 previews rendered *completely
  unstyled* — default browser buttons instead of TEDI components — while
  `package-validate.mjs` reported `81/81 previews render cleanly`. **No mechanical check
  catches this**; only the compare sheets do, because the render check asserts a
  non-empty root and cannot see missing styles.
  Root cause: upstream's `exportedComponentFor()` compares the bare **filename** against
  the export set case-sensitively (`exported.has('button')` for `button.tsx`), assuming
  the DS names files after its exports (`Button.tsx`). This repo names every file in
  **kebab-case** while exporting **PascalCase**, so nothing ever matched and **not one
  component was shimmed to the shipped bundle**. Every preview compiled the component
  from `src/` instead, where esbuild loads `.module.scss` as **empty** (no sass
  compiler) — so every CSS-module class lookup returned `undefined`. Only plain global
  classes survived (`Print`'s `no-print` was the single class on the rendered button),
  which is what made the failure look subtle rather than catastrophic.
  Fix: after the upstream exact-match checks, look the name up **separator- and
  case-insensitively** (strip `[-_]`, lowercase both sides), still gated to
  `/src/tedi/`. Effect on the Button preview: `src/` modules 37 → 2, `.module.scss`
  stubs 9 → 0.
  **Two refinements were needed after the first attempt — don't regress either:**
  1. A naive kebab→Pascal conversion is NOT enough. It still missed every
     camel-humped export whose filename is one lowercase word or hyphenated
     differently: `textfield`→`Textfield`≠`TextField`, `textarea`→`TextArea`,
     `sidenav`→`SideNav`, `sidenav-item`→`SideNavItem`,
     `top-nav-subitem`→`TopNavSubItem`, `use-labels`→`useLabels`. Those kept
     compiling from src unstyled — TextField's icon fell out of the input,
     `size="small"` was a no-op, `--valid`/`--invalid` borders were dead, and
     `SideNav.Item` had no styling at all. Hence the case-insensitive map.
  2. The widening MUST stay gated to `/src/tedi/`. Unguarded, `src/community/.../tabs`
     matched TEDI's exported `Tabs`, so hash-trigger got the WRONG component and
     crashed on the absent `TabsItem`.
  **Diagnostic** — previews carrying BARE (unhashed) BEM strings are compiling from
  src; hashed classes mean they came from the bundle:
  `for f in ds-bundle/_preview/*.js; do b=$(grep -oE '"tedi-[a-z-]+(__|--)[a-z-]+"' "$f" | sort -u | wc -l); [ "$b" -gt 0 ] && echo "$(basename $f .js): $b"; done`
  Expect `Slider` and the input-group consumers (Accordion, Modal, Table,
  ChoiceGroup) to still appear — that is the deliberate `cfg.storyImports.bundle`
  entry below, not a regression.
  **Diagnostic recipe if previews ever look unstyled again:** probe a rendered card and
  look at an element's `className`. Tokens resolving + `tedi-theme--default` present +
  Roboto loaded + *no component classes* means the shim policy stopped matching, not
  that CSS or tokens are missing.
- **`preview-gen-storybook.mjs`** — `[GENERAL]` two wrapper-template gaps:
  1. **`globals.backgrounds`** (storybook backgrounds addon). The "inverted" variants
     declare `globals: { backgrounds: { value: 'brand' } }` and are designed for a dark
     brand surface. Unhonoured, those cells render **white-on-white**: Button's
     "Secondary Inverted" looked like it had lost every row except Disabled, when in
     fact only the one grey row was visible. Invisible cells cannot be graded at all.
     Affects 8 story files (button, link, footer, collapse, info-button,
     closing-button, collapse-button, affix).
     **The wrapper adds NO padding** — storybook's addon paints the *canvas*, leaving
     story width untouched. A `1rem` padding here cost 32px of the 900px capture
     viewport, which wrapped Button's inverted rows onto a second line while the
     identical non-inverted stories did not. That reads exactly like a component
     mismatch; it was self-inflicted. Don't reintroduce it.
  2. **`ctx.globals` was hardcoded `{}`.** `theme-provider.stories.tsx` prints
     `Current theme: {globals.theme}` — blank against storybook's `default`. Now seeded
     from `GLOBAL_DEFAULTS` (mirrors `globalTypes` in `.storybook/preview.tsx`) with
     story > meta > default precedence. Affects theme-provider, footer, header.
  Both `BACKGROUNDS` and `GLOBAL_DEFAULTS` mirror `.storybook/preview.tsx` — **keep
  them in sync if that file's options change** (an unknown name falls through
  unwrapped, i.e. upstream behaviour, so the failure mode is silent).
- **`previews.mjs`** — `[GENERAL]` symptom: 66 of 81 previews blank with
  `ReferenceError: process is not defined`. Root cause:
  `src/tedi/providers/label-provider/label-provider.tsx` reads
  `process.env.JEST_WORKER_ID` at module scope, and the breakpoint hooks pull that
  provider into nearly every component — the 15 survivors were exactly the
  hook-free ones (`Icon`, `Text`, `Heading`, `Col`, `Row`, `VerticalSpacing`, …).
  Fix: add `'process.env.JEST_WORKER_ID': 'undefined'` to the preview esbuild
  `define`, mirroring `.storybook/main.ts`'s `viteFinal` block.
  **Why a define and not `cfg.storyImports.shim`:** shimming the import to the
  shipped `dist/` would also have gone green with no fork (dist has the check
  compiled away), but the reference storybook compiles `label-provider` from
  `src/`. Shimming would make preview and oracle run different code, so every
  later grade would compare two different builds. The define keeps both sides
  compiling identically.
  **If a new `process.env.X` read appears in `src/`, add it in both places.**

## Providers

**`cfg.provider` must be the FULL chain the storybook decorator supplies.** Setting
`cfg.provider` at all stops `.storybook/preview` decorators from being the preview
wrapper, so anything the decorators provided and the config omits silently disappears.
This bit once already and cost a full re-grade:

- `.storybook/storybook-decorator.tsx` wraps every story in
  **`<LabelProvider locale="et">`**. It was omitted from the first `cfg.provider`, so
  `LabelContext`'s no-provider fallback (`getLabel = key => key`) leaked raw i18n keys
  into the DOM — previews showed `file-upload.add` where storybook showed
  "Lisa manus". Only *visible* on FileUpload/FileDropzone, where the label is the
  component's main text, but it silently mislabelled **every** component with default
  labels (Select, Pagination, Table, Modal's close button, Calendar, and
  NumberField's locale-derived decimal separator).
- **Lesson for the next sync:** after changing `cfg.provider`, scoped-compare a
  component whose main visible text comes from a default label — not just a themed
  one. `Button`/`Modal`/`Footer` all pass with an incomplete chain because they take
  their text from story args.
- `provider` is part of the **grade contract**, so any change to it clears every grade.
  Get the chain right before fanning out.

- `.storybook/preview.tsx` wraps every story in `ThemeProvider theme={theme}` →
  `PrintingProvider` → `StorybookDecorator`, and toggles a
  `tedi-theme--default` / `tedi-theme--dark` class on `<html>`.
- `ThemeProvider`, `PrintingProvider` and `LabelProvider` are all real exports of
  `dist/tedi.es.js`, so `cfg.provider` can name them directly.
- `StorybookDecorator` is a `.storybook/`-local file, **not** a bundle export — it is
  storybook page chrome, not part of the DS contract, so it must not go in `cfg.provider`.
- `components-labelprovider` is the one story id the decorator deliberately does *not*
  wrap in `StorybookDecorator`.

## Excluded components (`cfg.titleMap` → `null`)

Storybook titles with no matching public export, excluded on purpose:

- **`FormLabel`** — the repo's own story tags it `status: internalComponent`
  ("only used to build other components and not being exported from library").
  Not in the `tedi` barrel. Correctly out.
- **`Toast`** — there is no `Toast` component; the API is `sendNotification()` plus
  `ToastContainer`. The stories are click-driven, so nothing renders statically.
  No coverage lost: the thing a toast *looks* like is `Alert`, which is synced.
- ~~**`Applicationshell`**~~ — **✅ STORY DELETED FROM THE REPO 2026-08-12; the
  `titleMap` entry is gone too.** `TEDI-Ready/Layout/Application shell` (added 2026-08-10)
  was a documentation-only story composing Header + SideNav + main + Footer, with three
  deliberately broken variants. It had **no export of its own**, so it could never become
  a component card: the roster pairs story titles to real bundle exports, and an
  unpairable title yields `[TITLE_UNMAPPED]` plus a floor card. The DS team removed the
  stories rather than keep a Storybook-only page (2026-08-12).
  **Removing the `titleMap` exclusion is grade-free** — `configSlicesFor().componentFor()`
  keys only remaps *into* a component (`[, v] => v === name`); `{title: null}` exclusions
  are excluded from every key by design, so this edit re-keyed nothing.
  **Where the shell guidance lives now:** `conventions.md` §10 "Page shell / app layout"
  — canonical `AppShell` snippet, why-each-rule, wrong/right table, and the
  no-positioning-utilities caveat. That is the single source; two dangling references
  were repointed at it (`sidenav/documentation.mdx`, which now states the three failure
  modes inline for Storybook readers, and `docs/figma-make-kit-composition-prompt.md`).
  **If a shell card is ever wanted in claude.ai/design, the prerequisite is an exported
  component in the `tedi` barrel — not a story.** Force-exporting a composition that the
  library does not ship would teach the design agent markup that does not compile, which
  is the same trap the `InputGroup` entry below documents.
- ~~**`InputGroup`**~~ — **✅ FIXED IN THE REPO 2026-08-07; no longer excluded.**
  It was a real library defect: `input-group.tsx` had `export default InputGroup` only
  (a bare `const`, no named export) while `index.ts` used `export * from './input-group'`
  — and `export *` does not forward defaults. So the composed `InputGroup` (with
  `.Prefix` / `.Input` / `.Suffix`, which the repo's own story uses) was not importable
  from `@tedi-design-system/react/tedi`; only `InputGroupBase` was, and it has no
  subparts. It was deliberately NOT force-exported via `extraEntries` — that would have
  rendered a beautiful preview while teaching the design agent to emit `<InputGroup>`
  markup that does not compile in a consumer app.
  **The fix follows the house compound pattern** (identical to `Table` and `Accordion`):
  `export const InputGroup = Object.assign(InputGroupBase, { Prefix, Suffix, Input });`
  plus the existing `export default`. `Object.assign` infers the namespace types instead
  of asserting them with `as typeof … &`. No `index.ts` changes were needed — `export *`
  forwards a named export automatically, which was the entire problem.
  **Knock-on effects, all good:** component count 81 → 82 (InputGroup now has a card,
  `.d.ts` and `.prompt.md`); `cfg.titleMap {"InputGroup": null}` removed; and
  `cfg.storyImports.bundle` for that subtree removed too — that entry existed ONLY
  because the missing export forced the subtree to compile from `src` to keep its React
  context consistent, which is what left `Prefix`/`Suffix`/`Input` unstyled. The roster
  now has **zero** components compiling from src (bare-BEM probe: only Footer's 4 benign
  story-id strings). Slider's two `close` grades became `match` as a result.

## Accepted permanent deltas (graded `close` on purpose — do NOT "fix" these)

Each of these is a **storybook-harness** feature with no counterpart in the shipped
bundle. Faking any of them in an owned preview would assert styling or behaviour the
design system never actually applies, which is worse than the honest delta.

- **`storybook-addon-pseudo-states`.** Stories declaring `parameters.pseudo`
  (`States` / `Primary` on DateField, DateTimeField, TimeField, Toggle, Slider, …)
  get hover/focus/active rows painted by the addon, which rewrites `:hover`/`:focus`
  selectors into class variants. Previews render those rows in the default state.
  Not part of the DS contract → permanent `close`.
  **⚠ Refinement (2026-08-12, found independently by three grading waves): the presence
  of `parameters.pseudo` is NOT by itself evidence of this delta — grade from the images,
  not from the story's parameters.** Three distinct sub-cases produce a legitimate
  `match`:
  - **Dead selectors.** `NumberField.States` declares `pseudo` with `#Hover` / `#Active` /
    `#Focus`, but the story renders no elements carrying those ids (its rows are labelled
    Default / Min value / Max value / Disabled / Error), so the addon paints nothing and
    both panels are identical. Arguably a story bug worth reporting to the DS team — that
    story never actually demonstrates hover/active/focus.
  - **`hover` is a real component prop.** Checkbox / Radio `States` show a hovered row on
    *both* panels and declare no `parameters.pseudo` at all.
  - **The pseudo story is past the 6-story cap.** `horizontal-stepper.stories.tsx`
    defines a `statesPseudo` block, but the story using it is never captured, so none of
    the six captured rows carry the delta. A `grep` for `pseudo` in the story FILE proves
    nothing about the captured stories.
- **`tedi-storybook-styles.scss` demo scaffolding — the single most common `close`
  across the roster (~29 tedi story files; confirmed independently by two waves).**
  `grep -rln "example-list\|example-box\|padding-14-16\|border-bottom\|display-flex\|\"bg bg-" src/tedi --include="*.stories.tsx"`
  Full family (all verified `dist=0`, `sb-reference=1`): `example-list`, `example-row`,
  `example-box`, `padding-14-16`, `border-bottom`, `display-flex`, `bg`/`bg-*`, `w-50`.
  `w-50` is the nastiest: it shrinks the STORYBOOK container to 50%, so the two panels
  differ in overall WIDTH as well as padding — that reads like a layout bug and is not.
  **Two members the class grep will NOT find:**
  `.example-box` (`padding:.75rem 0; background:#27292b08; border:1px solid rgba(39,41,43,.1)`
  — a stretched child renders as a grey bordered box in storybook and invisibly in the
  preview), and the bare **`code` ELEMENT selector**
  (`code{padding:4px;color:var(--tedi-neutral-100);background-color:var(--tedi-red-600);border-radius:4px}`)
  — `dist/index.css` has no `code` rule at all, so inline `<code>` is a red pill in
  storybook and plain monospace in the preview. Being an element selector, no
  class-name grep locates the affected stories.
  The classes `example-list`, `border-bottom`, `padding-14-16`, `display-flex` and the
  `bg` / `bg-*` family (`.bg` = flex+padding+radius, `.bg-primary` =
  `background-color: var(--general-surface-brand-primary)`, used by Icon's and Text's
  colour-swatch stories, where it makes white-on-brand swatches invisible in the
  preview) are defined ONLY in
  `node_modules/@tedi-design-system/core/tedi-storybook-styles.scss`,
  which `.storybook/preview.tsx` imports (line 8) and `dist/index.css` does not
  contain. They ARE in `.design-sync/sb-reference/assets/iframe-*.css`, so the oracle
  has them and the preview page does not: storybook shows padded, separated demo
  tables where previews render the rows flush. **The components themselves are
  pixel-identical on both sides — only each story's own demo scaffolding differs.**
  Resolution: **accepted roster-wide, not fixed.** Two routes were considered and both
  rejected: `cfg.cssEntry` would ship demo-only classes into the product bundle as if
  they were DS utilities; the preview-page CSS slot (`_preview/<Name>.css`) is owned by
  `lib/emit.mjs`, which is app-contract surface the skill forbids forking. A
  claude.ai/design consumer has no `.display-flex` either, so the preview is the
  honest render. (`align-items-center` and `gap-3` ARE shipped and do work.)
  Do NOT inject a per-component `<style>` in an owned preview — a per-component
  workaround for a roster-wide cause shadows the real fix forever.
  Red herrings added 2026-08-12: `state-example` and `slider-state-hover|active|focus`
  (TimeField, Slider) exist in neither `dist/index.css`, nor
  `@tedi-design-system/core/tedi-storybook-styles.scss`, nor the sb-reference iframe CSS
  — inert on both sides, no delta.
  Red herring: `badge-grid`, `mb-2`, `d-flex` exist in NEITHER side's CSS, so they are
  inert on both and produce no delta — don't chase them.
  **Worst sub-case — looks like a component bug but isn't (Link, Tabs `States`,
  ClosingButton, CollapseButton):** a story writing
  `className="display-flex align-items-center gap-3"` gets the flex *modifiers*
  (`gap-3`, `align-items-center` both ship) but no flex *container*, so siblings lose
  ALL separation and render as one concatenated word ("CreateContinue", "Ava ˅Sulge ^")
  rather than merely losing padding. Grade `close`; never fix per-component.
  **✅ RESOLVED 2026-08-07 — this delta no longer exists; kept for history only.**
  `display-flex` was a ~2-year-old **storybook-only** helper; the shipped equivalent
  `.flex{display:flex!important}` was already in `dist/index.css`. The DS team renamed
  every occurrence to `flex` (32 story files + `file-upload.tsx`), and this sync
  finished the last two in `icon.stories.tsx`. `grep -rn "display-flex" src/tedi` now
  returns **0**, and previously-collapsing layouts (ClosingButton "Ava ˅ Sulge ^",
  Link "Create / Continue", DateField quick-selects, Toggle's state grid) verified as
  correctly spaced on both panels afterwards.
  **`file-upload.tsx` was a real production bug**, not just story churn: its internal
  `<Col className="display-flex">` referenced a class that ships only in the storybook
  stylesheet, so that column was never actually flexed in a consuming app. Storybook
  hid it; this sync exposed it because previews load only the SHIPPED css.
  (An even earlier version of this note suggested *shipping* `display-flex` — that was
  wrong; it would have entrenched a deprecated class and taught it to the design agent.
  The correct fix was the deletion.)
  **Consequence to expect on the next sync:** with `flex` working, several stories now
  lay out horizontally and legitimately exceed a grid cell — `FloatingButton` and
  `Link` needed `cardMode: "column"` added afterwards for exactly this reason.
- **`src/community/` chrome renders unstyled.** Community is out of scope, so a story
  importing community components compiles them from `src` where `.module.scss` is
  empty. Content correct, chrome unstyled. Two known cases:
  HashTrigger `Tabs With Hash Trigger` (community `Tabs`/`TabsItem` → plain links) and
  **Tooltip `Triggers`** (its third trigger is community `Toggle` → a bare native input
  sliver plus an unstyled bordered box, vs the styled TEDI switch in storybook).
  Find others with: `grep -rn "community/" src/tedi --include="*.stories.tsx"`
- ~~**InputGroup chrome inside Slider's `With Input Group` / `Custom Value`.**~~
  **DELETED 2026-08-12 — this delta no longer exists; do NOT down-grade these two
  stories.** The entry described `cfg.storyImports.bundle` compiling that subtree from
  `src` with an empty `.module.scss`, so the label sat above the box instead of inline.
  Verified this run: both stories render the InputGroup chrome **fully styled** in the
  preview (bordered box, inline `%` suffix, divider, `-`/`+` NumberField group) and both
  graded `match`. The cause was removed when InputGroup got its named export
  (2026-08-07); the "Excluded components" section already said so, and this entry
  contradicted it for five days. Two `match`es were nearly graded `close` off this text.
- **Capture-height asymmetry — a real verification GAP, not just cosmetics.**
  `compare.mjs` shoots `#storybook-root` as a full-height *element* on the storybook
  side but `screenshot({fullPage:false})` on the preview side, so anything past the
  700px capture viewport is cut from the preview panel only. Observed on
  `Card/Header Types` (sb 868x1068 vs ds 900x700), `Card/Default Card` (809),
  `SideNav/Sidenav Item States` (1168), `HashTrigger/Default`. Those tails were graded
  as framing, which means **they are unverified rather than verified-good**. Remedy
  when it matters: a taller `cfg.overrides.<Name>.viewport` (e.g. `Card: "900x1200"`,
  `SideNav: "900x1300"`) — note `viewport` IS the grade key, so it re-grades that
  component and needs a full build.
- **A broken image on the STORYBOOK side** (`[Logo]` placeholders on Header/TopNav).
  `file://` + SVG fails in the capture harness while the preview has the asset inlined
  as a data URI. When the *reference* is the deficient side, judge the component on its
  own merits — a preview that renders MORE than a broken reference is not a mismatch.
- **Preview content box is NARROWER than the storybook root — and it can tip a grid
  into WRAPPING.** Exact numbers: storybook `#storybook-root` = **868px**; the preview
  page = **852px** (900px capture viewport minus `body{padding:24px}` in
  `.ds-sync/lib/emit.mjs`, deliberate for `?story=` captures). A 16px shortfall.
  Harmless on most stories, fatal on any story that fits storybook with **<16px of
  slack**: Button's state grids consume 859 of 868px, so all 5 state rows wrapped their
  third `Col` (the whole "Small" group) onto a second line.
  **Remedy — set the capture viewport so the content boxes match exactly:**
  `cfg.overrides.<Name>.viewport: "916x700"` (916 − 48 = 868). Applied to `Button`.
  `viewport` IS in the grade key, so it re-grades that component and needs a full build.
  Do NOT try to fix this from an owned preview — the delta is container width, not JSX.
  The grade-neutral alternative would be aligning `emit.mjs`'s 24px padding to
  storybook's 16px, but `emit.mjs` is app-contract surface the skill forbids forking.
  **This was pre-existing, not caused by the `flex` rename** — the old unshipped
  `display-flex` meant those Cols were never flex containers, so their min-content
  collapsed and the Row could not overflow. Fixing the class exposed the real fit.
- **Measure before calling a width delta — the sheet's scaling lies, on BOTH axes.**
  The compare sheet scales each panel independently to its own row height, so panels of
  different heights are squeezed by different amounts and width becomes unreadable:
  - short, wide strips: an Attachment row *looked* ~40% wider on the storybook side; a
    pixel scan proved both were exactly 480px (`maxWidth: 480`).
  - tall stories: TextArea `States` *looked* ~65% NARROWER on the storybook panel. Raw
    dimensions were sb `868x1328` vs ds `900x700` — the tall storybook element-shot is
    squeezed far more, so it reads as narrow. Real width difference: 4%.
  This hits every `States` story in the form namespace (they are the tallest, hence the
  most distorted). Always check the raw PNG dimensions in
  `_screenshots/compare/raw/` before calling any size delta.
- **Open-by-default PORTAL stories: the STORYBOOK side is the deficient one.**
  `compare.mjs` element-shots `#storybook-root` on the reference side, but portaled
  overlay content is mounted on `document.body` — *outside* that element — while the
  preview side is a viewport shot and does capture it. So e.g. Tooltip's
  `Uncontrolled Default Open` shows a correctly styled open tooltip in the preview and
  a ~24px empty sliver in the reference. Grade `match` on the component's own merits.
  Expect this for every open-by-default portal story (Modal, Dropdown, Popover
  `ControlledOpen`-style). The honest remedy would be capturing
  `#storybook-root` + the portal root on the reference side — **never** neutralize the
  story's open state to make the two panels agree.

- **`position: fixed` inside a preview cell is contained, so it can render off-capture
  (Affix `Fixed Example`) — found 2026-08-12.** The preview page template in
  `.ds-sync/lib/emit.mjs` sets `transform: translateZ(0)` on both `.ds-cell` and
  `.ds-single`. A transform makes that element the **containing block** for
  `position: fixed` descendants, so `bottom: 0` resolves to the bottom of the (1500px
  tall) story instead of the viewport — around y≈1524, outside the 700px capture. The
  storybook side is the honest panel here (fixed to the iframe viewport, visible at rows
  681–695). Graded `close` with the cause named. **Not fixable from config or an owned
  preview** — `emit.mjs` is app-contract surface the skill forbids forking, and an owned
  preview would fake the containment. Worth reporting upstream: any DS with
  fixed-position helpers hits it, and since containment is arguably *desirable* inside a
  real grid cell, the honest upstream fix is dropping `translateZ(0)` from `.ds-single`
  only (the single-story `?story=` capture path).
- **`position: sticky` is ENGAGED on the storybook panel and not on the preview panel
  (Affix `Default` / `Sticky Top 0`).** `compare.mjs` element-shots a 1500px-tall root and
  playwright scrolls it into view, which engages sticky (`top: 1.5rem`); the preview side
  is an unscrolled `fullPage:false` viewport shot. The text therefore sits 24px lower in
  storybook. Sticky behaviour in previews is **untested rather than wrong**. Expect the
  same on ScrollFade / ScrollVisibility / sticky SideNav rails.
- **Text-type overlay triggers lose their dashed underline on the STORYBOOK panel.**
  Whenever a story's `#storybook-root` box is exactly the text line-height (Tooltip
  `Tooltip Width` sb 868x24 vs ds content 29px; Tooltip/Popover `Arrow Position`), the
  underline — a `border-bottom` on the inline trigger — overflows the block box, and the
  storybook **element** screenshot clips overflow while the preview's viewport shot does
  not. Proven by a per-row dark-pixel scan: glyph rows byte-identical on both sides, only
  the two underline rows missing from the sb shot. Same family as the portal rule — the
  reference is the deficient side → grade `match`. No viewport change helps; it is an
  element-shot property.
- **`globals.backgrounds` paints the storybook CANVAS but only a wrapper div in the
  fork.** Any part of a story that escapes the wrapper's box (e.g. Affix's collapsed
  `marginTop: 100` band) is grey in storybook and white in the preview. Not fixable
  without adding padding the `preview-gen-storybook.mjs` fork deliberately refuses.

## Affirmatively verified (don't re-audit these without a reason)

**End-to-end reproducibility (2026-08-10).** Rebuilt `dist/` (`npm run build`, font
rewrite confirmed) *and* `sb-reference` (`STORYBOOK_EXCLUDE_COMMUNITY=true storybook
build`) from source, then ran the converter against committed `.design-sync/`. The
resulting `_ds_sync.json` is **byte-identical** to the uploaded one: `styleSha`,
`bundleSha12`, `auxSha`, `scriptsSha` all match, and 0 differences across 82
`renderHashes`, 82 `sourceKeys` and 246 `sourceHashes`. A from-scratch sync therefore
reproduces this exact design system — the conventions header, per-component gotcha docs,
uncapped prop descriptions and referenced-type shapes all derive from committed files,
not from any previous agent's reasoning.

**Repository-URL import cannot replace design-sync — tested 2026-08-11, don't retry.**
The full converter output (447 files, 11 MB — bundle, compiled CSS, tokens, fonts,
per-component `.d.ts`/`.prompt.md`/`.html`, `_preview/`, `_vendor/`, sentinel and anchor)
was committed to `design-system/` and the repo imported by URL in Claude Design. The
importer **did** detect that compiled components were present, but the result still did
not match a design-sync project. So "commit the built artifacts so the URL importer can
use them" is a closed question: shipping a runnable bundle in git is not sufficient.
The directory was removed afterwards (it survives in commit `ce9718c0`). Each
organisation runs `/design-sync` against its own project — see DESIGN.md for the flow.

**Storybook is not agent-readable (2026-08-10).** Fetching a docs deep link returns a
client-rendered shell: the entire text content of
`https://storybook.tedi.ee/react/rc/?path=/docs/tedi-ready-layout-sidenav--docs` is
`"storybook - Storybook"` — no props, no examples. This is why `conventions.md` §5 ranks
**story source first**, `.d.ts` second and live Storybook third (for a human to look at),
and why it warns agents off fetching those URLs. Do not "helpfully" promote Storybook back
to the primary reference. The one machine-readable endpoint is
`<storybook>/index.json` — story ids and titles, good for *finding* a story and for
verifying deep-link slugs instead of guessing them (that is how the five slugs in
`.design-sync/docs/` were checked).

The compare loop is structurally blind to a missing font — both panels would fall back
identically — so these were checked deliberately rather than inferred:

- **Material Symbols icon font is INTACT.** Real glyphs at 8/12/16/18/24/36/48px, both
  `filled` and outlined, in standalone, background-circle and inline-in-text contexts,
  on both panels. No tofu, no empty boxes, no `arrow_forward` ligature text.
  No `[FONT_MISSING]` action is needed for the icon surface.
- **Typography is INTACT.** Same Roboto family, same weight ladder (H1 light, H2/H3
  bold, H4/H5 regular, H6 bold-small; Body/Small/Extra-small regular/bold/italic) and
  the same size ladder on both panels, verified from raw PNGs rather than the shrunk
  sheet.

## Story-cap scope — a DELIBERATE decision, do not re-open

`compare.mjs` captures at most **6 stories per component** (`[STORY_CAP]`). Across this
roster that leaves ~260 tail stories functional but never individually graded, and six
independent grading agents flagged that those tails hold structurally distinct variants
(Table 6/30, DateField 6/22, Pagination 6/22, Header 6/18, ChoiceGroup 6/17, Card 6/16,
FileUpload 6/15, Modal 6/14, Alert 6/12 incl. its colour matrix, Search 6/12,
EmptyState 6/12, Filter 6/8, ButtonGroup 6/9, Separator 12 of 18 dotted variants …).

**The DS team decided NOT to raise the cap** (2026-08-07): the library contains only
designer-confirmed stories, so the tails are not unknown territory, and grading the
primary story per component is sufficient to prove the component arrived intact from the
shipped bundle. Raising the cap remains purely additive if that ever changes — it is NOT
in the grade contract, so `compare.mjs --max-stories N --components <list>` captures the
tail with no rebuild and no loss of existing verdicts.

**Two consequences to carry forward honestly:**
- Tail stories are **verified-by-upload, never individually graded**. On future syncs a
  capped component that graded `match` carries forward in full, tail included.
- Two of the 23 `[TOKENS_MISSING]` entries — `--separator-dot-position` and
  `--separator-dotted-dot-sm` — are exposed ONLY by Separator's uncaptured dotted
  stories, so they remain untested. `--separator-thickness` WAS verified correct.

## Card labels are PascalCase, not humanized — accepted, converter gap

In claude.ai/design the variant labels on a component card read
`LongTextButtonThatWrapsIntoMultipleLines`, where storybook shows
`Long Text Button That Wraps Into Multiple Lines`.

**Cause (not fixable from config):** the card template builds each cell label as
`'<h4>' + exportKey + '</h4>'` — the JS **export identifier** of the compiled preview,
which cannot contain spaces. The humanized name is available (it is `name` in
`ds-bundle/.stories-map.json`, alongside `exportKey` and `emitted`) but nothing carries
it into the card. The template lives in `.ds-sync/lib/emit.mjs`, which is app-contract
surface the skill forbids forking (it owns the `@dsCard` header, the stylesheet links and
the `window.__dsCells` protocol the app's self-check reads).

**Decision (DS team, 2026-08-07): accept — purely visual.** Do NOT fork `emit.mjs` for
it; that would trade a permanent loss of upstream card-contract fixes for cosmetics.
The proper fix is upstream, one line in that template: humanize the key for display, or
read the label from the stories map. Worth reporting — any storybook-shaped DS hits it.

**Note this does NOT affect the design agent.** `<Name>.prompt.md` — what the agent
actually reads — already lists variants with spaces
("Long Text Button That Wraps Into Multiple Lines"). The gap is human-facing only, in
the component picker.

## Known converter gaps (upstream behaviour — don't chase these as bugs here)

Measured 2026-08-10. Two of them are already worked around; both workarounds are in the
durable set, so they survive a re-sync.

- **Emitted `## Examples` reference story-local identifiers that are not library
  exports.** `emit.mjs` lifts a story export's own source and nothing else, so any
  module-level helper the story depends on arrives undefined. `Table.prompt.md` shipped
  `useEditableRows(...)`, `EditableRowsProvider` and `bookingShowcaseColumns`; `Header`'s
  would ship `SidenavLayout`. An agent following those writes an import that fails —
  worse than no example, because it reads as authoritative.
  **Worked around** for `Table`, `SideNav`, `Header`, `Footer` and `Link` by authoring
  `.design-sync/docs/<Name>.md` (`cfg.docsDir`), which *replaces* the synthesised body —
  `## Props` is re-appended automatically, but Variants / Examples / Related are not, so
  restate what you need. The other 77 components still carry the raw behaviour.
- **Examples are the first three stories in declaration order**
  (`emit.mjs` `visibleStoryIds.slice(0, 3)`), which by convention means
  `Default`, `Sizes`, `Type` — the least informative ones. The stories that answer real
  questions sit late in the file (`EditableValues` is 8 of 30; `LoggedInWithSidenav` is
  18 of 18) and contribute no source, appearing only as opaque `compose(S, "…")` lines.
  Nothing to do about it short of authoring a doc for that component.
- **`emit.mjs` and `bundle.mjs` are app-contract surface and must never be forked**, which
  is why the two above are worked around rather than fixed. `dts.mjs` is forkable, which
  is why the prop-doc and referenced-type problems *were* fixed (see Lib forks).
- **⚠ `cfg.docsDir` is resolved from `PKG_DIR`, which in THIS repo is `dist/`, not the
  repo root — found and fixed 2026-08-12.** The value was `".design-sync/docs"`, which
  resolved to `<repo>/dist/.design-sync/docs`; the build printed
  `! docsDir: .design-sync/docs not found — skipped` and `docs: 0/83 components matched`,
  silently dropping all five hand-authored docs (Footer, Header, Link, SideNav, Table) and
  shipping the raw synthesised bodies — including the broken `## Examples` those docs
  exist to replace. **Now `"../.design-sync/docs"`.** Why `PKG_DIR` is `dist/`: the
  converter walks up from `--entry` (`./dist/tedi.es.js`) to the first `package.json`
  carrying a `name`, and this repo's build copies the full package manifest into
  `dist/package.json`. That is also why `cfg.cssEntry` is `"./index.css"` (i.e.
  `dist/index.css`) and always looked correct.
  **The trap is that `readmeHeader` resolves from the CONFIG file's directory instead**,
  so `".design-sync/conventions.md"` works while `".design-sync/docs"` does not — two
  path fields in one config with two different bases, one failing silently as a warning
  line. Assert after every build: `grep -c "docs: 0/"` the build log must be 0, or check
  `docs: 5/83 components matched`.
- **⚠ A case-only component rename deletes its own generated preview on macOS — found
  2026-08-12 (TextArea → Textarea).** `previews.mjs` generates `Textarea.tsx`, which on a
  case-insensitive filesystem OVERWRITES the existing `TextArea.tsx` while the directory
  entry keeps the OLD casing. The stale sweep then reads the directory, sees an entry
  named `TextArea` that is no longer an exported component, finds it machine-clean (the
  marker matches — it is the freshly written Textarea body), and removes it. Net effect:
  the log says `previews: 83 generated` and `(stale preview removed: TextArea)`, only 82
  wrappers exist, and the renamed component ships a **floor card** with every story
  `unpaired` plus a `[RENDER_BLANK]` warning. `preview-rebuild.mjs` cannot repair it (it
  only recompiles existing wrappers). **Fix: just build again** — with the old-cased file
  now gone, the second build writes the wrapper under the correct name and it survives.
  Worth reporting upstream; a case-insensitive-aware stale sweep would prevent it.
- **Class names that read as real but resolve to nothing** have bitten this repo twice:
  the Storybook-only `display-flex` helper, and Tailwind classes
  (`fixed left-0 top-0 h-full z-50`) in `sidenav/documentation.mdx`. Nothing validates
  class names against the compiled stylesheet, and the failure is invisible at render
  time — the element simply has no styling. When repo docs tell a consumer to write a
  `className`, check it against `dist/index.css` first.

## Known render warns (triaged — a warn NOT listed here is new)

- **`[REFERENCE_STALE?]` fires on any docs-only or header-only change — usually benign
  (triaged 2026-08-12).** The check compares "bundle changed" against "`sb-reference`
  unchanged", but the bundle's header embeds the hashes of every `.d.ts`/`.prompt.md`, so
  editing `.design-sync/conventions.md` or a `docsDir` doc moves `bundleSha12` without any
  DS source change. **Decide it by the source, not the warn:** if `git status`/`git log`
  shows no change under `src/` since `.design-sync/sb-reference` was built, ignore it. It
  is a real warning only when DS source moved — then rebuild the reference first, because
  a stale oracle makes every grade a comparison against the *old* design.
- **A `[SPOT_CHECK]` canary with `trigger: reference_drift` is the expected companion to
  that warn.** Grades are KEPT; the driver just recaptures ~5 components so you can
  confirm them. Read those five sheets, compare against the recorded verdicts, and move on
  — do not re-grade the roster unless several genuinely diverge.
- **The emitted `.d.ts` drops `extends` clauses, so native-attribute forwarding is
  invisible to the design agent** (noted 2026-08-12). `ClosingButtonProps extends
  ButtonHTMLAttributes<HTMLButtonElement>` in `closing-button.tsx`, but
  `ds-bundle/components/buttons/ClosingButton/ClosingButton.d.ts` emits a flat
  `export interface ClosingButtonProps {` with the props inlined — an agent reading only
  that file cannot tell the component forwards native button attributes. Not a bug to fix
  in the artifact (the flattening is what makes props readable); the compensation is to
  state it in `conventions.md`, which currently does for `ClosingButton`/`title`. Worth
  remembering before claiming "the `.d.ts` is the complete contract".

- **`[TOKENS_MISSING]` — 22 CSS custom properties at 19.0.0-rc.2** (was 23 at
  18.1.1-rc.1; the membership shifted with the release, so match on the CLASS of name, not
  a fixed list). Same triage as below — still non-blocking, validate still exits 0. Two
  notes from 2026-08-12: `--timeline-layout-gutter-mobile` arrived with the new Timeline
  component and belongs to the same runtime-injected class; `--form-input-border-error` is
  new and was **verified resolving correctly** — FileUpload `Validation Failed` and
  TextField/Search/Select `States` all render the red error border identically on both
  panels. The historical 23-entry text follows.
- **`[TOKENS_MISSING]` — 23 CSS custom properties** (`--separator-thickness`,
  `--separator-dot-position`, `--card-radius-rounded-desktop/tablet`,
  `--timeline-layout-gutter-mobile`,
  `--button-neutral-inverted-icon-only-background-default`, …).
  **Triaged as legitimate.** Verified in a live rendered card that tokens resolve
  correctly (`--tedi-primary-600` → `rgb(0 90 163)`) and that the shipped closure
  defines 2925 custom properties. These 23 are set at runtime by components via inline
  style / JS, exactly the case the tag's own text calls expected. Non-blocking; validate
  exits 0 with it.

## Re-sync risks

- **⚠ A story edit with ZERO visual effect still costs a full re-grade of that component
  (2026-08-12).** Adding `parameters.a11y.test: 'todo'` to 9 story files moved every one of
  their `sourceKeys` *and* `renderHashes`, because `srcSha` fingerprints the story FILE and
  the compiled wrapper embeds the parameter. There is no "cosmetic edit" escape hatch and
  there should not be — the pipeline cannot know the edit is inert. **What to do:** confirm
  the diff really is inert (`git show` the commit), then re-grade the named components from
  the fresh sheets; expect them to reproduce their previous verdicts exactly. Do NOT hand-copy
  the old grades forward — the sheets are cheap and the images are the contract.
  Corollary: `dist/` does **not** need rebuilding for story-only commits (the library build
  never reads stories, so `bundleSha12` holds), but `.design-sync/sb-reference` **does**.
- **Deleting or adding any story means rebuilding `sb-reference`, which fires a
  `reference_drift` `[SPOT_CHECK]` canary.** Grades are KEPT; the driver recaptures ~5
  unrelated components for confirmation. That is expected, not a regression — read the five
  sheets, confirm against the recorded verdicts, move on. Two consecutive reference rebuilds
  in one session will pick two different random sets (this run: Accordion/Footer/Header/
  Truncate/FileDropzone, then Accordion/Link/TextField/Col/Dropdown — all confirmed).
- **⚠ READ FIRST (2026-08-12): the whole roster was re-graded at 19.0.0-rc.2, so the
  grades in the uploaded anchor are current — but expect them ALL to read as churned again
  on the next converter update.** This run the driver reported `0 verified-by-upload, 81
  changed, 2 new, 1 removed`: `sourceKeys` moved for all 83 components even though only
  4 preview HTMLs actually changed (Calendar, FileDropzone, FileUpload, Table). Cause: the
  staged converter's `scriptsSha` changed (`489fe541dac44703` → `d09681f16bb35382`) while
  `KEY_RECIPE` stayed at 7. **How to tell a real change from this churn:** compare the
  fresh `ds-bundle/_ds_sync.json` `renderHashes` against the remote anchor's, component by
  component — identical hash means byte-identical preview HTML. When the churn is
  converter-only AND `styleSha` is unchanged, carrying the grades forward is defensible;
  **this run did NOT carry them, because `styleSha` DID change** (real CSS churn across a
  major version), which invalidates verdicts earned against the old stylesheet.
- **Capture-clipped tails — the complete known list, deliberately NOT closed
  (2026-08-12).** `compare.mjs` element-shots `#storybook-root` full-height on the
  storybook side but takes a 700px viewport shot on the preview side, so any taller
  story's tail is missing from the preview panel only. Those tails are **unverified
  rather than verified-good**. Six grading agents measured the raws and named these:
  Accordion (`Action Types` 1954px, `With Icon Card` 1220px, `Variants` 886px), Card
  (`Header Types` 1068px — the two inverted/dark header variants are exactly what is cut,
  `Default Card` 809px), Table (`Simple` 987px, `Sizes` 732px), Calendar (`With Footer`
  810px), InputGroup (`States` 1152px), Search (`Sizes` 784px), DateField / DateTimeField
  (`States` Error row), TextField / Select / **Textarea** (`States` — Textarea loses its
  Disabled/Success/Error rows), CardButton (`Card Rows` 800px),
  FloatingButton (4 stories, up to 1172px), Filter (`Customize Content`), SideNav
  (`Sidenav Item States` row 7), Footer (`With Bottom Section`, a 4px StatusBadge sliver),
  HashTrigger (`Default` 1656px, and the community-Tabs story's tail), Affix
  (`Fixed Example`, and see the `translateZ(0)` entry — a viewport raise is the only lever
  and even then the containment stands). **Remedy per component:
  `cfg.overrides.<Name>.viewport: "WxH"`** — but `viewport` IS in the grade key, so each
  one re-grades that component and needs a full build. The DS team's standing decision
  (2026-08-07, reaffirmed here) is to accept these, consistent with the story-cap
  decision: the primary story proves the component arrived intact. Close them
  deliberately, in one batch, if ever.
- **Overlay SURFACES are unverified — only their triggers are (2026-08-12).** Dropdown,
  Modal, Popover and InfoTooltip have no open-by-default story inside the 6-story capture,
  so both panels show nothing but the trigger; all 20 of those stories graded `match` on
  triggers alone. The actual menu / modal panel / popover card is therefore
  verified-by-upload only. Tooltip is the exception (`Uncontrolled Default Open` proves
  the real bubble renders, via the portal rule). Closing the gap needs an open-state story
  plus `cfg.overrides.<Name>.cardMode: "single"`.
- **Header's `lg`-gated variants verify nothing (2026-08-12).** Its Tag-label and
  organisation-selector stories sit inside `<ShowAt lg>` and are invisible at the 900px
  capture width on BOTH panels, so those two stories currently verify only the shared
  chrome. A wider `cfg.overrides.Header.viewport` would expose them.
- **Superseded (2026-08-10) — kept for the mechanism, which recurs.** `dts.mjs` was forked
  that day (doc-cap 120 → 1200, plus a `prelude` of referenced types).
  `configSlicesFor()` hashes fork file bytes into the global config
  slice, which feeds every component's `sourceKey` — so every component lands in
  `pendingGrade` on the next re-sync. **`renderHashes` are byte-identical** (spot-checked
  Accordion `44711f1b7314f4d6` before and after): the fork only changes `.d.ts` /
  `.prompt.md` text and touches no rendering path. Confirm renderHashes match, spot-check
  a couple of sheets, and carry the grades forward rather than re-grading 82 components.
  `package-validate.mjs` passed clean after the change (82/82 `.d.ts` parse, 12/12 sampled
  previews render).
- **Theme coverage is partial by design.** Only the `default` theme was verified.
  The repo exposes `dark` as a storybook toolbar global; dark-theme renders were never
  compared. A regression in dark-theme tokens would not have been caught.
- **`STORYBOOK_EXCLUDE_COMMUNITY=true` is easy to forget.** Rebuilding the reference
  without it silently adds community stories, which then read as unpaired/failed
  components against a tedi-only bundle. If a re-sync reports a wave of new unmatched
  components, check this env var first.
- **`dist/` must be rebuilt through `npm run build`**, not `vite build` directly, or the
  `/fonts/` → `./fonts/` rewrite is skipped and every font 404s while the CSS still
  looks correct on inspection. **This risk MATERIALISED on 2026-08-07** — worth reading
  as a war story, not a hypothetical. `npm run build` is
  `rm -rf dist && vite build && replace-in-file /fonts/ -> ./fonts/`. A class rename
  shortened some `className` strings enough that prettier wanted them on one line; the
  lint failure broke the `&&` chain **after** vite had already written `dist/` but
  **before** the font rewrite. Result: a `dist/` with every file present, correct CSS and
  correct JS, and 27 absolute `/fonts/` urls that 404 in any consumer.
  **A populated `dist/` is NOT evidence the build succeeded — only the exit code is.**
  Always assert `grep -c 'url("\?/fonts/' dist/index.css` is 0 afterwards.
  *Suggestion for the DS team:* moving the font rewrite into the vite config (or running
  it unconditionally) would make a lint failure incapable of producing a silently broken
  `dist/`. Also note `npx eslint --fix <many files>` aborted partway with a stack trace
  and silently skipped 3 files — verify with a second `eslint` pass, don't trust exit 0.
- **The forks mirror `.storybook/preview.tsx` by hand.** `BACKGROUNDS` and
  `GLOBAL_DEFAULTS` in `overrides/preview-gen-storybook.mjs`, and `GD` in
  `overrides/story-imports.mjs`, duplicate that file's `parameters.backgrounds.options`
  and `globalTypes`. If those storybook options change, the forks go silently stale (an
  unknown background name simply falls through unwrapped). Re-check them on any
  `.storybook/preview.tsx` edit.
- **`cfg.provider` must stay the FULL decorator chain.** Setting it at all displaces the
  storybook decorators, so anything they provide and the config omits vanishes silently.
  This bit once (missing `LabelProvider` → raw i18n keys roster-wide). After ANY
  `cfg.provider` edit, scoped-compare a component whose main visible text comes from a
  **default label** (`FileUpload`, `FileDropzone`) — not just a themed one, which passes
  even with an incomplete chain.
- **Two `[TOKENS_MISSING]` entries were never exercised**: `--separator-dot-position` and
  `--separator-dotted-dot-sm` are only reachable from Separator's uncaptured dotted
  stories (story cap). `--separator-thickness` WAS verified correct.
- **Capture-clipped tails are unverified, not verified-good.** Several `States`-style
  stories exceed the 700px preview capture (TextField `Error`, TextArea
  `Disabled`/`Success`/`Error`, Search `Error`, Select `Disabled`, Card's last variants,
  Filter `Customize Content`). Raising `cfg.overrides.<Name>.viewport` closes each gap
  but re-grades that component and needs a full build. *(Superseded by the complete
  measured list at the top of this section — 2026-08-12.)*
- **`conventions.md` carries a version table that rots silently.** It states which npm
  release the bundle corresponds to; at 19.0.0-rc.2 it still said 18.1.1-rc.1 and named
  the removed `TextArea`. A design agent reads that file as authoritative and would have
  written `import { TextArea }`, which is `undefined` in this bundle. **On every re-sync,
  re-run the header validation** (grep every backticked class/token/prop/component in
  `.design-sync/conventions.md` against `ds-bundle/`'s compiled CSS, the
  `components/<group>/<Name>/` dirs and `_ds_bundle.js`) and check the version table
  against `npm view @tedi-design-system/react dist-tags`. Note that negative statements
  in that file are deliberate and will always "fail" a naive name check — it tells agents
  NOT to use `display-flex`, that Tailwind classes like `top-0 h-full z-50` do nothing
  here, and that there is no `Layout` or `<Toast>` component.
- **After ANY case-only component rename, build twice** — see the TextArea → Textarea
  entry under "Known converter gaps". The first build silently ships a floor card for the
  renamed component.
