# Component Reference

Two component namespaces are available. **Always prefer TEDI-Ready** components — they are production-grade, follow stricter conventions, and are actively maintained. Use Community components only when no TEDI-Ready equivalent exists.

- `@tedi-design-system/react/tedi` — TEDI-Ready (preferred)
- `@tedi-design-system/react/community` — Community/extended

---

# TEDI-Ready Components

All components are TypeScript, use CSS Modules with BEM naming (`tedi-` prefix). Import from `@tedi-design-system/react/tedi`.

**Legend:** fRef = forwardRef, poly = polymorphic (`as` prop), bp = breakpoint support, form = controlled/uncontrolled

## Base

### Icon
**Props:** `IconProps` | fRef
- `name: string` (required)
- `size: IconSize = 24` — 8, 12, 16, 18, 24, 36, 48
- `color: IconColor = 'primary'`
- `background?: IconBackgroundColor`
- `filled: boolean = false`
- `type: IconType = 'outlined'` — outlined, sharp, rounded
- `label?: string` — screen reader label

### Text
**Props:** `TextProps` | bp
- `children: ReactNode` (required)
- `element: TextElement = 'p'` — div, p, span, li, label, h1-h6
- `modifiers?: TextModifiers | TextModifiers[]` — normal, small, bold, italic, h1-h6, uppercase, etc.
- `color: TextColor = 'primary'`

### Heading
**Props:** `HeadingProps` extends TextProps | bp
- `element: HeadingLevel = 'h1'` — h1-h6

## Buttons

### Button
**Props:** `ButtonProps<C>` | fRef, poly, bp
- `children: ReactNode` (required)
- `visualType: ButtonType = 'primary'` — primary, secondary, neutral, link
- `color: ButtonColor = 'default'` — default, danger, success, inverted, text
- `size?: 'default' | 'small' | 'large'`
- `icon?: string | IconProps` — icon-only button
- `iconLeft?: string | IconProps`
- `iconRight?: string | IconProps`
- `isLoading?: boolean`
- `fullWidth?: boolean`
- `type?: 'submit' | 'button' | 'reset' = 'button'`

```tsx
<Button visualType="primary">Save</Button>
<Button visualType="secondary" iconLeft="arrow_back">Back</Button>
<Button icon="favorite" isLoading={loading} />
```

### ButtonGroup
**Props:** `ButtonGroupProps`
- `children: ReactNode`
- `type: 'primary' | 'secondary' = 'primary'`
- `stretch?: boolean`
- `onSelectionChange?: (id: string) => void`

### ClosingButton
**Props:** `ClosingButtonProps`
- `size: 'default' | 'small' = 'default'`
- `color: 'primary' | 'brand' | 'white' = 'primary'`

### Collapse
**Props:** `CollapseProps` | bp
- `id: string` (required)
- `children: ReactNode`
- `open?: boolean` (controlled), `defaultOpen?: boolean`
- `onToggle?: (open: boolean) => void`
- `arrowType: 'default' | 'secondary' = 'default'`
- `iconOnly?: boolean`

### FloatingButton
**Props:** `FloatingButtonProps`
- `children: ReactNode`
- `axis: 'horizontal' | 'vertical' = 'horizontal'`
- `size: 'medium' | 'large' = 'medium'`
- `position?: CSSProperties['position']`
- `placement?: FloatingButtonPlacement`

### InfoButton
**Props:** `InfoButtonProps` | fRef
- `isSmall?: boolean`
- `color: 'default' | 'inverted' = 'default'`

## Cards

### Card
**Props:** `CardProps` | fRef, bp
- `children?: ReactNode`
- `padding: CardContentPadding = 1`
- `background: CardBackground = 'primary'`
- `borderless?: boolean`

Sub-components: `Card.Header`, `Card.Content`, `Card.Notification`

```tsx
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Content>Body</Card.Content>
</Card>
```

## Content

### Label
**Props:** `LabelProps` | fRef, poly, bp
- `children: ReactNode`
- `required?: boolean`
- `isBold?: boolean`
- `isSmall?: boolean`
- `tooltip?: string`
- `htmlFor?: string`

