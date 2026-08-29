import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  consumeOrderAttempt,
  isSameOrigin,
  rateLimitKey,
  resetRateLimitsForTests,
} from "@/lib/request-security";

describe("request security", () => {
  beforeEach(() => resetRateLimitsForTests());
  afterEach(() => delete process.env.SITE_URL);

  it("requires an exact configured origin in production", () => {
    process.env.SITE_URL = "https://preview.example.cz/path";
    expect(
      isSameOrigin("https://preview.example.cz", "https://internal.invalid/api", "production"),
    ).toBe(true);
    expect(isSameOrigin("https://evil.example", "https://internal.invalid/api", "production")).toBe(
      false,
    );
    expect(isSameOrigin(null, "https://internal.invalid/api", "production")).toBe(false);
    expect(isSameOrigin("not a URL", "https://internal.invalid/api", "production")).toBe(false);
  });

  it("accepts the current request origin only outside production", () => {
    expect(
      isSameOrigin("http://localhost:3000", "http://localhost:3000/api/orders", "development"),
    ).toBe(true);
    expect(
      isSameOrigin("http://other.local", "http://localhost:3000/api/orders", "development"),
    ).toBe(false);
    expect(
      isSameOrigin("http://terminal.local:4173", "http://internal:4173/api/orders", "development"),
    ).toBe(true);
  });

  it("hashes addresses before rate-limit storage", () => {
    const key = rateLimitKey("192.0.2.1");
    expect(key).toHaveLength(64);
    expect(key).not.toContain("192.0.2.1");
  });

  it("allows five attempts in a rolling window", () => {
    const key = "test-key";
    for (let index = 0; index < 5; index += 1)
      expect(consumeOrderAttempt(key, 1000 + index)).toBe(true);
    expect(consumeOrderAttempt(key, 2_000)).toBe(false);
    expect(consumeOrderAttempt(key, 10 * 60 * 1_000 + 2_000)).toBe(true);
  });
});
