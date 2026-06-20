import type { Metadata } from "next";
import Link from "next/link";
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
import { Plus, Pencil, MessageSquareQuote } from "lucide-react";
import { getTestimonials } from "@/app/actions/testimonials";
import { deleteTestimonial } from "@/app/actions/testimonials";
import { DeleteButton } from "@/components/admin/delete-button";
import { EmptyState } from "@/components/shared/empty-state";

export const metadata: Metadata = {
  title: "Testimonials",
};

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
          <p className="text-muted-foreground mt-1">Manage client testimonials.</p>
        </div>
        <LinkButton href="/admin/testimonials/new">
          <Plus className="mr-2 h-4 w-4" />
          New Testimonial
        </LinkButton>
      </div>

      {testimonials.length === 0 ? (
        <EmptyState
          icon={MessageSquareQuote}
          title="No testimonials yet"
          description="Add client testimonials to display on the public website."
          action={
            <LinkButton href="/admin/testimonials/new">
              <Plus className="mr-2 h-4 w-4" />
              New Testimonial
            </LinkButton>
          }
        />
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell className="font-medium">{testimonial.clientName}</TableCell>
                  <TableCell>{testimonial.company}</TableCell>
                  <TableCell>{testimonial.designation}</TableCell>
                  <TableCell>{testimonial.rating}/5</TableCell>
                  <TableCell>
                    {testimonial.featured ? (
                      <Badge variant="default">Featured</Badge>
                    ) : (
                      <Badge variant="outline">No</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/testimonials/${testimonial.id}/edit`}
                        className={buttonVariants({ variant: "ghost", size: "sm" })}
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <DeleteButton
                        id={testimonial.id}
                        label="testimonial"
                        onDelete={deleteTestimonial}
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
