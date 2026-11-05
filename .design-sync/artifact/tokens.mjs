// tokens.json for the Design System artifact, refreshed from the compiled stylesheet, and
// the tokens.css the artifact page would compile from it. A refresh keeps every token's
// usage note and order: values that changed are updated, tokens the build adds are
// appended, and tokens the build no longer defines are reported and left in place.

const FAMILIES = ['spacing', 'radius', 'borders', 'containers', 'zIndex'];
const SCALE_PREFIX = {
  spacing: 'tedi-dimensions-',
  radius: 'tedi-radius-',
  borders: 'tedi-borders-',
  containers: 'tedi-containers-',
  zIndex: 'z-index-',
};
const COLOR_PREFIX = /^(tedi-(accent|alpha|blue|green|neutral|orange|primary|red|yellow)-|general-)/;

function declarations(css, selector) {
  const out = {};
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  for (const m of css.matchAll(new RegExp(`(?:^|\\})${escaped}\\{([^{}]*)\\}`, 'g'))) {
    for (const d of m[1].split(';')) {
      const i = d.indexOf(':');
      if (i > 0) out[d.slice(0, i).trim().replace(/^--/, '')] = d.slice(i + 1).trim();
    }
  }
  return out;
}

// CSS value -> tokens.json form: var(--x) becomes the alias {x}; minified alphas get their 0 back.
function normalise(value) {
  const alias = /^var\(--([A-Za-z0-9_.-]+)\)$/.exec(value);
  return alias ? `{${alias[1]}}` : value.replace(/(?<![\d.])\.(\d)/g, '0.$1');
}

export function refreshTokens(tokens, css) {
  const t = structuredClone(tokens);
  const base = { ...declarations(css, ':root,:host'), ...declarations(css, ':root') };
  const light = { ...base, ...declarations(css, '.tedi-theme--default,:root,:host') };
  const dark = declarations(css, '.tedi-theme--dark');
  const report = { changed: [], added: [], notInBuild: [] };

  const isColor = (value) => {
    const alias = /^\{(.+)\}$/.exec(normalise(value));
    if (alias) return alias[1] in light && isColor(light[alias[1]]);
    return /^(#|rgba?\(|hsla?\()/.test(value);
  };
  const colorValue = (name) => {
    const l = normalise(light[name]);
    const d = name in dark ? normalise(dark[name]) : null;
    return d !== null && d !== l ? { default: l, dark: d } : l;
  };

  const seen = new Set();
  for (const token of t.color.tokens) {
    seen.add(token.name);
    if (!(token.name in light)) {
      report.notInBuild.push(token.name);
      continue;
    }
    let value = colorValue(token.name);
    // A token that was themed stays themed even when both themes now agree.
    if (typeof token.value === 'object' && typeof value === 'string') value = { default: value, dark: value };
    if (JSON.stringify(value) !== JSON.stringify(token.value)) {
      report.changed.push({ name: token.name, from: token.value, to: value });
      token.value = value;
    }
  }
  for (const [name, value] of Object.entries(light)) {
    if (COLOR_PREFIX.test(name) && !seen.has(name) && isColor(value)) {
      t.color.tokens.push({ name, value: colorValue(name), usage: 'TODO: where this colour is used.' });
      report.added.push(name);
    }
  }
  for (const family of FAMILIES) {
    const names = new Set();
    for (const token of t[family].tokens) {
      names.add(token.name);
      if (!(token.name in base)) report.notInBuild.push(token.name);
      else if (normalise(base[token.name]) !== token.value) {
        report.changed.push({ name: token.name, from: token.value, to: normalise(base[token.name]) });
        token.value = normalise(base[token.name]);
      }
    }
    for (const [name, value] of Object.entries(base)) {
      if (name.startsWith(SCALE_PREFIX[family]) && !names.has(name)) {
        t[family].tokens.push({ name, value: normalise(value), usage: 'TODO: where this step is used.' });
        report.added.push(name);
      }
    }
  }
  return { tokens: t, report };
}

export function tokenNames(tokens) {
  const names = new Set(
    Object.values(tokens).flatMap((v) => (v && Array.isArray(v.tokens) ? v.tokens.map((t) => t.name) : []))
  );
  for (const key of Object.keys(tokens.type.families)) names.add(`font-${key}`);
  return names;
}

const cssValue = (v) => {
  const alias = /^\{(.+)\}$/.exec(v);
  return alias ? `var(--${alias[1]})` : v;
};

// Laid out as the artifact type's format.md describes "tokens.css as compiled".
export function tokensCss(t) {
  const [first, ...rest] = t.color.themes.map((theme) => theme.id);
  const out = [`/* ${t.name} — generated from tokens.json */`, `:root, [data-theme="${first}"] {`];
  for (const { name, value } of t.color.tokens)
    out.push(`  --${name}: ${cssValue(typeof value === 'object' ? value[first] : value)};`);
  out.push('}');
  for (const theme of rest) {
    out.push(`[data-theme="${theme}"] {`);
    for (const { name, value } of t.color.tokens) {
      if (typeof value === 'object') out.push(`  --${name}: ${cssValue(value[theme] ?? value[first])};`);
      else if (value.startsWith('{')) out.push(`  --${name}: ${cssValue(value)};`);
    }
    out.push('}');
  }
  out.push(':root {');
  for (const family of FAMILIES)
    for (const { name, value } of t[family]?.tokens ?? []) out.push(`  --${name}: ${value};`);
  for (const [key, stack] of Object.entries(t.type.families)) out.push(`  --font-${key}: ${stack};`);
  out.push('}');
  for (const group of t.type.groups) {
    for (const s of group.styles) {
      out.push(
        `.${s.name} { font-family: var(--font-${s.family ?? group.family}); font-size: ${s.fontSize}; line-height: ${
          s.lineHeight
        }; font-weight: ${s.fontWeight}; }`
      );
    }
  }
  for (const f of t.type.fonts) {
    out.push(
      `@font-face { font-family: "${f.family}"; src: url("${f.file}") format("woff2"); font-weight: ${f.weight}; font-style: ${f.style}; font-display: swap; }`
    );
  }
  return out.join('\n') + '\n';
}
