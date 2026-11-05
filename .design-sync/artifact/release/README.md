# TEDI Design System for Claude

The [TEDI Design System](https://github.com/TEDI-Design-System/react) packaged as a Claude
**Design System artifact**, so designs, prototypes and slide decks Claude makes are built from
the real TEDI React components: the compiled library, live previews of every component, prop
contracts, usage docs and the `@tedi-design-system/core` tokens. `release.json` says which
version a branch or tag holds.

The files are generated from the React repository on every release. Don't edit them here;
changes go into [TEDI-Design-System/react](https://github.com/TEDI-Design-System/react).

## Versions

| Branch / tag | Contents |
|---|---|
| `main` | the latest stable release; one commit per release |
| `react-<version>` | one tag per stable release, matching `@tedi-design-system/react` on npm |
| `rc` | the latest release candidate only: the branch is a single commit, replaced on every candidate |

Use the version your applications are on, so designs match what engineers can ship. A shallow
clone (`--depth 1`) is all you need.

## Install or update

You need a Claude plan with design systems enabled (on Team and Enterprise an owner turns on
the **Design systems** template under **Organization settings › Artifacts**) and Claude Code
logged in with your claude.ai account.

```bash
git clone --depth 1 --branch main https://github.com/TEDI-Design-System/claude-design-system.git
cd claude-design-system
claude
```

Then ask Claude Code:

- **First time:** "Publish this TEDI design system to Claude." It creates a Design System
  artifact in your account and publishes these files into it.
- **Later releases:** fetch the new version (`git pull` on `main`; on `rc`, which is rewritten,
  clone again or `git fetch --depth 1 && git reset --hard origin/rc`), then "Update our TEDI
  design system: <artifact link>".

Claude follows `AGENTS.md`; you approve each publish.

Once it is published, an organisation owner can share it with everyone in the organisation and
make it the default design system. Pick it under **+ › Design system** in a Claude chat.

The artifact is **read-only on its page**: every update replaces its files, so edits made on
the page would be lost. Report problems or propose changes in the React repository.

## Your organisation's theme

If your organisation themes TEDI in Figma, export the theme with the **TEDI Variables
Exporter** plugin (the same export your applications load after TEDI's CSS) and give Claude
Code the ZIP when it asks. `apply-theme.mjs` puts the theme's colours, dimensions and type
into the files before they are published, so previews and designs match your applications.
Keep the export: every update applies it again. One artifact carries one theme.

## What's inside

- `project/`: the artifact's files: `README.md` (how to build with TEDI), `tokens.json` /
  `tokens.css`, `components/bundle.js` and `bundle.css` (the compiled library),
  `components/<Name>/` (props, usage and a live preview per component), React and fonts.
- `publish-plan.json`: the files in upload batches.
- `release.json`: the version, core version and source commit.
- `apply-theme.mjs`: applies a Figma theme export to `project/` (Node, no dependencies).
