// Renders one CSF story outside Storybook, the way Storybook would: meta args under story
// args, argTypes mappings applied, story decorators inside meta decorators, and the
// story's globals (theme, backgrounds) on the context. Bundled into every preview module.
import * as React from 'react';

type Csf = Record<string, any>;

export function compose(
  stories: Csf,
  key: string,
  globalDefaults: Record<string, unknown>,
  backgrounds: Record<string, string>
) {
  const meta = stories.default ?? {};
  const story = stories[key];
  const args = { ...(meta.args ?? {}), ...(story?.args ?? {}) };
  const argTypes = { ...(meta.argTypes ?? {}), ...(story?.argTypes ?? {}) };
  for (const name of Object.keys(args)) {
    const mapping = argTypes[name]?.mapping;
    if (mapping && typeof mapping === 'object' && args[name] in mapping) args[name] = mapping[args[name]];
  }
  const title = typeof meta.title === 'string' ? meta.title : '';
  const context = {
    args,
    name: key,
    title,
    kind: title,
    id: '',
    componentId: '',
    globals: { ...globalDefaults, ...(meta.globals ?? {}), ...(story?.globals ?? {}) },
    viewMode: 'story',
    parameters: { ...(meta.parameters ?? {}), ...(story?.parameters ?? {}) },
  };

  let render: (() => React.ReactNode) | null = null;
  if (typeof story?.render === 'function') render = () => story.render(args, context);
  else if (typeof story === 'function') render = () => story(args, context);
  else if (typeof meta.render === 'function') render = () => meta.render(args, context);
  else {
    const Component = story?.component ?? meta.component;
    if (Component) render = () => React.createElement(Component, args);
  }
  if (!render) return () => null;

  // A decorator that returns undefined (an addon we stub out) falls through to the story.
  const decorators: any[] = ([] as any[]).concat(story?.decorators ?? []).concat(meta.decorators ?? []);
  const decorated = decorators.reduce(
    (inner: () => React.ReactNode, decorator: any) => () => decorator(inner, context) ?? inner(),
    render
  );

  // Storybook paints a story's background on the canvas; the preview paints it on a wrapper.
  const background = backgrounds[(context.globals as any).backgrounds?.value];
  const Story = () => <>{decorated()}</>;
  if (!background) return Story;
  return () => (
    <div style={{ background }}>
      <Story />
    </div>
  );
}
