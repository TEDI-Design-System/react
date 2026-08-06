// Extract the brace-balanced body of every `${selector}{ ... }` rule (minified-safe).
export function extractAllRuleBodies(css, selector) {
  const needle = `${selector}{`;
  const bodies = [];
  let from = 0;
  for (;;) {
    const start = css.indexOf(needle, from);
    if (start === -1) break;
    const open = start + needle.length - 1; // index of '{'
    let depth = 0;
    let end = -1;
    for (let i = open; i < css.length; i++) {
      if (css[i] === '{') depth++;
      else if (css[i] === '}') {
        depth--;
        if (depth === 0) { end = i; break; }
      }
    }
    if (end === -1) break;
    bodies.push(css.slice(open + 1, end));
    from = end + 1;
  }
  return bodies;
}

// Parse `--name: value` declarations, splitting on top-level `;` (ignores `;` inside parens).
export function parseDeclarations(body) {
  const map = new Map();
  let depth = 0;
  let buf = '';
  const flush = () => {
    const idx = buf.indexOf(':');
    if (idx !== -1) {
      const name = buf.slice(0, idx).trim();
      const value = buf.slice(idx + 1).trim();
      if (name.startsWith('--')) map.set(name, value);
    }
    buf = '';
  };
  for (const ch of body) {
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    if (ch === ';' && depth === 0) flush();
    else buf += ch;
  }
  if (buf.trim()) flush();
  return map;
}

// Resolve a value, following var(--x) chains until a literal. Guards cycles/missing refs.
export function resolveValue(value, map, seen = new Set()) {
  const m = /^var\(\s*(--[A-Za-z0-9-]+)\s*(?:,[^)]*)?\)$/.exec(value.trim());
  if (!m) return value.trim();
  const ref = m[1];
  if (seen.has(ref) || !map.has(ref)) return value.trim();
  seen.add(ref);
  return resolveValue(map.get(ref), map, seen);
}

// Tier a custom property by name.
export function tierOf(name) {
  if (name.startsWith('--tedi-')) return 'primitive';
  if (name.startsWith('--general-') || name.startsWith('--form-')) return 'semantic';
  return 'component';
}

function mergeMaps(maps) {
  const out = new Map();
  for (const m of maps) for (const [k, v] of m) out.set(k, v);
  return out;
}

function group(names, resolveMap) {
  const out = { primitive: {}, semantic: {}, component: {} };
  for (const name of names) {
    const key = name.replace(/^--/, '');
    out[tierOf(name)][key] = {
      value: resolveMap.get(name),
      resolved: resolveValue(resolveMap.get(name), resolveMap),
    };
  }
  return out;
}

// Build tiered, resolved tokens for default (all :root bodies) + dark (override subset).
export function buildTokens(css, { version } = {}) {
  const defaultMap = mergeMaps(extractAllRuleBodies(css, ':root').map(parseDeclarations));
  const darkOverride = mergeMaps(
    extractAllRuleBodies(css, '.tedi-theme--dark').map(parseDeclarations)
  );
  const darkMap = new Map([...defaultMap, ...darkOverride]); // base + overrides, for resolution
  return {
    version: version ?? null,
    themes: {
      default: group([...defaultMap.keys()], defaultMap),
      dark: group([...darkOverride.keys()], darkMap), // only the tokens dark actually overrides
    },
  };
}
