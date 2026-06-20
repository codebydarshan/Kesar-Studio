"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { teamMemberSchema, type TeamMemberFormData } from "@/lib/validations";
import { createTeamMember, updateTeamMember } from "@/app/actions/team";
import type { TeamMember } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ImageUpload } from "./image-upload";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface TeamFormProps {
  member?: TeamMember;
}

export function TeamForm({ member }: TeamFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TeamMemberFormData>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: member
      ? {
          name: member.name,
          role: member.role,
          bio: member.bio,
          image: member.image || "",
          linkedin: member.linkedin || "",
          github: member.github || "",
          displayOrder: member.displayOrder,
        }
      : {
          displayOrder: 0,
        },
  });

  const image = watch("image");

  async function onSubmit(data: TeamMemberFormData) {
    try {
      if (member) {
        await updateTeamMember(member.id, data);
        toast.success("Team member updated");
      } else {
        await createTeamMember(data);
        toast.success("Team member created");
      }
      router.push("/admin/team");
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
              <Label htmlFor="name">Name *</Label>
              <Input id="name" {...register("name")} />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Input id="role" {...register("role")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio *</Label>
            <Textarea id="bio" rows={4} {...register("bio")} />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input id="linkedin" {...register("linkedin")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub URL</Label>
              <Input id="github" {...register("github")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="displayOrder">Display Order</Label>
            <Input
              id="displayOrder"
              type="number"
              {...register("displayOrder", { valueAsNumber: true })}
            />
          </div>

          <div className="space-y-2">
            <Label>Photo</Label>
            <ImageUpload
              endpoint="teamMemberImage"
              value={image}
              onChange={(url) => setValue("image", url)}
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {member ? "Update Member" : "Add Member"}
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
