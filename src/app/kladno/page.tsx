import { BranchPage, branchMetadata } from "@/components/branch-page";

export const metadata = branchMetadata("kladno");
export default function KladnoPage() {
  return <BranchPage branchId="kladno" />;
}
