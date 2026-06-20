import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";

type PageMetadataOptions = {
  title: string;
  description?: string;
  path?: string;
  image?: string | null;
  noIndex?: boolean;
  type?: "website" | "article";
};

export function createPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "",
  image,
  noIndex = false,
  type = "website",
}: PageMetadataOptions): Metadata {
  const canonical = `${SITE_URL}${path}`;
  const isHome = path === "" || path === "/";
  const pageTitle = isHome ? SITE_NAME : title;
  const ogTitle = isHome ? SITE_NAME : `${title} | ${SITE_NAME}`;

  const openGraphImages = image
    ? [{ url: image, width: 1200, height: 630, alt: title }]
    : undefined;

  return {
    title: pageTitle,
    description,
    alternates: { canonical },
    ...(noIndex && { robots: { index: false, follow: false } }),
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type,
      locale: "en_US",
      ...(openGraphImages && { images: openGraphImages }),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: ogTitle,
      description,
      ...(image && { images: [image] }),
    },
  };
}

export function createRootMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: SITE_URL,
      siteName: SITE_NAME,
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
