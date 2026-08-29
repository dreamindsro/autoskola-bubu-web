import Link from "next/link";
import { branches } from "@/data/catalog";
import { Icon } from "@/components/icon";

export function BranchCards() {
  return (
    <div className="branch-grid">
      {Object.values(branches).map((branch, index) => (
        <article className={`branch-card ${index === 0 ? "featured" : ""}`} key={branch.id}>
          <span className="round-icon">
            <Icon src="/assets/icons/location_pin_teal.svg" size={31} />
          </span>
          <small>{branch.area}</small>
          <h3>{branch.name}</h3>
          <p>{branch.description}</p>
          <strong>{branch.address}</strong>
          <Link className="btn btn-secondary" href={`/${branch.id}`}>
            Detail pobočky
          </Link>
        </article>
      ))}
    </div>
  );
}
