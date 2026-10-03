import { cookies } from "next/headers";
import { createHmac, scryptSync, timingSafeEqual, randomBytes } from "node:crypto";
import { cache } from "react";

const SESSION_COOKIE = "hn_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 h

function secret(): string {
  return process.env.SESSION_SECRET ?? "dev-secret-change-me-in-production";
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

function sign(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export async function createSession(email: string): Promise<void> {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = Buffer.from(JSON.stringify({ sub: email, exp })).toString("base64url");
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export const getSession = cache(async (): Promise<{ email: string } | null> => {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  const [payload, signature] = raw.split(".");
  if (!payload || !signature || sign(payload) !== signature) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as {
      sub: string;
      exp: number;
    };
    if (!data.sub || data.exp < Date.now() / 1000) return null;
    return { email: data.sub };
  } catch {
    return null;
  }
});

export async function requireAdmin(): Promise<{ email: string }> {
  const session = await getSession();
  if (!session) throw new Error("UNAUTHORIZED");
  return session;
}
