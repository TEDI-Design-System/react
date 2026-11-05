// Per-component prop contracts from dist's declarations. Each component gets its own
// `<Name>Props` with every prop in source spelling and its JSDoc, followed by the
// declarations of the types those props name, one level deep. Props inherited from
// @types/react (HTML attributes) are summarised in one line rather than listed.
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const PRINT = ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseFullyQualifiedType;

export function createTypeReader(entryDts) {
  const program = ts.createProgram([entryDts], {
    noEmit: true,
    skipLibCheck: true,
    jsx: ts.JsxEmit.ReactJSX,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  });
  const checker = program.getTypeChecker();
  const entry = program.getSourceFile(entryDts);
  // Type-checking the entry up front resolves the generic constraints the queries below
  // rely on; querying first crashes the checker on `ButtonProps<C>`.
  program.getSemanticDiagnostics(entry);
  const moduleSymbol = checker.getSymbolAtLocation(entry);
  const exports = new Map(checker.getExportsOfModule(moduleSymbol).map((s) => [s.name, s]));
  const resolve = (symbol) => (symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol);
  const inNodeModules = (node) => node.getSourceFile().fileName.includes('/node_modules/');

  // Named types declared in the library (not React, not the DOM), for the "referenced" section.
  function libraryDeclaration(name, from) {
    const symbol = checker.resolveName(name, from, ts.SymbolFlags.Type, false) ?? exports.get(name);
    const decl = symbol && resolve(symbol).declarations?.[0];
    if (!decl || inNodeModules(decl)) return null;
    if (!ts.isInterfaceDeclaration(decl) && !ts.isTypeAliasDeclaration(decl) && !ts.isEnumDeclaration(decl))
      return null;
    return decl;
  }

  function propsDeclaration(name) {
    const props = exports.get(`${name}Props`);
    if (props) {
      const symbol = resolve(props);
      const node = symbol.declarations?.[0];
      return node ? { type: checker.getDeclaredTypeOfSymbol(symbol), node } : null;
    }
    // No exported Props type: fall back to the component's first parameter.
    const component = exports.get(name);
    const decl = component && resolve(component).declarations?.[0];
    if (!decl) return null;
    const type = checker.getTypeOfSymbolAtLocation(resolve(component), decl);
    const param = type.getCallSignatures()[0]?.getParameters()[0];
    return param ? { type: checker.getTypeOfSymbolAtLocation(param, decl), node: decl } : null;
  }

  // Exports tagged `@deprecated`, with the tag's text (it names the replacement).
  propsFor.deprecated = (names) =>
    names.flatMap((name) => {
      const symbol = exports.get(name);
      const tag =
        symbol &&
        resolve(symbol)
          .getJsDocTags(checker)
          .find((t) => t.name === 'deprecated');
      return tag ? [{ name, text: ts.displayPartsToString(tag.text).replace(/\s+/g, ' ').trim() }] : [];
    });

  return propsFor;

  function propsFor(name, storiesPath, version) {
    const found = propsDeclaration(name);
    const header = [
      "import * as React from 'react';",
      '',
      '/**',
      ` * ${name} from @tedi-design-system/react@${version} (stories: ./${storiesPath}).`,
      ' */',
    ];
    if (!found) return [...header, `export type ${name}Props = Record<string, unknown>;`, ''].join('\n');

    const { node, type } = found;
    const typeParams = node.typeParameters ? `<${node.typeParameters.map((p) => p.getText()).join(', ')}>` : '';
    const lines = [];
    const referenced = new Set();
    let inherited = 0;
    for (const prop of checker.getPropertiesOfType(type)) {
      const decl = prop.valueDeclaration ?? prop.declarations?.[0];
      if (decl && inNodeModules(decl)) {
        inherited++;
        continue;
      }
      const doc = ts.displayPartsToString(prop.getDocumentationComment(checker)).replace(/\s+/g, ' ').trim();
      const text =
        decl?.type?.getText() ?? checker.typeToString(checker.getTypeOfSymbolAtLocation(prop, node), node, PRINT);
      if (doc) lines.push(`  /** ${doc.replace(/\*\//g, '*\\/')} */`);
      lines.push(
        `  ${/^[A-Za-z_$][\w$]*$/.test(prop.name) ? prop.name : JSON.stringify(prop.name)}${
          prop.flags & ts.SymbolFlags.Optional ? '?' : ''
        }: ${text.replace(/\s+/g, ' ')};`
      );
      for (const id of text.match(/\b[A-Z][A-Za-z0-9_]*\b/g) ?? []) referenced.add(id);
    }
    const out = [...header, `export interface ${name}Props${typeParams} {`, ...lines, '}'];
    if (inherited) out.push(`// Also accepts ${inherited} standard React / HTML attributes of its root element.`);

    const seen = new Set([`${name}Props`, ...(node.typeParameters ?? []).map((p) => p.name.text)]);
    const decls = [];
    for (const id of referenced) {
      if (seen.has(id)) continue;
      seen.add(id);
      const decl = libraryDeclaration(id, node);
      if (decl) decls.push(decl.getText().replace(/^export\s+(declare\s+)?/, ''));
    }
    if (decls.length)
      out.push('', '// Referenced types, resolved one level deep (see the story source for the rest).', ...decls);
    return out.join('\n') + '\n';
  }
}

// package.json's export paths are relative to dist/, the directory that gets published.
export function typesEntry(repoRoot) {
  const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
  return path.join(repoRoot, 'dist', pkg.exports['./tedi'].types);
}
