import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/data/articles";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: { title: article.title, description: article.description, images: [article.image] },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  return (
    <article>
      <header className="centered-hero">
        <div className="inner">
          <p className="eyebrow">Blog Autoškoly BuBu</p>
          <h1>{article.title}</h1>
          <p className="lead">{article.description}</p>
        </div>
      </header>
      <div className="section article-layout">
        <Image src={article.image} alt="" width={1200} height={700} priority />
        <div className="article-content">
          {article.sections.map(([title, text]) => (
            <section key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
