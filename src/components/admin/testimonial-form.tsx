"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { testimonialSchema, type TestimonialFormData } from "@/lib/validations";
import { createTestimonial, updateTestimonial } from "@/app/actions/testimonials";
import type { Testimonial } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ImageUpload } from "./image-upload";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface TestimonialFormProps {
  testimonial?: Testimonial;
}

export function TestimonialForm({ testimonial }: TestimonialFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: testimonial
      ? {
          clientName: testimonial.clientName,
          company: testimonial.company,
          designation: testimonial.designation,
          review: testimonial.review,
          image: testimonial.image || "",
          rating: testimonial.rating,
          featured: testimonial.featured,
        }
      : {
          rating: 5,
          featured: false,
        },
  });

  const image = watch("image");

  async function onSubmit(data: TestimonialFormData) {
    try {
      if (testimonial) {
        await updateTestimonial(testimonial.id, data);
        toast.success("Testimonial updated");
      } else {
        await createTestimonial(data);
        toast.success("Testimonial created");
      }
      router.push("/admin/testimonials");
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
              <Label htmlFor="clientName">Client Name *</Label>
              <Input id="clientName" {...register("clientName")} />
              {errors.clientName && (
                <p className="text-sm text-destructive">{errors.clientName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input id="company" {...register("company")} />
              {errors.company && (
                <p className="text-sm text-destructive">{errors.company.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="designation">Designation *</Label>
              <Input id="designation" {...register("designation")} />
              {errors.designation && (
                <p className="text-sm text-destructive">{errors.designation.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="rating">Rating (1-5)</Label>
              <Input
                id="rating"
                type="number"
                min={1}
                max={5}
                {...register("rating", { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="review">Review *</Label>
            <Textarea id="review" rows={4} {...register("review")} />
            {errors.review && (
              <p className="text-sm text-destructive">{errors.review.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Photo</Label>
            <ImageUpload
              endpoint="testimonialImage"
              value={image}
              onChange={(url) => setValue("image", url)}
            />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("featured")} className="rounded" />
            Featured
          </label>

          <div className="flex gap-3">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {testimonial ? "Update Testimonial" : "Create Testimonial"}
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
