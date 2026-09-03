// Emits release info (versions + publish timestamps) for the GitHub Pages landing page.
// Usage: node pages-release-info.mjs "<framework>" "<npm-package>"
//   e.g. node pages-release-info.mjs "Angular" "@tedi-design-system/angular"
// Output (stdout): {"framework","npmPackage","main":{"version","updated"},"rc":{"version","updated"}}
// npmPackage is used by the page to re-fetch live versions at runtime (build-time values are the fallback).
//
// Versions come from the npm dist-tags `latest` (Main) and `rc` (Release candidate).
// "updated" is each version's npm publish time, formatted as DD.MM.YYYY HH:MM in Europe/Tallinn.
import { execSync } from "node:child_process";

const [, , framework = "", pkg = ""] = process.argv;

function sh(cmd) {
  try {
    return execSync(cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return "";
  }
}

function formatTallinn(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const p = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Tallinn",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .formatToParts(d)
    .reduce((acc, part) => ((acc[part.type] = part.value), acc), {});
  return `${p.day}.${p.month}.${p.year} ${p.hour}:${p.minute}`;
}

function distTagVersion(tag) {
  return pkg ? sh(`npm view ${pkg} dist-tags.${tag}`) : "";
}

function publishedAt(version) {
  if (!pkg || !version) return "";
  const json = sh(`npm view ${pkg}@${version} time --json`);
  try {
    return formatTallinn(JSON.parse(json)[version]);
  } catch {
    return "";
  }
}

const mainVersion = distTagVersion("latest");
const rcVersion = distTagVersion("rc");

process.stdout.write(
  JSON.stringify({
    framework,
    npmPackage: pkg,
    main: { version: mainVersion, updated: publishedAt(mainVersion) },
    rc: { version: rcVersion, updated: publishedAt(rcVersion) },
  })
);
