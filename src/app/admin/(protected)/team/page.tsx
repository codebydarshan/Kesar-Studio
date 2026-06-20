import type { Metadata } from "next";
import Link from "next/link";
import { LinkButton } from "@/components/ui/link-button";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Users } from "lucide-react";
import { getTeamMembers } from "@/app/actions/team";
import { deleteTeamMember } from "@/app/actions/team";
import { DeleteButton } from "@/components/admin/delete-button";
import { EmptyState } from "@/components/shared/empty-state";

export const metadata: Metadata = {
  title: "Team",
};

export const dynamic = "force-dynamic";

export default async function AdminTeamPage() {
  const members = await getTeamMembers();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team</h1>
          <p className="text-muted-foreground mt-1">Manage team members.</p>
        </div>
        <LinkButton href="/admin/team/new">
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </LinkButton>
      </div>

      {members.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No team members yet"
          description="Add team members to showcase on the About page."
          action={
            <LinkButton href="/admin/team/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Member
            </LinkButton>
          }
        />
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Display Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.displayOrder}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/team/${member.id}/edit`}
                        className={buttonVariants({ variant: "ghost", size: "sm" })}
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <DeleteButton
                        id={member.id}
                        label="team member"
                        onDelete={deleteTeamMember}
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
