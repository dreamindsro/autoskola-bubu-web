import { describe, expect, it } from "vitest";
import { escapeHtml, orderSchema, resolveOrder, validateOrderTiming } from "@/lib/order";

const valid = {
  firstName: "Jan",
  lastName: "Novák",
  email: "jan@example.com",
  phone: "+420 700 000 000",
  courseId: "b",
  branchId: "strizkov",
  note: "Prosím odpoledne.",
  website: "" as const,
  formStartedAt: 1_700_000_000_000,
  idempotencyKey: "5f5d999f-06e6-41e4-bb47-69a9b2429b5e",
  termsAccepted: true as const,
  privacyAccepted: true as const,
};

describe("order validation", () => {
  it("accepts a valid allowlisted order", () => {
    const parsed = orderSchema.parse(valid);
    const resolved = resolveOrder(parsed);
    expect(resolved?.course.id).toBe("b");
    expect(resolved?.branch.id).toBe("strizkov");
    expect(resolved?.offering.priceCzk).toBe(24_900);
  });

  it("rejects malformed and bot payloads", () => {
    expect(orderSchema.safeParse({ ...valid, email: "bad" }).success).toBe(false);
    expect(orderSchema.safeParse({ ...valid, website: "bot.example" }).success).toBe(false);
    expect(orderSchema.safeParse({ ...valid, termsAccepted: false }).success).toBe(false);
  });

  it("rejects a course and branch outside the catalog pairing", () => {
    const parsed = orderSchema.parse({ ...valid, courseId: "ba", branchId: "kladno" });
    expect(resolveOrder(parsed)).toBeUndefined();
  });

  it("enforces minimum fill time and rejects future timestamps", () => {
    expect(validateOrderTiming(10_000, 14_000)).toBe(true);
    expect(validateOrderTiming(10_000, 12_000)).toBe(false);
    expect(validateOrderTiming(15_000, 14_000)).toBe(false);
  });

  it("escapes user supplied HTML", () => {
    expect(escapeHtml(`<script a='x'>&"</script>`)).toBe(
      "&lt;script a=&#39;x&#39;&gt;&amp;&quot;&lt;/script&gt;",
    );
  });
});
