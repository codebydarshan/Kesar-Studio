import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { getTestimonialById } from "@/app/actions/testimonials";

export const metadata: Metadata = {
  title: "Edit Testimonial",
};

export const dynamic = "force-dynamic";

interface EditTestimonialPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTestimonialPage({
  params,
}: EditTestimonialPageProps) {
  const { id } = await params;
  const testimonial = await getTestimonialById(id);

  if (!testimonial) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit Testimonial</h1>
        <p className="text-muted-foreground mt-1">Update testimonial details.</p>
      </div>
      <TestimonialForm testimonial={testimonial} />
    </div>
  );
}
