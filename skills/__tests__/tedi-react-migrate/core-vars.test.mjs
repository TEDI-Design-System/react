import assert from 'node:assert/strict';
import { join } from 'node:path';
import { describe, test } from 'node:test';

import { SCRIPTS } from './helpers.mjs';

const { compareDeclarations, declarations, scan } = await import(join(SCRIPTS, 'core-vars.mjs'));

const decls = (text, scss = false) => {
  const out = [];
  scan(text, (name, value, context) => out.push([name, value, context]), scss);
  return out;
};
const css = (text) => declarations([{ name: 'index.css', text }]);
const compare = (before, after) => compareDeclarations(css(before), css(after));

describe('scan', () => {
  test('reads minified CSS with the selector context of each declaration', () => {
    assert.deepEqual(decls(':root{--a:1px;--b:red}.dark{--a:2px}'), [
      ['--a', '1px', ':root'],
      ['--b', 'red', ':root'],
      ['--a', '2px', '.dark'],
    ]);
  });

  test('keeps semicolons and comment markers inside strings and url()', () => {
    assert.deepEqual(decls(':root{--font:"a;b /* c */";--img:url(data:x;y)}'), [
      ['--font', '"a;b /* c */"', ':root'],
      ['--img', 'url(data:x;y)', ':root'],
    ]);
  });

  test('drops comments; `//` is a comment only in SCSS and not inside url()', () => {
    assert.deepEqual(decls('/* x */ $a: 1px; // note\n$b: url(https://example.com/x.svg);', true), [
      ['$a', '1px', ''],
      ['$b', 'url(https://example.com/x.svg)', ''],
    ]);
  });

  test('keeps SCSS interpolation in the value', () => {
    assert.deepEqual(decls(':root{--w:#{$size}px}', true), [['--w', '#{$size}px', ':root']]);
  });
});

describe('compareDeclarations', () => {
  test('reports removed and added tokens', () => {
    const { removed, added } = compare(':root{--a:1;--b:2}', ':root{--a:1;--c:3}');
    assert.deepEqual(removed, ['--b']);
    assert.deepEqual(added, ['--c']);
  });

  test('a changed default in the same context is a change', () => {
    const { changed } = compare(':root{--a:1px}', ':root{--a:2px}');
    assert.deepEqual(
      changed.map((c) => c.name),
      ['--a']
    );
  });

  test('swapped light and dark values are a change', () => {
    const { changed } = compare(':root{--a:white}.dark{--a:black}', ':root{--a:black}.dark{--a:white}');
    assert.deepEqual(
      changed.map((c) => c.name),
      ['--a']
    );
  });

  test('a selector rewrite with the same value is not a change', () => {
    const { changed } = compare(':root{--a:1px}', ':root,:host{--a:1px}');
    assert.deepEqual(changed, []);
  });

  test('an added theme override is a change', () => {
    const { changed } = compare(':root{--a:1px}', ':root{--a:1px}.dark{--a:2px}');
    assert.deepEqual(
      changed.map((c) => c.name),
      ['--a']
    );
  });

  test('an SCSS `!default` assignment does not override the value before it', () => {
    const scss = (text) => declarations([{ name: '_vars.scss', text }]);
    const { changed } = compareDeclarations(scss('$a: 1px; $a: 9px !default;'), scss('$a: 1px; $a: 8px !default;'));
    assert.deepEqual(changed, []);
  });

  test('suggests the --tedi- prefix rename and ignores references that only follow it', () => {
    const { renamedCandidates, changed } = compare(
      ':root{--primary-600:blue;--link:var(--primary-600)}',
      ':root{--tedi-primary-600:blue;--link:var(--tedi-primary-600)}'
    );
    assert.deepEqual(renamedCandidates, [
      {
        from: '--primary-600',
        candidates: [{ to: '--tedi-primary-600', basis: 'prefix --tedi-' }],
      },
    ]);
    assert.deepEqual(changed, []);
  });

  test('falls back to a same-value candidate when no name rule matches', () => {
    const { renamedCandidates, removedOnly } = compare(':root{--old:#123456;--gone:1px}', ':root{--new:#123456}');
    assert.deepEqual(renamedCandidates, [{ from: '--old', candidates: [{ to: '--new', basis: 'same value' }] }]);
    assert.deepEqual(removedOnly, [{ name: '--gone', kind: 'css' }]);
  });
});
