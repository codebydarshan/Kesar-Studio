import type { Metadata } from "next";
import Link from "next/link";
import { RemoteImage } from "@/components/shared/remote-image";
import { LinkButton } from "@/components/ui/link-button";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil } from "lucide-react";
import { getProjects } from "@/app/actions/projects";
import { deleteProject } from "@/app/actions/projects";
import { DeleteButton } from "@/components/admin/delete-button";
import { EmptyState } from "@/components/shared/empty-state";
import { FolderKanban } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects",
};

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage your portfolio projects.</p>
        </div>
        <LinkButton href="/admin/projects/new">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </LinkButton>
      </div>

      {projects.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No projects yet"
          description="Create your first project to showcase your work on the public portfolio."
          action={
            <LinkButton href="/admin/projects/new">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </LinkButton>
          }
        />
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {project.coverImage && (
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded">
                          <RemoteImage
                            src={project.coverImage}
                            alt={project.title}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <p className="font-medium">{project.title}</p>
                    </div>
                  </TableCell>
                  <TableCell>{project.industry}</TableCell>
                  <TableCell>{project.clientName || "—"}</TableCell>
                  <TableCell>
                    {project.featured ? (
                      <Badge variant="default">Featured</Badge>
                    ) : (
                      <Badge variant="outline">No</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className={buttonVariants({ variant: "ghost", size: "sm" })}
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <DeleteButton
                        id={project.id}
                        label="project"
                        onDelete={deleteProject}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
