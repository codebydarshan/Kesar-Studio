"use client";

import { usePathname } from "next/navigation";
import { Topbar } from "./topbar";

const pageTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/projects": "Projects",
  "/admin/testimonials": "Testimonials",
  "/admin/team": "Team",
  "/admin/leads": "Leads",
};

function resolveTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname];

  if (pathname.includes("/projects")) return "Projects";
  if (pathname.includes("/testimonials")) return "Testimonials";
  if (pathname.includes("/team")) return "Team";
  if (pathname.includes("/leads")) return "Leads";

  return "Admin";
}

interface AdminHeaderProps {
  onMenuClick?: () => void;
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const pathname = usePathname();
  const title = resolveTitle(pathname);

  return <Topbar title={title} onMenuClick={onMenuClick} />;
}
