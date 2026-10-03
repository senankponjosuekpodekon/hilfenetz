// Limiteur en mémoire (best-effort) : suffisant pour un déploiement mono-instance.
// En production multi-instance, brancher un store partagé (Redis) ou Cloudflare Turnstile.
const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (bucket.count >= limit) return false;
  bucket.count += 1;
  return true;
}

export function clientKey(headers: Headers, action: string): string {
  const ip =
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headers.get("x-real-ip") ??
    "unknown";
  return `${action}:${ip}`;
}
