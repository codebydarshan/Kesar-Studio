"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, type ProjectFormData } from "@/lib/validations";
import { createProject, updateProject } from "@/app/actions/projects";
import type { ProjectWithDetails } from "@/app/actions/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ImageUpload } from "./image-upload";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";
import slugify from "slugify";
import { RemoteImage } from "@/components/shared/remote-image";

interface ProjectFormProps {
  project?: NonNullable<ProjectWithDetails>;
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: project
      ? {
          title: project.title,
          slug: project.slug,
          shortDescription: project.shortDescription,
          fullDescription: project.fullDescription,
          industry: project.industry,
          clientName: project.clientName || "",
          coverImage: project.coverImage || "",
          demoUrl: project.demoUrl || "",
          githubUrl: project.githubUrl || "",
          featured: project.featured,
          technologyNames: project.technologyNames || [],
          galleryImages: project.galleryImages || [],
        }
      : {
          technologyNames: [],
          galleryImages: [],
          featured: false,
        },
  });

  const coverImage = watch("coverImage");
  const galleryImages = watch("galleryImages") || [];

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setValue("title", value);
    if (!project) {
      setValue("slug", slugify(value, { lower: true, strict: true }));
    }
  }

  function addGalleryImage(url: string) {
    setValue("galleryImages", [
      ...galleryImages,
      { imageUrl: url, displayOrder: galleryImages.length },
    ]);
  }

  function removeGalleryImage(index: number) {
    setValue(
      "galleryImages",
      galleryImages
        .filter((_, i) => i !== index)
        .map((img, i) => ({ ...img, displayOrder: i }))
    );
  }

  async function onSubmit(data: ProjectFormData) {
    try {
      const techArray =
        typeof data.technologyNames === "string"
          ? (data.technologyNames as string)
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : data.technologyNames;

      const payload = { ...data, technologyNames: techArray };

      if (project) {
        await updateProject(project.id, payload);
        toast.success("Project updated");
      } else {
        await createProject(payload);
        toast.success("Project created");
      }
      router.push("/admin/projects");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                {...register("title")}
                onChange={handleTitleChange}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input id="slug" {...register("slug")} />
              {errors.slug && (
                <p className="text-sm text-destructive">{errors.slug.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription">Short Description *</Label>
            <Textarea
              id="shortDescription"
              rows={3}
              {...register("shortDescription")}
            />
            {errors.shortDescription && (
              <p className="text-sm text-destructive">
                {errors.shortDescription.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullDescription">Full Description *</Label>
            <Textarea
              id="fullDescription"
              rows={6}
              {...register("fullDescription")}
            />
            {errors.fullDescription && (
              <p className="text-sm text-destructive">
                {errors.fullDescription.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry *</Label>
              <Input id="industry" placeholder="FinTech" {...register("industry")} />
              {errors.industry && (
                <p className="text-sm text-destructive">{errors.industry.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input id="clientName" {...register("clientName")} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="demoUrl">Demo URL</Label>
              <Input id="demoUrl" placeholder="https://..." {...register("demoUrl")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input id="githubUrl" placeholder="https://..." {...register("githubUrl")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="technologyNames">Technologies (comma-separated)</Label>
            <Input
              id="technologyNames"
              placeholder="Next.js, TypeScript, PostgreSQL"
              defaultValue={project?.technologyNames?.join(", ") || ""}
              onChange={(e) =>
                setValue(
                  "technologyNames",
                  e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                )
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Cover Image</Label>
            <ImageUpload
              endpoint="projectCoverImage"
              value={coverImage}
              onChange={(url) => setValue("coverImage", url)}
            />
          </div>

          <div className="space-y-3">
            <Label>Gallery Screenshots</Label>
            {galleryImages.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {galleryImages.map((img, index) => (
                  <div key={index} className="relative">
                    <div className="relative aspect-[5/3] overflow-hidden rounded-lg border">
                      <RemoteImage
                        src={img.imageUrl}
                        alt={`Screenshot ${index + 1}`}
                        fill
                        sizes="200px"
                        className="object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-7 w-7"
                      onClick={() => removeGalleryImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <GalleryImageAdd onAdd={addGalleryImage} />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("featured")} className="rounded" />
            Featured
          </label>

          <div className="flex gap-3">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {project ? "Update Project" : "Create Project"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function GalleryImageAdd({ onAdd }: { onAdd: (url: string) => void }) {
  const [key, setKey] = useState(0);

  return (
    <ImageUpload
      key={key}
      endpoint="projectGalleryImage"
      resetAfterUpload
      value=""
      onChange={(url) => {
        if (url) {
          onAdd(url);
          setKey((current) => current + 1);
        }
      }}
    />
  );
}
