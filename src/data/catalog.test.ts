import { describe, expect, it } from "vitest";
import {
  courses,
  formatPrice,
  getBranch,
  getCourse,
  getCourseBySlug,
  getOffering,
  isBranchId,
  minimumPrice,
} from "@/data/catalog";

describe("catalog", () => {
  it("keeps all identifiers and slugs unique", () => {
    expect(new Set(courses.map((course) => course.id)).size).toBe(courses.length);
    expect(new Set(courses.map((course) => course.slug)).size).toBe(courses.length);
  });

  it("resolves only known branches and offerings", () => {
    expect(isBranchId("kladno")).toBe(true);
    expect(isBranchId("unknown")).toBe(false);
    expect(getBranch("kladno")?.email).toBe("kladno@autoskolabubu.cz");
    expect(getBranch("unknown")).toBeUndefined();
    expect(getCourse("b")?.slug).toBe("ridicak-skupina-b");
    expect(getCourseBySlug("l17")?.id).toBe("l17");
    expect(getOffering("ba", "strizkov")?.offering.priceCzk).toBe(24_900);
    expect(getOffering("ba", "kladno")).toBeUndefined();
  });

  it("formats fixed and variable prices", () => {
    expect(formatPrice(20_000)).toBe("20 000 Kč");
    expect(formatPrice(null)).toBe("dle domluveného rozsahu");
    expect(minimumPrice(courses.find((course) => course.id === "b")!)).toBe(20_000);
    expect(minimumPrice(courses.find((course) => course.id === "kondicni")!)).toBeNull();
  });
});
