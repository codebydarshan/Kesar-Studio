"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/db/schema";
import { ArrowUpRight } from "lucide-react";
import { HoverLift } from "@/components/shared/motion";
import { RemoteImage } from "@/components/shared/remote-image";

interface ProjectCardProps {
  project: Project;
  technologyNames?: string[];
  index?: number;
}

export function ProjectCard({
  project,
  technologyNames = [],
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <HoverLift>
        <Link
          href={`/projects/${project.slug}`}
          className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
          aria-label={`View project: ${project.title}`}
        >
          <Card className="h-full overflow-hidden border border-border/60 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
            <div className="relative aspect-[16/10] overflow-hidden bg-surface">
              {project.coverImage ? (
                <RemoteImage
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                  No image
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-4 right-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
            </div>
            <CardContent className="p-5">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="secondary">{project.industry}</Badge>
                {project.featured && (
                  <Badge variant="outline" className="text-xs">
                    Featured
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {project.shortDescription}
              </p>
              {technologyNames.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {technologyNames.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs font-normal">
                      {tech}
                    </Badge>
                  ))}
                  {technologyNames.length > 3 && (
                    <Badge variant="outline" className="text-xs font-normal">
                      +{technologyNames.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </Link>
      </HoverLift>
    </motion.div>
  );
}
