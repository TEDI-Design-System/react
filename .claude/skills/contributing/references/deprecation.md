# Deprecating a Component

The procedure comes from [ADR-004](https://github.com/TEDI-Design-System/general/blob/main/ADR/Development/ADR-004-deprecation-process.md).
It applies to a whole component. A single deprecated prop only needs `@deprecated` JSDoc with the
replacement.

## The window: 6 + 3 months

Removal from the code comes nine months after deprecation, in three steps. T0 is the **main** release
whose notes announce the deprecation. Dates are month-precise.

| Step | When | Breaking |
|---|---|---|
| 1. Deprecate | T0 | No |
| 2. Remove documentation + last call | T+6 | No |
| 3. Remove from code | T+9 | **Yes** |

Rules that are easy to get wrong:

- **Never do step 3 while step 2 is undone.** If the docs were not removed on time, do step 2 in the next
  release and announce a new code removal month, at least three months after that announcement. Missed
  communication is never made up retroactively.
- **Removal months are only in release notes and announcements.** Never put a month in `@deprecated`
  text, the runtime warning or the Storybook badge. Those copies drift.
- Dates announced before ADR-004 as "targeted for removal in {month}" now mean the **step 2** month. Code
  removal is three months later.

## Step 1: Deprecate (T0)

All in the same PR:

1. **`@deprecated` JSDoc** on the component (and its props interface), naming the replacement and its
   entry point:
   ```tsx
   /**
    * @deprecated Use `Dropdown` from `@tedi-design-system/react/tedi` instead.
    */
   ```
2. **Runtime warning** as the first statement of the component body, via `warnDeprecated` from
   `src/tedi/helpers/warn-deprecated/warn-deprecated.ts`. It skips production builds
   (`process.env.NODE_ENV`) and warns once per name, so do not add your own guards or a `useEffect`.
   Import it with a relative path; it is internal and not exported from any public index:
   ```tsx
   import { warnDeprecated } from '../../../tedi/helpers/warn-deprecated/warn-deprecated';

   export const Dropdown = (props: DropdownProps) => {
     warnDeprecated('Community Dropdown', 'Use `Dropdown` from `@tedi-design-system/react/tedi` instead.');
     // ...
   };
   ```
   - `name`: the export name, prefixed with `Community ` for community components, since many names
     exist in both entry points.
   - `message`: the `@deprecated` sentence.
   - **Rendered by other library code?** Then do not call `warnDeprecated` in the component, or
     consumers get warned about a component they never used. Add it to
     `src/community/deprecated-exports.ts` with `withDeprecationWarning` and to the named re-export
     at the bottom of `src/community/index.ts`, which takes precedence over the `export *`. Library
     code keeps importing the component file directly and stays silent. Check barrel imports too
     (`from '../modal'`), not only direct file imports.
   - **Child components get no warning** when they only work inside the deprecated parent, i.e. they
     read its context or are meant to be placed in it (`TabsItem`, `CardContent`, `AccordionItem`,
     `Modal`/`ModalTrigger` inside `ModalProvider`, `TooltipTrigger`, `HeaderLanguage`). The parent
     already warns. The same goes for parts that are not publicly exported (`Crumb`, `StepperNav`).
     A sub-component that is also used on its own (`CardNotification`) does warn.
3. **Storybook badge**: add `'deprecated'` to the story's status, next to its existing entries:
   ```tsx
   parameters: { status: { type: ['deprecated', 'ExistsInTediReady'] } },
   ```
4. **Manifest**: the component's `status` in `component.manifest.json` (see the `update-design-docs`
   skill).
5. **Migration guide**: goes into the rc release description on GitHub (use the `tedi-migration-guide`
   skill).
6. **Release notes** of the main release: a row in the `### Deprecations` table (Deprecated /
   Replacement / Since / Migration guide) with "targeted for removal in {T+6 month}". This is the
   documentation removal month.

A deprecated component stays fully working. Do not change its behaviour or styles.

## Step 2: Remove documentation (T+6)

One issue per release covers every component whose six-month window ends in it (tracked through the
release checklist).

1. **Delete the component's stories file(s).** Nothing else.
2. Grep for leftover documentation references to the story (its title, story id such as
   `community-dropdown--default`, and file path) in MDX, `src/community/docs`, and Storybook config, and
   remove them.
3. **Keep** the component, styles, exports, `@deprecated` JSDoc and runtime warning untouched. Consumer
   code must be unaffected.
4. Release notes and a **separate** Slack post carry the conditional last call, naming the component,
   replacement, code removal month and migration guide link:
   > Community `Dropdown` has been removed from the documentation. It is still exported and working. It
   > will be removed from the codebase in the **{T+9 month}** release, unless there is a good reason to
   > postpone. Replacement: `Dropdown` from `@tedi-design-system/react/tedi`.

Postponing: a consumer who needs more time says so within the three months, with a concrete reason. The
team decides at the development meeting and announces any new date. Without a reaction, removal goes
ahead as planned.

## Step 3: Remove from code (T+9)

1. Confirm step 2 happened (see the rule above). If not, stop and do step 2 instead.
2. Delete the component folder and its export from `src/community/index.ts`, including its entry in
   `src/community/deprecated-exports.ts` and the named re-export if it has one.
3. Refresh `component.manifest.json` / `DESIGN.md` (`update-design-docs` skill) and remove any mention
   from the consumer skill under `skills/`.
4. Commit as a breaking change and add a BREAKING CHANGE entry to the release notes. Separate Slack post
   as in step 2.
