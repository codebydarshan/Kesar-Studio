import { SiteLayout } from "@/components/layout/site-layout";
import { ContentFreshnessNotifier } from "@/components/layout/content-freshness-notifier";
import { getPublicContentVersion } from "@/app/actions/admin-live";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { version } = await getPublicContentVersion();

  return (
    <SiteLayout>
      <ContentFreshnessNotifier initialVersion={version} />
      {children}
    </SiteLayout>
  );
}
