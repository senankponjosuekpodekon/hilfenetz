import { randomUUID } from "crypto";
import { del, put } from "@vercel/blob";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

export function isValidImageFile(file: File): boolean {
  return file.size > 0 && file.size <= MAX_SIZE && ALLOWED_TYPES.has(file.type);
}

export async function saveImageFile(file: File): Promise<string | null> {
  if (!isValidImageFile(file)) return null;
  const blob = await put(`offres/${randomUUID()}-${file.name}`, file, { access: "public" });
  return blob.url;
}

export async function removeImageFile(url: string): Promise<void> {
  try {
    await del(url);
  } catch {
    // fichier déjà absent
  }
}
