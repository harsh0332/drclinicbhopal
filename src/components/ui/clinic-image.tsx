"use client";

import Image, { ImageProps } from "next/image";
import { existingImages } from "@/lib/existing-images";
import { ImageOff } from "lucide-react";

interface ClinicImageProps extends Omit<ImageProps, "src"> {
  src: string;
}

export default function ClinicImage({ src, alt, ...props }: ClinicImageProps) {
  const isAvailable = existingImages[src];

  if (!isAvailable) {
    // Collect the missing asset name for reporting in developer console
    if (typeof window !== "undefined") {
      console.warn(`[MISSING ASSETS] Image file not found: public${src}`);
    }

    return (
      <div 
        className={`flex flex-col items-center justify-center bg-surface-tint border-2 border-dashed border-primary/20 rounded-2xl p-6 text-center ${props.className || ""}`}
        style={{
          width: props.width ? `${props.width}px` : "100%",
          height: props.height ? `${props.height}px` : "100%",
          minHeight: "120px",
        }}
      >
        <ImageOff className="w-8 h-8 text-muted-text/50 mb-2 stroke-[1.5]" />
        <span className="text-xs font-heading text-primary font-semibold mb-1 truncate max-w-full">
          Placeholder: {src.split("/").pop()}
        </span>
        <span className="text-[10px] text-muted-text font-mono truncate max-w-full">
          public{src}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt || "Clinic Image"}
      {...props}
    />
  );
}