### TextGroup
**Props:** `TextGroupProps` | bp
- `label: ReactNode` (required)
- `value: ReactNode | ReactNode[]` (required)
- `type: 'horizontal' | 'vertical' = 'vertical'`
- `labelWidth?: string | number`

```tsx
<TextGroup type="horizontal" labelWidth="200px" label="Status" value="Active" />
```

### List
**Props:** `ListProps` | bp
- `children: ReactElement<ListItemProps>[]`
- `element: 'ul' | 'ol' = 'ul'`
- `style: 'styled' | 'none' = 'none'`
- `color: BulletColor = 'brand'`

Sub-component: `List.Item`

### Section
**Props:** `SectionProps`
- `as?: 'section' | 'article' | 'aside' | 'div' = 'section'`

### HeadingWithIcon
**Props:** `HeadingWithIconProps`
- `children: ReactNode` (required)
- `name: string` (icon name)
- `element?: HeadingLevel = 'h4'`

### Truncate
**Props:** `TruncateProps` | bp
- `children: string` (required)
- `maxLength?: number = 200`
- `expandable?: boolean = true`

## Form

### TextField
**Props:** `TextFieldProps` | fRef, bp, form
- `id: string` (required)
- `label?: string`
- `value?: string`, `defaultValue?: string`
- `onChange?: (value: string) => void`
- `icon?: string | IconProps`
- `isClearable?: boolean`
- `size?: 'default' | 'small' | 'large'`
- `helper?: FeedbackTextProps | FeedbackTextProps[]`
- `disabled?: boolean`, `readOnly?: boolean`, `invalid?: boolean`

```tsx
<TextField id="email" label="Email" icon="mail" isClearable value={email} onChange={setEmail} />
```

### Select
**Props:** `SelectProps` | fRef, bp, form
- `id: string` (required)
- `label?: string`
- `options?: OptionsOrGroups<ISelectOption>`
- `value?: TSelectValue`, `defaultValue?: TSelectValue`
- `onChange?: (value: TSelectValue) => void`
- `multiple?: boolean`
- `isSearchable?: boolean = true`
- `isClearable?: boolean = true`
- `async?: boolean`, `loadOptions?: Function`
- `tagsDirection?: 'stack' | 'row'`

```tsx
<Select id="country" label="Country" options={countries} value={sel} onChange={setSel} />
```

### TextArea
**Props:** `TextAreaProps` extends TextFieldProps | fRef, bp, form
- `characterLimit?: number`

### NumberField
**Props:** `NumberFieldProps` | form
- `id: string` (required)
- `label?: string`
- `value?: number`, `defaultValue?: number`
- `onChange?: (value: number) => void`
- `min?: number`, `max?: number`, `step?: number = 1`
- `suffix?: string`

### Slider
**Props:** `SliderProps` extends `BreakpointSupport` | fRef (HTMLInputElement)
- `id?: string`, `name?: string`
- `label?: ReactNode`, `hideLabel?: boolean | 'keep-space'`, `required?: boolean`
- `min?: number = 0`, `max?: number = 100`, `step?: number = 1`
- `value?: number`, `defaultValue?: number`
- `onChange?: (value: number) => void`
- `minLabel?: ReactNode`, `maxLabel?: ReactNode`
- `showCurrentValue?: boolean` — renders current value on the right instead of `maxLabel`
- `valueFormatter?: (value: number) => ReactNode` — also used for the thumb tooltip
- `tooltip?: boolean = true` — bubble above the thumb showing the current value
- `addonRight?: ReactNode` — slot for a companion input (e.g. `NumberField`)
- `disabled?: boolean`, `invalid?: boolean`
- `helper?: FeedbackTextProps`
- `'aria-label' | 'aria-labelledby' | 'aria-valuetext'?: string`

```tsx
<Slider id="volume" label="Volume" min={0} max={100} defaultValue={40} minLabel="0%" maxLabel="100%" />
```

### Checkbox
**Props:** `CheckboxProps` | form
- `id: string` (required)
- `label?: ReactNode`
- `value: string` (required)
- `checked?: boolean`, `defaultChecked?: boolean`
- `onChange?: (value: string, checked: boolean) => void`
- `indeterminate?: boolean`
- `size?: 'default' | 'small'`

