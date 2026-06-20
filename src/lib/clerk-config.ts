/**
 * Returns true when real Clerk API keys are set in the environment.
 * Placeholder values like `pk_test_...` are treated as not configured.
 */
export function isClerkConfigured(): boolean {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
  const secretKey = process.env.CLERK_SECRET_KEY ?? "";

  const isPlaceholder = (value: string) =>
    value.length < 30 || value.includes("...");

  const isValidPublishableKey =
    (publishableKey.startsWith("pk_test_") ||
      publishableKey.startsWith("pk_live_")) &&
    !isPlaceholder(publishableKey);

  const isValidSecretKey =
    (secretKey.startsWith("sk_test_") || secretKey.startsWith("sk_live_")) &&
    !isPlaceholder(secretKey);

  return isValidPublishableKey && isValidSecretKey;
}
