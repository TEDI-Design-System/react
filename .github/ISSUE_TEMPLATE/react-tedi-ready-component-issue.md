---
name: React TEDI-READY component issue
about: Use this template if the issue is on the React TEDI-READY side, bug, enhancement
  etc
title: "[Component_name]:"
labels: tedi-ready
assignees: airikej

---

## Problem

## Solution

## Examples and information

## Project

## DoD
- [ ] The component is developed using best practices, conventions, and modern frontend trends
- [ ] The component follows **BEM naming conventions** (if applicable)
- [ ] The component implementation **matches the Figma design**, including all defined states and interactions
- [ ] The component supports **responsiveness** and scales across breakpoints (if applicable)
- [ ] The component does not introduce **runtime errors or warnings**
- [ ] Linter passes
- [ ] The component is **exported from its tier barrel**
- [ ] The component has **unit tests** with at least **80% code coverage** _(the Jest `coverageThreshold` gate)_
- [ ] CodeCov passes its threshold _(80% on the changed code, with 10% tolerance — a separate gate from the Jest one above)_
- [ ] The component has passed **code review**
- [ ] The component has passed **Chromatic visual review**
- [ ] **Storybook stories** are created:
  - [ ] Cover all Figma variations
  - [ ] Include edge cases, empty/error states
- [ ] Component’s **API (props, slots, events)** is documented
- [ ] **ZeroHeight is updated** with design/development guidelines
- [ ] **External dependencies** used in the component are documented in **Storybook and Zeroheight**, with rationale
- [ ] **Semantic commit format** is used (for `semantic-release`) - see [Commit convention](https://github.com/TEDI-Design-System/general/wiki/Commit-convention)
- [ ] External libraries **comply with [validated open source licenses](https://github.com/TEDI-Design-System/general/wiki/Definition-of-Done#validated-open-source-component-licences)**
- [ ] Component is versioned correctly and ready for release if required
- [ ] Update the **React** development status on the [statuses page in Zeroheight](https://www.tedi.ee/1ee8444b7/p/300e17-komponentide-staatused)