### Radio
**Props:** `RadioProps` | form
Same as Checkbox (without indeterminate)

### ChoiceGroup
**Props:** `ChoiceGroupProps` | bp, form
- `id: string` (required), `name: string` (required)
- `label: ReactNode | string`
- `items: ExtendedChoiceGroupItemProps[]`
- `inputType?: 'radio' | 'checkbox' = 'radio'`
- `value?: ChoiceGroupValue`, `defaultValue?: ChoiceGroupValue`
- `variant?: 'default' | 'segmented'`

### Search
**Props:** `SearchProps` extends TextFieldProps | bp, form
- `onSearch?: (value: string) => void`
- `button?: Partial<ButtonProps>`

### FileUpload
**Props:** `FileUploadProps` | form
- `id: string` (required), `name: string` (required)
- `accept?: string`
- `multiple?: boolean`
- `files?: FileUploadFile[]`, `defaultFiles?: FileUploadFile[]`
- `maxSize?: number`

### FileDropzone
**Props:** `FileDropzoneProps`
- `label: string` (required)
- `accept?: string`, `multiple?: boolean`, `maxSize?: number`

### Toggle
**Props:** `ToggleProps` | fRef, form
- `id: string` (required)
- `label: ReactNode` (required), `hideLabel?: boolean`, `labelPosition?: 'left' | 'right' = 'right'`
- `checked?: boolean`, `defaultChecked?: boolean`
- `onChange?: (value: boolean) => void`
- `size?: 'default' | 'large'`
- `color?: 'primary' | 'colored'`
- `helper?: FeedbackTextProps`
- `disabled?: boolean`, `isLoading?: boolean`

```tsx
<Toggle id="notifications" label="Email me" checked={on} onChange={setOn} />
```

### InputGroup
Compose a labeled input with prefix/suffix slots (e.g. currency symbol, unit, button addon).

**Props:** `InputGroupProps` extends `FormLabelProps`
- `children: ReactNode` (required) — use `InputGroup.Input` plus optional `InputGroup.Prefix` / `InputGroup.Suffix`
- `addons?: boolean = true` — merge borders/radius into a single visual control
- `helper?: FeedbackTextProps | FeedbackTextProps[]`
- `disabled?: boolean`, plus all `FormLabel` props (`label`, `id`, `required`, etc.)

Sub-components: `InputGroup.Input`, `InputGroup.Prefix`, `InputGroup.Suffix`

```tsx
<InputGroup id="price" label="Price">
  <InputGroup.Prefix>€</InputGroup.Prefix>
  <InputGroup.Input type="number" />
  <InputGroup.Suffix>/ month</InputGroup.Suffix>
</InputGroup>
```

## Layout

### Row / Col (Grid)
```tsx
<Row cols={3} gutter={2} alignItems="center">
  <Col width={6}>Half</Col>
  <Col width={6}>Half</Col>
</Row>
```

**Row:** `cols`, `gutter` (0-5), `gutterX`, `gutterY`, `gap`, `justifyContent`, `alignItems`, `direction`, `wrap` + breakpoints
**Col:** `width` (1-12 or 'auto'), `offset`, `order`, `grow`, `shrink` + breakpoints

### VerticalSpacing
**Props:** `VerticalSpacingProps` | bp
- `children: ReactNode`
- `size?: VerticalSpacingSize = 1` — 0-5 in em
- `element?: keyof JSX.IntrinsicElements = 'div'`

Sub-component: `VerticalSpacing.Item`

### SideNav
**Props:** `SideNavProps<C>` | poly
- `ariaLabel: string` (required)
- `navItems: SideNavItemProps<C>[]` (required)
- `linkAs?: ElementType` — polymorphic link component
- `collapsible?: boolean`
- `mobileBreakpoint?: 'mobile' | 'tablet'`

Sub-components: `SideNav.Toggle`, `SideNav.Item`, `SideNav.Dropdown`, `SideNav.Mobile`

## Loaders

### Spinner
**Props:** `SpinnerProps` | bp
- `size: SpinnerSize = 16` — 10, 16, 18, 48
- `color: 'primary' | 'secondary' = 'primary'`
- `label?: string`

