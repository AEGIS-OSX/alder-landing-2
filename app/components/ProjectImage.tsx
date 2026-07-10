"use client";
import React from "react";
import assets from "../../public/assets.json";

type AssetKey = keyof typeof assets;

type ProjectImageProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "src" | "width" | "height" | "loading"
> & {
  id: AssetKey;
  className?: string;
};

export function ProjectImage({ id, className, alt, ...rest }: ProjectImageProps) {
  const asset = assets[id];
  if (!asset?.url) return null;
  return (
    <img
      src={asset.url}
      alt={alt ?? asset.alt}
      width={asset.width}
      height={asset.height}
      className={className}
      loading={id === "hero" ? "eager" : "lazy"}
      {...rest}
    />
  );
}
