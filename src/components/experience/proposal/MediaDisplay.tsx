import { MediaItem } from "@/lib/types";

export function MediaDisplay({
  item,
  className = "",
}: {
  item: MediaItem;
  className?: string;
}) {
  if (item.type === "video") {
    return (
      <video
        src={item.src}
        className={className}
        controls
        playsInline
        preload="metadata"
      />
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={item.src} alt="" className={className} />;
}
