"use client";

import {
  FolderKanban,
  MessageSquareQuote,
  Users,
  Inbox,
  Loader2,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/admin/stats-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import type { DashboardStats } from "@/app/actions/admin-live";

interface LiveDashboardProps {
  initialStats: DashboardStats;
}

export function LiveDashboard({ initialStats }: LiveDashboardProps) {
  const { stats, isLoading, isValidating } = useDashboardStats(initialStats);

  const cards = [
    {
      title: "Projects",
      value: stats.projects,
      icon: FolderKanban,
      href: "/admin/projects",
    },
    {
      title: "Testimonials",
      value: stats.testimonials,
      icon: MessageSquareQuote,
      href: "/admin/testimonials",
    },
    {
      title: "Team Members",
      value: stats.team,
      icon: Users,
      href: "/admin/team",
    },
    {
      title: "New Leads",
      value: stats.newLeads,
      icon: Inbox,
      href: "/admin/leads",
    },
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Welcome back. Here's an overview of your content."
      >
        {isValidating && !isLoading && (
          <Loader2
            className="h-4 w-4 animate-spin text-muted-foreground"
            aria-label="Refreshing dashboard"
          />
        )}
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {isLoading
          ? cards.map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-border bg-card p-6 space-y-3"
              >
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-16" />
              </div>
            ))
          : cards.map((card) => (
              <StatsCard key={card.title} {...card} />
            ))}
      </div>
    </div>
  );
}
