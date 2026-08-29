import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Blog",
  description: "Praktické informace k autoškole, výcviku a bezpečné jízdě.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Rady pro řidiče"
        title="Blog Autoškoly BuBu"
        lead="Srozumitelné informace před kurzem, během výcviku i pro první samostatné kilometry."
      />
      <section className="section section-soft">
        <div className="inner article-grid">
          {articles.map((article) => (
            <article className="article-card" key={article.slug}>
              <Image src={article.image} alt="" width={640} height={420} />
              <div>
                <p className="eyebrow">Autoškola bez stresu</p>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <Link className="text-link" href={`/blog/${article.slug}`}>
                  Přečíst článek →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
