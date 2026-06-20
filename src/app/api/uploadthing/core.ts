import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { requireAdmin } from "@/lib/auth";
import { isUploadThingConfigured } from "@/lib/uploadthing-config";

const f = createUploadthing();

const imageConfig = {
  image: {
    maxFileSize: "4MB" as const,
    maxFileCount: 1,
  },
};

async function adminUploadMiddleware() {
  if (!isUploadThingConfigured()) {
    throw new UploadThingError("UploadThing is not configured");
  }

  try {
    const admin = await requireAdmin();
    return { userId: admin.clerkId };
  } catch {
    throw new UploadThingError("Unauthorized");
  }
}

export const ourFileRouter = {
  projectCoverImage: f(imageConfig)
    .middleware(adminUploadMiddleware)
    .onUploadComplete(async ({ file }) => ({ url: file.ufsUrl })),

  projectGalleryImage: f(imageConfig)
    .middleware(adminUploadMiddleware)
    .onUploadComplete(async ({ file }) => ({ url: file.ufsUrl })),

  teamMemberImage: f(imageConfig)
    .middleware(adminUploadMiddleware)
    .onUploadComplete(async ({ file }) => ({ url: file.ufsUrl })),

  testimonialImage: f(imageConfig)
    .middleware(adminUploadMiddleware)
    .onUploadComplete(async ({ file }) => ({ url: file.ufsUrl })),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
