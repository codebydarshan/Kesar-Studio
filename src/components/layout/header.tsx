import Link from "next/link";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { LinkButton } from "@/components/ui/link-button";
import { PublicAdminMenu } from "./public-admin-menu";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { isAdmin } from "@/lib/auth";
import { isClerkConfigured } from "@/lib/clerk-config";

export async function Header() {
  const showAdminMenu =
    isClerkConfigured() && (await isAdmin());

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            K
          </div>
          <span className="font-semibold text-lg tracking-tight">{SITE_NAME}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors rounded-md hover:bg-surface hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LinkButton href="/contact">Start a Project</LinkButton>
          {showAdminMenu && <PublicAdminMenu />}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {showAdminMenu && <PublicAdminMenu />}
          <Sheet>
            <SheetTrigger className="inline-flex items-center justify-center rounded-lg h-9 w-9 hover:bg-surface transition-colors">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-card border-border">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <nav className="flex flex-col gap-1 mt-8">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2.5 text-sm font-medium rounded-md hover:bg-surface transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <LinkButton href="/contact" className="mt-4">
                  Start a Project
                </LinkButton>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
