import { ProposalData, SurpriseData } from "./types";
import { uploadProposalMedia } from "./media";
import { getSupabase, PROPOSALS_TABLE } from "./supabase";

/**
 * Demo storage for Version 1.
 *
 * Every surprise is written to localStorage under a namespaced key. This file
 * is the ONLY place that knows how surprises are persisted — the builder and
 * the recipient route both go through these functions. When the backend is
 * ready, swap the bodies of these three functions for Supabase calls
 * (e.g. `supabase.from("surprises").insert(...)`) and nothing else in the
 * app needs to change.
 */

const STORAGE_PREFIX = "unfold:surprise:";
const DRAFT_KEY = "unfold:draft";

const PROPOSAL_STORAGE_PREFIX = "unfold:proposal:";
const PROPOSAL_DRAFT_KEY = "unfold:proposal-draft";

function isBrowser() {
  return typeof window !== "undefined";
}

export function generateId(): string {
  const words = ["glow", "wish", "hush", "bloom", "spark", "dawn", "moth", "echo"];
  const word = words[Math.floor(Math.random() * words.length)];
  const suffix = Math.random().toString(36).slice(2, 6);
  return `${word}-${suffix}`;
}

export async function saveSurprise(data: SurpriseData): Promise<SurpriseData> {
  if (!isBrowser()) return data;
  const withId: SurpriseData = { ...data, createdAt: Date.now() };
  try {
    window.localStorage.setItem(
      STORAGE_PREFIX + withId.id,
      JSON.stringify(withId)
    );
  } catch {
    throw new Error(
      "This browser couldn't store the surprise (it may be full or in private mode)."
    );
  }
  return withId;
}

export async function getSurprise(id: string): Promise<SurpriseData | null> {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(STORAGE_PREFIX + id);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SurpriseData;
  } catch {
    return null;
  }
}

// Draft autosave, so a creator's in-progress surprise survives a refresh.
export function saveDraft(data: SurpriseData) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
  } catch {
    // best-effort only
  }
}

export function getDraft(): SurpriseData | null {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(DRAFT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SurpriseData;
  } catch {
    return null;
  }
}

export function clearDraft() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(DRAFT_KEY);
}

/* =========================================================================
 * Proposal template — published proposals now live in Supabase (table
 * `proposals`, columns id/data/created_at) so /p/[id] works from any
 * device. Drafts stay in localStorage below, unchanged, since they're only
 * ever read back on the same device that's still editing.
 * ===================================================================== */

export async function saveProposal(data: ProposalData): Promise<ProposalData> {
  const withId: ProposalData = { ...data, createdAt: Date.now() };
  try {
    const withUploadedMedia = await uploadProposalMedia(withId);
    const supabase = getSupabase();
    const { error } = await supabase
      .from(PROPOSALS_TABLE)
      .upsert({ id: withUploadedMedia.id, data: withUploadedMedia });
    if (error) {
      throw new Error(error.message);
    }
    return withUploadedMedia;
  } catch (err) {
    throw new Error(
      `Couldn't save the proposal online: ${
        err instanceof Error ? err.message : "unknown error"
      }`
    );
  }
}

export async function getProposal(id: string): Promise<ProposalData | null> {
  if (!isBrowser()) return null;
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from(PROPOSALS_TABLE)
      .select("data")
      .eq("id", id)
      .maybeSingle();
    if (error || !data) return null;
    return data.data as ProposalData;
  } catch {
    return null;
  }
}

/**
 * One-time migration for a proposal that was published before Supabase was
 * wired up (e.g. the original glow-2gfn), and so only exists in this
 * browser's localStorage under the old key. Uploads its media and writes
 * it to Supabase under the SAME id, then — only once that succeeds —
 * removes the old local copy.
 */
export async function migrateLocalProposal(id: string): Promise<ProposalData> {
  if (!isBrowser()) {
    throw new Error("This can only run in a browser.");
  }
  const raw = window.localStorage.getItem(PROPOSAL_STORAGE_PREFIX + id);
  if (!raw) {
    throw new Error(`No local proposal found for id "${id}" on this device.`);
  }
  let parsed: ProposalData;
  try {
    parsed = JSON.parse(raw) as ProposalData;
  } catch {
    throw new Error("That local proposal's data is corrupted and can't be read.");
  }

  const saved = await saveProposal(parsed);
  window.localStorage.removeItem(PROPOSAL_STORAGE_PREFIX + id);
  return saved;
}

export function saveProposalDraft(data: ProposalData) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(PROPOSAL_DRAFT_KEY, JSON.stringify(data));
  } catch {
    // best-effort only
  }
}

export function getProposalDraft(): ProposalData | null {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(PROPOSAL_DRAFT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ProposalData;
  } catch {
    return null;
  }
}

export function clearProposalDraft() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(PROPOSAL_DRAFT_KEY);
}

