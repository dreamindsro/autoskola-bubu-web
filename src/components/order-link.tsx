import Link from "next/link";
import type { ReactNode } from "react";
import type { BranchId, CourseId } from "@/data/catalog";

type OrderLinkProps = {
  courseId?: CourseId;
  branchId?: BranchId;
  children?: ReactNode;
  className?: string;
};

export function OrderLink({
  courseId,
  branchId,
  children = "Přihlásit se do kurzu",
  className = "btn btn-primary",
}: OrderLinkProps) {
  const query = new URLSearchParams();
  if (courseId) query.set("kurz", courseId);
  if (branchId) query.set("pobocka", branchId);
  const href = query.size > 0 ? `/objednavka?${query.toString()}` : "/objednavka";

  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}
