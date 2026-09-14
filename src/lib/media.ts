import { MediaItem, ProposalData } from "./types";
import { fileToCompressedDataUrl } from "./image";
import { getSupabase, PROPOSAL_MEDIA_BUCKET } from "./supabase";

const MAX_VIDEO_BYTES = 15 * 1024 * 1024; // 15MB — generous for a short clip, safe for localStorage

/**
 * Reads an uploaded image or video into a MediaItem. Images are resized and
 * compressed the same way as the Love template's memory photos. Videos
 * can't be re-encoded in the browser without extra libraries, so they're
 * read as-is — callers should keep clips short.
 *
 * This produces a local data URL for instant previews while editing. The
 * data URL is only turned into a hosted Supabase Storage URL at publish
 * time (see uploadProposalMedia below) — nothing here changes.
 */
export function fileToMediaItem(file: File): Promise<MediaItem> {
  if (file.type.startsWith("image/")) {
    return fileToCompressedDataUrl(file).then((src) => ({
      id: crypto.randomUUID(),
      type: "image" as const,
      src,
    }));
  }

  if (file.type.startsWith("video/")) {
    if (file.size > MAX_VIDEO_BYTES) {
      return Promise.reject(
        new Error("That video is a bit large — try a clip under 15MB.")
      );
    }
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Couldn't read that video."));
      reader.onload = () =>
        resolve({
          id: crypto.randomUUID(),
          type: "video" as const,
          src: reader.result as string,
        });
      reader.readAsDataURL(file);
    });
  }

  return Promise.reject(new Error("Only images and videos are supported."));
}

function dataUrlToBlob(dataUrl: string): { blob: Blob; ext: string } {
  const [header, base64] = dataUrl.split(",");
  const mime = header.match(/data:(.*);base64/)?.[1] ?? "application/octet-stream";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  const ext = mime.split("/")[1]?.split("+")[0] || "bin";
  return { blob: new Blob([bytes], { type: mime }), ext };
}

/**
 * Uploads a single MediaItem's data URL to the proposal-media bucket and
 * returns a copy of the item pointing at the resulting public URL.
 *
 * If the item's src is already a hosted URL (not a data: URL), it's left
 * untouched — this makes the function safe to run again on a proposal
 * that's already been published (e.g. re-publishing after an edit, or the
 * glow-2gfn migration), instead of re-uploading media that's already online.
 */
export async function uploadMediaItem(
  item: MediaItem,
  proposalId: string
): Promise<MediaItem> {
  if (!item.src.startsWith("data:")) {
    return item;
  }

  const { blob, ext } = dataUrlToBlob(item.src);
  const path = `${proposalId}/${item.id}.${ext}`;

  const supabase = getSupabase();
  const { error: uploadError } = await supabase.storage
    .from(PROPOSAL_MEDIA_BUCKET)
    .upload(path, blob, { contentType: blob.type, upsert: true });

  if (uploadError) {
    throw new Error(
      `Couldn't upload one of the ${item.type}s: ${uploadError.message}`
    );
  }

  const { data } = supabase.storage.from(PROPOSAL_MEDIA_BUCKET).getPublicUrl(path);
  return { ...item, src: data.publicUrl };
}

/**
 * Uploads every page4/page5 media item that's still a local data URL and
 * returns a copy of the proposal with page4.media/page5.media pointing at
 * their public Supabase Storage URLs. Existing hosted URLs are left as-is.
 * Media limits (3 / 5) are untouched — this only ever transforms `src`.
 */
export async function uploadProposalMedia(
  proposal: ProposalData
): Promise<ProposalData> {
  const [page4Media, page5Media] = await Promise.all([
    Promise.all(proposal.page4.media.map((m) => uploadMediaItem(m, proposal.id))),
    Promise.all(proposal.page5.media.map((m) => uploadMediaItem(m, proposal.id))),
  ]);

  return {
    ...proposal,
    page4: { ...proposal.page4, media: page4Media },
    page5: { ...proposal.page5, media: page5Media },
  };
}

