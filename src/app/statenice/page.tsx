import { BranchPage, branchMetadata } from "@/components/branch-page";

export const metadata = branchMetadata("statenice");
export default function StatenicePage() {
  return <BranchPage branchId="statenice" />;
}
