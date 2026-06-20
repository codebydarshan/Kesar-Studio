"use client";

import { SignOutButton, UserButton } from "@clerk/nextjs";
import { Search, Menu, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TopbarProps {
  title: string;
  onMenuClick?: () => void;
  className?: string;
}

export function Topbar({ title, onMenuClick, className }: TopbarProps) {
  return (
    <header
      className={cn(
        "flex h-16 shrink-0 items-center gap-4 border-b border-border bg-background px-4 sm:px-6",
        className
      )}
    >
      {onMenuClick && (
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open sidebar</span>
        </Button>
      )}

      <h1 className="text-lg font-semibold tracking-tight shrink-0">{title}</h1>

      <div className="relative ml-auto hidden max-w-sm flex-1 sm:block">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search..."
          className="h-9 bg-surface pl-9 border-border"
          readOnly
        />
      </div>

      <div className="ml-auto flex items-center gap-2 sm:ml-0">
        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-9 w-9",
            },
          }}
        />
        <SignOutButton redirectUrl="/admin/sign-in">
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Logout</span>
          </Button>
        </SignOutButton>
      </div>
    </header>
  );
}
