export function isUploadThingConfigured() {
  const token = process.env.UPLOADTHING_TOKEN;
  if (!token) return false;
  return !token.includes("...");
}
