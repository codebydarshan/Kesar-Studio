"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import type { Testimonial } from "@/db/schema";
import { Star } from "lucide-react";
import { HoverLift } from "@/components/shared/motion";
import { RemoteImage } from "@/components/shared/remote-image";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <HoverLift className="h-full">
        <Card className="h-full border border-border/60 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex gap-1 mb-4" aria-label={`${testimonial.rating} out of 5 stars`}>
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" aria-hidden="true" />
              ))}
            </div>
            <blockquote className="flex-1 text-muted-foreground leading-relaxed">
              &ldquo;{testimonial.review}&rdquo;
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              {testimonial.image ? (
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <RemoteImage
                    src={testimonial.image}
                    alt={testimonial.clientName}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                  {testimonial.clientName.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-semibold text-sm">{testimonial.clientName}</p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.designation}, {testimonial.company}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </HoverLift>
    </motion.div>
  );
}
