import { createHash } from "node:crypto";
import { site } from "@/data/site";

const attempts = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1_000;
const MAX_ATTEMPTS = 5;

function originOf(value: string | undefined) {
  if (!value) return undefined;
  try {
    return new URL(value).origin;
  } catch {
    return undefined;
  }
}

export function isSameOrigin(
  origin: string | null,
  requestUrl: string,
  nodeEnv = process.env.NODE_ENV,
) {
  if (!origin) return false;
  const submittedOrigin = originOf(origin);
  const allowed = new Set([originOf(site.canonicalUrl), originOf(process.env.SITE_URL)]);
  if (nodeEnv !== "production") allowed.add(originOf(requestUrl));
  if (allowed.has(submittedOrigin)) return true;
  if (nodeEnv !== "production" && submittedOrigin) {
    const hostname = new URL(submittedOrigin).hostname;
    return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "terminal.local";
  }
  return false;
}

export function rateLimitKey(address: string) {
  return createHash("sha256").update(address).digest("hex");
}

export function consumeOrderAttempt(key: string, now = Date.now()) {
  const recent = (attempts.get(key) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);
  if (recent.length >= MAX_ATTEMPTS) {
    attempts.set(key, recent);
    return false;
  }
  recent.push(now);
  attempts.set(key, recent);
  return true;
}

export function resetRateLimitsForTests() {
  attempts.clear();
}
