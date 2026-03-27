import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Total Boat Repair & Sales",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
