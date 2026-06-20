import type { Metadata } from "next";
import {
  FolderKanban,
  MessageSquareQuote,
  Users,
  Inbox,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/admin/stats-card";
import { getProjects } from "@/app/actions/projects";
import { getTestimonials } from "@/app/actions/testimonials";
import { getTeamMembers } from "@/app/actions/team";
import { getLeadStats } from "@/app/actions/leads";

export const metadata: Metadata = {
  title: "Dashboard",
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [projects, testimonials, team, leadStats] = await Promise.all([
    getProjects(),
    getTestimonials(),
    getTeamMembers(),
    getLeadStats(),
  ]);

  const stats = [
    {
      title: "Projects",
      value: projects.length,
      icon: FolderKanban,
      href: "/admin/projects",
    },
    {
      title: "Testimonials",
      value: testimonials.length,
      icon: MessageSquareQuote,
      href: "/admin/testimonials",
    },
    {
      title: "Team Members",
      value: team.length,
      icon: Users,
      href: "/admin/team",
    },
    {
      title: "New Leads",
      value: leadStats.new,
      icon: Inbox,
      href: "/admin/leads",
    },
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Welcome back. Here's an overview of your content."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>
    </div>
  );
}
