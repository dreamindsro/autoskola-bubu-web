import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const failures = [];

function readJson(path) {
  return JSON.parse(readFileSync(join(root, path), "utf8"));
}

function sourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.(ts|tsx)$/.test(entry.name) ? [path] : [];
  });
}

const tsconfig = readJson("tsconfig.json");
const requiredCompilerOptions = {
  allowJs: false,
  strict: true,
  noUncheckedIndexedAccess: true,
  noImplicitOverride: true,
  noFallthroughCasesInSwitch: true,
  noEmit: true,
};

for (const [option, expected] of Object.entries(requiredCompilerOptions)) {
  if (tsconfig.compilerOptions?.[option] !== expected) {
    failures.push(`tsconfig.json musí zachovat ${option}: ${String(expected)}.`);
  }
}

const files = sourceFiles(join(root, "src"));
for (const path of files) {
  const source = readFileSync(path, "utf8");
  const displayPath = relative(root, path).replaceAll("\\", "/");
  if (/@ts-(ignore|nocheck)/.test(source)) {
    failures.push(`${displayPath} obsahuje zakázané potlačení TypeScript kontroly.`);
  }
  if (/force-dynamic/.test(source) && displayPath !== "src/app/api/orders/route.ts") {
    failures.push(`${displayPath} zapíná force-dynamic a porušuje statické renderování webu.`);
  }
}

const clientComponents = files
  .filter((path) => /^(["'])use client\1;?/m.test(readFileSync(path, "utf8")))
  .map((path) => relative(root, path).replaceAll("\\", "/"));
const allowedClientComponents = ["src/components/order-form.tsx"];

if (JSON.stringify(clientComponents.sort()) !== JSON.stringify(allowedClientComponents)) {
  failures.push(
    `Client component allowlist se změnil: ${clientComponents.join(", ") || "žádná"}. ` +
      "Změnu je nutné vědomě posoudit a upravit guard.",
  );
}

const apiRoutes = files
  .map((path) => relative(root, path).replaceAll("\\", "/"))
  .filter((path) => path.startsWith("src/app/api/") && path.endsWith("/route.ts"));

if (JSON.stringify(apiRoutes.sort()) !== JSON.stringify(["src/app/api/orders/route.ts"])) {
  failures.push(`Jediný povolený API endpoint je orders. Nalezeno: ${apiRoutes.join(", ")}.`);
}

const pagesWithoutMetadata = files
  .filter((path) => /[/\\]src[/\\]app[/\\].*[/\\]page\.tsx$/.test(path))
  .filter((path) => relative(root, path).replaceAll("\\", "/") !== "src/app/page.tsx")
  .filter((path) => {
    const source = readFileSync(path, "utf8");
    return !/export (const metadata|async function generateMetadata)/.test(source);
  })
  .map((path) => relative(root, path).replaceAll("\\", "/"));
if (pagesWithoutMetadata.length) {
  failures.push(`Stránky bez explicitních SEO metadata: ${pagesWithoutMetadata.join(", ")}.`);
}

const packageJson = readJson("package.json");
const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
const forbiddenPackages = [
  "@auth/core",
  "@prisma/client",
  "@supabase/supabase-js",
  "drizzle-orm",
  "next-auth",
  "prisma",
  "stripe",
];
for (const dependency of forbiddenPackages) {
  if (dependency in dependencies)
    failures.push(`Zakázaná závislost mimo produktový scope: ${dependency}.`);
}

const nextConfig = readFileSync(join(root, "next.config.ts"), "utf8");
if (!/output:\s*["']standalone["']/.test(nextConfig)) {
  failures.push('next.config.ts musí zachovat output: "standalone".');
}

const emailModule = readFileSync(join(root, "src/lib/email.ts"), "utf8");
if (!/^import ["']server-only["'];/m.test(emailModule)) {
  failures.push('src/lib/email.ts musí začínat importem "server-only".');
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log("Architecture guard passed.");
