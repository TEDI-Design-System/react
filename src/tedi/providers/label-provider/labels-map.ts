/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CalendarPickerView, ClockPickerView } from '@mui/x-date-pickers';
import type { MuiPickersAdapter } from '@mui/x-date-pickers/internals/models';

import type { DatepickerValue, TimePickerValue } from '../../../../src/community/components/form/pickers';

type LabelBaseEntry = {
  description?: string;
  components?: string[];
};

type LabelStringEntry = LabelBaseEntry & {
  [TLang in TediLanguage]: string;
};

type LabelFunctionEntry<TArgs extends unknown[]> = LabelBaseEntry & {
  [TLang in TediLanguage]: LabelFunctionValue<TArgs>;
};

type ExtractLabelArgs<TArgs> = TArgs extends { [TLang in TediLanguage]: (...args: infer Args) => string }
  ? Args
  : never;

type HasConsistentArgs<TArgs> = TArgs extends { [TLang in TediLanguage]: (...args: any[]) => string }
  ? TArgs extends {
      et: (...args: infer ArgsEt) => string;
      en: (...args: infer ArgsEn) => string;
      ru: (...args: infer ArgsRu) => string;
    }
    ? ArgsEt extends ArgsEn
      ? ArgsEn extends ArgsRu
        ? ArgsRu extends ArgsEt
          ? true
          : false
        : false
      : false
    : false
  : true;

type TediValidatedLabels<TRecord> = {
  [TKey in keyof TRecord]: HasConsistentArgs<TRecord[TKey]> extends true
    ? TRecord[TKey] extends { [TLang in TediLanguage]: string }
      ? LabelStringEntry
      : TRecord[TKey] extends { [TLang in TediLanguage]: (...args: any[]) => string }
      ? LabelFunctionEntry<ExtractLabelArgs<TRecord[TKey]>>
      : never
    : never;
};

export type LabelFunctionValue<TArgs extends any[]> = (...args: TArgs) => string;
export type TediLanguage = 'et' | 'en' | 'ru';

export type TediLabelEntryRecord<TRecord> = {
  [TKey in keyof DefaultLabels]?: Partial<DefaultLabels[TKey]>;
} & TediValidatedLabels<TRecord>;

export type TediLabelValuesRecord = {
  [TKey in keyof DefaultLabels]?: DefaultLabels[TKey]['et'];
} & {
  [TKey: string]: string | LabelFunctionValue<any[]>;
};

const validateDefaultLabels = <TRecord extends TediValidatedLabels<TRecord>>(map: TRecord): TRecord => map;
export const validateLabelRecord = <TRecord extends TediLabelEntryRecord<TRecord>>(map: TRecord): TRecord => map;
export const validateLabelValues = <TRecord extends TediLabelValuesRecord>(map: TRecord): TRecord => map;

const muiTranslationsUrl =
  'https://github.com/mui/mui-x/blob/HEAD/packages/x-date-pickers/src/locales/utils/pickersLocaleTextApi.ts';

/**
 * Creates a map of default translations.
 * et, en and ru values must be of same type
 */
