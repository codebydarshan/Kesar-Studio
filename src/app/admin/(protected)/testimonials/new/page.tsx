import type { Metadata } from "next";
import { TestimonialForm } from "@/components/admin/testimonial-form";

export const metadata: Metadata = {
  title: "New Testimonial",
};

export default function NewTestimonialPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">New Testimonial</h1>
        <p className="text-muted-foreground mt-1">Add a client testimonial.</p>
      </div>
      <TestimonialForm />
    </div>
  );
}
