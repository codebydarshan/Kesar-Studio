"use client";

import Link from "next/link";
import { useUser, useClerk } from "@clerk/nextjs";
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquareQuote,
  Users,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function PublicAdminMenu() {
  const { user } = useUser();
  const { signOut } = useClerk();

  if (!user) return null;

  const initials =
    user.fullName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "A";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full outline-none ring-ring focus-visible:ring-2">
        <Avatar className="h-9 w-9 border border-border">
          <AvatarImage src={user.imageUrl} alt={user.fullName || "Admin"} />
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-popover border-border">
        <DropdownMenuItem
          render={
            <Link
              href="/admin/dashboard"
              className="flex w-full items-center gap-2"
            />
          }
        >
          <LayoutDashboard className="h-4 w-4" />
          Admin Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem
          render={
            <Link
              href="/admin/projects"
              className="flex w-full items-center gap-2"
            />
          }
        >
          <FolderKanban className="h-4 w-4" />
          Manage Projects
        </DropdownMenuItem>
        <DropdownMenuItem
          render={
            <Link
              href="/admin/testimonials"
              className="flex w-full items-center gap-2"
            />
          }
        >
          <MessageSquareQuote className="h-4 w-4" />
          Manage Testimonials
        </DropdownMenuItem>
        <DropdownMenuItem
          render={
            <Link href="/admin/team" className="flex w-full items-center gap-2" />
          }
        >
          <Users className="h-4 w-4" />
          Manage Team
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={() => signOut({ redirectUrl: "/admin/sign-in" })}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
