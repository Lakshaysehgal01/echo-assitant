
import { OrganizationGuard } from "@/modules/auth/ui/components/OrgGuard";
import { AuthLayout } from "@/modules/auth/ui/layout/auth-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthLayout>
      <OrganizationGuard>{children}</OrganizationGuard>
    </AuthLayout>
  );
}
