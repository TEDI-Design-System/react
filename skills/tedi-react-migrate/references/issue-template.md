# Reporting a problem to TEDI

Offer this only for items that look like a TEDI problem: a removal without a replacement, a break the
notes don't mention, notes that contradict the package, or a bug in the new version. Not for project
decisions.

## Before drafting

1. Ask: "Create an issue in TEDI-Design-System/react about <item>?" Skip the rest if the answer is no.
2. Search for an existing issue: `gh issue list -R TEDI-Design-System/react --state all --search "<component> <keyword>"`.
   If one matches, show it and offer to add a comment instead.

## Draft

The repository's issue template uses these sections. Title: `[<Component>]: <short problem>`.

```markdown
## Problem

Upgrading @tedi-design-system/react from <from> to <to>: <what the release notes say>, but <what blocks
the migration or what goes wrong>.

Release: <link to the release and section>

## Solution

<what would unblock it: a replacement, a documented migration path, a fix. Leave empty if unknown.>

## Examples and information

Minimal reproduction:

<a small, self-contained component written for this issue>

Environment: React <version>, @tedi-design-system/react <to>, @tedi-design-system/core <version>.

## Project
```

## Privacy

The issue is public. Write the reproduction from scratch; never paste project code. Leave out project and
company names, internal URLs, people, file paths, data and screenshots of the app. Show the full draft and
create it only after an explicit yes:

```bash
gh issue create -R TEDI-Design-System/react --title "<title>" --body-file <draft file>
```

Without `gh`, give the developer the draft and the link `https://github.com/TEDI-Design-System/react/issues/new`.
