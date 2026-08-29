import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const nextBin = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));
const input = process.argv.slice(2);
const forwarded = [];
const productionPreview = input.includes("--strictPort") && existsSync(".next/BUILD_ID");
const localEnv = existsSync(".env.local") ? readFileSync(".env.local", "utf8") : "";
const useLocalProviderMock =
  productionPreview && localEnv.includes("RESEND_ALLOW_LOCAL_PROVIDER_MOCK=true");

for (let index = 0; index < input.length; index += 1) {
  const value = input[index];
  if (value === "--strictPort") continue;
  if (value === "--host") {
    forwarded.push("--hostname");
    const host = input[index + 1];
    if (host) {
      forwarded.push(host);
      index += 1;
    }
    continue;
  }
  forwarded.push(value);
}

const providerMock = useLocalProviderMock
  ? spawn(process.execPath, [fileURLToPath(new URL("./resend-mock.mjs", import.meta.url))], {
      stdio: "inherit",
    })
  : undefined;
const child = spawn(
  process.execPath,
  [nextBin, productionPreview ? "start" : "dev", ...forwarded],
  {
    stdio: "inherit",
  },
);
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    child.kill(signal);
    providerMock?.kill(signal);
  });
}
child.on("exit", (code) => {
  providerMock?.kill("SIGTERM");
  process.exit(code ?? 1);
});
