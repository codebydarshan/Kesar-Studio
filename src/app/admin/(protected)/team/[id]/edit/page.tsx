import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TeamForm } from "@/components/admin/team-form";
import { getTeamMemberById } from "@/app/actions/team";

export const metadata: Metadata = {
  title: "Edit Team Member",
};

export const dynamic = "force-dynamic";

interface EditTeamMemberPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTeamMemberPage({
  params,
}: EditTeamMemberPageProps) {
  const { id } = await params;
  const member = await getTeamMemberById(id);

  if (!member) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit Team Member</h1>
        <p className="text-muted-foreground mt-1">Update team member details.</p>
      </div>
      <TeamForm member={member} />
    </div>
  );
}
