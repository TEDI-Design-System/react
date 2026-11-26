// Core's CSS custom properties and SCSS variables: reading them from stylesheets and comparing two
// versions. No I/O; diff-core-vars.mjs fetches the files.

export const norm = (v) => v.trim().replace(/\s+/g, ' ');

/**
 * Declarations of a stylesheet with their context (enclosing selectors and at-rules), so a token whose
 * light and dark defaults swap still counts as changed. A declaration ends at `;` or at the `}` that
 * closes its block (core ships minified CSS). Strings, parentheses and SCSS `#{}` are skipped over.
 * Comments are dropped as they are met, so comment markers inside strings stay text; `//` is a
 * comment only in SCSS, and not inside `url(...)`.
 */
export function scan(text, onDecl, scss) {
  const src = text;
  const stack = [];
  let buf = '';
  let paren = 0;
  let urlParen = 0; // paren depth of an open url(...), 0 when none
  let quote = null;
  const flush = () => {
    const m = buf.match(/^\s*((?:--|\$)[A-Za-z0-9_-]+)\s*:\s*([\s\S]+?)\s*$/);
    if (m) onDecl(m[1], m[2], stack.join(' > '));
    buf = '';
  };
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (quote) {
      if (c === '\\') buf += c + (src[++i] ?? '');
      else {
        if (c === quote) quote = null;
        buf += c;
      }
      continue;
    }
    if (c === '/' && src[i + 1] === '*') {
      const end = src.indexOf('*/', i + 2);
      i = end < 0 ? src.length : end + 1;
      continue;
    }
    if (scss && !urlParen && c === '/' && src[i + 1] === '/') {
      const end = src.indexOf('\n', i);
      i = end < 0 ? src.length : end - 1;
      continue;
    }
    if (c === '"' || c === "'") quote = c;
    else if (c === '(') {
      paren++;
      if (!urlParen && /url\s*$/i.test(buf)) urlParen = paren;
    } else if (c === ')') {
      if (urlParen === paren) urlParen = 0;
      paren = Math.max(0, paren - 1);
    } else if (c === '#' && src[i + 1] === '{') {
      const end = src.indexOf('}', i);
      buf += src.slice(i, end < 0 ? undefined : end + 1);
      i = end < 0 ? src.length : end;
      continue;
    } else if (!paren && c === ';') {
      flush();
      continue;
    } else if (!paren && c === '{') {
      stack.push(norm(buf));
      buf = '';
      continue;
    } else if (!paren && c === '}') {
      flush();
      stack.pop();
      continue;
    }
    buf += c;
  }
  flush();
}

/**
 * All declarations of a set of stylesheets (`[{ name, text }]`):
 * name -> { kind, values: Set, byContext: Map<context, value[]>, files: Set }.
 */
export function declarations(files) {
  const vars = new Map();
  for (const { name, text } of files) {
    scan(
      text,
      (n, value, context) => {
        const kind = n.startsWith('$') ? 'scss' : 'css';
        if (kind === 'scss' && context) return; // only top-level SCSS variables are API
        if (!vars.has(n))
          vars.set(n, {
            kind,
            values: new Set(),
            byContext: new Map(),
            files: new Set(),
          });
        const v = vars.get(n);
        v.values.add(norm(value));
        if (!v.byContext.has(context)) v.byContext.set(context, []);
        v.byContext.get(context).push(norm(value)); // in order: the last one wins
        v.files.add(name);
      },
      name.endsWith('.scss')
    );
  }
  return vars;
}

