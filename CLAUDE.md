# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the TEDI Design System for React (`@tedi-design-system/react`), a component library implementing the TEDI Design System. The library is built with TypeScript, React, and SCSS, using Vite for bundling and Storybook for component development and documentation.

## Development Commands

### Starting Development
```bash
npm run start           # Start Storybook on port 4400
```

### Building
```bash
npm run build           # Build the library with Vite
npm run build:sb        # Build Storybook static site
```

### Testing
```bash
npm run test                # Run Jest tests
npm run test:coverage       # Run tests with coverage report
```

Coverage thresholds are set to 80% for branches, functions, lines, and statements. Only `src/tedi/components/**/*.{js,ts,tsx}` files are included in coverage collection.

### Linting
```bash
npm run lint            # Fix SCSS and TypeScript files
npm run lint:ci         # Check linting without fixing (CI mode)
```

The project uses ESLint for TypeScript and Stylelint for SCSS. Husky pre-commit hooks run `lint-staged` to automatically fix files on commit.

### Releases
```bash
npm run release         # Run semantic-release
npm run chromatic       # Deploy to Chromatic for visual testing
```

The project uses semantic-release with conventional commits. Commit messages must:
- Follow conventional commit format
- Have subjects in start-case (commitlint enforced)
- Be at least 10 characters long
- Include issue references

## Architecture

### Dual-Bundle Structure

The library exports two separate bundles:

1. **`@tedi-design-system/react/tedi`** - Official TEDI components (main bundle)
   - Entry: `src/tedi/index.ts`
   - Exports: `tedi.es.js` and `tedi.cjs.js`

2. **`@tedi-design-system/react/community`** - Community/experimental components
   - Entry: `src/community/index.ts`
   - Exports: `community.es.js` and `community.cjs.js`

Both bundles are built simultaneously via Vite's multi-entry lib mode configuration in `vite.config.ts`.

### Component Organization

Both `tedi` and `community` folders follow the same structure:
- `components/` - React components organized by category (buttons, form, layout, etc.)
- `helpers/` - Utility functions and hooks
- `providers/` - React context providers (StyleProvider, LabelProvider, AccessibilityProvider, etc.)
- `types/` - TypeScript type definitions
- `docs/` - Storybook documentation files (MDX)
- `styles/` - Global SCSS styles

#### TEDI Component Categories
- `base/` - Typography (Text, Heading), Icon
- `buttons/` - Button, ButtonGroup, Collapse, FloatingButton, etc.
- `cards/` - Card components with headers, content, notifications
- `content/` - List, Label, Section, HeadingWithIcon, Truncate, TextGroup
- `form/` - TextField, TextArea, NumberField, Select, Checkbox, Radio, FileUpload, Search, etc.
- `layout/` - Grid, VerticalSpacing, Sidenav
- `loaders/` - Spinner, Skeleton
- `navigation/` - Link, HashTrigger
- `notifications/` - Alert, Toast
- `overlays/` - Tooltip, Popover
- `tags/` - Tag, StatusBadge
- `misc/` - Separator, Print, Affix, ScrollFade, Ellipsis, etc.

#### Community Component Categories
- Standard UI components (Typography, Button, Icon, Card, etc.)
- Form components (ChoiceGroup, Pickers, FileUpload, TextEditor, Toggle, etc.)
- Complex components (Table, Tabs, Stepper, VerticalStepper, Accordion, Modal)
- Map components (extensive set under `map-components/`)

### Component File Structure

Each component typically has:
- `component-name.tsx` - Main component implementation
- `component-name.spec.tsx` - Jest tests
- `component-name.stories.tsx` - Storybook stories
- `component-name.module.scss` - Component styles (CSS Modules)
- `index.ts` - Public exports

### Key Architectural Patterns

1. **Polymorphic Components**: Many components use polymorphic patterns allowing the `as` prop to change the rendered element type (see `ButtonProps<C extends React.ElementType>`).

2. **Breakpoint Support**: Components support responsive props via `BreakpointSupport` and `useBreakpointProps` helper.

3. **CSS Modules**: Styles use SCSS with CSS Modules. Scoped class names follow the pattern `[local]-[hash:8]`.

4. **Style Providers**: Both bundles export a `StyleProvider` component that imports global styles. Consumers should wrap their app with this provider.

5. **Label Provider**: The `tedi` bundle includes a `LabelProvider` for internationalization/localization of component labels.

6. **Peer Dependencies**: React, React-DOM, and dayjs are peer dependencies (not bundled). dayjs must be version `^1.11.10` or higher.

### Build Configuration

- **Vite** builds both ES and CommonJS formats with `preserveModules: true` for tree-shaking
- **TypeScript** type definitions are generated via `vite-plugin-dts` to `dist/src/`
- **Fonts** are copied from `@tedi-design-system/core` package to distribution
- **CSS** is bundled as a single `index.css` file with font path rewriting
- External dependencies (peer deps + `react/jsx-runtime`) are not bundled

### Testing Setup

- **Framework**: Jest with jsdom environment
- **Transform**: babel-jest with React, TypeScript presets
- **Setup**: `jest-setup.js` configures testing-library
- **CSS Mocking**: CSS/SCSS imports are mocked with `identity-obj-proxy`
- **ES Modules**: `lodash-es` is transformed (not in transformIgnorePatterns)

### Storybook Configuration

Located in `.storybook/`:
- Stories from both `tedi` and `community` folders
- Addons: essentials, a11y, designs, status, pseudo-states
- Custom theming in `tehik-theme.js`
- Preview decorators in `preview.tsx` wrap stories with StyleProvider
- Static assets in `public/` directory

## Important Notes

- **Main branch**: `rc` (not `main`) - use this for PRs
- **Chromatic**: Visual regression testing is integrated
- **Semantic versioning**: Version is managed by semantic-release (shows as `0.0.0-semantic-version` in package.json)
- **NPM registry**: Published with public access to `@tedi-design-system/react`
- **Documentation**: Full usage docs in the [TEDI Design System wiki](https://github.com/TEDI-Design-System/general)
