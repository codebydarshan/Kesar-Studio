"use client";

import { useState } from "react";
import { UploadButton, type UploadEndpoint } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";
import { RemoteImage } from "@/components/shared/remote-image";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  endpoint: UploadEndpoint;
  resetAfterUpload?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  endpoint,
  resetAfterUpload = false,
}: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState("");
  const displayUrl = value || previewUrl;

  function handleUpload(uploadedUrl: string) {
    onChange(uploadedUrl);
    if (resetAfterUpload) {
      setPreviewUrl("");
    } else {
      setPreviewUrl(uploadedUrl);
    }
  }

  function handleRemove() {
    setPreviewUrl("");
    onChange("");
  }

  return (
    <div className="space-y-3">
      {displayUrl ? (
        <div className="relative w-full max-w-xs">
          <div className="relative aspect-[3/2] overflow-hidden rounded-lg border">
            <RemoteImage
              src={displayUrl}
              alt="Upload preview"
              fill
              sizes="300px"
              className="object-cover"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-7 w-7"
            onClick={handleRemove}
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <UploadButton
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            const uploadedUrl = res?.[0]?.ufsUrl;
            if (uploadedUrl) {
              handleUpload(uploadedUrl);
              toast.success("Image uploaded");
            }
          }}
          onUploadError={(error) => {
            const message =
              error.message?.includes("Unauthorized") ||
              error.message?.includes("not configured")
                ? "Image uploads are unavailable. Please sign in as admin and check UploadThing configuration."
                : error.message?.includes("FileSizeMismatch") ||
                    error.message?.includes("too large")
                  ? "Image must be 4MB or smaller."
                  : error.message?.includes("InvalidFileType") ||
                      error.message?.includes("file type")
                    ? "Only image files are allowed."
                    : "Upload failed. Please try again.";
            toast.error(message);
          }}
        />
      )}
    </div>
  );
}
