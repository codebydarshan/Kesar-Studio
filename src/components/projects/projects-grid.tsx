"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { Project } from "@/db/schema";
import { ProjectCard } from "@/components/shared/project-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FolderKanban } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";

export type ProjectListing = Project & { technologyNames: string[] };

interface ProjectsGridProps {
  projects: ProjectListing[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [query, setQuery] = useState("");
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((p) => p.technologyNames.forEach((t) => techSet.add(t)));
    return Array.from(techSet).sort();
  }, [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesQuery =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.shortDescription.toLowerCase().includes(q) ||
        project.industry.toLowerCase().includes(q) ||
        project.clientName?.toLowerCase().includes(q) ||
        project.technologyNames.some((t) => t.toLowerCase().includes(q));

      const matchesTech =
        !activeTech || project.technologyNames.includes(activeTech);

      return matchesQuery && matchesTech;
    });
  }, [projects, query, activeTech]);

  if (projects.length === 0) {
    return (
      <EmptyState
        icon={FolderKanban}
        title="No projects yet"
        description="Our portfolio is being prepared. Check back soon or get in touch to discuss your project."
        action={
          <LinkButton href="/contact">Start a Project</LinkButton>
        }
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            placeholder="Search projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 bg-surface/50"
            aria-label="Search projects"
          />
        </div>
        {(query || activeTech) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery("");
              setActiveTech(null);
            }}
          >
            <X className="mr-2 h-4 w-4" aria-hidden="true" />
            Clear filters
          </Button>
        )}
      </div>

      {allTechnologies.length > 0 && (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by technology">
          {allTechnologies.map((tech) => (
            <Badge
              key={tech}
              variant={activeTech === tech ? "default" : "outline"}
              className="cursor-pointer transition-colors hover:bg-primary/10"
              onClick={() => setActiveTech(activeTech === tech ? null : tech)}
            >
              {tech}
            </Badge>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No matching projects"
          description="Try adjusting your search or clearing the technology filter."
          action={
            <Button
              variant="outline"
              onClick={() => {
                setQuery("");
                setActiveTech(null);
              }}
            >
              Clear filters
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              technologyNames={project.technologyNames}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
