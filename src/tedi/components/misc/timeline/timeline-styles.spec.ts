import { execFileSync } from 'child_process';
import path from 'path';

// jsdom does not evaluate media queries, so the queries are checked on the compiled stylesheet. The sass CLI runs in a
// child process, because the sass library does not work inside Jest's jsdom environment.
const root = path.resolve(__dirname, '../../../../..');
const compile = (file: string): string =>
  execFileSync(
    path.join(root, 'node_modules/.bin/sass'),
    ['--quiet', '--no-source-map', `--load-path=${path.join(root, 'node_modules')}`, path.resolve(root, file)],
    { encoding: 'utf8' }
  );

describe('Timeline styles', () => {
  const css = compile('src/tedi/components/misc/timeline/timeline.module.scss');

  it('shows the bottom timings in exactly one place at every width', () => {
    // One query switches both copies, so there is no width at which both or neither apply.
    const inside = /\.tedi-timeline__timings > \.tedi-timeline__timings-bottom \{\s*display: none;/.exec(css);
    expect(inside).not.toBeNull();
    expect(css).toMatch(
      /@media \(min-width: 62rem\) \{\s*\.tedi-timeline__timings > \.tedi-timeline__timings-bottom \{\s*display: block;/
    );
    expect(css).toMatch(
      /@media \(min-width: 62rem\) \{\s*\.tedi-timeline-item > \.tedi-timeline__timings-bottom \{\s*display: none;/
    );
  });
});

describe('Responsive component styles', () => {
  it.each([
    'src/tedi/components/misc/timeline/timeline.module.scss',
    'src/tedi/components/misc/attachment/attachment.module.scss',
    'src/tedi/components/form/file-upload/file-upload.module.scss',
    'src/tedi/components/buttons/button-group/button-group.module.scss',
  ])('%s has no max-width media query, which would leave a gap next to a min-width one', (file) => {
    expect(compile(file)).not.toMatch(/@media[^{]*max-width/);
  });
});
