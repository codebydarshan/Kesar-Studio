import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { isClerkConfigured } from "@/lib/clerk-config";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isAdminSignInRoute = createRouteMatcher(["/admin/sign-in(.*)"]);

const clerkAuthMiddleware = clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin") {
    const { userId } = await auth();
    const url = req.nextUrl.clone();
    url.pathname = userId ? "/admin/dashboard" : "/admin/sign-in";
    return NextResponse.redirect(url);
  }

  if (isAdminRoute(req) && !isAdminSignInRoute(req)) {
    await auth.protect({
      unauthenticatedUrl: "/admin/sign-in",
    });
  }
});

function handleClerkDisabled(req: NextRequest) {
  if (isAdminRoute(req)) {
    return new NextResponse(
      [
        "Admin authentication is not configured.",
        "",
        "Add your real Clerk API keys to .env.local:",
        "  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...",
        "  CLERK_SECRET_KEY=sk_test_...",
        "",
        "Get keys from: https://dashboard.clerk.com",
      ].join("\n"),
      { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  }

  return NextResponse.next();
}

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  if (!isClerkConfigured()) {
    return handleClerkDisabled(req);
  }

  return clerkAuthMiddleware(req, event);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
