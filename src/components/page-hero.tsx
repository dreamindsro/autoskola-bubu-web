import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  lead,
  action,
}: {
  eyebrow?: string;
  title: string;
  lead: string;
  action?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="inner page-hero-grid">
        <div>
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1>{title}</h1>
          <p className="lead">{lead}</p>
        </div>
        {action}
      </div>
    </section>
  );
}
