import NextImage, { type ImageProps } from "next/image";
import { shouldUseUnoptimizedImage } from "@/lib/images";

type RemoteImageProps = ImageProps & {
  src: string;
};

export function RemoteImage({ src, alt, ...props }: RemoteImageProps) {
  const unoptimized =
    typeof src === "string" ? shouldUseUnoptimizedImage(src) : false;

  return <NextImage src={src} alt={alt} unoptimized={unoptimized} {...props} />;
}
