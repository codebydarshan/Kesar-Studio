"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import type { TeamMember } from "@/db/schema";
import { Link2 } from "lucide-react";
import { HoverLift } from "@/components/shared/motion";
import { RemoteImage } from "@/components/shared/remote-image";

interface TeamCardProps {
  member: TeamMember;
  index?: number;
}

export function TeamCard({ member, index = 0 }: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <HoverLift>
        <Card className="overflow-hidden border border-border/60 bg-card text-center transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
          <div className="relative aspect-square overflow-hidden bg-surface">
            {member.image ? (
              <RemoteImage
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-4xl font-bold text-muted-foreground">
                {member.name.charAt(0)}
              </div>
            )}
          </div>
          <CardContent className="p-5">
            <h3 className="font-semibold text-lg">{member.name}</h3>
            <p className="text-sm text-primary font-medium">{member.role}</p>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
              {member.bio}
            </p>
            <div className="mt-4 flex justify-center gap-3">
              {member.linkedin && (
                <Link
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface hover:text-primary"
                  title={`${member.name} on LinkedIn`}
                  aria-label={`${member.name} on LinkedIn`}
                >
                  <Link2 className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
              {member.github && (
                <Link
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface hover:text-primary"
                  title={`${member.name} on GitHub`}
                  aria-label={`${member.name} on GitHub`}
                >
                  <Link2 className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </HoverLift>
    </motion.div>
  );
}
