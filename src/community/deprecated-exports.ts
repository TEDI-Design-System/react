import { withDeprecationWarning } from '../tedi/helpers/warn-deprecated/warn-deprecated';
import { Anchor as AnchorBase } from './components/anchor/anchor';
import { Button as ButtonBase } from './components/button/button';
import { Card as CardBase } from './components/card/card';
import { ChoiceGroup as ChoiceGroupBase } from './components/form/choice-group/choice-group';
import { DatePicker as DatePickerBase } from './components/form/pickers/datepicker/datepicker';
import { DateTimePicker as DateTimePickerBase } from './components/form/pickers/datetimepicker/datetimepicker';
import { Radio as RadioBase } from './components/form/radio/radio';
import { Select as SelectBase } from './components/form/select/select';
import { Breadcrumbs as BreadcrumbsBase } from './components/layout/breadcrumbs/breadcrumbs';
import { Footer as FooterBase } from './components/layout/footer/footer';
import { Header as HeaderBase } from './components/layout/header/header/header';
import { SideNav as SideNavBase } from './components/layout/sidenav/sidenav';
import { ModalProvider as ModalProviderBase } from './components/modal/modal-provider';
import { Placeholder as PlaceholderBase } from './components/placeholder/placeholder';
import { Table as TableBase } from './components/table/table';
import { Tag as TagBase } from './components/tag/tag';
import { ToggleOpen as ToggleOpenBase } from './components/toggle-open/toggle-open';
import { Tooltip as TooltipBase } from './components/tooltip/tooltip';

/*
 * Deprecated components that other library code also renders. Their warning lives here instead of
 * in the component, so it fires only for consumers who use the component themselves.
 * `src/community/index.ts` re-exports these by name, which takes precedence over its `export *`.
 */

export const Anchor = withDeprecationWarning(
  AnchorBase,
  'Community Anchor',
  'Use `Link` from `@tedi-design-system/react/tedi` instead.'
);
export const Breadcrumbs = withDeprecationWarning(
  BreadcrumbsBase,
  'Community Breadcrumbs',
  'Use Breadcrumbs from `@tedi-design-system/react/tedi` instead.'
);
export const Button = withDeprecationWarning(
  ButtonBase,
  'Community Button',
  'Use `Button` from `@tedi-design-system/react/tedi` instead.'
);
export const Card = withDeprecationWarning(
  CardBase,
  'Community Card',
  'Use `Card` from `@tedi-design-system/react/tedi` instead.'
);
export const ChoiceGroup = withDeprecationWarning(
  ChoiceGroupBase,
  'Community ChoiceGroup',
  'Use `ChoiceGroup` from `@tedi-design-system/react/tedi` instead.'
);
export const DatePicker = withDeprecationWarning(
  DatePickerBase,
  'Community DatePicker',
  'Use `DateField` from `@tedi-design-system/react/tedi` instead.'
);
export const DateTimePicker = withDeprecationWarning(
  DateTimePickerBase,
  'Community DateTimePicker',
  'Use `DateTimeField` from `@tedi-design-system/react/tedi` instead.'
);
export const Footer = withDeprecationWarning(
  FooterBase,
  'Community Footer',
  'Use `Footer` from `@tedi-design-system/react/tedi` instead.'
);
export const Header = withDeprecationWarning(
  HeaderBase,
  'Community Header',
  'Use `Header` from `@tedi-design-system/react/tedi` instead.'
);
export const ModalProvider = withDeprecationWarning(
  ModalProviderBase,
  'Community ModalProvider',
  'Use Modal from `@tedi-design-system/react/tedi` instead.'
);
export const Placeholder = withDeprecationWarning(
  PlaceholderBase,
  'Community Placeholder',
  'Use EmptyState from `@tedi-design-system/react/tedi` instead.'
);
export const Radio = withDeprecationWarning(
  RadioBase,
  'Community Radio',
  'Use `Radio` from `@tedi-design-system/react/tedi` instead.'
);
export const Select = withDeprecationWarning(
  SelectBase,
  'Community Select',
  'Use `Select` from `@tedi-design-system/react/tedi` instead.'
);
export const SideNav = withDeprecationWarning(
  SideNavBase,
  'Community SideNav',
  'Use `SideNav` from `@tedi-design-system/react/tedi` instead.'
);
export const Table = withDeprecationWarning(
  TableBase,
  'Community Table',
  'Use `Table` from `@tedi-design-system/react/tedi` instead.'
);
export const Tag = withDeprecationWarning(
  TagBase,
  'Community Tag',
  'Use `Tag` from `@tedi-design-system/react/tedi` instead.'
);
export const ToggleOpen = withDeprecationWarning(
  ToggleOpenBase,
  'Community ToggleOpen',
  'Use `CollapseButton` from `@tedi-design-system/react/tedi` instead.'
);
export const Tooltip = withDeprecationWarning(
  TooltipBase,
  'Community Tooltip',
  'Use `Tooltip` from `@tedi-design-system/react/tedi` instead.'
);