### Skeleton
**Props:** `SkeletonProps`
- `children?: ReactNode`
- `label?: string`

Sub-component: `Skeleton.Block`

## Navigation

### Link
**Props:** `LinkProps<C>` | fRef, poly, bp
- `children: ReactNode`
- `underline?: boolean = true`
- `visualType?: ButtonType = 'link'`
- `icon?: string | IconProps`
- `iconLeft?: string | IconProps`
- `target?: string`, `href?: string`

```tsx
<Link href="/docs" target="_blank">Documentation</Link>
<Link as={NavLink} to="/profile">Profile</Link>
```

### Tabs
**Props:** `TabsProps`
- `children: ReactNode` (required) — use `Tabs.List` + `Tabs.Trigger` and `Tabs.Content`
- `value?: string` (controlled), `defaultValue?: string`
- `onChange?: (tabId: string) => void`

Sub-components: `Tabs.List`, `Tabs.Trigger` (props: `id` required, `icon?`, `disabled?`), `Tabs.Content` (props: `id` to scope content to a tab)

```tsx
<Tabs defaultValue="overview">
  <Tabs.List>
    <Tabs.Trigger id="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger id="settings" icon="settings">Settings</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content id="overview">Overview panel</Tabs.Content>
  <Tabs.Content id="settings">Settings panel</Tabs.Content>
</Tabs>
```

### Pagination
**Props:** `PaginationProps`
- `pageCount: number` (required)
- `page?: number` (controlled, 1-based), `defaultPage?: number = 1`
- `onPageChange?: (page: number) => void`
- `totalItems?: number` — renders a "{count} results" label when set
- `pageSize?: number`, `pageSizeOptions?: number[]`, `onPageSizeChange?: (size: number) => void`
- `labels?: Partial<PaginationLabels>` — override default English labels (`ariaLabel`, `previous`, `next`, `pageAriaLabel`, `currentPageAriaLabel`, `results`, `pageSize`)

```tsx
<Pagination
  pageCount={20}
  page={page}
  onPageChange={setPage}
  totalItems={195}
  pageSize={10}
  pageSizeOptions={[10, 20, 50]}
  onPageSizeChange={setPageSize}
/>
```

### HashTrigger
Wraps an element and fires a callback (and optionally scrolls to it) when the URL hash matches. The `id` is injected onto the first child element so the browser can resolve it. Handy for opening modals or scrolling to sections from external deep links.

**Props:** `HashTriggerProps`
- `children: ReactNode` (required) — receives `id` injected onto the first child element; if `children` isn't a valid element, `HashTrigger` wraps them in a `<div id={id}>`
- `id: string` (required) — hash value to match (without the leading `#`)
- `onMatch?: (id: string) => void` — fired when the hash matches; receives the matched id
- `scrollOnMatch?: boolean = true` — scrolls the element into view if it's off-screen (instant on initial load, smooth otherwise)

```tsx
<HashTrigger id="section-2" onMatch={(id) => console.log('matched', id)}>
  <section>Section 2 content</section>
</HashTrigger>
```

## Notifications

### Alert
**Props:** `AlertProps` | bp
- `children?: ReactNode`
- `title?: ReactNode`
- `type: AlertType = 'info'` — info, success, warning, danger
- `icon?: string | IconProps`
- `onClose?: () => void` — adds close button
- `role?: 'alert' | 'status' | 'none' = 'alert'`

```tsx
<Alert type="success" title="Saved" onClose={dismiss}>Changes saved.</Alert>
```

### Toast
```tsx
import { sendNotification, ToastContainer } from '@tedi-design-system/react/tedi';

// In root
<ToastContainer />

// Trigger
sendNotification({ type: 'info', title: 'Update', children: 'New version available' });
```

## Overlays

### Tooltip
Sub-components: `Tooltip.Trigger`, `Tooltip.Content`

```tsx
<Tooltip>
  <Tooltip.Trigger><Icon name="info" /></Tooltip.Trigger>
  <Tooltip.Content>Help text</Tooltip.Content>
</Tooltip>
```

**Props:** `openWith?: 'hover' | 'click' | 'focus' | 'manual'`

### Dropdown
Sub-components: `Dropdown.Trigger`, `Dropdown.Content`, `Dropdown.Item`, `Dropdown.Separator`

