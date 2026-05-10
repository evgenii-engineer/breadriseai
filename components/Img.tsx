import type { ImgHTMLAttributes } from "react";
import type { ImgSrc } from "@/lib/projects";
import { cn } from "@/lib/utils";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> & {
  image: ImgSrc;
  /** Required `sizes` hint so the browser picks the right variant. */
  sizes: string;
  /** When true, ship as eager + high fetch priority — use for the LCP only. */
  priority?: boolean;
  /** When true, skip the responsive srcSet and force the small thumbnail. */
  thumbOnly?: boolean;
};

/**
 * Plain `<img>` wrapper that always carries intrinsic width/height
 * (zero CLS) and a responsive `srcset` covering the 200/800/1280
 * variants emitted by scripts/optimize-images.sh.
 *
 * We use `<img>` rather than next/image because the project ships as
 * a static export with `images.unoptimized: true` — the bundler-side
 * loader provides no value but adds runtime cost.
 */
export function Img({
  image,
  sizes,
  alt,
  className,
  priority = false,
  thumbOnly = false,
  loading,
  fetchPriority,
  decoding,
  ...rest
}: Props) {
  return (
    <img
      src={thumbOnly ? image.thumb : image.src}
      srcSet={thumbOnly ? undefined : image.srcSet}
      sizes={thumbOnly ? undefined : sizes}
      width={image.width}
      height={image.height}
      alt={alt}
      loading={loading ?? (priority ? "eager" : "lazy")}
      decoding={decoding ?? "async"}
      // `fetchpriority` is the canonical attribute name; the React 19
      // typing exposes it as camelCase.
      fetchPriority={fetchPriority ?? (priority ? "high" : undefined)}
      className={cn("block", className)}
      {...rest}
    />
  );
}
