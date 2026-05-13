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

### TimeField
**Props:** `TimeFieldProps` | bp, form
- `id: string` (required), `label: string` (required)
- `value?: string`, `defaultValue?: string` — `"HH:mm"` 24-hour format
- `onChange?: (time: string) => void`
- `placeholder?: string`
- `required?: boolean`, `readOnly?: boolean`
- `stepMinutes?: number = 1` — minute increment for the picker wheel / grid
- `availableTimes?: string[]` — limit selectable times to a fixed list (`["09:00", "09:30", …]`); switches the popover to grid mode
- `inputProps?: Omit<TextFieldProps, 'id' | 'label' | 'value' | 'onChange'>` — pass-through to the underlying input
- `className?: string`
- **Breakpoint-aware:** `useNativePicker?: boolean = false` (swap to `<input type="time">`; ignores `availableTimes`), `showPicker?: boolean = true`, `timePickerTrigger?: 'input' | 'button' = 'button'`, `availableTimesVariant?: 'grid-buttons' | 'grid-radio' | 'dropdown'` — which variant the picker renders when `availableTimes` is set

```tsx
<TimeField id="meeting" label="Meeting time" value={time} onChange={setTime} stepMinutes={15} />

// Constrain to specific slots, render as a radio-button grid
<TimeField
  id="slot"
  label="Available slot"
  availableTimes={['09:00', '09:30', '10:00', '14:00', '15:30']}
  availableTimesVariant="grid-radio"
  value={slot}
  onChange={setSlot}
/>

// Native picker on mobile, custom wheel on desktop
<TimeField id="alarm" label="Alarm" useNativePicker md={{ useNativePicker: false }} />
```

### TimePicker
> **For plain time inputs use `TimeField`.** TimePicker is the lower-level picker primitive — reach for it only when you need a standalone, always-visible time selector (scheduling UI, custom popover, side-by-side with a calendar in a DateTime composite).

**Props:** `TimePickerProps` | form
- `value?: string`, `defaultValue?: string` — `"HH:mm"`
- `onChange?: (time: string) => void`
- `stepMinutes?: number = 1` — minute increment for the wheel
- `availableTimes?: string[]` — switches from scroll-wheel mode to a predefined-slots grid
- `gridVariant?: 'button' | 'radio' = 'button'` — only used with `availableTimes`
- `bordered?: boolean = true` — set `false` when embedding inside a parent that already provides its own surface (e.g. alongside a Calendar)
- `className?: string`

The wheel column supports full keyboard navigation: `ArrowUp` / `ArrowDown` and `PageUp` / `PageDown` cycle through the column (wrap at both ends), `Home` / `End` jump to the bounds, `Enter` / `Space` commit the highlighted value.

```tsx
import { TimePicker } from '@tedi-design-system/react/tedi';

<TimePicker value={time} onChange={setTime} stepMinutes={5} />

// Predefined slots
<TimePicker
  availableTimes={['09:00', '10:00', '11:00', '14:00']}
  gridVariant="radio"
  value={slot}
  onChange={setSlot}
/>
```

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

## Misc

### Separator
**Props:** `SeparatorProps` | bp
- `axis: 'horizontal' | 'vertical' = 'horizontal'`
- `color: 'primary' | 'secondary' | 'accent' = 'primary'`
- `variant?: 'dotted' | 'dot-only'`
- `thickness?: 1 | 2`
- `spacing?: SeparatorSpacing`

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

### Select
- `id: string`, `options`, `value?`, `defaultValue?`, `onChange?`
- `multiple?: boolean`, `async?: boolean`, `isSearchable?: boolean`, `isClearable?: boolean`

### Toggle
- `ariaLabel: string`, `label?`, `checked?`, `defaultChecked?`, `onChange?`
- `size?: 'medium' | 'large'`, `color?: 'default' | 'alternative'`, `icon?`, `disabled?`

### ChoiceGroup
- `id: string`, `items: ChoiceGroupItemProps[]`, `inputType?: 'radio' | 'checkbox'`
- `type?: 'light' | 'selector' | 'filter' | 'default'`, `value?`, `onChange?`

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

### Tabs
- `currentTab?: string`, `defaultCurrentTab?`, `onTabChange?`
- Sub-components: Tabs.Nav, Tabs.NavItem, Tabs.Item

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
