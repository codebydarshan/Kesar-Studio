const UPLOADTHING_HOSTS = ["utfs.io", "uploadthing.com"] as const;

export function isUploadThingUrl(url: string) {
  try {
    const { hostname } = new URL(url);
    if (hostname.endsWith(".ufs.sh")) return true;
    return UPLOADTHING_HOSTS.some(
      (host) => hostname === host || hostname.endsWith(`.${host}`)
    );
  } catch {
    return false;
  }
}

export function shouldUseUnoptimizedImage(url: string) {
  return isUploadThingUrl(url);
}
