import type { Metadata } from "next";
import { TeamForm } from "@/components/admin/team-form";

export const metadata: Metadata = {
  title: "Add Team Member",
};

export default function NewTeamMemberPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Add Team Member</h1>
        <p className="text-muted-foreground mt-1">Add a new member to your team.</p>
      </div>
      <TeamForm />
    </div>
  );
}
