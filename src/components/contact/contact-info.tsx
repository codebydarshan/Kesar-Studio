"use client";

import { Mail, Phone, MessageCircle, Link2, MapPin } from "lucide-react";
import { CONTACT_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/shared/motion";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: CONTACT_INFO.phone,
    href: `tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat on WhatsApp",
    href: `https://wa.me/${CONTACT_INFO.whatsapp.replace(/\D/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: CONTACT_INFO.location,
  },
];

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {contactItems.map((item) => (
            <Card
              key={item.label}
              className="border border-border/60 bg-card transition-colors hover:border-primary/30"
            >
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{item.label}</h3>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.label === "WhatsApp" ? "_blank" : undefined}
                      rel={item.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Card className="border border-border/60 bg-card">
          <CardContent className="p-5">
            <h3 className="font-semibold mb-3">Follow us</h3>
            <div className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                >
                  <Link2 className="h-4 w-4" aria-hidden="true" />
                  {link.label}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
