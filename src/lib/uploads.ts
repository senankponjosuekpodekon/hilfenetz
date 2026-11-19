import { randomUUID } from "crypto";
import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/avif": ".avif",
};

const uploadDir = path.join(process.cwd(), "uploads");

export function isValidImageFile(file: File): boolean {
  return file.size > 0 && file.size <= MAX_SIZE && file.type in ALLOWED_TYPES;
}

export async function saveImageFile(file: File): Promise<string | null> {
  const ext = ALLOWED_TYPES[file.type];
  if (!ext || file.size === 0 || file.size > MAX_SIZE) return null;
  await mkdir(uploadDir, { recursive: true });
  const name = `${randomUUID()}${ext}`;
  await writeFile(path.join(uploadDir, name), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${name}`;
}

export async function removeImageFile(url: string): Promise<void> {
  if (!url.startsWith("/uploads/")) return;
  try {
    await unlink(path.join(process.cwd(), "uploads", path.basename(url)));
  } catch {
    // fichier déjà absent
  }
}
