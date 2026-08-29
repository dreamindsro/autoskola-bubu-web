import { BranchPage, branchMetadata } from "@/components/branch-page";

export const metadata = branchMetadata("strizkov");
export default function StrizkovPage() {
  return <BranchPage branchId="strizkov" />;
}
