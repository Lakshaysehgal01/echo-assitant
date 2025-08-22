"use client";
import { useOrganization } from "@clerk/nextjs";
import { AuthGuard } from "./AuthGuard";
import { OrgSelectView } from "../views/org-select-view";

export const OrganizationGuard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { organization } = useOrganization();
  if (!organization) {
    return (
      <AuthGuard>
        <OrgSelectView />
      </AuthGuard>
    );
  }
  return <>{children}</>;
};
