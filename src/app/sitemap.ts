import type { MetadataRoute } from "next";
import { courses } from "@/data/catalog";
import { articles } from "@/data/articles";
import { absoluteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/cenik",
    "/kurzy",
    "/jak-probiha-vyuka",
    "/strizkov",
    "/kladno",
    "/statenice",
    "/kontakt",
    "/o-nas",
    "/blog",
  ];
  return [
    ...routes.map((route, index) => ({
      url: absoluteUrl(route),
      changeFrequency: index === 0 ? ("weekly" as const) : ("monthly" as const),
      priority: index === 0 ? 1 : 0.8,
    })),
    ...courses.map((course) => ({
      url: absoluteUrl(`/kurzy/${course.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...articles.map((article) => ({
      url: absoluteUrl(`/blog/${article.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.55,
    })),
  ];
}
