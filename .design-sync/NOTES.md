# design-sync notes — @tedi-design-system/react

## ✅ RUN COMPLETE + UPLOADED (2026-08-07) — read this first

**Synced to claude.ai/design.** Project **`TEDI Design System`**,
`projectId: d10e8d07-6086-4ddd-970c-090a49feaa2f` (pinned in `config.json`).
URL: https://claude.ai/design/p/d10e8d07-6086-4ddd-970c-090a49feaa2f

447 files uploaded, then an 11-file delta re-upload after merging `origin/rc`
(README with the corrected header, the rebuilt bundle/css/styles, InputGroup's 4
artifacts + preview, anchor last). **The bundle corresponds to npm `18.1.1-rc.1`.**
A hashed manifest is kept at `.design-sync/upload-manifest.sha256` so the next
re-sync can diff content instead of re-reasoning from inputs. The project now carries an
**`_ds_sync.json` anchor**, so the next re-sync diffs against it and skips unchanged
components instead of re-verifying everything. The app's self-check has run
(`_ds_manifest.json` and `_adherence.oxlintrc.json` exist remotely = cards registered).
Upload order followed the contract: sentinel → content → (no deletes; project was
empty) → sentinel re-arm → `_ds_sync.json` absolutely last.

Two other design-system projects exist in the org and were deliberately left alone:
`TEDI Design System (deprecated)` (owner Silver) and `Design System` (owner Märt).
This new project supersedes the deprecated one.

Final state: `package-build.mjs` and `package-validate.mjs` both exit 0, **82/82
previews render cleanly**, zero `[GRID_OVERFLOW]`, one non-blocking warning
(`[TOKENS_MISSING]`, triaged below). All 82 components have a grade file. Across the
campaign: **397 stories graded — 304 `match`, 93 `close`, 0 `mismatch`**, and **zero
owned previews were ever needed** (`.design-sync/previews/` is empty) — the compiled
bundle reproduces the storybook oracle on its own for every component.

### ⚠ Grade provenance — 79 of 82 carry PRE-FIX verdicts

The final `InputGroup` fix changed `cfg.titleMap` and `cfg.storyImports`, which are
**global** config slices, so it cleared every grade on a technicality even though only
two components' rendering actually changed. The DS team decided (2026-08-07) not to pay
for a full 82-component re-grade, because nothing is uploaded and the receipt's clean
gate therefore has no project to protect.

- **Freshly graded against the FINAL build (3):** `InputGroup`, `Slider`, `Icon`.
- **Carry verdicts earned against the immediately-preceding build (79):** every other
  component. That build differed from the final one *only* by the added `InputGroup`
  named export. Each was visually graded from true storybook-vs-preview screenshots.
- **What this costs:** the next sync's diff will treat all 79 as needing verification
  (there is no anchor anyway, so it would re-verify regardless). Nothing rots silently.
- To close the gap deliberately: re-run the driver and grade whatever it lists in
  `verification.pendingGrade`.

### Resume / re-sync commands

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

**To upload to claude.ai/design later:** there is no project yet. Create one, record its
`projectId` in `.design-sync/config.json`, then follow the skill's upload sequence
(sentinel → content → deletes → sentinel → `_ds_sync.json` last). Because there is no
anchor, that run re-verifies everything — which also closes the 79-component provenance
gap noted above.

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

Both are declared in `cfg.libOverrides` and both are **narrow**: one added helper /
one added define, everything else upstream verbatim. On re-sync, diff each against
`.ds-sync/lib/<same-name>` and merge upstream changes.

- **`dts.mjs`** — `[GENERAL]` symptom: build exited 0 but emitted **0 components**, and
  reported all 84 storybook titles as `[TITLE_UNMAPPED]`. Root cause: the misleading
  tag was downstream of `exported PascalCase symbols: 0`. This package declares its
  `.d.ts` entry **only** under `exports["./tedi"].types`; there is no top-level
  `types`/`typings`, so upstream's resolution fell through to a nonexistent
  `<dist>/index.d.ts` and discovered nothing. Fix: a `subpathTypes()` helper consulted
  at **both** entry-resolution sites — `findTypesRoot` *and* `projectFor`, which
  computes `entry` independently, so patching one is not enough.
  The subpath is pinned to `'./tedi'`, which makes the tedi-only scope structural.
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

Three storybook titles have no matching public export and are excluded on purpose:

- **`FormLabel`** — the repo's own story tags it `status: internalComponent`
  ("only used to build other components and not being exported from library").
  Not in the `tedi` barrel. Correctly out.
- **`Toast`** — there is no `Toast` component; the API is `sendNotification()` plus
  `ToastContainer`. The stories are click-driven, so nothing renders statically.
  No coverage lost: the thing a toast *looks* like is `Alert`, which is synced.
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
- **InputGroup chrome inside Slider's `With Input Group` / `Custom Value`.**
  `cfg.storyImports.bundle` deliberately compiles that subtree from `src` to keep its
  React context consistent (see the Slider entry under Config history), so its
  `.module.scss` is empty and the label sits above the box instead of inline. The
  Slider itself must still match exactly.
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

## Affirmatively verified (don't re-audit these without a reason)

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

## Known render warns (triaged — a warn NOT listed here is new)

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
  but re-grades that component and needs a full build.
