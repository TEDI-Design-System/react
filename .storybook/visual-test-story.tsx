import { cloneElement, createElement, isValidElement, type JSXElementConstructor, type ReactNode } from 'react';

/**
 * Chromatic widths for every `VisualTest`: 375 for the mobile tokens and layouts below the
 * breakpoints, 1200 (Chromatic's default) for desktop.
 */
export const VISUAL_TEST_VIEWPORTS = [375, 1200];

/**
 * The parts of a docs story (`StoryObj`) that a `VisualTest` block needs. `never` parameters accept
 * any story's `render`, whatever its args type.
 */
export interface VisualTestStoryInput {
  args?: object;
  render?: (args: never, context: never) => ReactNode;
}

export interface VisualTestStoryProps {
  /** Docs story to render inside a `VisualTest` composite. */
  story: VisualTestStoryInput;
  /** Rendered with the story's args when the story has no `render`, like the meta's `component`. */
  component?: JSXElementConstructor<never>;
  /**
   * Props merged onto the element the story renders, e.g. a unique `aria-label` for a landmark that
   * the docs stories repeat. With `component`, they are merged into the args instead.
   */
  props?: object;
}

/**
 * Renders a docs story as one block of a `VisualTest` story, so the block follows later changes to
 * the docs story. Being a component, it gives a `render` that uses hooks its own hook scope.
 *
 * A story without `render` falls back to `component`. Without either it throws, so the test-runner
 * fails instead of Chromatic snapshotting an empty block.
 */
export const VisualTestStory = ({ story, component, props }: VisualTestStoryProps) => {
  const args = { ...story.args };

  if (story.render) {
    const node = story.render(args as never, {} as never);

    if (!props) {
      return <>{node}</>;
    }

    if (!isValidElement(node)) {
      throw new Error('VisualTestStory: `props` needs a story whose `render` returns a single element.');
    }

    return cloneElement(node, props);
  }

  if (component) {
    return createElement(component as JSXElementConstructor<object>, { ...args, ...props });
  }

  throw new Error('VisualTestStory: the story has no `render`; pass the `component` to render its args with.');
};
