import { readdirSync, readFileSync } from 'fs';
import { join, relative } from 'path';

/**
 * Fails when a docs story in a stories file with a `VisualTest` is not rendered by `VisualTest`, so a
 * new story can't silently miss Chromatic. A story passes when the composite (or a non-story helper
 * it uses) references it by name, or calls the render helper that only this story uses. Stories with their own snapshot (`disableSnapshot: false`), hidden stories
 * (`!dev`) and stories marked `parameters: { visualTest: false }` are skipped.
 */

const ROOT = join(__dirname, '..');
const STORIES_DIR = join(ROOT, 'src/tedi');
const COMPOSITES = ['VisualTest'];

const DECLARATION = /^(?:export\s+)?(?:const|let|function|class)\s+([A-Za-z_$][\w$]*)/;
const IDENTIFIER = /[A-Za-z_$][\w$]*/g;

interface Declaration {
  name: string;
  body: string;
  isStory: boolean;
}

const storyFiles = (): string[] =>
  (readdirSync(STORIES_DIR, { recursive: true }) as string[])
    .filter((file) => file.endsWith('.stories.tsx'))
    .map((file) => join(STORIES_DIR, file));

/** Splits a file into its top-level declarations; each body runs to the next top-level line. */
const declarations = (source: string): Declaration[] => {
  const result: Declaration[] = [];
  let current: Declaration | undefined;

  for (const line of source.split('\n')) {
    const match = /^\S/.test(line) ? DECLARATION.exec(line) : null;
    // `Story.parameters = …` belongs to that story.
    const assignment = /^([A-Z][\w$]*)\.\w+\s*=/.exec(line);
    if (assignment) {
      current = result.find((decl) => decl.name === assignment[1]);
    } else if (match) {
      current = {
        name: match[1],
        body: '',
        isStory: /^export\s+const\s+[A-Z]/.test(line),
      };
      result.push(current);
    } else if (/^[^\s})\]`]/.test(line)) {
      current = undefined;
    }
    if (current) {
      current.body += `${line}\n`;
    }
  }

  return result;
};

const identifiers = (text: string) => new Set(text.match(IDENTIFIER) ?? []);

/** Blanks quoted strings, so a label such as `"Default, Disabled"` names no story. */
const withoutStrings = (text: string) => text.replace(/"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'/g, '""');

/**
 * Whether `text` uses the story as a value (`story: X`, `X.args`, `{...X}`, `onBrand(X)`, `X as StoryObj`), not
 * just its name as text: `"Default"` in a string or `>Default<` in markup doesn't count.
 */
const referencesStory = (text: string, name: string): boolean =>
  new RegExp(`(?<![\\w$>-])${name}(?=\\s*[.,)}\\]]|\\s+as\\b)`).test(withoutStrings(text));

/** The identifiers in a story's `render` property, so args or data it merely spreads don't count. */
const renderIds = (story: Declaration) =>
  identifiers(/^ {2}render:[\s\S]*?(?=\n {0,2}\S|(?![\s\S]))/m.exec(story.body)?.[0] ?? '');

/** Stories that need a `VisualTest` block but have none. */
const missingStories = (source: string): string[] => {
  const decls = declarations(source);
  const byName = new Map(decls.map((decl) => [decl.name, decl]));
  const helpers = decls.filter((decl) => !decl.isStory);

  // The composites' text plus every non-story helper they reach, so a block list kept in a
  // separate constant counts too.
  const seen = new Set(COMPOSITES);
  const queue = COMPOSITES.flatMap((name) => byName.get(name) ?? []);
  let reached = '';
  while (queue.length) {
    const decl = queue.shift()!;
    reached += decl.body;
    identifiers(decl.body).forEach((id) => {
      const next = byName.get(id);
      if (next && !next.isStory && !seen.has(id)) {
        seen.add(id);
        queue.push(next);
      }
    });
  }
  const reachedIds = identifiers(reached);

  const stories = decls.filter((decl) => decl.isStory && !COMPOSITES.includes(decl.name));
  // A render helper used by exactly one story is that story's markup. Args or data shared
  // through a helper (`{ ...meta.args }`) don't count.
  const ownTemplate = (story: Declaration) =>
    helpers.some(
      (helper) =>
        renderIds(story).has(helper.name) &&
        reachedIds.has(helper.name) &&
        stories.filter((other) => identifiers(other.body).has(helper.name)).length === 1
    );

  return stories
    .filter(
      (story) =>
        !/disableSnapshot:\s*false/.test(story.body) &&
        !/visualTest:\s*false/.test(story.body) &&
        !/["']!dev["']/.test(story.body)
    )
    .filter((story) => !referencesStory(reached, story.name) && !ownTemplate(story))
    .map((story) => story.name);
};

/** The `VisualTest` declaration's parameters use the shared widths. */
const usesBothWidths = (source: string): boolean =>
  declarations(source).some(
    (decl) => decl.name === 'VisualTest' && /viewports:\s*VISUAL_TEST_VIEWPORTS\b/.test(decl.body)
  );

describe('VisualTest coverage', () => {
  const files = storyFiles().filter((file) => /^export const VisualTest\b/m.test(readFileSync(file, 'utf8')));

  it('finds the composites', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files.map((file) => [relative(ROOT, file), file]))(
    '%s renders every docs story in VisualTest',
    (_name, file) => {
      expect(missingStories(readFileSync(file, 'utf8'))).toEqual([]);
    }
  );

  it.each(files.map((file) => [relative(ROOT, file), file]))(
    '%s snapshots VisualTest at both widths',
    (_name, file) => {
      expect(usesBothWidths(readFileSync(file, 'utf8'))).toBe(true);
    }
  );
});

describe('missingStories', () => {
  it('ignores story names inside label text', () => {
    const source = `
const meta = { args: {} };
export const Default: Story = { args: {} };
export const Disabled: Story = { args: { disabled: true } };
export const VisualTest: Story = {
  render: () => <VisualTestStory label="Default, Disabled, enabled" story={Default} />,
};
`;
    expect(missingStories(source)).toEqual(['Disabled']);
  });

  it("does not treat shared args as a story's template", () => {
    const source = `
const meta = { args: { children: 'Nupp' } };
export const Default: Story = {};
export const NewVariant: Story = { args: { ...meta.args, disabled: true } };
export const VisualTest: Story = {
  render: () => <VisualTestStory story={Default} props={meta.args} />,
};
`;
    expect(missingStories(source)).toEqual(['NewVariant']);
  });
});
