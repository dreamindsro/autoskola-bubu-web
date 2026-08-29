import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

function readJson(path) {
  return JSON.parse(readFileSync(join(root, path), "utf8"));
}

const expectedStaticRoutes = [
  "/",
  "/blog",
  "/blog/bezpecne-jizdni-navyky",
  "/blog/prvni-jizda-v-autoskole-priprava",
  "/blog/ridicak-na-automat-kdy-dava-smysl",
  "/cenik",
  "/jak-probiha-vyuka",
  "/kladno",
  "/kontakt",
  "/kurzy",
  "/kurzy/b96",
  "/kurzy/be",
  "/kurzy/kondicni-jizdy",
  "/kurzy/l17",
  "/kurzy/ridicak-skupina-a",
  "/kurzy/ridicak-skupina-a1",
  "/kurzy/ridicak-skupina-a2",
  "/kurzy/ridicak-skupina-am",
  "/kurzy/ridicak-skupina-b",
  "/kurzy/ridicak-skupina-b-automat",
  "/o-nas",
  "/obchodni-podminky",
  "/objednavka",
  "/ochrana-osobnich-udaju",
  "/statenice",
  "/strizkov",
];

const prerenderManifest = readJson(".next/prerender-manifest.json");
const prerenderedRoutes = new Set(Object.keys(prerenderManifest.routes));

for (const route of expectedStaticRoutes) {
  if (!prerenderedRoutes.has(route)) failures.push(`${route} není předgenerovaná do HTML.`);
}
if (prerenderedRoutes.has("/api/orders"))
  failures.push("Objednávkový endpoint nesmí být statická route.");

const appPaths = readJson(".next/server/app-paths-manifest.json");
const apiRoutes = Object.keys(appPaths).filter((route) => route.startsWith("/api/"));
if (JSON.stringify(apiRoutes.sort()) !== JSON.stringify(["/api/orders/route"])) {
  failures.push(`Build obsahuje neočekávané API routy: ${apiRoutes.join(", ")}.`);
}

const htmlRoutesToInspect = [...prerenderedRoutes]
  .filter((route) => !route.startsWith("/_"))
  .filter((route) => !["/robots.txt", "/sitemap.xml"].includes(route))
  .sort();
const titles = new Map();
const canonicals = new Map();

for (const route of htmlRoutesToInspect) {
  const path =
    route === "/"
      ? join(root, ".next/server/app/index.html")
      : join(root, `.next/server/app${route}.html`);
  if (!existsSync(path)) {
    failures.push(`Chybí HTML soubor pro ${route}.`);
    continue;
  }
  const html = readFileSync(path, "utf8");
  const requirements = [
    ['lang="cs"', "český jazyk dokumentu"],
    ["<title>", "title"],
    ['name="description"', "meta description"],
    ['rel="canonical"', "canonical"],
    ['property="og:title"', "Open Graph title"],
  ];
  for (const [needle, label] of requirements) {
    if (!html.includes(needle)) failures.push(`${route} nemá ${label}.`);
  }
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (title) {
    if (titles.has(title)) failures.push(`${route} duplikuje title stránky ${titles.get(title)}.`);
    titles.set(title, route);
  }
  if (canonical) {
    if (canonicals.has(canonical)) {
      failures.push(`${route} duplikuje canonical stránky ${canonicals.get(canonical)}.`);
    }
    canonicals.set(canonical, route);
  }
}

const homepage = readFileSync(join(root, ".next/server/app/index.html"), "utf8");
if (!homepage.includes('type="application/ld+json"')) failures.push("Homepage nemá JSON-LD.");

if (!existsSync(join(root, ".next/standalone/server.js"))) {
  failures.push("Build nevytvořil .next/standalone/server.js.");
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Rendering guard passed for ${htmlRoutesToInspect.length} static HTML routes.`);
