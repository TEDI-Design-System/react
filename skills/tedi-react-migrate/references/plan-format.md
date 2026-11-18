# Migration plan format

Write the plan to `.tedi-migrate/migration-plan.md` in the project root **before editing any code**, and
keep it up to date as you work. It is the developer's review document and the progress record: a stopped
run continues from the first unchecked item.

## Statuses

| Status       | Meaning                                                                                                                                                    | What you do                                                                                                                                                               |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`       | Mechanical and unambiguous: rename, removed key in an override, import path.                                                                               | Apply.                                                                                                                                                                    |
| `assisted`   | You can do it, but a choice is involved (which `role`, what a label says, keep the old default or take the new one).                                       | Propose the choice, ask, then apply.                                                                                                                                      |
| `manual`     | Needs the developer: visual or behaviour decisions, a removal without a replacement, notes that don't explain enough, a note that contradicts the package. | Do not edit. Explain and list it under "Needs you".                                                                                                                       |
| `deprecated` | Not breaking yet; the project uses something scheduled for removal.                                                                                        | Offer the migration, with the removal date. Applied last, only if the developer agrees. When notes give different dates, use the newest release's schedule and say which. |
| `n/a`        | The project doesn't use what the item changes.                                                                                                             | Record the search that proves it.                                                                                                                                         |

Mark finished items `[x]`. Add `failed: <reason>` when an attempt didn't verify.

## Template

```markdown
# TEDI migration: @tedi-design-system/react <from> → <to>

- Status: <planned | approved | applying | verified>. Base: <commit>.
- Started: <date>. Package manager: <npm|pnpm|yarn|bun>. Verify with: `<typecheck>`, `<build>`, `<lint>`, `<test>`.
- Core: <core from> → <core to> (through the library | direct dependency, out of scope)[; estimate from a range, re-check after install].
- Peers to add: <requiredPeersNotInPackageJson, or none>.
- Sources: <n> releases read, <n> with migration content. Cache: `.tedi-migrate/cache/releases/`.

## Items

### <release tag> ([notes](<release url>))

- [ ] **<component or area>: <one-line change>** (`auto`, #<issue>)
  - Change: <old> → <new>
  - Where: `src/app/foo.component.html:12`, `src/app/bar.component.ts:40`
- [ ] **<component>: <change>** (`assisted`, #<issue>)
  - Choice: <question for the developer, with your recommendation>
  - Depends on: <other item, when its choice changes this one>
- [x] **<component>: <change>** (`n/a`)
  - Searched: `rg -n "tedi-carousel" src` (0 hits)

### Core CSS variables

- [ ] `--old-name` → `--new-name` (`auto`, documented in <release>): `src/styles/theme.scss:8`
- [ ] `--removed-name` (`manual`, removed without replacement): `src/styles/theme.scss:14`

## Found on the way

<problems you noticed that this upgrade didn't cause: wrong bindings, stale overrides, missing files.
Not fixed by the migration; listed so the developer knows.>

## Needs you

<filled at the end: manual items, failed verifications, deprecations with dates>

## Verification

<commands run and their result>
```

Keep items short: the developer should be able to review the whole plan in a few minutes. Link the
release instead of copying its guide.
