// The `general-*` and `form-*` slice of the semantic tier. We summarise it by
// role family rather than listing members with their values: values live in
// core's tokens.json, which ships to consumers and carries the dark-theme and
// per-breakpoint overrides this default-theme view cannot show. Printing
// `resolved` values here also handed readers a literal `rgb(...)` for every
// role, which is the opposite of what a token doc is for.
const ROLE_PREFIXES = ['general-', 'form-'];

export function tokenFamilies(tokens) {
  const semantic = tokens.themes?.default?.semantic ?? {};
  const names = Object.keys(semantic)
    .filter((name) => ROLE_PREFIXES.some((prefix) => name.startsWith(prefix)))
    .sort((a, b) => a.localeCompare(b));
  const families = new Map();
  for (const name of names) {
    const family = name.split('-').slice(0, 2).join('-');
    if (!families.has(family)) families.set(family, []);
    families.get(family).push(name);
  }
  return families;
}

export function renderTokenTable(tokens) {
  const rows = [...tokenFamilies(tokens)]
    .map(([family, names]) => `| \`${family}-*\` | ${names.length} | \`${names.slice(0, 2).join('`, `')}\` |`)
    .join('\n');
  return `| Role family | Tokens | Example members |\n| --- | --- | --- |\n${rows}`;
}
