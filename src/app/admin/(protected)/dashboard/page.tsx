import type { Metadata } from "next";
import { getDashboardStats } from "@/app/actions/admin-live";
import { LiveDashboard } from "@/components/admin/live-dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const initialStats = await getDashboardStats();

  return <LiveDashboard initialStats={initialStats} />;
}
