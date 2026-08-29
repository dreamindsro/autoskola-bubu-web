import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { articles } from "@/data/articles";
import { courses } from "@/data/catalog";
import { absoluteUrl } from "@/data/site";

describe("SEO routes", () => {
  it("publishes every public course and article exactly once", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(new Set(urls).size).toBe(urls.length);
    expect(urls).toContain(absoluteUrl("/"));
    expect(urls).toContain(absoluteUrl("/strizkov"));
    expect(urls).toContain(absoluteUrl("/kladno"));
    expect(urls).toContain(absoluteUrl("/statenice"));

    for (const course of courses) {
      expect(urls).toContain(absoluteUrl(`/kurzy/${course.slug}`));
    }
    for (const article of articles) {
      expect(urls).toContain(absoluteUrl(`/blog/${article.slug}`));
    }
  });

  it("keeps private and dynamic routes out of search", () => {
    const config = robots();
    const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
    const disallowed = rules.flatMap((rule) => rule.disallow ?? []);

    expect(disallowed).toContain("/api/");
    expect(disallowed).toContain("/objednavka");
    expect(config.sitemap).toBe(absoluteUrl("/sitemap.xml"));
  });
});