```tsx
<Dropdown>
  <Dropdown.Trigger><Button>Menu</Button></Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Item onClick={edit}>Edit</Dropdown.Item>
    <Dropdown.Separator />
    <Dropdown.Item onClick={del}>Delete</Dropdown.Item>
  </Dropdown.Content>
</Dropdown>
```

**Props:** `width`, `placement`, `divided`, `open?` (controlled), `modal?: boolean`

### Popover
Sub-components: `Popover.Trigger`, `Popover.Content`

**Props:** `openWith?: 'click'`, `dismissible`, `role?: 'dialog'`

## Tags

### Tag
**Props:** `TagProps` | bp
- `children: ReactNode` (required)
- `color: TagColor = 'primary'`
- `onClose?: MouseEventHandler` — shows close button
- `isLoading?: boolean`

```tsx
<Tag color="primary" onClose={remove}>React</Tag>
```

### StatusBadge
**Props:** `StatusBadgeProps` | bp
- `children?: ReactNode`
- `color: StatusBadgeColor = 'neutral'`
- `variant: 'filled' | 'filled-bordered' | 'bordered' = 'filled'`
- `status?: 'danger' | 'success' | 'warning' | 'inactive'`
- `icon?: string`

```tsx
<StatusBadge color="success" status="success" icon="check">Active</StatusBadge>
```

### StatusIndicator
Small colored dot for status — pair with a label or position over another element.

**Props:** `StatusIndicatorProps`
- `type?: 'success' | 'danger' | 'warning' | 'inactive' = 'success'`
- `size?: 'sm' | 'lg' = 'sm'`
- `hasBorder?: boolean` — white ring (use over avatars/icons)
- `position?: 'default' | 'top-right'` — absolute-positioned at parent's corner

```tsx
<StatusIndicator type="success" />
<StatusIndicator type="danger" size="lg" hasBorder position="top-right" />
```

## Misc

### Separator
**Props:** `SeparatorProps` | bp
- `axis: 'horizontal' | 'vertical' = 'horizontal'`
- `color: 'primary' | 'secondary' | 'accent' = 'primary'`
- `variant?: 'dotted' | 'dot-only'`
- `thickness?: 1 | 2`
- `spacing?: SeparatorSpacing`

### EmptyState
"Nothing here yet" placeholder with icon, copy, and a CTA slot.

**Props:** `EmptyStateProps`
- `type?: 'separate' | 'attached' | 'inside' = 'separate'` — `attached` removes top border (sits under a card/table); `inside` removes border + radius (lives inside another container)
- `size?: 'default' | 'small' = 'default'`
- `icon?: string | IconWithoutBackgroundProps | null = 'spa'`
- `heading?: ReactNode`
- `children?: ReactNode` — body text
- `actions?: ReactNode` — CTA slot, usually a `<Button>` or `<Link>`

```tsx
<EmptyState heading="No results" actions={<Button>Clear filters</Button>}>
  Try a different search term.
</EmptyState>
```

### Utility Components

Niche helpers exported from `@tedi-design-system/react/tedi` — load on demand:

- **Affix** — sticky-position wrapper (top/bottom offset)
- **Ellipsis** — single-line truncation with tooltip on overflow
- **Print** — show/hide subtree based on `usePrint()` context (paired with `PrintingProvider`)
- **ScrollFade** — fade edges of a scrollable container as content runs off
- **ScrollVisibility** — show/hide an element based on scroll position
- **StretchContent** — fill available space inside flex/grid parents
- **HashTrigger** — react to URL hash changes (see Navigation)
- **FeedbackText**, **FormLabel**, **Field** — primitives for composing custom form controls

---

# Community Components

Import from `@tedi-design-system/react/community`. These are community-contributed, have relaxed review standards, and are **not recommended** when a TEDI-Ready equivalent exists.

## Cards

### Accordion
- `openItem?: string[]`, `onToggleItem?: (id: string) => void`, `gutter?: VerticalSpacingSize`
- Sub-components: AccordionItem, AccordionItemHeader, AccordionItemContent

### Card
- `border?: CardBorderType`, `borderless?: boolean`, `padding?: number`, `background?: CardBackground`
- Sub-components: Card.Header, Card.Content, Card.Notification

