import DashboardLayout from "../../components/layout/DashboardLayout";

export default function ProtectedDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
