import { format } from "date-fns";
import { Resend } from "resend";
import type { Lead } from "@/db/schema";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isPlaceholder(value: string | undefined) {
  if (!value) return true;
  return value.includes("...") || value.includes("yourdomain.com");
}

export function isResendConfigured() {
  return (
    !isPlaceholder(process.env.RESEND_API_KEY) &&
    !isPlaceholder(process.env.RESEND_FROM_EMAIL) &&
    !isPlaceholder(process.env.ADMIN_EMAIL)
  );
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || isPlaceholder(apiKey)) return null;
  return new Resend(apiKey);
}

export async function sendLeadNotification(lead: Lead) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const resend = getResendClient();

  if (!adminEmail || !fromEmail || !resend || isPlaceholder(adminEmail) || isPlaceholder(fromEmail)) {
    console.warn("Resend is not configured. Skipping lead notification.");
    return { sent: false as const, reason: "not_configured" as const };
  }

  const submissionDate = format(new Date(lead.createdAt), "PPpp");
  const adminUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/leads`;

  const field = (label: string, value: string | null | undefined) =>
    value
      ? `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`
      : "";

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: "New Lead Received",
      html: `
        <h2>New Lead Received</h2>
        ${field("Name", lead.name)}
        ${field("Email", lead.email)}
        ${field("Phone", lead.phone)}
        ${field("Company", lead.company)}
        ${field("Budget", lead.budget)}
        ${field("Project Type", lead.projectType)}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(lead.message).replace(/\n/g, "<br />")}</p>
        <p><strong>Submission Date:</strong> ${escapeHtml(submissionDate)}</p>
        <hr />
        <p><a href="${escapeHtml(adminUrl)}">View in Admin Dashboard</a></p>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      return { sent: false as const, reason: "api_error" as const, error };
    }

    return { sent: true as const };
  } catch (error) {
    console.error("Failed to send lead notification:", error);
    return { sent: false as const, reason: "network_error" as const, error };
  }
}
