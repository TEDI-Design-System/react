import type { ArgTypes } from '@storybook/react-vite';

/**
 * Storybook's Controls panel only binds interactive controls to the story's
 * primary `component`. Compound components (e.g. `Card.Content`, `Card.Header`)
 * are declared via `subcomponents`, which only renders documentation tables in
 * autodocs — never live controls.
 *
 * These helpers flatten a subcomponent's props (read from the `__docgenInfo`
 * the react-docgen-typescript plugin injects at build time) into namespaced,
 * prefixed argTypes that DO render as live controls, grouped under a category.
 * `getSubcomponentProps` reverses the namespacing in a story's `render` so the
 * collected values can be spread back onto the subcomponent.
 *
 * Usage:
 *   argTypes: {
 *     ...subcomponentArgTypes(Card.Content, { category: 'Card.Content', prefix: 'content' }),
 *   },
 *   render: (args) => <Card.Content {...getSubcomponentProps(args, 'content')} />
 */

type ArgType = ArgTypes[string];

interface DocgenPropType {
  name: string;
  raw?: string;
  value?: Array<{ value: string }>;
}

interface DocgenProp {
  name: string;
  description?: string;
  required?: boolean;
  defaultValue?: { value: unknown } | null;
  type?: DocgenPropType;
}

interface DocgenInfo {
  props?: Record<string, DocgenProp>;
}

/** Shape the docgen plugin injects onto a component at build time. */
interface WithDocgen {
  __docgenInfo?: DocgenInfo;
  displayName?: string;
}

/** Separator between the namespace prefix and the original prop name. */
const SEP = '__';

/**
 * Props that are too noisy to control and are excluded from every subcomponent:
 * raw DOM passthroughs plus the breakpoint-support knobs that stories already
 * exclude at the meta level (`controls: { exclude: ['sm', 'md', ...] }`).
 */
const ALWAYS_EXCLUDE = ['style', 'ref', 'key', 'defaultServerBreakpoint', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

const stripQuotes = (value: string): string => value.replace(/^['"]|['"]$/g, '');

const isNumericLiteral = (value: string): boolean => /^-?\d+(?:\.\d+)?$/.test(value);

/** Map a react-docgen-typescript prop type to a Storybook control + options. */
const inferControl = (type: DocgenProp['type']): Pick<ArgType, 'control' | 'options'> => {
  switch (type?.name) {
    case 'boolean':
      return { control: 'boolean' };
    case 'number':
      return { control: 'number' };
    case 'string':
      return { control: 'text' };
    case 'enum': {
      const literals = (type.value ?? [])
        .map((entry) => stripQuotes(entry.value))
        .filter((value) => value !== 'undefined' && value !== 'null');

      if (literals.length === 0) return { control: 'text' };
      if (literals.every((value) => value === 'true' || value === 'false')) return { control: 'boolean' };
      if (literals.every(isNumericLiteral)) return { control: 'select', options: literals.map(Number) };
      return { control: 'select', options: literals };
    }
    default:
      // Complex/object/union types (CSSProperties, ReactNode, custom unions): a
      // JSON object control is the safest fallback. Exclude via `options.exclude`
      // when it adds noise (e.g. `children`).
      return { control: 'object' };
  }
};

export interface SubcomponentArgTypesOptions {
  /** Group header shown above these controls, e.g. `'Card.Content'`. */
  category: string;
  /** Arg-key prefix used to namespace the props, e.g. `'content'`. Must be unique per subcomponent in a story. */
  prefix: string;
  /** If set, only these prop names are turned into controls. */
  include?: string[];
  /** Prop names to skip (in addition to the always-excluded `style`/`ref`/`key`). */
  exclude?: string[];
}

/**
 * Build namespaced argTypes for a compound subcomponent so its props render as
 * live controls grouped under `category`. Returns an empty object (with a
 * console warning) when the component has no docgen info — e.g. if docgen is
 * misconfigured — so the story still renders.
 */
export const subcomponentArgTypes = (component: unknown, options: SubcomponentArgTypesOptions): ArgTypes => {
  const { category, prefix, include, exclude = [] } = options;
  // `component` is a React component (function or forwardRef object) carrying a
  // build-time-injected `__docgenInfo`; accept it as `unknown` and read through
  // the docgen shape so any component type can be passed without casts at the call site.
  const docgen = component as WithDocgen;
  const props = docgen.__docgenInfo?.props;

  if (!props) {
    // eslint-disable-next-line no-console
    console.warn(
      `[subcomponentArgTypes] No __docgenInfo for "${docgen.displayName ?? category}". ` +
        'Controls will not be generated. Check the react-docgen-typescript config in .storybook/main.ts.'
    );
    return {};
  }

  const skip = new Set([...ALWAYS_EXCLUDE, ...exclude]);
  const argTypes: ArgTypes = {};

  for (const [name, prop] of Object.entries(props)) {
    if (include && !include.includes(name)) continue;
    if (skip.has(name)) continue;

    const { control, options: controlOptions } = inferControl(prop.type);
    const defaultValue = prop.defaultValue?.value;

    argTypes[`${prefix}${SEP}${name}`] = {
      name,
      description: prop.description || undefined,
      control,
      options: controlOptions,
      table: {
        category,
        type: prop.type ? { summary: prop.type.raw ?? prop.type.name } : undefined,
        defaultValue:
          defaultValue !== undefined && defaultValue !== null ? { summary: String(defaultValue) } : undefined,
      },
    };
  }

  return argTypes;
};

/**
 * Reverse `subcomponentArgTypes` namespacing: collect a subcomponent's props
 * from the flattened story `args`. Unset (`undefined`/empty-string) controls are
 * dropped so the component's own defaults are preserved.
 */
export const getSubcomponentProps = <T = Record<string, unknown>>(args: Record<string, unknown>, prefix: string): T => {
  const head = `${prefix}${SEP}`;
  const props: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(args)) {
    if (key.startsWith(head) && value !== undefined && value !== '') {
      props[key.slice(head.length)] = value;
    }
  }

  return props as T;
};

/** Story args that are NOT subcomponent-namespaced — i.e. the primary component's own props. */
export const getPrimaryComponentProps = <T = Record<string, unknown>>(args: Record<string, unknown>): T => {
  const props: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(args)) {
    if (!key.includes(SEP)) props[key] = value;
  }

  return props as T;
};
