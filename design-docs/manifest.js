// Parse the src/tedi barrel into component skeleton rows.
export function parseBarrel(src) {
  const rows = [];
  const re = /from\s+'(\.\/components\/([a-z0-9-]+)\/[^']+)'/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const rel = m[1].replace('./', 'src/tedi/');
    const category = m[2];
    const id = m[1].replace('./components/', '');
    rows.push({ id, category, sourcePath: rel, status: [] });
  }
  return rows;
}

// Extract Storybook status badge names from a stories file's source.
export function extractStatus(storySrc) {
  const block = /status\s*:\s*\{\s*type\s*:\s*\[([\s\S]*?)\]/.exec(storySrc);
  if (!block) return [];
  const names = [];
  const nameRe = /name\s*:\s*'([^']+)'/g;
  let m;
  while ((m = nameRe.exec(block[1])) !== null) names.push(m[1]);
  return names;
}

// Merge fresh derived rows onto existing manifest, preserving human-authored fields.
export function mergeManifest(existing, fresh) {
  const byId = new Map(existing.map((c) => [c.id, c]));
  return fresh.map((row) => {
    const prev = byId.get(row.id) ?? {};
    return {
      id: row.id,
      name: prev.name ?? null, // canonical export name — filled by the skill
      category: row.category, // derived (refreshed)
      sourcePath: row.sourcePath, // derived (refreshed)
      status: row.status, // derived (refreshed)
      description: prev.description ?? null, // human/skill-authored (preserved)
      keyProps: prev.keyProps ?? [], // human/skill-authored (preserved)
    };
  });
}