const sameSet = (a, b) => a.size === b.size && [...a].every((v) => b.has(v));
// Compare per context where both versions declare the token in the same context. The contexts only one
// side has (an added or dropped theme override, or a selector core rewrote, such as `:root` becoming
// `:root,:host`) are compared by their pooled values, so a rewritten selector alone is not a change.
// Within one context the last declaration wins (`!default` SCSS assignments never override).
const effective = (list) => list.findLast((v) => !/!default\s*$/.test(v)) ?? list[0];
const differs = (a, b) => {
  const shared = [...a.byContext.keys()].filter((c) => b.byContext.has(c));
  if (!shared.length) return !sameSet(a.values, b.values);
  if (shared.some((c) => effective(a.byContext.get(c)) !== effective(b.byContext.get(c)))) return true;
  const rest = (v) =>
    new Set([...v.byContext].filter(([c]) => !shared.includes(c)).flatMap(([, values]) => [...values]));
  return !sameSet(rest(a), rest(b));
};
const describe = (v) =>
  [...v.byContext.values()].some((values) => !sameSet(new Set(values), v.values))
    ? Object.fromEntries([...v.byContext].map(([c, values]) => [c || '(top)', [...values]]))
    : [...v.values];

// Rename candidates for each removed name: by name first (core 6 added the --tedi- prefix to base
// tokens; later releases renamed active/inactive to selected/unselected, split tokens into -default /
// state variants, spelled out -bg), then by identical value.
const NAME_RULES = [
  ['prefix --tedi-', (n) => n.replace(/^--(?!tedi-)/, '--tedi-')],
  ['inactive -> unselected', (n) => n.replace(/-inactive(?=-|$)/, '-unselected')],
  ['active -> selected', (n) => n.replace(/-active(?=-|$)/, '-selected')],
  ['bg -> background', (n) => n.replace(/-bg(?=-|$)/, '-background')],
  ['toggl -> toggle', (n) => n.replace(/-toggl-/, '-toggle-')],
];

/** What changed between two `declarations()` maps. */
export function compareDeclarations(before, after) {
  const removed = [...before.keys()].filter((n) => !after.has(n));
  const added = [...after.keys()].filter((n) => !before.has(n));
  const addedSet = new Set(added);
  const addedByValue = new Map();
  for (const n of added)
    for (const v of after.get(n).values) {
      const key = `${after.get(n).kind}|${v}`;
      addedByValue.set(key, [...(addedByValue.get(key) ?? []), n]);
    }
  const candidatesOf = (n) => {
    const out = [];
    for (const [basis, rule] of NAME_RULES) {
      const c = rule(n);
      if (c !== n && addedSet.has(c)) out.push({ to: c, basis });
    }
    const split = added.filter((a) => a.startsWith(`${n}-`));
    if (split.length && split.length <= 6) for (const c of split) out.push({ to: c, basis: 'split into variants' });
    if (!out.length) {
      const byValue = new Set();
      for (const v of before.get(n).values)
        for (const c of addedByValue.get(`${before.get(n).kind}|${v}`) ?? []) byValue.add(c);
      if (byValue.size && byValue.size <= 5) for (const c of byValue) out.push({ to: c, basis: 'same value' });
    }
    return out;
  };
  const renamedCandidates = [];
  const removedOnly = [];
  for (const n of removed) {
    const candidates = candidatesOf(n);
    if (candidates.length) renamedCandidates.push({ from: n, candidates });
    else removedOnly.push({ name: n, kind: before.get(n).kind });
  }

  // A default that only follows a renamed reference (`var(--primary-600)` → `var(--tedi-primary-600)`)
  // has not changed: map the old values through the unambiguous renames before comparing.
  const renameTo = new Map(
    renamedCandidates.filter((r) => r.candidates.length === 1).map((r) => [r.from, r.candidates[0].to])
  );
  const renamed = (value) =>
    value.replace(/var\(\s*(--[A-Za-z0-9_-]+)/g, (m, n) => (renameTo.has(n) ? `var(${renameTo.get(n)}` : m));
  const withRenames = (v) => ({
    ...v,
    values: new Set([...v.values].map(renamed)),
    byContext: new Map([...v.byContext].map(([c, values]) => [c, values.map(renamed)])),
  });
  const changed = [...before.keys()]
    .filter((n) => after.has(n) && differs(withRenames(before.get(n)), after.get(n)))
    .map((n) => ({
      name: n,
      before: describe(before.get(n)),
      after: describe(after.get(n)),
    }));
  return { removed, added, removedOnly, renamedCandidates, changed };
}