export const labelsMap = validateDefaultLabels({
  'tabs.more': {
    description: 'Label for the mobile overflow button in Tabs',
    components: ['Tabs'],
    et: 'Veel',
    en: 'More',
    ru: 'Ещё',
  },
  close: {
    description: 'Used for closing',
    components: ['CloseButton', 'Collapse', 'Notification', 'FileUpload', 'Dropdown', 'Tooltip', 'Tabs'],
    et: 'Sulge',
    en: 'Close',
    ru: 'Закрыть',
  },
  open: {
    description: 'Used for opening',
    components: ['Collapse'],
    et: 'Ava',
    en: 'Open',
    ru: 'Открыть',
  },
  remove: {
    description: 'Used for removing',
    components: ['FileUpload'],
    et: 'Eemalda',
    en: 'Remove',
    ru: 'Удалить',
  },
  cancel: {
    description: 'For canceling an action',
    components: ['TableFilter'],
    et: 'Tühista',
    en: 'Cancel',
    ru: 'Отмена',
  },
  clear: {
    description: 'For clearing a value',
    components: ['TableFilter', 'TextField'],
    et: 'Tühjenda',
    en: 'Clear',
    ru: 'Очистить',
  },
  search: {
    description: 'For searching',
    components: ['TableFilter'],
    et: 'Otsi',
    en: 'Search',
    ru: 'Поиск',
  },
  required: {
    description: 'Required field',
    components: ['TableFilter'],
    et: 'Kohustuslik väli',
    en: 'Required field',
    ru: 'Обязательное поле',
  },
  breadcrumbs: {
    description: 'Breadcrumbs navigation label',
    components: ['Breadcrumbs'],
    et: 'Jäljerida',
    en: 'Breadcrumbs',
    ru: 'Навигационная цепочка',
  },
  'anchor.new-tab': {
    description: 'Label for when anchor opens in new tab',
    components: ['Anchor'],
    et: 'Avaneb uuel vahelehel',
    en: 'Opens in new tab',
    ru: 'Открывается в новой вкладке',
  },
  'header.toggle': {
    description: 'Label for header toggle on mobile',
    components: ['Header'],
    et: (isOpen: boolean) => (isOpen ? 'Sulge menüü' : 'Ava menüü'),
    en: (isOpen: boolean) => (isOpen ? 'Close menu' : 'Open menu'),
    ru: (isOpen: boolean) => (isOpen ? 'Закрыть меню' : 'Открыть меню'),
  },
  'header.settings': {
    description: 'Label for HeaderSettings Button',
    components: ['HeaderSettings'],
    et: 'Seaded',
    en: 'Settings',
    ru: 'Настройки',
  },
  'header.select-lang': {
    description: 'Label for HeaderLanguage label and Modal Heading',
    components: ['HeaderLanguage'],
    et: 'Keel:',
    en: 'Language:',
    ru: 'Язык:',
  },
  'header.role-label': {
    description: 'Label for Role selection',
    components: ['HeaderRole'],
    et: 'Mina esindan:',
    en: 'I represent:',
    ru: 'я представляю:',
  },
  'header.login': {
    description: 'Label for login button',
    components: ['Header'],
    et: 'Sisene portaali',
    en: 'Log in',
    ru: 'авторизоваться',
  },
  'header.logout': {
    description: 'Label for logout button',
    components: ['Header'],
    et: 'Logi välja',
    en: 'Log out',
    ru: 'Выйти',
  },
  'header.logo': {
    description: 'Alt Label for logo',
    components: ['Header'],
    et: 'Logo',
    en: 'Logo',
    ru: 'Логотип',
  },
  'file-upload.add': {
    description: 'Label for add file button',
    components: ['FileUpload'],
    et: 'Lisa manus',
    en: 'Add attachment',
    ru: 'Загрузить файл',
  },
  'file-upload.accept': {
    description: 'Default label for file extensions',
    components: ['FileUpload'],
    et: 'Lubatud faililaiendid:',
    en: 'Allowed file extensions:',
    ru: 'Разрешенные расширения файлов:',
  },
  'file-upload.max-size': {
    description: 'Default label for file size restriction',
    components: ['FileUpload'],
    et: 'Maksimaalne suurus:',
    en: 'Maximum size:',
    ru: 'Максимальный размер:',
  },
  'file-upload.size-rejected': {
    description: 'Error label for rejected size',
    components: ['FileUpload'],
    et: (files: string) => `Fail(id) ${files} on liiga suured`,
    en: (files: string) => `File(s) ${files} are too large`,
    ru: (files: string) => `Файл(ы) ${files} слишком велики`,
  },
  'file-upload.extension-rejected': {
    description: 'Error label for rejected extension',
    components: ['FileUpload'],
    et: (files: string) => `Fail(id) ${files} on vale laiendiga`,
    en: (files: string) => `File(s) ${files} have the wrong extension`,
    ru: (files: string) => `Файл(ы) ${files} имеют неправильное расширение`,
  },
  'file-upload.failed': {
    description: 'File upload failed label',
    components: ['FileUpload'],
    et: 'Faili üleslaadimine ebaõnnestus',
    en: 'File upload failed',
    ru: 'Загрузка файла не удалась',
  },

  'file-upload.success-added': {
    description: 'How many files were added successfully',
    components: ['FileUpload'],
    et: (count: string) => `${count} faili lisati edukalt`,
    en: (count: string) => `${count} files were added successfully`,
    ru: (count: string) => `${count} файл(ы) успешно добавлены`,
  },

  'file-upload.failed-some': {
    description: 'Error label for rejected files (wrong extension)',
    components: ['FileUpload'],
    et: (files: string) => `Fail(id) ${files} on vale laiendiga`,
    en: (files: string) => `File(s) ${files} have the wrong extension`,
    ru: (files: string) => `Файл(ы) ${files} имеют неправильное расширение`,
  },
  'file-dropzone.label': {
    description: 'Default label for dropzone',
    components: ['FileDropzone'],
    et: 'Lohista failid siia või klõpsa, et sirvida',
    en: 'Drop files here, or click to browse',
    ru: 'Перетащите файлы сюда или нажмите, чтобы выбрать',
  },
  'file-dropzone.no-file': {
    description: 'No file selected label for FileUpload or FileDropzone',
    components: ['FileDropzone', 'FileUpload'],
    et: 'Ühtegi faili pole valitud',
    en: 'No file has been chosen',
    ru: 'Файлы не выбраны',
  },
  'file-dropzone.selected-files': {
    description: 'Selected files label for FileUpload or FileDropzone',
    components: ['FileDropzone', 'FileUpload'],
    et: 'Valitud failid',
    en: 'Uploaded files',
    ru: 'Загруженные файлы',
  },
  'file-dropzone.files-selected': {
    description: 'Label for selected file count',
    components: ['FileDropzone', 'FileUpload'],
    et: (files: number) => (files === 1 ? `${files} fail valitud` : `${files} faili valitud`),
    en: (files: number) => (files === 1 ? `${files} file selected` : `${files} files selected`),
    ru: (files: number) => {
      const lastDigit = files % 10;
      const lastTwoDigits = files % 100;
      const isSingular = lastDigit === 1 && lastTwoDigits !== 11;
      const isFew = lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14);

      if (isSingular) {
        return `${files} выбранный файл`;
      }

      if (isFew) {
        return `${files} выбранных файла`;
      }

      return `${files} выбранных файлов`;
    },
  },
  'modal.close': {
    description: 'Label for modals close button',
    components: ['Modal'],
    et: 'Sulge modaal',
    en: 'Close modal',
    ru: 'Закрыть модальное окно',
  },
  'select.loading': {
    description: 'Text when select options are loading',
    components: ['select'],
    et: 'Laadimine...',
    en: 'Loading...',
    ru: 'Загрузка...',
  },
  'select.no-options': {
    description: 'Text when select has no options',
    components: ['select'],
    et: 'Valikud puuduvad',
    en: 'No options',
    ru: 'Нет вариантов',
  },
  'table.no-data': {
    description: 'Default placeholder shown in the Table body when `data` is empty.',
    components: ['Table'],
    et: 'Andmed puuduvad',
    en: 'No data',
    ru: 'Нет данных',
  },
  // `table.select-all` / `table.select-row` already exist further down with a
  // state-aware function signature shared with the community Table — we reuse
  // them via `getLabel('table.select-all', isAllSelected)` etc.
  'table.expand-row': {
    description: 'Accessible label on the expand toggle in expandable rows.',
    components: ['Table'],
    et: 'Laienda rida',
    en: 'Expand row',
    ru: 'Развернуть строку',
  },
  'table.collapse-row': {
    description: 'Accessible label on the collapse toggle in expandable rows.',
    components: ['Table'],
    et: 'Ahenda rida',
    en: 'Collapse row',
    ru: 'Свернуть строку',
  },
  'table.filter-placeholder': {
    description: 'Placeholder for the per-column filter inputs rendered under the header.',
    components: ['Table'],
    et: 'Filtreeri…',
    en: 'Filter…',
    ru: 'Фильтр…',
  },
  'table.columns': {
    description: 'Default label on the `Table.ColumnsMenu` trigger (column-visibility menu).',
    components: ['TableColumnsMenu'],
    et: 'Veerud',
    en: 'Columns',
    ru: 'Столбцы',
  },
  'stepper.completed': {
    description: 'Label for screen-reader that this step is completed (visually hidden)',
    components: ['StepperNav'],
    et: 'Lõpetatud',
    en: 'Completed',
    ru: 'Завершено',
  },
  'stepper.not-completed': {
    description: 'Label for screen-reader that this step is not completed (visually hidden)',
    components: ['StepperNav'],
    et: 'Lõpetamata',
    en: 'Not completed',
    ru: 'Не завершено',
  },
  'skeleton.loading': {
    description: 'Announced by screen-readers when skeleton is loading',
    components: ['Skeleton'],
    et: 'Laadimine',
    en: 'Loading',
    ru: 'Загрузка',
  },
  'skeleton.loading-completed': {
    description: 'Announced by screen-readers when skeleton has completed loading',
    components: ['Skeleton'],
    et: 'Laadimine lõpetatud',
    en: 'Loading completed',
    ru: 'Загрузка завершена',
  },
  'spinner.loading': {
    description: 'Announced by screen-readers when spinner is loading',
    components: ['Spinner'],
    et: 'Laadimine',
    en: 'Loading',
    ru: 'Загрузка',
  },
  'table.loading': {
    description: 'Shown when table is loading',
    components: ['Table'],
    et: 'Tabel laeb',
    en: 'Table is loading',
    ru: 'Таблица загружается',
  },
  'table.empty': {
    description: 'Shown when table is empty',
    components: ['Table'],
    et: 'Tulemused puuduvad',
    en: 'No results',
    ru: 'Нет результатов',
  },
  'table.error': {
    description: 'Shown when table is in error state',
    components: ['Table'],
    et: 'Tabeli andmete pärimisel tekkis viga',
    en: 'An error occurred while retrieving table data',
    ru: 'Произошла ошибка при получении данных таблицы',
  },
  'table.filter': {
    description: 'Label for filter toggle',
    components: ['Table', 'TableFilter'],
    et: 'Filtreeri',
    en: 'Filter',
    ru: 'Фильтровать',
  },
  'table.filter.select-all': {
    description: 'Label for selecting all',
    components: ['Table', 'TableFilter'],
    et: 'Vali kõik',
    en: 'Select all',
    ru: 'Выбрать все',
  },
  'table.filter.remove-all': {
    description: 'Label for removing all',
    components: ['Table', 'TableFilter'],
    et: 'Eemalda kõik',
    en: 'Remove all',
    ru: 'Удалить все',
  },
  'table.filter.no-options': {
    description: 'When select filter has no options',
    components: ['Table', 'TableFilter'],
    et: 'Valikud puuduvad',
    en: 'No options',
    ru: 'Нет вариантов',
  },
  'table.filter.validation.no-spaces': {
    description: 'Filter validation error - Text can not start with spaces',
    components: ['Table', 'TableFilter'],
    et: 'Tekst ei tohi alata tühikutega',
    en: 'Filter text cant start with spaces',
    ru: 'Текст фильтра не может начинаться с пробелов',
  },
  'table.filter.validation.min-length': {
    description: 'Filter validation error - Text is too short',
    components: ['Table', 'TableFilter'],
    et: (count: number) => (count === 1 ? `Sisesta vähemalt ${count} tähemärk` : `Sisesta vähemalt ${count} tähemärki`),
    en: (count: number) => (count === 1 ? `Min length is ${count} char` : `Min length is ${count} chars`),
    ru: (count: number) => (count === 1 ? `Минимальная длина ${count} знак` : `Минимальная длина ${count} знаков`),
  },
  'table.filter.validation.to-before-from': {
    description: 'Filter validation error - End date is before start date',
    components: ['Table', 'TableFilter'],
    et: 'Lõppkuupäev on enne alguskuupäeva',
    en: 'End date must be after start date',
    ru: 'Дата окончания предшествует дате начала',
  },
  'table.filter.from': {
    description: 'Label for date filter from',
    components: ['Table', 'TableFilter'],
    et: 'Kuupäev alates',
    en: 'Date from',
    ru: 'Дата с',
  },
  'table.filter.to': {
    description: 'Label for date filter until',
    components: ['Table', 'TableFilter'],
    et: 'Kuupäev kuni',
    en: 'Date until',
    ru: 'Дата до',
  },
  'table.toggle-sub-row': {
    description: 'Toggle sub row button (Visually hidden)',
    components: ['Table'],
    et: (isExpaned: boolean) => (isExpaned ? 'Sulge alamrida' : 'Ava alamrida'),
    en: (isExpaned: boolean) => (isExpaned ? 'Close subrow' : 'Open subrow'),
    ru: (isExpaned: boolean) => (isExpaned ? 'Закрыть подстроку' : 'Открыть подстроку'),
  },
  'table.select-all': {
    description: 'Row selection - Label for check in table header',
    components: ['Table'],
    et: (isSelected: boolean) => (isSelected ? 'Eemalda kõik' : 'Vali kõik'),
    en: (isSelected: boolean) => (isSelected ? 'Deselect all' : 'Select all'),
    ru: (isSelected: boolean) => (isSelected ? 'Убрать выделение со всего' : 'Выбрать все'),
  },
  'table.select-row': {
    description: 'Row selection - Label for check in table row',
    components: ['Table'],
    et: (isSelected: boolean) => (isSelected ? 'Eemalda rida' : 'Vali rida'),
    en: (isSelected: boolean) => (isSelected ? 'Deselect row' : 'Select row'),
    ru: (isSelected: boolean) => (isSelected ? 'Отменить выбор строки' : 'Выбрать ряд'),
  },
  'table.sort': {
    description: 'Label for sort button',
    components: ['Table'],
    et: (direction: 'asc' | 'desc' | false) =>
      direction === 'asc'
        ? 'Sorteeri kahanevalt'
        : direction === 'desc'
        ? 'Eemalda sorteerimine'
        : 'Sorteeri kasvavalt',
    en: (direction: 'asc' | 'desc' | false) =>
      direction === 'asc' ? 'Sort decending' : direction === 'desc' ? 'Remove sorting' : 'Sort ascending',
    ru: (direction: 'asc' | 'desc' | false) =>
      direction === 'asc'
        ? 'Сортировать по убыванию'
        : direction === 'desc'
        ? 'Отменить сортировку'
        : 'Сортировать по возрастанию',
  },
  'tooltip.icon-trigger': {
    description: 'Label we use for icons that are tooltip triggers',
    components: ['TooltipTrigger'],
    et: 'Kuva tööriistavihje',
    en: 'Show tooltip',
    ru: 'Показать подсказку',
  },
  'pagination.title': {
    description: 'Label of the pagination',
    components: ['Table', 'Pagination'],
    et: 'Pagineerimine',
    en: 'Pagination',
    ru: 'Страницы',
  },
  'pagination.page': {
    description: 'Label of individual page numbers',
    components: ['Table', 'Pagination'],
    et: (page: number, isCurrent?: boolean) => (isCurrent ? `Aktiivne leht, leht ${page}` : `Mine lehele ${page}`),
    en: (page: number, isCurrent?: boolean) => (isCurrent ? `Current page, page ${page}` : `Go to page ${page}`),
    ru: (page: number, isCurrent?: boolean) =>
      isCurrent ? `Текущая страница, страница ${page}` : `Перейти на страницу ${page}`,
  },
  'pagination.prev-page': {
    description: 'Previous page button label',
    components: ['Table', 'Pagination'],
    et: 'Eelmine leht',
    en: 'Previous page',
    ru: 'Предыдущая страница',
  },
  'pagination.next-page': {
    description: 'Next page button label',
    components: ['Table', 'Pagination'],
    et: 'Järgmine leht',
    en: 'Next page',
    ru: 'Следущая страница',
  },
  'pagination.results': {
    description:
      'Total results text. Returns the full localised string with count embedded — locales decide their own word order.',
    components: ['Table', 'Pagination'],
    et: (count?: number) => `${count ?? 0} ${count === 1 ? 'tulemus' : 'tulemust'}`,
    en: (count?: number) => `${count ?? 0} ${count === 1 ? 'result' : 'results'}`,
    ru: (count?: number) => `${count ?? 0} ${count === 1 ? 'результат' : 'результа'}`,
  },
  'pagination.page-size': {
    description: 'Label of page size select',
    components: ['Table', 'Pagination'],
    et: 'Lehe suurus',
    en: 'Page size',
    ru: 'Размер страницы',
  },
  'table-of-contents.title': {
    description: 'Title of the table of contents',
    components: ['TableOfContents'],
    et: 'Sisukord',
    en: 'Table of contents',
    ru: 'Содержание',
  },
  'table-of-contents.valid': {
    description: 'Number of valid steps',
    components: ['TableOfContents'],
    et: (count: string | number) => `${count} valiidsed`,
    en: (count: string | number) => `${count} valid`,
    ru: (count: string | number) => `${count} действительны`,
  },
  'table-of-contents.invalid': {
    description: 'Number of invalid steps',
    components: ['TableOfContents'],
    et: (count: string | number) => `${count} mitte valiidne`,
    en: (count: string | number) => `${count} invalid`,
    ru: (count: string | number) => `${count} неверный`,
  },
  'truncate.see-more': {
    description: 'See more button label',
    components: ['Truncate'],
    et: 'Näita rohkem',
    en: 'Show more',
    ru: 'Показать больше',
  },
  'truncate.see-less': {
    description: 'See less button label',
    components: ['Truncate'],
    et: 'Näita vähem',
    en: 'Show less',
    ru: 'Скрыть',
  },
  'vertical-progress.edit': {
    description: 'Edit button label',
    components: ['VerticalProgressItem'],
    et: 'Muuda',
    en: 'Edit',
    ru: 'редактировать',
  },
  'pickers.previousMonth': {
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Eelmine kuu',
    en: 'Previous month',
    ru: 'Прошлый месяц',
  },
  'pickers.nextMonth': {
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Järgmine kuu',
    en: 'Next month',
    ru: 'Следующий месяц',
  },
  'pickers.openPreviousView': {
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Ava eelmine vaade',
    en: 'Open previous view',
    ru: 'Открыть предыдущий вид',
  },
  'pickers.openNextView': {
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Ava järgmine vaade',
    en: 'Open next view',
    ru: 'Открыть следующий вид',
  },
  'pickers.cancelButtonLabel': {
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Tühista',
    en: 'Cancel',
    ru: 'Отмена',
  },
  'pickers.clearButtonLabel': {
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Tühjenda',
    en: 'Clear',
    ru: 'Очистить',
  },
  'pickers.okButtonLabel': {
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Kinnita',
    en: 'Confirm',
    ru: 'Подтвердить',
  },
  'pickers.todayButtonLabel': {
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Täna',
    en: 'Today',
    ru: ' Сегодня',
  },
  'pickers.start': {
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Algus',
    en: 'Start',
    ru: 'Начало',
  },
  'pickers.end': {
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Lõpp',
    en: 'End',
    ru: 'Конец',
  },
  'pickers.calendarViewSwitchingButtonAriaLabel': {
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: (currentView: CalendarPickerView) =>
      currentView === 'day'
        ? 'Kalendri vaade on lahti, lülitu aasta vaatesse'
        : currentView === 'month'
        ? 'Kuu vaade on lahti, lülitu aasta vaatesse'
        : 'Aasta vaade on lahti, lülitu kalendri vaatesse',
    en: (currentView: CalendarPickerView) =>
      currentView === 'day'
        ? 'Calendar view is open, switch to year view'
        : currentView === 'month'
        ? 'Month view is open, switch to year view'
        : 'Year view is open, switch to calendar view',
    ru: (currentView: CalendarPickerView) =>
      currentView === 'day'
        ? 'Открыт календарный вид, переключиться на годовой вид'
        : currentView === 'month'
        ? 'Открыт месячный вид, переключиться на месячный вид'
        : 'Открыт годовой вид, переключиться на календарный вид',
  },
  'pickers.inputModeToggleButtonAriaLabel': {
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: (isKeyboardInputOpen: boolean, viewType: 'calendar' | 'clock') =>
      isKeyboardInputOpen
        ? `Teksti välja vaade on lahti, mine ${viewType === 'calendar' ? 'kalendri' : 'kella'} vaatesse`
        : `${viewType === 'calendar' ? 'Kalendri' : 'Kella'} vaade on lahti, mine teksti välja vaatesse`,
    en: (isKeyboardInputOpen: boolean, viewType: 'calendar' | 'clock') =>
      isKeyboardInputOpen
        ? `Text input view is open, go to ${viewType === 'calendar' ? 'calendar' : 'clock'} view`
        : `${viewType === 'calendar' ? 'Calendar' : 'Clock'} view is open, go to text input view`,
    ru: (isKeyboardInputOpen: boolean, viewType: 'calendar' | 'clock') =>
      isKeyboardInputOpen
        ? `Вид ввода текста открыт, перейти к виду ${viewType === 'calendar' ? 'календаря' : 'времени'}`
        : `Вид ${viewType === 'calendar' ? 'календаря' : 'времени'} открыт, перейти к виду ввода текста`,
  },
  'pickers.clockLabelText': {
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: (view: ClockPickerView, time: TimePickerValue, adapter: MuiPickersAdapter<TimePickerValue>) =>
      `Vali ${view === 'hours' ? 'tunnid' : view === 'minutes' ? 'minutid' : 'sekundid'}. ${
        time === null ? 'Aega pole valitud' : `Valitud aeg on ${adapter.format(time, 'fullTime')}`
      }`,
    en: (view: ClockPickerView, time: TimePickerValue, adapter: MuiPickersAdapter<TimePickerValue>) =>
      `Select ${view === 'hours' ? 'hours' : view === 'minutes' ? 'minutes' : 'seconds'}. ${
        time === null ? 'No time selected' : `Selected time is ${adapter.format(time, 'fullTime')}`
      }`,
    ru: (view: ClockPickerView, time: TimePickerValue, adapter: MuiPickersAdapter<TimePickerValue>) =>
      `Выбрать ${view === 'hours' ? 'часы' : view === 'minutes' ? 'минуты' : 'секунды'}. ${
        time === null ? 'Время не выбрано' : `Выбранное время ${adapter.format(time, 'fullTime')}`
      }`,
  },
  'pickers.hoursClockNumberText': {
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: (hours: string) => `${hours} tundi`,
    en: (hours: string) => `${hours} hours`,
    ru: (hours: string) => `${hours} часов`,
  },
  'pickers.minutesClockNumberText': {
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: (hours: string) => `${hours} minutit`,
    en: (hours: string) => `${hours} minutes`,
    ru: (hours: string) => `${hours} минут`,
  },
  'pickers.secondsClockNumberText': {
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: (hours: string) => `${hours} sekundit`,
    en: (hours: string) => `${hours} seconds`,
    ru: (hours: string) => `${hours} секунд`,
  },
  'pickers.openDatePickerDialogue': {
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: (date: DatepickerValue, utils: MuiPickersAdapter<DatepickerValue>) =>
      date !== null && utils.isValid(date)
        ? `Vali kuupäev, valitud kuupäev on ${utils.format(date, 'fullDate')}`
        : 'Vali kuupäev',
    en: (date: DatepickerValue, utils: MuiPickersAdapter<DatepickerValue>) =>
      date !== null && utils.isValid(date)
        ? `Choose date, selected date is ${utils.format(date, 'fullDate')}`
        : 'Choose date',
    ru: (date: DatepickerValue, utils: MuiPickersAdapter<DatepickerValue>) =>
      date !== null && utils.isValid(date)
        ? `Выберите дату, выбранная дата ${utils.format(date, 'fullDate')}`
        : 'Выберите дату',
  },
  'pickers.openTimePickerDialogue': {
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: (date: TimePickerValue, utils: MuiPickersAdapter<TimePickerValue>) =>
      date !== null && utils.isValid(date)
        ? `Vali kellaaeg, valitud kellaaeg on ${utils.format(date, 'fullTime')}`
        : 'Vali kellaaeg',
    en: (date: TimePickerValue, utils: MuiPickersAdapter<TimePickerValue>) =>
      date !== null && utils.isValid(date)
        ? `Choose time, selected time is ${utils.format(date, 'fullTime')}`
        : 'Choose time',
    ru: (date: TimePickerValue, utils: MuiPickersAdapter<TimePickerValue>) =>
      date !== null && utils.isValid(date)
        ? `Выберите время, выбранное время ${utils.format(date, 'fullTime')}`
        : 'Выберите время',
  },
  'pickers.timeTableLabel': {
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Vali kellaaeg',
    en: 'Pick time',
    ru: 'Выберите время',
  },
  'pickers.dateTableLabel': {
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Vali kuupäev',
    en: 'Pick date',
    ru: 'Выберите дату',
  },
  'pickers.datePickerDefaultToolbarTitle': {
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Vali kuupäev',
    en: 'Pick date',
    ru: 'Выберите дату',
  },
  'pickers.dateTimePickerDefaultToolbarTitle': {
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Vali kuupäev ja kellaaeg',
    en: 'Pick date and time',
    ru: 'Выберите время и дату',
  },
  'pickers.timePickerDefaultToolbarTitle': {
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Vali kellaaeg',
    en: 'Pick time',
    ru: 'Выберите время',
  },
  'pickers.dateRangePickerDefaultToolbarTitle': {
    description: `Translation for ${muiTranslationsUrl}`,
    components: ['Pickers'],
    et: 'Vali kuupäeva vahemik',
    en: 'Pick date range',
    ru: 'Выберите даты',
  },
  'footer.title': {
    description: 'Label for screen-reader for footer navigation title',
    components: ['Footer'],
    et: 'Jalus',
    en: 'Footer',
    ru: 'Нижний колонтитул',
  },
  'numberField.decrement': {
    description: 'Label for screen-reader for number field decrease button',
    components: ['NumberField'],
    et: (count: string | number) => `Vähenda ${count} võrra`,
    en: (count: string | number) => `Decrease by ${count}`,
    ru: (count: string | number) => `Уменьшить на ${count}`,
  },
  'numberField.increment': {
    description: 'Label for screen-reader for number field increase button',
    components: ['NumberField'],
    et: (count: string | number) => `Suurenda ${count} võrra`,
    en: (count: string | number) => `Increase by ${count}`,
    ru: (count: string | number) => `Увеличить на ${count}`,
  },
  'numberField.quantityUpdated': {
    description: 'Label for screen-reader when quantity get updated by button click',
    components: ['NumberField'],
    et: (count: string | number) => `Uuendatud. Uus väärtus ${count}`,
    en: (count: string | number) => `Updated. New value ${count}`,
    ru: (count: string | number) => `Ууэндатуд. Уус вяэртус ${count}`,
  },
  'sidenav.backToMainMenu': {
    description: 'Side navigation label',
    components: ['Sidenav'],
    et: 'Peamenüüsse',
    en: 'Back to main menu',
    ru: 'Назад в главное меню',
  },
  'sidenav.backtoMenu': {
    description: 'Side navigation label',
    components: ['Sidenav'],
    et: 'menüüsse',
    en: 'menu',
    ru: 'меню',
  },
  'sidenav.toggleSubmenuChildren': {
    description: 'Side navigation label for toggling submenu',
    components: ['Sidenav'],
    et: ({ isCollapsedInternal, children }: { isCollapsedInternal: boolean; children: React.ReactNode }) =>
      isCollapsedInternal ? `Sulge ${children} alammenüü` : `Ava ${children} alammenüü`,
    en: ({ isCollapsedInternal, children }: { isCollapsedInternal: boolean; children: React.ReactNode }) =>
      isCollapsedInternal ? `Close ${children} submenu` : `Open ${children} submenu`,
    ru: ({ isCollapsedInternal, children }: { isCollapsedInternal: boolean; children: React.ReactNode }) =>
      isCollapsedInternal ? `Закрыть подменю ${children}` : `Открыть подменю ${children}`,
  },
  'sidenav.submenu': {
    description: 'Side navigation label for submenu',
    components: ['Sidenav'],
    et: 'Alammenüü',
    en: 'Submenu',
    ru: 'Подменю',
  },
  'infoButton.moreInformation': {
    description: 'More information button label',
    components: ['InfoButton'],
    et: 'Rohkem infot',
    en: 'More information',
    ru: 'Больше информации',
  },
});

type DefaultLabels = typeof labelsMap;
export interface TediLabels extends DefaultLabels {}