## Buttons

### Button — **DEPRECATED** (use TEDI-Ready Button)
### Anchor — **DEPRECATED** (use TEDI-Ready Link)

## Form

### Check (Checkbox) — **DEPRECATED** (use TEDI-Ready Checkbox)
### Radio — **DEPRECATED** (use TEDI-Ready Radio via ChoiceGroup)
### Toggle — **DEPRECATED** (use TEDI-Ready Toggle)
### ChoiceGroup — **DEPRECATED** (use TEDI-Ready ChoiceGroup)

### Select
- `id: string`, `options`, `value?`, `defaultValue?`, `onChange?`
- `multiple?: boolean`, `async?: boolean`, `isSearchable?: boolean`, `isClearable?: boolean`

### FileUpload
- `id: string`, `name: string`, `accept?`, `multiple?`, `maxSize?`
- `files?`, `defaultFiles?`, `onChange?`, `onDelete?`

### TextEditor (Draft.js)
- `id: string`, `defaultValue?`, `onChange?`, `placeholder?`
- `inlineStyleControls?: string[]`, `blockStyleControls?: string[]`

### HiddenField (toggle-to-edit)
- `fieldType: 'textfield' | 'select' | 'datetime'`
- `fieldOptions: TextFieldProps | SelectProps | DateTimePickerProps`
- `content: ReactNode`

### DateTimePicker
- Date/time picker using MUI x-date-pickers

## Navigation

### Stepper
- `activeStep?`, `defaultActiveStep?: number`, `onActiveStepChange?`
- `allowStepLabelClick?: boolean`, `ariaLabel: string`, `card?: CardProps | boolean`

### Tabs — **DEPRECATED** (use TEDI-Ready Tabs)
Legacy variant with `Tabs.Nav`, `Tabs.NavItem`, `Tabs.Item`. New code should use the TEDI-Ready `Tabs` component (different API: `Tabs.List` / `Tabs.Trigger` / `Tabs.Content`).

### TableOfContents
- `items: TableOfContentsItemProps[]`, `heading?`, `open?`, `defaultOpen?`
- `showIcons?: boolean`, `breakToMobile?: boolean`

## Overlay

### Dropdown — **DEPRECATED** (use TEDI-Ready Dropdown)

### Modal
- `size?: 12 | 10 | 8 | 6`, `position?: 'center' | 'right' | 'bottom'`
- `lockScroll?: boolean`, `trapFocus?: boolean`, `returnFocus?: boolean`
- Sub-components: ModalProvider, ModalTrigger, ModalCloser

### Tooltip — **DEPRECATED** (use TEDI-Ready Tooltip)

### Feedback (modal-based)
- `triggerProps?: ButtonProps`, `fixedTrigger?: 'both' | 'desktop' | 'mobile'`

## Tags

### Tag — **DEPRECATED** (use TEDI-Ready Tag)

### Status
- `type: 'error' | 'success' | 'inactive' | 'warning'`
- `tooltipContent?: ReactNode`

## Table

### Table (TanStack React Table wrapper)
- `data: TData[]`, `columns: ColumnDef[]`
- `pagination?`, `sorting?`, `rowSelection?`, `columnPinning?`
- `onPaginationChange?`, `onSortingChange?`, `onRowSelectionChange?`
- `hidePagination?: boolean`, `size?: 'medium'`

## Layout

### Header
Comprehensive header with sub-components: HeaderContent, HeaderActions, HeaderNavigation, HeaderLanguage, HeaderRole, HeaderSettings, HeaderNotifications, HeaderLogo

## Misc

### Placeholder (empty state)
- `icon?: string | IconProps | ReactNode`, `cardProps?`, `isNested?: boolean`

### VerticalStepper
- `isCompact?: boolean`
- Sub-components: StepItem, SubItem

### VerticalProgress
- `children: ReactNode`, `onItemOpen: (index: number) => void`

### ToggleOpen
- `openText: string`, `closeText: string`, `isOpen: boolean`

### Map Components
14 specialized components for map UI interactions (BaseMapSelection, Legend, MapLayer, Directions, Timeline, etc.)
